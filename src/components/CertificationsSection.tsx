import React from 'react';
import { certificationsData } from '../content/certifications';
import { Award, ExternalLink, CheckCircle2, ShieldCheck } from 'lucide-react';

export const CertificationsSection: React.FC = () => {
  return (
    <section id="certifications" className="flex flex-col gap-6 pt-2">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-surface-border pb-3">
        <div className="flex items-center gap-2.5">
          <Award className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-bold tracking-tight text-content">
            Certifications &amp; Accreditations
          </h2>
        </div>
        <span className="text-xs font-mono text-content-muted">05 / Verified Credentials</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {certificationsData.map((cert) => (
          <div
            key={cert.id}
            className="p-5 rounded-xl bg-surface border border-surface-border flex flex-col justify-between gap-4 hover:border-primary/40 transition-all shadow-sm group"
          >
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] font-mono text-primary font-bold px-2 py-0.5 rounded bg-primary/10 border border-primary/20 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  {cert.issuer}
                </span>
                <span className="text-xs font-mono text-content-muted">
                  {cert.year}
                </span>
              </div>

              <h3 className="text-base font-bold text-content group-hover:text-primary transition-colors">
                {cert.title}
              </h3>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {cert.skillsLearned.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="px-2 py-0.5 rounded bg-surface-subtle border border-surface-border text-[11px] font-mono text-content-muted"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-surface-border/60">
              <span className="text-[11px] font-mono text-content-faint flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Verified Credential
              </span>

              {cert.credentialUrl && (
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 text-xs font-mono text-primary hover:underline"
                >
                  <span>Verify</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
