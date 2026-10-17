export interface QuizOption {
  id: number;
  text: string;
  order: number;
}

export interface QuizQuestion {
  id: number;
  question: string;
  order: number;
  marks: number;
  options: QuizOption[];
}

export interface Quiz {
  id: number;
  title: string;
  description: string;
  pass_percentage: number;
  max_attempts: number;
  proctoring_enabled: boolean;
  require_fullscreen: boolean;
  detect_tab_switch: boolean;
  max_warnings: number;
  questions: QuizQuestion[];
}

export interface QuizAttempt {
  id: number;
  quiz: number;
  attempt_number: number;
  status: string;
  started_at: string;
}

export interface QuizAttemptHistory {
  quiz_id: number;
  quiz_title: string;
  attempts: QuizAttempt[];
  attempts_used: number;
  maximum_attempts: number;
  additional_attempts: number;
  effective_max_attempts: number;
  attempts_remaining: number;
}

export interface QuizStartRequest {
  proctoring?: {
    camera_ready: boolean;
    microphone_ready: boolean;
    fullscreen_ready: boolean;
  };
}

export interface QuizAnswerSubmission {
  question_id: number;
  option_id: number;
}

export interface QuizSubmitRequest {
  answers: QuizAnswerSubmission[];
}

export interface QuizResult {
  attempt_id: number;
  score: number;
  total_marks: number;
  percentage: number;
  pass_percentage: number;
  passed: boolean;
  status: string;
  completed_at: string;
}