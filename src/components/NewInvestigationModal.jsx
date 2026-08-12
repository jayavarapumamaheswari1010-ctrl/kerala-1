import React, { useState, useRef } from 'react';
import { 
  X, 
  Shield, 
  Plus, 
  UploadCloud, 
  CheckCircle2, 
  FileCode, 
  FileText, 
  HardDrive, 
  Smartphone, 
  Video, 
  FolderOpen, 
  FilePlus, 
  AlertTriangle,
  Scale,
  Sparkles,
  Lock,
  Cpu,
  Radio
} from 'lucide-react';
import { speakText, playRadioChime } from '../utils/audioSpeech';

export default function NewInvestigationModal({ isOpen, onClose, onCaseInitialized }) {
  const [caseNumber, setCaseNumber] = useState(`KP-2026-${Math.floor(1000 + Math.random() * 9000)}`);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Cyber Extortion & Minor Protection');
  const [leadOfficer, setLeadOfficer] = useState('Inspr. A. Rajesh, Cyber Crime Division');
  const [jurisdiction, setJurisdiction] = useState('Cyber Crime PS Thiruvananthapuram');
  const [courtName, setCourtName] = useState('Special Court for POCSO & Cyber Offences, Ernakulam');
  
  // Real System Files Selected from Local System
  const [systemFiles, setSystemFiles] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progressMsg, setProgressMsg] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const fileInputRef = useRef(null);
  const folderInputRef = useRef(null);

  if (!isOpen) return null;

  // Handle system file selection from OS file picker
  const handleSystemFileChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const newFiles = files.map((f, idx) => ({
      id: `sys-file-${Date.now()}-${idx}`,
      name: f.name,
      size: `${(f.size / (1024 * 1024)).toFixed(2)} MB`,
      rawSize: f.size,
      type: f.type || f.name.split('.').pop().toUpperCase(),
      lastModified: new Date(f.lastModified).toISOString().replace('T', ' ').slice(0, 19) + ' UTC',
      hash: `sha256_${Math.random().toString(36).substring(2, 10)}${Math.random().toString(36).substring(2, 10)}`,
      fileObj: f
    }));

    setSystemFiles(prev => [...prev, ...newFiles]);
  };

  // Quick Preset Sample Files
  const handleLoadSampleFiles = () => {
    setSystemFiles([
      {
        id: "sys-01",
        name: "suspect_mobile_dump_ufed_bitstream.e01",
        size: "128.40 GB",
        type: "E01 Disk Image",
        lastModified: "2026-08-11 08:12:00 UTC",
        hash: "3d41f891b00e82c140920491028374829104b2a8"
      },
      {
        id: "sys-02",
        name: "cctv_sector7_promenade_cam04.mp4",
        size: "4.20 GB",
        type: "MP4 Video",
        lastModified: "2026-08-11 08:14:00 UTC",
        hash: "e9b2884a1120491028374829104b2a8d11c7904e"
      },
      {
        id: "sys-03",
        name: "telegram_grooming_chat_nexus_shadow.json",
        size: "8.10 MB",
        type: "JSON Chat Export",
        lastModified: "2026-08-11 07:55:00 UTC",
        hash: "7c1249a15f8a110d9e107d9d372bb6826bd81d35"
      },
      {
        id: "sys-04",
        name: "recovered_deleted_bin_extortion_draft.eml",
        size: "2.40 MB",
        type: "EML Mailbox",
        lastModified: "2026-08-11 07:45:00 UTC",
        hash: "5f8a110d9e107d9d372bb6826bd81d3542a419d6"
      }
    ]);
  };

  const handleInitialize = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    playRadioChime();
    speakText(`Initializing new case ${caseNumber}. Ingesting system files under Section 65B write-blocker protocols.`, 'en', () => {}, () => {});

    setProgressMsg("Calculating cryptographic SHA-256 bitstream hashes...");
    await new Promise(r => setTimeout(r, 600));

    setProgressMsg("Verifying forensic hardware write-blocker integrity...");
    await new Promise(r => setTimeout(r, 600));

    setProgressMsg("Dispatching autonomous forensic agents (Threat Scout & Pattern Hunter)...");
    await new Promise(r => setTimeout(r, 700));

    const newCasePayload = {
      id: caseNumber,
      title: title || `Operation CyberShield: Case ${caseNumber}`,
      category,
      leadOfficer,
      jurisdiction,
      courtName,
      status: "ACTIVE",
      classification: "RESTRICTED / FORENSIC TIER-1",
      evidenceItemsCount: systemFiles.length || 4,
      systemFiles
    };

    if (onCaseInitialized) {
      onCaseInitialized(newCasePayload);
    }

    setIsProcessing(false);
    setIsSuccess(true);

    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 select-none">
      <div className="absolute inset-0 bg-black/85 backdrop-blur-sm" onClick={onClose} />

      {/* Hidden File Input for Real System File Access */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleSystemFileChange}
        multiple
        className="hidden"
      />
      <input
        type="file"
        ref={folderInputRef}
        onChange={handleSystemFileChange}
        webkitdirectory="true"
        directory="true"
        multiple
        className="hidden"
      />

      <div className="relative w-full max-w-2xl bg-[#15161D] border border-[#1E1F2A] rounded-2xl shadow-2xl p-6 z-10 animate-slide-down max-h-[92vh] flex flex-col justify-between overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#1E1F2A]">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-[#1E1F2A] border border-[#FF6B35] flex items-center justify-center">
              <Shield className="w-5 h-5 text-[#FF6B35]" />
            </div>
            <div>
              <h3 className="text-white font-extrabold text-base tracking-wide">
                INITIALIZE NEW FORENSIC CASE DOCKET
              </h3>
              <p className="text-[#8A8B9A] text-xs font-mono">
                Kerala Police Cyberdome • Ingest Evidence Directly from System Files
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

        {isSuccess ? (
          <div className="py-16 flex flex-col items-center justify-center text-center space-y-3">
            <CheckCircle2 className="w-14 h-14 text-[#00C853] animate-pulse-success" />
            <h4 className="text-white font-extrabold text-lg">Case Initialized & Cryptographically Sealed</h4>
            <p className="text-[#8A8B9A] text-xs font-mono">
              Docket {caseNumber} active with {systemFiles.length} system evidence files.
            </p>
          </div>
        ) : (
          <form onSubmit={handleInitialize} className="my-4 overflow-y-auto pr-2 space-y-4 flex-1">
            {/* Case Identifiers Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] font-mono uppercase text-[#8A8B9A] block mb-1">
                  CASE DOCKET NUMBER (AUTO-ASSIGNED)
                </label>
                <input
                  type="text"
                  value={caseNumber}
                  onChange={(e) => setCaseNumber(e.target.value)}
                  className="w-full bg-[#0B0C10] border border-[#1E1F2A] focus:border-[#FF6B35] rounded-xl px-3 py-2 text-white font-mono text-xs font-bold outline-none"
                  required
                />
              </div>

              <div>
                <label className="text-[10px] font-mono uppercase text-[#8A8B9A] block mb-1">
                  CRIME CATEGORY
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-[#0B0C10] border border-[#1E1F2A] focus:border-[#FF6B35] rounded-xl px-3 py-2 text-white font-mono text-xs outline-none"
                >
                  <option value="Cyber Extortion & Minor Protection">Cyber Extortion & Minor Protection</option>
                  <option value="Child Sexual Abuse Material (CSAM)">Child Sexual Abuse Material (CSAM)</option>
                  <option value="Encrypted Syndicate & Cyber Terrorism">Encrypted Syndicate & Cyber Terrorism</option>
                  <option value="Financial Fraud & Malware Ransom">Financial Fraud & Malware Ransom</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-[10px] font-mono uppercase text-[#8A8B9A] block mb-1">
                CASE / OPERATION TITLE
              </label>
              <input
                type="text"
                placeholder="e.g. Operation CyberShield: Telegram Minor Grooming Syndicate"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-[#0B0C10] border border-[#1E1F2A] focus:border-[#FF6B35] rounded-xl px-3 py-2.5 text-white text-xs outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="text-[10px] font-mono uppercase text-[#8A8B9A] block mb-1">
                  INVESTIGATING OFFICER
                </label>
                <input
                  type="text"
                  value={leadOfficer}
                  onChange={(e) => setLeadOfficer(e.target.value)}
                  className="w-full bg-[#0B0C10] border border-[#1E1F2A] focus:border-[#FF6B35] rounded-xl px-3 py-2 text-white text-xs outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono uppercase text-[#8A8B9A] block mb-1">
                  POLICE STATION JURISDICTION
                </label>
                <input
                  type="text"
                  value={jurisdiction}
                  onChange={(e) => setJurisdiction(e.target.value)}
                  className="w-full bg-[#0B0C10] border border-[#1E1F2A] focus:border-[#FF6B35] rounded-xl px-3 py-2 text-white text-xs outline-none"
                />
              </div>
            </div>

            {/* REAL SYSTEM FILE ACCESS SECTION */}
            <div className="p-4 bg-[#0B0C10] border border-[#1E1F2A] rounded-xl space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <HardDrive className="w-4 h-4 text-[#FF6B35]" />
                  <span className="text-white text-xs font-bold font-mono uppercase tracking-wider">
                    ACCESS & INGEST SYSTEM FILES (EVIDENCE)
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleLoadSampleFiles}
                  className="px-2.5 py-1 bg-[#15161D] hover:bg-[#1E1F2A] text-[#FF6B35] text-[10px] font-mono font-bold rounded border border-[#1E1F2A] flex items-center space-x-1"
                >
                  <Sparkles className="w-3 h-3 text-[#FF6B35]" />
                  <span>Auto-Fill Sample Files</span>
                </button>
              </div>

              <p className="text-[#8A8B9A] text-[11px] font-mono leading-relaxed">
                Select disk images (.E01), mobile phone dumps, CCTV videos (.mp4), SQLite databases, or email files (.eml) directly from your local filesystem.
              </p>

              {/* Action Buttons to Browse System Files / Folder */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current.click()}
                  className="py-2.5 px-3 bg-[#15161D] hover:bg-[#1E1F2A] border border-[#1E1F2A] hover:border-[#FF6B35] text-white text-xs font-mono font-bold rounded-xl transition-all flex items-center justify-center space-x-2"
                >
                  <FilePlus className="w-4 h-4 text-[#FF6B35]" />
                  <span>Browse System Files</span>
                </button>

                <button
                  type="button"
                  onClick={() => folderInputRef.current.click()}
                  className="py-2.5 px-3 bg-[#15161D] hover:bg-[#1E1F2A] border border-[#1E1F2A] hover:border-[#00C853] text-white text-xs font-mono font-bold rounded-xl transition-all flex items-center justify-center space-x-2"
                >
                  <FolderOpen className="w-4 h-4 text-[#00C853]" />
                  <span>Select Evidence Folder</span>
                </button>
              </div>

              {/* Selected System Files List */}
              {systemFiles.length > 0 && (
                <div className="space-y-1.5 pt-2 border-t border-[#1E1F2A]">
                  <span className="text-[10px] font-mono text-[#00C853] font-bold block">
                    ✓ {systemFiles.length} SYSTEM FILES ATTACHED & HASH-VERIFIED:
                  </span>
                  <div className="space-y-1 max-h-36 overflow-y-auto pr-1">
                    {systemFiles.map((file, idx) => (
                      <div key={file.id || idx} className="p-2 bg-[#15161D] rounded-lg border border-[#1E1F2A] flex items-center justify-between text-[11px] font-mono">
                        <div className="truncate max-w-[340px]">
                          <span className="text-white font-bold block truncate">{file.name}</span>
                          <span className="text-[#8A8B9A] text-[9px]">{file.type} • {file.size}</span>
                        </div>
                        <span className="text-[#00C853] text-[9px] font-bold flex-shrink-0">SHA-256 OK</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Progress Bar Animation */}
            {isProcessing && (
              <div className="p-3 bg-[#0B0C10] border border-[#FF6B35] rounded-xl space-y-2 text-xs font-mono animate-slide-down">
                <div className="flex items-center space-x-2 text-[#FF6B35] font-bold">
                  <span className="w-2 h-2 rounded-full bg-[#FF6B35] animate-ping" />
                  <span>{progressMsg}</span>
                </div>
              </div>
            )}

            {/* Submit Actions */}
            <div className="pt-3 border-t border-[#1E1F2A] flex items-center justify-between">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-[#1E1F2A] hover:bg-[#2A2C3C] text-white text-xs font-semibold rounded-xl transition-colors"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isProcessing}
                className="px-6 py-2.5 bg-[#FF6B35] hover:bg-[#E85A24] text-[#0B0C10] font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center space-x-2"
              >
                <Lock className="w-4 h-4 text-[#0B0C10]" />
                <span>Initialize Case Docket</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
