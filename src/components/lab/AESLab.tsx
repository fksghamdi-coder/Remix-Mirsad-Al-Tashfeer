// File: src/components/lab/AESLab.tsx
import React, { useState, useCallback } from 'react';
import {
  Lock,
  Unlock,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Cpu,
} from 'lucide-react';
import LabPipelineTracker, { PipelineStageInfo } from './LabPipelineTracker';
import { cn } from '@/lib/utils';

const SBOX = [
  0x63,0x7c,0x77,0x7b,0xf2,0x6b,0x6f,0xc5,0x30,0x01,0x67,0x2b,0xfe,0xd7,0xab,0x76,
  0xca,0x82,0xc9,0x7d,0xfa,0x59,0x47,0xf0,0xad,0xd4,0xa2,0xaf,0x9c,0xa4,0x72,0xc0,
  0xb7,0xfd,0x93,0x26,0x36,0x3f,0xf7,0xcc,0x34,0xa5,0xe5,0xf1,0x71,0xd8,0x31,0x15,
  0x04,0xc7,0x23,0xc3,0x18,0x96,0x05,0x9a,0x07,0x12,0x80,0xe2,0xeb,0x27,0xb2,0x75,
  0x09,0x83,0x2c,0x1a,0x1b,0x6e,0x5a,0xa0,0x52,0x3b,0xd6,0xb3,0x29,0xe3,0x2f,0x84,
  0x53,0xd1,0x00,0xed,0x20,0xfc,0xb1,0x5b,0x6a,0xcb,0xbe,0x39,0x4a,0x4c,0x58,0xcf,
  0xd0,0xef,0xaa,0xfb,0x43,0x4d,0x33,0x85,0x45,0xf9,0x02,0x7f,0x50,0x3c,0x9f,0xa8,
  0x51,0xa3,0x40,0x8f,0x92,0x9d,0x38,0xf5,0xbc,0xb6,0xda,0x21,0x10,0xff,0xf3,0xd2,
  0xcd,0x0c,0x13,0xec,0x5f,0x97,0x44,0x17,0xc4,0xa7,0x7e,0x3d,0x64,0x5d,0x19,0x73,
  0x60,0x81,0x4f,0xdc,0x22,0x2a,0x90,0x88,0x46,0xee,0xb8,0x14,0xde,0x5e,0x0b,0xdb,
  0xe0,0x32,0x3a,0x0a,0x49,0x06,0x24,0x5c,0xc2,0xd3,0xac,0x62,0x91,0x95,0xe4,0x79,
  0xe7,0xc8,0x37,0x6d,0x8d,0xd5,0x4e,0xa9,0x6c,0x56,0xf4,0xea,0x65,0x7a,0xae,0x08,
  0xba,0x78,0x25,0x2e,0x1c,0xa6,0xb4,0xc6,0xe8,0xdd,0x74,0x1f,0x4b,0xbd,0x8b,0x8a,
  0x70,0x3e,0xb5,0x66,0x48,0x03,0xf6,0x0e,0x61,0x35,0x57,0xb9,0x86,0xc1,0x1d,0x9e,
  0xe1,0xf8,0x98,0x11,0x69,0xd9,0x8e,0x94,0x9b,0x1e,0x87,0xe9,0xce,0x55,0x28,0xdf,
  0x8c,0xa1,0x89,0x0d,0xbf,0xe6,0x42,0x68,0x41,0x99,0x2d,0x0f,0xb0,0x54,0xbb,0x16,
];

