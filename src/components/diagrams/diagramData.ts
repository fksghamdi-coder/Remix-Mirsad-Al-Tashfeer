// src/components/diagrams/diagramData.ts
// بيانات الرسوم التوضيحية تُحسب هنا بدالات نقية قابلة للاختبار، فلا تُكتب القيم يدوياً في الرسم.

export const DIAGRAM_IDS = [
  'aes-round',
  'ec-points',
  'dh-exchange',
  'key-hierarchy',
  'tls13-handshake',
  'zkp-sigma',
] as const;
export type DiagramId = (typeof DIAGRAM_IDS)[number];

export const mod = (a: number, m: number) => ((a % m) + m) % m;

export function modPow(base: number, exp: number, m: number): number {
  let r = 1;
  let b = mod(base, m);
  let e = exp;
  while (e > 0) {
    if (e & 1) r = (r * b) % m;
    b = (b * b) % m;
    e >>= 1;
  }
  return r;
}

export const modInv = (a: number, m: number): number => {
  for (let x = 1; x < m; x++) if (mod(a * x, m) === 1) return x;
  throw new Error('لا يوجد معكوس مقياسي');
};

/* ---------------- AES: ShiftRows ---------------- */
export const stateLabels = (): string[][] =>
  [0, 1, 2, 3].map((r) => [0, 1, 2, 3].map((c) => `s${r}${c}`));

/** ShiftRows (FIPS 197): يُزاح الصف r دورانياً إلى اليسار بمقدار r بايت */
export const shiftRows = (m: string[][]): string[][] =>
  m.map((row, r) => row.map((_, c) => row[(c + r) % 4]));

/* ---------------- المنحنى E(F_p): y² = x³ + ax + b ---------------- */
export type Pt = [number, number] | 'O';

export function ecPoints(p = 17, a = 2, b = 2): [number, number][] {
  const out: [number, number][] = [];
  for (let x = 0; x < p; x++)
    for (let y = 0; y < p; y++) if (mod(y * y, p) === mod(x ** 3 + a * x + b, p)) out.push([x, y]);
  return out;
}

export function ecAdd(P: Pt, Q: Pt, p = 17, a = 2): Pt {
  if (P === 'O') return Q;
  if (Q === 'O') return P;
  const [x1, y1] = P;
  const [x2, y2] = Q;
  if (x1 === x2 && mod(y1 + y2, p) === 0) return 'O';
  const l =
    x1 === x2 && y1 === y2
      ? mod((3 * x1 * x1 + a) * modInv(mod(2 * y1, p), p), p)
      : mod((y2 - y1) * modInv(mod(x2 - x1, p), p), p);
  const x3 = mod(l * l - x1 - x2, p);
  return [x3, mod(l * (x1 - x3) - y1, p)];
}

/** مضاعفات G: [G, 2G, ..., nG] حتى تعود إلى O */
export function ecMultiples(G: [number, number] = [5, 1], p = 17, a = 2): Pt[] {
  const out: Pt[] = [];
  let acc: Pt = 'O';
  do {
    acc = ecAdd(acc, G, p, a);
    out.push(acc);
  } while (acc !== 'O' && out.length < 100);
  return out;
}

/* ---------------- Diffie–Hellman ---------------- */
export function dhExample(p = 23, g = 5, a = 6, b = 15) {
  const A = modPow(g, a, p);
  const B = modPow(g, b, p);
  return { p, g, a, b, A, B, sharedAlice: modPow(B, a, p), sharedBob: modPow(A, b, p) };
}

/* ---------------- شنور (Sigma) ---------------- */
export function sigmaExample(p = 23, q = 11, g = 2, alpha = 7, r = 4, c = 5) {
  const u = modPow(g, alpha, p); // المفتاح العام
  const t = modPow(g, r, p); // الالتزام
  const z = mod(r + alpha * c, q); // الاستجابة
  const lhs = modPow(g, z, p);
  const rhs = mod(t * modPow(u, c, p), p);
  return { p, q, g, alpha, r, c, u, t, z, lhs, rhs, valid: lhs === rhs };
}
