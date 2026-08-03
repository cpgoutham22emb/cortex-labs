import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import HeroSection from "../sections/HeroSection";
import WhatWeDoSection from "../sections/WhatWeDoSection";
import ProjectsSection from "../sections/ProjectsSection";
import WhyCortexSection from "../sections/WhyCortexSection";

export default function Home() {
  return (
    <main className="bg-[#050816] text-white overflow-hidden">

      <Navbar />

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