// src/data/courses/types.ts
import type { ChapterData as RichChapterData } from '@/lib/mockData';

export interface FlashcardData {
  front: string;
  back: string;
  category?: string;
  phonetic?: string;
  pronunciationAudioText?: string;
}

export interface MiniQuiz {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface SlideGeneric {
  id?: number;
  slideNumber: number;
  title: string;
  subtitle?: string;
  titleEn?: string;
  bullets?: string[];
  bulletPoints?: string[];
  keyHighlight?: string;
  keyTakeaway?: string;
  highlightBox?: string;
  speakerNotes?: string;
  visualCue?: string;
  diagramRef?: string;
  diagramTitle?: string;
  englishKeyExcerpt?: string;
  phoneticHighlight?: string;
}

export interface ChapterData {
  id: number;
  chapter_number: number;
  title: string;
  subtitle?: string;
  description: string;
  content?: string;
  keyTopics?: string[];
  flashcards?: FlashcardData[];
  miniQuiz?: MiniQuiz[];
  videoUrl?: string;
  presentationUrl?: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  category?: 'أساسي' | 'متقدم' | 'شبكات' | 'كمومي' | 'تطبيقي' | string;
}

export interface ChapterImage {
  prompt?: string;
  caption: string;
  alt?: string;
  seed?: number;
  isAIGenerated?: boolean;
  url?: string;
}

export interface Chapter {
  id: number;
  chapter_number: number;
  title: string;
  subtitle?: string;
  description: string;
  content: string;
  images?: ChapterImage[];
  keyTopics: string[];
  diagramKey?: string;
  diagramDescription?: string;
  diagramConfig?: unknown;
  videoUrl?: string;
  videoTitle?: string;
  videoDuration?: string;
  presentationUrl?: string;
  slides?: SlideGeneric[];
  flashcards: FlashcardData[];
  miniQuiz?: MiniQuiz[];
  quiz?: MiniQuiz[];
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  pdfStartPage?: number;
  pdfEndPage?: number;
  richData?: RichChapterData;
  interactiveBook3D?: unknown;
  phonetic?: string;
  pronunciationAudioText?: string;
  vocabularyList?: unknown[];
  terminologyGlossary?: unknown[];
  updated_at: number;
}

export interface WeeklyPlanItem {
  week: number;
  topic: string;
  chapterNumber: number;
  practicalLab?: string;
  deliverable?: string;
}

export interface AssessmentMethod {
  name: string;
  weight: number;
  description: string;
}

export interface CourseInfo {
  id?: string;
  code: string;
  codeAr?: string;
  slug: string;
  title: string;
  titleEn: string;
  department?: string;
  university?: string;
  category?: string;
  description: string;
  level: string;
  chaptersCount: number;
  totalHours: number;
  status: 'available' | 'coming-soon' | 'planned';
  color: string;
  accent?: string;
  badge?: string;
  neonColor?: 'amber' | 'cyan' | 'emerald';
  icon: string;
  reference?: string;

  vision?: string;
  mission?: string;
  learningOutcomes?: string[];
  weeklyPlan?: WeeklyPlanItem[];
  assessmentMethods?: AssessmentMethod[];
  deliveryMode?: string;
  language?: string;
  instructor?: string;
  prerequisite?: string;
  topics?: string[];
  features?: string[];
  terminologyGlossary?: unknown[];
  chapters?: unknown[];
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
