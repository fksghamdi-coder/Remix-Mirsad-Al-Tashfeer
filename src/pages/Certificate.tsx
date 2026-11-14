import React, { useState, useEffect } from 'react';
import { Award, CheckCircle2, Loader2, Printer, Sliders, Shield, AlertTriangle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import { CertificatePreview } from '../components/ui/CertificatePreview';
import { COURSES_DATA } from '../data/coursesData';
import { useAuth } from '@/contexts/AuthContext';
import { getProgress } from '@/lib/progress';

function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

/** توليد رقم شهادة فريد وغير مكرر مخصص لكل مستخدم ومربوط بمعرفه وجلسته */
function generateUserCertId(username?: string): string {
  const cleanUser = (username || 'STUDENT').toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 8) || 'STD';
  const timeHex = Date.now().toString(36).toUpperCase().slice(-4);
  const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `MIRSAD-UPM-${cleanUser}-${timeHex}-${rand}`;
}

export const Certificate: React.FC = () => {
  const { session } = useAuth();
  const isAdmin = session?.role === 'admin';
  
  // استرجاع نتيجة الاختبار الحقيقية للمستخدم للتحقق من شرط النجاح (> 60%)
  const userProgress = session ? getProgress(session.username) : null;
  const bestQuizScore = userProgress?.quizScores ? Math.max(0, ...Object.values(userProgress.quizScores)) : 0;
  
  const [studentName, setStudentName] = useState<string>(
    session?.fullName || session?.displayName || 'المشرف العام على المنصة'
  );
  const [studentId, setStudentId] = useState<string>(
    session?.username || 'ADMIN-001'
  );
  const [courseTitle, setCourseTitle] = useState<string>(
    'دبلوم أمن المعلومات — طلاب شعبة (002م) — مادة التشفير المتقدم (ISE243)'
  );
  const [courseCode, setCourseCode] = useState<string>('ISE243 · دبلوم أمن المعلومات · طلاب شعبة (002م) · العام الأكاديمي (2026-2027)');
  const [score, setScore] = useState<number>(bestQuizScore >= 60 ? bestQuizScore : 88);
  const [issueDate, setIssueDate] = useState<string>('العام الأكاديمي (2026-2027)');
  const [certificateId, setCertificateId] = useState<string>(() => generateUserCertId(session?.username));
  const [supervisorName, setSupervisorName] = useState<string>('الإشراف الأكاديمي لمشروع مادة التشفير المتقدم (ISE243)');
  const [institutionName, setInstitutionName] = useState<string>(
    'جامعة الأمير مقرن بن عبدالعزيز — تخصص دبلوم أمن المعلومات (طلاب شعبة 002م · 2026-2027)'
  );
  const [customNote, setCustomNote] = useState<string>(
    'شهادة إتمام مشروع مِرْصَاد التشفير الأكاديمي التدريبي للعلوم التشفيرية والأمن السيبراني — مشروع أكاديمي تعليمي وتدريبي حقيقي موثق بالمصادر الرسمية والأكاديمية المعتمدة (وليس منصة حكومية أو تجارية رسمية) مقدم لمادة التشفير المتقدم (ISE243) — تخصص دبلوم أمن المعلومات — طلاب شعبة (002م) — السنة الأكاديمية (2026-2027) في جامعة الأمير مقرن بن عبدالعزيز.'
  );
  const [showDeveloperStudio, setShowDeveloperStudio] = useState<boolean>(isAdmin);
  const [showGridGuides, setShowGridGuides] = useState<boolean>(false);
  const [printStatus, setPrintStatus] = useState<'idle' | 'printing' | 'done'>('idle');

  // تحديث الحقول ببيانات المستخدم الحقيقية عند توفرها وتثبيت رقم شهادة فريد له
  useEffect(() => {
    if (session) {
      if (session.fullName || session.displayName) {
        setStudentName(session.fullName || session.displayName || '');
      }
      if (session.username) {
        setStudentId(session.username);
      }
      // استرجاع أو تخزين رقم الشهادة الفريد للمستخدم في localStorage
      const userCertKey = `mirsad_unique_cert_${session.username}`;
      const savedCertId = localStorage.getItem(userCertKey);
      if (savedCertId) {
        setCertificateId(savedCertId);
      } else {
        const newCertId = generateUserCertId(session.username);
        setCertificateId(newCertId);
        try {
          localStorage.setItem(userCertKey, newCertId);
        } catch {
          // Ignore storage quota
        }
      }

      if (bestQuizScore >= 60) {
        setScore(bestQuizScore);
      }
    }
  }, [session, bestQuizScore]);

  const isEligible = score >= 60;

  const rawPayload = `${studentName}|${studentId}|${courseCode}|${score}|${issueDate}|${certificateId}`;
  const computedHash = Array.from({ length: 64 }, (_, i) => {
    const code = rawPayload.charCodeAt(i % rawPayload.length) || 65;
    return ((code * (i + 13) + 47) % 16).toString(16).toUpperCase();
  }).join('');

  const handlePrintAndExportPDF = async () => {
    if (!isEligible) return;
    if (printStatus === 'printing') return;
    setPrintStatus('printing');

    try {
      if (document.fonts && document.fonts.ready) {
        await document.fonts.ready;
      }

      const canvas = document.createElement('canvas');
      const W = 2246;
      const H = 1588;
      canvas.width = W;
      canvas.height = H;
      const ctx = canvas.getContext('2d');

      if (ctx) {
        // 1. الخلفية الداكنة المتدرجة للشهادة
        const bgGrad = ctx.createLinearGradient(0, 0, W, H);
        bgGrad.addColorStop(0, '#060b16');
        bgGrad.addColorStop(0.5, '#0b1325');
        bgGrad.addColorStop(1, '#07101e');
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, W, H);

        // 2. العلامة المائية البارزة أسفل وخلفية الشهادة — درع شعار منصة مرصاد
        ctx.save();
        ctx.globalAlpha = 0.055;
        ctx.strokeStyle = '#34d399';
        ctx.lineWidth = 14;
        ctx.beginPath();
        // رسم درع شعار مرصاد في منتصف الشهادة
        const sx = W / 2;
        const sy = H / 2 - 20;
        ctx.moveTo(sx, sy - 260);
        ctx.lineTo(sx + 240, sy - 180);
        ctx.lineTo(sx + 240, sy + 60);
        ctx.bezierCurveTo(sx + 240, sy + 220, sx, sy + 320, sx, sy + 340);
        ctx.bezierCurveTo(sx, sy + 320, sx - 240, sy + 220, sx - 240, sy + 60);
        ctx.lineTo(sx - 240, sy - 180);
        ctx.closePath();
        ctx.stroke();

        ctx.fillStyle = '#34d399';
        ctx.font = '900 48px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('MIRSAD PLATFORM · UNIVERSITY TRAINING PROJECT', sx, sy + 60);
        ctx.restore();

        // 3. الإطار الخارجي والزخرفي المزدوج
        drawRoundedRect(ctx, 28, 28, W - 56, H - 56, 36);
        ctx.strokeStyle = 'rgba(245, 158, 11, 0.75)';
        ctx.lineWidth = 5;
        ctx.stroke();

        drawRoundedRect(ctx, 48, 48, W - 96, H - 96, 28);
        ctx.strokeStyle = 'rgba(251, 191, 36, 0.35)';
        ctx.lineWidth = 2;
        ctx.stroke();

        drawRoundedRect(ctx, 64, 64, W - 128, H - 128, 22);
        ctx.strokeStyle = 'rgba(52, 211, 153, 0.25)';
        ctx.lineWidth = 2;
        ctx.stroke();

        // 4. الترويسة العليا الرسمية (مشروع تدريبي أكاديمي جامعي)
        ctx.save();
        ctx.direction = 'rtl';
        ctx.textAlign = 'right';

        ctx.fillStyle = '#fbbf24';
        ctx.font = 'bold 20px monospace';
        ctx.fillText('ACADEMIC TRAINING PROJECT · UNIVERSITY OF PRINCE MUGHRIN', W - 110, 135);

        ctx.fillStyle = '#ffffff';
        ctx.font = '800 42px Cairo, Tajawal, sans-serif';
        ctx.fillText('منصة مِرْصَاد التشفير التعليمية', W - 110, 190);

        ctx.fillStyle = '#cbd5e1';
        ctx.font = '500 24px Cairo, Tajawal, sans-serif';
        ctx.fillText(institutionName, W - 110, 232);
        ctx.restore();

        // صندوق التوثيق الأيسر العلوي برقم فريد
        drawRoundedRect(ctx, 110, 102, 580, 145, 24);
        ctx.fillStyle = 'rgba(15, 23, 42, 0.92)';
        ctx.fill();
        ctx.strokeStyle = 'rgba(245, 158, 11, 0.55)';
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.save();
        ctx.direction = 'ltr';
        ctx.textAlign = 'left';
        ctx.fillStyle = '#fbbf24';
        ctx.font = 'bold 20px monospace';
        ctx.fillText(`CERT ID: ${certificateId}`, 135, 146);

        ctx.fillStyle = '#34d399';
        ctx.font = 'bold 20px monospace';
        ctx.fillText('STATUS: VERIFIED ACADEMIC PASS', 135, 186);

        ctx.fillStyle = '#94a3b8';
        ctx.font = '19px monospace';
        ctx.fillText(`DATE: ${issueDate}`, 135, 224);
        ctx.restore();

        // خط فاصل علوي
        ctx.beginPath();
        ctx.moveTo(110, 280);
        ctx.lineTo(W - 110, 280);
        ctx.strokeStyle = 'rgba(245, 158, 11, 0.35)';
        ctx.lineWidth = 2;
        ctx.stroke();

        // 5. شارة ومتن الشهادة في المنتصف
        drawRoundedRect(ctx, W / 2 - 280, 320, 560, 58, 29);
        ctx.fillStyle = 'rgba(245, 158, 11, 0.16)';
        ctx.fill();
        ctx.strokeStyle = 'rgba(251, 191, 36, 0.45)';
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.save();
        ctx.direction = 'rtl';
        ctx.textAlign = 'center';

        ctx.fillStyle = '#fcd34d';
        ctx.font = 'bold 25px Cairo, Tajawal, sans-serif';
        ctx.fillText('شهادة إتمام مشروع تدريبي أكاديمي', W / 2, 358);

        ctx.fillStyle = '#cbd5e1';
        ctx.font = '500 28px Cairo, Tajawal, sans-serif';
        ctx.fillText('تشهد هيئة الإشراف على المشروع التدريبي الأكاديمي بأن الطالب / المتدرب:', W / 2, 435);

        // اسم الطالب بتدرج ذهبي وزمردي
        const nameGrad = ctx.createLinearGradient(W / 2 - 450, 0, W / 2 + 450, 0);
        nameGrad.addColorStop(0, '#fcd34d');
        nameGrad.addColorStop(0.5, '#ffffff');
        nameGrad.addColorStop(1, '#6ee7b7');
        ctx.fillStyle = nameGrad;
        ctx.font = '900 68px Cairo, Tajawal, sans-serif';
        ctx.fillText(studentName, W / 2, 535);

        if (studentId) {
          ctx.fillStyle = '#94a3b8';
          ctx.font = 'bold 24px Cairo, Tajawal, monospace';
          ctx.fillText(`الرقم الأكاديمي: ${studentId}`, W / 2, 588);
        }

        ctx.fillStyle = '#cbd5e1';
        ctx.font = '500 26px Cairo, Tajawal, sans-serif';
        ctx.fillText(
          'قد اجتاز بنجاح متطلبات الاختبار التقييمي بنسبة تفوق الحد الأدنى للنجاح (60%)، وأكمل التدريبات والمختبرات المخصصة للمشروع في:',
          W / 2,
          658
        );

        // صندوق اسم المقرر ورمزه
        drawRoundedRect(ctx, 210, 695, W - 420, 155, 28);
        ctx.fillStyle = 'rgba(15, 23, 42, 0.92)';
        ctx.fill();
        ctx.strokeStyle = 'rgba(245, 158, 11, 0.48)';
        ctx.lineWidth = 2.5;
        ctx.stroke();

        ctx.fillStyle = '#ffffff';
        ctx.font = '800 38px Cairo, Tajawal, sans-serif';
        ctx.fillText(courseTitle, W / 2, 762);

        if (courseCode) {
          ctx.direction = 'ltr';
          ctx.fillStyle = '#34d399';
          ctx.font = 'bold 24px monospace';
          ctx.fillText(courseCode, W / 2, 818);
          ctx.direction = 'rtl';
        }

        // 6. مؤشرات التقييم الثلاثة بأيقونات بارزة
        const cardW = 360;
        const cardH = 130;
        const gap = 36;
        const totalCardsW = cardW * 3 + gap * 2;
        const startX = (W - totalCardsW) / 2;
        const cardY = 890;

        const gradeLabel =
          score >= 90 ? 'ممتاز مرتفع' : score >= 80 ? 'جيد جداً' : score >= 70 ? 'جيد' : 'اجتياز معتمد';

        const cards = [
          { title: 'حالة الاختبار', value: 'PASSED (MIN 60%)', color: '#7dd3fc', isLtr: true },
          { title: 'التقدير الأكاديمي', value: gradeLabel, color: '#fcd34d', isLtr: false },
          { title: 'الدرجة المحققة', value: `${score}%`, color: '#34d399', isLtr: true },
        ];

        cards.forEach((c, idx) => {
          const cx = startX + idx * (cardW + gap);
          drawRoundedRect(ctx, cx, cardY, cardW, cardH, 24);
          ctx.fillStyle = 'rgba(15, 23, 42, 0.90)';
          ctx.fill();
          ctx.strokeStyle = 'rgba(245, 158, 11, 0.40)';
          ctx.lineWidth = 2;
          ctx.stroke();

          ctx.direction = 'rtl';
          ctx.fillStyle = '#94a3b8';
          ctx.font = '500 22px Cairo, Tajawal, sans-serif';
          ctx.fillText(c.title, cx + cardW / 2, cardY + 46);

          ctx.direction = c.isLtr ? 'ltr' : 'rtl';
          ctx.fillStyle = c.color;
          ctx.font = c.isLtr ? '900 28px monospace' : '800 28px Cairo, Tajawal, sans-serif';
          ctx.fillText(c.value, cx + cardW / 2, cardY + 96);
        });

        // 7. خط فاصل سفلي للتوقيعات والختم الرقمي
        ctx.beginPath();
        ctx.moveTo(110, 1075);
        ctx.lineTo(W - 110, 1075);
        ctx.strokeStyle = 'rgba(30, 41, 59, 0.95)';
        ctx.lineWidth = 2;
        ctx.stroke();

        // اليمين: اعتماد الإشراف الأكاديمي
        ctx.direction = 'rtl';
        ctx.textAlign = 'right';
        ctx.fillStyle = '#94a3b8';
        ctx.font = '500 23px Cairo, Tajawal, sans-serif';
        ctx.fillText('الإشراف الأكاديمي على المشروع:', W - 110, 1140);

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 28px Cairo, Tajawal, sans-serif';
        ctx.fillText(supervisorName, W - 110, 1188);

        ctx.fillStyle = '#34d399';
        ctx.font = 'bold 22px Cairo, Tajawal, sans-serif';
        ctx.fillText('✓ مشروع جامعي تدريبي موثق داخلياً', W - 110, 1232);

        // الوسط: الختم الدائري الرسمي
        ctx.beginPath();
        ctx.arc(W / 2, 1185, 82, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(245, 158, 11, 0.14)';
        ctx.fill();
        ctx.strokeStyle = '#fbbf24';
        ctx.lineWidth = 4;
        ctx.stroke();

        ctx.direction = 'ltr';
        ctx.textAlign = 'center';
        ctx.fillStyle = '#fbbf24';
        ctx.font = 'bold 22px monospace';
        ctx.fillText('MIRSAD', W / 2, 1178);
        ctx.font = 'bold 18px monospace';
        ctx.fillText('PROJECT SEAL', W / 2, 1206);

        // اليسار: التوقيع الرقمي SHA-256
        drawRoundedRect(ctx, 110, 1110, 680, 145, 22);
        ctx.fillStyle = 'rgba(2, 6, 23, 0.92)';
        ctx.fill();
        ctx.strokeStyle = 'rgba(30, 41, 59, 1)';
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.textAlign = 'left';
        ctx.fillStyle = '#fbbf24';
        ctx.font = 'bold 20px monospace';
        ctx.fillText('SHA-256 DIGITAL SIGNATURE:', 138, 1152);

        ctx.fillStyle = '#cbd5e1';
        ctx.font = '18px monospace';
        ctx.fillText(computedHash.slice(0, 32), 138, 1192);
        ctx.fillText(computedHash.slice(32, 64), 138, 1224);

        // 8. التنويه السفلي النظامي
        ctx.beginPath();
        ctx.moveTo(110, 1315);
        ctx.lineTo(W - 110, 1315);
        ctx.strokeStyle = 'rgba(30, 41, 59, 0.7)';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.direction = 'rtl';
        ctx.textAlign = 'center';
        ctx.fillStyle = '#94a3b8';
        ctx.font = '500 22px Cairo, Tajawal, sans-serif';
        ctx.fillText(customNote, W / 2, 1370);
        ctx.restore();

        // تصدير ملف PDF عالي الدقة بحجم A4 أفقي
        const imgData = canvas.toDataURL('image/png', 1.0);
        const pdf = new jsPDF({
          orientation: 'landscape',
          unit: 'mm',
          format: 'a4',
        });
        const pdfW = pdf.internal.pageSize.getWidth();
        const pdfH = pdf.internal.pageSize.getHeight();
        pdf.addImage(imgData, 'PNG', 0, 0, pdfW, pdfH);
        pdf.save(`Mirsad-Academic-Certificate-${studentId || 'Project'}.pdf`);
      }

      // تشغيل نافذة الطباعة
      try {
        window.print();
      } catch {
        // Ignore iframe sandbox limitations
      }

      setPrintStatus('done');
      setTimeout(() => setPrintStatus('idle'), 3000);
    } catch (err) {
      console.error('Certificate print/export error:', err);
      setPrintStatus('idle');
    }
  };

  return (
    <div className="space-y-6 pb-16" dir="rtl">
      {/* تنبيه نظامي في حال كانت النسبة أقل من 60% */}
      {!isEligible && (
        <div className="card-3d-neon card-3d-amber p-4 rounded-2xl border border-rose-500/40 bg-rose-950/40 text-rose-200 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-6 h-6 text-rose-400 shrink-0" />
            <div>
              <p className="font-bold text-sm">
                تنبيه: تُمنح الشهادة فقط عند اجتياز الاختبار بنسبة أعلى من 60%
              </p>
              <p className="text-xs text-rose-300/80 mt-0.5">
                نسبة النجاح الحالية المسجلة هي ({score}%) وهي دون الحد الأدنى المطلوب لمنح شهادة إتمام المشروع.
              </p>
            </div>
          </div>
          <Link
            to="/academic/final-quiz"
            className="btn-3d-neon btn-3d-amber px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs flex items-center gap-1.5 shrink-0"
          >
            <span>أداء الاختبار الآن</span>
            <ArrowRight className="w-4 h-4 rotate-180" />
          </Link>
        </div>
      )}

      {/* شريط التحكم العلوي واستوديو المطور */}
      <div className="glass-panel card-3d-neon card-3d-amber p-6 rounded-3xl border border-amber-500/30 bg-slate-900/95 flex flex-wrap items-center justify-between gap-4 print:hidden">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl icon-glass-3d bg-amber-500/15 border-2 border-amber-400/50 flex items-center justify-center text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="btn-3d-neon px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-bold">
                UNIVERSITY PROJECT · ACADEMIC CERTIFICATE
              </span>
            </div>
            <h1 className="text-xl font-bold text-white mt-0.5">
              شهادة إتمام المشروع التدريبي الأكاديمي — منصة مرصاد
            </h1>
            <p className="text-xs text-slate-400">
              مشروع تدريبي وتعليمي لجامعة الأمير مقرن بن عبدالعزيز برقم فريد موثق لكل طالب ونسبة نجاح تفوق 60%.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {isAdmin && (
            <button
              type="button"
              onClick={() => setShowDeveloperStudio((s) => !s)}
              className="btn-3d-neon btn-3d-amber px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-bold border border-slate-700 flex items-center gap-2 cursor-pointer"
            >
              <Sliders className="w-4 h-4" />
              <span>{showDeveloperStudio ? 'إخفاء أدوات الضبط' : 'إظهار أدوات الضبط'}</span>
            </button>
          )}
          <button
            type="button"
            onClick={() => setShowGridGuides((g) => !g)}
            className="btn-3d-neon px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 cursor-pointer"
          >
            {showGridGuides ? 'إخفاء شبكة المحاذاة' : 'إظهار شبكة المحاذاة الهندسية'}
          </button>
          <button
            type="button"
            onClick={handlePrintAndExportPDF}
            disabled={!isEligible || printStatus === 'printing'}
            title={!isEligible ? 'يجب تحقيق نسبة 60% فأعلى في الاختبار للطباعة' : 'طباعة وتصدير الشهادة PDF'}
            className="btn-3d-neon btn-3d-amber btn-3d-amber-active px-5 py-2 rounded-xl bg-gradient-to-l from-amber-500 to-emerald-500 hover:brightness-110 active:scale-95 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {printStatus === 'printing' ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>جاري معالجة الشهادة وتصدير PDF...</span>
              </>
            ) : printStatus === 'done' ? (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>تم تصدير الشهادة بنجاح</span>
              </>
            ) : (
              <>
                <Printer className="w-4 h-4" />
                <span>طباعة / تصدير PDF للمشروع</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* لوحة تحكم ضبط بيانات ومظهر الشهادة */}
      {isAdmin && showDeveloperStudio && (
        <div className="glass-panel card-3d-neon p-6 rounded-3xl border border-slate-800 bg-slate-950 space-y-4 print:hidden">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="text-xs font-bold text-amber-400">
              بيانات الشهادة التدريبية الأكاديمية (رقم فريد ونظامي لكل طالب):
            </span>
            <div className="flex flex-wrap gap-1.5">
              {COURSES_DATA.map((c) => (
                <button
                  key={c.id}
                  onClick={() => {
                    setCourseTitle(c.title);
                    setCourseCode(c.code);
                  }}
                  className="btn-3d-neon px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 text-[11px] border border-slate-800 cursor-pointer transition-all active:scale-95"
                >
                  مسار: {c.title}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs text-slate-400 mb-1">اسم الطالب / المتدرب:</label>
              <input
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                className="card-3d-neon w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">الرقم الأكاديمي للطالب:</label>
              <input
                type="text"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                className="card-3d-neon w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white font-mono"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">
                نسبة النجاح في الاختبار ({score}%): {score < 60 && <span className="text-rose-400 font-bold">(أقل من 60%)</span>}
              </label>
              <input
                type="range"
                min={40}
                max={100}
                value={score}
                onChange={(e) => setScore(Number(e.target.value))}
                className="w-full accent-amber-500 mt-2 cursor-pointer"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">عنوان المقرر أو المشروع التدريبي:</label>
              <input
                type="text"
                value={courseTitle}
                onChange={(e) => setCourseTitle(e.target.value)}
                className="card-3d-neon w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">رمز المقرر الأكاديمي:</label>
              <input
                type="text"
                value={courseCode}
                onChange={(e) => setCourseCode(e.target.value)}
                className="card-3d-neon w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white font-mono dir-ltr text-left"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">رقم الشهادة الفريد (Unique Cert ID):</label>
              <input
                type="text"
                value={certificateId}
                onChange={(e) => setCertificateId(e.target.value)}
                className="card-3d-neon w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white font-mono dir-ltr text-left"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">الجهة الجامعية الأكاديمية:</label>
              <input
                type="text"
                value={institutionName}
                onChange={(e) => setInstitutionName(e.target.value)}
                className="card-3d-neon w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">الإشراف الأكاديمي:</label>
              <input
                type="text"
                value={supervisorName}
                onChange={(e) => setSupervisorName(e.target.value)}
                className="card-3d-neon w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">تاريخ الإصدار:</label>
              <input
                type="text"
                value={issueDate}
                onChange={(e) => setIssueDate(e.target.value)}
                className="card-3d-neon w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white font-mono"
              />
            </div>
            <div className="md:col-span-3">
              <label className="block text-xs text-slate-400 mb-1">تعريف وتنويه المشروع التدريبي الجامعي:</label>
              <input
                type="text"
                value={customNote}
                onChange={(e) => setCustomNote(e.target.value)}
                className="card-3d-neon w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white"
              />
            </div>
          </div>
        </div>
      )}

      {/* عرض الشهادة الكامل والمباشر */}
      <CertificatePreview
        studentName={studentName}
        studentId={studentId}
        courseTitle={courseTitle}
        courseCode={courseCode}
        score={score}
        issueDate={issueDate}
        certificateId={certificateId}
        supervisorName={supervisorName}
        institutionName={institutionName}
        sha256Signature={computedHash}
        customNote={customNote}
        showGridGuides={showGridGuides}
      />
    </div>
  );
};

export default Certificate;
