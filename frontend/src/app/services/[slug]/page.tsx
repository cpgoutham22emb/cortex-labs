"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { isAxiosError } from "axios";
import {
  FaArrowLeft,
  FaArrowRight,
  FaCheckCircle,
  FaMicrochip,
  FaCode,
  FaCogs,
  FaRocket,
  FaLightbulb,
  FaLayerGroup,
  FaProjectDiagram,
  FaLaptopCode,
  FaGraduationCap,
} from "react-icons/fa";

import api from "@/lib/api";
import Breadcrumbs from "@/components/Breadcrumbs";

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

const marketingContent: Record<
  string,
  {
    eyebrow: string;
    headline: string[];
    accent: string;
    intro: string;
    capabilities: {
      icon: typeof FaMicrochip;
      title: string;
      description: string;
    }[];
    process: {
      number: string;
      title: string;
      description: string;
    }[];
    ctaTitle: string;
    ctaDescription: string;
  }
> = {
  consultancy: {
    eyebrow: "ENGINEERING CONSULTANCY",
    headline: ["Complex Challenges.", "Engineering Clarity."],
    accent: "Engineering Clarity.",
    intro:
      "Turn demanding technical challenges into practical engineering solutions. Cortex Labs brings embedded systems expertise, structured problem-solving, and a system-level perspective to your engineering requirements.",
    capabilities: [
      {
        icon: FaMicrochip,
        title: "Embedded Systems Expertise",
        description:
          "Technical guidance for microcontroller-based systems, firmware, peripherals, and hardware interfaces.",
      },
      {
        icon: FaLayerGroup,
        title: "System Architecture",
        description:
          "Structured architectural thinking to support maintainable, scalable, and reliable embedded solutions.",
      },
      {
        icon: FaCode,
        title: "Firmware Engineering",
        description:
          "Practical guidance on low-level software, driver development, code quality, and firmware structure.",
      },
      {
        icon: FaProjectDiagram,
        title: "Technical Problem-Solving",
        description:
          "A systematic approach to debugging, integration challenges, and complex engineering problems.",
      },
    ],
    process: [
      {
        number: "01",
        title: "Understand",
        description:
          "Establish the technical requirements, constraints, and engineering challenges.",
      },
      {
        number: "02",
        title: "Analyze",
        description:
          "Evaluate the problem and identify suitable technical approaches.",
      },
      {
        number: "03",
        title: "Recommend",
        description:
          "Define a practical engineering direction aligned with your requirements.",
      },
      {
        number: "04",
        title: "Move Forward",
        description:
          "Establish the next steps for implementation, integration, or validation.",
      },
    ],
    ctaTitle: "Have a Challenging Engineering Problem?",
    ctaDescription:
      "Let's discuss your requirements and explore a practical path forward.",
  },

  "development-services": {
    eyebrow: "EMBEDDED PRODUCT DEVELOPMENT",
    headline: ["From Engineering Ideas", "to Intelligent Products."],
    accent: "to Intelligent Products.",
    intro:
      "Transform engineering concepts into working embedded solutions. Cortex Labs focuses on firmware engineering, system integration, and practical development approaches that help bring technology ideas closer to implementation.",
    capabilities: [
      {
        icon: FaMicrochip,
        title: "Embedded Firmware",
        description:
          "Develop firmware for microcontrollers, peripheral interfaces, and embedded applications.",
      },
      {
        icon: FaCode,
        title: "Low-Level Software",
        description:
          "Build software components involving registers, device drivers, hardware interfaces, and system behavior.",
      },
      {
        icon: FaCogs,
        title: "System Integration",
        description:
          "Bring firmware, hardware interfaces, and system components together into a coherent solution.",
      },
      {
        icon: FaRocket,
        title: "Prototype Development",
        description:
          "Translate technical concepts into practical prototypes for evaluation and further development.",
      },
    ],
    process: [
      {
        number: "01",
        title: "Discover",
        description:
          "Understand the product concept, functional requirements, and technical constraints.",
      },
      {
        number: "02",
        title: "Design",
        description:
          "Define the firmware structure, interfaces, and development approach.",
      },
      {
        number: "03",
        title: "Develop",
        description:
          "Implement the required software components and integrate the system.",
      },
      {
        number: "04",
        title: "Validate",
        description:
          "Evaluate the implementation against the agreed requirements and identify necessary refinements.",
      },
    ],
    ctaTitle: "Let's Build Something Meaningful.",
    ctaDescription:
      "Have a product concept, prototype requirement, or embedded engineering challenge? Let's explore the technical possibilities.",
  },
};

