import React from 'react';

export default function PublicLandingPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: 'screen' }}>
      
      <header>
        <div className="brand-logo">SMM AUTOMATION PANEL</div>
        <a href="/dashboard/order" className="btn-primary">Client Console Login</a>
      </header>

      <div className="container">
        <div className="hero-section">
          <h1>Automated Social Media Growth Platform</h1>
          <p>Instantly boost likes, followers, and premium channel subscribers across TikTok, YouTube, Instagram, and Facebook. Secure local settlement processing powered directly by I&M Bank networks.</p>

          <div className="platform-grid">
            <div className="card">
              <div className="card-title">TikTok</div>
              <div className="card-subtitle">Instant Delivery</div>
            </div>
            <div className="card">
              <div className="card-title">YouTube</div>
              <div className="card-subtitle">Premium Subscribers</div>
            </div>
            <div className="card">
              <div className="card-title">Instagram</div>
              <div className="card-subtitle">Organic Footprints</div>
            </div>
            <div className="card">
              <div className="card-title">Facebook</div>
              <div className="card-subtitle">Page Expansion</div>
            </div>
          </div>

          <a href="/login" className="btn-dark">Explore Automation Rates</a>
        </div>
      </div>

      <footer>
        © 2026 SMM AUTOMATION PANEL LTD. All Rights Reserved.
      </footer>
    </div>
  );
}
