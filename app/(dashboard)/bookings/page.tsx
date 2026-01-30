"use client";

import React, { useState } from "react";
import { ICONS } from "../../../constants";

const MOCK_BOOKINGS = [
  { id: "BK-101", guestName: "Aarav Sharma", roomNumber: "101", checkIn: "2026-01-15", checkOut: "2026-01-18", amount: 37500, status: "Confirmed" },
  { id: "BK-304", guestName: "Priya Patel", roomNumber: "304", checkIn: "2026-01-16", checkOut: "2026-01-20", amount: 140000, status: "Pending" },
  { id: "BK-202", guestName: "Rohan Gupta", roomNumber: "202", checkIn: "2026-01-14", checkOut: "2026-01-16", amount: 17000, status: "Checked Out" },
];

export default function BookingsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const filteredBookings = MOCK_BOOKINGS.filter((b) => {
    const matchesSearch = b.guestName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || b.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalRevenue = filteredBookings.reduce((acc, b) => acc + b.amount, 0);
  const pendingCount = filteredBookings.filter(b => b.status === "Pending").length;

  const exportCSV = () => {
    const csv =
      "ID,Guest,Room,CheckIn,CheckOut,Amount,Status\n" +
      filteredBookings
        .map(b => `${b.id},${b.guestName},${b.roomNumber},${b.checkIn},${b.checkOut},${b.amount},${b.status}`)
        .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "bookings.csv";
    a.click();
  };

  return (
    <div className="p-12 space-y-10 animate-in fade-in duration-700">

      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-6xl font-black tracking-tighter italic uppercase">Bookings</h1>
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.3em] mt-4 ml-1">
            Guest Registry Terminal
          </p>
        </div>

        <div className="flex gap-4">
          <div className="relative">
            <ICONS.Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
            <input
              type="text"
              placeholder="Search Guest..."
              className="pl-12 pr-6 py-4 bg-white border rounded-2xl text-[10px] font-black uppercase tracking-widest"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <button
            onClick={exportCSV}
            className="px-6 py-4 bg-indigo-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest"
          >
            Export
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border">
          <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Total Bookings</p>
          <p className="text-3xl font-black">{filteredBookings.length}</p>
        </div>
        <div className="bg-white p-6 rounded-3xl border">
          <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Revenue</p>
          <p className="text-3xl font-black">₹{totalRevenue.toLocaleString("en-IN")}</p>
        </div>
        <div className="bg-white p-6 rounded-3xl border">
          <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Pending</p>
          <p className="text-3xl font-black text-amber-600">{pendingCount}</p>
        </div>
      </div>

      {/* Status Filters */}
      <div className="flex gap-3">
        {["All", "Confirmed", "Pending", "Checked Out"].map(s => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className={`px-6 py-3 rounded-2xl text-[9px] font-black uppercase tracking-widest ${
              statusFilter === s ? "bg-indigo-600 text-white" : "bg-white border text-slate-400"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-[40px] border shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr>
              {["ID", "Guest", "Room", "Duration", "Amount", "Status", ""].map(h => (
                <th key={h} className="px-8 py-6 text-[9px] font-black uppercase tracking-widest text-slate-400">
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {filteredBookings.map(b => (
              <tr key={b.id} className="border-t hover:bg-slate-50">
                <td className="px-8 py-6 text-[10px] font-bold text-slate-400">{b.id}</td>
                <td className="px-8 py-6 font-black italic">{b.guestName}</td>
                <td className="px-8 py-6">Room {b.roomNumber}</td>
                <td className="px-8 py-6 text-[10px]">{b.checkIn} → {b.checkOut}</td>
                <td className="px-8 py-6 font-black">₹{b.amount.toLocaleString("en-IN")}</td>
                <td className="px-8 py-6 text-[9px] font-black uppercase">{b.status}</td>
                <td className="px-8 py-6 relative">
                  <button
                    onClick={() => setOpenMenu(openMenu === b.id ? null : b.id)}
                    className="p-3 bg-slate-900 text-white rounded-xl"
                  >
                    <ICONS.Filter size={14} />
                  </button>

                  {openMenu === b.id && (
                    <div className="absolute right-0 mt-2 bg-white border rounded-xl shadow-lg text-[10px]">
                      <button className="block px-6 py-3 hover:bg-slate-50 w-full text-left">View</button>
                      <button className="block px-6 py-3 hover:bg-slate-50 w-full text-left">Mark Confirmed</button>
                    </div>
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
