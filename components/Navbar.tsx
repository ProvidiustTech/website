"use client";
import { useState } from "react";
import  Link from "next/link";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
   <div className="sticky top-5 lg:top-5 z-40 w-full flex items-center justify-center">
    <div className="lg:w-[90%] w-[130%] object-center">
     <nav className="bg-white mt-0 rounded-2xl mx-4 px-6 py-5 flex items-center justify-between shadow-sm">
      {/* Logo */}
  
      <Link href="/">
      <div className="flex items-center gap-2 cursor-pointer">
        <img src="/logo.png" className="w-56 absolute mt-4" alt="" />
      </div>
      </Link>


      {/* Desktop Nav */}
      <div className="hidden ml-40 md:flex items-center gap-8">
        <a href="/" className="text-gray-600 hover:text-gray-900 text-lg cursor-pointer transition-colors">Home</a>
        <a href="/product" className="text-gray-600 hover:text-gray-900 text-lg cursor-pointer transition-colors">Product</a>
        <a href="/pricing" className="text-gray-600 hover:text-gray-900 text-lg cursor-pointer transition-colors">Pricing</a>
        <a href="/founding" className="text-gray-600 hover:text-gray-900 text-lg cursor-pointer transition-colors">Pilot program</a>
        <a href="/resources" className="text-gray-600 hover:text-gray-900 text-lg cursor-pointer transition-colors">Resources</a>
      </div>

      {/* Desktop CTA */}
      <div className="hidden md:block">
        <Link href="/founding">
        <button className="bg-teal-500 hover:bg-teal-600 text-white px-5 py-2.5 rounded-xl text-base font-medium transition-colors cursor-pointer">
          Join the waitlist
        </button>
        </Link>
      </div>

      {/* Mobile hamburger */}
      <button
        className="md:hidden flex flex-col gap-1.5 p-1 cursor-pointer"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span className="w-6 h-0.5 bg-gray-700 block"></span>
        <span className="w-6 h-0.5 bg-gray-700 block"></span>
        <span className="w-6 h-0.5 bg-gray-700 block"></span>
      </button>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="absolute left-4 right-4 mt-80 bg-white rounded-2xl shadow-lg p-6 z-50 flex flex-col gap-4">
          <a href="/" className="text-gray-700 cursor-pointer hover:text-gray-900 transition-colors">Home</a>
          <a href="/product" className="text-gray-700 cursor-pointer hover:text-gray-900 transition-colors">Product</a>
          <a href="/pricing" className="text-gray-700 cursor-pointer hover:text-gray-900 transition-colors">Pricing</a>
          <a href="/founding" className="text-gray-700 cursor-pointer hover:text-gray-900 transition-colors">Pilot program</a>
          <a href="/resources" className="text-gray-700 cursor-pointer hover:text-gray-900 transition-colors">Resources</a>
          <Link href="/founding">
          <button className="bg-teal-500 text-white px-5 py-2.5 rounded-xl text-sm font-semibold cursor-pointer hover:bg-teal-600 transition-colors">
            Join the waitlist
          </button>
          </Link>
        </div>
      )}
    </nav>
   </div>
   </div>
  );
}
