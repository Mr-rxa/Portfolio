import React, { useState } from 'react';
import { Cpu, CheckCircle2 } from 'lucide-react';

interface LeafSample {
  id: string;
  name: string;
  pathology: string;
  scientificName: string;
  confidence: number;
  distribution: { label: string; pct: number }[];
  lesionCoords: { x: number; y: number; r: number }[];
  treatment: string;
  severity: 'high' | 'moderate' | 'healthy';
}

const SAMPLES: LeafSample[] = [
  {
    id: 'sample-1',
    name: 'Field Sample #1',
    pathology: 'Brown Spot',
    scientificName: 'Bipolaris oryzae',
    confidence: 94.8,
    distribution: [
      { label: 'Brown Spot', pct: 94.8 },
      { label: 'Leaf Blast', pct: 3.2 },
      { label: 'Bacterial Blight', pct: 1.5 },
      { label: 'Healthy Leaf', pct: 0.5 },
    ],
    lesionCoords: [
      { x: 120, y: 70, r: 14 },
      { x: 210, y: 95, r: 18 },
      { x: 165, y: 140, r: 12 },
    ],
    treatment: 'Apply Mancozeb or Edifenphos spray. Optimize soil potassium and nitrogen balance.',
    severity: 'high',
  },
  {
    id: 'sample-2',
    name: 'Field Sample #2',
    pathology: 'Bacterial Blight',
    scientificName: 'Xanthomonas oryzae',
    confidence: 91.4,
    distribution: [
      { label: 'Bacterial Blight', pct: 91.4 },
      { label: 'Brown Spot', pct: 5.1 },
      { label: 'Leaf Blast', pct: 2.3 },
      { label: 'Healthy Leaf', pct: 1.2 },
    ],
    lesionCoords: [
      { x: 80, y: 50, r: 24 },
      { x: 130, y: 80, r: 28 },
    ],
    treatment: 'Drain infected paddock water. Apply Streptomycin sulfate + copper oxychloride.',
    severity: 'high',
  },
  {
    id: 'sample-3',
    name: 'Field Sample #3',
    pathology: 'Leaf Blast',
    scientificName: 'Magnaporthe oryzae',
    confidence: 88.6,
    distribution: [
      { label: 'Leaf Blast', pct: 88.6 },
      { label: 'Brown Spot', pct: 7.2 },
      { label: 'Bacterial Blight', pct: 3.1 },
      { label: 'Healthy Leaf', pct: 1.1 },
    ],
    lesionCoords: [
      { x: 190, y: 60, r: 16 },
      { x: 230, y: 130, r: 20 },
    ],
    treatment: 'Spray Tricyclazole 75 WP. Avoid excessive top-dressing with urea.',
    severity: 'moderate',
  },
  {
    id: 'sample-4',
    name: 'Field Sample #4',
    pathology: 'Healthy Control',
    scientificName: 'Oryza sativa (Healthy)',
    confidence: 99.1,
    distribution: [
      { label: 'Healthy Leaf', pct: 99.1 },
      { label: 'Brown Spot', pct: 0.4 },
      { label: 'Leaf Blast', pct: 0.3 },
      { label: 'Bacterial Blight', pct: 0.2 },
    ],
    lesionCoords: [],
    treatment: 'No chemical intervention necessary. Maintain scheduled moisture monitoring.',
    severity: 'healthy',
  },
];

