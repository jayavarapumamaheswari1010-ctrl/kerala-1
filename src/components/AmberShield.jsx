import React, { useState, useEffect } from 'react';

export default function AmberShield({ onClose, isAmberShieldActive, setIsAmberShieldActive }) {
  const [timeLeft, setTimeLeft] = useState(272);
  const [deployed, setDeployed] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleClose = () => {
    if (onClose) onClose();
    if (setIsAmberShieldActive) setIsAmberShieldActive(false);
  };

  if (isAmberShieldActive === false) return null;

  const formatTime = (s) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  const speak = (text) => {
    const u = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(u);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="w-[700px] bg-[#0B0C10] border border-[#FF1744] rounded-lg overflow-hidden animate-pulse-red">
        
        {/* Header */}
        <div className="bg-[#FF1744]/10 border-b border-[#FF1744]/30 p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-[#FF1744] rounded-full animate-ping"></div>
            <h2 className="text-[#FF1744] font-bold text-lg tracking-wider">🔴 AMBER SHIELD ACTIVATED</h2>
          </div>
          <button onClick={handleClose} className="text-[#8A8B9A] hover:text-white">✕</button>
        </div>

        {/* Body */}
        <div className="p-6 grid grid-cols-2 gap-6">
          
          {/* Countdown */}
          <div className="col-span-2 text-center">
            <p className="text-[#8A8B9A] text-xs uppercase tracking-widest mb-2">Time to Contact</p>
            <div className="text-6xl font-mono font-bold text-white">{formatTime(timeLeft)}</div>
            <p className="text-[#FF1744] text-sm mt-2">Suspect trajectory intersects victim proximity zone</p>
          </div>

          {/* Map Placeholder */}
          <div className="h-40 bg-[#15161D] rounded border border-[#1E1F2A] relative flex items-center justify-center">
            <div className="absolute w-24 h-24 border-2 border-[#00C853]/30 rounded-full animate-ping"></div>
            <div className="absolute w-4 h-4 bg-[#FF1744] rounded-full"></div>
            <span className="text-[#8A8B9A] text-xs">Live Map — Victim Safe Zone Shrinking</span>
          </div>

          {/* Interception */}
          <div className="space-y-2">
            <p className="text-xs uppercase text-[#8A8B9A] tracking-wider">Nearest Units</p>
            <div className="p-2 bg-[#15161D] border border-[#00C853] rounded">
              <div className="flex justify-between items-center">
                <span className="text-sm text-white">SI Kumar</span>
                <span className="text-xs text-[#00C853]">⭐ RECOMMENDED</span>
              </div>
              <p className="text-xs text-[#8A8B9A]">1.8km — ETA {formatTime(Math.max(0, timeLeft - 52))}</p>
            </div>
            <div className="p-2 bg-[#15161D] border border-[#1E1F2A] rounded opacity-60">
              <p className="text-sm text-white">Beat Officer Ravi</p>
              <p className="text-xs text-[#8A8B9A]">2.1km — ETA {formatTime(Math.max(0, timeLeft - 27))}</p>
            </div>
          </div>

          {/* Actions */}
          <div className="col-span-2 flex gap-3">
            <button 
              onClick={() => { setDeployed(true); speak("Patrol deployed. ETA 3 minutes 20 seconds."); }}
              className={`flex-1 py-3 rounded font-bold uppercase tracking-wider ${
                deployed ? 'bg-[#00C853] text-black' : 'bg-[#FF1744] text-white animate-pulse'
              }`}
            >
              {deployed ? '✓ PATROL DEPLOYED' : '🚨 DEPLOY NEAREST PATROL'}
            </button>
            <button 
              onClick={() => speak("Victim family alerted.")}
              className="px-4 py-3 border border-[#FF6B35] text-[#FF6B35] rounded font-bold uppercase text-sm"
            >
              Alert Family
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
