import React from 'react';
import {
  Bookmark,
  CheckCircle2,
  Clock,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Share2,
  AlertTriangle,
  Lightbulb,
  Cpu,
  Layers,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { useLearning } from '../context/LearningContext';
import { getLessonById, getAdjacentLessons } from '../data/allLessons';
import { CodeBlock } from './CodeBlock';
import { ExpectedOutput } from './ExpectedOutput';
import { KnowledgeCheck } from './KnowledgeCheck';
import { QuestionSection } from './QuestionSection';

export const LessonView: React.FC = () => {
  const {
    currentLessonId,
    navigateToLesson,
    navigateToView,
    isLessonCompleted,
    toggleCompleteLesson,
    isLessonBookmarked,
    toggleBookmarkLesson,
    fontSize,
    setFontSize,
  } = useLearning();

  const lesson = currentLessonId ? getLessonById(currentLessonId) : undefined;

  if (!lesson) {
    return (
      <div className="max-w-4xl mx-auto py-16 px-4 text-center">
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-2">Lesson Not Found</h2>
        <p className="text-slate-600 dark:text-slate-400 mb-4">The requested lesson could not be loaded.</p>
        <button
          onClick={() => navigateToView('dashboard')}
          className="px-4 py-2 bg-sky-600 text-white rounded-lg text-sm font-medium hover:bg-sky-500 transition-colors"
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  const { prev, next } = getAdjacentLessons(lesson.id);
  const isCompleted = isLessonCompleted(lesson.id);
  const isBookmarked = isLessonBookmarked(lesson.id);

  // Dynamic typography sizing
  const proseSize =
    fontSize === 'compact'
      ? 'text-xs md:text-sm leading-relaxed'
      : fontSize === 'large'
      ? 'text-base md:text-lg leading-relaxed'
      : 'text-sm md:text-base leading-relaxed';

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-8 py-8 transition-colors">
      {/* Top Header & Breadcrumb Nav */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-200 dark:border-slate-800 text-xs">
        <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
          <button
            onClick={() => navigateToView('dashboard')}
            className="hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            Dashboard
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="capitalize">{lesson.languageId}</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-700 dark:text-slate-300 font-medium truncate max-w-xs">
            {lesson.moduleTitle.split(':')[0]}
          </span>
        </div>

        {/* Reading Controls */}
        <div className="flex items-center gap-2">
          {/* Font Size Selector */}
          <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-lg p-0.5 border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setFontSize('compact')}
              className={`px-2 py-1 rounded text-xs font-mono transition-colors ${
                fontSize === 'compact' ? 'bg-white dark:bg-slate-900 text-sky-600 dark:text-sky-400 shadow-xs' : 'text-slate-500'
              }`}
              title="Compact Font"
            >
              A-
            </button>
            <button
              onClick={() => setFontSize('normal')}
              className={`px-2 py-1 rounded text-xs font-mono transition-colors ${
                fontSize === 'normal' ? 'bg-white dark:bg-slate-900 text-sky-600 dark:text-sky-400 shadow-xs' : 'text-slate-500'
              }`}
              title="Standard Font"
            >
              A
            </button>
            <button
              onClick={() => setFontSize('large')}
              className={`px-2 py-1 rounded text-xs font-mono transition-colors ${
                fontSize === 'large' ? 'bg-white dark:bg-slate-900 text-sky-600 dark:text-sky-400 shadow-xs' : 'text-slate-500'
              }`}
              title="Large Font"
            >
              A+
            </button>
          </div>

          {/* Bookmark Button */}
          <button
            onClick={() => toggleBookmarkLesson(lesson.id)}
            className={`p-2 rounded-lg border transition-colors ${
              isBookmarked
                ? 'border-amber-500/40 bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400'
                : 'border-slate-200 dark:border-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
            title={isBookmarked ? 'Bookmarked' : 'Add bookmark'}
          >
            <Bookmark className="w-4 h-4 fill-current" />
          </button>

          {/* Mark Complete Button */}
          <button
            onClick={() => toggleCompleteLesson(lesson.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
              isCompleted
                ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-500/40 text-emerald-700 dark:text-emerald-300'
                : 'bg-sky-600 hover:bg-sky-500 text-white border-transparent'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{isCompleted ? 'Completed' : 'Mark Complete'}</span>
          </button>
        </div>
      </div>

      {/* SECTION A: TITLE & LESSON INTRODUCTION */}
      <header className="mb-8">
        <div className="flex items-center gap-3 text-xs text-slate-500 mb-2">
          <span>{lesson.moduleTitle}</span>
          <span aria-hidden="true">·</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            <span>{lesson.estimatedMinutes} min study time</span>
          </span>
          <span aria-hidden="true">·</span>
          <span>Lesson {lesson.order}</span>
        </div>

        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4">
          {lesson.title}
        </h1>

        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/60 mb-6 space-y-3">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
              What Is It?
            </span>
            <p className={`text-slate-700 dark:text-slate-300 ${proseSize}`}>
              {lesson.introduction.whatIsIt}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-slate-200 dark:border-slate-800 text-xs">
            <div>
              <span className="font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Why It Matters
              </span>
              <p className="text-slate-600 dark:text-slate-400">
                {lesson.introduction.whyItMatters}
              </p>
            </div>
            <div>
              <span className="font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Roadmap Position
              </span>
              <p className="text-slate-600 dark:text-slate-400">
                {lesson.introduction.whereItFitsInRoadmap}
              </p>
            </div>
          </div>
        </div>

        {/* Prerequisites & Objectives */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-3.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <span className="font-semibold text-slate-700 dark:text-slate-300 block mb-1.5 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-sky-500" />
              <span>Prerequisites</span>
            </span>
            <ul className="space-y-1 text-slate-600 dark:text-slate-400 list-disc list-inside">
              {lesson.prerequisites.map((p, idx) => (
                <li key={idx}>{p}</li>
              ))}
            </ul>
          </div>

          <div className="p-3.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <span className="font-semibold text-slate-700 dark:text-slate-300 block mb-1.5 flex items-center gap-1.5">
              <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
              <span>Learning Objectives</span>
            </span>
            <ul className="space-y-1 text-slate-600 dark:text-slate-400 list-disc list-inside">
              {lesson.learningObjectives.map((obj, idx) => (
                <li key={idx}>{obj}</li>
              ))}
            </ul>
          </div>
        </div>
      </header>

      {/* SECTION B: CORE DEFINITIONS */}
      {lesson.definitions.length > 0 && (
        <section className="my-8">
          <div className="flex items-center gap-2 mb-3 text-slate-900 dark:text-slate-100 font-bold text-lg">
            <BookOpen className="w-5 h-5 text-sky-500" />
            <h2>Key Technical Definitions</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {lesson.definitions.map((def, idx) => (
              <div
                key={idx}
                className="p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 shadow-xs"
              >
                <div className="flex items-baseline justify-between mb-1.5">
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100 text-sm">
                    {def.term}
                  </h3>
                  {def.relatedTerm && (
                    <span className="text-[11px] text-slate-400 font-mono">
                      Related: {def.relatedTerm}
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed mb-2 font-medium">
                  {def.definition}
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 italic bg-slate-50 dark:bg-slate-850 p-2 rounded">
                  <span className="font-semibold not-italic">Beginner Intuition: </span>
                  {def.beginnerExplanation}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* SECTION C: DETAILED EXPLANATION */}
      <section className="my-8 space-y-6">
        {lesson.detailedSections.map((sec, idx) => (
          <div key={idx} className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
              {sec.heading}
            </h2>

            {sec.paragraphs.map((p, pIdx) => (
              <p key={pIdx} className={`text-slate-700 dark:text-slate-300 ${proseSize}`}>
                {p}
              </p>
            ))}

            {sec.bulletPoints && (
              <ul className="my-3 space-y-1.5 list-disc list-inside text-slate-700 dark:text-slate-300 text-sm">
                {sec.bulletPoints.map((bp, bIdx) => (
                  <li key={bIdx} className="leading-relaxed">
                    {bp}
                  </li>
                ))}
              </ul>
            )}

            {sec.callout && (
              <div
                className={`p-4 rounded-xl border my-4 ${
                  sec.callout.type === 'warning'
                    ? 'border-amber-500/40 bg-amber-50/70 dark:bg-amber-950/20 text-amber-900 dark:text-amber-200'
                    : sec.callout.type === 'architecture'
                    ? 'border-sky-500/40 bg-sky-50/70 dark:bg-sky-950/20 text-sky-900 dark:text-sky-200'
                    : 'border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200'
                }`}
              >
                <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider mb-1">
                  <AlertTriangle className="w-4 h-4" />
                  <span>{sec.callout.title}</span>
                </div>
                <p className="text-xs sm:text-sm leading-relaxed">{sec.callout.content}</p>
              </div>
            )}
          </div>
        ))}
      </section>

      {/* SECTION D: SYNTAX AND RULES */}
      {lesson.syntaxAndRules && (
        <section className="my-8 p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/40">
          <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-2">
            Syntax Rules & Constraints
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 mb-3">
            {lesson.syntaxAndRules.overview}
          </p>

          <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300 mb-4 list-disc list-inside">
            {lesson.syntaxAndRules.rules.map((rule, idx) => (
              <li key={idx}>{rule}</li>
            ))}
          </ul>

          {lesson.syntaxAndRules.syntaxSnippet && (
            <CodeBlock
              language={lesson.languageId === 'python' ? 'python' : lesson.languageId === 'java' ? 'java' : 'c'}
              code={lesson.syntaxAndRules.syntaxSnippet}
              title="Grammar Template"
            />
          )}
        </section>
      )}

      {/* SECTION E: CODE EXAMPLES */}
      <section className="my-8">
        <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-1">
          Reference Code Implementation
        </h2>
        <p className="text-xs text-slate-600 dark:text-slate-400 mb-3">
          {lesson.primaryCodeExample.explanation}
        </p>

        <CodeBlock
          language={lesson.primaryCodeExample.language}
          code={lesson.primaryCodeExample.code}
          title={lesson.primaryCodeExample.title}
        />

        {lesson.primaryCodeExample.expectedOutput && (
          <ExpectedOutput output={lesson.primaryCodeExample.expectedOutput} />
        )}
      </section>

      {/* SECTION F: EXPLANATION OUTSIDE THE CODE */}
      <section className="my-8 p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-2">
          Line-by-Line Execution Breakdown
        </h2>
        <p className="text-xs text-slate-500 mb-4">
          Detailed prose explanation outside of code comments:
        </p>

        <div className="space-y-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
          {lesson.codeExplanationOutsideBlock.walkthrough.map((step, idx) => (
            <div key={idx} className="flex items-start gap-2.5">
              <span className="font-mono text-sky-600 dark:text-sky-400 font-bold shrink-0 mt-0.5">
                {idx + 1}.
              </span>
              <p className="leading-relaxed">{step}</p>
            </div>
          ))}
        </div>

        {lesson.codeExplanationOutsideBlock.flowOfExecution && (
          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400">
            <span className="font-bold text-slate-900 dark:text-slate-200">Execution Flow: </span>
            {lesson.codeExplanationOutsideBlock.flowOfExecution}
          </div>
        )}
      </section>

      {/* SECTION G: COMMON MISTAKES */}
      {lesson.commonMistakes.length > 0 && (
        <section className="my-8">
          <div className="flex items-center gap-2 mb-3 text-slate-900 dark:text-slate-100 font-bold text-lg">
            <AlertTriangle className="w-5 h-5 text-rose-500" />
            <h2>Common Mistakes & How to Correct Them</h2>
          </div>

          <div className="space-y-4">
            {lesson.commonMistakes.map((mistake, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl border border-rose-500/20 bg-rose-50/20 dark:bg-rose-950/15"
              >
                <h3 className="font-semibold text-rose-800 dark:text-rose-300 text-sm mb-1.5">
                  {mistake.title}
                </h3>

                {mistake.incorrectCode && (
                  <div className="my-2 p-2.5 rounded bg-slate-950 text-rose-400 font-mono text-xs overflow-x-auto border border-rose-900/50">
                    <pre><code>{mistake.incorrectCode}</code></pre>
                  </div>
                )}

                {mistake.errorMessage && (
                  <div className="mb-2 text-xs font-mono text-rose-700 dark:text-rose-400 bg-rose-100/60 dark:bg-rose-950/60 p-2 rounded">
                    <strong>Error: </strong> {mistake.errorMessage}
                  </div>
                )}

                <p className="text-xs text-slate-700 dark:text-slate-300 mb-2 leading-relaxed">
                  <strong>Why it happens: </strong> {mistake.whyItHappens}
                </p>

                <p className="text-xs text-emerald-800 dark:text-emerald-300 font-medium">
                  <strong>Correction: </strong> {mistake.correction}
                </p>

                {mistake.correctCode && (
                  <div className="mt-2 p-2.5 rounded bg-slate-950 text-emerald-400 font-mono text-xs overflow-x-auto border border-emerald-900/50">
                    <pre><code>{mistake.correctCode}</code></pre>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* SECTION H: LANGUAGE COMPARISONS */}
      {lesson.comparisons && (
        <section className="my-8 p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
          <div className="flex items-center gap-2 mb-2 text-slate-900 dark:text-slate-100 font-bold text-base">
            <Cpu className="w-4 h-4 text-sky-500" />
            <h2>Cross-Language Comparison: {lesson.comparisons.concept}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs mb-3">
            {lesson.comparisons.pythonComparison && (
              <div className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <span className="font-bold text-sky-600 dark:text-sky-400 block mb-1">Python</span>
                <p className="text-slate-600 dark:text-slate-400">{lesson.comparisons.pythonComparison}</p>
              </div>
            )}
            {lesson.comparisons.javaComparison && (
              <div className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <span className="font-bold text-amber-600 dark:text-amber-400 block mb-1">Java</span>
                <p className="text-slate-600 dark:text-slate-400">{lesson.comparisons.javaComparison}</p>
              </div>
            )}
            {lesson.comparisons.cComparison && (
              <div className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <span className="font-bold text-blue-600 dark:text-blue-400 block mb-1">C</span>
                <p className="text-slate-600 dark:text-slate-400">{lesson.comparisons.cComparison}</p>
              </div>
            )}
            {lesson.comparisons.cppComparison && (
              <div className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <span className="font-bold text-purple-600 dark:text-purple-400 block mb-1">C++</span>
                <p className="text-slate-600 dark:text-slate-400">{lesson.comparisons.cppComparison}</p>
              </div>
            )}
          </div>

          <div className="p-2.5 rounded bg-sky-50 dark:bg-sky-950/30 text-sky-900 dark:text-sky-200 text-xs">
            <strong>Key Takeaway: </strong> {lesson.comparisons.takeaway}
          </div>
        </section>
      )}

      {/* SECTION K: IN-LESSON KNOWLEDGE CHECKS */}
      {lesson.inLessonKnowledgeChecks && lesson.inLessonKnowledgeChecks.length > 0 && (
        <KnowledgeCheck questions={lesson.inLessonKnowledgeChecks} />
      )}

      {/* SECTION J: SUMMARY & KEY DEFINITIONS */}
      <section className="my-8 p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
        <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-2">
          Lesson Summary & Key Concepts
        </h2>
        <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 list-disc list-inside mb-4">
          {lesson.summary.takeaways.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>

        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
          <span className="font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
            Key Terms to Remember:
          </span>
          <div className="flex flex-wrap gap-2 text-slate-600 dark:text-slate-300 font-mono text-xs">
            {lesson.summary.keyTermsToRemember.map((term, idx) => (
              <span key={idx} className="after:content-[','] last:after:content-['']">
                {term}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION L: END-OF-TOPIC QUESTIONS */}
      <QuestionSection questions={lesson.endOfTopicQuestions} />

      {/* BOTTOM PREV / NEXT NAVIGATION */}
      <nav className="mt-12 pt-6 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4">
        {prev ? (
          <button
            onClick={() => navigateToLesson(prev.id)}
            className="flex items-center gap-2 p-3 text-xs md:text-sm text-slate-700 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-sky-500 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 shrink-0" />
            <div className="text-left">
              <span className="text-[10px] text-slate-400 block uppercase">Previous Lesson</span>
              <span className="font-semibold line-clamp-1">{prev.title}</span>
            </div>
          </button>
        ) : (
          <div />
        )}

        {next ? (
          <button
            onClick={() => navigateToLesson(next.id)}
            className="flex items-center gap-2 p-3 text-xs md:text-sm text-slate-700 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-sky-500 transition-colors text-right"
          >
            <div className="text-right">
              <span className="text-[10px] text-slate-400 block uppercase">Next Lesson</span>
              <span className="font-semibold line-clamp-1">{next.title}</span>
            </div>
            <ArrowRight className="w-4 h-4 shrink-0" />
          </button>
        ) : (
          <div />
        )}
      </nav>
    </article>
  );
};
