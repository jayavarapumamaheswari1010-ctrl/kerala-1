// Audio & Speech Synthesis Engine for Kerala Police Cyberdome FORENSIC AI

// Play cyber police radio dispatch chime
export const playRadioChime = () => {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();

    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    const now = ctx.currentTime;

    // High frequency cyber beep
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(880, now); // A5
    osc1.frequency.exponentialRampToValueAtTime(1320, now + 0.1); // E6
    gain1.gain.setValueAtTime(0.15, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.25);

    // Second confirmation tone
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(1760, now + 0.12);
    gain2.gain.setValueAtTime(0.12, now + 0.12);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(now + 0.12);
    osc2.stop(now + 0.35);
  } catch (e) {
    console.warn("AudioContext chime error:", e);
  }
};

const LANG_MAP = {
  te: { code: 'te-IN', fallback: 'hi-IN', name: 'Telugu' },
  ml: { code: 'ml-IN', fallback: 'hi-IN', name: 'Malayalam' },
  en: { code: 'en-IN', fallback: 'en-US', name: 'English' },
  hi: { code: 'hi-IN', fallback: 'hi-IN', name: 'Hindi' },
  ta: { code: 'ta-IN', fallback: 'hi-IN', name: 'Tamil' }
};

export const stopSpeech = () => {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
};

export const speakText = (text, langKey = 'te', onEndCallback = () => {}, onErrorCallback = () => {}) => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    console.warn("SpeechSynthesis not supported on this browser.");
    playRadioChime();
    setTimeout(onEndCallback, 3000);
    return;
  }

  // Play cyber police radio dispatch chime first
  playRadioChime();

  window.speechSynthesis.cancel(); // Stop ongoing speech

  setTimeout(() => {
    try {
      const targetLang = LANG_MAP[langKey] || { code: 'en-IN', name: 'English' };
      const utterance = new SpeechSynthesisUtterance(text);
      
      utterance.lang = targetLang.code;
      utterance.rate = 0.95; // Clear forensic cadence
      utterance.pitch = 1.0;
      utterance.volume = 1.0;

      // Find best available voice
      const voices = window.speechSynthesis.getVoices();
      if (voices && voices.length > 0) {
        const matchingVoice = voices.find(v => 
          v.lang.toLowerCase() === targetLang.code.toLowerCase() ||
          v.lang.toLowerCase().startsWith(langKey.toLowerCase())
        );

        if (matchingVoice) {
          utterance.voice = matchingVoice;
        } else {
          // Fallback to any Indian English or default voice
          const indianVoice = voices.find(v => v.lang.includes('IN') || v.lang.includes('en'));
          if (indianVoice) utterance.voice = indianVoice;
        }
      }

      utterance.onend = () => {
        onEndCallback();
      };

      utterance.onerror = (err) => {
        console.warn("Speech synthesis error, falling back:", err);
        onEndCallback();
      };

      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.error("Speech synthesis trigger error:", e);
      onErrorCallback();
    }
  }, 180);
};
