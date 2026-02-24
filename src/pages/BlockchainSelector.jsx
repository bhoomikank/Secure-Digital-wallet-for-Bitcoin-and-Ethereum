import React from "react";
import { Bitcoin, Wallet, ChevronRight, Sparkles, Shield, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


const BlockchainSelector = () => {
  const nav = useNavigate();
   useEffect(() => {
      let token = localStorage.getItem("TOKEN");
      if (!token) {
        window.location.href = "/login";
      }
    }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-purple-900 flex flex-col items-center justify-center text-white px-6 py-12">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
      </div>

      {/* Header Section */}
      <div className="text-center mb-12 relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 rounded-full border border-blue-400/30 mb-6">
          <Sparkles size={16} className="text-blue-300" />
          <span className="text-blue-300 font-mono text-sm">Multi-Chain Support</span>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent">
          Choose Your Network
        </h1>
        
        <p className="text-gray-400 text-lg max-w-md mx-auto">
          Select a blockchain to create or access your wallet
        </p>
      </div>

      {/* Network Cards Container */}
      <div className="w-full max-w-lg relative z-10">
        {/* Ethereum Card */}
        <div
          onClick={() => nav("/create-wallet")}
          className="group relative mb-6 cursor-pointer transform hover:scale-[1.02] transition-all duration-500"
        >
          {/* Background Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
          
          <div className="relative flex items-center justify-between p-6 bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-2xl border border-gray-700/50 group-hover:border-blue-500/30 transition-all duration-500 shadow-2xl">
            {/* Left Content */}
            <div className="flex items-center gap-5">
              {/* Icon Container */}
              <div className="relative">
                <div className="absolute inset-0 bg-blue-500/20 rounded-xl blur-md group-hover:bg-blue-500/30 transition-colors duration-500"></div>
                <div className="relative bg-gradient-to-br from-blue-600 to-cyan-600 p-3 rounded-xl shadow-lg">
                  <img
                    src="https://cryptologos.cc/logos/ethereum-eth-logo.png"
                    alt="Ethereum"
                    className="w-8 h-8 filter brightness-0 invert"
                  />
                </div>
              </div>
              
              {/* Text Content */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-xl font-bold text-white">Ethereum</p>
                  <div className="flex items-center gap-1 px-2 py-1 bg-blue-500/20 rounded-full">
                    <Shield size={12} className="text-blue-400" />
                    <span className="text-blue-400 text-xs font-medium">Secure</span>
                  </div>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">
                 Send and receive ETH globally in seconds.
                </p>
               
              </div>
            </div>
            
            {/* Right Arrow */}
            <div className="flex items-center">
              <div className="p-2 bg-gray-700/50 rounded-lg group-hover:bg-blue-500/20 transition-colors duration-300">
                <ChevronRight 
                  size={20} 
                  className="text-gray-400 group-hover:text-blue-300 transform group-hover:translate-x-1 transition-all duration-300" 
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bitcoin Card */}
        <div
          onClick={() => nav("/create-btc")}
          className="group relative cursor-pointer transform hover:scale-[1.02] transition-all duration-500"
        >
          {/* Background Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-600/20 to-orange-600/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
          
          <div className="relative flex items-center justify-between p-6 bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-2xl border border-gray-700/50 group-hover:border-yellow-500/30 transition-all duration-500 shadow-2xl">
            {/* Left Content */}
            <div className="flex items-center gap-5">
              {/* Icon Container */}
              <div className="relative">
                <div className="absolute inset-0 bg-yellow-500/20 rounded-xl blur-md group-hover:bg-yellow-500/30 transition-colors duration-500"></div>
                <div className="relative bg-gradient-to-br from-yellow-600 to-orange-600 p-3 rounded-xl shadow-lg">
                  <Bitcoin size={24} className="text-white" />
                </div>
              </div>
              
              {/* Text Content */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-xl font-bold text-white">Bitcoin</p>
                  <div className="flex items-center gap-1 px-2 py-1 bg-yellow-500/20 rounded-full">
                    <Zap size={12} className="text-yellow-400" />
                    <span className="text-yellow-400 text-xs font-medium">Sound Money</span>
                  </div>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Digital gold and peer-to-peer electronic cash system
                </p>
                
                {/* Features */}
                
              </div>
            </div>
            
            {/* Right Arrow */}
            <div className="flex items-center">
              <div className="p-2 bg-gray-700/50 rounded-lg group-hover:bg-yellow-500/20 transition-colors duration-300">
                <ChevronRight 
                  size={20} 
                  className="text-gray-400 group-hover:text-yellow-300 transform group-hover:translate-x-1 transition-all duration-300" 
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="mt-12 text-center relative z-10">
        <div className="flex items-center justify-center gap-6 text-gray-500 text-sm">
          <div className="flex items-center gap-2">
            <Shield size={16} className="text-green-400" />
            <span>Secure & Encrypted</span>
          </div>
          <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
          <div className="flex items-center gap-2">
            <Zap size={16} className="text-blue-400" />
            <span>Multi-Chain</span>
          </div>
          <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
          <div className="flex items-center gap-2">
            <Sparkles size={16} className="text-purple-400" />
            <span>Non-Custodial</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlockchainSelector;