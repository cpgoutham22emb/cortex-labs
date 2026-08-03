

"use client";

import Image from "next/image";
import HeroBoard from "../assets/images/hero-board.jpg";

import { motion } from "framer-motion";

import {
  FaMicrochip,
  FaTools,
  FaRobot,
} from "react-icons/fa";

export default function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen bg-[#050816] overflow-hidden pt-32">

      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/20 blur-[160px] rounded-full" />

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">

        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10"
        >

          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            Engineering the
            <br />

            Intelligence Behind

            <span className="block text-blue-500 mt-2">
              Embedded Systems
            </span>
          </h1>

          <p className="mt-8 text-gray-400 text-lg leading-relaxed max-w-xl">
            Cortex Labs provides hands-on training,
            expert consultancy, and end-to-end embedded
            system development services to build intelligent,
            reliable and future-ready products.
          </p>

          {/* FEATURES */}
          <div className="mt-10 grid grid-cols-3 gap-6">

            <div className="flex flex-col items-start gap-2">
              <FaMicrochip className="text-3xl text-blue-500" />

              <p className="font-medium">
                Industry-Focused
                <br />
                Training
              </p>
            </div>

            <div className="flex flex-col items-start gap-2">
              <FaTools className="text-3xl text-blue-500" />

              <p className="font-medium">
                Expert
                <br />
                Consultancy
              </p>
            </div>

            <div className="flex flex-col items-start gap-2">
              <FaRobot className="text-3xl text-blue-500" />

              <p className="font-medium">
                End-to-End
                <br />
                Development
              </p>
            </div>

          </div>

          {/* BUTTONS */}
          <div className="mt-10 flex gap-4">

            <button className="bg-blue-600 hover:bg-blue-700 hover:scale-105 transition duration-300 px-6 py-3 rounded-xl font-medium shadow-lg shadow-blue-500/20">
              Explore Training
            </button>

            <button className="border border-white/20 hover:border-blue-500 hover:bg-blue-500/10 hover:scale-105 transition duration-300 px-6 py-3 rounded-xl font-medium">
              Our Services
            </button>

          </div>

        </motion.div>

        {/* RIGHT VISUAL */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2 }}
          className="relative flex justify-center items-center"
        >

          {/* Outer Glow Ring */}
          <div className="absolute w-[500px] h-[500px] border border-blue-500/20 rounded-full" />

          <div className="absolute w-[400px] h-[400px] border border-blue-500/30 rounded-full" />

          <div className="absolute w-[300px] h-[300px] border border-blue-500/40 rounded-full" />

          {/* Main Card */}
          {/* Main Embedded Board Image */}
          <div className="relative flex justify-center items-center">

            <div className="absolute w-[500px] h-[500px] bg-blue-500/20 blur-[120px] rounded-full" />

            <Image
              src={HeroBoard}
              alt="Cortex Labs Embedded Board"
              className="relative z-10 object-contain drop-shadow-[0_0_40px_rgba(37,99,235,0.6)]"
              priority
            />

          </div>

        </motion.div>

      </div>

      {/* BOTTOM FEATURE STRIP */}
      <div className="relative mt-24 max-w-7xl mx-auto px-6">

        <div className="bg-[#0B1220]/80 border border-white/10 rounded-2xl backdrop-blur-md grid md:grid-cols-4 gap-8 p-8">

          <div>
            <h3 className="font-semibold text-blue-500">
              Hands-on Learning
            </h3>

            <p className="text-gray-400 text-sm mt-2">
              Real hardware. Real skills.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-blue-500">
              Practical Approach
            </h3>

            <p className="text-gray-400 text-sm mt-2">
              Build. Debug. Deploy.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-blue-500">
              Problem Solvers
            </h3>

            <p className="text-gray-400 text-sm mt-2">
              Engineering meaningful solutions.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-blue-500">
              Future Ready
            </h3>

            <p className="text-gray-400 text-sm mt-2">
              AI, Edge, IoT and beyond.
            </p>
          </div>

        </div>

      </div>

    </section>
  );
}