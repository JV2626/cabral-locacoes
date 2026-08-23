import React, { useState, useEffect } from 'react';
import { mockVehicles } from '../lib/mock-data';
import { formatCurrency } from '../lib/utils/calculations';
import { BrandLogo } from './BrandLogo';
import {
  WhatsAppIcon,
  ZapIcon,
  KeyIcon,
  ShieldCheckIcon,
  WrenchIcon,
  CarIcon,
  ChartIcon
} from './Icons';

interface PublicLandingPageProps {
  onOpenContactHub: () => void;
  onGoToDashboard: () => void;
  onOpenDriverAuth?: () => void;
}

export const PublicLandingPage: React.FC<PublicLandingPageProps> = ({
  onOpenContactHub,
  onGoToDashboard,
  onOpenDriverAuth
}) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'Hatch' | 'Sedan' | 'SUV'>('all');
  const [simulatorHours, setSimulatorHours] = useState(8);
  const [simulatorCarType, setSimulatorCarType] = useState('sedan');
  
  // Ultra-smooth subtle brand transition
  const [brandIndex, setBrandIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  const brandOptions = [
    {
      id: 'both',
      node: (
        <span className="inline-flex items-center align-middle gap-2 mx-1.5 transition-all">
          <span
            style={{ color: '#ffffff', backgroundColor: '#000000' }}
            className="inline-flex items-center px-3.5 py-1 text-base sm:text-2xl font-black rounded-xl border border-slate-700 shadow-md font-sans hover:border-slate-500 transition-colors"
          >
            Uber
          </span>
          <span className="text-slate-500 dark:text-slate-400 font-extrabold text-sm sm:text-lg">&</span>
          <span
            style={{ color: '#000000', backgroundColor: '#FFCC00' }}
            className="inline-flex items-center px-3.5 py-1 text-base sm:text-2xl font-black rounded-xl shadow-md font-sans hover:brightness-105 transition-all"
          >
            99
          </span>
        </span>
      )
    },
    {
      id: 'uber',
      node: (
        <span className="inline-flex items-center align-middle mx-1.5 transition-all">
          <span
            style={{ color: '#ffffff', backgroundColor: '#000000' }}
            className="inline-flex items-center px-5 py-1 text-base sm:text-2xl font-black rounded-xl border border-slate-700 shadow-md font-sans hover:border-slate-500 transition-colors"
          >
            Uber
          </span>
        </span>
      )
    },
    {
      id: '99',
      node: (
        <span className="inline-flex items-center align-middle mx-1.5 transition-all">
          <span
            style={{ color: '#000000', backgroundColor: '#FFCC00' }}
            className="inline-flex items-center px-5 py-1 text-base sm:text-2xl font-black rounded-xl shadow-md font-sans hover:brightness-105 transition-all"
          >
            99 App
          </span>
        </span>
      )
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setBrandIndex((prev) => (prev + 1) % brandOptions.length);
        setIsFading(false);
      }, 400);
    }, 4500);
    return () => clearInterval(timer);
  }, [brandOptions.length]);

  const filteredCars = mockVehicles.filter(v => 
    selectedCategory === 'all' || v.category === selectedCategory
  );

  // Estimator logic
  const weeklyRentalCost = simulatorCarType === 'sedan' ? 560 : 490;
  const estimatedMonthlyGross = simulatorHours * 38 * 26; // R$ 38/h * 26 dias
  const estimatedMonthlyNet = estimatedMonthlyGross - (weeklyRentalCost * 4.2) - (simulatorHours * 16 * 26);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-brand-dark text-slate-900 dark:text-slate-100 font-sans selection:bg-brand-500 selection:text-white transition-colors">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-24 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-radial dark:from-brand-900/60 dark:via-brand-dark dark:to-brand-dark">
        
        {/* Glow ambient background effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 sm:w-[600px] h-96 bg-brand-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute top-1/3 left-1/3 w-72 h-72 bg-brand-cyan/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            
            {/* Center Brand Badge */}
            <div className="flex justify-center mb-2">
              <BrandLogo size="lg" />
            </div>

            <div className="inline-flex items-center space-x-2 bg-blue-50 dark:bg-brand-500/10 border border-blue-200 dark:border-brand-500/30 text-blue-700 dark:text-brand-cyan px-4 py-1.5 rounded-full text-xs font-black tracking-widest uppercase">
              <ZapIcon className="w-3.5 h-3.5 text-blue-600 dark:text-brand-cyan" />
              <span>Locação Especializada para Motoristas de App</span>
            </div>

            {/* Main Headline with Ultra-Smooth Animated Logos */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-950 dark:text-white tracking-tight leading-tight font-display">
              Alugue seu carro para rodar na{' '}
              <span className={`inline-block transition-all duration-500 ease-in-out ${isFading ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
                {brandOptions[brandIndex].node}
              </span>{' '}
              sem burocracia
            </h1>

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Carros 100% homologados e aprovados para rodar. Retirada expressa em 2 minutos, manutenção preventiva inclusa, caução facilitada e suporte direto.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
              <button
                onClick={onOpenDriverAuth || onOpenContactHub}
                className="w-full sm:w-auto flex items-center justify-center space-x-2.5 bg-[#25D366] hover:bg-[#20bd5a] text-white px-8 py-4 rounded-2xl font-black text-sm transition-all shadow-xl shadow-[#25D366]/25 active:scale-95 cursor-pointer uppercase tracking-wider font-display"
              >
                <WhatsAppIcon className="w-5 h-5 fill-white" />
                <span>Alugar Carro no WhatsApp</span>
              </button>

              <button
                onClick={onGoToDashboard}
                className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-slate-900/90 hover:bg-slate-800 text-white px-8 py-4 rounded-2xl font-bold text-sm border border-slate-700 hover:border-brand-500/50 transition-all cursor-pointer shadow-md"
              >
                <ChartIcon className="w-4 h-4 text-brand-cyan" />
                <span>Acessar Painel do Dono</span>
              </button>
            </div>
          </div>

          {/* Interactive Uber Earnings Simulator */}
          <div className="mt-14 max-w-4xl mx-auto bg-slate-900/80 border border-slate-800/90 p-6 sm:p-8 rounded-3xl shadow-2xl backdrop-blur-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-800 pb-5 mb-6 relative z-10">
              <div>
                <span className="text-[10px] font-black text-brand-cyan uppercase tracking-widest block">SIMULADOR DE RENTABILIDADE</span>
                <h3 className="text-lg font-black text-white">Quanto você pode lucrar rodando com a Cabral Locações?</h3>
              </div>
              <span className="text-xs bg-brand-500/20 text-brand-cyan px-3 py-1 rounded-full border border-brand-500/30 font-black self-start">
                MANUTENÇÃO 100% INCLUSA
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center relative z-10">
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                    <span>Horas rodadas por dia:</span>
                    <span className="text-blue-700 dark:text-brand-cyan font-black text-sm">{simulatorHours} horas/dia</span>
                  </div>
                  <input
                    type="range"
                    min="4"
                    max="14"
                    value={simulatorHours}
                    onChange={(e) => setSimulatorHours(parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-brand-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-2">Categoria do Veículo:</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setSimulatorCarType('hatch')}
                      className={`p-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                        simulatorCarType === 'hatch'
                          ? 'bg-blue-50 dark:bg-brand-500/20 border-brand-500 text-blue-800 dark:text-brand-300 shadow-md shadow-brand-500/20'
                          : 'bg-slate-100 dark:bg-slate-950/60 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      <span className="font-extrabold block">🚗 Hatch (Onix/HB20)</span>
                      <span className="block text-[10px] text-slate-500 dark:text-slate-400 font-normal mt-0.5">R$ 490/semana</span>
                    </button>
                    <button
                      onClick={() => setSimulatorCarType('sedan')}
                      className={`p-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                        simulatorCarType === 'sedan'
                          ? 'bg-blue-50 dark:bg-brand-500/20 border-brand-500 text-blue-800 dark:text-brand-300 shadow-md shadow-brand-500/20'
                          : 'bg-slate-100 dark:bg-slate-950/60 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      <span className="font-extrabold block">🚘 Sedã (Cronos/Onix+)</span>
                      <span className="block text-[10px] text-slate-500 dark:text-slate-400 font-normal mt-0.5">R$ 560/semana</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Result Card */}
              <div className="bg-gradient-to-br from-blue-50/90 via-white to-slate-50 dark:from-brand-900/80 dark:via-slate-900 dark:to-slate-950 p-6 rounded-2xl border border-blue-200 dark:border-brand-500/30 space-y-3 text-center sm:text-left shadow-lg shadow-brand-500/10">
                <span className="text-[11px] font-black text-blue-700 dark:text-brand-cyan uppercase tracking-wide block">
                  Lucro Líquido Mensal Estimado:
                </span>
                <span className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white block">
                  {formatCurrency(Math.max(2800, estimatedMonthlyNet))}
                </span>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-snug">
                  *Já descontado o valor da semanalidade e o combustível estimado. Sem custos com seguro, IPVA ou troca de óleo!
                </p>
                <button
                  onClick={onOpenContactHub}
                  className="w-full mt-2 flex items-center justify-center space-x-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-black py-3 rounded-xl text-xs transition-all shadow-md shadow-[#25D366]/20 active:scale-95 cursor-pointer uppercase tracking-wider"
                >
                  <WhatsAppIcon className="w-4 h-4 fill-white" />
                  <span>Garantir Meu Carro no WhatsApp</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Catalog Section */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-black text-slate-950 dark:text-white tracking-tight font-display">Nossa Frota Disponível</h2>
            <p className="text-xs text-slate-600 dark:text-slate-400">Veículos novos, revisados semanalmente e prontos para rodar</p>
          </div>

          <div className="flex items-center space-x-2">
            {(['all', 'Hatch', 'Sedan', 'SUV'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-brand-600 text-white font-black shadow-md shadow-brand-500/20'
                    : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white border border-slate-200 dark:border-slate-800'
                }`}
              >
                {cat === 'all' ? 'Todos' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Cars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredCars.map((car) => (
            <div
              key={car.id}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-brand-500/50 rounded-3xl overflow-hidden shadow-md dark:shadow-xl transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="h-48 bg-slate-100 dark:bg-slate-950 relative overflow-hidden">
                  <img src={car.photoUrl} alt={car.model} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <span className="absolute top-3 right-3 bg-white/90 dark:bg-brand-dark/90 backdrop-blur-md text-blue-700 dark:text-brand-cyan text-[10px] font-black px-3 py-1 rounded-full border border-blue-200 dark:border-brand-500/30">
                    {car.category}
                  </span>
                </div>

                <div className="p-5 space-y-3">
                  <div>
                    <h3 className="text-base font-extrabold text-slate-900 dark:text-white">{car.model}</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Ano {car.year} · {car.color}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-950/70 p-3 rounded-xl border border-slate-200 dark:border-slate-800/80">
                    <span>❄️ Ar-condicionado</span>
                    <span>🕹️ Câmbio Flex</span>
                    <span>🧳 4 Portas</span>
                    <span>🛡️ Seguro 24h</span>
                  </div>
                </div>
              </div>

              <div className="p-5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase block">Semanalidade</span>
                  <span className="text-lg font-black text-blue-700 dark:text-brand-cyan">{formatCurrency(car.weeklyRate)}<span className="text-xs text-slate-500 dark:text-slate-400 font-normal">/sem</span></span>
                </div>

                <button
                  onClick={onOpenContactHub}
                  className="flex items-center space-x-1.5 bg-[#25D366] hover:bg-[#20bd5a] text-white px-4 py-2 rounded-xl text-xs font-black transition-all active:scale-95 cursor-pointer shadow-md shadow-[#25D366]/20"
                >
                  <WhatsAppIcon className="w-3.5 h-3.5 fill-white" />
                  <span>Alugar Agora</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Differentiators Section */}
      <section className="py-16 bg-slate-100/80 dark:bg-slate-900/70 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
          <div>
            <h2 className="text-2xl font-black text-slate-950 dark:text-white tracking-tight font-display">Por que alugar na Cabral Locações?</h2>
            <p className="text-xs text-slate-600 dark:text-slate-400 max-w-xl mx-auto mt-1">
              Diga adeus às filas intermináveis e cobranças injustas das grandes locadoras
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            <div className="bg-white dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800/80 p-5 rounded-2xl space-y-2 hover:border-brand-500/40 transition-colors shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-brand-500/20 text-blue-700 dark:text-brand-cyan flex items-center justify-center border border-blue-200 dark:border-brand-500/30">
                <ZapIcon className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">Retirada em 2 Minutos</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">Contrato assinado pelo celular antes de sair de casa. Sem filas no balcão.</p>
            </div>

            <div className="bg-white dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800/80 p-5 rounded-2xl space-y-2 hover:border-brand-500/40 transition-colors shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 flex items-center justify-center border border-emerald-200 dark:border-emerald-500/30">
                <KeyIcon className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">Caução Facilitada</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">Devolução instantânea no PIX no ato da entrega do veículo, sem prender seu cartão.</p>
            </div>

            <div className="bg-white dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800/80 p-5 rounded-2xl space-y-2 hover:border-brand-500/40 transition-colors shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400 flex items-center justify-center border border-amber-200 dark:border-amber-500/30">
                <WrenchIcon className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">Manutenção 100% Inclusa</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">Troca de óleo, pastilhas de freio e pneus cobertos pela locadora sem custos extras.</p>
            </div>

            <div className="bg-white dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800/80 p-5 rounded-2xl space-y-2 hover:border-brand-500/40 transition-colors shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-[#25D366]/20 text-[#25D366] flex items-center justify-center border border-emerald-200 dark:border-[#25D366]/30">
                <WhatsAppIcon className="w-5 h-5 fill-[#25D366]" />
              </div>
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">Atendimento Humanizado</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">Fale direto com a nossa equipe no WhatsApp, com respostas rápidas e sem robôs de 0800.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 bg-slate-100 dark:bg-brand-dark border-t border-slate-200 dark:border-slate-800 text-center text-xs text-slate-500 space-y-3">
        <div className="flex justify-center">
          <BrandLogo size="md" />
        </div>
        <p className="font-extrabold text-slate-800 dark:text-slate-300">CABRAL LOCAÇÕES DE VEÍCULOS LTDA</p>
        <p className="max-w-md mx-auto text-slate-600 dark:text-slate-400">Locação Especializada para Motoristas de Aplicativo (Uber, 99) e Frotas Comerciais.</p>
        <div className="pt-2">
          <a
            href="https://wa.me/5511982886032?text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20os%20carros%20disponíveis%20na%20Cabral%20Locações."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 text-[#25D366] hover:text-[#20bd5a] font-bold text-xs bg-slate-900 border border-slate-800 hover:border-[#25D366]/40 px-4 py-2 rounded-xl transition-all"
          >
            <WhatsAppIcon className="w-4 h-4 fill-[#25D366]" />
            <span>WhatsApp Oficial: +55 (11) 98288-6032</span>
          </a>
        </div>
      </footer>
    </div>
  );
};
