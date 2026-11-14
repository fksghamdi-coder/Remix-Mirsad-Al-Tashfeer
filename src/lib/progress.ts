// Phase 2 — Progress tracking utilities (local-first, IndexedDB-ready)
import { db } from './db';
import { SyncEngine } from './syncEngine';

void SyncEngine;

const COMPLETED_KEY = 'mirsad_completed_chapters_v2';
const QUIZ_SCORES_KEY = 'mirsad_quiz_scores_v2';
const PROGRESS_KEY = 'mirsad_progress';

export interface QuizScoreRecord {
  chapterId: number;
  score: number;
  totalQuestions: number;
  updatedAt: string;
}

export interface UserProgress {
  username: string;
  completedChapters: number[];
  quizScores: Record<number, number>;
  quizScoreRecords?: Record<number, QuizScoreRecord>;
  lastActive: number;
  lastAccess?: number;
  createdAt?: number;
}

export type Progress = UserProgress;

function defaultProgress(username: string): UserProgress {
  const now = Date.now();
  return {
    username,
    completedChapters: [],
    quizScores: {},
    quizScoreRecords: {},
    lastActive: now,
    lastAccess: now,
    createdAt: now,
  };
}

export function getProgress(username: string): UserProgress {
  try {
    const rawNew = localStorage.getItem(`${PROGRESS_KEY}_${username}`);
    if (rawNew) {
      const parsed = JSON.parse(rawNew) as Partial<UserProgress> & { quizScores?: Record<number, number> | number[] };
      const quizScoresMap: Record<number, number> = {};
      if (Array.isArray(parsed.quizScores)) {
        parsed.quizScores.forEach((s, idx) => {
          quizScoresMap[idx] = Number(s) || 0;
        });
      } else if (parsed.quizScores && typeof parsed.quizScores === 'object') {
        Object.assign(quizScoresMap, parsed.quizScores);
      }
      const now = Date.now();
      return {
        username: parsed.username || username,
        completedChapters: Array.isArray(parsed.completedChapters) ? parsed.completedChapters : [],
        quizScores: quizScoresMap,
        quizScoreRecords: parsed.quizScoreRecords || {},
        lastActive: parsed.lastActive || parsed.lastAccess || now,
        lastAccess: parsed.lastAccess || parsed.lastActive || now,
        createdAt: parsed.createdAt || now,
      };
    }

    const rawV2 = localStorage.getItem(`${COMPLETED_KEY}_${username}`);
    if (rawV2) {
      const parsedV2 = JSON.parse(rawV2) as {
        completedChapters?: number[];
        quizScores?: Record<number, QuizScoreRecord | number>;
      };
      const quizScoresNum: Record<number, number> = {};
      const quizScoreRecords: Record<number, QuizScoreRecord> = {};
      if (parsedV2.quizScores) {
        for (const [k, v] of Object.entries(parsedV2.quizScores)) {
          const id = Number(k);
          if (typeof v === 'number') {
            quizScoresNum[id] = v;
            quizScoreRecords[id] = {
              chapterId: id,
              score: v,
              totalQuestions: 15,
              updatedAt: new Date().toISOString(),
            };
          } else if (v && typeof v === 'object' && 'score' in v) {
            quizScoresNum[id] = v.score;
            quizScoreRecords[id] = v;
          }
        }
      }
      const now = Date.now();
      return {
        username,
        completedChapters: Array.isArray(parsedV2.completedChapters) ? parsedV2.completedChapters : [],
        quizScores: quizScoresNum,
        quizScoreRecords,
        lastActive: now,
        lastAccess: now,
        createdAt: now,
      };
    }
  } catch {
    /* ignore */
  }
  return defaultProgress(username);
}

export async function saveProgress(progress: UserProgress): Promise<void> {
  const now = Date.now();
  progress.lastActive = now;
  progress.lastAccess = now;
  progress.createdAt = progress.createdAt || now;
  try {
    localStorage.setItem(`${PROGRESS_KEY}_${progress.username}`, JSON.stringify(progress));
    localStorage.setItem(
      `${COMPLETED_KEY}_${progress.username}`,
      JSON.stringify({
        completedChapters: progress.completedChapters,
        quizScores: progress.quizScoreRecords || progress.quizScores,
      })
    );
  } catch {
    /* ignore */
  }
  await db.set(`progress:${progress.username}`, progress);
}

export function isChapterComplete(username: string, chapterId: number): boolean {
  const progress = getProgress(username);
  return progress.completedChapters.includes(chapterId);
}

export function getCompletedChapters(username: string): number[] {
  const progress = getProgress(username);
  return progress.completedChapters;
}

export function markChapterComplete(username: string, chapterId: number): void {
  const progress = getProgress(username);
  if (!progress.completedChapters.includes(chapterId)) {
    progress.completedChapters.push(chapterId);
  }
  void saveProgress(progress);
}

export function getQuizScore(username: string, chapterId: number): QuizScoreRecord | null {
  const progress = getProgress(username);
  if (progress.quizScoreRecords && progress.quizScoreRecords[chapterId]) {
    return progress.quizScoreRecords[chapterId];
  }
  const numericScore = progress.quizScores[chapterId];
  if (typeof numericScore === 'number') {
    return {
      chapterId,
      score: numericScore,
      totalQuestions: 15,
      updatedAt: new Date(progress.lastActive).toISOString(),
    };
  }
  return null;
}

export function saveQuizScore(
  username: string,
  chapterId: number,
  score: number,
  totalQuestions: number = 15
): void {
  const progress = getProgress(username);
  const existingScore = progress.quizScores[chapterId] ?? 0;
  const bestScore = Math.max(existingScore, score);
  progress.quizScores[chapterId] = bestScore;
  if (!progress.quizScoreRecords) {
    progress.quizScoreRecords = {};
  }
  const existingRecord = progress.quizScoreRecords[chapterId];
  if (!existingRecord || score >= existingRecord.score) {
    progress.quizScoreRecords[chapterId] = {
      chapterId,
      score,
      totalQuestions,
      updatedAt: new Date().toISOString(),
    };
  }
  try {
    localStorage.setItem(
      `${QUIZ_SCORES_KEY}_${username}_${chapterId}`,
      JSON.stringify(progress.quizScoreRecords[chapterId])
    );
  } catch {
    /* ignore */
  }
  void saveProgress(progress);
}

export function getCompletionPercent(username: string, totalChapters: number = 12): number {
  const progress = getProgress(username);
  if (totalChapters <= 0) return 0;
  return Math.min(100, Math.round((progress.completedChapters.length / totalChapters) * 100));
}

export function getAverageScore(username: string): number {
  const progress = getProgress(username);
  const scores = Object.values(progress.quizScores);
  if (scores.length === 0) return 0;
  return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
}

export async function getAllProgress(): Promise<UserProgress[]> {
  try {
    const keys = await db.keys('progress:');
    const results: UserProgress[] = [];
    for (const key of keys) {
      const doc = await db.get<UserProgress>(key);
      if (doc && doc.username) results.push(doc);
    }
    if (results.length > 0) return results;
  } catch {
    /* fallback to localStorage */
  }

  const results: UserProgress[] = [];
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith(`${PROGRESS_KEY}_`)) {
        const username = key.replace(`${PROGRESS_KEY}_`, '');
        results.push(getProgress(username));
      }
    }
  } catch {
    /* ignore */
  }
  return results;
}
