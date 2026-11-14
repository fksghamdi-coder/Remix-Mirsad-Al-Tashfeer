// tests/diagram-data.test.mjs
import * as D from '../src/components/diagrams/diagramData.ts';

let p = 0,
  f = 0;
const ok = (n, c) => {
  c ? p++ : f++;
  console.log((c ? 'PASS' : 'FAIL') + ' - ' + n);
};

// AES ShiftRows
const m = D.stateLabels(),
  s = D.shiftRows(m);
ok('ShiftRows: الصف 0 ثابت', JSON.stringify(s[0]) === JSON.stringify(m[0]));
ok('ShiftRows: الصف 1 يُزاح يساراً بمقدار 1', JSON.stringify(s[1]) === JSON.stringify(['s11', 's12', 's13', 's10']));
ok('ShiftRows: الصف 2 بمقدار 2', JSON.stringify(s[2]) === JSON.stringify(['s22', 's23', 's20', 's21']));
ok('ShiftRows: الصف 3 بمقدار 3', JSON.stringify(s[3]) === JSON.stringify(['s33', 's30', 's31', 's32']));
ok(
  'ShiftRows: تطبيقه 4 مرات يعيد الأصل',
  JSON.stringify([1, 2, 3, 4].reduce((a) => D.shiftRows(a), m)) === JSON.stringify(m)
);

// المنحنى
const pts = D.ecPoints();
ok('E(F17): 18 نقطة أفينية (19 مع اللانهاية)', pts.length === 18);
const mult = D.ecMultiples([5, 1]);
ok('رتبة G=(5,1) تساوي 19', mult.length === 19 && mult[18] === 'O');
ok('2G = (6,3)', JSON.stringify(mult[1]) === '[6,3]');
ok(
  'كل مضاعفات G (1..18) تقع على المنحنى وهي كل النقاط الـ18',
  new Set(mult.slice(0, 18).map((x) => JSON.stringify(x))).size === 18 &&
    mult.slice(0, 18).every((x) => pts.some((q) => JSON.stringify(q) === JSON.stringify(x)))
);

// DH
const dh = D.dhExample();
ok('DH: A = 8 وB = 19', dh.A === 8 && dh.B === 19);
ok('DH: السر المشترك متطابق عند الطرفين = 2', dh.sharedAlice === dh.sharedBob && dh.sharedAlice === 2);
let allEq = true;
for (let a = 1; a < 22; a++)
  for (let b = 1; b < 22; b++) {
    const e = D.dhExample(23, 5, a, b);
    if (e.sharedAlice !== e.sharedBob) allEq = false;
  }
ok('DH: التطابق لكل (a,b) في 1..21', allEq);

// Sigma
const sg = D.sigmaExample();
ok('Sigma: u=13, t=16, z=6', sg.u === 13 && sg.t === 16 && sg.z === 6);
ok('Sigma: g^z = t·u^c (mod p) = 18', sg.valid && sg.lhs === 18 && sg.rhs === 18);
let sigmaAll = true;
for (let al = 1; al < 11; al++)
  for (let r = 1; r < 11; r++)
    for (let c = 1; c < 11; c++) if (!D.sigmaExample(23, 11, 2, al, r, c).valid) sigmaAll = false;
ok('Sigma: التحقق ينجح في 1000 حالة', sigmaAll);
ok(
  'modPow يطابق BigInt',
  [
    [2, 10, 1000],
    [5, 117, 19],
    [7, 560, 561],
  ].every(([b, e, m]) => D.modPow(b, e, m) === Number((BigInt(b) ** BigInt(e)) % BigInt(m)))
);

import { INTRO_ART_IDS, buildIntroArt } from '../src/components/diagrams/introScenes.ts';
import { buildAIImageUrl, resolveChapterImage, STYLE_SUFFIX } from '../src/lib/aiImages.ts';
import { toSvgString } from '../src/components/diagrams/scenes.ts';

ok('INTRO_ART_IDS يحوي 5 مشاهد مقدمة', INTRO_ART_IDS.length === 5);
for (const id of INTRO_ART_IDS) {
  const sc = buildIntroArt(id, '#10b981');
  const svg = toSvgString(sc);
  ok(`مشهد المقدمة ${id} يبني SVG صالحاً بلا نصوص خارجية`, sc.items.length > 10 && svg.startsWith('<svg'));
}

const aiUrl = buildAIImageUrl('quantum lattice', { seed: 7, width: 800, height: 450 });
ok('buildAIImageUrl يضيف STYLE_SUFFIX وnologo=true', aiUrl.includes('nologo=true') && decodeURIComponent(aiUrl).includes(STYLE_SUFFIX));
ok('resolveChapterImage يعطي الأولوية للرابط المحلي', resolveChapterImage({ url: '/local.png', prompt: 'ignored' }) === '/local.png');

console.log(`\nالنتيجة: ${p} نجح، ${f} فشل`);
process.exit(f ? 1 : 0);
