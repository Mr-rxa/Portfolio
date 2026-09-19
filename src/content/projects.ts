import { Project } from './types';

export const projectsData: Project[] = [
  {
    id: "ai-retail-war-room",
    slug: "ai-retail-war-room",
    title: "AI-Retail-War-Room",
    category: "Operations / BI",
    summary: "Business Intelligence and decision intelligence platform combining descriptive retail analytics, Facebook Prophet time-series forecasting, and Google Gemini GenAI executive reporting.",
    problem: "Dealership managers and executive leadership across regional networks lacked real-time visibility into retail health, resulting in multi-day reporting lag that hid inventory bottlenecks, open customer complaints, and localized demand shifts.",
    contribution: "Engineered an end-to-end decision intelligence platform integrating multi-tier KPI calculation, automated Prophet 30-day demand forecasting, customer health scoring, and Generative AI executive briefings.",
    architecture: "PostgreSQL / SQLite -> Python (Pandas/NumPy) -> Facebook Prophet -> Google Gemini GenAI -> Flask Web API -> Vercel Serverless UI",
    impact: "Accelerated executive reporting turnaround to real-time, providing automated forecasting and customer churn risk classification.",
    steps: [
      {
        step: 0,
        phase: "Data Schema & Storage",
        title: "Relational Schema Architecture",
        detail: "Constructed relational database schema in PostgreSQL/SQLite modeling customer profiles, orders, transactions, products, and regional revenue metrics."
      },
      {
        step: 1,
        phase: "Descriptive Analytics",
        title: "Executive KPI Calculation Engine",
        detail: "Engineered aggregation pipeline computing Average Order Value (AOV), monthly revenue velocity, payment method distribution, and state-wise performance."
      },
      {
        step: 2,
        phase: "Predictive Analytics",
        title: "Prophet Time-Series Forecasting",
        detail: "Integrated Facebook Prophet models to compute 30-day forward demand projections with upper and lower statistical confidence bands."
      },
      {
        step: 3,
        phase: "Customer Intelligence",
        title: "Health Scoring & Churn Risk Detection",
        detail: "Built customer intelligence module quantifying repeat vs new customer purchase ratios, health scores, and early churn warning flags."
      },
      {
        step: 4,
        phase: "GenAI Executive Reporting",
        title: "Google Gemini Briefing Layer",
        detail: "Connected Google Gemini AI API to transform raw data outliers into actionable natural-language executive briefs and decision logs."
      },
      {
        step: 5,
        phase: "Production Deployment",
        title: "Vercel Serverless Platform",
        detail: "Restructured backend endpoints into serverless-compatible Flask routes with vercel.json configurations, successfully deploying live to production."
      }
    ],
    metrics: [
      { label: "Forecast Window", value: "30 Days", detail: "Prophet rolling forecast horizon", verified: true },
      { label: "Reporting Speed", value: "Real-time", detail: "Near-instantaneous aggregation", verified: true },
      { label: "Intelligence Stack", value: "Gemini + Prophet", detail: "GenAI briefs + time-series analytics", verified: true }
    ],
    techStack: ["Python", "Flask", "PostgreSQL", "Prophet", "Google Gemini API", "Pandas", "Vercel"],
    proofType: "retail-war-room",
    featured: true,
    githubUrl: "https://github.com/Mr-rxa/AI-Retail-War-Room",
    liveUrl: "https://ai-retail-war-room.vercel.app",
    date: "2026"
  },
  {
    id: "lifeline-ai",
    slug: "lifeline-ai",
    title: "Lifeline-AI",
    category: "AI / ML",
    summary: "Real-time emergency medical response platform coordinating live ambulance GPS tracking, nearest-hospital allocation, proximity alerts, and synchronized multi-dashboard siren alerts.",
    problem: "Standard navigation platforms optimize purely for civilian traffic flow, ignoring emergency vehicle right-of-way, live triage capacity, and dynamic hospital bed saturation during critical transit.",
    contribution: "Built and deployed an emergency response platform for ambulance tracking, hospital routing, proximity alerts, and real-time dashboard monitoring with shared state management and server-sent events.",
    architecture: "Geospatial Telemetry (CSV/GPS) -> tracker_server.py -> Routing & Allocation API -> Web Audio Siren -> Vercel Serverless Platform",
    impact: "Provides distance-based ambulance-to-hospital routing calculations and real-time telemetry flows to minimize emergency response latency.",
    steps: [
      {
        step: 0,
        phase: "Problem Formulation",
        title: "Geospatial Dataset Structuring",
        detail: "Curated and structured hospital facilities dataset (hospitals.csv) and emergency transit GPS coordinates (ambulance_routes.csv, live_positions.csv)."
      },
      {
        step: 1,
        phase: "Telemetry Core",
        title: "Live Tracking Engine",
        detail: "Developed tracker_server.py and dashboard_registry.py to ingest, synchronize, and broadcast vehicle telemetry across active sessions."
      },
      {
        step: 2,
        phase: "Routing & Allocation",
        title: "Nearest-Facility Dispatch Algorithm",
        detail: "Implemented distance-based emergency routing algorithms calculating real-time impedance factors and routing to the nearest trauma center."
      },
      {
        step: 3,
        phase: "Interface Design",
        title: "Dual-Dashboard System",
        detail: "Engineered responsive dark UI catering to two distinct interfaces: Paramedic mobile telemetry unit and Central Dispatch Operations command."
      },
      {
        step: 4,
        phase: "Event Triggers",
        title: "Siren Audio & Status Synchronization",
        detail: "Integrated Web Audio API siren alerts and synchronized shared route management for critical transit notifications."
      },
      {
        step: 5,
        phase: "Serverless Deployment",
        title: "Vercel Edge Integration",
        detail: "Packaged endpoints as lightweight Vercel serverless functions (/api/ambulance, /api/health), deploying the live application."
      }
    ],
    metrics: [
      { label: "Reroute Latency", value: "< 250ms", detail: "Dynamic facility recalculation", verified: true },
      { label: "Dispatch Architecture", value: "Dual Dashboard", detail: "Paramedic + Central Operations", verified: true },
      { label: "Deployment", value: "Vercel Serverless", detail: "Zero-maintenance edge endpoints", verified: true }
    ],
    techStack: ["Python", "Flask", "JavaScript", "Leaflet", "REST APIs", "Web Audio API", "Vercel"],
    proofType: "lifeline-ai",
    featured: true,
    githubUrl: "https://github.com/Mr-rxa/Lifeline-AI",
    liveUrl: "https://lifeline-ai-ten.vercel.app",
    date: "2025 — 2026"
  },
  {
    id: "gmail-ai-workflow",
    slug: "gmail-ai-workflow",
    title: "AI-Powered Gmail Classification and Automation",
    category: "AI / ML",
    summary: "Event-driven email automation pipeline leveraging Google Gemini and LangChain to classify incoming emails, auto-summarize work correspondence, and trigger Telegram alerts.",
    problem: "High email volumes create severe cognitive overhead; important client and work correspondence gets buried beneath automated promotional digests and social alerts.",
    contribution: "Constructed an event-driven automation pipeline integrating Gmail, Google Gemini, LangChain, Google Sheets, and Telegram through n8n workflow nodes.",
    architecture: "Gmail Webhook -> n8n Workflow -> LangChain + Google Gemini -> Classification Engine -> Google Sheets + Telegram Bot",
    impact: "Automated real-time email labeling, work-email summarization, promotional handling, and AI-assisted personal-email draft responses.",
    steps: [
      {
        step: 0,
        phase: "Pipeline Architecture",
        title: "Event-Driven Ingestion Setup",
        detail: "Configured Gmail API triggers and n8n webhook listeners to capture incoming messages in real-time."
      },
      {
        step: 1,
        phase: "LLM Classification",
        title: "Gemini & LangChain Categorization",
        detail: "Formulated prompt pipelines classifying incoming emails into work, promotions, social, and personal buckets."
      },
      {
        step: 2,
        phase: "Automated Actions",
        title: "Labeling & Summarization Routing",
        detail: "Automated work-email summarization, promotional archiving, and draft response generation."
      },
      {
        step: 3,
        phase: "Data Sink & Alerts",
        title: "Google Sheets & Telegram Integration",
        detail: "Appended structured metadata to Google Sheets for auditing and dispatched high-priority Telegram alerts."
      },
      {
        step: 4,
        phase: "Hardening",
        title: "End-to-End Orchestration",
        detail: "Integrated credentials, error handlers, and fallback branches to ensure continuous 24/7 inbox processing."
      }
    ],
    metrics: [
      { label: "Classification Engine", value: "Gemini + LangChain", detail: "Zero-shot category tagging", verified: true },
      { label: "Automation Core", value: "n8n Workflows", detail: "Multi-service webhook orchestration", verified: true },
      { label: "Notifications", value: "Telegram Alerts", detail: "Real-time critical email dispatch", verified: true }
    ],
    techStack: ["n8n", "Google Gemini", "LangChain", "Gmail API", "Google Sheets", "Telegram API", "Python"],
    proofType: "none",
    featured: true,
    githubUrl: "https://github.com/Mr-rxa/gmail-ai-workflow",
    date: "2025"
  },
  {
    id: "cattle-breed-recognition",
    slug: "cattle-breed-recognition",
    title: "Cattle Breed Recognition System (SIH '25)",
    category: "AI / ML",
    summary: "Fine-grained computer vision system for indigenous cattle breed classification with an 'Unknown' rejection class, representing PIET at Smart India Hackathon 2025.",
    problem: "Accurate breed identification is critical for agricultural digital census and livestock breeding, but morphological variance between indigenous cattle breeds is visually subtle.",
    contribution: "Developed an edge-ready computer vision system with MobileNetV2 transfer learning, image augmentation, an 'Unknown' non-cattle rejection class, and per-class evaluation pipelines.",
    architecture: "Leaflet/Image Preprocessing -> Data Augmentation -> MobileNetV2 Transfer Learning -> Evaluation Pipeline -> Inference API",
    impact: "Selected as PIET institutional representative solution at Smart India Hackathon (SIH) 2025.",
    steps: [
      {
        step: 0,
        phase: "Dataset Curation",
        title: "Morphological Image Collection",
        detail: "Gathered indigenous cattle breed imagery across diverse farm lighting, orientations, and coat patterns."
      },
      {
        step: 1,
        phase: "Data Augmentation",
        title: "OpenCV Preprocessing Pipelines",
        detail: "Engineered robust augmentation (rotation, zoom, color jitter) and created an explicit 'Unknown' class for non-cattle images."
      },
      {
        step: 2,
        phase: "Model Training",
        title: "MobileNetV2 Transfer Learning",
        detail: "Fine-tuned deep convolutional networks using MobileNetV2 backbones for lightweight edge inference."
      },
      {
        step: 3,
        phase: "Evaluation",
        title: "Per-Class Validation Reporting",
        detail: "Structured modular evaluation scripts tracking precision, recall, and confusion matrices across breeds."
      },
      {
        step: 4,
        phase: "Hackathon Presentation",
        title: "SIH 2025 Institutional Showcase",
        detail: "Represented Panipat Institute of Engineering and Technology (PIET) as institutional representative at Smart India Hackathon."
      }
    ],
    metrics: [
      { label: "Hackathon Status", value: "SIH '25 Finalist", detail: "PIET institutional representative", verified: true },
      { label: "Architecture", value: "MobileNetV2", detail: "Edge-optimized transfer learning", verified: true },
      { label: "Robustness", value: "Unknown Rejection", detail: "Guards against out-of-distribution inputs", verified: true }
    ],
    techStack: ["Python", "TensorFlow", "MobileNetV2", "OpenCV", "CNN", "Transfer Learning"],
    proofType: "none",
    featured: false,
    githubUrl: "https://github.com/Mr-rxa/cattle-breed-recognition",
    date: "2025"
  },
  {
    id: "signal-pipeline-mlops",
    slug: "signal-pipeline-mlops",
    title: "signal-pipeline-mlops",
    category: "MLOps & Systems",
    summary: "Production-style batch MLOps pipeline computing rolling statistical trading signals from OHLCV market data with strict YAML schema validation and Docker deployment.",
    problem: "Financial trading and analytics pipelines frequently fail in production due to configuration drift, non-deterministic rolling window edge conditions, and missing telemetry logs.",
    contribution: "Architected a reproducible, observable batch pipeline with YAML config validation, rolling mean signal derivation, structured JSON output telemetry, and single-stage Docker containerization.",
    architecture: "config.yaml -> run.py CLI -> Pandas (OHLCV Processing) -> Signal Derivation -> metrics.json + run.log -> Docker Container",
    impact: "Guarantees 100% deterministic batch execution across 10,000+ row market feeds with complete execution auditability.",
    steps: [
      {
        step: 0,
        phase: "Architecture Design",
        title: "Deterministic MLOps Specifications",
        detail: "Defined core architectural contract: reproducible batch execution, schema validation, structured telemetry, and zero unhandled edge conditions."
      },
      {
        step: 1,
        phase: "Configuration",
        title: "YAML Config Schema Validation",
        detail: "Implemented strict config parser (config.yaml) validating random seeds, rolling window integers, and contract pipeline versioning."
      },
      {
        step: 2,
        phase: "Data Ingestion",
        title: "OHLCV Parsing & NaN Edge Handling",
        detail: "Ingested 10,000-row market dataset with schema validation; excluded the first window-1 NaN rows from calculation to ensure determinism."
      },
      {
        step: 3,
        phase: "Signal Engine",
        title: "Rolling Mean Signal Derivation",
        detail: "Computed dynamic rolling mean on closing prices and generated binary execution signals (signal = 1 where close > rolling_mean, else 0)."
      },
      {
        step: 4,
        phase: "Observability",
        title: "Structured Metrics & Rotating Logging",
        detail: "Generated machine-readable metrics.json capturing execution stats and time-stamped run.log trails for production monitoring."
      },
      {
        step: 5,
        phase: "Containerization",
        title: "Single-Stage Docker Image Packaging",
        detail: "Constructed minimal Python Dockerfile allowing single-command headless CLI execution in batch cluster environments."
      }
    ],
    metrics: [
      { label: "Batch Scale", value: "10,000 Rows", detail: "Tested OHLCV market dataset", verified: true },
      { label: "Determinism", value: "100%", detail: "Zero NaN drift on rolling edges", verified: true },
      { label: "Containerization", value: "Docker Ready", detail: "Single-stage reproducible build", verified: true }
    ],
    techStack: ["Python", "Pandas", "NumPy", "PyYAML", "Docker", "MLOps", "CLI"],
    proofType: "signal-pipeline",
    featured: true,
    githubUrl: "https://github.com/Mr-rxa/signal-pipeline-mlops",
    date: "2026"
  },
  {
    id: "trading-bot-binance",
    slug: "trading-bot-binance",
    title: "trading_bot_binance",
    category: "FinTech & Trading",
    summary: "Production-ready algorithmic trading execution client for Binance USDT-M Futures Testnet with cryptographic HMAC-SHA256 request signing and defensive input validation.",
    problem: "Automated futures trading demands zero-tolerance execution reliability; network glitches, invalid order payloads, and unsigned API requests can lead to immediate liquidation or API bans.",
    contribution: "Built a modular Python trading bot with low-level REST signing, strict order payload validators, strongly-typed OrderResult models, and rotating runtime logging.",
    architecture: "CLI (argparse) -> validators.py -> orders.py (OrderResult) -> client.py (HMAC-SHA256) -> Binance Futures Testnet REST API",
    impact: "Enables programmatic order execution with comprehensive error classification (BinanceAPIError vs BinanceNetworkError) and full audit logs.",
    steps: [
      {
        step: 0,
        phase: "API Client",
        title: "Cryptographic HMAC-SHA256 Signing",
        detail: "Built client.py implementing low-level HTTP requests, millisecond payload timestamping, and HMAC-SHA256 cryptographic signatures."
      },
      {
        step: 1,
        phase: "Input Validation",
        title: "Strict Order Parameter Verification",
        detail: "Developed validators.py ensuring symbol validity, order types (LIMIT/MARKET), trade sides (BUY/SELL), and tick quantity bounds."
      },
      {
        step: 2,
        phase: "Order Management",
        title: "Order Placement & Normalization",
        detail: "Constructed orders.py converting raw Binance exchange JSON into normalized, strongly-typed OrderResult summary objects."
      },
      {
        step: 3,
        phase: "Logging Architecture",
        title: "Dual-Target Rotating Log System",
        detail: "Configured logging_config.py outputting timestamped audit events to rotating trading_bot.log files and developer console."
      },
      {
        step: 4,
        phase: "CLI Interface",
        title: "Command-Line Execution Tooling",
        detail: "Engineered CLI entry-point (cli.py) with argparse flags, enabling automated and manual order testing on the USDT-M Testnet."
      }
    ],
    metrics: [
      { label: "Target Exchange", value: "Binance Futures", detail: "USDT-M Perpetual Testnet", verified: true },
      { label: "Auth Protocol", value: "HMAC-SHA256", detail: "Cryptographic request signing", verified: true },
      { label: "Order Validation", value: "Strict Pre-flight", detail: "Guards against precision errors", verified: true }
    ],
    techStack: ["Python", "Binance Futures API", "REST", "Cryptography", "Argparse", "Logging"],
    proofType: "none",
    featured: false,
    githubUrl: "https://github.com/Mr-rxa/trading_bot_binance",
    date: "2026"
  }
];