const INV_SBOX = [
  0x52,0x09,0x6a,0xd5,0x30,0x36,0xa5,0x38,0xbf,0x40,0xa3,0x9e,0x81,0xf3,0xd7,0xfb,
  0x7c,0xe3,0x39,0x82,0x9b,0x2f,0xff,0x87,0x34,0x8e,0x43,0x44,0xc4,0xde,0xe9,0xcb,
  0x54,0x7b,0x94,0x32,0xa6,0xc2,0x23,0x3d,0xee,0x4c,0x95,0x0b,0x42,0xfa,0xc3,0x4e,
  0x08,0x2e,0xa1,0x66,0x28,0xd9,0x24,0xb2,0x76,0x5b,0xa2,0x49,0x6d,0x8b,0xd1,0x25,
  0x72,0xf8,0xf6,0x64,0x86,0x68,0x98,0x16,0xd4,0xa4,0x5c,0xcc,0x5d,0x65,0xb6,0x92,
  0x6c,0x70,0x48,0x50,0xfd,0xed,0xb9,0xda,0x5e,0x15,0x46,0x57,0xa7,0x8d,0x9d,0x84,
  0x90,0xd8,0xab,0x00,0x8c,0xbc,0xd3,0x0a,0xf7,0xe4,0x58,0x05,0xb8,0xb3,0x45,0x06,
  0xd0,0x2c,0x1e,0x8f,0xca,0x3f,0x0f,0x02,0xc1,0xaf,0xbd,0x03,0x01,0x13,0x8a,0x6b,
  0x3a,0x91,0x11,0x41,0x4f,0x67,0xdc,0xea,0x97,0xf2,0xcf,0xce,0xf0,0xb4,0xe6,0x73,
  0x96,0xac,0x74,0x22,0xe7,0xad,0x35,0x85,0xe2,0xf9,0x37,0xe8,0x1c,0x75,0xdf,0x6e,
  0x47,0xf1,0x1a,0x71,0x1d,0x29,0xc5,0x89,0x6f,0xb7,0x62,0x0e,0xaa,0x18,0xbe,0x1b,
  0xfc,0x56,0x3e,0x4b,0xc6,0xd2,0x79,0x20,0x9a,0xdb,0xc0,0xfe,0x78,0xcd,0x5a,0xf4,
  0x1f,0xdd,0xa8,0x33,0x88,0x07,0xc7,0x31,0xb1,0x12,0x10,0x59,0x27,0x80,0xec,0x5f,
  0x60,0x51,0x7f,0xa9,0x19,0xb5,0x4a,0x0d,0x2d,0xe5,0x7a,0x9f,0x93,0xc9,0x9c,0xef,
  0xa0,0xe0,0x3b,0x4d,0xae,0x2a,0xf5,0xb0,0xc8,0xeb,0xbb,0x3c,0x83,0x53,0x99,0x61,
  0x17,0x2b,0x04,0x7e,0xba,0x77,0xd6,0x26,0xe1,0x69,0x14,0x63,0x55,0x21,0x0c,0x7d,
];

const RCON = [0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80, 0x1b, 0x36];

function gmul(a: number, b: number): number {
  let p = 0;
  let aa = a & 0xff;
  let bb = b & 0xff;
  for (let i = 0; i < 8; i++) {
    if (bb & 1) p ^= aa;
    const hi = aa & 0x80;
    aa = (aa << 1) & 0xff;
    if (hi) aa ^= 0x1b;
    bb >>= 1;
  }
  return p;
}

function subBytes(s: number[]): number[] {
  return s.map((b) => SBOX[b & 0xff]);
}

function invSubBytes(s: number[]): number[] {
  return s.map((b) => INV_SBOX[b & 0xff]);
}

function shiftRows(s: number[]): number[] {
  const out = [...s];
  out[1] = s[5]; out[5] = s[9]; out[9] = s[13]; out[13] = s[1];
  out[2] = s[10]; out[6] = s[14]; out[10] = s[2]; out[14] = s[6];
  out[3] = s[15]; out[7] = s[3]; out[11] = s[7]; out[15] = s[11];
  return out;
}

function invShiftRows(s: number[]): number[] {
  const out = [...s];
  out[1] = s[13]; out[5] = s[1]; out[9] = s[5]; out[13] = s[9];
  out[2] = s[10]; out[6] = s[14]; out[10] = s[2]; out[14] = s[6];
  out[3] = s[7]; out[7] = s[11]; out[11] = s[15]; out[15] = s[3];
  return out;
}

function mixColumns(s: number[]): number[] {
  const out = new Array(16).fill(0);
  for (let c = 0; c < 4; c++) {
    const i = c * 4;
    const s0 = s[i], s1 = s[i + 1], s2 = s[i + 2], s3 = s[i + 3];
    // معادلة الصف الأول الصحيحة وفق معيار NIST FIPS 197: 2*s0 ^ 3*s1 ^ s2 ^ s3
    out[i]     = gmul(2, s0) ^ gmul(3, s1) ^ s2 ^ s3;
    out[i + 1] = s0 ^ gmul(2, s1) ^ gmul(3, s2) ^ s3;
    out[i + 2] = s0 ^ s1 ^ gmul(2, s2) ^ gmul(3, s3);
    out[i + 3] = gmul(3, s0) ^ s1 ^ s2 ^ gmul(2, s3);
  }
  return out;
}