export const RiceDiseaseProof: React.FC = () => {
  const [selectedSample, setSelectedSample] = useState<LeafSample>(SAMPLES[0]);

  return (
    <div className="w-full rounded-2xl bg-surface border border-surface-border p-5 sm:p-6 flex flex-col gap-6 font-mono text-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-surface-border pb-4">
        <div>
          <h4 className="text-sm font-bold text-content font-sans flex items-center gap-2">
            <span>Rice Leaf Pathology Edge Classifier</span>
            <span className="px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20 text-[10px]">
              ONNX Edge Inference
            </span>
          </h4>
          <p className="text-[11px] text-content-muted">
            Computer vision classifier for smallholder farmer diagnostics with localized lesion bounding.
          </p>
        </div>
        <div className="flex items-center gap-2 text-content-muted text-[11px]">
          <Cpu className="w-3.5 h-3.5 text-primary" />
          <span>MobileNetV3 Backbone (38ms latency)</span>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <span className="text-[11px] text-content-muted mr-1">Select Test Crop:</span>
        {SAMPLES.map((s) => (
          <button
            key={s.id}
            onClick={() => setSelectedSample(s)}
            className={`px-3 py-1.5 rounded-lg border transition-all ${
              selectedSample.id === s.id
                ? 'bg-primary text-background font-bold border-primary shadow-sm'
                : 'bg-surface-subtle border-surface-border text-content-muted hover:text-content'
            }`}
          >
            {s.pathology}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <div className="relative w-full h-[240px] bg-background rounded-xl border border-surface-border overflow-hidden flex items-center justify-center p-4">
            <svg viewBox="0 0 320 200" className="w-full h-full">
              <path
                d="M 20 100 C 90 20, 230 40, 300 95 C 230 150, 90 170, 20 100 Z"
                fill={selectedSample.severity === 'healthy' ? '#1E3A20' : '#2A2E20'}
                stroke={selectedSample.severity === 'healthy' ? '#22C55E' : '#65A30D'}
                strokeWidth="2"
              />
              <path d="M 20 100 Q 160 95 300 95" stroke="#3F6212" strokeWidth="1.5" strokeDasharray="3 3" />

              {selectedSample.lesionCoords.map((pt, i) => (
                <g key={i}>
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r={pt.r}
                    fill="rgba(255, 91, 31, 0.4)"
                    stroke="#FF5B1F"
                    strokeWidth="1.5"
                  />
                  <rect
                    x={pt.x - pt.r - 4}
                    y={pt.y - pt.r - 4}
                    width={(pt.r + 4) * 2}
                    height={(pt.r + 4) * 2}
                    fill="none"
                    stroke="#C6FF3D"
                    strokeWidth="1"
                    strokeDasharray="2 2"
                  />
                  <text
                    x={pt.x - pt.r - 4}
                    y={pt.y - pt.r - 8}
                    fill="#C6FF3D"
                    fontSize="9"
                    fontFamily="monospace"
                  >
                    Lesion #{i + 1}
                  </text>
                </g>
              ))}
            </svg>

            <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-surface/90 border border-surface-border text-[10px] text-content flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${
                selectedSample.severity === 'healthy' ? 'bg-primary' : 'bg-signal-orange'
              }`} />
              <span>Diagnosed: {selectedSample.pathology}</span>
            </div>
          </div>
          <span className="text-[10px] text-content-faint text-center">
            Synthetic visual render of mobile camera frame with inference bounding
          </span>
        </div>

        <div className="flex flex-col gap-4">
          <div className="p-4 rounded-xl bg-surface-subtle border border-surface-border flex flex-col gap-3">
            <span className="font-semibold text-content text-xs flex items-center justify-between">
              <span>Model Softmax Probability</span>
              <span className="text-primary font-bold">{selectedSample.confidence}%</span>
            </span>

            <div className="flex flex-col gap-2">
              {selectedSample.distribution.map((d) => (
                <div key={d.label} className="flex flex-col gap-0.5">
                  <div className="flex justify-between text-[11px] text-content-muted">
                    <span>{d.label}</span>
                    <span className="font-bold text-content">{d.pct}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-background rounded-full overflow-hidden">
                    <div
                      style={{ width: `${d.pct}%` }}
                      className={`h-full rounded-full transition-all duration-300 ${
                        d.pct > 50 ? 'bg-primary' : 'bg-content-muted/40'
                      }`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-surface-subtle border border-surface-border flex flex-col gap-1.5">
            <span className="font-semibold text-content text-xs flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-primary" /> Agronomic Prescription
            </span>
            <p className="text-xs text-content-muted leading-relaxed font-sans">
              {selectedSample.treatment}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
