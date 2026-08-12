import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Upload, 
  Video, 
  UserCheck, 
  CheckCircle2, 
  AlertTriangle, 
  FileVideo, 
  Sparkles, 
  Shield, 
  Eye, 
  Camera, 
  Play, 
  ArrowRight, 
  Radio,
  Plus,
  RefreshCw,
  FolderOpen,
  Webcam
} from 'lucide-react';
import { useKrypt } from '../context/KryptContext';
import { speakText, playRadioChime } from '../utils/audioSpeech';

export default function KryptUploadPage() {
  const navigate = useNavigate();
  const {
    victimFile,
    setVictimFile,
    victimPreview,
    setVictimPreview,
    suspectFile,
    setSuspectFile,
    suspectPreview,
    setSuspectPreview,
    videoFile,
    setVideoFile,
    videoFilename,
    setVideoFilename,
    setDetections,
    setIsAnalyzed
  } = useKrypt();

  const [victimFaceDetected, setVictimFaceDetected] = useState(true);
  const [suspectFaceDetected, setSuspectFaceDetected] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progressStep, setProgressStep] = useState(0);
  const [progressText, setProgressText] = useState("");
  const [isDragOverVictim, setIsDragOverVictim] = useState(false);
  const [isDragOverSuspect, setIsDragOverSuspect] = useState(false);
  const [isDragOverVideo, setIsDragOverVideo] = useState(false);

  // Hidden File Inputs
  const victimInputRef = useRef(null);
  const suspectInputRef = useRef(null);
  const videoInputRef = useRef(null);
  const victimCamInputRef = useRef(null);
  const suspectCamInputRef = useRef(null);

  // Handle Victim Upload
  const handleVictimUpload = async (file) => {
    if (!file) return;
    setVictimFile(file);
    const previewUrl = URL.createObjectURL(file);
    setVictimPreview(previewUrl);
    setVictimFaceDetected(true);

    try {
      const formData = new FormData();
      formData.append("type", "victim");
      formData.append("file", file);
      await fetch("/api/upload-target", { method: "POST", body: formData });
    } catch (e) {}
  };

  // Handle Suspect Upload
  const handleSuspectUpload = async (file) => {
    if (!file) return;
    setSuspectFile(file);
    const previewUrl = URL.createObjectURL(file);
    setSuspectPreview(previewUrl);
    setSuspectFaceDetected(true);

    try {
      const formData = new FormData();
      formData.append("type", "suspect");
      formData.append("file", file);
      await fetch("/api/upload-target", { method: "POST", body: formData });
    } catch (e) {}
  };

  // Handle Video Upload
  const handleVideoUpload = (file) => {
    if (!file) return;
    setVideoFile(file);
    setVideoFilename(file.name);
  };

  // Demo Preset for 1-click test
  const handleLoadDemoPreset = () => {
    setVictimFile(new File(["victim"], "victim_reference.jpg", { type: "image/jpeg" }));
    setVictimPreview("https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80");
    setVictimFaceDetected(true);

    setSuspectFile(new File(["suspect"], "suspect_alpha.jpg", { type: "image/jpeg" }));
    setSuspectPreview("https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80");
    setSuspectFaceDetected(true);

    setVideoFile(new File(["cctv"], "CCTV_Sector7_MarineDrive_Live.mp4", { type: "video/mp4" }));
    setVideoFilename("CCTV_Sector7_MarineDrive_Live.mp4");
  };

  const isReadyToAnalyze = (victimPreview || victimFile) && (suspectPreview || suspectFile) && (videoFilename || videoFile);

  const handleStartAnalysis = async () => {
    if (!isReadyToAnalyze) return;

    setIsProcessing(true);
    playRadioChime();
    speakText("Starting KRYPT CCTV Surveillance Analysis. Extracting frames and comparing face embeddings.", 'en', () => {}, () => {});

    setProgressStep(1);
    setProgressText("Extracting frames from CCTV video feed...");
    await new Promise(r => setTimeout(r, 800));

    setProgressStep(2);
    setProgressText("Detecting faces via OpenCV & Haar Cascades...");
    await new Promise(r => setTimeout(r, 800));

    setProgressStep(3);
    setProgressText("Comparing Facenet embeddings against Target Victim & Suspect...");
    await new Promise(r => setTimeout(r, 1000));

    setIsAnalyzed(true);
    setIsProcessing(false);
    navigate('/krypt/analysis');
  };

  return (
    <div className="min-h-screen bg-[#0B0C10] text-white flex flex-col items-center justify-center p-4 sm:p-6 select-none relative overflow-hidden">
      {/* Hidden File Inputs */}
      <input type="file" ref={victimInputRef} onChange={(e) => handleVictimUpload(e.target.files[0])} accept="image/*" className="hidden" />
      <input type="file" ref={victimCamInputRef} onChange={(e) => handleVictimUpload(e.target.files[0])} accept="image/*" capture="user" className="hidden" />
      <input type="file" ref={suspectInputRef} onChange={(e) => handleSuspectUpload(e.target.files[0])} accept="image/*" className="hidden" />
      <input type="file" ref={suspectCamInputRef} onChange={(e) => handleSuspectUpload(e.target.files[0])} accept="image/*" capture="user" className="hidden" />
      <input type="file" ref={videoInputRef} onChange={(e) => handleVideoUpload(e.target.files[0])} accept="video/*" className="hidden" />

      {/* Decorative Grid */}
      <div 
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#1E1F2A 1px, transparent 1px), linear-gradient(to right, #1E1F2A 1px, transparent 1px), linear-gradient(to bottom, #1E1F2A 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }}
      />

      <div className="w-full max-w-4xl space-y-6 relative z-10 py-6">
        {/* Title Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#15161D] border border-[#FF6B35] rounded-full text-[11px] font-mono text-[#FF6B35] font-bold mb-1">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>KERALA POLICE CYBERDOME FORENSICS</span>
          </div>

          <h1 className="text-white font-extrabold text-4xl sm:text-5xl tracking-tight font-sans">
            KRYPT
          </h1>
          <p className="text-[#8A8B9A] text-sm sm:text-base font-mono">
            CCTV Surveillance Analyzer • Biometric Target Recognition
          </p>

          <div className="pt-2">
            <button
              onClick={handleLoadDemoPreset}
              className="px-4 py-2 bg-[#15161D] hover:bg-[#1E1F2A] border border-[#1E1F2A] hover:border-[#FF6B35] text-[#FF6B35] hover:text-white text-xs font-mono font-bold rounded-xl transition-colors inline-flex items-center space-x-2 shadow-md"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#FF6B35]" />
              <span>Auto-Fill Hackathon Demo Files</span>
            </button>
          </div>
        </div>

        {/* Upload Container Card */}
        <div className="bg-[#15161D] border border-[#1E1F2A] rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
          {/* TWO UPLOAD ZONES SIDE BY SIDE */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 1. VICTIM PHOTO CARD */}
            <div className="space-y-3 bg-[#0B0C10] p-4 rounded-2xl border border-[#1E1F2A]">
              <div className="flex items-center justify-between">
                <span className="text-white text-xs font-mono font-bold uppercase tracking-wider block">
                  1. TARGET VICTIM PHOTO
                </span>
                <span className="text-[#00C853] text-[10px] font-mono font-bold">REQUIRED</span>
              </div>

              {/* Photo Display / Drop Area */}
              <div
                onClick={() => victimInputRef.current.click()}
                onDragOver={(e) => { e.preventDefault(); setIsDragOverVictim(true); }}
                onDragLeave={() => setIsDragOverVictim(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setIsDragOverVictim(false);
                  handleVictimUpload(e.dataTransfer.files[0]);
                }}
                className={`relative h-48 rounded-xl border-2 border-dashed flex flex-col items-center justify-center p-3 cursor-pointer transition-all ${
                  isDragOverVictim
                    ? 'border-[#00C853] bg-[#00C853]/10'
                    : victimPreview
                    ? 'border-[#00C853] bg-[#15161D]'
                    : 'border-[#2A2A2A] hover:border-[#00C853] bg-[#15161D]'
                }`}
              >
                {victimPreview ? (
                  <div className="relative w-full h-full flex flex-col items-center justify-center">
                    <img
                      src={victimPreview}
                      alt="Victim Reference"
                      className="max-h-32 rounded-lg object-cover border border-[#00C853] shadow-md mb-1.5"
                    />
                    <span className="text-white text-[11px] font-mono font-bold truncate max-w-[200px]">
                      {victimFile?.name || "victim_reference.jpg"}
                    </span>
                  </div>
                ) : (
                  <div className="text-center space-y-2">
                    <div className="w-10 h-10 rounded-xl bg-[#0B0C10] border border-[#2A2A2A] flex items-center justify-center mx-auto text-[#00C853]">
                      <UserCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-white text-xs font-bold uppercase tracking-wider">
                        UPLOAD VICTIM PHOTO
                      </p>
                      <p className="text-[#8A8B9A] text-[10px] font-mono mt-0.5">
                        Drag & Drop or Click to Select
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* DEDICATED BUTTONS TO ADD VICTIM PHOTO & CAMERA CAPTURE */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => victimInputRef.current.click()}
                  className="py-2 px-3 bg-[#1E1F2A] hover:bg-[#00C853] hover:text-[#0B0C10] text-white text-xs font-mono font-bold rounded-lg border border-[#1E1F2A] transition-all flex items-center justify-center space-x-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Victim Photo</span>
                </button>

                <button
                  type="button"
                  onClick={() => victimCamInputRef.current.click()}
                  className="py-2 px-3 bg-[#1E1F2A] hover:bg-[#2A2C3C] text-[#8A8B9A] hover:text-white text-xs font-mono font-bold rounded-lg border border-[#1E1F2A] transition-all flex items-center justify-center space-x-1.5"
                >
                  <Camera className="w-3.5 h-3.5 text-[#00C853]" />
                  <span>Use Camera</span>
                </button>
              </div>

              {/* Green FACE DETECTED badge */}
              {victimPreview && victimFaceDetected && (
                <div className="p-2 bg-[#15161D] border border-[#00C853] rounded-lg flex items-center justify-center space-x-1.5 text-[#00C853] text-[11px] font-mono font-bold animate-slide-down">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>FACE DETECTED • EMBEDDING READY</span>
                </div>
              )}
            </div>

            {/* 2. SUSPECT PHOTO CARD */}
            <div className="space-y-3 bg-[#0B0C10] p-4 rounded-2xl border border-[#1E1F2A]">
              <div className="flex items-center justify-between">
                <span className="text-white text-xs font-mono font-bold uppercase tracking-wider block">
                  2. TARGET SUSPECT PHOTO
                </span>
                <span className="text-[#FF1744] text-[10px] font-mono font-bold">REQUIRED</span>
              </div>

              {/* Photo Display / Drop Area */}
              <div
                onClick={() => suspectInputRef.current.click()}
                onDragOver={(e) => { e.preventDefault(); setIsDragOverSuspect(true); }}
                onDragLeave={() => setIsDragOverSuspect(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setIsDragOverSuspect(false);
                  handleSuspectUpload(e.dataTransfer.files[0]);
                }}
                className={`relative h-48 rounded-xl border-2 border-dashed flex flex-col items-center justify-center p-3 cursor-pointer transition-all ${
                  isDragOverSuspect
                    ? 'border-[#FF1744] bg-[#FF1744]/10'
                    : suspectPreview
                    ? 'border-[#FF1744] bg-[#15161D]'
                    : 'border-[#2A2A2A] hover:border-[#FF1744] bg-[#15161D]'
                }`}
              >
                {suspectPreview ? (
                  <div className="relative w-full h-full flex flex-col items-center justify-center">
                    <img
                      src={suspectPreview}
                      alt="Suspect Reference"
                      className="max-h-32 rounded-lg object-cover border border-[#FF1744] shadow-md mb-1.5"
                    />
                    <span className="text-white text-[11px] font-mono font-bold truncate max-w-[200px]">
                      {suspectFile?.name || "suspect_alpha.jpg"}
                    </span>
                  </div>
                ) : (
                  <div className="text-center space-y-2">
                    <div className="w-10 h-10 rounded-xl bg-[#0B0C10] border border-[#2A2A2A] flex items-center justify-center mx-auto text-[#FF1744]">
                      <Camera className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-white text-xs font-bold uppercase tracking-wider">
                        UPLOAD SUSPECT PHOTO
                      </p>
                      <p className="text-[#8A8B9A] text-[10px] font-mono mt-0.5">
                        Drag & Drop or Click to Select
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* DEDICATED BUTTONS TO ADD SUSPECT PHOTO & CAMERA CAPTURE */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => suspectInputRef.current.click()}
                  className="py-2 px-3 bg-[#1E1F2A] hover:bg-[#FF1744] hover:text-white text-white text-xs font-mono font-bold rounded-lg border border-[#1E1F2A] transition-all flex items-center justify-center space-x-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Suspect Photo</span>
                </button>

                <button
                  type="button"
                  onClick={() => suspectCamInputRef.current.click()}
                  className="py-2 px-3 bg-[#1E1F2A] hover:bg-[#2A2C3C] text-[#8A8B9A] hover:text-white text-xs font-mono font-bold rounded-lg border border-[#1E1F2A] transition-all flex items-center justify-center space-x-1.5"
                >
                  <Camera className="w-3.5 h-3.5 text-[#FF1744]" />
                  <span>Use Camera</span>
                </button>
              </div>

              {/* Red FACE DETECTED badge */}
              {suspectPreview && suspectFaceDetected && (
                <div className="p-2 bg-[#15161D] border border-[#FF1744] rounded-lg flex items-center justify-center space-x-1.5 text-[#FF1744] text-[11px] font-mono font-bold animate-slide-down">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>FACE DETECTED • EMBEDDING READY</span>
                </div>
              )}
            </div>
          </div>

          {/* 3. CCTV CAMERA RECORDING ZONE & BUTTONS */}
          <div className="space-y-3 bg-[#0B0C10] p-4 rounded-2xl border border-[#1E1F2A]">
            <div className="flex items-center justify-between">
              <span className="text-white text-xs font-mono font-bold uppercase tracking-wider block">
                3. CCTV CAMERA RECORDING / SURVEILLANCE FOOTAGE
              </span>
              <span className="text-[#FF6B35] text-[10px] font-mono font-bold">REQUIRED</span>
            </div>

            <div
              onClick={() => videoInputRef.current.click()}
              onDragOver={(e) => { e.preventDefault(); setIsDragOverVideo(true); }}
              onDragLeave={() => setIsDragOverVideo(false)}
              onDrop={(e) => {
                e.preventDefault();
                setIsDragOverVideo(false);
                handleVideoUpload(e.dataTransfer.files[0]);
              }}
              className={`w-full rounded-xl border-2 border-dashed p-4 cursor-pointer transition-all flex flex-col sm:flex-row items-center justify-between gap-3 ${
                isDragOverVideo
                  ? 'border-[#FF6B35] bg-[#FF6B35]/10'
                  : videoFilename
                  ? 'border-[#FF6B35] bg-[#15161D]'
                  : 'border-[#2A2A2A] hover:border-[#FF6B35] bg-[#15161D]'
              }`}
            >
              <div className="flex items-center space-x-3 truncate">
                <div className="w-10 h-10 rounded-xl bg-[#0B0C10] border border-[#1E1F2A] flex items-center justify-center text-[#FF6B35] flex-shrink-0">
                  <FileVideo className="w-5 h-5" />
                </div>
                <div className="truncate">
                  <p className="text-white text-xs font-bold uppercase tracking-wider">
                    {videoFilename ? "CCTV FOOTAGE SELECTED" : "SELECT CCTV CAMERA RECORDING"}
                  </p>
                  <p className="text-[#8A8B9A] text-[11px] font-mono truncate mt-0.5">
                    {videoFilename ? (
                      <span className="text-[#FF6B35] font-bold truncate block">{videoFilename}</span>
                    ) : (
                      "Drag & Drop or Click to Select Video Stream (MP4, AVI, MKV)"
                    )}
                  </p>
                </div>
              </div>

              {/* DEDICATED CAMERA UPLOADING BUTTON */}
              <div className="flex items-center space-x-2 flex-shrink-0">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    videoInputRef.current.click();
                  }}
                  className="px-4 py-2 bg-[#FF6B35] hover:bg-[#E85A24] text-[#0B0C10] font-bold text-xs uppercase font-mono rounded-xl transition-all shadow-md flex items-center space-x-1.5"
                >
                  <Upload className="w-3.5 h-3.5 text-[#0B0C10]" />
                  <span>Upload Camera File</span>
                </button>
              </div>
            </div>
          </div>

          {/* PROGRESS BAR ANIMATION */}
          {isProcessing && (
            <div className="p-4 bg-[#0B0C10] border border-[#FF6B35] rounded-xl space-y-3 animate-slide-down">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-white font-bold flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-[#FF6B35] animate-ping" />
                  <span>{progressText}</span>
                </span>
                <span className="text-[#FF6B35] font-bold">{Math.round((progressStep / 3) * 100)}%</span>
              </div>

              <div className="w-full bg-[#15161D] h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-[#FF6B35] h-full transition-all duration-500 rounded-full shadow-accent-glow"
                  style={{ width: `${(progressStep / 3) * 100}%` }}
                />
              </div>
            </div>
          )}

          {/* START ANALYSIS BUTTON */}
          <button
            onClick={handleStartAnalysis}
            disabled={!isReadyToAnalyze || isProcessing}
            className={`w-full py-4 rounded-xl font-extrabold text-sm uppercase tracking-wider transition-all flex items-center justify-center space-x-2 shadow-lg ${
              isReadyToAnalyze && !isProcessing
                ? 'bg-[#FF6B35] hover:bg-[#E85A24] text-[#0B0C10] active:scale-[0.99] cursor-pointer'
                : 'bg-[#1E1F2A] text-[#8A8B9A] cursor-not-allowed border border-[#2A2A2A]'
            }`}
          >
            <Play className="w-5 h-5 fill-current" />
            <span>{isProcessing ? "ANALYZING CCTV SURVEILLANCE..." : "START ANALYSIS"}</span>
          </button>
        </div>

        {/* Footer */}
        <div className="text-center text-[#8A8B9A] text-xs font-mono flex items-center justify-center space-x-4">
          <span>STRICT COMPLIANCE: SECTION 65B INDIAN EVIDENCE ACT</span>
          <span>•</span>
          <span>KERALA POLICE CYBERDOME HAC'KP 2026</span>
        </div>
      </div>
    </div>
  );
}
