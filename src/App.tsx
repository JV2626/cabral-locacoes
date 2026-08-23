import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { PublicLandingPage } from './components/PublicLandingPage';
import { DashboardOverview } from './components/DashboardOverview';
import { MaintenanceDashboard } from './components/MaintenanceDashboard';
import { AiCopilotAndInsights } from './components/AiCopilotAndInsights';
import { FleetTableWithExport } from './components/FleetTableWithExport';
import { DriverPortal } from './components/DriverPortal';
import { ContactHubModal } from './components/ContactHubModal';
import { AuthModal, UserProfile } from './components/AuthModal';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'public' | 'dashboard' | 'manutencao' | 'insights' | 'frota' | 'motorista'>('public');
  const [userRole, setUserRole] = useState<'admin' | 'driver'>('driver');
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [isDriverAuthenticated, setIsDriverAuthenticated] = useState(false);
  
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalInitialRole, setAuthModalInitialRole] = useState<'admin' | 'driver'>('driver');
  const [isContactHubOpen, setIsContactHubOpen] = useState(false);

  // Load saved profile from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('cabral_user_profile');
      if (saved) {
        const parsed = JSON.parse(saved) as UserProfile;
        setUserProfile(parsed);
        if (parsed.role === 'admin') {
          setIsAdminAuthenticated(true);
        } else {
          setIsDriverAuthenticated(true);
        }
      }
    } catch {
      // ignore
    }
  }, []);

  const handleOpenAuth = (role: 'admin' | 'driver' = 'driver') => {
    setAuthModalInitialRole(role);
    setIsAuthModalOpen(true);
  };

  const handleAuthSuccess = (profile: UserProfile) => {
    setUserProfile(profile);
    setUserRole(profile.role);
    
    if (profile.role === 'admin') {
      setIsAdminAuthenticated(true);
      setActiveTab('dashboard');
    } else {
      setIsDriverAuthenticated(true);
      setActiveTab('motorista');
    }

    try {
      localStorage.setItem('cabral_user_profile', JSON.stringify(profile));
    } catch {
      // ignore
    }
  };

  const handleLogout = () => {
    setIsAdminAuthenticated(false);
    setIsDriverAuthenticated(false);
    setUserProfile(null);
    setUserRole('driver');
    setActiveTab('public');
    try {
      localStorage.removeItem('cabral_user_profile');
    } catch {
      // ignore
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-brand-500 selection:text-white">
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        userRole={userRole}
        userProfile={userProfile}
        onOpenAuthModal={handleOpenAuth}
        onLogout={handleLogout}
        onOpenContactHub={() => setIsContactHubOpen(true)}
        isAdminAuthenticated={isAdminAuthenticated}
        isDriverAuthenticated={isDriverAuthenticated}
      />

      {/* Main Content View */}
      <main className="transition-all">
        {activeTab === 'public' && (
          <PublicLandingPage
            onOpenContactHub={() => setIsContactHubOpen(true)}
            onGoToDashboard={() => {
              if (isAdminAuthenticated) {
                setActiveTab('dashboard');
              } else {
                handleOpenAuth('admin');
              }
            }}
            onOpenDriverAuth={() => handleOpenAuth('driver')}
          />
        )}

        {activeTab === 'dashboard' && (
          <div className="p-4 sm:p-6 lg:p-8">
            <DashboardOverview />
          </div>
        )}

        {activeTab === 'manutencao' && (
          <div className="p-4 sm:p-6 lg:p-8">
            <MaintenanceDashboard />
          </div>
        )}

        {activeTab === 'insights' && (
          <div className="p-4 sm:p-6 lg:p-8">
            <AiCopilotAndInsights />
          </div>
        )}

        {activeTab === 'frota' && (
          <div className="p-4 sm:p-6 lg:p-8">
            <FleetTableWithExport />
          </div>
        )}

        {activeTab === 'motorista' && (
          <div className="p-4 sm:p-6 lg:p-8">
            <DriverPortal onOpenContactHub={() => setIsContactHubOpen(true)} />
          </div>
        )}
      </main>

      {/* Modals */}
      <ContactHubModal
        isOpen={isContactHubOpen}
        onClose={() => setIsContactHubOpen(false)}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        initialRole={authModalInitialRole}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={handleAuthSuccess}
      />
    </div>
  );
};

export default App;
