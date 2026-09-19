import React, { useState, useEffect, useRef } from 'react';
import { computeBatteryTwin, BatteryTwinState } from '../utils/batterySimulation';
import { usePortfolioStore } from '../store/portfolioStore';
import { 
  Zap, Thermometer, Gauge, ArrowRight, LayoutList, 
  ShieldCheck, Flame, Snowflake, Info
} from 'lucide-react';

export const HeroBatteryTwin: React.FC = () => {
  const { setViewMode } = usePortfolioStore();
  const [temperature, setTemperature] = useState<number>(38);
  const [cRate, setCRate] = useState<number>(1.5);
  const [state, setState] = useState<BatteryTwinState>(computeBatteryTwin(38, 1.5));
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    setState(computeBatteryTwin(temperature, cRate));
  }, [temperature, cRate]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);

    ctx.strokeStyle = '#232730';
    ctx.lineWidth = 1;
    for (let y = 0.2; y <= 0.8; y += 0.2) {
      ctx.beginPath();
      ctx.moveTo(35, y * height);
      ctx.lineTo(width - 10, y * height);
      ctx.stroke();
    }

    ctx.beginPath();
    ctx.strokeStyle = 'rgba(142, 149, 165, 0.4)';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([4, 4]);
    for (let x = 0; x <= width - 45; x += 5) {
      const cycle = (x / (width - 45)) * 1500;
      const baseFade = (cycle / 1000) * 12;
      const soh = 100 - baseFade;
      const y = height - 20 - ((soh - 50) / 50) * (height - 35);
      if (x === 0) ctx.moveTo(35 + x, y);
      else ctx.lineTo(35 + x, y);
    }
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.beginPath();
    ctx.strokeStyle = state.activeMechanisms.heatSEI 
      ? '#FF5B1F' 
      : state.activeMechanisms.coldPlating 
      ? '#60A5FA' 
      : '#C6FF3D';
    ctx.lineWidth = 2.5;

    for (let x = 0; x <= width - 45; x += 4) {
      const cycle = (x / (width - 45)) * 1500;
      const fade = Math.min(50, (cycle / 1000) * 12 * state.degradationMultiplier);
      const soh = 100 - fade;
      const y = height - 20 - ((soh - 50) / 50) * (height - 35);
      if (x === 0) ctx.moveTo(35 + x, y);
      else ctx.lineTo(35 + x, y);
    }
    ctx.stroke();

    ctx.fillStyle = '#8E95A5';
    ctx.font = '10px JetBrains Mono';
    ctx.fillText('100%', 5, 20);
    ctx.fillText('75%', 10, height / 2);
    ctx.fillText('50%', 10, height - 15);
    ctx.fillText('0', 35, height - 4);
    ctx.fillText('750c', width / 2 - 10, height - 4);
    ctx.fillText('1,500 cycles', width - 75, height - 4);
  }, [state]);

  return (
    <section className="relative w-full border-b border-surface-border bg-gradient-to-b from-surface/60 via-background to-background pt-10 pb-14 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto flex flex-col gap-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="flex flex-col gap-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-surface-border text-xs font-mono text-primary w-fit">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span>Rahul Sharma — Portfolio Signature Moment</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-content leading-[1.1]">
              I turn messy data <br className="hidden sm:inline" />
              into <span className="text-primary underline decoration-primary/40 underline-offset-8">decisions</span>.
            </h1>
            <p className="text-sm sm:text-base text-content-muted leading-relaxed">
              Real-time interactive EV Battery Digital Twin below. Adjust climate and discharge stress to watch the causal degradation mechanism propagate in real-time.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => {
                const el = document.getElementById('causal-graph-canvas');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-primary text-background font-bold text-sm hover:bg-primary-hover transition-all shadow-lg hover:shadow-primary/20"
            >
              <span>Explore The Graph</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('recruiter')}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-surface border border-surface-border hover:border-surface-border/80 text-content font-medium text-sm transition-colors"
            >
              <LayoutList className="w-4 h-4 text-primary" />
              <span>Recruiter View</span>
            </button>
          </div>
        </div>

        <div className="p-6 sm:p-8 rounded-2xl bg-surface/90 border border-surface-border shadow-2xl flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-surface-border">
            <div className="flex items-center gap-2.5">
              <Zap className="w-5 h-5 text-primary" />
              <h2 className="text-base font-bold text-content tracking-tight">
                Live EV Battery Digital Twin (Causal Degradation Model)
              </h2>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-content-muted">
              <span className="text-primary">● Live Physics-Inspired JS</span>
              <span>•</span>
              <span className="text-content-faint">Arrhenius &amp; SEI Simulation</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-5 flex flex-col gap-6">
              <div className="flex flex-col gap-2 p-4 rounded-xl bg-surface-subtle border border-surface-border">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-content flex items-center gap-1.5 font-semibold">
                    <Thermometer className="w-4 h-4 text-primary" /> Ambient Temperature
                  </span>
                  <span className="text-sm font-mono font-bold text-primary">
                    {temperature > 0 ? `+${temperature}` : temperature}°C
                  </span>
                </div>
                <input
                  type="range"
                  min="-10"
                  max="50"
                  step="1"
                  value={temperature}
                  onChange={(e) => setTemperature(parseFloat(e.target.value))}
                  className="w-full h-2 bg-surface rounded-lg appearance-none cursor-pointer accent-[#C6FF3D]"
                />
                <div className="flex justify-between text-[10px] font-mono text-content-muted">
                  <span>-10°C (Cold Plating)</span>
                  <span>25°C (Nominal)</span>
                  <span>50°C (Severe SEI)</span>
                </div>
              </div>

              <div className="flex flex-col gap-2 p-4 rounded-xl bg-surface-subtle border border-surface-border">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-content flex items-center gap-1.5 font-semibold">
                    <Gauge className="w-4 h-4 text-primary" /> Discharge C-Rate
                  </span>
                  <span className="text-sm font-mono font-bold text-primary">
                    {cRate.toFixed(1)} C
                  </span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="3.5"
                  step="0.1"
                  value={cRate}
                  onChange={(e) => setCRate(parseFloat(e.target.value))}
                  className="w-full h-2 bg-surface rounded-lg appearance-none cursor-pointer accent-[#C6FF3D]"
                />
                <div className="flex justify-between text-[10px] font-mono text-content-muted">
                  <span>0.5C (Eco Cruise)</span>
                  <span>1.0C (Standard)</span>
                  <span>3.5C (Max Throttle)</span>
                </div>
              </div>

              <div className={`p-4 rounded-xl border flex items-start gap-3 transition-colors ${
                state.activeMechanisms.heatSEI 
                  ? 'bg-signal-orangeMuted border-signal-orange/40 text-content'
                  : state.activeMechanisms.coldPlating 
                  ? 'bg-blue-500/10 border-blue-500/30 text-content'
                  : 'bg-primary/10 border-primary/30 text-content'
              }`}>
                {state.activeMechanisms.heatSEI ? (
                  <Flame className="w-5 h-5 text-signal-orange shrink-0 mt-0.5" />
                ) : state.activeMechanisms.coldPlating ? (
                  <Snowflake className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                ) : (
                  <ShieldCheck className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                )}
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider">
                    {state.activeMechanisms.heatSEI 
                      ? 'Arrhenius SEI Growth Activated'
                      : state.activeMechanisms.coldPlating 
                      ? 'Lithium Plating / Low Diffusion Risk'
                      : 'Optimal Operating Chemistry'}
                  </span>
                  <p className="text-xs text-content-muted leading-relaxed">
                    {state.activeMechanisms.heatSEI 
                      ? 'High electrolyte temperature triggers irreversible solid-electrolyte interphase (SEI) layer growth, accelerating capacity fade by ' + state.degradationMultiplier + 'x.'
                      : state.activeMechanisms.coldPlating 
                      ? 'Freezing temperatures decrease lithium diffusion kinetics, increasing internal impedance and risking dendrite formation during high power draw.'
                      : 'Pack operating in nominal kinetics window. Degradation rate remains balanced at baseline ~12% per 1,000 charge cycles.'}
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 flex flex-col gap-4">
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3.5 rounded-xl bg-surface-subtle border border-surface-border flex flex-col">
                  <span className="text-[11px] font-mono text-content-muted">Real-World Range</span>
                  <span className="text-2xl font-mono font-bold text-primary">
                    {state.projectedRangeKm} <span className="text-xs font-normal text-content">km</span>
                  </span>
                  <span className="text-[10px] text-content-faint">Baseline: 150 km</span>
                </div>

                <div className="p-3.5 rounded-xl bg-surface-subtle border border-surface-border flex flex-col">
                  <span className="text-[11px] font-mono text-content-muted">1,000-Cycle SOH</span>
                  <span className={`text-2xl font-mono font-bold ${
                    state.sohAfter1000Cycles < 75 ? 'text-signal-orange' : 'text-primary'
                  }`}>
                    {state.sohAfter1000Cycles}%
                  </span>
                  <span className="text-[10px] text-content-faint">State of Health</span>
                </div>

                <div className="p-3.5 rounded-xl bg-surface-subtle border border-surface-border flex flex-col">
                  <span className="text-[11px] font-mono text-content-muted">Degradation Rate</span>
                  <span className="text-2xl font-mono font-bold text-primary">
                    {state.degradationMultiplier}x
                  </span>
                  <span className="text-[10px] text-content-faint">Baseline: 1.00x</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-surface-subtle border border-surface-border flex flex-col gap-2">
                <div className="flex items-center justify-between text-xs font-mono text-content-muted">
                  <span className="font-semibold text-content">Simulated Capacity Fade Curve (0 → 1,500 Cycles)</span>
                  <div className="flex items-center gap-3 text-[11px]">
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-0.5 bg-content-muted inline-block" /> Baseline
                    </span>
                    <span className="flex items-center gap-1 text-primary">
                      <span className="w-2 h-1 bg-primary inline-block" /> Current
                    </span>
                  </div>
                </div>
                <div className="w-full h-36 bg-background rounded-lg p-2 border border-surface-border relative">
                  <canvas
                    ref={canvasRef}
                    width={560}
                    height={128}
                    className="w-full h-full block"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-surface-border flex flex-col gap-2">
            <span className="text-xs font-mono font-semibold text-content-muted uppercase tracking-wider flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-primary" /> Active Causal Path Propagation
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 font-mono text-xs">
              <div className="p-2.5 rounded-lg bg-surface-subtle border border-primary/50 text-content flex flex-col">
                <span className="text-[10px] text-primary">01. Cause</span>
                <span className="font-bold text-xs">{temperature}°C Ambient</span>
              </div>
              <div className="p-2.5 rounded-lg bg-surface-subtle border border-primary/50 text-content flex flex-col">
                <span className="text-[10px] text-primary">02. Cell Mechanism</span>
                <span className="font-bold text-xs truncate">
                  {state.activeMechanisms.heatSEI ? 'SEI Layer Growth' : state.activeMechanisms.coldPlating ? 'Electrolyte Drag' : 'Nominal Kinetics'}
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-surface-subtle border border-primary/50 text-content flex flex-col">
                <span className="text-[10px] text-primary">03. Fade Acceleration</span>
                <span className="font-bold text-xs">{state.degradationMultiplier}x multiplier</span>
              </div>
              <div className="p-2.5 rounded-lg bg-surface-subtle border border-primary/50 text-content flex flex-col">
                <span className="text-[10px] text-primary">04. 1,000c Health</span>
                <span className="font-bold text-xs">{state.sohAfter1000Cycles}% SOH</span>
              </div>
              <div className="col-span-2 sm:col-span-1 p-2.5 rounded-lg bg-primary/10 border border-primary text-primary flex flex-col">
                <span className="text-[10px] text-primary font-semibold">05. Output Range</span>
                <span className="font-bold text-xs">{state.projectedRangeKm} km Available</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