function invMixColumns(s: number[]): number[] {
  const out = new Array(16).fill(0);
  for (let c = 0; c < 4; c++) {
    const i = c * 4;
    const s0 = s[i], s1 = s[i + 1], s2 = s[i + 2], s3 = s[i + 3];
    out[i]     = gmul(0x0e, s0) ^ gmul(0x0b, s1) ^ gmul(0x0d, s2) ^ gmul(0x09, s3);
    out[i + 1] = gmul(0x09, s0) ^ gmul(0x0e, s1) ^ gmul(0x0b, s2) ^ gmul(0x0d, s3);
    out[i + 2] = gmul(0x0d, s0) ^ gmul(0x09, s1) ^ gmul(0x0e, s2) ^ gmul(0x0b, s3);
    out[i + 3] = gmul(0x0b, s0) ^ gmul(0x0d, s1) ^ gmul(0x09, s2) ^ gmul(0x0e, s3);
  }
  return out;
}

function addRoundKey(s: number[], rk: number[]): number[] {
  return s.map((b, i) => b ^ rk[i]);
}

function keyExpansion(key: number[]): number[][] {
  const w: number[][] = [];
  for (let i = 0; i < 4; i++) {
    w[i] = [key[4 * i], key[4 * i + 1], key[4 * i + 2], key[4 * i + 3]];
  }
  for (let i = 4; i < 44; i++) {
    let temp = [...w[i - 1]];
    if (i % 4 === 0) {
      temp = [
        SBOX[temp[1]] ^ RCON[i / 4 - 1],
        SBOX[temp[2]],
        SBOX[temp[3]],
        SBOX[temp[0]],
      ];
    }
    w[i] = w[i - 4].map((b, idx) => b ^ temp[idx]);
  }
  const roundKeys: number[][] = [];
  for (let r = 0; r < 11; r++) {
    const rk: number[] = [];
    for (let c = 0; c < 4; c++) rk.push(...w[r * 4 + c]);
    roundKeys.push(rk);
  }
  return roundKeys;
}

function hexToBytes(hex: string): number[] {
  const clean = hex.replace(/[^0-9a-fA-F]/g, '').padEnd(32, '0').slice(0, 32);
  const bytes: number[] = [];
  for (let i = 0; i < 32; i += 2) {
    bytes.push(parseInt(clean.slice(i, i + 2), 16) || 0);
  }
  return bytes;
}

function bytesToHex(bytes: number[]): string {
  return bytes.map((b) => (b & 0xff).toString(16).padStart(2, '0')).join('');
}

