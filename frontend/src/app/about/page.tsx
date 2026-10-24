import Link from "next/link";
import {
  FaMicrochip,
  FaGraduationCap,
  FaCode,
  FaBrain,
  FaLightbulb,
  FaCompass,
  FaTools,
  FaArrowRight,
  FaCheckCircle,
} from "react-icons/fa";

const capabilities = [
  {
    icon: FaGraduationCap,
    title: "Technical Training",
    description:
      "Build practical engineering skills through structured learning, hands-on projects, and industry-oriented technical guidance.",
    points: [
      "Embedded Systems and Embedded C",
      "Microcontrollers and RTOS",
      "AUTOSAR and Firmware Engineering",
    ],
    href: "/services/training",
    linkText: "Explore Training",
  },
  {
    icon: FaMicrochip,
    title: "Engineering Consultancy",
    description:
      "Get engineering support for embedded software challenges, firmware architecture, hardware-software integration, and technical problem-solving.",
    points: [
      "Firmware architecture and development",
      "Embedded software integration",
      "Technical reviews and engineering guidance",
    ],
    href: "/services/consultancy",
    linkText: "Explore Consultancy",
  },
  {
    icon: FaCode,
    title: "Product Development",
    description:
      "Turn engineering ideas into functional prototypes and embedded solutions, from initial concept to implementation and validation.",
    points: [
      "Embedded prototypes and systems",
      "Hardware-software integration",
      "Firmware and application development",
    ],
    href: "/services/development-services",
    linkText: "Explore Development",
  },
  {
    icon: FaBrain,
    title: "Edge AI and Intelligent Systems",
    description:
      "Explore intelligent systems that combine embedded computing, sensing, data processing, and AI for practical applications.",
    points: [
      "Edge AI and embedded intelligence",
      "Sensor-driven applications",
      "Intelligent industrial solutions",
    ],
    href: "/services/development-services",
    linkText: "Explore Our Capabilities",
  },
];

