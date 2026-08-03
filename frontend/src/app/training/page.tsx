"use client";

import { useState } from "react";

import Image from "next/image";

import HeroBoard from "../../assets/images/hero-board.jpg";

export default function TrainingPage() {

  const [openFAQ, setOpenFAQ] = useState<number | null>(0);
  
  return (
    <main className="min-h-screen bg-[#050816] text-white overflow-hidden">

      {/* FLOATING CTA */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col gap-3">

        {/* JOIN TRAINING */}
        <button
          className="
            bg-blue-600 hover:bg-blue-700
            active:scale-95
            transition-all duration-300
            shadow-2xl shadow-blue-500/30
            px-4 py-3 sm:px-6 sm:py-4
            rounded-2xl
            text-sm sm:text-base
            font-semibold text-white
            backdrop-blur-xl
          "
        >
          Apply For Next Cohort
        </button>

        {/* CONSULTATION */}
        <button
          className="
            bg-[#0B1220]/90
            border border-white/10
            hover:border-blue-500
            hover:bg-blue-500/10
            active:scale-95
            transition-all duration-300
            px-4 py-3 sm:px-6 sm:py-4
            rounded-2xl
            text-sm sm:text-base
            font-semibold text-white
            backdrop-blur-xl
          "
        >
          Book Free Consultation
        </button>

      </div>

      {/* TRAINING PAGE NAVIGATION */}
      <div className="sticky top-20 z-40 border-b border-white/10 bg-[#050816]/90 backdrop-blur-xl">

        <div className="max-w-7xl mx-auto px-6 overflow-x-auto scrollbar-hide">

          <div className="flex items-center gap-8 min-w-max py-4">

            <a
              href="#curriculum"
              className="text-sm whitespace-nowrap text-gray-300 hover:text-blue-400 transition duration-300"
            >
              Embedded Systems Career Program
            </a>

            <a
              href="#ecosystem"
              className="text-sm whitespace-nowrap text-gray-300 hover:text-blue-400 transition duration-300"
            >
              Student Ecosystem
            </a>

            <a
              href="#mentorship"
              className="text-sm whitespace-nowrap text-gray-300 hover:text-blue-400 transition duration-300"
            >
              Live Mentorship
            </a>

            <a
              href="#faq"
              className="text-sm whitespace-nowrap text-gray-300 hover:text-blue-400 transition duration-300"
            >
              FAQs
            </a>

            <a
              href="#career"
              className="text-sm whitespace-nowrap text-gray-300 hover:text-blue-400 transition duration-300"
            >
              Career Support
            </a>

            <a
              href="#hardware"
              className="text-sm whitespace-nowrap text-gray-300 hover:text-blue-400 transition duration-300"
            >
              Hardware Workflow
            </a>

            <a
              href="#projects"
              className="text-sm whitespace-nowrap text-gray-300 hover:text-blue-400 transition duration-300"
            >
              Projects
            </a>

          </div>

        </div>

      </div>

      {/* HERO SECTION */}
      <section className="relative pt-32 pb-24">

        {/* Background Glow */}
        <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-blue-500/20 blur-[160px] rounded-full" />

        <div className="relative max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

          {/* LEFT CONTENT */}
          <div>

            <p className="text-blue-500 uppercase tracking-[4px] text-sm font-semibold">
              Cortex Labs Training
            </p>

            <h1 className="text-4xl md:text-6xl xl:text-7xl font-bold leading-tight mt-6">

              Become an
              <br />

              <span className="text-blue-500">
                Embedded Systems Engineer
              </span>

              <br />

              Through Real Hardware & Firmware

            </h1>

            <p className="text-gray-400 text-xl leading-relaxed mt-8 max-w-2xl">

                    Transform from beginner to industry-ready embedded systems engineer through live mentorship, real hardware workflows, firmware development, RTOS, IoT and deployment-oriented engineering projects.

            </p>

            {/* BUTTONS */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-4 mt-12">

                <a
                  href="#curriculum"
                  className="bg-blue-600 hover:bg-blue-700 hover:scale-95 transition-all duration-300 px-8 py-4 rounded-2xl font-medium shadow-lg shadow-blue-500/20 inline-flex items-center"
                >
                  Explore Curriculum
                </a>

              <button className="border border-white/20 hover:border-blue-500 hover:bg-blue-500/10 hover:scale-95 transition-all duration-300 px-8 py-4 rounded-2xl font-medium">
                Hardware Requirements
              </button>

            </div>

            {/* PREMIUM STATS */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16">

              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">

                <h3 className="text-3xl font-bold text-blue-500">
                  16 Weeks
                </h3>

                <p className="text-gray-400 mt-2">
                  Career Transformation Program
                </p>

              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">

                <h3 className="text-3xl font-bold text-blue-500">
                  10
                </h3>

                <p className="text-gray-400 mt-2">
                  Students Per Cohort
                </p>

              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">

                <h3 className="text-3xl font-bold text-blue-500">
                  Live
                </h3>

                <p className="text-gray-400 mt-2">
                  Engineering Mentorship
                </p>

              </div>

            </div>

          </div>

          {/* RIGHT VISUAL */}
          <div className="relative flex justify-center">

            {/* Rings */}
            <div className="absolute w-[500px] h-[500px] border border-blue-500/20 rounded-full" />

            <div className="absolute w-[400px] h-[400px] border border-blue-500/30 rounded-full" />

            <div className="absolute w-[300px] h-[300px] border border-blue-500/40 rounded-full" />

            {/* Image */}
            <Image
              src={HeroBoard}
              alt="Embedded Systems"
              className="relative z-10 w-full max-w-[650px] object-contain drop-shadow-[0_0_50px_rgba(37,99,235,0.55)]"
              priority
            />

          </div>

        </div>

      </section>



      {/* TRAINING TRACKS */}
      <section id="curriculum" className="py-28 border-t border-white/10">

        <div className="max-w-7xl mx-auto px-6">

          {/* HEADING */}
          <div className="text-center">

            <p className="text-blue-500 uppercase tracking-[4px] text-sm font-semibold">
              Embedded Engineering Roadmap
            </p>

            <h2 className="text-4xl md:text-5xl font-bold mt-6 leading-tight">
              From Beginner To
              <br />
              Industry-Ready Embedded Engineer
            </h2>

            <p className="text-gray-400 text-lg mt-6 max-w-3xl mx-auto leading-relaxed">
              A premium cohort-based embedded systems mentorship ecosystem
              focused on firmware engineering, RTOS, IoT systems,
              Edge AI deployment and real engineering workflows.
            </p>

          </div>

          {/* TRANSFORMATION FLOW */}
          <div className="mt-16 bg-[#0B1220] border border-blue-500/20 rounded-[32px] p-8 md:p-10">

            <div className="grid md:grid-cols-4 gap-8 text-center">

              <div>
                <p className="text-blue-500 text-sm uppercase tracking-[2px] font-semibold">
                  Phase 1
                </p>

                <h3 className="text-xl font-bold mt-3">
                  Foundations
                </h3>
              </div>

              <div>
                <p className="text-cyan-400 text-sm uppercase tracking-[2px] font-semibold">
                  Phase 2
                </p>

                <h3 className="text-xl font-bold mt-3">
                  Firmware & RTOS
                </h3>
              </div>

              <div>
                <p className="text-yellow-400 text-sm uppercase tracking-[2px] font-semibold">
                  Phase 3
                </p>

                <h3 className="text-xl font-bold mt-3">
                  IoT Systems
                </h3>
              </div>

              <div>
                <p className="text-purple-400 text-sm uppercase tracking-[2px] font-semibold">
                  Phase 4
                </p>

                <h3 className="text-xl font-bold mt-3">
                  Edge AI Deployment
                </h3>
              </div>

            </div>

          </div>

          {/* LIMITED COHORT */}
          <div className="flex justify-center mt-10">

            <div className="px-6 py-3 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-300 text-sm font-medium tracking-[1px]">
              Limited To Only 10 Students Per Cohort
            </div>

          </div>

          {/* TRACK GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 mt-20">

            {/* PHASE 1 */}
            <div className="bg-[#0B1220] border border-white/10 rounded-3xl p-8 hover:border-blue-500/40 hover:-translate-y-2 transition-all duration-300">

              {/* TOP */}
              <div className="flex items-center justify-between">

                <div className="w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-2xl font-bold text-blue-500">
                  1
                </div>

                <div className="text-right">

                  <p className="text-sm text-blue-400">
                    Phase 1
                  </p>

                  <p className="text-sm text-gray-500 mt-1">
                    Foundation Phase
                  </p>

                </div>

              </div>

              {/* ENTRY */}
              <div className="mt-6 rounded-2xl border border-blue-500/20 bg-blue-500/5 p-4">

                <p className="text-xs uppercase tracking-[2px] text-blue-400 font-semibold">
                  Beginner Friendly
                </p>

                <p className="text-sm text-gray-300 mt-3 leading-relaxed">
                  Designed for students, graduates and working professionals entering embedded systems engineering from scratch through practical firmware workflows.
                </p>

              </div>

              {/* TITLE */}
              <h3 className="text-2xl font-bold mt-8 leading-snug">
                Embedded System Foundations
              </h3>

              <p className="text-gray-400 mt-4 leading-relaxed">
                Build strong embedded engineering fundamentals through hands-on firmware development and real hardware interaction.
              </p>

              {/* CURRICULUM */}
              <div className="mt-8">

                <p className="text-blue-400 font-semibold uppercase text-sm tracking-[2px]">
                  Curriculum
                </p>

                <div className="mt-5 space-y-4">

                  <div className="border-l-2 border-blue-500 pl-4">
                    Embedded C Programming
                  </div>

                  <div className="border-l-2 border-blue-500 pl-4">
                    Microcontroller Architecture
                  </div>

                  <div className="border-l-2 border-blue-500 pl-4">
                    GPIO, Timers & Interrupts
                  </div>

                  <div className="border-l-2 border-blue-500 pl-4">
                    UART / SPI / I2C
                  </div>

                  <div className="border-l-2 border-blue-500 pl-4">
                    STM32 Hands-on Labs
                  </div>

                </div>

              </div>

            </div>

            {/* PHASE 2 */}
            <div className="relative bg-[#0B1220] border border-cyan-500/30 rounded-3xl p-8 hover:border-cyan-400 hover:-translate-y-2 transition-all duration-300 overflow-hidden">

              {/* GLOW */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-500/10 blur-[80px]" />

              {/* TOP */}
              <div className="flex items-center justify-between relative z-10">

                <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-2xl font-bold text-cyan-500">
                  2
                </div>

                <div className="text-right">

                  <p className="text-sm text-cyan-400">
                    Phase 2
                  </p>

                  <p className="text-sm text-gray-500 mt-1">
                    Core Engineering
                  </p>

                </div>

              </div>

              {/* MOST POPULAR */}
              <div className="mt-6 inline-flex px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs uppercase tracking-[2px] font-semibold">
                Most Popular Career Track
              </div>

              {/* ENTRY */}
              <div className="mt-6 rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-4">

                <p className="text-xs uppercase tracking-[2px] text-cyan-400 font-semibold">
                  Career-Focused Phase
                </p>

                <p className="text-sm text-gray-300 mt-3 leading-relaxed">
                  Designed for learners aiming to become professional firmware and embedded software engineers.
                </p>

              </div>

              {/* TITLE */}
              <h3 className="text-2xl font-bold mt-8 leading-snug">
                Firmware & RTOS Engineering
              </h3>

              <p className="text-gray-400 mt-4 leading-relaxed">
                Learn professional embedded firmware architecture, RTOS workflows, debugging methodologies and real engineering development practices.
              </p>

              {/* CURRICULUM */}
              <div className="mt-8">

                <p className="text-cyan-400 font-semibold uppercase text-sm tracking-[2px]">
                  Curriculum
                </p>

                <div className="mt-5 space-y-4">

                  <div className="border-l-2 border-cyan-500 pl-4">
                    FreeRTOS Fundamentals
                  </div>

                  <div className="border-l-2 border-cyan-500 pl-4">
                    Task Scheduling
                  </div>

                  <div className="border-l-2 border-cyan-500 pl-4">
                    Queues & Semaphores
                  </div>

                  <div className="border-l-2 border-cyan-500 pl-4">
                    Driver Development
                  </div>

                  <div className="border-l-2 border-cyan-500 pl-4">
                    Memory Optimization
                  </div>

                </div>

              </div>

            </div>

            {/* PHASE 3 */}
            <div className="bg-[#0B1220] border border-white/10 rounded-3xl p-8 hover:border-yellow-500/40 hover:-translate-y-2 transition-all duration-300">

              <div className="flex items-center justify-between">

                <div className="w-16 h-16 rounded-2xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center text-2xl font-bold text-yellow-500">
                  3
                </div>

                <div className="text-right">

                  <p className="text-sm text-yellow-400">
                    Phase 3
                  </p>

                  <p className="text-sm text-gray-500 mt-1">
                    Industry Systems
                  </p>

                </div>

              </div>

              <div className="mt-6 rounded-2xl border border-yellow-500/20 bg-yellow-500/5 p-4">

                <p className="text-xs uppercase tracking-[2px] text-yellow-400 font-semibold">
                  Connected Systems
                </p>

                <p className="text-sm text-gray-300 mt-3 leading-relaxed">
                  Build scalable connected embedded systems through practical industrial communication workflows.
                </p>

              </div>

              <h3 className="text-2xl font-bold mt-8 leading-snug">
                RTOS, IoT & Connected Systems
              </h3>

              <p className="text-gray-400 mt-4 leading-relaxed">
                Build scalable connected embedded systems using industrial communication workflows, wireless protocols and cloud-integrated architectures.
              </p>

            </div>

            {/* PHASE 4 */}
            <div className="bg-[#0B1220] border border-white/10 rounded-3xl p-8 hover:border-purple-500/40 hover:-translate-y-2 transition-all duration-300">

              <div className="flex items-center justify-between">

                <div className="w-16 h-16 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-2xl font-bold text-purple-500">
                  4
                </div>

                <div className="text-right">

                  <p className="text-sm text-purple-400">
                    Phase 4
                  </p>

                  <p className="text-sm text-gray-500 mt-1">
                    Advanced Deployment
                  </p>

                </div>

              </div>

              <div className="mt-6 rounded-2xl border border-purple-500/20 bg-purple-500/5 p-4">

                <p className="text-xs uppercase tracking-[2px] text-purple-400 font-semibold">
                  Elite Engineering Phase
                </p>

                <p className="text-sm text-gray-300 mt-3 leading-relaxed">
                  Advanced deployment-focused embedded AI systems engineering for real-world intelligent devices.
                </p>

              </div>

              <h3 className="text-2xl font-bold mt-8 leading-snug">
                Edge AI Deployment Systems
              </h3>

              <p className="text-gray-400 mt-4 leading-relaxed">
                Deploy intelligent embedded systems using Edge AI, computer vision and real-time inference pipelines on production-grade hardware.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* STUDENT DASHBOARD VISUALIZATION */}
      <section id="ecosystem" className="py-28 border-t border-white/10 overflow-hidden">

        <div className="max-w-7xl mx-auto px-6">

          {/* HEADING */}
          <div className="text-center">

            <p className="text-blue-500 uppercase tracking-[4px] text-sm font-semibold">
              Student Learning Ecosystem
            </p>

            <h2 className="text-4xl md:text-5xl font-bold mt-6">
              Experience the
              <br />
              Cortex Labs Workflow
            </h2>

            <p className="text-gray-400 text-lg mt-6 max-w-3xl mx-auto">
              Cortex Labs training combines live mentorship,
              firmware engineering workflows, project tracking
              and deployment-oriented learning experiences.
            </p>

          </div>

          {/* DASHBOARD */}
          <div className="mt-24 grid lg:grid-cols-12 gap-8">

            {/* LEFT PANEL */}
            <div className="lg:col-span-3 space-y-8">

              {/* PROFILE CARD */}
              <div className="bg-[#0B1220]/89 border border-white/10 rounded-3xl p-8">

                <div className="w-20 h-20 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-3xl font-bold text-blue-400">
                  G
                </div>

                <h3 className="text-2xl font-bold mt-6">
                  Student Dashboard
                </h3>

                <p className="text-gray-400 mt-2">
                  RTOS & Firmware Track
                </p>

                {/* PROGRESS */}
                <div className="mt-8">

                  <div className="flex justify-between text-sm mb-3">
                    <span className="text-gray-400">
                      Progress
                    </span>

                    <span className="text-blue-400">
                      72%
                    </span>
                  </div>

                  <div className="h-3 bg-white/5 rounded-full overflow-hidden">

                    <div className="h-full w-[72%] bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full" />

                  </div>

                </div>

              </div>

              {/* HARDWARE CHECKLIST */}
              <div className="bg-[#0B1220]/80 border border-white/10 rounded-3xl p-8">

                <h3 className="text-xl font-bold">
                  Hardware Checklist
                </h3>

                <div className="mt-6 space-y-4">

                  <div className="flex items-center justify-between">
                    <span>STM32 Board</span>
                    <span className="text-green-400">✓</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span>UART Converter</span>
                    <span className="text-green-400">✓</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span>Logic Analyzer</span>
                    <span className="text-yellow-400">Pending</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span>ESP32 Kit</span>
                    <span className="text-green-400">✓</span>
                  </div>

                </div>

              </div>

            </div>

            {/* CENTER PANEL */}
            <div className="lg:col-span-6 space-y-8">

              {/* ACTIVE PROJECT */}
              <div className="bg-[#0B1220] border border-white/10 rounded-3xl p-6 md:p-8 lg:p-10">

                <div className="flex items-center justify-between">

                  <div>

                    <p className="text-blue-400 uppercase tracking-[3px] text-xs font-semibold">
                      Active Firmware Project
                    </p>

                    <h3 className="text-3xl font-bold mt-4">
                      UART Driver Development
                    </h3>

                  </div>

                  <div className="px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm">
                    Week 5
                  </div>

                </div>

                <p className="text-gray-400 mt-8 leading-relaxed">
                  Build a UART communication driver using STM32,
                  interrupt handling and RTOS task synchronization.
                </p>

                {/* TASKS */}
                <div className="grid md:grid-cols-2 gap-6 mt-10">

                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    UART Initialization
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    Interrupt Configuration
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    Circular Buffer Design
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    RTOS Queue Integration
                  </div>

                </div>

              </div>

              {/* MENTOR FEEDBACK */}
              <div className="bg-[#0B1220] border border-white/10 rounded-3xl p-6 md:p-8 lg:p-10">

                <p className="text-blue-400 uppercase tracking-[3px] text-xs font-semibold">
                  Mentor Feedback
                </p>

                <div className="mt-6 bg-white/5 border border-white/10 rounded-2xl p-8">

                  <p className="text-gray-300 leading-relaxed">
                    Good progress on interrupt-driven UART handling.
                    Focus on improving memory optimization and
                    debugging workflow consistency.
                  </p>

                </div>

              </div>

            </div>

            {/* RIGHT PANEL */}
            <div className="lg:col-span-3 space-y-8">

              {/* LIVE SESSION */}
              <div className="bg-[#0B1220]/80 border border-white/10 rounded-3xl p-8">

                <div className="flex items-center justify-between">

                  <h3 className="text-xl font-bold">
                    Live Session
                  </h3>

                  <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />

                </div>

                <p className="text-gray-400 mt-6">
                  Firmware Debugging Workshop
                </p>

                <div className="mt-8 space-y-4">

                  <div className="flex justify-between">
                    <span className="text-gray-500">
                      Mentor
                    </span>

                    <span>
                      Cortex Labs
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-500">
                      Duration
                    </span>

                    <span>
                      2 Hours
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-500">
                      Students
                    </span>

                    <span>
                      32 Active
                    </span>
                  </div>

                </div>

              </div>

              {/* CERTIFICATE */}
              <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-3xl p-8">

                <p className="text-blue-400 uppercase tracking-[3px] text-xs font-semibold">
                  Certification Path
                </p>

                <h3 className="text-2xl font-bold mt-6">
                  Embedded Systems Engineering
                </h3>

                <p className="text-gray-300 mt-6 leading-relaxed">
                  Complete projects, firmware labs and deployment
                  workflows to unlock certification.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* LIVE SESSION EXPERIENCE */}
      <section id="mentorship"className="py-28 border-t border-white/10 overflow-hidden">

        <div className="max-w-7xl mx-auto px-6">

          {/* HEADING */}
          <div className="text-center">

            <p className="text-blue-500 uppercase tracking-[4px] text-sm font-semibold">
              Live Engineering Mentorship
            </p>

            <h2 className="text-4xl md:text-5xl font-bold mt-6">
              Learn Through
              <br />
              Real-Time Engineering Sessions
            </h2>

            <p className="text-gray-400 text-lg mt-6 max-w-3xl mx-auto">
              Cortex Labs combines live mentorship,
              debugging workshops and practical firmware
              development sessions to create a real engineering workflow.
            </p>

          </div>

          {/* MAIN GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mt-24">

            {/* LEFT VISUAL */}
            <div className="relative">

              {/* Glow */}
              <div className="absolute inset-0 bg-blue-500/10 blur-[120px] rounded-full" />

              {/* MAIN PANEL */}
              <div className="relative bg-[#0B1220] border border-white/10 rounded-[32px] overflow-hidden shadow-2xl">

                {/* TOP BAR */}
                <div className="flex items-center justify-between px-8 py-5 border-b border-white/10 bg-white/5">

                  <div>

                    <p className="text-sm text-blue-400 uppercase tracking-[3px] font-semibold">
                      Live Session Active
                    </p>

                    <h3 className="text-2xl font-bold mt-2">
                      STM32 Firmware Debugging
                    </h3>

                  </div>

                  {/* LIVE STATUS */}
                  <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20">

                    <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />

                    <span className="text-red-400 text-sm font-medium">
                      LIVE
                    </span>

                  </div>

                </div>

                {/* SESSION CONTENT */}
                <div className="p-8 space-y-6">

                  {/* TERMINAL */}
                  <div className="bg-black rounded-2xl border border-white/10 p-6 font-mono text-sm overflow-hidden">

                    <p className="text-green-400">
                      Initializing UART Driver...
                    </p>

                    <p className="text-cyan-400 mt-2">
                      RX Interrupt Enabled
                    </p>

                    <p className="text-yellow-400 mt-2">
                      Buffer Overflow Warning Detected
                    </p>

                    <p className="text-blue-400 mt-2">
                      RTOS Queue Synchronization Active
                    </p>

                    <p className="text-white mt-2">
                      Debugging Session Running...
                    </p>

                  </div>

                  {/* SESSION GRID */}
                  <div className="grid grid-cols-2 gap-6">

                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">

                      <p className="text-gray-500 text-sm">
                        Students Connected
                      </p>

                      <h4 className="text-3xl font-bold mt-3">
                        32
                      </h4>

                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">

                      <p className="text-gray-500 text-sm">
                        Session Duration
                      </p>

                      <h4 className="text-3xl font-bold mt-3">
                        2 Hr
                      </h4>

                    </div>

                  </div>

                  {/* MENTOR MESSAGE */}
                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-6">

                    <p className="text-blue-400 uppercase tracking-[3px] text-xs font-semibold">
                      Mentor Guidance
                    </p>

                    <p className="text-gray-300 mt-4 leading-relaxed">
                      Today’s session focuses on UART interrupt debugging,
                      RTOS synchronization and embedded firmware optimization workflows.
                    </p>

                  </div>

                </div>

              </div>

            </div>

            {/* RIGHT WORKFLOW */}
            <div>

              <p className="text-blue-500 uppercase tracking-[4px] text-sm font-semibold">
                Session Workflow
              </p>

              <h3 className="text-4xl font-bold mt-6 leading-tight">
                Structured Practical
                <br />
                Engineering Learning
              </h3>

              <p className="text-gray-400 text-lg mt-8 leading-relaxed">
                Cortex Labs sessions are designed to simulate
                real embedded systems engineering workflows
                used in professional development environments.
              </p>

              {/* STEPS */}
              <div className="space-y-6 mt-12">

                {/* STEP */}
                <div className="flex gap-6 bg-[#0B1220] border border-white/10 rounded-2xl p-6 hover:border-blue-500/30 transition-all duration-300">

                  <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 font-bold">
                    1
                  </div>

                  <div>

                    <h4 className="text-xl font-semibold">
                      Weekly Live Sessions
                    </h4>

                    <p className="text-gray-400 mt-2">
                      Instructor-led firmware engineering and debugging sessions.
                    </p>

                  </div>

                </div>

                {/* STEP */}
                <div className="flex gap-6 bg-[#0B1220] border border-white/10 rounded-2xl p-6 hover:border-blue-500/30 transition-all duration-300">

                  <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 font-bold">
                    2
                  </div>

                  <div>

                    <h4 className="text-xl font-semibold">
                      Hardware Setup Guidance
                    </h4>

                    <p className="text-gray-400 mt-2">
                      Students configure boards, tools and firmware environments.
                    </p>

                  </div>

                </div>

                {/* STEP */}
                <div className="flex gap-6 bg-[#0B1220] border border-white/10 rounded-2xl p-6 hover:border-blue-500/30 transition-all duration-300">

                  <div className="w-14 h-14 rounded-2xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center text-yellow-400 font-bold">
                    3
                  </div>

                  <div>

                    <h4 className="text-xl font-semibold">
                      Project-Based Learning
                    </h4>

                    <p className="text-gray-400 mt-2">
                      Students build real embedded systems projects every week.
                    </p>

                  </div>

                </div>

                {/* STEP */}
                <div className="flex gap-6 bg-[#0B1220] border border-white/10 rounded-2xl p-6 hover:border-blue-500/30 transition-all duration-300">

                  <div className="w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 font-bold">
                    4
                  </div>

                  <div>

                    <h4 className="text-xl font-semibold">
                      Debugging & Mentor Reviews
                    </h4>

                    <p className="text-gray-400 mt-2">
                      Firmware reviews, debugging assistance and deployment guidance.
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* FAQ SECTION */}
      <section id="faq" className="py-28 border-t border-white/10">

        <div className="max-w-5xl mx-auto px-6">

          {/* HEADING */}
          <div className="text-center">

            <p className="text-blue-500 uppercase tracking-[4px] text-sm font-semibold">
              Frequently Asked Questions
            </p>

            <h2 className="text-4xl md:text-5xl font-bold mt-6">
              Everything You Need
              <br />
              To Know
            </h2>

            <p className="text-gray-400 text-lg mt-6 max-w-3xl mx-auto">
              Answers to common questions about Cortex Labs
              training programs, hardware workflow and mentorship process.
            </p>

          </div>

          {/* FAQ LIST */}
          <div className="mt-20 space-y-6">

            {[
              {
                question: "Do I need prior embedded systems experience?",
                answer:
                  "No. The Fundamentals track is designed for complete beginners who want to start learning embedded systems engineering from scratch.",
              },

              {
                question: "Is the training live or prerecorded?",
                answer:
                  "Cortex Labs focuses on live engineering mentorship sessions combined with practical assignments, debugging workshops and guided project development.",
              },

              {
                question: "Will hardware be provided?",
                answer:
                  "Students procure their own hardware kits based on the selected learning track. Cortex Labs provides complete setup guidance and recommended hardware lists.",
              },

              {
                question: "What hardware do I need to begin?",
                answer:
                  "The beginner track typically starts with STM32 or ESP32 development boards along with debugging and communication tools.",
              },

              {
                question: "Will I build real projects?",
                answer:
                  "Yes. Every learning track includes practical firmware, IoT or Edge AI projects focused on deployment-oriented engineering workflows.",
              },

              {
                question: "Do you provide placement assistance?",
                answer:
                  "Cortex Labs provides career mentorship, portfolio guidance, project reviews and embedded systems interview preparation support.",
              },

              {
                question: "Can working professionals join?",
                answer:
                  "Yes. The training structure is designed for both students and working professionals interested in practical embedded systems engineering.",
              },

              {
                question: "I am from a different background. Can I switch into embedded systems and still get career support?",
                answer:
                  "Yes. Cortex Labs is designed not only for electronics or computer science students but also for learners and professionals transitioning from other technical backgrounds into embedded systems engineering. The training roadmap starts from fundamentals and gradually progresses toward firmware, RTOS, IoT and Edge AI workflows. Students also receive career guidance, portfolio-building support, project mentorship and placement-oriented preparation to help them become industry-ready.",
              },

              {
                question: "How are live sessions conducted?",
                answer:
                  "Sessions are conducted online through real-time interactive workshops including debugging sessions, mentor guidance and firmware demonstrations.",
              },
            ].map((faq, index) => {
              return (
                <div
                  key={index}
                  className="bg-[#0B1220] border border-white/10 rounded-3xl overflow-hidden"
                >

                  {/* QUESTION */}
                  <button
                    onClick={() =>
                      setOpenFAQ(openFAQ === index ? null : index)
                    }
                    className="w-full flex items-center justify-between text-left p-8 hover:bg-white/5 transition-all duration-300"
                  >

                    <h3 className="text-xl font-semibold pr-8">
                      {faq.question}
                    </h3>

                    <div className="text-3xl text-blue-500">

                      {openFAQ === index ? "−" : "+"}

                    </div>

                  </button>

                  {/* ANSWER */}
                  {openFAQ === index && (
                    <div className="px-8 pb-8">

                      <div className="h-[1px] bg-white/10 mb-6" />

                      <p className="text-gray-400 leading-relaxed text-lg">
                        {faq.answer}
                      </p>

                    </div>
                  )}

                </div>
              );
            })}

          </div>

        </div>

      </section>


      {/* CAREER SUPPORT */}
      <section id="career" className="py-28 border-t border-white/10">

        <div className="max-w-7xl mx-auto px-6">

          {/* HEADING */}
          <div className="text-center">

            <p className="text-blue-500 uppercase tracking-[4px] text-sm font-semibold">
              Career & Placement Support
            </p>

            <h2 className="text-4xl md:text-5xl font-bold mt-6">
              Industry-Oriented
              <br />
              Career Preparation
            </h2>

            <p className="text-gray-400 text-lg mt-6 max-w-3xl mx-auto">
              Cortex Labs helps students prepare for embedded systems
              careers through practical engineering workflows,
              technical mentorship and portfolio-driven learning.
            </p>

          </div>

          {/* SUPPORT GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-20">

            {/* CARD */}
            <div className="bg-[#0B1220] border border-white/10 rounded-3xl p-6 md:p-8 lg:p-10 hover:border-blue-500/40 hover:-translate-y-2 transition-all duration-300">

              <h3 className="text-2xl font-bold">
                Resume & Portfolio Building
              </h3>

              <p className="text-gray-400 mt-6 leading-relaxed">
                Build professional embedded systems portfolios
                using real firmware, IoT and Edge AI projects.
              </p>

            </div>

            {/* CARD */}
            <div className="bg-[#0B1220] border border-white/10 rounded-3xl p-6 md:p-8 lg:p-10 hover:border-blue-500/40 hover:-translate-y-2 transition-all duration-300">

              <h3 className="text-2xl font-bold">
                Embedded Interview Preparation
              </h3>

              <p className="text-gray-400 mt-6 leading-relaxed">
                Learn debugging workflows, firmware concepts,
                RTOS architecture and embedded interview strategies.
              </p>

            </div>

            {/* CARD */}
            <div className="bg-[#0B1220] border border-white/10 rounded-3xl p-6 md:p-8 lg:p-10 hover:border-blue-500/40 hover:-translate-y-2 transition-all duration-300">

              <h3 className="text-2xl font-bold">
                Career Guidance & Mentorship
              </h3>

              <p className="text-gray-400 mt-6 leading-relaxed">
                Get guidance on engineering growth,
                industry expectations and practical
                embedded systems career pathways.
              </p>

            </div>

            {/* CARD */}
            <div className="bg-[#0B1220] border border-white/10 rounded-3xl p-6 md:p-8 lg:p-10 hover:border-blue-500/40 hover:-translate-y-2 transition-all duration-300">

              <h3 className="text-2xl font-bold">
                GitHub & LinkedIn Optimization
              </h3>

              <p className="text-gray-400 mt-6 leading-relaxed">
                Learn how to showcase technical projects,
                engineering workflows and embedded development skills professionally.
              </p>

            </div>

            {/* CARD */}
            <div className="bg-[#0B1220] border border-white/10 rounded-3xl p-6 md:p-8 lg:p-10 hover:border-blue-500/40 hover:-translate-y-2 transition-all duration-300">

              <h3 className="text-2xl font-bold">
                Real Engineering Projects
              </h3>

              <p className="text-gray-400 mt-6 leading-relaxed">
                Work on practical systems including IoT,
                LoRa, Edge AI and industrial embedded applications.
              </p>

            </div>

            {/* CARD */}
            <div className="bg-[#0B1220] border border-white/10 rounded-3xl p-6 md:p-8 lg:p-10 hover:border-blue-500/40 hover:-translate-y-2 transition-all duration-300">

              <h3 className="text-2xl font-bold">
                Placement Assistance
              </h3>

              <p className="text-gray-400 mt-6 leading-relaxed">
                Career support, technical mentoring and
                industry-oriented preparation designed to
                help students become job-ready engineers.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* PRICING SECTION */}
      <section className="py-28 border-t border-white/10">

        <div className="max-w-5xl mx-auto px-6">

          <div className="text-center">

            <p className="text-blue-500 uppercase tracking-[4px] text-sm font-semibold">
              Premium Engineering Mentorship
            </p>

            <h2 className="text-4xl md:text-5xl font-bold mt-6">
              Embedded Systems
              <br />
              Career Program
            </h2>

            <p className="text-gray-400 text-lg mt-6 max-w-3xl mx-auto">
              A live cohort-based engineering mentorship ecosystem
              designed for serious learners who want to build
              industry-ready embedded systems skills.
            </p>

          </div>

          <div className="mt-20 bg-[#0B1220] border border-blue-500/20 rounded-[40px] p-10 md:p-14 text-center">

            <p className="text-gray-400 uppercase tracking-[3px] text-sm">
              16-Week Live Mentorship Program
            </p>

            <h3 className="text-6xl font-bold mt-8 text-blue-500">
              ₹45,000
            </h3>

            <p className="text-gray-400 mt-6 text-lg">
              Limited to only 10 students per cohort
            </p>

            <div className="grid md:grid-cols-2 gap-6 mt-14 text-left">

              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                Live Engineering Sessions
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                Firmware & RTOS Projects
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                Career Preparation
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                Placement-Oriented Guidance
              </div>

            </div>

            <button className="mt-14 bg-blue-600 hover:bg-blue-700 transition-all duration-300 px-10 py-5 rounded-2xl font-semibold shadow-xl shadow-blue-500/30">

              Apply For Next Cohort

            </button>

          </div>

        </div>

      </section>

      {/* HARDWARE & ONLINE WORKFLOW */}
      <section id="hardware" className="py-28 border-t border-white/10">

        <div className="max-w-7xl mx-auto px-6">

          {/* HEADING */}
          <div className="text-center">

            <p className="text-blue-500 uppercase tracking-[4px] text-sm font-semibold">
              Hardware & Workflow
            </p>

            <h2 className="text-4xl md:text-5xl font-bold mt-6">
              Learn Using
              <br />
              Real Hardware Systems
            </h2>

            <p className="text-gray-400 text-lg mt-6 max-w-3xl mx-auto">
              Cortex Labs training is designed around practical
              engineering workflows using real embedded development boards,
              debugging tools and deployment-oriented projects.
            </p>

          </div>

          {/* HARDWARE GRID */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-20">

            {/* ITEM */}
            <div className="bg-[#0B1220] border border-white/10 rounded-3xl p-8 hover:border-blue-500/40 transition-all duration-300">

              <h3 className="text-2xl font-bold">
                STM32
              </h3>

              <p className="text-gray-400 mt-4">
                ARM Cortex-based development for firmware,
                peripherals and RTOS workflows.
              </p>

            </div>

            {/* ITEM */}
            <div className="bg-[#0B1220] border border-white/10 rounded-3xl p-8 hover:border-blue-500/40 transition-all duration-300">

              <h3 className="text-2xl font-bold">
                ESP32
              </h3>

              <p className="text-gray-400 mt-4">
                IoT systems, WiFi, BLE and cloud-connected
                embedded applications.
              </p>

            </div>

            {/* ITEM */}
            <div className="bg-[#0B1220] border border-white/10 rounded-3xl p-8 hover:border-blue-500/40 transition-all duration-300">

              <h3 className="text-2xl font-bold">
                Jetson Nano
              </h3>

              <p className="text-gray-400 mt-4">
                Edge AI and computer vision systems
                for intelligent embedded deployments.
              </p>

            </div>

            {/* ITEM */}
            <div className="bg-[#0B1220] border border-white/10 rounded-3xl p-8 hover:border-blue-500/40 transition-all duration-300">

              <h3 className="text-2xl font-bold">
                Debugging Tools
              </h3>

              <p className="text-gray-400 mt-4">
                Logic analyzers, UART tools, oscilloscopes
                and firmware debugging workflows.
              </p>

            </div>

          </div>

          {/* ONLINE WORKFLOW */}
          <div className="mt-28">

            <div className="bg-[#0B1220] border border-white/10 rounded-[40px] p-12">

              <div className="text-center">

                <p className="text-blue-500 uppercase tracking-[4px] text-sm font-semibold">
                  Online Learning Workflow
                </p>

                <h3 className="text-4xl font-bold mt-6">
                  How Cortex Labs Training Works
                </h3>

              </div>

              {/* FLOW */}
              <div className="grid lg:grid-cols-6 gap-8 mt-20 text-center">

                {/* STEP */}
                <div>

                  <div className="w-20 h-20 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mx-auto text-2xl font-bold text-blue-500">
                    1
                  </div>

                  <h4 className="mt-6 text-xl font-semibold">
                    Enroll
                  </h4>

                </div>

                {/* STEP */}
                <div>

                  <div className="w-20 h-20 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mx-auto text-2xl font-bold text-blue-500">
                    2
                  </div>

                  <h4 className="mt-6 text-xl font-semibold">
                    Procure Hardware
                  </h4>

                </div>

                {/* STEP */}
                <div>

                  <div className="w-20 h-20 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mx-auto text-2xl font-bold text-blue-500">
                    3
                  </div>

                  <h4 className="mt-6 text-xl font-semibold">
                    Live Sessions
                  </h4>

                </div>

                {/* STEP */}
                <div>

                  <div className="w-20 h-20 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mx-auto text-2xl font-bold text-blue-500">
                    4
                  </div>

                  <h4 className="mt-6 text-xl font-semibold">
                    Weekly Projects
                  </h4>

                </div>

                {/* STEP */}
                <div>

                  <div className="w-20 h-20 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mx-auto text-2xl font-bold text-blue-500">
                    5
                  </div>

                  <h4 className="mt-6 text-xl font-semibold">
                    Debugging & Review
                  </h4>

                </div>

                {/* STEP */}
                <div>

                  <div className="w-20 h-20 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mx-auto text-2xl font-bold text-blue-500">
                    6
                  </div>

                  <h4 className="mt-6 text-xl font-semibold">
                    Final Deployment
                  </h4>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* PROJECTS SHOWCASE */}
      <section id="projects" className="py-28 border-t border-white/10">

        <div className="max-w-7xl mx-auto px-6">

          {/* HEADING */}
          <div className="text-center">

            <p className="text-blue-500 uppercase tracking-[4px] text-sm font-semibold">
              Real Engineering Projects
            </p>

            <h2 className="text-4xl md:text-5xl font-bold mt-6">
              Build Systems That
              <br />
              Solve Real Problems
            </h2>

            <p className="text-gray-400 text-lg mt-6 max-w-3xl mx-auto">
              Cortex Labs focuses on deployment-oriented embedded systems
              projects that combine firmware, IoT, Edge AI and industrial workflows.
            </p>

          </div>

          {/* PROJECT GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-20">

            {/* PROJECT */}
            <div className="bg-[#0B1220] border border-white/10 rounded-3xl overflow-hidden hover:border-blue-500/40 hover:-translate-y-2 transition-all duration-300">

              <div className="h-64 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 flex items-center justify-center">

                <h3 className="text-3xl font-bold text-blue-500">
                  Smart Gateway
                </h3>

              </div>

              <div className="p-6 md:p-8 lg:p-10">

                <p className="text-gray-400 leading-relaxed">
                  Design industrial communication gateways using
                  STM32, MQTT, Modbus and cloud-connected IoT systems.
                </p>

              </div>

            </div>

            {/* PROJECT */}
            <div className="bg-[#0B1220] border border-white/10 rounded-3xl overflow-hidden hover:border-blue-500/40 hover:-translate-y-2 transition-all duration-300">

              <div className="h-64 bg-gradient-to-br from-purple-500/10 to-blue-500/10 flex items-center justify-center">

                <h3 className="text-3xl font-bold text-blue-500">
                  Edge AI Vision Node
                </h3>

              </div>

              <div className="p-6 md:p-8 lg:p-10">

                <p className="text-gray-400 leading-relaxed">
                  Build computer vision systems using Jetson Nano,
                  OpenCV and real-time inference pipelines.
                </p>

              </div>

            </div>

            {/* PROJECT */}
            <div className="bg-[#0B1220] border border-white/10 rounded-3xl overflow-hidden hover:border-blue-500/40 hover:-translate-y-2 transition-all duration-300">

              <div className="h-64 bg-gradient-to-br from-green-500/10 to-blue-500/10 flex items-center justify-center">

                <h3 className="text-3xl font-bold text-blue-500">
                  Solar Monitoring
                </h3>

              </div>

              <div className="p-6 md:p-8 lg:p-10">

                <p className="text-gray-400 leading-relaxed">
                  Monitor renewable energy systems using IoT telemetry,
                  sensor analytics and remote dashboards.
                </p>

              </div>

            </div>

            {/* PROJECT */}
            <div className="bg-[#0B1220] border border-white/10 rounded-3xl overflow-hidden hover:border-blue-500/40 hover:-translate-y-2 transition-all duration-300">

              <div className="h-64 bg-gradient-to-br from-cyan-500/10 to-indigo-500/10 flex items-center justify-center">

                <h3 className="text-3xl font-bold text-blue-500">
                  LoRa Sensor Network
                </h3>

              </div>

              <div className="p-6 md:p-8 lg:p-10">

                <p className="text-gray-400 leading-relaxed">
                  Create long-range low-power sensor systems
                  for industrial and smart infrastructure monitoring.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* LIMITED COHORT */}
      <section className="py-24 border-t border-white/10">

        <div className="max-w-5xl mx-auto px-6 text-center">

          <p className="text-blue-500 uppercase tracking-[4px] text-sm font-semibold">
            Limited Enrollment
          </p>

          <h2 className="text-4xl md:text-5xl font-bold mt-6">
            Only 10 Students
            <br />
            Accepted Per Cohort
          </h2>

          <p className="text-gray-400 text-lg mt-8 leading-relaxed max-w-3xl mx-auto">
            To maintain high-quality mentorship, project reviews,
            debugging guidance and personalized engineering support,
            Cortex Labs accepts only a limited number of students per cohort.
          </p>

        </div>

      </section>


      {/* FINAL CTA */}
      <section className="py-28 border-t border-white/10 overflow-hidden">

        <div className="max-w-6xl mx-auto px-6">

          <div className="relative bg-[#0B1220] border border-white/10 rounded-[40px] overflow-hidden p-8 md:p-12 lg:p-16 text-center">

            {/* Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-500/10 blur-[140px] rounded-full" />

            <div className="relative z-10">

              <p className="text-blue-500 uppercase tracking-[4px] text-sm font-semibold">
                Start Your Engineering Journey
              </p>

              <h2 className="text-6xl font-bold mt-8 leading-tight">

                Build Real
                <span className="text-blue-500">
                  {" "}Embedded Systems
                </span>

                <br />

                Not Just Theory

              </h2>

              <p className="text-gray-400 text-xl mt-8 max-w-3xl mx-auto leading-relaxed">

                Learn practical embedded systems engineering
                through firmware development, RTOS, IoT,
                Edge AI and deployment-oriented projects.

              </p>

              {/* BUTTONS */}
              <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center gap-6 mt-14">

                <button className="bg-blue-600 hover:bg-blue-700 hover:scale-95 transition-all duration-300 px-8 py-4 rounded-2xl font-medium shadow-lg shadow-blue-500/20">

                  Apply For Next Cohort

                </button>

                <button className="border border-white/20 hover:border-blue-500 hover:bg-blue-500/10 hover:scale-95 transition-all duration-300 px-8 py-4 rounded-2xl font-medium">

                  Download Curriculum

                </button>

                <button className="border border-white/20 hover:border-blue-500 hover:bg-blue-500/10 hover:scale-95 transition-all duration-300 px-8 py-4 rounded-2xl font-medium">

                  Contact Cortex Labs

                </button>

              </div>

              {/* PREMIUM POSITIONING */}
              <div className="flex flex-wrap gap-4 mt-10">

                <div className="px-5 py-3 rounded-2xl bg-white/5 border border-white/10 text-sm text-gray-300">
                  Limited To 10 Students Per Batch
                </div>

                <div className="px-5 py-3 rounded-2xl bg-white/5 border border-white/10 text-sm text-gray-300">
                  Live Engineering Mentorship
                </div>

                <div className="px-5 py-3 rounded-2xl bg-white/5 border border-white/10 text-sm text-gray-300">
                  Placement-Oriented Program
                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}