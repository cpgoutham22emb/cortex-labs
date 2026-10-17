"use client";

import { useState } from "react";

import { useQuizSubmission } from "@/features/assessments/hooks/useQuizSubmission";

import type {
  Quiz,
  QuizAttempt,
  QuizAnswerSubmission,
  QuizResult,
} from "@/features/assessments/types/assessment.types";

interface QuizRunnerProps {
  quiz: Quiz;
  attempt: QuizAttempt;
  onSubmitted?: (result: QuizResult) => void;
}

export default function QuizRunner({
  quiz,
  attempt,
  onSubmitted,
}: QuizRunnerProps) {

  const {
    result,
    submitting,
    submissionError,
    submitAssessment,
  } = useQuizSubmission();

  const [currentQuestionIndex, setCurrentQuestionIndex] =
    useState(0);

  const [answers, setAnswers] = useState<
    Record<number, number>
  >({});

  const currentQuestion =
    quiz.questions[currentQuestionIndex];

  const totalQuestions = quiz.questions.length;

  const selectedOptionId =
    answers[currentQuestion.id];

  function selectOption(optionId: number) {
    setAnswers((previous) => ({
      ...previous,
      [currentQuestion.id]: optionId,
    }));
  }

  function goToPrevious() {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(
        (previous) => previous - 1,
      );
    }
  }

  function goToNext() {
    if (
      currentQuestionIndex <
      totalQuestions - 1
    ) {
      setCurrentQuestionIndex(
        (previous) => previous + 1,
      );
    }
  }

  async function handleSubmit() {
    const submissionAnswers: QuizAnswerSubmission[] =
      Object.entries(answers).map(
        ([questionId, optionId]) => ({
          question_id: Number(questionId),
          option_id: Number(optionId),
        }),
      );

    const quizResult = await submitAssessment(
      attempt.id,
      submissionAnswers,
    );

    if (quizResult) {
      onSubmitted?.(quizResult);
    }
  }

  return (
    <div className="space-y-6">

      {/* HEADER */}

      <div className="rounded-[24px] border border-white/[0.08] bg-[#090d14] p-6 sm:p-8">

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">
              Assessment
            </p>

            <h1 className="mt-2 text-2xl font-semibold">
              {quiz.title}
            </h1>
          </div>

          <div className="text-sm text-white/40">
            Attempt #{attempt.attempt_number}
          </div>

        </div>

        {/* PROGRESS */}

        <div className="mt-6">

          <div className="flex items-center justify-between text-xs text-white/35">
            <span>
              Question {currentQuestionIndex + 1} of{" "}
              {totalQuestions}
            </span>

            <span>
              {Math.round(
                ((currentQuestionIndex + 1) /
                  totalQuestions) *
                  100,
              )}
              %
            </span>
          </div>

          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/[0.08]">

            <div
              className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all"
              style={{
                width: `${
                  ((currentQuestionIndex + 1) /
                    totalQuestions) *
                  100
                }%`,
              }}
            />

          </div>

        </div>

      </div>

      {/* QUESTION */}

      <div className="rounded-[24px] border border-white/[0.08] bg-[#090d14] p-6 sm:p-8">

        <div className="flex items-start justify-between gap-4">

          <div>

            <p className="text-xs uppercase tracking-[0.15em] text-white/30">
              Question {currentQuestionIndex + 1}
            </p>

            <h2 className="mt-3 text-lg font-medium leading-8 text-white">
              {currentQuestion.question}
            </h2>

          </div>

          <span className="shrink-0 rounded-lg bg-white/[0.05] px-3 py-1.5 text-xs text-white/40">
            {currentQuestion.marks}{" "}
            {currentQuestion.marks === 1
              ? "mark"
              : "marks"}
          </span>

        </div>

        {/* OPTIONS */}

        <div className="mt-8 space-y-3">

          {currentQuestion.options.map(
            (option, index) => {

              const selected =
                selectedOptionId === option.id;

              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() =>
                    selectOption(option.id)
                  }
                  className={`
                    flex w-full items-start gap-4
                    rounded-xl border p-4
                    text-left transition
                    ${
                      selected
                        ? "border-cyan-400/40 bg-cyan-400/[0.08] text-white"
                        : "border-white/[0.08] text-white/60 hover:bg-white/[0.035] hover:text-white"
                    }
                  `}
                >

                  <span
                    className={`
                      flex h-7 w-7 shrink-0
                      items-center justify-center
                      rounded-lg text-xs font-semibold
                      ${
                        selected
                          ? "bg-cyan-400 text-black"
                          : "bg-white/[0.06] text-white/40"
                      }
                    `}
                  >
                    {String.fromCharCode(
                      65 + index,
                    )}
                  </span>

                  <span className="pt-1 text-sm leading-6">
                    {option.text}
                  </span>

                </button>
              );
            },
          )}

        </div>

        {/* NAVIGATION */}

        <div className="mt-8 flex items-center justify-between border-t border-white/[0.07] pt-6">

          <button
            type="button"
            disabled={currentQuestionIndex === 0}
            onClick={goToPrevious}
            className="rounded-xl border border-white/[0.08] px-5 py-3 text-sm text-white/50 transition hover:bg-white/[0.04] hover:text-white disabled:cursor-not-allowed disabled:opacity-20"
          >
            Previous
          </button>

          <span className="text-xs text-white/25">
            {Object.keys(answers).length} /{" "}
            {totalQuestions} answered
          </span>

          {currentQuestionIndex === totalQuestions - 1 ? (
            <button
              type="button"
              disabled={
                submitting ||
                Object.keys(answers).length !== totalQuestions
              }
              onClick={handleSubmit}
              className="rounded-xl bg-emerald-400 px-5 py-3 text-sm font-semibold text-black transition hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-30"
            >
              {submitting
                ? "Submitting..."
                : "Submit Assessment"}
            </button>
          ) : (
            <button
              type="button"
              onClick={goToNext}
              className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-cyan-300"
            >
              Next
            </button>
          )}

        </div>

      </div>

    </div>
  );
}