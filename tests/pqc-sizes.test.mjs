// tests/pqc-sizes.test.mjs
// تشغيل: node tests/pqc-sizes.test.mjs   (يتطلب transpile لـ src/lib/pqcSizes.ts أو تشغيله عبر tsx)
// القيم المتوقعة هي القيم المنشورة في جداول معاملات FIPS 203/204/205 (للمقارنة مع الصيغ المحسوبة).
import { KEM_SCHEMES, SIG_SCHEMES, getKem, getSig, estimateHandshake } from '../src/lib/pqcSizes.ts';
let p = 0, f = 0; const ok = (n, c) => { c ? p++ : f++; console.log((c ? 'PASS' : 'FAIL') + ' - ' + n); };
const eq = (name, got, exp) => ok(`${name}: ${got} = ${exp}`, got === exp);

// FIPS 203 (ek, dk, ct)
for (const [id, ek, dk, ct] of [['mlkem512', 800, 1632, 768], ['mlkem768', 1184, 2400, 1088], ['mlkem1024', 1568, 3168, 1568]]) {
  const s = getKem(id); eq(id + ' ek', s.publicKey, ek); eq(id + ' dk', s.privateKey, dk); eq(id + ' ct', s.ciphertext, ct); eq(id + ' ss', s.sharedSecret, 32);
}
// FIPS 204 (pk, sk, sig)
for (const [id, pk, sk, sig] of [['mldsa44', 1312, 2560, 2420], ['mldsa65', 1952, 4032, 3309], ['mldsa87', 2592, 4896, 4627]]) {
  const s = getSig(id); eq(id + ' pk', s.publicKey, pk); eq(id + ' sk', s.privateKey, sk); eq(id + ' sig', s.signature, sig);
}
// FIPS 205 (pk, sk, sig)
for (const [id, pk, sk, sig] of [['slh128s', 32, 64, 7856], ['slh128f', 32, 64, 17088], ['slh192s', 48, 96, 16224], ['slh192f', 48, 96, 35664], ['slh256s', 64, 128, 29792], ['slh256f', 64, 128, 49856]]) {
  const s = getSig(id); eq(id + ' pk', s.publicKey, pk); eq(id + ' sk', s.privateKey, sk); eq(id + ' sig', s.signature, sig);
}
// ثوابت كلاسيكية
eq('Ed25519 sig', getSig('ed25519').signature, 64); eq('Ed25519 pk', getSig('ed25519').publicKey, 32);
eq('X25519 share', getKem('x25519').publicKey, 32); eq('RSA-2048 sig', getSig('rsa2048').signature, 256);
// الهجين = مجموع المكوّنين
eq('هجين: حصة العميل', getKem('x25519-mlkem768').publicKey, 32 + 1184); eq('هجين: حصة الخادم', getKem('x25519-mlkem768').ciphertext, 32 + 1088);
// فئات الأمان
ok('ML-KEM-512/768/1024 = فئات 1/3/5', [1, 3, 5].every((c, i) => getKem(['mlkem512', 'mlkem768', 'mlkem1024'][i]).category === c));
ok('ML-DSA-44/65/87 = فئات 2/3/5', [2, 3, 5].every((c, i) => getSig(['mldsa44', 'mldsa65', 'mldsa87'][i]).category === c));
// المحاكي
const a = estimateHandshake('x25519', 'ed25519', 2);
eq('كلاسيكي: رحلة الخادم = 32 + 3×64 + 2×32', a.serverFlight, 32 + 192 + 64); ok('كلاسيكي يتسع في النافذة الأولى (14600)', a.fitsInitialWindow && a.serverFlightRounds === 1);
const b = estimateHandshake('x25519-mlkem768', 'mldsa65', 2);
eq('هجين + ML-DSA-65: رحلة الخادم', b.serverFlight, 1120 + 3 * 3309 + 2 * 1952);
ok('هجين + ML-DSA-65 ما زال في النافذة الأولى؟', b.fitsInitialWindow === (b.serverFlight <= 14600));
const c = estimateHandshake('mlkem768', 'slh128s', 2);
ok('SLH-DSA-128s ×3 تتجاوز النافذة الأولى وتحتاج أكثر من جولة', !c.fitsInitialWindow && c.serverFlightRounds >= 2);
eq('حد طول السلسلة 1..5', estimateHandshake('x25519', 'ed25519', 99).publicKeys, 5 * 32);
ok('كل المخططات لها قيم موجبة', [...KEM_SCHEMES.map(k => k.publicKey), ...SIG_SCHEMES.map(s => s.signature)].every(n => n > 0));
console.log(`\nالنتيجة: ${p} نجح، ${f} فشل`); process.exit(f ? 1 : 0);
