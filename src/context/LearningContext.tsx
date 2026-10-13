import React, { createContext, useContext, useState, useEffect } from 'react';
import { LanguageId, Lesson } from '../types';
import { ALL_LESSONS, getLessonById } from '../data/allLessons';

export type ViewType = 'dashboard' | 'lesson' | 'roadmap' | 'glossary' | 'setup';
export type FontSize = 'compact' | 'normal' | 'large';
export type ThemeMode = 'light' | 'dark';

interface LearningContextType {
  currentView: ViewType;
  currentLessonId: string | null;
  currentLanguageId: LanguageId | null;
  completedLessonIds: string[];
  bookmarkedLessonIds: string[];
  recentlyVisitedIds: string[];
  theme: ThemeMode;
  fontSize: FontSize;
  isSearchOpen: boolean;
  
  // Navigation actions
  navigateToView: (view: ViewType, lessonId?: string, langId?: LanguageId) => void;
  navigateToLesson: (lessonId: string) => void;
  
  // Progress actions
  toggleCompleteLesson: (lessonId: string) => void;
  isLessonCompleted: (lessonId: string) => boolean;
  toggleBookmarkLesson: (lessonId: string) => void;
  isLessonBookmarked: (lessonId: string) => boolean;
  
  // Settings & Search
  setTheme: (theme: ThemeMode) => void;
  setFontSize: (size: FontSize) => void;
  setIsSearchOpen: (open: boolean) => void;
  
  // Storage operations
  exportProgressData: () => string;
  importProgressData: (jsonData: string) => boolean;
  resetAllProgress: () => void;
  
  // Computed stats
  totalCompletedCount: number;
  totalLessonsCount: number;
  overallPercentage: number;
  getPathwayProgress: (langId: LanguageId) => { completed: number; total: number; percentage: number };
}

const LearningContext = createContext<LearningContextType | undefined>(undefined);

const STORAGE_KEYS = {
  COMPLETED: 'codecraft_kb_completed_lessons',
  BOOKMARKED: 'codecraft_kb_bookmarked_lessons',
  RECENT: 'codecraft_kb_recent_lessons',
  THEME: 'codecraft_kb_theme',
  FONT_SIZE: 'codecraft_kb_font_size',
  LAST_LESSON: 'codecraft_kb_last_lesson',
};

