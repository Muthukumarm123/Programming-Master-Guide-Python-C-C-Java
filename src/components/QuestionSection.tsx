import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, CheckCircle } from 'lucide-react';
import { EndOfTopicQuestion } from '../types';

interface QuestionSectionProps {
  questions: EndOfTopicQuestion[];
}

export const QuestionSection: React.FC<QuestionSectionProps> = ({ questions }) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  if (!questions || questions.length === 0) return null;

  return (
    <section className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
      <div className="flex items-center gap-2 mb-2 text-slate-900 dark:text-slate-100 font-bold text-lg">
        <HelpCircle className="w-5 h-5 text-sky-500" />
        <h2>End-of-Topic Conceptual Review Questions</h2>
      </div>
      <p className="text-xs text-slate-600 dark:text-slate-400 mb-6">
        Test your genuine conceptual comprehension of this lesson. Formulate your answer first, then reveal the detailed technical solution.
      </p>

      <div className="space-y-4">
        {questions.map((q, idx) => {
          const isExpanded = expandedId === q.id;

          const levelColor =
            q.level === 'Basic'
              ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800'
              : q.level === 'Intermediate'
              ? 'text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/40 border-sky-200 dark:border-sky-800'
              : 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/40 border-purple-200 dark:border-purple-800';

          return (
            <div
              key={q.id}
              className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs transition-colors"
            >
              <button
                onClick={() => toggleExpand(q.id)}
                className="w-full text-left p-4.5 flex items-start justify-between gap-4 hover:bg-slate-50 dark:hover:bg-slate-850/50 transition-colors"
                aria-expanded={isExpanded}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className={`text-[11px] font-medium px-2 py-0.5 rounded border ${levelColor}`}>
                      {q.level}
                    </span>
                    <span className="text-xs text-slate-500">Question {idx + 1}</span>
                  </div>
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 leading-snug">
                    {q.question}
                  </h3>
                </div>
                <div className="mt-1 text-slate-400 shrink-0">
                  {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </button>

              {isExpanded && (
                <div className="px-5 pb-5 pt-2 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 text-xs md:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  <div className="flex items-center gap-1.5 font-semibold text-emerald-600 dark:text-emerald-400 mb-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>Answer & Explanation</span>
                  </div>
                  <p className="mb-3">{q.answerExplanation}</p>
                  {q.sampleAnswer && (
                    <div className="p-3 rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                      <span className="font-semibold text-slate-900 dark:text-slate-100 block mb-1">
                        Sample Concise Answer:
                      </span>
                      <p className="text-slate-600 dark:text-slate-400 italic font-mono text-xs">
                        "{q.sampleAnswer}"
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
