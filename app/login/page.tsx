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

    // Simulated authorization path leading directly to active panel space
    setTimeout(() => {
      setLoading(false);
      alert(isSignUp ? "Account initialized! Redirecting to setup..." : "Login validation verified!");
      window.location.href = "/dashboard/order";
    }, 1200);
  };

  return (
    <div className="container" style={{ display: 'flex', alignItems: 'center', minHeight: '80vh' }}>
      <div className="auth-container">
        <h2 style={{ textAlign: 'center', marginBottom: '0.5rem' }}>
          {isSignUp ? "Create Workspace" : "Client Console Access"}
        </h2>
        <p style={{ textAlign: 'center', fontSize: '0.85rem', marginBottom: '1.5rem', color: '#6b7280' }}>
          {isSignUp ? "Register to start processing automated campaigns" : "Enter your coordinates to deploy link tracking"}
        </p>

        <form onSubmit={handleAuthAction}>
          {isSignUp && (
            <div className="form-group">
              <label className="form-label">Full Name / Corporate Title</label>
              <input 
                type="text" 
                required 
                placeholder="e.g. John Doe" 
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="form-input" 
              />
            </div>
          )}

          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input 
              type="email" 
              required 
              placeholder="name@company.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input" 
            />
          </div>

          <div className="form-group">
            <label className="form-label">Account Access Password</label>
            <input 
              type="password" 
              required 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input" 
            />
          </div>

          <button 
            type="submit" 
            className="btn-primary" 
            style={{ width: '100%', padding: '0.85rem', marginTop: '0.5rem' }}
            disabled={loading}
          >
            {loading ? "Authenticating Session..." : isSignUp ? "Establish SMM Account" : "Secure Sign In"}
          </button>
        </form>

        <div className="auth-toggle-text">
          {isSignUp ? "Already utilizing our automation?" : "New platform candidate?"}{" "}
          <span className="auth-toggle-link" onClick={() => setIsSignUp(!isSignUp)}>
            {isSignUp ? "Access Console Here" : "Establish Framework"}
          </span>
        </div>
      </div>
    </div>
  );
}
