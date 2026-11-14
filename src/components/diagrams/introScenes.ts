// src/components/diagrams/introScenes.ts
// أعمال فنية تجريدية لشرائح مقدمة المشروع (بلا نصوص ولا ملفات خارجية)، تتلوّن بلون الشريحة.
import type { Prim, Scene } from './scenes';

export const INTRO_ART_IDS = ['welcome', 'timeline', 'zk', 'certificate', 'governance'] as const;
export type IntroArtId = (typeof INTRO_ART_IDS)[number];

const W = 640;
const H = 360;
const BG = '#020617';

const circ = (cx: number, cy: number, r: number, o: Partial<Extract<Prim, { k: 'circle' }>> = {}): Prim => ({ k: 'circle', cx, cy, r, ...o });
const rect = (x: number, y: number, w: number, h: number, o: Partial<Extract<Prim, { k: 'rect' }>> = {}): Prim => ({ k: 'rect', x, y, w, h, rx: 6, ...o });
const line = (x1: number, y1: number, x2: number, y2: number, o: Partial<Extract<Prim, { k: 'line' }>> = {}): Prim => ({ k: 'line', x1, y1, x2, y2, sw: 2, ...o });
const poly = (pts: [number, number][], o: Partial<Extract<Prim, { k: 'poly' }>> = {}): Prim => ({ k: 'poly', pts, ...o });

function backdrop(a: string): Prim[] {
  const items: Prim[] = [rect(0, 0, W, H, { rx: 0, fill: BG })];
  for (let x = 20; x < W; x += 40) for (let y = 20; y < H; y += 40) items.push(circ(x, y, 1.2, { fill: '#334155', op: 0.6 }));
  items.push(circ(W / 2, H / 2, 170, { fill: a, op: 0.07 }));
  items.push(circ(W / 2, H / 2, 110, { fill: a, op: 0.08 }));
  return items;
}

function lock(cx: number, cy: number, a: string, s = 1): Prim[] {
  return [
    circ(cx, cy - 18 * s, 16 * s, { stroke: a, sw: 5 * s }),
    rect(cx - 24 * s, cy - 6 * s, 48 * s, 40 * s, { rx: 8 * s, fill: a }),
    circ(cx, cy + 10 * s, 5 * s, { fill: BG }),
    rect(cx - 2 * s, cy + 12 * s, 4 * s, 12 * s, { rx: 2, fill: BG }),
  ];
}

function welcome(a: string): Prim[] {
  const items = backdrop(a);
  items.push(circ(320, 180, 150, { stroke: a, sw: 1.5, op: 0.3 }), circ(320, 180, 115, { stroke: a, sw: 1.5, op: 0.25 }));
  for (let i = 0; i < 10; i++) {
    const t = (i / 10) * Math.PI * 2 - Math.PI / 2;
    const x = 320 + Math.cos(t) * 150, y = 180 + Math.sin(t) * 150;
    items.push(line(320, 180, x, y, { stroke: a, op: 0.25, sw: 1.5 }), circ(x, y, 7, { fill: BG, stroke: a, sw: 2 }), circ(x, y, 2.5, { fill: a }));
  }
  items.push(poly([[320, 92], [392, 118], [392, 190], [320, 262], [248, 190], [248, 118]], { fill: a, op: 0.18, stroke: a, sw: 3 }));
  items.push(...lock(320, 176, a, 1));
  return items;
}

function timeline(a: string): Prim[] {
  const items = backdrop(a);
  // عجلة الشفرة التاريخية
  items.push(circ(120, 180, 58, { stroke: a, sw: 3 }), circ(120, 180, 38, { stroke: a, sw: 2, op: 0.6 }));
  for (let i = 0; i < 26; i++) {
    const t = (i / 26) * Math.PI * 2;
    items.push(line(120 + Math.cos(t) * 58, 180 + Math.sin(t) * 58, 120 + Math.cos(t) * 50, 180 + Math.sin(t) * 50, { stroke: a, sw: 1.5 }));
  }
  items.push(circ(120, 180, 6, { fill: a }));
  // مصفوفة AES
  for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) items.push(rect(262 + c * 26, 130 + r * 26, 22, 22, { rx: 4, fill: a, op: (r + c) % 2 ? 0.55 : 0.25, stroke: a, sw: 1 }));
  // شبكة (lattice) ما بعد الكم
  for (let r = 0; r < 5; r++) for (let c = 0; c < 5; c++) items.push(circ(470 + c * 22 + (r % 2) * 8, 126 + r * 20, 3.5, { fill: a, op: 0.9 }));
  items.push(line(470, 226, 540, 146, { stroke: '#f8fafc', sw: 2.5, arrow: true }));
  items.push(line(184, 180, 252, 180, { stroke: a, sw: 2.5, arrow: true }), line(372, 180, 450, 180, { stroke: a, sw: 2.5, arrow: true }));
  items.push(line(60, 290, 580, 290, { stroke: a, sw: 2, op: 0.5 }));
  [90, 320, 540].forEach((x) => items.push(circ(x, 290, 6, { fill: BG, stroke: a, sw: 2.5 })));
  return items;
}

