import { Experience } from './types';

export const experienceData: Experience[] = [
  {
    id: "revolt-motors",
    role: "Data & AI Engineering Intern",
    company: "Revolt Motors",
    location: "Gurugram / Manesar, India",
    period: "2024", // TODO_RAHUL: Specify exact months (e.g. June 2024 - Aug 2024)
    type: "Internship",
    summary: "Worked with the core EV operations and analytics division to transform raw telematics, dealer reports, and customer service records into actionable decision intelligence.",
    bulletPoints: [
      {
        text: "Engineered automated EOD reporting pipelines that eliminated repetitive manual spreadsheet compilation, reducing end-of-day operational report latency by over 80%.",
        metrics: "80%+ time reduction",
        verified: true
      },
      {
        text: "Architected prototype 'AI Retail War Room' command dashboard ingesting multi-city dealership transaction streams and flagging inventory allocation mismatches.",
        metrics: "Multi-city coverage",
        verified: true
      },
      {
        text: "Implemented NLP topic modeling and sentiment clustering on customer service feedback tickets to surface root-cause hardware and battery complaints for the engineering team.",
        metrics: "TODO_RAHUL: Ticket volume (e.g. 15k+ tickets)",
        verified: false
      },
      {
        text: "Built reusable SQL queries, data validation scripts, and automated metric dashboards used by operations leads for weekly review meetings.",
        verified: true
      }
    ],
    techStack: ["Python", "SQL", "Flask", "Pandas", "NLP / Spacy", "Streamlit", "Excel / Sheets Automation"],
    tags: ["EV Telematics", "Operations Intelligence", "EOD Automation", "NLP Complaints"]
  }
];
