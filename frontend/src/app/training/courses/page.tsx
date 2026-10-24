"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "react-hot-toast";

import {
  getPublishedCourses,
  type Course,
} from "@/services/courses";
import Breadcrumbs from "@/components/Breadcrumbs";
import FreeTrainingConsultation from "@/components/FreeTrainingConsultation";

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCourses = async () => {
      try {
        setLoading(true);

        const data = await getPublishedCourses();

        setCourses(data);
      } catch (error) {
        console.error("Failed to load courses:", error);

        toast.error("Unable to load courses.");
      } finally {
        setLoading(false);
      }
    };

    loadCourses();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#050816] text-white">
        <div className="mx-auto flex min-h-screen max-w-7xl items-center justify-center px-6">
          <p className="text-gray-500">
            Loading courses...
          </p>
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
            { label: "Courses" },
          ]}
        />
      </div>
      {/* Header */}
      <section className="py-20 border-b border-white/10">

        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center max-w-3xl mx-auto">

            <p className="text-cyan-400 uppercase tracking-[4px] text-sm font-semibold">
              Skill Courses
            </p>

            <h1 className="text-3xl md:text-4xl font-bold mt-5">
              Explore Our Courses
            </h1>

            <p className="text-gray-400 text-lg mt-5">
              Learn Embedded Systems, Embedded C, Linux,
              RTOS, Edge AI and other industry-focused
              technologies through practical courses.
            </p>

          </div>

        </div>

      </section>

      {/* Course List */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        {courses.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-16 text-center">
            <h2 className="text-2xl font-semibold text-white">
              No courses available
            </h2>

            <p className="mt-3 text-slate-400">
              Published courses will appear here.
            </p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <div
                key={course.id}
                className="bg-[#0B1220] border border-white/10 rounded-3xl p-8 hover:border-cyan-500/40 hover:-translate-y-2 transition-all duration-300"
              >

                <p className="text-cyan-400 text-sm uppercase tracking-[2px] font-semibold">
                  {course.category}
                </p>

                <h2 className="text-2xl font-bold mt-4">
                  {course.title}
                </h2>

                <p className="text-gray-400 mt-4 leading-relaxed">
                  {course.description}
                </p>

                <div className="flex justify-between items-center mt-8">

                  <div>
                    <p className="text-gray-500 text-sm">
                      {course.level}
                    </p>

                    <p className="text-gray-400 text-sm mt-1">
                      {course.duration_hours} hours
                    </p>
                  </div>

                  <p className="text-2xl font-bold text-cyan-400">
                    ₹{Number(course.price).toLocaleString("en-IN")}
                  </p>

                </div>

                <Link
                  href={`/training/courses/${course.slug}`}
                  className="block text-center mt-8 border border-cyan-500/30 hover:bg-cyan-500/10 transition-all duration-300 px-6 py-3 rounded-xl font-semibold"
                >
                  View Course
                </Link>

              </div>
            ))}
          </div>
        )}
        <FreeTrainingConsultation />
      </section>
    </main>
  );
}