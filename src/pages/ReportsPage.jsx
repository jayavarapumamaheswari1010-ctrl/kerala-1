import React, { useState } from 'react';
import { 
  Clock, 
  FileText, 
  Download, 
  ShieldCheck, 
  CheckCircle2, 
  Calendar, 
  UserCheck,
  Radio,
  Scale,
  Award,
  ExternalLink,
  Eye,
  FileCheck,
  Printer,
  AlertTriangle
} from 'lucide-react';
import { MOCK_CASE, MANDATORY_CASE_FILES } from '../data/forensicData';

export default function ReportsPage({ onOpenExport, onOpenDebrief, onOpenCaseFile }) {
  const [activeTab, setActiveTab] = useState('mandatory'); // 'mandatory' | 'timeline' | 'all'

  const timelineEvents = [
    {
      time: "2026-08-11 02:45:11 UTC",
      title: "Autonomous Agent Synchronized Investigation State",
      detail: "Threat Scout updated grooming pattern confidence to 85% based on linguistic model.",
      agent: "Threat Scout"
    },
    {
      time: "2026-08-11 02:41:09 UTC",
      title: "Cross-Case Correlation Detected with Kochi Case #KP-2024-0192",
      detail: "Suspect Telegram @nexus_shadow correlated with previous conviction cluster.",
      agent: "Pattern Hunter"
    },
    {
      time: "2026-08-11 01:15:00 UTC",
      title: "Section 65B Indian Evidence Act Certificate Generated",
      detail: "Cryptographic SHA-256 seal 3d41...2cb84 certified by Senior Examiner M. Nair.",
      agent: "Legal Section Analyzer"
    },
    {
      time: "2026-08-10 18:13:01 UTC",
      title: "EXIF Metadata Extraction Completed for Device Dump",
      detail: "GPS coordinates extracted and triangulated to Sector 7 tower cluster.",
      agent: "EXIF Extractor"
    },
    {
      time: "2026-08-10 16:45:00 UTC",
      title: "Seizure Mahazar Executed & Signed by 2 Witnesses",
      detail: "Physical Samsung S21 Ultra sealed in RF Faraday Bag at Marine Drive, Kochi.",
      agent: "Evidence Custodian"
    },
    {
      time: "2026-08-10 16:00:00 UTC",
      title: "First Information Report (FIR No. 142/2026) Registered",
      detail: "Registered under BNS 351(2), POCSO Sec 11/12, and IT Act Sec 67B.",
      agent: "Station House Officer"
    }
  ];

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-[1600px] mx-auto select-none page-enter pb-20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#1E1F2A]">
        <div>
          <div className="flex items-center space-x-2">
            <Scale className="w-6 h-6 text-[#FF6B35]" />
            <h1 className="text-white font-extrabold text-2xl tracking-tight">
              MANDATORY COURT CASE FILES & PROSECUTION DOSSIER
            </h1>
          </div>
          <p className="text-[#8A8B9A] text-xs font-mono mt-0.5">
            Special POCSO & Cyber Court Filing Dossier • {MOCK_CASE.firNumber}
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => onOpenExport({ name: "Complete_Court_Filing_Master_Bundle.zip" })}
            className="px-4 py-2 bg-[#FF6B35] hover:bg-[#E85A24] text-[#0B0C10] font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center space-x-2"
          >
            <Download className="w-4 h-4 text-[#0B0C10]" />
            <span>Download All 6 Court Files (ZIP)</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center space-x-2">
        <button
          onClick={() => setActiveTab('mandatory')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold border flex items-center space-x-2 transition-all ${
            activeTab === 'mandatory'
              ? 'bg-[#1E1F2A] border-[#FF6B35] text-white card-selected-glow'
              : 'bg-[#15161D] border-[#1E1F2A] text-[#8A8B9A] hover:text-white'
          }`}
        >
          <FileCheck className={`w-4 h-4 ${activeTab === 'mandatory' ? 'text-[#FF6B35]' : 'text-[#8A8B9A]'}`} />
          <span>Statutory Court Documents (Mandatory to File Case)</span>
          <span className="px-1.5 py-0.5 bg-[#FF6B35]/20 text-[#FF6B35] text-[10px] font-mono font-bold rounded">
            6 Ready
          </span>
        </button>

        <button
          onClick={() => setActiveTab('timeline')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold border flex items-center space-x-2 transition-all ${
            activeTab === 'timeline'
              ? 'bg-[#1E1F2A] border-[#FF6B35] text-white card-selected-glow'
              : 'bg-[#15161D] border-[#1E1F2A] text-[#8A8B9A] hover:text-white'
          }`}
        >
          <Clock className={`w-4 h-4 ${activeTab === 'timeline' ? 'text-[#FF6B35]' : 'text-[#8A8B9A]'}`} />
          <span>Full Investigation Chronology</span>
        </button>
      </div>

      {/* TAB 1: MANDATORY CASE FILES */}
      {activeTab === 'mandatory' && (
        <div className="space-y-4">
          <div className="p-4 bg-[#15161D] border-l-[3px] border-[#00C853] border-y border-r border-[#1E1F2A] rounded-xl flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <ShieldCheck className="w-5 h-5 text-[#00C853] flex-shrink-0" />
              <div>
                <h4 className="text-white text-xs font-bold font-mono">
                  ALL 6 MANDATORY STATUTORY DOCUMENTS PREPARED FOR COURT SUBMISSION
                </h4>
                <p className="text-[#8A8B9A] text-xs mt-0.5">
                  Includes registered FIR, certified Section 65B Indian Evidence Act Certificate, Seizure Mahazar with witnesses, Section 91 Intermediary Notice, and Draft Chargesheet.
                </p>
              </div>
            </div>
            <span className="px-3 py-1 bg-[#0B0C10] border border-[#00C853] text-[#00C853] text-xs font-mono font-bold rounded-lg hidden sm:inline-block">
              100% READY FOR SPECIAL JUDGE
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {MANDATORY_CASE_FILES.map((doc) => (
              <div
                key={doc.id}
                className="bg-[#15161D] border border-[#1E1F2A] hover:border-[#FF6B35] rounded-xl p-4 flex flex-col justify-between transition-all space-y-3 group"
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between">
                    <span className="text-[10px] font-mono text-[#FF6B35] font-bold px-2 py-0.5 bg-[#0B0C10] border border-[#FF6B35]/30 rounded">
                      {doc.code}
                    </span>
                    <span className={`px-2 py-0.5 text-[9px] font-mono font-bold rounded ${
                      doc.statusType === 'success'
                        ? 'bg-[#15161D] border border-[#00C853] text-[#00C853]'
                        : 'bg-[#15161D] border border-[#FF6B35] text-[#FF6B35]'
                    }`}>
                      {doc.status}
                    </span>
                  </div>

                  <h3 className="text-white font-bold text-sm group-hover:text-[#FF6B35] transition-colors line-clamp-2">
                    {doc.title}
                  </h3>

                  <p className="text-[#8A8B9A] text-xs leading-relaxed line-clamp-2">
                    {doc.requiredFor}
                  </p>

                  <div className="p-2.5 bg-[#0B0C10] border border-[#1E1F2A] rounded-lg text-[11px] font-mono space-y-1 text-[#8A8B9A]">
                    <div className="flex justify-between">
                      <span>SEAL:</span>
                      <span className="text-white">{doc.sealId}</span>
                    </div>
                    <div className="flex justify-between truncate">
                      <span>OFFICER:</span>
                      <span className="text-white truncate max-w-[150px]">{doc.officer.split(',')[0]}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#1E1F2A] flex items-center justify-between gap-2">
                  <button
                    onClick={() => onOpenCaseFile(doc)}
                    className="w-full py-2 bg-[#1E1F2A] hover:bg-[#FF6B35] text-white hover:text-[#0B0C10] font-bold text-xs rounded-lg transition-colors flex items-center justify-center space-x-1.5"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View & Verify Document</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: INVESTIGATION TIMELINE */}
      {activeTab === 'timeline' && (
        <div className="bg-[#15161D] border border-[#1E1F2A] rounded-xl p-5">
          <div className="flex items-center justify-between pb-3 border-b border-[#1E1F2A] mb-4">
            <span className="text-white text-xs font-bold uppercase tracking-wider font-mono">
              Investigation Chronology & Chain of Custody
            </span>
            <span className="text-[10px] font-mono text-[#00C853]">AUDIT VERIFIED</span>
          </div>

          <div className="relative pl-6 space-y-6 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-[#1E1F2A]">
            {timelineEvents.map((ev, i) => (
              <div key={i} className="relative flex items-start space-x-3">
                <div className="absolute -left-[23px] top-0.5 w-5 h-5 rounded-full bg-[#15161D] border-2 border-[#FF6B35] flex items-center justify-center">
                  <span className="w-2 h-2 rounded-full bg-[#FF6B35]" />
                </div>
                <div className="p-3.5 bg-[#0B0C10] border border-[#1E1F2A] rounded-xl w-full">
                  <div className="flex items-center justify-between">
                    <span className="text-white text-xs font-bold">{ev.title}</span>
                    <span className="text-[10px] font-mono text-[#FF6B35]">{ev.agent}</span>
                  </div>
                  <p className="text-[#8A8B9A] text-xs mt-1 leading-relaxed">{ev.detail}</p>
                  <span className="text-[10px] font-mono text-[#8A8B9A] block mt-2">{ev.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
