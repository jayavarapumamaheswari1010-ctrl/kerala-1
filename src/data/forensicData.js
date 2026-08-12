export const MOCK_CASE = {
  id: "KP-2026-0812",
  title: "Operation CyberShield: Targeted Child Exploitation & Grooming Syndicate",
  status: "ACTIVE",
  lastSync: "02:45:11 UTC",
  priority: "CRITICAL",
  classification: "RESTRICTED / FORENSIC TIER-1",
  division: "Unit 7 Forensic Division",
  leadInvestigator: "Inspr. A. Rajesh, Cyberdome Thiruvananthapuram",
  courtName: "Special Court for POCSO & Cyber Offences, Ernakulam",
  policeStation: "Cyber Crime Police Station, Thiruvananthapuram",
  firNumber: "FIR No. 142/2026 (Cyberdome PS)",
  correlationNotice: {
    title: "CROSS-CASE CORRELATION DETECTED",
    matchedCase: "Kochi 2024 Case #KP-2024-0192",
    details: "Device IMEI & Telegram handle cluster matched flagged grooming syndicate node across Ernakulam & Kozhikode jurisdiction.",
    timestamp: "2026-08-11 02:41:09 UTC"
  },
  stats: {
    evidenceItems: 384,
    suspectsIdentified: 3,
    locationClusters: 5,
    chainIntegrity: "100%",
    suspiciousChats: 18,
    recoveredBinMails: 7,
    flaggedImages: 14,
    caseFilesReady: 6
  },
  threatLevel: {
    percentage: 85,
    severity: "CRITICAL",
    pattern: "Grooming Pattern Type-C detected in target sector.",
    subText: "Automated linguistic triage flagged coercive solicitation across 4 encrypted chat sessions and deleted draft emails."
  },
  digitalTracker: {
    title: "Digital Tracker — GPS Correlation & Cell Triangulation",
    centerName: "Kochi Marine Drive & Kakkanad Cyber Cluster",
    points: [
      { 
        id: "loc-1", 
        name: "Sector 7 Tower Base, Marine Drive, Kochi", 
        coords: "9.9726° N, 76.2783° E", 
        lat: 9.9726, 
        lng: 76.2783, 
        time: "08:14 UTC", 
        tag: "Primary Ping", 
        radius: "350m", 
        activity: "Suspect Device Registered (IMEI 864920048192841)",
        platform: "Telegram / Signal"
      },
      { 
        id: "loc-2", 
        name: "Infopark Phase-2 Gate, Kakkanad", 
        coords: "10.0159° N, 76.3639° E", 
        lat: 10.0159, 
        lng: 76.3639, 
        time: "07:30 UTC", 
        tag: "Handshake Node", 
        radius: "120m", 
        activity: "Bin Email Draft sync & WhatsApp message dispatch",
        platform: "Gmail / WhatsApp"
      },
      { 
        id: "loc-3", 
        name: "MG Road Cyber Cafe Node, Ernakulam", 
        coords: "9.9674° N, 76.2848° E", 
        lat: 9.9674, 
        lng: 76.2848, 
        time: "06:12 UTC", 
        tag: "Exfiltration Node", 
        radius: "500m", 
        activity: "Cloud backup mirror attempt detected",
        platform: "Instagram"
      },
      { 
        id: "loc-4", 
        name: "Calicut Beach Tower, Kozhikode", 
        coords: "11.2588° N, 75.7804° E", 
        lat: 11.2588, 
        lng: 75.7804, 
        time: "Yesterday 21:04 UTC", 
        tag: "Secondary Suspect", 
        radius: "800m", 
        activity: "Cross-case match suspect beacon",
        platform: "Discord"
      },
      { 
        id: "loc-5", 
        name: "Thiruvananthapuram Central Cyber Lab", 
        coords: "8.5241° N, 76.9366° E", 
        lat: 8.5241, 
        lng: 76.9366, 
        time: "Today 02:45 UTC", 
        tag: "Forensic Extraction HQ", 
        radius: "50m", 
        activity: "UFED Device Imaging & SHA-256 Verification",
        platform: "Hardware Dump"
      }
    ]
  },
  evidenceQueue: [
    {
      id: "ev-01",
      filename: "surveillance_cam_04.jpg",
      type: "image",
      platform: "CCTV Hardware",
      time: "08:12 AM",
      size: "4.2 MB",
      badge: "Exif Data Found",
      badgeType: "success",
      hash: "e9b2...884a",
      device: "Hikvision DS-2CD2043G2-I",
      gps: "9.9726° N, 76.2783° E"
    },
    {
      id: "ev-02",
      filename: "telegram_grooming_thread_01.json",
      type: "chat",
      platform: "Telegram",
      time: "07:55 AM",
      size: "8.1 MB",
      badge: "Threat Level: CRITICAL",
      badgeType: "danger",
      hash: "7c12...49a1",
      device: "Samsung Galaxy S21 Ultra",
      gps: "9.9726° N, 76.2783° E"
    },
    {
      id: "ev-03",
      filename: "bin_draft_extortion_recovery.eml",
      type: "mail",
      platform: "Gmail (Bin Recovered)",
      time: "07:45 AM",
      size: "2.4 MB",
      badge: "Deleted Mail Recovered",
      badgeType: "orange",
      hash: "5f8a...110d",
      device: "Apple MacBook Pro A2442",
      gps: "10.0159° N, 76.3639° E"
    },
    {
      id: "ev-04",
      filename: "mobile_full_dump_ufed.e01",
      type: "clone",
      platform: "Physical Mobile Clone",
      time: "06:30 AM",
      size: "128 GB",
      badge: "Physical Clone Complete",
      badgeType: "success",
      hash: "3d41...98bc",
      device: "SM-G998U1 (Android 14)",
      gps: "8.5241° N, 76.9366° E"
    }
  ],
  agents: [
    { name: "Evidence Custodian", status: "verified", dotColor: "#00C853", state: "green" },
    { name: "Pattern Hunter", status: "analyzing", dotColor: "#FF6B35", state: "orange-pulse" },
    { name: "Digital Tracker", status: "locked", dotColor: "#00C853", state: "green" },
    { name: "Threat Scout", status: "evaluating", dotColor: "#FF6B35", state: "orange-pulse" },
    { name: "Legal Section Analyzer", status: "ready", dotColor: "#00C853", state: "green" },
    { name: "Report Writer", status: "idle", dotColor: "#8A8B9A", state: "gray" }
  ]
};

