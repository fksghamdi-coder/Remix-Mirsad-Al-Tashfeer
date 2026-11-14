// src/lib/sms.ts
// تم إيقاف وضع المحاكاة الوهمي للرسائل النصية (Zero Fake OTP Policy) نهائياً لمنع أي ثغرة أمنية
// بروتوكول استعادة كلمة المرور محصور حصرياً باعتماد الأدمن الداخلي المشفر

export interface SmsResult {
  success: boolean;
  messageId?: string;
  error?: string;
  deliveredPhone?: string;
  providerUsed?: string;
  timestamp?: string;
}

/** تنسيق رقم الجوال السعودي بصيغة موحدة */
export function normalizeSaudiPhone(phone: string): string {
  const digits = phone.replace(/\s+/g, '').replace(/[^0-9+]/g, '');
  if (digits.startsWith('+966')) return '0' + digits.slice(4);
  if (digits.startsWith('00966')) return '0' + digits.slice(5);
  if (digits.startsWith('966') && digits.length === 12) return '0' + digits.slice(3);
  return digits;
}

/**
 * محاولة إرسال الرمز فقط في حال توفر مزود خارجي حقيقي موثق (مثل Unifonic)،
 * ولا يتم إرجاع أي رمز OTP وهمي للواجهة الأمامية نهائياً حفاظاً على أمان الحسابات.
 */
export async function sendOTP(phone: string, otp: string): Promise<SmsResult> {
  const normalizedPhone = normalizeSaudiPhone(phone);
  const internationalPhone = normalizedPhone.replace(/^0/, '966');

  const unifonicSid = (import.meta.env as Record<string, string | undefined>)?.VITE_UNIFONIC_APP_SID;
  const senderId = (import.meta.env as Record<string, string | undefined>)?.VITE_UNIFONIC_SENDER_ID || 'MIRSAD';

  if (unifonicSid) {
    try {
      const body = new URLSearchParams({
        AppSid: unifonicSid,
        SenderID: senderId,
        Recipient: internationalPhone,
        Body: `رمز التحقق الخاص بك في مِرْصَاد التشفير: ${otp}\nصالح لمدة 5 دقائق.`,
        responseType: 'JSON',
      });

      const res = await fetch('https://el.cloud.unifonic.com/rest/SMS/messages', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: body.toString(),
      });

      const data = (await res.json()) as { success?: boolean; data?: { MessageID?: string } };
      if (data && data.success) {
        return {
          success: true,
          messageId: String(data.data?.MessageID || `SMS-${Date.now()}`),
          deliveredPhone: normalizedPhone,
          providerUsed: 'UNIFONIC_REAL_GATEWAY',
          timestamp: new Date().toISOString(),
        };
      }
    } catch {
      // ignore
    }
  }

  // لا يُسمح بإرجاع أي رمز OTP للواجهة الأمامية مطلقاً
  return {
    success: false,
    error: 'تم إيقاف خدمة SMS الوهمية؛ تتم استعادة كلمة المرور حصرياً عبر طلب دعم فني سري للأدمن لمنع أي ثغرة أمنية.',
  };
}

export class SMSService {
  static async sendVerificationCode(phone: string, code: string): Promise<boolean> {
    const res = await sendOTP(phone, code);
    return res.success;
  }
}
