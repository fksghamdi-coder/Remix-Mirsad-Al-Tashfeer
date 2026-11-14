// src/components/diagrams/scenes.ts
// رسوم تعليمية دقيقة: كل رسم «مشهد» من عناصر بسيطة تُحسب قيمه من diagramData (لا أرقام مكتوبة يدوياً).
// يُعرض المشهد في React (Diagrams.tsx) ويمكن تحويله إلى ملف SVG مستقل (toSvgString) للتصدير أو المعاينة.
import {
  type DiagramId,
  dhExample,
  ecMultiples,
  ecPoints,
  shiftRows,
  sigmaExample,
  stateLabels,
} from './diagramData.ts';

export type Prim =
  | {
      k: 'rect';
      x: number;
      y: number;
      w: number;
      h: number;
      rx?: number;
      fill?: string;
      stroke?: string;
      sw?: number;
      dash?: string;
      op?: number;
    }
  | {
      k: 'poly';
      pts: [number, number][];
      fill?: string;
      stroke?: string;
      sw?: number;
      op?: number;
    }
  | {
      k: 'text';
      x: number;
      y: number;
      s: string;
      size?: number;
      fill?: string;
      anchor?: 'start' | 'middle' | 'end';
      weight?: number;
      ltr?: boolean;
      op?: number;
    }
  | {
      k: 'line';
      x1: number;
      y1: number;
      x2: number;
      y2: number;
      stroke?: string;
      sw?: number;
      dash?: string;
      arrow?: boolean;
      op?: number;
    }
  | {
      k: 'circle';
      cx: number;
      cy: number;
      r: number;
      fill?: string;
      stroke?: string;
      sw?: number;
      op?: number;
    };

export interface Scene {
  id: string;
  w: number;
  h: number;
  title: string;
  caption: string;
  items: Prim[];
}

export const C = {
  bg: '#020617',
  card: '#0f172a',
  line: '#334155',
  text: '#e2e8f0',
  mute: '#94a3b8',
  em: '#10b981',
  cy: '#22d3ee',
  am: '#f59e0b',
  vi: '#a78bfa',
  rd: '#f87171',
  sl: '#64748b',
};

const W = 800;
const H = 450;

const T = (
  x: number,
  y: number,
  s: string,
  o: Partial<Extract<Prim, { k: 'text' }>> = {}
): Prim => ({ k: 'text', x, y, s, ...o });

const R = (
  x: number,
  y: number,
  w: number,
  h: number,
  o: Partial<Extract<Prim, { k: 'rect' }>> = {}
): Prim => ({ k: 'rect', x, y, w, h, rx: 10, fill: C.card, stroke: C.line, sw: 1.5, ...o });

const L = (
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  o: Partial<Extract<Prim, { k: 'line' }>> = {}
): Prim => ({ k: 'line', x1, y1, x2, y2, stroke: C.sl, sw: 2, ...o });

const titleOf = (s: string): Prim =>
  T(W / 2, 34, s, { size: 20, weight: 700, anchor: 'middle', fill: C.text });

