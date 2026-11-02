"use client";

import React, { useState } from 'react';
import "../globals.css"; // Explicit style engine injector hook

const INITIAL_QUEUE_PAYLOADS = [
  { id: "Q-902", client: "John Doe", platform: "YouTube", service: "Subscribers", quantity: 5000, link: "https://youtube.com...", reference: "IM-9284710X", cost: 6000, status: "pending" },
  { id: "Q-871", client: "Jane Wanjiku", platform: "TikTok", service: "Likes", quantity: 10000, link: "https://tiktok.com...", reference: "IM-5521948B", cost: 2000, status: "delivering" }
];

export default function AdminDashboard() {
  const [queues, setQueues] = useState(INITIAL_QUEUE_PAYLOADS);

  const fireOverridePipeline = (id: string) => {
    setQueues(prev => prev.map(q => q.id === id ? { ...q, status: "delivering" } : q));
    alert(`Payment match confirmed! Background automated delivery triggered for entry ${id}.`);
  };

  return (
    <div className="container">
      {/* Header Panel */}
      <div className="admin-header-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '2px solid #e5e7eb' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '1.75rem' }}>Admin Control Center</h1>
          <p style={{ fontSize: '0.8rem', color: '#6b7280', margin: '0.25rem 0 0 0' }}>System-wide order payloads, links, and payment overrides.</p>
        </div>
        <button onClick={() => window.location.href = "/login"} className="btn-primary" style={{ background: '#7f1d1d', padding: '0.5rem 1rem', fontSize: '0.8rem' }}>Exit Admin Mode</button>
      </div>

      {/* Grid Display Metrics Rows */}
      <div className="admin-stat-row">
        <div className="stat-box" style={{ background: '#1f2937', color: 'white', padding: '1.25rem', borderRadius: '0.75rem', marginBottom: '1rem' }}>
          <span style={{ fontSize: '0.75rem', color: '#9ca3af', textTransform: 'uppercase', fontWeight: 600 }}>Active Pipelines</span>
          <h2 style={{ color: 'white', margin: '0.25rem 0 0 0', fontSize: '1.75rem', fontWeight: 900 }}>2,481</h2>
        </div>
        <div className="stat-box pending" style={{ background: '#1f2937', color: 'white', padding: '1.25rem', borderRadius: '0.75rem', marginBottom: '1rem', borderLeft: '4px solid #f59e0b' }}>
          <span style={{ fontSize: '0.75rem', color: '#9ca3af', textTransform: 'uppercase', fontWeight: 600 }}>Awaiting Verification</span>
          <h2 style={{ color: '#f59e0b', margin: '0.25rem 0 0 0', fontSize: '1.75rem', fontWeight: 900 }}>1</h2>
        </div>
        <div className="stat-box revenue" style={{ background: '#1f2937', color: 'white', padding: '1.25rem', borderRadius: '0.75rem', marginBottom: '1rem', borderLeft: '4px solid #10b981' }}>
          <span style={{ fontSize: '0.75rem', color: '#9ca3af', textTransform: 'uppercase', fontWeight: 600 }}>Total Settled Vault</span>
          <h2 style={{ color: '#10b981', margin: '0.25rem 0 0 0', fontSize: '1.75rem', fontWeight: 900 }}>KSh 84,200</h2>
        </div>
      </div>

      <h3 style={{ marginBottom: '1rem', marginTop: '1.5rem' }}>Live Orders Fulfillment Queue</h3>
      
      {/* Scrollable Data Table Container */}
      <div className="table-responsive-container">
        <table>
          <thead>
            <tr>
              <th>Client / Queue ID</th>
              <th>Platform Details</th>
              <th>Target Link Payload</th>
              <th>I&M Bank Code</th>
              <th style={{ textAlign: 'right' }}>Cost</th>
              <th style={{ textAlign: 'center' }}>Manual Trigger</th>
            </tr>
          </thead>
          <tbody>
            {queues.map((q) => (
              <tr key={q.id}>
                <td>
                  <strong style={{ color: '#111827' }}>{q.client}</strong>
                  <div style={{ fontSize: '0.7rem', color: '#9ca3af', fontFamily: 'monospace' }}>{q.id}</div>
                </td>
                <td>
                  <strong style={{ color: '#111827' }}>{q.platform}</strong>
                  <div style={{ fontSize: '0.7rem', color: '#6b7280' }}>{q.service} ({q.quantity.toLocaleString()})</div>
                </td>
                <td>
                  <div style={{ fontFamily: 'monospace', fontSize: '0.75rem', color: '#2563eb', maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {q.link}
                  </div>
                </td>
                <td style={{ fontFamily: 'monospace', color: '#d97706', fontWeight: 700, fontSize: '0.8rem' }}>
                  {q.reference}
                </td>
                <td style={{ fontWeight: 700, textAlign: 'right', fontFamily: 'monospace' }}>
                  KSh {q.cost.toLocaleString()}
                </td>
                <td style={{ textAlign: 'center' }}>
                  {q.status === 'pending' ? (
                    <button 
                      onClick={() => fireOverridePipeline(q.id)} 
                      className="btn-primary" 
                      style={{ padding: '0.4rem 0.75rem', fontSize: '0.75rem', background: '#10b981', border: 'none', borderRadius: '0.5rem' }}
                    >
                      Approve & Deliver
                    </button>
                  ) : (
                    <span className="badge-delivering">Delivering...</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
