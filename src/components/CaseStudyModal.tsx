import React, { useState, useEffect } from 'react';
import { usePortfolioStore } from '../store/portfolioStore';
import { projectsData } from '../content/projects';
import { X, PlayCircle, BookOpen, ExternalLink, GitCommit } from 'lucide-react';
import { GithubIcon } from './Icons';

import { WarRoomProof } from './proofs/WarRoomProof';
import { SmartAmbulanceProof } from './proofs/SmartAmbulanceProof';
import { SignalPipelineProof } from './proofs/SignalPipelineProof';

export const CaseStudyModal: React.FC = () => {
  const { activeProjectId, setActiveProjectId } = usePortfolioStore();
  const [activeTab, setActiveTab] = useState<'proof' | 'study'>('proof');

  const project = projectsData.find(
    (p) => p.slug === activeProjectId || p.id === activeProjectId
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activeProjectId) {
        setActiveProjectId(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeProjectId, setActiveProjectId]);

  useEffect(() => {
    if (activeProjectId) {
      window.location.hash = `#/project/${activeProjectId}`;
      setActiveTab(project?.proofType !== 'none' ? 'proof' : 'study');
    }
  }, [activeProjectId, project?.proofType]);

  if (!project) return null;

  const renderProof = () => {
    switch (project.proofType) {
      case 'retail-war-room':
        return <WarRoomProof />;
      case 'lifeline-ai':
        return <SmartAmbulanceProof />;
      case 'signal-pipeline':
        return <SignalPipelineProof />;
      default:
        return (
          <div className="p-12 text-center text-content-muted font-mono text-xs rounded-xl bg-surface border border-surface-border flex flex-col items-center gap-2">
            <GitCommit className="w-5 h-5 text-primary" />
            <span>Interactive sandbox not applicable for this repository. Inspect the Step-by-Step Architecture below.</span>
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-background/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="w-full max-w-4xl max-h-[92vh] rounded-2xl bg-surface border border-surface-border shadow-2xl flex flex-col overflow-hidden my-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-surface-border bg-surface-subtle">
          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="text-primary uppercase font-bold">{project.category}</span>
            <span className="text-content-faint">•</span>
            <span className="text-content-muted">{project.date}</span>
          </div>

          <div className="flex items-center gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/30 text-primary hover:bg-primary/20 transition-colors text-xs font-mono font-medium"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Live App</span>
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface border border-surface-border hover:text-primary transition-colors text-xs font-mono text-content-muted"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>GitHub Repo</span>
              </a>
            )}
            <button
              onClick={() => setActiveProjectId(null)}
              className="p-1.5 rounded-lg hover:bg-surface text-content-muted hover:text-content transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 sm:p-8 flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-content font-mono">
                {project.title}
              </h2>
            </div>
            <p className="text-sm sm:text-base text-content-muted leading-relaxed">
              {project.summary}
            </p>
          </div>

          <div className="flex items-center p-1 rounded-xl bg-surface-subtle border border-surface-border w-fit">
            {project.proofType !== 'none' && (
              <button
                onClick={() => setActiveTab('proof')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono transition-all ${
                  activeTab === 'proof'
                    ? 'bg-primary text-background font-bold shadow-sm'
                    : 'text-content-muted hover:text-content'
                }`}
              >
                <PlayCircle className="w-3.5 h-3.5" />
                <span>Playable Proof</span>
              </button>
            )}
            <button
              onClick={() => setActiveTab('study')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono transition-all ${
                activeTab === 'study'
                  ? 'bg-primary text-background font-bold shadow-sm'
                  : 'text-content-muted hover:text-content'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Step-by-Step Architecture</span>
            </button>
          </div>

          {activeTab === 'proof' && project.proofType !== 'none' ? (
            <div className="w-full animate-in fade-in duration-150">
              {renderProof()}
            </div>
          ) : (
            <div className="flex flex-col gap-6 animate-in fade-in duration-150">
              {/* 01. The Problem */}
              <div className="p-5 rounded-xl bg-surface-subtle border border-surface-border flex flex-col gap-2">
                <span className="text-xs font-mono uppercase font-bold text-content flex items-center gap-1.5">
                  <span className="text-primary font-mono">01.</span> Problem Statement
                </span>
                <p className="text-sm text-content-muted leading-relaxed">
                  {project.problem}
                </p>
              </div>

              {/* 02. Technical Contribution */}
              <div className="p-5 rounded-xl bg-surface-subtle border border-surface-border flex flex-col gap-2">
                <span className="text-xs font-mono uppercase font-bold text-primary flex items-center gap-1.5">
                  <span className="text-primary font-mono">02.</span> Technical Contribution
                </span>
                <p className="text-sm text-content-muted leading-relaxed">
                  {project.contribution}
                </p>
              </div>

              {/* 03. Pipeline Architecture */}
              <div className="p-5 rounded-xl bg-surface-subtle border border-surface-border flex flex-col gap-3">
                <span className="text-xs font-mono uppercase font-bold text-content flex items-center gap-1.5">
                  <span className="text-primary font-mono">03.</span> System Architecture &amp; Data Pipeline
                </span>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 overflow-x-auto py-1">
                  {project.architecture.split('->').map((rawStage, idx, arr) => {
                    const stage = rawStage.trim();
                    return (
                      <React.Fragment key={idx}>
                        <div className="flex-1 min-w-[130px] p-3.5 rounded-lg bg-background border border-surface-border flex flex-col gap-1.5 hover:border-primary/50 transition-colors group">
                          <div className="flex items-center justify-between text-[10px] font-mono text-content-faint">
                            <span>STAGE 0{idx + 1}</span>
                            <span className="w-1.5 h-1.5 rounded-full bg-primary/70 group-hover:bg-primary transition-colors" />
                          </div>
                          <span className="text-xs font-mono font-medium text-content group-hover:text-primary transition-colors leading-tight">
                            {stage}
                          </span>
                        </div>
                        {idx < arr.length - 1 && (
                          <div className="hidden sm:flex items-center justify-center text-primary font-mono text-sm px-1 select-none">
                            →
                          </div>
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>

              {/* 04. Real Steps (Zero to Current) */}
              {project.steps && project.steps.length > 0 && (
                <div className="p-5 rounded-xl bg-surface-subtle border border-surface-border flex flex-col gap-3">
                  <span className="text-xs font-mono uppercase font-bold text-content flex items-center gap-1.5">
                    <span className="text-primary font-mono">04.</span> Real Steps &amp; Progression (Zero to Current)
                  </span>
                  <p className="text-xs text-content-muted">
                    Trace of architectural milestones and commits directly from the GitHub repository history:
                  </p>
                  <div className="flex flex-col gap-2.5 pt-1">
                    {project.steps.map((s) => (
                      <div
                        key={s.step}
                        className="p-3.5 rounded-lg bg-background border border-surface-border flex flex-col sm:flex-row sm:items-start gap-3 hover:border-surface-border/90 transition-colors"
                      >
                        <div className="flex items-center sm:flex-col sm:items-start gap-2 shrink-0 min-w-[130px]">
                          <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-surface border border-surface-border text-primary">
                            STEP 0{s.step}
                          </span>
                          <span className="text-[10px] font-mono text-content-muted">{s.stage}</span>
                        </div>
                        <div className="flex flex-col gap-0.5 flex-1">
                          <span className="text-xs font-mono font-bold text-content">{s.title}</span>
                          <p className="text-xs text-content-muted leading-relaxed">{s.detail}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 05. Quantitative Impact */}
              <div className="p-5 rounded-xl bg-surface-subtle border border-surface-border flex flex-col gap-3">
                <span className="text-xs font-mono uppercase font-bold text-content flex items-center gap-1.5">
                  <span className="text-primary font-mono">05.</span> System Metrics &amp; Validation
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {project.metrics.map((m, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-lg bg-background border border-surface-border flex flex-col gap-1 hover:border-surface-border/80 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] text-content-muted">{m.label}</span>
                        {!m.verified && (
                          <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-signal-orange/10 text-signal-orange border border-signal-orange/20">
                            Calibrating
                          </span>
                        )}
                      </div>
                      <span className={`text-base font-mono font-bold ${
                        m.verified ? 'text-primary' : 'text-signal-orange'
                      }`}>
                        {m.value}
                      </span>
                      {m.detail && (
                        <span className="text-[10px] text-content-faint leading-tight">{m.detail}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* 06. Impact & Forward View */}
              <div className="p-5 rounded-xl bg-surface-subtle border border-surface-border flex flex-col gap-2">
                <span className="text-xs font-mono uppercase font-bold text-content flex items-center gap-1.5">
                  <span className="text-primary font-mono">06.</span> Operational Impact
                </span>
                <p className="text-sm text-content-muted leading-relaxed">
                  {project.impact}
                </p>
              </div>
            </div>
          )}

          <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-surface-border">
            <span className="text-xs font-mono text-content-muted mr-1">Stack:</span>
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 rounded bg-surface-subtle border border-surface-border text-xs font-mono text-content-muted"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
