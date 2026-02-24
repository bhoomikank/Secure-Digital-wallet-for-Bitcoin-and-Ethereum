import { useState, useEffect } from "react";
import * as bitcoin from "bitcoinjs-lib";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function BTCsend() {
  const [address, setAddress] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");

  const [status, setStatus] = useState("");

  useEffect(() => {
    const wallet = JSON.parse(localStorage.getItem("BTC_WALLET"));
    if (!wallet) {
      alert("No BTC wallet selected!");
      window.location.href = "/btc-wallets";
      return;
    }
    setAddress(wallet.address);
    setPrivateKey(wallet.privateKey);
  }, []);

  const sendBTC = async () => {
    try {
      setStatus("Preparing transaction...");

      const testnet = bitcoin.networks.testnet;

      const keyPair = bitcoin.ECPair.fromWIF(privateKey, testnet);

      // Get unspent outputs
      const utxoRes = await axios.get(
        `https://api.blockcypher.com/v1/btc/test3/addrs/${address}?unspentOnly=true`
      );

      const utxos = utxoRes.data.txrefs;

      if (!utxos || utxos.length === 0)
        return alert("No UTXOs available");

      const psbt = new bitcoin.Psbt({ network: testnet });

      let totalInput = 0;

      utxos.forEach((utxo) => {
        psbt.addInput({
          hash: utxo.tx_hash,
          index: utxo.tx_output_n,
          witnessUtxo: {
            script: Buffer.from("0014" + bitcoin.crypto.hash160(keyPair.publicKey).toString("hex"), "hex"),
            value: utxo.value,
          },
        });

        totalInput += utxo.value;
      });

      const satoshis = Math.floor(Number(amount) * 1e8);
      const fee = 500; // fixed fee

      psbt.addOutput({
        address: to,
        value: satoshis,
      });

      // Change back
      if (totalInput - satoshis - fee > 0) {
        psbt.addOutput({
          address: address,
          value: totalInput - satoshis - fee,
        });
      }

      psbt.signAllInputs(keyPair);
      psbt.finalizeAllInputs();

      const rawTx = psbt.extractTransaction().toHex();

      setStatus("Broadcasting...");

      const broadcast = await axios.post(
        "https://api.blockcypher.com/v1/btc/test3/txs/push",
        { tx: rawTx }
      );

      setStatus(`Success! TX Hash: ${broadcast.data.tx.hash}`);

    } catch (err) {
      console.error(err);
      setStatus("Transaction Failed!");
    }
  };

  return (
    <div className="bg-black text-white min-h-screen p-6">
      <Navbar />

      <h1 className="text-2xl font-bold text-center mt-8">Send Bitcoin</h1>

      <div className="flex flex-col max-w-md mx-auto gap-4 mt-6">
        <input
          type="text"
          className="p-3 bg-gray-800 rounded"
          placeholder="Recipient BTC Address"
          value={to}
          onChange={(e) => setTo(e.target.value)}
        />

        <input
          type="number"
          className="p-3 bg-gray-800 rounded"
          placeholder="Amount in BTC"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <button
          className="bg-green-600 p-3 rounded"
          onClick={sendBTC}
        >
          Send BTC
        </button>

        {status && (
          <p className="text-center mt-4 text-yellow-400">{status}</p>
        )}
      </div>

      <Footer />
    </div>
  );
}
