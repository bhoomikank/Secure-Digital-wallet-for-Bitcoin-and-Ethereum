import { useState } from "react";

export default function BTCNavbar() {
  const [open, setOpen] = useState(false);
  const handleLogout = () => {
    localStorage.removeItem("TOKEN");
    localStorage.removeItem("BTC_WALLET_INDEX");

    window.location.href = "/login";
  };

  return (
    <nav className="w-full bg-gray-900 text-white px-6 py-3 shadow-lg">
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        {/* Logo */}
        <h1 className="text-2xl font-bold text-orange-400">BTC Wallet</h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 font-mono">
          <a href="/btc-wallets" className="hover:text-orange-400">
            My Wallets
          </a>
          <a href="/create-btc" className="hover:text-orange-400">
            Create Wallet
          </a>
          <a href="/import-btc" className="hover:text-orange-400">
            Forget Wallet
          </a>
          <button
            onClick={handleLogout}
            className="px-2 py-0 rounded bg-red-500"
          >
            Logout
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setOpen(!open)}
        >
          <div className="space-y-1">
            <div className="w-6 h-[3px] bg-white"></div>
            <div className="w-6 h-[3px] bg-white"></div>
            <div className="w-6 h-[3px] bg-white"></div>
          </div>
        </button>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div className="md:hidden mt-3 flex flex-col space-y-3 font-mono">
          <a href="/btc-wallets" className="hover:text-orange-400">
            My Wallets
          </a>
          <a href="/create-btc" className="hover:text-orange-400">
            Create Wallet
          </a>
          <a href="/import-btc" className="hover:text-orange-400">
            Forget Wallet
          </a>
          <button
            onClick={handleLogout}
            className="px-2 py-0 rounded bg-red-500"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
