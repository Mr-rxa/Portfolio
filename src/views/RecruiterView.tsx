import React, { useState } from 'react';
import { profileData } from '../content/profile';
import { projectsData } from '../content/projects';
import { experienceData } from '../content/experience';
import { educationData } from '../content/education';
import { skillCategories } from '../content/skills';
import { usePortfolioStore } from '../store/portfolioStore';
import { 
  FileText, Mail, ArrowUpRight, 
  CheckCircle2, Sparkles, Building2, GraduationCap, 
  Cpu, Layers, PlayCircle, Filter
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../components/Icons';

export const RecruiterView: React.FC = () => {
  const { setViewMode, setActiveProjectId } = usePortfolioStore();
  const [selectedTech, setSelectedTech] = useState<string | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profileData.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  // Filter projects based on selected tech
  const filteredProjects = selectedTech
    ? projectsData.filter((p) => p.techStack.includes(selectedTech))
    : projectsData;

  // Aggregate all unique tech tags for filter chips
  const allTechTags = Array.from(
    new Set(projectsData.flatMap((p) => p.techStack))
  ).slice(0, 10); // Show top 10

  return (
    <div className="w-full min-h-screen bg-background text-content pb-20">
      {/* 1. Hero / Pitch Section */}
      <section className="pt-12 pb-16 border-b border-surface-border bg-gradient-to-b from-surface/40 to-transparent">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col gap-6">
            {/* Tagline & Role */}
            <div className="flex flex-col gap-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-surface-border text-xs font-mono text-primary w-fit">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                <span>{profileData.role}</span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-content leading-tight">
                {profileData.tagline}
              </h1>
              <p className="text-base sm:text-lg text-content-muted leading-relaxed max-w-3xl">
                {profileData.shortBio}
              </p>
            </div>

            {/* Key Impact Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              {profileData.keyStats.map((stat, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-surface border border-surface-border flex flex-col gap-1 hover:border-primary/40 transition-colors"
                >
                  <span className="text-2xl sm:text-3xl font-mono font-bold text-primary">
                    {stat.value}
                  </span>
                  <span className="text-xs font-semibold text-content">
                    {stat.label}
                  </span>
                  <span className="text-[11px] text-content-muted leading-tight">
                    {stat.detail}
                  </span>
                </div>
              ))}
            </div>

            {/* Quick Action Bar */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={profileData.resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-background font-semibold text-sm hover:bg-primary-hover transition-colors shadow-sm"
              >
                <FileText className="w-4 h-4" />
                <span>Download Resume (PDF)</span>
              </a>

              <button
                onClick={handleCopyEmail}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-surface border border-surface-border hover:border-surface-border/80 text-content text-sm font-medium transition-colors"
              >
                {copiedEmail ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    <span className="text-primary font-mono text-xs">Email Copied!</span>
                  </>
                ) : (
                  <>
                    <Mail className="w-4 h-4 text-content-muted" />
                    <span>Copy Email</span>
                  </>
                )}
              </button>

              <button
                onClick={() => setViewMode('graph')}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-surface border border-surface-border hover:border-primary/50 text-content text-sm font-medium transition-colors"
              >
                <Sparkles className="w-4 h-4 text-primary" />
                <span>Switch to Causal Graph</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-12 flex flex-col gap-16">
        
        {/* 2. Work Experience (Revolt Motors) */}
        <section id="experience" className="flex flex-col gap-6">
          <div className="flex items-center justify-between border-b border-surface-border pb-3">
            <div className="flex items-center gap-2.5">
              <Building2 className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold tracking-tight text-content">
                Work Experience
              </h2>
            </div>
            <span className="text-xs font-mono text-content-muted">01 / Industry Impact</span>
          </div>

          <div className="flex flex-col gap-6">
            {experienceData.map((exp) => (
              <div
                key={exp.id}
                className="p-6 rounded-xl bg-surface border border-surface-border flex flex-col gap-5 relative overflow-hidden"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="text-lg font-bold text-content flex items-center gap-2">
                      {exp.role}
                      <span className="text-xs font-mono font-normal px-2 py-0.5 rounded bg-surface-subtle border border-surface-border text-primary">
                        {exp.type}
                      </span>
                    </h3>
                    <p className="text-sm font-medium text-content-muted">
                      {exp.company} • {exp.location}
                    </p>
                  </div>
                  <div className="text-xs font-mono text-content-muted sm:text-right">
                    {exp.period}
                  </div>
                </div>

                <p className="text-sm text-content-muted leading-relaxed">
                  {exp.summary}
                </p>

                {/* Bullet points */}
                <div className="flex flex-col gap-3">
                  {exp.bulletPoints.map((bp, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-sm text-content/90 leading-relaxed">
                      <span className="text-primary font-mono text-xs mt-1">▸</span>
                      <div className="flex-1">
                        <span>{bp.text}</span>
                        {bp.metrics && (
                          <span className={`ml-2 inline-block font-mono text-xs px-2 py-0.5 rounded ${
                            bp.verified 
                              ? 'bg-primary/10 text-primary border border-primary/20' 
                              : 'bg-signal-orangeMuted text-signal-orange border border-signal-orange/30'
                          }`}>
                            {bp.metrics}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Tech pills */}
                <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-surface-border">
                  <span className="text-xs font-mono text-content-muted mr-1">Stack:</span>
                  {exp.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded bg-surface-subtle border border-surface-border text-xs font-mono text-content-muted"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Featured Projects */}
        <section id="projects" className="flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-surface-border pb-3">
            <div className="flex items-center gap-2.5">
              <Layers className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold tracking-tight text-content">
                Projects & Playable Proofs
              </h2>
            </div>
            <span className="text-xs font-mono text-content-muted">02 / Concrete Code</span>
          </div>

          {/* Interactive Tech Filter */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-xs font-mono text-content-muted flex items-center gap-1 mr-1">
              <Filter className="w-3 h-3" /> Filter:
            </span>
            <button
              onClick={() => setSelectedTech(null)}
              className={`px-2.5 py-1 rounded-md text-xs font-mono transition-colors ${
                selectedTech === null
                  ? 'bg-primary text-background font-semibold'
                  : 'bg-surface border border-surface-border text-content-muted hover:text-content'
              }`}
            >
              All ({projectsData.length})
            </button>
            {allTechTags.map((tech) => (
              <button
                key={tech}
                onClick={() => setSelectedTech(tech === selectedTech ? null : tech)}
                className={`px-2.5 py-1 rounded-md text-xs font-mono transition-colors ${
                  selectedTech === tech
                    ? 'bg-primary text-background font-semibold'
                    : 'bg-surface border border-surface-border text-content-muted hover:text-content'
                }`}
              >
                {tech}
              </button>
            ))}
          </div>

          {/* Projects List */}
          <div className="flex flex-col gap-8">
            {filteredProjects.map((project) => (
              <article
                key={project.id}
                className="p-6 rounded-xl bg-surface border border-surface-border flex flex-col gap-5 hover:border-surface-border/80 transition-all shadow-sm"
              >
                {/* Header info */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-primary uppercase tracking-wider font-semibold">
                        {project.category}
                      </span>
                      <span className="text-content-faint text-xs">•</span>
                      <span className="text-xs font-mono text-content-muted">{project.date}</span>
                      {project.featured && (
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">
                          Featured
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl font-bold text-content tracking-tight">
                      {project.title}
                    </h3>
                  </div>

                  {project.proofType !== 'none' && (
                    <button
                      onClick={() => setActiveProjectId(project.slug)}
                      className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-surface-subtle border border-surface-border text-xs font-mono text-primary w-fit hover:border-primary/50 transition-colors"
                    >
                      <PlayCircle className="w-3.5 h-3.5" />
                      <span>Interactive Proof</span>
                    </button>
                  )}
                </div>

                <p className="text-sm text-content-muted leading-relaxed">
                  {project.summary}
                </p>

                {/* Editorial Breakdown: Problem, Contribution, Architecture */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
                  <div className="p-3.5 rounded-lg bg-surface-subtle/50 border border-surface-border flex flex-col gap-1.5">
                    <span className="text-xs font-mono font-semibold text-content uppercase tracking-wider">
                      The Challenge
                    </span>
                    <p className="text-xs text-content-muted leading-relaxed">
                      {project.problem}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-lg bg-surface-subtle/50 border border-surface-border flex flex-col gap-1.5">
                    <span className="text-xs font-mono font-semibold text-primary uppercase tracking-wider">
                      What I Built
                    </span>
                    <p className="text-xs text-content-muted leading-relaxed">
                      {project.contribution}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-lg bg-surface-subtle/50 border border-surface-border flex flex-col gap-1.5">
                    <span className="text-xs font-mono font-semibold text-content uppercase tracking-wider">
                      Architecture
                    </span>
                    <p className="text-xs text-content-muted leading-relaxed font-mono">
                      {project.architecture}
                    </p>
                  </div>
                </div>

                {/* Quantitative Impact Row */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1">
                  {project.metrics.map((m, idx) => {
                    const isPending = m.value.startsWith('TODO_RAHUL:');
                    const cleanValue = isPending ? m.value.replace('TODO_RAHUL:', '').trim() || 'Pending Baseline' : m.value;

                    return (
                      <div
                        key={idx}
                        className="p-3 rounded-lg bg-surface-subtle border border-surface-border flex flex-col gap-0.5"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] text-content-muted">{m.label}</span>
                          {!m.verified && (
                            <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-signal-orange/10 text-signal-orange border border-signal-orange/20">
                              Calibrating
                            </span>
                          )}
                        </div>
                        <span className={`text-base font-mono font-bold ${
                          m.verified ? 'text-primary' : 'text-signal-orange'
                        }`}>
                          {cleanValue}
                        </span>
                        {m.detail && (
                          <span className="text-[10px] text-content-faint leading-tight">
                            {m.detail}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Footer: Tech stack & Links */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-3 border-t border-surface-border">
                  <div className="flex flex-wrap items-center gap-1.5">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded bg-surface-subtle border border-surface-border text-xs font-mono text-content-muted"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-3 font-mono text-xs">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1 text-content-muted hover:text-primary transition-colors"
                      >
                        <GithubIcon className="w-3.5 h-3.5" />
                        <span>Source</span>
                      </a>
                    )}
                    {project.proofType !== 'none' && (
                      <button
                        onClick={() => setActiveProjectId(project.slug)}
                        className="flex items-center gap-1 text-primary hover:underline font-semibold"
                      >
                        <span>Interactive Proof</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* 4. Education & Academic Research */}
        <section id="education" className="flex flex-col gap-6">
          <div className="flex items-center justify-between border-b border-surface-border pb-3">
            <div className="flex items-center gap-2.5">
              <GraduationCap className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold tracking-tight text-content">
                Education & Research
              </h2>
            </div>
            <span className="text-xs font-mono text-content-muted">03 / Foundation</span>
          </div>

          <div className="flex flex-col gap-6">
            {educationData.map((edu, idx) => (
              <div
                key={idx}
                className="p-6 rounded-xl bg-surface border border-surface-border flex flex-col gap-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="text-lg font-bold text-content">
                      {edu.degree} in {edu.field}
                    </h3>
                    <p className="text-sm font-medium text-content-muted">
                      {edu.institution} • {edu.location}
                    </p>
                  </div>
                  <span className="text-xs font-mono text-content-muted sm:text-right">
                    {edu.period}
                  </span>
                </div>

                <div className="flex flex-col gap-2 pt-1">
                  {edu.highlights.map((item, hIdx) => (
                    <div key={hIdx} className="flex items-start gap-2 text-xs sm:text-sm text-content/90">
                      <span className="text-primary font-mono text-xs mt-0.5">▸</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-surface-border">
                  <span className="text-xs font-mono text-content-muted mr-1">Key Courses:</span>
                  {edu.courses.map((course) => (
                    <span
                      key={course}
                      className="px-2 py-0.5 rounded bg-surface-subtle border border-surface-border text-xs font-mono text-content-muted"
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Comprehensive Skills Matrix */}
        <section id="skills" className="flex flex-col gap-6">
          <div className="flex items-center justify-between border-b border-surface-border pb-3">
            <div className="flex items-center gap-2.5">
              <Cpu className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold tracking-tight text-content">
                Technical Stack & Tooling
              </h2>
            </div>
            <span className="text-xs font-mono text-content-muted">04 / Capabilities</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {skillCategories.map((cat) => (
              <div
                key={cat.category}
                className="p-5 rounded-xl bg-surface border border-surface-border flex flex-col gap-3"
              >
                <div>
                  <h3 className="text-sm font-bold text-content font-mono flex items-center justify-between">
                    <span>{cat.category}</span>
                  </h3>
                  <p className="text-xs text-content-muted mt-1">
                    {cat.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 pt-2 border-t border-surface-border">
                  {cat.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-surface-subtle border border-surface-border text-xs font-mono"
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        skill.level === 'core' 
                          ? 'bg-primary' 
                          : skill.level === 'proficient'
                          ? 'bg-content-muted'
                          : 'bg-content-faint'
                      }`} />
                      <span className="text-content font-medium">{skill.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 6. Recruiter Direct Action Footer Box */}
        <section className="p-8 rounded-2xl bg-gradient-to-br from-surface to-surface-subtle border border-primary/30 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-lg">
          <div className="flex flex-col gap-2 text-center sm:text-left">
            <h3 className="text-xl font-bold text-content">
              Interested in speaking with Rahul?
            </h3>
            <p className="text-sm text-content-muted max-w-md">
              Looking for Summer 2025/2026 AI/ML Engineering and Data Systems internships. Quickest response via email or LinkedIn.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={`mailto:${profileData.email}`}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-background font-semibold text-sm hover:bg-primary-hover transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span>Send Email</span>
            </a>
            <a
              href={profileData.linkedin}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-surface border border-surface-border text-content text-sm font-medium hover:border-surface-border/80 transition-colors"
            >
              <LinkedinIcon className="w-4 h-4 text-content-muted" />
              <span>LinkedIn</span>
            </a>
          </div>
        </section>

      </div>
    </div>
  );
};
