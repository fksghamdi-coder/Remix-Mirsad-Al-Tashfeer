// src/lib/security.ts
import { putRecord, getAllRecords } from './encryptedDB';
import { createNotification } from './notifications';

export type SecurityEventType =
  | 'login_failed'
  | 'login_success'
  | 'account_locked'
  | 'password_changed'
  | 'suspicious_pattern'
  | 'registration_attempt'
  | 'data_tamper_detected'
  | 'multiple_accounts_same_device'
  | 'off_hours_access'
  | 'brute_force_attempt'
  | 'devtools_opened'
  | 'unauthorized_inspection';

export interface SecurityEvent {
  id: string;
  type: SecurityEventType;
  severity: 'low' | 'medium' | 'high' | 'critical';
  timestamp: number;
  username?: string;
  details: Record<string, any>;
  acknowledged: boolean;
}

const SEVERITY_MAP: Record<SecurityEventType, SecurityEvent['severity']> = {
  login_failed: 'low',
  login_success: 'low',
  account_locked: 'high',
  password_changed: 'medium',
  suspicious_pattern: 'high',
  registration_attempt: 'low',
  data_tamper_detected: 'critical',
  multiple_accounts_same_device: 'medium',
  off_hours_access: 'low',
  brute_force_attempt: 'critical',
  devtools_opened: 'critical',
  unauthorized_inspection: 'high',
};

function buildSecurityMessage(event: SecurityEvent): string {
  const messages: Record<SecurityEventType, string> = {
    login_failed: `محاولة دخول فاشلة${event.username ? ` للمستخدم ${event.username}` : ''}`,
    login_success: `دخول ناجح${event.username ? ` للمستخدم ${event.username}` : ''}`,
    account_locked: `تم قفل الحساب${event.username ? ` للمستخدم ${event.username}` : ''} بعد محاولات فاشلة متكررة`,
    password_changed: `تم تغيير كلمة المرور${event.username ? ` للمستخدم ${event.username}` : ''}`,
    suspicious_pattern: `نمط مشبوه: ${event.details.reason || 'غير محدد'}`,
    registration_attempt: `محاولة تسجيل جديدة${event.username ? ` للاسم ${event.username}` : ''}`,
    data_tamper_detected: `🚨 تم رصد محاولة تلاعب بالبيانات!`,
    multiple_accounts_same_device: `تم إنشاء عدة حسابات من نفس الجهاز`,
    off_hours_access: `دخول في وقت غير معتاد${event.username ? ` من ${event.username}` : ''}`,
    brute_force_attempt: `🚨 هجوم تخمين كلمات مرور مكتشف${event.username ? ` على ${event.username}` : ''}`,
    devtools_opened: `🚨 تحذير أمني: تم رصد محاولة فتح أدوات المطورين واستعراض الكود البرمجي!`,
    unauthorized_inspection: `⚠️ محاولة فحص عناصر الصفحة أو استخدام اختصارات محظورة (F12/Ctrl+Shift+I)`,
  };
  return messages[event.type] || 'حدث أمني';
}

/** تسجيل حدث أمني وإشعار الأدمن إن كان خطيراً */
export async function logSecurityEvent(
  type: SecurityEventType,
  details: Record<string, any> = {},
  username?: string
): Promise<SecurityEvent> {
  const event: SecurityEvent = {
    id: `sec_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    type,
    severity: SEVERITY_MAP[type],
    timestamp: Date.now(),
    username,
    details,
    acknowledged: false,
  };

  try {
    await putRecord('security_events', event);
  } catch (err) {
    console.warn('Failed to persist security event', err);
  }

  // إشعار الأدمن في الحالات الحرجة
  if (event.severity === 'high' || event.severity === 'critical') {
    try {
      createNotification({
        type: 'warning',
        title: `🚨 تنبيه أمني ${event.severity === 'critical' ? 'حرج' : 'عالي'}`,
        message: buildSecurityMessage(event),
        broadcast: true,
        expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000,
      });
    } catch (err) {
      console.warn('Failed to notify admin', err);
    }
  }

  return event;
}

/** قراءة جميع الأحداث الأمنية (للأدمن) */
export async function getAllSecurityEvents(): Promise<SecurityEvent[]> {
  const events = await getAllRecords<SecurityEvent>('security_events');
  return events.sort((a, b) => b.timestamp - a.timestamp);
}

/** عدد الأحداث غير المُعالجة */
export async function getUnacknowledgedCount(): Promise<number> {
  const events = await getAllSecurityEvents();
  return events.filter((e) => !e.acknowledged).length;
}

/** تحديد حدث كمُعالج */
export async function acknowledgeEvent(id: string): Promise<void> {
  const events = await getAllSecurityEvents();
  const event = events.find((e) => e.id === id);
  if (event) {
    event.acknowledged = true;
    await putRecord('security_events', event);
  }
}

/** كشف الأنماط المشبوهة */
export async function detectAnomalies(username: string): Promise<string | null> {
  const events = await getAllSecurityEvents();
  const userEvents = events.filter((e) => e.username === username);
  const now = Date.now();

  // 1. هجوم تخمين: أكثر من 5 محاولات فاشلة في 10 دقائق
  const recentFailures = userEvents.filter(
    (e) => e.type === 'login_failed' && now - e.timestamp < 10 * 60 * 1000
  );
  if (recentFailures.length >= 5) {
    await logSecurityEvent(
      'brute_force_attempt',
      { attempts: recentFailures.length, window: '10min' },
      username
    );
    return 'brute_force_attempt';
  }

  // 2. دخول في وقت غير معتاد (2 صباحاً - 5 صباحاً)
  const hour = new Date().getHours();
  if (hour >= 2 && hour <= 5) {
    await logSecurityEvent(
      'off_hours_access',
      { hour, username },
      username
    );
  }

  return null;
}

/** تحقق من سلامة البيانات (hash check) */
export async function verifyDataIntegrity(
  data: any,
  expectedHash: string
): Promise<boolean> {
  const { sha256 } = await import('./encryption');
  const hash = await sha256(JSON.stringify(data));
  const isValid = hash === expectedHash;
  if (!isValid) {
    await logSecurityEvent('data_tamper_detected', {
      expected: expectedHash.slice(0, 16),
      actual: hash.slice(0, 16),
    });
  }
  return isValid;
}