/* ---------------- 1) AES: ShiftRows ---------------- */
function aes(): Scene {
  const items: Prim[] = [titleOf('جولة AES: خطوة ShiftRows بالتفصيل')];
  const rowColor = [C.sl, C.em, C.cy, C.am];
  const input = stateLabels();
  const output = shiftRows(input);
  const cell = 52,
    gap = 4;
  const draw = (m: string[][], x0: number, y0: number, byLabelRow: boolean) => {
    m.forEach((row, r) =>
      row.forEach((lab, c) => {
        const colorRow = byLabelRow ? Number(lab[1]) : r;
        items.push(
          R(x0 + c * (cell + gap), y0 + r * (cell + gap), cell, cell, {
            rx: 8,
            fill: rowColor[colorRow],
            op: 0.22,
            stroke: rowColor[colorRow],
            sw: 1.5,
          })
        );
        items.push(
          T(x0 + c * (cell + gap) + cell / 2, y0 + r * (cell + gap) + cell / 2 + 5, lab, {
            size: 14,
            anchor: 'middle',
            ltr: true,
            fill: C.text,
          })
        );
      })
    );
  };
  const inX = 470,
    outX = 100,
    y0 = 80;
  items.push(T(inX + 118, 66, 'قبل ShiftRows', { anchor: 'middle', size: 14, fill: C.mute }));
  items.push(T(outX + 118, 66, 'بعد ShiftRows', { anchor: 'middle', size: 14, fill: C.mute }));
  draw(input, inX, y0, false);
  draw(output, outX, y0, true);
  [0, 1, 2, 3].forEach((r) =>
    items.push(
      T(inX + 4 * (cell + gap) + 6, y0 + r * (cell + gap) + cell / 2 + 5, `إزاحة ${r}`, {
        size: 11,
        fill: rowColor[r],
        anchor: 'start',
      })
    )
  );
  items.push(L(452, 190, 360, 190, { arrow: true, stroke: C.em, sw: 3 }));
  items.push(T(406, 168, 'دوران لليسار', { anchor: 'middle', size: 12, fill: C.em }));
  items.push(T(406, 212, 'الصف r بمقدار r', { anchor: 'middle', size: 12, fill: C.em }));

  const ops = [
    { t: 'SubBytes', d: 'استبدال كل بايت (S-box)', x: 620, hi: false },
    { t: 'ShiftRows', d: 'إزاحة الصفوف', x: 440, hi: true },
    { t: 'MixColumns', d: 'خلط الأعمدة في GF(2⁸)', x: 260, hi: false },
    { t: 'AddRoundKey', d: 'XOR مع مفتاح الجولة', x: 80, hi: false },
  ];
  ops.forEach((o, i) => {
    items.push(
      R(o.x, 330, 150, 52, {
        fill: o.hi ? '#064e3b' : C.card,
        stroke: o.hi ? C.em : C.line,
        sw: o.hi ? 2.5 : 1.5,
      })
    );
    items.push(
      T(o.x + 75, 362, o.t, { anchor: 'middle', size: 15, weight: 700, ltr: true, fill: C.text })
    );
    items.push(T(o.x + 75, 402, o.d, { anchor: 'middle', size: 11, fill: C.mute }));
    if (i < ops.length - 1) items.push(L(o.x - 4, 356, o.x - 26, 356, { arrow: true }));
  });
  items.push(
    T(W / 2, 432, 'الجولة الأخيرة في AES تخلو من MixColumns (FIPS 197).', {
      anchor: 'middle',
      size: 12,
      fill: C.mute,
    })
  );
  return {
    id: 'aes-round',
    w: W,
    h: H,
    title: 'جولة AES وخطوة ShiftRows',
    caption:
      'خطوات الجولة الواحدة في AES، مع إبراز إزاحة الصفوف (ShiftRows) على مصفوفة الحالة 4×4',
    items,
  };
}

