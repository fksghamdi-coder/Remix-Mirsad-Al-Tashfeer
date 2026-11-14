import { useMemo, useState } from 'react';
import { GitCompare, KeyRound, PenTool, Radio, ShieldAlert, ExternalLink, Info } from 'lucide-react';
import {
  KEM_SCHEMES,
  SIG_SCHEMES,
  getKem,
  getSig,
  estimateHandshake,
  initialWindowBytes,
  TCP_MSS,
} from '@/lib/pqcSizes';
import { getSource, ACCESSED } from '@/data/catalog';

type Tab = 'kem' | 'sig';

const fmt = (n: number) => n.toLocaleString('ar-SA-u-nu-latn');

function Quantum({ safe }: { safe: boolean }) {
  return safe ? (
    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">مقاوم للكم</span>
  ) : (
    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-500/15 text-red-300 border border-red-500/30">يكسره خوارزم شور</span>
  );
}

function Bars({ items, log }: { items: { label: string; value: number; pqc: boolean }[]; log: boolean }) {
  const scale = (v: number) => (log ? Math.log10(v + 1) : v);
  const max = Math.max(...items.map((i) => scale(i.value)));
  return (
    <ul className="space-y-2.5" aria-label="مخطط أعمدة ثلاثي الأبعاد للأحجام بالبايت">
      {items.map((i) => (
        <li key={i.label} className="flex items-center gap-3 text-[11px] group">
          <span className="w-32 shrink-0 text-slate-200 font-semibold truncate group-hover:text-emerald-300 transition-colors" dir="ltr">
            {i.label}
          </span>
          <div className="flex-1 h-5 rounded-full p-0.5 bar-3d-track">
            <div
              className={
                i.pqc
                  ? 'h-full rounded-full bar-3d-fill bg-gradient-to-r from-emerald-600 via-emerald-400 to-teal-300 transition-all duration-500'
                  : 'h-full rounded-full bar-3d-fill bg-gradient-to-r from-blue-600 via-sky-400 to-cyan-300 transition-all duration-500'
              }
              style={{ width: `${Math.max(2.5, (scale(i.value) / max) * 100)}%` }}
            />
          </div>
          <span className="w-16 text-left font-mono font-bold text-slate-300" dir="ltr">{fmt(i.value)}</span>
        </li>
      ))}
    </ul>
  );
}

const PRESETS = [
  { label: 'كلاسيكي اليوم', kem: 'x25519', sig: 'ecdsa-p256' },
  { label: 'انتقالي: هجين + توقيع كلاسيكي', kem: 'x25519-mlkem768', sig: 'ecdsa-p256' },
  { label: 'ما بعد الكم كاملاً', kem: 'mlkem768', sig: 'mldsa65' },
  { label: 'محافظ: توقيع قائم على التجزئة', kem: 'mlkem768', sig: 'slh128s' },
];

