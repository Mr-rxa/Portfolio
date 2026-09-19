import { SkillCategory } from './types';

export const skillCategories: SkillCategory[] = [
  {
    category: "Languages",
    description: "Core programming and querying languages used across production scripts and system prototypes.",
    skills: [
      { name: "Python", level: "core", usedIn: ["retail-war-room", "smart-ambulance", "rice-disease", "olist-analytics", "revolt-motors"] },
      { name: "SQL", level: "core", usedIn: ["retail-war-room", "olist-analytics", "revolt-motors"] },
      { name: "TypeScript / JS", level: "proficient", usedIn: ["smart-ambulance", "portfolio"] },
      { name: "C++", level: "familiar", usedIn: ["education"] }
    ]
  },
  {
    category: "Machine Learning & AI",
    description: "Statistical modeling, causal inference, and deep computer vision frameworks.",
    skills: [
      { name: "PyTorch", level: "core", usedIn: ["rice-disease", "cattle-breed"] },
      { name: "Graph Algorithms / Routing", level: "core", usedIn: ["smart-ambulance"] },
      { name: "Scikit-Learn", level: "core", usedIn: ["olist-analytics", "retail-war-room"] },
      { name: "OpenCV", level: "proficient", usedIn: ["rice-disease", "cattle-breed"] },
      { name: "Prophet", level: "proficient", usedIn: ["retail-war-room"] },
      { name: "NLP / Spacy", level: "proficient", usedIn: ["revolt-motors"] }
    ]
  },
  {
    category: "Data Engineering & BI",
    description: "Data transformation, warehousing, exploratory analysis, and automated reporting.",
    skills: [
      { name: "Pandas & NumPy", level: "core", usedIn: ["retail-war-room", "olist-analytics", "revolt-motors"] },
      { name: "DuckDB / SQLite", level: "proficient", usedIn: ["olist-analytics", "retail-war-room"] },
      { name: "Data Pipeline Automation", level: "core", usedIn: ["revolt-motors", "retail-war-room"] },
      { name: "Exploratory Data Analysis (EDA)", level: "core", usedIn: ["olist-analytics", "revolt-motors"] }
    ]
  },
  {
    category: "Web & Developer Tools",
    description: "Interactive frontends, API microservices, and graph algorithms.",
    skills: [
      { name: "React & Vite", level: "core", usedIn: ["portfolio", "retail-war-room"] },
      { name: "Tailwind CSS", level: "core", usedIn: ["portfolio", "retail-war-room"] },
      { name: "HTML5 Canvas API", level: "proficient", usedIn: ["smart-ambulance", "portfolio"] },
      { name: "Flask & FastAPI", level: "proficient", usedIn: ["retail-war-room", "rice-disease"] },
      { name: "Git & GitHub", level: "core", usedIn: ["all"] }
    ]
  }
];
