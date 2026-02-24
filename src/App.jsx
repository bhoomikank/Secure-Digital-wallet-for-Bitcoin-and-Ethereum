import { BrowserRouter, Routes, Route } from "react-router-dom";

// ETH Wallet Pages
import CreateWallet from "./pages/CreateWallet";

import ImportFromSeed from "./pages/ImportFromSeed";
import Dashboard from "./pages/Dashboard";

// BTC Wallet Pages
import CreateBtcWallet from "./pages/CreateBtcWallet";
import ImportBtcWallet from "./pages/ImportBtcWallet";
import BTCWalletList from "./pages/BTCWalletList";
import BTCdashboard from "./pages/BTCdashboard";
import BTCsend from "./pages/BTCsend"; // ⭐ Add this!

// Auth Pages
import Register from "./pages/Register";
import Login from "./pages/Login";
import Verify from "./pages/Verify";

// Face Authentication
import FaceRegister from "./pages/FaceRegister";
import FaceLogin from "./pages/FaceLogin";

// Multi-blockchain selector
import BlockchainSelector from "./pages/BlockchainSelector.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import BTCNavbar from "./pages/BTCNavbar.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default */}
        <Route path="/" element={<LandingPage />} />

        {/* Ethereum */}
        <Route path="/create-wallet" element={<CreateWallet />} />

        <Route path="/import-seed" element={<ImportFromSeed />} />
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Bitcoin */}
        <Route path="/create-btc" element={<CreateBtcWallet />} />
        <Route path="/import-btc" element={<ImportBtcWallet />} />
        <Route path="/btc-wallets" element={<BTCWalletList />} />
        <Route path="/btc-dashboard" element={<BTCdashboard />} />
        <Route path="/btc-navbar" element={<BTCNavbar />} />
        {/* <Route path="/btc-send" element={<BTCsend />} /> */}
        {/* ⭐ Missing earlier */}

        {/* Blockchain Selection */}
        <Route path="/select-blockchain" element={<BlockchainSelector />} />

        {/* Authentication */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify" element={<Verify />} />

        {/* Face Auth */}
        <Route path="/face-register" element={<FaceRegister />} />
        <Route path="/face-login" element={<FaceLogin />} />
      </Routes>
    </BrowserRouter>
  );
}