function zk(a: string): Prim[] {
  const items = backdrop(a);
  items.push(circ(150, 180, 70, { fill: a, op: 0.15, stroke: a, sw: 3 }), circ(490, 180, 70, { fill: '#38bdf8', op: 0.15, stroke: '#38bdf8', sw: 3 }));
  // ثقب مفتاح عند المثبّت
  items.push(circ(150, 166, 15, { fill: a }), poly([[142, 176], [158, 176], [164, 214], [136, 214]], { fill: a }));
  // عين التحقق
  items.push(circ(490, 180, 28, { stroke: '#38bdf8', sw: 3 }), circ(490, 180, 11, { fill: '#38bdf8' }));
  [128, 180, 232].forEach((y, i) => {
    const toRight = i !== 1;
    items.push(line(toRight ? 232 : 408, y, toRight ? 408 : 232, y, { stroke: toRight ? a : '#38bdf8', sw: 2.5, arrow: true, dash: i === 1 ? '6 5' : undefined }));
    items.push(circ(320, y - 16, 9, { fill: toRight ? a : '#38bdf8' }));
  });
  // نجوم مقاومة الكم
  [[320, 300, 14], [250, 316, 8], [390, 316, 8]].forEach(([x, y, r]) => items.push(line(x - r, y, x + r, y, { stroke: '#fde68a', sw: 3 }), line(x, y - r, x, y + r, { stroke: '#fde68a', sw: 3 })));
  return items;
}

function certificate(a: string): Prim[] {
  const items = backdrop(a);
  items.push(rect(170, 50, 300, 260, { rx: 14, fill: '#0f172a', stroke: a, sw: 3 }), rect(184, 64, 272, 232, { rx: 8, stroke: a, sw: 1.2, op: 0.5 }));
  items.push(rect(240, 88, 160, 12, { rx: 6, fill: a, op: 0.9 }), rect(214, 116, 212, 7, { rx: 3, fill: '#94a3b8', op: 0.6 }), rect(226, 134, 188, 7, { rx: 3, fill: '#94a3b8', op: 0.4 }));
  items.push(rect(214, 168, 212, 7, { rx: 3, fill: '#94a3b8', op: 0.3 }), rect(244, 186, 152, 7, { rx: 3, fill: '#94a3b8', op: 0.3 }));
  // ختم
  items.push(poly([[298, 252], [286, 296], [310, 284]], { fill: a, op: 0.7 }), poly([[342, 252], [354, 296], [330, 284]], { fill: a, op: 0.7 }));
  items.push(circ(320, 244, 32, { fill: a, op: 0.2, stroke: a, sw: 3 }), circ(320, 244, 22, { stroke: a, sw: 1.5 }));
  items.push(line(308, 244, 317, 254, { stroke: '#f8fafc', sw: 4 }), line(317, 254, 334, 234, { stroke: '#f8fafc', sw: 4 }));
  // أمان رقمي: خلايا بصمة
  for (let i = 0; i < 6; i++) items.push(rect(500 + (i % 3) * 22, 110 + Math.floor(i / 3) * 22, 16, 16, { rx: 3, fill: a, op: 0.2 + (i % 3) * 0.2 }));
  for (let i = 0; i < 6; i++) items.push(rect(100 + (i % 3) * 22, 220 + Math.floor(i / 3) * 22, 16, 16, { rx: 3, fill: a, op: 0.7 - (i % 3) * 0.2 }));
  return items;
}

function governance(a: string): Prim[] {
  const items = backdrop(a);
  // ثلاث طبقات حوكمة: سياسات ← ضوابط ← تنفيذ (من الأعلى إلى الأسفل)
  const layers: { x: number; y: number; w: number; op: number }[] = [
    { x: 265, y: 116, w: 110, op: 0.6 },
    { x: 225, y: 172, w: 190, op: 0.4 },
    { x: 185, y: 228, w: 270, op: 0.25 },
  ];
  layers.forEach((l) => items.push(rect(l.x, l.y, l.w, 46, { rx: 8, fill: a, op: l.op, stroke: a, sw: 2 })));
  items.push(...lock(320, 80, '#f8fafc', 0.75));
  layers.forEach((l) => {
    const cy = l.y + 23;
    items.push(line(140, cy, l.x - 6, cy, { stroke: a, op: 0.5, sw: 2, dash: '5 4' }), circ(120, cy, 9, { fill: BG, stroke: a, sw: 2.5 }), circ(120, cy, 3.5, { fill: a }));
    items.push(line(500, cy, l.x + l.w + 6, cy, { stroke: a, op: 0.5, sw: 2, dash: '5 4' }), circ(520, cy, 9, { fill: BG, stroke: a, sw: 2.5 }), circ(520, cy, 3.5, { fill: a }));
  });
  return items;
}

export function buildIntroArt(id: IntroArtId, accent: string): Scene {
  const items = { welcome, timeline, zk, certificate, governance }[id](accent);
  return { id: 'intro-' + id, w: W, h: H, title: 'عمل فني تجريدي', caption: 'عمل فني تجريدي توضيحي لشريحة المقدمة', items };
}
