"use client";

import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase Web Client safely using public keys
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface SMMOrder {
  id: string;
  target_link: string;
  quantity: number;
  total_price: number;
  status: "pending_payment" | "processing" | "completed" | "failed";
  transaction_reference: string;
  created_at: string;
}

export default function AdminDashboard() {
  const [orders, setOrders] = useState<SMMOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  // 1. Fetch Orders from Database on Load
  const fetchLiveOrders = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setOrders(data || []);
    } catch (err: any) {
      console.error("Admin Fetch Fault:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (supabaseUrl && supabaseAnonKey) {
      fetchLiveOrders();
    }
  }, []);

  // 2. Action Handler: Update Payment Verification Status Loops
  const handleUpdateStatus = async (orderId: string, nextStatus: SMMOrder["status"]) => {
    setUpdatingId(orderId);
    try {
      const { error } = await supabase
        .from("orders")
        .update({ status: nextStatus })
        .eq("id", orderId);

      if (error) throw error;

      // Optimistically update UI state matrix
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status: nextStatus } : o))
      );
    } catch (err: any) {
      alert(`Status update failed: ${err.message}`);
    } finally {
      setUpdatingId(null);
    }
  };

  // Metrics Aggregation Math
  const totalVolumeOrders = orders.length;
  const pendingSettlements = orders.filter((o) => o.status === "pending_payment").length;

  return (
    <div className="min-h-screen bg-gray-50 p-4 font-sans text-gray-900">
      <div className="max-w-5xl mx-auto space-y-5">
        
        {/* Header Node */}
        <div className="flex justify-between items-center bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-gray-900">Admin Control Queue</h1>
            <p className="text-xs text-gray-500 font-medium mt-0.5">SMM Panel Order Management Matrix</p>
          </div>
          <button 
            onClick={fetchLiveOrders}
            className="px-3.5 py-1.5 bg-gray-100 hover:bg-gray-200 active:scale-95 text-gray-700 text-xs font-semibold rounded-xl transition-all"
          >
            Refresh Queue
          </button>
        </div>

        {/* Aggregated Analytical Grid Layout */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Total Received</span>
            <span className="text-2xl font-black text-gray-900 mt-1 block">{totalVolumeOrders}</span>
          </div>
          <div className="bg-white p-4 rounded-xl border border-blue-100 shadow-sm bg-blue-50/20">
            <span className="text-[10px] font-bold text-blue-500 uppercase tracking-wider block">Awaiting Verification</span>
            <span className="text-2xl font-black text-blue-900 mt-1 block">{pendingSettlements}</span>
          </div>
        </div>

        {/* Live Tracking Table Interface Layout Container */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto w-full">
            <table className="min-w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 font-bold uppercase tracking-wider text-[10px]">
                  <th className="p-4">Target Link Payload</th>
                  <th className="p-4">I&M Bank Code</th>
                  <th className="p-4 text-right">Quantity</th>
                  <th className="p-4 text-center">Status</th>
                  <th className="p-4 text-right">Actions Matrix</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 font-medium">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-gray-400 font-normal">
                      Querying streaming system lines...
                    </td>
                  </tr>
                ) : orders.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-gray-400 font-normal">
                      No customer tracking entries found inside network.
                    </td>
                  </tr>
                ) : (
                  orders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50/60 transition-colors">
                      <td className="p-4 max-w-[180px] truncate text-blue-600 font-mono">
                        <a href={order.target_link} target="_blank" rel="noreferrer" className="hover:underline">
                          {order.target_link}
                        </a>
                      </td>
                      <td className="p-4 font-mono font-bold tracking-wide text-gray-700">
                        {order.transaction_reference}
                      </td>
                      <td className="p-4 text-right font-bold text-gray-900">
                        {order.quantity.toLocaleString()}
                      </td>
                      <td className="p-4 text-center">
                        <span className={`px-2 py-1 rounded-md text-[10px] font-bold tracking-wide uppercase ${
                          order.status === "completed" ? "bg-green-50 text-green-700" :
                          order.status === "failed" ? "bg-red-50 text-red-700" :
                          order.status === "processing" ? "bg-yellow-50 text-yellow-700" :
                          "bg-blue-50 text-blue-700"
                        }`}>
                          {order.status.replace("_", " ")}
                        </span>
                      </td>
                      <td className="p-4 text-right space-x-1.5 whitespace-nowrap">
                        <button
                          disabled={updatingId !== null}
                          onClick={() => handleUpdateStatus(order.id, "completed")}
                          className="px-2 py-1 bg-green-600 hover:bg-green-700 disabled:opacity-40 text-white rounded-lg font-semibold transition-all shadow-sm"
                        >
                          Approve
                        </button>
                        <button
                          disabled={updatingId !== null}
                          onClick={() => handleUpdateStatus(order.id, "failed")}
                          className="px-2 py-1 bg-red-50 hover:bg-red-100 text-red-600 disabled:opacity-40 rounded-lg font-semibold transition-all"
                        >
                          Reject
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