/* ---------------- 2) المنحنى الإهليلجي ---------------- */
function ec(): Scene {
  const items: Prim[] = [titleOf('المنحنى y² = x³ + 2x + 2 فوق الحقل F₁₇')];
  const x0 = 76,
    y0 = 404,
    S = 22;
  const px = (x: number) => x0 + x * S;
  const py = (y: number) => y0 - y * S;
  for (let i = 0; i <= 16; i++) {
    items.push(L(px(i), py(0), px(i), py(16), { stroke: C.line, sw: 1, op: 0.35 }));
    items.push(L(px(0), py(i), px(16), py(i), { stroke: C.line, sw: 1, op: 0.35 }));
  }
  [0, 4, 8, 12, 16].forEach((v) => {
    items.push(
      T(px(v), y0 + 18, String(v), { anchor: 'middle', size: 11, fill: C.mute, ltr: true })
    );
    items.push(
      T(x0 - 10, py(v) + 4, String(v), { anchor: 'end', size: 11, fill: C.mute, ltr: true })
    );
  });
  items.push(L(px(0), py(8.5), px(16), py(8.5), { stroke: C.vi, sw: 1.5, dash: '5 4' }));
  items.push(
    T(px(16) + 4, py(8.5) - 4, 'y ↔ −y', { size: 10, fill: C.vi, anchor: 'start', ltr: true })
  );

  const mult = ecMultiples([5, 1]);
  const pts = ecPoints();
  const idx = new Map<string, number>();
  mult.forEach((m, i) => {
    if (m !== 'O') idx.set(`${m[0]},${m[1]}`, i + 1);
  });
  pts.forEach(([x, y]) => {
    const k = idx.get(`${x},${y}`);
    const isG = x === 5 && y === 1;
    items.push({
      k: 'circle',
      cx: px(x),
      cy: py(y),
      r: isG ? 7 : 5,
      fill: isG ? C.am : C.cy,
      stroke: C.bg,
      sw: 1.5,
    });
    if (k)
      items.push(
        T(px(x) + 8, py(y) - 6, String(k), { size: 10, fill: isG ? C.am : C.text, ltr: true })
      );
  });

  const g2 = mult[1] as [number, number];
  const g3 = mult[2] as [number, number];
  const order = mult.length;
  items.push(R(466, 70, 314, 330, { fill: C.card }));
  const lines: [string, string?][] = [
    ['حقائق هذا الحقل', C.em],
    [`عدد النقاط: ${pts.length} + نقطة اللانهاية O = ${pts.length + 1}`],
    [`المولّد G = (5, 1) ورتبته ${order} (عدد أولي)`],
    [`2G = (${g2[0]}, ${g2[1]})  ·  3G = (${g3[0]}, ${g3[1]})`],
    ['الرقم بجانب كل نقطة هو k في kG'],
    ['النقطة الذهبية هي G، والخط البنفسجي محور التناظر'],
    ['حقل صغير للتوضيح؛ المنحنيات الحقيقية بحجم 256 بتاً', C.mute],
    ['(مثل P-256) ولا يمكن رسم نقاطها.', C.mute],
  ];
  lines.forEach(([s, c], i) =>
    items.push(
      T(768, 104 + i * 38, s, {
        anchor: 'end',
        size: i === 0 ? 16 : 13,
        weight: i === 0 ? 700 : 400,
        fill: c || C.text,
      })
    )
  );
  return {
    id: 'ec-points',
    w: W,
    h: H,
    title: 'نقاط المنحنى الإهليلجي فوق F17',
    caption:
      'نقاط المنحنى y² = x³ + 2x + 2 فوق F₁₇ ومضاعفات المولّد G=(5,1)، وكلها محسوبة',
    items,
  };
}

