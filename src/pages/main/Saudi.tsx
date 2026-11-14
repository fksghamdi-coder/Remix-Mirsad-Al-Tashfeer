import { Link } from 'react-router-dom';
import { Landmark, Award, Gauge, ShieldCheck, KeyRound, AlertTriangle, ExternalLink } from 'lucide-react';
import { ACCESSED, FACTS, getSource, Fact } from '@/data/catalog';

const byId = (id: string) => FACTS.find((f) => f.id === id) as Fact;

function Badge({ kind }: { kind: 'official' | 'secondary' }) {
  return kind === 'official' ? (
    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">مصدر رسمي</span>
  ) : (
    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30">مصدر ثانوي</span>
  );
}

function Kpi({ icon: Icon, label, value, sub, kind }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string; sub: string; kind: 'official' | 'secondary' }) {
  return (
    <div className="glass-panel card-3d-neon rounded-2xl p-5 space-y-2">
      <div className="flex items-center justify-between">
        <span className="icon-glass-3d w-10 h-10">
          <Icon className="w-5 h-5 text-emerald-400" aria-hidden="true" />
        </span>
        <Badge kind={kind} />
      </div>
      <p className="text-xs text-slate-400">{label}</p>
      <p className="text-3xl font-black text-white" dir="ltr">{value}</p>
      <p className="text-[11px] text-slate-500">{sub}</p>
    </div>
  );
}

/** رسم SVG ثلاثي الأبعاد: هيكل المنظومة (من الحقائق الموثقة فقط) */
function Ecosystem() {
  const box = (x: number, y: number, w: number, h: number, t1: string, t2: string, c: string) => (
    <g filter="url(#eco3dFilter)">
      {/* 3D Extruded Bottom Ledge */}
      <rect x={x} y={y + 6} width={w} height={h} rx={14} fill="#020617" opacity={0.85} stroke={c} strokeOpacity={0.5} strokeWidth={1} />
      {/* 3D Glass Neon Top Face */}
      <rect x={x} y={y} width={w} height={h} rx={14} fill={c} fillOpacity={0.18} stroke={c} strokeWidth={1.8} />
      {/* Top Specular Highlight Line */}
      <line x1={x + 14} y1={y + 1.5} x2={x + w - 14} y2={y + 1.5} stroke="#ffffff" strokeOpacity={0.45} strokeWidth={1.2} />
      <text x={x + w / 2} y={y + h / 2 - 4} textAnchor="middle" fontSize={13} fontWeight={700} fill="currentColor">{t1}</text>
      <text x={x + w / 2} y={y + h / 2 + 14} textAnchor="middle" fontSize={10.5} fill="currentColor" opacity={0.8}>{t2}</text>
    </g>
  );
  return (
    <svg viewBox="0 0 640 310" role="img" aria-label="مخطط ثلاثي الأبعاد يوضح العلاقة بين الهيئة الوطنية للأمن السيبراني وضوابط ECC والمعايير الوطنية للتشفير ومكتب إدارة البيانات" className="w-full text-slate-200 recharts-surface">
      <defs>
        <filter id="eco3dFilter" x="-15%" y="-15%" width="130%" height="140%">
          <feDropShadow dx="0" dy="6" stdDeviation="4" floodColor="#020617" floodOpacity="0.7" />
          <feDropShadow dx="0" dy="0" stdDeviation="5" floodColor="#10b981" floodOpacity="0.22" />
        </filter>
      </defs>
      <g stroke="#10b981" strokeOpacity={0.55} strokeWidth={2.2} strokeDasharray="5 3" fill="none">
        <path d="M280 76 V102 H160 V130" />
        <path d="M360 76 V102 H480 V130" />
        <path d="M160 204 V216 H320 V228" />
      </g>
      {box(190, 10, 260, 62, 'الهيئة الوطنية للأمن السيبراني', 'NCA — السياسات والمعايير والتنظيم', '#10b981')}
      {box(20, 130, 280, 70, 'الضوابط الأساسية ECC-2:2024', 'ضوابط الحوكمة والدفاع والصمود', '#3b82f6')}
      {box(340, 130, 280, 70, 'المعايير الوطنية للتشفير NCS', 'مستويان: متوسط ومتقدم', '#f59e0b')}
      {box(190, 228, 260, 58, 'مكتب إدارة البيانات الوطنية', 'NDMO / سدايا — مرجعية توطين البيانات', '#a78bfa')}
    </svg>
  );
}

