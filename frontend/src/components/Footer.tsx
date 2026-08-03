import {
  FaLinkedin,
  FaGithub,
  FaInstagram,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#020617] border-t border-white/10 py-10">

      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">

        {/* Logo */}
        <div>

          <h2 className="text-2xl font-bold">
            CORTEX <span className="text-blue-500">LABS</span>
          </h2>

          <p className="text-gray-500 text-sm mt-2">
            Embedded Systems • Edge AI • Industrial Intelligence
          </p>

        </div>

        {/* Socials */}
        <div className="flex items-center gap-5 text-2xl text-gray-400">

          <a href="#" className="hover:text-blue-500 transition">
            <FaLinkedin />
          </a>

          <a href="#" className="hover:text-blue-500 transition">
            <FaGithub />
          </a>

          <a href="#" className="hover:text-blue-500 transition">
            <FaInstagram />
          </a>

        </div>

      </div>

      {/* Bottom */}
      <div className="text-center text-gray-500 text-sm mt-10">
        © 2026 Cortex Labs. All rights reserved.
      </div>

    </footer>
  );
}