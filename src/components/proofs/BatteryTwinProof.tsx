import React, { useState } from 'react';
import { GitBranch, CheckCircle2 } from 'lucide-react';

interface CausalEdgeInfo {
  source: string;
  target: string;
  formula: string;
  explanation: string;
  intervention: string;
}

const EDGES_EXPLANATIONS: Record<string, CausalEdgeInfo> = {
  'temp_sei': {
    source: 'Ambient Temperature (T)',
    target: 'SEI Layer Growth Rate',
    formula: 'k_SEI = A * exp(-E_a / (R * T))',
    explanation: 'High ambient temperature exponentially increases the kinetic rate of parasitic electrolyte reduction at the graphite anode, forming irreversible solid-electrolyte interphase.',
    intervention: 'Fleet cooling strategy: Phase-change thermal jackets or active battery chiller intervention.',
  },
  'sei_deg': {
    source: 'SEI Layer Growth Rate',
    target: 'Irreversible Capacity Degradation',
    formula: 'dC/dt = -alpha * sqrt(k_SEI * t)',
    explanation: 'Lithium ions become permanently trapped within the expanding SEI matrix, permanently decreasing active cyclable lithium inventory.',
    intervention: 'Counterfactual: Regulating pack temperature below 32°C preserves up to 18.5% capacity over 1,500 cycles.',
  },
  'c_deg': {
    source: 'Discharge C-Rate (Stress)',
    target: 'Mechanical Electrode Microcracking',
    formula: 'Stress_mech ~ (I / A)^1.4',
    explanation: 'Aggressive acceleration bursts trigger volumetric expansion gradients in cathode particles, causing microcracking and contact resistance loss.',
    intervention: 'BMS software rate-limiting under high thermal stress states.',
  },
};

