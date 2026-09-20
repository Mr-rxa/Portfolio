import React from 'react';
import { HeroTerminalSequence } from '../components/HeroTerminalSequence';
import { CausalGraph } from '../components/CausalGraph';
import { projectsData } from '../content/projects';
import { usePortfolioStore } from '../store/portfolioStore';
import { PlayCircle, ArrowUpRight, Sparkles, Network } from 'lucide-react';

export const GraphView: React.FC = () => {
  const { setActiveProjectId } = usePortfolioStore();

  return (
    <div className="w-full min-h-screen bg-background text-content flex flex-col">
      <HeroTerminalSequence />

      {/* Mobile-only: compact project list before the graph canvas */}
      <section className="sm:hidden w-full py-8 px-4 border-b border-surface-border" aria-label="Projects (mobile list)">
        <div className="flex items-center gap-2 mb-5">
          <Network className="w-4 h-4 text-primary" aria-hidden="true" />
          <h2 className="text-sm font-mono font-bold text-content uppercase tracking-wider">Projects</h2>
        </div>
        <div className="flex flex-col gap-3">
          {projectsData.map((project) => (
            <button
              key={project.id}
              onClick={() => setActiveProjectId(project.slug)}
              aria-label={`Open ${project.title} case study`}
              className="w-full p-4 rounded-xl bg-surface border border-surface-border hover:border-primary/50 active:scale-[0.98] text-left transition-all flex items-start justify-between gap-3 group"
            >
              <div className="flex flex-col gap-1 flex-1 min-w-0">
                <span className="text-[10px] font-mono text-primary uppercase font-semibold">{project.category}</span>
                <h3 className="text-sm font-bold text-content group-hover:text-primary transition-colors">{project.title}</h3>
                <p className="text-xs text-content-muted line-clamp-1 leading-relaxed">{project.summary}</p>
              </div>
              <div className="flex flex-col items-end gap-1 shrink-0">
                {project.proofType !== 'none' && (
                  <span className="flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">
                    <PlayCircle className="w-3 h-3" aria-hidden="true" /> Proof
                  </span>
                )}
                <ArrowUpRight className="w-4 h-4 text-content-muted group-hover:text-primary transition-colors" aria-hidden="true" />
              </div>
            </button>
          ))}
        </div>
      </section>

      <CausalGraph />

      <section className="w-full py-12 px-4 sm:px-6 border-t border-surface-border bg-gradient-to-b from-background to-surface/40" aria-label="Playable proofs">
        <div className="max-w-6xl mx-auto flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-surface-border pb-3">
            <div>
              <h2 className="text-lg font-bold text-content flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" aria-hidden="true" />
                <span>Playable Proofs Index</span>
              </h2>
              <p className="text-xs text-content-muted">
                Interactive simulations demonstrating real domain causality and algorithms.
              </p>
            </div>
            <span className="text-xs font-mono text-content-muted" aria-hidden="true">Click any proof to open</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" role="list">
            {projectsData.map((project) => (
              <button
                key={project.id}
                onClick={() => setActiveProjectId(project.slug)}
                aria-label={`Open ${project.title}${project.proofType !== 'none' ? ' – includes playable proof' : ''}`}
                role="listitem"
                className="p-5 rounded-xl bg-surface border border-surface-border hover:border-primary/50 active:scale-[0.98] text-left transition-all flex flex-col justify-between gap-4 group shadow-sm hover:shadow-primary/5 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:ring-offset-2 focus:ring-offset-background"
              >
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono text-primary uppercase font-semibold">
                      {project.category}
                    </span>
                    {project.proofType !== 'none' && (
                      <span className="flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20" aria-hidden="true">
                        <PlayCircle className="w-3 h-3" /> Proof
                      </span>
                    )}
                  </div>
                  <h3 className="text-base font-bold text-content group-hover:text-primary transition-colors tracking-tight">
                    {project.title}
                  </h3>
                  <p className="text-xs text-content-muted line-clamp-2 leading-relaxed">
                    {project.summary}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-surface-border font-mono text-xs text-content-muted group-hover:text-primary">
                  <span>Open Case Study</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" aria-hidden="true" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
