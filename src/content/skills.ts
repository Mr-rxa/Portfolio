import { SkillCategory } from './types';

export const skillCategories: SkillCategory[] = [
  {
    category: "Languages",
    description: "Core programming and querying languages used across production scripts and system prototypes.",
    skills: [
      { name: "Python", level: "core", usedIn: ["ai-retail-war-room", "lifeline-ai", "signal-pipeline-mlops", "trading-bot-binance", "farm-to-fork", "uidai", "revolt-motors"] },
      { name: "SQL", level: "core", usedIn: ["ai-retail-war-room", "farm-to-fork", "revolt-motors"] },
      { name: "TypeScript / JS", level: "proficient", usedIn: ["lifeline-ai", "portfolio"] },
      { name: "C++", level: "familiar", usedIn: ["education"] }
    ]
  },
  {
    category: "Machine Learning & AI",
    description: "Time-series forecasting, Generative AI reporting, and algorithmic routing.",
    skills: [
      { name: "Prophet (Time-Series)", level: "core", usedIn: ["ai-retail-war-room"] },
      { name: "Google Gemini GenAI", level: "core", usedIn: ["ai-retail-war-room"] },
      { name: "Geospatial Routing & Dispatch", level: "core", usedIn: ["lifeline-ai"] },
      { name: "MLOps & Signal Pipelines", level: "core", usedIn: ["signal-pipeline-mlops"] },
      { name: "NLP & Spacy", level: "proficient", usedIn: ["revolt-motors"] },
      { name: "Scikit-Learn", level: "proficient", usedIn: ["ai-retail-war-room", "uidai"] }
    ]
  },
  {
    category: "Data Engineering & BI",
    description: "Data transformation, warehousing, exploratory analysis, and automated reporting.",
    skills: [
      { name: "Pandas & NumPy", level: "core", usedIn: ["ai-retail-war-room", "signal-pipeline-mlops", "uidai", "revolt-motors"] },
      { name: "PostgreSQL & SQLite", level: "core", usedIn: ["ai-retail-war-room", "farm-to-fork"] },
      { name: "Large-Scale EDA (1M+ Rows)", level: "core", usedIn: ["uidai", "revolt-motors"] },
      { name: "Docker Containerization", level: "proficient", usedIn: ["signal-pipeline-mlops"] }
    ]
  },
  {
    category: "Web & Developer Tools",
    description: "Production APIs, algorithmic trading execution, and modern responsive frontends.",
    skills: [
      { name: "Flask & FastAPI", level: "core", usedIn: ["ai-retail-war-room", "lifeline-ai", "farm-to-fork"] },
      { name: "Binance Futures API & HMAC", level: "core", usedIn: ["trading-bot-binance"] },
      { name: "React & Vite", level: "core", usedIn: ["portfolio"] },
      { name: "Tailwind CSS", level: "core", usedIn: ["portfolio"] },
      { name: "Git & GitHub", level: "core", usedIn: ["all"] }
    ]
  }
];
