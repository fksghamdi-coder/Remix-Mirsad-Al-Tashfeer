// src/components/ui/SecureVideoPlayer.tsx
import React, { useEffect, useRef } from 'react';
import Hls from 'hls.js';
import { SyncEngine } from '../../lib/syncEngine';

export const SecureVideoPlayer: React.FC<{ src: string }> = ({ src }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    void SyncEngine.saveSecurely('mirsad_stream_src', { src, accessedAt: Date.now() });

    if (videoRef.current) {
      if (Hls.isSupported()) {
        const hls = new Hls({
          xhrSetup: (xhr) => {
            xhr.setRequestHeader('Authorization', `Bearer ${localStorage.getItem('mirsad_token')}`);
          }
        });
        hls.loadSource(src);
        hls.attachMedia(videoRef.current);
      } else if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
        videoRef.current.src = src;
      }
    }
  }, [src]);

  return (
    <div className="relative rounded-xl overflow-hidden bg-black aspect-video border-2 border-slate-800 shadow-2xl">
      <video 
        ref={videoRef} 
        controls 
        controlsList="nodownload" 
        onContextMenu={(e) => e.preventDefault()}
        className="w-full h-full"
      />
      {/* طبقة العلامة المائية الديناميكية */}
      <div className="absolute top-4 right-4 text-[10px] text-white/20 pointer-events-none select-none font-mono">
        SECURE-STREAM: {localStorage.getItem('mirsad_user_id')}
      </div>
    </div>
  );
};
