import {
  FaBolt,
  FaMicrochip,
  FaBrain,
  FaTools,
} from "react-icons/fa";

export default function WhyCortexSection() {
  return (
    <section id="about" className="relative bg-[#050816] py-28 overflow-hidden">

      {/* Glow */}
      <div className="absolute left-0 top-0 w-[500px] h-[500px] bg-blue-500/10 blur-[140px] rounded-full" />

      <div className="relative max-w-7xl mx-auto px-6">

        {/* HEADING */}
        <div className="text-center">

          <p className="text-blue-500 uppercase tracking-[4px] text-sm font-semibold">
            Why Cortex Labs
          </p>

          <h2 className="text-5xl font-bold mt-4">
            Built for Engineers.
            <br />
            Designed for the Future.
          </h2>

          <p className="text-gray-400 mt-6 max-w-2xl mx-auto text-lg leading-relaxed">
            We focus on practical engineering, intelligent systems,
            real-world deployment and industry-oriented innovation.
          </p>

        </div>

        {/* FEATURES */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-20">

          {/* ITEM */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md hover:border-blue-500/30 transition">

            <FaBolt className="text-4xl text-blue-500" />

            <h3 className="text-2xl font-semibold mt-6">
              Practical Approach
            </h3>

            <p className="text-gray-400 mt-4 leading-relaxed">
              Learn and build using real-world engineering workflows
              instead of theoretical-only concepts.
            </p>

          </div>

          {/* ITEM */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md hover:border-blue-500/30 transition">

            <FaMicrochip className="text-4xl text-blue-500" />

            <h3 className="text-2xl font-semibold mt-6">
              Embedded Expertise
            </h3>

            <p className="text-gray-400 mt-4 leading-relaxed">
              Firmware, RTOS, Embedded Linux, IoT and Edge AI systems
              engineered for modern infrastructure.
            </p>

          </div>

          {/* ITEM */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md hover:border-blue-500/30 transition">

            <FaBrain className="text-4xl text-blue-500" />

            <h3 className="text-2xl font-semibold mt-6">
              Innovation Focus
            </h3>

            <p className="text-gray-400 mt-4 leading-relaxed">
              Building future-ready intelligent systems combining
              AI, automation and embedded intelligence.
            </p>

          </div>

          {/* ITEM */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md hover:border-blue-500/30 transition">

            <FaTools className="text-4xl text-blue-500" />

            <h3 className="text-2xl font-semibold mt-6">
              Consultancy & R&D
            </h3>

            <p className="text-gray-400 mt-4 leading-relaxed">
              Helping startups and businesses accelerate product
              development and engineering execution.
            </p>

          </div>

        </div>

      </div>

    </section>
  );
}