// src/lib/tests/foundation.test.ts
import { testRunner, expect } from '../testRunner';
import {
  encrypt,
  decrypt,
  encryptJSON,
  decryptJSON,
  sha256,
  generateSalt,
  hashPassword,
  verifyPassword,
  safeEqual,
  getDeviceFingerprint,
} from '../encryption';
import { secureDB } from '../secureDB';
import { sessionManager } from '../sessionManager';
import { rateLimiter } from '../rateLimiter';
import { syncEngine } from '../syncEngine';

testRunner.describe('طبقة التشفير الحسابي (AES-GCM / SHA-256 / PBKDF2)', () => {
  testRunner.it('تشفير وفك تشفير النص البسيط (AES-256-GCM)', async () => {
    const plainText = 'Mirsad-Cyber-Security-Secret-123456';
    const encrypted = await encrypt(plainText);
    expect(encrypted).toBeTruthy();
    expect(encrypted).not.toBe(plainText);

    const decrypted = await decrypt(encrypted);
    expect(decrypted).toBe(plainText);
  });

  testRunner.it('تشفير وفك تشفير كائنات JSON', async () => {
    const payload = { userId: 'user_99', role: 'admin', permissions: ['read', 'write', 'audit'] };
    const encrypted = await encryptJSON(payload);
    expect(typeof encrypted).toBe('string');

    const decrypted = await decryptJSON<typeof payload>(encrypted);
    expect(decrypted?.userId).toBe('user_99');
    expect(decrypted?.role).toBe('admin');
    expect(decrypted?.permissions).toHaveLength(3);
  });

  testRunner.it('توليد ملح عشوائي وتجزئة SHA-256', async () => {
    const salt1 = generateSalt();
    const salt2 = generateSalt();
    expect(salt1).toHaveLength(32);
    expect(salt1).not.toBe(salt2);

    const hash1 = await sha256('MirsadTestString');
    const hash2 = await sha256('MirsadTestString');
    expect(hash1).toBe(hash2);
    expect(hash1).toHaveLength(64);
  });

  testRunner.it('تشفير كلمة المرور وتأكيد المطابقة عبر PBKDF2', async () => {
    const password = 'StrongP@ssw0rd!2026';
    const salt = generateSalt();
    const storedHash = await hashPassword(password, salt);

    const isValid = await verifyPassword(password, storedHash, salt);
    expect(isValid).toBe(true);

    const isWrongValid = await verifyPassword('WrongPassword', storedHash, salt);
    expect(isWrongValid).toBe(false);
  });

  testRunner.it('المقارنة المتساوية ذات الوقت الثابت (Constant-Time Compare)', () => {
    expect(safeEqual('abc', 'abc')).toBe(true);
    expect(safeEqual('abc', 'abd')).toBe(false);
    expect(safeEqual('abc', 'abcd')).toBe(false);
  });

  testRunner.it('توليد بصمة الجهاز (Device Fingerprint)', () => {
    const fp = getDeviceFingerprint();
    expect(fp).toBeTruthy();
    expect(typeof fp).toBe('string');
  });
});

testRunner.describe('قاعدة البيانات المشفرة وسجل التدقيق (Secure IndexedDB & Audit Chain)', () => {
  testRunner.it('تخزين واسترجاع عنصر مشفر من IndexedDB', async () => {
    const key = 'test_secret_config';
    const val = { apiEndpoint: 'https://ise243.upm.edu.sa/v2', keyId: 8841 };

    await secureDB.setItem('security_events', { id: key, ...val });
    const retrieved = await secureDB.getItem<typeof val & { id: string }>('security_events', key);

    expect(retrieved?.apiEndpoint).toBe('https://ise243.upm.edu.sa/v2');
    expect(retrieved?.keyId).toBe(8841);

    await secureDB.removeItem('security_events', key);
    const deleted = await secureDB.getItem('security_events', key);
    expect(deleted).toBeFalsy();
  });

  testRunner.it('تسجيل حدث في سجل التدقيق وإضافة كتلة بسلسلة التشفير Hash Chain', async () => {
    const logEntry = await secureDB.addAuditLog('TEST_ACTION', 'User initiated security audit', 'admin_1');
    expect(logEntry.id).toBeTruthy();
    expect(logEntry.action).toBe('TEST_ACTION');
    expect(logEntry.hash).toBeTruthy();

    const isAuditValid = await secureDB.verifyAuditChain();
    expect(isAuditValid).toBe(true);
  });
});

testRunner.describe('إدارة الجلسات والرموز الأمنية (HMAC Signed Session Manager)', () => {
  testRunner.it('إنشاء جلسة جديدة وتأكيد الرمز والتوقيع', async () => {
    const user = { uid: 'usr_77', email: 'auditor@upm.edu.sa', role: 'security_auditor' };
    const session = await sessionManager.createSession(user);

    expect(session.token).toBeTruthy();
    expect(session.userId).toBe('usr_77');

    const verified = await sessionManager.validateSession(session.token);
    expect(verified).toBeTruthy();
    expect(verified?.email).toBe('auditor@upm.edu.sa');
  });

  testRunner.it('إلغاء وفحص الجلسات الملغاة', async () => {
    const user = { uid: 'usr_88', email: 'revoked@upm.edu.sa', role: 'viewer' };
    const session = await sessionManager.createSession(user);

    await sessionManager.destroySession(session.token);
    const verified = await sessionManager.validateSession(session.token);
    expect(verified).toBeFalsy();
  });
});

testRunner.describe('محدد معدل المحاولات والوقاية من التخمين (Rate Limiter)', () => {
  testRunner.it('تسجيل المحاولات والتحقق من الحظر التلقائي', () => {
    const actionKey = 'login_test_user_ip';
    rateLimiter.clear(actionKey);

    const check1 = rateLimiter.checkRateLimit(actionKey, 3, 60000);
    expect(check1.allowed).toBe(true);

    rateLimiter.recordAttempt(actionKey);
    rateLimiter.recordAttempt(actionKey);
    rateLimiter.recordAttempt(actionKey);

    const checkBlocked = rateLimiter.checkRateLimit(actionKey, 3, 60000);
    expect(checkBlocked.allowed).toBe(false);
    expect(checkBlocked.remainingAttempts).toBe(0);

    rateLimiter.clear(actionKey);
    const checkCleared = rateLimiter.checkRateLimit(actionKey, 3, 60000);
    expect(checkCleared.allowed).toBe(true);
  });
});

testRunner.describe('محرك المزامنة التلقائية للمهمات 오프라인 (Sync Engine Queue)', () => {
  testRunner.it('إضافة مهمة إلى قائمة الانتظار للمزامنة', async () => {
    const initialCount = syncEngine.getPendingCount();
    
    await syncEngine.addToQueue('UPDATE_SECURITY_POLICY', { policyId: 'POL-2026', status: 'enforced' });
    const newCount = syncEngine.getPendingCount();

    expect(newCount).toBeGreaterThan(initialCount);
  });
});
