"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Cpu,
  GraduationCap,
  Home,
  LayoutDashboard,
  LogOut,
  Menu,
  Play,
  Settings,
  ShieldCheck,
  TrendingUp,
  UserRound,
  X,
} from "lucide-react";
import { toast } from "react-hot-toast";

import api from "@/lib/api";
import { useAuthStore } from "@/store/authStore";
import Breadcrumbs from "@/components/Breadcrumbs";

interface Student {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
}

interface Subscription {
  plan: string | null;
  status: string | null;
  active: boolean;
  start_date: string | null;
  end_date: string | null;
}

interface Course {
  course_id: number;
  course_title: string;
  course_slug: string;
  progress: number;
  completed_lessons: number;
  total_lessons: number;
  last_accessed_lesson: string | null;
}

interface DashboardData {
  student: Student;
  subscription: Subscription;
  courses: Course[];
}

function formatDate(date: string | null) {
  if (!date) return "—";

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

function getInitials(student: Student | null) {
  if (!student) return "CL";

  const first = student.first_name?.[0] || "";
  const last = student.last_name?.[0] || "";

  if (first || last) {
    return `${first}${last}`.toUpperCase();
  }

  return student.email?.[0]?.toUpperCase() || "S";
}

function getGreeting() {
  const hour = new Date().getHours();

  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";

  return "Good evening";
}

export default function StudentDashboardPage() {
  const router = useRouter();

  const logoutStore = useAuthStore(
    (state) => state.logout,
  );

  const [dashboard, setDashboard] =
    useState<DashboardData | null>(null);

  const [loading, setLoading] = useState(true);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    async function loadDashboard() {

      try {
        const response =
          await api.get<DashboardData>(
            "/dashboard/student/",
          );

        setDashboard(response.data);
      } catch (error: any) {
        console.error(error);

        if (error?.response?.status === 401) {
          logoutStore();
          router.replace("/student/login");
          return;
        }

        toast.error(
          "Unable to load your dashboard.",
        );
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, [router, logoutStore]);

  const overallProgress = useMemo(() => {
    if (!dashboard?.courses.length) return 0;

    const total = dashboard.courses.reduce(
      (sum, course) =>
        sum + course.progress,
      0,
    );

    return Math.round(
      total / dashboard.courses.length,
    );
  }, [dashboard]);

  const totalCompletedLessons =
    dashboard?.courses.reduce(
      (sum, course) =>
        sum + course.completed_lessons,
      0,
    ) || 0;

  const totalLessons =
    dashboard?.courses.reduce(
      (sum, course) =>
        sum + course.total_lessons,
      0,
    ) || 0;

  const activeCourse =
    dashboard?.courses.find(
      (course) => course.progress > 0,
    ) || dashboard?.courses[0];

  async function handleLogout() {
    try {
      setLoggingOut(true);

      await api.post("/auth/logout/");
    } catch (error) {
      console.error(
        "Logout API error:",
        error,
      );
    } finally {
      logoutStore();
      router.replace("/student/login");
    }
  }

  if (loading) {
    return <DashboardSkeleton />;
  }

  if (!dashboard) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#05070b] text-white">
        <div className="text-center">
          <p className="text-lg">
            Unable to load dashboard.
          </p>

          <button
            onClick={() =>
              window.location.reload()
            }
            className="mt-5 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black"
          >
            Try again
          </button>
        </div>
      </main>
    );
  }

  const studentName =
    dashboard.student.first_name ||
    dashboard.student.email.split("@")[0];

  return (
    <main className="min-h-screen bg-[#05070b] text-white">
      <div className="flex min-h-screen">

        {/* MOBILE OVERLAY */}
        {mobileMenu && (
          <div
            className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
            onClick={() =>
              setMobileMenu(false)
            }
          />
        )}

        {/* SIDEBAR */}
        <aside
          className={`
            fixed inset-y-0 left-0 z-50 flex w-[270px]
            flex-col border-r border-white/[0.07]
            bg-[#080b11]/95 backdrop-blur-xl
            transition-transform duration-300
            lg:static lg:translate-x-0
            ${
              mobileMenu
                ? "translate-x-0"
                : "-translate-x-full"
            }
          `}
        >
            {/* BRAND */}
            <div className="flex h-20 items-center justify-between border-b border-white/[0.07] px-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-black">
                  <Cpu size={21} />
                </div>

                <div>
                  <div className="text-sm font-bold tracking-[0.18em]">
                    CORTEX
                  </div>

                  <div className="text-[10px] tracking-[0.2em] text-white/35">
                    LABS
                  </div>
                </div>
              </div>

              <button
                onClick={() =>
                  setMobileMenu(false)
                }
                className="lg:hidden"
              >
                <X size={20} />
              </button>
            </div>

            {/* NAVIGATION */}
            <nav className="flex-1 px-4 py-7">
              <p className="px-3 pb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/25">
                Workspace
              </p>

              <SidebarItem
                icon={<Home size={18} />}
                label="Home"
                onClick={() => router.push("/")}
              />

              <SidebarItem
                icon={<LayoutDashboard size={18} />}
                label="Dashboard"
                active
                onClick={() => router.push("/student/dashboard")}
              />

              <SidebarItem
                icon={<BookOpen size={18} />}
                label="My Courses"
                onClick={() => router.push("/student/courses")}
              />

              <SidebarItem
                icon={<TrendingUp size={18} />}
                label="Progress"
                onClick={() => router.push("/student/courses")}
              />

                <div className="my-7 border-t border-white/[0.06]" />

                <p className="px-3 pb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/25">
                  Account
                </p>

                <SidebarItem
                  icon={<GraduationCap size={18} />}
                  label="Certificates"
                />

                <SidebarItem
                  icon={<UserRound size={18} />}
                  label="Profile"
                />

                <SidebarItem
                  icon={<Settings size={18} />}
                  label="Settings"
                />
            </nav>

            {/* SUBSCRIPTION MINI CARD */}
            <div className="px-4 pb-4">
              <div className="rounded-2xl border border-white/[0.07] bg-white/[0.035] p-4">
                <div className="flex items-center gap-2">
                  <ShieldCheck
                    size={16}
                    className="text-cyan-400"
                  />

                  <span className="text-xs font-medium text-white/60">
                    Subscription
                  </span>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <span className="text-sm font-semibold">
                    {dashboard.subscription
                      .active
                      ? "Active"
                      : "Expired"}
                  </span>

                  <span
                    className={`h-2 w-2 rounded-full ${
                      dashboard.subscription
                        .active
                        ? "bg-emerald-400"
                        : "bg-red-400"
                    }`}
                  />
                </div>

                {dashboard.subscription.end_date && (
                  <p className="mt-1 text-[11px] text-white/30">
                    Until{" "}
                    {formatDate(
                      dashboard.subscription.end_date,
                    )}
                  </p>
                )}
              </div>
            </div>

            {/* LOGOUT */}
            <div className="border-t border-white/[0.07] p-4">
              <button
                onClick={handleLogout}
                disabled={loggingOut}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-white/45 transition hover:bg-white/[0.05] hover:text-white disabled:opacity-50"
              >
                <LogOut size={17} />

                {loggingOut
                  ? "Signing out..."
                  : "Sign out"}
              </button>
            </div>
        </aside>

        {/* MAIN */}
        <section className="min-w-0 flex-1">

          <div className="mb-8">
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Dashboard" },
              ]}
            />
          </div>

          {/* TOPBAR */}
          <header className="flex h-20 items-center justify-between border-b border-white/[0.07] px-5 sm:px-8 lg:px-10">
            <button
              onClick={() =>
                setMobileMenu(true)
              }
              className="rounded-lg p-2 text-white/60 hover:bg-white/5 lg:hidden"
            >
              <Menu size={22} />
            </button>

            <div className="hidden lg:block">
              <p className="text-xs text-white/25">
                STUDENT PORTAL
              </p>
            </div>

            <div className="ml-auto flex items-center gap-4">
              <div className="hidden text-right sm:block">
                <p className="text-sm font-medium">
                  {studentName}
                </p>

                <p className="text-[11px] text-white/30">
                  Student
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-xs font-semibold">
                {getInitials(
                  dashboard.student,
                )}
              </div>
            </div>
          </header>

          {/* CONTENT */}
          <div className="mx-auto max-w-[1500px] px-5 py-8 sm:px-8 lg:px-10 lg:py-10">

            {/* HERO */}
            <motion.div
              initial={{
                opacity: 0,
                y: 15,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.45,
              }}
              className="relative overflow-hidden rounded-[28px] border border-white/[0.07] bg-gradient-to-br from-white/[0.07] to-white/[0.025] p-7 sm:p-9 lg:p-10"
            >
              <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-cyan-400/[0.08] blur-3xl" />

              <div className="pointer-events-none absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-blue-500/[0.06] blur-3xl" />

              <div className="relative">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400">
                  {getGreeting()}
                </p>

                <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
                  Welcome back,{" "}
                  <span className="text-white/45">
                    {studentName}.
                  </span>
                </h1>

                <p className="mt-4 max-w-xl text-sm leading-6 text-white/40 sm:text-base">
                  Keep building your skills.
                  Your next breakthrough is
                  one lesson away.
                </p>
              </div>
            </motion.div>

            {/* STAT CARDS */}
            <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

              <StatCard
                icon={<BookOpen size={19} />}
                label="My Courses"
                value={dashboard.courses.length}
                description="Active learning paths"
                delay={0.05}
              />

              <StatCard
                icon={<TrendingUp size={19} />}
                label="Overall Progress"
                value={`${overallProgress}%`}
                description="Across your courses"
                delay={0.1}
              />

              <StatCard
                icon={<CheckCircle2 size={19} />}
                label="Lessons Completed"
                value={totalCompletedLessons}
                description={`of ${totalLessons} lessons`}
                delay={0.15}
              />

              <StatCard
                icon={<ShieldCheck size={19} />}
                label="Subscription"
                value={
                  dashboard.subscription.active
                    ? "Active"
                    : "Expired"
                }
                description={
                  dashboard.subscription.end_date
                    ? `Until ${formatDate(
                        dashboard.subscription.end_date,
                      )}`
                    : "No active plan"
                }
                delay={0.2}
              />

            </div>

            {/* MAIN GRID */}
            <div className="mt-7 grid gap-7 xl:grid-cols-[1.5fr_0.8fr]">

              {/* CONTINUE LEARNING */}
              <motion.section
                initial={{
                  opacity: 0,
                  y: 15,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.25,
                }}
              >
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/25">
                      Pick up where you left off
                    </p>

                    <h2 className="mt-1 text-xl font-semibold">
                      Continue Learning
                    </h2>
                  </div>
                </div>

                {activeCourse ? (
                  <div className="group relative overflow-hidden rounded-[26px] border border-white/[0.08] bg-[#0a0e15]">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(34,211,238,0.08),transparent_35%)]" />

                    <div className="relative p-7 sm:p-8">

                      <div className="flex flex-col gap-7 sm:flex-row sm:items-center sm:justify-between">

                        <div className="flex items-start gap-5">
                          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/[0.08] text-cyan-400">
                            <Cpu size={25} />
                          </div>

                          <div>
                            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-400">
                              Your current course
                            </p>

                            <h3 className="mt-2 text-xl font-semibold sm:text-2xl">
                              {activeCourse.course_title}
                            </h3>

                            <p className="mt-2 text-sm text-white/35">
                              {activeCourse.last_accessed_lesson
                                ? activeCourse.last_accessed_lesson
                                : "Start your first lesson"}
                            </p>
                          </div>
                        </div>

                        <button
                            onClick={() =>
                            window.location.href =
                                `/student/courses/${activeCourse.course_slug}`
                            }
                          className="group/btn flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-cyan-300"
                        >
                          <Play
                            size={15}
                            fill="currentColor"
                          />

                          Continue

                          <ChevronRight
                            size={16}
                            className="transition-transform group-hover/btn:translate-x-1"
                          />
                        </button>

                      </div>

                      {/* PROGRESS */}
                      <div className="mt-8">
                        <div className="mb-3 flex items-center justify-between text-xs">
                          <span className="text-white/35">
                            Course progress
                          </span>

                          <span className="font-semibold text-white">
                            {activeCourse.progress}%
                          </span>
                        </div>

                        <div className="h-2 overflow-hidden rounded-full bg-white/[0.06]">
                          <motion.div
                            initial={{
                              width: 0,
                            }}
                            animate={{
                              width: `${activeCourse.progress}%`,
                            }}
                            transition={{
                              duration: 0.9,
                              delay: 0.4,
                            }}
                            className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"
                          />
                        </div>

                        <div className="mt-3 flex items-center justify-between text-[11px] text-white/25">
                          <span>
                            {
                              activeCourse.completed_lessons
                            }{" "}
                            completed
                          </span>

                          <span>
                            {
                              activeCourse.total_lessons
                            }{" "}
                            total lessons
                          </span>
                        </div>
                      </div>

                    </div>
                  </div>
                ) : (
                  <EmptyCourses />
                )}
              </motion.section>

              {/* SUBSCRIPTION */}
              <motion.section
                initial={{
                  opacity: 0,
                  y: 15,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.3,
                }}
                className="rounded-[26px] border border-white/[0.08] bg-[#0a0e15] p-7"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-400/[0.08] text-emerald-400">
                    <ShieldCheck size={19} />
                  </div>

                  <div>
                    <p className="text-xs text-white/30">
                      Subscription
                    </p>

                    <h3 className="font-semibold">
                      {dashboard.subscription.active
                        ? "Active Access"
                        : "Access Expired"}
                    </h3>
                  </div>
                </div>

                <div className="mt-7">
                  <p className="text-xs uppercase tracking-[0.18em] text-white/25">
                    Current plan
                  </p>

                  <p className="mt-2 text-2xl font-semibold">
                    {dashboard.subscription.plan ||
                      "No plan"}
                  </p>
                </div>

                <div className="mt-6 border-t border-white/[0.07] pt-5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/35">
                      Valid until
                    </span>

                    <span>
                      {formatDate(
                        dashboard.subscription
                          .end_date,
                      )}
                    </span>
                  </div>
                </div>

                <div className="mt-6 flex items-center gap-2 text-xs">
                  <span
                    className={`h-2 w-2 rounded-full ${
                      dashboard.subscription.active
                        ? "bg-emerald-400"
                        : "bg-red-400"
                    }`}
                  />

                  <span className="text-white/40">
                    {dashboard.subscription.active
                      ? "You have full course access"
                      : "Renew to continue learning"}
                  </span>
                </div>
              </motion.section>

            </div>

            {/* MY LEARNING */}
            <motion.section
              initial={{
                opacity: 0,
                y: 15,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.35,
              }}
              className="mt-10"
            >
              <div className="mb-5 flex items-end justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/25">
                    Your learning
                  </p>

                  <h2 className="mt-1 text-xl font-semibold">
                    My Courses
                  </h2>
                </div>

                <span className="text-xs text-white/25">
                  {dashboard.courses.length}{" "}
                  course
                  {dashboard.courses.length !== 1
                    ? "s"
                    : ""}
                </span>
              </div>

              {dashboard.courses.length > 0 ? (
                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                  {dashboard.courses.map(
                    (course, index) => (
                      <CourseCard
                        key={course.course_id}
                        course={course}
                        index={index}
                      />
                    ),
                  )}
                </div>
              ) : (
                <EmptyCourses />
              )}
            </motion.section>

            {/* FOOTER */}
            <footer className="mt-14 border-t border-white/[0.06] py-7">
              <div className="flex flex-col gap-2 text-xs text-white/20 sm:flex-row sm:items-center sm:justify-between">
                <span>
                  Cortex Labs Learning Platform
                </span>

                <span>
                  Embedded Systems • AI •
                  Engineering
                </span>
              </div>
            </footer>

          </div>
        </section>
      </div>
    </main>
  );
}


