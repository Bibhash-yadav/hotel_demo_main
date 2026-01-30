"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ICONS } from '../../constants';

export default function StaffLoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulating secure authentication delay
    setTimeout(() => {
      router.push('/rooms');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#0F172A] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-emerald-600/10 rounded-full blur-[120px]" />

      <div className="w-full max-w-md relative z-10">
        {/* Branding */}
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-indigo-600 rounded-[30px] flex items-center justify-center shadow-2xl shadow-indigo-600/40 mx-auto mb-6">
            <span className="text-white font-black text-4xl italic">H</span>
          </div>
          <h1 className="text-4xl font-black text-white tracking-tighter uppercase italic">Luxe Hotel</h1>
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.4em] mt-2">Internal Staff Terminal</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="bg-white/5 backdrop-blur-2xl border border-white/10 p-10 rounded-[50px] shadow-2xl space-y-6">
          <div className="space-y-2">
            <label htmlFor="staffId" className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Staff ID</label>
            <input 
              id="staffId"
              type="text" 
              required
              placeholder="Enter Terminal ID" 
              className="w-full bg-white/5 border border-white/10 rounded-3xl py-5 px-8 text-white text-sm font-bold focus:ring-2 focus:ring-indigo-600 outline-none transition-all placeholder:text-slate-600" 
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="pass" className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Access Code</label>
            <input 
              id="pass"
              type="password" 
              required
              placeholder="••••••••" 
              className="w-full bg-white/5 border border-white/10 rounded-3xl py-5 px-8 text-white text-sm font-bold focus:ring-2 focus:ring-indigo-600 outline-none transition-all placeholder:text-slate-600" 
            />
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full py-6 bg-indigo-600 text-white font-black rounded-[30px] shadow-xl shadow-indigo-600/20 hover:bg-indigo-500 transition-all uppercase text-[10px] tracking-[0.3em] flex items-center justify-center gap-3"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <span>Secure Entry</span>
                <ICONS.Filter size={14} className="rotate-90" />
              </>
            )}
          </button>
        </form>

        <p className="text-center mt-8 text-slate-600 text-[9px] font-bold uppercase tracking-widest">
          Authorized Personnel Only • IP: 192.168.0.102
        </p>
      </div>
    </div>
  );
}