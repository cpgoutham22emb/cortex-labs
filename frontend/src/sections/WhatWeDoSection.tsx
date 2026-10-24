"use client";
import { useEffect, useState } from "react";
import api from "@/lib/api";

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

interface ServiceFeature {
  id: number;
  title: string;
  description: string;
  display_order: number;
}

interface Service {
  id: number;
  title: string;
  slug: string;
  short_description: string;
  description: string;
  icon: string;
  image: string | null;
  display_order: number;
  is_published: boolean;
  features: ServiceFeature[];
}

export default function WhatWeDoSection() {

  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await api.get<Service[]>("/services/");
        setServices(response.data);
      } catch (err) {
        console.error("Failed to load services:", err);
        setError("Unable to load services.");
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);
  return (
    <section
      id="services"
      className="bg-[#F8FAFC] py-28 scroll-mt-24"
    >

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
        {/* CARDS */}
        <div className="grid lg:grid-cols-3 gap-8 mt-20">
          {loading && (
            <p className="lg:col-span-3 text-center text-gray-500">
              Loading services...
            </p>
          )}

          {!loading && error && (
            <p className="lg:col-span-3 text-center text-red-500">
              {error}
            </p>
          )}

          {!loading && !error && services.length === 0 && (
            <p className="lg:col-span-3 text-center text-gray-500">
              No services are currently available.
            </p>
          )}

          {!loading &&
            !error &&
            services.map((service) => (
              <Link
                key={service.id}
                href={
                  service.slug === "embedded-systems-training"
                    ? "/services/training"
                    : `/services/${service.slug}`
                }
                className="block"
              >
                <div className="bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-blue-500/20 hover:-translate-y-2 transition duration-300 cursor-pointer">
                  {/* Service Image */}
                  <div className="relative h-56 overflow-hidden bg-black flex items-center justify-center">
                    {service.image ? (
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-contain bg-black hover:scale-105 transition duration-700"
                      />
                    ) : (
                      <div className="text-white text-lg">
                        {service.title}
                      </div>
                    )}
                  </div>

                  {/* Service Content */}
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-[#0B1220]">
                      {service.title}
                    </h3>

                    <p className="text-gray-500 mt-4 leading-relaxed">
                      {service.short_description}
                    </p>

                    <div className="mt-6 space-y-3 text-[#0B1220]">
                      {service.features.map((feature) => (
                        <div
                          key={feature.id}
                          className="flex items-center gap-3"
                        >
                          <FaCheckCircle className="text-blue-600 shrink-0" />

                          <span>{feature.title}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
        </div>

      </div>

    </section>
  );
}