import React from 'react';
import { usePortfolioStore } from '../store/portfolioStore';
import { profileData } from '../content/profile';
import { Terminal, FileText, Network, LayoutList } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';

export const Header: React.FC = () => {
  const { viewMode, setViewMode, toggleTerminal } = usePortfolioStore();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-surface-border bg-background/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Left: RS Monogram & Identity */}
        <div className="flex items-center gap-3">
          <a
            href="#recruiter"
            onClick={() => setViewMode('recruiter')}
            className="flex items-center gap-2 group"
          >
            <div className="w-9 h-9 rounded-lg bg-surface border border-surface-border flex items-center justify-center font-mono font-bold text-primary group-hover:border-primary/50 transition-colors shadow-sm">
              RS
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold tracking-tight text-content group-hover:text-primary transition-colors">
                {profileData.name}
              </span>
              <span className="text-[11px] font-mono text-content-muted hidden sm:inline-block">
                {profileData.handle}
              </span>
            </div>
          </a>

          {/* Availability badge */}
          <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface border border-surface-border text-[11px] text-content-muted">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span>Open to AI / Data Roles</span>
          </div>
        </div>

        {/* Center: View Mode Switcher */}
        <div className="flex items-center p-1 bg-surface rounded-lg border border-surface-border">
          <button
            onClick={() => setViewMode('recruiter')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
              viewMode === 'recruiter'
                ? 'bg-primary text-background font-semibold shadow-sm'
                : 'text-content-muted hover:text-content'
            }`}
          >
            <LayoutList className="w-3.5 h-3.5" />
            <span>Recruiter View</span>
          </button>
          <button
            onClick={() => setViewMode('graph')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
              viewMode === 'graph'
                ? 'bg-primary text-background font-semibold shadow-sm'
                : 'text-content-muted hover:text-content'
            }`}
          >
            <Network className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Causal Graph</span>
            <span className="sm:hidden">Graph</span>
          </button>
        </div>

        {/* Right: Quick Links & Terminal Trigger */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={toggleTerminal}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-surface-border bg-surface text-content-muted hover:text-primary hover:border-primary/40 transition-colors text-xs font-mono"
            title="Open Interactive Terminal (~)"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">~</span>
          </button>

          <a
            href={profileData.github}
            target="_blank"
            rel="noreferrer"
            className="p-2 rounded-lg border border-surface-border bg-surface text-content-muted hover:text-content hover:border-surface-border/80 transition-colors"
            title="GitHub Profile"
          >
            <GithubIcon className="w-4 h-4" />
          </a>

          <a
            href={profileData.linkedin}
            target="_blank"
            rel="noreferrer"
            className="p-2 rounded-lg border border-surface-border bg-surface text-content-muted hover:text-content hover:border-surface-border/80 transition-colors"
            title="LinkedIn Profile"
          >
            <LinkedinIcon className="w-4 h-4" />
          </a>

          <a
            href={profileData.resumeUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface border border-surface-border hover:border-primary/50 text-content hover:text-primary transition-all text-xs font-medium"
          >
            <FileText className="w-3.5 h-3.5 text-primary" />
            <span className="hidden sm:inline">Resume</span>
          </a>
        </div>
      </div>
    </header>
  );
};
