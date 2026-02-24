import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BTCNavbar from "./BTCNavbar";
import BTCFooter from "./BTCFooter";

export default function BTCWalletList() {
  const [wallets, setWallets] = useState([]);
  const [loading, setLoading] = useState(true);

   useEffect(() => {
      let token = localStorage.getItem("TOKEN");
      if (!token) {
        window.location.href = "/login";
      }
    }, []);

  useEffect(() => {
    loadBTCWallets();
  }, []);

  const loadBTCWallets = async () => {
    try {
      const token = localStorage.getItem("TOKEN");

      const res = await fetch("http://localhost:5000/api/wallet/btc", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      console.log("Fetched BTC wallets:", data.wallets);

      setWallets(data.wallets || []);
    } catch (err) {
      console.error("Error loading BTC wallets:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 ">
      <BTCNavbar/>
      <div className="flex flex-col items-center justify-center mt-[5%] pb-[10%]">
      <h1 className="text-3xl font-bold text-center mb-6">Bitcoin Wallets</h1>

      <div className="text-center mb-6">
        <Link
          to="/create-btc"
          className="px-5 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg"
        >
          + Create New BTC Wallet
        </Link>
      </div>

      {loading && <p className="text-center text-gray-400">Loading...</p>}

      {!loading && wallets.length === 0 && (
        <p className="text-center text-gray-400">No BTC wallets found.</p>
      )}

      {/* <div className="mt-4 space-y-4 w-screen mx-auto flex flex-wrap  gap-4 justify-center font-mono">
        {wallets.map((wallet, index) => (
          <div
            key={index}
            className=" w-[23rem] h-[10rem] flex flex-col justify-center items-center border border-gray-700 rounded p-2 hover:bg-gray-800 rounded-md bg-orange-400"
          >
            <p className="text-lg font-semibold">BTC Wallet #{index + 1}</p>
            <p className="text-gray-400">Label: {wallet.label}</p>

            <button
              onClick={() => {
                localStorage.setItem("BTC_WALLET_INDEX", index);
                window.location.href = "/btc-dashboard";
              }}
              className=" px-2 py-1 bg-green-700 mt-2 "
            >
              Open Wallet
            </button>
          </div>
        ))}
      </div> */}
      <div className="mt-4 w-full px-4 font-mono">
  <div className="grid gap-4 
    sm:grid-cols-1 
    md:grid-cols-2 
    lg:grid-cols-3 
    xl:grid-cols-4 
    justify-items-center">

    {wallets.map((wallet, index) => (
      <div
        key={index}
        className="w-full max-w-sm h-[10rem] flex flex-col justify-center items-center 
        border border-gray-700 rounded-lg p-4 
        hover:bg-gray-800 transition 
        bg-orange-400"
      >
        <p className="text-lg font-semibold">BTC Wallet #{index + 1}</p>
        <p className="text-gray-700 text-sm">Label: {wallet.label}</p>

        <button
          onClick={() => {
            localStorage.setItem("BTC_WALLET_INDEX", index);
            window.location.href = "/btc-dashboard";
          }}
          className="px-3 py-1 bg-green-700 mt-3 rounded text-white hover:bg-green-600"
        >
          Open Wallet
        </button>
      </div>
    ))}
  </div>
</div>
</div>
<BTCFooter/>
    </div>
  );
}
