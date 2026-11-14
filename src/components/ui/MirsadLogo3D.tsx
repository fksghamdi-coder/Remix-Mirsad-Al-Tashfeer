import React from 'react';

export interface MirsadLogo3DProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const MirsadLogo3D: React.FC<MirsadLogo3DProps> = ({ className = '', size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-20 h-20 text-3xl',
    md: 'w-32 h-32 text-5xl',
    lg: 'w-44 h-44 text-7xl',
  }[size];

  return (
    <div className={`relative group perspective-1000 mb-8 inline-block ${className}`}>
      <div
        className={`${sizeClasses} bg-gradient-to-br from-blue-600 via-indigo-900 to-black rounded-3xl border-2 border-blue-400/50 shadow-[0_0_50px_rgba(37,99,235,0.4)] flex items-center justify-center transform-gpu rotate-y-[-20deg] rotate-x-[10deg] group-hover:rotate-0 transition-transform duration-700 ease-out`}
      >
        <span className="font-black text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] select-none">
          مِ
        </span>
        {/* تأثير الإضاءة الهادئة */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-blue-400/10 to-white/5 rounded-3xl pointer-events-none" />
      </div>
      {/* الانعكاس السفلي */}
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-24 h-4 bg-blue-500/20 blur-xl rounded-full pointer-events-none" />
    </div>
  );
};

export default MirsadLogo3D;
