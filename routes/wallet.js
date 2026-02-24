const router = require("express").Router();
const User = require("../models/User");
const auth = require("../middleware/auth");
const crypto = require("crypto");
const { ethers } = require("ethers");
const bitcoin = require("bitcoinjs-lib");

const bip39 = require("bip39");
const ecc = require("tiny-secp256k1");
const BIP32Factory = require("bip32");
const { default: ECPairFactory } = require("ecpair");
const bip32 = BIP32Factory.BIP32Factory(ecc);


const ECPair = ECPairFactory(ecc);
// ----------------------------------------
// AES Encryption Helper
// ----------------------------------------
// function encryptKey(privateKey, password) {
//   const iv = crypto.randomBytes(12);
//   const key = crypto.createHash("sha256").update(password).digest();

//   const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);
//   const encrypted = Buffer.concat([cipher.update(privateKey), cipher.final()]);

//   return {
//     cipher: Array.from(encrypted),
//     iv: Array.from(iv),
//   };
// }
function encryptKey(privateKey, password) {
  const iv = crypto.randomBytes(12); // 12 bytes for AES-GCM
  const key = crypto.createHash("sha256").update(password).digest();

  const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);

  const encrypted = Buffer.concat([
    cipher.update(privateKey, "utf8"),
    cipher.final(),
  ]);

  const authTag = cipher.getAuthTag();

  const payload = Buffer.concat([encrypted, authTag]); // ciphertext || tag

  // debug: lengths (safe)
  console.log("ENCRYPT: payloadLen=", payload.length, " ivLen=", iv.length);

  return {
    cipher: Array.from(payload), // store as array of bytes
    iv: Array.from(iv),
  };
}