// STATUTORY MANDATORY CASE FILES REQUIRED TO FILE CASE IN COURT
export const MANDATORY_CASE_FILES = [
  {
    id: "doc-01",
    code: "FORM-I / SEC 154 CrPC (BNSS 173)",
    title: "First Information Report (FIR No. 142/2026)",
    category: "Initial Police Complaint & FIR",
    requiredFor: "Initiation of Criminal Proceedings in Special POCSO Court",
    status: "REGISTERED & SIGNED",
    statusType: "success",
    authority: "Cyber Crime Police Station, Cyberdome",
    officer: "Inspr. A. Rajesh, SHO",
    date: "2026-08-10 16:00 UTC",
    sealId: "KP-FIR-2026-09918",
    sectionsFramed: [
      "BNS 2023 Sec 351(2) (Criminal Intimidation)",
      "BNS 2023 Sec 308(2) (Extortion by Threat)",
      "POCSO Act 2012 Sec 11 & 12 (Cyber Harassment of Child)",
      "IT Act 2000 Sec 67B (Child Grooming & Exploitation)",
      "IT Act 2000 Sec 66D & 66E (Impersonation & Privacy Violation)"
    ],
    content: `IN THE SPECIAL COURT FOR POCSO & CYBER OFFENCES, ERNAKULAM
FIRST INFORMATION REPORT (Under Section 154 Cr.P.C. / Section 173 BNSS 2023)

1. District: Cyber Crime PS Thiruvananthapuram | Year: 2026 | FIR No: 142/2026 | Date: 10/08/2026
2. Acts & Sections:
   (i) Bharatiya Nyaya Sanhita (BNS) 2023 - Sections 351(2), 351(3), 308(2), 78, 61(2)
   (ii) Protection of Children from Sexual Offences (POCSO) Act 2012 - Sections 11, 12, 14
   (iii) Information Technology Act 2000 - Sections 67B, 66D, 66E, 66F
3. Suspect Identifiers:
   - Primary Accused: Unknown / Alias "NexusLead" (Phone: +91 98470 99212, TG: @nexus_shadow)
   - Co-Conspirators: @cipher_kid_99, @byte_courier (Syndicate Node #KP-2024-0192)
4. Brief Facts of the Offence:
   The accused systematically targeted a 15-year-old minor victim under disguise of online gaming rewards. Subsequently initiated psychological isolation, coerced sensitive media transmission, and issued severe extortion threats to broadcast private files across school WhatsApp groups unless ransom was paid.
5. Action Taken: Case registered, digital evidence preserved under forensic seal KP-EV-9021.`
  },
  {
    id: "doc-02",
    code: "SEC 65B INDIAN EVIDENCE ACT / BSA SEC 63",
    title: "Section 65B Mandatory Forensic Admissibility Certificate",
    category: "Electronic Evidence Admissibility",
    requiredFor: "Mandatory condition for admitting electronic chats, emails & phone dumps as primary evidence",
    status: "CERTIFIED & CRYPTO-SEALED",
    statusType: "success",
    authority: "Kerala Police Cyberdome Digital Forensics Laboratory",
    officer: "Tech. Examiner M. Nair, EnCase / UFED Certified",
    date: "2026-08-11 01:15 UTC",
    sealId: "KP-65B-CERT-77412",
    sectionsFramed: ["Indian Evidence Act 1872 Sec 65B(4)", "Bharatiya Sakshya Adhiniyam 2023 Sec 63"],
    content: `CERTIFICATE UNDER SECTION 65B OF THE INDIAN EVIDENCE ACT, 1872
(Corresponding to Section 63 of Bharatiya Sakshya Adhiniyam, 2023)

I, M. Nair, Senior Cyber Forensics Examiner, Kerala Police Cyberdome, do hereby certify:
1. That I have lawful control over the forensic acquisition workstation Node-07 operating at Cyberdome Lab.
2. That on 10/08/2026, a physical bitstream image (.E01) was extracted from target device Samsung Galaxy S21 Ultra (Model: SM-G998U1, IMEI: 864920048192841) using Cellebrite UFED 4PC (Lic: KL-CYBER-88).
3. The cryptographic SHA-256 hash value of original device storage was:
   SHA-256: 3d41f891b00e82c140920491028374829104b2a8d11c7904e578291a0912cb84
4. The forensic acquisition and unallocated inode carving of WhatsApp databases, Telegram session caches, and deleted Gmail draft emails was carried out under clean write-blocking protocols.
5. The digital output produced in Exhibit Annexure 'A' through 'D' is an exact, uncorrupted, and bit-by-bit replica of data stored on the target device.`
  },
  {
    id: "doc-03",
    code: "SEC 102 CrPC / BNSS SEC 105",
    title: "Seizure Mahazar & Physical Chain of Custody Record",
    category: "Hardware & Media Seizure",
    requiredFor: "Proving lawful recovery of mobile phone, SIM cards, and hardware without tampering",
    status: "SEALED WITH 2 INDEPENDENT WITNESSES",
    statusType: "success",
    authority: "Special Action Group, Kochi Marine Drive",
    officer: "Sub-Inspr. K. Kumar, GD Entry #891",
    date: "2026-08-10 16:45 UTC",
    sealId: "MAHAZAR-KP-2026-440",
    sectionsFramed: ["Sec 100/102 CrPC", "ISO/IEC 27037 Digital Seizure Protocol"],
    content: `SEIZURE MAHAZAR / INVENTORY RECOVERY MEMO
(Prepared under Section 102 Code of Criminal Procedure / Section 105 BNSS)

Location of Seizure: Marine Drive Promenade, Near Sector 7 Tower Base, Kochi
Date & Time: 10th August 2026 at 16:45 Hours IST
Investigating Officer: SI K. Kumar, Cyber Crime Division

Seized Exhibits Description:
1. Exhibit 1 (MO-01): One Samsung Galaxy S21 Ultra smartphone, Phantom Black, IMEI 1: 864920048192841, IMEI 2: 864920048192842.
2. Exhibit 2 (MO-02): Airtel 5G Nano SIM Card (ICCID: 8991820491029410).
3. Exhibit 3 (MO-03): SanDisk 128GB MicroSD Card recovered from secret compartment.

Packaging & Sealing Details:
The device was powered off immediately and placed inside an RF Shielded Faraday Bag (Tamper Seal Tag: KL-POLICE-FARADAY-9941). Signed across the tamper tape by both independent witnesses.
Witness 1: Sri. George Mathew, Marine Drive, Kochi
Witness 2: Sri. Haridas V., High Court Junction, Kochi`
  },
  {
    id: "doc-04",
    code: "SEC 91 CrPC / BNSS SEC 94",
    title: "Emergency Preservation Notice to Intermediaries (Meta/Telegram/ISP)",
    category: "Statutory Law Enforcement Notice",
    requiredFor: "Compelling WhatsApp, Telegram, Google, and ISPs to lock IP logs, IMEI associations & cloud backups",
    status: "SERVED & ACKNOWLEDGED",
    statusType: "success",
    authority: "Cyber Crime Police Station, Cyberdome Thiruvananthapuram",
    officer: "Inspr. A. Rajesh, Investigating Officer",
    date: "2026-08-10 18:00 UTC",
    sealId: "SEC91-KP-2026-118",
    sectionsFramed: ["Section 91 Cr.P.C. / Section 94 BNSS", "Rule 3(1)(g) Information Technology Intermediary Rules 2021"],
    content: `STATUTORY NOTICE UNDER SECTION 91 Cr.P.C. / SECTION 94 BNSS 2023
FOR IMMEDIATE PRESERVATION OF SUBSCRIBER IDENTIFIERS & ACCESS LOGS

To:
1. Meta Platforms Inc. (Nodal Officer for WhatsApp India)
2. Telegram FZ-LLC (Grievance & Law Enforcement Response Officer)
3. Google India Pvt. Ltd. (Gmail & Cloud Recovery Division)
4. Bharti Airtel Ltd. & Reliance Jio Infocomm Ltd. (Kerala LSA)

SUBJECT: EMERGENCY PRESERVATION MANDATE - CASE CRIME NO. 142/2026 (POCSO & CYBER TERRORISM)

You are hereby commanded to immediately preserve all:
1. IP Connection Logs, NAT Port Translations, and IMSI bindings for +91 98470 99212.
2. Complete chat metadata and session creation endpoints for Telegram handle @nexus_shadow (User ID: 591024910).
3. Unallocated mailbox backups for email darknode.vault@proton.me and nexus.operator77@gmail.com.
4. You are legally required to preserve these records for 180 days under Rule 3(1)(g) of IT Rules 2021.`
  },
  {
    id: "doc-05",
    code: "SEC 173 CrPC / BNSS SEC 193",
    title: "Draft Final Police Report / Court Chargesheet",
    category: "Final Prosecution Chargesheet",
    requiredFor: "Formal framing of charges against suspect syndicate before the Honorable Court",
    status: "CHARGESHEET COMPILED",
    statusType: "orange",
    authority: "Office of the Superintendent of Police, Cyberdome",
    officer: "Inspr. A. Rajesh & Legal Advisor S. Pillai",
    date: "2026-08-11 02:30 UTC",
    sealId: "CHARGESHEET-KP-2026-0812",
    sectionsFramed: [
      "BNS 2023 Sec 351(2), 351(3), 308(2), 78, 61(2)",
      "POCSO Act 2012 Sec 11, 12, 14",
      "IT Act 2000 Sec 67B, 66D, 66E, 66F"
    ],
    content: `IN THE COURT OF THE SPECIAL JUDGE FOR POCSO ACT & CYBER CRIMES, ERNAKULAM
FINAL POLICE REPORT / CHARGESHEET (Under Section 173 Cr.P.C. / Section 193 BNSS 2023)

POLICE STATION: Cyberdome Cyber Crime PS | CRIME NO: 142/2026

1. Charge:
   The Accused A-1 (Suspect Alpha @nexus_shadow), along with A-2 and A-3, formed an organized online syndicate operating across Ernakulam, Kozhikode, and Thiruvananthapuram.
2. Overt Acts Proved by Digital Forensics:
   (i) Exhibit A: WhatsApp audio/text logs proving coercion of minor victim.
   (ii) Exhibit B: Inode carved deleted bin emails demanding crypto extortion.
   (iii) Exhibit C: Google Maps cell tower triangulation placing suspect in Sector 7 tower zone during timestamp 15:30:22 UTC.
   (iv) Exhibit D: Section 65B Indian Evidence Act Certificate signed by accredited examiner.
3. List of Witnesses:
   - CW-1: Minor Victim (Statement recorded under Sec 164 CrPC)
   - CW-2: Complainant (Parent)
   - CW-3: Tech Examiner M. Nair (Cyberdome Forensic Node 4)
   - CW-4: Independent Panch Witnesses for Seizure Mahazar
4. Prayer:
   It is humbly prayed that the Honorable Court may be pleased to take cognizance of the offences against the accused under BNS 351(2), 308(2), POCSO Sec 11/12, and IT Act Sec 67B, and issue Non-Bailable Arrest Warrants.`
  },
  {
    id: "doc-06",
    code: "FORM-IV / POCSO SEC 19(1)",
    title: "Mandatory Child Protection Reporting & Victim Statement Record",
    category: "POCSO Statutory Compliance",
    requiredFor: "Mandatory compliance under POCSO Act Section 19(1) for reporting child abuse",
    status: "CONFIDENTIAL / SEALED",
    statusType: "success",
    authority: "Child Welfare Committee (CWC) & Cyberdome Unit 7",
    officer: "W/SI Deepa V., Child Protection Unit",
    date: "2026-08-10 17:30 UTC",
    sealId: "CWC-KL-POCSO-2026-019",
    sectionsFramed: ["POCSO Act Sec 19(1)", "POCSO Act Sec 24(1)", "Juvenile Justice Act 2015"],
    content: `CONFIDENTIAL REPORT UNDER SECTION 19(1) OF THE POCSO ACT, 2012
MANDATORY REPORT TO CHILD WELFARE COMMITTEE (CWC), ERNAKULAM

1. Child Details: Master/Miss [Identity Redacted as per POCSO Sec 33(7)] | Age: 15 Years | School: [Redacted]
2. Person First Apprised: Mother of the victim on noticing sudden psychological distress and ransom threats on victim's phone.
3. Special Juvenile Police Unit (SJPU) Action:
   - Statement recorded in a child-friendly environment without police uniform.
   - Child provided immediate counseling through CWC accredited child psychologist.
   - Identity strictly sealed under POCSO Act Section 33(7) / 74 Juvenile Justice Act.`
  }
];

