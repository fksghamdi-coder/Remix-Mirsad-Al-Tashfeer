import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const esc = (s: string): string =>
  String(s ?? '').replace(
    /[&<>"']/g,
    (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!)
  );

export async function generateCertificate(
  fullName: string,
  academicId: string,
  onReady: (blob: Blob) => void
): Promise<void> {
  // إنشاء عنصر HTML مؤقت للشهادة
  const el = document.createElement('div');
  el.style.position = 'fixed';
  el.style.left = '-9999px';
  el.style.width = '1123px'; // A4 landscape at 96dpi
  el.style.height = '794px';
  el.style.padding = '60px';
  el.style.background = 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)';
  el.style.color = '#f1f5f9';
  el.style.fontFamily = 'Cairo, sans-serif';
  el.style.textAlign = 'center';
  el.style.border = '12px solid #d97706';
  el.dir = 'rtl';

  el.innerHTML = `
    <div style="border: 2px solid #f59e0b; padding: 40px; height: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center;">
      <h1 style="font-size: 42px; color: #fbbf24; margin-bottom: 10px; font-weight: 900;">شهادة إتمام</h1>
      <p style="font-size: 18px; color: #94a3b8; margin-bottom: 40px;">Certificate of Completion</p>
      <p style="font-size: 16px;">تشهد منصة مِرْصَاد التشفير بأن</p>
      <h2 style="font-size: 32px; color: #10b981; margin: 30px 0; font-weight: 800;">${esc(fullName)}</h2>
      <p style="font-size: 16px;">قد أكمل بنجاح جميع فصول مقرر</p>
      <h3 style="font-size: 24px; color: #fbbf24; margin: 20px 0; font-weight: 700;">ISE243 — التشفير المتقدم</h3>
      <p style="font-size: 14px; color: #94a3b8;">الرقم الأكاديمي: ${esc(academicId)}</p>
      <p style="font-size: 14px; color: #94a3b8; margin-top: 40px;">
        التاريخ: ${new Date().toLocaleDateString('ar-SA')}
      </p>
      <p style="font-size: 12px; color: #64748b; margin-top: 60px;">
        جامعة الأمير مقرن بن عبدالعزيز — دبلوم أمن المعلومات
      </p>
    </div>
  `;

  document.body.appendChild(el);

  try {
    const canvas = await html2canvas(el, { scale: 2, backgroundColor: null });
    const imgData = canvas.toDataURL('image/png');

    const pdf = new jsPDF({ orientation: 'landscape', unit: 'px', format: [1123, 794] });
    pdf.addImage(imgData, 'PNG', 0, 0, 1123, 794);
    const blob = pdf.output('blob');
    onReady(blob);
  } finally {
    document.body.removeChild(el);
  }
}
