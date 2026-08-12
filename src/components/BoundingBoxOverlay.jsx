import React from 'react';

export default function BoundingBoxOverlay({ detections }) {
  if (!detections || detections.length === 0) return null;

  return (
    <div className="absolute inset-0 pointer-events-none">
      {detections.map(det => (
        <div
          key={det.id}
          className="absolute animate-fade-in"
          style={{
            left: `${det.bbox.x}%`,
            top: `${det.bbox.y}%`,
            width: `${det.bbox.w}%`,
            height: `${det.bbox.h}%`,
          }}
        >
          {/* Box */}
          <div className={`w-full h-full border-2 ${
            det.type === 'VICTIM' ? 'border-[#00C853]' : 'border-[#FF1744]'
          }`}>
            {/* Label */}
            <div className={`absolute -top-6 left-0 px-2 py-0.5 text-[10px] font-bold uppercase ${
              det.type === 'VICTIM' ? 'bg-[#00C853] text-black' : 'bg-[#FF1744] text-white'
            }`}>
              {det.type} {det.confidence}%
            </div>
            
            {/* Corner accents */}
            <div className="absolute -top-1 -left-1 w-2 h-2 border-t-2 border-l-2 border-white"></div>
            <div className="absolute -top-1 -right-1 w-2 h-2 border-t-2 border-r-2 border-white"></div>
            <div className="absolute -bottom-1 -left-1 w-2 h-2 border-b-2 border-l-2 border-white"></div>
            <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b-2 border-r-2 border-white"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
