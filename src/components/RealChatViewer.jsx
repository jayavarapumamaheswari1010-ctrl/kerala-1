import React, { useState } from 'react';
import { 
  MessageSquare, 
  Send, 
  Camera, 
  Phone, 
  Video, 
  MoreVertical, 
  CheckCheck, 
  AlertTriangle, 
  Scale, 
  ShieldCheck, 
  Info, 
  Clock, 
  Lock, 
  FileDown,
  Sparkles,
  ChevronRight,
  Eye,
  Play,
  Pause,
  Radio
} from 'lucide-react';
import { SUSPICIOUS_CHATS } from '../data/forensicData';

export default function RealChatViewer({ onOpenExport }) {
  const [selectedThreadId, setSelectedThreadId] = useState(SUSPICIOUS_CHATS[0].id);
  const [activeMessageInspection, setActiveMessageInspection] = useState(SUSPICIOUS_CHATS[0].messages[6] || SUSPICIOUS_CHATS[0].messages[2]);
  const [isPlayingVoice, setIsPlayingVoice] = useState(false);

  const currentThread = SUSPICIOUS_CHATS.find(c => c.id === selectedThreadId) || SUSPICIOUS_CHATS[0];

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-5 items-start select-none">
      {/* Left Sidebar: Select Chat Thread */}
      <div className="lg:col-span-4 space-y-3">
        <div className="p-3 bg-[#15161D] border border-[#1E1F2A] rounded-xl flex items-center justify-between">
          <span className="text-white text-xs font-bold font-mono uppercase tracking-wider">
            Flagged Chat Evidence ({SUSPICIOUS_CHATS.length})
          </span>
          <span className="px-2 py-0.5 bg-[#FF1744]/20 border border-[#FF1744] text-[#FF1744] text-[10px] font-mono font-bold rounded">
            AI TRIAGE
          </span>
        </div>

        <div className="space-y-2">
          {SUSPICIOUS_CHATS.map((thread) => {
            const isSelected = selectedThreadId === thread.id;
            return (
              <div
                key={thread.id}
                onClick={() => {
                  setSelectedThreadId(thread.id);
                  const firstSuspicious = thread.messages.find(m => m.suspicious) || thread.messages[0];
                  setActiveMessageInspection(firstSuspicious);
                }}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-[#1E1F2A] border-[#FF6B35] card-selected-glow'
                    : 'bg-[#15161D] border-[#1E1F2A] hover:border-[#FF6B35]/40'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-0.5 bg-[#0B0C10] border border-[#FF6B35] text-[#FF6B35] text-[10px] font-mono font-bold rounded">
                      {thread.platform}
                    </span>
                    <span className="text-white text-xs font-bold truncate max-w-[140px]">{thread.sender}</span>
                  </div>
                  <span className="text-[10px] font-mono text-[#FF1744] font-bold">{thread.threatLevel}</span>
                </div>

                <div className="text-white text-xs font-semibold line-clamp-1">
                  {thread.title}
                </div>

                <p className="text-[#8A8B9A] text-[11px] mt-1 line-clamp-2 leading-relaxed">
                  {thread.suspicionSummary}
                </p>

                <div className="mt-2.5 pt-2 border-t border-[#1E1F2A] flex items-center justify-between text-[10px] font-mono text-[#8A8B9A]">
                  <span>{thread.timestamp.split(' ')[0]}</span>
                  <span className="text-[#00C853]">{thread.messages.filter(m => m.suspicious).length} Flagged Points</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Forensic Ingestion Metadata */}
        <div className="p-3.5 bg-[#15161D] border border-[#1E1F2A] rounded-xl space-y-1.5 text-xs font-mono">
          <div className="flex justify-between text-[#8A8B9A]">
            <span>ACQUISITION:</span>
            <span className="text-white">UFED Physical Bitstream</span>
          </div>
          <div className="flex justify-between text-[#8A8B9A]">
            <span>ENCRYPTION:</span>
            <span className="text-[#00C853]">Decrypted via Key Escrow</span>
          </div>
          <div className="flex justify-between text-[#8A8B9A]">
            <span>HASH VERIFIED:</span>
            <span className="text-white">SHA-256 MATCH</span>
          </div>
        </div>
      </div>

      {/* Center: Ultra-Realistic Phone Mobile Chat Viewport */}
      <div className="lg:col-span-5 flex flex-col items-center">
        {/* Mobile Phone Mockup Frame */}
        <div className="w-full max-w-[380px] bg-[#15161D] border-2 border-[#1E1F2A] rounded-[36px] p-3 shadow-2xl relative overflow-hidden">
          {/* Phone Top Notch & Camera */}
          <div className="w-full flex items-center justify-between px-4 pt-1 pb-2 text-[10px] font-mono text-[#8A8B9A]">
            <span>15:32</span>
            <div className="w-20 h-4 bg-[#0B0C10] rounded-full mx-auto" />
            <div className="flex items-center space-x-1">
              <span>5G</span>
              <div className="w-4 h-2 border border-[#8A8B9A] rounded-sm p-0.5">
                <div className="w-full h-full bg-[#00C853]" />
              </div>
            </div>
          </div>

          {/* App Header (WhatsApp / Telegram Style) */}
          <div className="bg-[#0B0C10] border border-[#1E1F2A] rounded-2xl overflow-hidden flex flex-col min-h-[520px] max-h-[580px]">
            <div className="p-3 bg-[#15161D] border-b border-[#1E1F2A] flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <div className="w-9 h-9 rounded-full bg-[#1E1F2A] border border-[#FF6B35] flex items-center justify-center font-bold text-xs text-[#FF6B35]">
                  {currentThread.platform === 'WhatsApp' ? 'WA' : currentThread.platform === 'Telegram' ? 'TG' : 'IG'}
                </div>
                <div>
                  <div className="text-white text-xs font-bold truncate max-w-[130px] flex items-center space-x-1">
                    <span>{currentThread.sender.split('(')[0]}</span>
                    <span className="w-2 h-2 rounded-full bg-[#FF1744]" />
                  </div>
                  <div className="text-[#8A8B9A] text-[9px] font-mono flex items-center space-x-1">
                    <Lock className="w-2.5 h-2.5 text-[#00C853]" />
                    <span>E2E Encrypted • Online</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2 text-[#8A8B9A]">
                <Phone className="w-3.5 h-3.5 hover:text-white cursor-pointer" />
                <Video className="w-3.5 h-3.5 hover:text-white cursor-pointer" />
                <MoreVertical className="w-3.5 h-3.5 hover:text-white cursor-pointer" />
              </div>
            </div>

            {/* Chat Body Notice */}
            <div className="p-2 bg-[#0B0C10] text-center border-b border-[#1E1F2A]/50">
              <span className="text-[9px] font-mono text-[#8A8B9A] bg-[#15161D] px-2.5 py-1 rounded-full border border-[#1E1F2A]">
                ⏱️ Disappearing messages enabled (24 hours)
              </span>
            </div>

            {/* Messages Scroll Area */}
            <div className="p-3 space-y-3 flex-1 overflow-y-auto bg-[#0B0C10]">
              {currentThread.messages.map((msg) => {
                const isSuspect = msg.sender === 'suspect';
                const isSelected = activeMessageInspection?.id === msg.id;

                return (
                  <div
                    key={msg.id}
                    onClick={() => setActiveMessageInspection(msg)}
                    className={`flex flex-col cursor-pointer transition-all ${
                      isSuspect ? 'items-start' : 'items-end'
                    }`}
                  >
                    <div
                      className={`max-w-[86%] p-3 rounded-2xl text-xs relative ${
                        isSuspect
                          ? msg.suspicious
                            ? `bg-[#15161D] border-2 border-[#FF6B35] text-white rounded-tl-sm ${
                                isSelected ? 'ring-2 ring-[#FF6B35] shadow-accent-glow' : ''
                              }`
                            : 'bg-[#15161D] border border-[#1E1F2A] text-white rounded-tl-sm'
                          : 'bg-[#1E1F2A] border border-[#1E1F2A] text-white rounded-tr-sm'
                      }`}
                    >
                      {/* Suspicious Alert Header Tag if Flagged */}
                      {msg.suspicious && (
                        <div className="flex items-center space-x-1 text-[9px] font-mono text-[#FF6B35] font-bold uppercase mb-1 pb-1 border-b border-[#FF6B35]/30">
                          <AlertTriangle className="w-3 h-3 text-[#FF6B35] animate-pulse" />
                          <span>{msg.flag.tactic}</span>
                        </div>
                      )}

                      <p className="leading-relaxed font-sans text-white text-[11px]">
                        {msg.text}
                      </p>

                      <div className="flex items-center justify-end space-x-1 mt-1 text-[9px] font-mono text-[#8A8B9A]">
                        <span>{msg.time}</span>
                        {!isSuspect && <CheckCheck className="w-3 h-3 text-[#00C853]" />}
                      </div>
                    </div>

                    {msg.suspicious && (
                      <span className="text-[8px] font-mono text-[#FF6B35] mt-0.5 pl-1">
                        ▶ Click to inspect why this is suspicious
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Bottom Fake Input Box */}
            <div className="p-2.5 bg-[#15161D] border-t border-[#1E1F2A] flex items-center justify-between text-[11px] text-[#8A8B9A] font-mono">
              <span className="truncate">IMMUTABLE FORENSIC SNAPSHOT</span>
              <span className="text-[#00C853] font-bold">SEC 65B SEALED</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right: AI Suspicion Inspector ("What Makes This Suspicious") */}
      <div className="lg:col-span-3 space-y-4">
        {activeMessageInspection ? (
          <div className="bg-[#15161D] border border-[#FF6B35] rounded-xl p-4 space-y-3.5 shadow-2xl animate-slide-down">
            <div className="flex items-center justify-between pb-2 border-b border-[#1E1F2A]">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-[#FF6B35]" />
                <h4 className="text-white text-xs font-bold uppercase tracking-wider font-mono">
                  WHAT MAKES THIS SUSPICIOUS?
                </h4>
              </div>
              {activeMessageInspection.suspicious ? (
                <span className="px-2 py-0.5 bg-[#FF6B35] text-[#0B0C10] text-[10px] font-mono font-bold rounded">
                  {activeMessageInspection.flag.score} CONFIDENCE
                </span>
              ) : (
                <span className="px-2 py-0.5 bg-[#1E1F2A] text-[#8A8B9A] text-[10px] font-mono rounded">
                  BENIGN MESSAGE
                </span>
              )}
            </div>

            {/* Inspected Message Quote */}
            <div className="p-3 bg-[#0B0C10] border border-[#1E1F2A] rounded-xl text-xs">
              <span className="text-[10px] font-mono text-[#8A8B9A] block mb-1">
                ANALYZED TEXT ({activeMessageInspection.time}):
              </span>
              <p className="text-white font-medium italic leading-relaxed">
                "{activeMessageInspection.text}"
              </p>
            </div>

            {activeMessageInspection.suspicious ? (
              <div className="space-y-3">
                {/* Forensic Tactic Breakdown */}
                <div className="p-3 bg-[#0B0C10] border border-[#FF6B35]/50 rounded-xl space-y-1">
                  <span className="text-[10px] font-mono text-[#FF6B35] uppercase font-bold block">
                    1. PSYCHOLOGICAL MANIPULATION TACTIC:
                  </span>
                  <div className="text-white text-xs font-bold">
                    {activeMessageInspection.flag.tactic}
                  </div>
                  <p className="text-[#8A8B9A] text-[11px] leading-relaxed mt-1">
                    {activeMessageInspection.flag.reason}
                  </p>
                </div>

                {/* Statutory Law Section Triggered */}
                <div className="p-3 bg-[#0B0C10] border border-[#00C853]/50 rounded-xl space-y-1">
                  <div className="flex items-center space-x-1.5 text-[10px] font-mono text-[#00C853] uppercase font-bold">
                    <Scale className="w-3.5 h-3.5 text-[#00C853]" />
                    <span>2. STATUTORY COURT SECTION:</span>
                  </div>
                  <div className="text-white text-xs font-bold font-mono">
                    {activeMessageInspection.flag.section}
                  </div>
                </div>

                {/* Recommended Immediate Police Action */}
                <div className="p-3 bg-[#0B0C10] border border-[#1E1F2A] rounded-xl space-y-1 text-xs">
                  <span className="text-[10px] font-mono text-[#8A8B9A] uppercase font-bold block">
                    3. RECOMMENDED INVESTIGATIVE ACTION:
                  </span>
                  <p className="text-white text-[11px] leading-relaxed">
                    Issue emergency preservation request under <strong>Section 91 CrPC</strong> to ISP / Meta / Telegram for IP login logs and IMSI number binding.
                  </p>
                </div>
              </div>
            ) : (
              <div className="p-3 bg-[#0B0C10] border border-[#1E1F2A] rounded-xl text-xs text-[#8A8B9A]">
                This message was categorized as standard baseline context. Select one of the orange-highlighted messages to inspect the detected extortion or grooming tactics.
              </div>
            )}

            <button
              onClick={() => onOpenExport({ name: `${currentThread.title}_Legal_Dossier.pdf` })}
              className="w-full py-2.5 bg-[#FF6B35] hover:bg-[#E85A24] text-[#0B0C10] font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center space-x-2"
            >
              <FileDown className="w-4 h-4 text-[#0B0C10]" />
              <span>Export This Chat Evidence Dossier</span>
            </button>
          </div>
        ) : (
          <div className="p-4 bg-[#15161D] border border-[#1E1F2A] rounded-xl text-center text-[#8A8B9A] text-xs">
            Select any message in the phone viewport to inspect forensic threat signals.
          </div>
        )}
      </div>
    </div>
  );
}