export const BatteryTwinProof: React.FC = () => {
  const [selectedEdge, setSelectedEdge] = useState<string>('temp_sei');
  const [coolingIntervention, setCoolingIntervention] = useState<number>(6);
  const edgeInfo = EDGES_EXPLANATIONS[selectedEdge];

  const baselineTemp = 42;
  const intervenedTemp = baselineTemp - coolingIntervention;
  const baselineSoh = 76.2;
  const savedSohPct = parseFloat(((coolingIntervention / 10) * 8.4).toFixed(1));
  const newSoh = Math.min(94, baselineSoh + savedSohPct);
  const extraRangeKm = Math.round((savedSohPct / 100) * 150);

  return (
    <div className="w-full rounded-2xl bg-surface border border-surface-border p-5 sm:p-6 flex flex-col gap-6 font-mono text-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-surface-border pb-4">
        <div>
          <h4 className="text-sm font-bold text-content font-sans flex items-center gap-2">
            <span>CausalEV: Mechanism Graph & Counterfactual Engine</span>
            <span className="px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20 text-[10px]">
              DoWhy / SCM
            </span>
          </h4>
          <p className="text-[11px] text-content-muted">
            Inspect causal edges between physical variables. Run counterfactual policy interventions.
          </p>
        </div>
        <span className="text-primary text-[11px]">
          Physics-informed causal inference
        </span>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-[11px] font-semibold text-content uppercase tracking-wider">
          Structural Causal DAG (Click an edge to inspect physics)
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            onClick={() => setSelectedEdge('temp_sei')}
            className={`p-3.5 rounded-xl border text-left transition-all ${
              selectedEdge === 'temp_sei'
                ? 'bg-primary/10 border-primary text-primary'
                : 'bg-surface-subtle border-surface-border text-content-muted hover:border-surface-border/80'
            }`}
          >
            <div className="flex items-center justify-between text-[10px] text-content-faint">
              <span>Edge #01</span>
              <span>Arrhenius</span>
            </div>
            <div className="font-bold text-xs mt-1 text-content">
              Temp → SEI Plating
            </div>
            <span className="text-[10px] text-content-muted mt-0.5 block">
              Thermal kinetics on electrolyte
            </span>
          </button>

          <button
            onClick={() => setSelectedEdge('sei_deg')}
            className={`p-3.5 rounded-xl border text-left transition-all ${
              selectedEdge === 'sei_deg'
                ? 'bg-primary/10 border-primary text-primary'
                : 'bg-surface-subtle border-surface-border text-content-muted hover:border-surface-border/80'
            }`}
          >
            <div className="flex items-center justify-between text-[10px] text-content-faint">
              <span>Edge #02</span>
              <span>Lithium Loss</span>
            </div>
            <div className="font-bold text-xs mt-1 text-content">
              SEI → Capacity Fade
            </div>
            <span className="text-[10px] text-content-muted mt-0.5 block">
              Active inventory sequestration
            </span>
          </button>

          <button
            onClick={() => setSelectedEdge('c_deg')}
            className={`p-3.5 rounded-xl border text-left transition-all ${
              selectedEdge === 'c_deg'
                ? 'bg-primary/10 border-primary text-primary'
                : 'bg-surface-subtle border-surface-border text-content-muted hover:border-surface-border/80'
            }`}
          >
            <div className="flex items-center justify-between text-[10px] text-content-faint">
              <span>Edge #03</span>
              <span>Mechanical</span>
            </div>
            <div className="font-bold text-xs mt-1 text-content">
              C-Rate → Microcracking
            </div>
            <span className="text-[10px] text-content-muted mt-0.5 block">
              Electrode particle strain
            </span>
          </button>
        </div>
      </div>

      <div className="p-4 rounded-xl bg-surface-subtle border border-surface-border flex flex-col gap-3">
        <div className="flex items-center justify-between border-b border-surface-border pb-2">
          <span className="font-bold text-content text-xs">
            Mechanism: {edgeInfo.source} ➔ {edgeInfo.target}
          </span>
          <code className="px-2 py-0.5 rounded bg-background border border-surface-border text-primary text-[11px]">
            {edgeInfo.formula}
          </code>
        </div>
        <p className="text-xs text-content-muted leading-relaxed font-sans">
          {edgeInfo.explanation}
        </p>
        <div className="flex items-center gap-2 text-primary text-[11px]">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Recommended Intervention: {edgeInfo.intervention}</span>
        </div>
      </div>

      <div className="p-4 rounded-xl bg-gradient-to-r from-surface-subtle to-surface border border-primary/30 flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="font-bold text-content text-xs flex items-center gap-2">
              <GitBranch className="w-3.5 h-3.5 text-primary" /> Counterfactual Policy Simulation: What If?
            </span>
            <span className="text-[11px] text-content-muted">
              Baseline fleet operating in 42°C summer climate with 76.2% end-of-life SOH.
            </span>
          </div>
          <span className="text-primary font-bold text-sm">
            Cooling Intervention: -{coolingIntervention}°C
          </span>
        </div>

        <input
          type="range"
          min="1"
          max="12"
          step="1"
          value={coolingIntervention}
          onChange={(e) => setCoolingIntervention(parseInt(e.target.value))}
          className="w-full h-2 bg-background rounded-lg appearance-none cursor-pointer accent-[#C6FF3D]"
        />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
          <div className="p-3 rounded-lg bg-background border border-surface-border flex flex-col">
            <span className="text-[10px] text-content-muted">Intervened Climate</span>
            <span className="text-base font-bold text-content">{intervenedTemp}°C Effective</span>
            <span className="text-[9px] text-content-faint">Baseline was 42°C</span>
          </div>

          <div className="p-3 rounded-lg bg-background border border-surface-border flex flex-col">
            <span className="text-[10px] text-content-muted">Projected SOH (+Saved)</span>
            <span className="text-base font-bold text-primary">
              {newSoh.toFixed(1)}% <span className="text-xs text-primary font-normal">(+{savedSohPct}%)</span>
            </span>
            <span className="text-[9px] text-content-faint">Prevents premature pack drop</span>
          </div>

          <div className="p-3 rounded-lg bg-background border border-surface-border flex flex-col">
            <span className="text-[10px] text-content-muted">Recovered Lifetime Range</span>
            <span className="text-base font-bold text-primary">+{extraRangeKm} km / cycle</span>
            <span className="text-[9px] text-content-faint">Net fleet efficiency recovery</span>
          </div>
        </div>
      </div>
    </div>
  );
};
