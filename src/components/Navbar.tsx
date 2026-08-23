import React, { useState } from 'react';
import { BrandLogo } from './BrandLogo';
import { NotificationsDropdown } from './NotificationsDropdown';
import { UserProfile } from './AuthModal';
import {
  WhatsAppIcon,
  GlobeIcon,
  ChartIcon,
  WrenchIcon,
  SparklesIcon,
  CarIcon,
  BellIcon,
  KeyIcon
} from './Icons';

interface NavbarProps {
  activeTab: 'public' | 'dashboard' | 'manutencao' | 'insights' | 'frota' | 'motorista';
  setActiveTab: (tab: 'public' | 'dashboard' | 'manutencao' | 'insights' | 'frota' | 'motorista') => void;
  userRole: 'admin' | 'driver';
  userProfile: UserProfile | null;
  onOpenAuthModal: (role?: 'admin' | 'driver') => void;
  onLogout: () => void;
  onOpenContactHub: () => void;
  isAdminAuthenticated: boolean;
  isDriverAuthenticated: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  userRole,
  userProfile,
  onOpenAuthModal,
  onLogout,
  onOpenContactHub,
  isAdminAuthenticated,
  isDriverAuthenticated
}) => {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-brand-dark/95 backdrop-blur-md border-b border-slate-800 text-white shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Brand Official Logo */}
          <BrandLogo size="md" onClick={() => setActiveTab('public')} />

          {/* Center Navigation Tabs */}
          <nav className="hidden lg:flex items-center space-x-1 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800 shadow-inner">
            <button
              onClick={() => setActiveTab('public')}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'public'
                  ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/25 font-black'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
              }`}
            >
              <GlobeIcon className="w-4 h-4" />
              <span>Site da Marca</span>
            </button>

            {userRole === 'admin' && isAdminAuthenticated ? (
              <>
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeTab === 'dashboard'
                      ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/25 font-black'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                  }`}
                >
                  <ChartIcon className="w-4 h-4" />
                  <span>10 KPIs</span>
                </button>
                <button
                  onClick={() => setActiveTab('manutencao')}
                  className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeTab === 'manutencao'
                      ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/25 font-black'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                  }`}
                >
                  <WrenchIcon className="w-4 h-4" />
                  <span>Manutenção por KM</span>
                </button>
                <button
                  onClick={() => setActiveTab('insights')}
                  className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeTab === 'insights'
                      ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/25 font-black'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                  }`}
                >
                  <SparklesIcon className="w-4 h-4" />
                  <span>Insights IA</span>
                </button>
                <button
                  onClick={() => setActiveTab('frota')}
                  className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeTab === 'frota'
                      ? 'bg-slate-700 text-white shadow-lg font-black'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                  }`}
                >
                  <CarIcon className="w-4 h-4" />
                  <span>Frota</span>
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  if (isDriverAuthenticated) {
                    setActiveTab('motorista');
                  } else {
                    onOpenAuthModal('driver');
                  }
                }}
                className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'motorista'
                    ? 'bg-brand-cyan text-slate-950 shadow-lg shadow-brand-cyan/20 font-black'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                }`}
              >
                <CarIcon className="w-4 h-4" />
                <span>Portal do Motorista (Uber/99)</span>
              </button>
            )}
          </nav>

          {/* Right Action Controls: Login Profile, Bell, Official WhatsApp */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            
            {/* Notification Bell (for logged Admin) */}
            {isAdminAuthenticated && userRole === 'admin' && (
              <div className="relative">
                <button
                  onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                  className="w-10 h-10 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/80 flex items-center justify-center text-slate-300 hover:text-white transition-all relative cursor-pointer"
                  title="Central de Notificações"
                >
                  <BellIcon className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white text-[9px] font-black rounded-full flex items-center justify-center animate-pulse">
                    3
                  </span>
                </button>

                <NotificationsDropdown
                  isOpen={isNotificationsOpen}
                  onClose={() => setIsNotificationsOpen(false)}
                  onNavigateTab={(tab) => {
                    setActiveTab(tab);
                    setIsNotificationsOpen(false);
                  }}
                />
              </div>
            )}

            {/* Authentication / Profile Status Button */}
            {isAdminAuthenticated && userRole === 'admin' ? (
              <div className="flex items-center space-x-2 bg-slate-900 border border-brand-500/40 px-3 py-2 rounded-xl text-xs">
                <span className="w-2 h-2 rounded-full bg-brand-cyan animate-pulse"></span>
                <span className="font-bold text-white hidden sm:inline">👑 Admin Ativo</span>
                <button
                  onClick={onLogout}
                  className="text-[10px] bg-slate-800 hover:bg-rose-500/20 text-rose-300 hover:text-rose-200 px-2 py-0.5 rounded-md transition-colors font-bold ml-1 cursor-pointer"
                  title="Sair da conta"
                >
                  Sair
                </button>
              </div>
            ) : isDriverAuthenticated && userRole === 'driver' ? (
              <div className="flex items-center space-x-2 bg-slate-900 border border-brand-cyan/40 px-3 py-2 rounded-xl text-xs">
                <span className="w-2 h-2 rounded-full bg-brand-cyan"></span>
                <span className="font-bold text-brand-cyan truncate max-w-[100px] sm:max-w-[150px]">
                  {userProfile?.name || 'Motorista'}
                </span>
                <button
                  onClick={onLogout}
                  className="text-[10px] bg-slate-800 hover:bg-rose-500/20 text-rose-300 hover:text-rose-200 px-2 py-0.5 rounded-md transition-colors font-bold ml-1 cursor-pointer"
                  title="Sair da conta"
                >
                  Sair
                </button>
              </div>
            ) : (
              <button
                onClick={() => onOpenAuthModal('driver')}
                className="flex items-center space-x-2 bg-gradient-to-r from-brand-500 to-blue-600 hover:from-brand-600 hover:to-blue-700 text-white px-3.5 py-2.5 rounded-xl font-black text-xs transition-all shadow-md shadow-brand-500/25 active:scale-95 cursor-pointer"
              >
                <KeyIcon className="w-3.5 h-3.5" />
                <span>Entrar / Cadastrar</span>
              </button>
            )}

            {/* Official WhatsApp Button */}
            <button
              onClick={onOpenContactHub}
              className="flex items-center space-x-2 bg-[#25D366] hover:bg-[#20bd5a] text-white px-4 py-2.5 rounded-xl font-black text-xs transition-all shadow-lg shadow-[#25D366]/25 active:scale-95 cursor-pointer"
              title="Falar no WhatsApp"
            >
              <WhatsAppIcon className="w-4 h-4 fill-white" />
              <span className="hidden sm:inline">WhatsApp</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
