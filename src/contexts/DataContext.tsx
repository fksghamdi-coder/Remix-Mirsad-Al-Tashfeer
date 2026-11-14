import React, { createContext, useContext, useEffect, useState } from 'react';
import { CHAPTERS, ChapterData } from '@/lib/mockData';
import { getUsers, StoredUser } from '@/lib/auth';
import { auth, db, handleFirestoreError, OperationType } from '@/lib/firebase';
import {
  collection,
  doc,
  onSnapshot,
  query,
  where,
  setDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { useAuth } from './AuthContext';
import { sanitizeId, truncateString } from '@/lib/utils';
import { SyncEngine } from '@/lib/syncEngine';

void SyncEngine;

export interface AuditLogEntry {
  id: string;
  uid: string;
  actorName: string;
  action: string;
  category: 'auth' | 'curriculum' | 'security' | 'lab';
  details: string;
  timestamp: string;
}

export interface QuizScoreRecord {
  chapterId: number;
  score: number;
  totalQuestions: number;
  updatedAt: string;
}

export type AdminManagedUser = StoredUser & { lastLogin?: number };

interface DataCtx {
  users: AdminManagedUser[];
  chapters: ChapterData[];
  completedChapters: number[];
  quizScores: Record<number, QuizScoreRecord>;
  auditLogs: AuditLogEntry[];
  isCloudSynced: boolean;
  toggleChapterComplete: (chapterNumber: number) => Promise<void>;
  saveQuizAttempt: (chapterId: number, score: number, totalQuestions: number) => Promise<void>;
  upsertChapterMetadata: (
    chapterNumber: number,
    title: string,
    description: string,
    category: 'أساسي' | 'متقدم' | 'شبكات' | 'كمومي' | 'تطبيقي'
  ) => Promise<void>;
  deleteCustomChapter: (chapterNumber: number) => Promise<void>;
  syncDefaultChaptersToCloud: () => Promise<void>;
  addAuditLog: (
    action: string,
    category: 'auth' | 'curriculum' | 'security' | 'lab',
    details: string
  ) => Promise<void>;
}

const INITIAL_AUDIT_LOGS: AuditLogEntry[] = [
  {
    id: 'log_init_1',
    uid: 'system_hsm',
    actorName: 'HSM-ROOT-01',
    action: 'KEY_HIERARCHY_VERIFIED',
    category: 'security',
    details: 'فحص سلامة المفتاح الرئيس ومفاتيح التغليف (Wrapping Keys) وتفعيل قواعد Zero-Trust Firestore.',
    timestamp: '2026-10-20 07:30:00',
  },
  {
    id: 'log_init_2',
    uid: 'system_ecdsa',
    actorName: 'KEY-SIGN-AUDIT',
    action: 'NONCE_UNICITY_CHECK',
    category: 'security',
    details: 'فحص سجل التوقيعات الرقمية للتأكد من عدم تكرار قيمة r (الوقاية من ثغرة Nonce Reuse).',
    timestamp: '2026-10-20 07:32:15',
  },
  {
    id: 'log_init_3',
    uid: 'system_tls',
    actorName: 'SEHATECH-GATEWAY',
    action: 'TLS13_BASELINE_ACTIVE',
    category: 'security',
    details: 'تفعيل TLS 1.3 حصرياً مع AES-256-GCM و ChaCha20-Poly1305 ورفض اتصالات TLS 1.2 (Alert 70).',
    timestamp: '2026-10-20 07:34:00',
  },
];

const DataContext = createContext<DataCtx>({
  users: [],
  chapters: CHAPTERS,
  completedChapters: [],
  quizScores: {},
  auditLogs: INITIAL_AUDIT_LOGS,
  isCloudSynced: false,
  toggleChapterComplete: async () => {},
  saveQuizAttempt: async () => {},
  upsertChapterMetadata: async () => {},
  deleteCustomChapter: async () => {},
  syncDefaultChaptersToCloud: async () => {},
  addAuditLog: async () => {},
});

const PROGRESS_STORAGE_KEY = 'mirsad_completed_chapters_v2';
const QUIZ_STORAGE_KEY = 'mirsad_quiz_scores_v2';
const CUSTOM_CHAPTERS_KEY = 'mirsad_custom_chapters_v2';
const LOCAL_LOGS_KEY = 'mirsad_audit_logs_v2';

export function DataProvider({ children }: { children: React.ReactNode }) {
  const { session } = useAuth();
  const [users, setUsers] = useState<AdminManagedUser[]>(() =>
    getUsers().map(u => ({ ...u, lastLogin: u.created_at }))
  );
  const [chapters, setChapters] = useState<ChapterData[]>(CHAPTERS);
  const [completedChapters, setCompletedChapters] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem(PROGRESS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [1, 2];
    } catch {
      return [1, 2];
    }
  });
  const [quizScores, setQuizScores] = useState<Record<number, QuizScoreRecord>>(() => {
    try {
      const saved = localStorage.getItem(QUIZ_STORAGE_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_LOGS_KEY);
      return saved ? JSON.parse(saved) : INITIAL_AUDIT_LOGS;
    } catch {
      return INITIAL_AUDIT_LOGS;
    }
  });
  const [isCloudSynced, setIsCloudSynced] = useState(false);

  // Load any locally customized chapter overrides
  useEffect(() => {
    try {
      const raw = localStorage.getItem(CUSTOM_CHAPTERS_KEY);
      if (raw) {
        const overrides: Record<number, Partial<ChapterData>> = JSON.parse(raw);
        setChapters(
          CHAPTERS.map(ch =>
            overrides[ch.chapter_number] ? { ...ch, ...overrides[ch.chapter_number] } : ch
          )
        );
      }
    } catch {
      // ignore
    }
  }, []);

  // Real-time Firestore listener for public chapters
  useEffect(() => {
    if (!session) return; // الزائر لا يرى المنصة، فلا حاجة لمستمع Firestore
    const qChapters = query(collection(db, 'chapters'), where('visibility', '==', 'public'));
    const unsubChapters = onSnapshot(
      qChapters,
      snapshot => {
        setIsCloudSynced(true);
        if (!snapshot.empty) {
          const cloudMap: Record<number, Partial<ChapterData>> = {};
          snapshot.forEach(docSnap => {
            const d = docSnap.data();
            if (typeof d.chapterNumber === 'number') {
              cloudMap[d.chapterNumber] = {
                title: d.title,
                description: d.description,
                category: d.category,
              };
            }
          });
          setChapters(
            CHAPTERS.map(ch =>
              cloudMap[ch.chapter_number] ? { ...ch, ...cloudMap[ch.chapter_number] } : ch
            )
          );
        }
      },
      error => {
        console.warn('Chapters snapshot info:', error.message);
      }
    );

    return () => unsubChapters();
  }, [session]);

  // Real-time Firestore listeners for authenticated Firebase users
  useEffect(() => {
    if (!auth.currentUser || !session || session.authMode !== 'firebase') return;
    const uid = sanitizeId(auth.currentUser.uid);

    // 1. User Profile listener
    const unsubProfile = onSnapshot(
      doc(db, 'users', uid),
      snap => {
        if (snap.exists()) {
          const d = snap.data();
          if (Array.isArray(d.completedChapters)) {
            setCompletedChapters(d.completedChapters);
            localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(d.completedChapters));
          }
        }
      },
      error => {
        handleFirestoreError(error, OperationType.GET, `users/${uid}`);
      }
    );

    // 2. Quiz Attempts listener (Query Enforcer: uid == request.auth.uid)
    const qAttempts = query(collection(db, 'quiz_attempts'), where('uid', '==', uid));
    const unsubAttempts = onSnapshot(
      qAttempts,
      snap => {
        const scores: Record<number, QuizScoreRecord> = {};
        snap.forEach(docSnap => {
          const d = docSnap.data();
          scores[d.chapterId] = {
            chapterId: d.chapterId,
            score: d.score,
            totalQuestions: d.totalQuestions,
            updatedAt: new Date().toLocaleDateString('ar-SA'),
          };
        });
        if (Object.keys(scores).length > 0) {
          setQuizScores(prev => ({ ...prev, ...scores }));
        }
      },
      error => {
        handleFirestoreError(error, OperationType.LIST, 'quiz_attempts');
      }
    );

    // 3. Audit Logs listener (Query Enforcer: uid == request.auth.uid)
    const qLogs = query(collection(db, 'audit_logs'), where('uid', '==', uid));
    const unsubLogs = onSnapshot(
      qLogs,
      snap => {
        const cloudLogs: AuditLogEntry[] = [];
        snap.forEach(docSnap => {
          const d = docSnap.data();
          cloudLogs.push({
            id: docSnap.id,
            uid: d.uid,
            actorName: d.actorName,
            action: d.action,
            category: d.category,
            details: d.details,
            timestamp: d.createdAt?.toDate
              ? d.createdAt.toDate().toISOString().replace('T', ' ').slice(0, 19)
              : new Date().toISOString().replace('T', ' ').slice(0, 19),
          });
        });
        if (cloudLogs.length > 0) {
          setAuditLogs([...cloudLogs.reverse(), ...INITIAL_AUDIT_LOGS]);
        }
      },
      error => {
        handleFirestoreError(error, OperationType.LIST, 'audit_logs');
      }
    );

    return () => {
      unsubProfile();
      unsubAttempts();
      unsubLogs();
    };
  }, [session]);

  const addAuditLog = async (
    action: string,
    category: 'auth' | 'curriculum' | 'security' | 'lab',
    details: string
  ) => {
    const newEntry: AuditLogEntry = {
      id: `log_${Date.now()}`,
      uid: session?.uid || 'local_user',
      actorName: session?.displayName || session?.username || 'مستخدم',
      action: truncateString(action, 120, 2, 'ACTION'),
      category,
      details: truncateString(details, 500, 2, 'تفاصيل العملية'),
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
    };

    const updated = [newEntry, ...auditLogs].slice(0, 50);
    setAuditLogs(updated);
    localStorage.setItem(LOCAL_LOGS_KEY, JSON.stringify(updated));

    if (auth.currentUser && auth.currentUser.emailVerified) {
      const uid = sanitizeId(auth.currentUser.uid);
      const docId = sanitizeId(`log_${Date.now()}_${uid.slice(0, 6)}`);
      try {
        await setDoc(doc(db, 'audit_logs', docId), {
          uid,
          actorName: truncateString(session?.displayName || 'مستخدم', 100, 1, 'مستخدم'),
          action: truncateString(action, 120, 2, 'ACTION'),
          category,
          details: truncateString(details, 500, 2, 'تفاصيل العملية'),
          createdAt: serverTimestamp(),
        });
      } catch (error) {
        handleFirestoreError(error, OperationType.CREATE, `audit_logs/${docId}`);
      }
    }
  };

  const toggleChapterComplete = async (chapterNumber: number) => {
    const exists = completedChapters.includes(chapterNumber);
    const next = exists
      ? completedChapters.filter(c => c !== chapterNumber)
      : [...completedChapters, chapterNumber].slice(0, 20);

    setCompletedChapters(next);
    localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(next));

    if (auth.currentUser && auth.currentUser.emailVerified) {
      const uid = sanitizeId(auth.currentUser.uid);
      try {
        await updateDoc(doc(db, 'users', uid), {
          completedChapters: next,
          updatedAt: serverTimestamp(),
        });
      } catch (error) {
        handleFirestoreError(error, OperationType.UPDATE, `users/${uid}`);
      }
    }

    await addAuditLog(
      exists ? `UNMARK_CHAPTER_${chapterNumber}` : `COMPLETE_CHAPTER_${chapterNumber}`,
      'curriculum',
      `${exists ? 'إلغاء إتمام' : 'إتمام دراسة'} الفصل رقم ${chapterNumber} من مقرر التشفير المتقدم ISE243`
    );
  };

  const saveQuizAttempt = async (chapterId: number, score: number, totalQuestions: number) => {
    const record: QuizScoreRecord = {
      chapterId,
      score,
      totalQuestions,
      updatedAt: new Date().toLocaleDateString('ar-SA'),
    };
    const nextScores = { ...quizScores, [chapterId]: record };
    setQuizScores(nextScores);
    localStorage.setItem(QUIZ_STORAGE_KEY, JSON.stringify(nextScores));

    if (!completedChapters.includes(chapterId) && score >= Math.ceil(totalQuestions * 0.6)) {
      await toggleChapterComplete(chapterId);
    }

    if (auth.currentUser && auth.currentUser.emailVerified) {
      const uid = sanitizeId(auth.currentUser.uid);
      const attemptId = sanitizeId(`attempt_${uid}_ch_${chapterId}_${Date.now()}`);
      try {
        await setDoc(doc(db, 'quiz_attempts', attemptId), {
          uid,
          chapterId,
          score,
          totalQuestions,
          status: 'completed',
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
      } catch (error) {
        handleFirestoreError(error, OperationType.CREATE, `quiz_attempts/${attemptId}`);
      }
    }

    await addAuditLog(
      `QUIZ_COMPLETED_CH_${chapterId}`,
      'curriculum',
      `إتمام اختبار التقويم الذاتي للفصل ${chapterId} بنتيجة ${score} من ${totalQuestions}`
    );
  };

  const upsertChapterMetadata = async (
    chapterNumber: number,
    title: string,
    description: string,
    category: 'أساسي' | 'متقدم' | 'شبكات' | 'كمومي' | 'تطبيقي'
  ) => {
    const safeTitle = truncateString(title, 200, 3, 'عنوان الفصل');
    const safeDesc = truncateString(description, 1000, 5, 'وصف الفصل الدراسي');

    setChapters(prev =>
      prev.map(ch =>
        ch.chapter_number === chapterNumber
          ? { ...ch, title: safeTitle, description: safeDesc, category }
          : ch
      )
    );

    try {
      const raw = localStorage.getItem(CUSTOM_CHAPTERS_KEY);
      const overrides = raw ? JSON.parse(raw) : {};
      overrides[chapterNumber] = { title: safeTitle, description: safeDesc, category };
      localStorage.setItem(CUSTOM_CHAPTERS_KEY, JSON.stringify(overrides));
    } catch {
      // ignore
    }

    if (auth.currentUser && auth.currentUser.emailVerified && session?.role === 'admin') {
      const uid = sanitizeId(auth.currentUser.uid);
      const docId = sanitizeId(`chapter_${chapterNumber}`);
      try {
        await setDoc(doc(db, 'chapters', docId), {
          chapterNumber,
          title: safeTitle,
          description: safeDesc,
          category,
          visibility: 'public',
          authorId: uid,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
      } catch (error) {
        handleFirestoreError(error, OperationType.WRITE, `chapters/${docId}`);
      }
    }

    await addAuditLog(
      `UPDATE_CHAPTER_${chapterNumber}`,
      'curriculum',
      `تحديث بيانات الفصل ${chapterNumber}: ${safeTitle}`
    );
  };

  const deleteCustomChapter = async (chapterNumber: number) => {
    const original = CHAPTERS.find(c => c.chapter_number === chapterNumber);
    if (original) {
      setChapters(prev => prev.map(ch => (ch.chapter_number === chapterNumber ? original : ch)));
    }
    try {
      const raw = localStorage.getItem(CUSTOM_CHAPTERS_KEY);
      if (raw) {
        const overrides = JSON.parse(raw);
        delete overrides[chapterNumber];
        localStorage.setItem(CUSTOM_CHAPTERS_KEY, JSON.stringify(overrides));
      }
    } catch {
      // ignore
    }

    if (auth.currentUser && auth.currentUser.emailVerified && session?.role === 'admin') {
      const docId = sanitizeId(`chapter_${chapterNumber}`);
      try {
        await deleteDoc(doc(db, 'chapters', docId));
      } catch (error) {
        handleFirestoreError(error, OperationType.DELETE, `chapters/${docId}`);
      }
    }

    await addAuditLog(
      `RESET_CHAPTER_${chapterNumber}`,
      'curriculum',
      `استعادة بيانات الفصل ${chapterNumber} إلى النسخة المرجعية للكتاب`
    );
  };

  const syncDefaultChaptersToCloud = async () => {
    if (!auth.currentUser || !auth.currentUser.emailVerified || session?.role !== 'admin') {
      await addAuditLog(
        'LOCAL_CURRICULUM_SYNC',
        'curriculum',
        'تمت مزامنة الفصول الـ 13 محلياً بنجاح (سجل الدخول بحساب Google الإداري للمزامنة السحابية).'
      );
      return;
    }

    const uid = sanitizeId(auth.currentUser.uid);
    for (const ch of CHAPTERS) {
      const docId = sanitizeId(`chapter_${ch.chapter_number}`);
      const validCat = ['أساسي', 'متقدم', 'شبكات', 'كمومي', 'تطبيقي'].includes(ch.category)
        ? ch.category
        : 'أساسي';
      try {
        await setDoc(doc(db, 'chapters', docId), {
          chapterNumber: ch.chapter_number,
          title: truncateString(ch.title, 200, 3, 'فصل'),
          description: truncateString(ch.description, 1000, 5, 'وصف الفصل'),
          category: validCat,
          visibility: 'public',
          authorId: uid,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
      } catch (error) {
        handleFirestoreError(error, OperationType.WRITE, `chapters/${docId}`);
      }
    }

    await addAuditLog(
      'CLOUD_FIRESTORE_SYNC_ALL',
      'curriculum',
      'مزامنة جميع فصول مقرر التشفير المتقدم الـ 13 مع قاعدة البيانات المركزية Firestore'
    );
  };

  useEffect(() => {
    setUsers(getUsers().map(u => ({ ...u, lastLogin: u.created_at })));
  }, [session]);

  return (
    <DataContext.Provider
      value={{
        users,
        chapters,
        completedChapters,
        quizScores,
        auditLogs,
        isCloudSynced,
        toggleChapterComplete,
        saveQuizAttempt,
        upsertChapterMetadata,
        deleteCustomChapter,
        syncDefaultChaptersToCloud,
        addAuditLog,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => useContext(DataContext);
