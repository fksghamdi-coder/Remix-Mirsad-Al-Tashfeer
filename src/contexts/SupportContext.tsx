import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { useAuth } from './AuthContext';
import { SyncEngine } from '@/lib/syncEngine';

export interface SupportTicket {
  id: number;
  referenceCode: string;
  senderName: string;
  senderAccountKey: string;
  message: string;
  status: 'pending' | 'replied';
  timestamp: string;
  adminReply?: string;
  repliedAt?: string;
}

export interface SupportContextType {
  sendTicket: (senderName: string, message: string) => SupportTicket | null;
  replyToTicket: (ticketId: number, replyText: string) => void;
  tickets: SupportTicket[]; // المعزولة تلقائياً للمستخدم الحالي (أو الكل للأدمن)
  allTicketsCount: number;
  currentAccountKey: string;
  isAdmin: boolean;
}

export const SupportContext = createContext<SupportContextType>({
  sendTicket: () => null,
  replyToTicket: () => {},
  tickets: [],
  allTicketsCount: 0,
  currentAccountKey: '',
  isAdmin: false,
});

const STORAGE_KEY = 'mirsad_support_tickets_v2';
const GUEST_SESSION_KEY = 'mirsad_guest_visitor_id';

function getOrCreateVisitorKey(): string {
  if (typeof window === 'undefined') return 'guest_default';
  try {
    let key = localStorage.getItem(GUEST_SESSION_KEY);
    if (!key) {
      key = `guest_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
      localStorage.setItem(GUEST_SESSION_KEY, key);
    }
    return key;
  } catch {
    return 'guest_fallback';
  }
}

export const SupportProvider = ({ children }: { children: React.ReactNode }) => {
  const { session } = useAuth();

  // مفتاح حساب المرسل المعتمد للعزل الصارم
  const currentAccountKey = useMemo(() => {
    if (session?.username) {
      return `user_${session.username}`;
    }
    return getOrCreateVisitorKey();
  }, [session?.username]);

  const isAdmin = session?.role === 'admin';

  // تحميل التذاكر المخزنة دون أي تذاكر افتراضية مشتركة
  const [allTickets, setAllTickets] = useState<SupportTicket[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      // إزالة التخزين القديم ذو التذاكر العامة
      localStorage.removeItem('mirsad_support_tickets');
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // ignore
    }
    return [];
  });

  // مزامنة محلياً ومع الـ SyncEngine
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(allTickets));
      void SyncEngine.saveSecurely(STORAGE_KEY, allTickets);
    } catch {
      // ignore
    }
  }, [allTickets]);

  // الاستماع للتحديثات الفورية بين النوافذ والتبويبات
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          setAllTickets(parsed);
        } catch {
          // ignore
        }
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // إرسال تذكرة / شكوى سرية جديدة
  const sendTicket = useCallback(
    (senderName: string, message: string): SupportTicket | null => {
      const trimmedName = senderName.trim();
      const trimmedMsg = message.trim();
      if (!trimmedName || !trimmedMsg) return null;

      // توليد رمز مرجعي سري وفريد مثل MRSD-123456
      const randomNum = Math.floor(100000 + Math.random() * 900000);
      const referenceCode = `MRSD-${randomNum}`;

      const newTicket: SupportTicket = {
        id: Date.now(),
        referenceCode,
        senderName: trimmedName,
        senderAccountKey: currentAccountKey,
        message: trimmedMsg,
        status: 'pending',
        timestamp: new Date().toISOString(),
      };

      setAllTickets((prev) => [newTicket, ...prev]);
      return newTicket;
    },
    [currentAccountKey]
  );

  // رد الأدمن على تذكرة محددة
  const replyToTicket = useCallback((ticketId: number, replyText: string) => {
    const trimmedReply = replyText.trim();
    if (!trimmedReply) return;

    setAllTickets((prev) =>
      prev.map((t) => {
        if (t.id === ticketId) {
          return {
            ...t,
            status: 'replied',
            adminReply: trimmedReply,
            repliedAt: new Date().toISOString(),
          };
        }
        return t;
      })
    );
  }, []);

  // تطبيق العزل الصارم للخصوصية:
  // الأدمن: يرى جميع الشكاوى الواردة
  // غير الأدمن: يرى فقط رسائله التي تتطابق مع مفتاح حسابه الحالي
  const visibleTickets = useMemo(() => {
    if (isAdmin) {
      return allTickets;
    }
    return allTickets.filter((t) => t.senderAccountKey === currentAccountKey);
  }, [allTickets, isAdmin, currentAccountKey]);

  return (
    <SupportContext.Provider
      value={{
        sendTicket,
        replyToTicket,
        tickets: visibleTickets,
        allTicketsCount: allTickets.length,
        currentAccountKey,
        isAdmin,
      }}
    >
      {children}
    </SupportContext.Provider>
  );
};

export const useSupport = () => useContext(SupportContext);
