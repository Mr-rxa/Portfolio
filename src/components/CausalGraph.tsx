import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as d3 from 'd3-force';
import { buildCausalGraph, GraphNode, GraphLink } from '../utils/graphData';
import { usePortfolioStore } from '../store/portfolioStore';
import { ZoomIn, ZoomOut, RotateCcw, Layers } from 'lucide-react';

export const CausalGraph: React.FC = () => {
  const { setActiveProjectId } = usePortfolioStore();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [hoveredNode, setHoveredNode] = useState<GraphNode | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<string>('all');
  const [graphData] = useState(() => buildCausalGraph());
  const simulationRef = useRef<d3.Simulation<GraphNode, GraphLink> | null>(null);

  const transformRef = useRef({ x: 0, y: 0, k: 1.1 });
  const isDraggingRef = useRef(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const draggedNodeRef = useRef<GraphNode | null>(null);
  const isTransitioningRef = useRef(false);
  const touchStartRef = useRef<{ dist: number; midX: number; midY: number } | null>(null);

  const [focusedNodeIdx, setFocusedNodeIdx] = useState<number>(-1);

  const prefersReducedMotion = typeof window !== 'undefined'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const connectedNodeIds = React.useMemo(() => {
    if (!hoveredNode) return new Set<string>();
    const ids = new Set<string>([hoveredNode.id]);
    graphData.links.forEach((link) => {
      const sourceId = typeof link.source === 'object' ? (link.source as GraphNode).id : link.source;
      const targetId = typeof link.target === 'object' ? (link.target as GraphNode).id : link.target;
      if (sourceId === hoveredNode.id) ids.add(targetId);
      if (targetId === hoveredNode.id) ids.add(sourceId);
    });
    return ids;
  }, [hoveredNode, graphData.links]);

  const renderFrameRef = useRef<() => void>(() => {});

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    canvas.width = width * window.devicePixelRatio;
    canvas.height = height * window.devicePixelRatio;

    transformRef.current = { x: width / 2, y: height / 2, k: 1.1 };

    const simulation = d3.forceSimulation<GraphNode>(graphData.nodes)
      .force(
        'link',
        d3.forceLink<GraphNode, GraphLink>(graphData.links)
          .id((d) => d.id)
          .distance((d) => (d.relation === 'incubated' ? 70 : 100))
      )
      .force('charge', d3.forceManyBody().strength(prefersReducedMotion ? -180 : -280))
      .force('collide', d3.forceCollide<GraphNode>().radius((d) => d.radius + 18).iterations(2))
      .force('center', d3.forceCenter(0, 0).strength(0.08))
      .alphaDecay(prefersReducedMotion ? 0.1 : 0.02);

    simulationRef.current = simulation;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const render = () => {
      ctx.save();
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      ctx.clearRect(0, 0, width, height);

      const { x, y, k } = transformRef.current;
      ctx.translate(x, y);
      ctx.scale(k, k);

      const hasHover = hoveredNode !== null;
      const now = performance.now();

      // 1. Draw Links
      graphData.links.forEach((link, lIdx) => {
        const source = link.source as GraphNode;
        const target = link.target as GraphNode;
        if (!source.x || !source.y || !target.x || !target.y) return;

        const isHighlighted = hasHover && (
          (source.id === hoveredNode.id && connectedNodeIds.has(target.id)) ||
          (target.id === hoveredNode.id && connectedNodeIds.has(source.id))
        );

        ctx.beginPath();
        ctx.moveTo(source.x, source.y);
        ctx.lineTo(target.x, target.y);

        if (isHighlighted) {
          ctx.strokeStyle = '#C6FF3D';
          ctx.lineWidth = 2.5;
        } else if (hasHover) {
          ctx.strokeStyle = 'rgba(35, 39, 48, 0.2)';
          ctx.lineWidth = 0.8;
        } else {
          ctx.strokeStyle = '#232730';
          ctx.lineWidth = 1.2;
        }
        ctx.stroke();

        // Data pipeline flowing pulse along highlighted links
        if (isHighlighted && !prefersReducedMotion) {
          const speed = 0.0012;
          const phase = (now * speed + lIdx * 0.25) % 1;
          const px = source.x + (target.x - source.x) * phase;
          const py = source.y + (target.y - source.y) * phase;

          ctx.beginPath();
          ctx.arc(px, py, 3, 0, 2 * Math.PI);
          ctx.fillStyle = '#C6FF3D';
          ctx.shadowColor = '#C6FF3D';
          ctx.shadowBlur = 8;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      });

      // 2. Draw Nodes
      graphData.nodes.forEach((node) => {
        if (!node.x || !node.y) return;

        const isHighlighted = !hasHover || connectedNodeIds.has(node.id);
        const isSelectedGroup = selectedGroup === 'all' || node.group === selectedGroup;
        const isHovered = hoveredNode?.id === node.id;

        const alpha = (!isSelectedGroup) ? 0.15 : (hasHover && !isHighlighted ? 0.2 : 1.0);

        ctx.save();
        ctx.globalAlpha = alpha;

        // Glowing outer halo on hover / connected project
        if (isHovered || (hasHover && isHighlighted && node.group === 'project')) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius + 6, 0, 2 * Math.PI);
          ctx.fillStyle = 'rgba(198, 255, 61, 0.25)';
          ctx.fill();
        }

        // Node base circle
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, 2 * Math.PI);
        ctx.fillStyle = node.group === 'project' ? '#12141A' : node.group === 'experience' ? '#1E1410' : '#151820';
        ctx.fill();

        ctx.strokeStyle = isHighlighted ? node.color : '#3A404F';
        ctx.lineWidth = isHovered ? 3 : node.group === 'project' ? 2 : 1.5;
        ctx.stroke();

        // Node core dot
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.group === 'project' ? 3.5 : 2, 0, 2 * Math.PI);
        ctx.fillStyle = node.color;
        ctx.fill();

        // Label typography
        ctx.fillStyle = isHighlighted ? '#EDEAE3' : '#6B7280';
        ctx.font = `${node.group === 'project' ? 'bold 11px' : '10px'} JetBrains Mono`;
        ctx.textAlign = 'center';
        ctx.fillText(node.label, node.x, node.y + node.radius + 14);

        if (node.sublabel && (isHovered || node.group === 'project')) {
          ctx.fillStyle = '#8E95A5';
          ctx.font = '8px JetBrains Mono';
          ctx.fillText(node.sublabel, node.x, node.y + node.radius + 24);
        }

        ctx.restore();
      });

      ctx.restore();
    };

    renderFrameRef.current = render;
    simulation.on('tick', render);

    // Subtle continuous loop when hovering to animate pipeline pulses
    let animId: number | null = null;
    const pulseLoop = () => {
      if (hoveredNode !== null && !prefersReducedMotion) {
        render();
        animId = requestAnimationFrame(pulseLoop);
      }
    };
    if (hoveredNode !== null && !prefersReducedMotion) {
      animId = requestAnimationFrame(pulseLoop);
    }

    const handleResize = () => {
      const newW = canvas.clientWidth;
      const newH = canvas.clientHeight;
      canvas.width = newW * window.devicePixelRatio;
      canvas.height = newH * window.devicePixelRatio;
      render();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      if (animId) cancelAnimationFrame(animId);
      simulation.stop();
      window.removeEventListener('resize', handleResize);
    };
  }, [graphData, hoveredNode, connectedNodeIds, selectedGroup, prefersReducedMotion]);

  const screenToWorld = useCallback((screenX: number, screenY: number) => {
    const { x, y, k } = transformRef.current;
    return {
      x: (screenX - x) / k,
      y: (screenY - y) / k,
    };
  }, []);

  const getNodeAt = useCallback((screenX: number, screenY: number): GraphNode | null => {
    const world = screenToWorld(screenX, screenY);
    for (let i = graphData.nodes.length - 1; i >= 0; i--) {
      const node = graphData.nodes[i];
      if (!node.x || !node.y) continue;
      const dx = world.x - node.x;
      const dy = world.y - node.y;
      if (dx * dx + dy * dy <= (node.radius + 8) * (node.radius + 8)) {
        return node;
      }
    }
    return null;
  }, [graphData.nodes, screenToWorld]);

  // Smooth camera interpolation to target node
  const animateCameraToNode = useCallback((node: GraphNode, onComplete: () => void) => {
    const canvas = canvasRef.current;
    if (!canvas || !node.x || !node.y || prefersReducedMotion) {
      onComplete();
      return;
    }

    isTransitioningRef.current = true;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const startX = transformRef.current.x;
    const startY = transformRef.current.y;
    const startK = transformRef.current.k;

    const targetK = 1.85;
    const targetX = width / 2 - node.x * targetK;
    const targetY = height / 2 - node.y * targetK;
    const startTime = performance.now();
    const duration = 380; // ms

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      // easeOutCubic
      const ease = 1 - Math.pow(1 - progress, 3);

      transformRef.current = {
        x: startX + (targetX - startX) * ease,
        y: startY + (targetY - startY) * ease,
        k: startK + (targetK - startK) * ease,
      };

      renderFrameRef.current();

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        isTransitioningRef.current = false;
        onComplete();
      }
    };

    requestAnimationFrame(step);
  }, [prefersReducedMotion]);

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (isTransitioningRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const sx = e.clientX - rect.left;
    const sy = e.clientY - rect.top;

    const node = getNodeAt(sx, sy);
    if (node) {
      draggedNodeRef.current = node;
      node.fx = node.x;
      node.fy = node.y;
      simulationRef.current?.alphaTarget(0.3).restart();
    } else {
      isDraggingRef.current = true;
      dragStartRef.current = { x: sx - transformRef.current.x, y: sy - transformRef.current.y };
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (isTransitioningRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const sx = e.clientX - rect.left;
    const sy = e.clientY - rect.top;

    if (draggedNodeRef.current) {
      const world = screenToWorld(sx, sy);
      draggedNodeRef.current.fx = world.x;
      draggedNodeRef.current.fy = world.y;
    } else if (isDraggingRef.current) {
      transformRef.current.x = sx - dragStartRef.current.x;
      transformRef.current.y = sy - dragStartRef.current.y;
      simulationRef.current?.tick();
    } else {
      const node = getNodeAt(sx, sy);
      setHoveredNode(node);
    }
  };

  const handlePointerUp = () => {
    if (draggedNodeRef.current) {
      draggedNodeRef.current.fx = null;
      draggedNodeRef.current.fy = null;
      draggedNodeRef.current = null;
      simulationRef.current?.alphaTarget(0);
    }
    isDraggingRef.current = false;
  };

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (isTransitioningRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const sx = e.clientX - rect.left;
    const sy = e.clientY - rect.top;
    const node = getNodeAt(sx, sy);
    if (node && node.slug) {
      const slug = node.slug;
      animateCameraToNode(node, () => {
        setActiveProjectId(slug);
      });
    }
  };

  // Touch gesture support for mobile/tablets
  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (e.touches.length === 2) {
      const t1 = e.touches[0];
      const t2 = e.touches[1];
      const dist = Math.hypot(t1.clientX - t2.clientX, t1.clientY - t2.clientY);
      const midX = (t1.clientX + t2.clientX) / 2;
      const midY = (t1.clientY + t2.clientY) / 2;
      touchStartRef.current = { dist, midX, midY };
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (e.touches.length === 2 && touchStartRef.current) {
      const t1 = e.touches[0];
      const t2 = e.touches[1];
      const dist = Math.hypot(t1.clientX - t2.clientX, t1.clientY - t2.clientY);
      const zoomFactor = dist / touchStartRef.current.dist;
      const newK = Math.max(0.4, Math.min(3.0, transformRef.current.k * zoomFactor));

      const rect = e.currentTarget.getBoundingClientRect();
      const sx = touchStartRef.current.midX - rect.left;
      const sy = touchStartRef.current.midY - rect.top;

      transformRef.current.x = sx - (sx - transformRef.current.x) * (newK / transformRef.current.k);
      transformRef.current.y = sy - (sy - transformRef.current.y) * (newK / transformRef.current.k);
      transformRef.current.k = newK;

      touchStartRef.current.dist = dist;
      renderFrameRef.current();
    }
  };

  const handleTouchEnd = () => {
    touchStartRef.current = null;
  };

  const handleWheel = (e: React.WheelEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const zoomFactor = e.deltaY < 0 ? 1.12 : 0.88;
    const newK = Math.max(0.4, Math.min(3.0, transformRef.current.k * zoomFactor));

    const rect = e.currentTarget.getBoundingClientRect();
    const sx = e.clientX - rect.left;
    const sy = e.clientY - rect.top;

    transformRef.current.x = sx - (sx - transformRef.current.x) * (newK / transformRef.current.k);
    transformRef.current.y = sy - (sy - transformRef.current.y) * (newK / transformRef.current.k);
    transformRef.current.k = newK;

    simulationRef.current?.tick();
  };

  const handleZoom = (direction: 'in' | 'out') => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const cx = canvas.clientWidth / 2;
    const cy = canvas.clientHeight / 2;
    const zoomFactor = direction === 'in' ? 1.25 : 0.8;
    const newK = Math.max(0.4, Math.min(3.0, transformRef.current.k * zoomFactor));

    transformRef.current.x = cx - (cx - transformRef.current.x) * (newK / transformRef.current.k);
    transformRef.current.y = cy - (cy - transformRef.current.y) * (newK / transformRef.current.k);
    transformRef.current.k = newK;

    simulationRef.current?.tick();
  };

  const handleResetCamera = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    transformRef.current = {
      x: canvas.clientWidth / 2,
      y: canvas.clientHeight / 2,
      k: 1.1,
    };
    simulationRef.current?.alpha(0.3).restart();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const nextIdx = (focusedNodeIdx + (e.shiftKey ? -1 : 1) + graphData.nodes.length) % graphData.nodes.length;
      setFocusedNodeIdx(nextIdx);
      const node = graphData.nodes[nextIdx];
      setHoveredNode(node);
      if (node.x && node.y && canvasRef.current) {
        transformRef.current.x = canvasRef.current.clientWidth / 2 - node.x * transformRef.current.k;
        transformRef.current.y = canvasRef.current.clientHeight / 2 - node.y * transformRef.current.k;
        simulationRef.current?.tick();
      }
    } else if (e.key === 'Enter' && hoveredNode && hoveredNode.slug) {
      const slug = hoveredNode.slug;
      animateCameraToNode(hoveredNode, () => {
        setActiveProjectId(slug);
      });
    }
  };

  return (
    <div
      id="causal-graph-canvas"
      role="region"
      aria-label="Causal graph — interactive network of projects, technologies, and experiences. Use Tab to cycle nodes, Enter to open."
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className="relative w-full h-[680px] sm:h-[760px] bg-background border-b border-surface-border overflow-hidden select-none outline-none focus:ring-1 focus:ring-primary/40"
    >
      <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#C6FF3D_1px,transparent_1px)] [background-size:28px_28px] pointer-events-none" />

      {/* Graph HUD Controls */}
      <div className="absolute top-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
        <div className="p-3 rounded-xl bg-surface/90 border border-surface-border backdrop-blur-md shadow-lg pointer-events-auto flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-primary" />
            <span className="text-xs font-mono font-bold text-content uppercase tracking-wider">
              Causal Graph
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-3 text-[11px] font-mono border-l border-surface-border pl-3">
            <span className="flex items-center gap-1 text-content">
              <span className="w-2.5 h-2.5 rounded-full bg-primary inline-block" /> Projects
            </span>
            <span className="flex items-center gap-1 text-content">
              <span className="w-2.5 h-2.5 rounded-full bg-signal-orange inline-block" /> Revolt Motors
            </span>
            <span className="flex items-center gap-1 text-content-muted">
              <span className="w-2 h-2 rounded-full bg-white inline-block" /> Skills / Tech
            </span>
          </div>
        </div>

        {/* Group Filter */}
        <div className="p-1 rounded-xl bg-surface/90 border border-surface-border backdrop-blur-md shadow-lg pointer-events-auto flex items-center gap-1">
          {['all', 'project', 'tech', 'experience'].map((group) => (
            <button
              key={group}
              onClick={() => setSelectedGroup(group)}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono capitalize transition-all ${
                selectedGroup === group
                  ? 'bg-primary text-background font-semibold shadow-sm'
                  : 'text-content-muted hover:text-content'
              }`}
            >
              {group === 'project' ? 'Projects' : group === 'tech' ? 'Tech Stack' : group}
            </button>
          ))}
        </div>

        {/* Camera Zoom Controls */}
        <div className="p-1 rounded-xl bg-surface/90 border border-surface-border backdrop-blur-md shadow-lg pointer-events-auto flex items-center gap-1">
          <button
            onClick={() => handleZoom('in')}
            className="p-1.5 rounded-lg text-content-muted hover:text-content hover:bg-surface-subtle transition-colors"
            title="Zoom In"
            aria-label="Zoom in"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleZoom('out')}
            className="p-1.5 rounded-lg text-content-muted hover:text-content hover:bg-surface-subtle transition-colors"
            title="Zoom Out"
            aria-label="Zoom out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={handleResetCamera}
            className="p-1.5 rounded-lg text-content-muted hover:text-content hover:bg-surface-subtle transition-colors"
            title="Reset View"
            aria-label="Reset view"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* HTML5 Canvas */}
      <canvas
        ref={canvasRef}
        role="img"
        aria-label={hoveredNode ? `Focused: ${hoveredNode.label}` : 'Causal relationship graph'}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onClick={handleClick}
        onWheel={handleWheel}
        className="w-full h-full cursor-grab active:cursor-grabbing block touch-none"
      />

      {/* Hover Node Card */}
      {hoveredNode && (
        <div className="absolute bottom-6 left-6 z-20 max-w-xs p-4 rounded-xl bg-surface/95 border border-primary/40 backdrop-blur-md shadow-2xl pointer-events-none font-mono text-xs flex flex-col gap-1.5 animate-in fade-in slide-in-from-bottom-2 duration-150">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[10px] uppercase font-bold text-primary">
              {hoveredNode.group}
            </span>
            {hoveredNode.proofType && hoveredNode.proofType !== 'none' && (
              <span className="px-1.5 py-0.2 rounded bg-primary/20 text-primary text-[9px]">
                Playable Proof
              </span>
            )}
          </div>
          <span className="text-sm font-bold text-content">
            {hoveredNode.label}
          </span>
          {hoveredNode.sublabel && (
            <span className="text-content-muted text-[11px]">
              {hoveredNode.sublabel}
            </span>
          )}
          <span className="text-[10px] text-content-faint pt-1 border-t border-surface-border">
            {hoveredNode.group === 'project'
              ? 'Click node to fly in & open case study'
              : 'Hovering highlights connected projects'}
          </span>
        </div>
      )}

      {/* Keyboard & Controls Guide */}
      <div className="absolute bottom-4 right-4 z-10 hidden sm:flex items-center gap-2 text-[11px] font-mono text-content-faint pointer-events-none">
        <span>Scroll / Pinch to Zoom</span>
        <span>•</span>
        <span>Drag to Pan</span>
        <span>•</span>
        <span>Tab to Cycle</span>
        <span>•</span>
        <span>Click to Open</span>
      </div>
    </div>
  );
};
