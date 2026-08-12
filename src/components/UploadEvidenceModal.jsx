import React, { useState } from 'react';
import { 
  X, 
  UploadCloud, 
  Smartphone, 
  MessageSquare, 
  Send, 
  Mail, 
  Camera, 
  ShieldCheck, 
  Cpu, 
  Sparkles, 
  CheckCircle2, 
  Radio, 
  HardDrive,
  FileCheck,
  AlertTriangle
} from 'lucide-react';

export default function UploadEvidenceModal({ isOpen, onClose, onUploadComplete }) {
  const [activeTab, setActiveTab] = useState('clone'); // 'clone' | 'multi' | 'bin'
  const [selectedPlatform, setSelectedPlatform] = useState('whatsapp');
  const [deviceModel, setDeviceModel] = useState('Samsung Galaxy S21 Ultra (SM-G998U1)');
  const [extractionMethod, setExtractionMethod] = useState('Physical Bitstream (UFED 4PC)');
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [progress, setProgress] = useState(0);
  const [aiReport, setAiReport] = useState(null);

  if (!isOpen) return null;

  const handleStartIngestion = () => {
    setIsProcessing(true);
    setProgress(15);
    setCurrentStep(1);

    // Step 1: Device Cloning / Reading
    setTimeout(() => {
      setProgress(40);
      setCurrentStep(2);
    }, 1000);

    // Step 2: SHA-256 Hash & Seal
    setTimeout(() => {
      setProgress(75);
      setCurrentStep(3);
    }, 2000);

    // Step 3: AI Deep Scan & Court Section Mapping
    setTimeout(() => {
      setProgress(100);
      setCurrentStep(4);
      setAiReport({
        sha256: "3d41f891b00e82c140920491028374829104",
        recoveredChats: 142,
        suspiciousThreats: 4,
        deletedMailsRecovered: 2,
        courtSectionsTriggered: ["BNS Sec 351(2)", "POCSO Act Sec 11/12", "IT Act Sec 67B"],
        status: "SEALED & INGESTED"
      });
      setIsProcessing(false);
    }, 3200);
  };

  const handleFinish = () => {
    if (onUploadComplete) onUploadComplete(aiReport);
    setAiReport(null);
    setProgress(0);
    setCurrentStep(1);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 select-none">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-2xl bg-[#15161D] border border-[#1E1F2A] rounded-2xl shadow-2xl p-6 z-10 animate-slide-down max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#1E1F2A]">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-[#1E1F2A] border border-[#FF6B35]/40 flex items-center justify-center">
              <UploadCloud className="w-5 h-5 text-[#FF6B35]" />
            </div>
            <div>
              <h3 className="text-white font-extrabold text-base tracking-wide">
                MULTI-PLATFORM EVIDENCE INGESTION & DEVICE CLONER
              </h3>
              <p className="text-[#8A8B9A] text-xs font-mono">
                Kerala Police Cyberdome AI Deep Forensics Engine (Cellebrite & Inode Carver)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-[#1E1F2A] text-[#8A8B9A] hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        {!aiReport ? (
          <div className="mt-5 space-y-5">
            {/* Mode Tabs */}
            <div className="grid grid-cols-3 gap-2 p-1 bg-[#0B0C10] border border-[#1E1F2A] rounded-xl">
              <button
                type="button"
                onClick={() => setActiveTab('clone')}
                className={`py-2 px-3 text-xs font-semibold rounded-lg flex items-center justify-center space-x-2 transition-all ${
                  activeTab === 'clone'
                    ? 'bg-[#FF6B35] text-[#0B0C10] font-bold'
                    : 'text-[#8A8B9A] hover:text-white'
                }`}
              >
                <Smartphone className="w-4 h-4" />
                <span>Clone Entire Phone</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('multi')}
                className={`py-2 px-3 text-xs font-semibold rounded-lg flex items-center justify-center space-x-2 transition-all ${
                  activeTab === 'multi'
                    ? 'bg-[#FF6B35] text-[#0B0C10] font-bold'
                    : 'text-[#8A8B9A] hover:text-white'
                }`}
              >
                <MessageSquare className="w-4 h-4" />
                <span>Multi-Platform Chats</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('bin')}
                className={`py-2 px-3 text-xs font-semibold rounded-lg flex items-center justify-center space-x-2 transition-all ${
                  activeTab === 'bin'
                    ? 'bg-[#FF6B35] text-[#0B0C10] font-bold'
                    : 'text-[#8A8B9A] hover:text-white'
                }`}
              >
                <Mail className="w-4 h-4" />
                <span>Recovered Bin Mails</span>
              </button>
            </div>

            {/* Tab 1: Clone Entire Mobile Phone */}
            {activeTab === 'clone' && (
              <div className="space-y-4">
                <div className="p-4 bg-[#0B0C10] border border-[#1E1F2A] rounded-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-white text-xs font-bold font-mono uppercase">TARGET DEVICE SPECIFICATION</span>
                    <span className="text-[11px] font-mono text-[#00C853]">USB-C FAST-BOOT DETECTED</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] font-mono uppercase text-[#8A8B9A] block mb-1">
                        Device Model / Serial
                      </label>
                      <input
                        type="text"
                        value={deviceModel}
                        onChange={(e) => setDeviceModel(e.target.value)}
                        className="w-full bg-[#15161D] border border-[#1E1F2A] focus:border-[#FF6B35] rounded-lg px-3 py-2 text-white text-xs font-mono outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-mono uppercase text-[#8A8B9A] block mb-1">
                        Acquisition Protocol
                      </label>
                      <select
                        value={extractionMethod}
                        onChange={(e) => setExtractionMethod(e.target.value)}
                        className="w-full bg-[#15161D] border border-[#1E1F2A] focus:border-[#FF6B35] rounded-lg px-3 py-2 text-white text-xs font-mono outline-none"
                      >
                        <option>Physical Bitstream (UFED 4PC E01)</option>
                        <option>Logical Full ADB Dump</option>
                        <option>Filesystem Ext4 Advanced Carver</option>
                        <option>iOS Encrypted iTunes / Full Tar</option>
                      </select>
                    </div>
                  </div>

                  <div className="p-3 bg-[#15161D] border border-dashed border-[#1E1F2A] rounded-lg text-xs flex items-center justify-between text-[#8A8B9A]">
                    <div className="flex items-center space-x-2">
                      <HardDrive className="w-4 h-4 text-[#FF6B35]" />
                      <span>Extraction will clone storage, apps, deleted SQLite databases, and GPS logs.</span>
                    </div>
                    <span className="text-[#00C853] font-mono font-bold">128 GB</span>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Multi-Platform Chats */}
            {activeTab === 'multi' && (
              <div className="space-y-4">
                <label className="text-[11px] font-mono uppercase text-[#8A8B9A] block">
                  Select Messaging Platform Data Source
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { id: 'whatsapp', name: 'WhatsApp', icon: MessageSquare, desc: 'Crypt14 / SQLite DB' },
                    { id: 'telegram', name: 'Telegram', icon: Send, desc: 'JSON / TDLib Session' },
                    { id: 'instagram', name: 'Instagram', icon: Camera, desc: 'Direct Message JSON' },
                    { id: 'discord', name: 'Discord', icon: Radio, desc: 'Channel Dump' }
                  ].map((p) => {
                    const Icon = p.icon;
                    const isSelected = selectedPlatform === p.id;
                    return (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setSelectedPlatform(p.id)}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          isSelected
                            ? 'bg-[#1E1F2A] border-[#FF6B35] card-selected-glow'
                            : 'bg-[#0B0C10] border-[#1E1F2A] hover:border-[#FF6B35]/50'
                        }`}
                      >
                        <Icon className={`w-5 h-5 mb-1 ${isSelected ? 'text-[#FF6B35]' : 'text-[#8A8B9A]'}`} />
                        <div className="text-white text-xs font-bold">{p.name}</div>
                        <div className="text-[#8A8B9A] text-[10px] font-mono mt-0.5">{p.desc}</div>
                      </button>
                    );
                  })}
                </div>

                <div className="p-4 bg-[#0B0C10] border border-dashed border-[#1E1F2A] rounded-xl flex flex-col items-center justify-center text-center cursor-pointer hover:border-[#FF6B35]/50 transition-colors">
                  <UploadCloud className="w-7 h-7 text-[#FF6B35] mb-2" />
                  <p className="text-white text-xs font-semibold">Drop multi-platform chat logs or encrypted archives</p>
                  <p className="text-[#8A8B9A] text-[10px] font-mono mt-1">Supports .enc, .db, .sqlite, .json, .zip</p>
                </div>
              </div>
            )}

            {/* Tab 3: Recovered Bin Mails */}
            {activeTab === 'bin' && (
              <div className="space-y-4">
                <div className="p-4 bg-[#0B0C10] border border-[#1E1F2A] rounded-xl space-y-2.5">
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-[#FF6B35]" />
                    <span className="text-white text-xs font-bold">Unallocated Mail Inode Deep Carver</span>
                  </div>
                  <p className="text-[#8A8B9A] text-xs leading-relaxed">
                    Recovers intentionally purged draft emails, discarded trash inbox messages, and dark escrow notifications from Gmail, ProtonMail, and Outlook raw disk sectors.
                  </p>
                  <div className="p-2.5 bg-[#15161D] rounded-lg border border-[#1E1F2A] text-[11px] font-mono text-white flex justify-between">
                    <span>SECTOR RANGE: 0x004F8000 - 0x009BA000</span>
                    <span className="text-[#FF6B35]">2 DELETED DRAFTS PINPOINTED</span>
                  </div>
                </div>
              </div>
            )}

            {/* Ingestion Progress State */}
            {isProcessing && (
              <div className="p-4 bg-[#0B0C10] border border-[#FF6B35] rounded-xl space-y-3 animate-slide-down">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[#FF6B35] font-bold flex items-center space-x-2">
                    <Sparkles className="w-4 h-4 animate-spin text-[#FF6B35]" />
                    <span>
                      {currentStep === 1 && "STEP 1: ACQUIRING PHYSICAL BITSTREAM..."}
                      {currentStep === 2 && "STEP 2: COMPUTING SHA-256 HASH SEAL..."}
                      {currentStep === 3 && "STEP 3: AI SCANNING THREAT CHATS & RECOVERING BIN MAILS..."}
                    </span>
                  </span>
                  <span className="text-white font-bold">{progress}%</span>
                </div>

                <div className="w-full h-2 bg-[#1E1F2A] rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#FF6B35] transition-all duration-500 rounded-full" 
                    style={{ width: `${progress}%` }}
                  />
                </div>

                <div className="text-[11px] font-mono text-[#8A8B9A] flex items-center justify-between">
                  <span>FORENSIC AGENT: Threat Scout + EXIF Engine</span>
                  <span className="text-[#00C853]">MUTATION LOCK ENGAGED</span>
                </div>
              </div>
            )}

            {/* Bottom Actions */}
            <div className="pt-3 flex items-center justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                disabled={isProcessing}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold text-[#8A8B9A] hover:text-white bg-[#1E1F2A] transition-colors"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleStartIngestion}
                disabled={isProcessing}
                className="px-6 py-2.5 rounded-xl text-xs font-bold text-[#0B0C10] bg-[#FF6B35] hover:bg-[#E85A24] transition-all shadow-md flex items-center space-x-2"
              >
                <Cpu className="w-4 h-4 text-[#0B0C10]" />
                <span>
                  {isProcessing ? "INGESTING EVIDENCE..." : "START AI EXTRACTION & INGESTION"}
                </span>
              </button>
            </div>
          </div>
        ) : (
          /* Extraction Completed & AI Findings Report */
          <div className="mt-5 space-y-4 animate-slide-down">
            <div className="p-4 bg-[#0B0C10] border border-[#00C853] rounded-xl flex items-start space-x-3">
              <CheckCircle2 className="w-6 h-6 text-[#00C853] flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-white text-sm font-bold">
                  EVIDENCE EXTRACTION & AI SCANNING COMPLETE
                </h4>
                <p className="text-[#8A8B9A] text-xs mt-0.5">
                  Device bitstream cloned, deleted bin messages carved, and statutory court sections automatically mapped.
                </p>
              </div>
            </div>

            {/* Findings Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 bg-[#0B0C10] border border-[#1E1F2A] rounded-xl">
                <span className="text-[10px] font-mono uppercase text-[#8A8B9A] block">Recovered Chats</span>
                <span className="text-white font-mono font-bold text-lg">{aiReport.recoveredChats}</span>
              </div>
              <div className="p-3 bg-[#0B0C10] border border-[#FF6B35] rounded-xl">
                <span className="text-[10px] font-mono uppercase text-[#FF6B35] block">Threat Messages</span>
                <span className="text-white font-mono font-bold text-lg">{aiReport.suspiciousThreats} Flagged</span>
              </div>
              <div className="p-3 bg-[#0B0C10] border border-[#1E1F2A] rounded-xl">
                <span className="text-[10px] font-mono uppercase text-[#8A8B9A] block">Deleted Bin Mails</span>
                <span className="text-white font-mono font-bold text-lg">{aiReport.deletedMailsRecovered} Carved</span>
              </div>
              <div className="p-3 bg-[#0B0C10] border border-[#00C853] rounded-xl">
                <span className="text-[10px] font-mono uppercase text-[#00C853] block">Chain Integrity</span>
                <span className="text-white font-mono font-bold text-lg">100% SHA-256</span>
              </div>
            </div>

            {/* Triggered Court Sections */}
            <div className="p-4 bg-[#0B0C10] border border-[#1E1F2A] rounded-xl space-y-2">
              <div className="flex items-center space-x-2 text-xs font-mono text-[#FF6B35] font-bold uppercase">
                <AlertTriangle className="w-4 h-4 text-[#FF6B35]" />
                <span>AUTOMATICALLY TRIGGERED COURT PROSECUTION SECTIONS</span>
              </div>
              <div className="flex flex-wrap gap-2 pt-1">
                {aiReport.courtSectionsTriggered.map((sec, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-[#15161D] border border-[#FF6B35] text-[#FF6B35] text-xs font-mono font-bold rounded-lg"
                  >
                    {sec}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={handleFinish}
                className="px-6 py-2.5 rounded-xl text-xs font-bold text-[#0B0C10] bg-[#00C853] hover:bg-[#00B048] transition-all shadow-md"
              >
                View Evidence in Workspace
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
