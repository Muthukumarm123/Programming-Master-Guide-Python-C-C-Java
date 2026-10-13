import React from 'react';
import { Terminal } from 'lucide-react';

interface ExpectedOutputProps {
  output: string;
  label?: string;
}

export const ExpectedOutput: React.FC<ExpectedOutputProps> = ({ output, label = 'Expected Output' }) => {
  return (
    <div className="my-4 rounded-lg border border-slate-700/60 bg-slate-900/80 overflow-hidden text-xs">
      <div className="flex items-center gap-2 px-3 py-1.5 border-b border-slate-800 bg-slate-950/60 text-slate-400 font-mono">
        <Terminal className="w-3.5 h-3.5 text-cyan-400" />
        <span className="font-semibold uppercase tracking-wider">{label}</span>
      </div>
      <div className="p-3.5 font-mono text-emerald-400 whitespace-pre-wrap leading-relaxed overflow-x-auto">
        {output}
      </div>
    </div>
  );
};
