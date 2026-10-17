"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import {
  getTrainingLanding,
  type TrainingLandingResponse,
} from "@/services/training";

import Breadcrumbs from "@/components/Breadcrumbs";

export default function TrainingPage() {
  const [trainingData, setTrainingData] =
    useState<TrainingLandingResponse | null>(null);

  const [trainingLoading, setTrainingLoading] = useState(true);

  const [trainingError, setTrainingError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function loadTraining() {
      try {
        setTrainingLoading(true);
        setTrainingError(null);

        const data = await getTrainingLanding();

        if (mounted) {
          setTrainingData(data);
        }
      } catch (error) {
        console.error("Failed to load training data:", error);

        if (mounted) {
          setTrainingError(
            "Unable to load training information right now."
          );
        }
      } finally {
        if (mounted) {
          setTrainingLoading(false);
        }
      }
    }

    loadTraining();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <main className="min-h-screen bg-[#050816] text-white">
      {/* Breadcrumb */}
      <div className="mx-auto max-w-7xl px-6 pt-28 lg:px-8">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Training" },
          ]}
        />
      </div>

      {/* Loading */}
      {trainingLoading && (
        <section className="mx-auto flex min-h-[60vh] max-w-7xl items-center justify-center px-6">
          <div className="text-center">
            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />

            <p className="mt-5 text-gray-400">
              Loading training programs...
            </p>
          </div>
        </section>
      )}

      {/* Error */}
      {!trainingLoading && trainingError && (
        <section className="mx-auto flex min-h-[60vh] max-w-7xl items-center justify-center px-6">
          <div className="text-center">
            <p className="text-lg text-red-400">
              {trainingError}
            </p>

            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-6 rounded-xl bg-blue-600 px-6 py-3 font-semibold transition hover:bg-blue-700"
            >
              Try Again
            </button>
          </div>
        </section>
      )}

      {/* Training Content */}
      {!trainingLoading && !trainingError && trainingData && (
        <>
          {/* Hero */}
          <section className="relative overflow-hidden">
            <div className="absolute right-0 top-0 h-[600px] w-[600px] rounded-full bg-blue-500/10 blur-[140px]" />

            <div className="relative mx-auto max-w-7xl px-6 py-24 lg:px-8">
              <div className="mx-auto max-w-4xl text-center">
                <p className="text-sm font-semibold uppercase tracking-[4px] text-blue-400">
                  Cortex Labs Training
                </p>

                <h1 className="mt-6 text-4xl font-bold leading-tight md:text-6xl">
                  {trainingData.landing_page?.hero_title}
                </h1>

                <p className="mx-auto mt-7 max-w-3xl text-lg leading-relaxed text-gray-400 md:text-xl">
                  {trainingData.landing_page?.hero_description}
                </p>
              </div>
            </div>
          </section>

          {/* Career Training */}
          {trainingData.career_path && (
            <section className="border-t border-white/10 py-20">
              <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mb-10">
                  <p className="text-sm font-semibold uppercase tracking-[4px] text-blue-400">
                    Career Training
                  </p>

                  <h2 className="mt-4 text-3xl font-bold md:text-4xl">
                    Career Path
                  </h2>

                  <p className="mt-4 max-w-2xl text-gray-400">
                    Build the skills and practical experience required
                    for an embedded engineering career.
                  </p>
                </div>

                <div className="rounded-3xl border border-blue-500/30 bg-[#0B1220] p-8 md:p-10">
                  <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
                    <div className="max-w-3xl">
                      <p className="text-sm font-semibold uppercase tracking-[3px] text-blue-400">
                        {trainingData.career_path.badge_text}
                      </p>

                      <h3 className="mt-5 text-3xl font-bold md:text-4xl">
                        {trainingData.career_path.title}
                      </h3>

                      <p className="mt-5 text-lg leading-relaxed text-gray-400">
                        {trainingData.career_path.short_description}
                      </p>
                    </div>

                    <div className="w-full lg:w-auto lg:min-w-[280px]">
                      {trainingData.career_path.founding_batch_active && (
                        <p className="text-sm font-semibold text-blue-400">
                          Founding Batch
                        </p>
                      )}

                      {trainingData.career_path.founding_batch_active && (
                        <p className="mt-3 text-lg text-gray-500 line-through">
                          ₹
                          {Number(
                            trainingData.career_path.regular_price
                          ).toLocaleString("en-IN")}
                        </p>
                      )}

                      <p className="mt-1 text-4xl font-bold text-blue-500">
                        ₹
                        {Number(
                          trainingData.career_path.current_price
                        ).toLocaleString("en-IN")}
                      </p>

                      <Link
                        href="/training/career-path"
                        className="mt-6 inline-flex w-full items-center justify-center rounded-2xl bg-blue-600 px-7 py-4 font-semibold transition hover:bg-blue-700"
                      >
                        {trainingData.career_path.cta_text}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Skill Courses */}
          <section className="border-t border-white/10 py-20">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="text-center">
                <p className="text-sm font-semibold uppercase tracking-[4px] text-cyan-400">
                  Skill Courses
                </p>

                <h2 className="mt-5 text-3xl font-bold md:text-4xl">
                  {trainingData.landing_page?.skill_courses_section_title}
                </h2>

                <p className="mx-auto mt-5 max-w-3xl text-lg leading-relaxed text-gray-400">
                  {trainingData.landing_page?.skill_courses_section_description}
                </p>
              </div>

              {trainingData.skill_courses.length > 0 ? (
                <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {trainingData.skill_courses.map((course) => (
                    <article
                      key={course.id}
                      className="flex flex-col rounded-3xl border border-white/10 bg-[#0B1220] p-8 transition duration-300 hover:-translate-y-1 hover:border-cyan-500/40"
                    >
                      <p className="text-sm font-semibold uppercase tracking-[2px] text-cyan-400">
                        {course.category}
                      </p>

                      <h3 className="mt-4 text-2xl font-bold">
                        {course.title}
                      </h3>

                      <p className="mt-4 flex-1 leading-relaxed text-gray-400">
                        {course.description}
                      </p>

                      <div className="mt-8 flex items-end justify-between gap-4">
                        <div>
                          <p className="text-sm text-gray-500">
                            {course.level}
                          </p>

                          <p className="mt-1 text-sm text-gray-400">
                            {course.duration_hours} hours
                          </p>
                        </div>

                        <p className="text-2xl font-bold text-cyan-400">
                          ₹
                          {Number(course.price).toLocaleString("en-IN")}
                        </p>
                      </div>

                      <Link
                        href={`/training/courses/${course.slug}`}
                        className="mt-8 block rounded-xl border border-cyan-500/30 px-6 py-3 text-center font-semibold transition hover:bg-cyan-500/10"
                      >
                        View Course
                      </Link>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="mt-12 rounded-3xl border border-white/10 bg-[#0B1220] p-10 text-center">
                  <p className="text-gray-400">
                    No skill courses are currently available.
                  </p>
                </div>
              )}

              <div className="mt-12 text-center">
                <Link
                  href="/training/courses"
                  className="inline-flex rounded-2xl bg-cyan-600 px-8 py-4 font-semibold transition hover:bg-cyan-700"
                >
                  {trainingData.landing_page?.skill_courses_cta_text}
                </Link>
              </div>
            </div>
          </section>
        </>
      )}
    </main>
  );
}