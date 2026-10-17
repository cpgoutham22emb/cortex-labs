"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useAuthStore } from "@/store/authStore";
import {
  createPaymentOrder,
  verifyPayment,
} from "@/services/payments";
import { loadRazorpay } from "@/lib/razorpay";

import {
  getCourseBySlug,
  type Course,
} from "@/services/courses";

import Breadcrumbs from "@/components/Breadcrumbs";

export default function CourseDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();

  const slug = params.slug as string;

  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [paymentLoading, setPaymentLoading] = useState(false);

  useEffect(() => {
    if (!slug) {
      return;
    }

    const loadCourse = async () => {
      try {
        setLoading(true);

        const data = await getCourseBySlug(slug);

        setCourse(data);
      } catch (error) {
        console.error("Failed to load course:", error);

        toast.error("Unable to load course.");

        setCourse(null);
      } finally {
        setLoading(false);
      }
    };

    loadCourse();
  }, [slug]);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#050816] text-white">
        <div className="mx-auto flex min-h-screen max-w-7xl items-center justify-center px-6">
          <p className="text-gray-500">
            Loading course...
          </p>
        </div>
      </main>
    );
  }

  if (!course) {
    return (
      <main className="min-h-screen bg-[#050816] text-white">
        <div className="mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-6 text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Course Not Found
          </h1>

          <p className="mt-3 text-gray-600">
            The course you are looking for could not be found.
          </p>

          <button
            type="button"
            onClick={() => router.push("/training/courses")}
            className="mt-6 rounded-lg bg-black px-6 py-3 font-semibold text-white transition hover:bg-gray-800"
          >
            Browse Courses
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#050816] text-white">
      <div className="mx-auto max-w-7xl px-6 pt-20 lg:px-8">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Training", href: "/training" },
            { label: "Courses", href: "/training/courses" },
            {
              label: course.title,
            },
          ]}
        />
      </div>

      {/* Hero Section */}
      <section className="border-b border-white/10 bg-[#050816]">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">

            {/* Course Information */}
            <div>
              <div className="mb-5 flex flex-wrap gap-3">
                <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-400">
                  {course.level}
                </span>

                <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-gray-300">
                  {course.duration_hours} Hours
                </span>
              </div>

              <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
                {course.title}
              </h1>

              <p className="mt-6 text-lg leading-8 text-gray-400">
                {course.description}
              </p>

              <div className="mt-8 flex flex-wrap gap-8 text-sm text-gray-400">
                <div>
                  <p className="font-semibold text-white">
                    Level
                  </p>

                  <p className="mt-1 text-gray-400">
                    {course.level}
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-white">
                    Duration
                  </p>

                  <p className="mt-1 text-gray-400">
                    {course.duration_hours} hours
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-white">
                    Category
                  </p>

                  <p className="mt-1 text-gray-400">
                  </p>
                </div>
              </div>
            </div>

            {/* Purchase Card */}
            <div className="lg:pl-10">
              <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#0B1220] shadow-lg shadow-black/20">

                {/* Thumbnail */}
                {course.thumbnail ? (
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="h-64 w-full object-cover"
                  />
                ) : (
                  <div className="flex h-64 w-full items-center justify-center bg-[#050816]">
                    <span className="text-gray-500">
                      Cortex Course
                    </span>
                  </div>
                )}

                <div className="p-8">
                  <p className="text-sm font-medium text-gray-500">
                    Course Price
                  </p>

                  <p className="mt-2 text-4xl font-bold text-cyan-400">
                    ₹
                    {Number(course.price).toLocaleString(
                      "en-IN"
                    )}
                  </p>

                  <p className="mt-2 text-sm text-gray-500">
                    One-time payment
                  </p>

                  <button
                    type="button"
                    onClick={async () => {
                      if (!course) {
                        return;
                      }

                      if (!isAuthenticated) {
                        router.push(
                          `/student/login?next=/training/courses/${course.slug}`,
                        );
                        return;
                      }

                      try {
                        setPaymentLoading(true);

                        const razorpayLoaded = await loadRazorpay();

                        if (!razorpayLoaded) {
                          toast.error("Unable to load payment gateway.");
                          return;
                        }

                        const result = await createPaymentOrder(course.id);

                        const options = {
                          key: result.checkout.key_id,
                          amount: result.checkout.amount,
                          currency: result.checkout.currency,
                          name: "Cortex Labs",
                          description: course.title,
                          order_id: result.checkout.order_id,

                          handler: async (response: {
                            razorpay_payment_id: string;
                            razorpay_order_id: string;
                            razorpay_signature: string;
                          }) => {
                            try {
                              toast.success("Payment completed. Verifying payment...");

                              const verification = await verifyPayment({
                                payment_id: result.payment.id,
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature,
                              });
                            

                              if (verification.payment?.status === "SUCCESS") {
                                  console.log(
                                  "PAYMENT REDIRECT HANDLER: COURSE DETAIL PAGE"
                                );
                                toast.success("Payment verified successfully!");

                                window.location.assign("/student/dashboard");
                                return;
                              }

                              toast.error("Payment verification failed.");
                            } catch (error: any) {
                              console.error("Payment verification failed:", error);

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

                        const razorpay = new window.Razorpay(options);

                        razorpay.open();
                      } catch (error: any) {
                        console.error(error);

                        const message =
                          error?.response?.data?.detail ||
                          "Unable to start payment.";

                        toast.error(message);
                      } finally {
                        setPaymentLoading(false);
                      }
                    }}
                    className="mt-8 w-full rounded-xl bg-blue-600 px-6 py-4 text-base font-semibold text-white transition hover:bg-blue-700"
                  >
                    {paymentLoading ? "Starting payment..." : "Buy Now"}
                  </button>

                  <p className="mt-4 text-center text-xs text-gray-500">
                    Secure payment will be available at checkout.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Course Overview */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="max-w-3xl">
          <h2 className="text-3xl font-bold text-white">
            About This Course
          </h2>

          <p className="mt-5 text-lg leading-8 text-gray-400">
            {course.description}
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">

          <div className="rounded-2xl border border-white/10 bg-[#0B1220] p-6">
            <h3 className="font-semibold text-white">
              Course Level
            </h3>

            <p className="mt-2 text-gray-400">
              {course.level}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#0B1220] p-6">
            <h3 className="font-semibold text-white">
              Course Duration
            </h3>

            <p className="mt-2 text-gray-400">
              {course.duration_hours} hours
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#0B1220] p-6">
            <h3 className="font-semibold text-white">
              Category
            </h3>

            <p className="mt-2 text-gray-400">
              {course.category}
            </p>
          </div>

        </div>
      </section>
    </main>
  );
}