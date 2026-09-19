import React, { useEffect } from 'react';
import { usePortfolioStore } from './store/portfolioStore';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { RecruiterView } from './views/RecruiterView';
import { GraphPreview } from './views/GraphPreview';
import { TerminalModal } from './components/TerminalModal';

export const App: React.FC = () => {
  const { viewMode, setViewMode } = usePortfolioStore();

  // Sync hash on mount and popstate
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash.includes('graph')) {
        setViewMode('graph');
      } else {
        setViewMode('recruiter');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [setViewMode]);

  return (
    <div className="min-h-screen bg-background text-content flex flex-col selection:bg-primary selection:text-background">
      <Header />
      <main className="flex-1">
        {viewMode === 'recruiter' ? <RecruiterView /> : <GraphPreview />}
      </main>
      <Footer />
      <TerminalModal />
    </div>
  );
};

export default App;