const trainingContent = {
  eyebrow: "EMBEDDED SYSTEMS TRAINING",
  headline: ["Build Skills.", "Engineer the Future."],
  intro:
    "Develop practical embedded engineering skills through structured learning and hands-on technical work.",
  capabilities: [
    {
      icon: FaGraduationCap,
      title: "Practical Learning",
      description:
        "Build a stronger understanding of embedded concepts through hands-on engineering practice.",
    },
    {
      icon: FaMicrochip,
      title: "Embedded Fundamentals",
      description:
        "Explore microcontrollers, peripherals, firmware, and hardware–software interaction.",
    },
    {
      icon: FaCode,
      title: "Firmware Development",
      description:
        "Strengthen your approach to embedded C, debugging, and low-level programming.",
    },
    {
      icon: FaLaptopCode,
      title: "Project-Based Skills",
      description:
        "Connect theoretical concepts to practical engineering tasks and projects.",
    },
  ],
  process: [
    {
      number: "01",
      title: "Learn",
      description:
        "Understand the concepts and principles behind embedded systems.",
    },
    {
      number: "02",
      title: "Implement",
      description:
        "Translate concepts into code and practical exercises.",
    },
    {
      number: "03",
      title: "Debug",
      description:
        "Investigate behavior, diagnose issues, and refine your implementation.",
    },
    {
      number: "04",
      title: "Apply",
      description:
        "Use your knowledge to approach practical engineering problems.",
    },
  ],
  ctaTitle: "Ready to Explore Embedded Systems?",
  ctaDescription:
    "Explore our training programs and find the learning path that matches your goals.",
};

