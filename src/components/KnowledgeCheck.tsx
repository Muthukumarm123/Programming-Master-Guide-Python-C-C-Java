import React, { useState } from 'react';
import { HelpCircle, CheckCircle2, XCircle } from 'lucide-react';
import { KnowledgeCheckQuestion } from '../types';

interface KnowledgeCheckProps {
  questions: KnowledgeCheckQuestion[];
}

export const KnowledgeCheck: React.FC<KnowledgeCheckProps> = ({ questions }) => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});

  const handleSelect = (questionId: string, optionIndex: number) => {
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
    setRevealed((prev) => ({ ...prev, [questionId]: true }));
  };

  if (!questions || questions.length === 0) return null;

  return (
    <div className="my-8 rounded-xl border border-sky-500/30 bg-sky-950/20 dark:bg-sky-950/30 p-6">
      <div className="flex items-center gap-2 mb-4 text-sky-600 dark:text-sky-400 font-semibold text-sm">
        <HelpCircle className="w-5 h-5" />
        <span>In-Lesson Knowledge Check</span>
      </div>

      <div className="space-y-6">
        {questions.map((q, idx) => {
          const selected = selectedAnswers[q.id];
          const isSubmitted = revealed[q.id];
          const isCorrect = selected === q.correctIndex;

          return (
            <div key={q.id} className="rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5">
              <p className="font-medium text-slate-900 dark:text-slate-100 mb-3 text-sm">
                <span className="text-slate-400 mr-1.5">{idx + 1}.</span>
                {q.question}
              </p>

              <div className="space-y-2 mb-4">
                {q.options.map((opt, optIdx) => {
                  let buttonStyle = 'border-slate-200 dark:border-slate-750 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300';
                  
                  if (isSubmitted) {
                    if (optIdx === q.correctIndex) {
                      buttonStyle = 'border-emerald-500 bg-emerald-50/80 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 font-medium';
                    } else if (selected === optIdx) {
                      buttonStyle = 'border-rose-500 bg-rose-50/80 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300';
                    } else {
                      buttonStyle = 'opacity-60 border-slate-200 dark:border-slate-800 text-slate-500';
                    }
                  } else if (selected === optIdx) {
                    buttonStyle = 'border-sky-500 bg-sky-50 dark:bg-sky-950/40 text-sky-800 dark:text-sky-300';
                  }

                  return (
                    <button
                      key={optIdx}
                      disabled={isSubmitted}
                      onClick={() => handleSelect(q.id, optIdx)}
                      className={`w-full text-left p-3 text-xs md:text-sm rounded-lg border transition-all flex items-start gap-2.5 ${buttonStyle}`}
                    >
                      <span className="font-mono text-xs mt-0.5 text-slate-400">{String.fromCharCode(65 + optIdx)}.</span>
                      <span className="flex-1">{opt}</span>
                    </button>
                  );
                })}
              </div>

              {isSubmitted && (
                <div className={`p-3.5 rounded-lg text-xs leading-relaxed border ${
                  isCorrect 
                    ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-500/30 text-emerald-800 dark:text-emerald-200' 
                    : 'bg-amber-50 dark:bg-amber-950/30 border-amber-500/30 text-amber-900 dark:text-amber-200'
                }`}>
                  <div className="flex items-center gap-1.5 font-semibold mb-1">
                    {isCorrect ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        <span>Correct!</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-4 h-4 text-amber-500" />
                        <span>Explanation:</span>
                      </>
                    )}
                  </div>
                  <p>{q.explanation}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
