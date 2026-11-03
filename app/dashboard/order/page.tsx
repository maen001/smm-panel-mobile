"use client";

import React, { useState } from "react";

export default function OrderPage() {
  // 1. Core Form Input States
  const [serviceType, setServiceType] = useState("Likes / Engagement Boost");
  const [targetLink, setTargetLink] = useState("https://facebook.com");
  const [quantity, setQuantity] = useState("1000");
  const [transactionReference, setTransactionReference] = useState("IM-TEST900");
  
  // UI Status Tracking
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 2. Server-side Rate Synchronizer (KSh 180 per 1,000 units)
  const baseRatePerThousand = 180.00;
  const calculatedSettlement = (Number(quantity || 0) / 1000) * baseRatePerThousand;

  // 3. Form Submit Transaction Dispatcher
  const handleOrderSubmission = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          targetLink: targetLink.trim(),
          quantity: quantity.trim(),
          serviceType: serviceType,
          transactionReference: transactionReference.trim(),
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Server responded with an unknown fault state.");
      }

      alert(`🎉 Order Created Successfully! Database Reference ID: ${result.data[0].id}`);
      
      // Reset payment input tracker on success
      setTransactionReference("");
    } catch (error: any) {
      console.error("Submission Trace Fault:", error);
      alert(`Database Sync Interrupted: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-start p-4 font-sans text-gray-900">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mt-2">
        
        {/* Form Container */}
        <form onSubmit={handleOrderSubmission} className="p-5 space-y-4">
          
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Service Type</label>
            <select 
              value={serviceType}
              onChange={(e) => setServiceType(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>Likes / Engagement Boost</option>
              <option>Followers / Channel Growth</option>
              <option>Subscribers / Premium Reach</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Paste Target Item Link Here</label>
            <input 
              type="url"
              required
              value={targetLink}
              onChange={(e) => setTargetLink(e.target.value)}
              placeholder="https://..."
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Quantity Volume</label>
            <input 
              type="number"
              required
              min="100"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Pricing Banner Node */}
          <div className="bg-blue-50/60 rounded-xl p-4 flex justify-between items-center border border-blue-100/50">
            <span className="text-xs font-medium text-blue-800">Calculated Settlement Due:</span>
            <span className="text-lg font-bold text-blue-900">KSh {calculatedSettlement.toLocaleString()}</span>
          </div>

          {/* Core Dispatch Trigger CTA */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 rounded-xl text-sm font-semibold text-white transition-all ${
              isSubmitting 
                ? "bg-blue-900/40 cursor-not-allowed" 
                : "bg-blue-600 hover:bg-blue-700 active:scale-[0.98]"
            }`}
          >
            {isSubmitting ? "Writing Database Entry..." : "Submit Verification Settlement"}
          </button>

          {/* Manual Checkout Wire Instructions Module */}
          <div className="pt-4 border-t border-gray-100 space-y-3 text-xs text-gray-600">
            <div className="bg-gray-50 rounded-xl p-3 space-y-2 border border-gray-100">
              <p><strong>Bank Entity:</strong> I&M Bank Kenya</p>
              <p><strong>Account Name:</strong> SMM AUTOMATION PANEL LTD</p>
              <p><strong>Account Number:</strong> 0123 4567 8901</p>
              <p><strong>Branch Node:</strong> Nakuru Main Branch</p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Bank Transaction Reference Code</label>
              <input 
                type="text"
                required
                placeholder="e.g., IM-TEST900"
                value={transactionReference}
                onChange={(e) => setTransactionReference(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs font-mono uppercase tracking-wider focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

        </form>
      </div>
    </div>
  );
}
