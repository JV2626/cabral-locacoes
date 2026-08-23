import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { PublicLandingPage } from './components/PublicLandingPage';
import { DashboardOverview } from './components/DashboardOverview';
import { MaintenanceDashboard } from './components/MaintenanceDashboard';
import { AiCopilotAndInsights } from './components/AiCopilotAndInsights';
import { FleetTableWithExport } from './components/FleetTableWithExport';
import { RentalManagement } from './components/RentalManagement';
import { CompanySettingsTab } from './components/CompanySettingsTab';
import { AddVehicleModal } from './components/AddVehicleModal';
import { EditVehicleModal } from './components/EditVehicleModal';
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
  const [activeTab, setActiveTab] = useState<'public' | 'dashboard' | 'manutencao' | 'insights' | 'frota' | 'locacoes' | 'motorista' | 'empresa'>('public');
  const [userRole, setUserRole] = useState<'admin' | 'driver'>('driver');
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [isDriverAuthenticated, setIsDriverAuthenticated] = useState(false);
  
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalInitialRole, setAuthModalInitialRole] = useState<'admin' | 'driver'>('driver');
  const [isContactHubOpen, setIsContactHubOpen] = useState(false);
  const [isAddVehicleOpen, setIsAddVehicleOpen] = useState(false);
  const [isEditVehicleOpen, setIsEditVehicleOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Global State for Vehicles, Contracts, Past Rentals, Maintenance Rules and Settings
  const [vehicles, setVehicles] = useState<Vehicle[]>(mockVehicles);
  const [contracts, setContracts] = useState<Contract[]>(mockContracts);
  const [pastRentals, setPastRentals] = useState<PastRental[]>(mockPastRentals);
  const [maintenanceRules, setMaintenanceRules] = useState<MaintenanceRule[]>(mockMaintenanceRules);
  const [settings, setSettings] = useState<AppSettings>(defaultAppSettings);

  // Load saved vehicles & settings from localStorage
  useEffect(() => {
    try {
      const savedVehicles = localStorage.getItem('cabral_vehicles');
      if (savedVehicles) {
        setVehicles(JSON.parse(savedVehicles));
      }

      const savedSettings = localStorage.getItem('cabral_settings');
      if (savedSettings) {
        setSettings(JSON.parse(savedSettings));
      }

      const savedProfile = localStorage.getItem('cabral_user_profile');
      if (savedProfile) {
        const parsed = JSON.parse(savedProfile) as UserProfile;
        setUserProfile(parsed);
        if (parsed.role === 'admin') {
          setIsAdminAuthenticated(true);
          setUserRole('admin');
        } else {
          setIsDriverAuthenticated(true);
          setUserRole('driver');
        }
      }
    } catch {
      // ignore
    }
  }, []);

  // Helper to persist vehicles to localStorage
  const persistVehicles = (updatedVehicles: Vehicle[]) => {
    setVehicles(updatedVehicles);
    try {
      localStorage.setItem('cabral_vehicles', JSON.stringify(updatedVehicles));
    } catch {
      // ignore
    }
  };

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
    sendPushNotification('🚪 Sessão Encerrada', 'Você saiu com segurança da sua conta Cabral Locações.');
  };

  // Add new vehicle to fleet & inventory
  const handleAddVehicle = (newVehicle: Vehicle) => {
    const updated = [newVehicle, ...vehicles];
    persistVehicles(updated);
    sendPushNotification(
      '🚗 Novo Carro Cadastrado!',
      `${newVehicle.model} (${newVehicle.plate}) foi adicionado ao estoque da Cabral Locações.`
    );
  };

  // Save edited vehicle
  const handleSaveEditedVehicle = (updatedVehicle: Vehicle) => {
    const updated = vehicles.map(v => v.id === updatedVehicle.id ? updatedVehicle : v);
    persistVehicles(updated);
    sendPushNotification(
      '✏️ Carro Atualizado!',
      `${updatedVehicle.model} (${updatedVehicle.plate}) teve suas informações e fotos salvas.`
    );
  };

  // Delete vehicle from fleet
  const handleDeleteVehicle = (vehicleId: string) => {
    const target = vehicles.find(v => v.id === vehicleId);
    const updated = vehicles.filter(v => v.id !== vehicleId);
    persistVehicles(updated);
    sendPushNotification(
      '🗑️ Carro Removido',
      `Veículo ${target?.model || ''} (${target?.plate || ''}) foi removido da frota.`
    );
  };

  // Add new rental contract
  const handleAddContract = (newContract: Contract) => {
    setContracts(prev => [newContract, ...prev]);
    // Mark vehicle as rented with current driver
    const updatedVehicles = vehicles.map(v => {
      if (v.plate === newContract.vehiclePlate) {
        return {
          ...v,
          status: 'rented' as const,
          currentDriver: newContract.driverName
        };
      }
      return v;
    });
    persistVehicles(updatedVehicles);

    sendPushNotification(
      '🔑 Nova Locação Concluída!',
      `Veículo ${newContract.vehiclePlate} retirado por ${newContract.driverName}.`
    );
  };

  // End rental contract & create historical record
  const handleEndRental = (contractId: string, endKm: number, conditionNotes: string) => {
    const contract = contracts.find(c => c.id === contractId);
    if (!contract) return;

    const vehicle = vehicles.find(v => v.plate === contract.vehiclePlate);
    const startKm = vehicle ? vehicle.currentKm : endKm - 1200;
    const totalKmDriven = Math.max(0, endKm - startKm);

    const pastRecord: PastRental = {
      id: `past-${Date.now()}`,
      contractId: contract.id,
      driverName: contract.driverName,
      driverPhone: contract.driverPhone,
      driverCnh: contract.driverCnh,
      vehicleModel: contract.vehicleModel,
      vehiclePlate: contract.vehiclePlate,
      startDate: '01/08/2026',
      endDate: new Date().toLocaleDateString('pt-BR'),
      totalWeeks: contract.weeksRented || 1,
      durationWeeks: contract.weeksRented || 1,
      totalPaid: (contract.rate * (contract.weeksRented || 1)),
      depositAmount: contract.depositAmount || 800,
      depositStatus: 'refunded',
      startKm,
      endKm,
      totalKmDriven,
      conditionNotes
    };

    setPastRentals(prev => [pastRecord, ...prev]);
    setContracts(prev => prev.filter(c => c.id !== contractId));

    // Release vehicle back to available status with new endKm
    const updatedVehicles = vehicles.map(v => {
      if (v.plate === contract.vehiclePlate) {
        return {
          ...v,
          status: 'available' as const,
          currentKm: endKm,
          currentDriver: undefined
        };
      }
      return v;
    });
    persistVehicles(updatedVehicles);

    sendPushNotification(
      '🏁 Devolução de Veículo Concluída',
      `Veículo ${contract.vehiclePlate} devolvido com ${endKm} km. Caução liberada no PIX!`
    );
  };

  // Real-time update of odometer
  const handleUpdateOdometer = (plate: string, newKm: number) => {
    const updatedVehicles = vehicles.map(v => {
      if (v.plate === plate) {
        return { ...v, currentKm: newKm };
      }
      return v;
    });
    persistVehicles(updatedVehicles);

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
  const isAdmin = Boolean(isAdminAuthenticated && userProfile?.role === 'admin');

  return (
    <div className={`min-h-screen font-sans antialiased ${
      isLight ? 'bg-slate-100 text-slate-900 selection:bg-brand-500 selection:text-white' : 'bg-slate-950 text-slate-100 selection:bg-brand-500 selection:text-white'
    }`}>
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          // Bloqueio rigoroso de rotas administrativas para usuários não autenticados
          const adminTabs = ['dashboard', 'locacoes', 'frota', 'manutencao', 'insights', 'empresa'];
          if (adminTabs.includes(tab) && !isAdmin) {
            handleOpenAuth('admin');
            return;
          }
          setActiveTab(tab as any);
        }}
        userRole={userRole}
        userProfile={userProfile}
        onOpenAuthModal={handleOpenAuth}
        onLogout={handleLogout}
        onOpenContactHub={() => setIsContactHubOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        theme={settings.theme}
        onToggleTheme={handleToggleTheme}
        isAdminAuthenticated={isAdmin}
        isDriverAuthenticated={isDriverAuthenticated}
      />

      {/* Main Content View */}
      <main>
        {activeTab === 'public' && (
          <PublicLandingPage
            onOpenContactHub={() => setIsContactHubOpen(true)}
            onGoToDashboard={() => {
              if (isAdmin) {
                setActiveTab('dashboard');
              } else {
                handleOpenAuth('admin');
              }
            }}
            onOpenDriverAuth={() => handleOpenAuth('driver')}
            theme={settings.theme}
            vehicles={vehicles}
            isAdmin={isAdmin}
            onEditVehicle={(vehicle) => {
              setEditingVehicle(vehicle);
              setIsEditVehicleOpen(true);
            }}
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
              onEditVehicle={(vehicle) => {
                setEditingVehicle(vehicle);
                setIsEditVehicleOpen(true);
              }}
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

        {activeTab === 'empresa' && (
          <div className="p-4 sm:p-6 lg:p-8">
            <CompanySettingsTab
              settings={settings}
              onUpdateSettings={handleUpdateSettings}
              isLight={isLight}
            />
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

      <EditVehicleModal
        isOpen={isEditVehicleOpen}
        onClose={() => {
          setIsEditVehicleOpen(false);
          setEditingVehicle(null);
        }}
        vehicle={editingVehicle}
        onSaveVehicle={handleSaveEditedVehicle}
        onDeleteVehicle={handleDeleteVehicle}
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
