export const mockDetections = [
  {
    id: 1,
    time: "00:05",
    seconds: 5,
    type: "SUSPECT",
    confidence: 89,
    camera: "CAM-03",
    behavior: "LOITERING",
    bbox: { x: 45, y: 30, w: 12, h: 18 }, // percentages for responsive overlay
    reason: "Face match 89% with uploaded suspect photo"
  },
  {
    id: 2,
    time: "00:12",
    seconds: 12,
    type: "VICTIM",
    confidence: 94,
    camera: "CAM-03",
    behavior: null,
    bbox: { x: 60, y: 25, w: 10, h: 16 },
    reason: "Face match 94% with uploaded victim photo"
  },
  {
    id: 3,
    time: "00:18",
    seconds: 18,
    type: "SUSPECT",
    confidence: 92,
    camera: "CAM-03",
    behavior: "FOLLOWING",
    bbox: { x: 46, y: 31, w: 11, h: 17 },
    reason: "Proximity to victim decreasing. Grooming keywords matched in WhatsApp."
  }
];

export const amberShieldData = {
  activatedAt: 18, // seconds
  timeToContact: 272,
  victimLocation: { lat: 10.0159, lng: 76.3419 },
  suspectLocation: { lat: 10.0185, lng: 76.3380 }
};
