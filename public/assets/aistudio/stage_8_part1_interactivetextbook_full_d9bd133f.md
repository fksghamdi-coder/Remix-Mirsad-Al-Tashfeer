# المرحلة الثامنة (الجزء 1 المستقل): الكود الكامل لملف الكتاب التفاعلي ثلاثي الأبعاد
**المسار في المشروع:** `src/components/academic/InteractiveTextbook.tsx`

انسخ الكود التالي بالكامل واستبدل به محتوى ملف `src/components/academic/InteractiveTextbook.tsx`:

```tsx
// File: src/components/academic/InteractiveTextbook.tsx
import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Zap,
  Play,
  Pause,
  RotateCcw,
  Cpu,
  Layers,
  Trophy,
  Sliders,
  Code,
  Maximize2,
  Minimize2,
  CheckCircle2,
  AlertTriangle,
  Table as TableIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { safeInlineFormat } from '@/lib/markdown.sanitized';
import ChapterDiagram from '@/components/ui/ChapterDiagram';
import LiveCodeFloatingStudio from './LiveCodeFloatingStudio';
import type { Chapter } from '@/lib/chapters';

interface Props {
  chapter: Chapter;
  courseTitle: string;
  courseSlug?: string;
  onClose?: () => void;
}

type Model3DKind =
  | 'galois_tesseract'
  | 'elliptic_torus'
  | 'lattice_crystal'
  | 'database_lattice_3d'
  | 'vpn_tunnel_mesh'
  | 'nist_gyroscope'
  | 'risk_cube_5x5'
  | 'killchain_helix'
  | 'killchain_spiral'
  | 'defense_fortress'
  | 'nca_defense_citadel';

interface Vec3 {
  x: number;
  y: number;
  z: number;
}

interface HotspotNode3D {
  id: string;
  label: string;
  symbol: string;
  pos: Vec3;
  color: string;
  formula: string;
  explanation: string;
  securityImpact: string;
}

interface StepWalkthroughItem {
  step: number;
  title: string;
  symbol: string;
  formula: string;
  detail: string;
}

interface NormalizedPage3D {
  pageNumber: number;
  title: string;
  subtitle: string;
  narrative: string;
  equation: string;
  visualNotes: string[];
}

interface LiveFormulaSimulator {
  title: string;
  symbolicEquation: string;
  paramALabel: string;
  paramAMin: number;
  paramAMax: number;
  paramADefault: number;
  paramBLabel: string;
  paramBMin: number;
  paramBMax: number;
  paramBDefault: number;
  compute: (a: number, b: number) => {
    primaryOutput: string;
    secondaryOutput: string;
    traceSteps: string[];
  };
}

interface ChapterScientificProfile {
  modelKind: Model3DKind;
  modelTitleAr: string;
  modelSubtitleEn: string;
  geometricSymbols: { symbol: string; name: string; meaning: string }[];
  hotspots: HotspotNode3D[];
  steps: StepWalkthroughItem[];
  pages3D: NormalizedPage3D[];
  formulaSim: LiveFormulaSimulator;
  codeLang: string;
  codeTitle: string;
  codeSnippet: string;
  executeCodeLive: (a: number, b: number) => string[];
}

// ─── GF(2^8) Multiplication Helper for Real Crypto Calculations ───
function gf256Mul(a: number, b: number): number {
  let p = 0;
  let aa = a & 0xff;
  let bb = b & 0xff;
  for (let i = 0; i < 8; i++) {
    if (bb & 1) p ^= aa;
    const hiBit = aa & 0x80;
    aa = (aa << 1) & 0xff;
    if (hiBit) aa ^= 0x1b;
    bb >>= 1;
  }
  return p & 0xff;
}

const DEFAULT_HOTSPOT_POSITIONS: Vec3[] = [
  { x: -1.05, y: 0.85, z: 0.55 },
  { x: 1.05, y: 0.65, z: 0.45 },
  { x: -0.85, y: -0.85, z: 0.55 },
  { x: 0.95, y: -0.75, z: -0.45 },
];

const DEFAULT_HOTSPOT_COLORS = ['#10b981', '#06b6d4', '#f59e0b', '#a855f7'];

function mapModel3DTypeToKind(rawType: string, fallback: Model3DKind): Model3DKind {
  const t = (rawType || '').toLowerCase();
  if (t.includes('torus') || t.includes('curve') || t.includes('weierstrass') || t.includes('ecc')) {
    return 'elliptic_torus';
  }
  if (t.includes('wheel') || t.includes('gyro') || t.includes('csf') || t.includes('sphere') || t.includes('resonator')) {
    return 'nist_gyroscope';
  }
  if (t.includes('pyramid') || t.includes('hierarchy') || t.includes('database') || t.includes('dek')) {
    return 'database_lattice_3d';
  }
  if (t.includes('tunnel') || t.includes('capsule') || t.includes('bridge') || t.includes('chain') || t.includes('helix')) {
    return 'vpn_tunnel_mesh';
  }
  if (t.includes('matrix') || t.includes('cube') || t.includes('octave') || t.includes('5x5')) {
    return 'galois_tesseract';
  }
  if (t.includes('lattice') || t.includes('prism') || t.includes('crystal')) {
    return 'lattice_crystal';
  }
  return fallback;
}

/**
 * استخراج وتوحيد بيانات interactiveBook3D الفعلية الخاصة بكل فصل من الفصول الـ 64
 * لضمان عدم تكرار النقاط الساخنة أو الخطوات أو الصفحات بين فصول المقرر الواحد
 */
function enrichProfileWithChapterBook3D(
  baseProfile: Omit<ChapterScientificProfile, 'pages3D'>,
  chapter: Chapter
): ChapterScientificProfile {
  const rawBook = (chapter.interactiveBook3D || {}) as Record<string, unknown>;

  const rawPages = Array.isArray(rawBook.pages3D)
    ? (rawBook.pages3D as Record<string, unknown>[])
    : [];

  const pages3D: NormalizedPage3D[] = rawPages.map((p, idx) => {
    const title = String(
      p.title || p.titleAr || p.heading || `الصفحة التفاعلية ${idx + 1} — ${chapter.title}`
    );
    const subtitle = String(
      p.subtitle || p.titleEn || p.badge || p.ncaControlBadge || p.type || `الفصل ${chapter.chapter_number}`
    );
    const frontBack = [p.frontContent, p.backContent].filter(Boolean).join('\n\n');
    const narrative = String(
      p.narrative ||
        p.summary ||
        p.summaryMarkdown ||
        p.contentMarkdown ||
        frontBack ||
        p.bilingualSummaryAr ||
        chapter.description ||
        ''
    );
    const equation = String(
      p.equation ||
        p.codeOrFormula ||
        p.interactiveFormula ||
        p.highlightedRuleOrFormula ||
        p.englishExcerpt ||
        baseProfile.formulaSim.symbolicEquation
    );

    const notes: string[] = [];
    if (Array.isArray(p.visualNotes)) {
      p.visualNotes.forEach((n) => notes.push(String(n)));
    }
    if (Array.isArray(p.keyTakeaways)) {
      p.keyTakeaways.forEach((n) => notes.push(String(n)));
    }
    if (p.interactiveTakeaway) notes.push(String(p.interactiveTakeaway));
    if (p.keyTakeaway) notes.push(String(p.keyTakeaway));
    if (p.interactivePrompt) notes.push(String(p.interactivePrompt));
    if (p.phoneticGuide) notes.push(`النطق الصوتي (IPA): ${String(p.phoneticGuide)}`);
    if (p.grammarOrStyleTip) notes.push(`قاعدة الصياغة الأكاديمية: ${String(p.grammarOrStyleTip)}`);

    return {
      pageNumber: Number(p.pageNumber || idx + 1),
      title,
      subtitle,
      narrative,
      equation,
      visualNotes: notes,
    };
  });

  const rawHotspots = Array.isArray(rawBook.hotspots)
    ? (rawBook.hotspots as Record<string, unknown>[])
    : [];

  const hotspots: HotspotNode3D[] =
    rawHotspots.length > 0
      ? rawHotspots.map((h, idx) => {
          const coords = (h.coordinates || h.pos || h.position) as Record<string, number> | number[] | undefined;
          let pos: Vec3 = DEFAULT_HOTSPOT_POSITIONS[idx % DEFAULT_HOTSPOT_POSITIONS.length];
          if (Array.isArray(coords) && coords.length >= 3) {
            pos = {
              x: Math.max(-1.25, Math.min(1.25, Number(coords[0]) * 0.65)),
              y: Math.max(-1.15, Math.min(1.15, Number(coords[1]) * 0.65)),
              z: Math.max(-1.15, Math.min(1.15, Number(coords[2]) * 0.65)),
            };
          } else if (coords && typeof coords === 'object' && 'x' in coords) {
            pos = {
              x: Math.max(-1.25, Math.min(1.25, Number(coords.x) * 0.65)),
              y: Math.max(-1.15, Math.min(1.15, Number(coords.y) * 0.65)),
              z: Math.max(-1.15, Math.min(1.15, Number(coords.z) * 0.65)),
            };
          }

          const rawLabel = String(h.label || h.labelAr || h.title || h.titleAr || `مكون ${idx + 1}`);
          const shortSymbol = String(
            h.symbol ||
              h.ncaReference ||
              h.badge ||
              rawLabel.split(/[:(—-]/)[0].trim().slice(0, 18) ||
              `NODE-${idx + 1}`
          );

          return {
            id: String(h.id || `ch-${chapter.id}-hs-${idx + 1}`),
            label: String(h.title || h.titleAr || rawLabel),
            symbol: shortSymbol,
            pos,
            color: String(h.color || DEFAULT_HOTSPOT_COLORS[idx % DEFAULT_HOTSPOT_COLORS.length]),
            formula: String(
              h.relatedEquation ||
                h.formula ||
                h.ncaReference ||
                pages3D[idx % Math.max(1, pages3D.length)]?.equation ||
                baseProfile.hotspots[idx % Math.max(1, baseProfile.hotspots.length)]?.formula ||
                baseProfile.formulaSim.symbolicEquation
            ),
            explanation: String(
              h.detailedExplanation ||
                h.explanation ||
                h.description ||
                h.descriptionAr ||
                rawLabel
            ),
            securityImpact: String(
              h.securityImpact ||
                h.impact ||
                h.architecturalRole ||
                `عنصر حاكم في معمارية «${chapter.title}» لضمان السرية والتكامل والامتثال القياسي.`
            ),
          };
        })
      : baseProfile.hotspots;

  const rawSteps = Array.isArray(rawBook.stepByStep)
    ? (rawBook.stepByStep as Record<string, unknown>[])
    : [];

  const steps: StepWalkthroughItem[] =
    rawSteps.length > 0
      ? rawSteps.map((st, idx) => {
          const stepNum = Number(st.step || st.stepNumber || idx + 1);
          const title = String(st.title || st.titleAr || `الخطوة ${stepNum}`);
          const symbol = String(
            st.symbol ||
              st.outputMetric ||
              st.ncaControlBadge ||
              `STEP 0${stepNum}`
          );
          const formula = String(
            st.formula ||
              st.technicalDetail ||
              st.action ||
              st.expectedOutcome ||
              pages3D[idx % Math.max(1, pages3D.length)]?.equation ||
              baseProfile.steps[idx % Math.max(1, baseProfile.steps.length)]?.formula ||
              `Step_${stepNum}(${chapter.chapter_number})`
          );
          const desc = String(st.description || st.descriptionAr || st.detail || '');
          const extraNote = String(st.securityNote || st.impact || st.visualState || '');
          return {
            step: stepNum,
            title,
            symbol: symbol.slice(0, 22),
            formula,
            detail: extraNote && !desc.includes(extraNote) ? `${desc} — ${extraNote}` : desc,
          };
        })
      : baseProfile.steps;

  const modelTitleAr = String(
    rawBook.sceneTitle ||
      rawBook.bookTitleAr ||
      `المجسم الهندسي التفاعلي للفصل ${chapter.chapter_number}: ${chapter.title}`
  );
  const modelSubtitleEn = String(
    rawBook.bookTitleEn ||
      rawBook.model3DType ||
      baseProfile.modelSubtitleEn
  );
  const modelKind = mapModel3DTypeToKind(String(rawBook.model3DType || ''), baseProfile.modelKind);

  const geometricSymbols =
    hotspots.length >= 3
      ? hotspots.slice(0, 4).map((h) => ({
          symbol: h.symbol,
          name: h.label.slice(0, 32),
          meaning: h.explanation.slice(0, 90),
        }))
      : baseProfile.geometricSymbols;

  return {
    ...baseProfile,
    modelKind,
    modelTitleAr,
    modelSubtitleEn,
    geometricSymbols,
    hotspots,
    steps,
    pages3D,
  };
}

function buildBaseScientificProfile(
  chapter: Chapter,
  courseTitle: string,
  courseSlug?: string
): Omit<ChapterScientificProfile, 'pages3D'> {
  const slug = (courseSlug || '').toLowerCase();
  const title = (chapter.title || '').toLowerCase();
  const chNum = chapter.chapter_number || 1;
  const topics = chapter.keyTopics?.length
    ? chapter.keyTopics
    : [
        'النمذجة الرياضية والتشفيرية للفصل',
        'الهيكل الهندسي وتدفق البيانات الآمن',
        'الضوابط المعيارية والتحقق العملي',
        'التطبيق المؤسسي وحماية الأصول',
      ];

  const isCryptoCourse =
    slug === 'ise243' ||
    slug.includes('243') ||
    courseTitle.includes('243') ||
    courseTitle.includes('التشفير المتقدم') ||
    (!slug.includes('231') &&
      !slug.includes('risk') &&
      !slug.includes('upmn') &&
      !slug.includes('threat') &&
      !slug.includes('program') &&
      !slug.includes('elm') &&
      !slug.includes('eng') &&
      chapter.id < 100);

  if (isCryptoCourse) {
    if (chNum === 6 || title.includes('قواعد البيانات') || title.includes('database')) {
      return {
        modelKind: 'database_lattice_3d',
        modelTitleAr: `المجسم الهرمي لتشفير قواعد البيانات وحماية البيانات الساكنة — ${chapter.title}`,
        modelSubtitleEn: `3D Multi-Layer Database Encryption, XTS-AES Storage & Key Hierarchy (Chapter 6)`,
        geometricSymbols: [
          {
            symbol: 'C = AES_XTS(K₁, K₂, Sector, T)',
            name: 'تشفير القرص الكامل (XTS-AES Storage Mode)',
            meaning: 'تشفير القطاعات الفيزيائية باستخدام مفتاحي تشفير وتعديل قطاعي Tweak لمنع هجمات التكرار',
          },
          {
            symbol: 'IV = HMAC(DEK_v, Row_ID)',
            name: 'اشتقاق متجهات التهيئة على مستوى السجل',
            meaning: 'توليد متجه فريد غير مكرر لكل صف في الجدول لمنع تماثل النصوص المشفرة',
          },
          {
            symbol: 'MK ➔ KEK ➔ DEK',
            name: 'هرمية مفاتيح التشفير الثلاثية (Key Wrapping Hierarchy)',
            meaning: 'حماية مفاتيح البيانات داخل HSM وعدم تخزين أي مفتاح نصي في قاعدة البيانات',
          },
          {
            symbol: 'Blind_Index = HMAC(K_idx, Normalized_Val)',
            name: 'الفهرس الأعمى للبحث السريع',
            meaning: 'إتاحة البحث والاستعلام الدقيق دون فك تشفير العمود بالكامل',
          },
        ],
        hotspots: [
          {
            id: 'hs-db-fde',
            label: 'طبقة تشفير القرص الكامل (Full Disk Encryption — XTS-AES)',
            symbol: 'XTS-AES 256',
            pos: { x: 0, y: -1.0, z: 0.6 },
            color: '#38bdf8',
            formula: 'C = E_K1(P ⊕ T) ⊕ T  where  T = E_K2(SectorNumber) ⊗ αʲ',
            explanation: 'تحمي القطاعات التخزينية المادية من السرقة الفيزيائية أو نسخ صور الأقراص الخام.',
            securityImpact: 'تمنع استخراج البيانات من وحدات NVMe/SSD المصادرة.',
          },
          {
            id: 'hs-db-tde',
            label: 'محرك التشفير الشفاف لقواعد البيانات (TDE)',
            symbol: 'TDE Engine',
            pos: { x: 1.1, y: 0.2, z: 0.4 },
            color: '#10b981',
            formula: 'FilesEncrypted = {MDF, LDF, NDF, TempDB, BackupArchives}',
            explanation: 'يشفر ملفات الجداول والنسخ الاحتياطية تلقائياً في حالة السكون مع فك التشفير اللحظي في الذاكرة.',
            securityImpact: 'يمنع تسريب النسخ الاحتياطية المسروقة (Backup Leaks).',
          },
          {
            id: 'hs-db-column',
            label: 'التشفير على مستوى العمود والتطبيق (Column-Level AEAD)',
            symbol: 'Column AEAD',
            pos: { x: -1.1, y: 0.3, z: 0.5 },
            color: '#f59e0b',
            formula: 'C_cell = AES_GCM_Encrypt(DEK, IV, CellValue, AAD=RowID)',
            explanation: 'يعزل البيانات فائقة الحساسية بحيث لا يستطيع مدير القاعدة (DBA) قراءتها.',
            securityImpact: 'يمنع هجمات الاحتيال الداخلي (Insider Threats).',
          },
          {
            id: 'hs-db-kms',
            label: 'وحدة إدارة المفاتيح وهرمية التغليف (HSM & Key Wrapping)',
            symbol: 'MK ➔ DEK',
            pos: { x: 0, y: 1.1, z: -0.5 },
            color: '#a855f7',
            formula: 'WrappedDEK = AES_KW(KEK, DEK)  |  KEK = EnvelopedBy(MasterKey_HSM)',
            explanation: 'تفصل مفاتيح التشفير عن خادم البيانات وتتيح التدوير الآمن للمفاتيح.',
            securityImpact: 'يحقق متطلبات NCA ECC-2:2024 بعدم جمع البيانات المشفرة ومفاتيحها في خادم واحد.',
          },
        ],
        steps: [
          {
            step: 1,
            title: 'تصنيف الأعمدة الحساسة وتحديد طبقة التشفير',
            symbol: 'SCHEMA AUDIT',
            formula: 'Classify(Column) ∈ {Public, Internal, Confidential_TDE, Secret_Column_AEAD}',
            detail: 'تحديد الحقول الحرجة التي تتطلب تشفيراً على مستوى العمود بفهرس أعمى.',
          },
          {
            step: 2,
            title: 'توليد وتغليف مفتاح تشفير البيانات داخل HSM',
            symbol: 'KEY WRAPPING',
            formula: 'DEK = CSPRNG(256-bit)  ➔  Store(AES_KW(KEK_HSM, DEK))',
            detail: 'إنشاء مفتاح عشوائي 256-بت وتغليفه بواسطة KEK داخل وحدة HSM.',
          },
          {
            step: 3,
            title: 'اشتقاق متجه التهيئة الفريد لكل سجل وتنفيذ التشفير الموثق',
            symbol: 'ROW IV & AEAD',
            formula: 'IV_row = Trunc96(HMAC_SHA256(DEK_iv, RowID || Version))',
            detail: 'توليد IV فريد لكل صف وتنفيذ تشفير AES-256-GCM مع ربط معرف الصف.',
          },
          {
            step: 4,
            title: 'بناء الفهرس الأعمى للاستعلام دون كشف النص',
            symbol: 'BLIND INDEX',
            formula: 'WHERE nat_id_bidx = HMAC_SHA256(K_index, Input_NatID)',
            detail: 'حساب بصمة HMAC البحثية لتمكين استعلامات المساواة السريعة.',
          },
        ],
        formulaSim: {
          title: 'محاكي تشفير خلايا قاعدة البيانات واشتقاق IV والفهرس الأعمى',
          symbolicEquation: 'IV = HMAC(K_v, RowID)  |  C = P ⊕ Stream(DEK, IV)  |  BlindIdx = HMAC(K_idx, P)',
          paramALabel: 'رقم السجل في الجدول (Row ID)',
          paramAMin: 1,
          paramAMax: 500,
          paramADefault: 104,
          paramBLabel: 'إصدار مفتاح التشفير (DEK Version)',
          paramBMin: 1,
          paramBMax: 10,
          paramBDefault: 2,
          compute: (rowId, dekVer) => {
            const ivByte0 = gf256Mul((rowId * 37) & 0xff, (dekVer * 73 + 0x5a) & 0xff);
            const ivByte1 = ((rowId * 19) ^ (dekVer * 0x4b) ^ 0xa3) & 0xff;
            const ivHex = `0x${ivByte0.toString(16).padStart(2, '0').toUpperCase()}${ivByte1.toString(16).padStart(2, '0').toUpperCase()}`;
            const cipherSample = ((ivByte0 ^ 0x4d) << 8) | (ivByte1 ^ 0x79);
            const blindIdx = ((rowId * 251 + dekVer * 97) ^ 0x7f3a) & 0xffff;
            return {
              primaryOutput: `IV(Row #${rowId}, v${dekVer}) = ${ivHex}  ➔  CipherCell = 0x${cipherSample.toString(16).padStart(4, '0').toUpperCase()}`,
              secondaryOutput: `Blind_Index_HMAC = 0x${blindIdx.toString(16).padStart(4, '0').toUpperCase()} (يسمح بالبحث بـ WHERE دون فك التشفير)`,
              traceSteps: [
                `1. اشتقاق متجه السجل رقم (${rowId}) بإصدار المفتاح (v${dekVer}) ➔ IV = ${ivHex}.`,
                `2. تشفير القيمة الحساسة بـ AES-256-GCM ➔ 0x${cipherSample.toString(16).padStart(4, '0').toUpperCase()}.`,
                `3. توليد الفهرس الأعمى المفصول: Blind_Index = 0x${blindIdx.toString(16).padStart(4, '0').toUpperCase()}.`,
              ],
            };
          },
        },
        codeLang: 'typescript',
        codeTitle: 'كود التشفير على مستوى العمود مع اشتقاق IV والفهرس الأعمى',
        codeSnippet: `export function encryptDatabaseCell(rowId: number, dekVersion: number, secretValue: number) {
  const iv = ((rowId * 0x45d9f3b) ^ (dekVersion * 0x119de1f3)) >>> 0;
  const keystream = ((iv * 0x27d4eb2d) ^ 0x9e3779b9) >>> 0;
  const ciphertext = (secretValue ^ keystream) >>> 0;
  return { rowId, dekVersion, ivHex: iv.toString(16), ciphertextHex: ciphertext.toString(16) };
}`,
        executeCodeLive: (rowId, dekVer) => [
          `[DB-CRYPTO] Encrypting Row #${rowId} with DEK_v${dekVer}...`,
          `[SUCCESS] Row encrypted & Blind Index generated.`,
        ],
      };
    }

    return {
      modelKind: chNum === 2 || chNum === 3 ? 'elliptic_torus' : chNum >= 11 ? 'lattice_crystal' : 'galois_tesseract',
      modelTitleAr: `المجسم الرياضي ثلاثي الأبعاد — الفصل ${chNum}: ${chapter.title}`,
      modelSubtitleEn: `3D Cryptographic Architecture (ISE 243 · Chapter ${chNum})`,
      geometricSymbols: [
        {
          symbol: chNum === 2 || chNum === 3 ? 'y² ≡ x³ + ax + b (mod p)' : chNum >= 11 ? 'b = A·s + e (mod q)' : 'GF(2⁸) / P(x)=0x11B',
          name: `البنية الرياضية للفصل ${chNum}`,
          meaning: chapter.description.slice(0, 85),
        },
        {
          symbol: topics[0]?.slice(0, 24) || 'Crypto Primitive',
          name: 'المحور الأول',
          meaning: topics[0] || '',
        },
      ],
      hotspots: [
        {
          id: `hs-243-${chNum}-1`,
          label: topics[0] || `النواة الجبرية للفصل ${chNum}`,
          symbol: `CH${chNum}-CORE`,
          pos: { x: -1.0, y: 0.85, z: 0.6 },
          color: '#10b981',
          formula: chNum === 2 || chNum === 3 ? 'Q = d · G  over  E(F_p)' : chNum >= 11 ? 'b = A · s + e (mod 3329)' : 'P(x) = x⁸ + x⁴ + x³ + x + 1',
          explanation: topics[0] || chapter.description,
          securityImpact: 'تأمين العمليات التشفيرية ضد الهجمات التحليلية والرياضية.',
        },
        {
          id: `hs-243-${chNum}-2`,
          label: topics[1] || `التحويل الخوارزمي للفصل ${chNum}`,
          symbol: `CH${chNum}-TRANSFORM`,
          pos: { x: 1.0, y: 0.65, z: 0.5 },
          color: '#06b6d4',
          formula: topics[1] || 'C = E(K, P)',
          explanation: topics[1] || chapter.description,
          securityImpact: 'تحقيق اللاخطية والانتشار الكامل للبتات.',
        },
      ],
      steps: (chapter.keyTopics || topics).slice(0, 4).map((t, i) => ({
        step: i + 1,
        title: t,
        symbol: `STEP 0${i + 1}`,
        formula: `Stage_${i + 1}(Chapter_${chNum})`,
        detail: `تطبيق المرحلة ${i + 1} من مراحل «${chapter.title}» وفق المعايير القياسية.`,
      })),
      formulaSim: {
        title: `محاكي الحسابات التشفيرية الحية — الفصل ${chNum} (${chapter.title})`,
        symbolicEquation:
          chNum === 2 || chNum === 3
            ? 'Q = k · G (mod p)   |   ECDH: S = d_A · (d_B · G)'
            : chNum >= 11
            ? 'Module-LWE: b = (A · s + e) mod 3329'
            : 'A(x) ⊗ B(x) mod (x⁸ + x⁴ + x³ + x + 1)  [0x11B]',
        paramALabel: chNum >= 11 ? 'معامل المفتاح السري (s)' : 'المعامل الأول (A)',
        paramAMin: 1,
        paramAMax: 255,
        paramADefault: (chNum * 19 + 47) % 250 || 87,
        paramBLabel: chNum >= 11 ? 'معامل الضجيج الشبكي (e)' : 'المعامل الثاني (B)',
        paramBMin: 1,
        paramBMax: 255,
        paramBDefault: (chNum * 31 + 29) % 250 || 131,
        compute: (a, b) => {
          if (chNum >= 11) {
            const q = 3329;
            const bVal = (a * 179 + b) % q;
            return {
              primaryOutput: `ML-KEM Sample: b = (179 × ${a} + ${b}) mod ${q} = ${bVal}`,
              secondaryOutput: `مقاوم لخوارزمية شور الكمومية وفق معيار NIST FIPS 203`,
              traceSteps: [
                `1. توليد عنصر الشبكة في R_q (q = 3329): A·s = ${a * 179}`,
                `2. إضافة متجه الضجيج الصغير e = ${b} ➔ b = ${bVal} (mod 3329)`,
              ],
            };
          }
          const prod = gf256Mul(a, b);
          const xorVal = (a ^ b) & 0xff;
          return {
            primaryOutput: `0x${a.toString(16).padStart(2, '0').toUpperCase()} ⊗ 0x${b.toString(16).padStart(2, '0').toUpperCase()} = 0x${prod.toString(16).padStart(2, '0').toUpperCase()} (Decimal: ${prod})`,
            secondaryOutput: `جمع XOR في الحقل: 0x${a.toString(16).padStart(2, '0').toUpperCase()} ⊕ 0x${b.toString(16).padStart(2, '0').toUpperCase()} = 0x${xorVal.toString(16).padStart(2, '0').toUpperCase()}`,
            traceSteps: [
              `1. تمثيل المدخلات للفصل ${chNum}: A = ${a}, B = ${b}`,
              `2. ناتج الضرب مع الاختزال بـ 0x11B = 0x${prod.toString(16).padStart(2, '0').toUpperCase()}`,
            ],
          };
        },
      },
      codeLang: 'typescript',
      codeTitle: `كود المحاكاة التشفيرية للفصل ${chNum}: ${chapter.title}`,
      codeSnippet: `export function verifyChapter${chNum}Crypto(a: number, b: number) {
  return { chapter: ${chNum}, title: "${chapter.title}", resultHex: (a ^ b).toString(16) };
}`,
      executeCodeLive: (a, b) => [
        `[ISE243-CH${chNum}] Executing kernel for "${chapter.title}"...`,
        `[OUTPUT] Computed result for (${a}, ${b}) verified.`,
      ],
    };
  }

  if (slug.includes('risk') || slug.includes('upmn') || courseTitle.includes('المخاطر')) {
    return {
      modelKind: 'risk_cube_5x5',
      modelTitleAr: `مكعب التحليل الكمي للمخاطر — الفصل ${chNum}: ${chapter.title}`,
      modelSubtitleEn: `3D Risk Matrix & Quantitative Engine (UPMN075 · Ch.${chNum})`,
      geometricSymbols: [
        { symbol: 'SLE = AV × EF', name: 'الخسارة المتوقعة للحادث', meaning: 'حاصل ضرب قيمة الأصل في عامل التعرض' },
        { symbol: 'ALE = SLE × ARO', name: 'الخسارة السنوية المتوقعة', meaning: 'الخسارة المفردة مضروبة في معدل التكرار السنوي' },
      ],
      hotspots: [],
      steps: [],
      formulaSim: {
        title: `محاكي حساب المخاطر للفصل ${chNum} (${chapter.title})`,
        symbolicEquation: 'SLE = AV × EF   |   ALE = SLE × ARO   |   Residual = ALE × (1 - Control%)',
        paramALabel: 'قيمة الأصل بآلاف الريالات (AV in K SAR)',
        paramAMin: 50,
        paramAMax: 2000,
        paramADefault: 300 + chNum * 50,
        paramBLabel: 'نسبة التعرض / التأثير المئوية (EF %)',
        paramBMin: 5,
        paramBMax: 100,
        paramBDefault: Math.min(90, 20 + chNum * 5),
        compute: (avK, efPercent) => {
          const av = avK * 1000;
          const ef = efPercent / 100;
          const sle = Math.round(av * ef);
          const aro = 1.5;
          const ale = Math.round(sle * aro);
          return {
            primaryOutput: `SLE = ${sle.toLocaleString()} SAR   |   ALE (ARO=1.5) = ${ale.toLocaleString()} SAR`,
            secondaryOutput: `المخاطر المتبقية بعد ضوابط بنسبة 70% = ${Math.round(ale * 0.3).toLocaleString()} SAR`,
            traceSteps: [
              `1. قيمة الأصل للفصل ${chNum}: ${av.toLocaleString()} ريال.`,
              `2. حساب SLE = ${sle.toLocaleString()} ريال | ALE = ${ale.toLocaleString()} ريال.`,
            ],
          };
        },
      },
      codeLang: 'typescript',
      codeTitle: `كود التقييم الكمي للمخاطر — الفصل ${chNum}`,
      codeSnippet: `export const computeChapter${chNum}Risk = (av: number, ef: number, aro = 1.5) => ({ sle: av * ef, ale: av * ef * aro });`,
      executeCodeLive: (avK, efP) => [`[RISK-CH${chNum}] AV=${avK}K, EF=${efP}% ➔ SLE=${avK * efP * 10} SAR`],
    };
  }

  if (slug.includes('231') || courseTitle.includes('231') || courseTitle.includes('تخطيط')) {
    return {
      modelKind: 'nist_gyroscope',
      modelTitleAr: `مجسم الحوكمة والتخطيط الاستراتيجي — الفصل ${chNum}: ${chapter.title}`,
      modelSubtitleEn: `3D NIST CSF 2.0 & Governance Gyroscope (ISE 231 · Ch.${chNum})`,
      geometricSymbols: [
        { symbol: 'RTO + WRT ≤ MTD', name: 'معادلة استمرارية الأعمال', meaning: 'زمن التعافي يجب ألا يتجاوز أقصى توقف مسموح' },
        { symbol: 'Gap = Target - Current', name: 'فجوة النضج السيبراني', meaning: 'قياس الفارق بين المستوى الحالي والمستهدف' },
      ],
      hotspots: [],
      steps: [],
      formulaSim: {
        title: `محاكي مؤشرات التخطيط واستمرارية الأعمال — الفصل ${chNum}`,
        symbolicEquation: 'Compliance_Score = (Implemented / Total) × 100%   |   Margin = MTD - (RTO + WRT)',
        paramALabel: 'أقصى زمن توقف مسموح بالساعات (MTD)',
        paramAMin: 4,
        paramAMax: 72,
        paramADefault: 12 + chNum * 2,
        paramBLabel: 'زمن الاستعادة الفعلي بالساعات (RTO + WRT)',
        paramBMin: 1,
        paramBMax: 48,
        paramBDefault: Math.max(2, 6 + chNum),
        compute: (mtd, rto) => {
          const valid = rto <= mtd;
          const diff = mtd - rto;
          return {
            primaryOutput: valid
              ? `ممتثل لمعيار الاستمرارية: هامش الأمان التشغيلي = +${diff} ساعة`
              : `تجاوز خطير لحد التوقف المسموح بمقدار ${Math.abs(diff)} ساعة!`,
            secondaryOutput: `المقارنة للفصل ${chNum}: RTO+WRT (${rto}h) مقابل MTD (${mtd}h)`,
            traceSteps: [`1. فحص شرط الاستمرارية: ${rto}h ≤ ${mtd}h ➔ ${valid ? 'ناجح' : 'غير ممتثل'}`],
          };
        },
      },
      codeLang: 'typescript',
      codeTitle: `كود فحص مؤشرات الحوكمة والاستمرارية — الفصل ${chNum}`,
      codeSnippet: `export const verifyGovernanceCh${chNum} = (mtd: number, rto: number) => ({ pass: rto <= mtd, margin: mtd - rto });`,
      executeCodeLive: (mtd, rto) => [`[ISE231-CH${chNum}] MTD=${mtd}h, RTO=${rto}h ➔ Pass=${rto <= mtd}`],
    };
  }

  if (slug.includes('threat') || courseTitle.includes('التهديدات')) {
    return {
      modelKind: 'killchain_helix',
      modelTitleAr: `مجسم تحليل التهديدات والاستجابة — الفصل ${chNum}: ${chapter.title}`,
      modelSubtitleEn: `3D Threat Intelligence & Kill Chain Helix (ISE 232 · Ch.${chNum})`,
      geometricSymbols: [
        { symbol: 'Risk = Threat × Vuln × Impact', name: 'معادلة التهديد السيبراني', meaning: 'تقاطع التهديد والضعف والأثر' },
        { symbol: 'Dwell_Time = T_Detect + T_Contain', name: 'زمن مكوث المهاجم', meaning: 'الفاصل الزمني بين الاختراق والاحتواء' },
      ],
      hotspots: [],
      steps: [],
      formulaSim: {
        title: `محاكي تصنيف شدة التهديد وفرز البلاغات — الفصل ${chNum}`,
        symbolicEquation: 'Threat_Index = (Severity × Confidence × Asset_Weight) / 100',
        paramALabel: 'شدة المؤشر المرصود في السجل (Severity 1–10)',
        paramAMin: 1,
        paramAMax: 10,
        paramADefault: Math.min(10, 5 + (chNum % 5)),
        paramBLabel: 'أهمية الأصل المستهدف (Asset Criticality 10–100)',
        paramBMin: 10,
        paramBMax: 100,
        paramBDefault: 65 + (chNum % 4) * 10,
        compute: (sev, crit) => {
          const score = Math.round((sev * crit) / 10);
          const level = score >= 75 ? 'حرج (P1 - عزل وتصعيد فوري)' : score >= 45 ? 'مرتفع (P2 - تحقيق جنائي)' : 'متوسط (P3 - مراقبة)';
          return {
            primaryOutput: `مؤشر خطورة الحادث: ${score}/100 — القرار: ${level}`,
            secondaryOutput: `الفصل ${chNum} (${chapter.title}): شدة المؤشر = ${sev}/10 × حرجية الأصل = ${crit}%`,
            traceSteps: [`1. حساب مؤشر التهديد للفصل ${chNum}: (${sev} × ${crit}) / 10 = ${score}/100`],
          };
        },
      },
      codeLang: 'typescript',
      codeTitle: `كود فرز التنبيهات الأمنية — الفصل ${chNum}`,
      codeSnippet: `export const triageThreatCh${chNum} = (sev: number, crit: number) => ({ score: (sev * crit) / 10, escalate: (sev * crit) / 10 >= 70 });`,
      executeCodeLive: (sev, crit) => [`[SOC-CH${chNum}] Threat Score = ${(sev * crit) / 10}/100`],
    };
  }

  if (slug.includes('eng') || courseTitle.includes('الإنجليزية')) {
    return {
      modelKind: 'lattice_crystal',
      modelTitleAr: `المعجم الهندسي التفاعلي ثلاثي الأبعاد — الفصل ${chNum}: ${chapter.title}`,
      modelSubtitleEn: `3D Technical English & Cryptographic Lexicon (Chapter ${chNum})`,
      geometricSymbols: [
        { symbol: 'IPA / Phonetics', name: 'النطق الصوتي القياسي', meaning: 'التمثيل الصوتي الدولي للمصطلحات السيبرانية' },
        { symbol: 'Passive Academic Voice', name: 'الصياغة الأكاديمية المعيارية', meaning: 'كتابة الوثائق والتقارير بلغة NIST و RFC' },
      ],
      hotspots: [],
      steps: [],
      formulaSim: {
        title: `مؤشر إتقان المصطلحات والصياغة الأكاديمية — الفصل ${chNum}`,
        symbolicEquation: 'Lexical_Mastery = (Terminology_Accuracy × Academic_Cohesion) / 100',
        paramALabel: 'عدد المصطلحات التقنية المتقنة في الفصل',
        paramAMin: 5,
        paramAMax: 40,
        paramADefault: 20 + chNum * 2,
        paramBLabel: 'دقة توظيف الصيغ الأكاديمية (%)',
        paramBMin: 50,
        paramBMax: 100,
        paramBDefault: 88,
        compute: (terms, acc) => {
          const score = Math.min(100, Math.round((terms * 2.5 * acc) / 100));
          const cefr = score >= 85 ? 'C1/C2 Academic Mastery' : score >= 70 ? 'B2 Operational Fluency' : 'B1 Foundation';
          return {
            primaryOutput: `Academic Mastery Score: ${score}% — CEFR Band: ${cefr}`,
            secondaryOutput: `إتقان ${terms} مصطلحاً تخصصياً بدقة صياغة ${acc}% في الفصل ${chNum}`,
            traceSteps: [`1. تقييم الدقة الاصطلاحية والنحوية للفصل ${chNum}: ${cefr}`],
          };
        },
      },
      codeLang: 'typescript',
      codeTitle: `مدقق الصياغة الإنجليزية الأكاديمية — الفصل ${chNum}`,
      codeSnippet: `export const evaluateLexiconCh${chNum} = (terms: number, accuracy: number) => ({ score: Math.min(100, Math.round((terms * 2.5 * accuracy) / 100)) });`,
      executeCodeLive: (t, a) => [`[ENG-CH${chNum}] Terms=${t}, Accuracy=${a}% ➔ Verified`],
    };
  }

  return {
    modelKind: 'defense_fortress',
    modelTitleAr: `مجسم حوكمة البرامج والضوابط الوطنية — الفصل ${chNum}: ${chapter.title}`,
    modelSubtitleEn: `3D NCA ECC-2:2024 Security Program Architecture (Chapter ${chNum})`,
    geometricSymbols: [
      { symbol: 'NCA ECC-2:2024', name: 'الضوابط الأساسية للأمن السيبراني', meaning: '4 مكونات أساسية و28 مكوناً فرعياً' },
      { symbol: 'SoD & Least Privilege', name: 'فصل المهام وأقل الصلاحيات', meaning: 'منع تعارض المصالح وتقليص سطح الهجوم' },
    ],
    hotspots: [],
    steps: [],
    formulaSim: {
      title: `محاكي قياس الامتثال الوطني — الفصل ${chNum} (${chapter.title})`,
      symbolicEquation: 'Compliance_Rate = (Applied_Controls / Applicable_Controls) × 100%',
      paramALabel: 'عدد الضوابط المطبقة والموثقة في الفصل',
      paramAMin: 5,
      paramAMax: 60,
      paramADefault: 35 + chNum,
      paramBLabel: 'إجمالي الضوابط الإلزامية المنطبقة',
      paramBMin: 20,
      paramBMax: 60,
      paramBDefault: 50,
      compute: (applied, total) => {
        const validTotal = Math.max(applied, total);
        const percent = Math.round((applied / validTotal) * 100);
        const tier = percent >= 90 ? 'متقدم (Tier 4)' : percent >= 75 ? 'مكتمل (Tier 3)' : 'جزئي (Tier 2)';
        return {
          primaryOutput: `نسبة الامتثال الوطني للفصل ${chNum}: ${percent}% — مستوى النضج: ${tier}`,
          secondaryOutput: `تم استيفاء ${applied} ضابطاً من أصل ${validTotal} ضابطاً إلزامياً من ضوابط NCA ECC`,
          traceSteps: [`1. مؤشر الامتثال للفصل ${chNum}: (${applied} / ${validTotal}) × 100 = ${percent}% (${tier})`],
        };
      },
    },
    codeLang: 'typescript',
    codeTitle: `كود التحقق من الامتثال لضوابط NCA ECC — الفصل ${chNum}`,
    codeSnippet: `export const evaluateNCACh${chNum} = (applied: number, total: number) => ({ score: Math.round((applied / Math.max(applied, total)) * 100) });`,
    executeCodeLive: (applied, total) => [
      `[NCA-ECC-CH${chNum}] Compliance = ${Math.round((applied / Math.max(applied, total)) * 100)}%`,
    ],
  };
}

