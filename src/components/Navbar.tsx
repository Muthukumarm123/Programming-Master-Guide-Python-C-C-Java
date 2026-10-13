import React from 'react';
import { Search, Sun, Moon, BookOpen } from 'lucide-react';
import { useLearning, ViewType } from '../context/LearningContext';

export const Navbar: React.FC = () => {
  const { currentView, navigateToView, theme, setTheme, setIsSearchOpen } = useLearning();

  const navLinks: { label: string; view: ViewType; extra?: string }[] = [
    { label: 'Master Roadmap', view: 'roadmap' },
    { label: 'Glossary', view: 'glossary' },
    { label: 'Setup Centre', view: 'setup' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-4 sm:px-6 py-3.5">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => navigateToView('dashboard')}
          className="text-base sm:text-lg font-bold tracking-tight text-slate-900 dark:text-white whitespace-nowrap shrink-0 flex items-center gap-2 hover:opacity-90 transition-opacity"
        >
          <BookOpen className="w-5 h-5 text-sky-500 shrink-0" />
          <span>CodeCraft Knowledge Base</span>
        </button>

        {/* Zone 2: 4–5 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
          <button
            onClick={() => navigateToView('dashboard')}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-slate-900 dark:hover:text-white ${
              currentView === 'dashboard' ? 'text-sky-600 dark:text-sky-400 font-semibold underline underline-offset-4' : ''
            }`}
          >
            Dashboard
          </button>
          {navLinks.map((item) => (
            <button
              key={item.label}
              onClick={() => navigateToView(item.view)}
              className={`whitespace-nowrap shrink-0 transition-colors hover:text-slate-900 dark:hover:text-white ${
                currentView === item.view ? 'text-sky-600 dark:text-sky-400 font-semibold underline underline-offset-4' : ''
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Zone 3: 1 primary action & essential tools */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setIsSearchOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-750 rounded-md border border-slate-200 dark:border-slate-700 transition-colors whitespace-nowrap"
            title="Search Knowledge Base (Cmd+K)"
            aria-label="Search Knowledge Base"
          >
            <Search className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden sm:inline">Search topics...</span>
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-white dark:bg-slate-900 rounded border border-slate-300 dark:border-slate-700">
              ⌘K
            </kbd>
          </button>

          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 rounded-md transition-colors"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
          </button>
        </div>
      </div>
    </header>
  );
};
