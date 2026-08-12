import React, { useState } from 'react';
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { KryptProvider } from './context/KryptContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import BottomAgentBar from './components/BottomAgentBar';
import CaseDebriefDrawer from './components/CaseDebriefDrawer';
import NewInvestigationModal from './components/NewInvestigationModal';
import ExportReportModal from './components/ExportReportModal';
import UploadEvidenceModal from './components/UploadEvidenceModal';
import CaseFileViewerModal from './components/CaseFileViewerModal';

import SentinelSplashScreen from './components/SentinelSplashScreen';

import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import EvidencePage from './pages/EvidencePage';
import AnalysisPage from './pages/AnalysisPage';
import ReportsPage from './pages/ReportsPage';
import KryptUploadPage from './pages/KryptUploadPage';
import KryptAnalysisPage from './pages/KryptAnalysisPage';
import { MOCK_CASE } from './data/forensicData';

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [showSplash, setShowSplash] = useState(true);
  const [activeCase, setActiveCase] = useState(MOCK_CASE);
  const [isDebriefOpen, setIsDebriefOpen] = useState(false);
  const [isNewInvestigationOpen, setIsNewInvestigationOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [selectedExportItem, setSelectedExportItem] = useState(null);
  
  // Case File Viewer Modal
  const [selectedCaseFile, setSelectedCaseFile] = useState(null);
  const [isCaseFileOpen, setIsCaseFileOpen] = useState(false);

  const isLoginPage = location.pathname === '/login';
  const isKryptPage = location.pathname === '/krypt' || location.pathname === '/krypt/analysis';
  const isSentinelPage = !isLoginPage && !isKryptPage;

  const handleOpenExport = (evidenceItem) => {
    setSelectedExportItem(evidenceItem || null);
    setIsExportOpen(true);
  };

  const handleOpenCaseFile = (doc) => {
    setSelectedCaseFile(doc);
    setIsCaseFileOpen(true);
  };

  const handleCaseInitialized = (newCaseData) => {
    setActiveCase(prev => ({
      ...prev,
      id: newCaseData.id,
      title: newCaseData.title,
      division: newCaseData.jurisdiction,
      leadInvestigator: newCaseData.leadOfficer,
      stats: {
        ...prev.stats,
        evidenceItems: newCaseData.evidenceItemsCount || prev.stats.evidenceItems
      }
    }));
    navigate('/dashboard');
  };

  return (
    <KryptProvider>
      {showSplash && <SentinelSplashScreen onComplete={() => setShowSplash(false)} />}
      <div className="min-h-screen bg-[#0B0C10] text-white flex flex-col selection:bg-[#FF6B35] selection:text-[#0B0C10]">
        {/* Navbar on all Sentinel pages */}
        {isSentinelPage && (
          <Navbar onOpenDebrief={() => setIsDebriefOpen(true)} />
        )}

        {/* Main Container */}
        <div className="flex-1 flex overflow-hidden">
          {/* Sidebar on all Sentinel pages */}
          {isSentinelPage && (
            <Sidebar onNewInvestigation={() => setIsNewInvestigationOpen(true)} />
          )}

          {/* Dynamic Route Content */}
          <main className="flex-1 overflow-y-auto bg-[#0B0C10]">
            <Routes>
              {/* KRYPT CCTV Surveillance Analyzer Pages */}
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/krypt" element={<KryptUploadPage />} />
              <Route path="/krypt/analysis" element={<KryptAnalysisPage />} />

              {/* SENTINEL Forensics Platform Pages */}
              <Route path="/login" element={<LoginPage />} />
              <Route 
                path="/dashboard" 
                element={
                  <DashboardPage 
                    onOpenDebrief={() => setIsDebriefOpen(true)} 
                    onOpenUpload={() => setIsUploadOpen(true)} 
                    onOpenCaseFile={handleOpenCaseFile}
                  />
                } 
              />
              <Route 
                path="/evidence" 
                element={
                  <EvidencePage 
                    onOpenExport={handleOpenExport} 
                    onOpenUpload={() => setIsUploadOpen(true)} 
                  />
                } 
              />
              <Route 
                path="/analysis" 
                element={<AnalysisPage onOpenDebrief={() => setIsDebriefOpen(true)} />} 
              />
              <Route 
                path="/reports" 
                element={
                  <ReportsPage 
                    onOpenExport={handleOpenExport} 
                    onOpenDebrief={() => setIsDebriefOpen(true)} 
                    onOpenCaseFile={handleOpenCaseFile}
                  />
                } 
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>

        {/* If on Sentinel pages, render Fixed Bottom Agent Bar */}
        {location.pathname !== '/login' && <BottomAgentBar />}

        {/* Modals and Slide-in Drawers */}
        <CaseDebriefDrawer
          isOpen={isDebriefOpen}
          onClose={() => setIsDebriefOpen(false)}
        />

        <NewInvestigationModal
          isOpen={isNewInvestigationOpen}
          onClose={() => setIsNewInvestigationOpen(false)}
          onCaseInitialized={handleCaseInitialized}
        />

        <ExportReportModal
          isOpen={isExportOpen}
          onClose={() => setIsExportOpen(false)}
          selectedEvidence={selectedExportItem}
        />

        <UploadEvidenceModal
          isOpen={isUploadOpen}
          onClose={() => setIsUploadOpen(false)}
        />

        <CaseFileViewerModal
          isOpen={isCaseFileOpen}
          onClose={() => setIsCaseFileOpen(false)}
          document={selectedCaseFile}
        />
      </div>
    </KryptProvider>
  );
}
