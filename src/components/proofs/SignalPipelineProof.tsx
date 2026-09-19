import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Play, Activity, FileCheck, CheckCircle2 } from 'lucide-react';

export const SignalPipelineProof: React.FC = () => {
  const [windowSize, setWindowSize] = useState<number>(10);
  const [running, setRunning] = useState<boolean>(false);
  const [lastExecuted, setLastExecuted] = useState<string>('Just now');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Generate synthetic deterministic OHLCV close series (100 points)
  const priceData = useMemo(() => {
    const data: number[] = [];
    let price = 100.0;
    // Deterministic pseudo-random walk
    for (let i = 0; i < 100; i++) {
      const delta = Math.sin(i * 0.2) * 2.5 + Math.cos(i * 0.45) * 1.8 + Math.sin(i * 0.08) * 4.0;
      price = Math.max(70, Math.min(140, price + delta));
      data.push(parseFloat(price.toFixed(2)));
    }
    return data;
  }, []);

  // Compute rolling mean and binary signals exactly as in run.py
  const { rollingMeans, signals, rowsProcessed } = useMemo(() => {
    const rm: (number | null)[] = [];
    const sig: number[] = [];

    for (let i = 0; i < priceData.length; i++) {
      if (i < windowSize - 1) {
        rm.push(null); // NaN edge exclusion for determinism
      } else {
        let sum = 0;
        for (let j = i - windowSize + 1; j <= i; j++) {
          sum += priceData[j];
        }
        const mean = sum / windowSize;
        rm.push(parseFloat(mean.toFixed(2)));
        // Signal logic from run.py: signal = 1 where close > rolling_mean else 0
        if (priceData[i] > mean) {
          sig.push(i);
        }
      }
    }
    return { rollingMeans: rm, signals: sig, rowsProcessed: priceData.length - (windowSize - 1) };
  }, [priceData, windowSize]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);

    // Grid lines
    ctx.strokeStyle = '#232730';
    ctx.lineWidth = 1;
    for (let y = 0.2; y <= 0.8; y += 0.2) {
      ctx.beginPath();
      ctx.moveTo(35, y * height);
      ctx.lineTo(width - 15, y * height);
      ctx.stroke();
    }

    const minP = 70;
    const maxP = 145;
    const getY = (val: number) => height - 30 - ((val - minP) / (maxP - minP)) * (height - 50);
    const getX = (idx: number) => 40 + (idx / (priceData.length - 1)) * (width - 60);

    // 1. Draw Close Price Line
    ctx.beginPath();
    ctx.strokeStyle = '#8E95A5';
    ctx.lineWidth = 1.5;
    priceData.forEach((p, idx) => {
      const x = getX(idx);
      const y = getY(p);
      if (idx === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();

    // 2. Draw Rolling Mean Line
    ctx.beginPath();
    ctx.strokeStyle = '#C6FF3D';
    ctx.lineWidth = 2.5;
    let started = false;
    rollingMeans.forEach((m, idx) => {
      if (m !== null) {
        const x = getX(idx);
        const y = getY(m);
        if (!started) {
          ctx.moveTo(x, y);
          started = true;
        } else {
          ctx.lineTo(x, y);
        }
      }
    });
    ctx.stroke();

    // 3. Mark Buy Signals (Dots where close > rolling_mean)
    signals.forEach((idx) => {
      const x = getX(idx);
      const y = getY(priceData[idx]);
      ctx.beginPath();
      ctx.arc(x, y, 3, 0, 2 * Math.PI);
      ctx.fillStyle = '#C6FF3D';
      ctx.fill();
    });

    // Y Axis Labels
    ctx.fillStyle = '#6B7280';
    ctx.font = '10px JetBrains Mono';
    ctx.fillText('$140', 8, getY(140));
    ctx.fillText('$100', 8, getY(100));
    ctx.fillText('$70', 12, getY(70));
  }, [priceData, rollingMeans, signals, windowSize]);

  const handleTriggerBatch = () => {
    setRunning(true);
    setTimeout(() => {
      setRunning(false);
      setLastExecuted(new Date().toLocaleTimeString());
    }, 450);
  };

  return (
    <div className="w-full flex flex-col gap-5 p-5 rounded-xl bg-surface border border-surface-border">
      {/* Header telemetry */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-surface-border">
        <div>
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-primary" />
            <h4 className="text-base font-bold text-content font-mono">
              signal-pipeline-mlops: Batch Pipeline Runner
            </h4>
            <span className="px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20 text-xs font-mono">
              Deterministic
            </span>
          </div>
          <p className="text-xs text-content-muted mt-0.5">
            Demonstrates strict NaN exclusion, rolling statistical signal generation, and structured JSON telemetry.
          </p>
        </div>

        <div className="flex items-center gap-4 font-mono text-xs">
          <div className="flex flex-col">
            <span className="text-[10px] text-content-muted">Rows Processed</span>
            <span className="text-primary font-bold">{rowsProcessed} / 100</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-content-muted">Signals Emitted</span>
            <span className="text-primary font-bold">{signals.length}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-content-muted">Status</span>
            <span className="text-content font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-primary" /> 200 OK
            </span>
          </div>
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="relative w-full h-[280px] bg-background rounded-xl border border-surface-border overflow-hidden">
        <canvas
          ref={canvasRef}
          width={640}
          height={280}
          className="w-full h-full block"
        />

        <div className="absolute top-3 right-3 flex items-center gap-3 text-[11px] font-mono px-3 py-1.5 rounded-lg bg-surface/90 border border-surface-border backdrop-blur-sm">
          <span className="flex items-center gap-1.5 text-content-muted">
            <span className="w-3 h-0.5 bg-[#8E95A5] inline-block" /> Close Price
          </span>
          <span className="flex items-center gap-1.5 text-primary">
            <span className="w-3 h-0.5 bg-primary inline-block" /> Rolling Mean (w={windowSize})
          </span>
          <span className="flex items-center gap-1 text-content">
            <span className="w-2 h-2 rounded-full bg-primary inline-block" /> Signal = 1
          </span>
        </div>
      </div>

      {/* Controls & Mock JSON Output */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 pt-1 border-t border-surface-border">
        <div className="md:col-span-5 flex flex-col justify-between gap-3 p-4 rounded-xl bg-surface-subtle border border-surface-border font-mono">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-content font-semibold">Rolling Window (w):</span>
              <span className="text-primary font-bold">{windowSize} periods</span>
            </div>
            <input
              type="range"
              min="3"
              max="35"
              value={windowSize}
              onChange={(e) => setWindowSize(parseInt(e.target.value))}
              className="w-full accent-primary cursor-pointer h-1.5 bg-surface rounded-lg"
            />
            <span className="text-[10px] text-content-faint">
              Adjusting window automatically excludes the first {windowSize - 1} edge points from evaluation.
            </span>
          </div>

          <button
            onClick={handleTriggerBatch}
            disabled={running}
            className="w-full py-2.5 px-4 rounded-lg bg-primary text-background font-mono text-xs font-bold hover:bg-primary/90 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-sm"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>{running ? 'Running Batch Job...' : 'Execute python run.py'}</span>
          </button>
        </div>

        {/* Structured JSON Output (metrics.json view) */}
        <div className="md:col-span-7 flex flex-col gap-1.5 p-4 rounded-xl bg-background border border-surface-border font-mono text-xs overflow-hidden">
          <div className="flex items-center justify-between text-[11px] text-content-muted border-b border-surface-border pb-1.5">
            <span className="flex items-center gap-1.5 text-primary">
              <FileCheck className="w-3.5 h-3.5" /> metrics.json (Artifact)
            </span>
            <span className="text-[10px] text-content-faint">Last executed: {lastExecuted}</span>
          </div>
          <pre className="text-[11px] text-[#C6FF3D] overflow-x-auto leading-relaxed pt-1">
{`{
  "pipeline": "signal-pipeline-mlops",
  "status": "SUCCESS",
  "window_size": ${windowSize},
  "total_records": 100,
  "excluded_edge_records": ${windowSize - 1},
  "rows_processed": ${rowsProcessed},
  "signals_emitted": ${signals.length},
  "signal_frequency_pct": ${(signals.length / Math.max(1, rowsProcessed) * 100).toFixed(1)}%,
  "deterministic_checksum": "sha256:4f8e91..."
}`}
          </pre>
        </div>
      </div>
    </div>
  );
};
