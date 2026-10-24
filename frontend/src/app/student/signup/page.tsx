"use client";

import { useEffect, useState } from "react";
import type { SyntheticEvent } from "react";
import { useAuthStore } from "@/store/authStore";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { register } from "@/services/auth";

export default function SignupPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, isAuthenticated } = useAuthStore();

  const next = searchParams.get("next") || "/student/dashboard";

  useEffect(() => {
    if (isAuthenticated && user?.role === "STUDENT") {
      router.replace("/student/dashboard");
    }
  }, [isAuthenticated, user, router]);

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    password: "",
    confirm_password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !form.first_name ||
      !form.last_name ||
      !form.email ||
      !form.password
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }

    if (form.password !== form.confirm_password) {
      toast.error("Passwords do not match.");
      return;
    }

    if (form.password.length < 8) {
      toast.error("Password must be at least 8 characters.");
      return;
    }

    try {
      setLoading(true);

      await register(
        form.email,
        form.password,
        form.first_name,
        form.last_name,
        form.phone_number,
      );

      toast.success("Account created successfully!");

      router.push(
        `/student/login?next=${encodeURIComponent(next)}`,
      );
    } catch (error: any) {
      const detail =
        error?.response?.data?.detail ||
        error?.response?.data?.email?.[0] ||
        error?.response?.data?.password?.[0] ||
        "Unable to create account.";

      toast.error(detail);
    } finally {
      setLoading(false);
    }
  };

  if (isAuthenticated && user?.role === "STUDENT") {
    return null;
  }
  return (
    <main className="min-h-screen bg-[#050A14] text-white flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">

        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold">
            Create Your Account
          </h1>

          <p className="text-gray-400 mt-3">
            Start learning Embedded Systems with Cortex.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-[#0B1220] border border-white/10 rounded-2xl p-6 md:p-8 space-y-5"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div>
              <label className="block text-sm text-gray-300 mb-2">
                First Name *
              </label>

              <input
                type="text"
                name="first_name"
                value={form.first_name}
                onChange={handleChange}
                className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 outline-none focus:border-blue-500"
                placeholder="First name"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-2">
                Last Name *
              </label>

              <input
                type="text"
                name="last_name"
                value={form.last_name}
                onChange={handleChange}
                className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 outline-none focus:border-blue-500"
                placeholder="Last name"
              />
            </div>

          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-2">
              Email *
            </label>

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 outline-none focus:border-blue-500"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-2">
              Phone Number
            </label>

            <input
              type="tel"
              name="phone_number"
              value={form.phone_number}
              onChange={handleChange}
              className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 outline-none focus:border-blue-500"
              placeholder="Phone number"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-2">
              Password *
            </label>

            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 outline-none focus:border-blue-500"
              placeholder="Minimum 8 characters"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-2">
              Confirm Password *
            </label>

            <input
              type="password"
              name="confirm_password"
              value={form.confirm_password}
              onChange={handleChange}
              className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 outline-none focus:border-blue-500"
              placeholder="Confirm password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg py-3 font-semibold transition"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>

          <p className="text-center text-sm text-gray-400">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() =>
                router.push(
                  `/student/login?next=${encodeURIComponent(next)}`,
                )
              }
              className="text-blue-400 hover:text-blue-300"
            >
              Login
            </button>
          </p>
        </form>

      </div>
    </main>
  );
}