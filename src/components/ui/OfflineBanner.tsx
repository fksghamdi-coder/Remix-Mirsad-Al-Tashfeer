import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WifiOff, Wifi } from 'lucide-react';
import { setupOnlineStatus } from '@/lib/pwa';

export default function OfflineBanner() {
  const [online, setOnline] = useState(true);
  const [justBackOnline, setJustBackOnline] = useState(false);

  useEffect(() => {
    return setupOnlineStatus((isOnline) => {
      setOnline(isOnline);
      if (isOnline) {
        setJustBackOnline(true);
        setTimeout(() => setJustBackOnline(false), 3000);
      }
    });
  }, []);

  return (
    <AnimatePresence>
      {!online && (
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          className="fixed top-0 left-0 right-0 z-[70] bg-amber-600 text-white text-center text-xs py-1.5 flex items-center justify-center gap-2 font-medium"
        >
          <WifiOff className="w-3.5 h-3.5" /> أنت غير متصل — بعض الميزات قد لا تعمل
        </motion.div>
      )}
      {justBackOnline && online && (
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          className="fixed top-0 left-0 right-0 z-[70] bg-emerald-600 text-white text-center text-xs py-1.5 flex items-center justify-center gap-2 font-medium"
        >
          <Wifi className="w-3.5 h-3.5" /> تم استعادة الاتصال بالإنترنت
        </motion.div>
      )}
    </AnimatePresence>
  );
}
