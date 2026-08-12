import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Plus, 
  LayoutDashboard, 
  Search, 
  Network, 
  Clock, 
  Archive, 
  HelpCircle, 
  Shield 
} from 'lucide-react';

export default function Sidebar({ onNewInvestigation }) {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { name: 'Case Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Evidence Analysis', path: '/evidence', icon: Search },
    { name: 'Knowledge Graph', path: '/analysis', icon: Network },
    { name: 'Investigation Timeline', path: '/reports', icon: Clock },
    { name: 'Archive', path: '#archive', icon: Archive },
    { name: 'Support', path: '#support', icon: HelpCircle },
  ];

  const handleNavClick = (path) => {
    if (path.startsWith('/')) {
      navigate(path);
    } else {
      alert(`${path.replace('#', '').toUpperCase()} module accessible under supervisor authorization.`);
    }
  };

  return (
    <aside className="w-[220px] bg-[#15161D] border-r border-[#1E1F2A] flex flex-col justify-between flex-shrink-0 min-h-[calc(100vh-64px-56px)] select-none">
      <div className="p-3">
        {/* Top: New Investigation Button */}
        <button
          onClick={onNewInvestigation}
          className="w-full flex items-center justify-center space-x-2 py-2.5 px-3 bg-[#FF6B35] hover:bg-[#E85A24] text-[#0B0C10] font-bold text-xs rounded-xl tracking-wide transition-all shadow-md active:scale-[0.98] mb-4 group"
        >
          <Plus className="w-4 h-4 stroke-[3] group-hover:rotate-90 transition-transform duration-200" />
          <span>New Investigation</span>
        </button>

        {/* Navigation Items */}
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isSelected = 
              (location.pathname === item.path) || 
              (item.path === '/dashboard' && location.pathname === '/');

            return (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.path)}
                className={`w-full flex items-center space-x-2.5 px-3 py-2.5 text-xs font-medium rounded-lg text-left transition-all relative ${
                  isSelected
                    ? 'bg-[#1E1F2A] text-white font-semibold'
                    : 'text-[#8A8B9A] hover:text-white hover:bg-[#1E1F2A]/50'
                }`}
              >
                {/* 3px Left Orange Border for selected */}
                {isSelected && (
                  <div className="absolute left-0 top-1 bottom-1 w-[3px] bg-[#FF6B35] rounded-r" />
                )}
                <Icon className={`w-4 h-4 ${isSelected ? 'text-[#FF6B35]' : 'text-[#8A8B9A]'}`} />
                <span className="truncate">{item.name}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom info banner */}
      <div className="p-3 border-t border-[#1E1F2A]">
        <div className="flex items-center space-x-2 text-[#8A8B9A] text-[11px] font-mono">
          <Shield className="w-3.5 h-3.5 text-[#FF6B35]" />
          <span className="truncate">Unit 7 Forensic Division</span>
        </div>
        <div className="text-[10px] text-[#8A8B9A]/60 font-mono mt-1 pl-5">
          v2.6.4 • HAC'KP-2026
        </div>
      </div>
    </aside>
  );
}
