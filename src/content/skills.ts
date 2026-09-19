import { SkillCategory } from './types';

export const skillCategories: SkillCategory[] = [
  {
    category: "Programming Languages",
    description: "Core languages for backend systems, machine learning models, and algorithm design.",
    skills: [
      { name: "Python", level: "core", usedIn: ["ai-retail-war-room", "lifeline-ai", "signal-pipeline-mlops", "trading-bot-binance", "revolt-motors", "my-job-grow-ai"] },
      { name: "C++", level: "proficient", usedIn: ["education"] },
      { name: "SQL", level: "core", usedIn: ["ai-retail-war-room", "revolt-motors"] },
      { name: "Java", level: "familiar", usedIn: ["education"] },
      { name: "C", level: "proficient", usedIn: ["education"] }
    ]
  },
  {
    category: "Backend Development",
    description: "Production web frameworks, RESTful API design, webhook integrations, and serverless edge functions.",
    skills: [
      { name: "Flask", level: "core", usedIn: ["ai-retail-war-room", "lifeline-ai", "revolt-motors"] },
      { name: "REST APIs", level: "core", usedIn: ["lifeline-ai", "trading-bot-binance", "revolt-motors"] },
      { name: "Webhooks", level: "proficient", usedIn: ["gmail-ai-workflow", "my-job-grow-ai"] },
      { name: "Node.js", level: "familiar", usedIn: ["portfolio"] },
      { name: "HTTP & JSON APIs", level: "core", usedIn: ["all"] }
    ]
  },
  {
    category: "Artificial Intelligence & ML",
    description: "Deep learning architectures, LLM orchestration, agentic workflows, and predictive analytics.",
    skills: [
      { name: "LangChain & Agno", level: "core", usedIn: ["my-job-grow-ai", "gmail-ai-workflow"] },
      { name: "Prompt Engineering & RAG", level: "core", usedIn: ["my-job-grow-ai", "ai-retail-war-room"] },
      { name: "TensorFlow & CNN", level: "core", usedIn: ["cattle-breed-recognition", "education"] },
      { name: "Transfer Learning (MobileNetV2)", level: "core", usedIn: ["cattle-breed-recognition"] },
      { name: "Scikit-Learn", level: "core", usedIn: ["ai-retail-war-room"] },
      { name: "Facebook Prophet", level: "core", usedIn: ["ai-retail-war-room", "revolt-motors"] }
    ]
  },
  {
    category: "Data Analysis & Computer Vision",
    description: "Statistical data processing, exploratory data analysis (EDA), and image pipeline preprocessing.",
    skills: [
      { name: "Pandas & NumPy", level: "core", usedIn: ["ai-retail-war-room", "lifeline-ai", "signal-pipeline-mlops", "revolt-motors"] },
      { name: "OpenCV", level: "core", usedIn: ["cattle-breed-recognition"] },
      { name: "EDA & Data Visualization", level: "core", usedIn: ["revolt-motors", "ai-retail-war-room"] },
      { name: "Matplotlib & Seaborn", level: "proficient", usedIn: ["revolt-motors"] },
      { name: "Image Preprocessing", level: "core", usedIn: ["cattle-breed-recognition"] }
    ]
  },
  {
    category: "Automation & Developer Tools",
    description: "Workflow automation engines, GenAI developer APIs, version control, and containerization.",
    skills: [
      { name: "n8n Workflows", level: "core", usedIn: ["my-job-grow-ai", "gmail-ai-workflow"] },
      { name: "Google Gemini API", level: "core", usedIn: ["ai-retail-war-room", "gmail-ai-workflow"] },
      { name: "Gmail API & Sheets Integration", level: "core", usedIn: ["gmail-ai-workflow"] },
      { name: "Git & GitHub", level: "core", usedIn: ["all"] },
      { name: "Docker", level: "proficient", usedIn: ["signal-pipeline-mlops"] }
    ]
  }
];