export default function Saudi() {
  const gci = byId('gci-tier1');
  const imd = byId('imd-2025');
  const ecc = byId('ecc2-controls');
  const ordered = FACTS.filter((f) => f.group !== 'pqc');

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 space-y-10">
      <header className="text-center space-y-3">
        <div className="w-16 h-16 mx-auto rounded-2xl icon-glass-3d flex items-center justify-center text-emerald-400">
          <Landmark className="w-8 h-8" aria-hidden="true" />
        </div>
        <h1 className="text-2xl md:text-3xl font-black text-white">الريادة السعودية في الأمن السيبراني والتشفير</h1>
        <p className="text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
          قراءة تحليلية لموقع المملكة العربية السعودية في المؤشرات الدولية ومنظومتها التنظيمية للتشفير، مبنية على مصادر قابلة للتحقق.
        </p>
        <p className="text-[11px] text-slate-500">آخر تحقق من المصادر: {ACCESSED}</p>
      </header>

      <section aria-labelledby="kpi" className="space-y-3">
        <h2 id="kpi" className="text-lg font-bold text-white">المؤشرات الدولية</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <Kpi icon={Award} label="مؤشر GCI 2024 (الاتحاد الدولي للاتصالات)" value={gci.value!} sub="المستوى الأول — نموذج يُحتذى" kind={gci.confidence} />
          <Kpi icon={Gauge} label="مؤشر الأمن السيبراني ضمن IMD 2025" value="#1" sub="المركز الأول عالمياً (وفق تقرير صحفي)" kind={imd.confidence} />
          <Kpi icon={ShieldCheck} label="عدد ضوابط ECC" value={ecc.value!} sub="من ECC-1:2018 إلى ECC-2:2024" kind={ecc.confidence} />
        </div>
      </section>

      <section aria-labelledby="eco" className="space-y-3">
        <h2 id="eco" className="text-lg font-bold text-white">هيكل المنظومة التنظيمية</h2>
        <div className="glass-panel card-3d-neon chart-3d-stage rounded-2xl p-5"><Ecosystem /></div>
        <p className="text-xs text-slate-400 leading-relaxed">
          تصدر الهيئة السياسات والمعايير، ومنها الضوابط الأساسية والمعايير الوطنية للتشفير. أما توطين البيانات فمرجعيته لدى مكتب إدارة البيانات الوطنية بعد تعديلات ECC-2.
        </p>
      </section>

      <section aria-labelledby="cmp" className="space-y-3">
        <h2 id="cmp" className="text-lg font-bold text-white">مقارنة: ECC-1:2018 مقابل ECC-2:2024</h2>
        <div className="glass-panel card-3d-neon rounded-2xl overflow-x-auto">
          <table className="w-full text-sm text-right">
            <thead className="bg-slate-900 text-slate-400 text-xs">
              <tr><th className="px-4 py-3">المحور</th><th className="px-4 py-3">ECC-1:2018</th><th className="px-4 py-3">ECC-2:2024</th></tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-200">
              <tr><td className="px-4 py-3 font-bold">عدد الضوابط</td><td className="px-4 py-3">114</td><td className="px-4 py-3">108</td></tr>
              <tr><td className="px-4 py-3 font-bold">توطين البيانات</td><td className="px-4 py-3">متطلبات استضافة داخل المملكة ضمن الضوابط</td><td className="px-4 py-3">نُقلت المرجعية إلى NDMO / سدايا</td></tr>
              <tr><td className="px-4 py-3 font-bold">توطين الوظائف</td><td className="px-4 py-3">المناصب القيادية فقط</td><td className="px-4 py-3">جميع وظائف الأمن السيبراني بمختصين سعوديين مؤهلين</td></tr>
            </tbody>
          </table>
        </div>
        <p className="text-[11px] text-slate-500">المصدر: Clyde &amp; Co، 16 يناير 2025 (مصدر ثانوي).</p>
      </section>

      <section aria-labelledby="ncs" className="space-y-3">
        <h2 id="ncs" className="text-lg font-bold text-white flex items-center gap-2"><KeyRound className="w-5 h-5 text-amber-400" aria-hidden="true" /> المعايير الوطنية للتشفير وصلتها بمقرر ISE243</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="glass-panel card-3d-neon rounded-2xl p-5 space-y-2 active:scale-[0.99]">
            <h3 className="text-sm font-bold text-amber-300">ما تغطيه المعايير</h3>
            <p className="text-xs text-slate-300 leading-relaxed">{byId('ncs-structure').text}</p>
          </div>
          <div className="glass-panel card-3d-neon rounded-2xl p-5 space-y-2 active:scale-[0.99]">
            <h3 className="text-sm font-bold text-emerald-300">ما يقابلها في المقرر</h3>
            <ul className="text-xs text-slate-300 leading-relaxed space-y-1.5 list-disc pr-4">
              <li>توليد الأرقام العشوائية الآمنة وإدارة المفاتيح ودورة حياتها.</li>
              <li>التشفير ما بعد الكم ومسار الانتقال إليه.</li>
              <li>هجمات القنوات الجانبية وأساليب مقاومتها.</li>
              <li>الأدلة التطبيقية في <Link to="/zkp-lab" className="text-emerald-400 hover:underline">مختبر المعرفة الصفرية</Link>.</li>
            </ul>
          </div>
        </div>
      </section>

      <section aria-labelledby="facts" className="space-y-3">
        <h2 id="facts" className="text-lg font-bold text-white">سجل الحقائق ومصادرها</h2>
        <ul className="space-y-3.5">
          {ordered.map((f) => (
            <li key={f.id} className="glass-panel card-3d-neon rounded-2xl p-4 sm:p-5 space-y-2 active:scale-[0.995]">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-sm font-bold text-slate-100">{f.title}</h3>
                <div className="flex items-center gap-2">
                  {f.value && <span className="text-xs font-mono text-emerald-300" dir="ltr">{f.value}</span>}
                  <Badge kind={f.confidence} />
                </div>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">{f.text}</p>
              {f.verifyNote && (
                <p className="text-[11px] text-amber-300 flex items-start gap-1.5"><AlertTriangle className="w-3.5 h-3.5 mt-0.5 shrink-0" aria-hidden="true" />{f.verifyNote}</p>
              )}
              <p className="text-[11px] text-slate-500 flex flex-wrap gap-x-3 gap-y-1">
                <span>بتاريخ: {f.asOf}</span>
                {f.sourceIds.map((sid) => {
                  const s = getSource(sid);
                  return s ? (
                    <a key={sid} href={s.url} target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline inline-flex items-center gap-1">
                      {s.publisher} <ExternalLink className="w-3 h-3" aria-hidden="true" />
                    </a>
                  ) : null;
                })}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <aside className="p-5 rounded-2xl glass-panel card-3d-neon bg-emerald-950/30 border border-emerald-500/35 text-xs text-slate-300 leading-relaxed">
        <strong className="text-emerald-300">بطاقة التوثيق الأكاديمي للمشروع التدريبي (2026-2027):</strong> جميع البيانات والمؤشرات التنظيمية والتشفيرية المعروضة في هذه الصفحة حقيقية بنسبة 100% وموثقة بمصادرها الرسمية والثانوية المعتمدة (NCA ECC-2:2024، NCS-1:2020، ITU GCI 2024، NIST FIPS 203/204/205) ضمن متطلبات مادة <strong>التشفير المتقدم (ISE243)</strong> لـ <strong>طلاب شعبة (002م)</strong> في تخصص <strong>دبلوم أمن المعلومات</strong> للسنة الأكاديمية <strong>(2026-2027)</strong> بجامعة الأمير مقرن بن عبدالعزيز. المنصة مشروع أكاديمي تعليمي وتدريبي حقيقي موثق بالمصادر الرسمية والأكاديمية المعتمدة وليست منصة حكومية أو تجارية رسمية، وتُذكر أسماء الجهات والمعايير لأغراض الاستشهاد العلمي الموثق بالمصادر.
      </aside>
    </div>
  );
}
