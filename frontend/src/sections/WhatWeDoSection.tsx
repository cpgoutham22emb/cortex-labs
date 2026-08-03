import TrainingBoard from "../assets/images/training-board.jpg";
import ConsultancyDesign from "../assets/images/consultancy-design.jpg";
import DevelopmentPCB from "../assets/images/development-pcb.jpg";

import Image from "next/image";
import Link from "next/link";

import {
  FaGraduationCap,
  FaUsers,
  FaMicrochip,
  FaCheckCircle,
} from "react-icons/fa";

export default function WhatWeDoSection() {
  return (
    <section id="services" className="bg-[#F8FAFC] py-28">

      <div className="max-w-7xl mx-auto px-6">

        {/* HEADING */}
        <div className="text-center">

          <p className="text-blue-600 font-semibold uppercase tracking-[3px] text-sm">
            What We Do
          </p>

          <h2 className="text-5xl font-bold text-[#0B1220] mt-4">
            Training. Consultancy.
            <br />
            Real-World Impact.
          </h2>

          <p className="text-gray-500 mt-6 max-w-2xl mx-auto text-lg">
            We help learners build career-ready embedded systems
            skills and help businesses bring intelligent
            engineering ideas to life.
          </p>

        </div>

        {/* CARDS */}
        <div className="grid lg:grid-cols-3 gap-8 mt-20">

          {/* CARD 1 */}
          <Link href="/training">
            <div className="bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-blue-500/20 hover:-translate-y-2 transition duration-300 cursor-pointer">

                <div className="relative h-56 overflow-hidden bg-black flex items-center justify-center">

                  <Image
                    src={TrainingBoard}
                    alt="Training"
                    fill
                    className="object-contain bg-black hover:scale-105 transition duration-700"
                  />

                </div>

              <div className="p-8">

                <h3 className="text-2xl font-bold text-[#0B1220]">
                  Training
                </h3>

                <p className="text-gray-500 mt-4 leading-relaxed">
                  Industry-oriented embedded systems training
                  with practical projects and real hardware.
                </p>

                <div className="mt-6 space-y-3 text-[#0B1220]">

                  <div className="flex items-center gap-3">
                    <FaCheckCircle className="text-blue-600" />
                    Embedded Systems Fundamentals
                  </div>

                  <div className="flex items-center gap-3">
                    <FaCheckCircle className="text-blue-600" />
                    STM32 / ESP32 / ARM Development
                  </div>

                  <div className="flex items-center gap-3">
                    <FaCheckCircle className="text-blue-600" />
                    RTOS, Drivers & Communication
                  </div>

                  <div className="flex items-center gap-3">
                    <FaCheckCircle className="text-blue-600" />
                    IoT, Edge AI & Real-Time Systems
                  </div>

                </div>

              </div>

            </div>
          </Link>

          {/* CARD 2 */}
          <Link href="/consultancy">
            <div className="bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-blue-500/20 hover:-translate-y-2 transition duration-300 cursor-pointer">

              <div className="relative h-56 overflow-hidden bg-black flex items-center justify-center">

                <Image
                  src={ConsultancyDesign}
                  alt="Consultancy"
                  fill
                  className="object-contain bg-black hover:scale-105 transition duration-700"
                />

              </div>

              <div className="p-8">

                <h3 className="text-2xl font-bold text-[#0B1220]">
                  Consultancy
                </h3>

                <p className="text-gray-500 mt-4 leading-relaxed">
                  Get expert guidance for architecture design,
                  product development and technical strategy.
                </p>

                <div className="mt-6 space-y-3 text-[#0B1220]">

                  <div className="flex items-center gap-3">
                    <FaCheckCircle className="text-blue-600" />
                    Product Architecture & Feasibility
                  </div>

                  <div className="flex items-center gap-3">
                    <FaCheckCircle className="text-blue-600" />
                    Technology & Platform Selection
                  </div>

                  <div className="flex items-center gap-3">
                    <FaCheckCircle className="text-blue-600" />
                    Technical Advisory & Code Review
                  </div>

                  <div className="flex items-center gap-3">
                    <FaCheckCircle className="text-blue-600" />
                    Prototype & MVP Guidance
                  </div>

                </div>

              </div>

            </div>
          </Link>

          {/* CARD 3 */}
          <Link href="/development-services">
            <div className="bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-blue-500/20 hover:-translate-y-2 transition duration-300 cursor-pointer">

              <div className="relative h-56 overflow-hidden bg-black flex items-center justify-center">

                <Image
                  src={DevelopmentPCB}
                  alt="Development"
                  fill
                  className="object-contain bg-black hover:scale-105 transition duration-700"
                />

              </div>

              <div className="p-8">

                <h3 className="text-2xl font-bold text-[#0B1220]">
                  Development Services
                </h3>

                <p className="text-gray-500 mt-4 leading-relaxed">
                  End-to-end embedded system development
                  from concept to deployment.
                </p>

                <div className="mt-6 space-y-3 text-[#0B1220]">

                  <div className="flex items-center gap-3">
                    <FaCheckCircle className="text-blue-600" />
                    Firmware Development
                  </div>

                  <div className="flex items-center gap-3">
                    <FaCheckCircle className="text-blue-600" />
                    Hardware Design & Bring-up
                  </div>

                  <div className="flex items-center gap-3">
                    <FaCheckCircle className="text-blue-600" />
                    IoT & Cloud Integration
                  </div>

                  <div className="flex items-center gap-3">
                    <FaCheckCircle className="text-blue-600" />
                    Testing, Validation & Optimization
                  </div>

                </div>

              </div>

            </div>
          </Link>  

        </div>

      </div>

    </section>
  );
}