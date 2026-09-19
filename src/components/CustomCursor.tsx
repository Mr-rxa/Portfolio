import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [label, setLabel] = useState<string>('');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only enable on pointer fine devices (desktop)
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      if (target.closest('#causal-graph-canvas')) {
        setLabel('EXPLORE');
      } else if (target.closest('article') || target.closest('button')) {
        setLabel('OPEN');
      } else if (target.closest('input[type="range"]')) {
        setLabel('ADJUST');
      } else {
        setLabel('');
      }
    };

    const handleMouseLeave = () => setVisible(false);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      style={{
        transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
      }}
      className="fixed top-0 left-0 pointer-events-none z-50 -ml-3 -mt-3 flex items-center gap-2 transition-transform duration-75 ease-out"
    >
      <div className="w-6 h-6 rounded-full border border-[#C6FF3D] bg-[#C6FF3D]/20 backdrop-blur-xs flex items-center justify-center">
        <div className="w-1.5 h-1.5 rounded-full bg-[#C6FF3D]" />
      </div>

      {label && (
        <span className="px-2 py-0.5 rounded bg-[#12141A] border border-[#232730] text-[9px] font-mono font-bold text-[#C6FF3D] shadow-lg uppercase tracking-wider">
          {label}
        </span>
      )}
    </div>
  );
};
