import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Maximize, 
  Minimize, 
  ArrowLeft, 
  UserCheck, 
  AlertTriangle, 
  ShieldCheck, 
  Crosshair, 
  Clock, 
  Cpu, 
  Sparkles, 
  Download, 
  Camera, 
  Radio, 
  Activity, 
  Layers, 
  ChevronRight, 
  Eye, 
  CheckCircle2, 
  FileDown, 
  Plus, 
  Upload, 
  RefreshCw, 
  Video,
  Grid,
  MapPin,
  Shield,
  FileText,
  Lock,
  Mic,
  AlertOctagon,
  EyeOff,
  Navigation
} from 'lucide-react';
import { useKrypt, DEFAULT_DETECTIONS } from '../context/KryptContext';
import { speakText, playRadioChime } from '../utils/audioSpeech';
import AutoFirReportModal from '../components/AutoFirReportModal';

export default function KryptAnalysisPage() {
  const navigate = useNavigate();
  const {
    victimPreview,
    setVictimPreview,
    suspectPreview,
    setSuspectPreview,
    videoFilename,
    setVideoFilename,
    setVideoFile,
    detections,
    victimFile,
    setVictimFile,
    suspectFile,
    setSuspectFile
  } = useKrypt();

  // Tab View: 'single' | 'multi'
  const [activeTab, setActiveTab] = useState('single');

  // Video Player States
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const totalDuration = 180;
  const [voiceAlertsEnabled, setVoiceAlertsEnabled] = useState(true);
  const [privacyMode, setPrivacyMode] = useState(false);
  const [activeDetection, setActiveDetection] = useState(null);
  const [bannerAlert, setBannerAlert] = useState(null);
  const [activeBox, setActiveBox] = useState(null);
  const [fps, setFps] = useState(29.97);
  const [framesProcessed, setFramesProcessed] = useState(1420);
  const [facesDetectedCount, setFacesDetectedCount] = useState(48);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [showCustodyPopup, setShowCustodyPopup] = useState(false);

  // Hidden Inputs for In-Analysis Updates
  const quickVictimInputRef = useRef(null);
  const quickSuspectInputRef = useRef(null);
  const quickCameraInputRef = useRef(null);

  const detectionLogRef = useRef(null);
  const timerRef = useRef(null);
  const lastAnnouncedSecRef = useRef(-1);
  const lastGeofenceAlertSecRef = useRef(-1);

  // Format seconds to mm:ss format
  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Keyboard shortcut listener: Spacebar to Play/Pause, Arrow Left/Right to skip 5s
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space') {
        e.preventDefault();
        setIsPlaying(prev => !prev);
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        setCurrentTime(prev => Math.min(prev + 5, totalDuration));
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        setCurrentTime(prev => Math.max(prev - 5, 0));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [totalDuration]);

  // Video playback ticker
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= totalDuration) {
            return 0;
          }
          return prev + 1;
        });
        setFramesProcessed(prev => prev + 30);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isPlaying, totalDuration]);

  // Check detection matching and geofence alerts whenever currentTime changes
  useEffect(() => {
    // 1. Check Standard Detections
    const match = detections.find(d => Math.abs(d.seconds - currentTime) <= 1);

    if (match) {
      setActiveDetection(match);
      setActiveBox(match);

      if (lastAnnouncedSecRef.current !== match.seconds) {
        lastAnnouncedSecRef.current = match.seconds;
        playRadioChime();

        if (match.match === 'VICTIM') {
          const alertMsg = `Victim detected at timestamp ${match.timestamp}`;
          if (voiceAlertsEnabled) {
            speakText(alertMsg, 'en', () => {}, () => {});
          }
          setBannerAlert({
            type: 'VICTIM',
            text: `🟢 VICTIM DETECTED — ${match.timestamp}`,
            subtext: `Confidence: ${Math.round(match.confidence * 100)}% • Sector 7 Promenade`,
            color: '#00C853'
          });
        } else {
          const alertMsg = `Suspect detected at timestamp ${match.timestamp}. Caution advised.`;
          if (voiceAlertsEnabled) {
            speakText(alertMsg, 'en', () => {}, () => {});
          }
          setBannerAlert({
            type: 'SUSPECT',
            text: `🔴 SUSPECT DETECTED — ${match.timestamp} — HIGH PRIORITY`,
            subtext: `Confidence: ${Math.round(match.confidence * 100)}% • Biometric Facenet Match`,
            color: '#FF1744'
          });
        }

        setTimeout(() => setBannerAlert(null), 4000);
      }
    } else {
      const recentMatch = detections.find(d => currentTime >= d.seconds && currentTime <= d.seconds + 2);
      if (!recentMatch) {
        setActiveBox(null);
      }
    }

    // 2. FEATURE 6: GEOFENCE PROXIMITY ALERT (triggers around 01:45 / 105s when suspect approaches victim residence)
    if (currentTime >= 104 && currentTime <= 108) {
      if (lastGeofenceAlertSecRef.current !== 105) {
        lastGeofenceAlertSecRef.current = 105;
        playRadioChime();
        if (voiceAlertsEnabled) {
          speakText("Proximity alert. Suspect within 300 meters of victim residence.", 'en', () => {}, () => {});
        }
        setBannerAlert({
          type: 'GEOFENCE',
          text: `🚨 GEOFENCE ALERT — SUSPECT WITHIN 300M OF VICTIM RESIDENCE`,
          subtext: `Target: Sector 7 School & Residential Corridor • CAM-07 Tower Base`,
          color: '#FF1744'
        });
        setTimeout(() => setBannerAlert(null), 5000);
      }
    }
  }, [currentTime, detections, voiceAlertsEnabled]);

  // Jump video to timestamp
  const handleJumpToTime = (item) => {
    setCurrentTime(item.seconds);
    setIsPlaying(true);
    setActiveDetection(item);
    setActiveBox(item);
    playRadioChime();

    if (voiceAlertsEnabled) {
      const msg = `${item.match} detected at timestamp ${item.timestamp}`;
      speakText(msg, 'en', () => {}, () => {});
    }
  };

  // Quick In-Analysis Updates
  const handleQuickSuspectUpload = (file) => {
    if (!file) return;
    setSuspectFile(file);
    const url = URL.createObjectURL(file);
    setSuspectPreview(url);
    playRadioChime();
    speakText("Target suspect photo updated in live recognizer.", 'en', () => {}, () => {});
  };

  const handleQuickVictimUpload = (file) => {
    if (!file) return;
    setVictimFile(file);
    const url = URL.createObjectURL(file);
    setVictimPreview(url);
    playRadioChime();
    speakText("Target victim photo updated in live recognizer.", 'en', () => {}, () => {});
  };

  const handleQuickCameraUpload = (file) => {
    if (!file) return;
    setVideoFile(file);
    setVideoFilename(file.name);
    setCurrentTime(0);
    setIsPlaying(true);
    playRadioChime();
    speakText(`New CCTV camera footage ${file.name} loaded into analyzer.`, 'en', () => {}, () => {});
  };

  // Compute suspect animated position along cross-camera path
  const suspectPathProgress = Math.min(Math.max((currentTime / totalDuration) * 100, 0), 100);

  return (
    <div className="min-h-screen bg-[#0B0C10] text-white flex flex-col select-none overflow-x-hidden font-sans pb-12">
      {/* Hidden Inputs for Quick In-Analysis Buttons */}
      <input type="file" ref={quickVictimInputRef} onChange={(e) => handleQuickVictimUpload(e.target.files[0])} accept="image/*" className="hidden" />
      <input type="file" ref={quickSuspectInputRef} onChange={(e) => handleQuickSuspectUpload(e.target.files[0])} accept="image/*" className="hidden" />
      <input type="file" ref={quickCameraInputRef} onChange={(e) => handleQuickCameraUpload(e.target.files[0])} accept="video/*" className="hidden" />

      {/* VISUAL SLIDE-DOWN ALERT BANNER */}
      {bannerAlert && (
        <div 
          style={{ borderLeftColor: bannerAlert.color }}
          className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-xl bg-[#15161D]/95 border-l-4 border-y border-r border-[#1E1F2A] rounded-xl p-3.5 shadow-2xl backdrop-blur-md animate-slide-down flex items-center justify-between"
        >
          <div className="flex items-center space-x-3">
            <span className="w-3 h-3 rounded-full animate-ping" style={{ backgroundColor: bannerAlert.color }} />
            <div>
              <h4 className="text-white text-xs font-bold font-mono tracking-wide">
                {bannerAlert.text}
              </h4>
              <p className="text-[#8A8B9A] text-[11px] font-mono mt-0.5">
                {bannerAlert.subtext}
              </p>
            </div>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded border border-[#1E1F2A] text-white">
            ACTIVE HUD
          </span>
        </div>
      )}

      {/* TOP NAVIGATION BAR */}
      <header className="h-14 bg-[#15161D] border-b border-[#1E1F2A] px-4 sm:px-6 flex items-center justify-between z-30">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/krypt')}
            className="p-1.5 bg-[#0B0C10] hover:bg-[#1E1F2A] text-[#8A8B9A] hover:text-white rounded-lg border border-[#1E1F2A] transition-colors flex items-center space-x-1 text-xs font-mono"
            title="Return to Upload Screen"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Upload Feed</span>
          </button>

          <div className="flex items-center space-x-2">
            <h1 className="text-white font-extrabold text-lg tracking-tight font-sans">
              KRYPT
            </h1>
            <span className="text-[#8A8B9A] text-xs font-mono hidden md:inline">
              • CCTV SURVEILLANCE ANALYZER
            </span>
          </div>

          {/* View Mode Tabs: Single Cam vs Cross-Camera Tracking */}
          <div className="flex items-center bg-[#0B0C10] p-0.5 rounded-lg border border-[#1E1F2A] text-[11px] font-mono">
            <button
              onClick={() => setActiveTab('single')}
              className={`px-2.5 py-1 rounded transition-colors flex items-center space-x-1 ${
                activeTab === 'single' ? 'bg-[#FF6B35] text-[#0B0C10] font-bold' : 'text-[#8A8B9A] hover:text-white'
              }`}
            >
              <Video className="w-3 h-3" />
              <span>Single Camera</span>
            </button>

            <button
              onClick={() => setActiveTab('multi')}
              className={`px-2.5 py-1 rounded transition-colors flex items-center space-x-1 ${
                activeTab === 'multi' ? 'bg-[#FF6B35] text-[#0B0C10] font-bold' : 'text-[#8A8B9A] hover:text-white'
              }`}
            >
              <Grid className="w-3 h-3" />
              <span>Multi-Camera View (1, 3, 7)</span>
            </button>
          </div>
        </div>

        {/* Action Controls & Top Features */}
        <div className="flex items-center space-x-2.5">
          {/* FEATURE 5: PRIVACY MASKING TOGGLE */}
          <button
            onClick={() => {
              setPrivacyMode(!privacyMode);
              playRadioChime();
            }}
            className={`px-3 py-1.5 rounded-lg border text-xs font-mono flex items-center space-x-1.5 transition-colors ${
              privacyMode
                ? 'bg-[#00C853]/20 border-[#00C853] text-[#00C853]'
                : 'bg-[#0B0C10] border-[#1E1F2A] text-[#8A8B9A]'
            }`}
            title="Ethical AI Privacy Masking"
          >
            {privacyMode ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            <span>Privacy Mode: {privacyMode ? 'ON' : 'OFF'}</span>
          </button>

          {/* Voice Speech Toggle */}
          <button
            onClick={() => setVoiceAlertsEnabled(!voiceAlertsEnabled)}
            className={`px-2.5 py-1.5 rounded-lg border text-xs font-mono flex items-center space-x-1.5 transition-colors ${
              voiceAlertsEnabled
                ? 'bg-[#FF6B35]/15 border-[#FF6B35] text-[#FF6B35]'
                : 'bg-[#0B0C10] border-[#1E1F2A] text-[#8A8B9A]'
            }`}
          >
            {voiceAlertsEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
          </button>

          {/* Dedicated Camera Upload Button in Header */}
          <button
            onClick={() => quickCameraInputRef.current.click()}
            className="px-3 py-1.5 bg-[#1E1F2A] hover:bg-[#2A2C3C] border border-[#1E1F2A] hover:border-[#FF6B35] text-white text-xs font-bold font-mono rounded-lg transition-all flex items-center space-x-1.5"
            title="Upload New CCTV Camera Recording"
          >
            <Upload className="w-3.5 h-3.5 text-[#FF6B35]" />
            <span className="hidden md:inline">Upload Feed</span>
          </button>

          {/* FEATURE 4: AUTO-FIR REPORT BUTTON */}
          <button
            onClick={() => setIsReportOpen(true)}
            className="px-3.5 py-1.5 bg-[#FF6B35] hover:bg-[#E85A24] text-[#0B0C10] text-xs font-extrabold font-mono rounded-lg transition-all shadow-md flex items-center space-x-1.5"
          >
            <FileText className="w-3.5 h-3.5 text-[#0B0C10]" />
            <span>GENERATE REPORT</span>
          </button>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* FEATURE 1: CROSS-CAMERA TRACKING TAB (MULTI-CAMERA VIEW)                  */}
      {/* ========================================================================= */}
      {activeTab === 'multi' ? (
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 p-4 max-w-[1700px] mx-auto w-full items-stretch">
          {/* LEFT: 3 Camera Feeds */}
          <div className="lg:col-span-5 flex flex-col space-y-4 justify-start">
            {/* Feed 1: Camera 1 (Sector 7 Promenade) */}
            <div className="bg-[#15161D] border border-[#1E1F2A] rounded-xl p-3.5 space-y-2.5 shadow-md">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-white font-bold flex items-center space-x-1.5">
                  <span className={`w-2 h-2 rounded-full ${currentTime <= 60 ? 'bg-[#00C853] animate-pulse-success' : 'bg-[#8A8B9A]'}`} />
                  <span>CAMERA 01 • Promenade North Walkway</span>
                </span>
                <span className="text-[#8A8B9A] text-[10px]">30 FPS • 4K UHD</span>
              </div>
              <div className="relative aspect-video bg-[#0B0C10] border border-[#1E1F2A] rounded-lg overflow-hidden flex items-center justify-center">
                {/* Grid Scan lines */}
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#1E1F2A_1px,transparent_1px)] bg-[size:16px_16px]" />
                <div className="text-center text-xs font-mono text-[#8A8B9A] pointer-events-none select-none">
                  <span className="text-white font-bold block text-[10px]">CAM-01 MAIN FEED</span>
                  <span className="text-[9px]">Marine Drive Promenade North</span>
                </div>
                {currentTime <= 60 && (
                  <>
                    {/* Drifting suspect bounding box */}
                    <div 
                      style={{
                        position: 'absolute',
                        top: '30%',
                        left: `${20 + (currentTime / 60) * 50}%`,
                        width: '20%',
                        height: '50%'
                      }}
                      className="border-2 border-[#FF1744] bg-[#FF1744]/15 rounded transition-all duration-300 shadow-[0_0_12px_rgba(255,23,68,0.4)]"
                    >
                      <div className="absolute -top-6 left-0 px-1.5 py-0.5 bg-[#FF1744] text-[#0B0C10] text-[8px] font-mono font-bold rounded whitespace-nowrap">
                        SUSPECT ALPHA [94.2%]
                      </div>
                      <div className="absolute -bottom-5 left-0 text-[8px] font-mono text-[#FF1744] font-bold">
                        GAIT: 94.2%
                      </div>
                    </div>

                    {/* Victim bounding box */}
                    <div className="absolute top-[35%] left-[15%] w-[18%] h-[45%] border-2 border-[#00C853] bg-[#00C853]/10 rounded shadow-[0_0_10px_rgba(0,200,83,0.3)]">
                      <div className="absolute -top-6 left-0 px-1.5 py-0.5 bg-[#00C853] text-[#0B0C10] text-[8px] font-mono font-bold rounded whitespace-nowrap">
                        VICTIM DETECTED [94%]
                      </div>
                    </div>
                  </>
                )}
                {currentTime > 60 && (
                  <div className="absolute top-2 right-2 px-1.5 py-0.5 bg-[#1E1F2A]/90 border border-[#1E1F2A] rounded text-[8px] font-mono text-[#8A8B9A]">
                    BACKGROUND STANDBY
                  </div>
                )}
              </div>
              <div className="flex items-center justify-between text-[10px] font-mono text-[#8A8B9A]">
                <span>10:05 AM (00:00 - 01:00)</span>
                <span>Active Target: {currentTime <= 60 ? "Suspect & Victim" : "None"}</span>
              </div>
            </div>

            {/* Feed 2: Camera 3 (Marine Drive East Walkway) */}
            <div className="bg-[#15161D] border border-[#1E1F2A] rounded-xl p-3.5 space-y-2.5 shadow-md">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-white font-bold flex items-center space-x-1.5">
                  <span className={`w-2 h-2 rounded-full ${currentTime > 60 && currentTime <= 120 ? 'bg-[#FF6B35] animate-pulse' : 'bg-[#8A8B9A]'}`} />
                  <span>CAMERA 03 • East Walkway Junction</span>
                </span>
                <span className="text-[#8A8B9A] text-[10px]">25 FPS • 1080p</span>
              </div>
              <div className="relative aspect-video bg-[#0B0C10] border border-[#1E1F2A] rounded-lg overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#1E1F2A_1px,transparent_1px)] bg-[size:16px_16px]" />
                <div className="text-center text-xs font-mono text-[#8A8B9A] pointer-events-none select-none">
                  <span className="text-white font-bold block text-[10px]">CAM-03 MAIN FEED</span>
                  <span className="text-[9px]">East Walkway Junction Corridor</span>
                </div>
                {currentTime > 60 && currentTime <= 120 && (
                  <div 
                    style={{
                      position: 'absolute',
                      top: '25%',
                      left: `${15 + ((currentTime - 60) / 60) * 60}%`,
                      width: '22%',
                      height: '52%'
                    }}
                    className="border-2 border-[#FF6B35] bg-[#FF6B35]/15 rounded transition-all duration-300 shadow-[0_0_12px_rgba(255,107,53,0.4)]"
                  >
                    <div className="absolute -top-6 left-0 px-1.5 py-0.5 bg-[#FF6B35] text-[#0B0C10] text-[8px] font-mono font-bold rounded whitespace-nowrap">
                      SUSPECT MATCH [89.5%]
                    </div>
                    <div className="absolute -bottom-5 left-0 text-[8px] font-mono text-[#FF6B35] font-bold">
                      VELOCITY: 8.5 km/h
                    </div>
                  </div>
                )}
                {(currentTime <= 60 || currentTime > 120) && (
                  <div className="absolute top-2 right-2 px-1.5 py-0.5 bg-[#1E1F2A]/90 border border-[#1E1F2A] rounded text-[8px] font-mono text-[#8A8B9A]">
                    BACKGROUND STANDBY
                  </div>
                )}
              </div>
              <div className="flex items-center justify-between text-[10px] font-mono text-[#8A8B9A]">
                <span>10:12 AM (01:00 - 02:00)</span>
                <span>Active Target: {currentTime > 60 && currentTime <= 120 ? "Suspect" : "None"}</span>
              </div>
            </div>

            {/* Feed 3: Camera 7 (Tower Base & School Proximity) */}
            <div className="bg-[#15161D] border border-[#1E1F2A] rounded-xl p-3.5 space-y-2.5 shadow-md">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-white font-bold flex items-center space-x-1.5">
                  <span className={`w-2 h-2 rounded-full ${currentTime > 120 ? 'bg-[#FF1744] animate-ping' : 'bg-[#8A8B9A]'}`} />
                  <span>CAMERA 07 • Geofence Tower Base</span>
                </span>
                <span className="text-[#FF1744] text-[9px] font-bold border border-[#FF1744]/30 px-1 rounded bg-[#FF1744]/10">GEOFENCE INTERCEPT</span>
              </div>
              <div className="relative aspect-video bg-[#0B0C10] border border-[#1E1F2A] rounded-lg overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#1E1F2A_1px,transparent_1px)] bg-[size:16px_16px]" />
                <div className="text-center text-xs font-mono text-[#8A8B9A] pointer-events-none select-none">
                  <span className="text-white font-bold block text-[10px]">CAM-07 MAIN FEED</span>
                  <span className="text-[9px]">Residential & School Corridor</span>
                </div>
                {currentTime > 120 && (
                  <>
                    <div 
                      style={{
                        position: 'absolute',
                        top: '30%',
                        left: `${10 + ((currentTime - 120) / 60) * 70}%`,
                        width: '24%',
                        height: '55%'
                      }}
                      className="border-2 border-[#FF1744] bg-[#FF1744]/25 rounded transition-all duration-300 shadow-[0_0_15px_rgba(255,23,68,0.5)] animate-pulse"
                    >
                      <div className="absolute -top-6 left-0 px-1.5 py-0.5 bg-[#FF1744] text-white text-[8px] font-mono font-bold rounded whitespace-nowrap">
                        SUSPECT INTERCEPT [95.4%]
                      </div>
                      <div className="absolute -bottom-5 left-0 text-[8px] font-mono text-[#FF1744] font-bold">
                        ETA GEOFENCE: INSIDE
                      </div>
                    </div>
                    <div className="absolute top-2 left-2 border-2 border-[#FF1744] bg-[#FF1744]/25 px-2 py-1 rounded text-[9px] font-mono font-bold text-[#FF1744] animate-pulse">
                      PROXIMITY ALERT [300M]
                    </div>
                  </>
                )}
                {currentTime <= 120 && (
                  <div className="absolute top-2 right-2 px-1.5 py-0.5 bg-[#1E1F2A]/90 border border-[#1E1F2A] rounded text-[8px] font-mono text-[#8A8B9A]">
                    BACKGROUND STANDBY
                  </div>
                )}
              </div>
              <div className="flex items-center justify-between text-[10px] font-mono text-[#8A8B9A]">
                <span>10:18 AM (02:00 - 03:00)</span>
                <span>Active Target: {currentTime > 120 ? "Suspect (CRITICAL)" : "None"}</span>
              </div>
            </div>
          </div>

          {/* RIGHT: Map & Trajectory Panel */}
          <div className="lg:col-span-7 flex flex-col justify-between bg-[#15161D] border border-[#1E1F2A] rounded-xl p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#1E1F2A]">
              <div className="flex items-center space-x-2">
                <Navigation className="w-4 h-4 text-[#FF6B35]" />
                <span className="text-white text-xs font-bold uppercase font-mono">
                  CROSS-CAMERA TRAJECTORY MAP & GEOFENCE ZONE
                </span>
              </div>
              <span className="text-[#FF6B35] text-xs font-mono font-bold bg-[#FF6B35]/15 border border-[#FF6B35]/30 px-2.5 py-0.5 rounded-full">
                PATH PROGRESS: {Math.round(suspectPathProgress)}%
              </span>
            </div>

            {/* Map Canvas with Animated Moving Suspect Icon */}
            <div className="relative w-full flex-1 min-h-[380px] bg-[#0B0C10] border border-[#1E1F2A] rounded-xl overflow-hidden flex flex-col justify-between">
              {/* Background Map Grid */}
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#1E1F2A_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

              {/* Simulated Map Background Vectors */}
              <svg className="absolute inset-0 w-full h-full opacity-35 pointer-events-none">
                {/* Coastal Water Bay */}
                <path d="M 0 0 Q 150 100 200 400 T 250 800 L 0 800 Z" fill="#0A192F" stroke="#1E293B" strokeWidth="1" />
                {/* Street Outlines */}
                <line x1="15%" y1="0%" x2="15%" y2="100%" stroke="#1A1C23" strokeWidth="6" />
                <line x1="50%" y1="0%" x2="50%" y2="100%" stroke="#1A1C23" strokeWidth="6" />
                <line x1="85%" y1="0%" x2="85%" y2="100%" stroke="#1A1C23" strokeWidth="6" />
                <line x1="0%" y1="50%" x2="100%" y2="50%" stroke="#1A1C23" strokeWidth="8" />
                <line x1="0%" y1="20%" x2="100%" y2="35%" stroke="#1A1C23" strokeWidth="4" />
                <line x1="0%" y1="80%" x2="100%" y2="65%" stroke="#1A1C23" strokeWidth="4" />

                {/* Path connections */}
                <line x1="15%" y1="50%" x2="50%" y2="50%" stroke="#1E1F2A" strokeWidth="4" />
                <line x1="50%" y1="50%" x2="85%" y2="50%" stroke="#1E1F2A" strokeWidth="4" />

                {/* Glowing Suspect Active Path */}
                <path
                  d="M 120 190 H 680"
                  fill="none"
                  stroke="#FF6B35"
                  strokeWidth="3"
                  strokeDasharray="6,6"
                  className="opacity-70"
                />
              </svg>

              {/* Node 1: Camera 1 */}
              <div className="absolute left-[15%] top-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-10">
                <div className={`w-10 h-10 rounded-full bg-[#15161D] border-2 flex items-center justify-center text-xs font-mono font-bold mx-auto shadow-md transition-all duration-300 ${
                  currentTime <= 60 
                    ? 'border-[#00C853] text-[#00C853] shadow-[0_0_12px_rgba(0,200,83,0.6)] scale-110' 
                    : 'border-[#FF6B35] text-[#FF6B35]'
                }`}>
                  C1
                </div>
                <div className="bg-[#15161D]/95 px-2 py-0.5 rounded text-[8px] font-mono text-white mt-1 border border-[#1E1F2A] whitespace-nowrap shadow">
                  10:05 - Promenade
                </div>
              </div>

              {/* Node 2: Camera 3 */}
              <div className="absolute left-[50%] top-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-10">
                <div className={`w-10 h-10 rounded-full bg-[#15161D] border-2 flex items-center justify-center text-xs font-mono font-bold mx-auto shadow-md transition-all duration-300 ${
                  currentTime > 60 && currentTime <= 120 
                    ? 'border-[#00C853] text-[#00C853] shadow-[0_0_12px_rgba(0,200,83,0.6)] scale-110' 
                    : 'border-[#FF6B35] text-[#FF6B35]'
                }`}>
                  C3
                </div>
                <div className="bg-[#15161D]/95 px-2 py-0.5 rounded text-[8px] font-mono text-white mt-1 border border-[#1E1F2A] whitespace-nowrap shadow">
                  10:12 - East Corridor
                </div>
              </div>

              {/* Node 3: Camera 7 */}
              <div className="absolute left-[85%] top-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-10">
                <div className={`w-10 h-10 rounded-full bg-[#15161D] border-2 flex items-center justify-center text-xs font-mono font-bold mx-auto shadow-md transition-all duration-300 ${
                  currentTime > 120 
                    ? 'border-[#FF1744] text-[#FF1744] animate-pulse shadow-[0_0_14px_rgba(255,23,68,0.7)] scale-110' 
                    : 'border-[#FF6B35] text-[#FF6B35]'
                }`}>
                  C7
                </div>
                <div className="bg-[#15161D]/95 px-2 py-0.5 rounded text-[8px] font-mono text-white mt-1 border border-[#1E1F2A] whitespace-nowrap shadow">
                  10:18 - Geofence (300m)
                </div>
              </div>

              {/* GEOFENCE ZONE (RED CIRCLE) */}
              <div className="absolute right-[5%] top-1/2 -translate-y-1/2 w-32 h-32 rounded-full border-2 border-[#FF1744]/40 bg-[#FF1744]/5 flex items-center justify-center pointer-events-none animate-pulse">
                <span className="text-[8px] font-mono text-[#FF1744] font-bold text-center px-2">
                  VICTIM RESIDENCE GEOFENCE
                </span>
              </div>

              {/* ANIMATED SUSPECT ICON MOVING ALONG THE PATH */}
              <div
                style={{ left: `${15 + (suspectPathProgress * 0.7)}%` }}
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-20 transition-all duration-300 pointer-events-none"
              >
                <div className="w-8 h-8 rounded-full bg-[#FF1744] border-2 border-white flex items-center justify-center text-white shadow-xl animate-bounce">
                  <Crosshair className="w-4 h-4" />
                </div>
                <span className="text-[8px] font-mono font-bold text-white bg-[#0B0C10] px-1.5 py-0.5 rounded border border-[#FF1744] absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap shadow-md">
                  SUSPECT
                </span>
              </div>

              {/* REAL-TIME TELEMETRY PANEL OVERLAY */}
              <div className="absolute bottom-2 left-2 bg-[#15161D]/95 border border-[#1E1F2A] rounded-lg p-2.5 text-[10px] font-mono w-64 space-y-1 z-10 shadow-lg">
                <div className="text-[#FF6B35] font-bold border-b border-[#1E1F2A] pb-1 uppercase tracking-wide">Suspect Tracking Telemetry</div>
                <div className="flex justify-between">
                  <span>GPS POSITION:</span>
                  <span className="text-white font-bold">
                    {currentTime <= 60 ? "9.9726° N, 76.2783° E" : currentTime <= 120 ? "9.9810° N, 76.2895° E" : "10.0159° N, 76.3639° E"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>EST. VELOCITY:</span>
                  <span className="text-white font-bold">{currentTime > 150 ? "0.0 km/h (Stationary)" : "12.4 km/h (Jog/Run)"}</span>
                </div>
                <div className="flex justify-between">
                  <span>ACTIVE CAMERA:</span>
                  <span className="text-white font-bold">{currentTime <= 60 ? "CAM-01 (Promenade)" : currentTime <= 120 ? "CAM-03 (East Walkway)" : "CAM-07 (Tower/Geofence)"}</span>
                </div>
              </div>
            </div>

            {/* SYNCED TIMELINE SCRUBBER ACROSS ALL 3 VIDEOS */}
            <div className="p-3 bg-[#0B0C10] rounded-xl border border-[#1E1F2A] flex items-center justify-between gap-4">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-8 h-8 rounded-lg bg-[#1E1F2A] border border-[#FF6B35] flex items-center justify-center text-white flex-shrink-0"
              >
                {isPlaying ? <Pause className="w-4 h-4 text-[#FF6B35]" /> : <Play className="w-4 h-4 ml-0.5" />}
              </button>

              <input
                type="range"
                min={0}
                max={totalDuration}
                value={currentTime}
                onChange={(e) => setCurrentTime(Number(e.target.value))}
                className="w-full h-2 bg-[#15161D] rounded-lg appearance-none cursor-pointer accent-[#FF6B35]"
              />

              <span className="text-xs font-mono text-white font-bold flex-shrink-0">
                {formatTime(currentTime)} / {formatTime(totalDuration)}
              </span>
            </div>
          </div>
        </div>
      ) : (
        /* ========================================================================= */
        /* STANDARD THREE-PANEL ANALYSIS WORKSPACE                                   */
        /* ========================================================================= */
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-4 p-4 max-w-[1700px] mx-auto w-full items-start">
          {/* ========================================================================= */}
          {/* 1. LEFT PANEL: BEHAVIORAL ALERTS + DETECTION LOG                          */}
          {/* ========================================================================= */}
          <div className="lg:col-span-3 space-y-3">
            {/* FEATURE 2: BEHAVIORAL ANOMALY FLAGS PANEL */}
            <div className="bg-[#15161D] border border-[#1E1F2A] rounded-xl p-3.5 space-y-2.5">
              <div className="flex items-center justify-between pb-1 border-b border-[#1E1F2A]">
                <span className="text-white text-xs font-bold uppercase tracking-wider font-mono flex items-center space-x-1.5">
                  <AlertOctagon className="w-3.5 h-3.5 text-[#FF6B35]" />
                  <span>Behavioral Alerts</span>
                </span>
                <span className="text-[10px] font-mono text-[#FF6B35] font-bold">2 ANOMALIES</span>
              </div>

              <div className="space-y-1.5">
                {/* Flag 1: Loitering */}
                <div 
                  onClick={() => setCurrentTime(12)}
                  className="p-2 bg-[#0B0C10] border border-[#FF6B35]/50 hover:border-[#FF6B35] rounded-lg cursor-pointer transition-all"
                >
                  <div className="flex items-center justify-between">
                    <span className="px-1.5 py-0.5 bg-[#FF6B35]/20 text-[#FF6B35] text-[9px] font-mono font-bold rounded">
                      LOITERING
                    </span>
                    <span className="text-[10px] font-mono text-white font-bold">00:12:34</span>
                  </div>
                  <div className="flex justify-between text-[10px] font-mono text-[#8A8B9A] mt-1">
                    <span>CAM-01 Promenade</span>
                    <span className="text-[#00C853]">94% Confidence</span>
                  </div>
                </div>

                {/* Flag 2: Following Pattern */}
                <div 
                  onClick={() => setCurrentTime(15)}
                  className="p-2 bg-[#0B0C10] border border-[#FF1744]/50 hover:border-[#FF1744] rounded-lg cursor-pointer transition-all"
                >
                  <div className="flex items-center justify-between">
                    <span className="px-1.5 py-0.5 bg-[#FF1744]/20 text-[#FF1744] text-[9px] font-mono font-bold rounded">
                      FOLLOWING PATTERN
                    </span>
                    <span className="text-[10px] font-mono text-white font-bold">00:15:22</span>
                  </div>
                  <div className="flex justify-between text-[10px] font-mono text-[#8A8B9A] mt-1">
                    <span>CAM-03 East Walkway</span>
                    <span className="text-[#FF1744]">89% Confidence</span>
                  </div>
                </div>
              </div>
            </div>

            {/* DETECTION LOG */}
            <div className="bg-[#15161D] border border-[#1E1F2A] rounded-xl p-4 flex flex-col justify-between min-h-[460px]">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-[#1E1F2A] mb-3">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-[#FF6B35]" />
                    <span className="text-white text-xs font-bold uppercase tracking-wider font-mono">
                      Detection Log
                    </span>
                  </div>
                  <span className="px-1.5 py-0.5 bg-[#0B0C10] text-[#00C853] text-[10px] font-mono font-bold rounded border border-[#1E1F2A]">
                    {detections.length} MATCHES
                  </span>
                </div>

                <div ref={detectionLogRef} className="space-y-2 overflow-y-auto max-h-[380px] pr-1 scrollbar-none">
                  {detections.map((item) => {
                    const isSelected = activeDetection?.id === item.id;
                    const isVictim = item.match === 'VICTIM';

                    return (
                      <div
                        key={item.id}
                        onClick={() => handleJumpToTime(item)}
                        style={{ borderLeftColor: isVictim ? '#00C853' : '#FF1744' }}
                        className={`p-2.5 rounded-xl border border-l-4 cursor-pointer transition-all ${
                          isSelected
                            ? isVictim
                              ? 'bg-[#1E1F2A] border-[#00C853] shadow-lg scale-[1.01]'
                              : 'bg-[#1E1F2A] border-[#FF1744] shadow-lg scale-[1.01]'
                            : 'bg-[#0B0C10] border-[#1E1F2A] hover:border-[#FF6B35]'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className={`text-[10px] font-mono font-bold ${
                            isVictim ? 'text-[#00C853]' : 'text-[#FF1744]'
                          }`}>
                            [{isVictim ? 'GREEN' : 'RED'}] {item.match} DETECTED
                          </span>
                        </div>

                        <div className="flex items-baseline justify-between mt-1 text-xs">
                          <span className="text-white font-mono font-bold">
                            {item.timestamp}
                          </span>
                          <span className="text-[#8A8B9A] font-mono text-[10px]">
                            Confidence: {Math.round(item.confidence * 100)}%
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="pt-2 border-t border-[#1E1F2A] text-[10px] font-mono text-[#8A8B9A] flex justify-between">
                <span>FACENET BIOMETRICS</span>
                <span className="text-[#00C853]">AUTO-SYNCED</span>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* 2. CENTER PANEL: VIDEO PLAYER + BOUNDING BOXES + AUDIO THREAT DETECTION   */}
          {/* ========================================================================= */}
          <div className="lg:col-span-6 space-y-3">
            <div className="relative w-full aspect-video bg-[#0B0C10] border-2 border-[#1E1F2A] rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center group select-none">
              {/* Scanlines */}
              <div 
                className="absolute inset-0 pointer-events-none opacity-15"
                style={{
                  backgroundImage: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.5) 50%)',
                  backgroundSize: '100% 4px'
                }}
              />

              {/* PRIVACY MASKING OVERLAY (FEATURE 5: Blurs non-target environment when ON) */}
              {privacyMode && (
                <div className="absolute inset-0 backdrop-blur-md bg-black/40 z-10 pointer-events-none flex items-center justify-center">
                  <div className="px-3 py-1 bg-[#0B0C10]/90 border border-[#00C853] text-[#00C853] text-[10px] font-mono font-bold rounded-lg shadow-md">
                    🔒 PRIVACY MASKING ACTIVE (ETHICAL AI BLUR)
                  </div>
                </div>
              )}

              {/* Tactical Grid Background */}
              <div className="absolute inset-0 bg-[#0B0C10] flex items-center justify-center overflow-hidden opacity-30">
                <div 
                  className="w-full h-full"
                  style={{
                    backgroundImage: 'radial-gradient(#1E1F2A 1.5px, transparent 1.5px)',
                    backgroundSize: '32px 32px'
                  }}
                />
                <svg className="absolute inset-0 w-full h-full opacity-40">
                  <line x1="0%" y1="90%" x2="100%" y2="70%" stroke="#1E1F2A" strokeWidth="3" />
                  <circle cx="50%" cy="50%" r="180" stroke="#1E1F2A" strokeWidth="1" fill="none" />
                </svg>
              </div>

              {/* BOUNDING BOX OVERLAY ON VIDEO */}
              {activeBox && (
                <div
                  style={{
                    top: `${activeBox.bbox.y}%`,
                    left: `${activeBox.bbox.x}%`,
                    width: `${activeBox.bbox.width}%`,
                    height: `${activeBox.bbox.height}%`
                  }}
                  className={`absolute border-2 rounded z-20 transition-all duration-300 ${
                    activeBox.match === 'VICTIM'
                      ? 'border-[#00C853] bg-[#00C853]/15 shadow-[0_0_15px_rgba(0,200,83,0.35)]'
                      : 'border-[#FF1744] bg-[#FF1744]/15 shadow-[0_0_15px_rgba(255,23,68,0.35)]'
                  }`}
                >
                  <div 
                    style={{ backgroundColor: activeBox.match === 'VICTIM' ? '#00C853' : '#FF1744' }}
                    className="absolute -top-6 left-0 px-2 py-0.5 text-[#0B0C10] text-[10px] font-mono font-extrabold rounded shadow-md flex items-center space-x-1"
                  >
                    <span>{activeBox.match}</span>
                    <span>[{Math.round(activeBox.confidence * 100)}%]</span>
                  </div>

                  {/* FEATURE 3: CHAIN-OF-CUSTODY SEAL ICON ON DETECTION FRAME */}
                  <button
                    onClick={() => setShowCustodyPopup(!showCustodyPopup)}
                    className="absolute -bottom-6 right-0 p-1 bg-[#15161D] hover:bg-[#00C853] text-[#00C853] hover:text-[#0B0C10] border border-[#00C853] rounded text-[9px] font-mono font-bold flex items-center space-x-1 shadow-lg transition-colors cursor-pointer"
                    title="View Chain of Custody Seal"
                  >
                    <ShieldCheck className="w-3 h-3" />
                    <span>SEAL</span>
                  </button>

                  <div className="absolute -top-1 -left-1 w-2 h-2 border-t-2 border-l-2 border-white" />
                  <div className="absolute -top-1 -right-1 w-2 h-2 border-t-2 border-r-2 border-white" />
                  <div className="absolute -bottom-1 -left-1 w-2 h-2 border-b-2 border-l-2 border-white" />
                  <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b-2 border-r-2 border-white" />
                </div>
              )}

              {/* CHAIN-OF-CUSTODY POPUP MODAL */}
              {showCustodyPopup && (
                <div className="absolute bottom-14 right-4 bg-[#15161D]/95 border border-[#00C853] rounded-xl p-3.5 z-30 text-xs font-mono shadow-2xl backdrop-blur-md w-72 space-y-1.5 animate-slide-down">
                  <div className="flex items-center justify-between pb-1 border-b border-[#1E1F2A]">
                    <span className="text-[#00C853] font-bold flex items-center space-x-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>CHAIN-OF-CUSTODY SEAL</span>
                    </span>
                    <button onClick={() => setShowCustodyPopup(false)} className="text-[#8A8B9A] hover:text-white">✕</button>
                  </div>
                  <div className="text-[10px] text-[#8A8B9A]">
                    <div>TIMESTAMP: <strong className="text-white">{formatTime(currentTime)} UTC</strong></div>
                    <div>OFFICER: <strong className="text-white">Inspr. A. Rajesh (KP-4401)</strong></div>
                    <div className="truncate">FRAME HASH: <strong className="text-[#FF6B35]">3d41f8...912cb84</strong></div>
                    <div>STATUS: <strong className="text-[#00C853]">COURT-READY (SEC 65B)</strong></div>
                  </div>
                </div>
              )}

              {/* Top HUD */}
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-20 pointer-events-none">
                <div className="bg-[#15161D]/90 border border-[#1E1F2A] px-3 py-1.5 rounded-lg flex items-center space-x-2 text-[11px] font-mono">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FF1744] animate-pulse" />
                  <span className="text-white font-bold">{videoFilename}</span>
                </div>
                <div className="bg-[#15161D]/90 border border-[#1E1F2A] px-3 py-1.5 rounded-lg text-[11px] font-mono text-white flex items-center space-x-2">
                  <Clock className="w-3.5 h-3.5 text-[#FF6B35]" />
                  <span>{formatTime(currentTime)} / {formatTime(totalDuration)}</span>
                </div>
              </div>

              {/* Bottom HUD */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between z-20 pointer-events-none">
                <div className="bg-[#15161D]/90 border border-[#1E1F2A] px-3 py-1 rounded-lg text-[10px] font-mono text-[#8A8B9A]">
                  GPS: <strong className="text-white">9.9726° N, 76.2783° E (Sector 7)</strong>
                </div>
                <div className="bg-[#15161D]/90 border border-[#00C853] px-3 py-1 rounded-lg text-[10px] font-mono text-[#00C853] font-bold">
                  ● 2 TARGETS MONITORED
                </div>
              </div>
            </div>

            {/* TIMELINE SCRUBBER */}
            <div className="p-3 bg-[#15161D] border border-[#1E1F2A] rounded-xl space-y-2">
              <div className="relative w-full h-4 flex items-center cursor-pointer">
                <input
                  type="range"
                  min={0}
                  max={totalDuration}
                  value={currentTime}
                  onChange={(e) => setCurrentTime(Number(e.target.value))}
                  className="w-full h-2 bg-[#0B0C10] rounded-lg appearance-none cursor-pointer accent-[#FF6B35] z-10"
                />

                <div className="absolute inset-x-0 h-2 pointer-events-none">
                  {detections.map((d) => {
                    const percent = (d.seconds / totalDuration) * 100;
                    const isVictim = d.match === 'VICTIM';
                    return (
                      <div
                        key={d.id}
                        style={{ left: `${percent}%` }}
                        className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full border-2 border-[#15161D] shadow-md z-20 ${
                          isVictim ? 'bg-[#00C853]' : 'bg-[#FF1744]'
                        }`}
                        title={`${d.match} at ${d.timestamp}`}
                      />
                    );
                  })}
                </div>
              </div>

              <div className="flex items-center justify-between text-xs font-mono">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-7 h-7 rounded-lg bg-[#1E1F2A] border border-[#FF6B35] flex items-center justify-center text-white"
                  >
                    {isPlaying ? <Pause className="w-3.5 h-3.5 text-[#FF6B35]" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
                  </button>

                  <button
                    onClick={() => setCurrentTime(0)}
                    className="p-1.5 bg-[#0B0C10] hover:bg-[#1E1F2A] text-[#8A8B9A] hover:text-white rounded-lg border border-[#1E1F2A]"
                    title="Reset"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>

                  <span className="text-white font-bold">
                    {formatTime(currentTime)} <span className="text-[#8A8B9A]">/ {formatTime(totalDuration)}</span>
                  </span>
                </div>

                <span className="text-[#8A8B9A] text-[10px] hidden sm:block">
                  SHORTCUTS: <strong className="text-white">SPACE</strong> (Play/Pause) • <strong className="text-white">←/→</strong> (±5s)
                </span>
              </div>
            </div>

            {/* FEATURE 7: AUDIO THREAT DETECTION & WAVEFORM VISUALIZATION */}
            <div className="bg-[#15161D] border border-[#1E1F2A] rounded-xl p-3.5 space-y-2.5">
              <div className="flex items-center justify-between pb-1 border-b border-[#1E1F2A]">
                <div className="flex items-center space-x-2">
                  <Mic className="w-3.5 h-3.5 text-[#FF6B35]" />
                  <span className="text-white text-xs font-bold uppercase tracking-wider font-mono">
                    Surveillance Audio Threat Detection
                  </span>
                </div>
                <span className="px-2 py-0.5 bg-[#FF1744]/20 border border-[#FF1744] text-[#FF1744] text-[9px] font-mono font-bold rounded">
                  THREAT LEVEL: HIGH
                </span>
              </div>

              {/* Simulated Live Audio Waveform */}
              <div className="h-10 bg-[#0B0C10] border border-[#1E1F2A] rounded-lg flex items-center justify-center space-x-1 px-3">
                {[40, 65, 80, 45, 90, 75, 30, 85, 95, 60, 40, 70, 85, 30, 60, 90, 100, 75, 50, 80, 65, 45, 85].map((h, i) => (
                  <div
                    key={i}
                    style={{ height: `${isPlaying ? h : 15}%` }}
                    className="w-1.5 bg-[#FF6B35] rounded-full transition-all duration-150 opacity-80"
                  />
                ))}
              </div>

              {/* Real-time Threat Transcription with Coercion Flagged in Red */}
              <div className="p-2.5 bg-[#0B0C10] border border-[#1E1F2A] rounded-lg text-xs font-mono leading-relaxed">
                <span className="text-[#8A8B9A] text-[10px] block mb-1">ACOUSTIC TRANSCRIPT (BEAMFORMED MIC 4):</span>
                <p className="text-white">
                  "[00:15:22] Suspect: Don't tell police or <strong className="text-[#FF1744] bg-[#FF1744]/20 px-1 rounded">I will leak everything</strong> to your school group. Bring the drive to Sector 7."
                </p>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* 3. RIGHT PANEL: TARGET PROFILES WITH DEDICATED ADD/UPDATE BUTTONS         */}
          {/* ========================================================================= */}
          <div className="lg:col-span-3 space-y-3">
            {/* VICTIM TARGET CARD */}
            <div className="bg-[#15161D] border border-[#1E1F2A] rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-[#1E1F2A]">
                <span className="text-[#8A8B9A] text-[11px] font-mono font-bold uppercase tracking-wider">
                  TARGET: VICTIM
                </span>
                <span className="flex items-center space-x-1 text-[#00C853] text-[10px] font-mono font-bold">
                  <span className="w-2 h-2 rounded-full bg-[#00C853] animate-pulse-success" />
                  <span>MONITORED</span>
                </span>
              </div>

              <div className="flex items-center space-x-3">
                <img
                  src={victimPreview || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80"}
                  alt="Victim"
                  className="w-14 h-14 rounded-xl object-cover border border-[#00C853] shadow-md flex-shrink-0"
                />
                <div className="truncate flex-1">
                  <h4 className="text-white font-bold text-xs truncate">
                    Victim Profile (Minor 15)
                  </h4>
                  <p className="text-[#8A8B9A] text-[11px] font-mono truncate">
                    {victimFile?.name || "victim_reference.jpg"}
                  </p>
                  <span className="text-[#00C853] text-[10px] font-mono font-bold block mt-0.5">
                    2 Sightings Registered
                  </span>
                </div>
              </div>

              <button
                onClick={() => quickVictimInputRef.current.click()}
                className="w-full py-2 bg-[#0B0C10] hover:bg-[#1E1F2A] border border-[#1E1F2A] hover:border-[#00C853] text-white text-xs font-mono font-bold rounded-lg transition-all flex items-center justify-center space-x-1.5"
              >
                <Plus className="w-3.5 h-3.5 text-[#00C853]" />
                <span>Add / Update Victim Photo</span>
              </button>
            </div>

            {/* SUSPECT TARGET CARD */}
            <div className="bg-[#15161D] border border-[#FF6B35] rounded-xl p-4 space-y-3 card-selected-glow">
              <div className="flex items-center justify-between pb-2 border-b border-[#1E1F2A]">
                <span className="text-[#FF6B35] text-[11px] font-mono font-bold uppercase tracking-wider">
                  TARGET: SUSPECT
                </span>
                <span className="flex items-center space-x-1 text-[#FF1744] text-[10px] font-mono font-bold">
                  <span className="w-2 h-2 rounded-full bg-[#FF1744] animate-ping" />
                  <span>HIGH PRIORITY</span>
                </span>
              </div>

              <div className="flex items-center space-x-3">
                <img
                  src={suspectPreview || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80"}
                  alt="Suspect"
                  className="w-14 h-14 rounded-xl object-cover border border-[#FF1744] shadow-md flex-shrink-0"
                />
                <div className="truncate flex-1">
                  <h4 className="text-white font-bold text-xs truncate">
                    Suspect Alpha (NexusLead)
                  </h4>
                  <p className="text-[#8A8B9A] text-[11px] font-mono truncate">
                    {suspectFile?.name || "suspect_alpha.jpg"}
                  </p>
                  <span className="text-[#FF1744] text-[10px] font-mono font-bold block mt-0.5">
                    Cross-Case #KP-2024-0192
                  </span>
                </div>
              </div>

              <button
                onClick={() => quickSuspectInputRef.current.click()}
                className="w-full py-2 bg-[#0B0C10] hover:bg-[#1E1F2A] border border-[#1E1F2A] hover:border-[#FF1744] text-white text-xs font-mono font-bold rounded-lg transition-all flex items-center justify-center space-x-1.5"
              >
                <Plus className="w-3.5 h-3.5 text-[#FF1744]" />
                <span>Add / Update Suspect Photo</span>
              </button>
            </div>

            {/* SYSTEM STATUS PANEL */}
            <div className="bg-[#15161D] border border-[#1E1F2A] rounded-xl p-4 space-y-2.5">
              <div className="flex items-center justify-between pb-2 border-b border-[#1E1F2A]">
                <span className="text-white text-xs font-bold uppercase tracking-wider font-mono flex items-center space-x-1.5">
                  <Cpu className="w-3.5 h-3.5 text-[#FF6B35]" />
                  <span>SYSTEM STATUS</span>
                </span>
                <span className="text-[10px] font-mono text-[#00C853]">OPTIMAL</span>
              </div>

              <div className="space-y-1.5 text-xs font-mono">
                <div className="p-2 bg-[#0B0C10] border border-[#1E1F2A] rounded-lg flex justify-between">
                  <span className="text-[#8A8B9A]">STREAM FPS:</span>
                  <span className="text-white font-bold">{fps} FPS</span>
                </div>

                <div className="p-2 bg-[#0B0C10] border border-[#1E1F2A] rounded-lg flex justify-between">
                  <span className="text-[#8A8B9A]">FRAMES PROCESSED:</span>
                  <span className="text-[#00C853] font-bold">{framesProcessed}</span>
                </div>

                <div className="p-2 bg-[#0B0C10] border border-[#1E1F2A] rounded-lg flex justify-between">
                  <span className="text-[#8A8B9A]">FACES DETECTED:</span>
                  <span className="text-[#FF6B35] font-bold">{facesDetectedCount}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AUTO-FIR REPORT MODAL (FEATURE 4) */}
      <AutoFirReportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        detections={detections}
        suspectPreview={suspectPreview}
        victimPreview={victimPreview}
        videoFilename={videoFilename}
      />
    </div>
  );
}
