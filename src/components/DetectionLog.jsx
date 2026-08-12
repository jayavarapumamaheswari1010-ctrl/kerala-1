import React from 'react';

export default function DetectionLog({ logs = [], onJump, currentTime = 0, detections, setCurrentTime }) {
  const displayLogs = logs && logs.length > 0 ? logs : (detections || []);
  const handleJump = onJump || setCurrentTime || (() => {});

  return (
    <div className="flex-1 overflow-hidden flex flex-col">
      <h3 className="text-xs uppercase tracking-wider text-[#8A8B9A] mb-3">Detection Log</h3>
      <div className="flex-1 overflow-y-auto space-y-2 pr-1">
        {displayLogs.length === 0 ? (
          <p className="text-[#8A8B9A] text-xs">No detections yet...</p>
        ) : (
          displayLogs.map(log => {
            const isActive = Math.abs(log.seconds - currentTime) < 1;
            return (
              <div
                key={log.id}
                onClick={() => handleJump(log.seconds)}
                className={`p-2 rounded cursor-pointer transition-all ${
                  isActive ? 'bg-[#1E1F2A] border-l-2 border-[#FF6B35]' : 'bg-[#15161D] border-l-2 border-transparent hover:border-[#2A2A2A]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <div className={`w-1.5 h-1.5 rounded-full ${
                    log.type === 'VICTIM' ? 'bg-[#00C853]' : 'bg-[#FF1744]'
                  }`}></div>
                  <span className="text-xs font-mono text-white">{log.time}</span>
                </div>
                <p className="text-[10px] text-[#8A8B9A] mt-0.5">{log.type} — {log.camera}</p>
                {log.behavior && (
                  <p className="text-[10px] text-[#FF6B35]">⚠️ {log.behavior}</p>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
