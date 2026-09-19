import React, { useEffect, useState } from 'react';
import { usePortfolioStore } from './store/portfolioStore';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { RecruiterView } from './views/RecruiterView';
import { GraphView } from './views/GraphView';
import { TerminalModal } from './components/TerminalModal';
import { CaseStudyModal } from './components/CaseStudyModal';
import { BootSequence } from './components/BootSequence';
import { CustomCursor } from './components/CustomCursor';

export const App: React.FC = () => {
  const { viewMode, setViewMode, setActiveProjectId } = usePortfolioStore();
  const [booted, setBooted] = useState<boolean>(false);

  // Sync hash on mount and popstate
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#/project/')) {
        const slug = hash.replace('#/project/', '').trim();
        setActiveProjectId(slug);
      } else if (hash.includes('graph')) {
        setViewMode('graph');
      } else {
        setViewMode('recruiter');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [setViewMode, setActiveProjectId]);

  return (
    <div className="min-h-screen bg-background text-content flex flex-col selection:bg-primary selection:text-background relative">
      {/* Skip to main content — visible on focus for keyboard users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-primary focus:text-background focus:font-mono focus:text-xs focus:font-bold"
      >
        Skip to main content
      </a>
      {!booted && <BootSequence onComplete={() => setBooted(true)} />}
      <CustomCursor />
      <Header />
      <main id="main-content" className="flex-1">
        {viewMode === 'recruiter' ? <RecruiterView /> : <GraphView />}
      </main>
      <Footer />
      <TerminalModal />
      <CaseStudyModal />
    </div>
  );
};

export default App;