export default function ServiceDetailPage() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;

  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function fetchService() {
      try {
        setLoading(true);
        setError(null);
        setNotFound(false);
        setService(null);

        const response = await api.get<Service>(
          `/services/${encodeURIComponent(slug)}/`
        );

        if (mounted) {
          setService(response.data);
        }
      } catch (err) {
        console.error("Failed to load service:", err);

        if (!mounted) {
          return;
        }

        if (isAxiosError(err) && err.response?.status === 404) {
          setNotFound(true);
        } else {
          setError(
            "Unable to load this service right now. Please try again."
          );
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    if (slug) {
      fetchService();
    }

    return () => {
      mounted = false;
    };
  }, [slug]);

  const isTraining =
    slug === "training" ||
    slug === "embedded-systems-training";

  const marketing = isTraining
    ? trainingContent
    : marketingContent[slug];

  const heroHeadline =
    marketing && "accent" in marketing
      ? marketing.headline
      : marketing?.headline ?? [];

  return (
    <main
      id="main-content"
      className="min-h-screen overflow-hidden bg-[#050816] text-white"
    >
      {/* Breadcrumbs */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-28 lg:px-8">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Services", href: "/services" },
            ...(service ? [{ label: service.title }] : []),
          ]}
        />
      </div>

      {/* Loading */}
      {loading && (
        <section className="flex min-h-[65vh] items-center justify-center px-6">
          <div className="text-center">
            <div
              className="mx-auto h-12 w-12 animate-spin rounded-full border-2 border-blue-500 border-t-transparent"
              role="status"
              aria-label="Loading service"
            />
            <p className="mt-5 text-gray-400">
              Loading service details...
            </p>
          </div>
        </section>
      )}

      {/* Not Found */}
      {!loading && notFound && (
        <section className="flex min-h-[65vh] items-center justify-center px-6">
          <div className="max-w-lg text-center">
            <p className="text-sm font-semibold uppercase tracking-[3px] text-blue-400">
              Service not found
            </p>

            <h1 className="mt-5 text-3xl font-bold md:text-4xl">
              We couldn't find that service.
            </h1>

            <p className="mt-4 leading-7 text-gray-400">
              This service may no longer be available, or the link may
              be incorrect.
            </p>

            <Link
              href="/services"
              className="mt-8 inline-flex items-center gap-3 rounded-xl bg-blue-600 px-6 py-3 font-semibold transition hover:bg-blue-500"
            >
              <FaArrowLeft />
              Explore Services
            </Link>
          </div>
        </section>
      )}

      {/* API Error */}
      {!loading && !notFound && error && (
        <section className="flex min-h-[65vh] items-center justify-center px-6">
          <div className="max-w-lg text-center">
            <h1 className="text-2xl font-bold">
              Something went wrong
            </h1>

            <p className="mt-4 text-gray-400">{error}</p>

            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-8 rounded-xl bg-blue-600 px-6 py-3 font-semibold transition hover:bg-blue-500"
            >
              Try Again
            </button>
          </div>
        </section>
      )}

      {/* Service Page */}
      {!loading && !error && !notFound && service && (
        <>
          {/* Hero */}
          <section className="relative isolate">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-40 top-0 -z-10 h-[500px] w-[500px] rounded-full bg-blue-600/15 blur-[150px]"
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute -left-40 top-48 -z-10 h-[350px] w-[350px] rounded-full bg-indigo-600/10 blur-[130px]"
            />

            <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-16 sm:py-20 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-24">
              <div>
                <div className="inline-flex items-center gap-3 rounded-full border border-blue-400/20 bg-blue-500/10 px-4 py-2">
                  <span className="h-2 w-2 rounded-full bg-blue-400" />
                  <span className="text-xs font-semibold uppercase tracking-[2px] text-blue-300 sm:text-sm">
                    {marketing?.eyebrow ?? "CORTEX LABS ENGINEERING"}
                  </span>
                </div>

                <h1 className="mt-7 text-4xl font-bold leading-[1.12] tracking-tight sm:text-5xl lg:text-6xl">
                  {marketing ? (
                    <>
                      {heroHeadline.map((line, index) => (
                        <span
                          key={line}
                          className={`block ${
                            index === heroHeadline.length - 1
                              ? "mt-2 text-blue-400"
                              : ""
                          }`}
                        >
                          {line}
                        </span>
                      ))}
                    </>
                  ) : (
                    service.title
                  )}
                </h1>

                <p className="mt-7 max-w-2xl text-lg leading-8 text-gray-300">
                  {marketing?.intro ?? service.short_description}
                </p>

                <div className="mt-8 flex flex-wrap gap-4">
                  <Link
                    href={
                      isTraining
                        ? "/services/training"
                        : "#service-features"
                    }
                    className="inline-flex min-h-12 items-center justify-center gap-3 rounded-xl bg-blue-600 px-6 py-3 font-semibold shadow-lg shadow-blue-500/20 transition hover:-translate-y-0.5 hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                  >
                    {isTraining
                      ? "Explore Training"
                      : "Explore Capabilities"}
                    <FaArrowRight />
                  </Link>

                  <Link
                    href="/services"
                    className="inline-flex min-h-12 items-center justify-center gap-3 rounded-xl border border-white/15 px-6 py-3 font-semibold transition hover:border-blue-400/60 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                  >
                    <FaArrowLeft />
                    All Services
                  </Link>
                </div>

                <div className="mt-10 grid max-w-lg grid-cols-3 gap-4 border-t border-white/10 pt-6">
                  <div>
                    <p className="text-sm font-bold text-white sm:text-base">
                      Engineering
                    </p>
                    <p className="mt-1 text-xs leading-5 text-gray-500 sm:text-sm">
                      First principles
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-bold text-white sm:text-base">
                      Practical
                    </p>
                    <p className="mt-1 text-xs leading-5 text-gray-500 sm:text-sm">
                      Real-world focus
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-bold text-white sm:text-base">
                      Innovation
                    </p>
                    <p className="mt-1 text-xs leading-5 text-gray-500 sm:text-sm">
                      Forward thinking
                    </p>
                  </div>
                </div>
              </div>

              {/* Backend Image */}
              <div className="relative mx-auto w-full max-w-xl">
                <div
                  aria-hidden="true"
                  className="absolute inset-8 rounded-full bg-blue-500/20 blur-[90px]"
                />

                <div className="absolute -inset-3 rounded-[2rem] border border-blue-500/20" />
                <div className="absolute -inset-6 rounded-[2.5rem] border border-white/5" />

                <div className="relative flex min-h-[300px] items-center justify-center overflow-hidden rounded-3xl border border-white/10 bg-[#0B1220] sm:min-h-[400px]">
                  {service.image ? (
                    <img
                      src={service.image}
                      alt={service.title}
                      className="relative z-10 max-h-[480px] w-full object-contain"
                    />
                  ) : (
                    <div className="flex min-h-[300px] flex-col items-center justify-center p-8 text-center sm:min-h-[400px]">
                      <FaMicrochip className="text-6xl text-blue-400/80" />

                      <p className="mt-6 text-sm font-semibold uppercase tracking-[3px] text-blue-300">
                        Cortex Labs
                      </p>

                      <p className="mt-3 text-2xl font-bold">
                        {service.title}
                      </p>

                      <p className="mt-3 max-w-xs text-sm leading-6 text-gray-500">
                        Engineering ideas into practical solutions.
                      </p>
                    </div>
                  )}

                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050816]/30 via-transparent to-transparent" />
                </div>
              </div>
            </div>
          </section>

          {/* Backend Service Description */}
          <section className="border-y border-white/10 bg-[#080D1A]">
            <div className="mx-auto grid max-w-7xl gap-8 px-6 py-14 sm:py-16 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16 lg:px-8">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[3px] text-blue-400">
                  {isTraining
                    ? "THE LEARNING EXPERIENCE"
                    : "THE ENGINEERING OPPORTUNITY"}
                </p>

                <h2 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl">
                  {isTraining
                    ? "Learn by understanding how things work."
                    : "Engineering starts with understanding the problem."}
                </h2>
              </div>

              <div className="self-center">
                <p className="text-lg leading-8 text-gray-300">
                  {service.short_description}
                </p>

                {service.description && (
                  <p className="mt-5 whitespace-pre-line leading-8 text-gray-400">
                    {service.description}
                  </p>
                )}
              </div>
            </div>
          </section>

          {/* Backend Features */}
          {service.features.length > 0 && (
            <section
              id="service-features"
              className="scroll-mt-24 py-20 sm:py-24"
            >
              <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="max-w-3xl">
                  <p className="text-sm font-semibold uppercase tracking-[3px] text-blue-400">
                    WHAT WE OFFER
                  </p>

                  <h2 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
                    Capabilities that move ideas forward.
                  </h2>

                  <p className="mt-5 text-lg leading-8 text-gray-400">
                    Explore the capabilities and deliverables available
                    through this service.
                  </p>
                </div>

                <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {service.features.map((feature, index) => (
                    <article
                      key={feature.id}
                      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0B1220] p-7 transition duration-300 hover:-translate-y-1 hover:border-blue-500/40 hover:shadow-xl hover:shadow-blue-950/30 sm:p-8"
                    >
                      <div
                        aria-hidden="true"
                        className="absolute right-0 top-0 h-28 w-28 rounded-full bg-blue-500/5 blur-2xl transition group-hover:bg-blue-500/10"
                      />

                      <div className="relative">
                        <div className="flex items-center justify-between">
                          <FaCheckCircle className="text-2xl text-blue-400" />

                          <span className="text-sm font-semibold tracking-wider text-gray-600">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                        </div>

                        <h3 className="mt-6 text-xl font-bold leading-snug text-white">
                          {feature.title}
                        </h3>

                        {feature.description && (
                          <p className="mt-4 leading-7 text-gray-400">
                            {feature.description}
                          </p>
                        )}

                        <div className="mt-6 h-1 w-10 rounded-full bg-blue-500/60 transition-all duration-300 group-hover:w-16 group-hover:bg-blue-400" />
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Additional Marketing Capabilities */}
          {marketing && (
            <section className="border-t border-white/10 bg-[#080D1A] py-20 sm:py-24">
              <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="max-w-3xl">
                  <p className="text-sm font-semibold uppercase tracking-[3px] text-blue-400">
                    OUR ENGINEERING FOCUS
                  </p>

                  <h2 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
                    Built around engineering fundamentals.
                  </h2>

                  <p className="mt-5 text-lg leading-8 text-gray-400">
                    A practical, structured approach to engineering
                    challenges, technical implementation, and continuous
                    improvement.
                  </p>
                </div>

                <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                  {marketing.capabilities.map((capability, index) => {
                    const Icon = capability.icon;

                    return (
                      <article
                        key={capability.title}
                        className="group rounded-2xl border border-white/10 bg-[#0B1220] p-6 transition duration-300 hover:-translate-y-1 hover:border-blue-500/40 sm:p-7"
                      >
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-500/10 transition group-hover:bg-blue-500/20">
                          <Icon
                            aria-hidden="true"
                            className="text-xl text-blue-400"
                          />
                        </div>

                        <p className="mt-6 text-xs font-semibold uppercase tracking-[2px] text-gray-600">
                          CAPABILITY {String(index + 1).padStart(2, "0")}
                        </p>

                        <h3 className="mt-3 text-lg font-bold leading-snug">
                          {capability.title}
                        </h3>

                        <p className="mt-3 text-sm leading-7 text-gray-400">
                          {capability.description}
                        </p>
                      </article>
                    );
                  })}
                </div>
              </div>
            </section>
          )}

          {/* Engineering Process */}
          {marketing && (
            <section className="py-20 sm:py-24">
              <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[3px] text-blue-400">
                      OUR APPROACH
                    </p>

                    <h2 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
                      Structured thinking.
                      <span className="block text-blue-400">
                        Practical execution.
                      </span>
                    </h2>

                    <p className="mt-6 leading-8 text-gray-400">
                      Every engineering challenge deserves a clear
                      understanding of the problem, a thoughtful technical
                      approach, and a disciplined path toward implementation.
                    </p>
                  </div>

                  <div className="space-y-4">
                    {marketing.process.map((step) => (
                      <article
                        key={step.number}
                        className="group flex gap-5 rounded-2xl border border-white/10 bg-[#0B1220]/70 p-5 transition hover:border-blue-500/40 sm:gap-7 sm:p-7"
                      >
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-sm font-bold text-blue-400 ring-1 ring-blue-500/20 sm:h-14 sm:w-14">
                          {step.number}
                        </div>

                        <div>
                          <h3 className="text-lg font-bold sm:text-xl">
                            {step.title}
                          </h3>

                          <p className="mt-2 leading-7 text-gray-400">
                            {step.description}
                          </p>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}


          {/* Free Training Consultation */}
          {isTraining && (
            <section className="relative overflow-hidden border-t border-white/10 bg-[#050816] px-6 py-20 sm:py-24 lg:px-8">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -left-32 top-10 h-80 w-80 rounded-full bg-blue-600/10 blur-[120px]"
              />

              <div className="relative mx-auto max-w-7xl">
                <div className="overflow-hidden rounded-3xl border border-blue-500/25 bg-gradient-to-br from-[#0B1220] via-[#0B1220] to-blue-950/40 p-7 sm:p-10 lg:p-14">
                  <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto] lg:gap-16">
                    <div className="max-w-3xl">
                      <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[2px] text-emerald-300 sm:text-sm">
                        <FaCheckCircle />
                        Free 15-Minute Consultation
                      </span>

                      <h2 className="mt-6 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
                        Not sure which training path is right for you?
                        <span className="mt-2 block text-blue-400">
                          Let's figure it out together.
                        </span>
                      </h2>

                      <p className="mt-6 text-base leading-8 text-gray-300 sm:text-lg">
                        Talk with Cortex Labs about your experience, learning
                        goals, and interests in Embedded C, microcontrollers,
                        RTOS, AUTOSAR, or other embedded engineering topics.
                        Book a free online consultation through Google Meet
                        and explore a learning path that fits your goals.
                      </p>

                      <ul className="mt-6 space-y-3 text-sm leading-6 text-gray-300 sm:text-base">
                        <li className="flex items-start gap-3">
                          <FaCheckCircle className="mt-1 shrink-0 text-blue-400" />
                          Discuss your current skills and learning objectives.
                        </li>
                        <li className="flex items-start gap-3">
                          <FaCheckCircle className="mt-1 shrink-0 text-blue-400" />
                          Explore suitable embedded systems training options.
                        </li>
                        <li className="flex items-start gap-3">
                          <FaCheckCircle className="mt-1 shrink-0 text-blue-400" />
                          Choose an available time for your Google Meet session.
                        </li>
                      </ul>
                    </div>

                    <div className="flex flex-col items-start gap-4 lg:items-center">
                      <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-blue-400/20 bg-blue-500/10">
                        <FaGraduationCap className="text-3xl text-blue-400" />
                      </div>

                      <a
                        href="https://calendar.app.google/JYKDJjpdVMpsHKTu5"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-xl bg-blue-600 px-6 py-4 text-center font-semibold text-white shadow-lg shadow-blue-950/30 transition hover:-translate-y-0.5 hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1220] sm:w-auto"
                      >
                        Book a Free Consultation
                        <FaArrowRight />
                      </a>

                      <p className="max-w-xs text-center text-xs leading-5 text-gray-400">
                        Choose a suitable time on our booking page. Your
                        appointment details will be provided through Google
                        Calendar.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}



          {/* Closing CTA */}
          <section className="border-t border-white/10 bg-[#080D1A] px-6 py-20 sm:py-24">
            <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl border border-blue-500/20 bg-[#0B1220] px-6 py-12 text-center sm:px-12 sm:py-16">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-blue-500/15 blur-[100px]"
              />

              <div className="relative">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-400/20 bg-blue-500/10">
                  <FaLightbulb className="text-2xl text-blue-400" />
                </div>

                <p className="mt-6 text-sm font-semibold uppercase tracking-[3px] text-blue-400">
                  LET'S MOVE FORWARD
                </p>

                <h2 className="mx-auto mt-4 max-w-3xl text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
                  {marketing?.ctaTitle ?? "Let's Explore Your Engineering Goals."}
                </h2>

                <p className="mx-auto mt-5 max-w-2xl leading-8 text-gray-400">
                  {marketing?.ctaDescription ??
                    "Explore the capabilities and learning opportunities available through Cortex Labs."}
                </p>

                <div className="mt-8 flex flex-wrap justify-center gap-4">
                  {isTraining ? (
                    <Link
                      href="/services/training"
                      className="inline-flex min-h-12 items-center justify-center gap-3 rounded-xl bg-blue-600 px-7 py-3 font-semibold transition hover:bg-blue-500"
                    >
                      Explore Training
                      <FaArrowRight />
                    </Link>
                  ) : (
                    <Link
                      href="/services"
                      className="inline-flex min-h-12 items-center justify-center gap-3 rounded-xl bg-blue-600 px-7 py-3 font-semibold transition hover:bg-blue-500"
                    >
                      Explore All Services
                      <FaArrowRight />
                    </Link>
                  )}

                  <Link
                    href="/"
                    className="inline-flex min-h-12 items-center justify-center gap-3 rounded-xl border border-white/15 px-7 py-3 font-semibold transition hover:border-blue-400/50 hover:bg-white/5"
                  >
                    Back to Home
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </main>
  );
}