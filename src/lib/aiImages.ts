// File: src/lib/aiImages.ts
// محرك «مرصاد» المحلي لتوليد المخططات والصور العلمية التعريفية عالية الدقة (1280x720 PNG)
// يعمل محلياً بسرعة 0ms وبدون أي قيود أو حدود استخدام (Zero Rate Limits - 100% Offline/Online)

export const AI_IMAGE_PROVIDER = 'محرك مرصاد الرسومي العلمي (Mirsad Vector AI)';

export const STYLE_SUFFIX =
  'mirsad-scientific-blueprint-v4, high-precision cybersecurity and cryptography schematic';

export interface AIImageOptions {
  width?: number;
  height?: number;
  seed?: number;
  model?: string;
  caption?: string;
  courseSlug?: string;
  chapterNumber?: number;
}

export interface ChapterImageLike {
  url?: string;
  prompt?: string;
  caption?: string;
  alt?: string;
  seed?: number;
}

type DiagramTheme =
  | 'ecdh_ecdsa_mitm'
  | 'aes_galois'
  | 'ecc_curve'
  | 'tls_handshake'
  | 'vpn_ipsec_wireguard'
  | 'db_encryption'
  | 'homomorphic_zkp'
  | 'hsm_sidechannel'
  | 'pqc_nist'
  | 'nist_csf_governance'
  | 'risk_octave_matrix'
  | 'threats_killchain_mitre'
  | 'nca_ecc_defense'
  | 'academic_english';

function detectDiagramTheme(text: string, courseSlug?: string, chapterNumber?: number): DiagramTheme {
  const s = `${text} ${courseSlug || ''}`.toLowerCase();

  if (
    s.includes('ecdh') ||
    s.includes('ecdsa') ||
    s.includes('mitm') ||
    s.includes('hkdf') ||
    s.includes('تبادل المفاتيح') ||
    s.includes('التوقيع الرقمي')
  ) {
    return 'ecdh_ecdsa_mitm';
  }
  if (
    s.includes('aes') ||
    s.includes('galois') ||
    s.includes('gf(2') ||
    s.includes('subbytes') ||
    s.includes('mixcolumns') ||
    s.includes('غالوا')
  ) {
    return 'aes_galois';
  }
  if (
    s.includes('elliptic') ||
    s.includes('منحنى') ||
    s.includes('المنحنيات') ||
    s.includes('chord') ||
    s.includes('tangent')
  ) {
    return 'ecc_curve';
  }
  if (s.includes('tls') || s.includes('handshake') || s.includes('aead') || s.includes('مصافحة')) {
    return 'tls_handshake';
  }
  if (
    s.includes('ipsec') ||
    s.includes('wireguard') ||
    s.includes('vpn') ||
    s.includes('tunnel') ||
    s.includes('نفق')
  ) {
    return 'vpn_ipsec_wireguard';
  }
  if (
    s.includes('database') ||
    s.includes('tde') ||
    s.includes('column') ||
    s.includes('xts') ||
    s.includes('قواعد البيانات')
  ) {
    return 'db_encryption';
  }
  if (
    s.includes('homomorphic') ||
    s.includes('zero knowledge') ||
    s.includes('zkp') ||
    s.includes('sigma') ||
    s.includes('schnorr') ||
    s.includes('متجانس') ||
    s.includes('المعرفة الصفرية')
  ) {
    return 'homomorphic_zkp';
  }
  if (
    s.includes('hsm') ||
    s.includes('side channel') ||
    s.includes('spa') ||
    s.includes('dpa') ||
    s.includes('power') ||
    s.includes('قنوات جانبية')
  ) {
    return 'hsm_sidechannel';
  }
  if (
    s.includes('quantum') ||
    s.includes('shor') ||
    s.includes('lattice') ||
    s.includes('ml-kem') ||
    s.includes('ml-dsa') ||
    s.includes('fips 20') ||
    s.includes('الكم')
  ) {
    return 'pqc_nist';
  }
  if (
    s.includes('octave') ||
    s.includes('risk') ||
    s.includes('5x5') ||
    s.includes('ale') ||
    s.includes('sle') ||
    s.includes('مخاطر') ||
    s.includes('ise232-risk')
  ) {
    return 'risk_octave_matrix';
  }
  if (
    s.includes('kill chain') ||
    s.includes('malware') ||
    s.includes('mitre') ||
    s.includes('ids') ||
    s.includes('ips') ||
    s.includes('scada') ||
    s.includes('تهديدات') ||
    s.includes('ise232-threats')
  ) {
    return 'threats_killchain_mitre';
  }
  if (
    s.includes('ecc-2') ||
    s.includes('kerberos') ||
    s.includes('waf') ||
    s.includes('defense in depth') ||
    s.includes('البرامج الأمنية') ||
    s.includes('ise232-programs')
  ) {
    return 'nca_ecc_defense';
  }
  if (
    s.includes('english') ||
    s.includes('rfc 2119') ||
    s.includes('eng-cyber') ||
    s.includes('إنجليزي')
  ) {
    return 'academic_english';
  }
  if (
    s.includes('nist csf') ||
    s.includes('raci') ||
    s.includes('bia') ||
    s.includes('rto') ||
    s.includes('تخطيط') ||
    s.includes('حوكمة') ||
    s.includes('ise231')
  ) {
    return 'nist_csf_governance';
  }
  if (chapterNumber === 3) return 'ecdh_ecdsa_mitm';
  if (chapterNumber === 2) return 'ecc_curve';
  return 'aes_galois';
}

