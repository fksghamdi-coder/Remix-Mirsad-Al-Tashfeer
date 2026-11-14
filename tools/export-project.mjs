#!/usr/bin/env node
// tools/export-project.mjs
// أمر تنفيذي واحد يقرأ المشروع كاملاً (قراءة فقط) وينتج مجلد export/ فيه:
//   project_full_dump_partN.txt  كل الأكواد والبيانات والإعدادات بصيغة ===== FILE: المسار =====
//   assets-inventory.md          جرد ملفات public/ وغيرها: الحجم والنوع الحقيقي (من بايتات الملف لا من اسمه)
//   references-report.md         المراجع المكسورة: ملفات يشير إليها الكود وهي غير موجودة أو ليست من النوع المتوقع
//   README-EXPORT.txt            ملخص سريع
// التشغيل من جذر المشروع:   node tools/export-project.mjs
// خيارات:  --out=export   --max-kb=900 (حجم الجزء الواحد)   --peek (يعرض أول 100 حرف من الملفات النصية غير المعروفة)
// الخصوصية: تُحجب الأسرار تلقائياً (مفاتيح API، رموز، مفاتيح خاصة، قيم ملفات .env) قبل الكتابة.

import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const args = Object.fromEntries(process.argv.slice(2).map((a) => { const [k, v] = a.replace(/^--/, '').split('='); return [k, v ?? true]; }));
const ROOT = process.cwd();
const OUT = path.join(ROOT, args.out || 'export');
const MAX_PART = (Number(args['max-kb']) || 900) * 1024;
const MAX_FILE = 400 * 1024;
const PEEK = !!args.peek;

const SKIP_DIRS = new Set(['node_modules', '.git', 'dist', 'build', '.next', '.vite', '.cache', 'coverage', 'playwright-report', 'test-results', '.aistudio', path.basename(OUT)]);
const TEXT_EXT = new Set(['.ts', '.tsx', '.js', '.jsx', '.mjs', '.cjs', '.json', '.css', '.scss', '.html', '.md', '.txt', '.rules', '.sql', '.yml', '.yaml', '.toml', '.svg', '.xml', '.env', '.example', '.gitignore', '.config']);
const TEXT_NAMES = new Set(['.gitignore', '.env.example', 'env.example', 'Dockerfile', 'LICENSE', 'README']);
const SKIP_FILES = /^(bun\.lock|package-lock\.json|yarn\.lock|pnpm-lock\.yaml|project_code\.txt|project_source_dump\.txt|analysis_package\.zip)$/;

const posix = (p) => p.split(path.sep).join('/');
const rel = (p) => posix(path.relative(ROOT, p));

