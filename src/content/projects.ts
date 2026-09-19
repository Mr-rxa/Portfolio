import { Project } from './types';

export const projectsData: Project[] = [
  {
    id: "retail-war-room",
    slug: "retail-war-room",
    title: "AI Retail War Room (Revolt Prototype)",
    category: "Operations / BI",
    summary: "Command-center operational intelligence dashboard monitoring dealership sales velocity, inventory anomalies, and service turnaround.",
    problem: "Dealership managers across multiple regions experienced delayed End-Of-Day reporting, obscuring inventory shortages, battery replacement backlogs, and sudden demand spikes until days later.",
    contribution: "Designed and engineered an automated multi-tier analytics engine ingesting dealer transactions, forecasting upcoming weekly part demands, and flagging localized inventory bottlenecks with automated anomaly alerts.",
    architecture: "Python ETL -> Prophet forecasting -> Fast aggregation pipeline -> High-density executive command UI.",
    impact: "Accelerated reporting feedback from 36 hours to near real-time, reducing manual report compilation overhead.",
    metrics: [
      { label: "Reporting Speed", value: "36h -> Realtime", detail: "Turnaround time reduction", verified: true },
      { label: "Outlier Detection", value: "TODO_RAHUL: Anomaly count", detail: "Identified inventory mismatch events", verified: false },
      { label: "Forecast Window", value: "14 Days", detail: "Rolling demand projection", verified: true }
    ],
    techStack: ["Python", "Prophet", "Flask", "SQL", "Tailwind CSS", "React"],
    proofType: "retail-war-room",
    featured: true,
    githubUrl: "https://github.com/rahulsharma/retail-war-room", // TODO_RAHUL: Insert repo URL
    date: "2024"
  },
  {
    id: "smart-ambulance",
    slug: "smart-ambulance",
    title: "Smart Ambulance: Dynamic Dispatch Engine",
    category: "AI / ML",
    summary: "Real-time emergency dispatch simulation dynamically routing ambulances around traffic bottlenecks and hospital bed saturation.",
    problem: "Standard navigation apps optimize purely for general road speed, ignoring specialized emergency vehicle right-of-way, live triage capacity, and dynamic hospital availability.",
    contribution: "Implemented a modified A* and Dijkstra routing simulation incorporating real-time traffic impedance factors and live incident rerouting when hospital capacity changes mid-transit.",
    architecture: "Graph Algorithms -> Spatial Canvas Renderer -> State Machine for fleet dispatch.",
    impact: "Simulated response time reduction of over 18% in high-congestion grid scenarios.",
    metrics: [
      { label: "Simulated Transit", value: "-18%", detail: "Average response time savings", verified: true },
      { label: "Reroute Latency", value: "< 250ms", detail: "Real-time incident response", verified: true },
      { label: "Fleet Scale", value: "TODO_RAHUL: Nodes/Ambulances", detail: "Concurrent test vehicles", verified: false }
    ],
    techStack: ["TypeScript", "Canvas API", "Graph Theory", "Python", "Spatial Indexing"],
    proofType: "smart-ambulance",
    featured: true,
    githubUrl: "https://github.com/rahulsharma/smart-ambulance", // TODO_RAHUL: Insert repo URL
    date: "2024"
  },
  {
    id: "rice-disease",
    slug: "rice-disease",
    title: "Rice Disease Vision Intelligence",
    category: "Computer Vision",
    summary: "Deep learning computer vision classifier detecting brown spot, bacterial blight, and leaf blast from mobile crop captures.",
    problem: "Smallholder farmers experience devastating yield losses due to misdiagnosing early fungal and bacterial symptoms that look visually indistinguishable to the untrained eye.",
    contribution: "Curated and augmented leaf pathology datasets, fine-tuned lightweight convolutional backbones (MobileNetV3 / EfficientNet) for edge inference, and deployed an interactive inspection workflow.",
    architecture: "PyTorch -> Torchvision Augmentation -> ONNX Runtime edge inference -> React frontend.",
    impact: "Delivers rapid diagnosis in field conditions without requiring expensive lab testing.",
    metrics: [
      { label: "Classification Accuracy", value: "TODO_RAHUL: 9X.X%", detail: "Top-1 validation accuracy", verified: false },
      { label: "Inference Latency", value: "< 45ms", detail: "Edge MobileNet inference", verified: true },
      { label: "Classes Detected", value: "4 Pathologies", detail: "Including healthy leaf control", verified: true }
    ],
    techStack: ["PyTorch", "OpenCV", "Python", "FastAPI", "ONNX"],
    proofType: "rice-disease",
    featured: false,
    githubUrl: "https://github.com/rahulsharma/rice-disease-intelligence", // TODO_RAHUL: Insert repo URL
    date: "2024"
  },
  {
    id: "olist-analytics",
    slug: "olist-analytics",
    title: "Olist Marketplace Customer Clustering",
    category: "Operations / BI",
    summary: "End-to-end exploratory analysis and unsupervised clustering of 100k+ Brazilian e-commerce orders to identify churn vulnerabilities.",
    problem: "Disparate delivery logistics across Brazilian states created massive variances in review scores and customer repeat purchase behavior that standard KPIs missed.",
    contribution: "Engineered RFM (Recency, Frequency, Monetary) features, applied K-Means and UMAP dimensionality reduction, and correlated delivery delay penalties with customer lifetime value.",
    architecture: "DuckDB / SQL -> Scikit-learn (K-Means + UMAP) -> Seaborn & Interactive BI dashboards.",
    impact: "Isolated critical 4-day delivery delay tipping point after which customer satisfaction dropped by 64%.",
    metrics: [
      { label: "Order Records", value: "100,000+", detail: "Analyzed transactional records", verified: true },
      { label: "Satisfaction Drop", value: "-64%", detail: "Identified delivery threshold penalty", verified: true },
      { label: "Cluster Silhouette", value: "TODO_RAHUL: Score", detail: "Cluster separation metric", verified: false }
    ],
    techStack: ["Python", "SQL", "Scikit-Learn", "Pandas", "UMAP"],
    proofType: "olist-cloud",
    featured: false,
    githubUrl: "https://github.com/rahulsharma/olist-analysis", // TODO_RAHUL: Insert repo URL
    date: "2023"
  },
  {
    id: "cattle-breed",
    slug: "cattle-breed",
    title: "Indigenous Cattle Breed Recognition (Research)",
    category: "Computer Vision",
    summary: "Academic research publication detailing automated classification of indigenous Indian cattle breeds using fine-grained visual attention.",
    problem: "Distinguishing indigenous cattle breeds with subtle morphological variance (horn shape, hump size, coat gradients) fails with vanilla image classifiers.",
    contribution: "Formulated custom feature extraction combining contour attention with deep transfer learning. Co-authored and submitted research manuscript.",
    architecture: "Ensemble CNNs -> Custom spatial attention head -> Morphological feature validator.",
    impact: "Automates livestock biodiversity tracking and digital census validation.",
    metrics: [
      { label: "Research Status", value: "Published / Under Review", detail: "TODO_RAHUL: Confirm journal/conference name", verified: false },
      { label: "Breeds Classified", value: "TODO_RAHUL: N Breeds", detail: "Distinct indigenous genotypes", verified: false },
      { label: "F1 Score", value: "TODO_RAHUL: Score", detail: "Morphological classification benchmark", verified: false }
    ],
    techStack: ["PyTorch", "Computer Vision", "Research Methodology", "LaTeX"],
    proofType: "none",
    featured: false,
    githubUrl: "https://github.com/rahulsharma/cattle-breed-research", // TODO_RAHUL: Insert repo URL
    date: "2023 - 2024"
  }
];
