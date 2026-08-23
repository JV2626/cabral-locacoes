import React, { useState } from 'react';
import { BrandLogo } from './BrandLogo';
import { NotificationsDropdown } from './NotificationsDropdown';
import { UserProfile } from './AuthModal';

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
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'public'
                  ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/25 font-black'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
              }`}
            >
              🌐 Site da Marca
            </button>

            {userRole === 'admin' && isAdminAuthenticated ? (
              <>
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeTab === 'dashboard'
                      ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/25 font-black'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                  }`}
                >
                  📊 10 KPIs
                </button>
                <button
                  onClick={() => setActiveTab('manutencao')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeTab === 'manutencao'
                      ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/25 font-black'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                  }`}
                >
                  🔧 Manutenção por KM
                </button>
                <button
                  onClick={() => setActiveTab('insights')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeTab === 'insights'
                      ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/25 font-black'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                  }`}
                >
                  🧠 Insights IA
                </button>
                <button
                  onClick={() => setActiveTab('frota')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeTab === 'frota'
                      ? 'bg-slate-700 text-white shadow-lg font-black'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                  }`}
                >
                  🚗 Frota
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
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'motorista'
                    ? 'bg-brand-cyan text-slate-950 shadow-lg shadow-brand-cyan/20 font-black'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                }`}
              >
                📱 Portal do Motorista (Uber/99)
              </button>
            )}
          </nav>

          {/* Right Action Controls: Login Profile, Bell, WhatsApp */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            
            {/* Notification Bell (for logged Admin) */}
            {isAdminAuthenticated && userRole === 'admin' && (
              <div className="relative">
                <button
                  onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                  className="w-10 h-10 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/80 flex items-center justify-center text-sm transition-all relative cursor-pointer"
                  title="Central de Notificações"
                >
                  <span>🔔</span>
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
              <div className="flex items-center space-x-2 bg-slate-900 border border-brand-500/40 px-3 py-1.5 rounded-xl text-xs">
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
              <div className="flex items-center space-x-2 bg-slate-900 border border-brand-cyan/40 px-3 py-1.5 rounded-xl text-xs">
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
                className="flex items-center space-x-1.5 bg-gradient-to-r from-brand-500 to-blue-600 hover:from-brand-600 hover:to-blue-700 text-white px-3.5 py-2 rounded-xl font-black text-xs transition-all shadow-md shadow-brand-500/25 active:scale-95 cursor-pointer"
              >
                <span>🔑</span>
                <span>Entrar / Cadastrar</span>
              </button>
            )}

            {/* WhatsApp CTA */}
            <button
              onClick={onOpenContactHub}
              className="flex items-center space-x-1.5 bg-brand-cyan hover:bg-brand-300 text-slate-950 px-3.5 py-2 rounded-xl font-black text-xs transition-all shadow-md shadow-brand-cyan/20 active:scale-95 cursor-pointer"
            >
              <span>💬</span>
              <span className="hidden sm:inline">WhatsApp</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
