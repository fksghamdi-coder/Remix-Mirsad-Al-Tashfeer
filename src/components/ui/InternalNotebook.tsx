import React, { useState } from 'react';
import { Lock, Unlock, Save, ShieldCheck, FileText, Sparkles } from 'lucide-react';
import { SyncEngine } from '@/lib/syncEngine';

void SyncEngine;

export interface NoteEntry {
  id: string;
  title: string;
  content: string;
  updatedAt: string;
}

export function InternalNotebook() {
  const [passphrase, setPassphrase] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [notes, setNotes] = useState<NoteEntry[]>([]);
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [statusMessage, setStatusMessage] = useState('');

  const deriveKey = async (pass: string): Promise<CryptoKey> => {
    const encoder = new TextEncoder();
    const keyMaterial = await window.crypto.subtle.importKey(
      'raw',
      encoder.encode(pass),
      'PBKDF2',
      false,
      ['deriveKey']
    );
    const salt = encoder.encode('Mirsad_Notebook_Salt_2025_v4');
    return window.crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt,
        iterations: 600000,
        hash: 'SHA-256',
      },
      keyMaterial,
      { name: 'AES-GCM', length: 256 },
      false,
      ['encrypt', 'decrypt']
    );
  };

  const handleUnlock = async () => {
    if (!passphrase) return;
    try {
      const rawStored = localStorage.getItem('mirsad_encrypted_notes');
      if (!rawStored) {
        setNotes([]);
        setIsUnlocked(true);
        setStatusMessage('تم إنشاء دفتر ملاحظات جديد مشفر');
        return;
      }

      const { iv, data } = JSON.parse(rawStored);
      const key = await deriveKey(passphrase);
      const decryptedBuffer = await window.crypto.subtle.decrypt(
        { name: 'AES-GCM', iv: new Uint8Array(iv) },
        key,
        new Uint8Array(data)
      );

      const decoded = new TextDecoder().decode(decryptedBuffer);
      const parsedNotes = JSON.parse(decoded) as NoteEntry[];
      setNotes(parsedNotes);
      setIsUnlocked(true);
      if (parsedNotes.length > 0) {
        setActiveNoteId(parsedNotes[0].id);
        setTitle(parsedNotes[0].title);
        setContent(parsedNotes[0].content);
      }
      setStatusMessage('تم فك تشفير الملاحظات بنجاح');
    } catch {
      setStatusMessage('كلمة المرور غير صحيحة أو البيانات تالفة');
    }
  };

  const handleSave = async () => {
    if (!isUnlocked || !passphrase) return;
    try {
      let updatedNotes = [...notes];
      const existingIdx = updatedNotes.findIndex((n) => n.id === activeNoteId);

      const currentEntry: NoteEntry = {
        id: activeNoteId || 'note_' + Date.now(),
        title: title || 'ملاحظة تشفير',
        content,
        updatedAt: new Date().toISOString(),
      };

      if (existingIdx >= 0) {
        updatedNotes[existingIdx] = currentEntry;
      } else {
        updatedNotes.push(currentEntry);
        setActiveNoteId(currentEntry.id);
      }

      setNotes(updatedNotes);

      const key = await deriveKey(passphrase);
      const iv = window.crypto.getRandomValues(new Uint8Array(12));
      const encoded = new TextEncoder().encode(JSON.stringify(updatedNotes));

      const encryptedBuffer = await window.crypto.subtle.encrypt(
        { name: 'AES-GCM', iv },
        key,
        encoded
      );

      const storePayload = {
        iv: Array.from(iv),
        data: Array.from(new Uint8Array(encryptedBuffer)),
      };

      localStorage.setItem('mirsad_encrypted_notes', JSON.stringify(storePayload));
      setStatusMessage('تم حفظ الملاحظات بتشفير AES-256-GCM بنجاح');
    } catch {
      setStatusMessage('تعذر حفظ الملاحظات المشفرة');
    }
  };

  const handleNewNote = () => {
    setActiveNoteId(null);
    setTitle('');
    setContent('');
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-2xl max-w-4xl mx-auto my-8 text-slate-100 dir-rtl" dir="rtl">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
            <Lock className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold flex items-center gap-2">
              الدفتر المشفر للتدوين الأكاديمي
              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-mono">
                AES-256-GCM
              </span>
            </h2>
            <p className="text-xs text-slate-400">تشفير موضعي للبيانات بـ PBKDF2 (600,000 جولة) لحماية خصوصية التحليل</p>
          </div>
        </div>
        {isUnlocked && (
          <button
            onClick={() => {
              setIsUnlocked(false);
              setPassphrase('');
              setNotes([]);
              setStatusMessage('تم قفل الدفتر آلياً');
            }}
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
          >
            <Unlock className="w-4 h-4 text-emerald-400" />
            قفل الدفتر
          </button>
        )}
      </div>

      {!isUnlocked ? (
        <div className="flex flex-col items-center justify-center py-10 px-4 text-center">
          <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4 animate-pulse">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold mb-2">أدخل كلمة المرور لفك تشفير الدفتر</h3>
          <p className="text-xs text-slate-400 max-w-md mb-6">
            ملاحظاتك تشفر وتفك تشفيرها داخل متصفحك فقط باستخدام مفتاح مع مشتقات PBKDF2 المعيارية.
          </p>

          <div className="flex w-full max-w-md gap-2">
            <input
              type="password"
              placeholder="كلمة المرور الخاصة بالدفتر..."
              value={passphrase}
              onChange={(e) => setPassphrase(e.target.value)}
              className="flex-1 px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-emerald-500"
            />
            <button
              onClick={handleUnlock}
              className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm transition-all shadow-lg shadow-emerald-600/20"
            >
              فتح
            </button>
          </div>
          {statusMessage && <p className="text-xs text-amber-400 mt-4">{statusMessage}</p>}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1 border-l border-slate-800 pl-4 space-y-3">
            <button
              onClick={handleNewNote}
              className="w-full py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-bold flex items-center justify-center gap-2 text-emerald-400 transition-all"
            >
              <Sparkles className="w-4 h-4" />
              ملاحظة جديدة
            </button>
            <div className="space-y-2 max-h-80 overflow-y-auto">
              {notes.map((n) => (
                <div
                  key={n.id}
                  onClick={() => {
                    setActiveNoteId(n.id);
                    setTitle(n.title);
                    setContent(n.content);
                  }}
                  className={`p-3 rounded-xl border text-right cursor-pointer transition-all ${
                    activeNoteId === n.id
                      ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300'
                      : 'bg-slate-950/60 border-slate-800/80 hover:bg-slate-800/40 text-slate-300'
                  }`}
                >
                  <div className="font-bold text-sm flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5" />
                    {n.title || 'ملاحظة غير معنونة'}
                  </div>
                  <div className="text-[10px] text-slate-500 mt-1">
                    {new Date(n.updatedAt).toLocaleDateString('ar-SA')}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="md:col-span-2 space-y-4">
            <input
              type="text"
              placeholder="عنوان الملاحظة..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 font-bold text-sm focus:outline-none focus:border-emerald-500"
            />
            <textarea
              rows={8}
              placeholder="دون تحليلات التشفير، الشفرات، وملاحظات المعمل السيبراني..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-4 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-emerald-500 leading-relaxed font-mono"
            />
            <div className="flex items-center justify-between">
              <button
                onClick={handleSave}
                className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 transition-all shadow-md shadow-emerald-600/20"
              >
                <Save className="w-4 h-4" />
                حفظ مشفر
              </button>
              {statusMessage && <p className="text-xs text-emerald-400">{statusMessage}</p>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
