import React, { useState, useEffect } from 'react';
import { 
  X, 
  Radio, 
  CheckSquare, 
  Square, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  FileCheck,
  ShieldAlert,
  Scale,
  Download,
  AlertTriangle
} from 'lucide-react';
import { DEBRIEF_DATA } from '../data/forensicData';
import { speakText, stopSpeech, playRadioChime } from '../utils/audioSpeech';

export default function CaseDebriefDrawer({ isOpen, onClose }) {
  const [selectedLang, setSelectedLang] = useState('te'); // Default to Telugu
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(100);
  const [checklist, setChecklist] = useState(DEBRIEF_DATA.checklist);
  const [audioFeedback, setAudioFeedback] = useState('Audio Engine Ready • Click Play to Hear Officer Kavach');

  useEffect(() => {
    // When drawer closes or unmounts, cancel audio
    if (!isOpen) {
      stopSpeech();
      setIsPlaying(false);
    }
  }, [isOpen]);

  useEffect(() => {
    // If language changes while playing, restart speech in the new language
    if (isPlaying) {
      handlePlaySpeech();
    }
  }, [selectedLang]);

  if (!isOpen) return null;

  const handleToggleCheck = (id) => {
    setChecklist(prev => {
      const next = prev.map(item => item.id === id ? { ...item, completed: !item.completed } : item);
      const doneCount = next.filter(i => i.completed).length;
      setGenerationProgress(Math.round((doneCount / next.length) * 100));
      return next;
    });
  };

  const handlePlaySpeech = () => {
    const transcript = DEBRIEF_DATA.briefingTranscript[selectedLang] || DEBRIEF_DATA.briefingTranscript['en'];
    setIsPlaying(true);
    setAudioFeedback(`Broadcasting Neural Audio Synthesis in ${selectedLang.toUpperCase()}...`);

    speakText(
      transcript, 
      selectedLang, 
      () => {
        setIsPlaying(false);
        setAudioFeedback('Speech broadcast finished. Click to replay.');
      },
      () => {
        setIsPlaying(false);
        setAudioFeedback('Audio broadcast completed.');
      }
    );
  };

  const handleStopSpeech = () => {
    stopSpeech();
    setIsPlaying(false);
    setAudioFeedback('Audio synthesis paused.');
  };

  const handleGenerateBriefing = () => {
    setIsGenerating(true);
    playRadioChime();
    setTimeout(() => {
      setChecklist(prev => prev.map(item => ({ ...item, completed: true })));
      setGenerationProgress(100);
      setIsGenerating(false);
      handlePlaySpeech();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden select-none">
      {/* Backdrop */}
      <div 
        onClick={() => {
          stopSpeech();
          onClose();
        }}
        className="absolute inset-0 bg-black/70 backdrop-blur-[2px] transition-opacity"
      />

      {/* Drawer */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-[440px] bg-[#15161D] border-l border-[#1E1F2A] shadow-2xl flex flex-col justify-between animate-slide-left z-50">
          {/* Top Header */}
          <div className="p-5 border-b border-[#1E1F2A] flex items-start justify-between">
            <div>
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-[#FF6B35] animate-pulse-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 10v4" />
                  <path d="M6 6v12" />
                  <path d="M10 3v18" />
                  <path d="M14 8v8" />
                  <path d="M18 5v14" />
                  <path d="M22 10v4" />
                </svg>
                <h2 className="text-white font-bold text-base tracking-wide">CASE DEBRIEF ENGINE</h2>
              </div>
              <p className="text-[#8A8B9A] text-xs mt-1">Multi-Lingual Audio Forensic Synthesis</p>
            </div>
            <button
              onClick={() => {
                stopSpeech();
                onClose();
              }}
              className="w-8 h-8 rounded-lg bg-[#1E1F2A] border border-[#1E1F2A] text-[#8A8B9A] hover:text-white hover:border-[#FF6B35] flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Drawer Body */}
          <div className="p-5 space-y-5 overflow-y-auto flex-1">
            {/* Language Selector (Includes Telugu, Malayalam, English, Hindi, Tamil) */}
            <div>
              <label className="text-[11px] font-mono text-[#8A8B9A] uppercase tracking-wider block mb-2">
                Select Audio Speech Language
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                {DEBRIEF_DATA.languages.map((lang) => {
                  const isSelected = selectedLang === lang.code;
                  return (
                    <button
                      key={lang.code}
                      onClick={() => setSelectedLang(lang.code)}
                      className={`py-2 px-2 text-xs font-semibold rounded-lg transition-all text-center ${
                        isSelected
                          ? 'bg-[#FF6B35] text-[#0B0C10] shadow-sm font-bold'
                          : 'bg-[#0B0C10] border border-[#1E1F2A] text-white hover:border-[#FF6B35]'
                      }`}
                    >
                      {lang.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Video / Audio Briefing Player */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-[11px] font-mono text-[#8A8B9A] uppercase tracking-wider">
                  Voice Synthesizer (Speaker Output)
                </label>
                <span className="text-[10px] font-mono text-[#00C853] flex items-center space-x-1">
                  <Volume2 className="w-3 h-3 text-[#00C853]" />
                  <span>VOICE AUDIO LIVE</span>
                </span>
              </div>

              <div className="relative aspect-video bg-[#0B0C10] border border-[#1E1F2A] rounded-xl overflow-hidden flex flex-col items-center justify-center p-4">
                {/* Background Waveform Graphics */}
                <div className="absolute inset-0 flex items-center justify-center space-x-1 opacity-25 pointer-events-none">
                  {[40, 70, 30, 90, 50, 80, 45, 100, 60, 35, 85, 20, 60, 90, 40].map((h, i) => (
                    <div
                      key={i}
                      style={{ height: `${isPlaying ? Math.max(h, 25) : 20}%` }}
                      className={`w-1 bg-[#FF6B35] rounded-full transition-all duration-150 ${isPlaying ? 'animate-pulse' : ''}`}
                    />
                  ))}
                </div>

                {/* Play Button & Officer Indicator */}
                <button
                  onClick={isPlaying ? handleStopSpeech : handlePlaySpeech}
                  className={`w-14 h-14 rounded-full border flex items-center justify-center transition-all z-10 shadow-2xl active:scale-95 ${
                    isPlaying 
                      ? 'bg-[#FF6B35] border-[#FF6B35] text-[#0B0C10] shadow-accent-glow'
                      : 'bg-[#1E1F2A] border-[#FF6B35] text-white hover:scale-105'
                  }`}
                  title={isPlaying ? "Pause Speech" : "Play Voice Briefing Aloud"}
                >
                  {isPlaying ? (
                    <Pause className="w-6 h-6 fill-current" />
                  ) : (
                    <Play className="w-6 h-6 fill-white ml-1 text-white" />
                  )}
                </button>

                <p className="text-white text-xs mt-3 z-10 font-semibold font-mono">
                  {isPlaying ? `🔊 Speaking in ${selectedLang.toUpperCase()} Voice...` : '▶ Click Play to Hear Officer Kavach'}
                </p>

                <div className="flex items-center space-x-1.5 mt-1 z-10">
                  <span className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-[#FF6B35] animate-ping' : 'bg-[#00C853]'}`} />
                  <span className="text-[10px] text-[#8A8B9A] font-mono">{audioFeedback}</span>
                </div>
              </div>
            </div>

            {/* Multilingual Transcript Box with Audio Trigger */}
            <div className="p-3.5 bg-[#0B0C10] border border-[#1E1F2A] rounded-xl space-y-2">
              <div className="flex items-center justify-between text-[11px] font-mono text-[#8A8B9A]">
                <span>TRANSCRIPT [{selectedLang.toUpperCase()}]</span>
                <button 
                  onClick={isPlaying ? handleStopSpeech : handlePlaySpeech}
                  className="text-[#FF6B35] hover:text-white flex items-center space-x-1"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>{isPlaying ? 'Stop Audio' : 'Speak Text'}</span>
                </button>
              </div>
              <p className="text-white text-xs leading-relaxed font-sans bg-[#15161D] p-3 rounded-lg border border-[#1E1F2A]">
                "{DEBRIEF_DATA.briefingTranscript[selectedLang]}"
              </p>
            </div>

            {/* Statutory Court Sections */}
            <div className="p-3.5 bg-[#0B0C10] border border-[#1E1F2A] rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono text-[#FF6B35] uppercase font-bold flex items-center space-x-1.5">
                  <Scale className="w-3.5 h-3.5 text-[#FF6B35]" />
                  <span>COURT SECTIONS FOR THREAT MESSAGES</span>
                </span>
                <span className="text-[10px] font-mono text-[#00C853]">4 CHARGES</span>
              </div>
              <div className="space-y-1.5 pt-1">
                {DEBRIEF_DATA.legalSummary.map((leg, i) => (
                  <div key={i} className="p-2 rounded-lg bg-[#15161D] border border-[#1E1F2A] text-xs">
                    <div className="flex items-center justify-between text-white font-bold font-mono">
                      <span>{leg.section}</span>
                      <span className="text-[10px] text-[#FF1744] font-normal">{leg.penalty}</span>
                    </div>
                    <p className="text-[#8A8B9A] text-[11px] mt-0.5">{leg.crime}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Checklist Progress */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-mono text-[#8A8B9A] uppercase tracking-wider">
                  Briefing Checklist
                </span>
                <span className="text-[11px] font-mono text-[#FF6B35]">
                  {generationProgress}%
                </span>
              </div>

              <div className="w-full h-1.5 bg-[#1E1F2A] rounded-full overflow-hidden mb-2">
                <div
                  className="h-full bg-[#FF6B35] transition-all duration-500"
                  style={{ width: `${generationProgress}%` }}
                />
              </div>

              <div className="space-y-1.5">
                {checklist.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleToggleCheck(item.id)}
                    className="flex items-center space-x-2.5 p-2 rounded-lg bg-[#0B0C10] border border-[#1E1F2A] hover:border-[#FF6B35]/40 cursor-pointer transition-colors"
                  >
                    {item.completed ? (
                      <CheckSquare className="w-3.5 h-3.5 text-[#00C853] flex-shrink-0" />
                    ) : (
                      <Square className="w-3.5 h-3.5 text-[#8A8B9A] flex-shrink-0" />
                    )}
                    <span className={`text-xs ${item.completed ? 'text-white' : 'text-[#8A8B9A]'}`}>
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Action */}
          <div className="p-5 border-t border-[#1E1F2A] bg-[#15161D]">
            <button
              onClick={handleGenerateBriefing}
              disabled={isGenerating}
              className="w-full py-3 bg-[#FF6B35] hover:bg-[#E85A24] text-[#0B0C10] font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md active:scale-[0.98] flex items-center justify-center space-x-2"
            >
              {isGenerating ? (
                <>
                  <Sparkles className="w-4 h-4 animate-spin text-[#0B0C10]" />
                  <span>SYNTHESIZING DEBRIEF...</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4 text-[#0B0C10]" />
                  <span>SYNTHESIZE & SPEAK {selectedLang.toUpperCase()} BRIEFING</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
