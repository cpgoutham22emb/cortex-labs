"use client";

import Gateway from "../assets/images/gateway.jpg";
import VisionNode from "../assets/images/vision-node.jpg";
import SolarMonitor from "../assets/images/solar-monitor.jpg";
import LoraNode from "../assets/images/lora-node.jpg";
import BMSBoard from "../assets/images/bms-board.jpg";

import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";

import { Autoplay } from "swiper/modules";

export default function ProjectsSection() {
  const projects = [
    {
      title: "Smart Industrial Gateway",
      image: Gateway,
      description:
        "Edge gateway with MQTT, Modbus and remote monitoring.",
      tech: ["STM32", "Linux", "MQTT"],
    },

    {
      title: "AI-Powered Vision Node",
      image: VisionNode,
      description:
        "Edge AI camera for real-time object detection and analytics.",
      tech: ["Jetson Nano", "Python", "OpenCV"],
    },

    {
      title: "Solar Monitoring System",
      image: SolarMonitor,
      description:
        "IoT-based solar monitoring with alerts and analytics.",
      tech: ["ESP32", "IoT", "Dashboard"],
    },

    {
      title: "LoRa Sensor Node",
      image: LoraNode,
      description:
        "Long-range low-power sensor node for field monitoring.",
      tech: ["LoRa", "Low Power", "Sensors"],
    },

    {
      title: "BMS for Li-ion Battery",
      image: BMSBoard,
      description:
        "Battery management system with balancing and protection.",
      tech: ["STM32", "BMS", "CAN"],
    },
  ];

  return (
    <section id="projects" className="relative bg-[#F8FAFC] py-28 overflow-hidden">
      
      {/* Glow */}
      <div className="group bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-100 hover:-translate-y-3 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500">
        
        <div className="max-w-7xl mx-auto px-6">

          {/* HEADING */}
          <div className="text-center">

            <p className="text-blue-600 font-semibold uppercase tracking-[3px] text-sm">
              Projects & Prototypes
            </p>

            <h2 className="text-5xl font-bold text-[#0B1220] mt-4">
              Ideas We Build
            </h2>

            <p className="text-gray-500 mt-6 max-w-2xl mx-auto text-lg">
              A glimpse of the embedded solutions and intelligent
              systems we design and experiment with.
            </p>

          </div>

          {/* SLIDER */}
          <div className="mt-16 w-full">
            <Swiper
              modules={[Autoplay]}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              loop={true}
              spaceBetween={30}
              speed={1200}
              slidesPerView={1}
              grabCursor={true}
              breakpoints={{
                640: {
                  slidesPerView: 1,
                },
                768: {
                  slidesPerView: 2,
                },
                1024: {
                  slidesPerView: 3,
                },
                1280: {
                  slidesPerView: 4,
                },
              }}
            >

              {projects.map((project, index) => (
                <SwiperSlide key={index}>

                  <div className="group bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-100 hover:-translate-y-3 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500">

                    {/* IMAGE AREA */}
                    <div className="relative h-56 overflow-hidden">

                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-110 transition duration-700"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                    </div>

                    {/* CONTENT */}
                    <div className="p-6">

                      <h3 className="text-xl font-bold text-[#0B1220]">
                        {project.title}
                      </h3>

                      <p className="text-gray-500 mt-4 text-sm leading-relaxed">
                        {project.description}
                      </p>

                      {/* TECH TAGS */}
                      <div className="flex flex-wrap gap-2 mt-6">

                        {project.tech.map((item, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-medium hover:bg-blue-600 hover:text-white transition duration-300 cursor-default"
                          >
                            {item}
                          </span>
                        ))}

                      </div>

                    </div>

                  </div>

                </SwiperSlide>
              ))}

            </Swiper>

          </div>

        </div>

      </div>

    </section>
  );
}