export interface FlashcardData {
  front: string;
  back: string;
  category: string;
}

export interface MiniQuiz {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface ChapterData {
  id: number;
  chapter_number: number;
  title: string;
  description: string;
  content: string;
  keyTopics: string[];
  flashcards?: FlashcardData[];
  miniQuiz?: MiniQuiz[];
  videoUrl?: string;
  presentationUrl?: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  category?: 'أساسي' | 'متقدم' | 'شبكات' | 'كمومي' | 'تطبيقي';
}

export interface CourseInfo {
  id: string;
  slug: string;
  code: string;
  title: string;
  titleEn: string;
  category: string;
  level: string;
  icon: string;
  color: string;
  badge: string;
  neonColor: 'amber' | 'cyan' | 'emerald';
  status: 'available' | 'coming-soon';
  chaptersCount: number;
  totalHours: number;
  description: string;
  topics?: string[];
  prerequisite?: string;
  vision?: string;
  mission?: string;
  learningOutcomes?: string[];
  assessmentMethods?: { name: string; weight: number; description: string }[];
  weeklyPlan?: { week: number; topic: string; chapterNumber: number }[];
  reference?: string;
  chapters: ChapterData[];
}

export interface StudentPersona {
  id: number;
  name: string;
  role: string;
  academicId: string;
  responsibilities: string[];
  quote: string;
  avatar: string;
  color: string;
}
