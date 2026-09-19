import React, { useState, useEffect, useRef } from 'react';
import { Star } from 'lucide-react';

interface Point {
  x: number;
  y: number;
  category: 'electronics' | 'furniture' | 'fashion' | 'health';
  region: 'sp' | 'rj' | 'north' | 'south';
  targetX: number;
  targetY: number;
}

export const OlistProof: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [clusterMode, setClusterMode] = useState<'category' | 'region'>('category');
  const [delayDays, setDelayDays] = useState<number>(3);
  const pointsRef = useRef<Point[]>([]);

  useEffect(() => {
    const categories: Point['category'][] = ['electronics', 'furniture', 'fashion', 'health'];
    const regions: Point['region'][] = ['sp', 'rj', 'north', 'south'];
    const pts: Point[] = [];

    for (let i = 0; i < 240; i++) {
      const cat = categories[i % 4];
      const reg = regions[Math.floor(i / 60) % 4];
      pts.push({
        x: Math.random() * 540 + 30,
        y: Math.random() * 260 + 20,
        category: cat,
        region: reg,
        targetX: 300,
        targetY: 150,
      });
    }
    pointsRef.current = pts;
  }, []);

  useEffect(() => {
    const pts = pointsRef.current;
    pts.forEach((p) => {
      if (clusterMode === 'category') {
        const centers = {
          electronics: { x: 120, y: 80 },
          furniture: { x: 420, y: 80 },
          fashion: { x: 120, y: 220 },
          health: { x: 420, y: 220 },
        };
        const c = centers[p.category];
        p.targetX = c.x + (Math.random() - 0.5) * 120;
        p.targetY = c.y + (Math.random() - 0.5) * 90;
      } else {
        const centers = {
          sp: { x: 180, y: 90 },
          rj: { x: 380, y: 90 },
          north: { x: 180, y: 210 },
          south: { x: 380, y: 210 },
        };
        const c = centers[p.region];
        p.targetX = c.x + (Math.random() - 0.5) * 110;
        p.targetY = c.y + (Math.random() - 0.5) * 85;
      }
    });
  }, [clusterMode]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const colorMap = {
        electronics: '#C6FF3D',
        furniture: '#60A5FA',
        fashion: '#F472B6',
        health: '#34D399',
      };

      pointsRef.current.forEach((p) => {
        p.x += (p.targetX - p.x) * 0.08;
        p.y += (p.targetY - p.y) * 0.08;

        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.5, 0, 2 * Math.PI);
        ctx.fillStyle = colorMap[p.category];
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, []);

  const score = delayDays <= 4 
    ? parseFloat((4.8 - delayDays * 0.15).toFixed(1))
    : parseFloat(Math.max(1.4, 4.2 - (delayDays - 4) * 0.65).toFixed(1));

  const isCriticalPenalty = delayDays > 4;

  return (
    <div className="w-full rounded-2xl bg-surface border border-surface-border p-5 sm:p-6 flex flex-col gap-6 font-mono text-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-surface-border pb-4">
        <div>
          <h4 className="text-sm font-bold text-content font-sans flex items-center gap-2">
            <span>Olist 100k Order Dimensionality & Churn Tipping Point</span>
            <span className="px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20 text-[10px]">
              UMAP / K-Means
            </span>
          </h4>
          <p className="text-[11px] text-content-muted">
            Unsupervised clustering of e-commerce delivery logistics and customer satisfaction penalties.
          </p>
        </div>

        <div className="flex items-center p-1 rounded-lg bg-surface-subtle border border-surface-border">
          <button
            onClick={() => setClusterMode('category')}
            className={`px-3 py-1 rounded-md text-[11px] transition-colors ${
              clusterMode === 'category'
                ? 'bg-primary text-background font-bold'
                : 'text-content-muted hover:text-content'
            }`}
          >
            By Category
          </button>
          <button
            onClick={() => setClusterMode('region')}
            className={`px-3 py-1 rounded-md text-[11px] transition-colors ${
              clusterMode === 'region'
                ? 'bg-primary text-background font-bold'
                : 'text-content-muted hover:text-content'
            }`}
          >
            By Region
          </button>
        </div>
      </div>

      <div className="relative w-full h-[280px] bg-background rounded-xl border border-surface-border overflow-hidden">
        <canvas
          ref={canvasRef}
          width={600}
          height={280}
          className="w-full h-full block"
        />

        <div className="absolute bottom-3 left-3 px-3 py-1.5 rounded-lg bg-surface/90 border border-surface-border text-[10px] text-content flex items-center gap-3 backdrop-blur-sm">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#C6FF3D]" /> Electronics
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#60A5FA]" /> Furniture
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#F472B6]" /> Fashion
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#34D399]" /> Health
          </span>
        </div>
      </div>

      <div className={`p-4 rounded-xl border flex flex-col gap-3 transition-colors ${
        isCriticalPenalty 
          ? 'bg-signal-orangeMuted border-signal-orange/40' 
          : 'bg-surface-subtle border-surface-border'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Star className={`w-4 h-4 ${isCriticalPenalty ? 'text-signal-orange' : 'text-primary'}`} />
            <span className="font-bold text-content text-xs">
              Delivery Delay Threshold Simulation: {delayDays} Days
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-content-muted">Avg Customer Review:</span>
            <span className={`text-base font-bold ${
              isCriticalPenalty ? 'text-signal-orange' : 'text-primary'
            }`}>
              {score} / 5.0 ★
            </span>
          </div>
        </div>

        <input
          type="range"
          min="1"
          max="9"
          step="1"
          value={delayDays}
          onChange={(e) => setDelayDays(parseInt(e.target.value))}
          className="w-full h-2 bg-background rounded-lg appearance-none cursor-pointer accent-[#C6FF3D]"
        />

        <div className="flex justify-between text-[10px] text-content-muted">
          <span>1-3 Days (Nominal: 4.8★)</span>
          <span className="font-bold text-primary">Day 4 (Tipping Point)</span>
          <span className="text-signal-orange font-bold">&gt; 5 Days (-64% Churn Drop)</span>
        </div>
      </div>
    </div>
  );
};
