import { useState, useEffect, useRef, useCallback } from 'react';
import {
  Eye, Search, Bell, Plus, ChevronRight, ChevronDown,
  Play, Pause, SkipBack, Volume2, X, Radio, Shield,
  AlertTriangle, FileText, Camera, MessageSquare,
  Smartphone, Network, Clock, MapPin, User, Zap,
  Activity, ArrowRight, Monitor, Layers, BarChart3,
} from 'lucide-react';

// ─── MOCK DATA ───────────────────────────────────────────────────────────────
const mockData = {
  victim: { name: "Victim A", age: 14, status: "ACTIVE" },
  suspect: { name: "Suspect X", alias: "Shadow_07", status: "WANTED" },
  detections: [
    { time: "00:05", type: "SUSPECT", camera: "CAM-03", behavior: "LOITERING" },
    { time: "00:12", type: "VICTIM", camera: "CAM-03", behavior: "WALKING" },
    { time: "00:18", type: "SUSPECT", camera: "CAM-03", behavior: "FOLLOWING" },
    { time: "00:24", type: "SUSPECT", camera: "CAM-07", behavior: "RUNNING" },
    { time: "00:31", type: "VICTIM", camera: "CAM-07", behavior: "STOPPED" },
    { time: "00:38", type: "SUSPECT", camera: "CAM-12", behavior: "EXIT" },
  ],
  whatsappMessages: [
    { id: 1, from: "suspect", text: "Hey! You played really well in the FreeFire tournament yesterday. I have the premium redeem code worth ₹5000 for you.", time: "15:10", flagged: false },
    { id: 2, from: "victim", text: "Really? Thank you! How do I get it?", time: "15:12", flagged: false },
    { id: 3, from: "suspect", text: "Keep this between us, okay? Don't tell your parents or friends in school. This is our private secret.", time: "15:15", flagged: true, reason: "ISOLATION & SECRECY ENFORCEMENT", tactic: "Overt Grooming via Exclusivity", law: "BNS Sec 78 / POCSO Act 2012" },
    { id: 4, from: "victim", text: "Okay... what do I need to do?", time: "15:17", flagged: false },
    { id: 5, from: "suspect", text: "Send me a photo first. Just face only. No one will know.", time: "15:19", flagged: true, reason: "IMAGE SOLICITATION — MINOR", tactic: "Coercive Image Extraction", law: "BNS Sec 351(2) / IPC 506 / POCSO 13" },
    { id: 6, from: "victim", text: "I'm not comfortable with that", time: "15:22", flagged: false },
    { id: 7, from: "suspect", text: "Fine. Then I'll tell everyone in school you cheated in the tournament. Choose wisely.", time: "15:24", flagged: true, reason: "THREAT & EXTORTION", tactic: "Overt Blackmail & Extortion", law: "BNS Sec 351(2) / IPC 506 / IT Act 67B" },
  ],
  graphNodes: [
    { id: "alpha", label: "Suspect Alpha", sub: "NexusLead", type: "suspect", risk: "CRITICAL", match: "CAM-04 MATCH", x: 42, y: 28 },
    { id: "docket", label: "Operation Docket", sub: "KP-2026-0812", type: "case", x: 50, y: 52 },
    { id: "beta", label: "Suspect Beta", sub: "HIGH RISK", type: "suspect", risk: "HIGH", match: "CAM-09", x: 22, y: 58 },
    { id: "gamma", label: "Suspect Gamma", sub: "COURIER NODE", type: "neutral", x: 72, y: 38 },
    { id: "device", label: "Device Evidence", sub: "142 items", type: "evidence", x: 60, y: 72 },
    { id: "telegram", label: "Telegram Bot", sub: "Common Token", type: "evidence", x: 30, y: 38 },
  ],
  graphEdges: [
    { from: "alpha", to: "docket" },
    { from: "beta", to: "docket" },
    { from: "gamma", to: "alpha" },
    { from: "alpha", to: "telegram" },
    { from: "beta", to: "telegram" },
    { from: "docket", to: "device" },
  ],
  crossCaseAlert: "Cross-link verified between KP-2026-0812 and KP-2024-0192. Common Telegram bot token & CAM-04 biometric gait signature detected.",
  amberShield: {
    timeToContact: 272,
    officers: [
      { name: "SI Kumar", distance: 1.8, eta: 200, type: "foot", recommended: true },
      { name: "Beat Officer Ravi", distance: 2.1, eta: 225, type: "bike" },
      { name: "PCR Van Unit 7", distance: 3.4, eta: 252, type: "vehicle" }
    ]
  },
  cameras: [
    { id: "CAM-01", location: "Sector 2 — Market", active: false },
    { id: "CAM-03", location: "Sector 4 — Station Rd", active: true },
    { id: "CAM-07", location: "Sector 6 — Park Entry", active: false },
    { id: "CAM-12", location: "Sector 9 — Highway", active: false },
  ],
  agents: [
    { name: "Evidence Custodian", status: "active" },
    { name: "Pattern Hunter", status: "processing" },
    { name: "Digital Tracker", status: "active" },
    { name: "Threat Scout", status: "idle" },
    { name: "Report Writer", status: "idle" },
  ],
};

// ─── HELPERS ──────────────────────────────────────────────────────────────────
const cn = (...classes) => classes.filter(Boolean).join(' ');

function StatusDot({ status }) {
  const color = status === 'active' ? 'bg-success' : status === 'processing' ? 'bg-warning' : status === 'wanted' ? 'bg-danger' : 'bg-muted';
  return <span className={cn('status-dot', color, status === 'active' && 'pulse-dot')} />;
}

function SectionLabel({ children, className }) {
  return <p className={cn('section-label', className)}>{children}</p>;
}

function Divider() {
  return <div className="h-px bg-border my-3" />;
}

function formatTime(secs) {
  const m = Math.floor(secs / 60).toString().padStart(2, '0');
  const s = (secs % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

// ─── HEADER ───────────────────────────────────────────────────────────────────
function Header({ activeTab, setActiveTab, onDebrief, onSearch }) {
  const tabs = ['Dashboard', 'Evidence', 'Analysis', 'Reports'];

  return (
    <header className="h-14 bg-card border-b border-border flex items-center px-4 gap-6 shrink-0 z-10" style={{ minHeight: 56, maxHeight: 56 }}>
      {/* Left: Brand */}
      <div className="flex items-center gap-2.5 shrink-0">
        <div className="w-9 h-9 rounded-lg bg-elevated flex items-center justify-center border border-border">
          <Eye size={18} className="text-accent" />
        </div>
        <div className="flex flex-col leading-none">
          <span className="text-white font-bold" style={{ fontSize: 18 }}>FORENSIC AI</span>
          <span className="text-muted font-mono" style={{ fontSize: 10 }}>KP-2026</span>
        </div>
      </div>

      {/* Center: Tabs */}
      <nav className="flex items-center gap-1 h-full flex-1 justify-center">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              'px-4 h-full text-sm font-medium transition-colors relative focus:outline-none',
              activeTab === tab ? 'text-white' : 'text-muted hover:text-white'
            )}
          >
            {tab}
            {activeTab === tab && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent" />
            )}
          </button>
        ))}
      </nav>

      {/* Right: Actions */}
      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={onDebrief}
          className="flex items-center gap-1.5 bg-accent text-black font-semibold px-3 py-1.5 rounded-full text-xs hover:bg-accent-hover transition-colors"
        >
          <Radio size={12} />
          CASE DEBRIEF
        </button>
        <button onClick={onSearch} className="w-8 h-8 rounded-lg hover:bg-elevated flex items-center justify-center text-muted hover:text-white transition-colors">
          <Search size={16} />
        </button>
        <button className="w-8 h-8 rounded-lg hover:bg-elevated flex items-center justify-center text-muted hover:text-white transition-colors relative">
          <Bell size={16} />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-danger rounded-full" />
        </button>
        <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center text-black font-bold text-xs cursor-pointer">
          KP
        </div>
      </div>
    </header>
  );
}