export default function AESLab() {
  // متجه الاختبار الرسمي من NIST FIPS 197 Appendix B
  const [inputHex, setInputHex] = useState('3243f6a8885a308d313198a2e0370734');
  const [keyHex, setKeyHex] = useState('2b7e151628aed2a6abf7158809cf4f3c');
  const [mode, setMode] = useState<'encrypt' | 'decrypt'>('encrypt');
  const [roundStates, setRoundStates] = useState<number[][]>([]);
  const [currentRound, setCurrentRound] = useState<number>(0);
  const [outputHex, setOutputHex] = useState<string>('');
  const [activePipelineStage, setActivePipelineStage] = useState<0 | 1 | 2 | 3 | 4>(0);
  const [activeSubOp, setActiveSubOp] = useState<number>(-1);

  // حاسبة حقل غالوا المحدود GF(2^8)
  const [gfA, setGfA] = useState('57');
  const [gfB, setGfB] = useState('83');
  const [selectedCell, setSelectedCell] = useState<string | null>(null);
  const [selectedGfBox, setSelectedGfBox] = useState<'add' | 'mul' | null>(null);

  const runAES = useCallback(
    (targetMode: 'encrypt' | 'decrypt' = mode) => {
      setMode(targetMode);
      setActivePipelineStage(1);
      setActiveSubOp(0);

      const stateBytes = hexToBytes(inputHex);
      const keyBytes = hexToBytes(keyHex);
      const rks = keyExpansion(keyBytes);
      const states: number[][] = [];

      if (targetMode === 'encrypt') {
        let state = addRoundKey(stateBytes, rks[0]);
        states.push([...state]);
        for (let r = 1; r <= 10; r++) {
          state = subBytes(state);
          state = shiftRows(state);
          if (r < 10) state = mixColumns(state);
          state = addRoundKey(state, rks[r]);
          states.push([...state]);
        }
      } else {
        let state = addRoundKey(stateBytes, rks[10]);
        states.push([...state]);
        for (let r = 9; r >= 0; r--) {
          state = invShiftRows(state);
          state = invSubBytes(state);
          state = addRoundKey(state, rks[r]);
          if (r > 0) state = invMixColumns(state);
          states.push([...state]);
        }
      }

      setTimeout(() => {
        setActivePipelineStage(2);
        setActiveSubOp(1);
      }, 280);
      setTimeout(() => {
        setActiveSubOp(2);
      }, 520);
      setTimeout(() => {
        setActivePipelineStage(3);
        setActiveSubOp(3);
      }, 760);
      setTimeout(() => {
        setRoundStates(states);
        setCurrentRound(states.length - 1);
        setOutputHex(bytesToHex(states[states.length - 1]));
        setActivePipelineStage(4);
      }, 1050);
    },
    [inputHex, keyHex, mode]
  );

  const aByte = parseInt(gfA, 16) & 0xff || 0;
  const bByte = parseInt(gfB, 16) & 0xff || 0;
  const gfAdd = (aByte ^ bByte).toString(16).toUpperCase().padStart(2, '0');
  const gfMul = gmul(aByte, bByte).toString(16).toUpperCase().padStart(2, '0');

  const pipelineStages: [PipelineStageInfo, PipelineStageInfo, PipelineStageInfo, PipelineStageInfo] = [
    {
      stageNumber: 1,
      title: '1. الإدخال وتجهيز المصفوفة',
      subtitle: 'تحويل الـ 128 بت إلى مصفوفة State (4×4) وتوليد 11 مفتاح جولة',
      formulaOrValue: `Input = 0x${inputHex.slice(0, 12)}... (16 Bytes)`,
    },
    {
      stageNumber: 2,
      title: '2. التشغيل والتحويل (10 جولات)',
      subtitle:
        mode === 'encrypt'
          ? 'SubBytes ➔ ShiftRows ➔ MixColumns ➔ AddRoundKey'
          : 'InvShiftRows ➔ InvSubBytes ➔ AddRoundKey ➔ InvMixColumns',
      formulaOrValue: `Round ${currentRound} / 10 in GF(2^8)`,
    },
    {
      stageNumber: 3,
      title: '3. الفحص والتحقق القياسي',
      subtitle: 'مطابقة متجهات NIST FIPS 197 Appendix B والانغلاق في GF(2^8)',
      formulaOrValue: 'm(x) = x^8 + x^4 + x^3 + x + 1 (0x11B)',
    },
    {
      stageNumber: 4,
      title: '4. النتيجة النهائية (128-bit)',
      subtitle: mode === 'encrypt' ? 'النص المشفر النهائي (Ciphertext)' : 'النص الصريح المسترجع (Plaintext)',
      formulaOrValue: outputHex ? `0x${outputHex}` : 'اضغط تشغيل لإظهار النتيجة',
    },
  ];

  const subOps =
    mode === 'encrypt'
      ? ['1. SubBytes (تعويض S-Box)', '2. ShiftRows (إزاحة الصفوف)', '3. MixColumns (خلط الأعمدة GF(2^8))', '4. AddRoundKey (XOR مفتاح الجولة)']
      : ['1. InvShiftRows', '2. InvSubBytes', '3. AddRoundKey', '4. InvMixColumns'];

  const activeMatrix = roundStates[currentRound] || hexToBytes(inputHex);

  return (
    <div className="space-y-6" dir="rtl">
      {/* شريط تتالي المراحل الأربع المضيء */}
      <LabPipelineTracker
        activeStage={activePipelineStage}
        modeLabel="مختبر معيار التشفير المتقدم AES-128 وحقل غالوا المحدود GF(2^8) — NIST FIPS 197"
        stages={pipelineStages}
      />

      {/* تتالي المربعات الأربع لعمليات الجولة */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
        {subOps.map((opLabel, idx) => {
          const isLit = activeSubOp >= idx;
          const isActiveClick = activeSubOp === idx;
          return (
            <div
              key={opLabel}
              role="button"
              tabIndex={0}
              onClick={() => setActiveSubOp((prev) => (prev === idx ? -1 : idx))}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setActiveSubOp((prev) => (prev === idx ? -1 : idx));
                }
              }}
              className={cn(
                'p-4 rounded-2xl border text-center font-black text-xs transition-all duration-300 cursor-pointer select-none card-3d-neon btn-3d-neon active:scale-[0.97]',
                isLit
                  ? 'bg-gradient-to-b from-emerald-500/22 via-slate-900/90 to-slate-950/95 border-emerald-400/75 text-emerald-200 shadow-[inset_0_1px_2px_rgba(255,255,255,0.3),0_10px_24px_-6px_rgba(0,0,0,0.65),0_0_20px_rgba(16,185,129,0.26)]'
                  : 'bg-gradient-to-b from-white/[0.06] via-slate-900/85 to-slate-950/95 border-slate-700/75 hover:border-emerald-400/60 text-slate-300 hover:text-emerald-200',
                isActiveClick &&
                  'ring-2 ring-emerald-400/80 border-emerald-300 shadow-[inset_0_1px_2px_rgba(255,255,255,0.38),0_0_24px_rgba(16,185,129,0.38)]'
              )}
            >
              {opLabel}
            </div>
          );
        })}
      </div>

      {/* إدخال النص والمفتاح وأزرار التشغيل */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 rounded-3xl glass-panel card-3d-neon border border-emerald-500/35 space-y-5">
          <div className="space-y-2">
            <label className="text-xs font-black text-emerald-400 block">
              النص الصريح / النص المشفّر (Hex 32 حرف — 16 بايت):
            </label>
            <input
              type="text"
              dir="ltr"
              value={inputHex}
              onChange={(e) => setInputHex(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-950/90 border border-emerald-500/35 hover:border-emerald-400/70 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/25 active:scale-[0.995] shadow-[inset_0_1px_2px_rgba(255,255,255,0.14),0_6px_16px_-4px_rgba(0,0,0,0.55)] hover:shadow-[inset_0_1px_2px_rgba(255,255,255,0.22),0_0_16px_rgba(16,185,129,0.2)] font-mono text-xs text-emerald-300 outline-none transition-all duration-300"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black text-amber-400 block">
              مفتاح AES-128 (Hex 32 حرف — متجه اختبار NIST FIPS 197 القياسي):
            </label>
            <input
              type="text"
              dir="ltr"
              value={keyHex}
              onChange={(e) => setKeyHex(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-950/90 border border-amber-500/35 hover:border-amber-400/70 focus:border-amber-400 focus:ring-2 focus:ring-amber-500/25 active:scale-[0.995] shadow-[inset_0_1px_2px_rgba(255,255,255,0.14),0_6px_16px_-4px_rgba(0,0,0,0.55)] hover:shadow-[inset_0_1px_2px_rgba(255,255,255,0.22),0_0_16px_rgba(245,158,11,0.2)] font-mono text-xs text-amber-300 outline-none transition-all duration-300"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => runAES('encrypt')}
              className={cn(
                'flex-1 py-3 px-4 rounded-xl btn-3d-neon font-black text-xs flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 active:scale-95',
                mode === 'encrypt'
                  ? 'btn-3d-neon-active ring-1 ring-emerald-400/60 text-emerald-200'
                  : 'text-emerald-300 hover:text-white'
              )}
            >
              <Lock className="w-4 h-4" />
              <span>تشفير (Encrypt)</span>
            </button>
            <button
              type="button"
              onClick={() => runAES('decrypt')}
              className={cn(
                'flex-1 py-3 px-4 rounded-xl btn-3d-neon btn-3d-amber font-black text-xs flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 active:scale-95',
                mode === 'decrypt'
                  ? 'btn-3d-amber-active ring-1 ring-amber-400/60 text-amber-200'
                  : 'text-amber-300 hover:text-amber-100'
              )}
            >
              <Unlock className="w-4 h-4" />
              <span>فك التشفير (Decrypt)</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setInputHex('3243f6a8885a308d313198a2e0370734');
                setKeyHex('2b7e151628aed2a6abf7158809cf4f3c');
                setOutputHex('');
                setRoundStates([]);
                setActivePipelineStage(0);
                setActiveSubOp(-1);
                setSelectedCell(null);
              }}
              className="py-3 px-4 rounded-xl btn-3d-neon text-slate-200 hover:text-emerald-300 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all duration-300 active:scale-95"
            >
              <RotateCcw className="w-4 h-4" />
              <span>إعادة ضبط NIST</span>
            </button>
          </div>

          {outputHex && (
            <div className="p-4 rounded-2xl card-3d-neon bg-emerald-950/35 border border-emerald-500/45 space-y-2">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-black text-emerald-300">
                  {mode === 'encrypt' ? 'النص المشفر الناتج (Hex):' : 'النص الصريح المسترجع (Hex):'}
                </span>
                <button
                  type="button"
                  onClick={() => setInputHex(outputHex)}
                  className="px-2.5 py-1 rounded-lg btn-3d-neon btn-3d-amber text-[11px] font-bold text-amber-300 hover:text-amber-200 cursor-pointer active:scale-95"
                >
                  نسخ إلى خانة الإدخال لتجربة العكس ↺
                </button>
              </div>
              <div
                dir="ltr"
                className="font-mono text-xs text-white break-all bg-slate-950/90 border border-emerald-500/30 p-3 rounded-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.12)]"
              >
                {outputHex}
              </div>
            </div>
          )}
        </div>

        {/* مصفوفة الحالة 4×4 والتنقل بين الجولات 0..10 */}
        <div className="p-6 rounded-3xl glass-panel card-3d-neon border border-emerald-500/35 space-y-5">
          <div className="flex items-center justify-between gap-2 pb-1 border-b border-slate-800/70">
            <h3 className="text-sm font-black text-white">
              مصفوفة الحالة State Matrix (4×4 بايت) — الجولة {currentRound} من 10
            </h3>
            {roundStates.length > 0 && (
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  disabled={currentRound === 0}
                  onClick={() => setCurrentRound((r) => Math.max(0, r - 1))}
                  className="p-1.5 rounded-lg btn-3d-neon text-slate-300 hover:text-emerald-300 disabled:opacity-40 cursor-pointer active:scale-95"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
                <span className="text-xs font-mono px-2.5 py-1 rounded-lg bg-slate-950/80 border border-amber-500/35 text-amber-400">
                  R{currentRound}
                </span>
                <button
                  type="button"
                  disabled={currentRound >= roundStates.length - 1}
                  onClick={() => setCurrentRound((r) => Math.min(roundStates.length - 1, r + 1))}
                  className="p-1.5 rounded-lg btn-3d-neon text-slate-300 hover:text-emerald-300 disabled:opacity-40 cursor-pointer active:scale-95"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-4 gap-3" dir="ltr">
            {[0, 1, 2, 3].map((row) =>
              [0, 1, 2, 3].map((col) => {
                const byteVal = activeMatrix[col * 4 + row] || 0;
                const cellKey = `${row}-${col}`;
                const isCellSelected = selectedCell === cellKey;
                return (
                  <div
                    key={cellKey}
                    role="button"
                    tabIndex={0}
                    onClick={() => setSelectedCell((prev) => (prev === cellKey ? null : cellKey))}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setSelectedCell((prev) => (prev === cellKey ? null : cellKey));
                      }
                    }}
                    className={cn(
                      'p-3 rounded-xl card-3d-neon text-center font-mono cursor-pointer select-none transition-all duration-300 active:scale-95',
                      isCellSelected
                        ? 'border-emerald-300 ring-2 ring-emerald-400/75 bg-emerald-500/20 shadow-[inset_0_1px_2px_rgba(255,255,255,0.35),0_0_22px_rgba(16,185,129,0.38)] -translate-y-1'
                        : 'border-emerald-500/35 hover:border-emerald-400/75'
                    )}
                  >
                    <div className="text-sm font-black text-emerald-300">
                      {byteVal.toString(16).toUpperCase().padStart(2, '0')}
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5">
                      s[{row},{col}]
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* حاسبة حقل غالوا المحدود GF(2^8) */}
      <div className="p-6 rounded-3xl glass-panel card-3d-neon card-3d-cyan border border-cyan-500/35 space-y-5">
        <h3 className="text-sm font-black text-cyan-300 flex items-center gap-2.5 pb-1 border-b border-slate-800/70">
          <span className="w-8 h-8 rounded-xl icon-glass-3d icon-glass-3d-cyan flex items-center justify-center shrink-0">
            <Cpu className="w-4 h-4 text-cyan-300" />
          </span>
          <span>
            حاسبة حقل غالوا المحدود التفاعلية GF(2^8) — كثيرة الحدود اللاختزالية m(x) = x^8 + x^4 + x^3 + x + 1 (0x11B)
          </span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1.5">
              العنصر الأول A (Hex):
            </label>
            <input
              type="text"
              dir="ltr"
              maxLength={2}
              value={gfA}
              onChange={(e) => setGfA(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/90 border border-cyan-500/35 hover:border-cyan-400/70 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/25 active:scale-[0.99] shadow-[inset_0_1px_2px_rgba(255,255,255,0.14),0_6px_14px_-4px_rgba(0,0,0,0.5)] hover:shadow-[inset_0_1px_2px_rgba(255,255,255,0.22),0_0_16px_rgba(6,182,212,0.22)] font-mono text-xs text-cyan-300 outline-none transition-all duration-300"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1.5">
              العنصر الثاني B (Hex):
            </label>
            <input
              type="text"
              dir="ltr"
              maxLength={2}
              value={gfB}
              onChange={(e) => setGfB(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/90 border border-cyan-500/35 hover:border-cyan-400/70 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/25 active:scale-[0.99] shadow-[inset_0_1px_2px_rgba(255,255,255,0.14),0_6px_14px_-4px_rgba(0,0,0,0.5)] hover:shadow-[inset_0_1px_2px_rgba(255,255,255,0.22),0_0_16px_rgba(6,182,212,0.22)] font-mono text-xs text-cyan-300 outline-none transition-all duration-300"
            />
          </div>
          <div
            role="button"
            tabIndex={0}
            onClick={() => setSelectedGfBox((prev) => (prev === 'add' ? null : 'add'))}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setSelectedGfBox((prev) => (prev === 'add' ? null : 'add'));
              }
            }}
            className={cn(
              'p-3.5 rounded-xl card-3d-neon text-center cursor-pointer select-none transition-all duration-300 active:scale-[0.98]',
              selectedGfBox === 'add'
                ? 'ring-2 ring-emerald-400/80 border-emerald-300 shadow-[inset_0_1px_2px_rgba(255,255,255,0.35),0_0_22px_rgba(16,185,129,0.35)]'
                : 'border-emerald-500/35 hover:border-emerald-400/75'
            )}
          >
            <span className="text-[11px] text-slate-300 block mb-0.5">
              الجمع في حقل غالوا (A ⊕ B)
            </span>
            <strong dir="ltr" className="font-mono text-sm text-emerald-400">
              0x{gfAdd}
            </strong>
          </div>
          <div
            role="button"
            tabIndex={0}
            onClick={() => setSelectedGfBox((prev) => (prev === 'mul' ? null : 'mul'))}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setSelectedGfBox((prev) => (prev === 'mul' ? null : 'mul'));
              }
            }}
            className={cn(
              'p-3.5 rounded-xl card-3d-neon text-center cursor-pointer select-none transition-all duration-300 active:scale-[0.98]',
              selectedGfBox === 'mul'
                ? 'ring-2 ring-amber-400/80 border-amber-300 shadow-[inset_0_1px_2px_rgba(255,255,255,0.35),0_0_22px_rgba(245,158,11,0.35)]'
                : 'border-amber-500/35 hover:border-amber-400/75'
            )}
          >
            <span className="text-[11px] text-slate-300 block mb-0.5">
              الضرب في حقل غالوا (A ⊗ B mod 0x11B)
            </span>
            <strong dir="ltr" className="font-mono text-sm text-amber-400">
              0x{gfMul}
            </strong>
          </div>
        </div>
      </div>
    </div>
  );
}
