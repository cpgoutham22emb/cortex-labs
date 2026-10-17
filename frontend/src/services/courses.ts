import api from "@/lib/api";

import type {
  Quiz,
  QuizAttempt,
  QuizAttemptHistory,
  QuizStartRequest,
} from "@/features/assessments/types/assessment.types";

export interface Lesson {
  id: number;
  title: string;
  slug?: string;
  description?: string;
  content?: string;
  video_url?: string | null;
  duration?: number | null;
  is_completed?: boolean;
}

export interface Module {
  id: number;
  title: string;
  description?: string;
  lessons: Lesson[];
}

export interface CourseContent {
  id: number;
  title: string;
  slug: string;
  description?: string;
  modules: Module[];
}

export interface Course {
  id: number;
  title: string;
  slug: string;
  description: string;
  thumbnail: string | null;
  instructor: number;
  category: string;
  level: string;
  duration_hours: number;
  price: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export async function getPublishedCourses(): Promise<Course[]> {
  const response = await api.get("/courses/");

  return response.data;
}

export async function getCourseBySlug(
  slug: string,
): Promise<Course> {
  const response = await api.get(
    `/courses/${slug}/`,
  );

  return response.data;
}

export async function getCourseContent(
  slug: string,
): Promise<CourseContent> {
  const response =
    await api.get<CourseContent>(
      `/courses/${slug}/content/`,
    );

  return response.data;
}

export async function updateLessonProgress(
  lessonId: number,
  completed: boolean,
) {
  const response = await api.patch(
    `/courses/lessons/${lessonId}/progress/`,
    {
      completed,
    },
  );

  return response.data;
}

