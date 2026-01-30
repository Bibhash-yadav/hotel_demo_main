"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ICONS } from "../../constants";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [showNotifications, setShowNotifications] = useState(false);

  const navItems = [
    { label: "Inventory", href: "/rooms" },
    { label: "Bookings", href: "/bookings" },
    { label: "Guests", href: "/guests" },
    { label: "Analytics", href: "/analytics" },
  ];

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">

      {/* Sidebar */}
      <aside className="w-80 bg-[#1E2139] p-8 flex flex-col justify-between hidden lg:flex fixed h-full shadow-2xl">
        <div>
          {/* Logo */}
          <Link href="/rooms" className="flex items-center gap-4 mb-14">
            <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-xl shadow-indigo-600/30">
              <span className="text-white font-black text-2xl italic">H</span>
            </div>
            <h2 className="text-white text-xl font-black uppercase italic tracking-tight">
              Luxe Hotel
            </h2>
          </Link>

          {/* Navigation */}
          <nav className="space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center px-6 py-4 rounded-[22px] transition-all duration-300
                  ${
                    pathname === item.href
                      ? "bg-indigo-600 text-white shadow-xl shadow-indigo-600/30"
                      : "text-slate-300 hover:bg-white/5 hover:text-white"
                  }`}
              >
                {/* TEXT MADE BIGGER HERE */}
                <span className="font-black text-[12px] uppercase tracking-[0.15em]">
                  {item.label}
                </span>
              </Link>
            ))}
          </nav>
        </div>

        {/* Staff Terminal (COLOR UPDATED) */}
        <Link
          href="/login"
          className="
            p-8 rounded-[40px]
            bg-gradient-to-br from-indigo-600/30 to-purple-600/20
            border border-indigo-500/30
            hover:from-indigo-600/40 hover:to-purple-600/30
            transition-all
            shadow-xl
          "
        >
          <p className="text-indigo-200 text-[9px] font-black uppercase tracking-[0.35em] mb-4">
            Staff Terminal
          </p>

          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-indigo-600/40 border border-indigo-400/40 flex items-center justify-center">
              <div className="w-4 h-4 bg-indigo-300 rounded-full animate-pulse" />
            </div>
            <div>
              <p className="text-white text-[12px] font-black uppercase tracking-widest leading-none">
                Admin Portal
              </p>
              <span className="text-indigo-300 text-[9px] font-bold mt-1">
                Logout
              </span>
            </div>
          </div>
        </Link>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-80 relative">

        {/* Header */}
        <header className="sticky top-0 z-30 flex justify-end p-8 pointer-events-none">
          <div className="relative pointer-events-auto">
            <button
              aria-label="Notification"
              onClick={() => setShowNotifications(!showNotifications)}
              className="w-14 h-14 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:shadow-xl transition-all relative"
            >
              <ICONS.Filter className="rotate-90" size={20} />
              <span className="absolute top-4 right-4 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white" />
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-4 w-80 bg-white rounded-[32px] shadow-2xl border border-slate-100 p-6 space-y-4 animate-in fade-in zoom-in duration-300">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Live Alerts
                </p>
                <div className="space-y-3">
                  <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100">
                    <p className="text-amber-800 text-[10px] font-bold">
                      Checkout Impending
                    </p>
                    <p className="text-slate-600 text-[9px] mt-1">
                      Room 304 (Priya Patel) leaves in 2 hours.
                    </p>
                  </div>
                  <div className="p-4 bg-indigo-50 rounded-2xl border border-indigo-100">
                    <p className="text-indigo-800 text-[10px] font-bold">
                      Cleaning Complete
                    </p>
                    <p className="text-slate-600 text-[9px] mt-1">
                      Room 202 is now ready for Check-In.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </header>

        <div className="-mt-24">{children}</div>
      </main>
    </div>
  );
}