/* ---------------- 3) ديفي–هيلمان ---------------- */
function dh(): Scene {
  const e = dhExample();
  const items: Prim[] = [titleOf('تبادل ديفي–هيلمان بمعاملات تعليمية صغيرة')];
  const side = (
    x: number,
    name: string,
    secret: string,
    formula: string,
    pub: string,
    shared: string,
    c: string
  ) => {
    items.push(R(x, 70, 230, 330, { stroke: c, sw: 2 }));
    items.push(T(x + 115, 100, name, { anchor: 'middle', size: 18, weight: 700, fill: c }));
    items.push(R(x + 16, 118, 198, 54, { fill: '#451a03', stroke: C.am }));
    items.push(T(x + 115, 140, 'سرّ خاص (لا يُرسل)', { anchor: 'middle', size: 11, fill: C.am }));
    items.push(T(x + 115, 162, secret, { anchor: 'middle', size: 17, weight: 700, ltr: true }));
    items.push(
      T(x + 115, 204, 'يحسب القيمة العلنية', { anchor: 'middle', size: 11, fill: C.mute })
    );
    items.push(T(x + 115, 228, formula, { anchor: 'middle', size: 13, ltr: true }));
    items.push(
      T(x + 115, 256, pub, { anchor: 'middle', size: 20, weight: 700, ltr: true, fill: C.cy })
    );
    items.push(
      T(x + 115, 304, 'بعد استلام قيمة الطرف الآخر', {
        anchor: 'middle',
        size: 11,
        fill: C.mute,
      })
    );
    items.push(T(x + 115, 330, shared, { anchor: 'middle', size: 13, ltr: true }));
    items.push(
      T(x + 115, 366, `السر المشترك = ${e.sharedAlice}`, {
        anchor: 'middle',
        size: 18,
        weight: 700,
        fill: C.em,
        ltr: true,
      })
    );
  };
  side(
    560,
    'أليس',
    `a = ${e.a}`,
    `A = g^a mod p = ${e.g}^${e.a} mod ${e.p}`,
    `A = ${e.A}`,
    `s = B^a mod p = ${e.B}^${e.a} mod ${e.p}`,
    C.em
  );
  side(
    10,
    'بوب',
    `b = ${e.b}`,
    `B = g^b mod p = ${e.g}^${e.b} mod ${e.p}`,
    `B = ${e.B}`,
    `s = A^b mod p = ${e.A}^${e.b} mod ${e.p}`,
    C.cy
  );
  items.push(R(252, 70, 296, 120, { stroke: C.vi }));
  items.push(T(400, 96, 'قناة علنية', { anchor: 'middle', size: 15, weight: 700, fill: C.vi }));
  items.push(T(400, 122, `p = ${e.p}  ·  g = ${e.g}`, { anchor: 'middle', size: 15, ltr: true }));
  items.push(L(540, 154, 262, 154, { arrow: true, stroke: C.em, sw: 2.5 }));
  items.push(T(400, 148, `A = ${e.A}`, { anchor: 'middle', size: 13, ltr: true, fill: C.em }));
  items.push(L(262, 178, 540, 178, { arrow: true, stroke: C.cy, sw: 2.5 }));
  items.push(T(400, 172, `B = ${e.B}`, { anchor: 'middle', size: 13, ltr: true, fill: C.cy }));
  items.push(R(252, 214, 296, 110, { stroke: C.rd, dash: '6 4' }));
  items.push(
    T(400, 242, 'المتنصت يرى فقط', { anchor: 'middle', size: 14, weight: 700, fill: C.rd })
  );
  items.push(T(400, 268, `p, g, A = ${e.A}, B = ${e.B}`, { anchor: 'middle', size: 14, ltr: true }));
  items.push(
    T(400, 298, 'ولا يستطيع استنتاج a أو b أو السر', {
      anchor: 'middle',
      size: 12,
      fill: C.mute,
    })
  );
  items.push(
    T(400, 352, 'في الأنظمة الحقيقية: p بحجم 2048 بتاً أو أكثر،', {
      anchor: 'middle',
      size: 12,
      fill: C.mute,
    })
  );
  items.push(T(400, 372, 'أو منحنى إهليلجي (ECDH).', { anchor: 'middle', size: 12, fill: C.mute }));
  items.push(
    T(
      W / 2,
      430,
      `تحقق: B^a ≡ A^b ≡ g^(ab) (mod p) ⇒ ${e.sharedAlice} = ${e.sharedBob}`,
      { anchor: 'middle', size: 13, fill: C.text, ltr: true }
    )
  );
  return {
    id: 'dh-exchange',
    w: W,
    h: H,
    title: 'تبادل ديفي–هيلمان',
    caption:
      'تبادل مفتاح ديفي–هيلمان بأرقام صغيرة: يصل الطرفان إلى السر نفسه دون إرساله',
    items,
  };
}

/* ---------------- 4) هرمية المفاتيح ---------------- */
function keys(): Scene {
  const items: Prim[] = [titleOf('هرمية المفاتيح وتدوير مفتاح البيانات')];
  const box = (
    x: number,
    y: number,
    w: number,
    h: number,
    t: string,
    sub: string,
    c: string,
    dim = false
  ) => {
    items.push(
      R(x, y, w, h, { stroke: c, sw: 2.5, fill: dim ? '#111827' : C.card, op: dim ? 0.75 : 1 })
    );
    items.push(
      T(x + w / 2, y + 26, t, {
        anchor: 'middle',
        size: 15,
        weight: 700,
        fill: dim ? C.mute : C.text,
      })
    );
    items.push(T(x + w / 2, y + 48, sub, { anchor: 'middle', size: 11, fill: C.mute }));
  };
  box(240, 60, 320, 62, 'المفتاح الجذر', 'داخل HSM أو خدمة KMS، خارج التطبيق', C.vi);
  items.push(L(400, 124, 400, 150, { arrow: true }));
  box(
    240,
    152,
    320,
    62,
    'مفتاح التغليف KEK',
    'غير قابل للتصدير، يغلّف مفاتيح البيانات فقط',
    C.am
  );
  items.push(L(340, 216, 210, 262, { arrow: true }));
  items.push(L(460, 216, 590, 262, { arrow: true }));
  box(70, 264, 280, 62, 'DEK الإصدار k1', 'متقاعد: يفك فقط ولا يشفّر جديداً', C.sl, true);
  box(450, 264, 280, 62, 'DEK الإصدار k2', 'نشط: يشفّر كل البيانات الجديدة', C.em);
  items.push(R(70, 358, 280, 40, { rx: 8, stroke: C.sl, dash: '5 4' }));
  items.push(
    T(210, 383, 'v2.k1.‹iv›.‹ct›', { anchor: 'middle', size: 13, ltr: true, fill: C.mute })
  );
  items.push(R(450, 358, 280, 40, { rx: 8, stroke: C.em }));
  items.push(T(590, 383, 'v2.k2.‹iv›.‹ct›', { anchor: 'middle', size: 13, ltr: true, fill: C.text }));
  items.push(L(210, 328, 210, 356, { arrow: true, stroke: C.sl }));
  items.push(L(590, 328, 590, 356, { arrow: true, stroke: C.em }));
  items.push(L(352, 378, 448, 378, { arrow: true, stroke: C.em, sw: 3 }));
  items.push(T(400, 368, 'reencrypt', { anchor: 'middle', size: 11, fill: C.em, ltr: true }));
  items.push(
    T(
      W / 2,
      428,
      'عند التدوير: يُنشأ DEK جديد، ويبقى القديم لفك النسخ السابقة، وتُنقل السجلات تدريجياً (الفصل 9).',
      { anchor: 'middle', size: 12, fill: C.mute }
    )
  );
  return {
    id: 'key-hierarchy',
    w: W,
    h: H,
    title: 'هرمية المفاتيح KEK/DEK',
    caption: 'هرمية مفاتيح من جذر وKEK ومفاتيح بيانات مُصدَّرة، مع تدوير بإعادة التشفير',
    items,
  };
}

