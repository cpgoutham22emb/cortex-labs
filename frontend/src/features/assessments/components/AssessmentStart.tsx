"use client";

interface AssessmentStartProps {
  onStart: () => void;
  disabled?: boolean;
}

export default function AssessmentStart({
  onStart,
  disabled = false,
}: AssessmentStartProps) {
  return (
    <button
      type="button"
      onClick={onStart}
      disabled={disabled}
      className="mt-7 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-30"
    >
      Start Assessment
    </button>
  );
}