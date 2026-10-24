"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

import { getCareerPath } from "@/services/training";
import Breadcrumbs from "@/components/Breadcrumbs";
import FreeTrainingConsultation from "@/components/FreeTrainingConsultation";
interface CareerPathData {
  id: number;
  course_id: number;
  course_slug: string;
  title: string;
  regular_price: string;
  founding_price: string;
  founding_batch_active: boolean;
  current_price: string;
  short_description: string;
  badge_text: string;
  cta_text: string;
}

export default function CareerPathPage() {
  const router = useRouter();

  const [careerPath, setCareerPath] =
    useState<CareerPathData | null>(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadCareerPath() {
      try {
        setLoading(true);
        setError(null);

        const data = await getCareerPath();

        setCareerPath(data);
      } catch (err) {
        console.error("Failed to load Career Path:", err);

        setError("Unable to load the Career Path.");
      } finally {
        setLoading(false);
      }
    }

    loadCareerPath();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#050816] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto" />

          <p className="text-gray-400 mt-5">
            Loading Career Path...
          </p>
        </div>
      </main>
    );
  }

  if (error || !careerPath) {
    return (
      <main className="min-h-screen bg-[#050816] text-white flex items-center justify-center px-6">
        <div className="text-center">
          <p className="text-red-400 text-lg">
            {error || "Career Path not found."}
          </p>

          <Link
            href="/training"
            className="inline-flex mt-6 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 transition"
          >
            Back to Training
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#050816] text-white pt-20">

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 pt-8">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Training", href: "/training" },
            { label: "Career Path" },
          ]}
        />
      </div>

      {/* Career Path Hero */}
      <section className="relative overflow-hidden">

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(37,99,235,0.18),_transparent_40%)]" />

        <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-32">

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-16 items-center">

            {/* LEFT */}
            <div>

              <p className="text-blue-400 uppercase tracking-[4px] text-sm font-semibold">
                {careerPath.badge_text}
              </p>

              <h1 className="text-4xl md:text-6xl font-bold leading-tight mt-6">
                {careerPath.title}
              </h1>

              <p className="text-gray-400 text-lg md:text-xl leading-relaxed mt-7 max-w-3xl">
                {careerPath.short_description}
              </p>

              {/* PROGRAM BENEFITS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-10 max-w-2xl">

                <div className="flex items-center gap-3">
                  <CheckCircle2
                    className="text-blue-400 flex-shrink-0"
                    size={20}
                  />

                  <span className="text-gray-300">
                    Structured Curriculum
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <CheckCircle2
                    className="text-blue-400 flex-shrink-0"
                    size={20}
                  />

                  <span className="text-gray-300">
                    Real-World Projects
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <CheckCircle2
                    className="text-blue-400 flex-shrink-0"
                    size={20}
                  />

                  <span className="text-gray-300">
                    Interview Preparation
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <CheckCircle2
                    className="text-blue-400 flex-shrink-0"
                    size={20}
                  />

                  <span className="text-gray-300">
                    Placement Assistance
                  </span>
                </div>

              </div>

            </div>

            {/* RIGHT — PRICE */}
            <div>

              <div className="bg-[#0B1220] border border-blue-500/30 rounded-3xl p-8">

                {careerPath.founding_batch_active && (
                  <p className="text-blue-400 uppercase tracking-[3px] text-sm font-semibold">
                    Founding Batch
                  </p>
                )}

                {careerPath.founding_batch_active && (
                  <p className="text-gray-500 line-through text-lg mt-5">
                    ₹
                    {Number(
                      careerPath.regular_price
                    ).toLocaleString("en-IN")}
                  </p>
                )}

                <p className="text-4xl font-bold text-blue-500 mt-1">
                  ₹
                  {Number(
                    careerPath.current_price
                  ).toLocaleString("en-IN")}
                </p>

                <p className="text-gray-500 text-sm mt-3">
                  One-time program fee
                </p>

                <button
                  type="button"
                  onClick={() => {
                    router.push(
                      `/training/career-path/${careerPath.course_slug}`
                    );
                  }}
                  className="w-full mt-7 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 transition px-6 py-4 rounded-2xl font-semibold"
                >
                  {careerPath.cta_text}

                  <ArrowRight size={18} />
                </button>

              </div>

            </div>

          </div>

        </div>

          <FreeTrainingConsultation />
      </section>

    </main>
  );
}