"use client";

import React from "react";

export default function AnalyticsPage() {
  const stats = [
    { label: "Total Revenue", value: "₹77,000", change: "+12.5%", color: "bg-emerald-500" },
    { label: "Occupancy Rate", value: "68%", change: "+5.2%", color: "bg-indigo-600" },
    { label: "Avg. Daily Rate", value: "₹12,800", change: "-2.1%", color: "bg-slate-900" },
  ];

  const monthlyRevenue = [
    { month: "Jan", value: 12000 },
    { month: "Feb", value: 28000 },
    { month: "Mar", value: 18000 },
    { month: "Apr", value: 22000 },
    { month: "May", value: 15000 },
  ];

  const roomStatus = [
    { label: "Available", count: 8, color: "bg-emerald-500" },
    { label: "Booked", count: 5, color: "bg-indigo-600" },
    { label: "Cleaning", count: 2, color: "bg-amber-500" },
  ];

  const maxRevenue = Math.max(...monthlyRevenue.map(m => m.value), 1);

  return (
    <div className="p-12 space-y-12 animate-in fade-in duration-700 bg-slate-50 min-h-screen">

      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-6xl font-black italic uppercase tracking-tighter text-slate-900">
            Analytics
          </h1>
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.3em] mt-4">
            Performance Overview
          </p>
        </div>
        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
          Last updated: Today
        </span>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {stats.map(stat => (
          <div
            key={stat.label}
            className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm hover:shadow-xl transition-all"
          >
            <p className="text-[10px] uppercase font-black tracking-[0.3em] text-slate-400 mb-4">
              {stat.label}
            </p>
            <div className="flex items-end justify-between">
              <h3 className="text-4xl font-black italic text-slate-900">
                {stat.value}
              </h3>
              <span
                className={`text-[10px] font-black px-3 py-1 rounded-full ${
                  stat.change.startsWith("+")
                    ? "bg-emerald-50 text-emerald-600"
                    : "bg-rose-50 text-rose-600"
                }`}
              >
                {stat.change}
              </span>
            </div>
            <div className={`h-1.5 w-full ${stat.color} rounded-full mt-8 opacity-20`} />
          </div>
        ))}
      </div>

      {/* Monthly Revenue Bar Chart */}
      <div className="bg-white p-12 rounded-[60px] border border-slate-100 shadow-sm">
        <h3 className="text-2xl font-black italic mb-10 text-slate-900">
          Monthly Revenue
        </h3>

        <div className="flex items-end gap-10 h-64">
          {monthlyRevenue.map(m => {
            const barHeight = Math.max((m.value / maxRevenue) * 100, 4);

            return (
              <div
                key={m.month}
                className="flex-1 flex flex-col items-center justify-end"
              >
                {/* Bar Wrapper */}
                <div className="relative w-full h-48 bg-slate-100 rounded-2xl flex items-end group overflow-hidden">

                  {/* Tooltip (hover only) */}
                  <div className="
                    absolute -top-9 left-1/2 -translate-x-1/2
                    scale-0 group-hover:scale-100
                    transition-transform duration-200
                    bg-slate-900 text-white
                    text-[9px] font-black
                    px-3 py-1 rounded-full
                    whitespace-nowrap
                  ">
                    ₹{m.value.toLocaleString("en-IN")}
                  </div>

                  {/* Bar */}
                  <div
                    className="w-full bg-indigo-600 rounded-2xl transition-all duration-500"
                    style={{ height: `${barHeight}%` }}
                  />
                </div>

                {/* Month Label */}
                <p className="mt-4 text-[10px] font-black uppercase tracking-widest text-slate-500">
                  {m.month}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Room Status */}
        <div className="bg-white p-10 rounded-[50px] border border-slate-100 shadow-sm">
          <h3 className="text-2xl font-black italic mb-8 text-slate-900">
            Room Status
          </h3>
          <div className="space-y-6">
            {roomStatus.map(s => (
              <div key={s.label} className="flex justify-between items-center">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                  {s.label}
                </span>
                <span
                  className={`px-4 py-1 rounded-full text-white text-[10px] font-black ${s.color}`}
                >
                  {s.count}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Best Performer */}
        <div className="bg-indigo-600 p-10 rounded-[50px] text-white shadow-xl">
          <p className="text-[10px] uppercase tracking-widest font-black opacity-80">
            Top Performing Category
          </p>
          <h3 className="text-4xl font-black italic mt-4">
            Suites
          </h3>
          <p className="text-sm opacity-80 mt-2">
            Highest revenue contribution this month
          </p>
        </div>
      </div>
    </div>
  );
}
