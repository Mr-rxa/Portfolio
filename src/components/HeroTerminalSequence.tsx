import React, { useState } from 'react';
import { usePortfolioStore } from '../store/portfolioStore';
import { 
  ArrowRight, LayoutList, Terminal, ExternalLink 
} from 'lucide-react';
import { profileData } from '../content/profile';

export const HeroTerminalSequence: React.FC = () => {
  const { setViewMode, toggleTerminal, setActiveProjectId } = usePortfolioStore();
  const [activeTab, setActiveTab] = useState<'overview' | 'experience' | 'projects' | 'stack'>('overview');
  const [copiedStatus, setCopiedStatus] = useState<string | null>(null);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profileData.email);
    setCopiedStatus('Copied email to clipboard!');
    setTimeout(() => setCopiedStatus(null), 2500);
  };

  const scrollToGraph = () => {
    const el = document.getElementById('causal-graph-canvas');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      aria-label="Developer Terminal Hero" 
      className="relative w-full border-b border-surface-border bg-gradient-to-b from-surface/50 via-background to-background pt-10 pb-16 px-4 sm:px-6 overflow-hidden"
    >
      {/* Subtle Background Grid */}
      <div 
        aria-hidden="true" 
        className="absolute inset-0 opacity-15 bg-[radial-gradient(#C6FF3D_1px,transparent_1px)] [background-size:28px_28px] pointer-events-none" 
      />

      <div className="max-w-6xl mx-auto flex flex-col gap-10 relative z-10">
        
        {/* Top Header: Philosophy & Fast CTAs */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="flex flex-col gap-3 max-w-2xl">
            {/* Status Indicator */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-surface-border text-xs font-mono text-primary w-fit shadow-sm">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span>RS / 01 // DEV CONSOLE ONLINE</span>
              <span className="text-content-faint">•</span>
              <span className="text-content-muted">PIET '28 CSE/IT</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-content leading-[1.08]">
              I turn messy data <br className="hidden sm:inline" />
              into <span className="text-primary underline decoration-primary/40 underline-offset-8">decisions</span>.
            </h1>

            <p className="text-sm sm:text-base text-content-muted leading-relaxed max-w-xl">
              2nd-year Information Technology engineer building concrete AI workflows, production BI dashboards, and reproducible telemetry pipelines. Real code, zero fluff.
            </p>
          </div>

          {/* Quick Action Hub */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
            <button
              onClick={scrollToGraph}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-primary text-background font-bold text-sm hover:bg-primary-hover transition-all shadow-lg hover:shadow-primary/20 active:scale-[0.98]"
            >
              <span>Explore Causal Graph</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setViewMode('recruiter')}
              className="flex items-center gap-2 px-4 py-3 rounded-xl bg-surface border border-surface-border text-content hover:text-primary hover:border-primary/40 font-medium text-sm transition-all shadow-sm"
              title="Switch to clean 30-second recruiter resume view"
            >
              <LayoutList className="w-4 h-4 text-primary" />
              <span>Recruiter View</span>
            </button>

            <button
              onClick={toggleTerminal}
              className="flex items-center gap-2 px-3.5 py-3 rounded-xl bg-surface border border-surface-border text-content-muted hover:text-primary hover:border-primary/40 font-mono text-sm transition-all"
              title="Open full interactive CLI (~)"
              aria-label="Open CLI Terminal"
            >
              <Terminal className="w-4 h-4" />
              <span className="text-xs">~</span>
            </button>
          </div>
        </div>

        {/* The Concrete Developer Terminal Window */}
        <div className="w-full rounded-2xl bg-surface/90 border border-surface-border backdrop-blur-md shadow-2xl overflow-hidden flex flex-col font-mono text-xs">
          
          {/* Window Title Bar */}
          <div className="flex items-center justify-between px-4 py-3 bg-surface-subtle border-b border-surface-border select-none">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block border border-rose-600/40" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block border border-amber-600/40" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block border border-emerald-600/40" />
              <span className="text-[11px] text-content-muted ml-2 font-mono">
                rahul@piet-workstation: ~ (zsh)
              </span>
            </div>

            {/* Quick Tab Switcher */}
            <div className="flex items-center gap-1 bg-background/70 p-1 rounded-lg border border-surface-border">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-2.5 py-1 rounded text-[11px] transition-colors ${
                  activeTab === 'overview'
                    ? 'bg-primary text-background font-bold'
                    : 'text-content-muted hover:text-content'
                }`}
              >
                whoami.sh
              </button>
              <button
                onClick={() => setActiveTab('experience')}
                className={`px-2.5 py-1 rounded text-[11px] transition-colors ${
                  activeTab === 'experience'
                    ? 'bg-primary text-background font-bold'
                    : 'text-content-muted hover:text-content'
                }`}
              >
                experience.log
              </button>
              <button
                onClick={() => setActiveTab('projects')}
                className={`px-2.5 py-1 rounded text-[11px] transition-colors ${
                  activeTab === 'projects'
                    ? 'bg-primary text-background font-bold'
                    : 'text-content-muted hover:text-content'
                }`}
              >
                projects/
              </button>
              <button
                onClick={() => setActiveTab('stack')}
                className={`px-2.5 py-1 rounded text-[11px] transition-colors ${
                  activeTab === 'stack'
                    ? 'bg-primary text-background font-bold'
                    : 'text-content-muted hover:text-content'
                }`}
              >
                stack.json
              </button>
            </div>
          </div>

          {/* Terminal Body */}
          <div className="p-5 sm:p-6 bg-background/95 text-content flex flex-col gap-4 min-h-[300px]">
            
            {activeTab === 'overview' && (
              <div className="flex flex-col gap-3 animate-in fade-in duration-150">
                <div className="text-content-muted flex items-center gap-2">
                  <span className="text-primary font-bold">rahul@piet:~$</span>
                  <span>cat summary.md</span>
                </div>
                
                <div className="p-4 rounded-xl bg-surface/50 border border-surface-border flex flex-col gap-2.5 leading-relaxed">
                  <p className="text-sm font-semibold text-content">
                    Hey, I'm Rahul Sharma.
                  </p>
                  <p className="text-content-muted text-xs sm:text-sm">
                    I'm an undergraduate in Information Technology at Panipat Institute of Engineering &amp; Technology (PIET). I like building systems where real data flows into real decisions — not toy tutorials.
                  </p>
                  <p className="text-content-muted text-xs sm:text-sm">
                    At <span className="text-primary font-bold">Revolt Motors</span>, I helped automate daily EOD reports and built dealership complaint triage dashboards that turned multi-day Excel turnaround into automated real-time feeds.
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
                  <div className="p-3 rounded-lg bg-surface border border-surface-border flex flex-col gap-0.5">
                    <span className="text-[10px] text-content-faint uppercase">College / Grad</span>
                    <span className="text-sm font-bold text-content font-mono">PIET (2024–2028)</span>
                    <span className="text-[10px] text-content-muted">Panipat, Haryana</span>
                  </div>
                  <div className="p-3 rounded-lg bg-surface border border-surface-border flex flex-col gap-0.5">
                    <span className="text-[10px] text-content-faint uppercase">Internships</span>
                    <span className="text-sm font-bold text-primary font-mono">2 Shipped Roles</span>
                    <span className="text-[10px] text-content-muted">Revolt Motors + AI Agency</span>
                  </div>
                  <div className="p-3 rounded-lg bg-surface border border-surface-border flex flex-col gap-0.5">
                    <span className="text-[10px] text-content-faint uppercase">Data Scale</span>
                    <span className="text-sm font-bold text-content font-mono">1,000,000+ Records</span>
                    <span className="text-[10px] text-content-muted">UIDAI Aadhaar Analysis</span>
                  </div>
                  <div className="p-3 rounded-lg bg-surface border border-surface-border flex flex-col gap-0.5">
                    <span className="text-[10px] text-content-faint uppercase">Hackathons</span>
                    <span className="text-sm font-bold text-primary font-mono">SIH 2025</span>
                    <span className="text-[10px] text-content-muted">PIET Representative</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'experience' && (
              <div className="flex flex-col gap-3 animate-in fade-in duration-150">
                <div className="text-content-muted flex items-center gap-2">
                  <span className="text-primary font-bold">rahul@piet:~$</span>
                  <span>tail -n 2 experience.log</span>
                </div>

                <div className="space-y-3">
                  <div className="p-3.5 rounded-lg bg-surface border border-surface-border flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-content text-sm">
                        Revolt Motors · Business Intelligence using AI Analytics Intern
                      </span>
                      <span className="text-[10px] text-primary px-2 py-0.5 rounded bg-primary/10 border border-primary/20">
                        Jul 2026 – Aug 2026
                      </span>
                    </div>
                    <ul className="text-content-muted text-xs list-disc list-inside space-y-1">
                      <li>Engineered interactive Open Complaint Dashboard with multi-parameter filter engine for dealer networks.</li>
                      <li>Structured daily EOD report management and automated variance reporting for executive business reviews.</li>
                      <li>Contributed to AI Retail War Room integrating Prophet time-series forecasts and Gemini AI briefs.</li>
                    </ul>
                  </div>

                  <div className="p-3.5 rounded-lg bg-surface border border-surface-border flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-content text-sm">
                        My Job Grow in AI · AI Intern
                      </span>
                      <span className="text-[10px] text-content-muted px-2 py-0.5 rounded bg-surface-subtle border border-surface-border">
                        2025 (Remote)
                      </span>
                    </div>
                    <ul className="text-content-muted text-xs list-disc list-inside space-y-1">
                      <li>Orchestrated production LLM agent pipelines using LangChain and Agno with tool-based workflows.</li>
                      <li>Constructed automated n8n workflows connecting external business APIs to trigger multi-step actions.</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'projects' && (
              <div className="flex flex-col gap-3 animate-in fade-in duration-150">
                <div className="text-content-muted flex items-center gap-2">
                  <span className="text-primary font-bold">rahul@piet:~$</span>
                  <span>ls -lh --time-style=iso projects/</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {[
                    { name: 'AI-Retail-War-Room', slug: 'ai-retail-war-room', desc: 'Prophet forecasting + Google Gemini executive briefings', tech: 'Flask · PostgreSQL · Prophet', demo: 'https://ai-retail-war-room.vercel.app' },
                    { name: 'Lifeline-AI', slug: 'lifeline-ai', desc: 'Real-time ambulance telemetry & nearest-hospital dispatch', tech: 'Python · WebSockets · GIS', demo: 'https://lifeline-ai-ten.vercel.app' },
                    { name: 'signal-pipeline-mlops', slug: 'signal-pipeline-mlops', desc: 'Deterministic rolling signal extraction from 10k OHLCV records', tech: 'Python · Pandera · Docker', demo: null },
                    { name: 'trading_bot_binance', slug: 'trading_bot_binance', desc: 'HMAC-SHA256 authenticated order executor on Testnet', tech: 'Python · REST · HMAC', demo: null },
                    { name: 'farm_to_fork', slug: 'farm_to_fork', desc: 'Agricultural logistics produce marketplace', tech: 'FastAPI · SQL · Batch Sync', demo: null },
                    { name: 'UIDAI-analytics', slug: 'uidai', desc: '1M+ Aadhaar official record geospatial coverage modeling', tech: 'Polars · Spatial EDA', demo: null },
                  ].map((p) => (
                    <div 
                      key={p.slug}
                      className="p-3 rounded-lg bg-surface border border-surface-border hover:border-primary/50 transition-colors flex flex-col justify-between gap-1.5"
                    >
                      <div className="flex items-center justify-between">
                        <button
                          onClick={() => setActiveProjectId(p.slug)}
                          className="font-bold text-primary hover:underline text-left text-xs"
                        >
                          {p.name}
                        </button>
                        {p.demo && (
                          <a
                            href={p.demo}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-1 text-[10px] text-content-muted hover:text-primary transition-colors"
                          >
                            <span>Live</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                      <p className="text-[11px] text-content-muted leading-tight">{p.desc}</p>
                      <span className="text-[10px] font-mono text-content-faint">{p.tech}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'stack' && (
              <div className="flex flex-col gap-3 animate-in fade-in duration-150">
                <div className="text-content-muted flex items-center gap-2">
                  <span className="text-primary font-bold">rahul@piet:~$</span>
                  <span>jq '.core_stack' package.json</span>
                </div>

                <div className="p-4 rounded-xl bg-surface/60 border border-surface-border font-mono text-xs overflow-x-auto leading-relaxed">
                  <pre className="text-content-muted">
{`{
  "languages": ["Python", "SQL", "C++", "C"],
  "backend_frameworks": ["Flask", "RESTful APIs", "WebSockets", "Webhooks"],
  "ai_and_agents": ["LangChain", "Agno", "RAG Prompting", "Google Gemini API"],
  "data_and_analytics": ["Pandas", "NumPy", "OpenCV", "Facebook Prophet", "Scikit-Learn"],
  "infrastructure_and_tools": ["n8n Workflows", "Git & GitHub", "Docker", "PostgreSQL", "Vercel Serverless"]
}`}
                  </pre>
                </div>
              </div>
            )}

          </div>

          {/* Terminal Bottom Command Shortcut Bar */}
          <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 bg-surface-subtle border-t border-surface-border text-[11px] text-content-muted">
            <div className="flex items-center gap-3">
              <span className="text-primary flex items-center gap-1 font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                Available:
              </span>
              <span>sharmarahul5437@gmail.com</span>
              <span>•</span>
              <span>+91-8307629663</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyEmail}
                className="px-2.5 py-1 rounded bg-surface border border-surface-border hover:border-primary/50 text-content hover:text-primary transition-colors"
              >
                {copiedStatus || 'Copy Email'}
              </button>
              <a
                href={profileData.resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="px-2.5 py-1 rounded bg-primary text-background font-bold hover:bg-primary-hover transition-colors"
              >
                Resume PDF
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
