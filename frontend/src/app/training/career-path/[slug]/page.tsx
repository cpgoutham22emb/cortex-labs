"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  FolderKanban,
  GraduationCap,
  ShieldCheck,
} from "lucide-react";
import { toast } from "react-hot-toast";

import { getCareerPath, type CareerPath } from "@/services/training";
import { createPaymentOrder, verifyPayment } from "@/services/payments";
import { loadRazorpay } from "@/lib/razorpay";
import { useAuthStore } from "@/store/authStore";
import Breadcrumbs from "@/components/Breadcrumbs";
import FreeTrainingConsultation from "@/components/FreeTrainingConsultation";

export default function CareerPathProductPage() {
  const params = useParams();
  const router = useRouter();

  const slug = params.slug as string;

  const { isAuthenticated } = useAuthStore();

  const [careerPath, setCareerPath] =
    useState<CareerPath | null>(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  const [paymentLoading, setPaymentLoading] =
    useState(false);

  useEffect(() => {
    if (!slug) {
      return;
    }

    async function loadCareerPath() {
      try {
        setLoading(true);
        setError(null);

        const data = await getCareerPath();

        if (data.course_slug !== slug) {
          setError("Career Path not found.");
          return;
        }

        setCareerPath(data);
      } catch (error) {
        console.error(
          "Failed to load Career Path:",
          error
        );

        setError(
          "Unable to load the Career Path."
        );
      } finally {
        setLoading(false);
      }
    }

    loadCareerPath();
  }, [slug]);

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
            href="/training/career-path"
            className="inline-flex mt-6 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 transition"
          >
            Back to Career Path
          </Link>
        </div>
      </main>
    );
  }

  const handleEnrollment = async () => {
    if (!isAuthenticated) {
      router.push(
        `/student/login?next=/training/career-path/${careerPath.course_slug}`
      );
      return;
    }

    try {
      setPaymentLoading(true);

      const razorpayLoaded = await loadRazorpay();

      if (!razorpayLoaded) {
        toast.error(
          "Unable to load payment gateway."
        );
        return;
      }

      /*
       * Career Path is linked to a Course in the backend.
       * The linked Course ID is used by the existing
       * payment/enrollment infrastructure.
       */
      const result = await createPaymentOrder(
        careerPath.course_id
      );

      const options = {
        key: result.checkout.key_id,
        amount: result.checkout.amount,
        currency: result.checkout.currency,
        name: "Cortex Labs",
        description: careerPath.title,
        order_id: result.checkout.order_id,

        handler: async (response: {
          razorpay_payment_id: string;
          razorpay_order_id: string;
          razorpay_signature: string;
        }) => {
          try {
            toast.success(
              "Payment completed. Verifying payment..."
            );

            const verification =
              await verifyPayment({
                payment_id: result.payment.id,
                razorpay_order_id:
                  response.razorpay_order_id,
                razorpay_payment_id:
                  response.razorpay_payment_id,
                razorpay_signature:
                  response.razorpay_signature,
              });

            if (verification.payment?.status === "SUCCESS") {
              toast.success(
                "Payment verified successfully!"
              );

              router.push(
                "/student/dashboard"
              );

              return;
            }

            toast.error(
              "Payment verification failed."
            );
          } catch (error: any) {
            console.error(
              "Payment verification failed:",
              error
            );

            const message =
              error?.response?.data?.detail ||
              "Payment verification failed.";

            toast.error(message);
          }
        },

        modal: {
          ondismiss: () => {
            toast("Payment cancelled.");
          },
        },

        theme: {
          color: "#000000",
        },
      };

      const razorpay =
        new window.Razorpay(options);

      razorpay.open();
    } catch (error: any) {
      console.error(
        "Unable to start payment:",
        error
      );

      const message =
        error?.response?.data?.detail ||
        "Unable to start payment.";

      toast.error(message);
    } finally {
      setPaymentLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#050816] text-white pt-20">

      {/* =====================================================
          BREADCRUMB
      ====================================================== */}

      <div className="mx-auto max-w-7xl px-6 pt-8 lg:px-8">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            {
              label: "Training",
              href: "/training",
            },
            {
              label: "Career Path",
              href: "/training/career-path",
            },
            {
              label: careerPath.title,
            },
          ]}
        />
      </div>

      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="relative overflow-hidden">

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(37,99,235,0.18),_transparent_40%)]" />

        <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-8">

          <div className="grid gap-12 lg:grid-cols-[1fr_400px] lg:items-center">

            <div>

              <p className="text-sm font-semibold uppercase tracking-[4px] text-blue-400">
                {careerPath.badge_text}
              </p>

              <h1 className="mt-6 text-4xl font-bold leading-tight md:text-6xl">
                {careerPath.title}
              </h1>

              <p className="mt-7 max-w-3xl text-lg leading-relaxed text-gray-400 md:text-xl">
                {careerPath.short_description}
              </p>

              <div className="mt-10 grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-2">

                <div className="flex items-center gap-3">
                  <CheckCircle2
                    size={20}
                    className="flex-shrink-0 text-blue-400"
                  />

                  <span className="text-gray-300">
                    Structured Curriculum
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <CheckCircle2
                    size={20}
                    className="flex-shrink-0 text-blue-400"
                  />

                  <span className="text-gray-300">
                    Real-World Projects
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <CheckCircle2
                    size={20}
                    className="flex-shrink-0 text-blue-400"
                  />

                  <span className="text-gray-300">
                    Interview Preparation
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <CheckCircle2
                    size={20}
                    className="flex-shrink-0 text-blue-400"
                  />

                  <span className="text-gray-300">
                    Placement Assistance
                  </span>
                </div>

              </div>

            </div>

            {/* PRICE CARD */}

            <div className="rounded-3xl border border-blue-500/30 bg-[#0B1220] p-8">

              {careerPath.founding_batch_active && (
                <p className="text-sm font-semibold uppercase tracking-[3px] text-blue-400">
                  Founding Batch
                </p>
              )}

              {careerPath.founding_batch_active && (
                <p className="mt-5 text-xl text-gray-500 line-through">
                  ₹
                  {Number(
                    careerPath.regular_price
                  ).toLocaleString("en-IN")}
                </p>
              )}

              <p className="mt-1 text-4xl font-bold text-white">
                ₹
                {Number(
                  careerPath.current_price
                ).toLocaleString("en-IN")}
              </p>

              <p className="mt-3 text-sm text-gray-500">
                One-time program fee
              </p>

              <button
                type="button"
                disabled={paymentLoading}
                onClick={handleEnrollment}
                className="mt-7 flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 px-6 py-4 font-semibold transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {paymentLoading
                  ? "Starting payment..."
                  : "BUY NOW"}

                <ArrowRight size={18} />
              </button>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          CURRICULUM
      ====================================================== */}

      <section className="border-t border-white/10 py-24">

        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          <div className="mx-auto max-w-3xl text-center">

            <GraduationCap
              className="mx-auto text-blue-400"
              size={42}
            />

            <p className="mt-6 text-sm font-semibold uppercase tracking-[4px] text-blue-400">
              Curriculum
            </p>

            <h2 className="mt-5 text-3xl font-bold md:text-4xl">
              Your Career Journey
            </h2>

            <p className="mt-5 text-lg leading-relaxed text-gray-400">
              Follow the structured learning path from
              programming fundamentals to industry-ready
              embedded engineering.
            </p>

          </div>

          <div className="mt-14 space-y-6">

            {careerPath.stages.map(
              (stage, index) => (
                <article
                  key={stage.id}
                  className="rounded-3xl border border-white/10 bg-[#0B1220] p-7 md:p-9"
                >

                  <div className="flex flex-col gap-6 md:flex-row">

                    <div className="flex-shrink-0">

                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10 font-bold text-blue-400">
                        {String(index + 1).padStart(
                          2,
                          "0"
                        )}
                      </div>

                    </div>

                    <div className="flex-1">

                      <h3 className="text-2xl font-bold">
                        {stage.title}
                      </h3>

                      <p className="mt-3 leading-relaxed text-gray-400">
                        {stage.description}
                      </p>

                      {stage.topics.length > 0 && (
                        <div className="mt-6 flex flex-wrap gap-3">

                          {stage.topics.map(
                            (topic) => (
                              <span
                                key={topic.id}
                                className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-300"
                              >
                                {topic.title}
                              </span>
                            )
                          )}

                        </div>
                      )}

                    </div>

                  </div>

                </article>
              )
            )}

          </div>

        </div>

      </section>

      {/* =====================================================
          PROJECTS
      ====================================================== */}

      <section className="border-t border-white/10 py-24">

        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          <div className="mx-auto max-w-3xl text-center">

            <FolderKanban
              className="mx-auto text-cyan-400"
              size={42}
            />

            <p className="mt-6 text-sm font-semibold uppercase tracking-[4px] text-cyan-400">
              Projects
            </p>

            <h2 className="mt-5 text-3xl font-bold md:text-4xl">
              Build Real Embedded Systems
            </h2>

            <p className="mt-5 text-lg leading-relaxed text-gray-400">
              Apply what you learn through practical,
              industry-oriented projects.
            </p>

          </div>

          <div className="mt-14 grid grid-cols-1 gap-7 lg:grid-cols-2">

            {careerPath.projects.map(
              (project, index) => (
                <article
                  key={project.id}
                  className="rounded-3xl border border-white/10 bg-[#0B1220] p-7 md:p-9"
                >

                  <div className="flex items-start gap-5">

                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl border border-cyan-500/20 bg-cyan-500/10 font-bold text-cyan-400">
                      {String(index + 1).padStart(
                        2,
                        "0"
                      )}
                    </div>

                    <div>

                      <h3 className="text-xl font-bold md:text-2xl">
                        {project.title}
                      </h3>

                      <p className="mt-3 leading-relaxed text-gray-400">
                        {project.description}
                      </p>

                    </div>

                  </div>

                  {project.steps.length > 0 && (
                    <div className="mt-7 space-y-3">

                      {project.steps.map(
                        (step) => (
                          <div
                            key={step.id}
                            className="flex items-start gap-3"
                          >

                            <CheckCircle2
                              size={18}
                              className="mt-0.5 flex-shrink-0 text-cyan-400"
                            />

                            <span className="text-gray-300">
                              {step.title}
                            </span>

                          </div>
                        )
                      )}

                    </div>
                  )}

                </article>
              )
            )}

          </div>

        </div>

      </section>

      {/* =====================================================
          CAREER SUPPORT
      ====================================================== */}

      <section className="border-t border-white/10 py-24">

        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          <div className="mx-auto max-w-3xl text-center">

            <ShieldCheck
              className="mx-auto text-blue-400"
              size={42}
            />

            <p className="mt-6 text-sm font-semibold uppercase tracking-[4px] text-blue-400">
              Career Support
            </p>

            <h2 className="mt-5 text-3xl font-bold md:text-4xl">
              Support Beyond Technical Training
            </h2>

            <p className="mt-5 text-lg leading-relaxed text-gray-400">
              Get support that helps you turn your technical
              learning into career readiness.
            </p>

          </div>

          <div className="mt-14 grid grid-cols-1 gap-7 md:grid-cols-2">

            {careerPath.support_categories.map(
              (category) => (
                <article
                  key={category.id}
                  className="rounded-3xl border border-white/10 bg-[#0B1220] p-8"
                >

                  <h3 className="text-2xl font-bold">
                    {category.title}
                  </h3>

                  <p className="mt-3 text-gray-400">
                    {category.description}
                  </p>

                  {category.items.length > 0 && (
                    <div className="mt-6 space-y-3">

                      {category.items.map(
                        (item) => (
                          <div
                            key={item.id}
                            className="flex items-start gap-3"
                          >

                            <CheckCircle2
                              size={18}
                              className="mt-0.5 flex-shrink-0 text-blue-400"
                            />

                            <span className="text-gray-300">
                              {item.title}
                            </span>

                          </div>
                        )
                      )}

                    </div>
                  )}

                </article>
              )
            )}

          </div>

        </div>

      </section>

      {/* =====================================================
          FINAL ENROLLMENT CTA
      ====================================================== */}

      <section className="border-t border-white/10 py-28">

        <div className="mx-auto max-w-4xl px-6 text-center">

          <h2 className="text-3xl font-bold md:text-5xl">
            Start Your Embedded Engineering Journey
          </h2>

          <p className="mt-6 text-lg leading-relaxed text-gray-400">
            Build the technical foundation, practical
            experience and career skills required for an
            embedded engineering career.
          </p>

          <button
            type="button"
            disabled={paymentLoading}
            onClick={handleEnrollment}
            className="mt-9 inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-8 py-4 font-semibold transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {paymentLoading
              ? "Starting payment..."
              : careerPath.cta_text}

            <ArrowRight size={18} />
          </button>

        </div>
          <FreeTrainingConsultation />
      </section>

    </main>
  );
}