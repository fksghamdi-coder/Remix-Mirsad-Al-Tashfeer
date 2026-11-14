import { SyncEngine } from './syncEngine';

void SyncEngine;

// ─── Types ────────────────────────────────────────────────────────────
export interface AuditEntry {
  id: string;
  action: string;
  details: string;
  timestamp: string;
  user: string;
}

export interface CourseStat {
  slug: string;
  code: string;
  title: string;
  totalChapters: number;
  completedChapters: number;
  avgScore: number;
  enrolledUsers: number;
  accent: string;
}

export interface UserEntry {
  username: string;
  fullName: string;
  academicId: string;
  phone: string;
  role: 'admin' | 'user' | 'doctor';
  needsPasswordChange: boolean;
  createdAt: number;
}

// ─── LocalStorage helpers ─────────────────────────────────────────────
function lsGet<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch { return fallback; }
}
function lsSet<T>(key: string, value: T): void {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* ignore */ }
}

// ─── Users ────────────────────────────────────────────────────────────
export function getDashboardUsers(): UserEntry[] {
  return lsGet<UserEntry[]>('mirsad_dashboard_users', []);
}

export function saveDashboardUsers(users: UserEntry[]): void {
  lsSet('mirsad_dashboard_users', users);
}

export function addDashboardUser(user: UserEntry): void {
  const users = getDashboardUsers();
  users.push(user);
  saveDashboardUsers(users);
}

export function removeDashboardUser(username: string): boolean {
  const users = getDashboardUsers();
  const filtered = users.filter(u => u.username !== username);
  if (filtered.length === users.length) return false;
  saveDashboardUsers(filtered);
  return true;
}

export function updateDashboardUserRole(username: string, role: UserEntry['role']): boolean {
  const users = getDashboardUsers();
  const idx = users.findIndex(u => u.username === username);
  if (idx === -1) return false;
  users[idx].role = role;
  saveDashboardUsers(users);
  return true;
}

// ─── Audit Logs ───────────────────────────────────────────────────────
export function getAuditLogs(): AuditEntry[] {
  return lsGet<AuditEntry[]>('mirsad_audit_logs', []);
}

export function addAuditLog(entry: Omit<AuditEntry, 'id' | 'timestamp'>): void {
  const logs = getAuditLogs();
  logs.unshift({ ...entry, id: crypto.randomUUID(), timestamp: new Date().toISOString() });
  if (logs.length > 200) logs.length = 200;
  lsSet('mirsad_audit_logs', logs);
}

// ─── Course Stats ─────────────────────────────────────────────────────
const DEFAULT_COURSE_STATS: CourseStat[] = [
  { slug: 'ise243', code: 'ISE243', title: 'التشفير المتقدم', totalChapters: 12, completedChapters: 0, avgScore: 0, enrolledUsers: 0, accent: '#f59e0b' },
  { slug: 'ise231', code: 'ISE231', title: 'تخطيط وإدارة الأمن السيبراني', totalChapters: 10, completedChapters: 0, avgScore: 0, enrolledUsers: 0, accent: '#10b981' },
  { slug: 'ise232-threats', code: 'ISE232-B', title: 'التهديدات السيبرانية', totalChapters: 8, completedChapters: 0, avgScore: 0, enrolledUsers: 0, accent: '#ef4444' },
  { slug: 'ise232-risk', code: 'ISE232-A', title: 'تحليل المخاطر السيبرانية', totalChapters: 10, completedChapters: 0, avgScore: 0, enrolledUsers: 0, accent: '#3b82f6' },
  { slug: 'ise232-programs', code: 'ISE232-C', title: 'إدارة البرامج الأمنية', totalChapters: 9, completedChapters: 0, avgScore: 0, enrolledUsers: 0, accent: '#8b5cf6' },
];

export function getCoursesStats(): CourseStat[] {
  return lsGet<CourseStat[]>('mirsad_course_stats', DEFAULT_COURSE_STATS);
}

export function saveCoursesStats(stats: CourseStat[]): void {
  lsSet('mirsad_course_stats', stats);
}

// ─── Static demo data for charts ──────────────────────────────────────
export const CHAPTER_TREND_DATA = [
  { week: 'أسبوع 1', added: 3, deleted: 0 },
  { week: 'أسبوع 2', added: 5, deleted: 1 },
  { week: 'أسبوع 3', added: 4, deleted: 0 },
  { week: 'أسبوع 4', added: 6, deleted: 2 },
  { week: 'أسبوع 5', added: 3, deleted: 0 },
  { week: 'أسبوع 6', added: 7, deleted: 1 },
  { week: 'أسبوع 7', added: 5, deleted: 0 },
  { week: 'أسبوع 8', added: 4, deleted: 1 },
];

export const QUIZ_PERFORMANCE = [
  { chapter: 1, attempts: 45, passRate: 78, avgScore: 72 },
  { chapter: 2, attempts: 42, passRate: 71, avgScore: 68 },
  { chapter: 3, attempts: 38, passRate: 65, avgScore: 63 },
  { chapter: 4, attempts: 35, passRate: 82, avgScore: 79 },
  { chapter: 5, attempts: 33, passRate: 74, avgScore: 70 },
  { chapter: 7, attempts: 30, passRate: 68, avgScore: 65 },
  { chapter: 8, attempts: 28, passRate: 60, avgScore: 58 },
  { chapter: 9, attempts: 25, passRate: 55, avgScore: 54 },
  { chapter: 10, attempts: 22, passRate: 50, avgScore: 52 },
  { chapter: 11, attempts: 20, passRate: 48, avgScore: 50 },
];

export const USER_ACTIVITY = [
  { day: 'سبت', active: 12, new_: 2 },
  { day: 'أحد', active: 18, new_: 3 },
  { day: 'اثنين', active: 25, new_: 5 },
  { day: 'ثلاثاء', active: 22, new_: 4 },
  { day: 'أربعاء', active: 30, new_: 6 },
  { day: 'خميس', active: 28, new_: 5 },
  { day: 'جمعة', active: 15, new_: 1 },
];

export const SECURITY_SCORES = [
  { area: 'المصادقة', score: 85, target: 90 },
  { area: 'التشفير', score: 92, target: 95 },
  { area: 'قواعد البيانات', score: 78, target: 85 },
  { area: 'واجهات API', score: 88, target: 90 },
  { area: 'PWA', score: 82, target: 90 },
  { area: 'CSP Headers', score: 95, target: 100 },
];

export const KNOWLEDGE_NODES_COUNT = 30;
export const QUIZ_QUESTIONS_COUNT = 47;

// ─── Aggregate overview ───────────────────────────────────────────────
export function getAggregateOverview() {
  const users = getDashboardUsers();
  const stats = getCoursesStats();
  const totalChapters = stats.reduce((s, c) => s + c.totalChapters, 0);
  const totalCompleted = stats.reduce((s, c) => s + c.completedChapters, 0);
  const admins = users.filter(u => u.role === 'admin').length;
  const doctors = users.filter(u => u.role === 'doctor').length;
  const needPasswordChange = users.filter(u => u.needsPasswordChange).length;
  return {
    totalUsers: users.length,
    admins,
    doctors,
    totalChapters,
    totalCompleted,
    completionRate: totalChapters > 0 ? Math.round((totalCompleted / totalChapters) * 100) : 0,
    needPasswordChange,
    knowledgeNodes: KNOWLEDGE_NODES_COUNT,
    quizQuestions: QUIZ_QUESTIONS_COUNT,
  };
}