// ─── SIDEBAR ──────────────────────────────────────────────────────────────────
function Sidebar({ activeNav, setActiveNav, onNewCase, onAmberShield }) {
  const evidenceSources = [
    { key: 'cctv', icon: Camera, label: 'CCTV Feeds' },
    { key: 'whatsapp', icon: MessageSquare, label: 'WhatsApp Chats' },
    { key: 'instagram', icon: Activity, label: 'Instagram DMs' },
    { key: 'device', icon: Smartphone, label: 'Device Files' },
    { key: 'graph', icon: Network, label: 'Cross-Platform Graph' },
  ];
  const investigation = [
    { key: 'dashboard', icon: Monitor, label: 'Case Dashboard' },
    { key: 'analysis', icon: Search, label: 'Evidence Analysis' },
    { key: 'knowledge', icon: Network, label: 'Knowledge Graph' },
    { key: 'timeline', icon: Clock, label: 'Timeline' },
    { key: 'archive', icon: Layers, label: 'Archive' },
  ];

  return (
    <aside className="w-60 bg-card border-r border-border flex flex-col shrink-0 overflow-y-auto">
      {/* New Case */}
      <div className="p-3 shrink-0">
        <button
          onClick={onNewCase}
          className="w-full h-10 bg-accent text-black font-semibold text-sm rounded-lg flex items-center justify-center gap-2 hover:bg-accent-hover transition-colors"
        >
          <Plus size={16} />
          New Case
        </button>
      </div>

      {/* Evidence Sources */}
      <div className="px-3 pb-1">
        <SectionLabel className="mb-2">Evidence Sources</SectionLabel>
        <div className="flex flex-col gap-0.5">
          {evidenceSources.map(({ key, icon: Icon, label }) => (
            <button
              key={key}
              onClick={() => setActiveNav(key)}
              className={cn(
                'flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors text-left w-full',
                activeNav === key
                  ? 'text-white bg-elevated border-l-2 border-accent pl-[10px]'
                  : 'text-muted hover:text-white hover:bg-elevated'
              )}
            >
              <Icon size={14} />
              {label}
            </button>
          ))}
        </div>
      </div>

      <Divider />

      {/* Investigation */}
      <div className="px-3 pb-1">
        <SectionLabel className="mb-2">Investigation</SectionLabel>
        <div className="flex flex-col gap-0.5">
          {investigation.map(({ key, icon: Icon, label }) => (
            <button
              key={key}
              onClick={() => setActiveNav(key)}
              className={cn(
                'flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors text-left w-full',
                activeNav === key
                  ? 'text-white bg-elevated border-l-2 border-accent pl-[10px]'
                  : 'text-muted hover:text-white hover:bg-elevated'
              )}
            >
              <Icon size={14} />
              {label}
            </button>
          ))}
        </div>
      </div>

      <Divider />

      {/* Autonomous Agents */}
      <div className="px-3 pb-4 mt-auto">
        <SectionLabel className="mb-2">Autonomous Agents</SectionLabel>
        <div className="flex flex-wrap gap-1.5">
          {mockData.agents.map(agent => (
            <div
              key={agent.name}
              title={agent.name}
              className="flex items-center gap-1 bg-elevated border border-border rounded-full px-2 py-0.5 text-xs text-muted cursor-default"
              style={{ height: 20, fontSize: 11 }}
            >
              <StatusDot status={agent.status} />
              {agent.name.split(' ')[0]}
            </div>
          ))}
        </div>

        {/* Amber Shield trigger */}
        <button
          onClick={onAmberShield}
          className="mt-3 w-full flex items-center gap-2 bg-danger/10 border border-danger/30 text-danger rounded-lg px-3 py-2 text-xs font-semibold hover:bg-danger/20 transition-colors"
        >
          <Shield size={12} />
          AMBER SHIELD
        </button>
      </div>
    </aside>
  );
}