// ----------------------------------------
// SAVE ENCRYPTED WALLET (from frontend)
// ----------------------------------------
router.post("/save", auth, async (req, res) => {
  try {
    const { cipher, iv, label } = req.body;

    if (!cipher || !iv || !label) {
      return res.status(400).json({ message: "Missing wallet data" });
    }

    const userId = req.user.id;

    const walletObject = {
      type: "ETH",
      cipher,
      iv,
      label,
      createdAt: new Date(),
    };

    await User.findByIdAndUpdate(userId, { $push: { wallets: walletObject } });

    res.json({ message: "Encrypted wallet saved successfully!" });

  } catch (err) {
    console.error("SAVE ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ----------------------------------------
// CREATE ETH WALLET
// ----------------------------------------
router.post("/create-eth", auth, async (req, res) => {
  try {
    const { password } = req.body;
    const userId = req.user.id;

    if (!password) {
      return res.status(400).json({ message: "Password required" });
    }

    const wallet = ethers.Wallet.createRandom();
    const encrypted = encryptKey(wallet.privateKey, password);

    const walletObject = {
      type: "ETH",
      cipher: encrypted.cipher,
      iv: encrypted.iv,
      label: "ETH Wallet",
      createdAt: new Date(),
    };

    await User.findByIdAndUpdate(userId, { $push: { wallets: walletObject } });

    res.json({
      message: "ETH Wallet Created",
      address: wallet.address,
    });

  } catch (err) {
    console.error("ETH WALLET ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ----------------------------------------
// CREATE BTC WALLET
// ----------------------------------------
router.post("/create-btc", auth, async (req, res) => {
  try {
    const { password } = req.body;
    const userId = req.user.id;

    if (!password) {
      return res.status(400).json({ message: "Password required" });
    }

    const network = bitcoin.networks.testnet;

    // Generate mnemonic
    const mnemonic = bip39.generateMnemonic(128);
    const seed = await bip39.mnemonicToSeed(mnemonic);

    // Derive HD wallet
    const root = bip32.fromSeed(seed, network);
    const path = "m/44'/1'/0'/0/0";
    const child = root.derivePath(path);

    // Fix pubkey problem
    const { address } = bitcoin.payments.p2wpkh({
      pubkey: Buffer.from(child.publicKey),   // ⭐ FIXED
      network,
    });

    const privateKeyWIF = child.toWIF();
    const encrypted = encryptKey(privateKeyWIF, password);

    const walletObject = {
      type: "BTC",
      address,
      cipher: encrypted.cipher,
      iv: encrypted.iv,
      mnemonic,
      label: "BTC Wallet",
      createdAt: new Date(),
    };

    await User.findByIdAndUpdate(userId, { $push: { wallets: walletObject } });

    res.json({ message: "BTC Wallet Created", address, mnemonic });
  } catch (err) {
    console.error("BTC ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ----------------------------------------
// IMPORT BTC WALLET (using seed phrase)
// ----------------------------------------
router.post("/import-btc", auth, async (req, res) => {
  try {
    console.log("IMPORT BODY:", req.body);

    const { mnemonic, password, label } = req.body;
    const userId = req.user.id;

    if (!mnemonic || !password) {
      return res.status(400).json({ message: "Mnemonic & password required" });
    }

    if (!bip39.validateMnemonic(mnemonic)) {
      return res.status(400).json({ message: "Invalid BTC seed phrase" });
    }

    const network = bitcoin.networks.testnet;

    // Convert mnemonic → seed
    const seed = await bip39.mnemonicToSeed(mnemonic);

    // Derive HD wallet
    const root = bip32.fromSeed(seed, network);
    const child = root.derivePath("m/44'/1'/0'/0/0");

    // Generate address
    const { address } = bitcoin.payments.p2wpkh({
      pubkey: Buffer.from(child.publicKey),
      network,
    });

    // WIF private key
    const privateKeyWIF = child.toWIF();

    // Encrypt private key
    const encrypted = encryptKey(privateKeyWIF, password);

    // Final wallet object
    const walletObject = {
      type: "BTC",
      address,
      cipher: encrypted.cipher,
      iv: encrypted.iv,
      mnemonic,
      label: label || "Imported BTC Wallet",
      createdAt: new Date(),
    };

    await User.findByIdAndUpdate(userId, { $push: { wallets: walletObject } });

    res.json({
      message: "BTC Wallet Imported Successfully",
      address,
    });

  } catch (err) {
    console.error("BTC IMPORT ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ----------------------------------------
// VALIDATE WIF (Backend-side BTC check)
// ----------------------------------------
router.post("/validate-wif", auth, async (req, res) => {
  try {
    const { wif } = req.body;

    if (!wif) {
      return res.status(400).json({ message: "Missing WIF" });
    }

    const network = bitcoin.networks.testnet;

    // Decode WIF
    const keyPair = ECPair.fromWIF(wif, network);

    // FIX: convert Uint8Array → Buffer
    const pubKeyBuffer = Buffer.from(keyPair.publicKey);

    // Generate address
    const { address } = bitcoin.payments.p2wpkh({
      pubkey: pubKeyBuffer,   // ⭐ FIXED
      network,
    });

    return res.json({ valid: true, address });

  } catch (err) {
    console.error("WIF VALIDATION FAILED:", err);
    return res.status(400).json({ message: "Invalid WIF" });
  }
});









// ----------------------------------------
// GET ALL WALLETS
// ----------------------------------------
router.get("/all", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("wallets");
    res.json({ wallets: user.wallets });

  } catch (err) {
    console.error("GET ALL ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ----------------------------------------
// GET ONLY ETH WALLETS
// ----------------------------------------
router.get("/eth", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("wallets");
    const ethWallets = user.wallets.filter(w => w.type === "ETH");

    res.json({ wallets: ethWallets });

  } catch (err) {
    console.error("ETH FETCH ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ----------------------------------------
// GET ONLY BTC WALLETS
// ----------------------------------------
router.get("/btc", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("wallets");
    const btcWallets = user.wallets.filter(w => w.type === "BTC");

    res.json({ wallets: btcWallets });

  } catch (err) {
    console.error("BTC FETCH ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ----------------------------------------
// GET WALLET BY INDEX
// ----------------------------------------
router.get("/:index", auth, async (req, res) => {
  try {
    const index = req.params.index;
    const user = await User.findById(req.user.id).select("wallets");

    if (!user.wallets[index]) {
      return res.status(404).json({ message: "Wallet not found" });
    }

    res.json({ wallet: user.wallets[index] });

  } catch (err) {
    console.error("GET ONE ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