// REAL MULTI-MESSAGE SUSPICIOUS CHAT THREADS
export const SUSPICIOUS_CHATS = [
  {
    id: "chat-01",
    title: "WhatsApp Minor Grooming & Extortion",
    platform: "WhatsApp",
    platformIcon: "whatsapp",
    sender: "+91 98470 99212 (Alias: NexusLead)",
    receiver: "Victim (Minor, Age 15)",
    timestamp: "2026-08-10 15:30:22 UTC",
    threatLevel: "CRITICAL",
    threatCategory: "Grooming & Extortion",
    overallScore: "96% THREAT INDEX",
    suspicionSummary: "Step-by-step psychological isolation: Establishing secret communication, requesting private photos under disguise of gaming rewards, followed by overt blackmail with deadlines.",
    messages: [
      {
        id: "m1",
        sender: "suspect",
        text: "Hey! You played really well in the FreeFire tournament yesterday. I have the premium redeem code worth ₹5000 for you.",
        time: "15:10",
        suspicious: false,
        flag: null
      },
      {
        id: "m2",
        sender: "victim",
        text: "Really? Thank you! How do I get it?",
        time: "15:12",
        suspicious: false,
        flag: null
      },
      {
        id: "m3",
        sender: "suspect",
        text: "Keep this between us, okay? Don't tell your parents or friends in school. This is our private secret.",
        time: "15:15",
        suspicious: true,
        flag: {
          tactic: "Isolation & Secrecy Enforcement",
          score: "98%",
          reason: "Classic Stage-2 Grooming pattern to sever parental communication and establish exclusive dependency.",
          section: "POCSO Act Sec 11 (Sexual Harassment via Electronic Means)"
        }
      },
      {
        id: "m4",
        sender: "victim",
        text: "Okay I won't tell anyone.",
        time: "15:17",
        suspicious: false,
        flag: null
      },
      {
        id: "m5",
        sender: "suspect",
        text: "Send me 2 self-timer photos from your room to confirm it's you, then I will unlock the diamonds.",
        time: "15:20",
        suspicious: true,
        flag: {
          tactic: "Coercive Media Solicitation",
          score: "95%",
          reason: "Requesting unauthorized private media from a minor using deceptive incentive.",
          section: "IT Act Sec 67B (Child Exploitation & Solicitation)"
        }
      },
      {
        id: "m6",
        sender: "victim",
        text: "No I can't do that. I don't want the code anymore.",
        time: "15:25",
        suspicious: false,
        flag: null
      },
      {
        id: "m7",
        sender: "suspect",
        text: "Do not try to block me or tell police. I already recorded your video stream from yesterday. If you don't send the remaining photos by tonight, I will leak everything to your school WhatsApp group and your relatives.",
        time: "15:30",
        suspicious: true,
        flag: {
          tactic: "Overt Blackmail & Extortion Threat",
          score: "99%",
          reason: "Direct intimidation with intent to cause public disgrace and severe psychological trauma.",
          section: "BNS Sec 351(2) / IPC 506 (Criminal Intimidation) & BNS Sec 308(2) (Extortion)"
        }
      }
    ],
    courtSections: [
      {
        act: "BNS 2023 / IPC",
        section: "BNS Sec 351(2) / IPC Sec 506",
        title: "Criminal Intimidation",
        punishment: "Imprisonment up to 7 years, or fine, or both.",
        reasoning: "Threatening injury to reputation and mental harm with intent to cause alarm."
      },
      {
        act: "POCSO Act 2012",
        section: "POCSO Sec 11 & 12",
        title: "Sexual Harassment of a Child via Electronic Medium",
        punishment: "Rigorous imprisonment up to 3 years and fine.",
        reasoning: "Coercing a minor child for explicit media using electronic messaging."
      },
      {
        act: "Information Technology Act 2000",
        section: "IT Act Sec 67B",
        title: "Facilitating CSAM & Child Grooming",
        punishment: "Imprisonment up to 5 years (first conviction), up to 7 years (subsequent) + ₹10 Lakh fine.",
        reasoning: "Electronic solicitation and coercion targeting a person below eighteen years."
      },
      {
        act: "BNS 2023 / IPC",
        section: "BNS Sec 308(2) / IPC Sec 384",
        title: "Extortion by Threat of Disgrace",
        punishment: "Imprisonment up to 3 years, or fine, or both.",
        reasoning: "Putting victim in fear of public humiliation to extract sensitive files."
      }
    ]
  },
  {
    id: "chat-02",
    title: "Telegram Syndicate Coordination & Threat Nexus",
    platform: "Telegram",
    platformIcon: "telegram",
    sender: "@nexus_shadow (ID: 591024910)",
    receiver: "@cipher_courier_kl",
    timestamp: "2026-08-10 18:42:15 UTC",
    threatLevel: "CRITICAL",
    threatCategory: "Syndicate Retribution & Violence",
    overallScore: "94% THREAT INDEX",
    suspicionSummary: "Organized crime coordination: Hardware drop confirmation, violent threats against family members in case of law enforcement cooperation, and rotating cryptographic keys.",
    messages: [
      {
        id: "tg1",
        sender: "suspect",
        text: "Packet delivered to Kakkanad drop point near Infopark Gate 2. Hard drive sealed in anti-static bag.",
        time: "18:35",
        suspicious: true,
        flag: {
          tactic: "Physical Contraband Drop",
          score: "91%",
          reason: "Geospatial correlation with Sector 7 cell tower ping.",
          section: "BNS Sec 61(2) (Criminal Conspiracy)"
        }
      },
      {
        id: "tg2",
        sender: "victim",
        text: "Understood. The police were patrolling Marine Drive today, we should pause.",
        time: "18:38",
        suspicious: false,
        flag: null
      },
      {
        id: "tg3",
        sender: "suspect",
        text: "If anyone blabs to Cyberdome, you know what happens to your family. Keep the cloud drive keys rotating every 6 hours and wipe the session logs.",
        time: "18:42",
        suspicious: true,
        flag: {
          tactic: "Grievous Hurt Intimidation & Evidence Tampering",
          score: "98%",
          reason: "Direct threat against life of third-party family members and instruction to destroy digital logs.",
          section: "BNS Sec 351(3) / IPC 506 Part II & BNS Sec 238 (Destruction of Evidence)"
        }
      }
    ],
    courtSections: [
      {
        act: "BNS 2023 / IPC",
        section: "BNS Sec 351(3) / IPC Sec 506 Part II",
        title: "Criminal Intimidation (Threat to Cause Death/Grievous Hurt)",
        punishment: "Imprisonment up to 7 years, or fine, or both.",
        reasoning: "Direct threat against life and family members."
      },
      {
        act: "BNS 2023 / IPC",
        section: "BNS Sec 61(2) / IPC Sec 120B",
        title: "Criminal Conspiracy",
        punishment: "Same punishment as principal offence.",
        reasoning: "Organized conspiracy between multiple nodes for illicit trafficking of digital materials."
      },
      {
        act: "Information Technology Act 2000",
        section: "IT Act Sec 66F",
        title: "Cyber Terrorism / Organised Threat Nexus",
        punishment: "Imprisonment for life.",
        reasoning: "Threatening digital infrastructure and safety using encrypted distributed networks."
      }
    ]
  },
  {
    id: "chat-03",
    title: "Instagram Impersonation & Doxxing Attack",
    platform: "Instagram",
    platformIcon: "instagram",
    sender: "@shadow_glitch_09",
    receiver: "Victim (Minor)",
    timestamp: "2026-08-09 21:15:00 UTC",
    threatLevel: "HIGH",
    threatCategory: "Cyberstalking & Identity Impersonation",
    overallScore: "92% THREAT INDEX",
    suspicionSummary: "Creating a duplicate clone account of the victim's social media to harvest classmates and force acceptance of unauthorized private video calls.",
    messages: [
      {
        id: "ig1",
        sender: "suspect",
        text: "I made a clone account of your profile with your photos and school name. Already 45 of your classmates accepted the follow request.",
        time: "21:10",
        suspicious: true,
        flag: {
          tactic: "Identity Spoofing & Classmate Harvesting",
          score: "94%",
          reason: "Impersonation using computer resource with malicious intent to defame.",
          section: "IT Act Sec 66D (Cheating by Personation)"
        }
      },
      {
        id: "ig2",
        sender: "victim",
        text: "Why are you doing this? Please delete it, I will report you.",
        time: "21:12",
        suspicious: false,
        flag: null
      },
      {
        id: "ig3",
        sender: "suspect",
        text: "Accept my video call right now in private, or I will post edited pictures on that account and tag your entire school.",
        time: "21:15",
        suspicious: true,
        flag: {
          tactic: "Coercive Video Call Mandate",
          score: "96%",
          reason: "Extortion via threat of fabricated imagery broadcast.",
          section: "BNS Sec 78 / IPC 354D (Cyberstalking) & IT Act Sec 66E"
        }
      }
    ],
    courtSections: [
      {
        act: "Information Technology Act 2000",
        section: "IT Act Sec 66D",
        title: "Cheating by Personation using Computer Resource",
        punishment: "Imprisonment up to 3 years and fine up to ₹1 Lakh.",
        reasoning: "Creating duplicate fake profile to impersonate and deceive the minor."
      },
      {
        act: "BNS 2023 / IPC",
        section: "BNS Sec 78 / IPC Sec 354D",
        title: "Cyberstalking of Women / Children",
        punishment: "Imprisonment up to 3 years (first) / 5 years (second) + Fine.",
        reasoning: "Monitoring and persistently harassing victim across digital communication."
      },
      {
        act: "Information Technology Act 2000",
        section: "IT Act Sec 66E",
        title: "Violation of Bodily Privacy",
        punishment: "Imprisonment up to 3 years or fine up to ₹2 Lakh, or both.",
        reasoning: "Threatening unauthorized capture, transmission, and publication of private imagery."
      }
    ]
  }
];

