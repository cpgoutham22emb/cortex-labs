import api from "@/lib/api";

import type {
  Quiz,
  QuizAttempt,
  QuizAttemptHistory,
  QuizStartRequest,
  QuizResult,
  QuizSubmitRequest,
} from "@/features/assessments/types/assessment.types";

export async function getCourseQuiz(
  slug: string,
): Promise<Quiz> {
  const response = await api.get<Quiz>(
    `/courses/${slug}/quiz/`,
  );

  return response.data;
}

export async function getQuizAttempts(
  quizId: number,
): Promise<QuizAttemptHistory> {
  const response = await api.get<QuizAttemptHistory>(
    `/courses/quizzes/${quizId}/attempts/`,
  );

  return response.data;
}

export async function startQuizAttempt(
  quizId: number,
  data: QuizStartRequest,
): Promise<QuizAttempt> {
  const response = await api.post<QuizAttempt>(
    `/courses/quizzes/${quizId}/attempts/`,
    data,
  );

  return response.data;
}

export async function submitQuizAttempt(
  attemptId: number,
  data: QuizSubmitRequest,
): Promise<QuizResult> {
  const response = await api.post<QuizResult>(
    `/courses/attempts/${attemptId}/submit/`,
    data,
  );

  return response.data;
}