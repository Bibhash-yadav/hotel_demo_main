"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";

type RoomCard = {
  id: string;
  name: string;
  type: "Single" | "Double" | "Deluxe" | "Suite";
  price: number;
  rating: number;
  available: number;
  bed: string;
  size: string;
  amenities: string[];
  location: string;
  image: string;
};

const ROOMS: RoomCard[] = [
  {
    id: "1",
    name: "Elite Single",
    type: "Single",
    price: 5500,
    rating: 4.4,
    available: 3,
    bed: "Single Bed",
    size: "180 sq.ft",
    amenities: ["WiFi", "AC", "Work Desk"],
    location: "2nd Floor",
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80",
  },
  {
    id: "2",
    name: "Urban Double",
    type: "Double",
    price: 8500,
    rating: 4.5,
    available: 2,
    bed: "Queen Bed",
    size: "260 sq.ft",
    amenities: ["WiFi", "TV", "City View"],
    location: "3rd Floor",
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80",
  },
  {
    id: "3",
    name: "Deluxe Comfort",
    type: "Deluxe",
    price: 12500,
    rating: 4.7,
    available: 4,
    bed: "King Bed",
    size: "320 sq.ft",
    amenities: ["WiFi", "AC", "Balcony", "Mini Bar"],
    location: "5th Floor",
    image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80",
  },
  {
    id: "4",
    name: "Executive Deluxe",
    type: "Deluxe",
    price: 14500,
    rating: 4.8,
    available: 1,
    bed: "King Bed",
    size: "350 sq.ft",
    amenities: ["WiFi", "Balcony", "Smart TV"],
    location: "6th Floor",
    image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80",
  },
  {
    id: "5",
    name: "Bloom Suite",
    type: "Suite",
    price: 28000,
    rating: 4.9,
    available: 2,
    bed: "King Bed",
    size: "520 sq.ft",
    amenities: ["Living Area", "Mini Bar", "Ocean View"],
    location: "8th Floor",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80",
  },
  {
    id: "6",
    name: "Royal Suite",
    type: "Suite",
    price: 42000,
    rating: 5.0,
    available: 1,
    bed: "King Bed",
    size: "680 sq.ft",
    amenities: ["Private Lounge", "Jacuzzi", "Premium View"],
    location: "Penthouse",
    image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80",
  },
  {
    id: "7",
    name: "Compact Single",
    type: "Single",
    price: 4800,
    rating: 4.2,
    available: 5,
    bed: "Single Bed",
    size: "160 sq.ft",
    amenities: ["WiFi", "Fan"],
    location: "1st Floor",
    image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80",
  },
  {
    id: "8",
    name: "Premium Double",
    type: "Double",
    price: 9800,
    rating: 4.6,
    available: 3,
    bed: "Queen Bed",
    size: "300 sq.ft",
    amenities: ["AC", "Smart TV", "Balcony"],
    location: "4th Floor",
    image: "https://images.unsplash.com/photo-1591088398332-8a7791972843?q=80",
  },
  {
    id: "9",
    name: "City View Deluxe",
    type: "Deluxe",
    price: 13500,
    rating: 4.7,
    available: 2,
    bed: "King Bed",
    size: "330 sq.ft",
    amenities: ["City View", "Mini Bar", "AC"],
    location: "7th Floor",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80",
  },
  {
    id: "10",
    name: "Skyline Suite",
    type: "Suite",
    price: 36000,
    rating: 4.9,
    available: 1,
    bed: "King Bed",
    size: "600 sq.ft",
    amenities: ["Sky View", "Living Area", "Luxury Bath"],
    location: "Top Floor",
    image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80",
  },
];

