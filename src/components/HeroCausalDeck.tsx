import React, { useState } from 'react';
import { usePortfolioStore } from '../store/portfolioStore';
import { 
  Activity, ArrowRight, LayoutList, Terminal, 
  Database, Play, CheckCircle2,
  TrendingUp, Navigation, RefreshCw, BarChart2
} from 'lucide-react';

interface PipelineStage {
  label: string;
  stepNum: string;
  tag: string;
  title: string;
  description: string;
  codeSnippet: string;
  status: 'active' | 'nominal' | 'alert';
}

interface CausalScenario {
  id: string;
  title: string;
  category: string;
  icon: React.ElementType;
  sourceStream: string;
  coreQuestion: string;
  stages: [PipelineStage, PipelineStage, PipelineStage, PipelineStage];
  impactStat: {
    label: string;
    value: string;
    subtext: string;
  };
}

const scenarios: CausalScenario[] = [
  {
    id: 'retail',
    title: 'Retail Decision Intelligence',
    category: 'AI-Retail-War-Room',
    icon: BarChart2,
    sourceStream: '42,000 POS Transactions & Inventory Delta / sec',
    coreQuestion: 'Is the regional revenue velocity dip caused by stockouts or price elasticity shifts?',
    stages: [
      {
        label: 'Raw Telemetry Ingest',
        stepNum: '01',
        tag: 'PostgreSQL / Stream',
        title: 'Multi-Hub POS Aggregation',
        description: 'Ingesting raw sales receipts, stock levels, and regional transaction streams across 4 major retail nodes.',
        codeSnippet: 'stream.ingest({ hub: "West-02", aov: 42.80, stockout_flag: 1 })',
        status: 'nominal'
      },
      {
        label: 'Feature & Anomaly Isolation',
        stepNum: '02',
        tag: 'Prophet Time-Series',
        title: 'Statistical Velocity Modeling',
        description: 'Detecting 38% demand surge against 30-day Prophet forward projections with confidence intervals.',
        codeSnippet: 'prophet.detect_anomaly(y_true=840, y_hat_upper=620, p < 0.01)',
        status: 'alert'
      },
      {
        label: 'Causal Attribution Engine',
        stepNum: '03',
        tag: 'Causal DAG & Counterfactuals',
        title: 'Root Cause Disambiguation',
        description: 'Separating promotional campaign elasticity from supply-chain transit bottlenecks with counterfactual verification.',
        codeSnippet: 'causal_infer(treatment="promo_launch", outcome="stockout_risk", p=0.002)',
        status: 'active'
      },
      {
        label: 'Deterministic Action',
        stepNum: '04',
        tag: 'Google Gemini GenAI',
        title: 'Automated Stock Reallocation',
        description: 'Reallocating 15,000 SKUs from central warehouse and dispatching natural-language executive briefs.',
        codeSnippet: 'gemini.generate_brief({ delta: "+38% surge", action: "reallocate_15k" })',
        status: 'nominal'
      }
    ],
    impactStat: {
      label: 'Financial Exposure Protected',
      value: '+$35,000',
      subtext: 'Prevented stockout churn across 4 metropolitan distribution hubs'
    }
  },
  {
    id: 'emergency',
    title: 'Emergency Fleet Telemetry',
    category: 'Lifeline-AI & Telematics',
    icon: Navigation,
    sourceStream: '100Hz GPS Coordinates & Hospital Bed Telemetry',
    coreQuestion: 'Which emergency trauma facility optimizes time-to-treatment under live route impedance?',
    stages: [
      {
        label: 'Spatial Coordinate Feed',
        stepNum: '01',
        tag: 'WebSockets / Telemetry',
        title: 'Vehicle Position Synchronization',
        description: 'Broadcasting live ambulance GPS vectors and real-time transit telemetry at 100ms intervals.',
        codeSnippet: 'ws.broadcast({ unit: "AMB-04", lat: 28.6139, lng: 77.2090, speed: 64 })',
        status: 'nominal'
      },
      {
        label: 'Spatial Network Graph',
        stepNum: '02',
        tag: 'Dijkstra / Spatial Index',
        title: 'Live Road Impedance Matrix',
        description: 'Evaluating road grid congestion, construction bottlenecks, and dynamic transit friction factors.',
        codeSnippet: 'matrix.calculate_impedance({ corridor: "RingRoad-A", delay_sec: +240 })',
        status: 'alert'
      },
      {
        label: 'Causal Routing Engine',
        stepNum: '03',
        tag: 'Nearest-Facility Dispatch',
        title: 'Multi-Factor Allocation',
        description: 'Attributing transit delay to primary bridge bottleneck and discovering optimal green corridor route.',
        codeSnippet: 'dispatch_route(origin=coords, candidates=hospitals, metric="survival_idx")',
        status: 'active'
      },
      {
        label: 'Deterministic Action',
        stepNum: '04',
        tag: 'Vercel Edge & Web Audio',
        title: 'Synchronized Corridor Dispatch',
        description: 'Locking green wave transit route and triggering synchronized Web Audio siren alerts across operations command.',
        codeSnippet: 'edge_trigger({ route_id: "CORRIDOR_04", siren_sync: true, eta_sec: 412 })',
        status: 'nominal'
      }
    ],
    impactStat: {
      label: 'Emergency Response Velocity',
      value: '450ms',
      subtext: 'Mean dispatch latency with 28% reduction in critical patient transit time'
    }
  },
  {
    id: 'mlops',
    title: 'Deterministic Quantitative Signals',
    category: 'signal-pipeline-mlops & Trading Bot',
    icon: TrendingUp,
    sourceStream: '10,000-Row OHLCV Market Ticks & YAML Schemas',
    coreQuestion: 'How do we compute reproducible regime signals without silent edge failures or NaN drift?',
    stages: [
      {
        label: 'Strict Schema Ingestion',
        stepNum: '01',
        tag: 'YAML / Pandera Schema',
        title: 'Batch Validation Core',
        description: 'Validating OHLCV schemas, verifying random seed contracts, and isolating rolling window parameters.',
        codeSnippet: 'validate_schema(df, config="config.yaml", assert_zero_nulls=True)',
        status: 'nominal'
      },
      {
        label: 'Boundary Edge Handling',
        stepNum: '02',
        tag: 'Vectorized NumPy',
        title: 'Deterministic Window Parsing',
        description: 'Explicitly pruning initial NaN boundary rows ($window - 1$) to guarantee mathematical determinism.',
        codeSnippet: 'df["rolling_mean"] = df["close"].rolling(window=20).mean().dropna()',
        status: 'nominal'
      },
      {
        label: 'Regime Signal Engine',
        stepNum: '03',
        tag: 'Binary Execution State',
        title: 'Dynamic Signal Extraction',
        description: 'Generating binary trend execution signals where closing price cleanly breaks the moving average barrier.',
        codeSnippet: 'df["signal"] = np.where(df["close"] > df["rolling_mean"], 1, 0)',
        status: 'active'
      },
      {
        label: 'Deterministic Action',
        stepNum: '04',
        tag: 'HMAC-SHA256 & Docker',
        title: 'Cryptographic Order Execution',
        description: 'Signing requests with HMAC-SHA256, writing machine-readable JSON telemetry, and rotating audit logs.',
        codeSnippet: 'binance.create_order({ symbol: "BTCUSDT", side: "BUY", sign: hmac_hash })',
        status: 'nominal'
      }
    ],
    impactStat: {
      label: 'Pipeline Determinism',
      value: '99.9%',
      subtext: 'Zero unhandled NaN edges across 10,000 historical OHLCV records'
    }
  },
  {
    id: 'census',
    title: 'Geospatial Census Analytics',
    category: 'UIDAI Big Data Pipeline',
    icon: Database,
    sourceStream: '1,000,000+ Aadhaar Government Records',
    coreQuestion: 'What demographic causal factors drive regional discrepancy in citizen identity access?',
    stages: [
      {
        label: 'Big Data Ingestion',
        stepNum: '01',
        tag: 'Python / Polars Batch',
        title: 'Million-Row Census Stream',
        description: 'Chunked processing of 1M+ federal enrollment records with schema integrity verification.',
        codeSnippet: 'batch_scan("uidai_enrolments.parquet", chunk_size=50_000)',
        status: 'nominal'
      },
      {
        label: 'Spatial Variance Analysis',
        stepNum: '02',
        tag: 'Geospatial Statistics',
        title: 'District Coverage Modeling',
        description: 'Spatial clustering revealing statistically significant enrollment rate disparities across 700+ districts.',
        codeSnippet: 'moran_i_spatial_autocorrelation(weights=spatial_w, variable="enrol_rate")',
        status: 'alert'
      },
      {
        label: 'Causal Attribution Engine',
        stepNum: '03',
        tag: 'Econometric Regression',
        title: 'Infrastructure Deficit Modeling',
        description: 'Isolating mobile biometric center downtime as the primary driver behind localized registration drops.',
        codeSnippet: 'ols_regression(target="enrol_gap", controls=["literacy", "mobile_centers"])',
        status: 'active'
      },
      {
        label: 'Deterministic Action',
        stepNum: '04',
        tag: 'Public Policy Reporting',
        title: 'Targeted Allocation Matrix',
        description: 'Producing automated resource allocation schedules deployed directly to state-level administrative bodies.',
        codeSnippet: 'export_policy_brief({ priority_districts: top_underserved, confidence: 0.994 })',
        status: 'nominal'
      }
    ],
    impactStat: {
      label: 'Empirical Scale',
      value: '1.2M+',
      subtext: 'Verified demographic records modeled with district-level geospatial fidelity'
    }
  }
];