/* ============================================================
   SIDEBAR ITEM
============================================================ */

function SidebarItem({
  icon,
  label,
  active = false,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        mb-1 flex w-full items-center gap-3 rounded-xl
        px-3 py-3 text-sm transition
        ${
          active
            ? "bg-white/[0.07] text-white"
            : "text-white/40 hover:bg-white/[0.04] hover:text-white/80"
        }
      `}
    >
      {icon}

      <span>{label}</span>

      {active && (
        <span className="ml-auto h-1.5 w-1.5 rounded-full bg-cyan-400" />
      )}
    </button>
  );
}


/* ============================================================
   STAT CARD
============================================================ */

function StatCard({
  icon,
  label,
  value,
  description,
  delay,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  description: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 12,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        delay,
      }}
      className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5 transition hover:border-white/[0.13] hover:bg-white/[0.04]"
    >
      <div className="flex items-center justify-between">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.05] text-white/60">
          {icon}
        </div>

        <span className="text-[10px] uppercase tracking-[0.15em] text-white/20">
          Cortex
        </span>
      </div>

      <p className="mt-5 text-[11px] font-medium uppercase tracking-[0.15em] text-white/30">
        {label}
      </p>

      <p className="mt-1 text-2xl font-semibold">
        {value}
      </p>

      <p className="mt-1 text-xs text-white/25">
        {description}
      </p>
    </motion.div>
  );
}


/* ============================================================
   COURSE CARD
============================================================ */

function CourseCard({
  course,
  index,
}: {
  course: Course;
  index: number;
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 15,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        delay: 0.4 + index * 0.06,
      }}
      className="group overflow-hidden rounded-[22px] border border-white/[0.07] bg-[#0a0e15] transition hover:-translate-y-1 hover:border-white/[0.14]"
    >
      {/* COURSE VISUAL */}
      <div className="relative h-32 overflow-hidden bg-gradient-to-br from-cyan-400/[0.10] via-blue-500/[0.05] to-transparent">
        <div className="absolute -right-8 -top-10 h-32 w-32 rounded-full bg-cyan-400/[0.07] blur-2xl" />

        <div className="absolute bottom-5 left-5 flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-black/20 text-cyan-400 backdrop-blur">
          <Cpu size={21} />
        </div>

        <div className="absolute right-5 top-5 rounded-full border border-white/10 bg-black/20 px-3 py-1 text-[10px] font-medium text-white/50 backdrop-blur">
          {course.progress}% complete
        </div>
      </div>

      <div className="p-5">
        <h3 className="line-clamp-2 text-base font-semibold">
          {course.course_title}
        </h3>

        <p className="mt-2 line-clamp-1 text-xs text-white/30">
          {course.last_accessed_lesson ||
            "Ready to start learning"}
        </p>

        <div className="mt-5">
          <div className="mb-2 flex items-center justify-between text-[10px]">
            <span className="text-white/25">
              Progress
            </span>

            <span className="font-semibold text-white/50">
              {course.progress}%
            </span>
          </div>

          <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
            <div
              className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"
              style={{
                width: `${course.progress}%`,
              }}
            />
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-white/[0.06] pt-4">
          <div className="flex items-center gap-1.5 text-[11px] text-white/25">
            <Clock3 size={13} />

            {course.completed_lessons}/
            {course.total_lessons} lessons
          </div>

          <button
            onClick={() =>
            window.location.href =
                `/student/courses/${course.course_slug}`
            }
            className="flex items-center gap-1 text-xs font-semibold text-cyan-400 transition group-hover:text-cyan-300"
          >
            Open

            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}


/* ============================================================
   EMPTY STATE
============================================================ */

function EmptyCourses() {
  return (
    <div className="rounded-[26px] border border-dashed border-white/[0.1] bg-white/[0.02] p-10 text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white/[0.05] text-white/30">
        <BookOpen size={21} />
      </div>

      <h3 className="mt-4 font-semibold">
        No courses yet
      </h3>

      <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-white/30">
        Your enrolled courses will appear
        here once they are assigned to your
        account.
      </p>
    </div>
  );
}


/* ============================================================
   LOADING SKELETON
============================================================ */

function DashboardSkeleton() {
  return (
    <main className="min-h-screen bg-[#05070b] text-white">
      <div className="flex min-h-screen">

        <aside className="hidden w-[270px] border-r border-white/[0.07] bg-[#080b11] lg:block">
          <div className="h-20 border-b border-white/[0.07]" />
        </aside>

        <section className="flex-1">
          <div className="h-20 border-b border-white/[0.07]" />

          <div className="mx-auto max-w-[1500px] px-5 py-10 sm:px-8 lg:px-10">
            <div className="animate-pulse">

              <div className="h-48 rounded-[28px] bg-white/[0.04]" />

              <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {Array.from({
                  length: 4,
                }).map((_, index) => (
                  <div
                    key={index}
                    className="h-36 rounded-2xl bg-white/[0.035]"
                  />
                ))}
              </div>

              <div className="mt-7 grid gap-7 xl:grid-cols-[1.5fr_0.8fr]">
                <div className="h-80 rounded-[26px] bg-white/[0.035]" />

                <div className="h-80 rounded-[26px] bg-white/[0.035]" />
              </div>

            </div>
          </div>
        </section>
      </div>
    </main>
  );
}