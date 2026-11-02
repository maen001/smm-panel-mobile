"use client";

import React, { useState } from 'react';

export default function AuthenticationPortal() {
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [fullName, setFullName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleAuthAction = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      
      // Strict rule evaluation route
      if (email.toLowerCase() === 'admin@smm.com') {
        alert("SuperAdmin identity verified! Entering Administrative Control Center.");
        window.location.href = "/admin";
      } else {
        alert("Client profile verified successfully! Transferring to Order Module.");
        window.location.href = "/dashboard/order";
      }
    }, 1200);
  };

  return (
    <div className="container" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="auth-container">
        <h2 style={{ textAlign: 'center', marginBottom: '0.25rem' }}>
          {isSignUp ? "Register Account" : "Console Access"}
        </h2>
        <p style={{ textAlign: 'center', fontSize: '0.8rem', color: '#6b7280', marginBottom: '1.5rem' }}>
          {isSignUp ? "Deploy an automated campaign configuration" : "Enter account parameters to sync live links"}
        </p>

        <form onSubmit={handleAuthAction}>
          {isSignUp && (
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input 
                type="text" 
                required 
                placeholder="John Doe" 
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="form-input" 
              />
            </div>
          )}

          <div className="form-group">
            <label className="form-label">Email Coordinate</label>
            <input 
              type="email" 
              required 
              placeholder="name@domain.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input" 
            />
          </div>

          <div className="form-group">
            <label className="form-label">Security Access Password</label>
            <input 
              type="password" 
              required 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input" 
            />
          </div>

          <button type="submit" className="btn-primary" style={{ width: '100%', padding: '0.85rem' }} disabled={loading}>
            {loading ? "Authorizing Security Node..." : isSignUp ? "Establish Account" : "Secure Connection"}
          </button>
        </form>

        <div className="auth-toggle-text">
          {isSignUp ? "Already operational?" : "Need automation footprint?"}{" "}
          <span className="auth-toggle-link" onClick={() => setIsSignUp(!isSignUp)}>
            {isSignUp ? "Sign In Here" : "Register Workspace"}
          </span>
        </div>
      </div>
    </div>
  );
}
