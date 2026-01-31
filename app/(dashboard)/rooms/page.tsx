"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ICONS } from "../../../constants";
import { Room } from "../../../types/hotel";

/* ================= DATA ================= */
const INITIAL_ROOMS: Room[] = [
  { id: "1", roomNumber: "101", type: "Deluxe", price: 12500, status: "Available", features: ["WiFi", "King Bed"], imageUrl: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80" },
  { id: "2", roomNumber: "304", type: "Suite", price: 35000, status: "Booked", features: ["Mini-bar", "Ocean View"], imageUrl: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80" },
  { id: "3", roomNumber: "202", type: "Double", price: 8500, status: "Cleaning", features: ["TV", "City View"], imageUrl: "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80" },
  { id: "4", roomNumber: "405", type: "Deluxe", price: 14000, status: "Available", features: ["AC", "Balcony"], imageUrl: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80" },
  { id: "5", roomNumber: "501", type: "Suite", price: 42000, status: "Booked", features: ["Private Pool"], imageUrl: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80" },
  { id: "6", roomNumber: "108", type: "Single", price: 5500, status: "Available", features: ["Work Desk"], imageUrl: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80" },
];

export default function HotelRoomsPage() {
  /* ================= STATE ================= */
  const [rooms, setRooms] = useState<Room[]>(INITIAL_ROOMS);
  const [filter, setFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [totalCost, setTotalCost] = useState(0);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newRoom, setNewRoom] = useState<Partial<Room>>({
    roomNumber: "",
    type: "Single",
    price: 0,
    status: "Available",
    features: ["WiFi"],
  });

  /* ================= HELPERS ================= */
  const updateRoomStatus = (id: string, status: Room["status"]) => {
    setRooms((prev) =>
      prev.map((room) => (room.id === id ? { ...room, status } : room))
    );
  };

  const filtered = rooms.filter((r) => {
    const matchesFilter = filter === "All" || r.status === filter;
    const matchesSearch =
      r.roomNumber.includes(searchQuery) ||
      r.type.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const revenue = rooms
    .filter((r) => r.status === "Booked")
    .reduce((acc, curr) => acc + curr.price, 0);

  useEffect(() => {
    if (checkIn && checkOut && selectedRoom) {
      const diffDays = Math.ceil(
        (new Date(checkOut).getTime() - new Date(checkIn).getTime()) /
        (1000 * 60 * 60 * 24)
      );
      setTotalCost(diffDays > 0 ? diffDays * selectedRoom.price : selectedRoom.price);
    }
  }, [checkIn, checkOut, selectedRoom]);

  const handleAddRoom = (e: React.FormEvent) => {
    e.preventDefault();
    const roomToAdd = {
      ...newRoom,
      id: Math.random().toString(36).slice(2),
      imageUrl: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80",
      features: ["WiFi", "Standard Amenities"],
    } as Room;

    setRooms([roomToAdd, ...rooms]);
    setIsAddModalOpen(false);
    setNewRoom({ roomNumber: "", type: "Single", price: 0, status: "Available" });
  };

  const deleteRoom = (id: string) => {
    if (confirm("Confirm removal from inventory?")) {
      setRooms(rooms.filter((r) => r.id !== id));
    }
  };

  /* ================= UI ================= */
  return (
    <div className={`p-12 space-y-12 ${isPanelOpen ? "pr-[500px]" : ""}`}>

      {/* ================= HEADER ================= */}
      <div className="flex flex-col xl:flex-row justify-between gap-8">
        <div className="space-y-6">
          <h1 className="text-6xl font-black tracking-tighter italic uppercase">
            Inventory
          </h1>

          <div className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm w-fit">
            <div className="relative">
              <ICONS.Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input
                placeholder="Search room..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-6 py-4 bg-white border rounded-2xl w-80 text-[10px] font-black uppercase tracking-widest"
              />
            </div>

            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-6 py-4 bg-indigo-600 text-white rounded-2xl font-black uppercase text-[10px]"
            >
              Add Room
            </button>

            <div className="bg-emerald-500 text-white px-6 py-3 rounded-2xl">
              <p className="text-[8px] uppercase opacity-80">Live Revenue</p>
              <p className="text-xl font-black">
                ₹{revenue.toLocaleString("en-IN")}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-white p-2 rounded-full border border-slate-200 shadow-sm w-fit">
          {["All", "Available", "Booked", "Cleaning"].map((s) => {
            const active = filter === s;

            return (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`
          px-5 py-2 rounded-full
          text-[10px] font-black uppercase tracking-widest
          transition-all duration-300
          ${active
                    ? "bg-indigo-600 text-white shadow-md"
                    : "text-slate-500 hover:text-slate-900 hover:bg-slate-100"
                  }
        `}
              >
                {s}
              </button>
            );
          })}
        </div>

      </div>

      {/* ================= GRID ================= */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
        {filtered.map((room, i) => (
          <motion.div
            key={room.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            whileHover={{ y: -6 }}
            className="bg-white rounded-[60px] overflow-hidden shadow hover:shadow-2xl transition"
          >
            {/* IMAGE */}
            <div className="h-72 relative overflow-hidden">
              <motion.img
                src={room.imageUrl}
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 0.6 }}
              />

              <div className={`absolute top-8 right-8 px-5 py-2 rounded-2xl text-[8px] font-black uppercase ${room.status === "Available"
                  ? "bg-emerald-500 text-white"
                  : room.status === "Booked"
                    ? "bg-indigo-600 text-white"
                    : "bg-amber-500 text-white"
                }`}>
                {room.status}
              </div>
            </div>

            {/* DETAILS */}
            <div className="p-10 space-y-6">
              <div>
                <h3 className="text-3xl font-black italic">
                  Room {room.roomNumber}
                </h3>
                <p className="text-xs uppercase tracking-widest text-indigo-600 font-black mt-1">
                  {room.type}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {room.features.map((f) => (
                  <span
                    key={f}
                    className="text-xs px-3 py-1 bg-slate-100 rounded-full font-semibold"
                  >
                    {f}
                  </span>
                ))}
              </div>

              <div className="flex justify-between items-center">
                <p className="text-3xl font-black">₹{room.price}</p>

                {room.status === "Available" && (
                  <button
                    onClick={() => {
                      setSelectedRoom(room);
                      setIsPanelOpen(true);
                    }}
                    className="px-6 py-3 bg-slate-900 text-white rounded-xl uppercase text-[9px]"
                  >
                    Check In
                  </button>
                )}

                {room.status === "Booked" && (
                  <button
                    onClick={() => updateRoomStatus(room.id, "Cleaning")}
                    className="px-6 py-3 bg-amber-500 text-white rounded-xl uppercase text-[9px]"
                  >
                    Check Out
                  </button>
                )}

                {room.status === "Cleaning" && (
                  <button
                    onClick={() => updateRoomStatus(room.id, "Available")}
                    className="px-6 py-3 bg-emerald-500 text-white rounded-xl uppercase text-[9px]"
                  >
                    Mark Available
                  </button>
                )}
              </div>

              <button
                onClick={() => deleteRoom(room.id)}
                className="
    group
    flex items-center justify-center
    w-11 h-11
    rounded-full
    border border-rose-200
    bg-white
    text-rose-500
    hover:bg-rose-500 hover:text-white
    hover:border-rose-500
    transition-all duration-300
    shadow-sm hover:shadow-lg
  "
                title="Delete Room"
              >
                <ICONS.Trash
                  size={18}
                  className="transition-transform duration-300 group-hover:scale-110"
                />
              </button>

            </div>
          </motion.div>
        ))}
      </div>

      {/* ================= CHECK-IN PANEL (UNCHANGED) ================= */}
      <div className={`fixed top-0 right-0 h-full w-[450px] bg-white p-12 transition-transform duration-700 ${isPanelOpen ? "translate-x-0" : "translate-x-full"
        }`}>
        <h2 className="text-3xl font-black mb-10">Guest Check-In</h2>

        {selectedRoom && (
          <>
            <input
              placeholder="Guest Name"
              className="w-full mb-4 py-4 px-6 rounded-3xl bg-slate-50"
            />
            <div className="grid grid-cols-2 gap-4 mb-6">
              <input type="date" onChange={(e) => setCheckIn(e.target.value)} className="py-4 px-6 rounded-3xl bg-slate-50" />
              <input type="date" onChange={(e) => setCheckOut(e.target.value)} className="py-4 px-6 rounded-3xl bg-slate-50" />
            </div>

            <div className="bg-indigo-600 p-8 rounded-[40px] text-white">
              <p className="text-sm uppercase opacity-70">Estimated Total</p>
              <p className="text-4xl font-black">₹{totalCost}</p>

              <button
                onClick={() => {
                  updateRoomStatus(selectedRoom.id, "Booked");
                  alert("Check-In Successful!");
                  setIsPanelOpen(false);
                }}
                className="mt-6 w-full bg-white text-indigo-600 py-4 rounded-3xl font-black"
              >
                Confirm Check-In
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