/* ---------------- 5) مصافحة TLS 1.3 ---------------- */
function tls(): Scene {
  const items: Prim[] = [titleOf('مصافحة TLS 1.3 الكاملة: رحلة ذهاب وإياب واحدة')];
  const cx = 660,
    sx = 140;
  items.push(R(cx - 70, 54, 140, 34, { stroke: C.cy }));
  items.push(T(cx, 77, 'العميل', { anchor: 'middle', size: 15, weight: 700, fill: C.cy }));
  items.push(R(sx - 70, 54, 140, 34, { stroke: C.em }));
  items.push(T(sx, 77, 'الخادم', { anchor: 'middle', size: 15, weight: 700, fill: C.em }));
  items.push(L(cx, 90, cx, 424, { stroke: C.line, dash: '4 4', sw: 1.5 }));
  items.push(L(sx, 90, sx, 424, { stroke: C.line, dash: '4 4', sw: 1.5 }));
  const msg = (y: number, label: string, toServer: boolean, c: string, ltrLabel = true) => {
    items.push(
      L(toServer ? cx - 2 : sx + 2, y, toServer ? sx + 2 : cx - 2, y, {
        arrow: true,
        stroke: c,
        sw: 2.5,
      })
    );
    items.push(
      T((cx + sx) / 2, y - 8, label, { anchor: 'middle', size: 13, ltr: ltrLabel, fill: C.text })
    );
  };
  msg(120, 'ClientHello + key_share', true, C.cy);
  msg(160, 'ServerHello + key_share', false, C.em);
  items.push(
    R(200, 178, 400, 146, { rx: 12, fill: '#022c22', stroke: C.em, dash: '6 4', op: 0.6 })
  );
  items.push(
    T(400, 196, 'من هنا كل شيء مشفّر بمفاتيح المصافحة', {
      anchor: 'middle',
      size: 11,
      fill: C.em,
    })
  );
  msg(222, 'EncryptedExtensions', false, C.em);
  msg(250, 'Certificate', false, C.em);
  msg(278, 'CertificateVerify', false, C.em);
  msg(306, 'Finished', false, C.em);
  msg(350, 'Finished', true, C.cy);
  items.push(L(cx - 2, 392, sx + 2, 392, { arrow: true, stroke: C.am, sw: 3 }));
  items.push(L(sx + 2, 392, cx - 2, 392, { arrow: true, stroke: C.am, sw: 3 }));
  items.push(
    T(400, 384, 'بيانات التطبيق (مشفّرة)', { anchor: 'middle', size: 13, fill: C.am })
  );
  items.push(
    T(
      W / 2,
      440,
      'يُشتق السر المشترك من key_share (ECDHE أو هجين مع ML-KEM)، وتُوقّع الهوية في CertificateVerify.',
      { anchor: 'middle', size: 11, fill: C.mute }
    )
  );
  return {
    id: 'tls13-handshake',
    w: W,
    h: H,
    title: 'مصافحة TLS 1.3',
    caption: 'تسلسل رسائل مصافحة TLS 1.3 الكاملة (RFC 8446) وما يُشفَّر منها',
    items,
  };
}