/* ---------- أسرار ---------- */
const SECRET_PATTERNS = [
  [/AIza[0-9A-Za-z_\-]{35}/g, '<redacted:google-api-key>'],
  [/sk-[A-Za-z0-9_\-]{20,}/g, '<redacted:secret-key>'],
  [/gh[pousr]_[A-Za-z0-9]{36,}/g, '<redacted:github-token>'],
  [/\bAC[0-9a-f]{32}\b/g, '<redacted:twilio-sid>'],
  [/-----BEGIN [A-Z ]*PRIVATE KEY-----[\s\S]*?-----END [A-Z ]*PRIVATE KEY-----/g, '<redacted:private-key>'],
  [/(Bearer\s+)[A-Za-z0-9._\-]{20,}/g, '$1<redacted>'],
];
function redact(name, text) {
  let t = text;
  if (/(^|\/)\.?env(\.|$)|\.env/.test(name)) {
    t = t.replace(/^([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.+)$/gm, (m, k, v) => (/^(MY_|YOUR_|<|"?"?$)/.test(v.trim()) ? m : `${k}=<redacted>`));
  }
  for (const [re, rep] of SECRET_PATTERNS) t = t.replace(re, rep);
  return t;
}

/* ---------- نوع الملف من بايتاته ---------- */
function sniff(buf) {
  const h = buf.subarray(0, 16);
  const starts = (...b) => b.every((x, i) => h[i] === x);
  if (starts(0x89, 0x50, 0x4e, 0x47)) return 'image/png';
  if (starts(0xff, 0xd8, 0xff)) return 'image/jpeg';
  if (starts(0x47, 0x49, 0x46, 0x38)) return 'image/gif';
  if (starts(0x52, 0x49, 0x46, 0x46) && buf.subarray(8, 12).toString() === 'WEBP') return 'image/webp';
  if (starts(0x25, 0x50, 0x44, 0x46)) return 'application/pdf';
  if (starts(0x50, 0x4b, 0x03, 0x04)) return 'application/zip (docx/pptx/xlsx/zip)';
  if (starts(0x00, 0x00, 0x01, 0x00)) return 'image/x-icon';
  const head = buf.subarray(0, 512).toString('utf8').trimStart().toLowerCase();
  if (head.startsWith('<svg') || (head.startsWith('<?xml') && head.includes('<svg'))) return 'image/svg+xml';
  if (head.startsWith('<!doctype html') || head.startsWith('<html')) return 'text/html';
  if (buf.subarray(0, 4096).includes(0)) return 'binary/unknown';
  return 'text/plain';
}
const EXT_TYPE = { '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.gif': 'image/gif', '.webp': 'image/webp', '.pdf': 'application/pdf', '.svg': 'image/svg+xml', '.ico': 'image/x-icon', '.pptx': 'application/zip (docx/pptx/xlsx/zip)', '.zip': 'application/zip (docx/pptx/xlsx/zip)' };

/* ---------- المشي ---------- */
const all = [];
(function walk(d) {
  for (const f of fs.readdirSync(d)) {
    const p = path.join(d, f);
    const st = fs.statSync(p);
    if (st.isDirectory()) { if (!SKIP_DIRS.has(f)) walk(p); }
    else all.push({ p, r: rel(p), size: st.size });
  }
})(ROOT);

const isText = (f) => TEXT_EXT.has(path.extname(f.p).toLowerCase()) || TEXT_NAMES.has(path.basename(f.p));
const textFiles = all.filter((f) => isText(f) && !SKIP_FILES.test(path.basename(f.p)) && !f.r.startsWith('public/') || (f.r.startsWith('public/') && /\.(json|js|svg|html|txt|css)$/.test(f.p)));
const assetFiles = all.filter((f) => f.r.startsWith('public/') || (!isText(f) && !SKIP_FILES.test(path.basename(f.p))));

fs.mkdirSync(OUT, { recursive: true });

/* ---------- 1) المخرج النصي مقسّماً ---------- */
let part = 1, size = 0, buf = [], skipped = [], redactions = 0;
const flush = () => { if (buf.length) { fs.writeFileSync(path.join(OUT, `project_full_dump_part${part}.txt`), buf.join('')); part++; buf = []; size = 0; } };
for (const f of textFiles.sort((a, b) => a.r.localeCompare(b.r))) {
  if (f.size > MAX_FILE) { skipped.push(`${f.r} (${(f.size / 1024).toFixed(0)}KB > ${MAX_FILE / 1024}KB)`); continue; }
  let t = fs.readFileSync(f.p, 'utf8');
  const before = t;
  t = redact(f.r, t);
  if (t !== before) redactions++;
  const chunk = `\n===== FILE: ${f.r} =====\n${t}\n`;
  if (size + chunk.length > MAX_PART) flush();
  buf.push(chunk); size += chunk.length;
}
flush();

/* ---------- 2) جرد الأصول ---------- */
const inv = [];
for (const f of assetFiles.sort((a, b) => a.r.localeCompare(b.r))) {
  const b = fs.readFileSync(f.p);
  const real = sniff(b);
  const ext = path.extname(f.p).toLowerCase();
  const declared = EXT_TYPE[ext] || (ext ? `(${ext})` : '(بلا امتداد)');
  const mismatch = EXT_TYPE[ext] ? EXT_TYPE[ext] !== real : false;
  let peek = '';
  if (PEEK && real === 'text/plain') peek = ' · بداية: «' + redact(f.r, b.subarray(0, 100).toString('utf8')).replace(/\s+/g, ' ') + '»';
  inv.push({ ...f, real, declared, mismatch, sha: crypto.createHash('sha256').update(b).digest('hex').slice(0, 12), peek });
}
const invMd = ['# جرد الأصول (public/ والملفات غير النصية)', '', `عدد الملفات: ${inv.length}`, '', '| الملف | الحجم | النوع الحقيقي | النوع حسب الاسم | تنبيه | sha256 |', '|---|---|---|---|---|---|']
  .concat(inv.map((i) => `| ${i.r} | ${(i.size / 1024).toFixed(1)}KB | ${i.real} | ${i.declared} | ${i.mismatch ? '⚠ الامتداد لا يطابق المحتوى' : (i.real === 'text/plain' && !path.extname(i.p) ? '⚠ نص بلا امتداد' : '')}${i.peek} | ${i.sha} |`));
fs.writeFileSync(path.join(OUT, 'assets-inventory.md'), invMd.join('\n'));

/* ---------- 3) المراجع المكسورة ---------- */
const byPath = new Map(inv.map((i) => [i.r, i]));
const REF_RE = /['"`(](\/(?:assets|presentations|icons|images|diagrams|media|files|public)\/[^'"`\s)?#]+)/g;
const refs = new Map(); // path → [{file,line,ctx}]
for (const f of textFiles) {
  if (f.size > MAX_FILE) continue;
  const lines = fs.readFileSync(f.p, 'utf8').split('\n');
  lines.forEach((ln, i) => { for (const m of ln.matchAll(REF_RE)) { const k = m[1]; (refs.get(k) || refs.set(k, []).get(k)).push({ file: f.r, line: i + 1, ctx: ln }); } });
}
const broken = [], wrongType = [], ok = [];
for (const [url, uses] of refs) {
  if (url.includes('${')) continue;
  const key = 'public' + decodeURIComponent(url).replace(/^\/public/, '');
  const hit = byPath.get(key);
  if (!hit) { broken.push({ url, uses }); continue; }
  const wantsImage = uses.some((u) => /(image|<img|\.png|\.jpg|poster|thumbnail)/i.test(u.ctx));
  const wantsPdf = uses.some((u) => /(pdf|presentation|slide)/i.test(u.ctx));
  if (wantsImage && !hit.real.startsWith('image/')) wrongType.push({ url, real: hit.real, want: 'صورة', uses });
  else if (wantsPdf && !wantsImage && hit.real !== 'application/pdf' && !/zip/.test(hit.real)) wrongType.push({ url, real: hit.real, want: 'PDF/عرض', uses });
  else ok.push(url);
}
const referenced = new Set([...refs.keys()].map((u) => 'public' + decodeURIComponent(u).replace(/^\/public/, '')));
const orphans = inv.filter((i) => i.r.startsWith('public/') && !referenced.has(i.r) && !/(manifest\.json|sw\.js|icons\/)/.test(i.r));
const fmtUses = (u) => u.slice(0, 3).map((x) => `${x.file}:${x.line}`).join('، ');
const refMd = [
  '# تقرير المراجع', '',
  `- مراجع سليمة: ${ok.length}`, `- **مراجع مكسورة (الملف غير موجود): ${broken.length}**`, `- **مراجع من نوع غير متوقع: ${wrongType.length}**`, `- ملفات في public/ لا يشير إليها أحد: ${orphans.length}`, '',
  '## مراجع مكسورة (الملف غير موجود في public/)', '',
  ...(broken.length ? broken.map((b) => `- \`${b.url}\` ← ${fmtUses(b.uses)}`) : ['لا يوجد.']), '',
  '## مراجع إلى ملف ليس من النوع المتوقع', '',
  ...(wrongType.length ? wrongType.map((w) => `- \`${w.url}\` المتوقع ${w.want} لكنه فعلاً **${w.real}** ← ${fmtUses(w.uses)}`) : ['لا يوجد.']), '',
  '## ملفات public/ غير مستخدمة (راجعها: قد تحوي بيانات لا يجب نشرها)', '',
  ...(orphans.length ? orphans.map((o) => `- ${o.r} (${o.real}, ${(o.size / 1024).toFixed(1)}KB)`) : ['لا يوجد.']),
];
fs.writeFileSync(path.join(OUT, 'references-report.md'), refMd.join('\n'));

/* ---------- 4) ملخص ---------- */
const summary = [
  'تصدير مشروع مِرْصَاد — ' + new Date().toISOString(),
  `ملفات نصية مُصدَّرة: ${textFiles.length - skipped.length} في ${part - 1} جزء (≤ ${MAX_PART / 1024}KB لكل جزء)`,
  `ملفات حُجبت منها أسرار: ${redactions}`,
  `ملفات تخطّيناها لكبر حجمها: ${skipped.length}${skipped.length ? '\n  - ' + skipped.join('\n  - ') : ''}`,
  `أصول مجرودة: ${inv.length} · مراجع مكسورة: ${broken.length} · نوع غير متوقع: ${wrongType.length} · أيتام: ${orphans.length}`,
  '', 'أرسل: كل ملفات project_full_dump_part*.txt + assets-inventory.md + references-report.md',
  'لا ترسل: ملف .env الحقيقي ولا أي مفتاح (الأمر يحجبها، لكن راجع الملفات قبل الإرسال).',
].join('\n');
fs.writeFileSync(path.join(OUT, 'README-EXPORT.txt'), summary);
console.log(summary);
