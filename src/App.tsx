import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { PublicLandingPage } from './components/PublicLandingPage';
import { DashboardOverview } from './components/DashboardOverview';
import { MaintenanceDashboard } from './components/MaintenanceDashboard';
import { AiCopilotAndInsights } from './components/AiCopilotAndInsights';
import { FleetTableWithExport } from './components/FleetTableWithExport';
import { RentalManagement } from './components/RentalManagement';
import { AddVehicleModal } from './components/AddVehicleModal';
import { SettingsModal } from './components/SettingsModal';
import { DriverPortal } from './components/DriverPortal';
import { ContactHubModal } from './components/ContactHubModal';
import { AuthModal, UserProfile } from './components/AuthModal';

import {
  Vehicle,
  Contract,
  PastRental,
  MaintenanceRule,
  AppSettings,
  ThemeMode
} from './types/fleet';
import {
  mockVehicles,
  mockContracts,
  mockPastRentals,
  mockMaintenanceRules,
  defaultAppSettings
} from './lib/mock-data';
import { calculateRemainingKm } from './lib/utils/calculations';
import { sendPushNotification } from './lib/notifications';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'public' | 'dashboard' | 'manutencao' | 'insights' | 'frota' | 'locacoes' | 'motorista'>('public');
  const [userRole, setUserRole] = useState<'admin' | 'driver'>('driver');
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [isDriverAuthenticated, setIsDriverAuthenticated] = useState(false);
  
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalInitialRole, setAuthModalInitialRole] = useState<'admin' | 'driver'>('driver');
  const [isContactHubOpen, setIsContactHubOpen] = useState(false);
  const [isAddVehicleOpen, setIsAddVehicleOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Global State for Vehicles, Contracts, Past Rentals, Maintenance Rules and Settings
  const [vehicles, setVehicles] = useState<Vehicle[]>(mockVehicles);
  const [contracts, setContracts] = useState<Contract[]>(mockContracts);
  const [pastRentals, setPastRentals] = useState<PastRental[]>(mockPastRentals);
  const [maintenanceRules, setMaintenanceRules] = useState<MaintenanceRule[]>(mockMaintenanceRules);
  const [settings, setSettings] = useState<AppSettings>(defaultAppSettings);

  // Load saved profile & settings from localStorage
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

      const savedSettings = localStorage.getItem('cabral_settings');
      if (savedSettings) {
        setSettings(JSON.parse(savedSettings));
      }
    } catch {
      // ignore
    }
  }, []);

  // Sync theme with HTML root class
  useEffect(() => {
    if (settings.theme === 'light') {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
    }
  }, [settings.theme]);

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

  // Add new vehicle to fleet & inventory
  const handleAddVehicle = (newVehicle: Vehicle) => {
    setVehicles(prev => [newVehicle, ...prev]);
    sendPushNotification(
      '🚗 Novo Carro Cadastrado!',
      `${newVehicle.model} (${newVehicle.plate}) foi adicionado ao estoque da Cabral Locações.`
    );
  };

  // Add new contract (starts a rental)
  const handleAddContract = (newContract: Contract) => {
    setContracts(prev => [newContract, ...prev]);
    // Mark vehicle as rented
    setVehicles(prev => prev.map(v => 
      v.id === newContract.vehicleId || v.plate === newContract.vehiclePlate 
        ? { ...v, status: 'rented', currentDriver: newContract.driverName } 
        : v
    ));
    sendPushNotification(
      '🔑 Nova Locação Confirmada!',
      `Carro ${newContract.vehicleModel} entregue para o motorista ${newContract.driverName}.`
    );
  };

  // End contract (returns car, refunds deposit, adds to past rentals)
  const handleEndRental = (contractId: string, endKm: number, notes: string) => {
    const contract = contracts.find(c => c.id === contractId);
    if (!contract) return;

    const vehicle = vehicles.find(v => v.plate === contract.vehiclePlate);
    const startKm = vehicle ? Math.max(0, endKm - (contract.weeksRented * 1200)) : 0;
    const totalKmDriven = endKm - startKm;

    const newPast: PastRental = {
      id: `past-${Date.now()}`,
      vehiclePlate: contract.vehiclePlate,
      vehicleModel: contract.vehicleModel,
      driverName: contract.driverName,
      driverPhone: contract.driverPhone,
      driverCnh: contract.driverCnh,
      startDate: new Date(Date.now() - contract.weeksRented * 7 * 24 * 60 * 60 * 1000).toLocaleDateString('pt-BR'),
      endDate: new Date().toLocaleDateString('pt-BR'),
      totalWeeks: contract.weeksRented,
      totalPaid: contract.rate * contract.weeksRented,
      depositAmount: contract.depositAmount || 800,
      depositStatus: 'refunded',
      startKm,
      endKm,
      totalKmDriven,
      conditionNotes: notes
    };

    setPastRentals(prev => [newPast, ...prev]);
    setContracts(prev => prev.filter(c => c.id !== contractId));
    
    // Free the vehicle and update its KM
    setVehicles(prev => prev.map(v => 
      v.plate === contract.vehiclePlate 
        ? { ...v, status: 'available', currentKm: endKm, currentDriver: undefined } 
        : v
    ));

    sendPushNotification(
      '✅ Devolução Concluída',
      `Carro ${contract.vehiclePlate} devolvido por ${contract.driverName}. Caução liberada no PIX.`
    );
  };

  // Real-time odometer update (triggered by driver photo OCR or admin edit)
  const handleUpdateOdometer = (plate: string, newKm: number) => {
    // 1. Update vehicle odometer
    setVehicles(prev => prev.map(v => v.plate === plate ? { ...v, currentKm: newKm } : v));

    // 2. Recalculate maintenance countdowns and status for this vehicle
    setMaintenanceRules(prev => prev.map(rule => {
      if (rule.vehiclePlate === plate) {
        const calc = calculateRemainingKm(newKm, rule.initialKm, rule.intervalKm);
        return {
          ...rule,
          currentKm: newKm,
          remainingKm: calc.remainingKm,
          percentageReached: calc.percentage,
          status: calc.status
        };
      }
      return rule;
    }));
  };

  // Toggle Theme (Light / Dark)
  const handleToggleTheme = () => {
    const nextTheme: ThemeMode = settings.theme === 'dark' ? 'light' : 'dark';
    const updated = { ...settings, theme: nextTheme };
    setSettings(updated);
    try {
      localStorage.setItem('cabral_settings', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const handleUpdateSettings = (newSettings: AppSettings) => {
    setSettings(newSettings);
    try {
      localStorage.setItem('cabral_settings', JSON.stringify(newSettings));
    } catch {
      // ignore
    }
  };

  const isLight = settings.theme === 'light';

  return (
    <div className={`min-h-screen font-sans antialiased transition-colors duration-300 ${
      isLight ? 'bg-slate-100 text-slate-900 selection:bg-brand-500 selection:text-white' : 'bg-slate-950 text-slate-100 selection:bg-brand-500 selection:text-white'
    }`}>
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        userRole={userRole}
        userProfile={userProfile}
        onOpenAuthModal={handleOpenAuth}
        onLogout={handleLogout}
        onOpenContactHub={() => setIsContactHubOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        theme={settings.theme}
        onToggleTheme={handleToggleTheme}
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
            theme={settings.theme}
          />
        )}

        {activeTab === 'dashboard' && (
          <div className="p-4 sm:p-6 lg:p-8">
            <DashboardOverview
              vehicles={vehicles}
              contracts={contracts}
              maintenanceRules={maintenanceRules}
            />
          </div>
        )}

        {activeTab === 'locacoes' && (
          <div className="p-4 sm:p-6 lg:p-8">
            <RentalManagement
              contracts={contracts}
              vehicles={vehicles}
              pastRentals={pastRentals}
              onAddContract={handleAddContract}
              onEndRental={handleEndRental}
            />
          </div>
        )}

        {activeTab === 'frota' && (
          <div className="p-4 sm:p-6 lg:p-8">
            <FleetTableWithExport
              vehicles={vehicles}
              onOpenAddVehicle={() => setIsAddVehicleOpen(true)}
              onUpdateVehicleKm={handleUpdateOdometer}
            />
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

        {activeTab === 'motorista' && (
          <div className="p-4 sm:p-6 lg:p-8">
            <DriverPortal
              onOpenContactHub={() => setIsContactHubOpen(true)}
              onUpdateOdometer={handleUpdateOdometer}
            />
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

      <AddVehicleModal
        isOpen={isAddVehicleOpen}
        onClose={() => setIsAddVehicleOpen(false)}
        onAddVehicle={handleAddVehicle}
      />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onUpdateSettings={handleUpdateSettings}
      />
    </div>
  );
};

export default App;

