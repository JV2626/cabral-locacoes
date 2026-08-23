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
  activeTab: 'public' | 'dashboard' | 'manutencao' | 'insights' | 'frota' | 'locacoes' | 'motorista' | 'empresa';
  setActiveTab: (tab: 'public' | 'dashboard' | 'manutencao' | 'insights' | 'frota' | 'locacoes' | 'motorista' | 'empresa') => void;
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isLight = theme === 'light';

  const handleNavigate = (tab: 'public' | 'dashboard' | 'manutencao' | 'insights' | 'frota' | 'locacoes' | 'motorista' | 'empresa') => {
    setActiveTab(tab);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header className={`sticky top-0 z-40 backdrop-blur-md border-b transition-colors duration-200 ${
        isLight 
          ? 'bg-white/95 border-slate-200 text-slate-900 shadow-sm' 
          : 'bg-brand-dark/95 border-slate-800 text-white shadow-xl'
      }`}>
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20 gap-1.5 sm:gap-4">
            
            {/* Brand Official Logo */}
            <div className="shrink-0">
              <BrandLogo size="md" onClick={() => handleNavigate('public')} />
            </div>

            {/* Desktop Center Navigation Tabs */}
            <nav className={`hidden lg:flex items-center space-x-1 p-1 rounded-2xl border transition-colors ${
              isLight 
                ? 'bg-slate-100/90 border-slate-200 shadow-inner' 
                : 'bg-slate-900/90 border-slate-800 shadow-inner'
            }`}>
              <button
                onClick={() => handleNavigate('public')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'public'
                    ? 'bg-blue-600 text-white shadow-md font-black'
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
                    onClick={() => handleNavigate('dashboard')}
                    className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      activeTab === 'dashboard'
                        ? 'bg-blue-600 text-white shadow-md font-black'
                        : isLight
                          ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/80'
                          : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                    }`}
                  >
                    <ChartIcon className="w-3.5 h-3.5" />
                    <span>10 KPIs</span>
                  </button>

                  <button
                    onClick={() => handleNavigate('locacoes')}
                    className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      activeTab === 'locacoes'
                        ? 'bg-blue-600 text-white shadow-md font-black'
                        : isLight
                          ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/80'
                          : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                    }`}
                  >
                    <KeyIcon className="w-3.5 h-3.5" />
                    <span>Locações</span>
                  </button>

                  <button
                    onClick={() => handleNavigate('frota')}
                    className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      activeTab === 'frota'
                        ? 'bg-blue-600 text-white shadow-md font-black'
                        : isLight
                          ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/80'
                          : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                    }`}
                  >
                    <CarIcon className="w-3.5 h-3.5" />
                    <span>Frota</span>
                  </button>

                  <button
                    onClick={() => handleNavigate('manutencao')}
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
                    onClick={() => handleNavigate('insights')}
                    className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      activeTab === 'insights'
                        ? 'bg-purple-600 text-white shadow-md font-black'
                        : isLight
                          ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/80'
                          : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                    }`}
                  >
                    <SparklesIcon className="w-3.5 h-3.5" />
                    <span>IA Insights</span>
                  </button>

                  <button
                    onClick={() => handleNavigate('empresa')}
                    className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      activeTab === 'empresa'
                        ? 'bg-emerald-600 text-white shadow-md font-black'
                        : isLight
                          ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/80'
                          : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                    }`}
                  >
                    <span>🏢</span>
                    <span>Empresa & PIX</span>
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    if (isDriverAuthenticated) {
                      handleNavigate('motorista');
                    } else {
                      onOpenAuthModal('driver');
                    }
                  }}
                  className={`flex items-center space-x-2 px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeTab === 'motorista'
                      ? 'bg-blue-600 text-white shadow-md font-black'
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

            {/* Right Action Controls */}
            <div className="flex items-center space-x-1.5 sm:space-x-3 shrink-0">
              
              {/* Quick Theme Toggle */}
              <button
                onClick={onToggleTheme}
                className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center transition-all cursor-pointer border ${
                  isLight 
                    ? 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700' 
                    : 'bg-slate-900/90 hover:bg-slate-800 border-slate-800 text-slate-300'
                }`}
                title={`Alternar para tema ${isLight ? 'Escuro' : 'Claro'}`}
              >
                <span className="text-xs sm:text-sm">{isLight ? '☀️' : '🌙'}</span>
              </button>

              {/* Desktop Settings Gear */}
              <button
                onClick={onOpenSettings}
                className={`hidden sm:flex w-8 h-8 sm:w-9 sm:h-9 rounded-xl items-center justify-center transition-all cursor-pointer border ${
                  isLight 
                    ? 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700' 
                    : 'bg-slate-900/90 hover:bg-slate-800 border-slate-800 text-slate-300'
                }`}
                title="Configurações & Permissões"
              >
                <span className="text-xs sm:text-sm">⚙️</span>
              </button>
              
              {/* Desktop Notification Bell (for logged Admin) */}
              {isAdminAuthenticated && userRole === 'admin' && (
                <div className="relative hidden sm:block">
                  <button
                    onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                    className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center transition-all relative cursor-pointer border ${
                      isLight 
                        ? 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700' 
                        : 'bg-slate-900/90 hover:bg-slate-800 border-slate-800 text-slate-300'
                    }`}
                    title="Central de Notificações"
                  >
                    <BellIcon className="w-4 h-4" />
                    <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-rose-500 text-white text-[8px] font-black rounded-full flex items-center justify-center animate-pulse">
                      3
                    </span>
                  </button>

                  <NotificationsDropdown
                    isOpen={isNotificationsOpen}
                    onClose={() => setIsNotificationsOpen(false)}
                    onNavigateTab={(tab) => {
                      handleNavigate(tab as any);
                      setIsNotificationsOpen(false);
                    }}
                  />
                </div>
              )}

              {/* Desktop Authentication / Profile Status Button */}
              <div className="hidden lg:flex items-center space-x-2">
                {isAdminAuthenticated && userRole === 'admin' ? (
                  <div className={`flex items-center space-x-2 px-3 py-1.5 rounded-xl text-xs border ${
                    isLight ? 'bg-blue-50 border-blue-200 text-blue-900' : 'bg-slate-900 border-blue-500/40 text-white'
                  }`}>
                    <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                    <span className="font-bold">👑 Diretoria</span>
                    <button
                      onClick={onLogout}
                      className={`text-[10px] px-2 py-0.5 rounded-md font-bold cursor-pointer transition-colors ${
                        isLight ? 'bg-rose-100 hover:bg-rose-200 text-rose-700' : 'bg-slate-800 hover:bg-rose-500/20 text-rose-300'
                      }`}
                      title="Sair da conta"
                    >
                      Sair
                    </button>
                  </div>
                ) : isDriverAuthenticated && userRole === 'driver' ? (
                  <div className={`flex items-center space-x-2 px-3 py-1.5 rounded-xl text-xs border ${
                    isLight ? 'bg-blue-50 border-blue-200 text-blue-900' : 'bg-slate-900 border-cyan-400/40 text-cyan-400'
                  }`}>
                    <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                    <span className="font-bold truncate max-w-[100px]">{userProfile?.name || 'Motorista'}</span>
                    <button
                      onClick={onLogout}
                      className={`text-[10px] px-2 py-0.5 rounded-md font-bold cursor-pointer transition-colors ${
                        isLight ? 'bg-rose-100 hover:bg-rose-200 text-rose-700' : 'bg-slate-800 hover:bg-rose-500/20 text-rose-300'
                      }`}
                      title="Sair da conta"
                    >
                      Sair
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => onOpenAuthModal('driver')}
                    className="btn-primary flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-black cursor-pointer"
                  >
                    <KeyIcon className="w-3.5 h-3.5" />
                    <span>Entrar / Cadastrar</span>
                  </button>
                )}
              </div>

              {/* Official WhatsApp Button */}
              <button
                onClick={onOpenContactHub}
                className="btn-success flex items-center space-x-1.5 px-3 sm:px-4 py-2 rounded-xl text-xs font-black cursor-pointer shrink-0"
                title="Falar no WhatsApp Oficial"
              >
                <WhatsAppIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-white" />
                <span className="hidden sm:inline">WhatsApp</span>
              </button>

              {/* Mobile Hamburger Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className={`lg:hidden w-9 h-9 rounded-xl flex items-center justify-center border transition-all cursor-pointer ${
                  isLight 
                    ? 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-800' 
                    : 'bg-slate-900 hover:bg-slate-800 border-slate-700 text-white'
                }`}
                title="Abrir Menu de Navegação"
                aria-label="Abrir Menu"
              >
                <span className="text-base font-bold">☰</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* MOBILE DRAWER / MENU OVERLAY */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex justify-end animate-in fade-in duration-200">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Drawer Content */}
          <div className={`relative w-4/5 max-w-sm h-full flex flex-col justify-between shadow-2xl p-5 overflow-y-auto border-l animate-in slide-in-from-right duration-300 z-10 ${
            isLight ? 'bg-white border-slate-200 text-slate-900' : 'bg-slate-950 border-slate-800 text-white'
          }`}>
            <div className="space-y-6">
              
              {/* Drawer Top: Logo & Close Button */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800/80">
                <BrandLogo size="sm" theme={isLight ? 'light' : 'dark'} onClick={() => handleNavigate('public')} />
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-8 h-8 rounded-full bg-slate-800/80 text-slate-400 hover:text-white flex items-center justify-center text-sm font-bold cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {/* User Session Badge / Login in Mobile */}
              <div className={`p-3.5 rounded-2xl border ${
                isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-900 border-slate-800'
              }`}>
                {isAdminAuthenticated && userRole === 'admin' ? (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse"></span>
                      <div>
                        <span className="text-xs font-black block">👑 Diretoria Cabral</span>
                        <span className="text-[10px] text-emerald-400 font-bold">Admin Autenticado</span>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        onLogout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="text-[11px] font-bold px-2.5 py-1 bg-rose-500/20 text-rose-300 rounded-lg cursor-pointer"
                    >
                      Sair
                    </button>
                  </div>
                ) : isDriverAuthenticated && userRole === 'driver' ? (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
                      <div>
                        <span className="text-xs font-black block">{userProfile?.name || 'Motorista'}</span>
                        <span className="text-[10px] text-cyan-400 font-bold">Locatário Ativo</span>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        onLogout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="text-[11px] font-bold px-2.5 py-1 bg-rose-500/20 text-rose-300 rounded-lg cursor-pointer"
                    >
                      Sair
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <p className="text-xs text-slate-400">Acesse sua área de motorista ou diretoria:</p>
                    <button
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        onOpenAuthModal('driver');
                      }}
                      className="w-full btn-primary py-2.5 rounded-xl text-xs font-black cursor-pointer text-center"
                    >
                      🔑 Entrar / Cadastrar
                    </button>
                  </div>
                )}
              </div>

              {/* Navigation Links */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block px-2 mb-1">
                  Menu Principal
                </span>

                <button
                  onClick={() => handleNavigate('public')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-2xl text-xs font-bold transition-all text-left cursor-pointer ${
                    activeTab === 'public'
                      ? 'btn-primary'
                      : isLight ? 'hover:bg-slate-100 text-slate-700' : 'hover:bg-slate-900 text-slate-300'
                  }`}
                >
                  <GlobeIcon className="w-4 h-4" />
                  <span>Site Principal & Aluguel</span>
                </button>

                {isAdminAuthenticated && userRole === 'admin' ? (
                  <>
                    <span className="text-[10px] font-black text-blue-400 uppercase tracking-wider block px-2 pt-3 mb-1">
                      Painel Administrativo
                    </span>

                    <button
                      onClick={() => handleNavigate('dashboard')}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-2xl text-xs font-bold transition-all text-left cursor-pointer ${
                        activeTab === 'dashboard'
                          ? 'btn-primary'
                          : isLight ? 'hover:bg-slate-100 text-slate-700' : 'hover:bg-slate-900 text-slate-300'
                      }`}
                    >
                      <ChartIcon className="w-4 h-4" />
                      <span>10 KPIs em Tempo Real</span>
                    </button>

                    <button
                      onClick={() => handleNavigate('locacoes')}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-2xl text-xs font-bold transition-all text-left cursor-pointer ${
                        activeTab === 'locacoes'
                          ? 'btn-primary'
                          : isLight ? 'hover:bg-slate-100 text-slate-700' : 'hover:bg-slate-900 text-slate-300'
                      }`}
                    >
                      <KeyIcon className="w-4 h-4" />
                      <span>Gestão de Locações</span>
                    </button>

                    <button
                      onClick={() => handleNavigate('frota')}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-2xl text-xs font-bold transition-all text-left cursor-pointer ${
                        activeTab === 'frota'
                          ? 'btn-primary'
                          : isLight ? 'hover:bg-slate-100 text-slate-700' : 'hover:bg-slate-900 text-slate-300'
                      }`}
                    >
                      <CarIcon className="w-4 h-4" />
                      <span>Gestão da Frota & Estoque</span>
                    </button>

                    <button
                      onClick={() => handleNavigate('manutencao')}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-2xl text-xs font-bold transition-all text-left cursor-pointer ${
                        activeTab === 'manutencao'
                          ? 'btn-primary'
                          : isLight ? 'hover:bg-slate-100 text-slate-700' : 'hover:bg-slate-900 text-slate-300'
                      }`}
                    >
                      <WrenchIcon className="w-4 h-4" />
                      <span>Manutenção Preditiva & Peças</span>
                    </button>

                    <button
                      onClick={() => handleNavigate('insights')}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-2xl text-xs font-bold transition-all text-left cursor-pointer ${
                        activeTab === 'insights'
                          ? 'btn-primary'
                          : isLight ? 'hover:bg-slate-100 text-slate-700' : 'hover:bg-slate-900 text-slate-300'
                      }`}
                    >
                      <SparklesIcon className="w-4 h-4" />
                      <span>IA Copiloto & Insights</span>
                    </button>

                    <button
                      onClick={() => handleNavigate('empresa')}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-2xl text-xs font-bold transition-all text-left cursor-pointer ${
                        activeTab === 'empresa'
                          ? 'btn-primary'
                          : isLight ? 'hover:bg-slate-100 text-slate-700' : 'hover:bg-slate-900 text-slate-300'
                      }`}
                    >
                      <span className="text-base">🏢</span>
                      <span>Dados da Empresa & PIX</span>
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => {
                      if (isDriverAuthenticated) {
                        handleNavigate('motorista');
                      } else {
                        setIsMobileMenuOpen(false);
                        onOpenAuthModal('driver');
                      }
                    }}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-2xl text-xs font-bold transition-all text-left cursor-pointer ${
                      activeTab === 'motorista'
                        ? 'btn-primary'
                        : isLight ? 'hover:bg-slate-100 text-slate-700' : 'hover:bg-slate-900 text-slate-300'
                    }`}
                  >
                    <CarIcon className="w-4 h-4" />
                    <span>Portal do Motorista (Uber/99)</span>
                  </button>
                )}
              </div>
            </div>

            {/* Drawer Bottom Actions */}
            <div className="pt-4 border-t border-slate-800/80 space-y-2">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenSettings();
                }}
                className={`w-full flex items-center justify-center space-x-2 py-3 rounded-2xl text-xs font-bold border transition-colors cursor-pointer ${
                  isLight ? 'bg-slate-100 border-slate-200 text-slate-800' : 'bg-slate-900 border-slate-800 text-slate-200'
                }`}
              >
                <span>⚙️</span>
                <span>Configurações & Dispositivo</span>
              </button>

              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenContactHub();
                }}
                className="w-full btn-success py-3 rounded-2xl text-xs font-black flex items-center justify-center space-x-2 cursor-pointer shadow-lg"
              >
                <WhatsAppIcon className="w-4 h-4 fill-white" />
                <span>Chamar no WhatsApp Oficial</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
