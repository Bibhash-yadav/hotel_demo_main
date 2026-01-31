"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CustomerLoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setLoading(true);

  const formData = new FormData(e.currentTarget);

  const query = new URLSearchParams({
    name: formData.get("name") as string,
    mobile: formData.get("mobile") as string,
    email: formData.get("email") as string,
    gender: formData.get("gender") as string,
    age: formData.get("age") as string,
  }).toString();

  setTimeout(() => {
    router.push(`/customer/booking?${query}`);
  }, 1000);
};


  return (
    <div className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">

      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-110"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2000)",
        }}
      />
      <div className="absolute inset-0 bg-black/80" />

      {/* Form Card */}
      <form
        onSubmit={handleSubmit}
        className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl p-8 shadow-2xl"
      >
        <h2 className="text-3xl font-semibold text-white text-center">
          Guest Details
        </h2>
        <p className="text-gray-300 text-sm text-center mt-1 mb-8">
          Please enter your details to continue
        </p>

        {/* Name */}
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          required
          className="w-full mb-4 px-4 py-2.5 rounded-lg bg-white/20 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-emerald-500"
        />

        {/* Mobile */}
        <input
          type="tel"
          placeholder="Mobile Number"
            name="mobile"
          required
          pattern="[0-9]{10}"
          className="w-full mb-4 px-4 py-2.5 rounded-lg bg-white/20 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-emerald-500"
        />

        {/* Email */}
        <input
          type="email"
          placeholder="Email Address"
            name="email"
          required
          className="w-full mb-4 px-4 py-2.5 rounded-lg bg-white/20 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-emerald-500"
        />

        {/* Gender */}
        <select
          required
          className="w-full mb-4 px-4 py-2.5 rounded-lg bg-white/20 text-white outline-none focus:ring-2 focus:ring-emerald-500"
            name="gender"
        >
          <option value="" className="text-black">
            Select Gender
          </option>
          <option value="male" className="text-black">
            Male
          </option>
          <option value="female" className="text-black">
            Female
          </option>
          <option value="other" className="text-black">
            Other
          </option>
        </select>

        {/* Age */}
        <input
          type="number"
          placeholder="Age"
            name="age"
          min={1}
          max={120}
          required
          className="w-full mb-6 px-4 py-2.5 rounded-lg bg-white/20 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-emerald-500"
        />

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="
            w-full py-3 rounded-xl
            bg-gradient-to-r from-emerald-500 to-emerald-600
            text-white font-medium tracking-wide
            shadow-lg shadow-emerald-600/30
            hover:shadow-emerald-600/60
            hover:-translate-y-[1px]
            transition-all
          "
        >
          {loading ? "Please wait..." : "Continue"}
        </button>

        {/* Footer text */}
        <p className="mt-6 text-xs text-gray-400 text-center">
          Your information is safe and secure
        </p>
      </form>
    </div>
  );
}
