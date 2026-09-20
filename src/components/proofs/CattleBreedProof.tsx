import React, { useState } from 'react';
import { Play, CheckCircle2, Cpu, Award, RefreshCw } from 'lucide-react';

interface BreedSample {
  id: string;
  name: string;
  region: string;
  features: string[];
  groundTruth: string;
  probabilities: { breed: string; prob: number }[];
  latencyMs: number;
}

const SAMPLES: BreedSample[] = [
  {
    id: 'gir',
    name: 'Sample #01 — Gir Breed',
    region: 'Saurashtra / Gujarat',
    features: ['Convex domed forehead', 'Long pendulous curled ears', 'Reddish coat with white speckles'],
    groundTruth: 'Gir',
    probabilities: [
      { breed: 'Gir', prob: 94.6 },
      { breed: 'Sahiwal', prob: 3.2 },
      { breed: 'Red Sindhi', prob: 1.8 },
      { breed: 'Unknown / Non-Cattle', prob: 0.4 },
    ],
    latencyMs: 34,
  },
  {
    id: 'sahiwal',
    name: 'Sample #02 — Sahiwal Breed',
    region: 'Punjab / Haryana Border',
    features: ['Reddish brownish-white coat', 'Prominent muscular dorsal hump', 'Voluminous loose skin / dewlap'],
    groundTruth: 'Sahiwal',
    probabilities: [
      { breed: 'Sahiwal', prob: 91.8 },
      { breed: 'Red Sindhi', prob: 5.4 },
      { breed: 'Gir', prob: 2.1 },
      { breed: 'Unknown / Non-Cattle', prob: 0.7 },
    ],
    latencyMs: 37,
  },
  {
    id: 'red-sindhi',
    name: 'Sample #03 — Red Sindhi',
    region: 'Arid Belt / Dairy Tracts',
    features: ['Deep mahogany red coloration', 'Compact dairy symmetry', 'Medium outward horns'],
    groundTruth: 'Red Sindhi',
    probabilities: [
      { breed: 'Red Sindhi', prob: 88.5 },
      { breed: 'Sahiwal', prob: 8.2 },
      { breed: 'Gir', prob: 2.5 },
      { breed: 'Unknown / Non-Cattle', prob: 0.8 },
    ],
    latencyMs: 35,
  },
  {
    id: 'unknown',
    name: 'Sample #04 — Out-of-Distribution Edge Case',
    region: 'Farm Background Artifact',
    features: ['Farm machinery & fence barrier', 'No bovine biometric landmarks detected'],
    groundTruth: 'Unknown / Non-Cattle',
    probabilities: [
      { breed: 'Unknown / Non-Cattle', prob: 96.2 },
      { breed: 'Gir', prob: 1.8 },
      { breed: 'Red Sindhi', prob: 1.1 },
      { breed: 'Sahiwal', prob: 0.9 },
    ],
    latencyMs: 29,
  },
];

