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
  EyeOff,
  AlertTriangle,
  CheckCircle,
  FolderOpen,
  TrendingUp,
  Users,
  Camera,
  Activity,
  ArrowRight,
  Zap,
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

// ── Mock Case Statistics ──────────────────────────────────────────────────────
const caseStats = {
  todayTotal: 7,
  highRisk: 3,
  mediumPriority: 2,
  resolved: 2,
  openCases: 14,
  pendingReview: 5,
};

const recentCases = [
  { id: "KP-2026-0812", title: "Online Grooming — Minor Victim A", status: "HIGH RISK", priority: "CRITICAL", officer: "SI Kumar", time: "09:15 AM", statusColor: "#FF1744" },
  { id: "KP-2026-0811", title: "Cyberstalking — WhatsApp Harassment", status: "MEDIUM", priority: "MEDIUM", officer: "ASI Rajan", time: "08:40 AM", statusColor: "#FFB300" },
  { id: "KP-2026-0810", title: "Image Blackmail — Telegram", status: "HIGH RISK", priority: "HIGH", officer: "SI Priya", time: "07:55 AM", statusColor: "#FF1744" },
  { id: "KP-2026-0809", title: "Financial Fraud — UPI Scam", status: "MEDIUM", priority: "MEDIUM", officer: "HC Suresh", time: "07:20 AM", statusColor: "#FFB300" },
  { id: "KP-2026-0808", title: "Phishing Attack — Banking", status: "RESOLVED", priority: "LOW", officer: "PC Anand", time: "06:45 AM", statusColor: "#00C853" },
  { id: "KP-2026-0807", title: "Identity Theft — Social Media", status: "HIGH RISK", priority: "HIGH", officer: "SI Kumar", time: "06:10 AM", statusColor: "#FF1744" },
  { id: "KP-2026-0806", title: "Child Exploitation — Dark Web", status: "RESOLVED", priority: "CRITICAL", officer: "DSP Menon", time: "05:30 AM", statusColor: "#00C853" },
];

const agentStatuses = [
  { name: "Evidence Custodian", status: "active", task: "Indexing 142 items" },
  { name: "Pattern Hunter", status: "processing", task: "Cross-correlating" },
  { name: "Digital Tracker", status: "active", task: "Gait analysis live" },
  { name: "Threat Scout", status: "idle", task: "Standby" },
  { name: "Report Writer", status: "idle", task: "Standby" },
];

