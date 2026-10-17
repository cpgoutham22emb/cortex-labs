"use client";

import { motion } from "framer-motion";
import AssessmentStart from "./AssessmentStart";

import type {
  Quiz,
  QuizAttemptHistory,
} from "@/features/assessments/types/assessment.types";


interface AssessmentOverviewProps {
  quiz: Quiz;
  quizAttempts: QuizAttemptHistory | null;
  quizLoading: boolean;
  onStart: () => void;
}

export default function AssessmentOverview({
  quiz,
  quizAttempts,
  quizLoading,
  onStart,
}: AssessmentOverviewProps) {
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
        duration: 0.3,
      }}
    >
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">
          Assessment
        </p>

        <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          {quiz.title}
        </h1>

        {quiz.description && (
          <p className="mt-4 max-w-3xl text-sm leading-7 text-white/45">
            {quiz.description}
          </p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <div className="rounded-2xl border border-white/[0.07] bg-[#090d14] p-5">
          <p className="text-xs text-white/30">
            Questions
          </p>

          <p className="mt-2 text-2xl font-semibold">
            {quiz.questions.length}
          </p>
        </div>

        <div className="rounded-2xl border border-white/[0.07] bg-[#090d14] p-5">
          <p className="text-xs text-white/30">
            Pass Percentage
          </p>

          <p className="mt-2 text-2xl font-semibold">
            {quiz.pass_percentage}%
          </p>
        </div>

        <div className="rounded-2xl border border-white/[0.07] bg-[#090d14] p-5">
          <p className="text-xs text-white/30">
            Attempts
          </p>

          <p className="mt-2 text-2xl font-semibold">
            {quizAttempts?.attempts_used ?? 0}
            {" / "}
            {quizAttempts?.effective_max_attempts ??
              quiz.max_attempts}
          </p>
        </div>

        <div className="rounded-2xl border border-white/[0.07] bg-[#090d14] p-5">
          <p className="text-xs text-white/30">
            Attempts Remaining
          </p>

          <p className="mt-2 text-2xl font-semibold">
            {quizAttempts?.attempts_remaining ??
              quiz.max_attempts}
          </p>
        </div>
      </div>

      <div className="mt-6 rounded-[24px] border border-white/[0.07] bg-[#090d14] p-6 sm:p-8">
        <h2 className="text-xl font-semibold">
          Ready to begin?
        </h2>

        <p className="mt-3 text-sm leading-7 text-white/45">
          This assessment contains{" "}
          {quiz.questions.length} questions.
          You need at least{" "}
          {quiz.pass_percentage}% to pass.
        </p>

        {quiz.proctoring_enabled && (
          <div className="mt-6 rounded-xl border border-cyan-400/10 bg-cyan-400/[0.04] p-4">
            <p className="text-sm font-semibold text-cyan-400">
              Proctored Assessment
            </p>

            <p className="mt-2 text-xs leading-6 text-white/40">
              Camera and microphone permissions
              may be required before starting this
              assessment.
            </p>
          </div>
        )}

        <AssessmentStart
        disabled={quizLoading || !quizAttempts?.attempts_remaining}
        onStart={onStart}
        />
      </div>
    </motion.div>
  );
}