// RECOVERED BIN / DELETED EMAILS
export const RECOVERED_BIN_MAILS = [
  {
    id: "mail-01",
    subject: "[DELETED DRAFT] Final Notice Regarding Archive KP-99",
    from: "darknode.vault@proton.me",
    to: "victim.backup99@gmail.com",
    recoveredFrom: "ProtonMail / Gmail Deleted Trash (Bin Sector)",
    deletionTimestamp: "2026-08-10 19:40:12 UTC",
    originalDate: "2026-08-10 19:35:00 UTC",
    threatScore: "95% - SEVERE",
    sha256: "d41d8cd98f00b204e9800998ecf8427e",
    body: "This is your last reminder. The Bitcoin wallet 1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa has not received payment. If transaction is not confirmed on blockchain by midnight, automated script will trigger archive blast across 12 public pastebins and Telegram channels.",
    aiFindings: "Intentional deletion detected 5 minutes after draft creation. Forensic carver recovered inode #488102 from unallocated disk space.",
    courtSections: [
      "BNS Sec 308(2) (Extortion)",
      "IT Act Sec 66D (Cyber Extortion)",
      "BNS Sec 351(2) (Criminal Intimidation)",
      "POCSO Act Sec 11/12"
    ]
  },
  {
    id: "mail-02",
    subject: "[TRASH RECOVERED] Telegram API bot token registration confirmation",
    from: "api@telegram.org",
    to: "nexus.operator77@gmail.com",
    recoveredFrom: "Gmail Trash Folder (Carved by AI Ingestion)",
    deletionTimestamp: "2026-08-09 08:14:22 UTC",
    originalDate: "2026-08-09 08:12:00 UTC",
    threatScore: "88% - EVIDENCE OF CONSPIRACY",
    sha256: "9e107d9d372bb6826bd81d3542a419d6",
    body: "Your bot @nexus_shadow_bot was successfully registered with Token: 7491028401:AAHk... This bot is authorized to manage channel broadcasts.",
    aiFindings: "Critical nexus evidence matching the automated distribution bot used to intimidate minor victims across Kerala.",
    courtSections: [
      "IT Act Sec 66 (Computer Related Offences)",
      "BNS Sec 61(2) (Criminal Conspiracy)",
      "IT Act Sec 67B (Child Protection Violation)"
    ]
  }
];

