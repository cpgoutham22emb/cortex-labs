"use client";

import { useState } from "react";

import {
  FaBars,
  FaTimes,
} from "react-icons/fa";

export default function Navbar() {
  const [mobileMenu, setMobileMenu] = useState(false);
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#050816]/80 backdrop-blur-md border-b border-white/10">

      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <div>
          <h1 className="text-2xl font-bold tracking-wide">
            CORTEX <span className="text-blue-500">LABS</span>
          </h1>

          <p className="text-[10px] text-gray-400 tracking-[3px]">
            ENGINEERING INTELLIGENCE
          </p>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm text-gray-300">

          <a href="#home" className="hover:text-blue-500 transition">
            Home
          </a>

          <a href="#services" className="hover:text-blue-500 transition">
            Services
          </a>

          <a href="#projects" className="hover:text-blue-500 transition">
            Projects
          </a>

          <a href="#about" className="hover:text-blue-500 transition">
            About
          </a>

        </nav>

        {/* Desktop Button */}
        <button className="hidden md:block bg-blue-600 hover:bg-blue-700 transition px-5 py-2 rounded-lg text-sm font-medium">
          Contact Us
        </button>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setMobileMenu(true)}
        >
          <FaBars />
        </button>

      </div>

      {/* MOBILE MENU */}
      {mobileMenu && (

        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50">

          <div className="absolute right-0 top-0 w-[280px] h-full bg-[#0B1220] border-l border-white/10 p-8">

            {/* Close */}
            <div className="flex justify-end">

              <button
                className="text-2xl"
                onClick={() => setMobileMenu(false)}
              >
                <FaTimes />
              </button>

            </div>

            {/* Links */}
            <div className="flex flex-col gap-8 mt-16 text-lg">

              <a
                href="#home"
                onClick={() => setMobileMenu(false)}
                className="hover:text-blue-500 transition"
              >
                Home
              </a>

              <a
                href="#services"
                onClick={() => setMobileMenu(false)}
                className="hover:text-blue-500 transition"
              >
                Services
              </a>

              <a
                href="#projects"
                onClick={() => setMobileMenu(false)}
                className="hover:text-blue-500 transition"
              >
                Projects
              </a>

              <a
                href="#about"
                onClick={() => setMobileMenu(false)}
                className="hover:text-blue-500 transition"
              >
                About
              </a>

              <button className="bg-blue-600 hover:bg-blue-700 transition px-5 py-3 rounded-xl font-medium">
                Contact Us
              </button>

            </div>

          </div>

        </div>

      )}

    </header>
  );
}