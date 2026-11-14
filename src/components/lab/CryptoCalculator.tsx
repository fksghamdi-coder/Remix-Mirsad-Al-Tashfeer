import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

function mod(a: number, m: number): number { return ((a % m) + m) % m; }

function modPow(base: number, exp: number, m: number): number {
  let result = 1;
  let b = mod(base, m);
  let e = exp;
  while (e > 0) {
    if (e & 1) result = mod(result * b, m);
    b = mod(b * b, m);
    e >>= 1;
  }
  return result;
}

function gcd(a: number, b: number): number {
  a = Math.abs(a); b = Math.abs(b);
  while (b) { [a, b] = [b, a % b]; }
  return a;
}

function extendedGCD(a: number, b: number): { gcd: number; x: number; y: number } {
  if (a === 0) return { gcd: b, x: 0, y: 1 };
  const { gcd: g, x: x1, y: y1 } = extendedGCD(b % a, a);
  return { gcd: g, x: y1 - Math.floor(b / a) * x1, y: x1 };
}

function modInverse(a: number, m: number): number | null {
  const { gcd, x } = extendedGCD(mod(a, m), m);
  return gcd !== 1 ? null : mod(x, m);
}

interface Point { k: 'O' | 'point'; x?: number; y?: number; }

function ecAdd(P: Point, Q: Point, p: number, a: number): Point {
  if (P.k === 'O') return Q;
  if (Q.k === 'O') return P;
  const x1 = P.x ?? 0;
  const y1 = P.y ?? 0;
  const x2 = Q.x ?? 0;
  const y2 = Q.y ?? 0;
  if (x1 === x2 && mod(y1 + y2, p) === 0) return { k: 'O' };
  const lambda = x1 === x2 && y1 === y2
    ? mod((3 * x1 * x1 + a) * (modInverse(mod(2 * y1, p), p) ?? 0), p)
    : mod((y2 - y1) * (modInverse(mod(x2 - x1, p), p) ?? 0), p);
  const x3 = mod(lambda * lambda - x1 - x2, p);
  return { k: 'point', x: x3, y: mod(lambda * (x1 - x3) - y1, p) };
}

function ecMultiply(G: Point, n: number, p: number, a: number): Point {
  let result: Point = { k: 'O' };
  let base = G;
  let exp = n;
  while (exp > 0) {
    if (exp & 1) result = ecAdd(result, base, p, a);
    base = ecAdd(base, base, p, a);
    exp >>= 1;
  }
  return result;
}

type CalcMode = 'modpow' | 'gcd' | 'modinv' | 'ecc';

const MODES: { id: CalcMode; label: string; icon: string }[] = [
  { id: 'modpow', label: 'الأس المعياري', icon: 'b^e mod m' },
  { id: 'gcd', label: 'C.S. الأعلى', icon: 'gcd(a,b)' },
  { id: 'modinv', label: 'المعكوس المعياري', icon: 'a^-1 mod m' },
  { id: 'ecc', label: 'مضاعفات المنحنى', icon: 'nG' },
];

function Slider({ label, value, set, min, max }: { label: string; value: number; set: React.Dispatch<React.SetStateAction<number>>; min: number; max: number }) {
  return (
    <div>
      <label className="text-xs text-slate-400 block mb-1">{label}</label>
      <input type="range" min={min} max={max} value={value}
        onChange={(e) => set(Number(e.target.value))} className="w-full accent-emerald-500" />
      <span className="text-sm font-mono font-bold text-emerald-300">{value}</span>
    </div>
  );
}

