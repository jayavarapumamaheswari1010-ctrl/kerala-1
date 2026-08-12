import React, { useState } from 'react';
import { X, FileText, Download, Check, ShieldCheck, Printer } from 'lucide-react';
import { MOCK_CASE } from '../data/forensicData';

export default function ExportReportModal({ isOpen, onClose, selectedEvidence }) {
  const [format, setFormat] = useState('PDF');
  const [includeExif, setIncludeExif] = useState(true);
  const [includeCustody, setIncludeCustody] = useState(true);
  const [includeGps, setIncludeGps] = useState(true);
  const [isExporting, setIsExporting] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  if (!isOpen) return null;

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      setDownloaded(true);
      setTimeout(() => {
        setDownloaded(false);
        onClose();
      }, 1500);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 select-none">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-lg bg-[#15161D] border border-[#1E1F2A] rounded-2xl shadow-2xl p-6 z-10 animate-slide-down">
        <div className="flex items-center justify-between pb-4 border-b border-[#1E1F2A]">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#1E1F2A] border border-[#1E1F2A] flex items-center justify-center">
              <FileText className="w-4 h-4 text-[#FF6B35]" />
            </div>
            <div>
              <h3 className="text-white font-bold text-base">Generate Forensic Export Dossier</h3>
              <p className="text-[#8A8B9A] text-xs">Section 65B Indian Evidence Act Admissible Format</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-[#1E1F2A] text-[#8A8B9A] hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="mt-5 space-y-4">
          <div className="p-3 bg-[#0B0C10] border border-[#1E1F2A] rounded-xl flex items-center justify-between">
            <div className="space-y-0.5">
              <p className="text-white font-mono text-xs font-bold">DOCKET: {MOCK_CASE.id}</p>
              <p className="text-[#8A8B9A] text-[11px]">Artifact: {selectedEvidence?.name || "IMG_20231024_153022.png"}</p>
            </div>
            <div className="flex items-center space-x-1 px-2.5 py-1 bg-[#15161D] border border-[#00C853] rounded-md text-[#00C853] text-[11px] font-mono">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>SEALED</span>
            </div>
          </div>

          <div>
            <label className="text-[11px] font-mono uppercase text-[#8A8B9A] block mb-2">
              Export Dossier Format
            </label>
            <div className="grid grid-cols-3 gap-2">
              {['PDF (Admissible)', 'JSON (Raw Data)', 'XML / NIST Format'].map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFormat(f)}
                  className={`py-2 px-2 text-xs font-semibold rounded-lg transition-all text-center ${
                    format === f
                      ? 'bg-[#FF6B35] text-[#0B0C10] font-bold'
                      : 'bg-[#0B0C10] border border-[#1E1F2A] text-white hover:border-[#FF6B35]'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[11px] font-mono uppercase text-[#8A8B9A] block mb-1">
              Included Evidentiary Modules
            </label>
            <div className="space-y-2 text-xs">
              <label className="flex items-center space-x-2 text-white cursor-pointer bg-[#0B0C10] p-2.5 rounded-lg border border-[#1E1F2A]">
                <input
                  type="checkbox"
                  checked={includeExif}
                  onChange={(e) => setIncludeExif(e.target.checked)}
                  className="accent-[#FF6B35]"
                />
                <span>EXIF & Cryptographic SHA-256 Hash Verification</span>
              </label>
              <label className="flex items-center space-x-2 text-white cursor-pointer bg-[#0B0C10] p-2.5 rounded-lg border border-[#1E1F2A]">
                <input
                  type="checkbox"
                  checked={includeCustody}
                  onChange={(e) => setIncludeCustody(e.target.checked)}
                  className="accent-[#FF6B35]"
                />
                <span>Complete Chain-of-Custody Sign-Off Log</span>
              </label>
              <label className="flex items-center space-x-2 text-white cursor-pointer bg-[#0B0C10] p-2.5 rounded-lg border border-[#1E1F2A]">
                <input
                  type="checkbox"
                  checked={includeGps}
                  onChange={(e) => setIncludeGps(e.target.checked)}
                  className="accent-[#FF6B35]"
                />
                <span>Geospatial Triangulation & Tower Cell IDs</span>
              </label>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-[#8A8B9A] hover:text-white bg-[#1E1F2A] transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleExport}
              disabled={isExporting}
              className="px-5 py-2 rounded-xl text-xs font-bold text-[#0B0C10] bg-[#FF6B35] hover:bg-[#E85A24] transition-all shadow-md flex items-center space-x-2"
            >
              {downloaded ? (
                <>
                  <Check className="w-4 h-4 text-[#0B0C10]" />
                  <span>Dossier Downloaded</span>
                </>
              ) : isExporting ? (
                <>
                  <Download className="w-4 h-4 animate-bounce text-[#0B0C10]" />
                  <span>Compiling PDF Dossier...</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 text-[#0B0C10]" />
                  <span>Download Signed Report</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