const principles = [
  {
    number: "01",
    title: "Understand the Problem",
    description:
      "Start with the real engineering challenge, its constraints, and the outcome that needs to be achieved.",
  },
  {
    number: "02",
    title: "Design the Solution",
    description:
      "Choose suitable architectures, technologies, and implementation strategies based on the problem.",
  },
  {
    number: "03",
    title: "Build and Integrate",
    description:
      "Translate concepts into working software, embedded systems, and practical prototypes.",
  },
  {
    number: "04",
    title: "Learn and Improve",
    description:
      "Use testing, technical evaluation, and continuous learning to improve the solution.",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#050816] text-white">
      {/* Hero */}
      <section className="relative px-6 pb-20 pt-32 sm:px-10 sm:pb-24 sm:pt-36 lg:px-16 lg:pb-28">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -right-32 -top-20 h-96 w-96 rounded-full bg-blue-600/15 blur-[120px]" />
          <div className="absolute -left-32 top-48 h-80 w-80 rounded-full bg-cyan-500/10 blur-[120px]" />
        </div>

        <div className="relative mx-auto max-w-7xl">
          <div className="max-w-4xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-2 text-sm font-medium tracking-wide text-blue-300">
              <FaMicrochip />
              ABOUT CORTEX LABS
            </span>

            <h1 className="mt-7 text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-7xl">
              Engineering Knowledge.
              <span className="mt-2 block bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent">
                Building Intelligence.
              </span>
            </h1>

            <p className="mt-7 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
              Cortex Labs brings together technical education, engineering
              consultancy, product development, and Edge AI. Our focus is on
              connecting engineering knowledge with practical implementation
              to help people develop skills and turn ideas into working
              solutions.
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-3 rounded-lg bg-blue-600 px-6 py-3.5 font-semibold text-white transition hover:bg-blue-500"
              >
                Explore Our Services
                <FaArrowRight />
              </Link>

              <Link
                href="/services/training"
                className="inline-flex items-center justify-center rounded-lg border border-white/15 bg-white/[0.04] px-6 py-3.5 font-semibold text-white transition hover:border-blue-400/50 hover:bg-white/[0.08]"
              >
                Discover Our Training
              </Link>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-4 border-t border-white/10 pt-8 sm:grid-cols-3 sm:gap-8">
            <div>
              <p className="text-lg font-semibold text-white">
                Learn
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                Develop practical engineering knowledge.
              </p>
            </div>

            <div>
              <p className="text-lg font-semibold text-white">
                Engineer
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                Solve technical problems with structured thinking.
              </p>
            </div>

            <div>
              <p className="text-lg font-semibold text-white">
                Innovate
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                Explore new technologies and intelligent solutions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Direction */}
      <section className="border-y border-white/[0.06] bg-[#080d20] px-6 py-20 sm:px-10 lg:px-16 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
              Our Direction
            </span>

            <h2 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl">
              Connecting engineering knowledge with real-world application.
            </h2>

            <p className="mt-6 leading-8 text-slate-400">
              Engineering requires more than understanding concepts. It
              requires the ability to analyze problems, make sound technical
              decisions, implement solutions, and understand how systems
              behave in practice.
            </p>

            <p className="mt-4 leading-8 text-slate-400">
              Cortex Labs is being developed around this connection between
              learning and implementation, bringing education, engineering
              services, and emerging technologies together under one
              engineering-focused company.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-7 transition hover:border-blue-400/30">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/15 text-xl text-blue-400">
                <FaCompass />
              </div>
              <h3 className="text-xl font-semibold">Our Mission</h3>
              <p className="mt-3 text-sm leading-7 text-slate-400">
                Make engineering knowledge practical, accessible, and useful
                for solving real technical challenges.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-7 transition hover:border-cyan-400/30">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/15 text-xl text-cyan-300">
                <FaLightbulb />
              </div>
              <h3 className="text-xl font-semibold">Our Vision</h3>
              <p className="mt-3 text-sm leading-7 text-slate-400">
                Build an engineering ecosystem that connects skilled people,
                technical innovation, and practical product development.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="px-6 py-20 sm:px-10 lg:px-16 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
              What We Do
            </span>

            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
              Four capabilities. One engineering mindset.
            </h2>

            <p className="mt-5 leading-7 text-slate-400">
              Our focus spans the engineering lifecycle, from developing
              technical skills to designing, building, and exploring
              intelligent systems.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {capabilities.map((capability) => {
              const Icon = capability.icon;

              return (
                <article
                  key={capability.title}
                  className="group flex h-full flex-col rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.055] to-white/[0.015] p-7 transition duration-300 hover:-translate-y-1 hover:border-blue-400/40 hover:shadow-xl hover:shadow-blue-950/20 sm:p-8"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-500/10 text-2xl text-blue-400 transition group-hover:bg-blue-500/20">
                    <Icon />
                  </div>

                  <h3 className="mt-6 text-xl font-bold sm:text-2xl">
                    {capability.title}
                  </h3>

                  <p className="mt-4 leading-7 text-slate-400">
                    {capability.description}
                  </p>

                  <ul className="mt-6 space-y-3">
                    {capability.points.map((point) => (
                      <li
                        key={point}
                        className="flex items-start gap-3 text-sm leading-6 text-slate-300"
                      >
                        <FaCheckCircle className="mt-1 shrink-0 text-blue-400" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={capability.href}
                    className="mt-7 inline-flex items-center gap-2 pt-2 text-sm font-semibold text-blue-400 transition hover:text-cyan-300"
                  >
                    {capability.linkText}
                    <FaArrowRight className="transition-transform group-hover:translate-x-1" />
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Engineering Approach */}
      <section className="border-y border-white/[0.06] bg-[#080d20] px-6 py-20 sm:px-10 lg:px-16 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
              Our Engineering Approach
            </span>

            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
              From understanding to implementation.
            </h2>

            <p className="mt-5 leading-7 text-slate-400">
              We value clear problem definition, sound technical reasoning,
              practical implementation, and continuous improvement.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {principles.map((principle) => (
              <div
                key={principle.number}
                className="rounded-xl border border-white/10 bg-[#050816] p-6"
              >
                <span className="text-sm font-bold tracking-widest text-blue-400">
                  {principle.number}
                </span>

                <h3 className="mt-4 text-lg font-semibold">
                  {principle.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-400">
                  {principle.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden px-6 py-20 sm:px-10 lg:px-16 lg:py-24">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/15 blur-[110px]" />

        <div className="relative mx-auto max-w-4xl text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-400/20 bg-blue-500/10 text-2xl text-blue-400">
            <FaTools />
          </div>

          <h2 className="mt-6 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
            Have an engineering challenge or an idea to build?
          </h2>

          <p className="mx-auto mt-5 max-w-2xl leading-8 text-slate-400">
            Explore our training programs, engineering capabilities, and
            prototypes to discover how Cortex Labs can support your next step.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/services"
              className="inline-flex items-center justify-center gap-3 rounded-lg bg-blue-600 px-7 py-3.5 font-semibold text-white transition hover:bg-blue-500"
            >
              Explore Services
              <FaArrowRight />
            </Link>

            <Link
              href="/#projects"
              className="inline-flex items-center justify-center rounded-lg border border-white/15 px-7 py-3.5 font-semibold text-white transition hover:border-blue-400/50 hover:bg-white/[0.05]"
            >
              View Projects
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}