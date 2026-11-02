"use client";

import React, { useState, useEffect } from 'react';

// Pricing engine structure representing real data from our Supabase setup
const SMM_SERVICES = {
  instagram: { likes: 150, followers: 350, subscribers: 0 },
  tiktok: { likes: 200, followers: 450, subscribers: 0 },
  facebook: { likes: 180, followers: 400, subscribers: 0 },
  youtube: { likes: 300, followers: 0, subscribers: 1200 } // Premium Rate Tier
};

export default function OrderPage() {
  const [platform, setPlatform] = useState<'instagram' | 'tiktok' | 'facebook' | 'youtube'>('instagram');
  const [service, setService] = useState<'likes' | 'followers' | 'subscribers'>('likes');
  const [quantity, setQuantity] = useState<number>(1000);
  const [targetLink, setTargetLink] = useState<string>('');
  const [paymentRef, setPaymentRef] = useState<string>('');
  const [totalCost, setTotalCost] = useState<number>(150);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Dynamic automatic price calculation engine
  useEffect(() => {
    const ratePerThousand = SMM_SERVICES[platform][service] || 0;
    setTotalCost((quantity / 1000) * ratePerThousand);
  }, [platform, service, quantity]);

  // Prevent invalid configurations (e.g. choosing subscribers on Instagram)
  useEffect(() => {
    if (platform === 'youtube' && service === 'followers') setService('subscribers');
    if (platform !== 'youtube' && service === 'subscribers') setService('followers');
  }, [platform]);

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetLink || !paymentRef) return alert("Please fill out your target link and payment reference code.");
    
    setIsSubmitting(true);
    
    // Simulates secure submission directly to backend order logs
    setTimeout(() => {
      alert("Order logged successfully! Delivery pipeline is on hold awaiting manual confirmation of your I&M reference code.");
      setIsSubmitting(false);
      setTargetLink('');
      setPaymentRef('');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 bg-white shadow-xl rounded-2xl border border-gray-100 p-6 md:p-8">
        
        {/* Left Side: Dynamic Link Pasting Form */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">Automated Order Engine</h2>
          <p className="text-sm text-gray-500 mb-6">Paste your public social links to instantly trigger automated delivery profiles.</p>
          
          <form onSubmit={handlePlaceOrder} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Target Network Space</label>
              <select 
                value={platform} 
                onChange={(e: any) => setPlatform(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
              >
                <option value="instagram">Instagram Footprint</option>
                <option value="tiktok">TikTok Network</option>
                <option value="facebook">Facebook Space</option>
                <option value="youtube">YouTube Engine</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Service Type</label>
              <select 
                value={service} 
                onChange={(e: any) => setService(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
              >
                <option value="likes">Likes / Post Engagement Boost</option>
                {platform === 'youtube' ? (
                  <option value="subscribers">Subscribers (Premium Tier)</option>
                ) : (
                  <option value="followers">Followers / Account Growth</option>
                )}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Paste Target Item Link Here</label>
              <input 
                type="url" 
                required
                placeholder="e.g., https://tiktok.com..."
                value={targetLink}
                onChange={(e) => setTargetLink(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Quantity Volume</label>
              <input 
                type="number" 
                min="100" 
                step="100"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
              />
            </div>

            <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 flex justify-between items-center">
              <span className="font-medium text-blue-900 text-sm">Calculated Settlement Due:</span>
              <span className="text-xl font-black text-blue-600">KSh {totalCost.toLocaleString()}</span>
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold p-4 rounded-xl transition duration-200 shadow-md"
            >
              {isSubmitting ? "Syncing Delivery Pipeline..." : "Confirm & Launch Automation"}
            </button>
          </form>
        </div>

        {/* Right Side: Bank Processing Coordinates Portal */}
        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <span className="bg-green-600 h-2.5 w-2.5 rounded-full animate-pulse"></span>
              <h3 className="text-lg font-bold text-gray-900">I&M Bank Settlement Portal</h3>
            </div>
            <p className="text-xs text-gray-600 mb-4 leading-relaxed">
              To activate instant delivery, process an electronic money transfer matching the total KSh calculations directly to our official corporate banking node below:
            </p>
            
            <div className="space-y-2 text-xs bg-white p-4 rounded-xl border border-gray-200 shadow-sm font-mono text-gray-700">
              <p><strong>Bank Entity:</strong> I&M Bank Kenya</p>
              <p><strong>Account Name:</strong> SMM AUTOMATION PANEL LTD</p>
              <p><strong>Account Number:</strong> 0123 4567 8901</p>
              <p><strong>Branch Location:</strong> Nakuru Main Branch</p>
            </div>
          </div>

          <div className="mt-6 border-t border-gray-200 pt-4">
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Bank Transaction Reference Code
            </label>
            <input 
              type="text" 
              required
              placeholder="e.g., IM-9284710X"
              value={paymentRef}
              onChange={(e) => setPaymentRef(e.target.value)}
              className="w-full p-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 font-mono tracking-wider text-sm uppercase"
            />
            <p className="text-[11px] text-gray-400 mt-2 leading-tight">
              Fulfillment systems instantly deploy tracking nodes once the processing dashboard matches this transaction record with incoming bank deposits.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