/* ---------------- 6) بروتوكول شنور ---------------- */
function zkp(): Scene {
  const s = sigmaExample();
  const items: Prim[] = [titleOf('بروتوكول شنور: إثبات معرفة السر دون كشفه')];
  items.push(
    T(
      W / 2,
      62,
      `عام: p = ${s.p}  ·  q = ${s.q}  ·  g = ${s.g}  ·  المفتاح العام u = g^α mod p = ${s.u}`,
      { anchor: 'middle', size: 13, ltr: true, fill: C.mute }
    )
  );
  items.push(R(570, 84, 210, 150, { stroke: C.em, sw: 2 }));
  items.push(
    T(675, 112, 'المثبِّت (Prover)', { anchor: 'middle', size: 16, weight: 700, fill: C.em })
  );
  items.push(T(675, 142, 'يعرف السر', { anchor: 'middle', size: 11, fill: C.mute }));
  items.push(
    T(675, 168, `α = ${s.alpha}`, { anchor: 'middle', size: 18, weight: 700, ltr: true, fill: C.am })
  );
  items.push(T(675, 196, `يختار r = ${s.r} عشوائياً`, { anchor: 'middle', size: 12, ltr: true }));
  items.push(T(675, 218, '(لا يُرسل α أبداً)', { anchor: 'middle', size: 11, fill: C.mute }));
  items.push(R(20, 84, 210, 150, { stroke: C.cy, sw: 2 }));
  items.push(
    T(125, 112, 'المتحقِّق (Verifier)', { anchor: 'middle', size: 16, weight: 700, fill: C.cy })
  );
  items.push(T(125, 150, 'لا يعرف α', { anchor: 'middle', size: 12, fill: C.mute }));
  items.push(T(125, 180, `يختار التحدي c = ${s.c}`, { anchor: 'middle', size: 12, ltr: true }));
  items.push(
    T(125, 206, 'عشوائياً بعد استلام t', { anchor: 'middle', size: 11, fill: C.mute })
  );
  const step = (y: number, n: number, label: string, toVerifier: boolean, c: string) => {
    items.push(
      L(toVerifier ? 562 : 238, y, toVerifier ? 238 : 562, y, { arrow: true, stroke: c, sw: 2.5 })
    );
    items.push({ k: 'circle', cx: 400, cy: y - 18, r: 11, fill: c });
    items.push(
      T(400, y - 13, String(n), { anchor: 'middle', size: 13, weight: 700, fill: C.bg, ltr: true })
    );
    items.push(T(400, y + 22, label, { anchor: 'middle', size: 13, ltr: true, fill: C.text }));
  };
  step(118, 1, `التزام: t = g^r mod p = ${s.t}`, true, C.em);
  step(176, 2, `تحدٍّ: c = ${s.c}`, false, C.cy);
  step(234, 3, `استجابة: z = r + α·c mod q = ${s.z}`, true, C.em);
  items.push(
    R(20, 290, 760, 84, {
      fill: s.valid ? '#022c22' : '#450a0a',
      stroke: s.valid ? C.em : C.rd,
      sw: 2,
    })
  );
  items.push(
    T(400, 318, 'يتحقق المتحقِّق من المعادلة', { anchor: 'middle', size: 13, fill: C.mute })
  );
  items.push(
    T(
      400,
      348,
      `g^z = ${s.g}^${s.z} mod ${s.p} = ${s.lhs}     و     t · u^c = ${s.t} · ${s.u}^${s.c} mod ${s.p} = ${s.rhs}     ${
        s.valid ? '✓ متطابقان' : '✗'
      }`,
      { anchor: 'middle', size: 15, weight: 700, ltr: true, fill: s.valid ? C.em : C.rd }
    )
  );
  items.push(
    T(
      W / 2,
      410,
      'الاكتمال: المثبِّت الأمين ينجح دائماً · الصلابة: الغاشّ لا ينجح إلا بتخمين c مسبقاً · المعرفة الصفرية: لا يتسرّب α.',
      { anchor: 'middle', size: 11, fill: C.mute }
    )
  );
  items.push(T(W / 2, 432, 'معاملات صغيرة للتوضيح فقط.', { anchor: 'middle', size: 11, fill: C.mute }));
  return {
    id: 'zkp-sigma',
    w: W,
    h: H,
    title: 'بروتوكول شنور (Sigma)',
    caption:
      'ثلاث رسائل: التزام وتحدٍّ واستجابة، ثم تحقق g^z = t·u^c — القيم محسوبة فعلياً',
    items,
  };
}

