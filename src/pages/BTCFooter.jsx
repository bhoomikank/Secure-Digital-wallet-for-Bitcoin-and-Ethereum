// BTCFooter.jsx
import React from "react";

export default function BTCFooter({ address, year = new Date().getFullYear() }) {
  return (
    <footer className="w-full bg-gray-900 text-gray-200 px-6 py-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-start md:justify-between gap-6">
        {/* Brand / About */}
        <div className="flex-1 min-w-[200px]">
          <div className="flex items-center gap-3">
            {/* simple BTC svg icon */}
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-orange-400 text-gray-900 font-bold">
              <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor" aria-hidden="true">
                <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm1.23 6.34c.68-1.93-1.12-2.49-2.02-2.72l.41-1.64-1.02-.26-.4 1.61c-.26-.06-.52-.12-.78-.18l.41-1.64-1.02-.26-.41 1.64c-.23-.05-.46-.1-.69-.14L7.2 6.3l.93 2.8c.35.1.69.2 1.02.3l-.94 3.76c-.06.23-.22.55-.64.43.14.21-.34 1.02-1.22.75.27.42 1.02.68 1.88.68 1.59 0 2.74-.91 3.16-2.28.68-2.13-.04-3.31-1.85-4.03.86-.2 1.5-.7 1.86-1.48z"/>
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white">BTC Wallet</h3>
              <p className="text-sm text-gray-400">Lightweight testnet wallet & dashboard</p>
            </div>
          </div>

          <p className="mt-4 text-sm text-gray-400">
            Built for testing and learning. Do not use with real funds. Want help integrating a feature?
            Ping the dev — keeps the node warm.
          </p>
        </div>

        {/* Quick links */}
        <div className="flex-1 min-w-[160px]">
          <h4 className="text-sm font-semibold text-white mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="/btc-dashboard" className="hover:text-orange-400">Dashboard</a></li>
            <li><a href="/btc-wallets" className="hover:text-orange-400">My Wallets</a></li>
            
            <li><a href="/create-btc" className="hover:text-orange-400">Create Wallet</a></li>
          </ul>
        </div>

        {/* Contact / Address */}
      
      </div>

      {/* Bottom bar */}
      <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
        <p>© {year} BTC Wallet — For testing only. No real funds.</p>

        <div className="flex items-center gap-4">
          <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-orange-400" aria-label="GitHub">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 .5C5.65.5.5 5.65.5 12c0 5.09 3.29 9.4 7.86 10.93.57.1.78-.25.78-.55 0-.27-.01-1-.02-1.96-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.26-1.68-1.26-1.68-1.03-.7.08-.69.08-.69 1.14.08 1.74 1.17 1.74 1.17 1.01 1.73 2.66 1.23 3.31.94.1-.73.4-1.23.72-1.51-2.56-.29-5.25-1.28-5.25-5.7 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.47.11-3.06 0 0 .97-.31 3.18 1.18A11.1 11.1 0 0112 6.85c.98.01 1.97.13 2.9.37 2.2-1.5 3.17-1.18 3.17-1.18.62 1.59.23 2.77.11 3.06.73.81 1.18 1.83 1.18 3.09 0 4.44-2.7 5.4-5.27 5.68.41.36.77 1.08.77 2.18 0 1.58-.01 2.86-.01 3.25 0 .31.21.66.79.55C20.71 21.4 24 17.09 24 12 24 5.65 18.35.5 12 .5z"/></svg>
          </a>

          <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-orange-400" aria-label="Twitter">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0012 7.77v.56A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/></svg>
          </a>

          <a href="/privacy" className="hover:text-orange-400">Privacy</a>
        </div>
      </div>
    </footer>
  );
}