export default function DashboardPage() {
  const navigate = useNavigate();

  // Video State
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const totalDuration = 30;
  const [privacyMode, setPrivacyMode] = useState(false);

  // Modals & Overlays
  const [isAmberShieldActive, setIsAmberShieldActive] = useState(false);
  const [amberShieldCountdown, setAmberShieldCountdown] = useState(272);
  const [familyAlertSent, setFamilyAlertSent] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  // Interactive logs / Speech
  const [triggeredAlerts, setTriggeredAlerts] = useState(new Set());
  const [toasts, setToasts] = useState([]);
  const [voiceEnabled, setVoiceEnabled] = useState(true);

  // Active tab in right panel
  const [rightTab, setRightTab] = useState('cases'); // 'cases' | 'agents'

  const speakText = (text) => {
    if (voiceEnabled && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.05;
      utterance.pitch = 0.95;
      window.speechSynthesis.speak(utterance);
    }
  };

  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return [minutes, seconds].map(v => v.toString().padStart(2, '0')).join(':');
  };

  const triggerToast = (text, type) => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, text, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  useEffect(() => {
    let interval = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= totalDuration) { setIsPlaying(false); return 0; }
          return Math.min(prev + playbackSpeed, totalDuration);
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, playbackSpeed]);

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
          if (det.id === 3) {
            setTimeout(() => {
              setIsAmberShieldActive(true);
              speakText("Amber Shield activated. Suspect approaching victim location. Interception required.");
            }, 1000);
          }
        }
      }
    });

    const newTriggered = new Set();
    mockDetections.forEach(det => {
      if (currentTime >= det.seconds) newTriggered.add(det.id);
    });
    if (newTriggered.size < triggeredAlerts.size) setTriggeredAlerts(newTriggered);
  }, [currentTime]);

  const activeBox = mockDetections.find(det =>
    currentTime >= det.seconds && currentTime <= det.seconds + 2
  );

  const triggerMockPdfDownload = () => {
    setIsGeneratingPdf(true);
    setTimeout(() => {
      setIsGeneratingPdf(false);
      triggerToast("✓ FIR Annexure PDF Downloaded successfully", "victim");
    }, 2000);
  };

  const statusDotColor = (s) =>
    s === 'active' ? '#00C853' : s === 'processing' ? '#FFB300' : '#8A8B9A';

  return (
    <div className="min-h-screen bg-[#0B0C10] text-white flex flex-col font-sans select-none pb-14">

      {/* ── HEADER ─────────────────────────────────────────────────────────── */}
      <header className="h-[64px] border-b border-[#1E1F2A] bg-[#15161D] px-6 flex items-center justify-between z-40 select-none shrink-0">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-[8px] bg-[#1E1F2A] border border-[#FF6B35] flex items-center justify-center overflow-hidden">
            <img src="/sentinel_logo.png" alt="FORENSIC AI Logo" className="w-full h-full object-cover animate-eye-blink" />
          </div>
          <span className="text-white font-extrabold text-[18px] tracking-tight font-sans">FORENSIC AI</span>
        </div>

        <nav className="hidden md:flex space-x-6 h-full items-center text-xs font-semibold tracking-wider uppercase">
          <span className="text-white border-b-2 border-[#FF6B35] h-full flex items-center px-1 cursor-default">Dashboard</span>
          <span className="text-[#8A8B9A] hover:text-white transition-colors cursor-pointer" onClick={() => navigate('/krypt')}>CCTV Multi-Cam</span>
          <span className="text-[#8A8B9A] hover:text-white transition-colors cursor-pointer" onClick={() => navigate('/evidence')}>Evidence</span>
          <span className="text-[#8A8B9A] hover:text-white transition-colors cursor-pointer" onClick={() => navigate('/analysis')}>Analysis</span>
          <span className="text-[#8A8B9A] hover:text-white transition-colors cursor-pointer" onClick={() => navigate('/reports')}>Reports</span>
        </nav>

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
            onClick={() => setIsReportOpen(true)}
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

      {/* ── MAIN GRID ─────────────────────────────────────────────────────── */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-5 p-5 max-w-[1700px] mx-auto w-full items-stretch">

        {/* LEFT COLUMN: TARGET PROFILES & DETECTION LOG */}
        <div className="lg:col-span-3 space-y-4 flex flex-col">

          {/* Target Profiles */}
          <div className="bg-[#15161D] border border-[#1E1F2A] rounded-[8px] p-4 space-y-3">
            <span className="text-[10px] font-mono uppercase text-[#8A8B9A] tracking-widest block font-extrabold">TARGET PROFILES</span>

            <div className="flex items-center space-x-3 p-2 bg-[#1E1F2A] rounded-[8px]">
              <img src={mockData.victim.photo} alt="Victim" className="w-10 h-10 rounded-[6px] object-cover bg-[#0B0C10]" />
              <div className="flex-1 min-w-0">
                <span className="text-white text-xs font-bold block truncate">{mockData.victim.name}</span>
                <span className="text-[#8A8B9A] text-[10px] block">Age: {mockData.victim.age} • Active</span>
              </div>
              <span className="w-2 h-2 rounded-full bg-[#00C853] flex-shrink-0 animate-pulse" />
            </div>

            <div className="flex items-center space-x-3 p-2 bg-[#1E1F2A] rounded-[8px]">
              <img src={mockData.suspect.photo} alt="Suspect" className="w-10 h-10 rounded-[6px] object-cover bg-[#0B0C10]" />
              <div className="flex-1 min-w-0">
                <span className="text-white text-xs font-bold block truncate">{mockData.suspect.name}</span>
                <span className="text-[#FF6B35] text-[10px] font-mono block">Alias: {mockData.suspect.alias}</span>
              </div>
              <span className="w-2 h-2 rounded-full bg-[#FF1744] flex-shrink-0 animate-pulse" />
            </div>
          </div>

          {/* Detection Log */}
          <div className="bg-[#15161D] border border-[#1E1F2A] rounded-[8px] p-4 flex-1 flex flex-col min-h-[280px]">
            <DetectionLog
              logs={mockDetections}
              onJump={(sec) => { setCurrentTime(sec); setIsPlaying(false); }}
              currentTime={currentTime}
            />
            <div className="pt-2 border-t border-[#1E1F2A] text-[9px] font-mono text-[#8A8B9A] flex justify-between mt-2">
              <span>FACENET MATRIX</span>
              <span className="text-[#00C853]">AUTO-SYNCED</span>
            </div>
          </div>
        </div>

        {/* CENTER COLUMN: VIDEO PLAYER */}
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

        {/* RIGHT COLUMN: CASE DASHBOARD STATS */}
        <div className="lg:col-span-3 space-y-4 flex flex-col">

          {/* ── Stat Cards ── */}
          <div className="grid grid-cols-2 gap-3">
            {/* Cases Today */}
            <div className="bg-[#15161D] border border-[#1E1F2A] rounded-[8px] p-4 col-span-2 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-mono uppercase text-[#8A8B9A] tracking-widest font-extrabold mb-1">CASES TODAY</p>
                <p className="text-white font-extrabold text-3xl font-mono">{caseStats.todayTotal}</p>
                <p className="text-[#8A8B9A] text-[11px] mt-1">Aug 12, 2026</p>
              </div>
              <div className="w-12 h-12 rounded-[8px] bg-[#FF6B35]/10 border border-[#FF6B35]/30 flex items-center justify-center">
                <FolderOpen className="w-6 h-6 text-[#FF6B35]" />
              </div>
            </div>

            {/* High Risk */}
            <div className="bg-[#15161D] border border-[#FF1744]/30 rounded-[8px] p-3 flex flex-col gap-1">
              <div className="flex items-center justify-between mb-1">
                <p className="text-[10px] font-mono uppercase text-[#8A8B9A] tracking-widest font-extrabold">HIGH RISK</p>
                <AlertTriangle className="w-3.5 h-3.5 text-[#FF1744]" />
              </div>
              <p className="text-[#FF1744] font-extrabold text-2xl font-mono">{caseStats.highRisk}</p>
              <p className="text-[#8A8B9A] text-[10px]">Immediate action</p>
            </div>

            {/* Medium Priority */}
            <div className="bg-[#15161D] border border-[#FFB300]/30 rounded-[8px] p-3 flex flex-col gap-1">
              <div className="flex items-center justify-between mb-1">
                <p className="text-[10px] font-mono uppercase text-[#8A8B9A] tracking-widest font-extrabold">MEDIUM</p>
                <Activity className="w-3.5 h-3.5 text-[#FFB300]" />
              </div>
              <p className="text-[#FFB300] font-extrabold text-2xl font-mono">{caseStats.mediumPriority}</p>
              <p className="text-[#8A8B9A] text-[10px]">Under review</p>
            </div>

            {/* Resolved */}
            <div className="bg-[#15161D] border border-[#00C853]/20 rounded-[8px] p-3 flex flex-col gap-1">
              <div className="flex items-center justify-between mb-1">
                <p className="text-[10px] font-mono uppercase text-[#8A8B9A] tracking-widest font-extrabold">RESOLVED</p>
                <CheckCircle className="w-3.5 h-3.5 text-[#00C853]" />
              </div>
              <p className="text-[#00C853] font-extrabold text-2xl font-mono">{caseStats.resolved}</p>
              <p className="text-[#8A8B9A] text-[10px]">Closed today</p>
            </div>

            {/* Open Cases */}
            <div className="bg-[#15161D] border border-[#1E1F2A] rounded-[8px] p-3 flex flex-col gap-1">
              <div className="flex items-center justify-between mb-1">
                <p className="text-[10px] font-mono uppercase text-[#8A8B9A] tracking-widest font-extrabold">OPEN TOTAL</p>
                <TrendingUp className="w-3.5 h-3.5 text-[#8A8B9A]" />
              </div>
              <p className="text-white font-extrabold text-2xl font-mono">{caseStats.openCases}</p>
              <p className="text-[#8A8B9A] text-[10px]">All active</p>
            </div>
          </div>

          {/* ── Recent Cases Table ── */}
          <div className="bg-[#15161D] border border-[#1E1F2A] rounded-[8px] p-4 flex-1 flex flex-col min-h-0">
            {/* Tab row */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex gap-1">
                <button
                  onClick={() => setRightTab('cases')}
                  className={`px-3 py-1 rounded-[6px] text-xs font-semibold transition-colors ${
                    rightTab === 'cases'
                      ? 'bg-[#FF6B35] text-black'
                      : 'text-[#8A8B9A] hover:text-white bg-[#1E1F2A]'
                  }`}
                >
                  Recent Cases
                </button>
                <button
                  onClick={() => setRightTab('agents')}
                  className={`px-3 py-1 rounded-[6px] text-xs font-semibold transition-colors ${
                    rightTab === 'agents'
                      ? 'bg-[#FF6B35] text-black'
                      : 'text-[#8A8B9A] hover:text-white bg-[#1E1F2A]'
                  }`}
                >
                  Agents
                </button>
              </div>
              <span className="text-[10px] font-mono text-[#8A8B9A]">{new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</span>
            </div>

            {rightTab === 'cases' ? (
              <div className="flex-1 overflow-y-auto space-y-2 pr-1" style={{ maxHeight: 340 }}>
                {recentCases.map((c) => (
                  <div
                    key={c.id}
                    onClick={() => triggerToast(`Opening case ${c.id}...`, 'victim')}
                    className="flex items-start justify-between p-2.5 bg-[#1E1F2A] rounded-[8px] cursor-pointer hover:bg-[#252637] transition-colors border border-transparent hover:border-[#FF6B35]/20"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 mb-1">
                        <span
                          className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                          style={{ background: c.statusColor }}
                        />
                        <span className="text-white text-[11px] font-bold truncate">{c.title}</span>
                      </div>
                      <div className="flex items-center gap-2 text-[10px] font-mono text-[#8A8B9A]">
                        <span>{c.id}</span>
                        <span>•</span>
                        <span>{c.officer}</span>
                        <span>•</span>
                        <span>{c.time}</span>
                      </div>
                    </div>
                    <span
                      className="ml-2 flex-shrink-0 px-1.5 py-0.5 rounded text-[9px] font-bold uppercase font-mono"
                      style={{
                        color: c.statusColor,
                        background: c.statusColor + '20',
                        border: `1px solid ${c.statusColor}40`,
                      }}
                    >
                      {c.priority}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto space-y-2 pr-1">
                {agentStatuses.map((agent) => (
                  <div key={agent.name} className="flex items-center gap-3 p-2.5 bg-[#1E1F2A] rounded-[8px]">
                    <span
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ background: statusDotColor(agent.status) }}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-xs font-semibold truncate">{agent.name}</p>
                      <p className="text-[#8A8B9A] text-[10px]">{agent.task}</p>
                    </div>
                    <span
                      className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded"
                      style={{
                        color: statusDotColor(agent.status),
                        background: statusDotColor(agent.status) + '20',
                      }}
                    >
                      {agent.status}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* View All Cases button */}
            {rightTab === 'cases' && (
              <button
                onClick={() => navigate('/evidence')}
                className="mt-3 w-full flex items-center justify-center gap-1.5 py-2 border border-[#1E1F2A] hover:border-[#FF6B35]/40 text-[#8A8B9A] hover:text-white text-xs font-semibold rounded-[8px] transition-colors"
              >
                View All Cases
                <ArrowRight className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* ── Privacy Toggle ── */}
          <div className="bg-[#15161D] border border-[#1E1F2A] rounded-[8px] p-4 flex items-center justify-between">
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

      {/* ── AUTO-FIR REPORT MODAL ────────────────────────────────────────── */}
      {isReportOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs select-none">
          <div className="relative w-full max-w-3xl bg-[#15161D] border border-[#1E1F2A] rounded-[8px] shadow-2xl p-6 overflow-y-auto max-h-[92vh] flex flex-col justify-between font-sans">
            <div>
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

              <div className="py-4">
                <span className="text-[10px] font-mono uppercase text-[#8A8B9A] tracking-wider block font-extrabold mb-2.5">INTELLIGENCE LOG MATRIX</span>
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
                  className="px-5 py-2 bg-[#FF6B35] hover:bg-[#E85A24] text-[#0B0C10] font-bold text-xs uppercase tracking-wider rounded-[8px] transition-colors flex items-center space-x-2"
                >
                  <Download className="w-4 h-4 text-[#0B0C10]" />
                  <span>{isGeneratingPdf ? "Generating..." : "DOWNLOAD PDF"}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── TOASTS ─────────────────────────────────────────────────────────── */}
      <div className="fixed top-6 right-6 space-y-2 z-[999] pointer-events-none max-w-sm w-full">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`p-3 border-l-4 rounded-[6px] shadow-2xl flex items-center justify-between text-xs font-mono text-white pointer-events-auto bg-[#15161D] border-[#1E1F2A] ${
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

      {/* ── AMBER SHIELD OVERLAY ─────────────────────────────────────────── */}
      {isAmberShieldActive && (
        <AmberShield
          countdown={amberShieldCountdown}
          setCountdown={setAmberShieldCountdown}
          familyAlertSent={familyAlertSent}
          setFamilyAlertSent={setFamilyAlertSent}
          onClose={() => setIsAmberShieldActive(false)}
          officers={amberShieldData?.officers || []}
          speakText={speakText}
        />
      )}
    </div>
  );
}
