import { sha256 } from './hash';
import { SyncEngine } from './syncEngine';

export type AuditCategory =
  | 'auth'
  | 'curriculum'
  | 'security'
  | 'lab'
  | 'admin';

export interface AuditPayload {
  userId: string | null;
  actorName: string | null;
  action: string;
  category: AuditCategory;
  details?: string | null;
}

export interface AuditLogRecord {
  id: string;
  user_id: string | null;
  actor_name: string | null;
  action: string;
  category: AuditCategory;
  details: string | null;
  prev_hash: string | null;
  hash: string;
  created_at: string;
}

const LOCAL_STORAGE_KEY = 'mirsad_audit_chain';

// Seed initial tamper-evident audit logs if empty
function getInitialLogs(): AuditLogRecord[] {
  let prevHash = 'GENESIS';
  const initialEvents: Array<{
    userId: string | null;
    actorName: string | null;
    action: string;
    category: AuditCategory;
    details: string;
    created_at: string;
  }> = [
    {
      userId: 'system',
      actorName: 'نظام مِرْصَاد للتشفير',
      action: 'SYSTEM_BOOTSTRAP',
      category: 'security',
      details: 'تهيئة البنية التحتية لمنصة مِرْصَاد وقواعد بيانات التشفير الوطنية',
      created_at: new Date(Date.now() - 3600000 * 24 * 7).toISOString(),
    },
    {
      userId: 'admin_1',
      actorName: 'فهد خالد الغامدي',
      action: 'COURSE_CONFIGURED',
      category: 'curriculum',
      details: 'اعتماد الخطة الأكاديمية لمقرر ISE243: التشفير المتقدم (12 فصلاً)',
      created_at: new Date(Date.now() - 3600000 * 24 * 5).toISOString(),
    },
    {
      userId: 'admin_1',
      actorName: 'فهد خالد الغامدي',
      action: 'ZKP_LAB_INITIALIZED',
      category: 'lab',
      details: 'تفعيل معمل بروتوكول سيجما (Schnorr) لإثبات المعرفة الصفرية مع كاشف إعادة استخدام nonce',
      created_at: new Date(Date.now() - 3600000 * 24 * 3).toISOString(),
    },
    {
      userId: 'system',
      actorName: 'محرك الشهادات الرقمية',
      action: 'CERT_AUTHORITY_READY',
      category: 'security',
      details: 'ربط مفاتيح التوقيع الرقمي وبصمات SHA-256 للتحقق العام من الشهادات الأكاديمية',
      created_at: new Date(Date.now() - 3600000 * 24).toISOString(),
    },
  ];

  const builtLogs: AuditLogRecord[] = [];
  for (let i = 0; i < initialEvents.length; i++) {
    const e = initialEvents[i];
    const hash = sha256(
      [
        prevHash,
        e.userId ?? 'anonymous',
        e.action,
        e.category,
        e.details,
        e.created_at,
      ].join('|')
    );
    builtLogs.push({
      id: `audit_${i + 1}`,
      user_id: e.userId,
      actor_name: e.actorName,
      action: e.action,
      category: e.category,
      details: e.details,
      prev_hash: prevHash,
      hash,
      created_at: e.created_at,
    });
    prevHash = hash;
  }

  return builtLogs;
}

/**
 * جلب سجلات التدقيق المخزنة محلياً
 */
export function getStoredAuditLogs(): AuditLogRecord[] {
  try {
    const raw = typeof window !== 'undefined' ? localStorage.getItem(LOCAL_STORAGE_KEY) : null;
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.warn('Failed to load audit logs from localStorage', err);
  }
  const initial = getInitialLogs();
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(initial));
    } catch {
      // ignore
    }
  }
  return initial;
}

/**
 * حفظ السجلات محلياً
 */
function saveAuditLogs(logs: AuditLogRecord[]): void {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(logs));
    } catch (e) {
      console.warn('Failed to save audit logs to localStorage', e);
    }
  }
}