export function buildScene(id: DiagramId): Scene {
  switch (id) {
    case 'aes-round':
      return aes();
    case 'ec-points':
      return ec();
    case 'dh-exchange':
      return dh();
    case 'key-hierarchy':
      return keys();
    case 'tls13-handshake':
      return tls();
    case 'zkp-sigma':
      return zkp();
  }
}

export const arrowMarkerId = (c?: string) => `ar-${(c ?? C.sl).replace(/[^a-zA-Z0-9]/g, '')}`;

export function arrowColors(scene: Scene): string[] {
  const s = new Set<string>();
  for (const p of scene.items) if (p.k === 'line' && p.arrow) s.add(p.stroke ?? C.sl);
  return [...s];
}

/* ---------- تحويل إلى ملف SVG مستقل (للتصدير أو المعاينة) ---------- */
const esc = (s: string) =>
  s.replace(
    /[&<>"]/g,
    (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c] as string)
  );

export function toSvgString(scene: Scene): string {
  const markers = arrowColors(scene)
    .map(
      (c) =>
        `<marker id="${arrowMarkerId(c)}" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="${c}"/></marker>`
    )
    .join('');

  const body = scene.items.map((p) => {
    switch (p.k) {
      case 'rect':
        return `<rect x="${p.x}" y="${p.y}" width="${p.w}" height="${p.h}" rx="${
          p.rx ?? 0
        }" fill="${p.fill ?? 'none'}" stroke="${p.stroke ?? 'none'}" stroke-width="${
          p.sw ?? 1
        }"${p.dash ? ` stroke-dasharray="${p.dash}"` : ''}${
          p.op != null ? ` opacity="${p.op}"` : ''
        }/>`;
      case 'poly':
        return `<polygon points="${p.pts.map((q) => q.join(',')).join(' ')}" fill="${
          p.fill ?? 'none'
        }" stroke="${p.stroke ?? 'none'}" stroke-width="${p.sw ?? 1}"${
          p.op != null ? ` opacity="${p.op}"` : ''
        }/>`;
      case 'circle':
        return `<circle cx="${p.cx}" cy="${p.cy}" r="${p.r}" fill="${p.fill ?? 'none'}" stroke="${
          p.stroke ?? 'none'
        }" stroke-width="${p.sw ?? 1}"${p.op != null ? ` opacity="${p.op}"` : ''}/>`;
      case 'line':
        return `<line x1="${p.x1}" y1="${p.y1}" x2="${p.x2}" y2="${p.y2}" stroke="${
          p.stroke ?? C.sl
        }" stroke-width="${p.sw ?? 2}"${p.dash ? ` stroke-dasharray="${p.dash}"` : ''}${
          p.arrow ? ` marker-end="url(#${arrowMarkerId(p.stroke)})"` : ''
        }${p.op != null ? ` opacity="${p.op}"` : ''}/>`;
      case 'text':
        return `<text x="${p.x}" y="${p.y}" font-size="${p.size ?? 13}" fill="${
          p.fill ?? C.text
        }" text-anchor="${p.anchor ?? 'start'}" font-weight="${p.weight ?? 400}"${
          p.ltr ? ' direction="ltr" unicode-bidi="isolate"' : ''
        }${p.op != null ? ` opacity="${p.op}"` : ''}>${esc(p.s)}</text>`;
    }
  });
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${scene.w} ${
    scene.h
  }" width="${scene.w * 2}" height="${scene.h * 2}" direction="rtl" font-family="Tahoma, 'Noto Sans Arabic', 'DejaVu Sans', sans-serif"><defs>${markers}</defs><rect width="${
    scene.w
  }" height="${scene.h}" fill="${C.bg}"/>${body.join('')}</svg>`;
}
