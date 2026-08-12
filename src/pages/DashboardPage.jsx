import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Shield, 
  X, 
  FileText, 
  Video, 
  Volume2, 
  VolumeX, 
  Clock, 
  Bell, 
  Download,
  Eye,
  EyeOff
} from 'lucide-react';
import { mockDetections, amberShieldData } from '../data/mockDetections';
import VideoUploader from '../components/VideoUploader';
import DetectionLog from '../components/DetectionLog';
import AmberShield from '../components/AmberShield';

const mockData = {
  victim: { name: "Victim A", age: 14, lastSeen: "09:45 AM — School Gate", photo: "https://placehold.co/120x120/1E1F2A/FFFFFF?text=V" },
  suspect: { name: "Suspect X", alias: "Shadow_07", photo: "https://placehold.co/120x120/1E1F2A/FF6B35?text=S" },
  chainOfCustody: [
    { frame: 4847, hash: "a3f7d9e2c8b1...", timestamp: "2026-08-11T14:32:11Z", officer: "SI Kumar", badge: "KP-4421", status: "VERIFIED" },
    { frame: 4848, hash: "b4e8f0d3a9c2...", timestamp: "2026-08-11T14:32:13Z", officer: "Auto-Node", badge: "SYS-01", status: "VERIFIED" }
  ]
};

