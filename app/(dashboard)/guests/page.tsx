"use client";

import React, { useState } from "react";
import { Star, Clock } from "lucide-react";

type Stay = {
  room: string;
  checkIn: string;
  checkOut: string;
  amount: number;
};

type Guest = {
  name: string;
  email: string;
  phone: string;
  visits: number;
  status: "VIP" | "Regular" | "New";
  rating: number;
  history: Stay[];
};

const INITIAL_GUESTS: Guest[] = [
  {
    name: "Aarav Sharma",
    email: "aarav@email.com",
    phone: "+91 98765 43210",
    visits: 4,
    status: "VIP",
    rating: 4,
    history: [
      { room: "101", checkIn: "2025-01-12", checkOut: "2025-01-15", amount: 37500 },
      { room: "305", checkIn: "2024-11-02", checkOut: "2024-11-05", amount: 42000 },
    ],
  },
  {
    name: "Priya Patel",
    email: "priya@email.com",
    phone: "+91 91234 56789",
    visits: 1,
    status: "New",
    rating: 4.5,
    history: [],
  },
  {
    name: "Rohan Gupta",
    email: "rohan@email.com",
    phone: "+91 99887 76655",
    visits: 12,
    status: "Regular",
    rating: 5,
    history: [
      { room: "501", checkIn: "2024-12-01", checkOut: "2024-12-10", amount: 420000 },
    ],
  },
  {
    name: "Bibhash Yadav",
    email: "yadav@email.com",
    phone: "+91 98878 567890",
    visits: 8,
    status: "New",
    rating: 4.5,
    history: [],
  },
];

export default function GuestsPage() {
  const [guests, setGuests] = useState<Guest[]>(INITIAL_GUESTS);
  const [search, setSearch] = useState("");
  const [activeGuest, setActiveGuest] = useState<Guest | null>(null);

  const filteredGuests = guests.filter(
    (g) =>
      g.name.toLowerCase().includes(search.toLowerCase()) ||
      g.email.toLowerCase().includes(search.toLowerCase())
  );

  const updateRating = (email: string, rating: number) => {
    setGuests((prev) =>
      prev.map((g) => (g.email === email ? { ...g, rating } : g))
    );
  };

  const avgRating =
    guests.reduce((sum, g) => sum + g.rating, 0) / guests.length || 0;

  return (
    <div className="p-12 space-y-12 animate-in fade-in duration-700">
      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-6xl font-black text-slate-900 italic uppercase">
          Guest Registry
        </h1>
        <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.3em]">
          Customer Relationship Management
        </p>

        <div className="flex gap-6 mt-6">
          <input
            placeholder="Search guest..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-6 py-4 rounded-2xl border border-slate-200 text-sm font-bold w-80"
          />

          <div className="bg-indigo-600 text-white px-6 py-3 rounded-2xl">
            <p className="text-[8px] uppercase tracking-widest font-black opacity-70">
              Avg Rating
            </p>
            <p className="text-xl font-black">⭐ {avgRating.toFixed(1)}</p>
          </div>
        </div>
      </div>

      {/* Guest List */}
      <div className="grid grid-cols-1 gap-6">
        {filteredGuests.map((guest) => (
          <div
            key={guest.email}
            className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm flex justify-between"
          >
            {/* Left */}
            <div className="flex gap-6">
              <div className="w-16 h-16 bg-slate-100 rounded-3xl flex items-center justify-center font-black text-slate-400 text-xl">
                {guest.name.charAt(0)}
              </div>

              <div>
                <h3 className="text-2xl font-black italic">{guest.name}</h3>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">
                  {guest.email} • {guest.phone}
                </p>

                {/* Rating */}
                <div className="flex gap-1 mt-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={16}
                      onClick={() => updateRating(guest.email, star)}
                      className={`cursor-pointer ${
                        star <= guest.rating
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-slate-300"
                      }`}
                    />
                  ))}
                </div>

                {/* History Button */}
                <button
                  onClick={() => setActiveGuest(guest)}
                  className="mt-4 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-indigo-600"
                >
                  <Clock size={14} /> View History
                </button>
              </div>
            </div>

            {/* Right */}
            <div className="flex items-center gap-10">
              <div className="text-right">
                <p className="text-[8px] font-black text-slate-300 uppercase tracking-widest">
                  Visits
                </p>
                <p className="text-xl font-black">{guest.visits}</p>
              </div>

              <div
                className={`px-6 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest ${
                  guest.status === "VIP"
                    ? "bg-amber-500 text-white"
                    : guest.status === "Regular"
                    ? "bg-indigo-100 text-indigo-600"
                    : "bg-slate-100 text-slate-400"
                }`}
              >
                {guest.status}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* History Modal */}
      {activeGuest && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-white w-full max-w-xl rounded-[40px] p-10 space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-black italic">
                {activeGuest.name}'s History
              </h2>
              <button
                onClick={() => setActiveGuest(null)}
                className="text-sm font-black text-slate-400"
              >
                Close
              </button>
            </div>

            {activeGuest.history.length === 0 ? (
              <p className="text-slate-400 text-sm">No stays recorded.</p>
            ) : (
              activeGuest.history.map((stay, i) => (
                <div
                  key={i}
                  className="bg-slate-50 p-6 rounded-3xl flex justify-between"
                >
                  <div>
                    <p className="font-black">Room {stay.room}</p>
                    <p className="text-[10px] uppercase text-slate-400 font-bold">
                      {stay.checkIn} → {stay.checkOut}
                    </p>
                  </div>
                  <p className="font-black text-indigo-600">
                    ₹{stay.amount.toLocaleString("en-IN")}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