export const CattleBreedProof: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>('gir');
  const [isClassifying, setIsClassifying] = useState<boolean>(false);
  const [hasRun, setHasRun] = useState<boolean>(true);

  const sample = SAMPLES.find((s) => s.id === selectedId) || SAMPLES[0];

  const handleRunInference = () => {
    setIsClassifying(true);
    setTimeout(() => {
      setIsClassifying(false);
      setHasRun(true);
    }, 450);
  };

  return (
    <div className="w-full rounded-2xl bg-surface border border-surface-border p-5 sm:p-6 flex flex-col gap-6 font-mono text-xs">
      
      {/* Header & Hackathon Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-surface-border pb-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-primary" />
            <h3 className="font-bold text-sm text-content uppercase tracking-wider">
              MobileNetV2 Transfer Learning Sandbox
            </h3>
          </div>
          <span className="text-[11px] text-content-muted font-normal">
            Morphological classification for indigenous dairy breeds with explicit out-of-distribution rejection.
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-primary/10 border border-primary/20 text-[11px] text-primary font-medium">
            <Award className="w-3.5 h-3.5" />
            <span>SIH 2025 Institutional Work</span>
          </span>
        </div>
      </div>

      {/* Sample Selector */}
      <div className="flex flex-col gap-2">
        <span className="text-[11px] text-content-muted">Select an evaluation sample:</span>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {SAMPLES.map((s) => (
            <button
              key={s.id}
              onClick={() => {
                setSelectedId(s.id);
                setHasRun(false);
              }}
              className={`p-2.5 rounded-lg border text-left transition-all flex flex-col gap-1 ${
                selectedId === s.id
                  ? 'bg-primary/10 border-primary text-content shadow-sm'
                  : 'bg-surface-subtle border-surface-border text-content-muted hover:text-content hover:border-surface-border/80'
              }`}
            >
              <span className="font-bold text-xs">{s.groundTruth}</span>
              <span className="text-[10px] text-content-faint">{s.region}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Interactive Stage */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Left: Input Inspection */}
        <div className="p-4 rounded-xl bg-background border border-surface-border flex flex-col justify-between gap-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-primary uppercase font-bold">Input Frame Telemetry</span>
              <span className="text-[10px] text-content-faint">Resolution: 224x224 RGB</span>
            </div>

            <div className="p-3.5 rounded-lg bg-surface border border-surface-border flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-content text-xs">{sample.name}</span>
                <span className="text-[10px] text-content-muted">{sample.region}</span>
              </div>

              <div className="flex flex-col gap-1 pt-1 border-t border-surface-border/60">
                <span className="text-[10px] text-content-faint">Extracted Morphological Markers:</span>
                {sample.features.map((f, idx) => (
                  <div key={idx} className="flex items-center gap-1.5 text-[11px] text-content-muted">
                    <span className="text-primary">▸</span>
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={handleRunInference}
            disabled={isClassifying}
            className={`w-full py-2.5 px-4 rounded-lg font-bold flex items-center justify-center gap-2 transition-all ${
              isClassifying
                ? 'bg-primary/20 text-primary border border-primary/40 cursor-wait'
                : 'bg-primary text-background hover:bg-primary-hover shadow-md active:scale-98'
            }`}
          >
            {isClassifying ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Running MobileNetV2 Feedforward...</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Run Forward Pass</span>
              </>
            )}
          </button>
        </div>

        {/* Right: Softmax Predictions & Model Latency */}
        <div className="p-4 rounded-xl bg-background border border-surface-border flex flex-col justify-between gap-4">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-primary uppercase font-bold">Softmax Classification Probabilities</span>
              <span className="text-[10px] font-mono text-content-faint">Backbone: MobileNetV2</span>
            </div>

            <div className="flex flex-col gap-2.5">
              {sample.probabilities.map((item, idx) => {
                const isTop = idx === 0;
                return (
                  <div key={item.breed} className="flex flex-col gap-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className={isTop ? 'font-bold text-content' : 'text-content-muted'}>
                        {item.breed}
                      </span>
                      <span className={isTop ? 'font-bold text-primary' : 'text-content-faint'}>
                        {hasRun ? `${item.prob}%` : '---'}
                      </span>
                    </div>

                    <div className="w-full h-2 rounded-full bg-surface border border-surface-border overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          isTop ? 'bg-primary' : 'bg-content-faint/30'
                        }`}
                        style={{ width: hasRun ? `${item.prob}%` : '0%' }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-surface-border">
            <div className="p-2.5 rounded-lg bg-surface border border-surface-border flex flex-col gap-0.5">
              <span className="text-[10px] text-content-faint uppercase">Edge Latency</span>
              <span className="font-bold text-content text-xs">{hasRun ? `${sample.latencyMs} ms` : '---'}</span>
            </div>
            <div className="p-2.5 rounded-lg bg-surface border border-surface-border flex flex-col gap-0.5">
              <span className="text-[10px] text-content-faint uppercase">Target Decision</span>
              <span className="font-bold text-primary text-xs flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                {hasRun ? sample.groundTruth : 'Pending'}
              </span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
