"use client";

import { useEffect, useState } from "react";
import api, { refreshAccessToken } from "@/lib/api";

import {
  FaBars,
  FaTimes,
} from "react-icons/fa";

import { getMe } from "@/services/auth";
import { useAuthStore } from "@/store/authStore";

export default function Navbar() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const { user, isAuthenticated, logout } = useAuthStore();
  useEffect(() => {
    const restoreSession = async () => {
      try {
        const accessToken = await refreshAccessToken();

        const user = await getMe();

        useAuthStore.getState().setAuth(user, accessToken);
      } catch {
        useAuthStore.getState().logout();
      }
    };

    restoreSession();
  }, []);
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#050816]/80 backdrop-blur-md border-b border-white/10">

      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <a
          href="/"
          className="block"
        >
          <h1 className="text-2xl font-bold tracking-wide text-white">
            CORTEX <span className="text-blue-500">LABS</span>
          </h1>

          <p className="text-[10px] text-gray-400 tracking-[3px]">
            ENGINEERING INTELLIGENCE
          </p>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-5 text-sm text-gray-300">
          <a href="/" className="hover:text-blue-500 transition">
            Home
          </a>

          <a href="/services/training" className="hover:text-blue-500 transition">
            Training
          </a>

          <a href="/services" className="hover:text-blue-500 transition">
            Engineering Services
          </a>

          <a href="/#projects" className="hover:text-blue-500 transition">
            Projects
          </a>

          <a href="/about" className="hover:text-blue-500 transition">
            About
          </a>

          <a href="/contact" className="hover:text-blue-500 transition">
            Contact
          </a>
        </nav>

        {/* Desktop Auth */}
        <div className="hidden lg:flex items-center gap-3">

          {!isAuthenticated ? (
            <>
              <a
                href="/student/login"
                className="px-4 py-2 text-sm text-gray-300 hover:text-white transition"
              >
                Login
              </a>

              <a
                href="/student/signup"
                className="bg-blue-600 hover:bg-blue-700 transition px-5 py-2 rounded-lg text-sm font-medium"
              >
                Sign Up
              </a>
            </>
          ) : (
            <div className="relative group">

              <button className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 rounded-lg transition">
                <span className="max-w-[150px] truncate text-white">
                  {user?.first_name || user?.email}
                </span>

                <span className="text-xs text-gray-400">
                  ▾
                </span>
              </button>

              <div className="absolute right-0 top-full mt-2 w-48 rounded-xl border border-white/10 bg-[#0B1220] shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">

                <a
                  href="/student/dashboard"
                  className="block px-4 py-3 text-sm text-gray-300 hover:bg-white/5 hover:text-white"
                >
                  Dashboard
                </a>

                <a
                  href="/student/courses"
                  className="block px-4 py-3 text-sm text-gray-300 hover:bg-white/5 hover:text-white"
                >
                  My Learning
                </a>
                <a
                  href="/student/profile"
                  className="block px-4 py-3 text-sm text-gray-300 hover:bg-white/5 hover:text-white"
                >
                  Profile
                </a>

                <button
                  onClick={async () => {
                    try {
                      await api.post("/auth/logout/");
                    } catch (error) {
                      console.error("Logout API error:", error);
                    } finally {
                      logout();
                      window.location.href = "/";
                    }
                  }}
                  className="w-full text-left px-4 py-3 text-sm text-red-400 hover:bg-white/5"
                >
                  Logout
                </button>

              </div>
            </div>
          )}

        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-2xl"
          onClick={() => setMobileMenu(true)}
          aria-label="Open navigation menu"
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
                href="/"
                onClick={() => setMobileMenu(false)}
                className="hover:text-blue-500 transition"
              >
                Home
              </a>

              <a
                href="/services/training"
                onClick={() => setMobileMenu(false)}
                className="hover:text-blue-500 transition"
              >
                Training
              </a>

              <a
                href="/services"
                onClick={() => setMobileMenu(false)}
                className="hover:text-blue-500 transition"
              >
                Engineering Services
              </a>

              <a
                href="/#projects"
                onClick={() => setMobileMenu(false)}
                className="hover:text-blue-500 transition"
              >
                Projects
              </a>

              <a
                href="/about"
                onClick={() => setMobileMenu(false)}
                className="hover:text-blue-500 transition"
              >
                About
              </a>

              <a
                href="/contact"
                onClick={() => setMobileMenu(false)}
                className="hover:text-blue-500 transition"
              >
                Contact
              </a>

              {!isAuthenticated ? (
                <div className="flex flex-col gap-3">
                  <a
                    href="/student/login"
                    onClick={() => setMobileMenu(false)}
                    className="border border-white/10 hover:bg-white/5 transition px-5 py-3 rounded-xl font-medium text-center"
                  >
                    Login
                  </a>

                  <a
                    href="/student/signup"
                    onClick={() => setMobileMenu(false)}
                    className="bg-blue-600 hover:bg-blue-700 transition px-5 py-3 rounded-xl font-medium text-center"
                  >
                    Sign Up
                  </a>
                </div>
              ) : (
                <div className="border-t border-white/10 pt-6 mt-2">
                  <p className="text-sm text-gray-400 mb-4">
                    Signed in as
                  </p>

                  <p className="font-medium mb-4 text-white">
                    {user?.first_name || user?.email}
                  </p>

                  <a
                    href="/student/dashboard"
                    onClick={() => setMobileMenu(false)}
                    className="block hover:text-blue-500 transition mb-4"
                  >
                    Dashboard
                  </a>

                  <a
                    href="/student/courses"
                    onClick={() => setMobileMenu(false)}
                    className="block hover:text-blue-500 transition mb-4"
                  >
                    My Learning
                  </a>

                  <a
                    href="/student/profile"
                    onClick={() => setMobileMenu(false)}
                    className="block hover:text-blue-500 transition mb-4"
                  >
                    Profile
                  </a>
                  <button
                    onClick={async () => {
                      try {
                        await api.post("/auth/logout/");
                      } catch (error) {
                        console.error("Logout API error:", error);
                      } finally {
                        logout();
                        window.location.href = "/";
                      }
                    }}
                    className="w-full text-left text-red-400 hover:text-red-300 transition"
                  >
                    Logout
                  </button>
                </div>
              )}

            </div>

          </div>

        </div>

      )}

    </header>
  );
}