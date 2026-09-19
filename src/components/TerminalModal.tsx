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
          text: `Available commands:\n  help        - Display this menu\n  about       - Summary of Rahul Sharma\n  projects    - List projects & case studies\n  stack       - Core technical stack\n  experience  - Revolt Motors & work background\n  recruiter   - Jump to Recruiter View\n  graph       - Switch to Causal Graph\n  resume      - Open Rahul's resume\n  clear       - Clear terminal screen\n  sudo make_coffee - Easter egg\n  matrix      - Easter egg\n  secret      - Easter egg`,
        });
        break;

      case 'about':
        newHistory.push({
          type: 'output',
          text: `${profileData.name} — ${profileData.role}\n"${profileData.tagline}"\n${profileData.shortBio}\nLocation: ${profileData.location}`,
        });
        break;

      case 'projects':
        newHistory.push({
          type: 'output',
          text: projectsData.map((p, i) => `[${i + 1}] ${p.title} (${p.category}) -> ${p.summary}`).join('\n\n'),
        });
        break;

      case 'stack':
        newHistory.push({
          type: 'output',
          text: 'Core: Python, SQL, PyTorch, Causal ML (DoWhy), TypeScript, React, DuckDB, Prophet.',
        });
        break;

      case 'experience':
        newHistory.push({
          type: 'output',
          text: 'Revolt Motors (2024): Data & AI Engineering Intern. Built automated EOD reporting pipelines (-80% time) and prototype AI Retail War Room.',
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
          type: 'output',
          text: 'Secret unlocked: Rahul built this portfolio with a force-directed causal engine in Phase 2. Stay tuned!',
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
