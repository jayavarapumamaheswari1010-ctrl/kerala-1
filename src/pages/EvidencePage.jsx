import React, { useState } from 'react';
import { 
  Folder, 
  FolderOpen, 
  ChevronRight, 
  ChevronDown, 
  FileText, 
  FileImage, 
  Smartphone, 
  MessageSquare, 
  Camera, 
  Download, 
  Cloud, 
  ZoomIn, 
  ZoomOut, 
  Maximize, 
  Minimize, 
  ShieldCheck, 
  FileCode, 
  CheckCircle2, 
  Radio, 
  MapPin, 
  Clock, 
  Cpu, 
  FileDown,
  UploadCloud,
  Send,
  Mail,
  AlertTriangle,
  Scale,
  Search,
  Filter,
  Layers,
  Sparkles,
  ExternalLink,
  Video,
  Eye
} from 'lucide-react';
import { 
  EVIDENCE_TREE_DATA, 
  MOCK_CASE, 
  SUSPICIOUS_CHATS, 
  RECOVERED_BIN_MAILS 
} from '../data/forensicData';
import GoogleMapView from '../components/GoogleMapView';
import RealChatViewer from '../components/RealChatViewer';
import CctvAnalyzer from '../components/CctvAnalyzer';

export default function EvidencePage({ onOpenExport, onOpenUpload }) {
  const [activeTab, setActiveTab] = useState('cctv'); // 'cctv' | 'chats' | 'bin' | 'map' | 'tree'
  const [selectedFolder, setSelectedFolder] = useState('screenshots');
  const [selectedMail, setSelectedMail] = useState(RECOVERED_BIN_MAILS[0]);
  
  const [selectedFile, setSelectedFile] = useState({
    id: "img-01",
    name: "IMG_20231024_153022.png",
    path: "Device > Screenshots > IMG_20231024_153022.png",
    size: "3.4 MB",
    verified: true,
    hash: "a3f7619c9284bd09e2d1490218b76a0e5",
    deviceName: "Samsung Galaxy S21 Ultra (SM-G998U1)",
    gpsCoordinates: "9.9726° N, 76.2783° E (Marine Drive, Kochi)",
    timestamp: "2023-10-24T15:30:22Z",
    agentProcessed: "EXIF & OCR Extractor",
    threatLevel: "CRITICAL",
    courtSections: [
      "BNS Sec 351(2) (Criminal Intimidation)",
      "POCSO Sec 11/12 (Cyber Harassment of Minor)",
      "IT Act Sec 67B (Child Grooming)"
    ],
    custody: [
      {
        step: 1,
        title: "Physical Clone Acquired by Officer Kumar (Cellebrite UFED)",
        time: "2023-10-24 16:45:00 UTC",
        status: "done"
      },
      {
        step: 2,
        title: "Bit-Stream Image Ingested by Cyberdome Forensic Node 4",
        time: "2023-10-24 18:12:33 UTC",
        status: "done"
      },
      {
        step: 3,
        title: "Autonomous AI OCR & EXIF Triangulation Extracted",
        time: "2023-10-24 18:13:01 UTC",
        status: "active"
      }
    ]
  });

  const [zoomLevel, setZoomLevel] = useState(100);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showOcrOverlay, setShowOcrOverlay] = useState(true);

  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 20, 200));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 20, 60));
  const toggleFullscreen = () => setIsFullscreen(!isFullscreen);

  return (
    <div className="p-4 md:p-6 space-y-4 max-w-[1700px] mx-auto select-none page-enter pb-20">
      {/* Top Evidence Action Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-[#1E1F2A]">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-[#1E1F2A] border border-[#FF6B35]/50 flex items-center justify-center">
            <Smartphone className="w-5 h-5 text-[#FF6B35]" />
          </div>
          <div>
            <h1 className="text-white font-extrabold text-xl tracking-tight">
              EVIDENCE INTELLIGENCE & MULTI-PLATFORM SCANNER
            </h1>
            <p className="text-[#8A8B9A] text-xs font-mono">
              CASE: {MOCK_CASE.id} • AI Video Person Detection + Multi-Platform Archives
            </p>
          </div>
        </div>

        {/* Upload & Clone CTA Button */}
        <div className="flex items-center space-x-2">
          <button
            onClick={onOpenUpload}
            className="px-4 py-2.5 bg-[#FF6B35] hover:bg-[#E85A24] text-[#0B0C10] font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md active:scale-[0.98] flex items-center space-x-2"
          >
            <UploadCloud className="w-4 h-4 text-[#0B0C10]" />
            <span>Upload Evidence / Clone Mobile</span>
          </button>
        </div>
      </div>

      {/* Primary Category Switcher Tabs */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none">
        {[
          { id: 'cctv', label: '🎥 CCTV Person Detection (Bounding Boxes)', count: 'Live Feed', icon: Video, alert: true },
          { id: 'chats', label: 'Real Suspicious Chats & Threat Inspector', count: SUSPICIOUS_CHATS.length, icon: MessageSquare, alert: false },
          { id: 'map', label: 'Google Maps Live GPS Triangulation', count: '5 Beacons', icon: MapPin, alert: false },
          { id: 'bin', label: 'Recovered Bin & Trash Mails', count: RECOVERED_BIN_MAILS.length, icon: Mail, alert: false },
          { id: 'tree', label: 'Device Media & Screenshots', count: '108', icon: FileImage, alert: false },
        ].map((tab) => {
          const Icon = tab.icon;
          const isSelected = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 text-xs font-semibold rounded-xl border flex items-center space-x-2 transition-all flex-shrink-0 ${
                isSelected
                  ? 'bg-[#1E1F2A] border-[#FF6B35] text-white card-selected-glow'
                  : 'bg-[#15161D] border-[#1E1F2A] text-[#8A8B9A] hover:text-white'
              }`}
            >
              <Icon className={`w-4 h-4 ${isSelected ? 'text-[#FF6B35]' : 'text-[#8A8B9A]'}`} />
              <span>{tab.label}</span>
              <span className={`px-1.5 py-0.5 text-[10px] font-mono rounded ${
                tab.alert ? 'bg-[#FF6B35]/20 text-[#FF6B35] font-bold' : 'bg-[#0B0C10] text-[#8A8B9A]'
              }`}>
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: CCTV PERSON DETECTION WITH BOUNDING BOXES & VOICE ALERT */}
      {activeTab === 'cctv' && (
        <CctvAnalyzer onExportSnapshot={() => onOpenExport({ name: "CCTV_CAM04_Person_Identified_Dossier.pdf" })} />
      )}

      {/* TAB 2: REAL SUSPICIOUS CHATS & WHAT MAKES THEM SUSPICIOUS */}
      {activeTab === 'chats' && (
        <RealChatViewer onOpenExport={onOpenExport} />
      )}

      {/* TAB 3: REAL GOOGLE MAPS GPS TRIANGULATION */}
      {activeTab === 'map' && (
        <div className="space-y-4">
          <GoogleMapView />
        </div>
      )}

      {/* TAB 4: RECOVERED BIN & TRASH MAILS */}
      {activeTab === 'bin' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
          <div className="lg:col-span-5 bg-[#15161D] border border-[#1E1F2A] rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#1E1F2A]">
              <span className="text-white text-xs font-bold uppercase tracking-wider font-mono">
                Recovered Bin / Deleted Mails ({RECOVERED_BIN_MAILS.length})
              </span>
              <span className="text-[10px] font-mono text-[#00C853]">INODE CARVED</span>
            </div>

            <div className="space-y-2.5">
              {RECOVERED_BIN_MAILS.map((m) => {
                const isSelected = selectedMail.id === m.id;
                return (
                  <div
                    key={m.id}
                    onClick={() => setSelectedMail(m)}
                    className={`p-3 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-[#1E1F2A] border-[#FF6B35] card-selected-glow'
                        : 'bg-[#0B0C10] border-[#1E1F2A] hover:border-[#FF6B35]/40'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-white text-xs font-bold truncate max-w-[200px]">{m.subject}</span>
                      <span className="text-[9px] font-mono text-[#FF6B35]">{m.threatScore}</span>
                    </div>

                    <div className="text-[#8A8B9A] text-[11px] font-mono mt-1">
                      From: {m.from}
                    </div>

                    <p className="text-[#8A8B9A] text-xs mt-1.5 line-clamp-2 leading-relaxed">
                      "{m.body}"
                    </p>

                    <div className="mt-2 pt-2 border-t border-[#1E1F2A] text-[10px] font-mono text-[#8A8B9A] flex justify-between">
                      <span>Deleted: {m.deletionTimestamp}</span>
                      <span className="text-[#00C853]">SHA-256 Valid</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Recovered Mail Viewer */}
          <div className="lg:col-span-7 bg-[#15161D] border border-[#1E1F2A] rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#1E1F2A]">
              <div>
                <h3 className="text-white font-bold text-sm">{selectedMail.subject}</h3>
                <p className="text-[#8A8B9A] text-xs font-mono mt-0.5">
                  Source: {selectedMail.recoveredFrom}
                </p>
              </div>
              <span className="px-2.5 py-1 bg-[#15161D] border border-[#00C853] text-[#00C853] text-xs font-mono font-bold rounded-lg">
                INTEGRITY VERIFIED
              </span>
            </div>

            {/* Email Headers */}
            <div className="p-3 bg-[#0B0C10] border border-[#1E1F2A] rounded-xl text-xs font-mono space-y-1 text-[#8A8B9A]">
              <div className="flex justify-between">
                <span>FROM: <strong className="text-white">{selectedMail.from}</strong></span>
                <span>ORIGINAL DATE: <strong className="text-white">{selectedMail.originalDate}</strong></span>
              </div>
              <div className="flex justify-between">
                <span>TO: <strong className="text-white">{selectedMail.to}</strong></span>
                <span>DELETION TIMESTAMP: <strong className="text-[#FF6B35]">{selectedMail.deletionTimestamp}</strong></span>
              </div>
              <div className="text-[10px] pt-1 text-[#8A8B9A] break-all">
                SHA-256 HASH: {selectedMail.sha256}
              </div>
            </div>

            {/* Email Body */}
            <div className="p-4 bg-[#0B0C10] border border-[#1E1F2A] rounded-xl">
              <span className="text-[10px] font-mono text-[#8A8B9A] uppercase block mb-2">RECOVERED DRAFT BODY</span>
              <p className="text-white text-xs leading-relaxed font-mono whitespace-pre-wrap">
                {selectedMail.body}
              </p>
            </div>

            {/* AI Forensic Inode Findings */}
            <div className="p-3.5 bg-[#0B0C10] border-l-2 border-[#00C853] border-y border-r border-[#1E1F2A] rounded-xl text-xs space-y-1">
              <span className="text-[10px] font-mono text-[#00C853] font-bold uppercase">AI INODE CARVER REPORT</span>
              <p className="text-white text-xs">{selectedMail.aiFindings}</p>
            </div>

            {/* Court Sections */}
            <div className="p-3 bg-[#0B0C10] border border-[#1E1F2A] rounded-xl">
              <span className="text-[11px] font-mono text-[#FF6B35] uppercase font-bold block mb-2">
                CRIMINAL CHARGES APPLICABLE FOR THIS EXTORTION EMAIL
              </span>
              <div className="flex flex-wrap gap-2">
                {selectedMail.courtSections.map((s, idx) => (
                  <span key={idx} className="px-2.5 py-1 bg-[#15161D] border border-[#FF6B35] text-[#FF6B35] text-xs font-mono font-semibold rounded">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => onOpenExport({ name: `${selectedMail.id}_Recovered_Email_Evidence.pdf` })}
                className="px-5 py-2.5 bg-[#FF6B35] hover:bg-[#E85A24] text-[#0B0C10] font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center space-x-2"
              >
                <FileDown className="w-4 h-4 text-[#0B0C10]" />
                <span>Export Recovered Email Dossier</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: DEVICE MEDIA & SCREENSHOTS / EVIDENCE DETAIL VIEW */}
      {activeTab === 'tree' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* Left Column (Ingestion Queue & Evidence Tree) */}
          <div className="lg:col-span-3 space-y-4 flex flex-col justify-start">
            {/* 1. Evidence Ingestion Queue */}
            <div className="bg-[#15161D] border border-[#1E1F2A] rounded-xl p-4 space-y-3 shadow-md">
              <div className="flex items-center justify-between pb-2 border-b border-[#1E1F2A]">
                <span className="text-white text-xs font-bold uppercase tracking-wider font-mono">
                  Ingestion Queue
                </span>
                <span className="text-[10px] font-mono text-[#FF6B35] animate-pulse">4 PENDING</span>
              </div>
              <div className="space-y-2">
                {[
                  {
                    id: "ev-01",
                    name: "surveillance_cam_04.jpg",
                    path: "Device > Screenshots > surveillance_cam_04.jpg",
                    size: "4.2 MB",
                    hash: "e9b2719c9284bd09e2d1490218b76a0e5",
                    deviceName: "Hikvision DS-2CD2043G2-I",
                    gpsCoordinates: "9.9726° N, 76.2783° E (Marine Drive, Sector 7)",
                    timestamp: "2023-10-24T15:30:22Z",
                    agentProcessed: "EXIF & OCR Extractor",
                    badge: "Exif Data Found",
                    badgeColor: "text-[#00C853] bg-[#00C853]/10 border-[#00C853]/30"
                  },
                  {
                    id: "ev-02",
                    name: "telegram_grooming_thread_01.json",
                    path: "Device > Screenshots > telegram_grooming_thread_01.json",
                    size: "8.1 MB",
                    hash: "7c12519c9284bd09e2d1490218b76a0e6",
                    deviceName: "Samsung Galaxy S21 Ultra",
                    gpsCoordinates: "9.9726° N, 76.2783° E (Marine Drive, Kochi)",
                    timestamp: "2023-10-24T15:28:10Z",
                    agentProcessed: "EXIF & OCR Extractor",
                    badge: "Threat Level: CRITICAL",
                    badgeColor: "text-[#FF1744] bg-[#FF1744]/10 border-[#FF1744]/30"
                  },
                  {
                    id: "ev-03",
                    name: "bin_draft_extortion_recovery.eml",
                    path: "Device > Screenshots > bin_draft_extortion_recovery.eml",
                    size: "2.4 MB",
                    hash: "5f8a619c9284bd09e2d1490218b76a0e7",
                    deviceName: "Apple MacBook Pro A2442",
                    gpsCoordinates: "10.0159° N, 76.3639° E (Kakkanad Cyber Corridor)",
                    timestamp: "2023-10-24T15:25:45Z",
                    agentProcessed: "EXIF & OCR Extractor",
                    badge: "Deleted Mail Recovered",
                    badgeColor: "text-[#FFB300] bg-[#FFB300]/10 border-[#FFB300]/30"
                  },
                  {
                    id: "ev-04",
                    name: "mobile_full_dump_ufed.e01",
                    path: "Device > Screenshots > mobile_full_dump_ufed.e01",
                    size: "128 GB",
                    hash: "3d41619c9284bd09e2d1490218b76a0e8",
                    deviceName: "SM-G998U1 (Android 14)",
                    gpsCoordinates: "8.5241° N, 76.9366° E (Cyber Lab, TVM)",
                    timestamp: "2023-10-24T15:10:00Z",
                    agentProcessed: "EXIF & OCR Extractor",
                    badge: "Physical Clone Complete",
                    badgeColor: "text-[#00C853] bg-[#00C853]/10 border-[#00C853]/30"
                  }
                ].map(item => {
                  const isSelected = selectedFile.id === item.id || selectedFile.name === item.name;
                  return (
                    <div
                      key={item.id}
                      onClick={() => setSelectedFile({
                        ...selectedFile,
                        id: item.id,
                        name: item.name,
                        path: item.path,
                        size: item.size,
                        hash: item.hash,
                        deviceName: item.deviceName,
                        gpsCoordinates: item.gpsCoordinates,
                        timestamp: item.timestamp,
                        agentProcessed: item.agentProcessed
                      })}
                      className={`p-2.5 rounded-lg border text-left cursor-pointer transition-all ${
                        isSelected 
                          ? 'bg-[#1E1F2A] border-[#FF6B35]' 
                          : 'bg-[#0B0C10] border-[#1E1F2A] hover:border-[#FF6B35]/40'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[11px] font-mono text-white font-bold mb-1 truncate">
                        <span className="truncate">{item.name}</span>
                      </div>
                      <div className="flex justify-between items-center mt-1">
                        <span className={`text-[9px] font-mono border px-1.5 py-0.2 rounded-md ${item.badgeColor}`}>
                          {item.badge}
                        </span>
                        <span className="text-[10px] text-[#8A8B9A] font-mono">{item.size}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 2. Evidence Tree */}
            <div className="bg-[#15161D] border border-[#1E1F2A] rounded-xl p-4 space-y-3 shadow-md flex-1 min-h-[300px]">
              <div className="flex items-center justify-between pb-2 border-b border-[#1E1F2A]">
                <span className="text-white text-xs font-bold uppercase tracking-wider font-mono">
                  Evidence Tree
                </span>
                <span className="text-[10px] font-mono text-[#8A8B9A]">108 FILES</span>
              </div>

              <div className="space-y-2 text-xs font-mono">
                {/* WhatsApp */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between p-1.5 rounded bg-[#1E1F2A]/30 text-white font-semibold cursor-pointer">
                    <div className="flex items-center space-x-2 truncate">
                      <ChevronDown className="w-3 h-3 text-[#FF6B35]" />
                      <MessageSquare className="w-3.5 h-3.5 text-[#FF6B35]" />
                      <span>WhatsApp</span>
                    </div>
                  </div>
                  <div className="pl-4 space-y-1">
                    <button 
                      onClick={() => setSelectedFile({
                        ...selectedFile,
                        name: "Chats_Export_Grooming.enc",
                        path: "WhatsApp > Chats_Export_Grooming.enc",
                        size: "2.8 MB",
                        hash: "fa4b619c9284bd09e2d1490218b76a0a9",
                        deviceName: "Samsung Galaxy S21 Ultra",
                        gpsCoordinates: "9.9726° N, 76.2783° E",
                        timestamp: "2023-10-24T15:20:00Z"
                      })}
                      className={`w-full text-left p-1.5 rounded flex items-center space-x-1.5 truncate text-[11px] hover:bg-[#1E1F2A] ${
                        selectedFile.name === "Chats_Export_Grooming.enc" ? 'text-[#FF6B35] font-bold bg-[#0B0C10]' : 'text-[#8A8B9A]'
                      }`}
                    >
                      <FileText className="w-3 h-3 flex-shrink-0" />
                      <span className="truncate">Chats_Export_Grooming.enc</span>
                    </button>
                  </div>
                </div>

                {/* Instagram */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between p-1.5 rounded bg-[#1E1F2A]/30 text-white font-semibold cursor-pointer">
                    <div className="flex items-center space-x-2 truncate">
                      <ChevronDown className="w-3 h-3 text-[#FF6B35]" />
                      <Camera className="w-3.5 h-3.5 text-[#FF6B35]" />
                      <span>Instagram</span>
                    </div>
                  </div>
                  <div className="pl-4 space-y-1">
                    <button 
                      onClick={() => setSelectedFile({
                        ...selectedFile,
                        name: "Direct_Messages_Threat.json",
                        path: "Instagram > Direct_Messages_Threat.json",
                        size: "1.2 MB",
                        hash: "3b8a619c9284bd09e2d1490218b76b102",
                        deviceName: "Apple MacBook Pro",
                        gpsCoordinates: "10.0159° N, 76.3639° E",
                        timestamp: "2023-10-24T15:15:30Z"
                      })}
                      className={`w-full text-left p-1.5 rounded flex items-center space-x-1.5 truncate text-[11px] hover:bg-[#1E1F2A] ${
                        selectedFile.name === "Direct_Messages_Threat.json" ? 'text-[#FF6B35] font-bold bg-[#0B0C10]' : 'text-[#8A8B9A]'
                      }`}
                    >
                      <FileCode className="w-3 h-3 flex-shrink-0" />
                      <span className="truncate">Direct_Messages_Threat.json</span>
                    </button>
                  </div>
                </div>

                {/* Device */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between p-1.5 rounded bg-[#1E1F2A]/30 text-white font-semibold cursor-pointer">
                    <div className="flex items-center space-x-2 truncate">
                      <ChevronDown className="w-3 h-3 text-[#FF6B35]" />
                      <Smartphone className="w-3.5 h-3.5 text-[#FF6B35]" />
                      <span>Device</span>
                    </div>
                  </div>
                  <div className="pl-3 space-y-1">
                    <div className="flex items-center space-x-2 p-1 text-white font-medium">
                      <ChevronDown className="w-3 h-3 text-[#8A8B9A]" />
                      <Folder className="w-3.5 h-3.5 text-[#8A8B9A]" />
                      <span>DCIM</span>
                    </div>
                    <div className="pl-4 space-y-1">
                      <div className="flex items-center justify-between p-1 rounded bg-[#1E1F2A]/50 text-white font-semibold">
                        <div className="flex items-center space-x-2 truncate">
                          <Folder className="w-3.5 h-3.5 text-[#FF6B35]" />
                          <span>Screenshots</span>
                        </div>
                      </div>
                      <div className="pl-4 space-y-1">
                        <button
                          onClick={() => setSelectedFile({
                            ...selectedFile,
                            id: "img-01",
                            name: "IMG_20231024_153022.png",
                            path: "Device > DCIM > Screenshots > IMG_20231024_153022.png",
                            size: "3.4 MB",
                            hash: "a3f7619c9284bd09e2d1490218b76a0e5",
                            deviceName: "Samsung Galaxy S21 Ultra (SM-G998U1)",
                            gpsCoordinates: "9.9726° N, 76.2783° E (Marine Drive, Kochi)",
                            timestamp: "2023-10-24T15:30:22Z",
                            agentProcessed: "EXIF & OCR Extractor"
                          })}
                          className={`w-full text-left p-1.5 rounded flex items-center space-x-1.5 truncate text-[11px] hover:bg-[#1E1F2A] ${
                            selectedFile.name === "IMG_20231024_153022.png" ? 'text-[#FF6B35] font-bold bg-[#0B0C10]' : 'text-[#8A8B9A]'
                          }`}
                        >
                          <FileImage className="w-3 h-3 flex-shrink-0" />
                          <span className="truncate">IMG_20231024_153022.png</span>
                        </button>
                      </div>

                      <div className="flex items-center space-x-2 p-1 text-[#8A8B9A]">
                        <Folder className="w-3.5 h-3.5" />
                        <span>Downloads</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Cloud */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between p-1.5 rounded bg-[#1E1F2A]/30 text-white font-semibold cursor-pointer">
                    <div className="flex items-center space-x-2 truncate">
                      <ChevronDown className="w-3 h-3 text-[#FF6B35]" />
                      <Cloud className="w-3.5 h-3.5 text-[#FF6B35]" />
                      <span>Cloud</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Center Column (Breadcrumbs, Image Viewer & Chain-of-Custody Timeline) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="bg-[#15161D] border border-[#1E1F2A] rounded-xl p-4 shadow-md">
              {/* Breadcrumb Header */}
              <div className="flex items-center justify-between pb-3 border-b border-[#1E1F2A] mb-3">
                <span className="text-[#8A8B9A] text-xs font-mono">{selectedFile.path}</span>
                <button
                  onClick={() => setShowOcrOverlay(!showOcrOverlay)}
                  className={`px-2 py-1 text-[11px] font-mono rounded border transition-colors ${
                    showOcrOverlay ? 'bg-[#FF6B35]/15 border-[#FF6B35] text-[#FF6B35]' : 'bg-[#0B0C10] border-[#1E1F2A] text-[#8A8B9A]'
                  }`}
                >
                  OCR BOXES: {showOcrOverlay ? 'ON' : 'OFF'}
                </button>
              </div>

              {/* Image Viewer */}
              <div className={`relative w-full bg-[#0B0C10] border border-[#1E1F2A] rounded-xl overflow-hidden flex flex-col items-center justify-center p-6 transition-all ${
                isFullscreen ? 'fixed inset-4 z-50 bg-[#0B0C10]' : 'min-h-[380px]'
              }`}>
                {/* Zoom Controls */}
                <div className="absolute top-3 right-3 flex items-center space-x-1.5 bg-[#15161D] border border-[#1E1F2A] p-1 rounded-lg z-20">
                  <button onClick={handleZoomIn} className="w-7 h-7 flex items-center justify-center text-white hover:text-[#FF6B35]">
                    <ZoomIn className="w-4 h-4" />
                  </button>
                  <span className="text-[10px] font-mono text-[#8A8B9A] px-1">{zoomLevel}%</span>
                  <button onClick={handleZoomOut} className="w-7 h-7 flex items-center justify-center text-white hover:text-[#FF6B35]">
                    <ZoomOut className="w-4 h-4" />
                  </button>
                  <button onClick={toggleFullscreen} className="w-7 h-7 flex items-center justify-center text-white hover:text-[#FF6B35]">
                    {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
                  </button>
                </div>

                <div
                  style={{ transform: `scale(${zoomLevel / 100})` }}
                  className="w-[280px] bg-[#15161D] border-2 border-[#1E1F2A] rounded-3xl p-3 shadow-2xl relative transition-transform duration-200"
                >
                  <div className="w-20 h-3 bg-[#0B0C10] rounded-full mx-auto mb-2" />
                  <div className="bg-[#0B0C10] border border-[#1E1F2A] rounded-2xl p-3 min-h-[340px] flex flex-col justify-between text-left">
                    <div className="flex items-center justify-between pb-2 border-b border-[#1E1F2A]">
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 rounded-full bg-[#1E1F2A] border border-[#FF6B35] flex items-center justify-center text-[10px] font-mono text-[#FF6B35] font-bold">TG</div>
                        <div>
                          <div className="text-white text-[11px] font-bold">@nexus_shadow</div>
                          <div className="text-[#8A8B9A] text-[9px] font-mono">End-to-End Encrypted</div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 py-2 text-[11px]">
                      <div className="p-2 rounded-lg bg-[#15161D] border border-[#1E1F2A] max-w-[85%] text-[#8A8B9A]">
                        <p className="text-white">Are you near Sector 7 tower base? Bring the secondary drive.</p>
                        <span className="text-[9px] font-mono text-[#8A8B9A] block mt-1">15:28 UTC</span>
                      </div>

                      <div className="p-2 rounded-lg bg-[#1E1F2A] border border-[#FF6B35] max-w-[90%] ml-auto relative">
                        {showOcrOverlay && (
                          <div className="absolute -top-2.5 right-1 px-1.5 py-0.2 bg-[#FF6B35] text-[#0B0C10] text-[8px] font-mono font-bold rounded">
                            BNS 351(2) THREAT
                          </div>
                        )}
                        <p className="text-white font-medium">Packet delivered to Kakkanad drop point. Confirm clearance code KP-99.</p>
                        <span className="text-[9px] font-mono text-[#FF6B35] block mt-1 text-right">15:30 UTC</span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-[#1E1F2A] flex items-center justify-between text-[9px] font-mono text-[#8A8B9A]">
                      <span>CYBERDOME SEAL</span>
                      <span className="text-[#00C853]">EVID_HASH_OK</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Chain-of-Custody Timeline */}
              <div className="mt-4 pt-4 border-t border-[#1E1F2A]">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[#8A8B9A] text-xs font-mono uppercase tracking-wider font-semibold">CHAIN-OF-CUSTODY TIMELINE</span>
                  <span className="text-[10px] font-mono text-[#00C853]">ISO/IEC 27037 COMPLIANT</span>
                </div>

                <div className="relative pl-6 space-y-4 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-[#FF6B35]">
                  {/* Node 1 */}
                  <div className="relative flex items-start space-x-3">
                    <div className="absolute -left-[23px] top-0.5 w-5 h-5 rounded-full bg-[#15161D] border-2 border-[#FF6B35] flex items-center justify-center">
                      <span className="w-2 h-2 rounded-full bg-[#FF6B35]" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-semibold text-white">Recovered by Officer Kumar</p>
                      <p className="text-[11px] font-mono text-[#FF6B35] font-semibold">2023-10-24 16:45:00 UTC</p>
                    </div>
                  </div>

                  {/* Node 2 */}
                  <div className="relative flex items-start space-x-3">
                    <div className="absolute -left-[23px] top-0.5 w-5 h-5 rounded-full bg-[#15161D] border-2 border-[#FF6B35] flex items-center justify-center">
                      <span className="w-2 h-2 rounded-full bg-[#FF6B35]" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-semibold text-white">Ingested by Forensic Node 4</p>
                      <p className="text-[11px] font-mono text-[#FF6B35] font-semibold">2023-10-24 18:12:33 UTC</p>
                    </div>
                  </div>

                  {/* Node 3 */}
                  <div className="relative flex items-start space-x-3">
                    <div className="absolute -left-[23px] top-0.5 w-5 h-5 rounded-full bg-[#15161D] border-2 border-[#FF6B35] flex items-center justify-center">
                      <span className="w-2 h-2 rounded-full bg-[#FF6B35]" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-semibold text-white">Metadata Extracted by EXIF Agent</p>
                      <p className="text-[11px] font-mono text-[#FF6B35] font-semibold">2023-10-24 18:13:01 UTC</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (EXIF Metadata panel) */}
          <div className="lg:col-span-3 bg-[#15161D] border border-[#1E1F2A] rounded-xl p-5 flex flex-col justify-between min-h-[640px] shadow-md">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#1E1F2A]">
                <span className="text-[#8A8B9A] text-xs font-mono uppercase tracking-wider font-semibold">EXIF & FORENSIC METADATA</span>
                <Cpu className="w-4 h-4 text-[#8A8B9A]" />
              </div>

              {/* Integrity Verified seal badge (green border, dark bg) */}
              <div className="p-3 bg-[#0B0C10] border border-[#00C853] rounded-xl space-y-1 text-center">
                <span className="text-[#00C853] text-xs font-bold font-mono tracking-widest block">🛡️ INTEGRITY VERIFIED</span>
                <span className="text-[10px] font-mono text-[#8A8B9A] block break-all font-semibold select-all mt-1">{selectedFile.hash}</span>
              </div>

              <div className="space-y-3">
                <div className="p-2.5 bg-[#0B0C10] border border-[#1E1F2A] rounded-lg">
                  <span className="text-[10px] font-mono uppercase text-[#8A8B9A] block">DEVICE NAME</span>
                  <span className="text-[12px] font-mono text-white">{selectedFile.deviceName || "Samsung Galaxy S21 Ultra (SM-G998U1)"}</span>
                </div>

                <div className="p-2.5 bg-[#0B0C10] border border-[#1E1F2A] rounded-lg">
                  <span className="text-[10px] font-mono uppercase text-[#8A8B9A] block">GPS COORDINATES</span>
                  <span className="text-[12px] font-mono text-white">{selectedFile.gpsCoordinates || "9.9726° N, 76.2783° E (Marine Drive, Kochi)"}</span>
                </div>

                <div className="p-2.5 bg-[#0B0C10] border border-[#1E1F2A] rounded-lg">
                  <span className="text-[10px] font-mono uppercase text-[#8A8B9A] block">TIMESTAMP</span>
                  <span className="text-[12px] font-mono text-white">{selectedFile.timestamp || "2023-10-24T15:30:22Z"}</span>
                </div>

                <div className="p-2.5 bg-[#0B0C10] border-l-2 border-l-[#00C853] border-y border-r border-[#1E1F2A] rounded-lg">
                  <span className="text-[10px] font-mono uppercase text-[#8A8B9A] block">AGENT PROCESSED</span>
                  <span className="text-[12px] font-mono text-white font-bold">{selectedFile.agentProcessed || "EXIF & OCR Extractor"}</span>
                </div>
              </div>
            </div>

            {/* Orange full width EXPORT REPORT button */}
            <div className="pt-4 border-t border-[#1E1F2A]">
              <button
                onClick={() => onOpenExport(selectedFile)}
                className="w-full py-3 bg-[#FF6B35] hover:bg-[#E85A24] text-[#0B0C10] font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center space-x-2 active:scale-98"
              >
                <FileDown className="w-4 h-4 text-[#0B0C10]" />
                <span>EXPORT REPORT</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
