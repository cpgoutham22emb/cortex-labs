"use client";

import { useState } from "react";

import {
  getCourseQuiz,
  getQuizAttempts,
} from "@/features/assessments/api/assessment.api";

import type {
  Quiz,
  QuizAttemptHistory,
} from "@/features/assessments/types/assessment.types";

export function useAssessment() {
  const [quiz, setQuiz] = useState<Quiz | null>(null);

  const [quizAttempts, setQuizAttempts] =
    useState<QuizAttemptHistory | null>(null);

  const [showAssessment, setShowAssessment] =
    useState(false);

  const [quizLoading, setQuizLoading] =
    useState(false);

  async function loadAssessment(slug: string) {
    try {
      setQuizLoading(true);

      const quizData = await getCourseQuiz(slug);

      setQuiz(quizData);

      const attemptsData =
        await getQuizAttempts(quizData.id);

      setQuizAttempts(attemptsData);
    } catch (error) {
      console.error(
        "Failed to load quiz:",
        error,
      );
    } finally {
      setQuizLoading(false);
    }
  }

  function openAssessment() {
    setShowAssessment(true);
  }

  function closeAssessment() {
    setShowAssessment(false);
  }

  return {
    quiz,
    quizAttempts,
    showAssessment,
    quizLoading,
    loadAssessment,
    openAssessment,
    closeAssessment,
  };
}