export const HeroCausalDeck: React.FC = () => {
  const { setViewMode, toggleTerminal } = usePortfolioStore();
  const [activeScenarioId, setActiveScenarioId] = useState<string>('retail');
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simulatedStage, setSimulatedStage] = useState<number>(-1);
  const [latencyMs, setLatencyMs] = useState<number>(8.4);
  const [confidencePct, setConfidencePct] = useState<number>(99.4);
  const [throughput, setThroughput] = useState<number>(42500);

  const scenario = scenarios.find((s) => s.id === activeScenarioId) || scenarios[0];

  // Simulation pulse sequence
  const handleTriggerSimulation = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setSimulatedStage(0);

    const stages = [0, 1, 2, 3];
    stages.forEach((stg, idx) => {
      setTimeout(() => {
        setSimulatedStage(stg);
        // Perturb metrics realistically during processing
        setLatencyMs(parseFloat((6.5 + Math.random() * 4).toFixed(1)));
        setConfidencePct(parseFloat((98.9 + Math.random() * 0.9).toFixed(1)));
        setThroughput(Math.floor(40000 + Math.random() * 8000));
        
        if (idx === stages.length - 1) {
          setTimeout(() => {
            setIsSimulating(false);
            setSimulatedStage(-1);
          }, 800);
        }
      }, (idx + 1) * 350);
    });
  };

  const scrollToGraph = () => {
    const el = document.getElementById('causal-graph-canvas');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      aria-label="Causal Decision Architecture Hero" 
      className="relative w-full border-b border-surface-border bg-gradient-to-b from-surface/50 via-background to-background pt-10 pb-16 px-4 sm:px-6 overflow-hidden"
    >
      {/* Background Grid Pattern */}
      <div 
        aria-hidden="true" 
        className="absolute inset-0 opacity-15 bg-[radial-gradient(#C6FF3D_1px,transparent_1px)] [background-size:28px_28px] pointer-events-none" 
      />

      <div className="max-w-6xl mx-auto flex flex-col gap-10 relative z-10">
        
        {/* Top Header: Philosophy & Fast CTAs */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="flex flex-col gap-3 max-w-2xl">
            {/* System Status Indicator */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-surface-border text-xs font-mono text-primary w-fit shadow-sm">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span>RS / 01 // CAUSAL DECISION ENGINE</span>
              <span className="text-content-faint">•</span>
              <span className="text-content-muted">SYSTEM ONLINE</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-content leading-[1.08]">
              I turn messy data <br className="hidden sm:inline" />
              into <span className="text-primary underline decoration-primary/40 underline-offset-8">decisions</span>.
            </h1>

            <p className="text-sm sm:text-base text-content-muted leading-relaxed max-w-xl">
              Data Science &amp; Machine Learning Engineer specializing in telemetry pipelines, causal inference, and real-time decision systems. Explore how raw data streams become deterministic actions across a living causal system.
            </p>
          </div>

          {/* Action Hub */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={scrollToGraph}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-primary text-background font-bold text-sm hover:bg-primary-hover transition-all shadow-lg hover:shadow-primary/20 active:scale-[0.98]"
            >
              <span>Explore The Graph</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setViewMode('recruiter')}
              className="flex items-center gap-2 px-4 py-3 rounded-xl bg-surface border border-surface-border text-content hover:text-primary hover:border-primary/40 font-medium text-sm transition-all shadow-sm"
              title="Switch to 30-second executive recruiter overview"
            >
              <LayoutList className="w-4 h-4 text-primary" />
              <span>Recruiter View</span>
            </button>

            <button
              onClick={toggleTerminal}
              className="flex items-center gap-2 px-3.5 py-3 rounded-xl bg-surface border border-surface-border text-content-muted hover:text-primary hover:border-primary/40 font-mono text-sm transition-all"
              title="Open CLI terminal drawer (~)"
              aria-label="Open interactive terminal"
            >
              <Terminal className="w-4 h-4" />
              <span className="text-xs">~</span>
            </button>
          </div>
        </div>

        {/* Modular Causal Decision Console */}
        <div className="w-full rounded-2xl bg-surface/80 border border-surface-border backdrop-blur-md p-5 sm:p-7 flex flex-col gap-6 shadow-2xl">
          
          {/* Console Header & Scenario Tabs */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-surface-border/80 pb-5">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-primary" />
                <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-content">
                  Live Causal Telemetry Stream
                </h2>
              </div>
              <p className="text-xs text-content-muted">
                Select an operational domain to trace the end-to-end causal inference loop:
              </p>
            </div>

            {/* Scenario Pills */}
            <div className="flex flex-wrap items-center gap-1.5 p-1 bg-background/60 rounded-xl border border-surface-border">
              {scenarios.map((sc) => {
                const Icon = sc.icon;
                const isActive = sc.id === activeScenarioId;
                return (
                  <button
                    key={sc.id}
                    onClick={() => {
                      setActiveScenarioId(sc.id);
                      setSimulatedStage(-1);
                      setIsSimulating(false);
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                      isActive
                        ? 'bg-primary text-background font-bold shadow-sm'
                        : 'text-content-muted hover:text-content hover:bg-surface'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{sc.title}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Core Telemetry Statement & Live Control */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-background/60 border border-surface-border">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-mono uppercase text-primary font-bold">
                Causal Question
              </span>
              <p className="text-sm font-medium text-content italic">
                "{scenario.coreQuestion}"
              </p>
              <span className="text-[11px] font-mono text-content-faint">
                Ingest: {scenario.sourceStream}
              </span>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={handleTriggerSimulation}
                disabled={isSimulating}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-xs font-bold transition-all ${
                  isSimulating
                    ? 'bg-primary/20 text-primary border border-primary/40 cursor-wait'
                    : 'bg-primary text-background hover:bg-primary-hover shadow-md active:scale-95'
                }`}
              >
                {isSimulating ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Propagating Signal...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Trigger Ingest Pulse</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* 4 Modular Pipeline Stages */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {scenario.stages.map((stg, idx) => {
              const isPulsing = simulatedStage === idx;
              const hasPassed = simulatedStage > idx;

              return (
                <div
                  key={idx}
                  className={`p-4 rounded-xl border transition-all flex flex-col justify-between gap-3 relative ${
                    isPulsing
                      ? 'bg-primary/10 border-primary shadow-lg shadow-primary/10 -translate-y-1'
                      : hasPassed
                      ? 'bg-surface/90 border-primary/30'
                      : 'bg-surface/40 border-surface-border hover:border-surface-border/80'
                  }`}
                >
                  {/* Top Step Metadata */}
                  <div className="flex items-center justify-between gap-2">
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                      isPulsing || hasPassed
                        ? 'bg-primary text-background'
                        : 'bg-surface-subtle text-primary border border-surface-border'
                    }`}>
                      STAGE {stg.stepNum}
                    </span>
                    <span className="text-[10px] font-mono text-content-faint">
                      {stg.tag}
                    </span>
                  </div>

                  {/* Stage Content */}
                  <div className="flex flex-col gap-1.5">
                    <span className="text-xs font-mono uppercase font-bold text-primary">
                      {stg.label}
                    </span>
                    <h3 className="text-sm font-bold text-content leading-snug">
                      {stg.title}
                    </h3>
                    <p className="text-xs text-content-muted leading-relaxed">
                      {stg.description}
                    </p>
                  </div>

                  {/* Code / Logic Snippet */}
                  <div className="p-2 rounded-lg bg-background border border-surface-border/80 font-mono text-[10px] text-content-muted overflow-x-auto leading-relaxed">
                    <code>{stg.codeSnippet}</code>
                  </div>

                  {/* Dynamic Status Bar */}
                  <div className="flex items-center justify-between pt-1 border-t border-surface-border/60 text-[10px] font-mono">
                    <span className="text-content-faint">Status</span>
                    {isPulsing ? (
                      <span className="text-primary font-bold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
                        Processing...
                      </span>
                    ) : hasPassed ? (
                      <span className="text-emerald-400 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                        Verified
                      </span>
                    ) : (
                      <span className="text-content-faint">Nominal</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Telemetry Ticker & Verified Impact */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-surface-border/80">
            <div className="p-3 rounded-xl bg-background/50 border border-surface-border flex flex-col gap-0.5">
              <span className="text-[10px] font-mono text-content-faint uppercase">Stream Throughput</span>
              <span className="text-base font-bold font-mono text-content">
                {throughput.toLocaleString()} <span className="text-xs font-normal text-content-muted">msg/s</span>
              </span>
            </div>

            <div className="p-3 rounded-xl bg-background/50 border border-surface-border flex flex-col gap-0.5">
              <span className="text-[10px] font-mono text-content-faint uppercase">Attribution Confidence</span>
              <span className="text-base font-bold font-mono text-primary">
                {confidencePct}%
              </span>
            </div>

            <div className="p-3 rounded-xl bg-background/50 border border-surface-border flex flex-col gap-0.5">
              <span className="text-[10px] font-mono text-content-faint uppercase">Causal Latency</span>
              <span className="text-base font-bold font-mono text-content">
                {latencyMs} <span className="text-xs font-normal text-content-muted">ms</span>
              </span>
            </div>

            <div className="p-3 rounded-xl bg-primary/5 border border-primary/20 flex flex-col gap-0.5">
              <span className="text-[10px] font-mono text-primary uppercase font-semibold">
                {scenario.impactStat.label}
              </span>
              <span className="text-base font-bold font-mono text-primary">
                {scenario.impactStat.value}
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
