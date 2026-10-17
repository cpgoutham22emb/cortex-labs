"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BookOpen, CheckCircle2, Clock3, PlayCircle } from "lucide-react";
import { toast } from "react-hot-toast";

import api from "@/lib/api";
import Breadcrumbs from "@/components/Breadcrumbs";

interface EnrolledCourse {
  id: number;
  title: string;
  slug: string;
  description?: string;
  completed_lessons?: number;
  total_lessons?: number;
  progress?: number;
  last_accessed?: string | null;
}

interface StudentDashboardData {
  user?: {
    id: number;
    email: string;
    first_name?: string;
    last_name?: string;
  };
  courses?: EnrolledCourse[];
  enrolled_courses?: EnrolledCourse[];
}

export default function MyLearningPage() {
  const [courses, setCourses] = useState<EnrolledCourse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMyLearning() {
      try {
        setLoading(true);

        const response =
          await api.get<StudentDashboardData>(
            "/dashboard/student/",
          );

        const data = response.data;

        const enrolledCourses =
          data.enrolled_courses ?? data.courses ?? [];

        setCourses(enrolledCourses);
      } catch (error: any) {
        console.error("Failed to load My Learning:", error);

        toast.error(
          error?.response?.data?.detail ||
            "Unable to load your courses.",
        );
      } finally {
        setLoading(false);
      }
    }

    loadMyLearning();
  }, []);

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <div className="mx-auto max-w-7xl px-6 py-10">
        {/* Breadcrumb */}
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "My Learning" },
          ]}
        />

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold">
            My Learning
          </h1>

          <p className="mt-2 text-gray-400">
            Continue learning from the courses you are enrolled in.
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-10 text-center">
            <p className="text-gray-400">
              Loading your courses...
            </p>
          </div>
        )}

        {/* Empty state */}
        {!loading && courses.length === 0 && (
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-12 text-center">
            <BookOpen className="mx-auto mb-4 h-12 w-12 text-gray-500" />

            <h2 className="text-xl font-semibold">
              No courses yet
            </h2>

            <p className="mt-2 text-gray-400">
              You are not currently enrolled in any courses.
            </p>

            <Link
              href="/courses"
              className="mt-6 inline-flex items-center rounded-lg bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-500"
            >
              Explore Courses
            </Link>
          </div>
        )}

        {/* Courses */}
        {!loading && courses.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {courses.map((course) => {
              const progress = Math.max(
                0,
                Math.min(100, course.progress ?? 0),
              );

              const completedLessons =
                course.completed_lessons ?? 0;

              const totalLessons =
                course.total_lessons ?? 0;

              return (
                <article
                  key={course.id}
                  className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition hover:border-white/20"
                >
                  {/* Course header */}
                  <div className="border-b border-white/10 p-6">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10">
                      <BookOpen className="h-6 w-6 text-blue-400" />
                    </div>

                    <h2 className="text-xl font-semibold">
                      {course.title}
                    </h2>

                    {course.description && (
                      <p className="mt-2 line-clamp-3 text-sm leading-6 text-gray-400">
                        {course.description}
                      </p>
                    )}
                  </div>

                  {/* Progress */}
                  <div className="p-6">
                    <div className="mb-2 flex items-center justify-between text-sm">
                      <span className="text-gray-400">
                        Course Progress
                      </span>

                      <span className="font-semibold text-white">
                        {progress}%
                      </span>
                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-white/10">
                      <div
                        className="h-full rounded-full bg-blue-500 transition-all"
                        style={{
                          width: `${progress}%`,
                        }}
                      />
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-3">
                      <div className="rounded-lg bg-white/[0.04] p-3">
                        <div className="flex items-center gap-2 text-xs text-gray-400">
                          <CheckCircle2 className="h-4 w-4" />
                          Completed
                        </div>

                        <p className="mt-1 text-sm font-semibold">
                          {completedLessons} / {totalLessons}
                        </p>
                      </div>

                      <div className="rounded-lg bg-white/[0.04] p-3">
                        <div className="flex items-center gap-2 text-xs text-gray-400">
                          <Clock3 className="h-4 w-4" />
                          Status
                        </div>

                        <p className="mt-1 text-sm font-semibold">
                          {progress >= 100
                            ? "Completed"
                            : progress > 0
                              ? "In Progress"
                              : "Not Started"}
                        </p>
                      </div>
                    </div>

                    {/* Continue */}
                    <Link
                      href={`/student/courses/${course.slug}`}
                      className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-3 font-medium text-white transition hover:bg-blue-500"
                    >
                      <PlayCircle className="h-5 w-5" />

                      {progress >= 100
                        ? "Review Course"
                        : progress > 0
                          ? "Continue Learning"
                          : "Start Learning"}
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}