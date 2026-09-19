import React from 'react';
import { profileData } from '../content/profile';
import { ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-surface-border bg-background pt-12 pb-16 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        {/* Subtle Phulkari-inspired geometric diamond line pattern */}
        <div className="w-full flex items-center justify-center gap-2 opacity-30 py-2">
          <svg width="240" height="12" viewBox="0 0 240 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 6 L10 0 L20 6 L10 12 Z M20 6 L30 0 L40 6 L30 12 Z M40 6 L50 0 L60 6 L50 12 Z M60 6 L70 0 L80 6 L70 12 Z M80 6 L90 0 L100 6 L90 12 Z M100 6 L110 0 L120 6 L110 12 Z M120 6 L130 0 L140 6 L130 12 Z M140 6 L150 0 L160 6 L150 12 Z M160 6 L170 0 L180 6 L170 12 Z M180 6 L190 0 L200 6 L190 12 Z M200 6 L210 0 L220 6 L210 12 Z M220 6 L230 0 L240 6 L230 12 Z" stroke="#C6FF3D" strokeWidth="0.8" />
          </svg>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-content-muted">
          <div className="flex flex-col items-center md:items-start gap-1 text-center md:text-left">
            <span className="font-mono text-content font-medium">
              {profileData.name} — {profileData.handle}
            </span>
            <span>
              Designed for high-signal engineering reviews. No decorative filler.
            </span>
          </div>

          <div className="flex items-center gap-6 font-mono text-xs">
            <a
              href={profileData.github}
              target="_blank"
              rel="noreferrer"
              className="hover:text-primary flex items-center gap-1 transition-colors"
            >
              GitHub <ArrowUpRight className="w-3 h-3" />
            </a>
            <a
              href={profileData.linkedin}
              target="_blank"
              rel="noreferrer"
              className="hover:text-primary flex items-center gap-1 transition-colors"
            >
              LinkedIn <ArrowUpRight className="w-3 h-3" />
            </a>
            <a
              href={`mailto:${profileData.email}`}
              className="hover:text-primary flex items-center gap-1 transition-colors"
            >
              Email <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>
        </div>

        <div className="text-center font-mono text-[11px] text-content-faint">
          Built with Vite, React, TypeScript, and Tailwind CSS.
        </div>
      </div>
    </footer>
  );
};
