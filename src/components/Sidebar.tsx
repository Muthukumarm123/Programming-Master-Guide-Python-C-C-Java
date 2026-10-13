import React from 'react';
import { CheckCircle2, Circle, Clock, ChevronRight } from 'lucide-react';
import { useLearning } from '../context/LearningContext';
import { PATHWAYS, ALL_LESSONS } from '../data/allLessons';
import { LanguageId } from '../types';

interface SidebarProps {
  onSelectLesson?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onSelectLesson }) => {
  const {
    currentLessonId,
    currentLanguageId,
    navigateToLesson,
    navigateToView,
    isLessonCompleted,
    getPathwayProgress,
  } = useLearning();

  const activePathway = PATHWAYS.find((p) => p.id === currentLanguageId) || PATHWAYS[0];
  const pathwayProgress = getPathwayProgress(activePathway.id);

  return (
    <aside className="w-full md:w-72 lg:w-80 shrink-0 border-r border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/60 p-4 flex flex-col h-full overflow-y-auto">
      {/* Pathway Switcher Tabs */}
      <div className="mb-4">
        <span className="text-[11px] font-semibold tracking-wider text-slate-500 uppercase block mb-2">
          Learning Pathways
        </span>
        <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-200/60 dark:bg-slate-800/80 rounded-lg text-xs">
          {PATHWAYS.map((p) => {
            const isActive = p.id === activePathway.id;
            return (
              <button
                key={p.id}
                onClick={() => {
                  const firstLesson = ALL_LESSONS.find((l) => l.languageId === p.id);
                  if (firstLesson) {
                    navigateToLesson(firstLesson.id);
                  } else {
                    navigateToView('dashboard', undefined, p.id);
                  }
                }}
                className={`px-2.5 py-1.5 rounded-md font-medium text-left truncate transition-colors ${
                  isActive
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {p.id === 'python' ? 'Python & Web' : p.id === 'cpp' ? 'Modern C++' : p.title.split(' ')[0]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Pathway Progress Overview */}
      <div className="p-3 mb-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
        <div className="flex items-center justify-between text-xs mb-1.5">
          <span className="font-semibold text-slate-700 dark:text-slate-300 truncate">
            {activePathway.title}
          </span>
          <span className="font-mono text-slate-500 tabular-nums">
            {pathwayProgress.percentage}%
          </span>
        </div>
        <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-sky-500 rounded-full transition-all duration-300"
            style={{ width: `${pathwayProgress.percentage}%` }}
          />
        </div>
        <div className="mt-1.5 text-[11px] text-slate-500 flex justify-between">
          <span>{pathwayProgress.completed} of {pathwayProgress.total} lessons complete</span>
        </div>
      </div>

      {/* Modules and Lessons Tree */}
      <div className="flex-1 space-y-4">
        {activePathway.modules.map((mod) => {
          const moduleLessons = ALL_LESSONS.filter((l) => mod.lessonIds.includes(l.id));
          if (moduleLessons.length === 0) return null;

          return (
            <div key={mod.id} className="space-y-1">
              <div className="px-2 py-1 text-xs font-bold text-slate-900 dark:text-slate-200 tracking-tight flex items-center justify-between">
                <span className="truncate">{mod.title}</span>
              </div>

              <div className="space-y-0.5">
                {moduleLessons.map((lesson) => {
                  const isCurrent = lesson.id === currentLessonId;
                  const isDone = isLessonCompleted(lesson.id);

                  return (
                    <button
                      key={lesson.id}
                      onClick={() => {
                        navigateToLesson(lesson.id);
                        if (onSelectLesson) onSelectLesson();
                      }}
                      className={`w-full text-left px-2.5 py-2 rounded-md text-xs transition-colors flex items-start gap-2.5 ${
                        isCurrent
                          ? 'bg-sky-50 dark:bg-sky-950/40 text-sky-900 dark:text-sky-200 font-semibold border-l-2 border-sky-500'
                          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100/70 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-200'
                      }`}
                    >
                      <div className="mt-0.5 shrink-0">
                        {isDone ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                        ) : (
                          <Circle className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="truncate leading-snug">{lesson.title}</div>
                        <div className="flex items-center gap-1.5 mt-0.5 text-[10px] text-slate-400">
                          <Clock className="w-2.5 h-2.5" />
                          <span>{lesson.estimatedMinutes} min</span>
                        </div>
                      </div>
                      {isCurrent && (
                        <ChevronRight className="w-3 h-3 text-sky-500 shrink-0 mt-0.5" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
};