/**
 * يكتب سجل تدقيق مع الحفاظ على سلسلة hash غير قابلة للكسر.
 * تدعم عميل Supabase أو التخزين المحلي التلقائي.
 */
export async function writeAuditLog(
  adminClientOrNull: any,
  payload: AuditPayload
): Promise<{ id: string; hash: string }> {
  // If Supabase client provided with .from('audit_logs')
  if (adminClientOrNull && typeof adminClientOrNull.from === 'function') {
    try {
      const { data: lastLog } = await adminClientOrNull
        .from('audit_logs')
        .select('hash')
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      const prevHash = lastLog?.hash ?? 'GENESIS';
      const timestamp = new Date().toISOString();
      const details = payload.details ?? '';

      const hashInput = [
        prevHash,
        payload.userId ?? 'anonymous',
        payload.action,
        payload.category,
        details,
        timestamp,
      ].join('|');

      const hash = sha256(hashInput);

      const { data, error } = await adminClientOrNull
        .from('audit_logs')
        .insert({
          user_id: payload.userId,
          actor_name: payload.actorName,
          action: payload.action,
          category: payload.category,
          details,
          prev_hash: prevHash,
          hash,
          created_at: timestamp,
        })
        .select('id, hash')
        .single();

      if (error || !data) {
        throw new Error(`Failed to write audit log: ${error?.message}`);
      }

      return data;
    } catch (err) {
      console.warn('Falling back to local audit chain logger:', err);
    }
  }

  // Local storage fallback for SPA runtime
  const currentLogs = getStoredAuditLogs();
  const lastLog = currentLogs[currentLogs.length - 1];
  const prevHash = lastLog?.hash ?? 'GENESIS';
  const timestamp = new Date().toISOString();
  const details = payload.details ?? '';

  const hashInput = [
    prevHash,
    payload.userId ?? 'anonymous',
    payload.action,
    payload.category,
    details,
    timestamp,
  ].join('|');

  const hash = sha256(hashInput);
  const newRecord: AuditLogRecord = {
    id: `audit_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    user_id: payload.userId,
    actor_name: payload.actorName,
    action: payload.action,
    category: payload.category,
    details,
    prev_hash: prevHash,
    hash,
    created_at: timestamp,
  };

  currentLogs.push(newRecord);
  saveAuditLogs(currentLogs);

  return { id: newRecord.id, hash: newRecord.hash };
}

/**
 * يتحقق من سلامة سلسلة التدقيق بالكامل.
 * @param logs سجلات مرتبة تصاعدياً حسب created_at
 */
export function verifyAuditChain(
  logs: Array<{
    user_id: string | null;
    action: string;
    category: string;
    details: string | null;
    prev_hash: string | null;
    hash: string;
    created_at: string;
  }>
): { valid: boolean; brokenAt: number | null } {
  let prevHash = 'GENESIS';

  for (let i = 0; i < logs.length; i++) {
    const log = logs[i];

    // التحقق من الرابط
    if (log.prev_hash !== prevHash) {
      return { valid: false, brokenAt: i };
    }

    // إعادة حساب hash
    const expected = sha256(
      [
        prevHash,
        log.user_id ?? 'anonymous',
        log.action,
        log.category,
        log.details ?? '',
        log.created_at,
      ].join('|')
    );

    if (expected !== log.hash) {
      return { valid: false, brokenAt: i };
    }

    prevHash = log.hash;
  }

  return { valid: true, brokenAt: null };
}

/**
 * تزوير متعمد لسجل لأغراض الاختبار وإثبات كشف التلاعب في العرض
 */
export function simulateTampering(index: number): boolean {
  const logs = getStoredAuditLogs();
  if (index >= 0 && index < logs.length) {
    logs[index].details = (logs[index].details || '') + ' [MODIFIED_BY_ATTACKER]';
    saveAuditLogs(logs);
    return true;
  }
  return false;
}

/**
 * إعادة تهيئة السلسلة للحالة السليمة
 */
export function resetAuditChain(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  }
  getStoredAuditLogs();
}
