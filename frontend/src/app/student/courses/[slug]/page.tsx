"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { useParams, useRouter } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Clock3,
  Menu,
  Play,
  X,
} from "lucide-react";

import { motion } from "framer-motion";

import { toast } from "react-hot-toast";

import AssessmentOverview from "@/features/assessments/components/AssessmentOverview";
import { useAssessment } from "@/features/assessments/hooks/useAssessment";
import { useAssessmentController } from "@/features/assessments/hooks/useAssessmentController";
import ProctoringCheck from "@/features/assessments/components/ProctoringCheck";
import QuizRunner from "@/features/assessments/components/QuizRunner";
import QuizResult from "@/features/assessments/components/QuizResult";
import type { QuizResult as QuizResultType } from "@/features/assessments/types/assessment.types";

import {
  getCourseContent,
  updateLessonProgress,
} from "@/services/courses";

import type {
  CourseContent,
  Lesson,
} from "@/services/courses";


export default function CourseLearningPage() {
  const params = useParams();

  const router = useRouter();

  const slug = params.slug as string;

  const [course, setCourse] =
    useState<CourseContent | null>(null);

  const [selectedLesson, setSelectedLesson] =
    useState<Lesson | null>(null);

  const {
    quiz,
    quizAttempts,
    showAssessment,
    quizLoading,
    loadAssessment,
    openAssessment,
    closeAssessment,
  } = useAssessment();

  const {
    startAssessment,
    assessmentAttempt,
    showProctoringCheck,
    cancelProctoringCheck,
  } = useAssessmentController();

  const [quizResult, setQuizResult] =
    useState<QuizResultType | null>(null);

  const isAssessmentActive =
    showAssessment &&
    !quizResult &&
    (showProctoringCheck || !!assessmentAttempt);

  const [loading, setLoading] =
    useState(true);

  const [updatingProgress, setUpdatingProgress] =
    useState(false);

  const [mobileSidebar, setMobileSidebar] =
    useState(false);

  const [openModules, setOpenModules] =
    useState<Record<number, boolean>>({});

  useEffect(() => {
    async function loadCourse() {
      try {
        setLoading(true);

        const data =
          await getCourseContent(slug);

        setCourse(data);

        if (data.modules?.length) {
          const firstModule =
            data.modules[0];

          setOpenModules({
            [firstModule.id]: true,
          });

          if (
            firstModule.lessons?.length
          ) {
            setSelectedLesson(
              firstModule.lessons[0],
            );
          }
        }
        await loadAssessment(slug);
      } catch (error: any) {
        console.error(error);

        if (
          error?.response?.status === 401
        ) {
          router.replace(
            "/student/login",
          );

          return;
        }

        toast.error(
          error?.response?.data?.detail ||
            "Unable to load course.",
        );
      } finally {
        setLoading(false);
      }
    }

    if (slug) {
      loadCourse();
    }
  }, [slug, router]);

  const allLessons = useMemo(() => {
    if (!course) return [];

    return course.modules.flatMap(
      (module) => module.lessons,
    );
  }, [course]);

  const completedLessons =
    allLessons.filter(
      (lesson) => lesson.is_completed,
    ).length;

  const progress =
    allLessons.length > 0
      ? Math.round(
          (completedLessons /
            allLessons.length) *
            100,
        )
      : 0;

  const currentIndex =
    selectedLesson
      ? allLessons.findIndex(
          (lesson) =>
            lesson.id ===
            selectedLesson.id,
        )
      : -1;

  const previousLesson =
    currentIndex > 0
      ? allLessons[currentIndex - 1]
      : null;

  const nextLesson =
    currentIndex >= 0 &&
    currentIndex <
      allLessons.length - 1
      ? allLessons[currentIndex + 1]
      : null;

  async function handleComplete() {
    if (!selectedLesson) return;

    try {
      setUpdatingProgress(true);

      await updateLessonProgress(
        selectedLesson.id,
        true,
      );

      setSelectedLesson({
        ...selectedLesson,
        is_completed: true,
      });

      setCourse((previous) => {
        if (!previous) return previous;

        return {
          ...previous,
          modules:
            previous.modules.map(
              (module) => ({
                ...module,
                lessons:
                  module.lessons.map(
                    (lesson) =>
                      lesson.id ===
                      selectedLesson.id
                        ? {
                            ...lesson,
                            is_completed:
                              true,
                          }
                        : lesson,
                  ),
              }),
            ),
        };
      });

      toast.success(
        "Lesson completed!",
      );
    } catch (error: any) {
      console.error(error);

      toast.error(
        error?.response?.data?.detail ||
          "Unable to update progress.",
      );
    } finally {
      setUpdatingProgress(false);
    }
  }

  function selectLesson(
    lesson: Lesson,
  ) {
    closeAssessment();
    setSelectedLesson(lesson);
    setMobileSidebar(false);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function toggleModule(
    moduleId: number,
  ) {
    setOpenModules((previous) => ({
      ...previous,
      [moduleId]:
        !previous[moduleId],
    }));
  }

  if (loading) {
    return <LearningSkeleton />;
  }

  if (!course) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#05070b] text-white">
        <div className="text-center">
          <p className="text-lg">
            Course unavailable.
          </p>

          <button
            onClick={() =>
              router.push(
                "/student/dashboard",
              )
            }
            className="mt-5 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black"
          >
            Back to Dashboard
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#05070b] text-white">

      {/* MOBILE OVERLAY */}

      {mobileSidebar &&  !isAssessmentActive && (
        <div
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
          onClick={() =>
            setMobileSidebar(false)
          }
        />
      )}

      {/* HEADER */}

      <header className="sticky top-0 z-30 border-b border-white/[0.07] bg-[#070a10]/95 backdrop-blur-xl">

        <div className="flex h-[72px] items-center gap-4 px-5 sm:px-8">

          <button
            onClick={() =>
              router.push(
                "/student/dashboard",
              )
            }
            className="hidden rounded-lg p-2 text-white/40 transition hover:bg-white/[0.05] hover:text-white sm:block"
          >
            <ArrowLeft size={19} />
          </button>

          {!isAssessmentActive && (
            <button
              onClick={() =>
                setMobileSidebar(true)
              }
              className="rounded-lg p-2 text-white/50 hover:bg-white/[0.05] lg:hidden"
            >
              <Menu size={21} />
            </button>
          )}

          <div className="min-w-0 flex-1">

            <p className="truncate text-sm font-semibold">
              {course.title}
            </p>

            <div className="mt-1 flex items-center gap-3">

              <div className="h-1.5 w-28 overflow-hidden rounded-full bg-white/[0.08] sm:w-40">

                <motion.div
                  initial={{
                    width: 0,
                  }}
                  animate={{
                    width: `${progress}%`,
                  }}
                  className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"
                />

              </div>

              <span className="text-[10px] text-white/30">
                {progress}% complete
              </span>

            </div>

          </div>

          <div className="hidden items-center gap-2 text-xs text-white/30 sm:flex">
            <CheckCircle2
              size={15}
              className="text-emerald-400"
            />

            {completedLessons}/
            {allLessons.length}
          </div>

        </div>

      </header>

      {/* BODY */}

      <div className="flex">

        {/* SIDEBAR */}

        <aside
          className={`
            fixed bottom-0 left-0 top-[72px]
            z-50 w-[310px]
            overflow-y-auto
            border-r border-white/[0.07]
            bg-[#080b11]
            transition-transform duration-300
            lg:sticky lg:top-[72px]
            lg:z-20
            ${
              isAssessmentActive
                ? "hidden"
                : mobileSidebar
                  ? "translate-x-0"
                  : "-translate-x-full"
            }
            ${!isAssessmentActive ? "lg:translate-x-0" : ""}
          `}
        >

          <div className="flex items-center justify-between border-b border-white/[0.07] px-5 py-5">

            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-white/25">
                Course content
              </p>

              <p className="mt-1 text-sm font-semibold">
                {allLessons.length} lessons
              </p>
            </div>

            <button
              onClick={() =>
                setMobileSidebar(false)
              }
              className="lg:hidden"
            >
              <X
                size={18}
                className="text-white/40"
              />
            </button>

          </div>

          <div className="p-3">

            {course.modules.map(
              (module, moduleIndex) => {

                const isOpen =
                  openModules[
                    module.id
                  ];

                const moduleCompleted =
                  module.lessons.length >
                    0 &&
                  module.lessons.every(
                    (lesson) =>
                      lesson.is_completed,
                  );

                return (
                  <div
                    key={module.id}
                    className="mb-2"
                  >

                    <button
                      onClick={() =>
                        toggleModule(
                          module.id,
                        )
                      }
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition hover:bg-white/[0.04]"
                    >

                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/[0.05] text-[10px] font-semibold text-white/40">
                        {moduleCompleted ? (
                          <Check
                            size={14}
                            className="text-emerald-400"
                          />
                        ) : (
                          moduleIndex + 1
                        )}
                      </div>

                      <div className="min-w-0 flex-1">

                        <p className="truncate text-xs font-semibold text-white/75">
                          {module.title}
                        </p>

                        <p className="mt-0.5 text-[10px] text-white/25">
                          {module.lessons.length}{" "}
                          lessons
                        </p>

                      </div>

                      {isOpen ? (
                        <ChevronDown
                          size={15}
                          className="text-white/25"
                        />
                      ) : (
                        <ChevronRight
                          size={15}
                          className="text-white/25"
                        />
                      )}

                    </button>

                    {isOpen && (
                      <div className="ml-5 border-l border-white/[0.07] pl-3">

                        {module.lessons.map(
                          (lesson) => {

                            const active =
                              selectedLesson?.id ===
                              lesson.id;

                            return (
                              <button
                                key={
                                  lesson.id
                                }
                                onClick={() =>
                                  selectLesson(
                                    lesson,
                                  )
                                }
                                className={`
                                  relative flex w-full
                                  items-center gap-3
                                  rounded-lg px-3 py-3
                                  text-left transition
                                  ${
                                    active
                                      ? "bg-cyan-400/[0.08] text-white"
                                      : "text-white/40 hover:bg-white/[0.035] hover:text-white/70"
                                  }
                                `}
                              >

                                <div className="flex h-5 w-5 shrink-0 items-center justify-center">

                                  {lesson.is_completed ? (
                                    <CheckCircle2
                                      size={15}
                                      className="text-emerald-400"
                                    />
                                  ) : active ? (
                                    <Play
                                      size={13}
                                      fill="currentColor"
                                      className="text-cyan-400"
                                    />
                                  ) : (
                                    <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
                                  )}

                                </div>

                                <span className="line-clamp-2 text-xs leading-5">
                                  {lesson.title}
                                </span>

                              </button>
                            );
                          },
                        )}

                      </div>
                    )}

                  </div>
                );
              },
            )}

            {quiz && (
              <button
                type="button"
                onClick={() => {
                  setQuizResult(null);
                  openAssessment();
                  setSelectedLesson(null);
                  setMobileSidebar(false);

                  window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                  });
                }}
                className={`
                  mt-3 flex w-full items-center gap-3
                  rounded-xl px-3 py-3
                  text-left transition
                  ${
                    showAssessment
                      ? "bg-cyan-400/[0.08] text-white"
                      : "text-white/40 hover:bg-white/[0.035] hover:text-white/70"
                  }
                `}
              >
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-cyan-400/[0.08] text-cyan-400">
                  <CheckCircle2 size={15} />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-semibold">
                    {quiz.title}
                  </p>

                  <p className="mt-0.5 text-[10px] text-white/25">
                    Assessment · {quiz.questions.length} questions
                  </p>
                </div>
              </button>
            )}
          </div>

        </aside>

        {/* CONTENT */}

        <section className="min-w-0 flex-1">

          <div className="mx-auto max-w-[1000px] px-5 py-8 sm:px-8 lg:px-12 lg:py-12">

            <div className="mb-8">
              <Breadcrumbs
                items={[
                  { label: "Home", href: "/" },
                  {
                    label: "My Learning",
                    href: "/student/courses",
                  },
                  {
                    label: course.title,
                  },
                ]}
              />
            </div>
            {showAssessment && quiz && (
              showProctoringCheck ? (
                <ProctoringCheck
                  requireFullscreen={quiz.require_fullscreen}
                  onReady={(data) => {
                    startAssessment(quiz, data);
                  }}
                />
              ) : assessmentAttempt ? (
                quizResult ? (
                  <QuizResult result={quizResult} />
                ) : (
                  <QuizRunner
                    quiz={quiz}
                    attempt={assessmentAttempt}
                    onSubmitted={setQuizResult}
                  />
                )
              ) : (
                <AssessmentOverview
                  quiz={quiz}
                  quizAttempts={quizAttempts}
                  quizLoading={quizLoading}
                  onStart={() => startAssessment(quiz)}
                />
              )
            )}

            {selectedLesson && (
              <motion.div
                key={
                  selectedLesson.id
                }
                initial={{
                  opacity: 0,
                  y: 12,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.3,
                }}
              >

                {/* LESSON HEADER */}

                <div className="mb-8">

                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">
                    Lesson
                  </p>

                  <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                    {selectedLesson.title}
                  </h1>

                  {selectedLesson.duration && (
                    <div className="mt-3 flex items-center gap-2 text-xs text-white/30">
                      <Clock3 size={14} />

                      {selectedLesson.duration}{" "}
                      minutes
                    </div>
                  )}

                </div>

                {/* VIDEO */}

                {selectedLesson.video_url ? (
                  <div className="overflow-hidden rounded-[24px] border border-white/[0.08] bg-black">
                    <video
                      controls
                      className="aspect-video w-full"
                      src={
                        selectedLesson.video_url
                      }
                    />
                  </div>
                ) : (
                  <div className="flex aspect-video items-center justify-center overflow-hidden rounded-[24px] border border-white/[0.08] bg-gradient-to-br from-[#0b111a] to-[#07090e]">

                    <div className="text-center">

                      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/[0.07] text-cyan-400">
                        <BookOpen size={27} />
                      </div>

                      <p className="mt-4 text-sm text-white/35">
                        Lesson content
                      </p>

                    </div>

                  </div>
                )}

                {/* CONTENT */}

                <article className="mt-8 rounded-[24px] border border-white/[0.07] bg-[#090d14] p-6 sm:p-8 lg:p-10">

                  {selectedLesson.description && (
                    <p className="mb-7 text-base leading-7 text-white/45">
                      {
                        selectedLesson.description
                      }
                    </p>
                  )}

                  {selectedLesson.content ? (
                    <LessonContent
                        content={selectedLesson.content}
                    />
                  ) : (
                    <p className="text-sm leading-7 text-white/35">
                        Lesson content will appear here.
                    </p>
                  )}

                </article>

                {/* ACTION BAR */}

                <div className="mt-7 flex flex-col gap-4 border-t border-white/[0.07] pt-7 sm:flex-row sm:items-center sm:justify-between">

                  <button
                    disabled={
                      !previousLesson
                    }
                    onClick={() => {
                      if (
                        previousLesson
                      ) {
                        selectLesson(
                          previousLesson,
                        );
                      }
                    }}
                    className="flex items-center justify-center gap-2 rounded-xl border border-white/[0.08] px-5 py-3 text-sm text-white/45 transition hover:bg-white/[0.04] hover:text-white disabled:cursor-not-allowed disabled:opacity-20"
                  >
                    <ArrowLeft
                      size={16}
                    />

                    Previous
                  </button>

                  <button
                    disabled={
                      selectedLesson.is_completed ||
                      updatingProgress
                    }
                    onClick={
                      handleComplete
                    }
                    className={`
                      flex items-center
                      justify-center gap-2
                      rounded-xl px-6 py-3
                      text-sm font-semibold
                      transition
                      ${
                        selectedLesson.is_completed
                          ? "bg-emerald-400/[0.1] text-emerald-400"
                          : "bg-white text-black hover:bg-cyan-300"
                      }
                    `}
                  >
                    <Check size={16} />

                    {selectedLesson.is_completed
                      ? "Completed"
                      : updatingProgress
                        ? "Saving..."
                        : "Mark Complete"}
                  </button>

                  <button
                    disabled={
                      !nextLesson
                    }
                    onClick={() => {
                      if (nextLesson) {
                        selectLesson(
                          nextLesson,
                        );
                      }
                    }}
                    className="flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-20"
                  >
                    Next

                    <ArrowRight
                      size={16}
                    />
                  </button>

                </div>

              </motion.div>
            )}

          </div>

        </section>

      </div>

    </main>
  );
}


