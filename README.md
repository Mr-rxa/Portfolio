# RS / CAUSAL — Rahul Sharma's Portfolio

> A living map of projects, systems & experiments.

[![Built with Vite](https://img.shields.io/badge/built%20with-Vite-646CFF?style=flat&logo=vite)](https://vitejs.dev)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat&logo=react)](https://reactjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?style=flat&logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-06B6D4?style=flat&logo=tailwindcss)](https://tailwindcss.com)

---

## The Concept

This is not a resume. It's a **causal graph** — the operating system of how I think.

Projects, technologies, experience, education, and concepts are **nodes**. Their real relationships are **edges**. The navigation itself demonstrates my way of thinking: click a project node and the graph focuses on it; its edges become the data pipeline story.

The spectacle comes from the information itself — not decoration.

---

## Architecture

```
┌────────────────────────────────────────────────────────────┐
│                    RS / CAUSAL Portfolio                   │
├──────────────────┬─────────────────────────────────────────┤
│  Recruiter View  │              Graph View                  │
│  (linear read)   │  (graph-as-OS)                          │
│                  │                                          │
│  • Hero pitch    │  ┌──────────────────────────────────┐   │
│  • Tech filter   │  │  HeroBatteryTwin                 │   │
│  • 6 project     │  │  Physics-informed EV model       │   │
│    cards         │  │  Interactive sliders + canvas    │   │
│  • Experience    │  └──────────────────────────────────┘   │
│  • Education     │  ┌──────────────────────────────────┐   │
│  • Skills matrix │  │  CausalGraph (d3-force canvas)   │   │
│  • Contact CTA   │  │  Nodes: projects, tech, xp       │   │
│                  │  │  Drag / Pan / Zoom / Tab nav     │   │
│                  │  └──────────────────────────────────┘   │
│                  │  ┌──────────────────────────────────┐   │
│                  │  │  Playable Proofs Index           │   │
│                  │  │  6 interactive simulations       │   │
│                  │  └──────────────────────────────────┘   │
├──────────────────┴─────────────────────────────────────────┤
│  CaseStudyModal  (opens on node click)                     │
│  • Playable Proof tab — live interactive demo              │
│  • Case Study tab — problem / contribution / metrics        │
├────────────────────────────────────────────────────────────┤
│  TerminalModal   (~ key)                                   │
│  • Commands: help / about / projects / stack / graph       │
│  • Easter eggs: sudo make_coffee / matrix / secret         │
├────────────────────────────────────────────────────────────┤
│  BootSequence (once per session via sessionStorage)        │
└────────────────────────────────────────────────────────────┘
```

### State Flow

```
Zustand store (portfolioStore)
  ├── viewMode: 'recruiter' | 'graph'  →  App switches RecruiterView / GraphView
  ├── activeProjectId: string | null   →  CaseStudyModal renders if set
  ├── terminalOpen: boolean            →  TerminalModal renders if true
  └── filterTech: string               →  RecruiterView filters project cards
```

### Content Model

Every project follows a strict typed schema (`src/content/types.ts`):

```ts
{
  id: string;            // causal-ev
  slug: string;          // same as id, used in URL hash
  title: string;
  category: string;
  summary: string;
  problem: string;
  contribution: string;
  architecture: string;
  impact: string;
  metrics: { label, value, detail, verified }[];
  techStack: string[];
  proofType: 'battery-twin' | 'retail-war-room' | 'smart-ambulance'
           | 'rice-disease' | 'olist-cloud' | 'none';
  featured: boolean;
  githubUrl?: string;
  date: string;
}
```

---

## Playable Proofs

Each major project has a live interactive simulation inside its modal:

| Project | Proof Type | What You Can Do |
|---|---|---|
| CausalEV Battery Twin | Causal DAG inspector | Drag edges, run counterfactuals |
| AI Retail War Room | BI Dashboard | Switch hubs, see Prophet forecasts |
| Smart Ambulance Dispatch | City grid simulation | Drop incidents, toggle traffic jams |
| Rice Disease Detection | CNN classifier | Select leaf samples, inspect softmax |
| Olist E-commerce Analytics | Cluster cloud | Toggle cluster/region, delivery slider |

---

## Design System

| Token | Value | Purpose |
|---|---|---|
| `background` | `#0A0B0D` | Page / canvas background |
| `surface` | `#12141A` | Cards, modals |
| `primary` | `#C6FF3D` | Electric lime — signal / highlight |
| `signal-orange` | `#FF5B1F` | Anomaly / alert / unverified metric |
| `content` | `#EDEAE3` | Body text |
| `content-muted` | `#8E95A5` | Secondary text |
| Font | Space Grotesk | Display / body |
| Font mono | JetBrains Mono | Code, data, labels |

Visual identity: **Scientific instrument × editorial design × data visualization**. No purple gradients, no glowing borders.

---

## Development

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # Production build
```

**Build budget:** JS < 250 kB gzipped. Current: **~85 kB**.

---

## Deployment

1. `npm run build` → outputs to `dist/`
2. Deploy `dist/` to Vercel / Netlify / any static host
3. Update `TODO_RAHUL:` placeholders in `src/content/` with real GitHub URLs and verified metrics

### TODO_RAHUL Placeholders

Search for `TODO_RAHUL:` in `src/content/` — these are intentional pending values:
- GitHub repo URLs (add real repo links once repos are public)
- MAPE % and anomaly count metrics (replace with verified numbers from your actual results)

---

## File Structure

```
src/
├── content/          ← Typed TS data (profile, projects, experience, education, skills)
├── store/            ← portfolioStore.ts (Zustand global state)
├── utils/            ← batterySimulation.ts, graphData.ts
├── components/
│   ├── proofs/       ← 5 playable proof components
│   ├── Header, Footer, Icons
│   ├── HeroBatteryTwin, CausalGraph
│   ├── CaseStudyModal, TerminalModal
│   └── BootSequence, CustomCursor
└── views/
    ├── RecruiterView.tsx
    └── GraphView.tsx
```

---

## Accessibility

- **Keyboard navigation**: Tab cycles through graph nodes; Enter opens case study
- **Skip to content**: Visible skip link on first Tab keypress
- **Reduced motion**: All animations disabled / accelerated via `prefers-reduced-motion`
- **ARIA landmarks**: `role="region"` on graph, `role="main"` on content, `aria-label` on all interactive elements
- **Focus ring**: Electric lime (`#C6FF3D`) 2px outline on `:focus-visible`

---

*Built by Rahul Sharma — B.Tech IT, PIET (2024–2028). Interned at Revolt Motors.*
