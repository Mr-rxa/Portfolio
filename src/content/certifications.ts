import { Certification } from './types';

export const certificationsData: Certification[] = [
  {
    id: "git-github-iitb",
    title: "Git and GitHub",
    issuer: "Spoken Tutorial, IIT Bombay",
    year: "2025",
    credentialUrl: "https://spoken-tutorial.org",
    skillsLearned: ["Version Control", "Git CLI", "Branching & Merging", "Collaborative Workflows"],
    featured: true
  },
  {
    id: "c-programming-iitb",
    title: "C Programming",
    issuer: "Spoken Tutorial, IIT Bombay",
    year: "2024",
    credentialUrl: "https://spoken-tutorial.org",
    skillsLearned: ["Memory Allocation", "Pointers", "Data Structures", "System Programming"],
    featured: true
  },
  {
    id: "cpp-sololearn",
    title: "C++ Programming",
    issuer: "Sololearn",
    year: "2025",
    credentialUrl: "https://www.sololearn.com",
    skillsLearned: ["OOP Concepts", "STL Containers", "Templates", "Algorithm Efficiency"],
    featured: true
  },
  {
    id: "ai-prompt-engineering",
    title: "Generative AI & Prompt Engineering",
    issuer: "My Job Grow in AI",
    year: "2025",
    credentialUrl: "https://linkedin.com/in/rahul-825894237",
    skillsLearned: ["RAG Architecture", "LangChain", "Agno Agents", "n8n Workflow Automation"],
    featured: true
  }
];
