"use client";

import React, { useState, useEffect } from 'react';

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

  useEffect(() => {
    const ratePerThousand = SMM_SERVICES[platform][service] || 0;
    setTotalCost((quantity / 1000) * ratePerThousand);
  }, [platform, service, quantity]);

  useEffect(() => {
    if (platform === 'youtube' && service === 'followers') setService('subscribers');
    if (platform !== 'youtube' && service === 'subscribers') setService('followers');
  }, [platform]);

  return (
    <div className="container">
      <div className="split-layout">
        <div>
          <h2>Automated Order Engine</h2>
          <p>Paste your public social links to instantly trigger automated delivery profiles.</p>
          
          <form onSubmit={(e) => { e.preventDefault(); alert("Reference logged! Order waiting verification."); }}>
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
                  <option value="subscribers">Subscribers (Premium Tier)</option>
                ) : (
                  <option value="followers">Followers / Account Growth</option>
                )}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Paste Target Item Link Here</label>
              <input type="url" required placeholder="https://..." value={targetLink} onChange={(e) => setTargetLink(e.target.value)} className="form-input" />
            </div>

            <div className="form-group">
              <label className="form-label">Quantity Volume</label>
              <input type="number" min="100" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} className="form-input" />
            </div>

            <div className="price-box">
              <span className="price-label">Calculated Settlement Due:</span>
              <span className="price-value">KSh {totalCost.toLocaleString()}</span>
            </div>

            <button type="submit" className="btn-primary" style={{ width: '100%', padding: '1rem' }}>Confirm & Launch Automation</button>
          </form>
        </div>

        <div className="bank-sidebar">
          <div>
            <div className="bank-badge-row">
              <span className="pulse-dot"></span>
              <h3>I&M Bank Settlement Portal</h3>
            </div>
            <p style={{ fontSize: '0.8rem', color: '#6b7280' }}>Process an electronic money transfer matching the total calculations above directly to our official banking coordinates:</p>
            <div className="bank-details-box">
              <p><strong>Bank:</strong> I&M Bank Kenya</p>
              <p><strong>Name:</strong> SMM AUTOMATION PANEL LTD</p>
              <p><strong>Acc:</strong> 0123 4567 8901</p>
            </div>
          </div>
          <div style={{ marginTop: '1.5rem' }}>
            <label className="form-label">Bank Transaction Reference Code</label>
            <input type="text" required placeholder="E.g., IM-9284710X" value={paymentRef} onChange={(e) => setPaymentRef(e.target.value)} className="form-input input-mono" />
          </div>
        </div>
      </div>
    </div>
  );
}
