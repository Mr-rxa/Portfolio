import { create } from 'zustand';

export type ViewMode = 'recruiter' | 'graph';

interface PortfolioState {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  activeProjectId: string | null;
  setActiveProjectId: (id: string | null) => void;
  filterTech: string | null;
  setFilterTech: (tech: string | null) => void;
  terminalOpen: boolean;
  setTerminalOpen: (open: boolean) => void;
  toggleTerminal: () => void;
}

export const usePortfolioStore = create<PortfolioState>((set) => ({
  viewMode: 'recruiter', // Defaults to recruiter view for instant clarity in Phase 1
  setViewMode: (mode) => {
    set({ viewMode: mode });
    if (typeof window !== 'undefined') {
      window.location.hash = mode === 'recruiter' ? '#recruiter' : '#graph';
    }
  },
  activeProjectId: null,
  setActiveProjectId: (id) => set({ activeProjectId: id }),
  filterTech: null,
  setFilterTech: (tech) => set({ filterTech: tech }),
  terminalOpen: false,
  setTerminalOpen: (open) => set({ terminalOpen: open }),
  toggleTerminal: () => set((state) => ({ terminalOpen: !state.terminalOpen })),
}));
