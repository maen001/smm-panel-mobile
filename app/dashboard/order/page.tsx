"use client";

import React, { useState, useEffect } from 'react';
import "../../globals.css"; // Explicit style engine injector hook

const SMM_SERVICES = {
  instagram: { likes: 150, followers: 350, subscribers: 0 },
  tiktok: { likes: 200, followers: 450, subscribers: 0 },
  facebook: { likes: 180, followers: 400, subscribers: 0 },
  youtube: { likes: 300, followers: 0, subscribers: 1200 }
};

export default function OrderPage() {
  const [platform, setPlatform] = useState<'instagram' | 'tiktok' | 'facebook' | 'youtube'>('instagram');
  const [service, setService] = useState<'likes' | 'followers' | 'subscribers'>('likes');
  const [quantity, setQuantity] = useState<number>(1000);
  const [targetLink, setTargetLink] = useState<string>('');
  const [paymentRef, setPaymentRef] = useState<string>('');
  const [totalCost, setTotalCost] = useState<number>(150);
  const [loading, setLoading] = useState<boolean>(false);

  // Dynamic automatic price calculation engine
  useEffect(() => {
    const ratePerThousand = SMM_SERVICES[platform][service] || 0;
    setTotalCost((quantity / 1000) * ratePerThousand);
  }, [platform, service, quantity]);

  // Prevent invalid service configurations on specialized tiers
  useEffect(() => {
    if (platform === 'youtube' && service === 'followers') setService('subscribers');
    if (platform !== 'youtube' && service === 'subscribers') setService('followers');
  }, [platform]);

  // Actual Next.js backend endpoint route database persistence function
  const handleCreateOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetLink || !paymentRef) {
      return alert("Please completely fill out target link and payment reference fields.");
    }
    setLoading(true);

    try {
      // Dispatches complete link payload down to your live server API pipeline
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ platform, service, quantity, targetLink, paymentRef, totalCost })
      });

      const result = await response.json();

      if (response.ok) {
        alert(`🎉 Order Automated Successfully!\nLink synced to background processing queue.\nTracking Node ID: ${result.order[0].id}`);
        setTargetLink('');
        setPaymentRef('');
      } else {
        alert(`Database Sync Interrupted: ${result.error || 'Unknown server fault.'}`);
      }
    } catch (err) {
      alert("Network transmission error occurred trying to sync cloud database lines.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      {/* Header Module Navbar */}
      <header style={{ padding: '1rem 0', borderBottom: '1px solid #e5e7eb', marginBottom: '2rem', background: 'transparent', boxShadow: 'none' }}>
        <div className="brand-logo" style={{ fontSize: '1.25rem' }}>Client Control Panel</div>
        <button 
          onClick={() => window.location.href = "/login"} 
          className="btn-primary" 
          style={{ padding: '0.5rem 1rem', fontSize: '0.85rem', background: '#edf2f7', color: '#4a5568', border: '1px solid #cbd5e1' }}
        >
          Disconnect Console
        </button>
      </header>

      {/* Main Split Interface Area Grid layout */}
      <div className="split-layout">
        
        {/* Left Side: Order Formulation Component */}
        <div>
          <h2>Automated Order Engine</h2>
          <p>Paste target payload links to activate background fulfillment routines.</p>
          
          <form onSubmit={handleCreateOrder}>
            <div className="form-group">
              <label className="form-label">Target Network Space</label>
              <select value={platform} onChange={(e: any) => setPlatform(e.target.value)}>
                <option value="instagram">Instagram Footprint</option>
                <option value="tiktok">TikTok Network</option>
                <option value="facebook">Facebook Space</option>
                <option value="youtube">YouTube Engine</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Service Type</label>
              <select value={service} onChange={(e: any) => setService(e.target.value)}>
                <option value="likes">Likes / Engagement Boost</option>
                {platform === 'youtube' ? (
                  <option value="subscribers">Subscribers (Premium Channel Tier)</option>
                ) : (
                  <option value="followers">Followers / Page Expansion</option>
                )}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Paste Target Item Link Here</label>
              <input 
                type="url" 
                required 
                placeholder="https://..." 
                value={targetLink} 
                onChange={(e) => setTargetLink(e.target.value)} 
                className="form-input" 
              />
            </div>

            <div className="form-group">
              <label className="form-label">Quantity Volume</label>
              <input 
                type="number" 
                min="100" 
                step="100" 
                value={quantity} 
                onChange={(e) => setQuantity(Number(e.target.value))} 
                className="form-input" 
              />
            </div>

            <div className="price-box">
              <span className="price-label">Calculated Settlement Due:</span>
              <span className="price-value">KSh {totalCost.toLocaleString()}</span>
            </div>

            <button 
              type="submit" 
              className="btn-primary" 
              style={{ width: '100%', padding: '1rem', borderRadius: '0.75rem', fontWeight: 'bold' }} 
              disabled={loading}
            >
              {loading ? "Writing Database Entry..." : "Confirm & Launch Automation"}
            </button>
          </form>
        </div>

        {/* Right Side: Bank Operations Settlement Module */}
        <div className="bank-sidebar" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div className="bank-badge-row">
              <span className="pulse-dot"></span>
              <h3>I&M Bank Settlement Portal</h3>
            </div>
            <p style={{ fontSize: '0.8rem', color: '#6b7280', lineHeight: '1.4' }}>
              Fulfillment routines engage automatically once administrative accounting nodes verify inbound reference codes against daily statement drops.
            </p>
            <div className="bank-details-box">
              <p><strong>Bank Entity:</strong> I&M Bank Kenya</p>
              <p><strong>Account Name:</strong> SMM AUTOMATION PANEL LTD</p>
              <p><strong>Account Number:</strong> 0123 4567 8901</p>
              <p><strong>Branch Node:</strong> Nakuru Main Branch</p>
            </div>
          </div>
          
          <div style={{ marginTop: '1.5rem' }}>
            <label className="form-label">Bank Transaction Reference Code</label>
            <input 
              type="text" 
              required 
              placeholder="E.g., IM-9284710X" 
              value={paymentRef} 
              onChange={(e) => setPaymentRef(e.target.value)} 
              className="form-input input-mono" 
              style={{ letterSpacing: '0.05em', fontWeight: 'bold' }}
            />
          </div>
        </div>

      </div>
    </div>
  );
}