export default function CryptoCalculator() {
  const [mode, setMode] = useState<CalcMode>('modpow');

  const [mpBase, setMpBase] = useState(2);
  const [mpExp, setMpExp] = useState(10);
  const [mpMod, setMpMod] = useState(23);
  const mpRes = modPow(mpBase, mpExp, mpMod);

  const [gcdA, setGcdA] = useState(48);
  const [gcdB, setGcdB] = useState(18);
  const gcdRes = gcd(gcdA, gcdB);

  const [miA, setMiA] = useState(3);
  const [miM, setMiM] = useState(11);
  const miRes = modInverse(miA, miM);

  const [eccP, setEccP] = useState(17);
  const [eccA, setEccA] = useState(2);
  const [eccB, setEccB] = useState(2);
  const [eccN, setEccN] = useState(3);
  const eccG: Point = { k: 'point', x: 5, y: 1 };
  const eccRes = ecMultiply(eccG, eccN, eccP, eccA);

  return (
    <div className="space-y-4" dir="rtl">
      <div className="flex flex-wrap gap-2.5">
        {MODES.map((m) => (
          <button
            key={m.id}
            onClick={() => setMode(m.id)}
            className={cn(
              'px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 btn-3d-neon cursor-pointer active:scale-95',
              mode === m.id
                ? 'btn-3d-neon-active ring-1 ring-emerald-400/60 text-emerald-200'
                : 'text-slate-300 hover:text-emerald-200'
            )}
          >
            <span className="font-mono ml-2">{m.icon}</span>
            {m.label}
          </button>
        ))}
      </div>

      {mode === 'modpow' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-panel card-3d-neon p-5 rounded-2xl space-y-4">
          <h3 className="font-bold text-emerald-300 flex items-center gap-2"><Calculator className="w-4 h-4" />الأس المعياري: b<sup>e</sup> mod m</h3>
          <div className="grid grid-cols-3 gap-3">
            <Slider label="القاعدة (b)" value={mpBase} set={setMpBase} min={2} max={100} />
            <Slider label="الأس (e)" value={mpExp} set={setMpExp} min={1} max={100} />
            <Slider label="المقياس (m)" value={mpMod} set={setMpMod} min={2} max={1000} />
          </div>
          <div className="p-4 rounded-xl card-3d-neon bg-slate-950 border border-emerald-500/30 text-center">
            <p className="text-xs text-slate-400 mb-2">النتيجة</p>
            <p className="text-3xl font-black font-mono text-emerald-300">{mpBase}<sup>{mpExp}</sup> mod {mpMod} = {mpRes}</p>
            <p className="text-xs text-slate-500 mt-2">{mpBase}×...×{mpBase} ({mpExp} مرات) ≡ {mpRes} (mod {mpMod})</p>
          </div>
        </motion.div>
      )}

      {mode === 'gcd' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-panel card-3d-neon p-5 rounded-2xl space-y-4">
          <h3 className="font-bold text-emerald-300 flex items-center gap-2"><Calculator className="w-4 h-4" />القاسم المشترك الأكبر: gcd(a, b)</h3>
          <div className="grid grid-cols-2 gap-3">
            <Slider label="القيمة أ" value={gcdA} set={setGcdA} min={1} max={1000} />
            <Slider label="القيمة ب" value={gcdB} set={setGcdB} min={1} max={1000} />
          </div>
          <div className="p-4 rounded-xl card-3d-neon bg-slate-950 border border-emerald-500/30 text-center">
            <p className="text-xs text-slate-400 mb-2">النتيجة</p>
            <p className="text-3xl font-black font-mono text-emerald-300">gcd({gcdA}, {gcdB}) = {gcdRes}</p>
            {gcdRes === 1 && <p className="text-xs text-emerald-400 mt-2 flex items-center justify-center gap-1"><CheckCircle2 className="w-3 h-3" /> العددان أوليان نسبياً — مناسب لـ RSA</p>}
          </div>
        </motion.div>
      )}

      {mode === 'modinv' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-panel card-3d-neon p-5 rounded-2xl space-y-4">
          <h3 className="font-bold text-emerald-300 flex items-center gap-2"><Calculator className="w-4 h-4" />المعكوس المعياري: a<sup>-1</sup> mod m</h3>
          <div className="grid grid-cols-2 gap-3">
            <Slider label="القيمة أ" value={miA} set={setMiA} min={1} max={100} />
            <Slider label="المقياس م" value={miM} set={setMiM} min={2} max={100} />
          </div>
          <div className="p-4 rounded-xl card-3d-neon bg-slate-950 border border-emerald-500/30 text-center">
            <p className="text-xs text-slate-400 mb-2">النتيجة</p>
            {miRes !== null
              ? <><p className="text-2xl font-black font-mono text-emerald-300">{miA}<sup>-1</sup> mod {miM} = {miRes}</p><p className="text-xs text-emerald-400 mt-2">تحقق: {miA} × {miRes} mod {miM} = {mod(miA * miRes, miM)} ✓</p></>
              : <><p className="text-2xl font-black text-red-400">لا يوجد معكوس</p><p className="text-xs text-red-400/70 mt-2">gcd({miA}, {miM}) = {gcd(miA, miM)} ≠ 1</p></>}
          </div>
        </motion.div>
      )}

      {mode === 'ecc' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-panel card-3d-neon p-5 rounded-2xl space-y-4">
          <h3 className="font-bold text-emerald-300 flex items-center gap-2"><Calculator className="w-4 h-4" />مضاعفات المنحنى: nG على y² = x³ + ax + b (mod p)</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Slider label="p (الحقل)" value={eccP} set={setEccP} min={7} max={97} />
            <Slider label="a (المعامل)" value={eccA} set={setEccA} min={0} max={20} />
            <Slider label="b (المعامل)" value={eccB} set={setEccB} min={0} max={20} />
            <Slider label="n (المضاعف)" value={eccN} set={setEccN} min={1} max={20} />
          </div>
          <div className="p-4 rounded-xl card-3d-neon bg-slate-950 border border-emerald-500/30 text-center">
            <p className="text-xs text-slate-400 mb-2">النتيجة</p>
            <p className="text-sm text-slate-300 mb-1">المنحنى: y² = x³ + {eccA}x + {eccB} (mod {eccP})</p>
            <p className="text-xs text-slate-500 mb-3">النقطة المولدة G = (5, 1)</p>
            {eccRes.k === 'O'
              ? <p className="text-2xl font-black font-mono text-emerald-300">{eccN}G = O (نقطة اللانهاية)</p>
              : <p className="text-2xl font-black font-mono text-emerald-300">{eccN}G = ({eccRes.x}, {eccRes.y})</p>
            }
          </div>
        </motion.div>
      )}
    </div>
  );
}
