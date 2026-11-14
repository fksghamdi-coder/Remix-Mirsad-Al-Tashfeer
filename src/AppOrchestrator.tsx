// src/AppOrchestrator.tsx
import React, { useEffect, useState } from 'react';
import { BiometricAuthManager } from './lib/biometricAuth';
import { MirsadInternalBlockchain } from './lib/internalBlockchain';
import { initSecurityHardening } from './lib/securityHardening';
import { LiveBookComponent } from './components/interactive/LiveBookComponent';

const blockchain = new MirsadInternalBlockchain();

export default function AppOrchestrator() {
  const [chainValid, setChainValid] = useState<boolean | null>(null);
  const [latestBlockInfo, setLatestBlockInfo] = useState<string | null>(null);

  useEffect(() => {
    // 1. تفعيل الحماية الصارمة للمتصفح عند التشغيل
    initSecurityHardening();

    // 2. التحقق من سلامة البلوكشين (في حال توفر الإنترنت أو العمل المحلي)
    const isValid = blockchain.verifyChainIntegrity();
    setChainValid(isValid);
    if (!isValid) {
      console.error('تحذير: تم كشف تلاعب في سجل الشهادات!');
    } else {
      const latest = blockchain.getLatestBlock();
      setLatestBlockInfo(latest.hash);
    }
  }, []);

  const handleCertificateIssuance = async (certData: Record<string, unknown>) => {
    // إضافة الشهادة للبلوكشين الداخلي فوراً (عملية مستمرة)
    const block = blockchain.addCertificateBlock(certData);
    console.log('تم تأمين الشهادة في الكتلة:', block.hash);
    setLatestBlockInfo(block.hash);
    return block;
  };

  return (
    <div className="platform-shell min-h-screen bg-slate-950 text-slate-100">
      {/* شريط حالة الأمان والبلوكشين الداخلي المصغر */}
      <div className="max-w-5xl mx-auto px-4 pt-4 flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <span
            className={`w-2 h-2 rounded-full ${
              chainValid ? 'bg-emerald-400' : 'bg-rose-500 animate-pulse'
            }`}
          />
          <span className="font-mono">
            {chainValid
              ? 'Blockchain: سليم ومحمي بختم عدم التلاعب'
              : 'Blockchain: كشف تلاعب أو جاري التحقق'}
          </span>
        </div>
        {latestBlockInfo && (
          <span className="font-mono text-[10px] text-cyan-400 truncate max-w-xs">
            أحدث كتلة: {latestBlockInfo}
          </span>
        )}
      </div>

      {/* عرض الكتاب التفاعلي مع ربط الوكلاء */}
      <LiveBookComponent
        courseTitle="إدارة البرامج الأمنية"
        chapterTitle="حوكمة الضوابط"
        chapterNumber={1}
        pdfContentSummary="مقدمة شاملة في كيفية إدارة البرامج الأمنية والضوابط المؤسسية وفق المعايير الوطنية."
        interactiveLabType="cmm"
      />
    </div>
  );
}

export { blockchain, BiometricAuthManager };
