import React from 'react';
import { usePortfolioStore } from '../store/portfolioStore';
import { Network, Sparkles, ArrowLeft } from 'lucide-react';
import { projectsData } from '../content/projects';

export const GraphPreview: React.FC = () => {
  const { setViewMode } = usePortfolioStore();

  return (
    <div className="w-full min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center p-6 text-center bg-background relative overflow-hidden">
      {/* Decorative grid background */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C6FF3D_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <div className="max-w-xl z-10 flex flex-col items-center gap-6 p-8 rounded-2xl bg-surface/80 border border-surface-border backdrop-blur-md shadow-2xl">
        <div className="w-16 h-16 rounded-2xl bg-surface-subtle border border-primary/40 flex items-center justify-center text-primary shadow-inner">
          <Network className="w-8 h-8 animate-pulse" />
        </div>

        <div className="flex flex-col gap-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-mono text-primary mx-auto">
            <Sparkles className="w-3 h-3" />
            <span>Scheduled for Phase 2</span>
          </div>
          <h2 className="text-2xl font-bold text-content">
            Causal Graph Navigation Engine
          </h2>
          <p className="text-sm text-content-muted leading-relaxed">
            In Phase 2, this view transforms into an interactive force-directed WebGL/Canvas causal graph. Hovering tech nodes will illuminate connected projects, and clicking projects will zoom seamlessly into case studies.
          </p>
        </div>

        {/* Nodes summary stats */}
        <div className="grid grid-cols-3 gap-3 w-full py-2 border-y border-surface-border font-mono text-xs">
          <div className="flex flex-col gap-1">
            <span className="text-primary font-bold text-lg">{projectsData.length}</span>
            <span className="text-content-muted">Projects</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-primary font-bold text-lg">20+</span>
            <span className="text-content-muted">Tech Nodes</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-primary font-bold text-lg">35+</span>
            <span className="text-content-muted">Causal Edges</span>
          </div>
        </div>

        <button
          onClick={() => setViewMode('recruiter')}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-background font-semibold text-sm hover:bg-primary-hover transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Recruiter View</span>
        </button>
      </div>
    </div>
  );
};
