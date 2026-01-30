"use client";

import React, { useState, useEffect } from 'react';
import { ICONS } from '../../../constants'; 
import { Room } from '../../../types/hotel';

// Initial Mock Data
const INITIAL_ROOMS: Room[] = [
  { id: '1', roomNumber: '101', type: 'Deluxe', price: 12500, status: 'Available', features: ['WiFi', 'King Bed'], imageUrl: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80' },
  { id: '2', roomNumber: '304', type: 'Suite', price: 35000, status: 'Booked', features: ['Mini-bar', 'Ocean View'], imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80' },
  { id: '3', roomNumber: '202', type: 'Double', price: 8500, status: 'Cleaning', features: ['TV', 'City View'], imageUrl: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80' },
  { id: '4', roomNumber: '405', type: 'Deluxe', price: 14000, status: 'Available', features: ['AC', 'Balcony'], imageUrl: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80' },
  { id: '5', roomNumber: '501', type: 'Suite', price: 42000, status: 'Booked', features: ['Private Pool'], imageUrl: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80' },
  { id: '6', roomNumber: '108', type: 'Single', price: 5500, status: 'Available', features: ['Work Desk'], imageUrl: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80' },
];

export default function HotelRoomsPage() {
  // --- State Management ---
  const [rooms, setRooms] = useState<Room[]>(INITIAL_ROOMS);
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Panel States (Check-in)
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [totalCost, setTotalCost] = useState(0);

  // Add Room Modal States
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newRoom, setNewRoom] = useState<Partial<Room>>({
    roomNumber: '',
    type: 'Single',
    price: 0,
    status: 'Available',
    features: ['WiFi']
  });

  // --- Logic Handlers ---
  const filtered = rooms.filter(r => {
    const matchesFilter = filter === 'All' || r.status === filter;
    const matchesSearch = r.roomNumber.includes(searchQuery) || r.type.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const revenue = rooms.filter(r => r.status === 'Booked').reduce((acc, curr) => acc + curr.price, 0);

  useEffect(() => {
    if (checkIn && checkOut && selectedRoom) {
      const start = new Date(checkIn);
      const end = new Date(checkOut);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setTotalCost(diffDays > 0 ? diffDays * selectedRoom.price : selectedRoom.price);
    }
  }, [checkIn, checkOut, selectedRoom]);

  const handleAddRoom = (e: React.FormEvent) => {
    e.preventDefault();
    const roomToAdd = {
      ...newRoom,
      id: Math.random().toString(36).substr(2, 9),
      imageUrl: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80',
      features: ['WiFi', 'Standard Amenities']
    } as Room;

    setRooms([roomToAdd, ...rooms]);
    setIsAddModalOpen(false);
    setNewRoom({ roomNumber: '', type: 'Single', price: 0, status: 'Available' });
  };

  const deleteRoom = (id: string) => {
    if(confirm("Confirm removal from inventory?")) {
      setRooms(rooms.filter(r => r.id !== id));
    }
  };

  return (
    <div className={`p-12 space-y-12 transition-all duration-700 ${isPanelOpen ? 'pr-[500px]' : ''}`}>
      {/* Header Section */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end gap-8">
        <div className="space-y-6 w-full xl:w-auto">
          <h1 className="text-6xl font-black text-slate-900 tracking-tighter italic uppercase leading-none">Inventory</h1>
          <div className="flex flex-wrap items-center gap-4">
            <div className="relative group">
              <ICONS.Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text"
                placeholder="Search room..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-6 py-4 bg-white border border-slate-200 rounded-2xl w-full md:w-80 text-[10px] font-black uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-indigo-600/20 shadow-sm"
              />
            </div>
            <button 
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center gap-2 px-6 py-4 bg-indigo-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20"
            >
              <ICONS.Add size={14} />
              Add Room
            </button>
            <div className="bg-emerald-500 text-white px-6 py-3 rounded-2xl shadow-xl shadow-emerald-500/20">
              <p className="text-[8px] font-black uppercase tracking-[0.3em] opacity-80 mb-0.5">Live Revenue</p>
              <p className="text-xl font-black tracking-tighter italic">₹{revenue.toLocaleString('en-IN')}</p>
            </div>
          </div>
        </div>

        <div className="flex bg-white p-1.5 rounded-[25px] shadow-sm border border-slate-200">
          {['All', 'Available', 'Booked', 'Cleaning'].map((s) => (
            <button key={s} onClick={() => setFilter(s)} className={`px-6 py-3 rounded-[20px] text-[9px] font-black uppercase transition-all duration-500 ${filter === s ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-900'}`}>
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Grid Section */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-10 pb-20">
        {filtered.map(room => (
          <div key={room.id} className="bg-white rounded-[60px] border border-slate-100 shadow-sm overflow-hidden group hover:shadow-2xl transition-all duration-700">
            <div className="h-72 overflow-hidden relative bg-slate-100">
              <img src={room.imageUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1500ms]" alt="" />
              <div className={`absolute top-8 right-8 backdrop-blur-xl px-5 py-2 rounded-2xl shadow-2xl border border-white/30 text-[8px] font-black uppercase tracking-widest ${room.status === 'Available' ? 'bg-emerald-500 text-white' : 'bg-white/90 text-slate-900'}`}>
                {room.status}
              </div>
            </div>
            
            <div className="p-10">
              <div className="flex justify-between items-end mb-8">
                <div>
                  <p className="text-indigo-600 text-[9px] font-black uppercase tracking-[0.4em] mb-2">{room.type}</p>
                  <h3 className="text-3xl font-black text-slate-900 tracking-tight italic">Room {room.roomNumber}</h3>
                </div>
                <div className="text-right">
                    <p className="text-3xl font-black text-slate-900 tracking-tighter italic">₹{room.price.toLocaleString('en-IN')}</p>
                </div>
              </div>

              <div className="flex gap-4">
                 <button onClick={() => { setSelectedRoom(room); setIsPanelOpen(true); }} className="flex-1 py-5 bg-[#1E2139] text-white font-black rounded-[25px] hover:bg-indigo-600 transition-all duration-500 uppercase text-[9px] tracking-[0.3em]">
                   Manage Stay
                 </button>
                 <button
                                   aria-label="Delete rooms"

                  onClick={() => deleteRoom(room.id)} className="p-5 bg-rose-50 text-rose-600 rounded-[25px] hover:bg-rose-600 hover:text-white transition-all duration-500">
                    <ICONS.Trash size={20} />
                 </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Room Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-lg rounded-[50px] p-12 shadow-2xl space-y-8">
            <h2 className="text-3xl font-black italic uppercase tracking-tighter">Add to Inventory</h2>
            <form onSubmit={handleAddRoom} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <input 
                  placeholder="Room No." 
                  className="w-full bg-slate-50 py-5 px-8 rounded-3xl font-bold outline-none focus:ring-2 focus:ring-indigo-600"
                  onChange={e => setNewRoom({...newRoom, roomNumber: e.target.value})}
                  required
                />
                <select 
                aria-label="Select Room Type" 
                title="Select Room Type"      
                  className="w-full bg-slate-50 py-5 px-8 rounded-3xl font-bold outline-none focus:ring-2 focus:ring-indigo-600"
                  onChange={e => setNewRoom({...newRoom, type: e.target.value as any})}
                >
                  <option value="Single">Single</option>
                  <option value="Double">Double</option>
                  <option value="Deluxe">Deluxe</option>
                  <option value="Suite">Suite</option>
                </select>
              </div>
              <input 
                type="number" 
                placeholder="Nightly Rate (₹)" 
                className="w-full bg-slate-50 py-5 px-8 rounded-3xl font-bold"
                onChange={e => setNewRoom({...newRoom, price: Number(e.target.value)})}
                required
              />
              <div className="flex gap-4">
                <button type="submit" className="flex-1 py-6 bg-indigo-600 text-white font-black rounded-3xl uppercase text-[10px] tracking-widest">Save Room</button>
                <button type="button" onClick={() => setIsAddModalOpen(false)} className="px-8 py-6 bg-slate-100 text-slate-400 font-black rounded-3xl uppercase text-[10px] tracking-widest">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Check-In Slide Panel */}
      <div className={`fixed top-0 right-0 h-full w-[450px] bg-white shadow-[-20px_0_60px_rgba(0,0,0,0.05)] z-50 transform transition-transform duration-700 ease-in-out p-12 overflow-y-auto ${isPanelOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-black text-slate-900 tracking-tighter uppercase italic">Guest Check-In</h2>
          <button onClick={() => setIsPanelOpen(false)} className="p-3 bg-slate-100 rounded-2xl hover:bg-rose-50 text-slate-400 hover:text-rose-600 transition-all font-black text-[10px] uppercase px-4">Close</button>
        </div>

        {selectedRoom && (
          <div className="space-y-10">
            <div className="bg-slate-900 p-8 rounded-[40px] text-white">
              <p className="text-indigo-400 text-[9px] font-black uppercase tracking-[0.4em] mb-2">{selectedRoom.type}</p>
              <h3 className="text-3xl font-black italic">Room {selectedRoom.roomNumber}</h3>
              <div className="mt-6 pt-6 border-t border-white/10 flex justify-between items-center">
                <span className="text-[10px] font-bold uppercase opacity-60">Base Rate</span>
                <span className="text-xl font-black italic text-indigo-400">₹{selectedRoom.price.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="space-y-6">
                <input type="text" placeholder="Full Name" className="w-full bg-slate-50 border-none rounded-3xl py-5 px-8 text-sm font-bold focus:ring-2 focus:ring-indigo-600" />
                <div className="grid grid-cols-2 gap-4">
                  <input type="date" title="Check-in" onChange={(e) => setCheckIn(e.target.value)} className="w-full bg-slate-50 border-none rounded-3xl py-5 px-8 text-sm font-bold" />
                  <input type="date" title="Check-out" onChange={(e) => setCheckOut(e.target.value)} className="w-full bg-slate-50 border-none rounded-3xl py-5 px-8 text-sm font-bold" />
                </div>
            </div>

            <div className="bg-indigo-600 p-8 rounded-[40px] shadow-2xl shadow-indigo-600/30 text-white">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-70">Estimated Total</p>
                  <p className="text-4xl font-black italic tracking-tighter mt-1">₹{totalCost.toLocaleString('en-IN')}</p>
                </div>
                <button
                  aria-label="confirm Bookings"

                 onClick={() => { alert(`Stay Confirmed!`); setIsPanelOpen(false); }} className="bg-white text-indigo-600 p-5 rounded-3xl hover:scale-105 transition-transform">
                  <ICONS.Add size={24} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}