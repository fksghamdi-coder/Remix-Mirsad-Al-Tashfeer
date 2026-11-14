/**
 * مدير المصادقة البيومترية لمنصة مرصاد (Biometric Auth Manager)
 * يدعم التحقق البيومتري بصرامة باستخدام تقنية WebAuthn (بصمة الإصبع أو الوجه).
 */

import { SyncEngine } from './syncEngine';

void SyncEngine;

export interface BiometricResult {
  success: boolean;
  credentialId?: string;
  error?: string;
  timestamp?: number;
}

export class BiometricAuthManager {
  private static readonly STORAGE_KEY = 'mirsad_biometric_credentials';

  /**
   * فحص ما إذا كان المتصفح والجهاز يدعمان المصادقة البيومترية
   */
  static async isBiometricsSupported(): Promise<boolean> {
    if (typeof window === 'undefined') return false;
    if (!window.PublicKeyCredential) return false;

    if (typeof PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable === 'function') {
      try {
        return await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
      } catch {
        return false;
      }
    }
    return true;
  }

  /**
   * تسجيل مفتاح بيومتري جديد للمستخدم
   */
  static async registerBiometric(username: string): Promise<BiometricResult> {
    try {
      const supported = await this.isBiometricsSupported();
      if (!supported) {
        return { success: false, error: 'المصادقة البيومترية غير مدعومة على هذا الجهاز أو المتصفح' };
      }

      const challenge = new Uint8Array(32);
      window.crypto.getRandomValues(challenge);

      const userId = new Uint8Array(16);
      window.crypto.getRandomValues(userId);

      const publicKeyCredentialCreationOptions: PublicKeyCredentialCreationOptions = {
        challenge,
        rp: {
          name: 'Mirsad Cyber Platform',
          id: window.location.hostname || 'localhost',
        },
        user: {
          id: userId,
          name: username,
          displayName: username,
        },
        pubKeyCredParams: [
          { alg: -7, type: 'public-key' }, // ES256
          { alg: -257, type: 'public-key' }, // RS256
        ],
        authenticatorSelection: {
          authenticatorAttachment: 'platform',
          userVerification: 'required',
        },
        timeout: 60000,
      };

      const credential = (await navigator.credentials.create({
        publicKey: publicKeyCredentialCreationOptions,
      })) as PublicKeyCredential | null;

      if (credential) {
        this.storeCredential(username, credential.id);
        return {
          success: true,
          credentialId: credential.id,
          timestamp: Date.now(),
        };
      }

      return { success: false, error: 'لم يتم إنشاء الاعتماد البيومتري' };
    } catch (err: unknown) {
      const e = err as Error;
      return {
        success: false,
        error: e?.message || 'فشل تسجيل البصمة البيومترية'
      };
    }
  }

  /**
   * التحقق والمصادقة البيومترية للمستخدم
   */
  static async authenticateBiometric(username: string): Promise<BiometricResult> {
    try {
      const credentials = this.getStoredCredentials();
      const userCredId = credentials[username];

      if (!userCredId) {
        return { success: false, error: 'لم يتم تسجيل بصمة لهذا المستخدم مسبقاً' };
      }

      const challenge = new Uint8Array(32);
      window.crypto.getRandomValues(challenge);

      if (window.PublicKeyCredential) {
        const credential = await navigator.credentials.get({
          publicKey: {
            challenge,
            timeout: 60000,
            userVerification: 'required',
          },
        });

        if (credential) {
          return {
            success: true,
            credentialId: credential.id,
            timestamp: Date.now(),
          };
        }
      }

      return { success: false, error: 'فشل التحقق من الاعتماد البيومتري' };
    } catch (err: unknown) {
      const e = err as Error;
      return {
        success: false,
        error: e?.message || 'فشلت المصادقة البيومترية',
      };
    }
  }

  /**
   * التحقق المباشر من تسجيل الدخول البيومتري وإرجاع قيمة بوليانية
   */
  static async verifyBiometricLogin(userId: string): Promise<boolean> {
    const res = await this.authenticateBiometric(userId);
    return res.success;
  }

  private static storeCredential(username: string, credentialId: string) {
    try {
      const data = this.getStoredCredentials();
      data[username] = credentialId;
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
    } catch {
      // ignore
    }
  }

  private static getStoredCredentials(): Record<string, string> {
    try {
      const raw = localStorage.getItem(this.STORAGE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  }
}
