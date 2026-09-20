import React, { useState, useEffect } from 'react';

export const BootSequence: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [logs, setLogs] = useState<string[]>([]);
  const [progress, setProgress] = useState<number>(0);

  const bootMessages = [
    '[0.001] BIOS: Rahul Sharma Causal Kernel v2.4.0',
    '[0.045] MOUNT: Ingesting Revolt Motors telematics stream',
    '[0.120] INIT: Loading force-directed causal DAG (6 nodes, 35 edges)',
    '[0.240] CALIBRATE: Real-time decision & causal telemetry engine online',
    '[0.380] READY: System initialized. Launching portfolio.',
  ];

  useEffect(() => {
    if (sessionStorage.getItem('rs_booted')) {
      onComplete();
      return;
    }

    let current = 0;
    const interval = setInterval(() => {
      if (current < bootMessages.length) {
        setLogs((prev) => [...prev, bootMessages[current]]);
        setProgress(Math.round(((current + 1) / bootMessages.length) * 100));
        current++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          sessionStorage.setItem('rs_booted', 'true');
          onComplete();
        }, 300);
      }
    }, 240);

    return () => clearInterval(interval);
  }, [onComplete]);

  const handleSkip = () => {
    sessionStorage.setItem('rs_booted', 'true');
    onComplete();
  };

  return (
    <div
      onClick={handleSkip}
      className="fixed inset-0 z-50 bg-[#0A0B0D] text-[#EDEAE3] flex flex-col items-center justify-center p-6 font-mono text-xs cursor-pointer select-none"
    >
      <div className="w-full max-w-md flex flex-col gap-5 p-6 rounded-2xl bg-[#12141A] border border-[#232730] shadow-2xl">
        <div className="flex items-center justify-between border-b border-[#232730] pb-3 text-content-muted">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#C6FF3D] animate-pulse" />
            <span className="font-bold text-white">rs@system: boot</span>
          </div>
          <span className="text-[10px] text-content-faint">Click or press key to skip</span>
        </div>

        <div className="flex flex-col gap-1.5 h-36 overflow-hidden">
          {logs.map((log, idx) => (
            <div key={idx} className="text-[#8E95A5] leading-relaxed">
              <span className="text-[#C6FF3D] mr-2">›</span>
              {log}
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-1.5 pt-2 border-t border-[#232730]">
          <div className="flex justify-between text-[11px] text-[#8E95A5]">
            <span>Kernel Booting</span>
            <span className="text-[#C6FF3D] font-bold">{progress}%</span>
          </div>
          <div className="w-full h-1.5 bg-[#0A0B0D] rounded-full overflow-hidden">
            <div
              style={{ width: `${progress}%` }}
              className="h-full bg-[#C6FF3D] rounded-full transition-all duration-200"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
