import React, { useState } from 'react';
import { LearningProvider, useLearning } from './context/LearningContext';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { SearchModal } from './components/SearchModal';
import { DashboardView } from './components/DashboardView';
import { LessonView } from './components/LessonView';
import { RoadmapView } from './components/RoadmapView';
import { GlossaryView } from './components/GlossaryView';
import { SetupCentreView } from './components/SetupCentreView';
import { Menu, X, BookOpen, Compass, Terminal, FileCode } from 'lucide-react';

const MainContent: React.FC = () => {
  const { currentView, navigateToView } = useLearning();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <Navbar />
      <SearchModal />

      {/* Main Body Layout */}
      <div className="flex-1 flex flex-col">
        {currentView === 'lesson' ? (
          <div className="flex-1 flex flex-col md:flex-row relative">
            {/* Mobile Sidebar Toggle Button */}
            <div className="md:hidden flex items-center justify-between p-3 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs">
              <button
                onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
                className="flex items-center gap-2 font-semibold text-slate-700 dark:text-slate-200 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-750 bg-slate-50 dark:bg-slate-800"
              >
                {mobileSidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
                <span>Table of Contents</span>
              </button>
              <span className="text-slate-500 text-[11px]">Lesson Navigation</span>
            </div>

            {/* Mobile Drawer Sidebar */}
            {mobileSidebarOpen && (
              <div className="md:hidden fixed inset-0 z-40 bg-slate-950/70 pt-14">
                <div className="h-full bg-white dark:bg-slate-900 w-80 max-w-[85vw] p-2 overflow-y-auto">
                  <div className="flex justify-end p-2">
                    <button
                      onClick={() => setMobileSidebarOpen(false)}
                      className="p-1 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <Sidebar onSelectLesson={() => setMobileSidebarOpen(false)} />
                </div>
              </div>
            )}

            {/* Desktop Static Sidebar */}
            <div className="hidden md:block">
              <Sidebar />
            </div>

            {/* Lesson Reader Content */}
            <main className="flex-1 overflow-y-auto bg-white dark:bg-slate-950">
              <LessonView />
            </main>
          </div>
        ) : currentView === 'roadmap' ? (
          <main className="flex-1">
            <RoadmapView />
          </main>
        ) : currentView === 'glossary' ? (
          <main className="flex-1">
            <GlossaryView />
          </main>
        ) : currentView === 'setup' ? (
          <main className="flex-1">
            <SetupCentreView />
          </main>
        ) : (
          <main className="flex-1">
            <DashboardView />
          </main>
        )}
      </div>

      {/* Global Clean Editorial Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-8 px-4 sm:px-6 transition-colors">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-medium">
            <BookOpen className="w-4 h-4 text-sky-500" />
            <span>CodeCraft Programming Knowledge Base & Educational Platform</span>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => navigateToView('roadmap')}
              className="hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Roadmap
            </button>
            <button
              onClick={() => navigateToView('glossary')}
              className="hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Glossary
            </button>
            <button
              onClick={() => navigateToView('setup')}
              className="hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Setup Guides
            </button>
            <span>&copy; {new Date().getFullYear()} CodeCraft</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <LearningProvider>
      <MainContent />
    </LearningProvider>
  );
}
