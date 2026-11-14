import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

export interface CertificateData {
  recipientName: string;
  courseTitle: string;
  issueDate: string;
  certificateId: string;
  hashSHA256: string;
  scorePercentage: number;
  instructorName?: string;
}

export async function downloadCertificatePDF(elementId: string, filename = 'certificate.pdf'): Promise<boolean> {
  try {
    const targetElement = document.getElementById(elementId);
    if (!targetElement) {
      console.error(`Element with id ${elementId} not found.`);
      return false;
    }

    // Capture high resolution canvas from element
    const canvas = await html2canvas(targetElement, {
      scale: 2.5,
      useCORS: true,
      logging: false,
      backgroundColor: '#020617'
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4'
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(filename);
    return true;
  } catch (error) {
    console.error('Error generating PDF:', error);
    return false;
  }
}

export function generateDirectPDF(data: CertificateData): void {
  const pdf = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4'
  });

  const width = pdf.internal.pageSize.getWidth();
  const height = pdf.internal.pageSize.getHeight();

  // Background Dark Theme
  pdf.setFillColor(2, 6, 23); // #020617
  pdf.rect(0, 0, width, height, 'F');

  // Outer Gold / Emerald Frame
  pdf.setDrawColor(16, 185, 129); // #10b981
  pdf.setLineWidth(1.5);
  pdf.rect(8, 8, width - 16, height - 16);

  pdf.setDrawColor(245, 158, 11); // #f59e0b
  pdf.setLineWidth(0.5);
  pdf.rect(11, 11, width - 22, height - 22);

  // Header Title
  pdf.setTextColor(245, 158, 11);
  pdf.setFontSize(22);
  pdf.text('MIRSAD CYBERSECURITY & CRYPTOGRAPHY ACADEMY', width / 2, 28, { align: 'center' });

  pdf.setTextColor(16, 185, 129);
  pdf.setFontSize(14);
  pdf.text('CERTIFICATE OF ACADEMIC EXCELLENCE & COMPLETION', width / 2, 38, { align: 'center' });

  // Subtitle
  pdf.setTextColor(226, 232, 240);
  pdf.setFontSize(11);
  pdf.text('This is to officially certify that', width / 2, 52, { align: 'center' });

  // Recipient Name
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(24);
  pdf.text(data.recipientName, width / 2, 68, { align: 'center' });

  // Has successfully completed
  pdf.setTextColor(148, 163, 184);
  pdf.setFontSize(11);
  pdf.text('has successfully completed the advanced academic program:', width / 2, 82, { align: 'center' });

  // Course Title
  pdf.setTextColor(56, 189, 248);
  pdf.setFontSize(18);
  pdf.text(data.courseTitle, width / 2, 96, { align: 'center' });

  // Score & Grade
  pdf.setTextColor(16, 185, 129);
  pdf.setFontSize(12);
  pdf.text(`Grade Achieved: ${data.scorePercentage}% | Distinquished Academic Status`, width / 2, 108, { align: 'center' });

  // Date and ID
  pdf.setTextColor(148, 163, 184);
  pdf.setFontSize(10);
  pdf.text(`Issue Date: ${data.issueDate}`, 25, 135);
  pdf.text(`Certificate ID: ${data.certificateId}`, 25, 142);
  pdf.text(`Verification Hash: ${data.hashSHA256.substring(0, 32)}...`, 25, 149);

  // Signatures
  pdf.setDrawColor(100, 116, 139);
  pdf.line(width - 85, 138, width - 25, 138);
  pdf.setTextColor(226, 232, 240);
  pdf.text(data.instructorName || 'Mirsad Cryptography Academic Board', width - 55, 144, { align: 'center' });

  pdf.save(`Certificate_${data.certificateId}.pdf`);
}
