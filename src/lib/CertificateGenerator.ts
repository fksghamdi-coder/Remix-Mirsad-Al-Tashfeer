// src/lib/CertificateGenerator.ts
import { jsPDF } from "jspdf";
import QRCode from "qrcode";

export class CertificateGenerator {
  static async generate(studentData: any) {
    const doc = new jsPDF('landscape');
    
    // تصميم الشهادة الأكاديمي
    doc.setFontSize(28);
    doc.text("شهادة إتمام مقرر أكاديمي", 148, 40, { align: 'center' });
    doc.setFontSize(16);
    doc.text(`مُنحت هذه الشهادة للطالب: ${studentData.name}`, 148, 70, { align: 'center' });
    
    // توليد QR Code للتحقق
    const verifyUrl = `https://mirsad.academy/verify/${studentData.seal}`;
    const qrData = await QRCode.toDataURL(verifyUrl);
    doc.addImage(qrData, 'PNG', 128, 120, 40, 40);
    
    doc.setFontSize(10);
    doc.text("يُمكن التحقق من صحة هذه الشهادة عبر مسح الكود أعلاه", 148, 170, { align: 'center' });
    
    return doc.output('blob');
  }
}
