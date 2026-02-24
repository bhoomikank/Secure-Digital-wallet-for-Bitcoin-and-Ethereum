import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BTCNavbar from "./BTCNavbar";
import BTCFooter from "./BTCFooter";

export default function BTCDashboard() {
  const nav = useNavigate();

  const [wallet, setWallet] = useState(null);
  const [walletIndex, setWalletIndex] = useState(null);
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(true);
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState(null);


   useEffect(() => {
    let token = localStorage.getItem("TOKEN");
    if (!token) {
      window.location.href = "/login";
    }
  }, []);
  // -----------------------------
  // Load Selected Wallet
  // -----------------------------
  useEffect(() => {
    const idx = localStorage.getItem("BTC_WALLET_INDEX");
    if (idx === null) return nav("/btc-wallets");

    setWalletIndex(idx);
    loadWallet(idx);
  }, []);

  async function loadWallet(index) {
    try {
      const token = localStorage.getItem("TOKEN");

      const res = await fetch("http://localhost:5000/api/wallet/btc", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();

      if (!data.wallets[index]) return setError("Wallet not found");

      setWallet(data.wallets[index]);
      setAddress(data.wallets[index].address);
    } catch (e) {
      setError("Failed to load wallet");
    } finally {
      setLoading(false);
    }
  }

  // -----------------------------
  // Unlock Wallet
  // -----------------------------
  async function unlockWallet() {
    try {
      const iv = new Uint8Array(wallet.iv);
      const encryptedPayload = new Uint8Array(wallet.cipher);

      const tag = encryptedPayload.slice(encryptedPayload.length - 16);
      const ciphertext = encryptedPayload.slice(
        0,
        encryptedPayload.length - 16
      );

      const enc = new TextEncoder();
      const keyHash = await crypto.subtle.digest(
        "SHA-256",
        enc.encode(password)
      );
      const cryptoKey = await crypto.subtle.importKey(
        "raw",
        keyHash,
        "AES-GCM",
        false,
        ["decrypt"]
      );

      const sealed = new Uint8Array([...ciphertext, ...tag]);

      const decrypted = await crypto.subtle.decrypt(
        { name: "AES-GCM", iv },
        cryptoKey,
        sealed
      );

      const wif = new TextDecoder().decode(decrypted).trim();
      console.log("DECRYPTED WIF:", wif);

      // ⭐ Validate in backend
      const token = localStorage.getItem("TOKEN");

      const res = await fetch("http://localhost:5000/api/wallet/validate-wif", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ wif }),
      });

      const data = await res.json();

      if (!res.ok) {
        return alert("❌ Wrong password or corrupted wallet");
      }

      console.log("VALID WIF, Address:", data.address);

      setUnlocked(true);
    } catch (err) {
      console.error("DECRYPT ERROR:", err);
      alert("❌ Wrong password or corrupted wallet");
    }
  }

  // -----------------------------
  // UI States
  // -----------------------------
  if (loading) return <p className="text-white">Loading...</p>;
  if (error) return <p className="text-red-400">{error}</p>;

  // Step 1: Unlock Screen
  if (!unlocked) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
        <h1 className="text-2xl font-bold">Unlock Your BTC Wallet</h1>

        <p className="mt-4 text-gray-400">Address:</p>
        <p className="text-orange-400 break-all text-center">{address}</p>

        <input
          type="password"
          placeholder="Enter wallet password"
          className="mt-6 p-3 bg-gray-800 rounded w-full max-w-sm"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={unlockWallet}
          className="mt-4 px-6 py-3 bg-green-600 hover:bg-green-700 rounded w-full max-w-sm"
        >
          Unlock Wallet
        </button>
      </div>
    );
  }

  const handleSubmit = () => {
    alert("Amount submitted!");
  };

  // Step 2: Dashboard
  return (
    <div className="min-h-screen bg-black text-white p-6 ">
     <BTCNavbar/>
      {/* <div className="flex flex-col items-center">
        <h1 className="text-3xl font-bold">BTC Wallet Dashboard</h1>
        <div className="max-w-xl w-full h-[17rem] flex flex-col items-center bg-orange-400 font-mono justify-center rounded-lg mt-6 p-4">
          <p className="mt-4 ">Address:</p>
          <p className=" break-all text-center text-xl">{address}</p>

          <p className="mt-15 text-xl font-bold">Balance: 0.0</p>

          <a
            href={`https://mempool.space/testnet/address/${address}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 px-4 py-2 bg-green-600 hover:bg-gray-700 rounded-lg"
          >
            View on Testnet Explorer
          </a>
        </div>

        <div className="flex flex-col justify-center items-center w-[50%] max-w-xl mt-6 space-y-4">
          <input className="px-5" type="text" placeholder="Enter the address" />
          <input type="text" placeholder="Enter the amount" />
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg">
            submit
          </button>
        </div>
      </div> */}

      <div className="flex flex-col items-center px-4 w-full pt-[5%] pb-[5%]">
        <h1 className="text-3xl font-bold text-center">BTC Wallet Dashboard</h1>

        {/* Wallet Card */}
        <div className="w-full max-w-xl bg-orange-400 font-mono rounded-lg mt-6 p-6 flex flex-col items-center text-center">
          <p className="text-lg">Address:</p>
          <p className="break-all text-xl font-semibold mt-2">{address}</p>

          <p className="mt-6 text-2xl font-bold">Balance: 0.0</p>

          <a
            href={`https://mempool.space/testnet/address/${address}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition"
          >
            View on Testnet Explorer
          </a>
        </div>

        {/* Send BTC Form */}
        <div className="w-full max-w-xl mt-8 space-y-4 flex flex-col border border-gray-700 rounded-lg p-6">
          <p className="text-2xl text-center font-semibold">Amount</p>
          <input
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="text"
            placeholder="Enter the address"
          />

          <input
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="text"
            placeholder="Enter the amount"
          />

          <button
            className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
      <BTCFooter/>
    </div>
  );
}
