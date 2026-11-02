import React from 'react';

export default function PublicLandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex flex-col justify-between">
      
      {/* Navigation Header */}
      <header className="max-w-6xl mx-auto w-full px-4 py-6 flex justify-between items-center">
        <div className="text-xl font-black tracking-tight text-blue-600">SMM AUTOMATION PANEL</div>
        <a 
          href="/dashboard/order" 
          className="bg-blue-600 text-white font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-blue-700 transition"
        >
          Client Console Login
        </a>
      </header>

      {/* Main Hero Component */}
      <main className="max-w-4xl mx-auto text-center px-4 py-20 flex-grow flex flex-col justify-center items-center">
        <h1 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tight leading-none mb-6">
          Automated Social Media Growth Platform
        </h1>
        <p className="text-base md:text-lg text-gray-600 max-w-2xl mb-10 leading-relaxed">
          Instantly boost likes, followers, and premium channel subscribers across TikTok, YouTube, Instagram, and Facebook. Secure local settlement processing powered directly by I&M Bank networks.
        </p>

        {/* Dynamic Display Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-3xl mb-12">
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
            <div className="text-2xl font-bold text-gray-800">TikTok</div>
            <div className="text-xs text-gray-500 mt-1">Instant Delivery</div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
            <div className="text-2xl font-bold text-gray-800">YouTube</div>
            <div className="text-xs text-gray-500 mt-1">Premium Subscribers</div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
            <div className="text-2xl font-bold text-gray-800">Instagram</div>
            <div className="text-xs text-gray-500 mt-1">Organic Footprints</div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
            <div className="text-2xl font-bold text-gray-800">Facebook</div>
            <div className="text-xs text-gray-500 mt-1">Page Expansion</div>
          </div>
        </div>

        <a 
          href="/dashboard/order" 
          className="bg-gray-900 text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:bg-gray-800 transition text-md tracking-wide"
        >
          Explore Automation Rates
        </a>
      </main>

      {/* Basic Footer */}
      <footer className="text-center py-6 border-t border-gray-200 text-xs text-gray-400 font-mono">
        © 2026 SMM AUTOMATION PANEL LTD. All Rights Reserved.
      </footer>
    </div>
  );
}
