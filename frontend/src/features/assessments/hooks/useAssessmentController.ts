"use client";

import { useState } from "react";

import { startQuizAttempt } from "@/features/assessments/api/assessment.api";

import type {
  Quiz,
  QuizAttempt,
  QuizStartRequest,
} from "@/features/assessments/types/assessment.types";


export function useAssessmentController() {

  // 1. State goes here
  const [showProctoringCheck, setShowProctoringCheck] =
    useState(false);

  const [assessmentAttempt, setAssessmentAttempt] =
    useState<QuizAttempt | null>(null);

  // 2. Start assessment function
  async function startAssessment(
    quiz: Quiz,
    proctoring?: QuizStartRequest["proctoring"],
  ) {
    if (quiz.proctoring_enabled && !proctoring) {
      setShowProctoringCheck(true);
      return;
    }

    console.log("Starting assessment:", quiz.id);

    try {
      const attempt = await startQuizAttempt(
        quiz.id,
        proctoring
          ? { proctoring }
          : {},
      );

      setAssessmentAttempt(attempt);
      setShowProctoringCheck(false);

      console.log(
        "Assessment attempt:",
        attempt,
      );
    } catch (error) {
      console.error(
        "Failed to start assessment:",
        error,
      );
    }
  }


  // 3. Cancel proctoring function
  function cancelProctoringCheck() {
    setShowProctoringCheck(false);
  }


  // 4. RETURN EVERYTHING THAT page.tsx NEEDS
  return {
    startAssessment,
    assessmentAttempt,
    showProctoringCheck,
    cancelProctoringCheck,
  };
}