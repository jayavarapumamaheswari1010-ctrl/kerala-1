import React from 'react';
import { 
  X, 
  FileText, 
  Printer, 
  Download, 
  ShieldCheck, 
  Scale, 
  CheckCircle2,
  MapPin,
  Camera,
  Calendar,
  UserCheck
} from 'lucide-react';
import { MOCK_CASE } from '../data/forensicData';

export default function AutoFirReportModal({ isOpen, onClose, detections, suspectPreview, victimPreview, videoFilename }) {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 select-none">
      <div className="absolute inset-0 bg-black/85 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-4xl bg-[#15161D] border border-[#1E1F2A] rounded-2xl shadow-2xl p-6 z-10 animate-slide-down max-h-[92vh] flex flex-col justify-between overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#1E1F2A]">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-[#1E1F2A] border border-[#FF6B35] flex items-center justify-center">
              <Scale className="w-5 h-5 text-[#FF6B35]" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-[#FF6B35] font-bold uppercase tracking-wider block">
                STATUTORY EVIDENCE REPORT • KERALA POLICE CYBERDOME
              </span>
              <h3 className="text-white font-extrabold text-base tracking-wide">
                AUTOMATED CCTV SURVEILLANCE & BIOMETRIC FIR DOSSIER
              </h3>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="p-2 bg-[#1E1F2A] hover:bg-[#2A2C3C] text-[#8A8B9A] hover:text-white rounded-lg border border-[#1E1F2A] transition-colors"
              title="Print Report"
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

        {/* Scrollable Report Content */}
        <div className="my-4 overflow-y-auto pr-2 space-y-4 flex-1 text-xs font-mono">
          {/* Metadata Card */}
          <div className="p-4 bg-[#0B0C10] border border-[#1E1F2A] rounded-xl grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <span className="text-[10px] text-[#8A8B9A] uppercase block">CASE DOCKET NUMBER</span>
              <span className="text-white font-bold text-sm">KP-2026-0812 / FIR-142</span>
            </div>
            <div>
              <span className="text-[10px] text-[#8A8B9A] uppercase block">DATE & TIME OF REPORT</span>
              <span className="text-white font-bold">2026-08-11 08:30 IST</span>
            </div>
            <div>
              <span className="text-[10px] text-[#8A8B9A] uppercase block">INVESTIGATING OFFICER</span>
              <span className="text-[#00C853] font-bold">Inspr. A. Rajesh (Cyberdome)</span>
            </div>
          </div>

          {/* Target Reference Thumbnails */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3 bg-[#0B0C10] border border-[#00C853]/40 rounded-xl flex items-center space-x-3">
              <img
                src={victimPreview || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80"}
                alt="Victim Reference"
                className="w-12 h-12 rounded-lg object-cover border border-[#00C853]"
              />
              <div>
                <span className="text-[#00C853] font-bold text-xs block">TARGET VICTIM PROFILE</span>
                <span className="text-[#8A8B9A] text-[10px]">Protected Minor (Sec 33(7) POCSO)</span>
              </div>
            </div>

            <div className="p-3 bg-[#0B0C10] border border-[#FF1744]/40 rounded-xl flex items-center space-x-3">
              <img
                src={suspectPreview || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80"}
                alt="Suspect Reference"
                className="w-12 h-12 rounded-lg object-cover border border-[#FF1744]"
              />
              <div>
                <span className="text-[#FF1744] font-bold text-xs block">TARGET SUSPECT PROFILE</span>
                <span className="text-[#8A8B9A] text-[10px]">Suspect Alpha (@nexus_shadow)</span>
              </div>
            </div>
          </div>

          {/* Summary Table: Time | Camera | Event | Confidence */}
          <div className="p-4 bg-[#0B0C10] border border-[#1E1F2A] rounded-xl space-y-2">
            <span className="text-white text-xs font-bold uppercase tracking-wider block">
              CHRONOLOGICAL DETECTION SUMMARY TABLE
            </span>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-[#1E1F2A] text-[#8A8B9A] text-[10px]">
                    <th className="py-2 px-2">TIME</th>
                    <th className="py-2 px-2">CAMERA NODE</th>
                    <th className="py-2 px-2">EVENT CLASSIFICATION</th>
                    <th className="py-2 px-2">CONFIDENCE</th>
                    <th className="py-2 px-2">STATUS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1E1F2A] text-white">
                  <tr>
                    <td className="py-2 px-2 font-bold text-[#FF6B35]">00:12:34</td>
                    <td className="py-2 px-2">CAM-01 (Sector 7 Promenade)</td>
                    <td className="py-2 px-2 text-[#FF6B35]">LOITERING PATTERN</td>
                    <td className="py-2 px-2">94%</td>
                    <td className="py-2 px-2 text-[#00C853]">VERIFIED</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-2 font-bold text-[#FF1744]">00:15:22</td>
                    <td className="py-2 px-2">CAM-03 (East Walkway)</td>
                    <td className="py-2 px-2 text-[#FF1744]">FOLLOWING PATTERN</td>
                    <td className="py-2 px-2">89%</td>
                    <td className="py-2 px-2 text-[#00C853]">VERIFIED</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-2 font-bold text-[#00C853]">00:34:12</td>
                    <td className="py-2 px-2">CAM-01 (Promenade)</td>
                    <td className="py-2 px-2 text-[#00C853]">VICTIM SIGHTING</td>
                    <td className="py-2 px-2">94%</td>
                    <td className="py-2 px-2 text-[#00C853]">VERIFIED</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-2 font-bold text-[#FF1744]">01:15:45</td>
                    <td className="py-2 px-2">CAM-03 (Marine Drive)</td>
                    <td className="py-2 px-2 text-[#FF1744]">SUSPECT ALPHA MATCH</td>
                    <td className="py-2 px-2">89%</td>
                    <td className="py-2 px-2 text-[#FF1744]">HIGH RISK</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-2 font-bold text-[#FF1744]">01:45:00</td>
                    <td className="py-2 px-2">CAM-07 (Tower Base)</td>
                    <td className="py-2 px-2 text-[#FF1744]">GEOFENCE PROXIMITY ALERT</td>
                    <td className="py-2 px-2">96%</td>
                    <td className="py-2 px-2 text-[#FF1744]">CRITICAL</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Surveillance Path Schematic Map */}
          <div className="p-4 bg-[#0B0C10] border border-[#1E1F2A] rounded-xl space-y-2">
            <span className="text-white text-xs font-bold uppercase tracking-wider block">
              CROSS-CAMERA TRAJECTORY MAP (CAM-01 ➔ CAM-03 ➔ CAM-07)
            </span>
            <div className="h-28 bg-[#15161D] rounded-lg border border-[#1E1F2A] relative flex items-center justify-between px-8">
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <polyline
                  points="80,56 350,56 680,56"
                  fill="none"
                  stroke="#FF6B35"
                  strokeWidth="2"
                  strokeDasharray="4,4"
                />
              </svg>
              <div className="z-10 text-center">
                <div className="w-8 h-8 rounded-full bg-[#FF6B35] text-[#0B0C10] font-bold flex items-center justify-center mx-auto text-xs">C1</div>
                <span className="text-[10px] text-white mt-1 block">Promenade (00:12)</span>
              </div>
              <div className="z-10 text-center">
                <div className="w-8 h-8 rounded-full bg-[#FF6B35] text-[#0B0C10] font-bold flex items-center justify-center mx-auto text-xs">C3</div>
                <span className="text-[10px] text-white mt-1 block">East Walkway (00:15)</span>
              </div>
              <div className="z-10 text-center">
                <div className="w-8 h-8 rounded-full bg-[#FF1744] text-white font-bold flex items-center justify-center mx-auto text-xs animate-pulse">C7</div>
                <span className="text-[10px] text-[#FF1744] font-bold mt-1 block">Geofence (01:45)</span>
              </div>
            </div>
          </div>

          {/* Official Endorsement */}
          <div className="p-4 bg-[#0B0C10] border-t border-[#1E1F2A] flex items-center justify-between text-[11px]">
            <div>
              <span className="text-[#8A8B9A] block">CERTIFIED ACCREDITED EVIDENCE (SEC 65B INDIAN EVIDENCE ACT)</span>
              <span className="text-[#00C853] font-bold">SHA-256: 7f8a9104c8104192b8d00129a4e8812c7104b</span>
            </div>
            <div className="px-3 py-1 bg-[#15161D] border border-[#00C853] text-[#00C853] rounded-lg font-bold">
              MAGISTRATE COURT READY
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-3 border-t border-[#1E1F2A] flex items-center justify-between">
          <span className="text-xs text-[#8A8B9A] font-mono">
            Generated by KRYPT CCTV Surveillance Intelligence Platform
          </span>

          <div className="flex items-center space-x-2">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-[#1E1F2A] hover:bg-[#2A2C3C] text-white text-xs font-semibold rounded-xl transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => {
                alert("Official Court CCTV FIR Report (PDF) downloaded with Section 65B Certificate seal.");
                onClose();
              }}
              className="px-5 py-2 bg-[#FF6B35] hover:bg-[#E85A24] text-[#0B0C10] font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center space-x-2"
            >
              <Download className="w-4 h-4 text-[#0B0C10]" />
              <span>DOWNLOAD PDF REPORT</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
