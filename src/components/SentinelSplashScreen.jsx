import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FEATURES = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="#FF6B35" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
    title: 'COLLECT',
    desc: 'Acquire digital evidence from multiple sources securely.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="#FF6B35" strokeWidth={1.8}>
        <circle cx="11" cy="11" r="8" /><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35" />
      </svg>
    ),
    title: 'ANALYZE',
    desc: 'AI-powered analysis to identify patterns and suspicious activities.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="#FF6B35" strokeWidth={1.8}>
        <rect x="2" y="3" width="7" height="7" rx="1" /><rect x="15" y="3" width="7" height="7" rx="1" /><rect x="8.5" y="14" width="7" height="7" rx="1" />
        <path strokeLinecap="round" d="M5.5 10v2a4 4 0 004 4h5a4 4 0 004-4v-2" />
      </svg>
    ),
    title: 'CORRELATE',
    desc: 'Correlate data, links, and entities across platforms.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="#FF6B35" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    title: 'GENERATE INSIGHTS',
    desc: 'Generate intelligent reports and investigation notes.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="#FF6B35" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
      </svg>
    ),
    title: 'SUPPORT JUSTICE',
    desc: 'Empowering officers with actionable intelligence.',
  },
];

export default function SentinelSplashScreen({ onComplete }) {
  const navigate = useNavigate();
  const [isFadingOut, setIsFadingOut] = useState(false);

  const handleAccess = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      if (onComplete) onComplete();
      navigate('/dashboard');
    }, 500);
  };

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-[#080A0E] text-white flex flex-col font-sans select-none transition-opacity duration-500 overflow-hidden ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Dot grid texture */}
      <div className="absolute inset-0 opacity-[0.12] bg-[radial-gradient(#FF6B35_1px,transparent_1px)] bg-[size:22px_22px] pointer-events-none" />
      {/* Right radial orange glow */}
      <div className="absolute right-0 top-0 w-[55%] h-full bg-[radial-gradient(ellipse_70%_80%_at_80%_40%,rgba(180,70,0,0.22),transparent)] pointer-events-none" />
      {/* Bottom fade */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#080A0E] to-transparent pointer-events-none" />

      {/* ══ TOP HEADER ══ */}
      <header className="flex-shrink-0 h-[56px] bg-[#080A0E]/90 backdrop-blur-sm border-b border-[#FF6B35]/10 flex items-center justify-between px-6 z-20">
        {/* Left brand */}
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-full overflow-hidden border border-[#FF6B35]/40 flex-shrink-0">
            <img src="/kerala_police_emblem.png" alt="KP" className="w-full h-full object-cover" />
          </div>
          <div>
            <div className="text-white font-extrabold text-[13px] tracking-[0.18em] uppercase leading-none">KERALA POLICE</div>
            <div className="text-[#8A8B9A] text-[9px] tracking-[0.15em] uppercase mt-0.5">CYBERDOME • DIGITAL EVIDENCE INTELLIGENCE</div>
          </div>
        </div>

        {/* Right status */}
        <div className="flex items-center space-x-5">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-[#00C853] shadow-[0_0_8px_#00C853] animate-pulse" />
            <span className="text-[#00C853] text-[11px] font-bold tracking-[0.2em] uppercase font-mono">SYSTEM SECURE</span>
          </div>
          <div className="flex items-center space-x-1.5 text-[#FF6B35]">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3.5 h-3.5">
              <rect x="3" y="11" width="18" height="11" rx="2" /><path strokeLinecap="round" d="M7 11V7a5 5 0 0110 0v4" />
            </svg>
            <span className="text-[#FF6B35] text-[11px] font-bold tracking-[0.2em] uppercase font-mono">KP-2026</span>
          </div>
        </div>
      </header>

      {/* ══ MAIN BODY ══ */}
      <div className="flex-1 flex items-stretch overflow-hidden min-h-0">

        {/* ── LEFT HERO CONTENT ── */}
        <div className="flex-1 flex flex-col justify-center px-12 md:px-16 py-8 relative z-10 max-w-[55%]">

          {/* Logo + FORENSIC AI title row */}
          <div className="flex items-center space-x-4 mb-4">
            {/* Shield icon */}
            <div className="w-16 h-16 flex-shrink-0 relative">
              <div className="absolute inset-0 bg-[#FF6B35]/10 rounded-xl blur-xl" />
              <div className="relative w-full h-full bg-[#0F1117] border border-[#FF6B35]/50 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(255,107,53,0.2)] overflow-hidden">
                <img src="/sentinel_logo.png" alt="Shield" className="w-full h-full object-cover animate-eye-blink" />
              </div>
            </div>

            {/* Title */}
            <div>
              <div className="flex items-baseline space-x-2">
                <span className="text-white font-extrabold text-5xl md:text-6xl tracking-tight leading-none">FORENSIC</span>
                <span className="text-[#FF6B35] font-extrabold text-5xl md:text-6xl tracking-tight leading-none">AI</span>
                <sup className="text-[#FF6B35]/80 text-base font-bold mt-1">™</sup>
              </div>
              <div className="text-[#C8C9D4] text-[11px] font-semibold tracking-[0.25em] uppercase mt-1">
                DIGITAL EVIDENCE INTELLIGENCE PLATFORM
              </div>
              {/* Orange divider line with text */}
              <div className="flex items-center space-x-2 mt-1.5">
                <div className="h-px w-10 bg-[#FF6B35]" />
                <span className="text-[#FF6B35] text-[10px] font-bold tracking-[0.22em] uppercase">KERALA POLICE CYBERDOME</span>
                <div className="h-px w-10 bg-[#FF6B35]" />
              </div>
            </div>
          </div>

          {/* Tagline */}
          <p className="text-[#C8C9D4] text-lg md:text-xl font-light mb-3 leading-snug">
            Intelligent Insights. Stronger Investigations. Safer Kerala.
          </p>

          {/* Three dots separator */}
          <div className="flex space-x-1.5 mb-5">
            {[0, 1, 2].map(i => (
              <span key={i} className="w-1.5 h-1.5 rounded-full bg-[#FF6B35]" />
            ))}
          </div>

          {/* Status cards */}
          <div className="flex space-x-4 mb-7">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-lg border border-[#00C853]/40 bg-[#0F1117] flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" stroke="#00C853" strokeWidth={2} className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <div className="text-[#00C853] text-[10px] font-bold tracking-widest uppercase">SYSTEM READY</div>
                <div className="text-[#8A8B9A] text-[9px] tracking-wide">All Systems Operational</div>
              </div>
            </div>
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-lg border border-[#FF6B35]/40 bg-[#0F1117] flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" stroke="#FF6B35" strokeWidth={2} className="w-4 h-4">
                  <rect x="3" y="11" width="18" height="11" rx="2" /><path strokeLinecap="round" d="M7 11V7a5 5 0 0110 0v4" />
                </svg>
              </div>
              <div>
                <div className="text-[#FF6B35] text-[10px] font-bold tracking-widest uppercase">SECURE MODE</div>
                <div className="text-[#8A8B9A] text-[9px] tracking-wide">KP-2026 Encryption Active</div>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="mb-2">
            <button
              id="splash-access-btn"
              onClick={handleAccess}
              className="group flex items-center justify-between space-x-4 bg-[#FF6B35] hover:bg-[#e85a25] active:bg-[#c44d1e] text-white font-extrabold text-[13px] tracking-[0.22em] uppercase px-7 py-4 rounded-lg transition-all duration-200 w-[340px] shadow-[0_0_35px_rgba(255,107,53,0.45)] hover:shadow-[0_0_55px_rgba(255,107,53,0.65)]"
            >
              <div className="flex items-center space-x-3">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span>ACCESS DASHBOARD</span>
              </div>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-5 h-5 group-hover:translate-x-1 transition-transform">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
          <p className="text-[#3A3B50] text-[9px] tracking-[0.35em] uppercase font-mono">AUTHORIZED ACCESS ONLY</p>
        </div>

        {/* ── RIGHT: Kerala Police Emblem ── */}
        <div className="flex-1 flex items-center justify-center relative pointer-events-none pr-8">
          {/* Concentric glow rings */}
          <div className="absolute w-[420px] h-[420px] rounded-full border border-[#FF6B35]/8 animate-[spin_30s_linear_infinite]" />
          <div className="absolute w-[350px] h-[350px] rounded-full border border-[#FF6B35]/12" />
          <div className="absolute w-[280px] h-[280px] rounded-full border border-[#FF6B35]/18" />
          <div className="absolute w-[420px] h-[420px] rounded-full bg-[radial-gradient(ellipse_80%_80%_at_50%_50%,rgba(180,70,0,0.15),transparent)]" />

          {/* Emblem image */}
          <div className="relative w-[300px] h-[300px] z-10">
            <div className="absolute inset-0 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,107,53,0.12),transparent)] blur-2xl" />
            <img
              src="/kerala_police_emblem.png"
              alt="Kerala Police Emblem"
              className="w-full h-full object-contain drop-shadow-[0_0_40px_rgba(255,107,53,0.3)]"
            />
          </div>
        </div>
      </div>

      {/* ══ FEATURE CARDS ROW ══ */}
      <div className="flex-shrink-0 border-t border-[#FF6B35]/10 bg-[#080A0E]/80 z-10">
        <div className="grid grid-cols-5 divide-x divide-[#FF6B35]/10">
          {FEATURES.map((f) => (
            <div key={f.title} className="px-6 py-4 flex items-start space-x-3 hover:bg-[#0F1117] transition-colors">
              <div className="flex-shrink-0 mt-0.5">{f.icon}</div>
              <div>
                <div className="text-white font-bold text-[11px] tracking-[0.18em] uppercase mb-1">{f.title}</div>
                <p className="text-[#8A8B9A] text-[10px] leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ══ FOOTER ══ */}
      <footer className="flex-shrink-0 h-[38px] bg-[#040507] border-t border-[#FF6B35]/8 flex items-center justify-between px-6 z-10">
        <div className="flex items-center space-x-6">
          {[
            { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-3 h-3"><rect x="3" y="11" width="18" height="11" rx="2"/><path strokeLinecap="round" d="M7 11V7a5 5 0 0110 0v4"/></svg>, label: 'ENCRYPTED CONNECTION' },
            { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-3 h-3"><path strokeLinecap="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>, label: 'TIER-1 CLASSIFIED SYSTEM' },
            { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-3 h-3"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>, label: 'KERALA POLICE CYBERDOME' },
          ].map(item => (
            <div key={item.label} className="flex items-center space-x-1.5 text-[#3A3B50]">
              {item.icon}
              <span className="text-[9px] font-mono tracking-widest uppercase">{item.label}</span>
            </div>
          ))}
        </div>
        <span className="text-[#3A3B50] text-[9px] font-mono tracking-wider">
          © 2026 Kerala Police Cyberdome | All Rights Reserved
        </span>
      </footer>
    </div>
  );
}