// EVIDENCE TREE HIERARCHY
export const EVIDENCE_TREE_DATA = [
  {
    id: "whatsapp",
    name: "WhatsApp",
    type: "folder",
    icon: "message-square",
    count: 142,
    children: [
      { id: "wa-chats", name: "Chats_Export_Grooming.enc", type: "file", icon: "file-text" },
      { id: "wa-media", name: "Media_Shared_Flagged", type: "folder", icon: "folder" }
    ]
  },
  {
    id: "telegram",
    name: "Telegram Syndicate",
    type: "folder",
    icon: "send",
    count: 89,
    children: [
      { id: "tg-nexus", name: "@nexus_shadow_threads.json", type: "file", icon: "file-code" },
      { id: "tg-tokens", name: "Bot_Tokens_Carved.txt", type: "file", icon: "file" }
    ]
  },
  {
    id: "instagram",
    name: "Instagram Direct",
    type: "folder",
    icon: "camera",
    count: 38,
    children: [
      { id: "ig-direct", name: "Direct_Messages_Threat.json", type: "file", icon: "file-code" },
      { id: "ig-cache", name: "Stories_Cache.tmp", type: "file", icon: "file" }
    ]
  },
  {
    id: "bin-mails",
    name: "Recovered Bin & Trash Mails",
    type: "folder",
    icon: "mail",
    count: 7,
    highlight: true,
    children: [
      { id: "mail-draft-1", name: "Extortion_Draft_01.eml", type: "file", icon: "file-text" },
      { id: "mail-bot-2", name: "Telegram_Bot_Token.eml", type: "file", icon: "file-text" }
    ]
  },
  {
    id: "case-files",
    name: "Statutory Court Case Files (Mandatory)",
    type: "folder",
    icon: "scale",
    count: 6,
    highlight: true,
    children: [
      { id: "cf-1", name: "FIR_No_142_2026.pdf", type: "file", icon: "file-text" },
      { id: "cf-2", name: "Sec_65B_Forensic_Certificate.pdf", type: "file", icon: "file-text" },
      { id: "cf-3", name: "Seizure_Mahazar_Record.pdf", type: "file", icon: "file-text" },
      { id: "cf-4", name: "Sec_91_Intermediary_Notice.pdf", type: "file", icon: "file-text" },
      { id: "cf-5", name: "Draft_Court_Chargesheet.pdf", type: "file", icon: "file-text" }
    ]
  },
  {
    id: "device",
    name: "Physical Phone Clone (SM-G998U1)",
    type: "folder",
    icon: "smartphone",
    expanded: true,
    count: 108,
    children: [
      {
        id: "dcim",
        name: "DCIM (Camera & Media)",
        type: "folder",
        icon: "folder",
        expanded: true,
        children: [
          {
            id: "screenshots",
            name: "Flagged Screenshots",
            type: "folder",
            icon: "folder",
            selected: true,
            files: [
              {
                id: "img-01",
                name: "IMG_20231024_153022.png",
                path: "Device > Screenshots > IMG_20231024_153022.png",
                size: "3.4 MB",
                verified: true,
                hash: "a3f7619c9284bd09e2d1490218b76a0e5",
                deviceName: "Samsung Galaxy S21 Ultra (SM-G998U1)",
                gpsCoordinates: "9.9726° N, 76.2783° E (Marine Drive, Kochi)",
                timestamp: "2023-10-24T15:30:22Z",
                agentProcessed: "EXIF & OCR Extractor",
                threatLevel: "CRITICAL",
                courtSections: [
                  "BNS Sec 351(2) (Criminal Intimidation)",
                  "POCSO Sec 11/12 (Cyber Harassment of Minor)",
                  "IT Act Sec 67B (Child Grooming)"
                ],
                custody: [
                  {
                    step: 1,
                    title: "Physical Clone Acquired by Officer Kumar (Cellebrite UFED)",
                    time: "2023-10-24 16:45:00 UTC",
                    status: "done"
                  },
                  {
                    step: 2,
                    title: "Bit-Stream Image Ingested by Cyberdome Forensic Node 4",
                    time: "2023-10-24 18:12:33 UTC",
                    status: "done"
                  },
                  {
                    step: 3,
                    title: "Autonomous AI OCR & EXIF Triangulation Extracted",
                    time: "2023-10-24 18:13:01 UTC",
                    status: "active"
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
];

// CASE DEBRIEF DATA WITH TELUGU (తెలుగు), MALAYALAM, ENGLISH, HINDI, TAMIL
export const DEBRIEF_DATA = {
  languages: [
    { code: "te", label: "తెలుగు (Telugu)", localName: "Telugu" },
    { code: "ml", label: "മലയാളം (Malayalam)", localName: "Malayalam" },
    { code: "en", label: "English", localName: "English" },
    { code: "hi", label: "हिन्दी (Hindi)", localName: "Hindi" },
    { code: "ta", label: "தமிழ் (Tamil)", localName: "Tamil" }
  ],
  checklist: [
    { id: "c1", label: "Executive Threat Summary", completed: true },
    { id: "c2", label: "Multi-Platform Evidence Landscape (WhatsApp/TG/Bin)", completed: true },
    { id: "c3", label: "Linguistic Threat & Grooming Assessment", completed: true },
    { id: "c4", label: "Statutory Court Sections Mapped (BNS/POCSO/IT Act)", completed: true },
    { id: "c5", label: "Court Admissible Section 65B Certificate Ready", completed: true }
  ],
  contributors: "5 of 5 autonomous agents contributed...",
  officerName: "Officer Kavach",
  briefingTranscript: {
    te: "సైబర్డోమ్ సెంటినెల్ సిస్టమ్ ద్వారా కేసు కేపీ-2026-0812 యొక్క డిజిటల్ ఫోరెన్సిక్ విశ్లేషణ పూర్తయింది. వాట్సాప్, టెలిగ్రామ్, మరియు డిలీట్ చేసిన బిన్ ఈమెయిల్స్ ద్వారా మైనర్లను బెదిరిస్తున్న గ్రూమింగ్ సిండికేట్ను గుర్తించాము. సెక్షన్ 351(2) BNS, పోక్సో చట్టం సెక్షన్ 11/12, మరియు IT చట్టం సెక్షన్ 67B కింద నిందితులపై బలమైన సాక్ష్యాధారాలు సిద్ధం చేయబడ్డాయి. కొచ్చి 2024 కేసుతో సంబంధం ఉన్నట్లు ధృవీకరించబడింది.",
    ml: "കേരള പോലീസ് സൈബർഡോം സെന്റിനൽ പ്ലാറ്റ്‌ഫോം വഴി കേസ് KP-2026-0812 ലെ തെളിവുകൾ വിജയകരമായി വിശകലനം ചെയ്തു. വാട്ട്‌സ്ആപ്പ്, ടെലിഗ്രാം, ഡിലീറ്റ് ചെയ്ത ബിൻ ഇമെയിലുകൾ എന്നിവയിൽ നിന്നുള്ള വിവരങ്ങൾ പ്രകാരം കുട്ടികളെ ഭീഷണിപ്പെടുത്തുന്ന റാക്കറ്റിനെ കണ്ടെത്തി. ഭാരതീയ ന്യായ സംഹിത (BNS) സെക്ഷൻ 351(2), പോക്‌സോ ആക്ട് സെക്ഷൻ 11/12, ഐടി ആക്ട് 67B എന്നിവ പ്രകാരം ശക്തമായ പ്രോസിക്യൂഷൻ റിപ്പോർട്ട് തയ്യാറാക്കി.",
    en: "Kerala Police Cyberdome SENTINEL platform has synthesized multi-platform evidence for Case KP-2026-0812. Threat Scout identified severe grooming patterns across WhatsApp, Telegram, and recovered deleted bin emails. Complete court sections mapped under BNS Sec 351(2), POCSO Act Sec 11/12, and IT Act Sec 67B. Cross-correlation with Kochi 2024 docket confirmed.",
    hi: "केरल पुलिस साइबरडोम सेंटिनल प्लेटफॉर्म द्वारा केस KP-2026-0812 का पूर्ण फोरेंसिक विश्लेषण तैयार है। व्हाट्सएप, टेलीग्राम और डिलीटेड बिन ईमेल से बाल ग्रूमिंग सिंडिकेट की पुष्टि हुई है। बीएनएस धारा 351(2), पॉक्सो अधिनियम धारा 11/12, और आईटी अधिनियम 67B के तहत अदालती आरोप पत्र हेतु साक्ष्य सील कर दिए गए हैं।",
    ta: "கேரளா காவல் சைபர்டோம் சென்டினல் தளம் மூலம் வழக்கு KP-2026-0812 இன் பல்துறை தடயவியல் பகுப்பாய்வு முடிவடைந்தது. வாட்ஸ்அப், டெலிகிராம் மற்றும் அழிக்கப்பட்ட மின்னஞ்சல்களில் இருந்து அச்சுறுத்தல் தரவுகள் மீட்கப்பட்டன. BNS பிரிவு 351(2), போக்சோ சட்டம் பிரிவு 11/12, மற்றும் IT சட்டம் 67B இன் கீழ் நீதிமன்ற சான்றுகள் தயார்."
  },
  legalSummary: [
    { section: "BNS Sec 351(2) / IPC 506", crime: "Criminal Intimidation & Extortion Threat", penalty: "Up to 7 Yrs Imprisonment" },
    { section: "POCSO Act 2012 Sec 11 & 12", crime: "Cyber Harassment & Sexual Coercion of Child", penalty: "Rigorous 3 Yrs Imprisonment + Fine" },
    { section: "IT Act 2000 Sec 67B", crime: "Facilitating CSAM & Electronic Child Solicitation", penalty: "5 to 7 Yrs Imprisonment + ₹10 Lakh Fine" },
    { section: "IT Act 2000 Sec 66D & 66E", crime: "Impersonation & Privacy Violation", penalty: "3 Yrs Imprisonment + ₹2 Lakh Fine" }
  ]
};