/* ============================================================
   LOADING
============================================================ */

function LearningSkeleton() {
  return (
    <main className="min-h-screen bg-[#05070b] text-white">

      <div className="h-[72px] border-b border-white/[0.07]" />

      <div className="flex">

        <div className="hidden w-[310px] border-r border-white/[0.07] lg:block">
          <div className="p-5">
            <div className="h-5 w-32 animate-pulse rounded bg-white/[0.05]" />

            <div className="mt-8 space-y-3">
              {Array.from({
                length: 8,
              }).map((_, index) => (
                <div
                  key={index}
                  className="h-10 animate-pulse rounded-xl bg-white/[0.035]"
                />
              ))}
            </div>
          </div>
        </div>

        <div className="flex-1 px-5 py-10 sm:px-10 lg:px-16">

          <div className="mx-auto max-w-[1000px] animate-pulse">

            <div className="h-3 w-20 rounded bg-white/[0.05]" />

            <div className="mt-5 h-10 w-3/4 rounded bg-white/[0.05]" />

            <div className="mt-8 aspect-video rounded-[24px] bg-white/[0.035]" />

            <div className="mt-8 h-64 rounded-[24px] bg-white/[0.035]" />

          </div>

        </div>

      </div>

    </main>
  );
}

function LessonContent({
  content,
}: {
  content: string;
}) {
  return (
    <div
      className="
        lesson-content
        max-w-none
        text-[15px]
        leading-7
        text-white/65

        [&_h1]:mb-6
        [&_h1]:mt-10
        [&_h1]:text-3xl
        [&_h1]:font-semibold
        [&_h1]:tracking-tight
        [&_h1]:text-white

        [&_h2]:mb-4
        [&_h2]:mt-10
        [&_h2]:text-2xl
        [&_h2]:font-semibold
        [&_h2]:text-white

        [&_h3]:mb-3
        [&_h3]:mt-8
        [&_h3]:text-xl
        [&_h3]:font-semibold
        [&_h3]:text-white

        [&_p]:mb-5
        [&_p]:leading-8

        [&_ul]:mb-6
        [&_ul]:ml-6
        [&_ul]:list-disc

        [&_ol]:mb-6
        [&_ol]:ml-6
        [&_ol]:list-decimal

        [&_li]:mb-2

        [&_strong]:font-semibold
        [&_strong]:text-white

        [&_a]:text-cyan-400
        [&_a]:underline
        [&_a]:underline-offset-4

        [&_blockquote]:my-7
        [&_blockquote]:border-l-2
        [&_blockquote]:border-cyan-400
        [&_blockquote]:bg-cyan-400/[0.04]
        [&_blockquote]:px-5
        [&_blockquote]:py-4
        [&_blockquote]:text-white/60

        [&_code]:rounded
        [&_code]:bg-white/[0.06]
        [&_code]:px-1.5
        [&_code]:py-0.5
        [&_code]:font-mono
        [&_code]:text-cyan-300

        [&_pre]:my-7
        [&_pre]:overflow-x-auto
        [&_pre]:rounded-2xl
        [&_pre]:border
        [&_pre]:border-white/[0.08]
        [&_pre]:bg-[#05080d]
        [&_pre]:p-5
        [&_pre]:font-mono
        [&_pre]:text-sm
        [&_pre]:leading-7
        [&_pre]:text-white/75
      "
      dangerouslySetInnerHTML={{
        __html: content,
      }}
    />
  );
}