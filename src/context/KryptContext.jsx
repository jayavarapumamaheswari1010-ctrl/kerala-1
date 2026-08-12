import React, { createContext, useContext, useState } from 'react';

const KryptContext = createContext();

export const DEFAULT_DETECTIONS = [
  {
    id: "det-1",
    timestamp: "00:34:12",
    displayTime: "00:34",
    seconds: 34,
    match: "VICTIM",
    confidence: 0.94,
    bbox: { x: 32, y: 24, width: 22, height: 48 }, // Percentage for responsive scaling
    pixelBbox: { x: 320, y: 180, width: 80, height: 100 },
    name: "Victim (Minor 15 Yrs)",
    details: "Detected near Sector 7 Promenade North Walkway"
  },
  {
    id: "det-2",
    timestamp: "01:15:45",
    displayTime: "01:15",
    seconds: 75,
    match: "SUSPECT",
    confidence: 0.89,
    bbox: { x: 48, y: 28, width: 24, height: 52 },
    pixelBbox: { x: 450, y: 200, width: 90, height: 110 },
    name: "Suspect Alpha (NexusLead)",
    details: "Black Hoodie, Red Backpack, Mobile in hand"
  },
  {
    id: "det-3",
    timestamp: "02:08:33",
    displayTime: "02:08",
    seconds: 128,
    match: "VICTIM",
    confidence: 0.91,
    bbox: { x: 30, y: 22, width: 20, height: 46 },
    pixelBbox: { x: 300, y: 170, width: 85, height: 105 },
    name: "Victim (Minor 15 Yrs)",
    details: "Exiting East Corridor towards Tower Base"
  }
];

export function KryptProvider({ children }) {
  const [victimFile, setVictimFile] = useState(null);
  const [victimPreview, setVictimPreview] = useState(null);
  const [suspectFile, setSuspectFile] = useState(null);
  const [suspectPreview, setSuspectPreview] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [videoFilename, setVideoFilename] = useState("CCTV_Sector7_MarineDrive_Live.mp4");
  const [detections, setDetections] = useState(DEFAULT_DETECTIONS);
  const [isAnalyzed, setIsAnalyzed] = useState(true);

  return (
    <KryptContext.Provider
      value={{
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
        detections,
        setDetections,
        isAnalyzed,
        setIsAnalyzed
      }}
    >
      {children}
    </KryptContext.Provider>
  );
}

export const useKrypt = () => useContext(KryptContext);
