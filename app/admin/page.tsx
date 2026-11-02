"use client";

import React, { useState } from 'react';

// Simulated database records representing incoming orders awaiting confirmation
const MOCK_INCOMING_ORDERS = [
  {
    id: "ord-88392",
    user: "John Doe",
    platform: "youtube",
    service: "subscribers",
    quantity: 5000,
    link: "https://youtube.com",
    reference: "IM-9284710X",
    cost: 6000,
    status: "pending_payment"
  },
  {
    id: "ord-77211",
    user: "Jane Wanjiku",
    platform: "tiktok",
    service: "likes",
    quantity: 10000,
    link: "https://tiktok.com",
    reference: "IM-5521948B",
    cost: 2000,
    status: "processing"
  }
];

export default function AdminDashboard() {
  const [orders, setOrders] = useState(MOCK_INCOMING_ORDERS);

  const handleApproveOrder = (orderId: string) => {
    setOrders(prev =>
      prev.map(ord => 
        ord.id === orderId ? { ...ord, status: "processing" } : ord
      )
    );
    alert(`Order ${orderId} verified against I&M deposits! Delivery pipeline triggered automatically.`);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-800 pb-6 mb-8">
          <div>
            <h1 className="text-3xl font-black tracking-tight text-white">Admin Control Center</h1>
            <p className="text-sm text-gray-400 mt-1">System-wide order payloads, links, and payment overrides.</p>
          </div>
          <div className="mt-4 md:mt-0 bg-red-950/50 border border-red-800 text-red-400 font-mono text-xs px-3 py-1.5 rounded-lg">
            SuperAdmin Active Session
          </div>
        </div>

        {/* Global Statistics Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-gray-800/50 border border-gray-800 p-5 rounded-xl">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block">Total Active Queues</span>
            <span className="text-3xl font-black text-white block mt-1">2,481</span>
          </div>
          <div className="bg-gray-800/50 border border-gray-800 p-5 rounded-xl">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block">Pending Bank Verifications</span>
            <span className="text-3xl font-black text-yellow-500 block mt-1">1</span>
          </div>
          <div className="bg-gray-800/50 border border-gray-800 p-5 rounded-xl">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block">Platform Revenue</span>
            <span className="text-3xl font-black text-green-400 block mt-1">KSh 84,200</span>
          </div>
        </div>

        {/* Live Orders Data Queue Table */}
        <div className="bg-gray-800/30 border border-gray-800 rounded-2xl overflow-hidden shadow-2xl">
          <div className="p-5 border-b border-gray-800 bg-gray-800/40">
            <h3 className="font-bold text-lg text-white">Live Orders Fulfillment Queue</h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-800 text-xs font-semibold text-gray-400 uppercase bg-gray-900/40">
                  <th className="p-4">Client / Order ID</th>
                  <th className="p-4">Platform & Service</th>
                  <th className="p-4">Target Link Payload</th>
                  <th className="p-4">I&M Reference Code</th>
                  <th className="p-4 text-right">Settlement Due</th>
                  <th className="p-4 text-center">Action Trigger</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/50 text-sm">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-800/20 transition-colors">
                    <td className="p-4">
                      <div className="font-semibold text-white">{order.user}</div>
                      <div className="text-xs text-gray-500 font-mono mt-0.5">{order.id}</div>
                    </td>
                    <td className="p-4">
                      <span className="capitalize font-medium text-gray-200">{order.platform}</span>
                      <span className="text-xs text-gray-400 block mt-0.5 capitalize">{order.service} ({order.quantity.toLocaleString()})</span>
                    </td>
                    <td className="p-4 max-w-xs">
                      <div className="truncate text-blue-400 hover:underline font-mono text-xs cursor-pointer">
                        {order.link}
                      </div>
                    </td>
                    <td className="p-4 font-mono text-xs tracking-wider text-yellow-400">
                      {order.reference}
                    </td>
                    <td className="p-4 text-right font-bold text-white font-mono">
                      KSh {order.cost.toLocaleString()}
                    </td>
                    <td className="p-4 text-center">
                      {order.status === 'pending_payment' ? (
                        <button
                          onClick={() => handleApproveOrder(order.id)}
                          className="bg-green-600 hover:bg-green-700 text-white font-semibold text-xs px-3 py-1.5 rounded-lg shadow transition duration-150"
                        >
                          Approve & Deliver
                        </button>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-900/60 text-blue-300 border border-blue-800 font-mono animate-pulse">
                          Delivering...
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
