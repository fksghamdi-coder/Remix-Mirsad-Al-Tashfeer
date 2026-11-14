import React, { useState } from 'react';
import { BiometricAuthManager } from '../../lib/biometricAuth';

export const BiometricLogin: React.FC<{ userId: string; onSuccess?: () => void }> = ({ userId, onSuccess }) => {
  const [status, setStatus] = useState<{ message: string; success: boolean } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleBioLogin = async () => {
    setIsLoading(true);
    setStatus(null);
    try {
      const success = await BiometricAuthManager.verifyBiometricLogin(userId || 'guest');
      if (success) {
        setStatus({ message: 'تم التحقق من الهوية بنجاح عبر البصمة! جاري التوجيه...', success: true });
        if (onSuccess) {
          onSuccess();
        } else {
          setTimeout(() => {
            window.location.href = '/dashboard';
          }, 600);
        }
      } else {
        setStatus({ message: 'فشل التحقق الحيوي، يرجى استخدام كلمة المرور.', success: false });
      }
    } catch {
      setStatus({ message: 'فشل التحقق الحيوي، يرجى استخدام كلمة المرور.', success: false });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full mt-4">
      <button 
        type="button"
        disabled={isLoading}
        onClick={handleBioLogin}
        className="flex items-center justify-center gap-2 w-full py-3 bg-slate-800 hover:bg-slate-700 text-blue-400 border border-blue-500/30 rounded-xl font-bold transition-all disabled:opacity-50 shadow-md cursor-pointer"
      >
        <span>🧬</span>
        <span>{isLoading ? 'جاري فحص المستشعر البيومتري...' : 'دخول سريع عبر البصمة / الوجه'}</span>
      </button>
      {status && (
        <div
          className={`mt-2 p-2.5 rounded-lg text-xs font-semibold text-center transition-all ${
            status.success
              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
              : 'bg-red-500/10 text-red-400 border border-red-500/30'
          }`}
        >
          {status.message}
        </div>
      )}
    </div>
  );
};

export default BiometricLogin;
