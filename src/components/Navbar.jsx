import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Activity, 
  Search, 
  Bell, 
  Settings, 
  Radio, 
  X,
  FileText,
  ShieldCheck,
  LogOut,
  ChevronDown
} from 'lucide-react';

export default function Navbar({ onOpenDebrief }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);

  const navTabs = [
    { name: 'KRYPT CCTV', path: '/krypt' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Evidence', path: '/evidence' },
    { name: 'Analysis', path: '/analysis' },
    { name: 'Reports', path: '/reports' },
  ];

  return (
    <header className="h-16 bg-[#15161D] border-b border-[#1E1F2A] px-5 flex items-center justify-between sticky top-0 z-40 select-none">
      {/* Left: Brand */}
      <div className="flex items-center space-x-6">
        <Link to="/dashboard" className="flex items-center space-x-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-[#1E1F2A] border border-[#1E1F2A] flex items-center justify-center group-hover:border-[#FF6B35] transition-colors">
            {/* Orange Waveform Icon */}
            <svg className="w-5 h-5 text-[#FF6B35]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 10v4" />
              <path d="M6 6v12" />
              <path d="M10 3v18" />
              <path d="M14 8v8" />
              <path d="M18 5v14" />
              <path d="M22 10v4" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-white font-extrabold text-[18px] tracking-wider leading-none">
              FORENSIC AI
            </span>
            <span className="text-[#8A8B9A] text-[9px] uppercase tracking-widest font-mono mt-0.5">
              Cyberdome KP-2026
            </span>
          </div>
        </Link>

        <div className="hidden lg:flex items-center space-x-2 pl-3 border-l border-[#1E1F2A]">
          <span className="w-2 h-2 rounded-full bg-[#00C853] animate-pulse-success" />
          <span className="text-[#8A8B9A] text-xs font-mono">NODE-07 ONLINE</span>
        </div>
      </div>

      {/* Center: Navigation Tabs */}
      <nav className="hidden md:flex items-center space-x-1">
        {navTabs.map((tab) => {
          const isActive = location.pathname === tab.path || 
            (tab.path === '/dashboard' && location.pathname === '/');
          
          return (
            <Link
              key={tab.name}
              to={tab.path}
              className={`px-4 py-2 text-sm font-medium transition-all relative ${
                isActive
                  ? 'text-white'
                  : 'text-[#8A8B9A] hover:text-white'
              }`}
            >
              {tab.name}
              {isActive && (
                <div className="absolute bottom-[-13px] left-0 right-0 h-[3px] bg-[#FF6B35]" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Right: Actions & User Avatar */}
      <div className="flex items-center space-x-3">
        {/* Case Debrief Action Button */}
        <button
          onClick={onOpenDebrief}
          className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-[#1E1F2A] border border-[#1E1F2A] hover:border-[#FF6B35] text-white hover:text-[#FF6B35] text-xs font-semibold uppercase tracking-wider transition-colors"
          title="Open AI Case Debrief Engine"
        >
          <Radio className="w-3.5 h-3.5 text-[#FF6B35] animate-pulse-accent" />
          <span className="hidden sm:inline">Case Debrief</span>
        </button>

        {/* Search Bar */}
        <div className="relative hidden sm:block w-44 md:w-56">
          <Search className="w-3.5 h-3.5 text-[#8A8B9A] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search case files..."
            className="w-full bg-[#0B0C10] border border-[#1E1F2A] focus:border-[#FF6B35] text-white text-xs rounded-lg pl-8 pr-3 py-1.5 outline-none placeholder-[#8A8B9A] transition-colors font-sans"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')} 
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8A8B9A] hover:text-white"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>

        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfileMenu(false);
              setHasUnread(false);
            }}
            className="w-8 h-8 rounded-lg bg-[#1E1F2A] border border-[#1E1F2A] flex items-center justify-center text-[#8A8B9A] hover:text-white transition-colors relative"
            title="System Alerts & Notifications"
          >
            <Bell className="w-4 h-4" />
            {hasUnread && (
              <span className="w-2 h-2 rounded-full bg-[#FF6B35] absolute top-1.5 right-1.5" />
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-[#15161D] border border-[#1E1F2A] rounded-xl shadow-2xl p-3 z-50 animate-slide-down">
              <div className="flex items-center justify-between pb-2 border-b border-[#1E1F2A] mb-2">
                <span className="text-white text-xs font-bold uppercase tracking-wider">Forensic Alerts</span>
                <span className="text-[10px] font-mono text-[#FF6B35]">LIVE FEED</span>
              </div>
              <div className="space-y-2 text-xs">
                <div className="p-2.5 rounded-lg bg-[#0B0C10] border-l-2 border-[#FF6B35]">
                  <p className="text-white font-medium text-[11px]">🚨 Cross-case match flagged</p>
                  <p className="text-[#8A8B9A] text-[10px] mt-0.5">Matched Kochi 2024 Case #KP-2024-0192</p>
                  <span className="text-[#8A8B9A] text-[9px] font-mono">2 mins ago</span>
                </div>
                <div className="p-2.5 rounded-lg bg-[#0B0C10] border-l-2 border-[#00C853]">
                  <p className="text-white font-medium text-[11px]">EXIF Extractor Completed</p>
                  <p className="text-[#8A8B9A] text-[10px] mt-0.5">Hash integrity verified for 3 screenshots</p>
                  <span className="text-[#8A8B9A] text-[9px] font-mono">8 mins ago</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Settings Gear */}
        <button
          onClick={() => alert("System Settings: Configuration managed by Cyberdome Admin.")}
          className="w-8 h-8 rounded-lg bg-[#1E1F2A] border border-[#1E1F2A] flex items-center justify-center text-[#8A8B9A] hover:text-white transition-colors"
          title="System Settings"
        >
          <Settings className="w-4 h-4" />
        </button>

        {/* User Avatar */}
        <div className="relative">
          <button
            onClick={() => {
              setShowProfileMenu(!showProfileMenu);
              setShowNotifications(false);
            }}
            className="flex items-center space-x-2 pl-1 group"
          >
            <div className="w-8 h-8 rounded-lg bg-[#1E1F2A] border border-[#1E1F2A] group-hover:border-[#FF6B35] flex items-center justify-center font-mono font-bold text-xs text-white transition-colors">
              KP
            </div>
            <ChevronDown className="w-3 h-3 text-[#8A8B9A] group-hover:text-white" />
          </button>

          {/* Profile Menu Dropdown */}
          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-[#15161D] border border-[#1E1F2A] rounded-xl shadow-2xl p-2.5 z-50 animate-slide-down">
              <div className="px-2 py-1.5 border-b border-[#1E1F2A] mb-1.5">
                <p className="text-white text-xs font-bold">Inspr. A. Rajesh</p>
                <p className="text-[#8A8B9A] text-[10px] font-mono">Cyberdome Unit 7 • ID: KP-7091</p>
              </div>
              <button 
                onClick={() => {
                  setShowProfileMenu(false);
                  navigate('/login');
                }}
                className="w-full flex items-center space-x-2 px-2 py-1.5 rounded-lg text-[#FF1744] hover:bg-[#1E1F2A] text-xs font-medium transition-colors text-left"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Log Out / Secure Session</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
