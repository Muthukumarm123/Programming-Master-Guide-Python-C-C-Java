import React, { useState } from 'react';
import {
  Wrench,
  Terminal,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Monitor,
  Settings,
  Trash2,
  RefreshCw,
  FolderTree,
  Filter,
} from 'lucide-react';
import { SETUP_GUIDES } from '../data/setupGuidesData';
import { CodeBlock } from './CodeBlock';
import { ExpectedOutput } from './ExpectedOutput';
import { LanguageId } from '../types';

type ActiveOS = 'windows' | 'linux' | 'macos';

export const SetupCentreView: React.FC = () => {
  const [activeOS, setActiveOS] = useState<ActiveOS>('windows');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('all');
  const [selectedGuideId, setSelectedGuideId] = useState<string>(SETUP_GUIDES[4].id); // Default to Java or C

  const filteredGuides = SETUP_GUIDES.filter((g) => {
    if (selectedLanguage === 'all') return true;
    return g.languageId === selectedLanguage;
  });

  const selectedGuide =
    filteredGuides.find((g) => g.id === selectedGuideId) || filteredGuides[0] || SETUP_GUIDES[0];
  const osData = selectedGuide.installation[activeOS];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
          <Wrench className="w-4 h-4" />
          <span>Toolchain & Compiler Configuration</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-3">
          Environment Setup Centre
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
          Comprehensive, non-destructive installation procedures, PATH configuration instructions, compiler flags, verification tests, and troubleshooting for <strong>C</strong>, <strong>C++</strong>, <strong>Java</strong>, and <strong>Python</strong>.
        </p>
      </div>

      {/* Language Filter Bar */}
      <div className="flex flex-wrap items-center gap-2 mb-6 p-2 bg-slate-100 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 text-xs">
        <span className="font-semibold text-slate-500 px-2 flex items-center gap-1">
          <Filter className="w-3.5 h-3.5" /> Language:
        </span>
        {[
          { id: 'all', label: 'All Tools' },
          { id: 'c', label: 'C Programming' },
          { id: 'cpp', label: 'C++ Modern' },
          { id: 'java', label: 'Java JDK & IDE' },
          { id: 'python', label: 'Python & Web' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setSelectedLanguage(tab.id);
              const matching = SETUP_GUIDES.filter((g) => tab.id === 'all' || g.languageId === tab.id);
              if (matching.length > 0) {
                setSelectedGuideId(matching[0].id);
              }
            }}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
              selectedLanguage === tab.id
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-semibold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Main Grid: Guide Selector on Left, Active Guide on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Tool Selection List */}
        <div className="lg:col-span-4 space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
            Available Toolchains ({filteredGuides.length})
          </span>
          <div className="space-y-1.5">
            {filteredGuides.map((guide) => {
              const isSelected = guide.id === selectedGuide.id;
              return (
                <button
                  key={guide.id}
                  onClick={() => setSelectedGuideId(guide.id)}
                  className={`w-full text-left p-3 rounded-xl border text-xs sm:text-sm transition-all ${
                    isSelected
                      ? 'border-sky-500 bg-sky-50/70 dark:bg-sky-950/40 text-sky-950 dark:text-sky-100 font-semibold shadow-xs'
                      : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <div className="font-semibold">{guide.title}</div>
                  <div className="text-[11px] text-slate-500 font-normal truncate mt-0.5">
                    {guide.tool}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Detailed Setup Procedure */}
        <div className="lg:col-span-8 space-y-6">
          <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
            {/* Tool Title and OS Picker */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800 mb-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                  {selectedGuide.title}
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Tool: <span className="font-mono text-slate-700 dark:text-slate-300">{selectedGuide.tool}</span>
                </p>
              </div>

              {/* OS Selector Tabs */}
              <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs self-start sm:self-auto">
                <button
                  onClick={() => setActiveOS('windows')}
                  className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                    activeOS === 'windows'
                      ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-semibold'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  Windows
                </button>
                <button
                  onClick={() => setActiveOS('linux')}
                  className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                    activeOS === 'linux'
                      ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-semibold'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  Linux
                </button>
                <button
                  onClick={() => setActiveOS('macos')}
                  className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                    activeOS === 'macos'
                      ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-semibold'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  macOS
                </button>
              </div>
            </div>

            {/* Why Needed */}
            <div className="mb-6 p-4 rounded-lg bg-slate-50 dark:bg-slate-850/80 border border-slate-100 dark:border-slate-800 text-xs sm:text-sm">
              <span className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                1. What It Is & Why You Need It:
              </span>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                {selectedGuide.whyNeeded}
              </p>
            </div>

            {/* Step-by-Step Installation */}
            <div className="mb-6">
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider mb-3">
                2. How to Install on {activeOS.toUpperCase()}:
              </h3>
              <ol className="space-y-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 list-decimal list-inside">
                {osData.steps.map((step, idx) => (
                  <li key={idx} className="leading-relaxed pl-1">
                    <span className="font-medium">{step}</span>
                  </li>
                ))}
              </ol>

              {osData.commands && osData.commands.length > 0 && (
                <div className="mt-4">
                  <span className="text-xs font-semibold text-slate-500 block mb-1">
                    Terminal Setup Commands:
                  </span>
                  <CodeBlock
                    language="bash"
                    code={osData.commands.join('\n')}
                    title={`${activeOS} Installation Commands`}
                  />
                </div>
              )}

              {osData.notes && (
                <p className="mt-3 text-xs text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30 p-2.5 rounded border border-amber-200 dark:border-amber-900">
                  <strong>Important Note: </strong> {osData.notes}
                </p>
              )}
            </div>

            {/* Configuration Guide (PATH, IDE, Flags) */}
            {selectedGuide.configurationGuide && (
              <div className="mb-6 pt-6 border-t border-slate-200 dark:border-slate-800 space-y-3">
                <div className="flex items-center gap-2 font-bold text-sm text-slate-900 dark:text-slate-100">
                  <Settings className="w-4 h-4 text-sky-500" />
                  <span>3. How to Configure PATH & IDE Environment</span>
                </div>

                <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-700 space-y-2.5 text-xs">
                  <div>
                    <span className="font-bold text-slate-800 dark:text-slate-200 block mb-0.5">
                      PATH & Environment Variables:
                    </span>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                      {selectedGuide.configurationGuide.pathInstructions}
                    </p>
                  </div>

                  <div>
                    <span className="font-bold text-slate-800 dark:text-slate-200 block mb-0.5">
                      IDE & Editor Configuration (VS Code / IntelliJ):
                    </span>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                      {selectedGuide.configurationGuide.ideIntegration}
                    </p>
                  </div>

                  {selectedGuide.configurationGuide.compilerFlagsOrSettings && (
                    <div>
                      <span className="font-bold text-slate-800 dark:text-slate-200 block mb-0.5">
                        Standard Compiler Flags:
                      </span>
                      <code className="text-sky-700 dark:text-sky-300 font-mono text-[11px] bg-white dark:bg-slate-900 px-2 py-1 rounded block">
                        {selectedGuide.configurationGuide.compilerFlagsOrSettings}
                      </code>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Verification Section */}
            <div className="mb-6 pt-6 border-t border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2 mb-2 font-bold text-sm text-slate-900 dark:text-slate-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>4. How to Verify That It Works</span>
              </div>
              <p className="text-xs text-slate-500 mb-3">
                Execute this in your terminal to confirm the tool is present in your system PATH:
              </p>
              <CodeBlock language="bash" code={selectedGuide.verification.command} />
              <ExpectedOutput
                output={selectedGuide.verification.expectedOutput}
                label="Expected Terminal Output"
              />

              {selectedGuide.verification.sampleProgram && (
                <div className="mt-4">
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    5. How to Create and Run a Minimal Test Program ({selectedGuide.verification.sampleProgram.filename}):
                  </span>
                  <CodeBlock
                    language={
                      selectedGuide.languageId === 'python'
                        ? 'python'
                        : selectedGuide.languageId === 'java'
                        ? 'java'
                        : selectedGuide.languageId === 'cpp'
                        ? 'cpp'
                        : 'c'
                    }
                    code={selectedGuide.verification.sampleProgram.code}
                    title={selectedGuide.verification.sampleProgram.filename}
                  />
                  <div className="text-xs text-slate-600 dark:text-slate-400 mt-2">
                    <span className="font-semibold">Terminal Run Command: </span>
                    <code className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-[11px] font-mono text-sky-600 dark:text-sky-400">
                      {selectedGuide.verification.sampleProgram.runCommand}
                    </code>
                  </div>
                </div>
              )}
            </div>

            {/* Troubleshooting */}
            {selectedGuide.troubleshooting.length > 0 && (
              <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2 mb-3 font-bold text-sm text-slate-900 dark:text-slate-100">
                  <AlertCircle className="w-4 h-4 text-rose-500" />
                  <span>6. Common Configuration Problems & Troubleshooting</span>
                </div>
                <div className="space-y-3">
                  {selectedGuide.troubleshooting.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850/60 text-xs"
                    >
                      <h4 className="font-semibold text-rose-700 dark:text-rose-400 mb-1">
                        Problem: {item.problem}
                      </h4>
                      <p className="text-slate-600 dark:text-slate-400 mb-1.5">
                        <strong>Root Cause: </strong> {item.cause}
                      </p>
                      <p className="text-emerald-700 dark:text-emerald-300 font-medium">
                        <strong>Solution: </strong> {item.solution}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Safe Updates & Removal */}
            {selectedGuide.updateAndRemoval && (
              <div className="pt-6 border-t border-slate-200 dark:border-slate-800 text-xs space-y-2">
                <div className="flex items-center gap-2 font-bold text-sm text-slate-900 dark:text-slate-100">
                  <RefreshCw className="w-4 h-4 text-slate-500" />
                  <span>7. How to Update or Remove Safely</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800">
                    <span className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                      Updating to Newer Versions:
                    </span>
                    <p className="text-slate-600 dark:text-slate-400">
                      {selectedGuide.updateAndRemoval.howToUpdate}
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800">
                    <span className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                      Safe Uninstallation:
                    </span>
                    <p className="text-slate-600 dark:text-slate-400">
                      {selectedGuide.updateAndRemoval.howToRemoveSafely}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Official Documentation Link */}
            <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
              <span>8. Official Documentation Reference:</span>
              <a
                href={selectedGuide.officialDocsUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 text-sky-600 dark:text-sky-400 hover:underline font-medium"
              >
                <span>Visit Official Docs</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
