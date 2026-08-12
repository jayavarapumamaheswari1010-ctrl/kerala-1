import React from 'react';
import { 
  X, 
  FileText, 
  Printer, 
  Download, 
  ShieldCheck, 
  CheckCircle2, 
  Scale,
  Award,
  Calendar,
  UserCheck
} from 'lucide-react';
import { MOCK_CASE } from '../data/forensicData';

export default function CaseFileViewerModal({ isOpen, onClose, document }) {
  if (!isOpen || !document) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 select-none">
      <div className="absolute inset-0 bg-black/85 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-3xl bg-[#15161D] border border-[#1E1F2A] rounded-2xl shadow-2xl p-6 z-10 animate-slide-down max-h-[92vh] flex flex-col justify-between overflow-hidden">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#1E1F2A]">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-[#1E1F2A] border border-[#FF6B35] flex items-center justify-center">
              <Scale className="w-5 h-5 text-[#FF6B35]" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-[#FF6B35] font-bold uppercase tracking-wider block">
                {document.code}
              </span>
              <h3 className="text-white font-extrabold text-base tracking-wide">
                {document.title}
              </h3>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="p-2 bg-[#1E1F2A] hover:bg-[#2A2C3C] text-[#8A8B9A] hover:text-white rounded-lg border border-[#1E1F2A] transition-colors"
              title="Print Document"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 bg-[#1E1F2A] text-[#8A8B9A] hover:text-white rounded-lg border border-[#1E1F2A] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Court Document Viewport */}
        <div className="my-4 overflow-y-auto pr-2 space-y-4 flex-1">
          {/* Metadata Card */}
          <div className="p-3.5 bg-[#0B0C10] border border-[#1E1F2A] rounded-xl grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs font-mono">
            <div>
              <span className="text-[10px] text-[#8A8B9A] uppercase block">DOCKET REF / FIR</span>
              <span className="text-white font-bold">{MOCK_CASE.firNumber}</span>
            </div>
            <div>
              <span className="text-[10px] text-[#8A8B9A] uppercase block">SEAL / CERTIFICATE ID</span>
              <span className="text-[#FF6B35] font-bold">{document.sealId}</span>
            </div>
            <div>
              <span className="text-[10px] text-[#8A8B9A] uppercase block">ISSUING AUTHORITY</span>
              <span className="text-white font-bold truncate block">{document.authority}</span>
            </div>
          </div>

          {/* Applicable Sections Pill Bar */}
          {document.sectionsFramed && (
            <div className="p-3 bg-[#0B0C10] border border-[#1E1F2A] rounded-xl space-y-1.5">
              <span className="text-[10px] font-mono text-[#8A8B9A] uppercase block">
                Statutory Sections Formally Invoked:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {document.sectionsFramed.map((s, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-0.5 bg-[#15161D] border border-[#FF6B35] text-[#FF6B35] text-[11px] font-mono font-semibold rounded"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Authentic Formatted Legal Paper */}
          <div className="p-6 bg-[#0B0C10] border border-[#1E1F2A] rounded-xl relative overflow-hidden text-xs text-white font-mono whitespace-pre-wrap leading-relaxed shadow-inner">
            {/* Watermark */}
            <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none select-none">
              <div className="text-6xl font-extrabold text-white rotate-[-30deg] tracking-widest text-center">
                KERALA POLICE CYBERDOME
              </div>
            </div>

            <div className="relative z-10">
              {document.content}
            </div>

            {/* Official Endorsement Stamp */}
            <div className="mt-8 pt-4 border-t border-[#1E1F2A] flex items-center justify-between text-[11px] font-mono">
              <div>
                <span className="text-[#8A8B9A] block">DIGITALLY SIGNED & CRYPTOGRAPHICALLY ATTESTED</span>
                <span className="text-[#00C853] font-bold">{document.officer}</span>
              </div>
              <div className="px-3 py-1.5 bg-[#15161D] border border-[#00C853] rounded-lg text-[#00C853] flex items-center space-x-1.5">
                <ShieldCheck className="w-4 h-4" />
                <span>MAGISTRATE SEAL READY</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="pt-3 border-t border-[#1E1F2A] flex items-center justify-between">
          <span className="text-xs text-[#8A8B9A] font-mono">
            Compliant with Section 65B Indian Evidence Act & Section 173 BNSS 2023
          </span>

          <div className="flex items-center space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-[#1E1F2A] hover:bg-[#2A2C3C] text-white text-xs font-semibold rounded-xl transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => {
                alert(`Official Court Copy [${document.title}] downloaded with Section 65B tamper seal.`);
                onClose();
              }}
              className="px-5 py-2 bg-[#FF6B35] hover:bg-[#E85A24] text-[#0B0C10] font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center space-x-2"
            >
              <Download className="w-4 h-4 text-[#0B0C10]" />
              <span>Download Official Court PDF</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