export default function DashboardPage() {
  const navigate = useNavigate();

  // Video State
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const totalDuration = 30; // 30 seconds
  const [privacyMode, setPrivacyMode] = useState(false);
  
  // Modals & Overlays
  const [isAmberShieldActive, setIsAmberShieldActive] = useState(false);
  const [amberShieldCountdown, setAmberShieldCountdown] = useState(272);
  const [familyAlertSent, setFamilyAlertSent] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  
  // Interactive logs / Speech alert references
  const [triggeredAlerts, setTriggeredAlerts] = useState(new Set());
  const [toasts, setToasts] = useState([]);
  const [voiceEnabled, setVoiceEnabled] = useState(true);

  // Audio helper using Web Speech API
  const speakText = (text) => {
    if (voiceEnabled && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.05;
      utterance.pitch = 0.95;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Helper to format seconds to MM:SS
  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return [minutes, seconds]
      .map(v => v.toString().padStart(2, '0'))
      .join(':');
  };

  // Add toast alert
  const triggerToast = (text, type) => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, text, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  // Timeline playback ticking
  useEffect(() => {
    let interval = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= totalDuration) {
            setIsPlaying(false);
            return 0;
          }
          return Math.min(prev + playbackSpeed, totalDuration);
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, playbackSpeed]);

  // Check and trigger detections based on current time
  useEffect(() => {
    mockDetections.forEach(det => {
      if (currentTime >= det.seconds && !triggeredAlerts.has(det.id)) {
        setTriggeredAlerts(prev => new Set([...prev, det.id]));

        if (det.type === 'VICTIM') {
          speakText(`Victim detected at camera ${det.camera.replace('CAM-', '')}, timestamp ${det.time}.`);
          triggerToast(`🟢 VICTIM DETECTED — ${det.time} — Confidence ${det.confidence}%`, 'victim');
        } else if (det.type === 'SUSPECT') {
          speakText("Suspect detected. Caution advised.");
          triggerToast(`🔴 SUSPECT DETECTED — ${det.time} — HIGH PRIORITY`, 'suspect');
          
          // Auto-trigger Amber Shield at suspect detection timestamp (18 seconds)
          if (det.id === 3) {
            setTimeout(() => {
              setIsAmberShieldActive(true);
              speakText("Amber Shield activated. Suspect approaching victim location. Interception required.");
            }, 1000);
          }
        }
      }
    });

    // Reset alert triggers if playhead is scrubbed back
    const newTriggered = new Set();
    mockDetections.forEach(det => {
      if (currentTime >= det.seconds) {
        newTriggered.add(det.id);
      }
    });
    if (newTriggered.size < triggeredAlerts.size) {
      setTriggeredAlerts(newTriggered);
    }
  }, [currentTime]);

  const activeBox = mockDetections.find(det => 
    currentTime >= det.seconds && currentTime <= det.seconds + 2
  );

  // Map progress calculation (0% to 100% along the path)
  const getSuspectMapPosition = () => {
    const pts = [
      { camera: "CAM-01", x: 20, y: 55 },
      { camera: "CAM-03", x: 45, y: 45 },
      { camera: "CAM-12", x: 85, y: 50 }
    ];
    if (currentTime < 5) {
      return { x: pts[0].x, y: pts[0].y };
    }
    if (currentTime >= 18) {
      return { x: pts[2].x, y: pts[2].y };
    }
    
    // Segment 1: C1 to C3
    if (currentTime >= 5 && currentTime < 12) {
      const ratio = (currentTime - 5) / (12 - 5);
      return {
        x: pts[0].x + ratio * (pts[1].x - pts[0].x),
        y: pts[0].y + ratio * (pts[1].y - pts[0].y)
      };
    }
    // Segment 2: C3 to C12
    if (currentTime >= 12 && currentTime < 18) {
      const ratio = (currentTime - 12) / (18 - 12);
      return {
        x: pts[1].x + ratio * (pts[2].x - pts[1].x),
        y: pts[1].y + ratio * (pts[2].y - pts[1].y)
      };
    }
    return { x: pts[0].x, y: pts[0].y };
  };

  const suspectPos = getSuspectMapPosition();

  const handleGenerateReport = () => {
    setIsReportOpen(true);
  };

  const triggerMockPdfDownload = () => {
    setIsGeneratingPdf(true);
    setTimeout(() => {
      setIsGeneratingPdf(false);
      triggerToast("✓ FIR Annexure PDF Downloaded successfully", "victim");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#0B0C10] text-white flex flex-col font-sans select-none pb-14">
      {/* 64px Top bar */}
      <header className="h-[64px] border-b border-[#1E1F2A] bg-[#15161D] px-6 flex items-center justify-between z-40 select-none">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-[8px] bg-[#1E1F2A] border border-[#FF6B35] flex items-center justify-center overflow-hidden">
            <img src="/sentinel_logo.png" alt="FORENSIC AI Logo" className="w-full h-full object-cover animate-eye-blink" />
          </div>
          <span className="text-white font-extrabold text-[18px] tracking-tight font-sans">FORENSIC AI</span>
        </div>

        {/* Navigation Tabs */}
        <nav className="hidden md:flex space-x-6 h-full items-center text-xs font-semibold tracking-wider uppercase">
          <span className="text-white border-b-2 border-[#FF6B35] h-full flex items-center px-1 cursor-default">Dashboard</span>
          <span className="text-[#8A8B9A] hover:text-white transition-colors cursor-pointer" onClick={() => triggerToast("Evidence Vault module requires master access", "suspect")}>Evidence</span>
          <span className="text-[#8A8B9A] hover:text-white transition-colors cursor-pointer" onClick={() => triggerToast("Biometric Analyzer module requires master access", "suspect")}>Analysis</span>
          <span className="text-[#8A8B9A] hover:text-white transition-colors cursor-pointer" onClick={() => setIsReportOpen(true)}>Reports</span>
        </nav>

        {/* Right side status items */}
        <div className="flex items-center space-x-4">
          <div 
            onClick={() => {
              setIsAmberShieldActive(true);
              speakText("Amber Shield activated. Suspect approaching victim location. Interception required.");
            }}
            className="px-3 py-1 bg-[#1E1F2A] border border-[#1E1F2A] hover:border-[#FF1744] rounded-[8px] flex items-center space-x-2 cursor-pointer transition-all active:scale-95"
          >
            <span className={`w-2 h-2 rounded-full ${isAmberShieldActive ? 'bg-[#FF1744] animate-ping' : 'bg-[#00C853] animate-pulse'}`} />
            <span className="text-white text-[10px] font-mono font-bold tracking-wider uppercase">
              AMBER SHIELD: {isAmberShieldActive ? "ALERT" : "STANDBY"}
            </span>
          </div>

          {/* Voice Speech toggle */}
          <button 
            onClick={() => {
              setVoiceEnabled(!voiceEnabled);
              triggerToast(voiceEnabled ? "Voice Speech Alerts Muted" : "Voice Speech Alerts Active", "victim");
            }}
            className="p-1.5 bg-[#1E1F2A] hover:bg-[#2A2C3C] text-white rounded-[8px] transition-colors"
          >
            {voiceEnabled ? <Volume2 className="w-4 h-4 text-[#FF6B35]" /> : <VolumeX className="w-4 h-4 text-[#8A8B9A]" />}
          </button>

          <button 
            onClick={handleGenerateReport}
            className="bg-[#FF6B35] hover:bg-[#E85A24] text-[#0B0C10] text-[11px] font-extrabold uppercase tracking-wider py-1.5 px-3 rounded-[8px] transition-colors"
          >
            GENERATE REPORT
          </button>

          <div className="relative">
            <Bell className="w-4.5 h-4.5 text-[#8A8B9A] cursor-pointer hover:text-white" />
            <span className="absolute top-0 right-0 w-1.5 h-1.5 bg-[#FF6B35] rounded-full" />
          </div>

          <div className="w-8 h-8 rounded-[8px] bg-[#1E1F2A] border border-[#1E1F2A] flex items-center justify-center text-white text-xs font-bold font-mono">
            KP
          </div>
        </div>
      </header>

      {/* Main Grid Content */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-5 p-5 max-w-[1700px] mx-auto w-full items-stretch">
        
        {/* LEFT COLUMN: TARGET PROFILES & DETECTIONS LOG */}
        <div className="lg:col-span-3 space-y-4 flex flex-col justify-start">
          {/* Target Profiles Section */}
          <div className="bg-[#15161D] border border-[#1E1F2A] rounded-[8px] p-4 space-y-3 shadow-md">
            <span className="text-[10px] font-mono uppercase text-[#8A8B9A] tracking-widest block font-extrabold">TARGET PROFILES</span>
            
            {/* Victim Profile Card */}
            <div className="flex items-center space-x-3 p-2 bg-[#1E1F2A] rounded-[8px] border border-[#1E1F2A]">
              <img src={mockData.victim.photo} alt="Victim" className="w-10 h-10 rounded-[6px] object-cover bg-[#0B0C10]" />
              <div className="flex-1 min-w-0">
                <span className="text-white text-xs font-bold block truncate">{mockData.victim.name}</span>
                <span className="text-[#8A8B9A] text-[10px] block">Age: {mockData.victim.age} • Active</span>
              </div>
              <span className="w-2 h-2 rounded-full bg-[#00C853] flex-shrink-0 animate-pulse" title="Profile Active" />
            </div>

            {/* Suspect Profile Card */}
            <div className="flex items-center space-x-3 p-2 bg-[#1E1F2A] rounded-[8px] border border-[#1E1F2A] relative">
              <img src={mockData.suspect.photo} alt="Suspect" className="w-10 h-10 rounded-[6px] object-cover bg-[#0B0C10]" />
              <div className="flex-1 min-w-0">
                <span className="text-white text-xs font-bold block truncate">{mockData.suspect.name}</span>
                <span className="text-[#FF6B35] text-[10px] font-mono block">Alias: {mockData.suspect.alias}</span>
              </div>
              <span className="w-2 h-2 rounded-full bg-[#FF1744] flex-shrink-0 animate-pulse" title="Wanted Status" />
            </div>
          </div>

          {/* Detection Log Card */}
          <div className="bg-[#15161D] border border-[#1E1F2A] rounded-[8px] p-4 flex-1 flex flex-col justify-between shadow-md min-h-[300px]">
            <DetectionLog
              logs={mockDetections}
              onJump={(sec) => {
                setCurrentTime(sec);
                setIsPlaying(false);
              }}
              currentTime={currentTime}
            />
            <div className="pt-2 border-t border-[#1E1F2A] text-[9px] font-mono text-[#8A8B9A] flex justify-between mt-2">
              <span>FACENET MATRIX</span>
              <span className="text-[#00C853]">AUTO-SYNCED</span>
            </div>
          </div>
        </div>

        {/* CENTER COLUMN: VIDEO CANVAS VIEWPORT & TIMELINE CONTROLS */}
        <VideoUploader
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          currentTime={currentTime}
          setCurrentTime={setCurrentTime}
          playbackSpeed={playbackSpeed}
          setPlaybackSpeed={setPlaybackSpeed}
          totalDuration={totalDuration}
          privacyMode={privacyMode}
          setPrivacyMode={setPrivacyMode}
          activeBox={activeBox}
          detections={mockDetections}
          chainOfCustody={mockData.chainOfCustody}
          speakText={speakText}
          triggerToast={triggerToast}
        />

        {/* RIGHT COLUMN: CROSS-CAMERA TRAJECTORY MAP & PRIVACY TOGGLE (320px Equivalent) */}
        <div className="lg:col-span-3 space-y-4 flex flex-col justify-start">
          
          {/* Tracking Map Card */}
          <div className="bg-[#15161D] border border-[#1E1F2A] rounded-[8px] p-4 space-y-3 shadow-md flex-1 flex flex-col justify-between min-h-[350px]">
            <div>
              <span className="text-[10px] font-mono uppercase text-[#8A8B9A] tracking-widest block font-extrabold mb-2">CROSS-CAMERA TRACKING</span>
              
              {/* Map Canvas viewport */}
              <div className="relative w-full h-[220px] bg-[#0B0C10] border border-[#1E1F2A] rounded-[8px] overflow-hidden">
                <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#1E1F2A_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
                
                {/* SVG vector path lines connecting nodes */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  {/* Outer trajectory outline */}
                  <polyline 
                    points="45,121 101,99 191,110" 
                    fill="none" 
                    stroke="#FF6B35" 
                    strokeWidth="2" 
                    strokeDasharray="4,4"
                  />
                  {/* Complete solid link */}
                  <polyline 
                    points="45,121 101,99 191,110" 
                    fill="none" 
                    stroke="#FF6B35" 
                    strokeWidth="1.5" 
                    opacity="0.3"
                  />
                </svg>

                {/* Path Camera nodes */}
                {[
                  { camera: "CAM-01", time: "00:05", x: 20, y: 55 },
                  { camera: "CAM-03", time: "00:12", x: 45, y: 45 },
                  { camera: "CAM-12", time: "00:18", x: 85, y: 50 }
                ].map((node) => (
                  <div 
                    key={node.camera}
                    style={{ left: `${node.x}%`, top: `${node.y}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 z-10 group"
                  >
                    <div className="w-5 h-5 rounded-full bg-[#15161D] border border-[#FF6B35] flex items-center justify-center text-[8px] font-mono text-[#FF6B35] font-extrabold shadow">
                      C{node.camera.replace('CAM-', '')}
                    </div>
                    <span className="absolute hidden group-hover:block bg-[#15161D] text-white text-[8px] font-mono rounded px-1.5 py-0.5 border border-[#1E1F2A] -bottom-6 left-1/2 -translate-x-1/2 z-20 whitespace-nowrap shadow-md">
                      {node.camera} • {node.time}
                    </span>
                  </div>
                ))}

                {/* Victim Proximity point */}
                <div className="absolute left-[85%] top-[50%] -translate-x-1/2 -translate-y-1/2 z-20">
                  <span className="w-3.5 h-3.5 rounded-full border-2 border-white bg-[#00C853] block animate-pulse" title="Victim Last Location" />
                </div>

                {/* Animated Suspect tracker indicator dot */}
                <div 
                  style={{ left: `${suspectPos.x}%`, top: `${suspectPos.y}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-30 transition-all duration-300 pointer-events-none"
                >
                  <span className="w-3 h-3 rounded-full bg-[#FF1744] border border-white block animate-ping" />
                  <span className="w-2 h-2 rounded-full bg-[#FF1744] border border-white block absolute top-0.5 left-0.5" />
                </div>
              </div>
            </div>

            {/* Telemetry info row */}
            <div className="p-2.5 bg-[#0B0C10] border border-[#1E1F2A] rounded-[8px] text-[10px] font-mono text-[#8A8B9A] space-y-1 mt-3">
              <div className="flex justify-between">
                <span>ESTIMATED DURATION:</span>
                <span className="text-white font-bold">{formatTime(totalDuration)}</span>
              </div>
              <div className="flex justify-between">
                <span>ACTIVE CAMERA:</span>
                <span className="text-[#FF6B35] font-bold">
                  {currentTime < 5 ? "CAM-01" : currentTime < 12 ? "CAM-03 (Active)" : "CAM-12"}
                </span>
              </div>
            </div>
          </div>

          {/* Camera List */}
          <div className="bg-[#15161D] border border-[#1E1F2A] rounded-[8px] p-4 space-y-2.5 shadow-md">
            <span className="text-[10px] font-mono uppercase text-[#8A8B9A] tracking-widest block font-extrabold">CAMERA CHANNELS</span>
            <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
              {['CAM-01', 'CAM-03', 'CAM-12'].map(cam => {
                const isActive = (cam === 'CAM-03' && currentTime >= 5 && currentTime <= 12) || 
                                 (cam === 'CAM-12' && currentTime > 12 && currentTime <= 18);
                return (
                  <div 
                    key={cam}
                    onClick={() => triggerToast(`Connecting to remote live link of ${cam}...`, 'victim')}
                    className={`p-2 rounded-[6px] border text-center transition-all cursor-pointer ${
                      isActive 
                        ? 'border-[#FF6B35] bg-[#FF6B35]/10 text-white font-bold shadow-[0_0_10px_rgba(255,107,53,0.1)]' 
                        : 'border-[#1E1F2A] bg-[#0B0C10] text-[#8A8B9A] hover:border-[#FF6B35]/30'
                    }`}
                  >
                    {cam} {isActive ? "• ON AIR" : ""}
                  </div>
                );
              })}
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
        </div>
      </div>


      {/* ========================================================================= */}
      {/* AUTO-FIR REPORT MODAL                                                     */}
      {/* ========================================================================= */}
      {isReportOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs select-none">
          <div className="relative w-full max-w-3xl bg-[#15161D] border border-[#1E1F2A] rounded-[8px] shadow-2xl p-6 overflow-y-auto max-h-[92vh] flex flex-col justify-between font-sans">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-[#1E1F2A]">
                <div className="flex items-center space-x-3.5">
                  <div className="w-10 h-10 rounded-[8px] bg-[#1E1F2A] border border-[#FF6B35] flex items-center justify-center text-xs">
                    🛡️
                  </div>
                  <div>
                    <h3 className="text-white font-extrabold text-base tracking-wide font-sans">
                      FIR ANNEXURE — DIGITAL EVIDENCE SUMMARY
                    </h3>
                    <p className="text-[#8A8B9A] text-xs font-mono">
                      Kerala Police Cyberdome • Case Tracking Module
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsReportOpen(false)}
                  className="w-8 h-8 rounded-[8px] bg-[#1E1F2A] text-[#8A8B9A] hover:text-white flex items-center justify-center transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Document Metadata details */}
              <div className="grid grid-cols-2 gap-4 py-4 border-b border-[#1E1F2A] text-xs font-mono text-[#8A8B9A]">
                <div>
                  <div>CASE ID Ref: <strong className="text-white">KP-2026-0812</strong></div>
                  <div>INVESTIGATING OFFICER: <strong className="text-white">SI Kumar</strong></div>
                </div>
                <div className="text-right">
                  <div>DATE OF REPORT: <strong className="text-white">2026-08-12</strong></div>
                  <div>BADGE: <strong className="text-white">KP-4421</strong></div>
                </div>
              </div>

              {/* Table */}
              <div className="py-4">
                <span className="text-[10px] font-mono uppercase text-[#8A8B9A] tracking-wider block font-extrabold mb-2.5">INTELLIGENCE LOG matrix</span>
                <table className="w-full text-left text-xs font-mono">
                  <thead>
                    <tr className="border-b border-[#1E1F2A] text-[#8A8B9A]">
                      <th className="pb-2">TIME</th>
                      <th className="pb-2">CAMERA</th>
                      <th className="pb-2">EVENT</th>
                      <th className="pb-2 text-center">CONFIDENCE</th>
                      <th className="pb-2 text-right">HASH</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockDetections.map((det) => (
                      <tr key={det.id} className="border-b border-[#1E1F2A]/30 text-white">
                        <td className="py-2.5">{det.time}</td>
                        <td className="py-2.5 text-[#FF6B35]">{det.camera}</td>
                        <td className="py-2.5">{det.type} {det.behavior ? `(${det.behavior})` : ""}</td>
                        <td className="py-2.5 text-center font-bold">{det.confidence}%</td>
                        <td className="py-2.5 text-right text-gray-500 font-mono text-[10px]">
                          {det.type === 'VICTIM' ? "a3f7d9e2..." : "b4e8f0d3..."}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Frame thumbnail strip placeholder */}
              <div className="py-4 border-t border-[#1E1F2A]">
                <span className="text-[10px] font-mono uppercase text-[#8A8B9A] tracking-wider block font-extrabold mb-2">DETECTION FRAMES</span>
                <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-mono text-[#8A8B9A]">
                  {mockDetections.map(det => (
                    <div key={det.id} className="bg-[#0B0C10] border border-[#1E1F2A] rounded-[8px] p-2 flex flex-col items-center space-y-1">
                      <div className="w-12 h-12 bg-[#15161D] border border-[#1E1F2A] rounded flex items-center justify-center text-xs text-[#FF6B35] font-bold">
                        {det.camera}
                      </div>
                      <span className="text-white block font-bold">{det.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer buttons */}
            <div className="pt-4 border-t border-[#1E1F2A] flex items-center justify-between">
              <span className="text-[10px] font-mono text-[#00C853] font-bold">✓ Evidence Integrity: ALL HASHES VERIFIED</span>
              <div className="flex space-x-3">
                <button
                  onClick={() => setIsReportOpen(false)}
                  className="px-4 py-2 bg-[#1E1F2A] hover:bg-[#2A2C3C] text-white text-xs font-semibold rounded-[8px] transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={triggerMockPdfDownload}
                  disabled={isGeneratingPdf}
                  className="px-5 py-2 bg-[#FF6B35] hover:bg-[#E85A24] text-[#0B0C10] font-bold text-xs uppercase tracking-wider rounded-[8px] transition-colors flex items-center space-x-2 shadow"
                >
                  <Download className="w-4 h-4 text-[#0B0C10]" />
                  <span>{isGeneratingPdf ? "Generating..." : "DOWNLOAD PDF"}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating notifications / Toasts render at top-right */}
      <div className="fixed top-6 right-6 space-y-2 z-[999] pointer-events-none max-w-sm w-full">
        {toasts.map((toast) => (
          <div 
            key={toast.id}
            className={`p-3 border-l-4 rounded-[6px] shadow-2xl flex items-center justify-between text-xs font-mono text-white pointer-events-auto bg-[#15161D] border-[#1E1F2A] animate-slide-left ${
              toast.type === 'victim' ? 'border-l-[#00C853]' : 'border-l-[#FF1744]'
            }`}
          >
            <span>{toast.text}</span>
            <button 
              onClick={() => setToasts(prev => prev.filter(t => t.id !== toast.id))}
              className="text-[#8A8B9A] hover:text-white font-bold ml-4"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
