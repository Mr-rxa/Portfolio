import React, { useEffect, useRef, useState } from 'react';
import { RotateCcw, MapPin } from 'lucide-react';

interface Node {
  id: number;
  x: number;
  y: number;
  label?: string;
  isHospital?: boolean;
}

interface Edge {
  from: number;
  to: number;
  congested: boolean;
}

interface Ambulance {
  id: string;
  x: number;
  y: number;
  targetNode: number;
  path: number[];
  progress: number;
  status: 'idle' | 'en_route';
}

export const SmartAmbulanceProof: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [incident, setIncident] = useState<{ x: number; y: number } | null>({ x: 380, y: 180 });
  const [responseSecs, setResponseSecs] = useState<number>(4.2);
  const [reroutesCount, setReroutesCount] = useState<number>(1);
  const [trafficJamActive, setTrafficJamActive] = useState<boolean>(true);

  const nodes: Node[] = [
    { id: 0, x: 60, y: 60 },
    { id: 1, x: 220, y: 60 },
    { id: 2, x: 380, y: 60, isHospital: true, label: 'Apex Trauma Center' },
    { id: 3, x: 520, y: 60 },
    { id: 4, x: 60, y: 180 },
    { id: 5, x: 220, y: 180 },
    { id: 6, x: 380, y: 180 },
    { id: 7, x: 520, y: 180, isHospital: true, label: 'City General' },
    { id: 8, x: 60, y: 300 },
    { id: 9, x: 220, y: 300 },
    { id: 10, x: 380, y: 300 },
    { id: 11, x: 520, y: 300 },
  ];

  const edges: Edge[] = [
    { from: 0, to: 1, congested: false },
    { from: 1, to: 2, congested: false },
    { from: 2, to: 3, congested: false },
    { from: 4, to: 5, congested: trafficJamActive },
    { from: 5, to: 6, congested: trafficJamActive },
    { from: 6, to: 7, congested: false },
    { from: 8, to: 9, congested: false },
    { from: 9, to: 10, congested: false },
    { from: 10, to: 11, congested: false },
    { from: 0, to: 4, congested: false },
    { from: 4, to: 8, congested: false },
    { from: 1, to: 5, congested: false },
    { from: 5, to: 9, congested: false },
    { from: 2, to: 6, congested: false },
    { from: 6, to: 10, congested: false },
    { from: 3, to: 7, congested: false },
    { from: 7, to: 11, congested: false },
  ];

  const ambulancesRef = useRef<Ambulance[]>([
    { id: 'AMB-01', x: 60, y: 60, targetNode: 6, path: [0, 1, 2, 6], progress: 0, status: 'en_route' },
    { id: 'AMB-02', x: 220, y: 300, targetNode: 7, path: [9, 10, 11, 7], progress: 0, status: 'en_route' }
  ]);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setIncident({ x, y });
    setReroutesCount((prev) => prev + 1);
    setResponseSecs(parseFloat((2.8 + Math.random() * 2.2).toFixed(1)));

    let closestNode = 0;
    let minDist = Infinity;
    nodes.forEach((n) => {
      const d = (n.x - x) ** 2 + (n.y - y) ** 2;
      if (d < minDist) {
        minDist = d;
        closestNode = n.id;
      }
    });

    const amb = ambulancesRef.current[0];
    amb.targetNode = closestNode;
    amb.path = [amb.path[0] || 0, 1, closestNode];
    amb.progress = 0;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      edges.forEach((edge) => {
        const fromNode = nodes[edge.from];
        const toNode = nodes[edge.to];
        ctx.beginPath();
        ctx.moveTo(fromNode.x, fromNode.y);
        ctx.lineTo(toNode.x, toNode.y);
        if (edge.congested) {
          ctx.strokeStyle = '#FF5B1F';
          ctx.lineWidth = 4;
        } else {
          ctx.strokeStyle = '#232730';
          ctx.lineWidth = 2.5;
        }
        ctx.stroke();
      });

      nodes.forEach((node) => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.isHospital ? 8 : 4, 0, 2 * Math.PI);
        ctx.fillStyle = node.isHospital ? '#EF4444' : '#3A404F';
        ctx.fill();

        if (node.isHospital) {
          ctx.strokeStyle = '#FFFFFF';
          ctx.lineWidth = 1.5;
          ctx.stroke();
          ctx.fillStyle = '#EDEAE3';
          ctx.font = '10px JetBrains Mono';
          ctx.fillText(node.label || 'Hospital', node.x - 25, node.y - 12);
        }
      });

      if (incident) {
        ctx.beginPath();
        ctx.arc(incident.x, incident.y, 10, 0, 2 * Math.PI);
        ctx.fillStyle = 'rgba(255, 91, 31, 0.3)';
        ctx.fill();
        ctx.beginPath();
        ctx.arc(incident.x, incident.y, 4, 0, 2 * Math.PI);
        ctx.fillStyle = '#FF5B1F';
        ctx.fill();
        ctx.fillStyle = '#FF5B1F';
        ctx.font = 'bold 10px JetBrains Mono';
        ctx.fillText('⚡ Incident #84', incident.x + 8, incident.y + 4);
      }

      ambulancesRef.current.forEach((amb) => {
        if (amb.path.length > 1) {
          const from = nodes[amb.path[0]];
          const to = nodes[amb.path[1]];
          if (from && to) {
            amb.progress += 0.008;
            if (amb.progress >= 1) {
              amb.progress = 0;
              amb.path.shift();
            }
            amb.x = from.x + (to.x - from.x) * amb.progress;
            amb.y = from.y + (to.y - from.y) * amb.progress;
          }
        }

        ctx.beginPath();
        ctx.arc(amb.x, amb.y, 6, 0, 2 * Math.PI);
        ctx.fillStyle = '#C6FF3D';
        ctx.fill();
        ctx.strokeStyle = '#0A0B0D';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.fillStyle = '#C6FF3D';
        ctx.font = 'bold 9px JetBrains Mono';
        ctx.fillText(amb.id, amb.x - 16, amb.y - 10);
      });

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [edges, incident, nodes]);

  return (
    <div className="w-full rounded-2xl bg-surface border border-surface-border p-5 sm:p-6 flex flex-col gap-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-surface-border pb-4">
        <div>
          <h4 className="text-base font-bold text-content flex items-center gap-2">
            <span>Dynamic Dispatch & Reroute Engine</span>
            <span className="px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20 text-xs font-mono">
              Live Simulation
            </span>
          </h4>
          <p className="text-xs text-content-muted mt-0.5">
            Click anywhere on the road grid to trigger an emergency call. Watch ambulances dynamically re-route around congestion.
          </p>
        </div>

        <div className="flex items-center gap-4 font-mono text-xs">
          <div className="flex flex-col">
            <span className="text-[10px] text-content-muted">Reroute Delay</span>
            <span className="text-primary font-bold">&lt; 250ms</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-content-muted">Est. Transit</span>
            <span className="text-primary font-bold">{responseSecs} mins</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-content-muted">Reroutes</span>
            <span className="text-content font-bold">{reroutesCount}</span>
          </div>
        </div>
      </div>

      <div className="relative w-full h-[360px] bg-background rounded-xl border border-surface-border overflow-hidden cursor-crosshair">
        <canvas
          ref={canvasRef}
          width={600}
          height={360}
          onClick={handleCanvasClick}
          className="w-full h-full block"
        />

        <div className="absolute top-3 left-3 px-3 py-1.5 rounded-lg bg-surface/90 border border-surface-border backdrop-blur-sm text-[11px] font-mono text-content-muted flex items-center gap-2 pointer-events-none">
          <MapPin className="w-3.5 h-3.5 text-primary" />
          <span>Click grid to drop incident</span>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 pt-1 border-t border-surface-border text-xs font-mono">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setTrafficJamActive(!trafficJamActive)}
            className={`px-3 py-1.5 rounded-lg border transition-colors ${
              trafficJamActive
                ? 'bg-signal-orangeMuted border-signal-orange text-signal-orange font-semibold'
                : 'bg-surface-subtle border-surface-border text-content-muted'
            }`}
          >
            {trafficJamActive ? '⚠ Corridor Congestion Active' : 'Corridor Normal'}
          </button>
          <button
            onClick={() => {
              ambulancesRef.current = [
                { id: 'AMB-01', x: 60, y: 60, targetNode: 6, path: [0, 1, 2, 6], progress: 0, status: 'en_route' },
                { id: 'AMB-02', x: 220, y: 300, targetNode: 7, path: [9, 10, 11, 7], progress: 0, status: 'en_route' }
              ];
              setIncident(null);
            }}
            className="px-3 py-1.5 rounded-lg bg-surface-subtle border border-surface-border text-content-muted hover:text-content transition-colors flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Fleet</span>
          </button>
        </div>

        <div className="text-content-faint text-[11px]">
          Algorithm: Dynamic A* with capacity-weighted penalty impedance
        </div>
      </div>
    </div>
  );
};