export default function CustomerRoomsPage() {
  const router = useRouter();
  const customerName = "Bibhash";

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"All" | RoomCard["type"]>("All");
  const [selectedRoom, setSelectedRoom] = useState<RoomCard | null>(null);

  const filteredRooms = ROOMS.filter((r) => {
    const matchSearch =
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.type.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "All" || r.type === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="min-h-screen bg-slate-50 px-4 sm:px-8 lg:px-12 py-8">

      {/* 🔝 NAVBAR */}
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-3xl font-black tracking-tight">Hotel Luxe</h1>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-black">
            {customerName[0]}
          </div>
          <span className="font-semibold text-slate-700">{customerName}</span>
          <button
            onClick={() => router.push("/")}
            className="px-4 py-2 text-sm font-bold rounded-lg bg-slate-900 text-white hover:bg-rose-600 transition"
          >
            Logout
          </button>
        </div>
      </div>

      {/* 🔍 SEARCH & FILTER */}
      <div className="flex flex-wrap gap-3 mb-12">
        <input
          placeholder="Search rooms..."
          onChange={(e) => setSearch(e.target.value)}
          className="px-5 py-3 rounded-xl border w-72"
        />

        {["All", "Single", "Double", "Deluxe", "Suite"].map((t) => (
          <button
            key={t}
            onClick={() => setFilter(t as any)}
            className={`px-5 py-3 rounded-xl font-bold ${
              filter === t ? "bg-indigo-600 text-white" : "bg-white"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* 🏨 ROOMS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-12">
        {filteredRooms.map((room, i) => (
          <motion.div
            key={room.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            whileHover={{ y: -10 }}
            className="bg-white rounded-[32px] shadow-xl overflow-hidden"
          >
            <div className="relative h-64 overflow-hidden">
              <img
                src={room.image}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
              />
              <span className="absolute top-5 left-5 bg-indigo-600 text-white text-xs px-4 py-1 rounded-full font-bold">
                {room.type}
              </span>
              <span className="absolute top-5 right-5 bg-white px-3 py-1 rounded-full text-sm font-bold">
                ⭐ {room.rating}
              </span>
            </div>

            <div className="p-6 space-y-3">
              <h3 className="text-2xl font-black">{room.name}</h3>
              <p className="text-sm text-slate-500">
                {room.bed} • {room.size} • {room.location}
              </p>

              <div className="flex flex-wrap gap-2">
                {room.amenities.map((a) => (
                  <span
                    key={a}
                    className="text-xs px-3 py-1 bg-slate-100 rounded-full font-semibold"
                  >
                    {a}
                  </span>
                ))}
              </div>

              <div className="flex justify-between items-center pt-4">
                <div>
                  <p className="text-xl font-black text-emerald-600">
                    ₹{room.price.toLocaleString("en-IN")}
                  </p>
                  <p className="text-xs text-slate-400">
                    {room.available} units available
                  </p>
                </div>

                <button
                  onClick={() => setSelectedRoom(room)}
                  className="px-6 py-3 rounded-full bg-slate-900 text-white text-xs font-bold tracking-widest hover:bg-indigo-600 transition"
                >
                  VIEW & BOOK
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 📦 BOOKING MODAL */}
      <AnimatePresence>
        {selectedRoom && (
          <motion.div
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white w-full max-w-xl mx-4 rounded-3xl p-8"
            >
              <h2 className="text-3xl font-black mb-2">
                {selectedRoom.name}
              </h2>
              <p className="text-slate-500 mb-4">
                {selectedRoom.type} • {selectedRoom.size}
              </p>

              <ul className="list-disc ml-6 mb-6">
                {selectedRoom.amenities.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>

              <div className="flex justify-between items-center">
                <span className="text-2xl font-black text-emerald-600">
                  ₹{selectedRoom.price}
                </span>

                <div className="flex gap-3">
                  <button
                    onClick={() => setSelectedRoom(null)}
                    className="px-6 py-3 bg-slate-100 rounded-xl"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      alert("Booking Confirmed 🎉");
                      setSelectedRoom(null);
                    }}
                    className="px-6 py-3 bg-emerald-600 text-white rounded-xl"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
