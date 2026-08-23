import React from 'react';

interface NavbarProps {
  activeTab: 'public' | 'dashboard' | 'manutencao' | 'insights' | 'frota';
  setActiveTab: (tab: 'public' | 'dashboard' | 'manutencao' | 'insights' | 'frota') => void;
  onOpenContactHub: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, onOpenContactHub }) => {
  return (
    <header className="sticky top-0 z-50 bg-slate-900 border-b border-slate-800 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('public')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-blue-600 flex items-center justify-center font-bold text-white shadow-inner text-xl">
              C
            </div>
            <div>
              <span className="text-lg font-extrabold tracking-tight text-white">CABRAL</span>
              <span className="text-emerald-400 font-semibold ml-1 text-sm tracking-wide uppercase">Locações</span>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="hidden md:flex items-center space-x-1 bg-slate-800/80 p-1.5 rounded-xl border border-slate-700/60">
            <button
              onClick={() => setActiveTab('public')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'public'
                  ? 'bg-emerald-500 text-slate-950 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
              }`}
            >
              🌐 Site da Marca
            </button>
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'dashboard'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
              }`}
            >
              📊 Visão Geral (10 KPIs)
            </button>
            <button
              onClick={() => setActiveTab('manutencao')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'manutencao'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
              }`}
            >
              🔧 Manutenção por KM
            </button>
            <button
              onClick={() => setActiveTab('insights')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'insights'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
              }`}
            >
              🧠 Insights & Copiloto IA
            </button>
            <button
              onClick={() => setActiveTab('frota')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'frota'
                  ? 'bg-slate-700 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
              }`}
            >
              🚗 Gestão da Frota
            </button>
          </nav>

          {/* Contact Hub CTA */}
          <div className="flex items-center space-x-3">
            <button
              onClick={onOpenContactHub}
              className="flex items-center space-x-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-3.5 py-1.5 rounded-xl font-bold text-xs transition-all shadow-md hover:shadow-emerald-500/20 active:scale-95"
            >
              <span>💬</span>
              <span>Hub WhatsApp</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
