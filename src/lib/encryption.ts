// src/lib/encryption.ts
// أُلغي هذا الملف كتنفيذ مستقل: كل شيء انتقل إلى ./crypto
// يبقى كواجهة توافق حتى لا تنكسر الاستيرادات القديمة (secureDB, sessionManager, tests...).
export * from './crypto';
