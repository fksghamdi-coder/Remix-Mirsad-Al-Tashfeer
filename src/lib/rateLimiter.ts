// src/lib/rateLimiter.ts
import { SyncEngine } from './syncEngine';
// Rate Limiting ذكي مع Progressive Delays

interface Attempt {
  count: number;
  firstAttempt: number;
  lastAttempt: number;
  lockedUntil: number;
}

const KEY = 'mirsad_rate_limit_';
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000; // 15 دقيقة
const BASE_LOCK_MS = 5 * 60 * 1000; // 5 دقائق

function getKey(identifier: string): string {
  return KEY + identifier;
}

const memoryStore: Record<string, string> = {};

function getAttempt(identifier: string): Attempt {
  const k = getKey(identifier);
  let raw: string | null = null;
  if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
    raw = localStorage.getItem(k);
  } else {
    raw = memoryStore[k] || null;
  }
  if (!raw) {
    return { count: 0, firstAttempt: 0, lastAttempt: 0, lockedUntil: 0 };
  }
  try {
    return JSON.parse(raw);
  } catch {
    return { count: 0, firstAttempt: 0, lastAttempt: 0, lockedUntil: 0 };
  }
}

function saveAttempt(identifier: string, attempt: Attempt) {
  const k = getKey(identifier);
  const val = JSON.stringify(attempt);
  if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
    localStorage.setItem(k, val);
  } else {
    memoryStore[k] = val;
  }
}

/* ============ فحص الحظر ============ */
export function checkRateLimit(identifier: string, maxAttempts = MAX_ATTEMPTS): {
  allowed: boolean;
  remainingMs?: number;
  reason?: string;
} {
  const attempt = getAttempt(identifier);
  const now = Date.now();

  // محظور أو تجاوز المحاولات؟
  if (attempt.lockedUntil > now || attempt.count >= maxAttempts) {
    return {
      allowed: false,
      remainingMs: attempt.lockedUntil > now ? attempt.lockedUntil - now : 0,
      reason: 'locked',
    };
  }

  // نافذة منتهية؟ أعد التعيين
  if (attempt.firstAttempt > 0 && now - attempt.firstAttempt > WINDOW_MS && attempt.count > 0) {
    saveAttempt(identifier, {
      count: 0,
      firstAttempt: 0,
      lastAttempt: 0,
      lockedUntil: 0,
    });
    attempt.count = 0;
  }

  return { allowed: true };
}

/* ============ تسجيل محاولة فاشلة ============ */
export function recordFailedAttempt(identifier: string): {
  locked: boolean;
  remainingAttempts: number;
  lockDurationMs?: number;
} {
  const attempt = getAttempt(identifier);
  const now = Date.now();

  // بداية نافذة جديدة
  if (attempt.count === 0 || now - attempt.firstAttempt > WINDOW_MS) {
    attempt.count = 0;
    attempt.firstAttempt = now;
  }

  attempt.count++;
  attempt.lastAttempt = now;

  const remainingAttempts = Math.max(0, MAX_ATTEMPTS - attempt.count);

  if (attempt.count >= MAX_ATTEMPTS) {
    // Progressive: كل تجاوز يضاعف مدة الحظر
    const lockCount = attempt.count - MAX_ATTEMPTS + 1;
    const duration = BASE_LOCK_MS * Math.pow(2, Math.min(lockCount - 1, 4));
    attempt.lockedUntil = now + duration;
    saveAttempt(identifier, attempt);
    return {
      locked: true,
      remainingAttempts: 0,
      lockDurationMs: duration,
    };
  }

  saveAttempt(identifier, attempt);
  return { locked: false, remainingAttempts };
}

/* ============ إعادة تعيين عند النجاح ============ */
export function resetRateLimit(identifier: string) {
  const k = getKey(identifier);
  if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
    localStorage.removeItem(k);
  }
  delete memoryStore[k];
}

export function resetAllRateLimits(): void {
  for (const k of Object.keys(memoryStore)) {
    delete memoryStore[k];
  }
  if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
    const keysToRemove: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.startsWith(KEY)) {
        keysToRemove.push(k);
      }
    }
    for (const k of keysToRemove) {
      localStorage.removeItem(k);
    }
  }
}

export const rateLimiter = {
  checkRateLimit: (key: string, maxAttempts = 5, _windowMs = 60000) => {
    const res = checkRateLimit(key, maxAttempts);
    return {
      allowed: res.allowed,
      remainingAttempts: Math.max(0, maxAttempts - getAttempt(key).count),
    };
  },
  recordAttempt: (key: string) => {
    return recordFailedAttempt(key);
  },
  clear: (key: string) => {
    resetRateLimit(key);
  },
  resetAll: () => {
    resetAllRateLimits();
  },
};

