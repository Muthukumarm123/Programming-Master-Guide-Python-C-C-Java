import React, { useState, useEffect, useRef } from 'react';
import { Search, X, BookOpen, Bookmark, FileCode, Wrench, Compass, ArrowRight } from 'lucide-react';
import { useLearning } from '../context/LearningContext';
import { ALL_LESSONS } from '../data/allLessons';
import { GLOSSARY_ENTRIES } from '../data/glossaryData';
import { SETUP_GUIDES } from '../data/setupGuidesData';
import { ROADMAP_NODES } from '../data/roadmapData';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, navigateToLesson, navigateToView } = useLearning();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const normalizedQuery = query.toLowerCase().trim();

  // Search lessons
  const filteredLessons = normalizedQuery
    ? ALL_LESSONS.filter(
        (l) =>
          l.title.toLowerCase().includes(normalizedQuery) ||
          l.moduleTitle.toLowerCase().includes(normalizedQuery) ||
          l.introduction.whatIsIt.toLowerCase().includes(normalizedQuery) ||
          l.definitions.some((d) => d.term.toLowerCase().includes(normalizedQuery))
      ).slice(0, 5)
    : ALL_LESSONS.slice(0, 4);

  // Search glossary
  const filteredGlossary = normalizedQuery
    ? GLOSSARY_ENTRIES.filter(
        (g) =>
          g.term.toLowerCase().includes(normalizedQuery) ||
          g.definition.toLowerCase().includes(normalizedQuery) ||
          g.beginnerExplanation.toLowerCase().includes(normalizedQuery)
      ).slice(0, 4)
    : [];

  // Search setup guides
  const filteredSetup = normalizedQuery
    ? SETUP_GUIDES.filter(
        (s) =>
          s.title.toLowerCase().includes(normalizedQuery) ||
          s.tool.toLowerCase().includes(normalizedQuery) ||
          s.description.toLowerCase().includes(normalizedQuery)
      ).slice(0, 3)
    : [];

  const handleSelectLesson = (lessonId: string) => {
    navigateToLesson(lessonId);
    setIsSearchOpen(false);
  };

  const handleSelectGlossary = (termId: string) => {
    navigateToView('glossary');
    setIsSearchOpen(false);
  };

  const handleSelectSetup = (setupId: string) => {
    navigateToView('setup');
    setIsSearchOpen(false);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-start justify-center pt-16 sm:pt-24 p-4 overflow-y-auto"
      onClick={() => setIsSearchOpen(false)}
    >
      <div
        className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-200 dark:border-slate-800">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search lessons, definitions, framework concepts, syntax..."
            className="flex-1 bg-transparent text-sm md:text-base text-slate-900 dark:text-white placeholder-slate-400 outline-hidden"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono text-slate-400 bg-slate-100 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">
            ESC
          </kbd>
        </div>

        {/* Results Container */}
        <div className="flex-1 overflow-y-auto p-4 space-y-5 text-xs md:text-sm">
          {/* Lessons Section */}
          {filteredLessons.length > 0 && (
            <div>
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-sky-500" />
                <span>Textbook Lessons ({filteredLessons.length})</span>
              </div>
              <div className="space-y-1.5">
                {filteredLessons.map((l) => (
                  <button
                    key={l.id}
                    onClick={() => handleSelectLesson(l.id)}
                    className="w-full text-left p-2.5 rounded-lg border border-transparent hover:border-slate-200 dark:hover:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors flex items-center justify-between group"
                  >
                    <div>
                      <div className="font-semibold text-slate-900 dark:text-slate-100 group-hover:text-sky-600 dark:group-hover:text-sky-400">
                        {l.title}
                      </div>
                      <div className="text-xs text-slate-500 truncate max-w-md">
                        {l.moduleTitle}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Glossary Section */}
          {filteredGlossary.length > 0 && (
            <div>
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <FileCode className="w-3.5 h-3.5 text-purple-500" />
                <span>Glossary Definitions ({filteredGlossary.length})</span>
              </div>
              <div className="space-y-1.5">
                {filteredGlossary.map((g) => (
                  <button
                    key={g.id}
                    onClick={() => handleSelectGlossary(g.id)}
                    className="w-full text-left p-2.5 rounded-lg border border-transparent hover:border-slate-200 dark:hover:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors"
                  >
                    <div className="font-semibold text-slate-900 dark:text-slate-100">
                      {g.term}
                    </div>
                    <div className="text-xs text-slate-500 line-clamp-1">
                      {g.definition}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Setup Section */}
          {filteredSetup.length > 0 && (
            <div>
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Wrench className="w-3.5 h-3.5 text-amber-500" />
                <span>Environment Setup Guides</span>
              </div>
              <div className="space-y-1.5">
                {filteredSetup.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => handleSelectSetup(s.id)}
                    className="w-full text-left p-2.5 rounded-lg border border-transparent hover:border-slate-200 dark:hover:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors"
                  >
                    <div className="font-semibold text-slate-900 dark:text-slate-100">
                      {s.title}
                    </div>
                    <div className="text-xs text-slate-500 line-clamp-1">
                      {s.tool} - {s.description}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {filteredLessons.length === 0 && filteredGlossary.length === 0 && (
            <div className="text-center py-10 text-slate-500">
              <p>No matching topics found for "{query}".</p>
              <p className="text-xs text-slate-400 mt-1">Try searching for "Streamlit", "Pointers", "FastAPI", "JVM", or "RAII".</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