export const LearningProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');
  const [currentLessonId, setCurrentLessonId] = useState<string | null>('py-intro-datalumina');
  const [currentLanguageId, setCurrentLanguageId] = useState<LanguageId | null>('python');
  
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.COMPLETED);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [bookmarkedLessonIds, setBookmarkedLessonIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.BOOKMARKED);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [recentlyVisitedIds, setRecentlyVisitedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.RECENT);
      return saved ? JSON.parse(saved) : ['py-intro-datalumina'];
    } catch {
      return ['py-intro-datalumina'];
    }
  });

  const [theme, setThemeState] = useState<ThemeMode>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.THEME);
      return saved === 'light' ? 'light' : 'dark';
    } catch {
      return 'dark';
    }
  });

  const [fontSize, setFontSizeState] = useState<FontSize>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.FONT_SIZE);
      return (saved as FontSize) || 'normal';
    } catch {
      return 'normal';
    }
  });

  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Sync theme with DOM root class
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
  }, [theme]);

  // Sync completed list
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.COMPLETED, JSON.stringify(completedLessonIds));
  }, [completedLessonIds]);

  // Sync bookmarks
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.BOOKMARKED, JSON.stringify(bookmarkedLessonIds));
  }, [bookmarkedLessonIds]);

  // Sync recent visits
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.RECENT, JSON.stringify(recentlyVisitedIds));
  }, [recentlyVisitedIds]);

  const setTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme);
  };

  const setFontSize = (size: FontSize) => {
    setFontSizeState(size);
    localStorage.setItem(STORAGE_KEYS.FONT_SIZE, size);
  };

  const navigateToView = (view: ViewType, lessonId?: string, langId?: LanguageId) => {
    setCurrentView(view);
    if (lessonId) {
      setCurrentLessonId(lessonId);
      recordVisit(lessonId);
      const lesson = getLessonById(lessonId);
      if (lesson) {
        setCurrentLanguageId(lesson.languageId);
      }
    } else if (langId) {
      setCurrentLanguageId(langId);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToLesson = (lessonId: string) => {
    navigateToView('lesson', lessonId);
  };

  const recordVisit = (lessonId: string) => {
    setRecentlyVisitedIds((prev) => {
      const filtered = prev.filter((id) => id !== lessonId);
      return [lessonId, ...filtered].slice(0, 8);
    });
  };

  const toggleCompleteLesson = (lessonId: string) => {
    setCompletedLessonIds((prev) => {
      if (prev.includes(lessonId)) {
        return prev.filter((id) => id !== lessonId);
      } else {
        return [...prev, lessonId];
      }
    });
  };

  const isLessonCompleted = (lessonId: string) => completedLessonIds.includes(lessonId);

  const toggleBookmarkLesson = (lessonId: string) => {
    setBookmarkedLessonIds((prev) => {
      if (prev.includes(lessonId)) {
        return prev.filter((id) => id !== lessonId);
      } else {
        return [...prev, lessonId];
      }
    });
  };

  const isLessonBookmarked = (lessonId: string) => bookmarkedLessonIds.includes(lessonId);

  const exportProgressData = () => {
    const payload = {
      completedLessonIds,
      bookmarkedLessonIds,
      recentlyVisitedIds,
      exportTimestamp: new Date().toISOString(),
    };
    return JSON.stringify(payload, null, 2);
  };

  const importProgressData = (jsonData: string): boolean => {
    try {
      const parsed = JSON.parse(jsonData);
      if (Array.isArray(parsed.completedLessonIds)) {
        setCompletedLessonIds(parsed.completedLessonIds);
      }
      if (Array.isArray(parsed.bookmarkedLessonIds)) {
        setBookmarkedLessonIds(parsed.bookmarkedLessonIds);
      }
      return true;
    } catch {
      return false;
    }
  };

  const resetAllProgress = () => {
    setCompletedLessonIds([]);
    setBookmarkedLessonIds([]);
    setRecentlyVisitedIds([]);
    localStorage.removeItem(STORAGE_KEYS.COMPLETED);
    localStorage.removeItem(STORAGE_KEYS.BOOKMARKED);
    localStorage.removeItem(STORAGE_KEYS.RECENT);
  };

  // Keyboard shortcut for search (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const totalLessonsCount = ALL_LESSONS.length;
  const totalCompletedCount = completedLessonIds.length;
  const overallPercentage = totalLessonsCount > 0 ? Math.round((totalCompletedCount / totalLessonsCount) * 100) : 0;

  const getPathwayProgress = (langId: LanguageId) => {
    const pathwayLessons = ALL_LESSONS.filter((l) => l.languageId === langId);
    const completed = pathwayLessons.filter((l) => completedLessonIds.includes(l.id)).length;
    const total = pathwayLessons.length;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
    return { completed, total, percentage };
  };

  return (
    <LearningContext.Provider
      value={{
        currentView,
        currentLessonId,
        currentLanguageId,
        completedLessonIds,
        bookmarkedLessonIds,
        recentlyVisitedIds,
        theme,
        fontSize,
        isSearchOpen,
        navigateToView,
        navigateToLesson,
        toggleCompleteLesson,
        isLessonCompleted,
        toggleBookmarkLesson,
        isLessonBookmarked,
        setTheme,
        setFontSize,
        setIsSearchOpen,
        exportProgressData,
        importProgressData,
        resetAllProgress,
        totalCompletedCount,
        totalLessonsCount,
        overallPercentage,
        getPathwayProgress,
      }}
    >
      {children}
    </LearningContext.Provider>
  );
};

export const useLearning = () => {
  const context = useContext(LearningContext);
  if (!context) {
    throw new Error('useLearning must be used within a LearningProvider');
  }
  return context;
};
