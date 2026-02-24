import React, { useEffect, useState } from "react";
import axios from "axios";
import BTCNavbar from "./BTCNavbar";
import BTCFooter from "./BTCFooter";


const CreateBtcWallet = () => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState("");
  const [mnemonic, setMnemonic] = useState("");   // ⭐ NEW

 useEffect(() => {
    let token = localStorage.getItem("TOKEN");
    if (!token) {
      window.location.href = "/login";
    }
  }, []);

  const createWallet = async () => {
    if (!password) return alert("Enter a password!");

    try {
      setLoading(true);

      const token = localStorage.getItem("TOKEN");

      const res = await axios.post(
        "http://localhost:5000/api/wallet/create-btc",
        { password },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setAddress(res.data.address);
      setMnemonic(res.data.mnemonic);   // ⭐ SAVE SEED PHRASE

    } catch (err) {
      console.log(err);
      alert("Error creating BTC wallet");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <BTCNavbar/>
      <div className="flex flex-col items-center justify-center mt-[5%] h-[50vh]">
      <h1 className="text-2xl font-bold mb-6">Create Bitcoin Wallet</h1>

      {!mnemonic && (
        <>
          <input
            type="password"
            placeholder="Set wallet password"
            className="px-4 py-2 rounded bg-gray-800 mb-4 w-full max-w-sm"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={createWallet}
            className="px-6 py-3 bg-yellow-500 rounded-lg hover:bg-yellow-600 w-full max-w-sm"
          >
            {loading ? "Creating..." : "Create BTC Wallet"}
          </button>
        </>
      )}

      {/* AFTER CREATION */}
      {mnemonic && (
        <div className="mt-8 max-w-lg text-center">
          <p className="text-green-400 font-bold">Wallet Created Successfully!</p>

          <p className="mt-4 text-gray-300">
            <strong>Bitcoin Address:</strong>
            <br />
            <span className="text-white break-words">{address}</span>
          </p>

          <p className="mt-6 text-red-400 font-semibold">
            ⚠️ Write Down Your 12-Word Seed Phrase!
          </p>

          <p className="mt-2 p-4 bg-gray-800 rounded text-white font-mono break-words">
            {mnemonic}
          </p>

          <button
            onClick={() => (window.location.href = "/btc-dashboard")}
            className="mt-6 px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg"
          >
            Go to BTC Dashboard
          </button>
        </div>
      )}
    </div>
    <BTCFooter/>
    </div>
  );
};

export default CreateBtcWallet;
