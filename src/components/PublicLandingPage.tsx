import React, { useState, useEffect, useMemo } from 'react';
import { Vehicle } from '../types/fleet';
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
  theme?: 'dark' | 'light';
  vehicles?: Vehicle[];
}

interface VehicleCardProps {
  car: Vehicle;
  isLight: boolean;
  onOpenContactHub: () => void;
}

const VehicleCardWithGallery: React.FC<VehicleCardProps> = ({ car, isLight, onOpenContactHub }) => {
  const photoList = useMemo(() => {
    if (car.photos && car.photos.length > 0) return car.photos;
    if (car.photoUrl) return [car.photoUrl];
    return ['https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&auto=format&fit=crop&q=60'];
  }, [car.photos, car.photoUrl]);

  const [activePhotoIdx, setActivePhotoIdx] = useState(0);

  const handlePrevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActivePhotoIdx((prev) => (prev > 0 ? prev - 1 : photoList.length - 1));
  };

  const handleNextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActivePhotoIdx((prev) => (prev < photoList.length - 1 ? prev + 1 : 0));
  };

  return (
    <div
      className={`border rounded-3xl overflow-hidden shadow-md transition-all flex flex-col justify-between group ${
        isLight 
          ? 'bg-white border-slate-200' 
          : 'bg-slate-900 border-slate-800 hover:border-brand-500/50 shadow-xl'
      }`}
    >
      <div>
        {/* Photo Container with Gallery Navigation */}
        <div className={`h-48 relative overflow-hidden ${isLight ? 'bg-slate-100' : 'bg-slate-950'}`}>
          <img
            src={photoList[activePhotoIdx]}
            alt={`${car.model} - foto ${activePhotoIdx + 1}`}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />

          {/* Category Badge */}
          <span className={`absolute top-3 right-3 backdrop-blur-md text-[10px] font-black px-3 py-1 rounded-full border shadow-sm ${
            isLight 
              ? 'bg-white/90 text-blue-700 border-blue-200' 
              : 'bg-brand-dark/90 text-brand-cyan border-brand-500/30'
          }`}>
            {car.category}
          </span>

          {/* Gallery Controls (if more than 1 photo) */}
          {photoList.length > 1 && (
            <>
              <button
                onClick={handlePrevPhoto}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center text-xs font-black shadow-md cursor-pointer transition-all active:scale-95"
                title="Foto Anterior"
              >
                ‹
              </button>
              <button
                onClick={handleNextPhoto}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center text-xs font-black shadow-md cursor-pointer transition-all active:scale-95"
                title="Próxima Foto"
              >
                ›
              </button>
              
              {/* Photo Dots Indicator */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center space-x-1.5 bg-black/50 px-2 py-1 rounded-full">
                {photoList.map((_: string, dotIdx: number) => (
                  <button
                    key={dotIdx}
                    onClick={(e) => {
                      e.stopPropagation();
                      setActivePhotoIdx(dotIdx);
                    }}
                    className={`w-1.5 h-1.5 rounded-full transition-all cursor-pointer ${
                      activePhotoIdx === dotIdx ? 'bg-brand-cyan w-3' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        <div className="p-5 space-y-3">
          <div>
            <div className="flex items-center justify-between">
              <h3 className={`text-base font-extrabold ${isLight ? 'text-slate-900' : 'text-white'}`}>{car.model}</h3>
              {photoList.length > 1 && (
                <span className="text-[10px] font-bold text-brand-cyan bg-brand-500/10 px-2 py-0.5 rounded-full border border-brand-500/20">
                  📸 {photoList.length} fotos
                </span>
              )}
            </div>
            <p className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Ano {car.year} · {car.color || 'Prata'}</p>
          </div>

          <div className={`grid grid-cols-2 gap-2 text-[11px] p-3 rounded-xl border ${
            isLight 
              ? 'bg-slate-50 border-slate-200 text-slate-700' 
              : 'bg-slate-950/70 border-slate-800/80 text-slate-300'
          }`}>
            <span>❄️ Ar-condicionado</span>
            <span>🕹️ Câmbio Flex</span>
            <span>🧳 4 Portas</span>
            <span>🛡️ Seguro 24h</span>
          </div>
        </div>
      </div>

      <div className={`p-5 border-t flex items-center justify-between ${
        isLight ? 'border-slate-100' : 'border-slate-800/80'
      }`}>
        <div>
          <span className={`text-[10px] font-bold uppercase block ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
            Semanalidade
          </span>
          <span className={`text-lg font-black ${isLight ? 'text-blue-700' : 'text-brand-cyan'}`}>
            {formatCurrency(car.weeklyRate)}
          </span>
        </div>
        <button
          onClick={onOpenContactHub}
          className="bg-brand-500 hover:bg-brand-600 text-white font-black px-4 py-2 rounded-xl text-xs shadow-md transition-all active:scale-95 cursor-pointer font-display uppercase tracking-wider"
        >
          Alugar Agora
        </button>
      </div>
    </div>
  );
};

export const PublicLandingPage: React.FC<PublicLandingPageProps> = ({
  onOpenContactHub,
  onGoToDashboard,
  onOpenDriverAuth,
  theme = 'dark',
  vehicles
}) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'Hatch' | 'Sedan' | 'SUV'>('all');
  const [simulatorHours, setSimulatorHours] = useState(8);
  const [simulatorCarType, setSimulatorCarType] = useState('sedan');
  
  // Ultra-smooth subtle brand transition
  const [brandIndex, setBrandIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const isLight = theme === 'light';

  const allVehicles = useMemo(() => vehicles && vehicles.length > 0 ? vehicles : mockVehicles, [vehicles]);

  const brandOptions = useMemo(() => [
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
          <span className={`${isLight ? 'text-slate-500' : 'text-slate-400'} font-extrabold text-sm sm:text-lg`}>&</span>
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
  ], [isLight]);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setBrandIndex((prev) => (prev + 1) % brandOptions.length);
        setIsFading(false);
      }, 350);
    }, 4500);
    return () => clearInterval(timer);
  }, [brandOptions.length]);

  const filteredCars = useMemo(() => {
    return allVehicles.filter(v => 
      selectedCategory === 'all' || v.category === selectedCategory
    );
  }, [allVehicles, selectedCategory]);

  // Estimator logic memoized for 60fps slider performance
  const { weeklyRentalCost, estimatedMonthlyGross, estimatedMonthlyNet } = useMemo(() => {
    const weeklyCost = simulatorCarType === 'sedan' ? 560 : 490;
    const gross = simulatorHours * 38 * 26; // R$ 38/h * 26 dias
    const net = gross - (weeklyCost * 4.2) - (simulatorHours * 16 * 26);
    return { weeklyRentalCost: weeklyCost, estimatedMonthlyGross: gross, estimatedMonthlyNet: net };
  }, [simulatorCarType, simulatorHours]);

  return (
    <div className={`min-h-screen font-sans selection:bg-brand-500 selection:text-white transition-colors ${
      isLight ? 'bg-slate-50 text-slate-900' : 'bg-[#030A17] text-slate-100'
    }`}>
      
      {/* Hero Section */}
      <section className={`relative overflow-hidden pt-12 pb-24 border-b ${
        isLight 
          ? 'bg-slate-50 border-slate-200' 
          : 'bg-gradient-to-b from-[#061329] via-[#050D1A] to-[#030A17] border-slate-800'
      }`}>
        
        {/* Glow ambient background effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 sm:w-[600px] h-96 bg-brand-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute top-1/3 left-1/3 w-72 h-72 bg-brand-cyan/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            
            {/* Center Brand Badge */}
            <div className="flex justify-center mb-2">
              <BrandLogo size="lg" theme={theme} />
            </div>

            <div className={`inline-flex items-center space-x-2 px-4 py-1.5 rounded-full text-xs font-black tracking-widest uppercase border ${
              isLight 
                ? 'bg-blue-50 border-blue-200 text-blue-700' 
                : 'bg-brand-500/10 border-brand-500/30 text-brand-cyan'
            }`}>
              <ZapIcon className={`w-3.5 h-3.5 ${isLight ? 'text-blue-600' : 'text-brand-cyan'}`} />
              <span>Locação Especializada para Motoristas de App</span>
            </div>

            {/* Main Headline with Ultra-Smooth Animated Logos */}
            <h1 className={`text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight font-display ${
              isLight ? 'text-slate-950' : 'text-white'
            }`}>
              Alugue seu carro para rodar na{' '}
              <span className={`inline-block transition-all duration-500 ease-in-out ${isFading ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
                {brandOptions[brandIndex].node}
              </span>{' '}
              sem burocracia
            </h1>

            <p className={`text-sm sm:text-base max-w-2xl mx-auto leading-relaxed ${
              isLight ? 'text-slate-600' : 'text-slate-300'
            }`}>
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
                className={`w-full sm:w-auto flex items-center justify-center space-x-2 px-8 py-4 rounded-2xl font-bold text-sm border transition-all cursor-pointer shadow-md ${
                  isLight 
                    ? 'bg-white hover:bg-slate-100 text-slate-800 border-slate-300' 
                    : 'bg-slate-900/90 hover:bg-slate-800 text-white border-slate-700 hover:border-brand-500/50'
                }`}
              >
                <ChartIcon className={`w-4 h-4 ${isLight ? 'text-blue-600' : 'text-brand-cyan'}`} />
                <span>Acessar Painel do Dono</span>
              </button>
            </div>
          </div>

          {/* Interactive Uber Earnings Simulator */}
          <div className={`mt-14 max-w-4xl mx-auto p-6 sm:p-8 rounded-3xl shadow-2xl backdrop-blur-xl relative overflow-hidden border ${
            isLight ? 'bg-white border-slate-200 text-slate-900' : 'bg-slate-900/90 border-slate-800 text-white'
          }`}>
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-5 mb-6 relative z-10 border-b ${
              isLight ? 'border-slate-200' : 'border-slate-800'
            }`}>
              <div>
                <span className={`text-[10px] font-black uppercase tracking-widest block ${
                  isLight ? 'text-blue-700' : 'text-brand-cyan'
                }`}>
                  SIMULADOR DE RENTABILIDADE
                </span>
                <h3 className={`text-lg font-black ${isLight ? 'text-slate-950' : 'text-white'}`}>
                  Quanto você pode lucrar rodando com a Cabral Locações?
                </h3>
              </div>
              <span className={`text-xs px-3 py-1 rounded-full font-black self-start border ${
                isLight ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-brand-500/20 text-brand-cyan border-brand-500/30'
              }`}>
                MANUTENÇÃO 100% INCLUSA
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center relative z-10">
              <div className="space-y-4">
                <div>
                  <div className={`flex justify-between text-xs font-bold mb-2 ${
                    isLight ? 'text-slate-700' : 'text-slate-300'
                  }`}>
                    <span>Horas rodadas por dia:</span>
                    <span className={`font-black text-sm ${isLight ? 'text-blue-700' : 'text-brand-cyan'}`}>
                      {simulatorHours} horas/dia
                    </span>
                  </div>
                  <input
                    type="range"
                    min="4"
                    max="14"
                    value={simulatorHours}
                    onChange={(e) => setSimulatorHours(parseInt(e.target.value))}
                    className={`w-full h-2 rounded-lg appearance-none cursor-pointer accent-brand-500 ${
                      isLight ? 'bg-slate-200' : 'bg-slate-800'
                    }`}
                  />
                </div>

                <div>
                  <label className={`text-xs font-bold block mb-2 ${
                    isLight ? 'text-slate-700' : 'text-slate-300'
                  }`}>
                    Categoria do Veículo:
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setSimulatorCarType('hatch')}
                      className={`p-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                        simulatorCarType === 'hatch'
                          ? isLight
                            ? 'bg-blue-50 border-brand-500 text-blue-800 shadow-md'
                            : 'bg-brand-500/20 border-brand-500 text-brand-300 shadow-md shadow-brand-500/20'
                          : isLight
                            ? 'bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900'
                            : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      <span className="font-extrabold block">🚗 Hatch (Onix/HB20)</span>
                      <span className={`block text-[10px] font-normal mt-0.5 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                        R$ 490/semana
                      </span>
                    </button>
                    <button
                      onClick={() => setSimulatorCarType('sedan')}
                      className={`p-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                        simulatorCarType === 'sedan'
                          ? isLight
                            ? 'bg-blue-50 border-brand-500 text-blue-800 shadow-md'
                            : 'bg-brand-500/20 border-brand-500 text-brand-300 shadow-md shadow-brand-500/20'
                          : isLight
                            ? 'bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900'
                            : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      <span className="font-extrabold block">🚘 Sedã (Cronos/Onix+)</span>
                      <span className={`block text-[10px] font-normal mt-0.5 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                        R$ 560/semana
                      </span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Result Card */}
              <div className={`p-6 rounded-2xl border space-y-3 text-center sm:text-left shadow-lg ${
                isLight 
                  ? 'bg-gradient-to-br from-blue-50 via-white to-blue-50/50 border-blue-200 text-slate-900' 
                  : 'bg-gradient-to-br from-brand-900/90 via-slate-900 to-slate-950 border-brand-500/30 text-white shadow-brand-500/10'
              }`}>
                <span className={`text-[11px] font-black uppercase tracking-wide block ${
                  isLight ? 'text-blue-700' : 'text-brand-cyan'
                }`}>
                  Lucro Líquido Mensal Estimado:
                </span>
                <span className={`text-3xl sm:text-4xl font-black block ${
                  isLight ? 'text-slate-900' : 'text-white'
                }`}>
                  {formatCurrency(Math.max(2800, estimatedMonthlyNet))}
                </span>
                <p className={`text-xs leading-snug ${
                  isLight ? 'text-slate-600' : 'text-slate-400'
                }`}>
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
            <h2 className={`text-2xl font-black tracking-tight font-display ${
              isLight ? 'text-slate-950' : 'text-white'
            }`}>
              Nossa Frota Disponível
            </h2>
            <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
              Veículos novos, revisados semanalmente e prontos para rodar
            </p>
          </div>

          <div className="flex items-center space-x-2">
            {(['all', 'Hatch', 'Sedan', 'SUV'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-brand-600 text-white font-black shadow-md shadow-brand-500/20'
                    : isLight
                      ? 'bg-white text-slate-700 hover:text-slate-950 border border-slate-200'
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
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
            <VehicleCardWithGallery
              key={car.id}
              car={car}
              isLight={isLight}
              onOpenContactHub={onOpenContactHub}
            />
          ))}
        </div>
      </section>

      {/* Differentiators Section */}
      <section className={`py-16 border-t ${
        isLight ? 'bg-slate-100/80 border-slate-200' : 'bg-slate-900/70 border-slate-800'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
          <div>
            <h2 className={`text-2xl font-black tracking-tight font-display ${
              isLight ? 'text-slate-950' : 'text-white'
            }`}>
              Por que alugar na Cabral Locações?
            </h2>
            <p className={`text-xs max-w-xl mx-auto mt-1 ${
              isLight ? 'text-slate-600' : 'text-slate-400'
            }`}>
              Diga adeus às filas intermináveis e cobranças injustas das grandes locadoras
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            <div className={`p-5 rounded-2xl space-y-2 transition-colors border ${
              isLight 
                ? 'bg-white border-slate-200 shadow-sm' 
                : 'bg-slate-950/80 border-slate-800/80 hover:border-brand-500/40'
            }`}>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${
                isLight ? 'bg-blue-50 border-blue-200 text-blue-700' : 'bg-brand-500/20 border-brand-500/30 text-brand-cyan'
              }`}>
                <ZapIcon className="w-5 h-5" />
              </div>
              <h3 className={`text-sm font-extrabold ${isLight ? 'text-slate-900' : 'text-white'}`}>Retirada em 2 Minutos</h3>
              <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>Contrato assinado pelo celular antes de sair de casa. Sem filas no balcão.</p>
            </div>

            <div className={`p-5 rounded-2xl space-y-2 transition-colors border ${
              isLight 
                ? 'bg-white border-slate-200 shadow-sm' 
                : 'bg-slate-950/80 border-slate-800/80 hover:border-brand-500/40'
            }`}>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${
                isLight ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-emerald-500/20 border-emerald-500/30 text-emerald-400'
              }`}>
                <KeyIcon className="w-5 h-5" />
              </div>
              <h3 className={`text-sm font-extrabold ${isLight ? 'text-slate-900' : 'text-white'}`}>Caução Facilitada</h3>
              <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>Devolução instantânea no PIX no ato da entrega do veículo, sem prender seu cartão.</p>
            </div>

            <div className={`p-5 rounded-2xl space-y-2 transition-colors border ${
              isLight 
                ? 'bg-white border-slate-200 shadow-sm' 
                : 'bg-slate-950/80 border-slate-800/80 hover:border-brand-500/40'
            }`}>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${
                isLight ? 'bg-amber-50 border-amber-200 text-amber-700' : 'bg-amber-500/20 border-amber-500/30 text-amber-400'
              }`}>
                <WrenchIcon className="w-5 h-5" />
              </div>
              <h3 className={`text-sm font-extrabold ${isLight ? 'text-slate-900' : 'text-white'}`}>Manutenção 100% Inclusa</h3>
              <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>Troca de óleo, pastilhas de freio e pneus cobertos pela locadora sem custos extras.</p>
            </div>

            <div className={`p-5 rounded-2xl space-y-2 transition-colors border ${
              isLight 
                ? 'bg-white border-slate-200 shadow-sm' 
                : 'bg-slate-950/80 border-slate-800/80 hover:border-brand-500/40'
            }`}>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${
                isLight ? 'bg-emerald-50 border-emerald-200 text-[#25D366]' : 'bg-[#25D366]/20 border-[#25D366]/30 text-[#25D366]'
              }`}>
                <WhatsAppIcon className="w-5 h-5 fill-[#25D366]" />
              </div>
              <h3 className={`text-sm font-extrabold ${isLight ? 'text-slate-900' : 'text-white'}`}>Atendimento Humanizado</h3>
              <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>Fale direto com a nossa equipe no WhatsApp, com respostas rápidas e sem robôs de 0800.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-10 border-t text-center text-xs space-y-3 ${
        isLight ? 'bg-slate-100 border-slate-200 text-slate-600' : 'bg-brand-dark border-slate-800 text-slate-400'
      }`}>
        <div className="flex justify-center">
          <BrandLogo size="md" theme={theme} />
        </div>
        <p className={`font-extrabold ${isLight ? 'text-slate-900' : 'text-slate-200'}`}>CABRAL LOCAÇÕES DE VEÍCULOS LTDA</p>
        <p className={`max-w-md mx-auto ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
          Locação Especializada para Motoristas de Aplicativo (Uber, 99) e Frotas Comerciais.
        </p>
        <div className="pt-2">
          <a
            href="https://wa.me/5511982886032?text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20os%20carros%20disponíveis%20na%20Cabral%20Locações."
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center space-x-2 font-bold text-xs px-4 py-2 rounded-xl transition-all border ${
              isLight 
                ? 'text-emerald-700 bg-white border-slate-300 hover:border-emerald-500 shadow-sm' 
                : 'text-[#25D366] bg-slate-900 border-slate-800 hover:border-[#25D366]/40'
            }`}
          >
            <WhatsAppIcon className="w-4 h-4 fill-[#25D366]" />
            <span>WhatsApp Oficial: +55 (11) 98288-6032</span>
          </a>
        </div>
      </footer>
    </div>
  );
};
