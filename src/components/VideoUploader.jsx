import React from 'react';
import { Video, Play, Pause, Clock, Eye, EyeOff } from 'lucide-react';
import BoundingBoxOverlay from './BoundingBoxOverlay';

export default function VideoUploader({
  isPlaying,
  setIsPlaying,
  currentTime,
  setCurrentTime,
  playbackSpeed,
  setPlaybackSpeed,
  totalDuration,
  privacyMode,
  setPrivacyMode,
  activeBox,
  detections,
  chainOfCustody,
  speakText,
  triggerToast
}) {
  // Helper to format seconds to MM:SS
  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return [minutes, seconds]
      .map(v => v.toString().padStart(2, '0'))
      .join(':');
  };

  return (
    <div className="lg:col-span-6 space-y-4 flex flex-col justify-start">
      {/* Main Video simulated container */}
      <div className="relative w-full aspect-video bg-[#0B0C10] border border-[#1E1F2A] rounded-[8px] overflow-hidden flex flex-col justify-between shadow-2xl group">
        {/* Scanlines layer */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.08] bg-repeat" style={{ backgroundImage: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.4) 50%)', backgroundSize: '100% 4px' }} />
        
        {/* Bounding Box Overlay */}
        <BoundingBoxOverlay detections={activeBox ? [activeBox] : []} />

        {/* Privacy blurring overlay */}
        {privacyMode && (
          <div className="absolute inset-0 bg-[#0B0C10]/40 backdrop-blur-md z-10 pointer-events-none flex items-center justify-center">
            <span className="px-3 py-1.5 bg-[#15161D] border border-[#00C853] text-[#00C853] text-[10px] font-mono font-bold rounded-[6px]">
              🔒 PRIVACY MASKING ACTIVE (ETHICAL AI BLUR)
            </span>
          </div>
        )}

        {/* Top Feed InfoHUD */}
        <div className="p-3 bg-gradient-to-b from-black/80 to-transparent flex items-center justify-between text-[11px] font-mono text-white z-20">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF1744] animate-pulse" />
            <span className="font-bold">CCTV FEED: Kochi Sector 4 Junction</span>
          </div>
          <span>GPS: 10.0159° N, 76.3419° E</span>
        </div>

        {/* Simulated Center Area */}
        <div className="flex-1 flex items-center justify-center">
          <span className="text-[#8A8B9A] text-sm uppercase tracking-widest font-mono font-bold select-none opacity-40">
            {activeBox ? `ACTIVE DETECT: ${activeBox.camera}` : "CCTV VIDEO STREAMING"}
          </span>
        </div>

        {/* Bottom HUD */}
        <div className="p-3 bg-gradient-to-t from-black/80 to-transparent flex items-center justify-between text-[10px] font-mono text-[#8A8B9A] z-20">
          <span>H.264 SOURCE DIRECT</span>
          <span>1080p FULL HD • 30.00 FPS</span>
        </div>
      </div>

      {/* Timeline & Player Controls */}
      <div className="bg-[#15161D] border border-[#1E1F2A] rounded-[8px] p-4 space-y-3 shadow-md">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-8 h-8 rounded-[8px] bg-[#1E1F2A] border border-[#1E1F2A] hover:border-[#FF6B35] flex items-center justify-center text-white transition-colors"
            >
              {isPlaying ? <Pause className="w-4 h-4 text-[#FF6B35]" /> : <Play className="w-4 h-4 text-white ml-0.5" />}
            </button>

            {/* Speed Controls */}
            <div className="flex bg-[#0B0C10] rounded-[6px] p-0.5 border border-[#1E1F2A] text-[9px] font-mono font-bold">
              {[1, 2, 5].map(s => (
                <button
                  key={s}
                  onClick={() => setPlaybackSpeed(s)}
                  className={`px-2 py-1 rounded-[4px] transition-colors ${
                    playbackSpeed === s ? 'bg-[#FF6B35] text-[#0B0C10]' : 'text-[#8A8B9A] hover:text-white'
                  }`}
                >
                  {s}x
                </button>
              ))}
            </div>
          </div>

          {/* Time display */}
          <div className="font-mono text-white text-[12px] tracking-wide flex items-center space-x-1.5">
            <Clock className="w-3.5 h-3.5 text-[#FF6B35]" />
            <span>{formatTime(currentTime)}</span>
            <span className="text-[#8A8B9A]">/</span>
            <span className="text-[#8A8B9A]">{formatTime(totalDuration)}</span>
          </div>
        </div>

        {/* Custom scrubber slider with colored markers */}
        <div className="relative w-full h-5 flex items-center">
          <input
            type="range"
            min={0}
            max={totalDuration}
            value={currentTime}
            onChange={(e) => {
              setCurrentTime(Number(e.target.value));
              setIsPlaying(false);
            }}
            className="w-full h-1.5 bg-[#0B0C10] rounded-lg appearance-none cursor-pointer accent-[#FF6B35] z-10"
          />

          {/* Green/Red Tick marks */}
          <div className="absolute inset-x-0 h-1.5 pointer-events-none flex items-center">
            {detections.map(det => {
              const offsetPercent = (det.seconds / totalDuration) * 100;
              return (
                <div 
                  key={det.id}
                  style={{ left: `${offsetPercent}%` }}
                  className={`absolute w-1.5 h-3 transform -translate-x-1/2 rounded-full ${
                    det.type === 'VICTIM' ? 'bg-[#00C853]' : 'bg-[#FF1744]'
                  }`}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* Privacy Toggle Section */}
      <div className="bg-[#15161D] border border-[#1E1F2A] rounded-[8px] p-4 flex items-center justify-between shadow-md">
        <div className="flex items-center space-x-2">
          {privacyMode ? <EyeOff className="w-4 h-4 text-[#00C853]" /> : <Eye className="w-4 h-4 text-[#8A8B9A]" />}
          <div>
            <span className="text-white text-xs font-bold block">Privacy Blurring</span>
            <span className="text-[#8A8B9A] text-[9px] font-mono">Blur non-targets automatically</span>
          </div>
        </div>
        <button
          onClick={() => {
            setPrivacyMode(!privacyMode);
            speakText(privacyMode ? "Privacy masking mode deactivated." : "Privacy masking active. Ethical AI filters applied.");
          }}
          className={`w-10 h-5 rounded-full p-0.5 transition-colors duration-200 outline-none ${
            privacyMode ? 'bg-[#00C853]' : 'bg-[#1E1F2A]'
          }`}
        >
          <div className={`bg-[#0B0C10] w-4 h-4 rounded-full shadow-md transform duration-200 ${
            privacyMode ? 'translate-x-5' : 'translate-x-0'
          }`} />
        </button>
      </div>

      {/* Chain of custody horizontal strip */}
      <div className="bg-[#15161D] border border-[#1E1F2A] rounded-[8px] p-4 flex items-center justify-between shadow-md">
        <div className="flex items-center space-x-3 flex-1 min-w-0">
          <span className="text-[10px] font-mono uppercase text-[#8A8B9A] tracking-wider block font-extrabold flex-shrink-0">CHAIN HASHES</span>
          <div className="flex space-x-4 text-[10px] font-mono truncate flex-grow">
            {chainOfCustody.map(item => (
              <div key={item.frame} className="truncate">
                <span className="text-[#FF6B35] font-bold">FRM {item.frame}:</span>
                <span className="text-white ml-1">{item.hash}</span>
              </div>
            ))}
          </div>
        </div>
        <a 
          href="#coc" 
          onClick={(e) => {
            e.preventDefault();
            triggerToast("✓ Integrity Audit: Block hashes fully matched.", "victim");
          }}
          className="text-[#FF6B35] text-[10px] font-mono hover:underline ml-3 uppercase font-extrabold flex-shrink-0"
        >
          VIEW FULL
        </a>
      </div>
    </div>
  );
}
