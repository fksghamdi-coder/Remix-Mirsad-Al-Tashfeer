import React, { useState } from 'react';
import { ChapterData } from '@/types/academic';
import { BookOpen, CheckCircle, HelpCircle, FileText, Lightbulb, Sparkles } from 'lucide-react';

export interface AcademicModeContainerProps {
  chapter: ChapterData;
}

export function AcademicModeContainer({ chapter }: AcademicModeContainerProps) {
  const [activeTab, setActiveTab] = useState<'content' | 'example' | 'mistakes' | 'flashcards' | 'quiz'>('content');
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [showQuizResults, setShowQuizResults] = useState(false);
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});

  const handleSelectAnswer = (qId: string, optionIdx: number) => {
    setSelectedAnswers((prev) => ({ ...prev, [qId]: optionIdx }));
  };

  const toggleFlip = (cardId: string) => {
    setFlippedCards((prev) => ({ ...prev, [cardId]: !prev[cardId] }));
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-6 dir-rtl" dir="rtl">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold mb-2">
            <BookOpen className="w-3.5 h-3.5" />
            الفصل {chapter.chapter_number}: {chapter.title}
          </div>
          <h2 className="text-xl font-black text-slate-100">{chapter.subtitle || chapter.title}</h2>
        </div>

        {/* Tab Switcher */}
        <div className="flex flex-wrap gap-1.5 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
          <button
            onClick={() => setActiveTab('content')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'content' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            المحتوى والأهداف
          </button>
          <button
            onClick={() => setActiveTab('example')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'example' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            مثال محلول
          </button>
          <button
            onClick={() => setActiveTab('mistakes')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'mistakes' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            أخطاء شائعة
          </button>
          <button
            onClick={() => setActiveTab('flashcards')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'flashcards' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            بطاقات الاستذكار ({chapter.flashcards?.length || 0})
          </button>
          <button
            onClick={() => setActiveTab('quiz')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'quiz' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            اختبار الفصل ({chapter.quiz?.length || 0})
          </button>
        </div>
      </div>

      {/* Tab 1: Content & Objectives */}
      {activeTab === 'content' && (
        <div className="space-y-6">
          <div className="bg-slate-950/60 rounded-2xl p-5 border border-slate-800">
            <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4" /> الأهداف التعليمية
            </h3>
            <ul className="space-y-2 text-xs text-slate-300">
              {chapter.objectives.map((obj, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{obj}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            {chapter.sections.map((sec, i) => (
              <div key={i} className="bg-slate-950/40 p-5 rounded-2xl border border-slate-800/80 space-y-2">
                <h4 className="font-bold text-sm text-slate-200">{sec.heading}</h4>
                <p className="text-xs text-slate-300 leading-relaxed">{sec.content}</p>
              </div>
            ))}
          </div>

          {chapter.tables && chapter.tables.length > 0 && (
            <div className="overflow-x-auto rounded-2xl border border-slate-800">
              <table className="w-full text-right text-xs">
                <thead className="bg-slate-950 text-slate-300 border-b border-slate-800">
                  <tr>
                    {chapter.tables[0].headers.map((h, i) => (
                      <th key={i} className="p-3 font-bold">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-400">
                  {chapter.tables[0].rows.map((r, ri) => (
                    <tr key={ri} className="hover:bg-slate-800/30">
                      {r.map((c, ci) => (
                        <td key={ci} className="p-3">{c}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Solved Example */}
      {activeTab === 'example' && (
        <div className="bg-slate-950/60 p-6 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
            <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
              <Lightbulb className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-100 text-sm">{chapter.solvedExample.title}</h3>
              <p className="text-xs text-slate-400">المعطيات: {chapter.solvedExample.given}</p>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-300">خطوات الحل والتطبيق:</h4>
            <ol className="list-decimal list-inside space-y-1.5 text-xs text-slate-300 pr-2">
              {chapter.solvedExample.steps.map((step, idx) => (
                <li key={idx} className="leading-relaxed">{step}</li>
              ))}
            </ol>
          </div>

          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-bold">
            النتيجة النهائية: {chapter.solvedExample.result}
          </div>

          <p className="text-xs text-slate-400 italic">
            أهمية المفهوم: {chapter.solvedExample.whyItMatters}
          </p>
        </div>
      )}

      {/* Tab 3: Common Mistakes */}
      {activeTab === 'mistakes' && (
        <div className="bg-slate-950/60 p-6 rounded-2xl border border-slate-800 space-y-4">
          <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs space-y-1">
            <span className="font-bold block">الخطأ الشائع:</span>
            <p>{chapter.commonMistake.mistake}</p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs space-y-1">
            <span className="font-bold block">التصحيح الموصى به:</span>
            <p>{chapter.commonMistake.fix}</p>
          </div>
        </div>
      )}

      {/* Tab 4: Flashcards */}
      {activeTab === 'flashcards' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {chapter.flashcards.map((card) => {
            const isFlipped = flippedCards[card.id];
            return (
              <div
                key={card.id}
                onClick={() => toggleFlip(card.id)}
                className="h-40 cursor-pointer rounded-2xl bg-slate-950 border border-slate-800 p-6 flex flex-col items-center justify-center text-center transition-all hover:border-emerald-500/50"
              >
                {!isFlipped ? (
                  <div className="space-y-2">
                    <span className="text-[10px] uppercase font-mono text-emerald-400">السؤال (انقر للقلب)</span>
                    <p className="text-sm font-bold text-slate-100">{card.front}</p>
                  </div>
                ) : (
                  <div className="space-y-2 animate-fadeIn">
                    <span className="text-[10px] uppercase font-mono text-indigo-400">الإجابة الشافية</span>
                    <p className="text-xs font-medium text-slate-300 leading-relaxed">{card.back}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Tab 5: Quiz */}
      {activeTab === 'quiz' && (
        <div className="space-y-6">
          {chapter.quiz.map((q, idx) => (
            <div key={q.id} className="bg-slate-950/60 p-5 rounded-2xl border border-slate-800 space-y-3">
              <h4 className="text-sm font-bold text-slate-200">
                س{idx + 1}: {q.question}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {q.options.map((opt, optIdx) => {
                  const isSelected = selectedAnswers[q.id] === optIdx;
                  const isCorrect = q.correctIndex === optIdx;
                  let btnStyle = 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700';

                  if (showQuizResults) {
                    if (isCorrect) btnStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold';
                    else if (isSelected && !isCorrect) btnStyle = 'bg-rose-500/20 border-rose-500 text-rose-300';
                  } else if (isSelected) {
                    btnStyle = 'bg-indigo-600/30 border-indigo-500 text-indigo-200 font-bold';
                  }

                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleSelectAnswer(q.id, optIdx)}
                      className={`p-3 rounded-xl border text-right text-xs transition-all ${btnStyle}`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
              {showQuizResults && (
                <p className="text-xs text-slate-400 bg-slate-900 p-3 rounded-xl border border-slate-800 italic">
                  التوضيح: {q.explanation}
                </p>
              )}
            </div>
          ))}

          <button
            onClick={() => setShowQuizResults(true)}
            className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-all shadow-lg shadow-emerald-600/20"
          >
            التحقق من الإجابات وتقييم النتيجة
          </button>
        </div>
      )}
    </div>
  );
}
