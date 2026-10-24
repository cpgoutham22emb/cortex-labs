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
    <section
      id="projects"
      className="relative overflow-hidden bg-[#F8FAFC] py-20 sm:py-24 lg:py-28"
    >
      {/* Subtle Background Decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-20 h-96 w-96 rounded-full bg-blue-500/5 blur-[120px]"
      />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Section Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[3px] text-blue-600">
            Projects & Prototypes
          </p>

          <h2 className="mt-4 text-4xl font-bold tracking-tight text-[#0B1220] sm:text-5xl">
            Ideas We Build
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-gray-500 sm:text-lg sm:leading-8">
            Explore embedded solutions and intelligent systems
            spanning firmware, industrial connectivity, Edge AI,
            energy monitoring, and connected devices.
          </p>
        </div>

        {/* Project Carousel */}
        <div className="mt-12 sm:mt-16">
          <Swiper
            modules={[Autoplay]}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            loop={true}
            spaceBetween={24}
            speed={800}
            slidesPerView={1}
            grabCursor={true}
            breakpoints={{
              640: {
                slidesPerView: 1,
                spaceBetween: 24,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 24,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 24,
              },
              1280: {
                slidesPerView: 4,
                spaceBetween: 24,
              },
            }}
          >
            {projects.map((project) => (
              <SwiperSlide key={project.title} className="h-auto">
                <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-md transition-all duration-300 hover:-translate-y-1.5 hover:border-blue-100 hover:shadow-xl hover:shadow-blue-900/10">
                  {/* Project Image */}
                  <div className="relative h-52 shrink-0 overflow-hidden bg-gray-100 sm:h-56">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 767px) 90vw, (max-width: 1279px) 45vw, 280px"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />

                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-100"
                    />
                  </div>

                  {/* Project Content */}
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="min-h-[3.5rem] text-lg font-bold leading-7 text-[#0B1220] sm:text-xl">
                      {project.title}
                    </h3>

                    <p className="mt-3 min-h-[4.5rem] text-sm leading-6 text-gray-500">
                      {project.description}
                    </p>

                    {/* Technology Tags */}
                    <div className="mt-5 flex flex-wrap gap-2">
                      {project.tech.map((item) => (
                        <span
                          key={item}
                          className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700 transition-colors duration-300 group-hover:border-blue-200 group-hover:bg-blue-100"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Closing Message */}
        <div className="mt-12 text-center sm:mt-16">
          <p className="text-sm leading-6 text-gray-500 sm:text-base">
            Practical engineering. Intelligent systems. Real-world applications.
          </p>
        </div>
      </div>
    </section>
  );
}