import React, { useState } from 'react';
import { 
  MapPin, 
  Layers, 
  ZoomIn, 
  ZoomOut, 
  Navigation, 
  Radio, 
  Shield, 
  Compass, 
  Crosshair, 
  ExternalLink,
  Satellite,
  Maximize2
} from 'lucide-react';
import { MOCK_CASE } from '../data/forensicData';

export default function GoogleMapView({ onSelectLocation, selectedId }) {
  const [activePinId, setActivePinId] = useState(selectedId || 'loc-1');
  const [mapType, setMapType] = useState('radar'); // 'radar' | 'satellite' | 'google'
  const [zoomLevel, setZoomLevel] = useState(1.1);

  const points = MOCK_CASE?.digitalTracker?.points || [
    { id: 'loc-1', name: 'Sector 7 Marine Drive, Kochi', coords: '9.9726° N, 76.2783° E', lat: 9.9726, lng: 76.2783, time: '08:14 UTC', tag: 'Primary Ping', radius: '350m', activity: 'Suspect Device Registered', platform: 'Telegram / Signal' },
    { id: 'loc-2', name: 'Infopark Phase-2 Gate, Kakkanad', coords: '10.0159° N, 76.3639° E', lat: 10.0159, lng: 76.3639, time: '07:30 UTC', tag: 'Handshake Node', radius: '120m', activity: 'Bin Draft Email Sync', platform: 'Gmail / WhatsApp' },
    { id: 'loc-3', name: 'MG Road Cyber Cafe Node, Ernakulam', coords: '9.9674° N, 76.2848° E', lat: 9.9674, lng: 76.2848, time: '06:12 UTC', tag: 'Exfiltration Node', radius: '500m', activity: 'Cloud Backup Mirror', platform: 'Instagram' },
    { id: 'loc-4', name: 'Calicut Beach Tower, Kozhikode', coords: '11.2588° N, 75.7804° E', lat: 11.2588, lng: 75.7804, time: 'Yesterday', tag: 'Secondary Suspect', radius: '800m', activity: 'Cross-Case Correlation', platform: 'Discord' },
    { id: 'loc-5', name: 'Thiruvananthapuram Central Cyber Lab', coords: '8.5241° N, 76.9366° E', lat: 8.5241, lng: 76.9366, time: 'Today', tag: 'Forensic HQ', radius: '50m', activity: 'UFED Physical Imaging', platform: 'Hardware Dump' }
  ];

  const currentPin = points.find(p => p.id === activePinId) || points[0];

  const pinPositions = {
    'loc-1': { x: 38, y: 55 }, // Marine Drive Kochi
    'loc-2': { x: 55, y: 38 }, // Kakkanad Infopark
    'loc-3': { x: 35, y: 72 }, // MG Road
    'loc-4': { x: 72, y: 22 }, // Calicut
    'loc-5': { x: 20, y: 84 }  // Thiruvananthapuram HQ
  };

  const handlePinSelect = (pt) => {
    setActivePinId(pt.id);
    if (onSelectLocation) onSelectLocation(pt);
  };

  const googleMapsSearchUrl = `https://www.google.com/maps/search/?api=1&query=${currentPin.lat || 9.9726},${currentPin.lng || 76.2783}`;

  return (
    <div className="w-full bg-[#0B0C10] border border-[#1E1F2A] rounded-xl overflow-hidden flex flex-col relative select-none">
      {/* Map Control Bar */}
      <div className="p-3 bg-[#15161D] border-b border-[#1E1F2A] flex flex-wrap items-center justify-between gap-2 z-20">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 rounded bg-[#1E1F2A] border border-[#FF6B35] flex items-center justify-center">
            <MapPin className="w-3.5 h-3.5 text-[#FF6B35]" />
          </div>
          <div>
            <span className="text-white text-xs font-bold font-mono uppercase tracking-wider block">
              Google Maps Live Geospatial Triangulation
            </span>
            <span className="text-[#8A8B9A] text-[10px] font-mono">
              KERALA CYBER JURISDICTION • {currentPin.coords}
            </span>
          </div>
        </div>

        {/* Mode Selector */}
        <div className="flex items-center space-x-2">
          <div className="flex items-center bg-[#0B0C10] p-0.5 rounded-lg border border-[#1E1F2A] text-[10px] font-mono">
            <button
              onClick={() => setMapType('radar')}
              className={`px-2.5 py-1 rounded transition-colors ${
                mapType === 'radar' ? 'bg-[#FF6B35] text-[#0B0C10] font-bold' : 'text-[#8A8B9A] hover:text-white'
              }`}
            >
              TACTICAL RADAR
            </button>
            <button
              onClick={() => setMapType('satellite')}
              className={`px-2.5 py-1 rounded transition-colors ${
                mapType === 'satellite' ? 'bg-[#FF6B35] text-[#0B0C10] font-bold' : 'text-[#8A8B9A] hover:text-white'
              }`}
            >
              SATELLITE
            </button>
            <button
              onClick={() => setMapType('google')}
              className={`px-2.5 py-1 rounded transition-colors ${
                mapType === 'google' ? 'bg-[#FF6B35] text-[#0B0C10] font-bold' : 'text-[#8A8B9A] hover:text-white'
              }`}
            >
              LIVE EMBED
            </button>
          </div>

          <a
            href={googleMapsSearchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 bg-[#0B0C10] hover:bg-[#1E1F2A] text-[#FF6B35] hover:text-white rounded-lg border border-[#1E1F2A] transition-colors flex items-center space-x-1 text-[11px] font-mono px-2"
            title="Open in Google Maps"
          >
            <span>Google Maps</span>
            <ExternalLink className="w-3 h-3 ml-0.5" />
          </a>
        </div>
      </div>

      {/* Interactive Map Canvas Viewport */}
      <div className="relative w-full h-[320px] bg-[#0B0C10] overflow-hidden flex items-center justify-center">
        {mapType === 'google' ? (
          /* Live Google Map Iframe */
          <iframe
            title="Google Maps Kerala Police"
            src={`https://maps.google.com/maps?q=${currentPin.lat || 9.9726},${currentPin.lng || 76.2783}&z=14&output=embed`}
            className="w-full h-full border-0 invert-[0.92] hue-rotate-[185deg] contrast-[1.2] brightness-[0.85]"
            loading="lazy"
          />
        ) : (
          /* High-Fidelity Tactical Vector Map (100% Reliable & Stunning) */
          <>
            {/* Background Grid & Waterway Patterns */}
            <div 
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: mapType === 'satellite'
                  ? 'radial-gradient(#FF6B35 1px, transparent 1px)'
                  : 'linear-gradient(to right, #1E1F2A 1px, transparent 1px), linear-gradient(to bottom, #1E1F2A 1px, transparent 1px)',
                backgroundSize: '24px 24px',
                transform: `scale(${zoomLevel})`
              }}
            />

            {/* Tactical Coastline & Vector Corridors */}
            <svg 
              className="absolute inset-0 w-full h-full pointer-events-none transition-transform duration-300"
              style={{ transform: `scale(${zoomLevel})` }}
            >
              {/* Kerala Arabian Sea Coastline Schematic */}
              <path
                d="M 50 0 Q 120 100, 160 200 T 110 320"
                fill="none"
                stroke="#1E1F2A"
                strokeWidth="8"
                strokeLinecap="round"
                className="opacity-40"
              />

              {/* Signal Path Vectors */}
              <polyline
                points="38%,55% 55%,38% 35%,72% 72%,22% 20%,84%"
                fill="none"
                stroke="#FF6B35"
                strokeWidth="1.5"
                strokeDasharray="4,4"
                className="opacity-75"
              />

              {/* Cell Coverage Radii */}
              <circle cx="38%" cy="55%" r="42" fill="rgba(255,107,53,0.06)" stroke="#FF6B35" strokeWidth="1" strokeDasharray="3,3" />
              <circle cx="55%" cy="38%" r="30" fill="rgba(255,107,53,0.04)" stroke="#FF6B35" strokeWidth="1" strokeDasharray="3,3" />
              <circle cx="35%" cy="72%" r="34" fill="rgba(255,107,53,0.04)" stroke="#1E1F2A" strokeWidth="1" />
            </svg>

            {/* Interactive Pins */}
            <div 
              className="absolute inset-0 transition-transform duration-300 pointer-events-auto"
              style={{ transform: `scale(${zoomLevel})` }}
            >
              {points.map((point) => {
                const pos = pinPositions[point.id] || { x: 50, y: 50 };
                const isSelected = activePinId === point.id;

                return (
                  <div
                    key={point.id}
                    onClick={() => handlePinSelect(point)}
                    style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-10"
                  >
                    {isSelected && (
                      <div className="absolute -inset-2 rounded-full bg-[#FF6B35]/25 animate-ping" />
                    )}

                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                        isSelected
                          ? 'bg-[#FF6B35] text-[#0B0C10] shadow-accent-glow font-bold scale-110'
                          : 'bg-[#15161D] border border-[#FF6B35] text-[#FF6B35] hover:scale-105'
                      }`}
                    >
                      <MapPin className="w-4 h-4" />
                    </div>

                    <div className={`absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[9px] font-mono px-2 py-0.5 rounded border transition-colors ${
                      isSelected
                        ? 'bg-[#FF6B35] text-[#0B0C10] border-[#FF6B35] font-bold shadow-lg'
                        : 'bg-[#15161D] text-white border-[#1E1F2A]'
                    }`}>
                      {point.tag}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* Radar Scanner Badge */}
        <div className="absolute top-3 left-3 flex items-center space-x-2 bg-[#15161D]/90 border border-[#1E1F2A] px-2.5 py-1 rounded-lg z-20 text-[10px] font-mono shadow-md backdrop-blur-sm">
          <Crosshair className="w-3.5 h-3.5 text-[#FF6B35] animate-spin" />
          <span className="text-white font-bold">{currentPin.name.split(',')[0]}</span>
          <span className="text-[#00C853]">● LIVE</span>
        </div>

        {/* Zoom In/Out Controls */}
        <div className="absolute bottom-3 right-3 flex items-center space-x-1 bg-[#15161D]/90 border border-[#1E1F2A] p-1 rounded-lg z-20">
          <button
            onClick={() => setZoomLevel(prev => Math.min(prev + 0.2, 1.8))}
            className="p-1 text-[#8A8B9A] hover:text-white"
            title="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <span className="text-[10px] font-mono text-white px-1">
            {Math.round(zoomLevel * 100)}%
          </span>
          <button
            onClick={() => setZoomLevel(prev => Math.max(prev - 0.2, 0.8))}
            className="p-1 text-[#8A8B9A] hover:text-white"
            title="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Location Details Strip */}
      <div className="p-3 bg-[#15161D] border-t border-[#1E1F2A] grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
        <div className="p-2.5 bg-[#0B0C10] border border-[#1E1F2A] rounded-lg">
          <span className="text-[10px] font-mono text-[#8A8B9A] uppercase block">SELECTED GPS NODE</span>
          <span className="text-white font-bold text-xs truncate block mt-0.5">{currentPin.name}</span>
          <span className="text-[#FF6B35] text-[11px] font-mono">{currentPin.coords}</span>
        </div>

        <div className="p-2.5 bg-[#0B0C10] border border-[#1E1F2A] rounded-lg">
          <span className="text-[10px] font-mono text-[#8A8B9A] uppercase block">SIGNAL ACTIVITY</span>
          <span className="text-white font-medium text-xs truncate block mt-0.5">{currentPin.activity}</span>
          <span className="text-[#00C853] text-[10px] font-mono">Channel: {currentPin.platform}</span>
        </div>

        <div className="p-2.5 bg-[#0B0C10] border border-[#1E1F2A] rounded-lg flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono text-[#8A8B9A] uppercase block">CELL TOWER ACCURACY</span>
            <span className="text-white font-mono font-bold text-sm">{currentPin.radius}</span>
            <span className="text-[#8A8B9A] text-[9px] font-mono block">{currentPin.time}</span>
          </div>
          <span className="px-2.5 py-1 bg-[#15161D] border border-[#00C853] text-[#00C853] text-[11px] font-mono font-bold rounded">
            LOCKED
          </span>
        </div>
      </div>
    </div>
  );
}
