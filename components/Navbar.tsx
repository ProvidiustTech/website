"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  
  const pathname = usePathname(); // ← Get current path

  // Helper function to check active link
  const isActive = (path: string) => {
    if (path === "/") return pathname === "/";
    return pathname?.startsWith(path);
  };

  const activeClass = "text-teal-500 font-medium";

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (buttonRef.current && buttonRef.current.contains(event.target as Node)) {
        return;
      }
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <div className="fixed top-5 lg:top-5 z-40 w-full flex items-center justify-center">
      <div className="lg:w-[90%] w-[130%]">
        <nav className="bg-white mt-0 rounded-2xl mx-4 px-6 py-5 flex items-center justify-between shadow-sm">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer">
              <img
                src="/logo.png"
                className="w-56 absolute mt-1 xl:left-28 left-[1%]"
                alt=""
              />
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden ml-40 md:flex items-center gap-8">
            <Link
              href="/"
              className={`text-lg transition-colors cursor-pointer ${
                isActive("/") ? activeClass : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Home
            </Link>

            <Link
              href="/product"
              className={`text-lg transition-colors cursor-pointer ${
                isActive("/product") ? activeClass : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Product
            </Link>

            <Link
              href="/pricing"
              className={`text-lg transition-colors cursor-pointer ${
                isActive("/pricing") ? activeClass : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Pricing
            </Link>

            <Link
              href="/founding"
              className={`text-lg transition-colors cursor-pointer ${
                isActive("/founding") ? activeClass : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Pilot program
            </Link>

            <Link
              href="/blog"
              className={`text-lg transition-colors cursor-pointer ${
                isActive("/blog") ? activeClass : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Resources
            </Link>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Link href="/founding">
              <button className="bg-teal-500 hover:bg-teal-600 text-white px-5 py-2.5 rounded-xl text-base font-medium transition-colors">
               Join our Founding companies program
              </button>
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            ref={buttonRef}
            className="md:hidden flex flex-col gap-1.5 p-1 cursor-pointer relative w-6 h-6"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {/* Hamburger lines... (unchanged) */}
            <span
              className={`block h-0.5 bg-gray-900 rounded transition-all duration-400 origin-left
              ${menuOpen ? 'relative top-[-5px] w-6 rotate-45 translate-y-1.5' : 'w-6'}`}
            ></span>
            <span
              className={`block h-0.5 bg-gray-900 rounded transition-all duration-400
              ${menuOpen ? 'opacity-0' : 'w-6'}`}
            ></span>
            <span
              className={`block h-0.5 bg-gray-900 rounded transition-all duration-400 origin-left
              ${menuOpen ? 'relative w-6 -rotate-45 -translate-y-1.5' : 'w-3'}`}
            ></span>
          </button>

          {/* Mobile menu */}
          {menuOpen && (
            <div
              ref={menuRef}
              className="absolute left-4 right-4 mt-96 bg-white rounded-2xl shadow-lg p-6 z-50 flex flex-col gap-4"
            >
              <Link
                href="/"
                className={`text-lg ${isActive("/") ? activeClass : "text-gray-700 hover:text-gray-900"}`}
                onClick={() => setMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/product"
                className={`text-lg ${isActive("/product") ? activeClass : "text-gray-700 hover:text-gray-900"}`}
                onClick={() => setMenuOpen(false)}
              >
                Product
              </Link>
              <Link
                href="/pricing"
                className={`text-lg ${isActive("/pricing") ? activeClass : "text-gray-700 hover:text-gray-900"}`}
                onClick={() => setMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link
                href="/founding"
                className={`text-lg ${isActive("/founding") ? activeClass : "text-gray-700 hover:text-gray-900"}`}
                onClick={() => setMenuOpen(false)}
              >
                Pilot program
              </Link>
              <Link
                href="/blog"
                className={`text-lg ${isActive("/blog") ? activeClass : "text-gray-700 hover:text-gray-900"}`}
                onClick={() => setMenuOpen(false)}
              >
                Resources
              </Link>

              <Link href="/founding" onClick={() => setMenuOpen(false)}>
                <button className="bg-teal-500 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-teal-600 w-full">
                  Join our Founding companies program
                </button>
              </Link>
            </div>
          )}
        </nav>
      </div>
    </div>
  );
}