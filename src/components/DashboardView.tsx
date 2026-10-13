import React, { useState } from 'react';
import {
  BookOpen,
  Compass,
  ArrowRight,
  CheckCircle2,
  Bookmark,
  Clock,
  ShieldCheck,
  Search,
  Download,
  Upload,
  RefreshCw,
  Terminal,
  Cpu,
  Layers,
  Sparkles,
} from 'lucide-react';
import { useLearning } from '../context/LearningContext';
import { PATHWAYS, ALL_LESSONS, getLessonById } from '../data/allLessons';
import heroImg from '../assets/images/hero_knowledge_base_1791919548987.jpg';
import pythonCardImg from '../assets/images/card_python_backend_1791919550567.jpg';
import systemsCardImg from '../assets/images/card_systems_security_1791919550167.jpg';

export const DashboardView: React.FC = () => {
  const {
    navigateToLesson,
    navigateToView,
    completedLessonIds,
    bookmarkedLessonIds,
    recentlyVisitedIds,
    totalCompletedCount,
    totalLessonsCount,
    overallPercentage,
    getPathwayProgress,
    exportProgressData,
    importProgressData,
    resetAllProgress,
    setIsSearchOpen,
  } = useLearning();

  const [importJson, setImportJson] = useState('');
  const [showDataModal, setShowDataModal] = useState(false);
  const [dataMessage, setDataMessage] = useState<string | null>(null);

  // Find next recommended lesson based on first incomplete lesson
  const nextRecommendedLesson =
    ALL_LESSONS.find((l) => !completedLessonIds.includes(l.id)) || ALL_LESSONS[0];

  // Recently visited lessons lookup
  const recentLessons = recentlyVisitedIds
    .map((id) => getLessonById(id))
    .filter(Boolean);

  // Bookmarked lessons lookup
  const bookmarkedLessons = bookmarkedLessonIds
    .map((id) => getLessonById(id))
    .filter(Boolean);

  const handleExport = () => {
    const dataStr = exportProgressData();
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `codecraft_progress_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
    setDataMessage('Progress exported successfully to JSON file.');
  };

  const handleImport = () => {
    if (!importJson.trim()) return;
    const ok = importProgressData(importJson);
    if (ok) {
      setDataMessage('Progress data imported successfully!');
      setImportJson('');
    } else {
      setDataMessage('Invalid JSON data format. Please verify and try again.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* 1. HERO TEXTBOOK BANNER */}
      <section className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-900 text-white shadow-xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
          {/* Left Text Zone */}
          <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-sky-400 uppercase tracking-wider">
                <BookOpen className="w-4 h-4" />
                <span>The Definitive Programming Textbook Platform</span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight text-white">
                Learn Programming from Mechanical Foundations to Advanced Backends & Systems
              </h1>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
                A unified, comprehensive knowledge base teaching Python, Java, C, and C++. Built as an exhaustive textbook with line-by-line code breakdowns, memory models, environment setup, and zero placeholder content.
              </p>
            </div>

            {/* Quick Action CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => navigateToLesson(nextRecommendedLesson.id)}
                className="flex items-center gap-2 px-5 py-2.5 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-sm rounded-lg shadow-md transition-colors whitespace-nowrap"
              >
                <span>Continue Learning</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => navigateToView('roadmap')}
                className="flex items-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-750 text-slate-200 text-sm font-semibold rounded-lg border border-slate-700 transition-colors whitespace-nowrap"
              >
                <Compass className="w-4 h-4 text-sky-400" />
                <span>Master Roadmap</span>
              </button>

              <button
                onClick={() => setIsSearchOpen(true)}
                className="flex items-center gap-2 px-4 py-2.5 bg-slate-800/80 hover:bg-slate-750 text-slate-300 text-sm font-medium rounded-lg border border-slate-700/80 transition-colors whitespace-nowrap"
              >
                <Search className="w-4 h-4 text-slate-400" />
                <span>Search Index</span>
              </button>
            </div>

            {/* Progress Micro Strip */}
            <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>
                  <strong className="text-white font-mono">{totalCompletedCount}</strong> of{' '}
                  <strong className="text-white font-mono">{totalLessonsCount}</strong> lessons complete (
                  <strong className="text-sky-400 font-mono">{overallPercentage}%</strong>)
                </span>
              </div>
              <button
                onClick={() => setShowDataModal(true)}
                className="hover:text-white underline text-[11px]"
              >
                Manage & Export Progress
              </button>
            </div>
          </div>

          {/* Right Image Zone */}
          <div className="lg:col-span-5 relative min-h-[260px] lg:min-h-full bg-slate-950 overflow-hidden">
            <img
              src={heroImg}
              alt="Programming Textbook Architecture"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center opacity-90 hover:opacity-100 transition-opacity"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent lg:bg-gradient-to-r lg:from-slate-900/90 lg:via-transparent lg:to-transparent pointer-events-none" />
          </div>
        </div>
      </section>

      {/* 2. RECENTLY VISITED & CONTINUE LEARNING SECTION */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Next Topic Spotlight */}
        <div className="md:col-span-6 p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Recommended Next Topic</span>
              </span>
              <span className="text-[11px] font-mono text-slate-400 capitalize">
                {nextRecommendedLesson.languageId}
              </span>
            </div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-1">
              {nextRecommendedLesson.title}
            </h2>
            <p className="text-xs text-slate-500 mb-2">{nextRecommendedLesson.moduleTitle}</p>
            <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
              {nextRecommendedLesson.introduction.whatIsIt}
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <span className="text-xs text-slate-400 flex items-center gap-1 font-mono">
              <Clock className="w-3 h-3" />
              {nextRecommendedLesson.estimatedMinutes} min
            </span>
            <button
              onClick={() => navigateToLesson(nextRecommendedLesson.id)}
              className="flex items-center gap-1 text-xs font-bold text-sky-600 dark:text-sky-400 hover:underline"
            >
              <span>Begin Lesson</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Recently Visited Lessons */}
        <div className="md:col-span-6 p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
              Recently Visited Lessons
            </h3>
            <div className="space-y-2">
              {recentLessons.slice(0, 3).map((rec) => (
                <button
                  key={rec!.id}
                  onClick={() => navigateToLesson(rec!.id)}
                  className="w-full text-left p-2.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors flex items-center justify-between group border border-transparent hover:border-slate-200 dark:hover:border-slate-800"
                >
                  <div className="min-w-0 pr-2">
                    <span className="text-xs font-semibold text-slate-900 dark:text-slate-200 truncate block group-hover:text-sky-600 dark:group-hover:text-sky-400">
                      {rec!.title}
                    </span>
                    <span className="text-[11px] text-slate-400 truncate block">
                      {rec!.moduleTitle.split(':')[0]}
                    </span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              ))}
            </div>
          </div>
          {bookmarkedLessons.length > 0 && (
            <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <Bookmark className="w-3.5 h-3.5 text-amber-500" />
                <span>{bookmarkedLessons.length} bookmarked lessons</span>
              </span>
              <button
                onClick={() => navigateToLesson(bookmarkedLessons[0]!.id)}
                className="text-amber-600 dark:text-amber-400 hover:underline font-medium"
              >
                Jump to Bookmark
              </button>
            </div>
          )}
        </div>
      </section>

      {/* 3. PATHWAYS SHOWCASE (WITH PYTHON BACKEND & STREAMLIT EXPLICIT ORDER) */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <span className="text-xs font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider block mb-1">
              Structured Curriculum
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Language Learning Pathways
            </h2>
          </div>
          <p className="text-xs text-slate-500 max-w-md">
            The Python pathway strictly follows the educational progression: DataLumina Interactive Python → Streamlit → Backend Engineering (Flask, Django, FastAPI) → Security.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: Python, Streamlit & Backend */}
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs hover:border-sky-500/50 transition-all flex flex-col justify-between">
            <div className="relative h-44 bg-slate-950 overflow-hidden">
              <img
                src={pythonCardImg}
                alt="Python, Streamlit and Backend Architecture"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white text-xs">
                <span className="font-bold uppercase tracking-wider text-sky-300">
                  Python Pathway
                </span>
                <span className="bg-slate-900/80 px-2 py-0.5 rounded border border-slate-700 text-[11px] font-mono">
                  {getPathwayProgress('python').percentage}% Complete
                </span>
              </div>
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-2">
                  Python, Streamlit & Full-Stack Backend
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                  From interactive Python (DataLumina REPL & persistent state) to interactive Streamlit apps and full-stack REST API backend engineering with Flask, Django, and FastAPI.
                </p>

                {/* Sub-pathway order pills */}
                <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-sky-100 dark:bg-sky-950 text-sky-600 dark:text-sky-400 text-[10px] font-bold flex items-center justify-center shrink-0">1</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">Interactive Python:</span>
                    <span>DataLumina workflow, persistent state & REPL</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-sky-100 dark:bg-sky-950 text-sky-600 dark:text-sky-400 text-[10px] font-bold flex items-center justify-center shrink-0">2</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">Streamlit:</span>
                    <span>Reactive UI, session state, caching & dashboards</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-sky-100 dark:bg-sky-950 text-sky-600 dark:text-sky-400 text-[10px] font-bold flex items-center justify-center shrink-0">3</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">Backend Engineering:</span>
                    <span>HTTP, Flask blueprints, Django ORM, FastAPI async</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-400 font-mono">
                  {getPathwayProgress('python').completed} / {getPathwayProgress('python').total} Lessons
                </span>
                <button
                  onClick={() => navigateToLesson('py-intro-datalumina')}
                  className="px-3 py-1.5 bg-sky-600 hover:bg-sky-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors"
                >
                  <span>Explore Python Pathway</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Card 2: Systems Programming, C & C++ */}
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs hover:border-blue-500/50 transition-all flex flex-col justify-between">
            <div className="relative h-44 bg-slate-950 overflow-hidden">
              <img
                src={systemsCardImg}
                alt="Systems Programming Memory and Security"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white text-xs">
                <span className="font-bold uppercase tracking-wider text-blue-300">
                  C & C++ Systems
                </span>
                <span className="bg-slate-900/80 px-2 py-0.5 rounded border border-slate-700 text-[11px] font-mono">
                  {getPathwayProgress('c').percentage}% Complete
                </span>
              </div>
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-2">
                  C, Modern C++ & Systems Architecture
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                  Master low-level computer architecture: memory addresses, pointer arithmetic, manual heap management, modern C++ RAII resource safety, and smart pointers.
                </p>

                <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 text-[10px] font-bold flex items-center justify-center shrink-0">1</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">C Build Toolchain:</span>
                    <span>GCC/Clang, Preprocess, Compile, Assemble & Link</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 text-[10px] font-bold flex items-center justify-center shrink-0">2</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">Pointers & Memory:</span>
                    <span>Addresses, dereferencing, pointer math & double pointers</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 text-[10px] font-bold flex items-center justify-center shrink-0">3</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">Modern C++ & RAII:</span>
                    <span>Deterministic destructors, std::unique_ptr, and C vs C++</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-400 font-mono">
                  {getPathwayProgress('c').completed} / {getPathwayProgress('c').total} Lessons
                </span>
                <button
                  onClick={() => navigateToLesson('c-env-compilation')}
                  className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors"
                >
                  <span>Explore C & C++</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Second Row: Java & Cybersecurity Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 3: Java Enterprise */}
          <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                  Java Pathway
                </span>
                <span className="text-[11px] font-mono text-slate-400">
                  {getPathwayProgress('java').percentage}% Complete
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-2">
                Java & Enterprise Architecture
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                Understand the JVM memory model, bytecode compilation with javac, and enterprise microservices using Spring Boot, JPA, and dependency injection.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-400 font-mono">
                {getPathwayProgress('java').completed} / {getPathwayProgress('java').total} Lessons
              </span>
              <button
                onClick={() => navigateToLesson('java-env-jvm')}
                className="px-3 py-1.5 bg-amber-600 hover:bg-amber-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors"
              >
                <span>Study Java</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card 4: Cybersecurity & Ethical Defense */}
          <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                  Cross-Language Security
                </span>
                <span className="text-[11px] font-mono text-slate-400">
                  {getPathwayProgress('cybersecurity').percentage}% Complete
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-2">
                Cybersecurity & Defensive Engineering
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                Learn authorized defensive security: the CIA triad, buffer overflow anatomy on the call stack, stack canaries, ASLR, salted password hashing, and timing attacks.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-400 font-mono">
                {getPathwayProgress('cybersecurity').completed} / {getPathwayProgress('cybersecurity').total} Lessons
              </span>
              <button
                onClick={() => navigateToLesson('sec-foundations-defensive')}
                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors"
              >
                <span>Study Security</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. ENVIRONMENT SETUP & GLOSSARY QUICK HUBS */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
        <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/50 flex items-start gap-4">
          <div className="p-3 bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-lg shrink-0">
            <Terminal className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base mb-1">
              Environment Setup Centre
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
              Step-by-step installation guides for Windows, Linux, and macOS. Configure PATH, GCC, Clang, VS Code, Python venv, Streamlit, and Java JDK.
            </p>
            <button
              onClick={() => navigateToView('setup')}
              className="text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1"
            >
              <span>Open Setup Guides</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/50 flex items-start gap-4">
          <div className="p-3 bg-purple-500/10 text-purple-600 dark:text-purple-400 rounded-lg shrink-0">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base mb-1">
              Searchable Programming Glossary
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
              Over 30+ precision computer science definitions, beginner analogies, code snippets, and language comparisons for pointers, REST, WSGI/ASGI, RAII, and more.
            </p>
            <button
              onClick={() => navigateToView('glossary')}
              className="text-xs font-bold text-purple-600 dark:text-purple-400 hover:underline flex items-center gap-1"
            >
              <span>Explore Glossary</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* 5. DATA MANAGEMENT MODAL (PROGRESS BACKUP / RESTORE) */}
      {showDataModal && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setShowDataModal(false)}
        >
          <div
            className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Learning Progress Management
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Your lesson progress, quiz checks, and bookmarks are stored privately in your browser's local storage. You can export a JSON backup or import saved data below.
            </p>

            {dataMessage && (
              <div className="p-3 rounded-lg bg-sky-50 dark:bg-sky-950/40 text-sky-800 dark:text-sky-300 text-xs">
                {dataMessage}
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={handleExport}
                className="flex-1 py-2 px-3 bg-sky-600 hover:bg-sky-500 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Progress JSON</span>
              </button>
              <button
                onClick={resetAllProgress}
                className="py-2 px-3 bg-rose-100 hover:bg-rose-200 dark:bg-rose-950/60 dark:hover:bg-rose-900 text-rose-700 dark:text-rose-300 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">
                Paste JSON Backup to Restore:
              </label>
              <textarea
                value={importJson}
                onChange={(e) => setImportJson(e.target.value)}
                placeholder='{"completedLessonIds": [...], ...}'
                className="w-full h-24 p-2.5 text-xs font-mono bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white outline-hidden"
              />
              <button
                onClick={handleImport}
                className="w-full py-2 bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Import Progress Data</span>
              </button>
            </div>

            <div className="pt-2 text-right">
              <button
                onClick={() => setShowDataModal(false)}
                className="text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
