import { Project } from './types';

export const projectsData: Project[] = [
  {
    id: "ai-retail-war-room",
    slug: "ai-retail-war-room",
    title: "AI-Retail-War-Room",
    category: "Operations / BI",
    summary: "Executive Business Intelligence and decision intelligence platform combining descriptive retail analytics, Prophet time-series forecasting, and Google Gemini GenAI reporting.",
    problem: "Retail leadership across multi-region networks lacked unified intelligence, experiencing severe reporting lag that hid inventory bottlenecks, localized churn, and sudden demand spikes until weeks later.",
    contribution: "Engineered an end-to-end decision platform integrating multi-tier KPI calculation, automated Prophet 30-day demand forecasting, customer health scoring, and Generative AI executive reporting briefings.",
    architecture: "PostgreSQL / SQLite -> Python (Pandas/NumPy) -> Facebook Prophet -> Google Gemini GenAI -> Flask Web API -> Vercel Serverless UI",
    impact: "Accelerated executive decision turnaround from 36 hours to real time, providing automated forecasting and customer churn risk classification.",
    steps: [
      {
        step: 0,
        phase: "Data Modeling & Storage",
        title: "Relational Schema Design",
        detail: "Constructed relational database schema in PostgreSQL/SQLite modeling customer profiles, orders, transactions, products, and regional revenue metrics."
      },
      {
        step: 1,
        phase: "Descriptive BI",
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
        phase: "Decision Support",
        title: "Google Gemini Executive Briefing Layer",
        detail: "Connected Google Gemini AI API to transform raw data outliers into actionable natural-language executive briefs and decision logs."
      },
      {
        step: 5,
        phase: "Cloud Deployment",
        title: "Vercel Serverless Production Architecture",
        detail: "Restructured backend endpoints into serverless-compatible Flask routes with vercel.json configurations, successfully deploying to production."
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
    summary: "Real-time emergency medical response platform coordinating live ambulance GPS tracking, nearest-hospital allocation, and synchronized multi-dashboard siren alerts.",
    problem: "Standard navigation platforms optimize purely for civilian traffic flow, ignoring emergency vehicle right-of-way, live triage capacity, and dynamic hospital bed saturation during critical transit.",
    contribution: "Engineered emergency dispatch system featuring geospatial nearest-hospital routing, real-time vehicle GPS tracking, paramedic and central dispatcher dashboards, and critical audio siren triggers.",
    architecture: "Geospatial Telemetry (CSV/GPS) -> tracker_server.py -> Routing & Allocation API -> Web Audio Siren -> Vercel Serverless Platform",
    impact: "Provides dynamic route recalculation and real-time paramedic-to-hospital coordination to minimize emergency transit latency.",
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
        detail: "Implemented emergency dispatch routing algorithm calculating real-time impedance factors and routing to the optimal medical center."
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
    techStack: ["Python", "Flask", "JavaScript", "Geospatial Indexing", "Web Audio API", "Vercel"],
    proofType: "lifeline-ai",
    featured: true,
    githubUrl: "https://github.com/Mr-rxa/Lifeline-AI",
    liveUrl: "https://lifeline-ai-ten.vercel.app",
    date: "2026"
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
  },
  {
    id: "farm-to-fork",
    slug: "farm-to-fork",
    title: "farm_to_fork",
    category: "Operations / BI",
    summary: "Full-stack agricultural marketplace platform connecting regional farmers directly with commercial buyers, built with FastAPI and relational inventory tracking.",
    problem: "Traditional farm-to-table supply chains suffer from multiple intermediary markups and lack transparent produce provenance and inventory tracking.",
    contribution: "Engineered a direct marketplace architecture featuring relational SQL inventory models, FastAPI asynchronous endpoints, and responsive server-rendered front-end templates.",
    architecture: "sql/schema.sql -> FastAPI (Pydantic Routers) -> Jinja2 HTML Templates -> Seed Data Automation -> Local Server",
    impact: "Provides transparent farm batch provenance, price discovery, and inventory tracking without middleman overhead.",
    steps: [
      {
        step: 0,
        phase: "Schema Design",
        title: "Agricultural Relational Modeling",
        detail: "Authored sql/schema.sql defining tables for produce categories, farm origins, inventory batches, pricing, and merchant orders."
      },
      {
        step: 1,
        phase: "Backend Services",
        title: "FastAPI REST API Architecture",
        detail: "Engineered high-throughput asynchronous backend routes with Pydantic validation for produce listings and merchant checkout."
      },
      {
        step: 2,
        phase: "Frontend Interface",
        title: "Jinja2 Server-Rendered Views",
        detail: "Created clean HTML/CSS templates optimized for low-bandwidth mobile connections in rural agricultural markets."
      },
      {
        step: 3,
        phase: "Data Seeding",
        title: "Automated Produce Generation Scripts",
        detail: "Developed seed_data.py and populate_sample_data.py scripts to simulate realistic supply chains with regional produce varieties."
      },
      {
        step: 4,
        phase: "Integration",
        title: "Configuration & Local Testing",
        detail: "Configured environment secret management (.env.example), smoke test suites, and local Uvicorn development server execution."
      }
    ],
    metrics: [
      { label: "Architecture", value: "FastAPI + SQL", detail: "Asynchronous REST backend", verified: true },
      { label: "Data Modeling", value: "Relational Schema", detail: "Batch-level produce provenance", verified: true },
      { label: "Frontend", value: "Jinja2 Templates", detail: "Low-bandwidth optimized UI", verified: true }
    ],
    techStack: ["Python", "FastAPI", "SQL", "SQLite / PostgreSQL", "Jinja2", "Uvicorn"],
    proofType: "none",
    featured: false,
    githubUrl: "https://github.com/Mr-rxa/farm_to_fork",
    date: "2026"
  },
  {
    id: "uidai",
    slug: "uidai",
    title: "UIDAI",
    category: "Data Analytics & Public Policy",
    summary: "Large-scale exploratory data analysis and district-level coverage gap modeling across 1,000,000+ official Indian Aadhaar government enrolment records.",
    problem: "Public welfare delivery often misses marginalized populations when regional administrative centers lack district-level visibility into Aadhaar saturation and enrolment deficits.",
    contribution: "Analyzed over 1M official government transactional records, engineered district coverage gap metrics, and developed an exploratory visualization dashboard for public policy insights.",
    architecture: "UIDAI CSV Chunks (1M+ Records) -> Pandas ETL -> Enrollment_gap.ipynb Analysis -> district_aadhaar_coverage_gap.csv -> app.py Dashboard",
    impact: "Quantified district-level enrolment deficits across Indian states to identify underserved rural and demographic pockets.",
    steps: [
      {
        step: 0,
        phase: "Data Ingestion",
        title: "Massive Multi-Chunk CSV Ingestion",
        detail: "Ingested and merged multiple chunked official UIDAI dataset partitions totaling over 1,000,000 raw transactional enrolment entries."
      },
      {
        step: 1,
        phase: "Data Hygiene",
        title: "Demographic Cleansing & Normalization",
        detail: "Handled district naming variations, missing demographic fields, and temporal distribution anomalies in Pandas."
      },
      {
        step: 2,
        phase: "Exploratory Analytics",
        title: "Jupyter Analytical Workflows",
        detail: "Authored Enrollment_gap.ipynb conducting deep-dive statistical analysis on gender ratios, age distribution, and enrolment rates."
      },
      {
        step: 3,
        phase: "Policy Metric Modeling",
        title: "District Coverage Gap Quantification",
        detail: "Computed and exported district_aadhaar_coverage_gap.csv identifying administrative regions lagging behind national coverage averages."
      },
      {
        step: 4,
        phase: "Visual Application",
        title: "Python Decision Dashboard Interface",
        detail: "Built app.py interface enabling policy researchers to visually filter districts by saturation gap and target welfare interventions."
      }
    ],
    metrics: [
      { label: "Records Analyzed", value: "1,000,000+", detail: "Official UIDAI enrolment dataset", verified: true },
      { label: "Geographic Scope", value: "All India", detail: "District & state level granularity", verified: true },
      { label: "Output Artifact", value: "Coverage Gap Index", detail: "Identifies underserved districts", verified: true }
    ],
    techStack: ["Python", "Pandas", "Jupyter Notebook", "Data Analytics", "Public Sector Policy", "EDA"],
    proofType: "none",
    featured: false,
    githubUrl: "https://github.com/Mr-rxa/UIDAI",
    date: "2026"
  }
];
