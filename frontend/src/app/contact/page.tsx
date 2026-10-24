"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import {
  FaArrowRight,
  FaCheckCircle,
  FaEnvelope,
  FaLightbulb,
  FaMicrochip,
  FaPaperPlane,
  FaTools,
} from "react-icons/fa";

import api from "@/lib/api";

type EnquiryForm = {
  full_name: string;
  email: string;
  company: string;
  enquiry_type: string;
  subject: string;
  message: string;
};

const initialForm: EnquiryForm = {
  full_name: "",
  email: "",
  company: "",
  enquiry_type: "",
  subject: "",
  message: "",
};

const enquiryTypes = [
  { value: "TRAINING", label: "Technical Training" },
  { value: "CONSULTANCY", label: "Engineering Consultancy" },
  { value: "PRODUCT_DEVELOPMENT", label: "Product Development" },
  { value: "EDGE_AI", label: "Edge AI & Intelligent Systems" },
  { value: "OTHER", label: "Other Enquiry" },
];

export default function ContactPage() {
  const [form, setForm] = useState<EnquiryForm>(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setFieldErrors((previous) => ({
      ...previous,
      [name]: "",
    }));

    setSuccess("");
    setError("");
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!form.full_name.trim()) {
      errors.full_name = "Please enter your full name.";
    }

    if (!form.email.trim()) {
      errors.email = "Please enter your email address.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())
    ) {
      errors.email = "Please enter a valid email address.";
    }

    if (!form.enquiry_type) {
      errors.enquiry_type = "Please select an enquiry type.";
    }

    if (!form.subject.trim()) {
      errors.subject = "Please enter a subject.";
    }

    if (!form.message.trim()) {
      errors.message = "Please describe your enquiry.";
    }

    setFieldErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setSuccess("");
    setError("");

    if (submitting) return;

    if (!validateForm()) return;

    setSubmitting(true);

    try {
      await api.post("/contact/", {
        full_name: form.full_name.trim(),
        email: form.email.trim(),
        company: form.company.trim(),
        enquiry_type: form.enquiry_type,
        subject: form.subject.trim(),
        message: form.message.trim(),
      });

      setSuccess(
        "Thank you for contacting Cortex Labs. Your enquiry has been submitted successfully."
      );

      setForm(initialForm);
      setFieldErrors({});
    } catch (err: unknown) {
      console.error("Contact enquiry submission failed:", err);

      const apiError = err as {
        response?: {
          data?: Record<string, string | string[]>;
        };
      };

      const responseData = apiError.response?.data;

      if (responseData && typeof responseData === "object") {
        const messages = Object.entries(responseData)
          .filter(([key]) => key !== "detail")
          .map(([key, value]) => {
            const message = Array.isArray(value)
              ? value.join(" ")
              : value;

            return `${key.replaceAll("_", " ")}: ${message}`;
          });

        if (messages.length > 0) {
          setError(messages.join(" "));
        } else if (responseData.detail) {
          const detail = responseData.detail;
          setError(
            Array.isArray(detail) ? detail.join(" ") : detail
          );
        } else {
          setError(
            "We couldn't submit your enquiry. Please check your details and try again."
          );
        }
      } else {
        setError(
          "We couldn't connect to our server. Please try again in a moment."
        );
      }
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "mt-2 w-full rounded-xl border border-white/10 bg-[#050816] px-4 py-3.5 text-white outline-none transition placeholder:text-slate-500 focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20";

  const labelClass = "text-sm font-medium text-slate-200";

  return (
    <main className="min-h-screen overflow-hidden bg-[#050816] text-white">
      {/* Hero */}
      <section className="relative px-6 pb-14 pt-32 sm:px-10 sm:pt-36 lg:px-16">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -right-32 -top-16 h-96 w-96 rounded-full bg-blue-600/15 blur-[120px]" />
          <div className="absolute -left-32 top-40 h-80 w-80 rounded-full bg-cyan-500/10 blur-[120px]" />
        </div>

        <div className="relative mx-auto max-w-7xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-2 text-sm font-medium tracking-wide text-blue-300">
            <FaEnvelope />
            CONTACT CORTEX LABS
          </span>

          <h1 className="mt-7 max-w-4xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-7xl">
            Let's Discuss Your
            <span className="mt-2 block bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent">
              Next Engineering Challenge.
            </span>
          </h1>

          <p className="mt-7 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
            Looking for practical engineering training, embedded systems
            consultancy, product development, or Edge AI solutions? Tell us
            what you're working on, and let's explore how Cortex Labs can help.
          </p>
        </div>
      </section>

      {/* Contact content */}
      <section className="px-6 pb-20 sm:px-10 lg:px-16 lg:pb-28">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          {/* Information panel */}
          <aside className="space-y-6">
            <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-7 sm:p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/15 text-xl text-blue-400">
                <FaMicrochip />
              </div>

              <h2 className="mt-6 text-2xl font-bold">
                How can we help?
              </h2>

              <p className="mt-4 leading-7 text-slate-400">
                Every engineering challenge starts with a conversation.
                Share your requirements, goals, or learning objectives so we
                can understand what you need.
              </p>

              <div className="mt-7 space-y-5">
                <div className="flex items-start gap-4">
                  <FaCheckCircle className="mt-1 shrink-0 text-blue-400" />
                  <div>
                    <h3 className="font-semibold">Technical Training</h3>
                    <p className="mt-1 text-sm leading-6 text-slate-400">
                      Discuss courses, practical projects, and engineering
                      learning paths.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <FaTools className="mt-1 shrink-0 text-blue-400" />
                  <div>
                    <h3 className="font-semibold">Engineering Services</h3>
                    <p className="mt-1 text-sm leading-6 text-slate-400">
                      Tell us about your firmware, integration, or product
                      development requirements.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <FaLightbulb className="mt-1 shrink-0 text-blue-400" />
                  <div>
                    <h3 className="font-semibold">Ideas & Innovation</h3>
                    <p className="mt-1 text-sm leading-6 text-slate-400">
                      Explore embedded intelligence, Edge AI, and prototype
                      opportunities.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-blue-400/20 bg-blue-500/[0.06] p-6">
              <p className="text-sm leading-7 text-slate-300">
                Not sure which service fits your requirement? Select
                <span className="font-semibold text-white"> Other Enquiry</span>
                and explain what you have in mind.
              </p>

              <Link
                href="/services"
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-blue-400 transition hover:text-cyan-300"
              >
                Explore our services
                <FaArrowRight />
              </Link>
            </div>
          </aside>

          {/* Enquiry form */}
          <div className="rounded-2xl border border-white/10 bg-[#080d20] p-6 shadow-2xl shadow-blue-950/10 sm:p-9 lg:p-10">
            <div className="mb-8">
              <h2 className="text-2xl font-bold sm:text-3xl">
                Send us an enquiry
              </h2>

              <p className="mt-3 leading-7 text-slate-400">
                Fill in the details below, and we'll receive your enquiry
                through our contact system.
              </p>
            </div>

            {success && (
              <div
                role="status"
                aria-live="polite"
                className="mb-6 flex items-start gap-3 rounded-xl border border-emerald-400/30 bg-emerald-500/10 p-4 text-sm leading-6 text-emerald-300"
              >
                <FaCheckCircle className="mt-1 shrink-0" />
                <span>{success}</span>
              </div>
            )}

            {error && (
              <div
                role="alert"
                className="mb-6 rounded-xl border border-red-400/30 bg-red-500/10 p-4 text-sm leading-6 text-red-300"
              >
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
              <div className="grid gap-6 sm:grid-cols-2">
                {/* Full name */}
                <div>
                  <label htmlFor="full_name" className={labelClass}>
                    Full name <span className="text-red-400">*</span>
                  </label>

                  <input
                    id="full_name"
                    name="full_name"
                    type="text"
                    autoComplete="name"
                    maxLength={150}
                    value={form.full_name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    aria-invalid={!!fieldErrors.full_name}
                    aria-describedby={
                      fieldErrors.full_name ? "full_name-error" : undefined
                    }
                    className={inputClass}
                  />

                  {fieldErrors.full_name && (
                    <p id="full_name-error" className="mt-2 text-sm text-red-400">
                      {fieldErrors.full_name}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className={labelClass}>
                    Email address <span className="text-red-400">*</span>
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    maxLength={254}
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    aria-invalid={!!fieldErrors.email}
                    aria-describedby={
                      fieldErrors.email ? "email-error" : undefined
                    }
                    className={inputClass}
                  />

                  {fieldErrors.email && (
                    <p id="email-error" className="mt-2 text-sm text-red-400">
                      {fieldErrors.email}
                    </p>
                  )}
                </div>

                {/* Company */}
                <div>
                  <label htmlFor="company" className={labelClass}>
                    Company <span className="text-slate-500">(Optional)</span>
                  </label>

                  <input
                    id="company"
                    name="company"
                    type="text"
                    autoComplete="organization"
                    maxLength={200}
                    value={form.company}
                    onChange={handleChange}
                    placeholder="Company or organization"
                    className={inputClass}
                  />
                </div>

                {/* Enquiry type */}
                <div>
                  <label htmlFor="enquiry_type" className={labelClass}>
                    Enquiry type <span className="text-red-400">*</span>
                  </label>

                  <select
                    id="enquiry_type"
                    name="enquiry_type"
                    value={form.enquiry_type}
                    onChange={handleChange}
                    aria-invalid={!!fieldErrors.enquiry_type}
                    aria-describedby={
                      fieldErrors.enquiry_type
                        ? "enquiry_type-error"
                        : undefined
                    }
                    className={`${inputClass} ${
                      form.enquiry_type ? "" : "text-slate-400"
                    }`}
                  >
                    <option value="">Select an enquiry type</option>

                    {enquiryTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>

                  {fieldErrors.enquiry_type && (
                    <p
                      id="enquiry_type-error"
                      className="mt-2 text-sm text-red-400"
                    >
                      {fieldErrors.enquiry_type}
                    </p>
                  )}
                </div>

                {/* Subject */}
                <div className="sm:col-span-2">
                  <label htmlFor="subject" className={labelClass}>
                    Subject <span className="text-red-400">*</span>
                  </label>

                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    maxLength={200}
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="What would you like to discuss?"
                    aria-invalid={!!fieldErrors.subject}
                    aria-describedby={
                      fieldErrors.subject ? "subject-error" : undefined
                    }
                    className={inputClass}
                  />

                  {fieldErrors.subject && (
                    <p id="subject-error" className="mt-2 text-sm text-red-400">
                      {fieldErrors.subject}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div className="sm:col-span-2">
                  <label htmlFor="message" className={labelClass}>
                    Your message <span className="text-red-400">*</span>
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Describe your requirements, questions, or project idea..."
                    aria-invalid={!!fieldErrors.message}
                    aria-describedby={
                      fieldErrors.message ? "message-error" : undefined
                    }
                    className={`${inputClass} resize-y`}
                  />

                  {fieldErrors.message && (
                    <p id="message-error" className="mt-2 text-sm text-red-400">
                      {fieldErrors.message}
                    </p>
                  )}
                </div>
              </div>

              <p className="mt-6 text-xs leading-5 text-slate-500">
                Fields marked with <span className="text-red-400">*</span> are
                required.
              </p>

              <button
                type="submit"
                disabled={submitting}
                className="mt-6 inline-flex w-full items-center justify-center gap-3 rounded-xl bg-blue-600 px-6 py-4 font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
              >
                {submitting ? (
                  "Submitting enquiry..."
                ) : (
                  <>
                    Submit Enquiry
                    <FaPaperPlane />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}