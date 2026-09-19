import { Experience } from './types';

export const experienceData: Experience[] = [
  {
    id: "revolt-motors",
    role: "Business Intelligence using AI Analytics Intern",
    company: "Revolt Motors",
    location: "Gurugram / Manesar, Haryana, India",
    period: "July 2026 – August 2026",
    type: "Internship",
    summary: "Analyzed service and operational data to support business reporting, customer complaint monitoring, and retail performance analysis across dealership networks.",
    bulletPoints: [
      {
        text: "Analyzed service and operational data to support business reporting, complaint monitoring, and retail performance analysis.",
        verified: true
      },
      {
        text: "Developed an interactive Open Complaint Dashboard with KPIs and filters for complaint status, aging, source, zone, ASM, dealer, month-wise trends, and complaint attributes.",
        metrics: "Multi-parameter filter engine",
        verified: true
      },
      {
        text: "Worked on EOD Report Management and Analysis, structuring daily operational reports and extracting trends and exceptions for executive business review.",
        metrics: "Automated daily workflow",
        verified: true
      },
      {
        text: "Contributed to the AI Retail War Room, using analytics and AI-assisted analysis to organize retail data and support operational performance monitoring.",
        metrics: "Real-time decision support",
        verified: true
      }
    ],
    techStack: ["Python", "Flask", "SQL", "Pandas", "Prophet", "Google Gemini API", "Business Intelligence", "EOD Automation"],
    tags: ["Business Intelligence", "Open Complaint Dashboard", "EOD Management", "AI Retail War Room"]
  },
  {
    id: "my-job-grow-ai",
    role: "AI Intern",
    company: "My Job Grow in AI",
    location: "Remote",
    period: "2025",
    type: "Internship",
    summary: "Constructed production LLM workflows, autonomous agent systems, and enterprise automation pipelines integrating external business APIs.",
    bulletPoints: [
      {
        text: "Built LLM-based workflows using LangChain and Agno, working with prompt pipelines, tool-based workflows, and AI-driven automation.",
        metrics: "LangChain + Agno agents",
        verified: true
      },
      {
        text: "Developed n8n workflows integrating LLMs and external APIs to automate repetitive enterprise business processes.",
        metrics: "End-to-end API orchestration",
        verified: true
      },
      {
        text: "Worked with prompt engineering, RAG concepts, API integration, and agent-based workflows while developing practical AI applications.",
        metrics: "RAG & tool-calling pipelines",
        verified: true
      }
    ],
    techStack: ["LangChain", "Agno", "n8n", "Python", "RAG", "Prompt Engineering", "Gemini API", "REST APIs"],
    tags: ["Agentic AI", "LangChain", "Agno", "n8n Workflows", "RAG", "Prompt Engineering"]
  }
];