// ─── TAB: DASHBOARD ───────────────────────────────────────────────────────────
function DashboardTab({ onSelectDetection }) {
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [selectedCamera, setSelectedCamera] = useState('CAM-03');
  const [privacyBlur, setPrivacyBlur] = useState(false);
  const [selectedDetection, setSelectedDetection] = useState(null);
  const timerRef = useRef(null);
  const totalDuration = 38;

  useEffect(() => {
    if (playing) {
      timerRef.current = setInterval(() => {
        setCurrentTime(t => {
          if (t >= totalDuration) { setPlaying(false); return 0; }
          return t + 1;
        });
      }, 1000 / speed);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [playing, speed]);

  return (
    <div className="flex gap-3 h-full p-3 min-w-0">

      {/* Left Panel: Targets + Log */}
      <div className="panel flex-col" style={{ width: 280, minWidth: 280 }}>
        <div className="panel-header">
          <SectionLabel>Target Profiles</SectionLabel>
        </div>
        <div className="p-4 flex flex-col gap-3">
          {/* Victim */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-elevated border border-success/30 flex items-center justify-center">
                <User size={14} className="text-success" />
              </div>
              <div>
                <p className="text-white text-sm font-medium">{mockData.victim.name}</p>
                <p className="text-muted" style={{ fontSize: 12 }}>Age {mockData.victim.age}</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <StatusDot status="active" />
              <span className="text-success font-semibold" style={{ fontSize: 11 }}>ACTIVE</span>
            </div>
          </div>

          {/* Suspect */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-elevated border border-danger/30 flex items-center justify-center">
                <AlertTriangle size={14} className="text-danger" />
              </div>
              <div>
                <p className="text-white text-sm font-medium">{mockData.suspect.name}</p>
                <p className="text-muted font-mono" style={{ fontSize: 12 }}>{mockData.suspect.alias}</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <StatusDot status="wanted" />
              <span className="text-danger font-semibold" style={{ fontSize: 11 }}>WANTED</span>
            </div>
          </div>
        </div>

        <div className="h-px bg-border mx-4" />

        {/* Detection Log */}
        <div className="panel-header mt-1">
          <SectionLabel>Detection Log</SectionLabel>
          <span className="text-muted font-mono" style={{ fontSize: 11 }}>{mockData.detections.length} events</span>
        </div>
        <div className="flex-1 overflow-y-auto p-2">
          {mockData.detections.map((d, i) => (
            <button
              key={i}
              onClick={() => {
                setSelectedDetection(d);
                const [m, s] = d.time.split(':').map(Number);
                setCurrentTime(m * 60 + s);
                setSelectedCamera(d.camera);
              }}
              className={cn(
                'w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg mb-1 text-left transition-colors',
                selectedDetection === d ? 'bg-elevated' : 'hover:bg-elevated/50'
              )}
            >
              <div className={cn('status-dot shrink-0', d.type === 'SUSPECT' ? 'bg-danger' : 'bg-success')} />
              <span className="font-mono text-muted" style={{ fontSize: 12 }}>{d.time}</span>
              <span className={cn('font-semibold shrink-0', d.type === 'SUSPECT' ? 'text-danger' : 'text-success')} style={{ fontSize: 11 }}>
                {d.type}
              </span>
              <span className="text-muted truncate" style={{ fontSize: 12 }}>{d.camera} — {d.behavior}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Center Panel: Video Player */}
      <div className="panel flex-1 min-w-0">
        {/* Feed label */}
        <div className="panel-header shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-danger pulse-dot" />
            <span className="text-white text-sm font-medium">CCTV FEED: Kochi Sector 4</span>
          </div>
          <span className="text-muted font-mono" style={{ fontSize: 11 }}>GPS: 10.0159°N, 76.3419°E</span>
        </div>

        {/* Video Area */}
        <div className="flex-1 relative bg-[#050508] flex items-center justify-center min-h-0">
          <div className="flex flex-col items-center gap-3 text-center">
            <Camera size={40} className="text-muted/40" />
            <p className="text-muted font-semibold" style={{ fontSize: 13 }}>CCTV VIDEO STREAMING</p>
            <p className="text-muted" style={{ fontSize: 12 }}>{selectedCamera} — Upload video to begin analysis</p>
          </div>

          {/* Bounding Box Overlay Simulation */}
          {selectedDetection && (
            <div className="absolute inset-0 pointer-events-none">
              <div
                className="absolute border-2 border-danger rounded"
                style={{ top: '25%', left: '60%', width: 80, height: 120 }}
              >
                <span className="absolute -top-5 left-0 bg-danger text-white px-1.5 py-0.5 rounded text-xs font-mono">SUSPECT</span>
              </div>
              <div
                className="absolute border-2 border-success rounded"
                style={{ top: '35%', left: '30%', width: 60, height: 100 }}
              >
                <span className="absolute -top-5 left-0 bg-success text-black px-1.5 py-0.5 rounded text-xs font-mono">VICTIM</span>
              </div>
            </div>
          )}

          {/* Privacy blur indicator */}
          {privacyBlur && (
            <div className="absolute top-3 right-3 bg-warning/20 border border-warning/40 text-warning px-2 py-1 rounded text-xs font-semibold">
              PRIVACY BLUR ON
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="px-4 py-3 border-t border-border shrink-0">
          <div className="flex items-center gap-3 mb-2">
            <button onClick={() => setCurrentTime(0)} className="text-muted hover:text-white transition-colors">
              <SkipBack size={16} />
            </button>
            <button
              onClick={() => setPlaying(p => !p)}
              className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center hover:bg-accent-hover transition-colors"
            >
              {playing ? <Pause size={14} className="text-black" /> : <Play size={14} className="text-black ml-0.5" />}
            </button>

            {/* Scrubber */}
            <div className="flex-1 relative">
              <input
                type="range"
                min={0}
                max={totalDuration}
                value={currentTime}
                onChange={e => setCurrentTime(Number(e.target.value))}
                className="scrubber w-full"
              />
              {/* Detection ticks */}
              {mockData.detections.map((d, i) => {
                const [m, s] = d.time.split(':').map(Number);
                const t = m * 60 + s;
                return (
                  <div
                    key={i}
                    className={cn('absolute top-0 w-0.5 h-full', d.type === 'SUSPECT' ? 'bg-danger/60' : 'bg-success/60')}
                    style={{ left: `${(t / totalDuration) * 100}%`, transform: 'translateX(-50%)' }}
                  />
                );
              })}
            </div>

            <span className="font-mono text-muted shrink-0" style={{ fontSize: 12 }}>
              {formatTime(currentTime)} / {formatTime(totalDuration)}
            </span>

            {/* Speed */}
            <div className="flex gap-1">
              {[1, 2, 5].map(s => (
                <button
                  key={s}
                  onClick={() => setSpeed(s)}
                  className={cn('px-2 py-0.5 rounded text-xs font-mono transition-colors', speed === s ? 'bg-accent text-black' : 'bg-elevated text-muted hover:text-white')}
                >
                  {s}x
                </button>
              ))}
            </div>
          </div>

          {/* Privacy toggle */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPrivacyBlur(p => !p)}
              className={cn('w-8 h-4 rounded-full transition-colors relative', privacyBlur ? 'bg-accent' : 'bg-elevated border border-border')}
            >
              <span className={cn('absolute top-0.5 w-3 h-3 rounded-full bg-white transition-transform', privacyBlur ? 'translate-x-4' : 'translate-x-0.5')} />
            </button>
            <span className="text-muted" style={{ fontSize: 12 }}>Privacy Blurring</span>
          </div>
        </div>
      </div>

      {/* Right Panel: Tracking + Cameras */}
      <div className="panel flex-col" style={{ width: 300, minWidth: 300 }}>
        <div className="panel-header">
          <SectionLabel>Cross-Camera Tracking</SectionLabel>
        </div>

        {/* Mini Map */}
        <div className="m-4 rounded-lg bg-[#050508] border border-border relative overflow-hidden" style={{ height: 200 }}>
          <div className="absolute inset-0 opacity-20">
            {/* Grid */}
            {[...Array(6)].map((_, i) => (
              <div key={i} className="absolute left-0 right-0 border-t border-muted/30" style={{ top: `${i * 20}%` }} />
            ))}
            {[...Array(6)].map((_, i) => (
              <div key={i} className="absolute top-0 bottom-0 border-l border-muted/30" style={{ left: `${i * 20}%` }} />
            ))}
          </div>

          {/* Camera dots */}
          {[
            { id: 'CAM-01', x: 20, y: 30 },
            { id: 'CAM-03', x: 50, y: 55 },
            { id: 'CAM-07', x: 75, y: 35 },
            { id: 'CAM-12', x: 65, y: 75 },
          ].map(cam => (
            <div key={cam.id} className="absolute" style={{ left: `${cam.x}%`, top: `${cam.y}%`, transform: 'translate(-50%,-50%)' }}>
              <div className={cn('w-3 h-3 rounded-full border-2', selectedCamera === cam.id ? 'bg-accent border-accent' : 'bg-muted/30 border-muted')} />
              <span className="absolute top-3.5 left-1/2 -translate-x-1/2 text-muted font-mono whitespace-nowrap" style={{ fontSize: 9 }}>{cam.id}</span>
            </div>
          ))}

          {/* Suspect path */}
          <svg className="absolute inset-0 w-full h-full" style={{ overflow: 'visible' }}>
            <polyline
              points="20,55 50,102 75,65 65,138"
              fill="none"
              stroke="#FF6B35"
              strokeWidth="2"
              strokeDasharray="4 3"
              opacity="0.7"
            />
          </svg>

          {/* Suspect dot */}
          <div className="absolute" style={{ left: '50%', top: '55%', transform: 'translate(-50%,-50%)' }}>
            <div className="w-4 h-4 rounded-full bg-danger border-2 border-white pulse-dot" />
          </div>

          <div className="absolute top-2 left-2 bg-card/80 px-2 py-0.5 rounded text-muted font-mono" style={{ fontSize: 10 }}>LIVE MAP</div>
        </div>

        {/* Stats */}
        <div className="px-4 pb-3 grid grid-cols-2 gap-3">
          <div className="bg-elevated rounded-lg p-3">
            <p className="text-muted mb-1" style={{ fontSize: 11 }}>DURATION</p>
            <p className="text-white font-mono font-semibold text-sm">00:38</p>
          </div>
          <div className="bg-elevated rounded-lg p-3">
            <p className="text-muted mb-1" style={{ fontSize: 11 }}>ACTIVE CAM</p>
            <p className="text-accent font-mono font-semibold text-sm">{selectedCamera}</p>
          </div>
        </div>

        <div className="h-px bg-border mx-4 mb-3" />

        {/* Camera channels */}
        <div className="px-4">
          <SectionLabel className="mb-3">Camera Channels</SectionLabel>
          <div className="grid grid-cols-2 gap-2">
            {mockData.cameras.map(cam => (
              <button
                key={cam.id}
                onClick={() => setSelectedCamera(cam.id)}
                className={cn(
                  'p-3 rounded-lg border text-left transition-colors',
                  selectedCamera === cam.id
                    ? 'border-accent bg-accent/10'
                    : 'border-border bg-elevated hover:border-muted'
                )}
              >
                <p className={cn('font-mono font-semibold text-sm', selectedCamera === cam.id ? 'text-accent' : 'text-white')}>{cam.id}</p>
                <p className="text-muted mt-0.5" style={{ fontSize: 11 }}>{cam.location.split('—')[0].trim()}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── TAB: EVIDENCE ────────────────────────────────────────────────────────────
function EvidenceTab() {
  const [selectedTree, setSelectedTree] = useState('whatsapp');
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [expanded, setExpanded] = useState({ cctv: true, whatsapp: true, instagram: false, device: false });

  const tree = [
    {
      key: 'cctv', icon: '📹', label: 'CCTV',
      children: [
        { key: 'cam01', label: 'CAM-01', status: 'verified' },
        { key: 'cam03', label: 'CAM-03', status: 'flagged' },
        { key: 'cam07', label: 'CAM-07', status: 'verified' },
        { key: 'cam12', label: 'CAM-12', status: 'verified' },
      ]
    },
    {
      key: 'whatsapp', icon: '💬', label: 'WhatsApp',
      children: [
        { key: 'wa-victim', label: 'Chat with Victim', status: 'flagged' },
        { key: 'wa-friend', label: 'Chat with Friend', status: 'verified' },
        { key: 'wa-deleted', label: 'Deleted Messages', status: 'flagged' },
      ]
    },
    {
      key: 'instagram', icon: '📸', label: 'Instagram',
      children: [
        { key: 'ig-dm', label: 'DMs', status: 'flagged' },
        { key: 'ig-posts', label: 'Posts', status: 'verified' },
        { key: 'ig-stories', label: 'Stories', status: 'verified' },
      ]
    },
    {
      key: 'device', icon: '📱', label: 'Device',
      children: [
        { key: 'dcim', label: 'DCIM', status: 'verified' },
        { key: 'screenshots', label: 'Screenshots', status: 'flagged' },
        { key: 'downloads', label: 'Downloads', status: 'verified' },
      ]
    },
  ];

  const flaggedCount = mockData.whatsappMessages.filter(m => m.flagged).length;

  return (
    <div className="flex gap-3 h-full p-3 min-w-0">

      {/* Left: Evidence Tree */}
      <div className="panel flex-col" style={{ width: 260, minWidth: 260 }}>
        <div className="panel-header">
          <SectionLabel>Evidence Tree</SectionLabel>
        </div>
        <div className="flex-1 overflow-y-auto p-2">
          {tree.map(branch => (
            <div key={branch.key} className="mb-1">
              <button
                onClick={() => {
                  setExpanded(e => ({ ...e, [branch.key]: !e[branch.key] }));
                  setSelectedTree(branch.key);
                }}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-elevated text-left transition-colors"
              >
                {expanded[branch.key] ? <ChevronDown size={14} className="text-muted" /> : <ChevronRight size={14} className="text-muted" />}
                <span className="text-sm">{branch.icon}</span>
                <span className={cn('text-sm font-medium', selectedTree === branch.key ? 'text-white' : 'text-muted')}>{branch.label}</span>
              </button>
              {expanded[branch.key] && branch.children.map(child => (
                <button
                  key={child.key}
                  onClick={() => setSelectedTree(child.key)}
                  className={cn(
                    'w-full flex items-center gap-2 pl-8 pr-3 py-2 rounded-lg text-left transition-colors mb-0.5',
                    selectedTree === child.key ? 'bg-elevated border-l-2 border-accent pl-[30px]' : 'hover:bg-elevated/50'
                  )}
                >
                  <div className={cn('status-dot', child.status === 'verified' ? 'bg-success' : 'bg-warning')} />
                  <span className={cn('text-sm', selectedTree === child.key ? 'text-white' : 'text-muted')}>{child.label}</span>
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Center: Chat Viewer */}
      <div className="panel flex-1 min-w-0 flex-col">
        <div className="panel-header shrink-0">
          <div className="flex items-center gap-2">
            <MessageSquare size={14} className="text-accent" />
            <span className="text-white text-sm font-medium">Chats</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="bg-danger/20 border border-danger/30 text-danger px-2 py-0.5 rounded-full font-semibold" style={{ fontSize: 11 }}>
              {flaggedCount} FLAGGED
            </span>
            <span className="bg-warning/20 border border-warning/30 text-warning px-2 py-0.5 rounded-full font-semibold" style={{ fontSize: 11 }}>
              ⚠️ DISAPPEARING MSG
            </span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-2">
          {mockData.whatsappMessages.map(msg => (
            <div
              key={msg.id}
              className={cn('max-w-[80%] relative', msg.from === 'victim' ? 'self-end' : 'self-start')}
            >
              {msg.flagged && (
                <div
                  className="absolute -left-3 top-0 bottom-0 w-1 bg-danger rounded-full cursor-pointer"
                  onClick={() => setSelectedMessage(msg)}
                />
              )}
              <div
                onClick={() => msg.flagged && setSelectedMessage(msg)}
                className={cn(
                  'px-4 py-3 rounded-lg text-sm cursor-pointer transition-colors',
                  msg.from === 'victim'
                    ? 'bg-success/20 border border-success/20 text-white'
                    : 'bg-elevated border border-border text-white',
                  msg.flagged && 'border-danger/40 bg-danger/10',
                  selectedMessage?.id === msg.id && 'ring-1 ring-danger'
                )}
              >
                <p style={{ fontSize: 13 }}>{msg.text}</p>
                <div className="flex items-center justify-between mt-2 gap-3">
                  <span className="text-muted font-mono" style={{ fontSize: 11 }}>{msg.time}</span>
                  {msg.flagged && (
                    <div className="flex items-center gap-1">
                      <AlertTriangle size={11} className="text-danger" />
                      <span className="text-danger font-semibold" style={{ fontSize: 10 }}>FLAGGED</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right: AI Analysis */}
      <div className="panel flex-col" style={{ width: 280, minWidth: 280 }}>
        <div className="panel-header">
          <SectionLabel>AI Analysis</SectionLabel>
          <span className="bg-accent/20 border border-accent/30 text-accent px-2 py-0.5 rounded-full font-semibold" style={{ fontSize: 10 }}>AI TRIAGE</span>
        </div>

        {selectedMessage ? (
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
            <div>
              <SectionLabel className="mb-2">Analyzed Text</SectionLabel>
              <div className="bg-elevated rounded-lg p-3 border-l-2 border-accent">
                <p className="text-white" style={{ fontSize: 13 }}>"{selectedMessage.text}"</p>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <div>
                <SectionLabel className="mb-1">Psychological Tactic</SectionLabel>
                <p className="text-warning font-semibold text-sm">{selectedMessage.tactic}</p>
              </div>
              <div>
                <SectionLabel className="mb-1">Threat Category</SectionLabel>
                <p className="text-danger font-semibold text-sm">{selectedMessage.reason}</p>
              </div>
              <div>
                <SectionLabel className="mb-1">Applicable Law</SectionLabel>
                <div className="bg-elevated rounded-lg p-3">
                  <p className="text-white font-mono" style={{ fontSize: 12 }}>{selectedMessage.law}</p>
                </div>
              </div>
              <div>
                <SectionLabel className="mb-1">Recommended Action</SectionLabel>
                <div className="bg-danger/10 border border-danger/20 rounded-lg p-3">
                  <p className="text-white" style={{ fontSize: 13 }}>Preserve message, initiate POCSO referral, geo-locate sender device.</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center gap-3 p-6 text-center">
            <AlertTriangle size={32} className="text-muted/40" />
            <p className="text-muted" style={{ fontSize: 13 }}>Select a flagged message to view AI analysis</p>
            <p className="text-muted" style={{ fontSize: 12 }}>
              <span className="text-danger font-semibold">{flaggedCount}</span> flagged messages require review
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── TAB: ANALYSIS ────────────────────────────────────────────────────────────
function AnalysisTab() {
  const [selectedNode, setSelectedNode] = useState(null);
  const svgRef = useRef(null);

  const nodeColors = { suspect: '#FF1744', case: '#FF6B35', evidence: '#00C853', neutral: '#8A8B9A' };

  const getNode = (id) => mockData.graphNodes.find(n => n.id === id);

  return (
    <div className="flex gap-3 h-full p-3 min-w-0">

      {/* Left: Knowledge Graph */}
      <div className="panel flex-col flex-1 min-w-0" style={{ flex: '0 0 70%', maxWidth: '70%' }}>
        <div className="panel-header shrink-0">
          <div className="flex items-center gap-2">
            <Network size={14} className="text-accent" />
            <span className="text-white text-sm font-medium">Interactive Entity Network</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-danger" /><span className="text-muted" style={{ fontSize: 11 }}>Suspect</span></div>
            <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-success" /><span className="text-muted" style={{ fontSize: 11 }}>Evidence</span></div>
            <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-accent" /><span className="text-muted" style={{ fontSize: 11 }}>Case</span></div>
          </div>
        </div>

        {/* Cross-case alert */}
        <div className="mx-4 mt-3 border-l-2 border-accent bg-accent/5 rounded-r-lg px-3 py-2.5 shrink-0">
          <div className="flex items-center gap-2 mb-1">
            <Zap size={12} className="text-accent" />
            <span className="text-accent font-semibold" style={{ fontSize: 11 }}>MULTI-CASE CORRELATION</span>
          </div>
          <p className="text-white" style={{ fontSize: 12 }}>{mockData.crossCaseAlert}</p>
        </div>

        {/* Graph SVG */}
        <div className="flex-1 relative p-4 min-h-0">
          <svg ref={svgRef} className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
            {/* Edges */}
            {mockData.graphEdges.map((edge, i) => {
              const from = getNode(edge.from);
              const to = getNode(edge.to);
              if (!from || !to) return null;
              return (
                <line
                  key={i}
                  x1={from.x} y1={from.y} x2={to.x} y2={to.y}
                  stroke="#FF6B35"
                  strokeWidth="0.4"
                  strokeDasharray="1.5 1"
                  opacity="0.5"
                />
              );
            })}

            {/* Nodes */}
            {mockData.graphNodes.map(node => {
              const color = nodeColors[node.type] || '#8A8B9A';
              const isSelected = selectedNode?.id === node.id;
              return (
                <g key={node.id} onClick={() => setSelectedNode(node)} className="cursor-pointer" style={{ transition: 'all 0.2s' }}>
                  <rect
                    x={node.x - 10} y={node.y - 5}
                    width={20} height={10}
                    rx="1.5"
                    fill="#15161D"
                    stroke={isSelected ? '#FF6B35' : color}
                    strokeWidth={isSelected ? 0.8 : 0.5}
                    opacity={isSelected ? 1 : 0.85}
                  />
                  <text x={node.x} y={node.y - 0.5} textAnchor="middle" fill="#FFFFFF" fontSize="1.8" fontFamily="Inter" fontWeight="600">
                    {node.label}
                  </text>
                  <text x={node.x} y={node.y + 2.5} textAnchor="middle" fill={color} fontSize="1.4" fontFamily="Inter">
                    {node.sub}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* Right: Suspect Dossier */}
      <div className="panel flex-col" style={{ width: '30%', minWidth: 260 }}>
        <div className="panel-header">
          <SectionLabel>Suspect Dossier & Sightings</SectionLabel>
        </div>

        {selectedNode ? (
          <div className="flex-1 overflow-y-auto">
            {/* Photo */}
            <div className="p-4 flex flex-col items-center gap-3 border-b border-border">
              <div className="w-20 h-20 rounded-lg bg-elevated border border-border flex items-center justify-center">
                <User size={36} className="text-muted" />
              </div>
              <div className="text-center">
                <p className="text-white font-bold text-sm">{selectedNode.label}</p>
                {selectedNode.sub && <p className="text-muted" style={{ fontSize: 12 }}>{selectedNode.sub}</p>}
                {selectedNode.risk && (
                  <span className={cn('inline-block mt-2 px-2 py-0.5 rounded-full font-bold', selectedNode.risk === 'CRITICAL' ? 'bg-danger/20 text-danger' : 'bg-warning/20 text-warning')} style={{ fontSize: 11 }}>
                    {selectedNode.risk}
                  </span>
                )}
              </div>
            </div>

            {/* Details */}
            <div className="p-4 flex flex-col gap-3">
              {selectedNode.match && (
                <div className="flex justify-between items-center">
                  <span className="text-muted" style={{ fontSize: 12 }}>CCTV Sighting</span>
                  <span className="text-white font-mono text-sm">{selectedNode.match}</span>
                </div>
              )}
              <div className="flex justify-between items-center">
                <span className="text-muted" style={{ fontSize: 12 }}>Case ID</span>
                <span className="text-white font-mono text-sm">KP-2026-0812</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted" style={{ fontSize: 12 }}>Telegram Handle</span>
                <span className="text-white font-mono text-sm">[redacted]</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted" style={{ fontSize: 12 }}>Location Pin</span>
                <span className="text-white text-sm">Kochi Marine Drive</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted" style={{ fontSize: 12 }}>Linked Evidence</span>
                <span className="text-white font-mono text-sm">142 items</span>
              </div>
              <div className="flex justify-between items-start">
                <span className="text-muted" style={{ fontSize: 12 }}>Hardware</span>
                <div className="text-right">
                  <p className="text-white text-sm">Samsung S21</p>
                  <p className="text-white text-sm">MacBook Pro</p>
                </div>
              </div>
            </div>

            {/* Action */}
            <div className="p-4 border-t border-border">
              <button className="w-full bg-danger text-white font-semibold py-2.5 rounded-lg text-sm hover:opacity-90 transition-opacity">
                ISSUE INTERCEPT WARRANT
              </button>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center gap-3 p-6 text-center">
            <Network size={32} className="text-muted/40" />
            <p className="text-muted" style={{ fontSize: 13 }}>Click any node in the graph to view dossier</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── TAB: REPORTS ─────────────────────────────────────────────────────────────
function ReportsTab() {
  const reports = [
    { id: 'KP-2026-0812-R1', title: 'Initial Digital Evidence Report', date: '2026-08-10', status: 'complete', items: 46 },
    { id: 'KP-2026-0812-R2', title: 'CCTV Gait Analysis — Sector 4', date: '2026-08-11', status: 'complete', items: 12 },
    { id: 'KP-2026-0812-R3', title: 'Social Media Forensic Analysis', date: '2026-08-12', status: 'processing', items: 7 },
    { id: 'KP-2026-0812-R4', title: 'Amber Shield Deployment Log', date: '2026-08-12', status: 'pending', items: 0 },
  ];

  const stats = [
    { label: 'Total Evidence Items', value: '142', color: 'text-white' },
    { label: 'Flagged Messages', value: '7', color: 'text-danger' },
    { label: 'Camera Sightings', value: '6', color: 'text-accent' },
    { label: 'Reports Generated', value: '3', color: 'text-success' },
  ];

  return (
    <div className="flex gap-3 h-full p-3 min-w-0">

      {/* Left: Stats */}
      <div className="panel flex-col" style={{ width: 280, minWidth: 280 }}>
        <div className="panel-header">
          <SectionLabel>Case Overview</SectionLabel>
          <span className="text-accent font-mono" style={{ fontSize: 11 }}>KP-2026-0812</span>
        </div>
        <div className="p-4 flex flex-col gap-3">
          {stats.map(s => (
            <div key={s.label} className="bg-elevated rounded-lg p-4 flex items-center justify-between">
              <span className="text-muted" style={{ fontSize: 13 }}>{s.label}</span>
              <span className={cn('font-mono font-bold text-xl', s.color)}>{s.value}</span>
            </div>
          ))}

          <div className="h-px bg-border my-1" />

          <div className="bg-elevated rounded-lg p-4">
            <SectionLabel className="mb-3">Investigation Status</SectionLabel>
            <div className="flex flex-col gap-2.5">
              {[
                { label: 'Evidence Collection', pct: 85 },
                { label: 'Digital Analysis', pct: 62 },
                { label: 'Legal Documentation', pct: 40 },
              ].map(item => (
                <div key={item.label}>
                  <div className="flex justify-between mb-1.5">
                    <span className="text-muted" style={{ fontSize: 12 }}>{item.label}</span>
                    <span className="text-white font-mono" style={{ fontSize: 12 }}>{item.pct}%</span>
                  </div>
                  <div className="h-1.5 bg-border rounded-full overflow-hidden">
                    <div className="h-full bg-accent rounded-full" style={{ width: `${item.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Center: Reports List */}
      <div className="panel flex-col flex-1 min-w-0">
        <div className="panel-header">
          <div className="flex items-center gap-2">
            <FileText size={14} className="text-accent" />
            <span className="text-white text-sm font-medium">Generated Reports</span>
          </div>
          <button className="btn-primary text-xs py-1.5">
            Generate Report
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-2">
          {reports.map(r => (
            <div key={r.id} className="bg-elevated rounded-lg p-4 flex items-center gap-4 border border-border hover:border-muted transition-colors cursor-pointer">
              <div className="w-10 h-10 rounded-lg bg-card border border-border flex items-center justify-center shrink-0">
                <FileText size={18} className="text-accent" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-medium truncate">{r.title}</p>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-muted font-mono" style={{ fontSize: 11 }}>{r.id}</span>
                  <span className="text-muted" style={{ fontSize: 11 }}>{r.date}</span>
                  {r.items > 0 && <span className="text-muted" style={{ fontSize: 11 }}>{r.items} items</span>}
                </div>
              </div>
              <div className={cn(
                'px-2.5 py-1 rounded-full font-semibold shrink-0',
                r.status === 'complete' ? 'bg-success/20 text-success' :
                r.status === 'processing' ? 'bg-warning/20 text-warning' :
                'bg-elevated text-muted border border-border'
              )} style={{ fontSize: 11 }}>
                {r.status.toUpperCase()}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right: Activity */}
      <div className="panel flex-col" style={{ width: 280, minWidth: 280 }}>
        <div className="panel-header">
          <SectionLabel>Recent Activity</SectionLabel>
        </div>
        <div className="flex-1 overflow-y-auto p-3">
          {[
            { time: '20:44', text: 'CCTV gait match confirmed — CAM-04', type: 'success' },
            { time: '20:31', text: 'WhatsApp message flagged — POCSO violation', type: 'danger' },
            { time: '20:15', text: 'New evidence item added — Device DCIM', type: 'info' },
            { time: '19:58', text: 'Cross-case link detected — KP-2024-0192', type: 'warning' },
            { time: '19:42', text: 'Report R2 generation complete', type: 'success' },
            { time: '19:30', text: 'Amber Shield protocol — standby', type: 'danger' },
            { time: '19:11', text: 'Pattern Hunter agent — processing', type: 'info' },
            { time: '18:55', text: 'Case KP-2026-0812 opened', type: 'info' },
          ].map((a, i) => (
            <div key={i} className="flex items-start gap-3 py-2.5 border-b border-border last:border-0">
              <div className={cn('status-dot mt-1.5 shrink-0',
                a.type === 'success' ? 'bg-success' :
                a.type === 'danger' ? 'bg-danger' :
                a.type === 'warning' ? 'bg-warning' : 'bg-muted'
              )} />
              <div>
                <p className="text-white" style={{ fontSize: 13 }}>{a.text}</p>
                <p className="text-muted font-mono mt-0.5" style={{ fontSize: 11 }}>{a.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── CASE DEBRIEF PANEL ───────────────────────────────────────────────────────
function DebriefPanel({ onClose }) {
  const [selectedLang, setSelectedLang] = useState('Malayalam');
  const [isPlaying, setIsPlaying] = useState(false);

  const languages = ['తెలుగు', 'മലയാളം', 'English', 'हिंदी', 'தமிழ்'];
  const langKeys = ['Telugu', 'Malayalam', 'English', 'Hindi', 'Tamil'];

  const transcripts = {
    Malayalam: `ഈ കേസിൽ, KP-2026-0812, ഒരു 14 വയസ്സുള്ള ഇരയ്ക്ക് ഒരു അജ്ഞാത പ്രതി ഓൺലൈൻ വഴി ഭീഷണി നൽകുകയും ബ്ലാക്ക്‌മെയിൽ ചെയ്യുകയും ചെയ്തു. CAM-03, CAM-07, CAM-12 ഇൽ CCTV ദൃശ്യങ്ങൾ ലഭ്യമാണ്.`,
    English: `In case KP-2026-0812, a 14-year-old victim was targeted through online grooming by Suspect X (alias Shadow_07). Evidence includes 7 flagged WhatsApp messages and 6 CCTV sightings across Kochi Sector 4.`,
    Telugu: `కేసు KP-2026-0812లో, Suspect X (Shadow_07) అనే వ్యక్తి 14 సంవత్సరాల పీడితురాలిని ఆన్‌లైన్ ద్వారా వేధించాడు. 7 ఫ్లాగ్ చేయబడిన సందేశాలు మరియు 6 CCTV దృశ్యాలు ఆధారంగా ఉన్నాయి.`,
    Hindi: `मामला KP-2026-0812 में, Suspect X (उपनाम Shadow_07) ने एक 14 वर्षीय पीड़ित को ऑनलाइन माध्यम से धमकाया और ब्लैकमेल किया। 7 फ्लैग किए गए संदेश और 6 CCTV दृश्य उपलब्ध हैं।`,
    Tamil: `வழக்கு KP-2026-0812ல், Suspect X (Shadow_07) என்பவர் 14 வயது பாதிக்கப்பட்டவரை ஆன்லைன் மூலம் துன்புறுத்தினார். 7 கொடியிடப்பட்ட செய்திகள் மற்றும் 6 CCTV காட்சிகள் ஆதாரமாக உள்ளன.`,
  };

  const currentLangKey = langKeys[languages.indexOf(selectedLang)] || 'English';
  const transcript = transcripts[currentLangKey] || transcripts['English'];

  return (
    <div className="fixed inset-y-0 right-0 z-40 flex">
      <div className="absolute inset-0 -left-[100vw] bg-black/60" onClick={onClose} />
      <div className="relative w-[420px] bg-card border-l border-border flex flex-col h-full shadow-2xl">
        {/* Header */}
        <div className="panel-header shrink-0 border-b border-border py-4">
          <div className="flex items-center gap-2.5">
            <Radio size={16} className="text-accent" />
            <div>
              <p className="text-white font-semibold text-sm">CASE DEBRIEF ENGINE</p>
              <p className="text-muted" style={{ fontSize: 11 }}>Multi-Lingual Audio Forensic Synthesis</p>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-lg hover:bg-elevated flex items-center justify-center text-muted hover:text-white transition-colors">
            <X size={16} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-5">
          {/* Language Selection */}
          <div>
            <SectionLabel className="mb-3">Select Audio Speech Language</SectionLabel>
            <div className="flex flex-wrap gap-2">
              {languages.map(lang => (
                <button
                  key={lang}
                  onClick={() => setSelectedLang(lang)}
                  className={cn(
                    'px-3 py-1.5 rounded-lg text-sm font-medium transition-colors border',
                    selectedLang === lang
                      ? 'bg-accent text-black border-accent'
                      : 'bg-elevated text-white border-border hover:border-muted'
                  )}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>

          {/* Voice Synthesizer */}
          <div className="bg-elevated rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <SectionLabel>Voice Synthesizer</SectionLabel>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-success pulse-dot" />
                <span className="text-success font-semibold" style={{ fontSize: 11 }}>VOICE AUDIO LIVE</span>
              </div>
            </div>

            <div className="flex flex-col items-center gap-4">
              {/* Waveform */}
              <div className="flex items-center gap-1 h-8">
                {[...Array(16)].map((_, i) => (
                  <div
                    key={i}
                    className={cn('w-1 rounded-full bg-accent transition-all', isPlaying ? 'wave-bar' : '')}
                    style={{ height: isPlaying ? undefined : 4, opacity: isPlaying ? 1 : 0.4 }}
                  />
                ))}
              </div>

              <button
                onClick={() => setIsPlaying(p => !p)}
                className="w-20 h-20 rounded-full bg-accent flex items-center justify-center hover:bg-accent-hover transition-colors"
              >
                {isPlaying ? <Pause size={28} className="text-black" /> : <Play size={28} className="text-black ml-1" />}
              </button>

              <p className="text-white text-sm font-medium">Click Play to Hear Officer Kavach</p>
              <div className="flex items-center gap-1.5">
                <div className={cn('w-2 h-2 rounded-full', isPlaying ? 'bg-success pulse-dot' : 'bg-muted')} />
                <p className="text-muted" style={{ fontSize: 12 }}>{isPlaying ? 'Playing...' : 'Audio Engine Ready'}</p>
              </div>
            </div>
          </div>

          {/* Transcript */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <SectionLabel>Transcript [{currentLangKey.slice(0, 2).toUpperCase()}]</SectionLabel>
              <button className="text-accent hover:text-accent-hover text-xs font-semibold transition-colors">Speak Text</button>
            </div>
            <div className="bg-elevated rounded-lg p-4 max-h-48 overflow-y-auto">
              <p className="text-white leading-relaxed" style={{ fontSize: 13 }}>{transcript}</p>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="p-4 border-t border-border shrink-0">
          <button
            onClick={() => setIsPlaying(p => !p)}
            className="w-full bg-accent text-black font-bold py-3 rounded-lg text-sm hover:bg-accent-hover transition-colors"
          >
            {isPlaying ? 'PAUSE' : `SYNTHESIZE & SPEAK ${currentLangKey.slice(0, 2).toUpperCase()} BRIEFING`}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── AMBER SHIELD OVERLAY ─────────────────────────────────────────────────────
function AmberShieldOverlay({ onClose }) {
  const [countdown, setCountdown] = useState(mockData.amberShield.timeToContact);
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(c => {
        if (c <= 0) { clearInterval(timer); return 0; }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (countdown < 180) setPhase(1);
    if (countdown < 60) setPhase(2);
  }, [countdown]);

  const phaseText = [
    "Locating nearest patrol units...",
    "Officers dispatched — closing in",
    "IMMINENT CONTACT — Suspect in vicinity",
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.92)' }}>
      <div className="bg-card border border-danger/40 rounded-lg p-8 flex flex-col gap-6 relative" style={{ width: 600 }}>
        {/* Close */}
        <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-lg hover:bg-elevated flex items-center justify-center text-muted hover:text-white transition-colors">
          <X size={16} />
        </button>

        {/* Title */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-4 h-4 rounded-full bg-danger" />
            <div className="absolute inset-0 rounded-full bg-danger opacity-60 pulse-ring" />
          </div>
          <div>
            <h2 className="text-danger font-bold text-xl tracking-wider">AMBER SHIELD ACTIVATED</h2>
            <p className="text-muted" style={{ fontSize: 12 }}>{phaseText[phase]}</p>
          </div>
        </div>

        {/* Timer */}
        <div className="text-center">
          <p className="text-muted mb-1" style={{ fontSize: 11, letterSpacing: '0.1em' }}>TIME TO CONTACT</p>
          <p className="text-white font-mono font-bold" style={{ fontSize: 72, lineHeight: 1 }}>
            {formatTime(countdown)}
          </p>
        </div>

        {/* Mini Map */}
        <div className="h-28 bg-[#050508] rounded-lg border border-border relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="absolute left-0 right-0 border-t border-white" style={{ top: `${i * 25}%` }} />
            ))}
            {[...Array(5)].map((_, i) => (
              <div key={i} className="absolute top-0 bottom-0 border-l border-white" style={{ left: `${i * 25}%` }} />
            ))}
          </div>
          {/* Victim location — pulsing green circle */}
          <div className="absolute" style={{ left: '50%', top: '50%', transform: 'translate(-50%,-50%)' }}>
            <div className="w-16 h-16 rounded-full border-2 border-success/30 animate-ping absolute" style={{ top: -24, left: -24 }} />
            <div className="w-4 h-4 rounded-full bg-success border-2 border-white" />
          </div>
          {/* Suspect dot */}
          <div className="absolute" style={{ left: '70%', top: '30%' }}>
            <div className="w-3 h-3 rounded-full bg-danger border-2 border-white pulse-dot" />
          </div>
          <div className="absolute bottom-2 left-2 text-muted font-mono" style={{ fontSize: 10 }}>LIVE MAP — KOCHI MARINE DR</div>
        </div>

        {/* Officers */}
        <div className="grid grid-cols-3 gap-3">
          {mockData.amberShield.officers.map(officer => (
            <div
              key={officer.name}
              className={cn(
                'bg-elevated rounded-lg p-3 border text-center',
                officer.recommended ? 'border-success' : 'border-border'
              )}
            >
              {officer.recommended && (
                <span className="text-success font-semibold block mb-1" style={{ fontSize: 10 }}>✓ RECOMMENDED</span>
              )}
              <p className="text-white font-semibold text-sm">{officer.name}</p>
              <p className="text-muted" style={{ fontSize: 12 }}>{officer.distance} km away</p>
              <p className="text-muted font-mono" style={{ fontSize: 12 }}>ETA {formatTime(officer.eta)}</p>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button className="flex-1 bg-danger text-white font-bold py-3 rounded-lg text-sm hover:opacity-90 transition-opacity">
            DEPLOY NEAREST PATROL
          </button>
          <button className="flex-1 border-2 border-accent text-accent font-bold py-3 rounded-lg text-sm hover:bg-accent/10 transition-colors">
            ALERT VICTIM FAMILY
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── ROOT APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [activeNav, setActiveNav] = useState('dashboard');
  const [showDebrief, setShowDebrief] = useState(false);
  const [showAmber, setShowAmber] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Sync sidebar nav with header tabs
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    const navMap = { Dashboard: 'dashboard', Evidence: 'whatsapp', Analysis: 'knowledge', Reports: 'dashboard' };
    setActiveNav(navMap[tab] || 'dashboard');
  };

  const handleNavChange = (nav) => {
    setActiveNav(nav);
    const tabMap = {
      dashboard: 'Dashboard', cctv: 'Evidence', whatsapp: 'Evidence',
      instagram: 'Evidence', device: 'Evidence', graph: 'Analysis',
      analysis: 'Evidence', knowledge: 'Analysis', timeline: 'Dashboard',
      archive: 'Reports',
    };
    setActiveTab(tabMap[nav] || 'Dashboard');
  };

  return (
    <div className="flex flex-col h-screen bg-bg overflow-hidden">
      {/* Single Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        onDebrief={() => setShowDebrief(true)}
        onSearch={() => setShowSearch(s => !s)}
      />

      {/* Search bar (collapsible) */}
      {showSearch && (
        <div className="bg-card border-b border-border px-4 py-2 flex items-center gap-3 shrink-0">
          <Search size={14} className="text-muted" />
          <input
            autoFocus
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search evidence, suspects, case IDs..."
            className="flex-1 bg-transparent text-white text-sm outline-none placeholder:text-muted"
          />
          <button onClick={() => { setShowSearch(false); setSearchQuery(''); }} className="text-muted hover:text-white">
            <X size={14} />
          </button>
        </div>
      )}

      {/* Body */}
      <div className="flex flex-1 min-h-0">
        <Sidebar
          activeNav={activeNav}
          setActiveNav={handleNavChange}
          onNewCase={() => alert('New case modal — KP-' + new Date().getFullYear() + '-' + Math.floor(Math.random() * 9999).toString().padStart(4, '0'))}
          onAmberShield={() => setShowAmber(true)}
        />

        {/* Main Content */}
        <main className="flex-1 min-w-0 min-h-0 overflow-hidden">
          {activeTab === 'Dashboard' && <DashboardTab />}
          {activeTab === 'Evidence' && <EvidenceTab />}
          {activeTab === 'Analysis' && <AnalysisTab />}
          {activeTab === 'Reports' && <ReportsTab />}
        </main>
      </div>

      {/* Overlays */}
      {showDebrief && <DebriefPanel onClose={() => setShowDebrief(false)} />}
      {showAmber && <AmberShieldOverlay onClose={() => setShowAmber(false)} />}
    </div>
  );
}
