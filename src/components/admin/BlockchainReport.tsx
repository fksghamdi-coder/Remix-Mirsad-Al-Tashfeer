import React from 'react';
import type { CertificateBlock } from '../../lib/internalBlockchain';

export interface BlockchainReportProps {
  chain?: CertificateBlock[];
}

export const BlockchainReport: React.FC<BlockchainReportProps> = ({ chain = [] }) => {
  const displayChain = Array.isArray(chain) ? chain : [];

  return (
    <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 mt-8 shadow-xl">
      <h3 className="text-xl font-bold text-amber-400 mb-4 flex items-center gap-2">
        <span>⛓️</span> سجل كتل البلوكشين (Certification Ledger)
      </h3>
      {displayChain.length === 0 ? (
        <div className="p-6 bg-slate-950 rounded-lg border border-slate-800 text-center text-slate-400 text-xs">
          لا توجد كتل مسجلة حالياً في السلسلة الداخلية.
        </div>
      ) : (
        <div className="space-y-4">
          {displayChain.map((block, idx) => (
            <div
              key={idx}
              className="p-4 bg-slate-950 rounded-lg border-l-4 border-amber-500 font-mono text-[10px] text-slate-400 space-y-1 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <span className="text-amber-400 font-bold">BLOCK #{block.index ?? idx}</span>
                <span className="text-slate-500 text-[9px]">{block.timestamp}</span>
              </div>
              <p className="truncate">PREV_HASH: <span className="text-slate-300">{block.previousHash}</span></p>
              <p className="truncate text-white font-semibold">CURRENT_HASH: <span className="text-cyan-300">{block.hash}</span></p>
              {Boolean(block.certificateData) && (
                <p className="mt-2 text-emerald-400 italic break-all">
                  // Certified: {typeof block.certificateData === 'string' ? block.certificateData : JSON.stringify(block.certificateData)}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlockchainReport;
