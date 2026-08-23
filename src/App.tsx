import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { PublicLandingPage } from './components/PublicLandingPage';
import { DashboardOverview } from './components/DashboardOverview';
import { MaintenanceDashboard } from './components/MaintenanceDashboard';
import { AiCopilotAndInsights } from './components/AiCopilotAndInsights';
import { FleetTableWithExport } from './components/FleetTableWithExport';
import { DriverPortal } from './components/DriverPortal';
import { ContactHubModal } from './components/ContactHubModal';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'public' | 'dashboard' | 'manutencao' | 'insights' | 'frota' | 'motorista'>('dashboard');
  const [userRole, setUserRole] = useState<'admin' | 'driver'>('admin');
  const [isContactHubOpen, setIsContactHubOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 font-sans antialiased selection:bg-emerald-500 selection:text-slate-950">
      {/* Top Sticky Navigation with Role Switcher */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        userRole={userRole}
        setUserRole={setUserRole}
        onOpenContactHub={() => setIsContactHubOpen(true)}
      />

      {/* Main Content Area */}
      <main className="transition-all">
        {activeTab === 'public' && (
          <PublicLandingPage
            onOpenContactHub={() => setIsContactHubOpen(true)}
            onGoToDashboard={() => setActiveTab(userRole === 'admin' ? 'dashboard' : 'motorista')}
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

      {/* Contact Hub Modal */}
      <ContactHubModal
        isOpen={isContactHubOpen}
        onClose={() => setIsContactHubOpen(false)}
      />
    </div>
  );
};

export default App;
