"use client";

import type { QuizResult as QuizResultType } from "@/features/assessments/types/assessment.types";

interface QuizResultProps {
  result: QuizResultType;
}

export default function QuizResult({
  result,
}: QuizResultProps) {
  const passed = result.passed;

  return (
    <div className="rounded-[24px] border border-white/[0.08] bg-[#090d14] p-8 sm:p-10">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">
        Assessment Result
      </p>

      <h2 className="mt-3 text-3xl font-semibold">
        {passed
          ? "Assessment Passed"
          : "Assessment Not Passed"}
      </h2>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5">
          <p className="text-xs uppercase tracking-wider text-white/30">
            Score
          </p>

          <p className="mt-2 text-2xl font-semibold">
            {result.score} / {result.total_marks}
          </p>
        </div>

        <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5">
          <p className="text-xs uppercase tracking-wider text-white/30">
            Percentage
          </p>

          <p className="mt-2 text-2xl font-semibold">
            {result.percentage}%
          </p>
        </div>

        <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5">
          <p className="text-xs uppercase tracking-wider text-white/30">
            Pass Mark
          </p>

          <p className="mt-2 text-2xl font-semibold">
            {result.pass_percentage}%
          </p>
        </div>
      </div>

      <div
        className={`mt-8 rounded-2xl border p-5 ${
          passed
            ? "border-emerald-400/20 bg-emerald-400/[0.06]"
            : "border-amber-400/20 bg-amber-400/[0.06]"
        }`}
      >
        <p
          className={`text-sm ${
            passed
              ? "text-emerald-400"
              : "text-amber-400"
          }`}
        >
          {passed
            ? "Congratulations. You have successfully passed this assessment."
            : "Your assessment attempt has been completed. You can review your result and attempt history."}
        </p>
      </div>
    </div>
  );
}