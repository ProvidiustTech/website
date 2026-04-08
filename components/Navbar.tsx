"use client";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white rounded-2xl mx-4 mt-4 px-6 py-4 flex items-center justify-between shadow-sm">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-teal-400 flex items-center justify-center">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M4 4h4v4H4zM10 4h4v4h-4zM4 10h4v4H4z" fill="white" opacity="0.9"/>
          </svg>
        </div>
        <span className="font-bold text-[#1a1a2e] text-lg">ProvidiusTech</span>
      </div>

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center gap-8">
        <a href="#" className="text-gray-600 hover:text-gray-900 text-sm font-medium">Product</a>
        <a href="#" className="text-gray-600 hover:text-gray-900 text-sm font-medium">Features</a>
        <a href="#" className="text-gray-600 hover:text-gray-900 text-sm font-medium">Pricing</a>
        <a href="#" className="text-gray-600 hover:text-gray-900 text-sm font-medium">Resources</a>
      </div>

      {/* Desktop CTA */}
      <div className="hidden md:block">
        <button className="bg-teal-500 hover:bg-teal-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors">
          Book A Call
        </button>
      </div>

      {/* Mobile hamburger */}
      <button
        className="md:hidden flex flex-col gap-1.5 p-1"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span className="w-6 h-0.5 bg-gray-700 block"></span>
        <span className="w-6 h-0.5 bg-gray-700 block"></span>
        <span className="w-6 h-0.5 bg-gray-700 block"></span>
      </button>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="absolute top-20 left-4 right-4 bg-white rounded-2xl shadow-lg p-6 z-50 flex flex-col gap-4">
          <a href="#" className="text-gray-700 font-medium">Product</a>
          <a href="#" className="text-gray-700 font-medium">Features</a>
          <a href="#" className="text-gray-700 font-medium">Pricing</a>
          <a href="#" className="text-gray-700 font-medium">Resources</a>
          <button className="bg-teal-500 text-white px-5 py-2.5 rounded-xl text-sm font-semibold">
            Book A Call
          </button>
        </div>
      )}
    </nav>
  );
}