function buildScientificProfile(
  chapter: Chapter,
  courseTitle: string,
  courseSlug?: string
): ChapterScientificProfile {
  const base = buildBaseScientificProfile(chapter, courseTitle, courseSlug);
  return enrichProfileWithChapterBook3D(base, chapter);
}

export default function InteractiveTextbook({
  chapter,
  courseTitle,
  courseSlug: propCourseSlug,
  onClose,
}: Props) {
  const navigate = useNavigate();
  const { courseSlug: routeCourseSlug } = useParams<{ courseSlug?: string }>();
  const effectiveCourseSlug =
    propCourseSlug ||
    routeCourseSlug ||
    (chapter.id >= 20000
      ? 'ise232-programs'
      : chapter.id >= 600
      ? 'eng-cyber'
      : chapter.id >= 300
      ? 'ise232-threats'
      : chapter.id >= 200
      ? 'ise232-risk'
      : chapter.id >= 100
      ? 'ise231'
      : 'ise243');

  const profile = useMemo(
    () => buildScientificProfile(chapter, courseTitle, effectiveCourseSlug),
    [chapter, courseTitle, effectiveCourseSlug]
  );

  // ─── بناء صفحات الكتاب المزدوجة (Spreads) بدون أي تكرار بين الصفحات ───
  const contentBlocks = useMemo(() => {
    const cleanedRawContent = (chapter.content || '')
      .replace(/^#\s+[^\n]+\n+/, '')
      .trim();

    const rawParts = cleanedRawContent
      .split(/---page---|\n---\n|(?=^##\s)/m)
      .map((s) => s.trim())
      .filter(Boolean);

    const richSections = chapter.richData?.sections || [];
    const pages3D = profile.pages3D || [];

    const blocks: {
      badge: string;
      heading: string;
      body: string;
      formula?: string;
      saudiCase?: string;
      page3D?: NormalizedPage3D;
      widgetMode: 'simulator' | 'code' | 'solved' | 'tables';
    }[] = [];

    const totalMainSpreads = Math.max(rawParts.length, richSections.length, pages3D.length, 1);

    for (let idx = 0; idx < totalMainSpreads; idx++) {
      const part = rawParts[idx];
      const richSec = richSections[idx];
      const p3d = pages3D[idx];

      let heading = '';
      let body = '';

      if (part) {
        const lines = part.split('\n');
        const firstLine = lines[0]?.trim() || '';
        if (firstLine.startsWith('#')) {
          heading = firstLine.replace(/^#+\s*/, '').trim();
          body = lines.slice(1).join('\n').trim();
        } else {
          heading = richSec?.heading || p3d?.title || `المبحث العلمي ${idx + 1} — ${chapter.title}`;
          body = part;
        }
      } else if (richSec) {
        heading = richSec.heading;
        body = richSec.content;
      } else if (p3d) {
        heading = p3d.title;
        body = p3d.narrative;
      }

      if (!body && !p3d) continue;
      if (
        blocks.length > 0 &&
        blocks[blocks.length - 1].heading === heading &&
        blocks[blocks.length - 1].body === body
      ) {
        continue;
      }

      const widgetModes: ('simulator' | 'code' | 'solved' | 'tables')[] = [
        'simulator',
        'code',
        'solved',
        'tables',
      ];

      blocks.push({
        badge:
          idx === 0
            ? `الفصل ${chapter.chapter_number} · المبحث الأول والتأصيل الهندسي`
            : `الفصل ${chapter.chapter_number} · المبحث العلمي ${idx + 1}`,
        heading: heading || `${chapter.title} — القسم ${idx + 1}`,
        body: body || p3d?.narrative || chapter.description,
        formula:
          richSec?.formula ||
          p3d?.equation ||
          profile.hotspots[idx % Math.max(1, profile.hotspots.length)]?.formula,
        saudiCase: richSec?.saudiExample,
        page3D: p3d,
        widgetMode: widgetModes[idx % widgetModes.length],
      });
    }

    if (chapter.richData?.solvedExample && !blocks.some((b) => b.widgetMode === 'solved')) {
      const ex = chapter.richData.solvedExample;
      blocks.push({
        badge: `الفصل ${chapter.chapter_number} · التطبيق الهندسي المحلول والضوابط`,
        heading: ex.title,
        body: `**المعطيات الهندسية:**\n${ex.given}\n\n**خطوات الحل المتسلسلة:**\n${ex.steps
          .map((s, i) => `${i + 1}. ${s}`)
          .join('\n')}\n\n**النتيجة المعتمدة:**\n${ex.result}`,
        formula: profile.formulaSim.symbolicEquation,
        saudiCase: ex.whyItMatters,
        page3D: pages3D[blocks.length % Math.max(1, pages3D.length)],
        widgetMode: 'solved',
      });
    }

    return blocks;
  }, [chapter, profile]);

  const [spreadIndex, setSpreadIndex] = useState(0);
  const [flipDirection, setFlipDirection] = useState<'next' | 'prev'>('next');
  const [selectedHotspotId, setSelectedHotspotId] = useState<string>(
    profile.hotspots[0]?.id || 'hs-1'
  );
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const [leftStageTab, setLeftStageTab] = useState<'hologram3d' | 'diagram2d' | 'quiz'>('hologram3d');
  const [rightBottomTab, setRightBottomTab] = useState<'auto' | 'simulator' | 'code' | 'solved'>('auto');

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [zoom3D, setZoom3D] = useState<number>(1.0);
  const rotationRef = useRef<{ yaw: number; pitch: number }>({ yaw: 0.45, pitch: 0.28 });
  const isDraggingRef = useRef<boolean>(false);
  const lastMouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const projectedHotspotsRef = useRef<{ id: string; x: number; y: number; r: number }[]>([]);

  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [paramA, setParamA] = useState<number>(profile.formulaSim.paramADefault);
  const [paramB, setParamB] = useState<number>(profile.formulaSim.paramBDefault);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});

  useEffect(() => {
    setSpreadIndex(0);
    setSelectedHotspotId(profile.hotspots[0]?.id || '');
    setActiveStepIndex(0);
    setRightBottomTab('auto');
    setParamA(profile.formulaSim.paramADefault);
    setParamB(profile.formulaSim.paramBDefault);
    setQuizAnswers({});
  }, [chapter.id, profile]);

  const syncSpreadInteractiveState = useCallback(
    (nextSpreadIdx: number) => {
      if (profile.steps.length > 0) {
        setActiveStepIndex(nextSpreadIdx % profile.steps.length);
      }
      if (profile.hotspots.length > 0) {
        const targetHs = profile.hotspots[nextSpreadIdx % profile.hotspots.length];
        if (targetHs) setSelectedHotspotId(targetHs.id);
      }
      rotationRef.current = {
        yaw: 0.45 + nextSpreadIdx * 0.65,
        pitch: 0.22 + ((nextSpreadIdx % 3) - 1) * 0.14,
      };
      setRightBottomTab('auto');
    },
    [profile.steps.length, profile.hotspots]
  );

  const activeHotspot = useMemo(
    () => profile.hotspots.find((h) => h.id === selectedHotspotId) || profile.hotspots[0],
    [profile.hotspots, selectedHotspotId]
  );

  const liveFormulaResult = useMemo(
    () => profile.formulaSim.compute(paramA, paramB),
    [profile.formulaSim, paramA, paramB]
  );

  const handleBackToChapters = useCallback(() => {
    if (onClose) {
      onClose();
    } else {
      navigate(`/academic/${effectiveCourseSlug}/chapters`);
    }
  }, [onClose, navigate, effectiveCourseSlug]);

  const handlePrevSpread = useCallback(() => {
    setFlipDirection('prev');
    setSpreadIndex((prev) => {
      if (prev <= 0) {
        if (onClose) onClose();
        else navigate(`/academic/${effectiveCourseSlug}/chapters`);
        return 0;
      }
      const nextIdx = prev - 1;
      syncSpreadInteractiveState(nextIdx);
      return nextIdx;
    });
  }, [onClose, navigate, effectiveCourseSlug, syncSpreadInteractiveState]);

  const handleNextSpread = useCallback(() => {
    setFlipDirection('next');
    setSpreadIndex((prev) => {
      if (prev >= contentBlocks.length - 1) return prev;
      const nextIdx = prev + 1;
      syncSpreadInteractiveState(nextIdx);
      return nextIdx;
    });
  }, [contentBlocks.length, syncSpreadInteractiveState]);

  useEffect(() => {
    if (leftStageTab !== 'hologram3d') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId = 0;
    let pulsePhase = 0;

    const project3D = (
      p: Vec3,
      w: number,
      h: number,
      yaw: number,
      pitch: number,
      scaleFactor: number
    ) => {
      const cosY = Math.cos(yaw);
      const sinY = Math.sin(yaw);
      const x1 = p.x * cosY - p.z * sinY;
      const z1 = p.z * cosY + p.x * sinY;

      const cosX = Math.cos(pitch);
      const sinX = Math.sin(pitch);
      const y2 = p.y * cosX - z1 * sinX;
      const z2 = z1 * cosX + p.y * sinX;

      const fov = 3.6;
      const depth = Math.max(1.2, fov - z2);
      const proj = (Math.min(w, h) * 0.34 * scaleFactor) / depth;

      return {
        sx: w / 2 + x1 * proj * 2.2,
        sy: h / 2 - y2 * proj * 2.2,
        depth,
        scale: proj,
      };
    };

    const renderFrame = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      if (
        canvas.width !== Math.floor(rect.width * dpr) ||
        canvas.height !== Math.floor(rect.height * dpr)
      ) {
        canvas.width = Math.floor(rect.width * dpr);
        canvas.height = Math.floor(rect.height * dpr);
      }
      ctx.save();
      ctx.scale(dpr, dpr);
      const w = rect.width;
      const h = rect.height;

      ctx.clearRect(0, 0, w, h);
      const bgGrad = ctx.createRadialGradient(w / 2, h / 2, 10, w / 2, h / 2, w * 0.65);
      bgGrad.addColorStop(0, 'rgba(16, 185, 129, 0.14)');
      bgGrad.addColorStop(0.55, 'rgba(6, 182, 212, 0.05)');
      bgGrad.addColorStop(1, 'rgba(2, 6, 23, 0.96)');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, w, h);

      ctx.strokeStyle = 'rgba(30, 41, 59, 0.55)';
      ctx.lineWidth = 1;
      for (let gx = -4; gx <= 4; gx++) {
        const p1 = project3D(
          { x: gx * 0.45, y: -1.35, z: -1.8 },
          w,
          h,
          rotationRef.current.yaw,
          rotationRef.current.pitch,
          zoom3D
        );
        const p2 = project3D(
          { x: gx * 0.45, y: -1.35, z: 1.8 },
          w,
          h,
          rotationRef.current.yaw,
          rotationRef.current.pitch,
          zoom3D
        );
        ctx.beginPath();
        ctx.moveTo(p1.sx, p1.sy);
        ctx.lineTo(p2.sx, p2.sy);
        ctx.stroke();
      }

      if (autoRotate && !isDraggingRef.current) {
        rotationRef.current.yaw += 0.0085;
      }
      pulsePhase += 0.035;

      const yaw = rotationRef.current.yaw;
      const pitch = rotationRef.current.pitch;

      const vertices: Vec3[] = [];
      const edges: [number, number, string][] = [];

      if (profile.modelKind === 'galois_tesseract' || profile.modelKind === 'risk_cube_5x5') {
        const radii = profile.modelKind === 'galois_tesseract' ? [1.05, 0.52] : [1.1, 0.65];
        radii.forEach((r, ri) => {
          const offset = vertices.length;
          for (let i = 0; i < 8; i++) {
            vertices.push({
              x: (i & 1 ? 1 : -1) * r,
              y: (i & 2 ? 1 : -1) * r,
              z: (i & 4 ? 1 : -1) * r,
            });
          }
          const color = ri === 0 ? 'rgba(16, 185, 129, 0.65)' : 'rgba(245, 158, 11, 0.75)';
          const cubePairs = [
            [0, 1], [1, 3], [3, 2], [2, 0],
            [4, 5], [5, 7], [7, 6], [6, 4],
            [0, 4], [1, 5], [2, 6], [3, 7],
          ];
          cubePairs.forEach(([u, v]) => edges.push([offset + u, offset + v, color]));
        });
        for (let i = 0; i < 8; i++) {
          edges.push([i, i + 8, 'rgba(56, 189, 248, 0.45)']);
        }
      } else if (profile.modelKind === 'nist_gyroscope' || profile.modelKind === 'elliptic_torus') {
        const segs = 24;
        for (let ring = 0; ring < 3; ring++) {
          const offset = vertices.length;
          const r = 1.15 - ring * 0.18;
          const color =
            ring === 0
              ? 'rgba(16, 185, 129, 0.75)'
              : ring === 1
              ? 'rgba(245, 158, 11, 0.75)'
              : 'rgba(56, 189, 248, 0.75)';
          for (let s = 0; s < segs; s++) {
            const theta = (s / segs) * Math.PI * 2;
            if (ring === 0) {
              vertices.push({ x: Math.cos(theta) * r, y: Math.sin(theta) * r, z: 0 });
            } else if (ring === 1) {
              vertices.push({ x: Math.cos(theta) * r, y: 0, z: Math.sin(theta) * r });
            } else {
              vertices.push({
                x: Math.cos(theta) * r * 0.7,
                y: Math.sin(theta) * r,
                z: Math.cos(theta) * r * 0.7,
              });
            }
            edges.push([offset + s, offset + ((s + 1) % segs), color]);
          }
        }
      } else if (profile.modelKind === 'database_lattice_3d') {
        const tiers = [-0.95, -0.3, 0.35, 1.0];
        const segs = 16;
        tiers.forEach((yLevel, ti) => {
          const offset = vertices.length;
          const r = ti === 3 ? 0.55 : 1.05 - ti * 0.12;
          const color =
            ti === 0
              ? 'rgba(56, 189, 248, 0.75)'
              : ti === 1
              ? 'rgba(16, 185, 129, 0.75)'
              : ti === 2
              ? 'rgba(245, 158, 11, 0.75)'
              : 'rgba(168, 85, 247, 0.85)';
          for (let s = 0; s < segs; s++) {
            const theta = (s / segs) * Math.PI * 2;
            vertices.push({ x: Math.cos(theta) * r, y: yLevel, z: Math.sin(theta) * r });
            edges.push([offset + s, offset + ((s + 1) % segs), color]);
            if (ti > 0 && s % 2 === 0) {
              edges.push([offset - segs + s, offset + s, 'rgba(148, 163, 184, 0.4)']);
            }
          }
        });
      } else if (
        profile.modelKind === 'vpn_tunnel_mesh' ||
        profile.modelKind === 'killchain_helix' ||
        profile.modelKind === 'killchain_spiral'
      ) {
        const stepsCount = 22;
        for (let i = 0; i < stepsCount; i++) {
          const t = (i / (stepsCount - 1)) * Math.PI * 3 - Math.PI * 1.5;
          const y = (i / (stepsCount - 1)) * 2.2 - 1.1;
          vertices.push({ x: Math.cos(t) * 0.95, y, z: Math.sin(t) * 0.95 });
          vertices.push({ x: Math.cos(t + Math.PI) * 0.95, y, z: Math.sin(t + Math.PI) * 0.95 });
          const idx = i * 2;
          edges.push([idx, idx + 1, 'rgba(245, 158, 11, 0.45)']);
          if (i > 0) {
            edges.push([idx - 2, idx, 'rgba(16, 185, 129, 0.75)']);
            edges.push([idx - 1, idx + 1, 'rgba(6, 182, 212, 0.75)']);
          }
        }
      } else {
        for (let x = -1; x <= 1; x++) {
          for (let y = -1; y <= 1; y++) {
            for (let z = -1; z <= 1; z++) {
              if (Math.abs(x) + Math.abs(y) + Math.abs(z) <= 2) {
                vertices.push({ x: x * 0.78, y: y * 0.78, z: z * 0.78 });
              }
            }
          }
        }
        for (let i = 0; i < vertices.length; i++) {
          for (let j = i + 1; j < vertices.length; j++) {
            const dx = vertices[i].x - vertices[j].x;
            const dy = vertices[i].y - vertices[j].y;
            const dz = vertices[i].z - vertices[j].z;
            const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
            if (dist < 0.85) {
              edges.push([i, j, 'rgba(168, 85, 247, 0.55)']);
            }
          }
        }
      }

      const projVerts = vertices.map((v) => project3D(v, w, h, yaw, pitch, zoom3D));

      edges.forEach(([u, v, color], ei) => {
        const p1 = projVerts[u];
        const p2 = projVerts[v];
        if (!p1 || !p2) return;

        ctx.strokeStyle = color;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(p1.sx, p1.sy);
        ctx.lineTo(p2.sx, p2.sy);
        ctx.stroke();

        if (ei % 3 === activeStepIndex % 3) {
          const t = (Math.sin(pulsePhase + ei * 0.5) + 1) / 2;
          const px = p1.sx + (p2.sx - p1.sx) * t;
          const py = p1.sy + (p2.sy - p1.sy) * t;
          ctx.fillStyle = '#34d399';
          ctx.beginPath();
          ctx.arc(px, py, 2.6, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      projVerts.forEach((pv) => {
        ctx.fillStyle = 'rgba(226, 232, 240, 0.65)';
        ctx.beginPath();
        ctx.arc(pv.sx, pv.sy, 2.2, 0, Math.PI * 2);
        ctx.fill();
      });

      const hitRegions: { id: string; x: number; y: number; r: number }[] = [];
      profile.hotspots.forEach((hs, idx) => {
        const ph = project3D(hs.pos, w, h, yaw, pitch, zoom3D);
        const isSelected = hs.id === selectedHotspotId;
        const radius = isSelected ? 15 : 11;
        hitRegions.push({ id: hs.id, x: ph.sx, y: ph.sy, r: radius + 6 });

        if (isSelected) {
          const haloR = radius + 6 + Math.sin(pulsePhase * 2) * 3;
          ctx.strokeStyle = hs.color;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(ph.sx, ph.sy, haloR, 0, Math.PI * 2);
          ctx.stroke();
        }

        ctx.fillStyle = hs.color;
        ctx.beginPath();
        ctx.arc(ph.sx, ph.sy, radius, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = isSelected ? 2.5 : 1.5;
        ctx.stroke();

        ctx.fillStyle = '#020617';
        ctx.font = '900 11px Cairo, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(String(idx + 1), ph.sx, ph.sy);

        ctx.fillStyle = 'rgba(2, 6, 23, 0.85)';
        ctx.strokeStyle = hs.color;
        ctx.lineWidth = 1;
        const tagW = Math.max(58, hs.symbol.length * 7 + 14);
        const tagX = ph.sx - tagW / 2;
        const tagY = ph.sy - radius - 24;
        ctx.beginPath();
        ctx.roundRect(tagX, tagY, tagW, 18, 6);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = '#f8fafc';
        ctx.font = '700 10px "IBM Plex Mono", monospace';
        ctx.fillText(hs.symbol, ph.sx, tagY + 9);
      });

      projectedHotspotsRef.current = hitRegions;
      ctx.restore();
      animId = requestAnimationFrame(renderFrame);
    };

    animId = requestAnimationFrame(renderFrame);
    return () => cancelAnimationFrame(animId);
  }, [leftStageTab, profile, selectedHotspotId, activeStepIndex, autoRotate, zoom3D]);

  const handleCanvasMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    const hit = projectedHotspotsRef.current.find(
      (h) => Math.hypot(h.x - mx, h.y - my) <= h.r
    );
    if (hit) {
      setSelectedHotspotId(hit.id);
      return;
    }

    isDraggingRef.current = true;
    lastMouseRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - lastMouseRef.current.x;
    const dy = e.clientY - lastMouseRef.current.y;
    rotationRef.current.yaw += dx * 0.01;
    rotationRef.current.pitch = Math.max(
      -1.2,
      Math.min(1.2, rotationRef.current.pitch + dy * 0.01)
    );
    lastMouseRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleCanvasMouseUp = () => {
    isDraggingRef.current = false;
  };

  const currentBlock = contentBlocks[spreadIndex] || contentBlocks[0];
  const currentPage3D =
    currentBlock?.page3D ||
    profile.pages3D[spreadIndex % Math.max(1, profile.pages3D.length)];

  const effectiveRightWidget =
    rightBottomTab === 'auto' ? currentBlock?.widgetMode || 'simulator' : rightBottomTab;

  const quizList =
    chapter.miniQuiz && chapter.miniQuiz.length > 0
      ? chapter.miniQuiz
      : chapter.richData?.quiz || [];

  const allTopics = chapter.keyTopics || [];
  const spreadTopics =
    allTopics.length > 2
      ? allTopics.slice(
          (spreadIndex * 2) % allTopics.length,
          ((spreadIndex * 2) % allTopics.length) + 2
        )
      : allTopics;

  return (
    <div
      className={cn(
        'relative select-none transition-all duration-300',
        isFullscreen
          ? 'fixed inset-0 z-50 bg-slate-950 p-4 md:p-6 overflow-y-auto'
          : 'w-full'
      )}
      dir="rtl"
    >
      {/* ─── Top Scientific Book Control Deck ─── */}
      <div className="mb-4 p-4 rounded-2xl bg-slate-900/95 border border-amber-500/30 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleBackToChapters}
            className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-amber-500/35 text-amber-300 hover:text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all"
            title="العودة إلى فهرس فصول المقرر"
          >
            <ChevronRight className="w-4 h-4" />
            <span>رجوع للفصول</span>
          </button>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-amber-500/20">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono font-bold text-amber-400">
                {courseTitle} · الفصل {chapter.chapter_number}
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                كتاب فيزيائي ثلاثي الأبعاد مخصص للفصل ({contentBlocks.length} صفحات مزدوجة)
              </span>
            </div>
            <h2 className="text-sm md:text-base font-black text-white">{chapter.title}</h2>
          </div>
        </div>

        {/* Geometric Symbols Ribbon */}
        <div className="hidden xl:flex items-center gap-2">
          {profile.geometricSymbols.map((sym, idx) => (
            <div
              key={idx}
              title={`${sym.name}: ${sym.meaning}`}
              className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-amber-500/50 transition-all cursor-help"
            >
              <span className="font-mono text-xs font-bold text-amber-300 block">
                {sym.symbol}
              </span>
              <span className="text-[9px] text-slate-400 block truncate max-w-[130px]">
                {sym.name}
              </span>
            </div>
          ))}
        </div>

        {/* Book Controls */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsFullscreen((prev) => !prev)}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 cursor-pointer"
            title={isFullscreen ? 'تصغير المسرح' : 'ملء الشاشة'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* ─── Physical 3D Open Book Stage (Perspective 2400px) ─── */}
      <div className="relative py-3 px-1 md:px-4" style={{ perspective: '2400px' }}>
        <div className="relative rounded-[2rem] p-2.5 md:p-4 bg-gradient-to-b from-amber-950/60 via-slate-900 to-slate-950 border-2 border-amber-500/35 shadow-[0_30px_80px_rgba(0,0,0,0.85),0_0_40px_rgba(245,158,11,0.12)]">
          <div className="hidden lg:block absolute top-5 bottom-5 right-1 w-2.5 rounded-r-xl bg-gradient-to-l from-slate-700 via-slate-800 to-slate-900 border-r border-amber-500/30 opacity-80 pointer-events-none" />
          <div className="hidden lg:block absolute top-5 bottom-5 left-1 w-2.5 rounded-l-xl bg-gradient-to-r from-slate-700 via-slate-800 to-slate-900 border-l border-amber-500/30 opacity-80 pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 rounded-[1.6rem] overflow-hidden bg-slate-950 border border-slate-800 relative">
            {/* ══════════════════════════════════════════════════════════════════
                RIGHT PAGE (الصفحة اليمنى: كل صفحة تعرض مبحثاً مستقلاً وأداة تفاعلية مختلفة)
               ══════════════════════════════════════════════════════════════════ */}
            <div className="lg:col-span-6 p-5 md:p-7 bg-gradient-to-bl from-slate-900/95 via-slate-950 to-slate-900/90 border-b lg:border-b-0 lg:border-l border-slate-800/90 flex flex-col justify-between relative">
              <div className="hidden lg:block absolute top-0 bottom-0 left-0 w-8 bg-gradient-to-r from-black/50 to-transparent pointer-events-none" />

              <AnimatePresence mode="wait">
                <motion.div
                  key={`right-page-${spreadIndex}`}
                  initial={{ opacity: 0, rotateY: flipDirection === 'next' ? -35 : 35 }}
                  animate={{ opacity: 1, rotateY: 0 }}
                  exit={{ opacity: 0, rotateY: flipDirection === 'next' ? 35 : -35 }}
                  transition={{ duration: 0.38, ease: 'easeOut' }}
                  style={{ transformOrigin: 'left center' }}
                  className="space-y-4"
                >
                  <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                    <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30">
                      {currentBlock.badge}
                    </span>
                    <span className="font-mono text-xs text-slate-400">
                      صفحة يمنى · {spreadIndex * 2 + 1} / {contentBlocks.length * 2}
                    </span>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-lg md:text-xl font-black text-white leading-snug">
                      {currentBlock.heading}
                    </h3>
                    <div
                      className="text-slate-200 text-xs md:text-sm leading-relaxed space-y-2 max-h-[300px] overflow-y-auto pl-2 pr-1"
                      dangerouslySetInnerHTML={{
                        __html: safeInlineFormat(currentBlock.body),
                      }}
                    />

                    {currentBlock.formula && (
                      <div
                        dir="ltr"
                        className="p-2.5 rounded-xl bg-slate-950 border border-cyan-500/30 font-mono text-xs text-cyan-300 text-center overflow-x-auto"
                      >
                        {currentBlock.formula}
                      </div>
                    )}

                    {currentBlock.saudiCase && (
                      <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-xs text-emerald-200 leading-relaxed">
                        <strong className="text-emerald-400 block mb-0.5">
                          🇸🇦 تطبيق وطني ومؤسسي (NCA / السياق السعودي):
                        </strong>
                        {currentBlock.saudiCase}
                      </div>
                    )}
                  </div>

                  <div className="pt-2 border-t border-slate-800/80 space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-[11px] font-bold text-slate-400">
                        مختبر الصفحة اليمنى ({spreadIndex + 1}/{contentBlocks.length}):
                      </span>
                      <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
                        <button
                          type="button"
                          onClick={() => setRightBottomTab('simulator')}
                          className={cn(
                            'px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer flex items-center gap-1',
                            effectiveRightWidget === 'simulator'
                              ? 'bg-emerald-500 text-slate-950'
                              : 'text-slate-400 hover:text-white'
                          )}
                        >
                          <Sliders className="w-3 h-3" />
                          <span>محاكي المعادلة</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setRightBottomTab('code')}
                          className={cn(
                            'px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer flex items-center gap-1',
                            effectiveRightWidget === 'code'
                              ? 'bg-amber-500 text-slate-950'
                              : 'text-slate-400 hover:text-white'
                          )}
                        >
                          <Code className="w-3 h-3" />
                          <span>الكود الحي</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setRightBottomTab('solved')}
                          className={cn(
                            'px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer flex items-center gap-1',
                            effectiveRightWidget === 'solved' || effectiveRightWidget === 'tables'
                              ? 'bg-cyan-500 text-slate-950'
                              : 'text-slate-400 hover:text-white'
                          )}
                        >
                          <TableIcon className="w-3 h-3" />
                          <span>أمثلة وجداول الفصل</span>
                        </button>
                      </div>
                    </div>

                    {effectiveRightWidget === 'simulator' && (
                      <div className="p-4 rounded-2xl bg-slate-900/95 border border-emerald-500/35 shadow-inner space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-bold text-emerald-400 flex items-center gap-1.5">
                            <Sliders className="w-3.5 h-3.5" />
                            <span>{profile.formulaSim.title}</span>
                          </span>
                          <span className="text-[10px] font-mono text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
                            تفاعل رياضي حي
                          </span>
                        </div>

                        <div
                          dir="ltr"
                          className="p-2 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-cyan-300 text-center overflow-x-auto"
                        >
                          {profile.formulaSim.symbolicEquation}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                          <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
                            <div className="flex justify-between text-[11px] mb-1">
                              <span className="text-slate-400">{profile.formulaSim.paramALabel}</span>
                              <span className="font-mono font-bold text-emerald-400">{paramA}</span>
                            </div>
                            <input
                              type="range"
                              min={profile.formulaSim.paramAMin}
                              max={profile.formulaSim.paramAMax}
                              value={paramA}
                              onChange={(e) => setParamA(Number(e.target.value))}
                              className="w-full accent-emerald-500 cursor-pointer"
                            />
                          </div>

                          <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
                            <div className="flex justify-between text-[11px] mb-1">
                              <span className="text-slate-400">{profile.formulaSim.paramBLabel}</span>
                              <span className="font-mono font-bold text-amber-400">{paramB}</span>
                            </div>
                            <input
                              type="range"
                              min={profile.formulaSim.paramBMin}
                              max={profile.formulaSim.paramBMax}
                              value={paramB}
                              onChange={(e) => setParamB(Number(e.target.value))}
                              className="w-full accent-amber-500 cursor-pointer"
                            />
                          </div>
                        </div>

                        <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/30 space-y-1">
                          <p className="text-xs font-bold text-emerald-300 font-mono">
                            {liveFormulaResult.primaryOutput}
                          </p>
                          <p className="text-[11px] text-slate-300">
                            {liveFormulaResult.secondaryOutput}
                          </p>
                        </div>
                      </div>
                    )}

                    {effectiveRightWidget === 'code' && (
                      <LiveCodeFloatingStudio
                        chapterNumber={chapter.chapter_number}
                        chapterTitle={chapter.title}
                        courseCode={courseTitle}
                        courseSlug={effectiveCourseSlug}
                      />
                    )}

                    {(effectiveRightWidget === 'solved' || effectiveRightWidget === 'tables') && (
                      <div className="p-4 rounded-2xl bg-slate-900/95 border border-cyan-500/35 space-y-3">
                        {chapter.richData?.commonMistake && (
                          <div className="p-3 rounded-xl bg-rose-950/30 border border-rose-500/30 text-xs space-y-1">
                            <div className="font-black text-rose-300 flex items-center gap-1.5">
                              <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                              <span>خطأ هندسي شائع في هذا الفصل:</span>
                            </div>
                            <p className="text-slate-300">{chapter.richData.commonMistake.mistake}</p>
                            <p className="text-emerald-300 pt-1">
                              <strong>التصحيح الهندسي المعتمد: </strong>
                              {chapter.richData.commonMistake.fix}
                            </p>
                          </div>
                        )}

                        {chapter.richData?.tables && chapter.richData.tables.length > 0 ? (
                          <div className="space-y-2">
                            <div className="text-xs font-black text-cyan-300">
                              {chapter.richData.tables[0].title}
                            </div>
                            <div className="overflow-x-auto rounded-xl border border-slate-800">
                              <table className="w-full text-right text-[11px]">
                                <thead className="bg-slate-950 text-amber-300">
                                  <tr>
                                    {chapter.richData.tables[0].headers.map((h, hi) => (
                                      <th key={hi} className="p-2 border-b border-slate-800">
                                        {h}
                                      </th>
                                    ))}
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-800/70 bg-slate-900/70 text-slate-200">
                                  {chapter.richData.tables[0].rows.map((row, ri) => (
                                    <tr key={ri}>
                                      {row.map((cell, ci) => (
                                        <td key={ci} className="p-2">
                                          {cell}
                                        </td>
                                      ))}
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        ) : currentPage3D ? (
                          <div className="space-y-2">
                            <div className="text-xs font-black text-cyan-300">
                              ملخص الصفحة ثلاثية الأبعاد ({currentPage3D.title})
                            </div>
                            <p className="text-xs text-slate-300 leading-relaxed">
                              {currentPage3D.narrative}
                            </p>
                          </div>
                        ) : null}
                      </div>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-wrap items-center gap-1.5">
                {spreadTopics.map((t, i) => (
                  <span
                    key={i}
                    className="text-[10px] px-2.5 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300"
                  >
                    • {t}
                  </span>
                ))}
              </div>
            </div>

            {/* ══════════════════════════════════════════════════════════════════
                LEFT PAGE (الصفحة اليسرى: تتزامن تلقائياً مع رقم الصفحة spreadIndex)
               ══════════════════════════════════════════════════════════════════ */}
            <div className="lg:col-span-6 p-5 md:p-7 bg-gradient-to-br from-slate-900/95 via-slate-950 to-slate-900/90 flex flex-col justify-between relative">
              <div className="hidden lg:block absolute top-0 bottom-0 right-0 w-8 bg-gradient-to-l from-black/50 to-transparent pointer-events-none" />

              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                  <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800">
                    <button
                      type="button"
                      onClick={() => setLeftStageTab('hologram3d')}
                      className={cn(
                        'px-3 py-1 rounded-lg text-[11px] font-bold transition-all flex items-center gap-1.5 cursor-pointer',
                        leftStageTab === 'hologram3d'
                          ? 'bg-amber-500 text-slate-950 shadow'
                          : 'text-slate-400 hover:text-white'
                      )}
                    >
                      <Cpu className="w-3.5 h-3.5" />
                      <span>المجسم التفاعلي 3D</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setLeftStageTab('diagram2d')}
                      className={cn(
                        'px-3 py-1 rounded-lg text-[11px] font-bold transition-all flex items-center gap-1.5 cursor-pointer',
                        leftStageTab === 'diagram2d'
                          ? 'bg-cyan-500 text-slate-950 shadow'
                          : 'text-slate-400 hover:text-white'
                      )}
                    >
                      <Layers className="w-3.5 h-3.5" />
                      <span>المخطط الهندسي</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setLeftStageTab('quiz')}
                      className={cn(
                        'px-3 py-1 rounded-lg text-[11px] font-bold transition-all flex items-center gap-1.5 cursor-pointer',
                        leftStageTab === 'quiz'
                          ? 'bg-emerald-500 text-slate-950 shadow'
                          : 'text-slate-400 hover:text-white'
                      )}
                    >
                      <Trophy className="w-3.5 h-3.5" />
                      <span>اختبر فهمك ({quizList.length})</span>
                    </button>
                  </div>

                  <span className="font-mono text-xs text-slate-400">
                    صفحة يسرى · {spreadIndex * 2 + 2} / {contentBlocks.length * 2}
                  </span>
                </div>

                {leftStageTab === 'hologram3d' && (
                  <>
                    {currentPage3D && (
                      <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-emerald-500/30 space-y-1.5">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-black text-emerald-300">
                            مشهد الصفحة ({spreadIndex + 1}): {currentPage3D.title}
                          </span>
                          <span className="text-[10px] font-mono text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
                            {currentPage3D.subtitle}
                          </span>
                        </div>
                        {currentPage3D.visualNotes.length > 0 && (
                          <ul className="space-y-1 pt-1">
                            {currentPage3D.visualNotes.slice(0, 2).map((note, ni) => (
                              <li key={ni} className="text-[11px] text-slate-300 flex items-start gap-1.5">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                                <span>{note}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    )}

                    <div className="relative rounded-2xl overflow-hidden border border-emerald-500/35 bg-slate-950 shadow-2xl">
                      <canvas
                        ref={canvasRef}
                        onMouseDown={handleCanvasMouseDown}
                        onMouseMove={handleCanvasMouseMove}
                        onMouseUp={handleCanvasMouseUp}
                        onMouseLeave={handleCanvasMouseUp}
                        className="w-full h-[235px] md:h-[255px] cursor-grab active:cursor-grabbing block"
                      />

                      <div className="absolute top-3 right-3 left-3 flex items-center justify-between pointer-events-none">
                        <div className="px-3 py-1 rounded-xl bg-slate-950/85 border border-slate-800 backdrop-blur-md">
                          <span className="text-[11px] font-black text-emerald-300 block">
                            {profile.modelTitleAr}
                          </span>
                          <span className="text-[9px] font-mono text-slate-400 block">
                            انقر على الأرقام المضيئة (1..{profile.hotspots.length}) للتشريح العلمي أو اسحب للتدوير 3D
                          </span>
                        </div>

                        <div className="flex items-center gap-1 pointer-events-auto">
                          <button
                            type="button"
                            onClick={() => setAutoRotate((prev) => !prev)}
                            className="p-1.5 rounded-lg bg-slate-900/90 border border-slate-700 text-amber-300 hover:bg-slate-800 cursor-pointer"
                            title={autoRotate ? 'إيقاف الدوران التلقائي' : 'تشغيل الدوران التلقائي'}
                          >
                            {autoRotate ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              rotationRef.current = { yaw: 0.45, pitch: 0.28 };
                              setZoom3D(1.0);
                            }}
                            className="p-1.5 rounded-lg bg-slate-900/90 border border-slate-700 text-slate-300 hover:bg-slate-800 cursor-pointer"
                            title="إعادة ضبط زاوية الكاميرا 3D"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <div className="p-2.5 bg-slate-900/95 border-t border-slate-800 flex flex-wrap items-center gap-1.5">
                        <span className="text-[10px] font-bold text-slate-400 ml-1">
                          أجزاء المجسم للفصل {chapter.chapter_number}:
                        </span>
                        {profile.hotspots.map((hs, idx) => {
                          const active = hs.id === selectedHotspotId;
                          return (
                            <button
                              key={hs.id}
                              type="button"
                              onClick={() => setSelectedHotspotId(hs.id)}
                              className={cn(
                                'px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all flex items-center gap-1.5 cursor-pointer border',
                                active
                                  ? 'bg-amber-500/20 border-amber-400 text-amber-300 shadow'
                                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                              )}
                            >
                              <span
                                className="w-4 h-4 rounded-full text-[10px] font-black text-slate-950 flex items-center justify-center"
                                style={{ backgroundColor: hs.color }}
                              >
                                {idx + 1}
                              </span>
                              <span className="font-mono">{hs.symbol}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {activeHotspot && (
                      <motion.div
                        key={activeHotspot.id}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 rounded-2xl bg-slate-900/90 border border-amber-500/35 space-y-2"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-black text-amber-300 flex items-center gap-2">
                            <Sparkles className="w-4 h-4" />
                            <span>تشريح الجزء المختار: {activeHotspot.label}</span>
                          </span>
                        </div>

                        <div
                          dir="ltr"
                          className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-emerald-300"
                        >
                          {activeHotspot.formula}
                        </div>

                        <p className="text-xs text-slate-200 leading-relaxed">
                          {activeHotspot.explanation}
                        </p>
                        <p className="text-[11px] text-cyan-300 bg-cyan-950/30 border border-cyan-500/25 px-3 py-1.5 rounded-xl">
                          <strong className="text-cyan-400">الأثر الأمني والهندسي: </strong>
                          {activeHotspot.securityImpact}
                        </p>
                      </motion.div>
                    )}

                    <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black text-emerald-400 flex items-center gap-1.5">
                          <Zap className="w-4 h-4" />
                          <span>محاكي الخطوات العلمية المتسلسلة للفصل {chapter.chapter_number}</span>
                        </span>
                        <div className="flex items-center gap-1">
                          {profile.steps.map((st, si) => (
                            <button
                              key={st.step}
                              type="button"
                              onClick={() => setActiveStepIndex(si)}
                              className={cn(
                                'w-6 h-6 rounded-lg text-[11px] font-black transition-all cursor-pointer',
                                activeStepIndex === si
                                  ? 'bg-emerald-500 text-slate-950'
                                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                              )}
                            >
                              {st.step}
                            </button>
                          ))}
                        </div>
                      </div>

                      {profile.steps[activeStepIndex] && (
                        <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1.5">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-white">
                              الخطوة {profile.steps[activeStepIndex].step}:{' '}
                              {profile.steps[activeStepIndex].title}
                            </span>
                            <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                              {profile.steps[activeStepIndex].symbol}
                            </span>
                          </div>
                          <div
                            dir="ltr"
                            className="font-mono text-[11px] text-amber-300 bg-slate-950 px-2.5 py-1 rounded border border-slate-800"
                          >
                            {profile.steps[activeStepIndex].formula}
                          </div>
                          <p className="text-xs text-slate-300 leading-relaxed">
                            {profile.steps[activeStepIndex].detail}
                          </p>
                        </div>
                      )}
                    </div>
                  </>
                )}

                {leftStageTab === 'diagram2d' && (
                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                    <ChapterDiagram
                      chapterNumber={chapter.chapter_number}
                      courseSlug={effectiveCourseSlug}
                    />
                  </div>
                )}

                {leftStageTab === 'quiz' && (
                  <div className="space-y-3 max-h-[520px] overflow-y-auto pr-1">
                    {quizList.length > 0 ? (
                      quizList.map((q, qi) => {
                        const selected = quizAnswers[qi];
                        const showRes = selected !== undefined;
                        return (
                          <div
                            key={qi}
                            className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3"
                          >
                            <p className="text-xs font-bold text-white">
                              {qi + 1}. {q.question}
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {q.options.map((opt, oi) => (
                                <button
                                  key={oi}
                                  type="button"
                                  disabled={showRes}
                                  onClick={() =>
                                    setQuizAnswers((prev) => ({ ...prev, [qi]: oi }))
                                  }
                                  className={cn(
                                    'p-2.5 rounded-xl text-xs text-right border transition-all cursor-pointer',
                                    showRes
                                      ? oi === q.correctIndex
                                        ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold'
                                        : oi === selected
                                        ? 'bg-rose-500/20 border-rose-500 text-rose-300'
                                        : 'bg-slate-900 border-slate-800 text-slate-500'
                                      : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-amber-500/40'
                                  )}
                                >
                                  {opt}
                                </button>
                              ))}
                            </div>
                            {showRes && (
                              <p
                                className={cn(
                                  'text-[11px] p-2.5 rounded-xl border',
                                  selected === q.correctIndex
                                    ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-300'
                                    : 'bg-rose-950/40 border-rose-500/30 text-rose-300'
                                )}
                              >
                                {q.explanation}
                              </p>
                            )}
                          </div>
                        );
                      })
                    ) : (
                      <p className="text-xs text-slate-400 text-center py-10">
                        استخدم محاكي المعادلات والمجسم التفاعلي لاختبار الفرضيات العلمية للفصل.
                      </p>
                    )}
                  </div>
                )}
              </div>

              <div className="relative z-30 pointer-events-auto mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={handlePrevSpread}
                  className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 active:scale-95 border border-amber-500/40 text-xs font-bold text-amber-300 flex items-center gap-1.5 cursor-pointer shadow-md transition-all"
                >
                  <ChevronRight className="w-4 h-4" />
                  <span>{spreadIndex === 0 ? 'رجوع لفهرس الفصول' : 'الصفحة السابقة'}</span>
                </button>

                <div className="flex items-center gap-2">
                  {contentBlocks.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setFlipDirection(idx > spreadIndex ? 'next' : 'prev');
                        setSpreadIndex(idx);
                        syncSpreadInteractiveState(idx);
                      }}
                      className={cn(
                        'rounded-full transition-all cursor-pointer',
                        idx === spreadIndex
                          ? 'w-7 h-2.5 bg-amber-500 shadow shadow-amber-500/50'
                          : 'w-3 h-3 bg-slate-700 hover:bg-slate-500'
                      )}
                      title={`الانتقال إلى الصفحة المزدوجة ${idx + 1}`}
                    />
                  ))}
                </div>

                <button
                  type="button"
                  onClick={handleNextSpread}
                  disabled={spreadIndex >= contentBlocks.length - 1}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-l from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 active:scale-95 text-slate-950 text-xs font-black shadow-lg shadow-amber-500/20 disabled:opacity-40 flex items-center gap-1.5 cursor-pointer transition-all"
                >
                  <span>تقليب الصفحة 3D</span>
                  <ChevronLeft className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { InteractiveTextbook };
```
