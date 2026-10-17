"use client";

import { useState } from "react";

import { submitQuizAttempt } from "@/features/assessments/api/assessment.api";

import type {
  QuizAnswerSubmission,
  QuizResult,
} from "@/features/assessments/types/assessment.types";

export function useQuizSubmission() {
  const [result, setResult] = useState<QuizResult | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(
    null,
  );

  async function submitAssessment(
    attemptId: number,
    answers: QuizAnswerSubmission[],
  ) {
    try {
      setSubmitting(true);
      setSubmissionError(null);

      const quizResult = await submitQuizAttempt(
        attemptId,
        { answers },
      );

      setResult(quizResult);

      return quizResult;
    } catch (error) {
      console.error("Failed to submit assessment:", error);

      setSubmissionError(
        "Unable to submit the assessment. Please try again.",
      );

      return null;
    } finally {
      setSubmitting(false);
    }
  }

  return {
    result,
    submitting,
    submissionError,
    submitAssessment,
  };
}