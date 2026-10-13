import React, { useState } from 'react';
import {
  Compass,
  CheckCircle2,
  Clock,
  ArrowRight,
  Filter,
  Check,
  Circle,
  ExternalLink,
} from 'lucide-react';
import { useLearning } from '../context/LearningContext';
import { ROADMAP_NODES } from '../data/roadmapData';
import { LanguageId, RoadmapNode } from '../types';

export const RoadmapView: React.FC = () => {
  const { navigateToLesson, isLessonCompleted } = useLearning();
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageId | 'all'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredNodes = ROADMAP_NODES.filter((node) => {
    if (selectedLanguage !== 'all' && node.languageId !== selectedLanguage) return false;
    if (selectedCategory !== 'all' && node.category !== selectedCategory) return false;
    return true;
  });

  const categoryLabels: Record<string, string> = {
    foundations: 'Beginner Foundations',
    core: 'Core Programming',
    intermediate: 'Intermediate',
    advanced: 'Advanced Concepts',
    tools: 'Dev Tools & UI',
    backend: 'Backend & Web APIs',
    systems: 'Systems Programming',
    cybersecurity: 'Cybersecurity & Defense',
  };

  const getLanguageTag = (langId: string) => {
    switch (langId) {
      case 'python':
        return { label: 'Python', color: 'text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/40 border-sky-300 dark:border-sky-800' };
      case 'java':
        return { label: 'Java', color: 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-800' };
      case 'c':
        return { label: 'C Systems', color: 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 border-blue-300 dark:border-blue-800' };
      case 'cpp':
        return { label: 'C++', color: 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/40 border-purple-300 dark:border-purple-800' };
      default:
        return { label: 'Cybersecurity', color: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800' };
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sky-600 dark:text-sky-400 text-xs font-bold uppercase tracking-wider mb-2">
          <Compass className="w-4 h-4" />
          <span>Curriculum Architecture</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-3">
          Master Programming Roadmap
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
          The central structured learning graph connecting beginner foundations to systems engineering, modern web backends, and cybersecurity. Every node is backed by a full textbook lesson.
        </p>
      </div>

      {/* Interactive Filters Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs mb-8">
        {/* Language Filter */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <span className="font-semibold text-slate-500 mr-1 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Language:
          </span>
          {(['all', 'python', 'java', 'c', 'cpp'] as const).map((lang) => (
            <button
              key={lang}
              onClick={() => setSelectedLanguage(lang)}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                selectedLanguage === lang
                  ? 'bg-slate-900 text-white dark:bg-sky-500 dark:text-slate-950 font-semibold'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {lang === 'all' ? 'All Pathways' : lang.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Category Filter */}
        <div className="flex items-center gap-2 text-xs">
          <label htmlFor="cat-filter" className="font-semibold text-slate-500">
            Category:
          </label>
          <select
            id="cat-filter"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-1.5 rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs outline-hidden"
          >
            <option value="all">All Categories</option>
            <option value="foundations">Foundations</option>
            <option value="core">Core Programming</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
            <option value="tools">Dev Tools / UI</option>
            <option value="backend">Backend & APIs</option>
            <option value="systems">Systems</option>
            <option value="cybersecurity">Cybersecurity</option>
          </select>
        </div>
      </div>

      {/* Roadmap Graph Grid */}
      <div className="space-y-4">
        {filteredNodes.map((node, idx) => {
          const isDone = node.lessonIdRef ? isLessonCompleted(node.lessonIdRef) : false;
          const tag = getLanguageTag(node.languageId);

          return (
            <div
              key={node.id}
              className={`p-5 rounded-xl border transition-all ${
                isDone
                  ? 'border-emerald-500/30 bg-emerald-50/10 dark:bg-emerald-950/10'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className={`text-[11px] font-medium px-2 py-0.5 rounded border ${tag.color}`}>
                      {tag.label}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">
                      {categoryLabels[node.category] || node.category}
                    </span>
                    <span aria-hidden="true" className="text-slate-400">·</span>
                    <span className="text-xs text-slate-400 flex items-center gap-1 font-mono">
                      <Clock className="w-3 h-3" />
                      {node.estimatedHours} hrs study
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 mb-1.5">
                    {node.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
                    {node.description}
                  </p>

                  {/* Prerequisites */}
                  {node.prerequisites.length > 0 && (
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                      <span className="font-semibold text-slate-400">Prerequisites:</span>
                      {node.prerequisites.map((prereqId) => {
                        const prereqNode = ROADMAP_NODES.find((n) => n.id === prereqId);
                        return (
                          <span
                            key={prereqId}
                            className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-[11px] font-mono text-slate-600 dark:text-slate-300"
                          >
                            {prereqNode ? prereqNode.title.split('.')[0] : prereqId}
                          </span>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Action & Status */}
                <div className="flex sm:flex-col items-center sm:items-end justify-between gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-1.5 text-xs">
                    {isDone ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Completed</span>
                      </>
                    ) : (
                      <>
                        <Circle className="w-4 h-4 text-slate-300 dark:text-slate-600" />
                        <span className="text-slate-400 font-medium">In Progress</span>
                      </>
                    )}
                  </div>

                  {node.lessonIdRef && (
                    <button
                      onClick={() => navigateToLesson(node.lessonIdRef!)}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-medium transition-colors"
                    >
                      <span>Study Lesson</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
