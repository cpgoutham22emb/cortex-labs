import api from "@/lib/api";

export interface TrainingLandingPage {
  hero_title: string;
  hero_description: string;
  career_path_section_title: string;
  career_path_section_description: string;
  career_path_cta_text: string;
  skill_courses_section_title: string;
  skill_courses_section_description: string;
  skill_courses_cta_text: string;
}

export interface CareerStageTopic {
  id: number;
  title: string;
  order: number;
}

export interface CareerStage {
  id: number;
  title: string;
  description: string;
  order: number;
  topics: CareerStageTopic[];
}

export interface CareerProjectStep {
  id: number;
  title: string;
  order: number;
}

export interface CareerProject {
  id: number;
  title: string;
  description: string;
  order: number;
  steps: CareerProjectStep[];
}

export interface CareerSupportItem {
  id: number;
  title: string;
  order: number;
}

export interface CareerSupportCategory {
  id: number;
  title: string;
  description: string;
  order: number;
  items: CareerSupportItem[];
}

export interface CareerPath {
  id: number;
  course_id: number;
  course_slug: string;
  title: string;
  regular_price: string;
  founding_price: string;
  founding_batch_active: boolean;
  current_price: string;
  short_description: string;
  badge_text: string;
  cta_text: string;
  stages: CareerStage[];
  projects: CareerProject[];
  support_categories: CareerSupportCategory[];
}

export interface SkillCourse {
  id: number;
  title: string;
  slug: string;
  description: string;
  thumbnail: string | null;
  category: string;
  level: string;
  duration_hours: number;
  price: string;
}

export interface TrainingLandingResponse {
  landing_page: TrainingLandingPage | null;
  career_path: CareerPath | null;
  skill_courses: SkillCourse[];
}

export async function getTrainingLanding(): Promise<TrainingLandingResponse> {
  const response = await api.get<TrainingLandingResponse>("/training/");
  return response.data;
}

export async function getCareerPath(): Promise<CareerPath> {
  const response = await api.get<CareerPath>("/training/career-path/");
  return response.data;
}