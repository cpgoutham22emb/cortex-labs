"use client";


import Image from "next/image";
import Link from "next/link";
import HeroBoard from "../assets/images/hero-board.jpg";

import { motion } from "framer-motion";

import {
  FaMicrochip,
  FaTools,
  FaRobot,
} from "react-icons/fa";

const offerings = [
  {
    label: "training",
    icon: FaMicrochip,
    title: (
      <>
        Industry-Focused
        <br />
        Training
      </>
    ),
  },
  {
    label: "consultancy",
    icon: FaTools,
    title: (
      <>
        Expert
        <br />
        Consultancy
      </>
    ),
  },
  {
    label: "development",
    icon: FaRobot,
    title: (
      <>
        End-to-End
        <br />
        Development
      </>
    ),
  },
];

const highlights = [
  {
    title: "Hands-on Learning",
    description: "Real hardware. Real skills.",
  },
  {
    title: "Practical Approach",
    description: "Build. Debug. Deploy.",
  },
  {
    title: "Problem Solvers",
    description: "Engineering meaningful solutions.",
  },
  {
    title: "Future Ready",
    description: "AI, Edge, IoT and beyond.",
  },
];

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-[#050816] pt-28 text-white sm:pt-32"
    >
      {/* Background Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-20 h-[400px] w-[400px] rounded-full bg-blue-500/15 blur-[140px] sm:h-[600px] sm:w-[600px]"
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 pb-8 md:gap-12 lg:grid-cols-2 lg:gap-16">
        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10"
        >
          {/* Main Heading */}
          <h1 className="max-w-2xl text-4xl font-bold leading-[1.12] tracking-tight sm:text-5xl md:text-6xl xl:text-7xl">
            Engineering the
            <br />
            Intelligence Behind
            <span className="mt-2 block text-blue-500">
              Embedded Systems
            </span>
          </h1>

          {/* Description */}
          <p className="mt-7 max-w-xl text-base leading-7 text-gray-400 sm:mt-8 sm:text-lg sm:leading-8">
            Cortex Labs provides hands-on training, expert consultancy,
            and end-to-end embedded system development services to build
            intelligent, reliable and future-ready products.
          </p>

          {/* Core Offerings */}
          <div className="mt-8 grid max-w-lg grid-cols-3 gap-3 sm:mt-10 sm:gap-6">
            {offerings.map((offering) => {
              const Icon = offering.icon;

              return (
                <div
                  key={offering.label}
                  className="flex flex-col items-start gap-3"
                >
                  <Icon
                    aria-hidden="true"
                    className="text-2xl text-blue-500 sm:text-3xl"
                  />

                  <p className="text-xs font-medium leading-5 text-gray-200 sm:text-sm sm:leading-6">
                    {offering.title}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Call to Action */}
          <div className="mt-9 flex flex-wrap gap-3 sm:mt-10 sm:gap-4">
            <Link
              href="/services/training"
              className="inline-flex min-h-12 items-center justify-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition duration-300 hover:scale-[1.03] hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050816] sm:px-6"
            >
              Explore Training
            </Link>

            <Link
              href="/services"
              className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/20 px-5 py-3 text-sm font-semibold text-white transition duration-300 hover:border-blue-500 hover:bg-blue-500/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050816] sm:px-6"
            >
              Our Services
            </Link>
          </div>
        </motion.div>

        {/* RIGHT VISUAL */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative mx-auto flex w-full max-w-xl items-center justify-center"
        >
          {/* Decorative Rings */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute h-[250px] w-[250px] rounded-full border border-blue-500/20 sm:h-[350px] sm:w-[350px] lg:h-[420px] lg:w-[420px]"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute h-[200px] w-[200px] rounded-full border border-blue-500/30 sm:h-[280px] sm:w-[280px] lg:h-[340px] lg:w-[340px]"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute h-[150px] w-[150px] rounded-full border border-blue-500/40 sm:h-[220px] sm:w-[220px] lg:h-[260px] lg:w-[260px]"
          />

          {/* Image Glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute h-64 w-64 rounded-full bg-blue-500/20 blur-[100px] sm:h-96 sm:w-96"
          />

          {/* Embedded Board Image */}
          <div className="relative z-10 w-full">
            <Image
              src={HeroBoard}
              alt="Cortex Labs embedded development board"
              priority
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 45vw"
              className="relative h-auto w-full object-contain drop-shadow-[0_0_40px_rgba(37,99,235,0.45)]"
            />
          </div>
        </motion.div>
      </div>

      {/* BOTTOM FEATURE STRIP */}
      <div className="relative mx-auto mt-10 max-w-7xl px-6 pb-12 sm:mt-16 sm:pb-16 lg:mt-20">
        <div className="grid grid-cols-1 gap-6 rounded-2xl border border-white/10 bg-[#0B1220]/80 p-6 backdrop-blur-md sm:grid-cols-2 sm:gap-8 sm:p-8 lg:grid-cols-4">
          {highlights.map((highlight) => (
            <div key={highlight.title}>
              <h3 className="font-semibold text-blue-500">
                {highlight.title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-400">
                {highlight.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}