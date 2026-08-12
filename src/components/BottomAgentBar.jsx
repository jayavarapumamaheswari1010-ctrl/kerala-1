import React from 'react';

export default function BottomAgentBar() {
  const agents = [
    { name: "Evidence Custodian", status: "active", state: "green" },
    { name: "Pattern Hunter", status: "active", state: "green" },
    { name: "Digital Tracker", status: "tracking", state: "orange-pulse" },
    { name: "Threat Scout", status: "scanning", state: "orange-pulse" },
    { name: "Report Writer", status: "ready", state: "green" }
  ];

  return (
    <footer className="fixed bottom-0 left-0 right-0 h-14 bg-[#0B0C10] border-t border-[#1E1F2A] px-4 flex items-center justify-between z-30 select-none">
      <div className="flex items-center space-x-2 text-[11px] font-mono text-[#8A8B9A] uppercase tracking-wider hidden lg:flex">
        <span>Autonomous Agents:</span>
      </div>

      <div className="flex items-center justify-around w-full lg:w-auto lg:space-x-3 overflow-x-auto py-1 scrollbar-none">
        {agents.map((agent) => {
          let dotStyle = 'w-2 h-2 rounded-full mr-2 ';
          if (agent.state === 'green') {
            dotStyle += 'bg-[#00C853] animate-pulse';
          } else if (agent.state === 'orange-pulse') {
            dotStyle += 'bg-[#FF6B35] animate-ping';
          }

          return (
            <div
              key={agent.name}
              className="flex items-center h-7 px-3 bg-[#15161D] border border-[#1E1F2A] rounded-[8px] transition-colors flex-shrink-0 cursor-default"
            >
              <div className="relative flex items-center">
                <span className={dotStyle} />
                {agent.state === 'orange-pulse' && (
                  <span className="absolute left-0 w-2 h-2 rounded-full bg-[#FF6B35]" />
                )}
              </div>
              <span className="text-white text-[12px] font-medium tracking-tight whitespace-nowrap">
                {agent.name}
              </span>
            </div>
          );
        })}
      </div>

      <div className="hidden xl:flex items-center space-x-2 text-[11px] font-mono text-[#8A8B9A]">
        <span className="w-1.5 h-1.5 rounded-full bg-[#00C853]" />
        <span>SECURE BUS ENCRYPTED</span>
      </div>
    </footer>
  );
}
