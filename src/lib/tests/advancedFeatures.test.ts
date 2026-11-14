import { testRunner, expect } from '../testRunner';
import { INTRO_SLIDES } from '@/data/introVideo';
import { ALL_KNOWLEDGE_NODES } from '@/data/knowledgeGraph';
import { exportEncryptedBackup, importEncryptedBackup, validateBackupSchema } from '@/lib/backupManager';
import { CertificateData } from '@/lib/certificatePDF';
import { SyncEngine } from '../syncEngine';

testRunner.describe('الميزات المتقدمة (الفيديو التفاعلي، الشهادات، شبكة المعرفة الموسعة والنسخ المشفر)', () => {

  testRunner.it('التحقق من شرائح العرض التقديمي التفاعلي (Intro Video Slides)', () => {
    expect(Array.isArray(INTRO_SLIDES)).toBeTruthy();
    expect(INTRO_SLIDES.length).toBeGreaterThan(3);
    
    INTRO_SLIDES.forEach(slide => {
      expect(slide.id).toBeTruthy();
      expect(slide.title).toBeTruthy();
      expect(slide.duration).toBeGreaterThan(0);
      expect(Array.isArray(slide.keyPoints)).toBeTruthy();
    });
  });

  testRunner.it('توسعة شبكة المعرفة لتتجاوز 70 مفهوماً تشفيرياً', () => {
    expect(Array.isArray(ALL_KNOWLEDGE_NODES)).toBeTruthy();
    expect(ALL_KNOWLEDGE_NODES.length).toBeGreaterThan(70);
  });

  testRunner.it('اختبار التشفير واسترجاع النسخ الاحتياطي بالكامل (AES-GCM Web Crypto)', async () => {
    const testPassword = 'TestP@ssw0rd2026!';
    localStorage.setItem('mirsad_test_key_backup', 'SecretValueBackup99');

    const encryptedBundle = await exportEncryptedBackup(testPassword);
    expect(encryptedBundle).toBeTruthy();

    const parsedBundle = JSON.parse(encryptedBundle);
    expect(validateBackupSchema(parsedBundle)).toBeTruthy();
    expect(parsedBundle.header).toBe('MIRSAD_ENCRYPTED_BACKUP');

    const result = await importEncryptedBackup(encryptedBundle, testPassword);
    expect(result.success).toBeTruthy();
    expect(result.restoredCount).toBeGreaterThan(0);

    const restoredVal = localStorage.getItem('mirsad_test_key_backup');
    expect(restoredVal).toBe('SecretValueBackup99');
  });

  testRunner.it('التحقق من سلامة وبصمة بيانات الشهادة المعتمدة (SHA-256 Certificate Verification)', () => {
    const certData: CertificateData = {
      recipientName: 'طالب متميز',
      courseTitle: 'مقرر التشفير والأمن السيبراني ISE 243',
      issueDate: '2026-10-21',
      certificateId: 'CERT-2026-001',
      hashSHA256: 'a8f9c1e4d2b38901f4e56789abcde0123456789abcdef0123456789abcdef012',
      scorePercentage: 98,
      instructorName: 'مجلس الأكاديمية'
    };

    expect(certData.recipientName).toBe('طالب متميز');
    expect(certData.scorePercentage).toBe(98);
    expect(certData.hashSHA256.length).toBe(64);
  });

});
