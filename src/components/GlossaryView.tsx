import React, { useState } from 'react';
import { BookOpen, Search, Filter, ArrowRight, Code } from 'lucide-react';
import { useLearning } from '../context/LearningContext';
import { GLOSSARY_ENTRIES } from '../data/glossaryData';
import { GlossaryEntry } from '../types';
import { CodeBlock } from './CodeBlock';

export const GlossaryView: React.FC = () => {
  const { navigateToLesson } = useLearning();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('all');

  const allTags = ['all', 'Python', 'Java', 'C', 'C++', 'Web/Backend', 'General'];

  const filteredEntries = GLOSSARY_ENTRIES.filter((entry) => {
    const matchesSearch =
      searchTerm === '' ||
      entry.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.definition.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.beginnerExplanation.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesTag =
      selectedTag === 'all' ||
      entry.languageApplicability.includes(selectedTag as any);

    return matchesSearch && matchesTag;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 text-xs font-bold uppercase tracking-wider mb-2">
          <BookOpen className="w-4 h-4" />
          <span>Reference Lexicon</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-3">
          Searchable Programming Glossary
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
          Precise, textbook-grade definitions and beginner-friendly mental models for foundational computer science terms, web protocols, and systems concepts.
        </p>
      </div>

      {/* Search & Tag Filter Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs mb-8">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search glossary terms, definitions, analogies..."
            className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 outline-hidden focus:border-sky-500"
          />
        </div>

        {/* Filter Badges */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <span className="font-semibold text-slate-500 mr-1 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Language:
          </span>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-2.5 py-1.5 rounded-md font-medium transition-colors ${
                selectedTag === tag
                  ? 'bg-purple-600 text-white font-semibold'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Glossary Items List */}
      <div className="space-y-6">
        {filteredEntries.map((entry) => (
          <div
            key={entry.id}
            id={entry.id}
            className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs transition-colors"
          >
            {/* Top Row: Term Title and Language Badges */}
            <div className="flex flex-wrap items-baseline justify-between gap-3 mb-3">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100">
                {entry.term}
              </h2>
              <div className="flex flex-wrap items-center gap-1.5">
                {entry.languageApplicability.map((lang, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] font-mono px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </div>

            {/* Definitions */}
            <div className="space-y-3 mb-4">
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">
                  Formal Computer Science Definition:
                </span>
                <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
                  {entry.definition}
                </p>
              </div>

              <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-850/80 border border-slate-100 dark:border-slate-800 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                <span className="font-semibold text-slate-900 dark:text-slate-100 block mb-1">
                  Beginner Mental Model & Analogy:
                </span>
                <p className="italic">{entry.beginnerExplanation}</p>
              </div>
            </div>

            {/* Code Snippet if present */}
            {entry.codeSnippet && (
              <div className="my-3">
                <CodeBlock
                  language={entry.codeSnippet.language}
                  code={entry.codeSnippet.code}
                  title={`${entry.term} Syntax Demonstration`}
                />
              </div>
            )}

            {/* Bottom Row: Related Terms & Lesson Link */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
              <div className="flex flex-wrap items-center gap-2 text-slate-500">
                <span className="font-semibold text-slate-400">Related Concepts:</span>
                {entry.relatedTerms.map((rel, idx) => (
                  <span
                    key={idx}
                    className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-[11px] font-medium text-slate-600 dark:text-slate-300"
                  >
                    {rel}
                  </span>
                ))}
              </div>

              {entry.lessonIdRef && (
                <button
                  onClick={() => navigateToLesson(entry.lessonIdRef!)}
                  className="flex items-center gap-1 font-semibold text-sky-600 dark:text-sky-400 hover:underline"
                >
                  <span>Study in Lesson</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        ))}

        {filteredEntries.length === 0 && (
          <div className="text-center py-12 text-slate-500">
            <p>No glossary entries matching "{searchTerm}".</p>
          </div>
        )}
      </div>
    </div>
  );
};
