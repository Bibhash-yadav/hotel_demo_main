"use client";

import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="w-full min-h-screen bg-black text-white overflow-hidden">

      {/* ================= NAVBAR ================= */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-black/50 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold tracking-wide">
            Hotel Luxe
          </h1>

          <div className="flex gap-4">
            <button
              onClick={() => router.push("/customer/login")}
              className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 transition text-sm font-medium"
            >
              Customer Login
            </button>
            <button
              onClick={() => router.push("/login")}
              className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition text-sm font-medium"
            >
              Staff Login
            </button>
          </div>
        </div>
      </nav>

      {/* ================= HERO SECTION ================= */}
      <section className="relative min-h-screen flex items-center">

        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center scale-110"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2400)",
          }}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/90" />

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20 grid md:grid-cols-2 gap-12 items-center">

          {/* Left Content */}
          <div>
            <h2 className="text-5xl md:text-6xl font-bold leading-tight">
              Experience <br />
              <span className="text-emerald-400">Luxury Living</span>
            </h2>

            <p className="mt-6 text-gray-300 max-w-xl">
              Hotel Luxe offers world-class hospitality with elegant rooms,
              premium services, and unforgettable comfort in the heart of the city.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <button
                onClick={() => router.push("/customer/login")}
                className="px-8 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 transition font-medium"
              >
                Book Your Stay
              </button>
              <button
                onClick={() => router.push("/login")}
                className="px-8 py-4 rounded-xl bg-white/10 border border-white/20 hover:bg-white/20 transition font-medium"
              >
                Staff Portal
              </button>
            </div>
          </div>

          {/* Right Highlight Card */}
          <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 shadow-2xl">
            <h3 className="text-2xl font-semibold mb-4">
              Why Choose Hotel Luxe?
            </h3>
            <ul className="space-y-3 text-gray-200 text-sm">
              <li>⭐ 5-Star Premium Hospitality</li>
              <li>🛏️ Elegant Rooms & Royal Suites</li>
              <li>🍽️ Fine Dining & Rooftop Café</li>
              <li>🏊 Infinity Pool & Luxury Spa</li>
              <li>📍 Prime City Location</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ================= FEATURES SECTION ================= */}
      <section className="bg-slate-950 py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h3 className="text-4xl font-bold mb-12">
            Designed for Comfort & Elegance
          </h3>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10">
            {[
              "Luxury Rooms",
              "24×7 Room Service",
              "Smart Booking System",
              "Conference Halls",
              "Fitness & Spa",
              "Secure & Private",
            ].map((feature) => (
              <div
                key={feature}
                className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition"
              >
                <p className="text-lg font-semibold">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-black py-8 text-center text-gray-400 text-sm">
        © 2026 Hotel Luxe · Experience Elegance
      </footer>
    </div>
  );
}
