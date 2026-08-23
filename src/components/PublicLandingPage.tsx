import React, { useState } from 'react';
import { mockVehicles } from '../lib/mock-data';
import { formatCurrency } from '../lib/utils/calculations';

interface PublicLandingPageProps {
  onOpenContactHub: () => void;
  onGoToDashboard: () => void;
}

export const PublicLandingPage: React.FC<PublicLandingPageProps> = ({ onOpenContactHub, onGoToDashboard }) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'Hatch' | 'Sedan' | 'SUV'>('all');
  const [simulatorHours, setSimulatorHours] = useState(8);
  const [simulatorCarType, setSimulatorCarType] = useState('sedan');

  const filteredCars = mockVehicles.filter(v => 
    selectedCategory === 'all' || v.category === selectedCategory
  );

  // Estimator logic
  const weeklyRentalCost = simulatorCarType === 'sedan' ? 560 : 490;
  const estimatedMonthlyGross = simulatorHours * 35 * 26; // R$ 35/h * 26 dias
  const estimatedMonthlyNet = estimatedMonthlyGross - (weeklyRentalCost * 4.2) - (simulatorHours * 15 * 26); // menos aluguel e combustível

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 border-b border-slate-800 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center space-x-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-4 py-1.5 rounded-full text-xs font-extrabold tracking-wide uppercase">
              <span>🚗</span>
              <span>Locação Especializada para Motoristas de App</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
              Alugue seu carro para rodar na <span className="text-emerald-400">Uber & 99</span> sem dor de cabeça
            </h1>

            <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Retirada rápida em 2 minutos, manutenção 100% inclusa, caução facilitada e atendimento direto no WhatsApp com quem resolve.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={onOpenContactHub}
                className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-8 py-3.5 rounded-2xl font-black text-sm transition-all shadow-lg shadow-emerald-500/20 active:scale-95 cursor-pointer"
              >
                📲 Alugar Carro pelo WhatsApp
              </button>
              <button
                onClick={onGoToDashboard}
                className="w-full sm:w-auto bg-slate-800 hover:bg-slate-700 text-white px-8 py-3.5 rounded-2xl font-bold text-sm border border-slate-700 transition-all cursor-pointer"
              >
                📊 Acessar Painel do Dono
              </button>
            </div>
          </div>

          {/* Interactive Uber Earnings Simulator */}
          <div className="mt-14 max-w-4xl mx-auto bg-slate-900/90 border border-slate-800 p-6 sm:p-8 rounded-3xl shadow-2xl backdrop-blur-md">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-800 pb-5 mb-6">
              <div>
                <span className="text-[10px] font-extrabold text-emerald-400 uppercase tracking-widest block">SIMULADOR DE RENTABILIDADE</span>
                <h3 className="text-lg font-black text-white">Quanto você pode lucrar rodando com a Cabral Locações?</h3>
              </div>
              <span className="text-xs bg-slate-800 text-slate-300 px-3 py-1 rounded-full border border-slate-700 font-bold self-start">
                MANUTENÇÃO 100% INCLUSA
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-300 mb-2">
                    <span>Horas rodadas por dia:</span>
                    <span className="text-emerald-400 font-black">{simulatorHours} horas/dia</span>
                  </div>
                  <input
                    type="range"
                    min="4"
                    max="14"
                    value={simulatorHours}
                    onChange={(e) => setSimulatorHours(parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-2">Categoria do Veículo:</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setSimulatorCarType('hatch')}
                      className={`p-3 rounded-xl text-xs font-bold border transition-all ${
                        simulatorCarType === 'hatch'
                          ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400'
                          : 'bg-slate-800/60 border-slate-700 text-slate-400'
                      }`}
                    >
                      🚗 Hatch (Onix/HB20)
                      <span className="block text-[10px] font-normal mt-0.5">R$ 490/semana</span>
                    </button>
                    <button
                      onClick={() => setSimulatorCarType('sedan')}
                      className={`p-3 rounded-xl text-xs font-bold border transition-all ${
                        simulatorCarType === 'sedan'
                          ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400'
                          : 'bg-slate-800/60 border-slate-700 text-slate-400'
                      }`}
                    >
                      🚘 Sedã (Cronos/Onix+)
                      <span className="block text-[10px] font-normal mt-0.5">R$ 560/semana</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Result Card */}
              <div className="bg-gradient-to-br from-emerald-950/60 to-slate-900 p-6 rounded-2xl border border-emerald-800/50 space-y-3 text-center sm:text-left">
                <span className="text-[11px] font-extrabold text-emerald-400 uppercase tracking-wide block">
                  Lucro Líquido Mensal Estimado:
                </span>
                <span className="text-3xl sm:text-4xl font-black text-white block">
                  {formatCurrency(Math.max(2500, estimatedMonthlyNet))}
                </span>
                <p className="text-xs text-slate-400 leading-snug">
                  *Já descontado o valor do aluguel semanal e combustível estimado. Sem custos com seguro, IPVA ou troca de óleo!
                </p>
                <button
                  onClick={onOpenContactHub}
                  className="w-full mt-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black py-2.5 rounded-xl text-xs transition-all shadow-md active:scale-95"
                >
                  Garantir Meu Carro Agora
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
            <h2 className="text-2xl font-black text-white tracking-tight">Nossa Frota Disponível</h2>
            <p className="text-xs text-slate-400">Veículos revisados semanalmente, prontos para rodar</p>
          </div>

          <div className="flex items-center space-x-2">
            {(['all', 'Hatch', 'Sedan', 'SUV'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedCategory === cat
                    ? 'bg-emerald-500 text-slate-950 font-black'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
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
              className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-lg hover:border-slate-700 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="h-44 bg-slate-800 relative overflow-hidden">
                  <img src={car.photoUrl} alt={car.model} className="w-full h-full object-cover" />
                  <span className="absolute top-3 right-3 bg-slate-950/80 backdrop-blur-xs text-emerald-400 text-[10px] font-black px-2.5 py-1 rounded-full border border-emerald-500/30">
                    {car.category}
                  </span>
                </div>

                <div className="p-5 space-y-3">
                  <div>
                    <h3 className="text-base font-extrabold text-white">{car.model}</h3>
                    <p className="text-xs text-slate-400">Ano {car.year} · {car.color}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-300 bg-slate-800/60 p-2.5 rounded-xl border border-slate-700/50">
                    <span>❄️ Ar-condicionado</span>
                    <span>🕹️ Câmbio Flex</span>
                    <span>🧳 4 Portas</span>
                    <span>🛡️ Seguro 24h</span>
                  </div>
                </div>
              </div>

              <div className="p-5 border-t border-slate-800/80 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">A partir de</span>
                  <span className="text-lg font-black text-emerald-400">{formatCurrency(car.weeklyRate)}<span className="text-xs text-slate-400 font-normal">/sem</span></span>
                </div>

                <button
                  onClick={onOpenContactHub}
                  className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-4 py-2 rounded-xl text-xs font-extrabold transition-all active:scale-95"
                >
                  Alugar Agora
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Differentiators Section */}
      <section className="py-16 bg-slate-900 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
          <div>
            <h2 className="text-2xl font-black text-white tracking-tight">Por que alugar na Cabral Locações?</h2>
            <p className="text-xs text-slate-400 max-w-xl mx-auto mt-1">
              Diga adeus às filas intermináveis e cobranças injustas das grandes locadoras
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            <div className="bg-slate-950/60 border border-slate-800 p-5 rounded-2xl space-y-2">
              <span className="text-2xl">⚡</span>
              <h3 className="text-sm font-extrabold text-white">Retirada em 2 Minutos</h3>
              <p className="text-xs text-slate-400">Contrato assinado pelo celular antes de sair de casa. Sem filas no balcão.</p>
            </div>

            <div className="bg-slate-950/60 border border-slate-800 p-5 rounded-2xl space-y-2">
              <span className="text-2xl">💸</span>
              <h3 className="text-sm font-extrabold text-white">Caução Facilitada</h3>
              <p className="text-xs text-slate-400">Devolução instantânea no PIX no ato da entrega do veículo, sem prender seu cartão.</p>
            </div>

            <div className="bg-slate-950/60 border border-slate-800 p-5 rounded-2xl space-y-2">
              <span className="text-2xl">🛢️</span>
              <h3 className="text-sm font-extrabold text-white">Manutenção 100% Inclusa</h3>
              <p className="text-xs text-slate-400">Troca de óleo, pastilhas de freio e pneus cobertos pela locadora sem custos extras.</p>
            </div>

            <div className="bg-slate-950/60 border border-slate-800 p-5 rounded-2xl space-y-2">
              <span className="text-2xl">🤝</span>
              <h3 className="text-sm font-extrabold text-white">Atendimento Humanizado</h3>
              <p className="text-xs text-slate-400">Fale direto com a nossa equipe no WhatsApp, com respostas rápidas e sem robôs de 0800.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-slate-950 border-t border-slate-800 text-center text-xs text-slate-500">
        <p className="font-extrabold text-slate-400">CABRAL LOCAÇÕES DE VEÍCULOS LTDA</p>
        <p className="mt-1">Locação para Motoristas de Aplicativo e Frotas Comerciais · Atendimento direto pelo WhatsApp</p>
      </footer>
    </div>
  );
};