export default function Comparisons() {
  const [tab, setTab] = useState<Tab>('kem');
  const [log, setLog] = useState(true);
  const [kemId, setKemId] = useState('x25519-mlkem768');
  const [sigId, setSigId] = useState('mldsa65');
  const [chain, setChain] = useState(2);
  const [mss, setMss] = useState(TCP_MSS);

  const est = useMemo(() => estimateHandshake(kemId, sigId, chain, mss), [kemId, sigId, chain, mss]);
  const base = useMemo(() => estimateHandshake('x25519', 'ecdsa-p256', chain, mss), [chain, mss]);
  const iw = initialWindowBytes(mss);

  const kemRows = KEM_SCHEMES.map((k) => ({ ...k, exchange: k.publicKey + k.ciphertext }));
  const kemBase = kemRows.find((k) => k.id === 'x25519')!.exchange;
  const sigBase = getSig('ed25519').signature;

  const parts = [
    { label: 'حصة العميل (ClientHello)', v: est.clientKeyShare, c: 'bg-sky-500' },
    { label: 'حصة الخادم', v: est.serverKeyShare, c: 'bg-indigo-500' },
    { label: 'التواقيع', v: est.signatures, c: 'bg-emerald-500' },
    { label: 'مفاتيح الشهادات العامة', v: est.publicKeys, c: 'bg-amber-500' },
  ];

  const srcIds = ['nist-fips203', 'nist-fips204', 'nist-fips205', 'rfc7748', 'rfc8032', 'rfc6928', 'nist-sp80057'];

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 space-y-8">
      <header className="text-center space-y-3">
        <div className="w-16 h-16 mx-auto rounded-2xl icon-glass-3d flex items-center justify-center text-emerald-400">
          <GitCompare className="w-8 h-8" aria-hidden="true" />
        </div>
        <h1 className="text-2xl md:text-3xl font-black text-white">المقارنات التحليلية: من التشفير الكلاسيكي إلى ما بعد الكم</h1>
        <p className="text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
          مقارنة قابلة للتحقق لأحجام المفاتيح والتواقيع، ومحاكٍ يوضح أثرها على مصافحة الاتصال الآمن.
        </p>
      </header>

      <div role="note" className="flex items-start gap-2.5 p-4 rounded-2xl glass-panel card-3d-neon border border-emerald-500/30 text-[11px] text-slate-300 leading-relaxed">
        <Info className="w-4 h-4 mt-0.5 shrink-0 text-emerald-400" aria-hidden="true" />
        <p>
          أحجام مخططات ما بعد الكم <strong className="text-slate-100">تُحسب في الصفحة من معاملات المعايير</strong> (FIPS 203/204/205)، وقد طابقتها اختبارات آلية
          مع القيم المنشورة في جداول المعايير (54 فحصاً). أما الكلاسيكية فثوابت من RFC 7748 وRFC 8032 وSEC 1. آخر تحقق: {ACCESSED}.
        </p>
      </div>

      {/* ---------- الجداول ---------- */}
      <section aria-labelledby="tables" className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 id="tables" className="text-lg font-bold text-white">جدول الأحجام (بالبايت)</h2>
          <div className="flex items-center gap-2.5">
            <div role="tablist" className="flex gap-1.5 p-1 rounded-xl glass-panel card-3d-neon border border-emerald-500/30 text-xs">
              <button
                role="tab"
                aria-selected={tab === 'kem'}
                onClick={() => setTab('kem')}
                className={`px-4 py-2 rounded-lg flex items-center gap-1.5 font-bold cursor-pointer transition-all duration-300 btn-3d-neon active:scale-95 ${
                  tab === 'kem' ? 'btn-3d-neon-active text-emerald-200' : 'text-slate-300 hover:text-emerald-200'
                }`}
              >
                <KeyRound className="w-3.5 h-3.5" aria-hidden="true" /> تبادل المفاتيح
              </button>
              <button
                role="tab"
                aria-selected={tab === 'sig'}
                onClick={() => setTab('sig')}
                className={`px-4 py-2 rounded-lg flex items-center gap-1.5 font-bold cursor-pointer transition-all duration-300 btn-3d-neon active:scale-95 ${
                  tab === 'sig' ? 'btn-3d-neon-active text-emerald-200' : 'text-slate-300 hover:text-emerald-200'
                }`}
              >
                <PenTool className="w-3.5 h-3.5" aria-hidden="true" /> التواقيع الرقمية
              </button>
            </div>
            <label className="text-[11px] text-slate-300 flex items-center gap-1.5 px-3 py-2 rounded-xl btn-3d-neon cursor-pointer">
              <input type="checkbox" checked={log} onChange={(e) => setLog(e.target.checked)} className="accent-emerald-500" /> مقياس لوغاريتمي
            </label>
          </div>
        </div>

        <div className="glass-panel card-3d-neon rounded-2xl overflow-x-auto">
          {tab === 'kem' ? (
            <table className="w-full text-xs text-right">
              <thead className="bg-slate-900 text-slate-400">
                <tr>
                  <th className="px-3 py-3">المخطط</th><th className="px-3 py-3">المفتاح العام</th><th className="px-3 py-3">المفتاح الخاص</th>
                  <th className="px-3 py-3">النص المغلّف / حصة الخادم</th><th className="px-3 py-3">إجمالي التبادل</th><th className="px-3 py-3">× مقابل X25519</th>
                  <th className="px-3 py-3">فئة NIST</th><th className="px-3 py-3">المعيار</th><th className="px-3 py-3">أمام الحاسوب الكمي</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-200">
                {kemRows.map((k) => (
                  <tr key={k.id}>
                    <th scope="row" className="px-3 py-2.5 font-bold text-right" dir="ltr">{k.name}</th>
                    <td className="px-3 py-2.5 font-mono">{fmt(k.publicKey)}</td>
                    <td className="px-3 py-2.5 font-mono">{fmt(k.privateKey)}</td>
                    <td className="px-3 py-2.5 font-mono">{fmt(k.ciphertext)}</td>
                    <td className="px-3 py-2.5 font-mono text-emerald-300">{fmt(k.exchange)}</td>
                    <td className="px-3 py-2.5 font-mono">{(k.exchange / kemBase).toFixed(1)}×</td>
                    <td className="px-3 py-2.5">{k.category ?? (k.classicalBits ? `≈${k.classicalBits} بت` : '—')}</td>
                    <td className="px-3 py-2.5 text-slate-400">{k.standard}</td>
                    <td className="px-3 py-2.5"><Quantum safe={k.quantumSafe} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <table className="w-full text-xs text-right">
              <thead className="bg-slate-900 text-slate-400">
                <tr>
                  <th className="px-3 py-3">المخطط</th><th className="px-3 py-3">المفتاح العام</th><th className="px-3 py-3">المفتاح الخاص</th>
                  <th className="px-3 py-3">التوقيع</th><th className="px-3 py-3">× مقابل Ed25519</th><th className="px-3 py-3">فئة NIST</th>
                  <th className="px-3 py-3">المعيار</th><th className="px-3 py-3">أمام الحاسوب الكمي</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-200">
                {SIG_SCHEMES.map((s) => (
                  <tr key={s.id} title={s.note}>
                    <th scope="row" className="px-3 py-2.5 font-bold text-right" dir="ltr">{s.name}</th>
                    <td className="px-3 py-2.5 font-mono">{fmt(s.publicKey)}</td>
                    <td className="px-3 py-2.5 font-mono">{fmt(s.privateKey)}</td>
                    <td className="px-3 py-2.5 font-mono text-emerald-300">{fmt(s.signature)}</td>
                    <td className="px-3 py-2.5 font-mono">{(s.signature / sigBase).toFixed(1)}×</td>
                    <td className="px-3 py-2.5">{s.category ?? (s.classicalBits ? `≈${s.classicalBits} بت` : '—')}</td>
                    <td className="px-3 py-2.5 text-slate-400">{s.standard}</td>
                    <td className="px-3 py-2.5"><Quantum safe={s.quantumSafe} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <p className="text-[11px] text-slate-500">
          يُحسب التبادل الهجين كمجموع حجمي المكوّنين. «فئة NIST» هي فئة الأمان المعرّفة في المعايير (1 و3 و5 مقابل مفتاح AES-128/192/256)، وللكلاسيكية تُعرض القوة التقريبية بالبت.
        </p>

        <div className="glass-panel card-3d-neon chart-3d-stage rounded-2xl p-5">
          <Bars
            log={log}
            items={(tab === 'kem'
              ? kemRows.map((k) => ({ label: k.name, value: k.exchange, pqc: k.quantumSafe }))
              : SIG_SCHEMES.map((s) => ({ label: s.name, value: s.signature, pqc: s.quantumSafe }))
            )}
          />
          <p className="mt-4 text-[11px] text-slate-400 flex flex-wrap gap-4 relative z-10">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-900/80 border border-sky-500/30"><span className="inline-block w-2.5 h-2.5 rounded-full bg-sky-400 shadow-[0_0_8px_#38bdf8]" />كلاسيكي</span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-900/80 border border-emerald-500/30"><span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />مقاوم للكم</span>
            <span className="my-auto">{tab === 'kem' ? 'المقياس: إجمالي التبادل' : 'المقياس: حجم التوقيع'}</span>
          </p>
        </div>
      </section>

      {/* ---------- المحاكي ---------- */}
      <section aria-labelledby="sim" className="space-y-3">
        <h2 id="sim" className="text-lg font-bold text-white flex items-center gap-2">
          <Radio className="w-5 h-5 text-amber-400" aria-hidden="true" /> محاكي أثر الحجم على المصافحة
        </h2>
        <p className="text-xs text-slate-400 leading-relaxed">
          اختر مخطط تبادل المفاتيح والتوقيع وطول سلسلة الشهادات، لترى كم بايتاً تُضاف من المفاتيح والتواقيع وهل تتسع رحلة الخادم في النافذة الابتدائية لـ TCP أم تحتاج جولة ذهاب وإياب إضافية.
        </p>

        <div className="flex flex-wrap gap-2.5">
          {PRESETS.map((p) => (
            <button
              key={p.label}
              onClick={() => {
                setKemId(p.kem);
                setSigId(p.sig);
              }}
              className={`px-3.5 py-2 rounded-xl text-[11px] font-bold cursor-pointer transition-all duration-300 btn-3d-neon active:scale-95 ${
                kemId === p.kem && sigId === p.sig
                  ? 'btn-3d-neon-active ring-1 ring-emerald-400/60 text-emerald-200'
                  : 'text-slate-300 hover:text-emerald-200'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        <div className="glass-panel card-3d-neon rounded-2xl p-5 grid md:grid-cols-4 gap-4 text-xs">
          <label className="space-y-1">
            <span className="text-slate-400">تبادل المفاتيح</span>
            <select className="input-field" value={kemId} onChange={(e) => setKemId(e.target.value)}>
              {KEM_SCHEMES.filter((k) => k.id !== 'rsa2048-kem').map((k) => <option key={k.id} value={k.id}>{k.name}</option>)}
            </select>
          </label>
          <label className="space-y-1">
            <span className="text-slate-400">التوقيع</span>
            <select className="input-field" value={sigId} onChange={(e) => setSigId(e.target.value)}>
              {SIG_SCHEMES.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
          </label>
          <label className="space-y-1">
            <span className="text-slate-400">طول سلسلة الشهادات: {chain}</span>
            <input type="range" min={1} max={5} value={chain} onChange={(e) => setChain(+e.target.value)} className="w-full" />
          </label>
          <label className="space-y-1">
            <span className="text-slate-400">MSS: {mss} بايت</span>
            <input type="range" min={536} max={1460} step={4} value={mss} onChange={(e) => setMss(+e.target.value)} className="w-full" />
          </label>
        </div>

        <div className="glass-panel card-3d-neon chart-3d-stage rounded-2xl p-5 space-y-4">
          <div className="grid sm:grid-cols-3 gap-4 text-center relative z-10">
            <div><p className="text-[11px] text-slate-400">إجمالي المفاتيح والتواقيع</p><p className="text-2xl font-black text-white font-mono" dir="ltr">{fmt(est.total)} B</p><p className="text-[11px] text-slate-400">{(est.total / base.total).toFixed(1)}× الكلاسيكي ({fmt(base.total)} B)</p></div>
            <div><p className="text-[11px] text-slate-400">رحلة الخادم</p><p className="text-2xl font-black text-white font-mono" dir="ltr">{fmt(est.serverFlight)} B</p><p className="text-[11px] text-slate-400">النافذة الابتدائية: {fmt(iw)} B</p></div>
            <div>
              <p className="text-[11px] text-slate-400">جولات الذهاب والإياب لرحلة الخادم</p>
              <p className={`text-2xl font-black font-mono ${est.fitsInitialWindow ? 'text-emerald-400' : 'text-amber-400'}`} dir="ltr">{est.serverFlightRounds}</p>
              <p className="text-[11px] text-slate-400">{est.fitsInitialWindow ? 'تتسع في النافذة الأولى' : 'تتجاوز النافذة الأولى: تأخير إضافي'}</p>
            </div>
          </div>

          <div role="img" aria-label="تركيب حجم المصافحة" className="flex h-6 rounded-full p-0.5 bar-3d-track relative z-10">
            {parts.map((p) => (
              <div key={p.label} className={`${p.c} bar-3d-fill first:rounded-r-full last:rounded-l-full`} style={{ width: `${(p.v / est.total) * 100}%` }} title={`${p.label}: ${fmt(p.v)} B`} />
            ))}
          </div>
          <ul className="flex flex-wrap gap-x-4 gap-y-1.5 text-[11px] text-slate-300 relative z-10">
            {parts.map((p) => (
              <li key={p.label} className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-900/80 border border-slate-700/80"><span className={`inline-block w-2.5 h-2.5 rounded-full ${p.c}`} />{p.label}: <span className="font-mono text-emerald-300" dir="ltr">{fmt(p.v)} B</span></li>
            ))}
          </ul>
          <p className="text-[11px] text-slate-400 leading-relaxed relative z-10">
            تبسيط تعليمي: يُحسب مجموع المفاتيح والتواقيع فقط (c شهادة = c مفتاح عام و c+1 توقيعاً)، دون ترويسات TLS وحقول الشهادات الأخرى ولا الضغط ولا فقدان الحزم.
            النافذة الابتدائية حسب RFC 6928 (تجريبي): min(10×MSS، max(2×MSS، 14600)) وتتضاعف كل جولة. الأرقام لشرح الاتجاه لا لقياس أداء حقيقي.
          </p>
        </div>
      </section>

      {/* ---------- التهديد الكمي ---------- */}
      <section aria-labelledby="threat" className="space-y-3">
        <h2 id="threat" className="text-lg font-bold text-white flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-red-400" aria-hidden="true" /> لماذا ننتقل؟ أثر الحاسوب الكمي على كل عائلة
        </h2>
        <div className="glass-panel card-3d-neon rounded-2xl overflow-x-auto">
          <table className="w-full text-xs text-right">
            <thead className="bg-slate-900 text-slate-400"><tr><th className="px-3 py-3">العائلة</th><th className="px-3 py-3">الخوارزم الكمي</th><th className="px-3 py-3">الأثر</th><th className="px-3 py-3">المعالجة</th></tr></thead>
            <tbody className="divide-y divide-slate-800 text-slate-200">
              <tr><th scope="row" className="px-3 py-2.5 text-right">RSA وDH وECC</th><td className="px-3 py-2.5">شور (Shor)</td><td className="px-3 py-2.5">كسر كامل لمسألة التحليل واللوغاريتم المنفصل بحاسوب كمي كبير بما يكفي</td><td className="px-3 py-2.5">الانتقال إلى ML-KEM وML-DSA وSLH-DSA</td></tr>
              <tr><th scope="row" className="px-3 py-2.5 text-right">AES وSHA-2/3</th><td className="px-3 py-2.5">غروفر (Grover)</td><td className="px-3 py-2.5">تسريع تربيعي: ينخفض مستوى الأمان الفعلي إلى نحو النصف</td><td className="px-3 py-2.5">رفع طول المفتاح (AES-256) وطول المخرجات</td></tr>
            </tbody>
          </table>
        </div>
        <p className="text-[11px] text-slate-500">مفاهيم تعليمية من مقرر ISE243؛ لا تتضمن تقديرات زمنية لقدرات الحواسيب الكمية لعدم وجود إجماع موثّق عليها.</p>
      </section>

      <footer className="p-5 rounded-2xl glass-panel card-3d-neon border border-emerald-500/30 space-y-2.5">
        <h2 className="text-sm font-bold text-slate-200">المصادر</h2>
        <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-1.5">
          {srcIds.map((id) => {
            const s = getSource(id);
            return s ? (
              <li key={id} className="text-[11px]">
                <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline inline-flex items-center gap-1" dir="ltr">
                  {s.title.split(':')[0]} <ExternalLink className="w-3 h-3" aria-hidden="true" />
                </a>
              </li>
            ) : null;
          })}
        </ul>
      </footer>
    </div>
  );
}