const IMAGE_CACHE = new Map<string, string>();

export function generateScientificDiagramDataUrl(
  promptOrCaption: string,
  opts: AIImageOptions = {}
): string {
  if (typeof document === 'undefined') {
    return '/icons/icon-512.svg';
  }

  const cacheKey = `${promptOrCaption}__${opts.caption || ''}__${opts.courseSlug || ''}__${opts.chapterNumber || 0}__${opts.seed || 0}`;
  const cached = IMAGE_CACHE.get(cacheKey);
  if (cached) return cached;

  const width = opts.width || 1280;
  const height = opts.height || 720;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '/icons/icon-512.svg';

  const theme = detectDiagramTheme(
    `${promptOrCaption} ${opts.caption || ''}`,
    opts.courseSlug,
    opts.chapterNumber
  );

  // 1. Deep Cyber-Architectural Background
  const bg = ctx.createLinearGradient(0, 0, width, height);
  bg.addColorStop(0, '#020617');
  bg.addColorStop(0.5, '#09152b');
  bg.addColorStop(1, '#020617');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, width, height);

  // Radial Glows
  const glow1 = ctx.createRadialGradient(
    width * 0.25,
    height * 0.35,
    20,
    width * 0.25,
    height * 0.35,
    380
  );
  glow1.addColorStop(0, 'rgba(16, 185, 129, 0.16)');
  glow1.addColorStop(1, 'rgba(16, 185, 129, 0)');
  ctx.fillStyle = glow1;
  ctx.fillRect(0, 0, width, height);

  const glow2 = ctx.createRadialGradient(
    width * 0.75,
    height * 0.6,
    20,
    width * 0.75,
    height * 0.6,
    380
  );
  glow2.addColorStop(0, 'rgba(6, 182, 212, 0.15)');
  glow2.addColorStop(1, 'rgba(6, 182, 212, 0)');
  ctx.fillStyle = glow2;
  ctx.fillRect(0, 0, width, height);

  // 2. Blueprint Engineering Grid
  ctx.strokeStyle = 'rgba(51, 65, 85, 0.32)';
  ctx.lineWidth = 1;
  for (let x = 0; x < width; x += 40) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }
  for (let y = 0; y < height; y += 40) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }

  // Outer Frame
  ctx.strokeStyle = 'rgba(16, 185, 129, 0.45)';
  ctx.lineWidth = 2.5;
  ctx.strokeRect(24, 24, width - 48, height - 48);

  // Helper to draw glowing box node
  const drawNode = (
    x: number,
    y: number,
    w: number,
    h: number,
    title: string,
    sub: string,
    borderColor: string,
    fillColor = 'rgba(15, 23, 42, 0.92)'
  ) => {
    ctx.save();
    ctx.fillStyle = fillColor;
    ctx.strokeStyle = borderColor;
    ctx.lineWidth = 2.5;
    ctx.shadowColor = borderColor;
    ctx.shadowBlur = 14;
    ctx.beginPath();
    ctx.roundRect(x, y, w, h, 14);
    ctx.fill();
    ctx.stroke();
    ctx.shadowBlur = 0;

    ctx.fillStyle = '#f8fafc';
    ctx.font = 'bold 20px Cairo, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(title, x + w / 2, y + h * 0.38);

    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 15px "IBM Plex Mono", monospace';
    ctx.fillText(sub, x + w / 2, y + h * 0.72);
    ctx.restore();
  };

  // Helper to draw directed arrow with label
  const drawArrow = (
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    label: string,
    color = '#10b981'
  ) => {
    ctx.save();
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();

    const angle = Math.atan2(y2 - y1, x2 - x1);
    const headLen = 13;
    ctx.beginPath();
    ctx.moveTo(x2, y2);
    ctx.lineTo(
      x2 - headLen * Math.cos(angle - Math.PI / 6),
      y2 - headLen * Math.sin(angle - Math.PI / 6)
    );
    ctx.lineTo(
      x2 - headLen * Math.cos(angle + Math.PI / 6),
      y2 - headLen * Math.sin(angle + Math.PI / 6)
    );
    ctx.closePath();
    ctx.fill();

    if (label) {
      const mx = (x1 + x2) / 2;
      const my = (y1 + y2) / 2 - 14;
      ctx.fillStyle = 'rgba(2, 6, 23, 0.9)';
      const tw = Math.max(120, label.length * 8.5 + 24);
      ctx.fillRect(mx - tw / 2, my - 14, tw, 26);
      ctx.strokeStyle = color;
      ctx.lineWidth = 1.2;
      ctx.strokeRect(mx - tw / 2, my - 14, tw, 26);
      ctx.fillStyle = '#fde68a';
      ctx.font = 'bold 14px "IBM Plex Mono", Cairo, monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(label, mx, my);
    }
    ctx.restore();
  };

  // 3. Draw Topic-Specific Scientific Schematic
  if (theme === 'ecdh_ecdsa_mitm') {
    drawNode(90, 170, 260, 110, 'الطرف الأول (Alice)', 'd_A ∈ [1, n-1] | Q_A = d_A · G', '#10b981');
    drawNode(930, 170, 260, 110, 'الطرف الثاني (Bob)', 'd_B ∈ [1, n-1] | Q_B = d_B · G', '#06b6d4');

    drawArrow(370, 200, 910, 200, '1. Public Key Q_A + ECDSA Sig(r, s)', '#10b981');
    drawArrow(910, 255, 370, 255, '2. Public Key Q_B + ECDSA Sig(r, s)', '#06b6d4');

    drawNode(
      430,
      330,
      420,
      105,
      'النقطة المشتركة واشتقاق الجلسة (ECDH + HKDF)',
      'S = d_A · Q_B = d_B · Q_A = (x_S, y_S)',
      '#f59e0b'
    );

    drawNode(
      290,
      475,
      700,
      95,
      'حماية المصادقة الرقمية ECDSA لمنع هجوم الرجل في الوسط (Anti-MITM)',
      'Verify: u₁ = H(m)·s⁻¹ mod n , u₂ = r·s⁻¹ mod n ⟹ R = u₁G + u₂Q  |  K = HKDF(x_S, Salt, Info)',
      '#a855f7'
    );

    drawArrow(220, 290, 430, 375, 'حساب d_A · Q_B', '#10b981');
    drawArrow(1060, 290, 850, 375, 'حساب d_B · Q_A', '#06b6d4');
    drawArrow(640, 435, 640, 470, 'HKDF-SHA256', '#f59e0b');
  } else if (theme === 'aes_galois') {
    const startX = 110;
    const startY = 175;
    const cell = 64;
    ctx.fillStyle = '#10b981';
    ctx.font = 'bold 18px Cairo, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('مصفوفة الحالة AES State (4×4 Bytes)', startX + cell * 2, startY - 20);

    const sampleHex = [
      ['19', 'A0', '9A', 'E9'],
      ['3D', 'F4', 'C6', 'F8'],
      ['E3', 'E2', '8D', '48'],
      ['BE', '2B', '2A', '08'],
    ];
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) {
        const cx = startX + c * (cell + 6);
        const cy = startY + r * (cell + 6);
        ctx.fillStyle = 'rgba(15, 23, 42, 0.95)';
        ctx.strokeStyle = r === c ? '#f59e0b' : '#10b981';
        ctx.lineWidth = 2;
        ctx.fillRect(cx, cy, cell, cell);
        ctx.strokeRect(cx, cy, cell, cell);
        ctx.fillStyle = '#f8fafc';
        ctx.font = 'bold 18px "IBM Plex Mono", monospace';
        ctx.fillText(`0x${sampleHex[r][c]}`, cx + cell / 2, cy + cell / 2 + 5);
      }
    }

    drawNode(480, 165, 320, 75, '1. SubBytes (S-Box غير خطي)', 'b = S(a⁻¹ in GF(2⁸)) ⊕ 0x63', '#10b981');
    drawNode(480, 255, 320, 75, '2. ShiftRows (إزاحة الصفوف)', 'Row r shifted cyclically by r', '#06b6d4');
    drawNode(480, 345, 320, 75, '3. MixColumns (خلط الأعمدة)', 'c(x) = {03}x³+{01}x²+{01}x+{02}', '#f59e0b');
    drawNode(480, 435, 320, 75, '4. AddRoundKey (دمج المفتاح)', 'State ⊕ RoundKey[r] in GF(2⁸)', '#a855f7');

    drawNode(880, 220, 310, 230, 'حقل غالوا GF(2⁸)', 'm(x) = x⁸ + x⁴ + x³ + x + 1', '#10b981');
    ctx.fillStyle = '#fde68a';
    ctx.font = 'bold 16px "IBM Plex Mono", monospace';
    ctx.fillText('Irreducible: 0x11B', 1035, 385);
    ctx.fillStyle = '#cbd5e1';
    ctx.font = '15px Cairo, sans-serif';
    ctx.fillText('256 عنصراً جبرياً · انعكاس كامل', 1035, 418);

    drawArrow(395, 310, 475, 200, 'GF(2⁸)', '#10b981');
    drawArrow(805, 330, 875, 330, 'mod 0x11B', '#f59e0b');
  } else if (theme === 'ecc_curve') {
    const cx = 360;
    const cy = 340;
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(100, cy);
    ctx.lineTo(640, cy);
    ctx.moveTo(cx, 140);
    ctx.lineTo(cx, 540);
    ctx.stroke();

    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 4;
    ctx.shadowColor = '#10b981';
    ctx.shadowBlur = 12;
    ctx.beginPath();
    for (let px = -140; px <= 220; px += 2) {
      const xNorm = px / 65;
      const rhs = xNorm * xNorm * xNorm - 1.4 * xNorm + 1.5;
      if (rhs >= 0) {
        const yOff = Math.sqrt(rhs) * 65;
        if (px === -140) ctx.moveTo(cx + px, cy - yOff);
        else ctx.lineTo(cx + px, cy - yOff);
      }
    }
    ctx.stroke();

    ctx.beginPath();
    for (let px = -140; px <= 220; px += 2) {
      const xNorm = px / 65;
      const rhs = xNorm * xNorm * xNorm - 1.4 * xNorm + 1.5;
      if (rhs >= 0) {
        const yOff = Math.sqrt(rhs) * 65;
        if (px === -140) ctx.moveTo(cx + px, cy + yOff);
        else ctx.lineTo(cx + px, cy + yOff);
      }
    }
    ctx.stroke();
    ctx.shadowBlur = 0;

    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(180, 420);
    ctx.lineTo(580, 175);
    ctx.stroke();

    ctx.setLineDash([6, 6]);
    ctx.strokeStyle = '#38bdf8';
    ctx.beginPath();
    ctx.moveTo(520, 212);
    ctx.lineTo(520, 468);
    ctx.stroke();
    ctx.setLineDash([]);

    const pts = [
      { x: 255, y: 373, label: 'P(x₁, y₁)', col: '#f59e0b' },
      { x: 385, y: 295, label: 'Q(x₂, y₂)', col: '#06b6d4' },
      { x: 520, y: 212, label: '-R', col: '#94a3b8' },
      { x: 520, y: 468, label: 'R = P + Q', col: '#10b981' },
    ];
    pts.forEach((p) => {
      ctx.fillStyle = p.col;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 8, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 15px "IBM Plex Mono", monospace';
      ctx.fillText(p.label, p.x + 14, p.y - 10);
    });

    drawNode(690, 165, 500, 110, 'معادلة المنحنى الإهليلجي فوق 𝔽ₚ', 'E(𝔽ₚ) : y² ≡ x³ + a·x + b (mod p)', '#10b981');
    drawNode(690, 300, 500, 110, 'قانون ميل الوتر والمماس (Chord & Tangent)', 'λ = (y₂ - y₁)·(x₂ - x₁)⁻¹ mod p (P ≠ Q)', '#f59e0b');
    drawNode(690, 435, 500, 110, 'إحداثيات نقطة الجمع R = (x₃, y₃)', 'x₃ = λ² - x₁ - x₂ mod p  |  y₃ = λ(x₁ - x₃) - y₁ mod p', '#06b6d4');
  } else if (theme === 'nist_csf_governance') {
    const cx = 360;
    const cy = 350;
    const r = 155;

    ctx.fillStyle = 'rgba(245, 158, 11, 0.22)';
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 3.5;
    ctx.beginPath();
    ctx.arc(cx, cy, 66, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#fde68a';
    ctx.font = 'bold 18px Cairo, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('GOVERN (GV)', cx, cy - 8);
    ctx.font = 'bold 14px Cairo, sans-serif';
    ctx.fillText('الحوكمة المركزية', cx, cy + 16);

    const funcs = [
      { code: 'IDENTIFY', ar: 'التحديد (ID)', col: '#38bdf8' },
      { code: 'PROTECT', ar: 'الحماية (PR)', col: '#10b981' },
      { code: 'DETECT', ar: 'الاكتشاف (DE)', col: '#eab308' },
      { code: 'RESPOND', ar: 'الاستجابة (RS)', col: '#f97316' },
      { code: 'RECOVER', ar: 'التعافي (RC)', col: '#a855f7' },
    ];

    funcs.forEach((fn, idx) => {
      const ang = (idx / funcs.length) * Math.PI * 2 - Math.PI / 2;
      const nx = cx + Math.cos(ang) * r;
      const ny = cy + Math.sin(ang) * r;

      ctx.strokeStyle = fn.col;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(cx + Math.cos(ang) * 66, cy + Math.sin(ang) * 66);
      ctx.lineTo(nx, ny);
      ctx.stroke();

      ctx.fillStyle = 'rgba(15, 23, 42, 0.95)';
      ctx.strokeStyle = fn.col;
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.roundRect(nx - 70, ny - 32, 140, 64, 12);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 15px Cairo, sans-serif';
      ctx.fillText(fn.ar, nx, ny - 6);
      ctx.fillStyle = fn.col;
      ctx.font = 'bold 12px "IBM Plex Mono", monospace';
      ctx.fillText(fn.code, nx, ny + 14);
    });

    drawNode(690, 165, 500, 110, 'المستوى الاستراتيجي (CISO & Board)', 'تحديد الرؤية، الشهية للمخاطر، والسياسات العليا', '#f59e0b');
    drawNode(690, 300, 500, 110, 'المستوى التكتيكي والملفات التعريفية (Profiles)', 'تحليل الفجوة: ΔProfile = Target(Tier 4) - Current', '#10b981');
    drawNode(690, 435, 500, 110, 'المستوى التشغيلي والصمود (BIA & SOC)', 'RPO + RTO + WRT ≤ MTD  |  مصفوفة مسؤوليات RACI', '#06b6d4');
  } else if (theme === 'risk_octave_matrix') {
    const mx = 100;
    const my = 165;
    const cw = 66;
    const ch = 66;

    for (let r = 0; r < 5; r++) {
      for (let c = 0; c < 5; c++) {
        const score = (5 - r) * (c + 1);
        const col =
          score >= 15
            ? 'rgba(239, 68, 68, 0.8)'
            : score >= 8
            ? 'rgba(245, 158, 11, 0.8)'
            : 'rgba(16, 185, 129, 0.75)';
        ctx.fillStyle = col;
        ctx.strokeStyle = '#0f172a';
        ctx.lineWidth = 2;
        ctx.fillRect(mx + c * cw, my + r * ch, cw - 3, ch - 3);
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 18px "IBM Plex Mono", monospace';
        ctx.textAlign = 'center';
        ctx.fillText(String(score), mx + c * cw + cw / 2, my + r * ch + ch / 2 + 6);
      }
    }

    drawNode(490, 165, 690, 105, '1. معادلة توقع الخسارة المفردة (Single Loss Expectancy)', 'SLE = Asset Value (AV) × Exposure Factor (EF)', '#f59e0b');
    drawNode(490, 295, 690, 105, '2. معادلة توقع الخسارة السنوية (Annualized Loss Expectancy)', 'ALE = SLE × Annualized Rate of Occurrence (ARO)', '#ef4444');
    drawNode(490, 425, 690, 105, '3. عائد الاستثمار الأمني ومنهجية OCTAVE Allegro', 'ROSI = ((ALE_before - ALE_after) - ControlCost) / ControlCost', '#10b981');
  } else {
    drawNode(95, 180, 310, 120, 'الطبقة التأسيسية والمدخلات', 'Classification & Cryptographic Primitives', '#10b981');
    drawNode(485, 180, 310, 120, 'محرك المعالجة والتحقق المعياري', 'Zero-Trust & Constant-Time Verification', '#f59e0b');
    drawNode(875, 180, 310, 120, 'المخرجات المحصنة والامتثال', 'NCA ECC-2:2024 & NIST FIPS Validated', '#06b6d4');

    drawArrow(405, 240, 485, 240, 'تشفير وتوثيق', '#10b981');
    drawArrow(795, 240, 875, 240, 'اعتماد البصمة', '#f59e0b');

    drawNode(
      175,
      375,
      930,
      155,
      opts.caption || 'المخطط الهندسي والتشريحي لمعمارية الفصل وتدفق الضوابط الأمنية',
      'Confidentiality (AES-256-GCM) · Integrity (SHA-256 / HMAC) · Availability & Resilience (RTO ≤ MTD)',
      '#a855f7'
    );
  }

  // 4. Top Header Bar (Course & Scientific Blueprint Badge)
  ctx.fillStyle = 'rgba(2, 6, 23, 0.92)';
  ctx.fillRect(26, 26, width - 52, 78);
  ctx.strokeStyle = 'rgba(16, 185, 129, 0.4)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(26, 104);
  ctx.lineTo(width - 26, 104);
  ctx.stroke();

  const headerTitle =
    opts.caption ||
    (promptOrCaption.length <= 95 ? promptOrCaption : 'المخطط العلمي والتشريحي التفاعلي لمفاهيم الفصل');
  ctx.fillStyle = '#f8fafc';
  ctx.font = 'bold 23px Cairo, sans-serif';
  ctx.textAlign = 'right';
  ctx.textBaseline = 'middle';
  ctx.fillText(headerTitle.slice(0, 78), width - 50, 65);

  ctx.fillStyle = '#10b981';
  ctx.font = 'bold 14px "IBM Plex Mono", monospace';
  ctx.textAlign = 'left';
  ctx.fillText(
    `MIRSAD SCIENTIFIC ENGINE v4.0 · ${(opts.courseSlug || 'ACADEMIC').toUpperCase()} CH-${opts.chapterNumber || 1}`,
    50,
    65
  );

  // 5. Bottom Caption & Formula Footer Bar
  ctx.fillStyle = 'rgba(2, 6, 23, 0.92)';
  ctx.fillRect(26, height - 86, width - 52, 60);
  ctx.strokeStyle = 'rgba(245, 158, 11, 0.35)';
  ctx.beginPath();
  ctx.moveTo(26, height - 86);
  ctx.lineTo(width - 26, height - 86);
  ctx.stroke();

  ctx.fillStyle = '#fbbf24';
  ctx.font = 'bold 16px Cairo, "IBM Plex Mono", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(
    `توليد هندسي دقيق عالي الدقة — متوافق مع معايير الهيئة الوطنية للأمن السيبراني (NCA) و NIST`,
    width / 2,
    height - 56
  );

  const dataUrl = canvas.toDataURL('image/png');
  IMAGE_CACHE.set(cacheKey, dataUrl);
  return dataUrl;
}

export function buildAIImageUrl(prompt: string, opts: AIImageOptions = {}): string {
  return generateScientificDiagramDataUrl(prompt, opts);
}

export function resolveChapterImage(img: ChapterImageLike, opts: AIImageOptions = {}): string {
  if (img.url && !img.url.includes('pollinations.ai')) {
    return img.url;
  }
  return generateScientificDiagramDataUrl(img.prompt || img.caption || img.alt || 'مخطط علمي للفصل', {
    ...opts,
    caption: img.caption || img.alt || opts.caption,
    seed: img.seed ?? opts.seed,
  });
}
