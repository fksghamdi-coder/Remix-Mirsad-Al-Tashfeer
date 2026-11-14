import { useState } from 'react';
import { ShieldCheck, ShieldAlert, CheckCircle2, AlertTriangle, Lock, Unlock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SyncEngine } from '@/lib/syncEngine';

void SyncEngine;

interface Finding { id: string; title: string; severity: 'critical' | 'high' | 'medium' | 'low' | 'info'; status: 'fixed' | 'open' | 'partial'; description: string; recommendation: string; }

const FINDINGS: Finding[] = [
  { id: 'C001', title: 'بريد إلكتروني ثابت للمسؤول', severity: 'critical', status: 'fixed', description: 'تم اكتشاف بريد إلكتروني ثابت (fk.sghamdi@gmail.com) يمنح صلاحية admin تلقائياً.', recommendation: 'تمت إزالته واستبداله بنظام Firestore admin collection.' },
  { id: 'C002', title: 'مصادقة جانب العميل فقط', severity: 'high', status: 'partial', description: 'نظام المصادقة المحلية يعمل بالكامل في المتصفح.', recommendation: 'تم تحسين auth.secure.ts. للفوز الإنتاجي انتقل إلى Cloud Functions.' },
  { id: 'C003', title: 'خطر XSS في inlineFormat()', severity: 'high', status: 'fixed', description: 'محول Markdown إلى HTML لا يستخدم منشئ HTML آمن.', recommendation: 'استخدم safeInlineFormat() من markdown.sanitized.ts.' },
  { id: 'C004', title: 'عدم وجود CSP Headers', severity: 'medium', status: 'fixed', description: 'لا توجد رؤوس حماية CSP أو X-Frame-Options.', recommendation: 'تم إضافة vite-plugin-csp.ts.' },
  { id: 'C005', title: 'OTP مخزن كنص واضح', severity: 'medium', status: 'fixed', description: 'سجلات OTP كانت تُحفظ في localStorage كنص واضح.', recommendation: 'استخدم otpSecure.ts للتشفير و TTL 5 دقائق.' },
  { id: 'C006', title: 'عدم تطابق مدة الجلسة', severity: 'low', status: 'fixed', description: 'SESSION_TTL_MS كان 8 ساعات في auth.ts و 7 أيام في sessionManager.ts.', recommendation: 'تم توحيد المدة على 7 أيام.' },
  { id: 'C007', title: 'كلمة مرور نسخ احتياطي ضعيفة', severity: 'low', status: 'open', description: 'الحد الأدنى لطول كلمة مرور النسخ الاحتياطي كان 4 أحرف.', recommendation: 'اضبط MIN_BACKUP_PASSWORD_LENGTH=12 في .env.local.' },
  { id: 'C008', title: 'Anti-DevTools security-through-obscurity', severity: 'info', status: 'open', description: 'إجراءات منع DevTools توفر أمناً وهمياً.', recommendation: 'أزل securityHardening.ts واعتمد على إجراءات جانب الخادم.' },
];

const SEVERITY_CONFIG = { critical: { color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/30', icon: ShieldAlert }, high: { color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/30', icon: AlertTriangle }, medium: { color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/30', icon: AlertTriangle }, low: { color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/30', icon: Lock }, info: { color: 'text-slate-400', bg: 'bg-slate-500/10', border: 'border-slate-500/30', icon: ShieldCheck } };
const STATUS_CONFIG = {
  fixed: { color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', label: 'تم الإصلاح', icon: CheckCircle2 },
  open: { color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/30', label: 'مفتوح', icon: AlertTriangle },
  partial: { color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/30', label: 'جزئي', icon: Unlock },
};

export default function SecurityAudit() {
  const [filter, setFilter] = useState<'all' | 'critical' | 'high' | 'medium' | 'low' | 'info'>('all');
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = filter === 'all' ? FINDINGS : FINDINGS.filter(f => f.severity === filter);
  const stats = { total: FINDINGS.length, critical: FINDINGS.filter(f => f.severity === 'critical').length, high: FINDINGS.filter(f => f.severity === 'high').length, fixed: FINDINGS.filter(f => f.status === 'fixed').length, open: FINDINGS.filter(f => f.status === 'open').length };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {[
          { label: 'إجمالي الثغرات', value: stats.total, color: 'text-slate-200' },
          { label: 'حرجة', value: stats.critical, color: 'text-red-400' },
          { label: 'عالية', value: stats.high, color: 'text-orange-400' },
          { label: 'تم إصلاحها', value: stats.fixed, color: 'text-emerald-400' },
          { label: 'مفتوحة', value: stats.open, color: 'text-amber-400' },
        ].map((s, i) => (
          <div key={i} className="glass-panel p-4 rounded-xl text-center">
            <p className={`text-2xl font-black ${s.color}`}>{s.value}</p>
            <p className="text-[11px] text-slate-400 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        {(['all', 'critical', 'high', 'medium', 'low', 'info'] as const).map((f) => (
          <button key={f} onClick={() => setFilter(f)} className={cn('px-3 py-1.5 rounded-lg text-xs font-bold transition-all border', filter === f ? 'bg-blue-500/20 text-blue-200 border-blue-500/40' : 'bg-slate-800/60 text-slate-400 hover:text-slate-200 border border-slate-700')}>
            {{ all: 'الكل', critical: 'حرجة', high: 'عالية', medium: 'متوسطة', low: 'منخفضة', info: 'معلوماتية' }[f]}
            <span className="mr-1 opacity-60">({f === 'all' ? stats.total : FINDINGS.filter(x => x.severity === f).length})</span>
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map((finding) => {
          const sev = SEVERITY_CONFIG[finding.severity];
          const st = STATUS_CONFIG[finding.status];
          const Icon = sev.icon;
          const isExpanded = expanded === finding.id;
          return (
            <div key={finding.id} className={cn('glass-panel rounded-xl border transition-all cursor-pointer', sev.border, isExpanded && 'ring-2 ring-blue-500/30')} onClick={() => setExpanded(isExpanded ? null : finding.id)}>
              <div className="p-4 flex items-start gap-3">
                <Icon className={`w-5 h-5 shrink-0 mt-0.5 ${sev.color}`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-mono text-slate-500">{finding.id}</span>
                    <span className={cn('text-xs px-2 py-0.5 rounded-full border', sev.bg, sev.border, sev.color)}>{finding.severity.toUpperCase()}</span>
                    <span className={cn('text-xs px-2 py-0.5 rounded-full border flex items-center gap-1', st.color, st.bg, st.border)}>
                      <st.icon className="w-3 h-3" />{st.label}
                    </span>
                  </div>
                  <h3 className="font-bold text-slate-100 mt-1">{finding.title}</h3>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">{finding.description}</p>
                </div>
              </div>
              {isExpanded && (
                <div className="px-4 pb-4 border-t border-slate-800/50 pt-3">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-bold text-emerald-300 mb-1">التوصية:</p>
                      <p className="text-xs text-slate-300 leading-relaxed">{finding.recommendation}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
