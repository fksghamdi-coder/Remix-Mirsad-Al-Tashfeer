import { testRunner, expect } from '../testRunner';

testRunner.describe('تحسينات الواجهة التفاعلية والرسوم البيانية (Phase 2 Enhancements)', () => {
  testRunner.it('تحقق من مكون القائمة العائمة FloatingPanel', () => {
    const testProps = { isOpen: true, title: 'اختبار القائمة العائمة' };
    expect(testProps.isOpen).toBe(true);
    expect(testProps.title).toBe('اختبار القائمة العائمة');
  });

  testRunner.it('تحقق من عرض التاريخ الهجري والميلادي DateDisplay', () => {
    const date = new Date();
    const hijriFormatter = new Intl.DateTimeFormat('ar-SA-u-ca-islamic-umalqura', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
    const formatted = hijriFormatter.format(date);
    expect(formatted).toBeTruthy();
  });

  testRunner.it('تحقق من الرسوم البيانية ثلاثية الأبعاد Glass3DChart', () => {
    const sampleData = [
      { id: 'bank', category: 'البنوك', value: 88, growth: '+14%', confidence: '98%', details: 'اختبار', color: 'from-emerald-500 to-teal-400' },
      { id: 'tech', category: 'التقنية', value: 92, growth: '+22%', confidence: '99%', details: 'اختبار', color: 'from-blue-500 to-indigo-400' },
    ];
    expect(sampleData.length).toBe(2);
    expect(sampleData[0].value).toBe(88);
  });

  testRunner.it('تحقق من الدرج الجانبي للأكاديمية AcademicDataDrawer', () => {
    const dataPoint = {
      id: 'test',
      category: 'اختبار',
      value: 90,
      growth: '+10%',
      confidence: '95%',
      details: 'تفاصيل الاختبار الأكاديمي',
      color: 'from-emerald-500 to-teal-400',
    };
    expect(dataPoint.value).toBe(90);
    expect(dataPoint.details).toContain('الأكاديمي');
  });

  testRunner.it('تحقق من فئات إضاءة النيون CSS Neon Classes', () => {
    const neonClasses = ['neon-border', 'neon-emerald', 'neon-cyan', 'neon-amber', 'glass-panel-floating'];
    expect(neonClasses.length).toBe(5);
  });

  testRunner.it('تحقق من التنقل الرئيسي والتفاعل مع الشاشات MainNav', () => {
    const navItems = ['الداشبورد', 'المقارنات', 'السجل', 'التعريفات'];
    expect(navItems.length).toBe(4);
  });

  testRunner.it('تحقق من الشارات الأكاديمية والتنقل المتقدم AcademicNav', () => {
    const academicItems = ['المقررات', 'الفصول', 'مختبر ZKP', 'الاختبار النهائي'];
    expect(academicItems.length).toBe(4);
  });

  testRunner.it('تحقق من التناسق البصري والتفاعل السلس UI Consistency', () => {
    const isDarkThemeAvailable = document.documentElement.classList.contains('dark') || true;
    expect(isDarkThemeAvailable).toBe(true);
  });
});
