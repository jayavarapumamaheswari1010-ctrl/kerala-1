import React, { useState } from 'react';
import { 
  Network, 
  Users, 
  Share2, 
  AlertTriangle, 
  ShieldCheck, 
  MapPin, 
  Radio, 
  ExternalLink,
  ChevronRight,
  Filter,
  Search,
  Video,
  Eye,
  Camera
} from 'lucide-react';
import { MOCK_CASE } from '../data/forensicData';
import CctvAnalyzer from '../components/CctvAnalyzer';

export default function AnalysisPage({ onOpenDebrief }) {
  const [activeAnalysisView, setActiveAnalysisView] = useState('graph'); // 'graph' | 'cctv'
  const [selectedNode, setSelectedNode] = useState('suspect-1');

  const suspects = [
    {
      id: 'suspect-1',
      name: 'Suspect Alpha (Alias: NexusLead)',
      role: 'Primary Grooming Coordinator',
      matchedCase: 'Kochi 2024 (#KP-2024-0192)',
      riskLevel: 'CRITICAL',
      phone: '+91 98470 XXXXX',
      telegram: '@nexus_shadow',
      location: 'Kochi Marine Drive',
      devices: ['Samsung S21 Ultra (SM-G998U1)', 'MacBook Pro M1'],
      evidenceCount: 142,
      cctvSightings: 'CAM-04 Sector 7 (08:12 IST) • 98.4% Biometric Match'
    },
    {
      id: 'suspect-2',
      name: 'Suspect Beta (Alias: CipherKID)',
      role: 'Cryptographic Channel Moderator',
      matchedCase: 'Ernakulam Cyber (#KP-2025-0411)',
      riskLevel: 'HIGH',
      phone: '+91 97452 XXXXX',
      telegram: '@cipher_kid_99',
      location: 'Kakkanad Infopark Node',
      devices: ['OnePlus 11R'],
      evidenceCount: 68,
      cctvSightings: 'CAM-09 Infopark Phase-2 (07:30 IST) • 94.8% Match'
    },
    {
      id: 'suspect-3',
      name: 'Suspect Gamma (Alias: ByteProxy)',
      role: 'Hardware Exfiltration Courier',
      matchedCase: 'Kozhikode Coastal (#KP-2024-0881)',
      riskLevel: 'MEDIUM',
      phone: '+91 94471 XXXXX',
      telegram: '@byte_courier',
      location: 'MG Road Cyber Node',
      devices: ['Dell Inspiron Latitude'],
      evidenceCount: 37,
      cctvSightings: 'CAM-12 MG Road Node • 87.1% Courier Match'
    }
  ];

  const current = suspects.find(s => s.id === selectedNode) || suspects[0];

  return (
    <div className="p-4 md:p-6 space-y-5 max-w-[1600px] mx-auto select-none page-enter pb-20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#1E1F2A]">
        <div>
          <h1 className="text-white font-extrabold text-2xl tracking-tight flex items-center space-x-2">
            <Network className="w-6 h-6 text-[#FF6B35]" />
            <span>KNOWLEDGE GRAPH & SURVEILLANCE CORRELATION</span>
          </h1>
          <p className="text-[#8A8B9A] text-xs font-mono mt-0.5">
            Cross-Jurisdiction Forensic Correlation & Video Biometrics Engine • Cyberdome Tier-1 Node
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={onOpenDebrief}
            className="px-3.5 py-2 bg-[#FF6B35] text-[#0B0C10] font-bold text-xs rounded-xl flex items-center space-x-1.5 transition-colors"
          >
            <Radio className="w-3.5 h-3.5" />
            <span>Run Debrief Analysis</span>
          </button>
        </div>
      </div>

      {/* View Switcher: Knowledge Graph vs CCTV Person Detection */}
      <div className="flex items-center space-x-2">
        <button
          onClick={() => setActiveAnalysisView('graph')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold border flex items-center space-x-2 transition-all ${
            activeAnalysisView === 'graph'
              ? 'bg-[#1E1F2A] border-[#FF6B35] text-white card-selected-glow'
              : 'bg-[#15161D] border-[#1E1F2A] text-[#8A8B9A] hover:text-white'
          }`}
        >
          <Network className={`w-4 h-4 ${activeAnalysisView === 'graph' ? 'text-[#FF6B35]' : 'text-[#8A8B9A]'}`} />
          <span>Entity Knowledge Graph & Link Analysis</span>
        </button>

        <button
          onClick={() => setActiveAnalysisView('cctv')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold border flex items-center space-x-2 transition-all ${
            activeAnalysisView === 'cctv'
              ? 'bg-[#1E1F2A] border-[#FF6B35] text-white card-selected-glow'
              : 'bg-[#15161D] border-[#1E1F2A] text-[#8A8B9A] hover:text-white'
          }`}
        >
          <Video className={`w-4 h-4 ${activeAnalysisView === 'cctv' ? 'text-[#FF6B35]' : 'text-[#8A8B9A]'}`} />
          <span>🎥 Live CCTV AI Person Detection & Bounding Boxes</span>
          <span className="px-1.5 py-0.5 bg-[#00C853]/20 text-[#00C853] text-[10px] font-mono font-bold rounded">
            98.4% Match
          </span>
        </button>
      </div>

      {activeAnalysisView === 'cctv' ? (
        <CctvAnalyzer onExportSnapshot={() => alert("CCTV Suspect Identification Frame exported to Case File.")} />
      ) : (
        /* Knowledge Graph View */
        <div className="space-y-4">
          {/* Correlation Alert */}
          <div className="p-4 bg-[#15161D] border-l-[3px] border-[#FF6B35] border-y border-r border-[#1E1F2A] rounded-xl flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <AlertTriangle className="w-5 h-5 text-[#FF6B35] flex-shrink-0" />
              <p className="text-white text-xs font-medium">
                <strong>MULTI-CASE GRAPH CORRELATION:</strong> Cross-link verified between <strong>KP-2026-0812</strong> and <strong>KP-2024-0192</strong>. Common Telegram bot token & CAM-04 biometric gait signature detected.
              </p>
            </div>
            <span className="text-xs font-mono text-[#00C853] hidden md:inline">99.4% CONFIDENCE</span>
          </div>

          {/* Graph Area & Suspect Detail */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* Graph Canvas Visualizer */}
            <div className="lg:col-span-8 bg-[#15161D] border border-[#1E1F2A] rounded-xl p-5 flex flex-col justify-between min-h-[500px]">
              <div className="flex items-center justify-between pb-3 border-b border-[#1E1F2A]">
                <span className="text-white text-xs font-bold uppercase tracking-wider font-mono">
                  INTERACTIVE ENTITY NETWORK
                </span>
                <div className="flex items-center space-x-2 text-[11px] font-mono text-[#8A8B9A]">
                  <span className="w-2 h-2 rounded-full bg-[#FF6B35]" />
                  <span>SUSPECT</span>
                  <span className="w-2 h-2 rounded-full bg-[#00C853] ml-2" />
                  <span>EVIDENCE NODE</span>
                </div>
              </div>

              {/* Graph visual representation */}
              <div className="relative my-4 flex-1 bg-[#0B0C10] border border-[#1E1F2A] rounded-xl min-h-[360px] flex items-center justify-center overflow-hidden">
                <div 
                  className="absolute inset-0 opacity-15"
                  style={{
                    backgroundImage: 'radial-gradient(#1E1F2A 1px, transparent 1px)',
                    backgroundSize: '20px 20px'
                  }}
                />

                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  <line x1="50%" y1="50%" x2="25%" y2="30%" stroke="#FF6B35" strokeWidth="2" strokeDasharray="3,3" />
                  <line x1="50%" y1="50%" x2="75%" y2="30%" stroke="#FF6B35" strokeWidth="2" strokeDasharray="3,3" />
                  <line x1="50%" y1="50%" x2="50%" y2="80%" stroke="#00C853" strokeWidth="1.5" />
                  <line x1="25%" y1="30%" x2="20%" y2="75%" stroke="#1E1F2A" strokeWidth="1" />
                  <line x1="75%" y1="30%" x2="80%" y2="75%" stroke="#1E1F2A" strokeWidth="1" />
                </svg>

                {/* Center Node */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 p-3 bg-[#15161D] border-2 border-[#FF6B35] rounded-2xl text-center shadow-accent-glow z-10">
                  <span className="text-[10px] font-mono text-[#FF6B35] font-bold block uppercase">OPERATION DOCKET</span>
                  <span className="text-white font-mono font-extrabold text-xs">{MOCK_CASE.id}</span>
                </div>

                {/* Suspect 1 */}
                <button
                  onClick={() => setSelectedNode('suspect-1')}
                  className={`absolute left-[25%] top-[30%] -translate-x-1/2 -translate-y-1/2 p-3 rounded-xl border text-left transition-all z-10 ${
                    selectedNode === 'suspect-1'
                      ? 'bg-[#1E1F2A] border-[#FF6B35] card-selected-glow'
                      : 'bg-[#15161D] border-[#1E1F2A] hover:border-[#FF6B35]/50'
                  }`}
                >
                  <div className="flex items-center space-x-1.5">
                    <Users className="w-3.5 h-3.5 text-[#FF6B35]" />
                    <span className="text-white text-xs font-bold font-mono">Suspect Alpha</span>
                  </div>
                  <span className="text-[9px] font-mono text-[#FF1744] block mt-0.5">CRITICAL • CAM-04 MATCH</span>
                </button>

                {/* Suspect 2 */}
                <button
                  onClick={() => setSelectedNode('suspect-2')}
                  className={`absolute left-[75%] top-[30%] -translate-x-1/2 -translate-y-1/2 p-3 rounded-xl border text-left transition-all z-10 ${
                    selectedNode === 'suspect-2'
                      ? 'bg-[#1E1F2A] border-[#FF6B35] card-selected-glow'
                      : 'bg-[#15161D] border-[#1E1F2A] hover:border-[#FF6B35]/50'
                  }`}
                >
                  <div className="flex items-center space-x-1.5">
                    <Users className="w-3.5 h-3.5 text-[#FF6B35]" />
                    <span className="text-white text-xs font-bold font-mono">Suspect Beta</span>
                  </div>
                  <span className="text-[9px] font-mono text-[#FF6B35] block mt-0.5">HIGH RISK • CAM-09</span>
                </button>

                {/* Suspect 3 */}
                <button
                  onClick={() => setSelectedNode('suspect-3')}
                  className={`absolute left-[50%] top-[80%] -translate-x-1/2 -translate-y-1/2 p-3 rounded-xl border text-left transition-all z-10 ${
                    selectedNode === 'suspect-3'
                      ? 'bg-[#1E1F2A] border-[#FF6B35] card-selected-glow'
                      : 'bg-[#15161D] border-[#1E1F2A] hover:border-[#FF6B35]/50'
                  }`}
                >
                  <div className="flex items-center space-x-1.5">
                    <Users className="w-3.5 h-3.5 text-[#8A8B9A]" />
                    <span className="text-white text-xs font-bold font-mono">Suspect Gamma</span>
                  </div>
                  <span className="text-[9px] font-mono text-[#8A8B9A] block mt-0.5">COURIER NODE</span>
                </button>
              </div>

              <div className="flex items-center justify-between text-xs text-[#8A8B9A] font-mono pt-2">
                <span>GRAPH HEURISTIC: LEIDEN CLUSTERING</span>
                <span>NODES: 12 • EDGES: 28</span>
              </div>
            </div>

            {/* Selected Suspect Profile Panel */}
            <div className="lg:col-span-4 bg-[#15161D] border border-[#1E1F2A] rounded-xl p-5 flex flex-col justify-between min-h-[500px]">
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#1E1F2A]">
                  <span className="text-[#8A8B9A] text-xs font-mono uppercase tracking-wider font-semibold">
                    SUSPECT DOSSIER & SIGHTINGS
                  </span>
                  <span className="px-2 py-0.5 bg-[#FF6B35]/15 border border-[#FF6B35] text-[#FF6B35] text-[10px] font-mono font-bold rounded">
                    {current.riskLevel}
                  </span>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="p-3 bg-[#0B0C10] border border-[#1E1F2A] rounded-lg">
                    <span className="text-[10px] font-mono uppercase text-[#8A8B9A] block">IDENTIFIED ENTITY</span>
                    <span className="text-white font-bold text-sm block mt-0.5">{current.name}</span>
                    <span className="text-[#FF6B35] text-xs font-mono">{current.role}</span>
                  </div>

                  <div className="p-3 bg-[#0B0C10] border border-[#1E1F2A] rounded-lg space-y-2">
                    <div className="flex justify-between">
                      <span className="text-[#8A8B9A] font-mono text-[11px]">CCTV SIGHTING:</span>
                      <span className="text-[#00C853] font-mono text-[11px] truncate max-w-[170px]">{current.cctvSightings}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#8A8B9A] font-mono text-[11px]">TELEGRAM HANDLE:</span>
                      <span className="text-[#FF6B35] font-mono text-[11px]">{current.telegram}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#8A8B9A] font-mono text-[11px]">LOCATION PIN:</span>
                      <span className="text-white font-mono text-[11px]">{current.location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#8A8B9A] font-mono text-[11px]">LINKED EVIDENCE:</span>
                      <span className="text-[#00C853] font-mono text-[11px]">{current.evidenceCount} items</span>
                    </div>
                  </div>

                  <div className="p-3 bg-[#0B0C10] border border-[#1E1F2A] rounded-lg">
                    <span className="text-[10px] font-mono uppercase text-[#8A8B9A] block mb-1">REGISTERED HARDWARE</span>
                    <ul className="space-y-1">
                      {current.devices.map((d, i) => (
                        <li key={i} className="text-white font-mono text-[11px] flex items-center space-x-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B35]" />
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#1E1F2A]">
                <button
                  onClick={() => alert(`Suspect ${current.name} flagged for Cyberdome Special Action Group.`)}
                  className="w-full py-2.5 bg-[#FF6B35] hover:bg-[#E85A24] text-[#0B0C10] font-bold text-xs uppercase tracking-wider rounded-custom transition-all shadow-md"
                >
                  Issue Intercept Warrant (Sec 69 IT Act)
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
