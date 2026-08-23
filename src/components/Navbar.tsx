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
  activeTab: 'public' | 'dashboard' | 'manutencao' | 'insights' | 'frota' | 'locacoes' | 'motorista';
  setActiveTab: (tab: 'public' | 'dashboard' | 'manutencao' | 'insights' | 'frota' | 'locacoes' | 'motorista') => void;
  userRole: 'admin' | 'driver';
  userProfile: UserProfile | null;
  onOpenAuthModal: (role?: 'admin' | 'driver') => void;
  onLogout: () => void;
  onOpenContactHub: () => void;
  onOpenSettings: () => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
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
  onOpenSettings,
  theme,
  onToggleTheme,
  isAdminAuthenticated,
  isDriverAuthenticated
}) => {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const isLight = theme === 'light';

  return (
    <header className={`sticky top-0 z-40 backdrop-blur-md border-b transition-colors duration-200 ${
      isLight 
        ? 'bg-white/95 border-slate-200 text-slate-900 shadow-sm' 
        : 'bg-brand-dark/95 border-slate-800 text-white shadow-xl'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-2 sm:gap-4">
          
          {/* Brand Official Logo */}
          <div className="shrink-0">
            <BrandLogo size="md" onClick={() => setActiveTab('public')} />
          </div>

          {/* Center Navigation Tabs (Concise & Spacious) */}
          <nav className={`hidden lg:flex items-center space-x-1 p-1 rounded-2xl border transition-colors ${
            isLight 
              ? 'bg-slate-100/90 border-slate-200 shadow-inner' 
              : 'bg-slate-900/90 border-slate-800 shadow-inner'
          }`}>
            <button
              onClick={() => setActiveTab('public')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'public'
                  ? 'bg-brand-600 text-white shadow-md font-black'
                  : isLight
                    ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/80'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
              }`}
            >
              <GlobeIcon className="w-3.5 h-3.5" />
              <span>Site</span>
            </button>

            {userRole === 'admin' && isAdminAuthenticated ? (
              <>
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeTab === 'dashboard'
                      ? 'bg-brand-600 text-white shadow-md font-black'
                      : isLight
                        ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/80'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                  }`}
                >
                  <ChartIcon className="w-3.5 h-3.5" />
                  <span>10 KPIs</span>
                </button>
                <button
                  onClick={() => setActiveTab('locacoes')}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeTab === 'locacoes'
                      ? isLight
                        ? 'bg-blue-600 text-white shadow-md font-black'
                        : 'bg-brand-cyan text-slate-950 shadow-md font-black'
                      : isLight
                        ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/80'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                  }`}
                >
                  <KeyIcon className="w-3.5 h-3.5" />
                  <span>Locações</span>
                </button>
                <button
                  onClick={() => setActiveTab('frota')}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeTab === 'frota'
                      ? isLight
                        ? 'bg-slate-800 text-white shadow-md font-black'
                        : 'bg-slate-700 text-white shadow-md font-black'
                      : isLight
                        ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/80'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                  }`}
                >
                  <CarIcon className="w-3.5 h-3.5" />
                  <span>Frota</span>
                </button>
                <button
                  onClick={() => setActiveTab('manutencao')}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeTab === 'manutencao'
                      ? 'bg-amber-500 text-slate-950 shadow-md font-black'
                      : isLight
                        ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/80'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                  }`}
                >
                  <WrenchIcon className="w-3.5 h-3.5" />
                  <span>Manutenção</span>
                </button>
                <button
                  onClick={() => setActiveTab('insights')}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeTab === 'insights'
                      ? 'bg-purple-600 text-white shadow-md font-black'
                      : isLight
                        ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/80'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                  }`}
                >
                  <SparklesIcon className="w-3.5 h-3.5" />
                  <span>Insights</span>
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
                className={`flex items-center space-x-2 px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'motorista'
                    ? 'bg-brand-600 text-white shadow-md font-black'
                    : isLight
                      ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/80'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                }`}
              >
                <CarIcon className="w-3.5 h-3.5" />
                <span>Portal do Motorista (Uber/99)</span>
              </button>
            )}
          </nav>

          {/* Right Action Controls: Toolbar, Profile & WhatsApp */}
          <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
            
            {/* Action Tools Cluster (Theme, Settings, Bell) */}
            <div className={`flex items-center space-x-1 p-1 rounded-2xl border transition-colors ${
              isLight ? 'bg-slate-100 border-slate-200' : 'bg-slate-900/90 border-slate-800'
            }`}>
              {/* Quick Theme Toggle (Light / Dark) */}
              <button
                onClick={onToggleTheme}
                className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
                  isLight 
                    ? 'hover:bg-slate-200 text-slate-700 hover:text-slate-900' 
                    : 'hover:bg-slate-800 text-slate-300 hover:text-white'
                }`}
                title={`Alternar para tema ${isLight ? 'Escuro' : 'Claro'}`}
              >
                <span className="text-sm">{isLight ? '☀️' : '🌙'}</span>
              </button>

              {/* Settings Gear */}
              <button
                onClick={onOpenSettings}
                className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
                  isLight 
                    ? 'hover:bg-slate-200 text-slate-700 hover:text-slate-900' 
                    : 'hover:bg-slate-800 text-slate-300 hover:text-white'
                }`}
                title="Configurações & Permissões"
              >
                <span className="text-sm">⚙️</span>
              </button>
              
              {/* Notification Bell (for logged Admin) */}
              {isAdminAuthenticated && userRole === 'admin' && (
                <div className="relative">
                  <button
                    onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                    className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center transition-all relative cursor-pointer ${
                      isLight 
                        ? 'hover:bg-slate-200 text-slate-700 hover:text-slate-900' 
                        : 'hover:bg-slate-800 text-slate-300 hover:text-white'
                    }`}
                    title="Central de Notificações"
                  >
                    <BellIcon className="w-4 h-4" />
                    <span className="absolute 1 top-1 right-1 w-3.5 h-3.5 bg-rose-500 text-white text-[8px] font-black rounded-full flex items-center justify-center animate-pulse">
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
            </div>

            {/* Separator */}
            <div className={`hidden sm:block h-6 w-px ${isLight ? 'bg-slate-300' : 'bg-slate-800'}`} />

            {/* Authentication / Profile Status Button */}
            {isAdminAuthenticated && userRole === 'admin' ? (
              <div className={`flex items-center space-x-2 px-3 py-1.5 rounded-xl text-xs border ${
                isLight 
                  ? 'bg-blue-50 border-blue-200 text-blue-900' 
                  : 'bg-slate-900 border-brand-500/40 text-white'
              }`}>
                <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse"></span>
                <span className="font-bold hidden md:inline">👑 Diretoria</span>
                <button
                  onClick={onLogout}
                  className={`text-[10px] px-2 py-0.5 rounded-md transition-colors font-bold cursor-pointer ${
                    isLight 
                      ? 'bg-rose-100 hover:bg-rose-200 text-rose-700' 
                      : 'bg-slate-800 hover:bg-rose-500/20 text-rose-300 hover:text-rose-200'
                  }`}
                  title="Sair da conta"
                >
                  Sair
                </button>
              </div>
            ) : isDriverAuthenticated && userRole === 'driver' ? (
              <div className={`flex items-center space-x-2 px-3 py-1.5 rounded-xl text-xs border ${
                isLight 
                  ? 'bg-blue-50 border-blue-200 text-blue-900' 
                  : 'bg-slate-900 border-brand-cyan/40 text-cyan-400'
              }`}>
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                <span className="font-bold truncate max-w-[90px] sm:max-w-[120px]">
                  {userProfile?.name || 'Motorista'}
                </span>
                <button
                  onClick={onLogout}
                  className={`text-[10px] px-2 py-0.5 rounded-md transition-colors font-bold cursor-pointer ${
                    isLight 
                      ? 'bg-rose-100 hover:bg-rose-200 text-rose-700' 
                      : 'bg-slate-800 hover:bg-rose-500/20 text-rose-300 hover:text-rose-200'
                  }`}
                  title="Sair da conta"
                >
                  Sair
                </button>
              </div>
            ) : (
              <button
                onClick={() => onOpenAuthModal('driver')}
                className="flex items-center space-x-2 bg-gradient-to-r from-brand-600 to-blue-600 hover:from-brand-700 hover:to-blue-700 text-white px-3.5 py-2 rounded-xl font-black text-xs transition-all shadow-md shadow-brand-500/25 active:scale-95 cursor-pointer"
              >
                <KeyIcon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Entrar / Cadastrar</span>
                <span className="sm:hidden">Entrar</span>
              </button>
            )}

            {/* Official WhatsApp Button */}
            <button
              onClick={onOpenContactHub}
              className="flex items-center space-x-2 bg-[#25D366] hover:bg-[#20bd5a] text-white px-3.5 py-2 rounded-xl font-black text-xs transition-all shadow-md shadow-[#25D366]/25 active:scale-95 cursor-pointer shrink-0"
              title="Falar no WhatsApp Oficial"
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
