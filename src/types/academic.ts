export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  chapter?: number;
  chapterId?: number;
}

export interface SolvedExample {
  title: string;
  given: string;
  steps: string[];
  result: string;
  whyItMatters: string;
}

export interface ChapterTableData {
  headers: string[];
  rows: string[][];
}

export interface ChapterSection {
  heading: string;
  content: string;
}

export interface Flashcard {
  id: string;
  front: string;
  back: string;
}

export interface ChapterData {
  id: number;
  chapter_number: number;
  title: string;
  subtitle?: string;
  category: string;
  pdfStartPage?: number;
  pdfEndPage?: number;
  description?: string;
  objectives: string[];
  sections: ChapterSection[];
  tables?: ChapterTableData[];
  commonMistake: { mistake: string; fix: string };
  solvedExample: SolvedExample;
  flashcards: Flashcard[];
  selfAssessment: string[];
  quiz: QuizQuestion[];
}

export interface AcademicCourse {
  id: string;
  code: string;
  title: string;
  englishTitle: string;
  description: string;
  chapterCount: number;
  badge: string;
  iconName: string;
}
