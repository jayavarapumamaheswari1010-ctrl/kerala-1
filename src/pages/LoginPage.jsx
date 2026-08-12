import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Eye, EyeOff, AlertTriangle } from 'lucide-react';

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('rajesh.cyberdome@keralapolice.gov.in');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberDevice, setRememberDevice] = useState(true);

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen w-full bg-[#0B0C10] flex flex-col md:flex-row items-stretch select-none font-sans">
      {/* Left side (55%): Branding and info */}
      <div className="w-full md:w-[55%] bg-[#0B0C10] p-8 md:p-16 flex flex-col justify-between relative border-b md:border-b-0 md:border-r border-[#1E1F2A]">
        {/* Top tag */}
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-[#00C853] animate-pulse" />
          <span className="text-[#8A8B9A] text-xs font-mono tracking-wider">CYBERDOME HAC'KP 2026</span>
        </div>

        {/* Centered Brand Content */}
        <div className="my-auto flex flex-col items-center text-center max-w-lg mx-auto">
          <div className="w-20 h-20 rounded-full border-2 border-[#FF6B35] flex items-center justify-center mb-6 overflow-hidden bg-[#15161D]">
            <img src="/sentinel_logo.png" alt="SENTINEL Logo" className="w-full h-full object-cover animate-eye-blink" />
          </div>

          <h1 className="text-white font-extrabold text-[36px] tracking-tight mb-1 font-sans">
            SENTINEL
          </h1>
          <p className="text-[#8A8B9A] text-[14px] mb-8 font-sans">
            Digital Evidence Intelligence Platform • Kerala Police Cyberdome
          </p>

          {/* Info Card */}
          <div className="w-full p-5 bg-[#15161D] border-l-4 border-[#FF6B35] border-y border-r border-[#1E1F2A] rounded-[8px] text-left">
            <p className="text-white text-xs leading-relaxed font-sans">
              Secure Analysis Environment. Authorized access only. All activities monitored and logged.
            </p>
          </div>
        </div>

        {/* Bottom classification footer */}
        <div className="flex items-center justify-between text-[#8A8B9A] text-xs font-mono">
          <span>CLASSIFICATION: TIER-1 SECRET</span>
          <span>UNIT 7 CYBER FORENSICS</span>
        </div>
      </div>

      {/* Right side (45%): Login Card */}
      <div className="w-full md:w-[45%] bg-[#15161D] p-8 md:p-16 flex flex-col justify-between">
        <div className="my-auto space-y-6">
          <div>
            <h2 className="text-white font-bold text-[20px] tracking-tight font-sans">
              Secure Access
            </h2>
            <p className="text-[#8A8B9A] text-xs font-sans">
              Sign in with organizational credentials
            </p>
          </div>

          {/* Continue with SSO */}
          <button
            type="button"
            onClick={() => navigate('/dashboard')}
            className="w-full py-2.5 bg-[#1E1F2A] hover:bg-[#2A2C3C] text-white text-xs font-semibold rounded-[8px] transition-colors border border-[#1E1F2A]"
          >
            Continue with Organization SSO
          </button>

          {/* Divider */}
          <div className="flex items-center my-4">
            <div className="flex-grow border-t border-[#1E1F2A]"></div>
            <span className="px-3 text-[#8A8B9A] text-[10px] uppercase font-mono tracking-wider">
              Or sign in with agency email
            </span>
            <div className="flex-grow border-t border-[#1E1F2A]"></div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-[10px] font-mono uppercase text-[#8A8B9A] block mb-1">
                Agency Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#0B0C10] border border-[#1E1F2A] focus:border-[#FF6B35] rounded-[8px] px-3 py-2 text-white font-mono text-xs outline-none transition-colors"
                required
              />
            </div>

            <div>
              <label className="text-[10px] font-mono uppercase text-[#8A8B9A] block mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#0B0C10] border border-[#1E1F2A] focus:border-[#FF6B35] rounded-[8px] px-3 py-2 text-white font-mono text-xs outline-none transition-colors pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8A8B9A] hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center space-x-2 text-[#8A8B9A] cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberDevice}
                  onChange={(e) => setRememberDevice(e.target.checked)}
                  className="rounded border-[#1E1F2A] bg-[#0B0C10] text-[#FF6B35] focus:ring-0 focus:ring-offset-0 w-3.5 h-3.5"
                />
                <span>Remember this device</span>
              </label>
              <a href="#forgot" className="text-[#FF6B35] hover:underline">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-[#FF6B35] hover:bg-[#E85A24] text-[#0B0C10] font-bold text-xs uppercase tracking-wider rounded-[8px] transition-colors shadow-md"
            >
              Sign in to workspace
            </button>
          </form>
        </div>

        {/* Restricted Footer warning */}
        <div className="flex items-start space-x-2 p-3 bg-[#0B0C10] border border-[#FF1744]/20 rounded-[8px] mt-6">
          <AlertTriangle className="w-4 h-4 text-[#FF1744] flex-shrink-0 mt-0.5" />
          <div className="text-[10px] font-mono leading-normal">
            <span className="text-[#FF1744] font-bold block uppercase">RESTRICTED SYSTEM</span>
            <span className="text-[#8A8B9A]">Unauthorized access strictly prohibited.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
