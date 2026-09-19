import React, { useState } from 'react';
import { Building2, TrendingUp, Clock, BatteryCharging, ShieldAlert, BarChart2 } from 'lucide-react';

interface RegionData {
  name: string;
  weeklyUnits: number;
  swapTurnaroundHours: number;
  anomalyTitle: string;
  anomalySeverity: 'high' | 'medium' | 'low';
  forecastPoints: number[];
}

const REGIONS: Record<string, RegionData> = {
  'delhi-ncr': {
    name: 'Delhi NCR Hub',
    weeklyUnits: 142,
    swapTurnaroundHours: 1.4,
    anomalyTitle: 'Connaught Place Dealership: +38% surge in battery health inquiries',
    anomalySeverity: 'medium',
    forecastPoints: [110, 115, 125, 130, 142, 148, 155, 160],
  },
  'bengaluru': {
    name: 'Bengaluru Tech Corridor',
    weeklyUnits: 218,
    swapTurnaroundHours: 3.8,
    anomalyTitle: 'Indiranagar Hub: Battery Swap Queue Bottleneck (+68% wait time)',
    anomalySeverity: 'high',
    forecastPoints: [180, 195, 205, 218, 230, 245, 260, 275],
  },
  'mumbai': {
    name: 'Mumbai Coastal Region',
    weeklyUnits: 165,
    swapTurnaroundHours: 1.8,
    anomalyTitle: 'Andheri West: Monsoon moisture corrosion alert on fast chargers',
    anomalySeverity: 'low',
    forecastPoints: [140, 145, 152, 165, 170, 178, 185, 192],
  },
};

export const WarRoomProof: React.FC = () => {
  const [selectedHub, setSelectedHub] = useState<string>('bengaluru');
  const hub = REGIONS[selectedHub];

  return (
    <div className="w-full rounded-2xl bg-surface border border-surface-border p-5 sm:p-6 flex flex-col gap-6 font-mono text-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-surface-border pb-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-signal-orangeMuted border border-signal-orange/40 flex items-center justify-center text-signal-orange">
            <Building2 className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-content font-sans flex items-center gap-2">
              <span>AI Retail War Room Dashboard</span>
              <span className="px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20 text-[10px]">
                Synthetic Demo
              </span>
            </h4>
            <p className="text-[11px] text-content-muted">
              Operational telemetry & Prophet demand forecasting engine.
            </p>
          </div>
        </div>

        <div className="flex items-center p-1 rounded-lg bg-surface-subtle border border-surface-border">
          {Object.entries(REGIONS).map(([key, r]) => (
            <button
              key={key}
              onClick={() => setSelectedHub(key)}
              className={`px-3 py-1 rounded-md text-[11px] transition-colors ${
                selectedHub === key
                  ? 'bg-primary text-background font-bold'
                  : 'text-content-muted hover:text-content'
              }`}
            >
              {r.name.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-surface-subtle border border-surface-border flex flex-col gap-1">
          <div className="flex items-center justify-between text-content-muted">
            <span>Weekly Sales Run-Rate</span>
            <TrendingUp className="w-3.5 h-3.5 text-primary" />
          </div>
          <span className="text-2xl font-bold text-primary">
            {hub.weeklyUnits} <span className="text-xs font-normal text-content">EV units</span>
          </span>
          <span className="text-[10px] text-primary">+18.4% vs 14-day trailing baseline</span>
        </div>

        <div className="p-4 rounded-xl bg-surface-subtle border border-surface-border flex flex-col gap-1">
          <div className="flex items-center justify-between text-content-muted">
            <span>Swap Service Turnaround</span>
            <Clock className="w-3.5 h-3.5 text-signal-orange" />
          </div>
          <span className={`text-2xl font-bold ${
            hub.swapTurnaroundHours > 2.5 ? 'text-signal-orange' : 'text-primary'
          }`}>
            {hub.swapTurnaroundHours} <span className="text-xs font-normal text-content">hrs</span>
          </span>
          <span className="text-[10px] text-content-muted">Target SLA: &lt; 2.0 hrs</span>
        </div>

        <div className="p-4 rounded-xl bg-surface-subtle border border-surface-border flex flex-col gap-1">
          <div className="flex items-center justify-between text-content-muted">
            <span>Automated EOD Latency</span>
            <BatteryCharging className="w-3.5 h-3.5 text-primary" />
          </div>
          <span className="text-2xl font-bold text-primary">
            4.2 <span className="text-xs font-normal text-content">mins</span>
          </span>
          <span className="text-[10px] text-content-muted">Reduced from previous 36 hrs</span>
        </div>
      </div>

      <div className={`p-4 rounded-xl border flex items-start gap-3 ${
        hub.anomalySeverity === 'high'
          ? 'bg-signal-orangeMuted border-signal-orange/40 text-signal-orange'
          : 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400'
      }`}>
        <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
        <div className="flex flex-col gap-1 flex-1">
          <div className="flex items-center justify-between">
            <span className="font-bold text-[11px] uppercase tracking-wider">
              Telemetry Anomaly Flagged by Prophet Model
            </span>
            <span className="px-1.5 py-0.5 rounded bg-background/50 text-[10px]">
              Confidence: 94.8%
            </span>
          </div>
          <p className="text-xs text-content/90 font-sans">
            {hub.anomalyTitle}
          </p>
        </div>
      </div>

      <div className="p-4 rounded-xl bg-surface-subtle border border-surface-border flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="font-semibold text-content flex items-center gap-1.5">
            <BarChart2 className="w-3.5 h-3.5 text-primary" /> 14-Day Demand Forecast (Rolling Horizon)
          </span>
          <span className="text-[10px] text-content-muted">Prophet Additive Seasonality</span>
        </div>

        <div className="w-full h-24 bg-background rounded-lg p-2 border border-surface-border flex items-end justify-between gap-2 px-4">
          {hub.forecastPoints.map((val, idx) => {
            const max = Math.max(...hub.forecastPoints);
            const heightPct = Math.round((val / max) * 100);
            const isForecast = idx >= 4;
            return (
              <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group">
                <div
                  style={{ height: `${heightPct}%` }}
                  className={`w-full rounded-t transition-all ${
                    isForecast ? 'bg-primary border border-primary/50' : 'bg-surface-subtle border border-surface-border'
                  } group-hover:opacity-80`}
                />
                <span className="text-[9px] text-content-faint">
                  {isForecast ? `+${(idx - 3) * 2}d` : `-${(4 - idx) * 2}d`}
                </span>
              </div>
            );
          })}
        </div>
        <div className="flex justify-between text-[10px] text-content-muted">
          <span>Historical Dealership Ingestion (T-8d)</span>
          <span className="text-primary font-bold">Predicted Demand Target (T+8d)</span>
        </div>
      </div>
    </div>
  );
};
