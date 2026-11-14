// src/components/ui/SecurityMonitor.tsx
import { useEffect, useState } from 'react';
import {
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  Eye,
  RefreshCw,
  Bell,
  Clock,
  User,
  ShieldCheck,
} from 'lucide-react';
import {
  getAllSecurityEvents,
  acknowledgeEvent,
  SecurityEvent,
} from '@/lib/security';

const SEVERITY_COLORS = {
  low: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
  medium: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
  high: 'bg-orange-500/20 text-orange-300 border-orange-500/40',
  critical: 'bg-red-500/20 text-red-300 border-red-500/40',
};

const SEVERITY_BORDER = {
  low: 'border-blue-500/30',
  medium: 'border-amber-500/30',
  high: 'border-orange-500/40',
  critical: 'border-red-500/50',
};

const SEVERITY_TEXT = {
  low: 'text-blue-400',
  medium: 'text-amber-400',
  high: 'text-orange-400',
  critical: 'text-red-400',
};

const SEVERITY_LABELS = {
  low: 'منخفض',
  medium: 'متوسط',
  high: 'عالي',
  critical: 'حرج',
};

const TYPE_LABELS: Record<string, string> = {
  login_failed: 'محاولة دخول فاشلة',
  login_success: 'دخول ناجح',
  account_locked: 'قفل الحساب تلقائياً',
  password_changed: 'تغيير كلمة المرور',
  suspicious_pattern: 'نمط سلوكي مشبوه',
  registration_attempt: 'محاولة تسجيل حساب',
  data_tamper_detected: 'تلاعب بسلامة البيانات',
  multiple_accounts_same_device: 'حسابات متعددة من نفس الجهاز',
  off_hours_access: 'دخول خارج أوقات النشاط المعتاد',
  brute_force_attempt: 'هجوم تخمين كلمات مرور (Brute Force)',
  devtools_opened: '🚨 رصد فتح أدوات المطورين (DevTools)',
  unauthorized_inspection: '⚠️ محاولة فحص العناصر والاختصارات المحظورة',
};

export default function SecurityMonitor() {
  const [events, setEvents] = useState<SecurityEvent[]>([]);
  const [filter, setFilter] = useState<'all' | 'critical' | 'high'>('all');
  const [loading, setLoading] = useState(false);

  const load = async () => {
    try {
      const all = await getAllSecurityEvents();
      setEvents(all);
    } catch (err) {
      console.warn('Failed to load security events', err);
    }
  };

  useEffect(() => {
    load();
    const interval = setInterval(load, 15000);
    return () => clearInterval(interval);
  }, []);

  const handleRefresh = async () => {
    setLoading(true);
    await load();
    setTimeout(() => setLoading(false), 500);
  };

  const filtered = events.filter((e) => {
    if (filter === 'all') return true;
    if (filter === 'critical') return e.severity === 'critical';
    if (filter === 'high') return e.severity === 'high' || e.severity === 'critical';
    return true;
  });

  const unack = events.filter((e) => !e.acknowledged).length;
  const criticalCount = events.filter((e) => e.severity === 'critical' && !e.acknowledged).length;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3 glass-panel p-5 rounded-2xl">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-red-500/20 border border-red-500/40 flex items-center justify-center shadow-lg shadow-red-500/20">
            <ShieldAlert className="w-6 h-6 text-red-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-bold text-lg text-slate-100">سجل المراقبة والتحليل الأمني</h2>
              {criticalCount > 0 && (
                <span className="px-2 py-0.5 rounded-full text-[11px] bg-red-500/30 text-red-300 border border-red-500/50 animate-pulse">
                  {criticalCount} تنبيه حرج
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              {events.length} حدثاً مسجلاً في قاعدة البيانات المشفرة · {unack} بحاجة لمعالجة
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleRefresh}
            className="p-2 rounded-lg text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors"
            title="تحديث فوري"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-emerald-400' : ''}`} />
          </button>

          <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800">
            {[
              { id: 'all', label: 'الكل' },
              { id: 'high', label: 'عالي+' },
              { id: 'critical', label: 'حرج' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id as any)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  filter === f.id
                    ? 'bg-red-500/20 text-red-300 border border-red-500/40'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Events List */}
      {filtered.length === 0 ? (
        <div className="text-center py-12 glass-panel rounded-2xl">
          <ShieldCheck className="w-12 h-12 mx-auto text-emerald-400 mb-3" />
          <p className="text-slate-300 font-bold">المنظومة آمنة ولا توجد أحداث مطابقة</p>
          <p className="text-xs text-slate-500 mt-1">
            يتم تسجيل كافة محاولات الدخول، قفل الحسابات، والتسجيل ذاتياً
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.slice(0, 50).map((event) => {
            const borderCls = SEVERITY_BORDER[event.severity] || 'border-slate-800';
            const textCls = SEVERITY_TEXT[event.severity] || 'text-slate-300';
            const badgeCls = SEVERITY_COLORS[event.severity] || 'bg-slate-800 text-slate-300';

            return (
              <div
                key={event.id}
                className={`glass-panel p-4 rounded-xl border ${borderCls} transition-all ${
                  event.acknowledged ? 'opacity-60 bg-slate-900/30' : 'bg-slate-900/70'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg shrink-0 mt-0.5 ${badgeCls.split(' ')[0]}`}>
                    <AlertTriangle className={`w-4 h-4 ${textCls}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1.5">
                      <span className={`text-[11px] px-2 py-0.5 rounded font-bold border ${badgeCls}`}>
                        {SEVERITY_LABELS[event.severity]}
                      </span>
                      <span className="text-xs font-bold text-slate-200">
                        {TYPE_LABELS[event.type] || event.type}
                      </span>
                      {event.acknowledged && (
                        <span className="text-xs text-emerald-400 flex items-center gap-1 font-medium bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                          <CheckCircle2 className="w-3 h-3" /> تم الاطلاع والمتابعة
                        </span>
                      )}
                    </div>

                    {event.username && (
                      <p className="text-xs text-slate-300 flex items-center gap-1.5 mb-1">
                        <User className="w-3.5 h-3.5 text-slate-500" />
                        <span className="text-slate-400">المستخدم المستهدف:</span>
                        <span className="font-mono font-bold text-amber-300">{event.username}</span>
                      </p>
                    )}

                    {event.details && Object.keys(event.details).length > 0 && (
                      <div className="text-[11px] font-mono text-slate-400 bg-slate-950/60 p-2 rounded-lg border border-slate-800 mt-1 max-w-full overflow-x-auto">
                        {JSON.stringify(event.details, null, 2)}
                      </div>
                    )}

                    <div className="flex items-center gap-2 mt-2 text-[10px] text-slate-500">
                      <Clock className="w-3 h-3" />
                      <span>{new Date(event.timestamp).toLocaleString('ar-SA')}</span>
                      <span>·</span>
                      <span className="font-mono">{event.id}</span>
                    </div>
                  </div>

                  {!event.acknowledged && (
                    <button
                      onClick={() => acknowledgeEvent(event.id).then(load)}
                      className="px-3 py-1.5 rounded-lg text-xs bg-slate-800 hover:bg-emerald-500/20 hover:text-emerald-300 text-slate-400 transition-all flex items-center gap-1 shrink-0 border border-slate-700 hover:border-emerald-500/40"
                      title="تحديد كمُعالج"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">معالجة</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
