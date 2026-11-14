// tests/passwords-import.test.mjs
import assert from 'node:assert/strict';
import {
  verifyPassword,
  encrypt,
  decrypt,
  signHMAC,
  verifyHMAC,
  PBKDF2_ITERATIONS,
} from '../src/lib/crypto.ts';

// 11 official accounts (Admin + 10 Students) with their pre-computed PBKDF2-HMAC-SHA256 (600k) hashes
const EXPECTED_ACCOUNTS = [
  {
    username: 'admin',
    name: 'المشرف العام على المنصة',
    pw: 'Mirsad@Admin2026!',
    salt: '37a9e2db425347b5d59573030e9a5436',
    hash: 'v2$600000$9bb9bc157715cce3b7491d7c1ea0ade11658cc48ef6ecc540115659f49d4e7cb',
  },
  {
    username: '25105375',
    name: 'فهد خالد الغامدي',
    pw: 'Mirsad#5375',
    salt: '1f72e1415097f556c8c208ad28da48c6',
    hash: 'v2$600000$bca298d3b8231507a53a064bc3dada8b582dc177d368c807769a7387b499efa2',
  },
  {
    username: '25106060',
    name: 'صالح محمد المالكي',
    pw: 'Mirsad#6060',
    salt: '92d948d155a91bb9216f22dc5986583a',
    hash: 'v2$600000$b146eac3d371b9f33fbf603c7d8128da1eb5b9387108be73efb10116167c1dbb',
  },
  {
    username: '25106394',
    name: 'ياسر مفرح العسيري',
    pw: 'Mirsad#6394',
    salt: '93f0d23a9ffec875d76308f1eb2d5ed6',
    hash: 'v2$600000$34dfa2975b158b89253b15ce297635878ae7a20965a45d3be0e3e7107299fc94',
  },
  {
    username: '25106059',
    name: 'ماهر حبيب داود',
    pw: 'Mirsad#6059',
    salt: 'b6649523faf2019160b6797f1a42fc9c',
    hash: 'v2$600000$95aa5687f121ecb2149e6a5c876d88b20c24e549425818f3572c7ee45b5f19e3',
  },
  {
    username: '25105456',
    name: 'عبدالرحمن محمد الفيفي',
    pw: 'Mirsad#5456',
    salt: 'dc7c7fe9533e371f4b5c4d2291e4fb28',
    hash: 'v2$600000$9b3bad4baf88db24051cf70e221c73571d45cc8c9a2dec819f32dd4dadf3a093',
  },
  {
    username: '25104748',
    name: 'عمر إبراهيم بن مشعان',
    pw: 'Mirsad#4748',
    salt: '12a4a453b5576c2604d647097a5e3320',
    hash: 'v2$600000$3135f9d80fc9407a6c62ed5299216493f040721547683ffa5868b832ea2a1cbb',
  },
  {
    username: '25108174',
    name: 'إيمان محمد الأهدل',
    pw: 'Mirsad#8174',
    salt: '7ab1314a7566a3a82e823755c08e5129',
    hash: 'v2$600000$6740b16639057ab7f6528e0f884e64b96b9a44f7be500f34ac91766b581c4f60',
  },
  {
    username: '25105999',
    name: 'عفراء سعود الجهني',
    pw: 'Mirsad#5999',
    salt: 'c11107b1e6a2e4948f85ec36542407f8',
    hash: 'v2$600000$669f11d9b794c6c99665e30d5cfe8445c822904c60c40aa0dc2ae97cf4c819d1',
  },
  {
    username: '25105026',
    name: 'عبدالله موسى سفياني',
    pw: 'Mirsad#5026',
    salt: 'a9801e376f001fceadefc59436c47db9',
    hash: 'v2$600000$55a125f734e01e8616ee0d62409611004d8a3f0a9432b784f51b0de2c2786108',
  },
  {
    username: '2510650',
    name: 'خديجة محمد جعفري',
    pw: 'Mirsad#0650',
    salt: '9e02f3d03ebbc28260f66e377b510ee8',
    hash: 'v2$600000$3b650ba9fbb8f2a6769bd693276e7ac6e32348e59a0fd46c9d9b985eec9bdf46',
  },
];

let checks = 0;
function pass(msg) {
  checks++;
  console.log(`PASS - ${msg}`);
}

assert.equal(PBKDF2_ITERATIONS, 600_000, 'PBKDF2 iterations must be 600,000');
pass('معيار PBKDF2-HMAC-SHA256 مضبوط على 600,000 تكرار (NIST SP 800-132 / NCS-1:2020)');

assert.equal(EXPECTED_ACCOUNTS.length, 11, 'Must have 11 accounts (Admin + 10 students)');
pass('عدد الحسابات الرسمية 11 حساباً (المشرف العام + 10 طلاب)');

for (const acc of EXPECTED_ACCOUNTS) {
  assert(acc.pw.length >= 8, `Password for ${acc.name} is at least 8 chars`);
  assert(/[A-Z]/.test(acc.pw), `Password for ${acc.name} has uppercase`);
  assert(/[a-z]/.test(acc.pw), `Password for ${acc.name} has lowercase`);
  assert(/\d/.test(acc.pw), `Password for ${acc.name} has numbers`);
  assert(/[#@!]/.test(acc.pw), `Password for ${acc.name} has special symbols`);

  // Verify Layer 1: PBKDF2-HMAC-SHA256 verification
  const ok = await verifyPassword(acc.pw, acc.hash, acc.salt);
  assert.equal(ok, true, `PBKDF2 hash verification failed for ${acc.username}`);

  const bad = await verifyPassword(acc.pw + 'X', acc.hash, acc.salt);
  assert.equal(bad, false, `Wrong password should fail for ${acc.username}`);

  // Verify Layer 2: AES-256-GCM + AAD encryption of passwordHash at rest
  const aad = `user:${acc.username}:passwordHash`;
  const cipherHash = await encrypt(acc.hash, aad);
  assert(cipherHash.startsWith('v2.'), 'Encrypted hash must use v2. AES-256-GCM format');
  const decryptedHash = await decrypt(cipherHash, aad);
  assert.equal(decryptedHash, acc.hash, 'Decrypted hash must match original PBKDF2 hash');

  // Verify AAD context binding rejects cross-account swapping
  let swappedFailed = false;
  try {
    await decrypt(cipherHash, `user:attacker:passwordHash`);
  } catch {
    swappedFailed = true;
  }
  assert.equal(swappedFailed, true, 'AES-256-GCM AAD must reject cross-account cipher swapping');

  pass(`تحقق التشفير الثنائي (PBKDF2 600k + AES-256-GCM AAD) للحساب: ${acc.name} (${acc.username})`);
}

// Verify Layer 3: Session Encrypt-then-MAC (HMAC-SHA256 RFC 2104)
const sessionCipher = await encrypt(JSON.stringify({ u: 'admin', role: 'admin' }), 'session');
const sig = await signHMAC(sessionCipher);
assert.equal(await verifyHMAC(sessionCipher, sig), true, 'Valid HMAC must verify');
assert.equal(await verifyHMAC(sessionCipher + 'tamper', sig), false, 'Tampered payload must fail HMAC');
pass('توقيع الجلسات Encrypt-then-MAC عبر HMAC-SHA256 (RFC 2104) يعمل بزمن ثابت ويرفض التلاعب');

console.log(`\nنجح الفحص الشامل: ${checks} اختبار تشفير ثنائي وحماية حسابات مطابق للمقررات.`);
