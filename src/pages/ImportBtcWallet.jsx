import { useState, useEffect } from "react";
import * as bip39 from "bip39";

import BTCNavbar from "./BTCNavbar";
import BTCFooter from "./BTCFooter";
export default function ImportBtcWallet() {
  const [mnemonic, setMnemonic] = useState("");
  const [password, setPassword] = useState("");
  const [label, setLabel] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("TOKEN");
    if (!token) window.location.href = "/login";
  }, []);

  async function importWallet() {
    try {
      if (!bip39.validateMnemonic(mnemonic.trim())) {
        return alert("Invalid BTC Seed Phrase");
      }

      if (!password) return alert("Enter password");
      if (!label.trim()) return alert("Enter wallet label");

      const token = localStorage.getItem("TOKEN");

      const res = await fetch("http://localhost:5000/api/wallet/import-btc", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          mnemonic: mnemonic.trim(),
          password,
          label,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        return alert(data.message || "Import failed");
      }

      alert("BTC Wallet Imported Successfully!");
      window.location.href = "/btc-wallets";
    } catch (err) {
      console.error(err);
      alert("Import failed");
    }
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <BTCNavbar/>
      <div className="flex flex-col items-center justify-center mt-[5%] pb-[10%]">
      <h1 className="text-2xl font-bold text-center mt-10">Import BTC Wallet</h1>

      <div className="max-w-lg mx-auto mt-10 space-y-4">
        <textarea
          placeholder="BTC Seed Phrase"
          className="w-full p-3 bg-gray-900 rounded"
          rows={3}
          value={mnemonic}
          onChange={(e) => setMnemonic(e.target.value)}
        />

        <input
          type="text"
          placeholder="Wallet Label"
          className="w-full p-3 bg-gray-900 rounded"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
        />

        <input
          type="password"
          placeholder="Wallet Password"
          className="w-full p-3 bg-gray-900 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={importWallet}
          className="w-full bg-blue-600 hover:bg-blue-700 p-3 rounded"
        >
          Import Wallet
        </button>
      </div>
    </div>
    <BTCFooter/>
    </div>
  );
}
