"use client";

import { useEffect } from "react";

import Footer from "@/components/Footer";
import HeroSection from "@/sections/HeroSection";
import WhatWeDoSection from "@/sections/WhatWeDoSection";
import ProjectsSection from "@/sections/ProjectsSection";
import WhyCortexSection from "@/sections/WhyCortexSection";

export default function ServicesPage() {
  useEffect(() => {
    const timer = window.setTimeout(() => {
      document.getElementById("services")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 300);

    return () => window.clearTimeout(timer);
  }, []);

  return (
    <main className="bg-[#050816] text-white overflow-hidden">
      <div className="space-y-0">
        <HeroSection />
        <WhatWeDoSection />
        <ProjectsSection />
        <WhyCortexSection />
      </div>

      <Footer />
    </main>
  );
}