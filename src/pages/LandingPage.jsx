import React from "react";
import { useEffect } from "react";

const LandingPage = () => {
   useEffect(() => {
      let token = localStorage.getItem("TOKEN");
      if (!token) {
        window.location.href = "/login";
      }
    }, []);
  return (
    <div className="w-screen bg-gradient-to-br from-gray-900 via-black to-blue-900 min-h-screen text-white overflow-x-hidden">
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-block mb-6 px-4 py-2 bg-blue-500/20 rounded-full border border-blue-400/30">
            <span className="text-blue-300 font-mono text-sm">Secure • Decentralized • Trustless</span>
          </div>
          
          <h1 className="font-mono font-bold text-5xl md:text-7xl lg:text-8xl mb-6 bg-gradient-to-r from-white via-blue-200 to-cyan-200 bg-clip-text text-transparent">
            Crypto Wallet
          </h1>
          
          <p className="font-mono text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Your gateway to managing <span className="text-yellow-400">Bitcoin</span> and <span className="text-blue-400">Ethereum</span> wallets securely.
          </p>
          
          <button
            className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl font-mono font-semibold text-lg hover:from-blue-500 hover:to-cyan-500 duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/30 transition-all"
            onClick={() => (window.location.href = "/select-blockchain")}
          >
            <span className="flex items-center justify-center">
              Get Started
              <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        {/* Ethereum Card */}
        <div className="group mb-20">
          <div className="flex flex-col lg:flex-row items-center justify-between bg-gradient-to-br from-gray-800/40 to-blue-900/30 backdrop-blur-sm rounded-3xl border border-blue-500/20 p-8 md:p-12 hover:border-blue-400/40 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10">
            <div className="lg:w-1/3 flex justify-center mb-8 lg:mb-0">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-500 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
                <img
                  src="https://cryptologos.cc/logos/ethereum-eth-logo.png?v=025"
                  alt="Ethereum Logo"
                  className="relative w-48 h-48 lg:w-64 lg:h-64 transform group-hover:scale-110 transition-transform duration-500"
                />
              </div>
            </div>
            
            <div className="lg:w-2/3 lg:pl-12">
              <div className="flex items-center mb-6">
                <div className="w-3 h-8 bg-blue-500 rounded-full mr-4"></div>
                <p className="text-4xl lg:text-5xl font-mono font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                  Ethereum
                </p>
              </div>
              
              <p className="text-lg lg:text-xl text-gray-300 leading-relaxed mb-6">
                Ethereum represents a new era of digital finance and innovation. It enables automated agreements through smart contracts, delivering trustless interactions between users across the world.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-black/30 rounded-xl p-4 border border-blue-500/10">
                  <p className="text-blue-400 font-mono font-semibold">DeFi Ecosystem</p>
                  <p className="text-sm text-gray-400">Decentralized Finance</p>
                </div>
                <div className="bg-black/30 rounded-xl p-4 border border-blue-500/10">
                  <p className="text-blue-400 font-mono font-semibold">Smart Contracts</p>
                  <p className="text-sm text-gray-400">Automated Agreements</p>
                </div>
                <div className="bg-black/30 rounded-xl p-4 border border-blue-500/10">
                  <p className="text-blue-400 font-mono font-semibold">NFT Market</p>
                  <p className="text-sm text-gray-400">Digital Ownership</p>
                </div>
              </div>
              
              <p className="text-gray-400 text-sm">
                With millions of daily active users and a massive ecosystem, Ethereum stands at the center of the modern crypto economy.
              </p>
            </div>
          </div>
        </div>

        {/* Bitcoin Card */}
        <div className="group">
          <div className="flex flex-col lg:flex-row-reverse items-center justify-between bg-gradient-to-br from-gray-800/40 to-yellow-900/30 backdrop-blur-sm rounded-3xl border border-yellow-500/20 p-8 md:p-12 hover:border-yellow-400/40 transition-all duration-500 hover:shadow-2xl hover:shadow-yellow-500/10">
            <div className="lg:w-1/3 flex justify-center mb-8 lg:mb-0">
              <div className="relative">
                <div className="absolute inset-0 bg-yellow-500 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
                <img
                  src="https://cryptologos.cc/logos/bitcoin-btc-logo.png?v=025"
                  alt="Bitcoin Logo"
                  className="relative w-48 h-48 lg:w-64 lg:h-64 transform group-hover:scale-110 transition-transform duration-500"
                />
              </div>
            </div>
            
            <div className="lg:w-2/3 lg:pr-12">
              <div className="flex items-center mb-6">
                <div className="w-3 h-8 bg-yellow-500 rounded-full mr-4"></div>
                <p className="text-4xl lg:text-5xl font-mono font-bold bg-gradient-to-r from-yellow-400 to-orange-300 bg-clip-text text-transparent">
                  Bitcoin
                </p>
              </div>
              
              <p className="text-lg lg:text-xl text-gray-300 leading-relaxed mb-6">
                Bitcoin represents financial freedom. It enables people to control their money without relying on traditional systems, offering global accessibility, censorship resistance, and complete ownership of digital assets.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-black/30 rounded-xl p-4 border border-yellow-500/10">
                  <p className="text-yellow-400 font-mono font-semibold">Digital Gold</p>
                  <p className="text-sm text-gray-400">Store of Value</p>
                </div>
                <div className="bg-black/30 rounded-xl p-4 border border-yellow-500/10">
                  <p className="text-yellow-400 font-mono font-semibold">21M Supply</p>
                  <p className="text-sm text-gray-400">Fixed Supply</p>
                </div>
                <div className="bg-black/30 rounded-xl p-4 border border-yellow-500/10">
                  <p className="text-yellow-400 font-mono font-semibold">Global Network</p>
                  <p className="text-sm text-gray-400">Borderless Payments</p>
                </div>
              </div>
              
              <p className="text-gray-400 text-sm">
                Every transaction is verified by a distributed network of miners and nodes, ensuring unmatched security and decentralization.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="text-center py-16 px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-mono text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Your Crypto Journey?
          </h2>
          <p className="text-gray-400 mb-8 text-lg">
            Join millions of users managing their digital assets securely with our wallet.
          </p>
          <button
            className="px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl font-mono font-semibold text-lg hover:from-green-500 hover:to-emerald-500 duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/30 transition-all"
            onClick={() => (window.location.href = "/select-blockchain")}
          >
            Create Your Wallet Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;