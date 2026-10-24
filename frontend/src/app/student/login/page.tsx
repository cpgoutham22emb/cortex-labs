"use client";

import { useEffect, useState } from "react";
import type { SyntheticEvent } from "react";
import { Eye, EyeOff, ArrowRight, Cpu } from "lucide-react";
import { toast } from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";

import { getMe, login } from "@/services/auth";
import { useAuthStore } from "@/store/authStore";

export default function StudentLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setAuth, setAccessToken, user, isAuthenticated  } = useAuthStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
  if (isAuthenticated && user?.role === "STUDENT") {
    router.replace("/student/dashboard");
  }
}, [isAuthenticated, user, router]);

  async function handleSubmit(
    event: SyntheticEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    if (!email || !password) {
      toast.error("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);

      const tokens = await login(
        email,
        password,
      );

      setAccessToken(tokens.access);
      
      const user = await getMe();

      setAuth(
        user,
        tokens.access,
      );

      if (user.role !== "STUDENT") {
        toast.error(
          "This portal is for students.",
        );

        return;
      }

      toast.success("Welcome back!");
      const next = searchParams.get("next");

      router.push(next || "/student/dashboard");
    } catch (error: any) {
      console.error(error);

      const message =
        error?.response?.data?.detail ||
        "Login failed. Please check your credentials.";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  }

  if (isAuthenticated && user?.role === "STUDENT") {
    return null;
  }
  return (
    <main className="min-h-screen bg-[#05070b] text-white">

      <div className="grid min-h-screen lg:grid-cols-2">

        {/* LEFT SIDE */}
        <section className="relative hidden overflow-hidden lg:flex">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.22),transparent_35%),radial-gradient(circle_at_70%_80%,rgba(6,182,212,0.16),transparent_35%)]" />

          <div className="relative z-10 flex w-full flex-col justify-between p-12 xl:p-16">

            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                <Cpu size={22} />
              </div>

              <div>
                <p className="text-lg font-semibold tracking-wide">
                  CORTEX LABS
                </p>

                <p className="text-xs text-white/40">
                  Embedded • AI • Systems
                </p>
              </div>
            </div>

            <div className="max-w-xl">
              <p className="mb-5 text-sm font-medium uppercase tracking-[0.3em] text-cyan-400">
                Student Portal
              </p>

              <h1 className="text-5xl font-semibold leading-tight xl:text-6xl">
                Build skills.
                <br />
                Build systems.
                <br />
                <span className="text-white/40">
                  Build the future.
                </span>
              </h1>

              <p className="mt-7 max-w-lg text-base leading-7 text-white/50">
                Continue your journey through embedded
                systems, firmware engineering, RTOS,
                Edge AI and next-generation technology.
              </p>
            </div>

            <p className="text-sm text-white/30">
              © {new Date().getFullYear()} Cortex Labs
            </p>
          </div>
        </section>

        {/* RIGHT SIDE */}
        <section className="flex items-center justify-center px-6 py-12 sm:px-10">
          <div className="w-full max-w-md">

            {/* Mobile logo */}
            <div className="mb-12 flex items-center gap-3 lg:hidden">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                <Cpu size={22} />
              </div>

              <div>
                <p className="text-lg font-semibold">
                  CORTEX LABS
                </p>

                <p className="text-xs text-white/40">
                  Student Portal
                </p>
              </div>
            </div>

            <div className="mb-10">
              <p className="mb-3 text-sm font-medium text-cyan-400">
                Welcome back
              </p>

              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Continue learning.
              </h2>

              <p className="mt-3 text-sm leading-6 text-white/45">
                Sign in to access your courses,
                progress and learning dashboard.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >

              {/* EMAIL */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-white/70"
                >
                  Email address
                </label>

                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(event) =>
                    setEmail(event.target.value)
                  }
                  placeholder="you@example.com"
                  autoComplete="email"
                  className="h-13 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 text-sm outline-none transition placeholder:text-white/25 focus:border-cyan-400/60 focus:bg-white/[0.06]"
                />
              </div>

              {/* PASSWORD */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-white/70"
                  >
                    Password
                  </label>

                  <button
                    type="button"
                    className="text-xs text-cyan-400 transition hover:text-cyan-300"
                  >
                    Forgot password?
                  </button>
                </div>

                <div className="relative">
                  <input
                    id="password"
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    value={password}
                    onChange={(event) =>
                      setPassword(
                        event.target.value,
                      )
                    }
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    className="h-13 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 pr-12 text-sm outline-none transition placeholder:text-white/25 focus:border-cyan-400/60 focus:bg-white/[0.06]"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        !showPassword,
                      )
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/35 transition hover:text-white"
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>

              {/* SUBMIT */}
              <button
                type="submit"
                disabled={loading}
                className="group flex h-13 w-full items-center justify-center gap-2 rounded-xl bg-white px-5 text-sm font-semibold text-black transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading
                  ? "Signing in..."
                  : "Sign in"}

                {!loading && (
                  <ArrowRight
                    size={17}
                    className="transition-transform group-hover:translate-x-1"
                  />
                )}
              </button>
            </form>

            <div className="mt-10 border-t border-white/10 pt-6 space-y-4">
              <p className="text-center text-sm text-white/40">
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={() => {
                    const next = searchParams.get("next");
                    router.push(
                      `/student/signup${
                        next ? `?next=${encodeURIComponent(next)}` : ""
                      }`,
                    );
                  }}
                  className="font-medium text-cyan-400 transition hover:text-cyan-300"
                >
                  Create an account
                </button>
              </p>

              <p className="text-center text-xs leading-5 text-white/30">
                Your Cortex Labs learning journey
                starts here.
              </p>
            </div>

          </div>
        </section>

      </div>
    </main>
  );
}