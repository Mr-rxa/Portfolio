import React, { useState, useEffect, useRef } from 'react';
import { usePortfolioStore } from '../store/portfolioStore';
import { profileData } from '../content/profile';
import { projectsData } from '../content/projects';
import { Terminal as TerminalIcon, X } from 'lucide-react';

interface TerminalLine {
  type: 'input' | 'output' | 'error' | 'success';
  text: string;
}

export const TerminalModal: React.FC = () => {
  const { terminalOpen, setTerminalOpen, setViewMode } = usePortfolioStore();
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<TerminalLine[]>([
    { type: 'output', text: 'Rahul Sharma — Causal Systems Terminal v1.0.0' },
    { type: 'output', text: 'Type "help" to view available commands or press ESC / click X to close.' },
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Global shortcut ~ or `
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '`' || e.key === '~') {
        e.preventDefault();
        setTerminalOpen(!terminalOpen);
      }
      if (e.key === 'Escape' && terminalOpen) {
        setTerminalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [terminalOpen, setTerminalOpen]);

  useEffect(() => {
    if (terminalOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [terminalOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  if (!terminalOpen) return null;

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    const newHistory: TerminalLine[] = [...history, { type: 'input', text: `$ ${cmd}` }];

    switch (trimmed) {
      case 'help':
        newHistory.push({
          type: 'output',
          text: `Available commands:
  help               - Display this menu
  about / whoami     - Summary of Rahul Sharma
  projects / ls      - List shipped projects & case studies
  git log            - Recent architectural commits & milestones
  certs              - View verified IIT Bombay & Sololearn certifications
  stack              - Core technical engineering stack
  experience         - Revolt Motors & My Job Grow in AI background
  contact            - Direct communication channels & links
  recruiter          - Jump to clean Recruiter View
  graph              - Switch to Causal Graph Canvas
  resume             - Open Rahul's resume PDF
  clear              - Clear terminal output
  secret             - Personal backstage pass`,
        });
        break;

      case 'about':
      case 'whoami':
        newHistory.push({
          type: 'output',
          text: `${profileData.name} — ${profileData.role}\n"${profileData.tagline}"\n\n${profileData.shortBio}\n\nCollege: PIET (Panipat Institute of Engineering & Technology, 2024-2028)\nLocation: ${profileData.location}\nEmail: ${profileData.email}`,
        });
        break;

      case 'projects':
      case 'ls':
        newHistory.push({
          type: 'output',
          text: projectsData.map((p, i) => `[0${i + 1}] ${p.title} (${p.category})\n    ${p.summary}\n    Stack: ${p.techStack.join(', ')}`).join('\n\n'),
        });
        break;

      case 'git log':
      case 'git log --oneline':
        newHistory.push({
          type: 'output',
          text: `commit 3e4fb5c (HEAD -> main) feat: modular real-time telemetry & decision pipeline
commit b44223f feat(sih25): MobileNetV2 transfer learning on indigenous cattle breeds
commit 892d114 feat(lifeline): dynamic emergency dispatch & spatial impedance matrix
commit 714fa2b feat(retail): Prophet time-series & Google Gemini GenAI executive reporting
commit 630129a feat(mlops): deterministic 10k OHLCV signal pipeline with YAML schema contract
commit 419e044 init: Revolt Motors operational telemetry & open complaint triage engine`,
        });
        break;

      case 'certs':
      case 'certifications':
        newHistory.push({
          type: 'output',
          text: `VERIFIED CREDENTIALS:
  ✓ Git and GitHub — Spoken Tutorial, IIT Bombay (2025)
  ✓ C Programming — Spoken Tutorial, IIT Bombay (2024)
  ✓ C++ Programming — Sololearn (2025)
  ✓ Generative AI & Prompt Engineering — My Job Grow in AI (2025)
  ★ Smart India Hackathon (SIH) 2025 Institutional Representative`,
        });
        break;

      case 'contact':
        newHistory.push({
          type: 'output',
          text: `Email:    ${profileData.email}\nPhone:    ${profileData.phone}\nLinkedIn: ${profileData.linkedin}\nGitHub:   ${profileData.github}\nLocation: ${profileData.location}`,
        });
        break;

      case 'stack':
        newHistory.push({
          type: 'output',
          text: 'Languages:   Python, SQL, C++, C, JavaScript/TypeScript\nBackend:     Flask, RESTful APIs, WebSockets, Webhooks\nAI & Agents: LangChain, Agno, RAG, Google Gemini API, TensorFlow, Prophet\nData/MLOps:  Pandas, NumPy, OpenCV, Scikit-Learn, Docker, Git, n8n',
        });
        break;

      case 'experience':
        newHistory.push({
          type: 'output',
          text: `1. Revolt Motors (Jul–Aug 2026): Business Intelligence using AI Analytics Intern
   - Built Open Complaint Dashboard with multi-parameter filter engine
   - Automated daily EOD management reporting workflows
   - Contributed to AI Retail War Room decision intelligence

2. My Job Grow in AI (2025): AI Intern
   - Built agentic LLM pipelines using LangChain and Agno
   - Engineered automated n8n workflows connecting external business APIs`,
        });
        break;

      case 'recruiter':
        setViewMode('recruiter');
        newHistory.push({ type: 'success', text: 'Switched to Recruiter View.' });
        break;

      case 'graph':
        setViewMode('graph');
        newHistory.push({ type: 'success', text: 'Switched to Causal Graph preview.' });
        break;

      case 'resume':
        window.open(profileData.resumeUrl, '_blank');
        newHistory.push({ type: 'success', text: 'Opening resume in new tab...' });
        break;

      case 'clear':
        setHistory([]);
        setInput('');
        return;

      case 'sudo make_coffee':
        newHistory.push({
          type: 'success',
          text: '☕ Pouring fresh espresso... Energy allocated to 100%. Now go review the projects!',
        });
        break;

      case 'matrix':
        newHistory.push({
          type: 'success',
          text: 'Wake up, Neo... The causal graph has you. Follow the white rabbit.',
        });
        break;

      case 'secret':
        newHistory.push({
          type: 'success',
          text: '★ Secret unlocked: You found the backstage pass! When Rahul isn\'t training models or tuning graph physics, he\'s probably refining terminal themes, optimizing coffee-to-code ratios, or wondering why the loss didn\'t converge at 2 AM. Thanks for exploring!',
        });
        break;

      default:
        if (trimmed === '') break;
        newHistory.push({
          type: 'error',
          text: `Command not found: "${cmd}". Type "help" for a list of commands.`,
        });
    }

    setHistory(newHistory);
    setInput('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/70 backdrop-blur-sm">
      <div className="w-full max-w-2xl h-[420px] rounded-xl bg-surface border border-surface-border shadow-2xl flex flex-col overflow-hidden font-mono text-xs">
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-surface-subtle border-b border-surface-border">
          <div className="flex items-center gap-2 text-content-muted">
            <TerminalIcon className="w-3.5 h-3.5 text-primary" />
            <span className="font-semibold text-content">rs@causal-portfolio:~</span>
          </div>
          <button
            onClick={() => setTerminalOpen(false)}
            className="p-1 rounded hover:bg-surface text-content-muted hover:text-content transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Terminal Output */}
        <div ref={scrollRef} className="flex-1 p-4 overflow-y-auto flex flex-col gap-2">
          {history.map((line, idx) => (
            <div
              key={idx}
              className={`whitespace-pre-wrap leading-relaxed ${
                line.type === 'input'
                  ? 'text-primary font-semibold'
                  : line.type === 'error'
                  ? 'text-signal-orange'
                  : line.type === 'success'
                  ? 'text-primary'
                  : 'text-content-muted'
              }`}
            >
              {line.text}
            </div>
          ))}
        </div>

        {/* Terminal Input */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleCommand(input);
          }}
          className="flex items-center px-4 py-2.5 border-t border-surface-border bg-surface-subtle"
        >
          <span className="text-primary mr-2 font-bold">$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="type 'help' or any command..."
            className="flex-1 bg-transparent text-content outline-none placeholder:text-content-faint"
          />
        </form>
      </div>
    </div>
  );
};
