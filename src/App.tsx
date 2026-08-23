import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { PublicLandingPage } from './components/PublicLandingPage';
import { DashboardOverview } from './components/DashboardOverview';
import { MaintenanceDashboard } from './components/MaintenanceDashboard';
import { AiCopilotAndInsights } from './components/AiCopilotAndInsights';
import { FleetTableWithExport } from './components/FleetTableWithExport';
import { DriverPortal } from './components/DriverPortal';
import { ContactHubModal } from './components/ContactHubModal';
import { AdminLoginModal } from './components/AdminLoginModal';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'public' | 'dashboard' | 'manutencao' | 'insights' | 'frota' | 'motorista'>('public');
  const [userRole, setUserRole] = useState<'admin' | 'driver'>('driver');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [isAdminLoginModalOpen, setIsAdminLoginModalOpen] = useState(false);
  const [isContactHubOpen, setIsContactHubOpen] = useState(false);

  const handleSelectAdminRole = () => {
    if (!isAdminAuthenticated) {
      setIsAdminLoginModalOpen(true);
    } else {
      setUserRole('admin');
      setActiveTab('dashboard');
    }
  };

  const handleAdminLoginSuccess = () => {
    setIsAdminAuthenticated(true);
    setUserRole('admin');
    setActiveTab('dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 font-sans antialiased selection:bg-emerald-500 selection:text-slate-950">
      {/* Top Sticky Navigation with Role Switcher */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        userRole={userRole}
        setUserRole={setUserRole}
        onOpenContactHub={() => setIsContactHubOpen(true)}
        onSelectAdminRole={handleSelectAdminRole}
        isAdminAuthenticated={isAdminAuthenticated}
      />

      {/* Main Content Area */}
      <main className="transition-all">
        {activeTab === 'public' && (
          <PublicLandingPage
            onOpenContactHub={() => setIsContactHubOpen(true)}
            onGoToDashboard={() => {
              if (isAdminAuthenticated) {
                setActiveTab('dashboard');
              } else {
                setIsAdminLoginModalOpen(true);
              }
            }}
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

      <AdminLoginModal
        isOpen={isAdminLoginModalOpen}
        onClose={() => setIsAdminLoginModalOpen(false)}
        onLoginSuccess={handleAdminLoginSuccess}
      />
    </div>
  );
};

export default App;
