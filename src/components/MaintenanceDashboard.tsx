import React, { useState } from 'react';
import { mockMaintenanceRules, mockQuotedParts } from '../lib/mock-data';
import { formatKm, formatCurrency } from '../lib/utils/calculations';

export const MaintenanceDashboard: React.FC = () => {
  const [vehicleSearch, setVehicleSearch] = useState('');
  const [serviceType, setServiceType] = useState('');
  const [alertType, setAlertType] = useState('');
  const [initialKm, setInitialKm] = useState('80.000 KM');
  const [intervalKm, setIntervalKm] = useState('10.000 KM');

  // Gamified Quoting State
  const [parts, setParts] = useState(mockQuotedParts);
  const [orderGenerated, setOrderGenerated] = useState(false);

  const handlePriceChange = (id: string, newPrice: number) => {
    setParts(prev => prev.map(p => p.id === id ? { ...p, unitPrice: newPrice } : p));
  };

  const totalQuote = parts.reduce((acc, curr) => acc + (curr.quantity * curr.unitPrice), 0);
  const estimatedSavings = totalQuote * 0.18; // 18% lote

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      {/* Title Header */}
      <div className="flex items-center space-x-3 bg-white p-5 rounded-2xl shadow-sm border border-slate-200/80">
        <span className="text-2xl text-blue-600">🔧</span>
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Manutenção</h1>
          <p className="text-xs text-slate-500 font-medium">Controle de manutenção preventiva, alertas de KM e cotação de peças</p>
        </div>
      </div>

      {/* Main Grid: Form on Left + Countdown Cards on Right (Exact layout of Image 1) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Side: Nova Manutenção Recorrente Form */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl shadow-sm border border-slate-200/80 space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <div className="flex items-center space-x-2 text-slate-900 font-extrabold text-base">
              <span>⚙️</span>
              <h2>Nova Manutenção Recorrente</h2>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Selecione o veículo, o tipo de manutenção e configure o alerta recorrente por KM ou por dias.
            </p>
          </div>

          {/* Step 1 */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 text-xs font-bold flex items-center justify-center">1</span>
              <span className="text-xs font-extrabold text-slate-800">Veículo & Tipo de manutenção</span>
            </div>
            <p className="text-[11px] text-slate-400 pl-7 -mt-2">Defina o veículo, tipo de manutenção e o tipo de alerta.</p>

            <div className="space-y-3 pl-7">
              <div>
                <label className="text-[11px] font-bold text-slate-600 block mb-1">Veículo</label>
                <input
                  type="text"
                  placeholder="Digite o nome do veículo ou placa"
                  value={vehicleSearch}
                  onChange={(e) => setVehicleSearch(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 text-xs rounded-xl px-3.5 py-2.5 text-slate-800 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-slate-600 block mb-1">Tipo de manutenção</label>
                  <select
                    value={serviceType}
                    onChange={(e) => setServiceType(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 text-xs rounded-xl px-3 py-2.5 text-slate-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    <option value="">Selecione o tipo</option>
                    <option value="oleo">Troca de Óleo</option>
                    <option value="filtro_oleo">Filtro de Óleo</option>
                    <option value="alinhamento">Alinhamento & Balanc.</option>
                    <option value="rodizio">Rodízio de Pneus</option>
                    <option value="pastilhas">Pastilhas de Freio</option>
                    <option value="revisao">Revisão Geral</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-600 block mb-1">Tipo de alerta</label>
                  <select
                    value={alertType}
                    onChange={(e) => setAlertType(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 text-xs rounded-xl px-3 py-2.5 text-slate-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    <option value="">Selecione o tipo</option>
                    <option value="km">Por Quilometragem (KM)</option>
                    <option value="dias">Por Dias / Meses</option>
                    <option value="hibrido">Híbrido (KM ou Tempo)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="space-y-4 pt-2 border-t border-slate-100">
            <div className="flex items-center space-x-2">
              <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 text-xs font-bold flex items-center justify-center">2</span>
              <span className="text-xs font-extrabold text-slate-800">Regras de recorrência</span>
            </div>
            <p className="text-[11px] text-slate-400 pl-7 -mt-2">Configure a recorrência baseada em quilometragem ou datas.</p>

            <div className="grid grid-cols-2 gap-3 pl-7">
              <div>
                <label className="text-[11px] font-bold text-slate-600 block mb-1">Odômetro inicial (Km)</label>
                <input
                  type="text"
                  placeholder="Ex: 80.000 KM"
                  value={initialKm}
                  onChange={(e) => setInitialKm(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 text-xs rounded-xl px-3 py-2.5 text-slate-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-[11px] font-bold text-slate-600 block mb-1">Intervalo em KM</label>
                <input
                  type="text"
                  placeholder="Ex: 10.000 KM"
                  value={intervalKm}
                  onChange={(e) => setIntervalKm(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 text-xs rounded-xl px-3 py-2.5 text-slate-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-100">
            <button
              onClick={() => {
                setVehicleSearch('');
                setServiceType('');
                setAlertType('');
              }}
              className="flex items-center space-x-1.5 px-4 py-2 border border-slate-300 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors"
            >
              <span>🔄</span>
              <span>Limpar</span>
            </button>
            <button
              onClick={() => alert('Regra de manutenção salva com sucesso!')}
              className="flex items-center space-x-1.5 px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-all shadow-md active:scale-95"
            >
              <span>💾</span>
              <span>Salvar</span>
            </button>
          </div>
        </div>

        {/* Right Side: Próximas Manutenções a Vencer (Cards Grid matching Image 1) */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl shadow-sm border border-slate-200/80 space-y-4">
          <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
            <span className="text-amber-500 font-bold">⚠️</span>
            <h2 className="text-base font-extrabold text-slate-900">Próximas Manutenções a Vencer</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            {mockMaintenanceRules.map((rule) => (
              <div
                key={rule.id}
                className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                    <span className="font-extrabold text-slate-800 truncate max-w-[130px]">{rule.vehicleModel} - {rule.serviceName}</span>
                    <span className="text-[10px] font-bold text-slate-400">⏱️</span>
                  </div>

                  <div className="my-2">
                    <span className="text-lg font-black text-slate-900 block leading-tight">{formatKm(rule.remainingKm)}</span>
                    <span className="text-[10px] font-medium text-slate-400">para o vencimento</span>
                  </div>

                  <p className="text-[10px] text-slate-500 mb-2 leading-tight">
                    Início {formatKm(rule.initialKm)} · Atual {formatKm(rule.currentKm)} · Int. {formatKm(rule.intervalKm)}
                  </p>
                </div>

                <div>
                  {/* Progress Bar */}
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mb-1.5">
                    <div
                      className={`h-full rounded-full transition-all ${
                        rule.status === 'red'
                          ? 'bg-rose-500'
                          : rule.status === 'yellow'
                          ? 'bg-amber-500'
                          : 'bg-emerald-500'
                      }`}
                      style={{ width: `${rule.percentageReached}%` }}
                    ></div>
                  </div>
                  <span className="text-[10px] font-bold text-slate-500 block text-right">
                    {rule.percentageReached}% do período atingido
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section: Gamified AI Quoting Engine */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white p-6 sm:p-8 rounded-3xl shadow-xl border border-slate-800 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-800 pb-5">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center text-xl font-bold border border-amber-500/30">
              🎮
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-lg font-black text-white">Cotação de Peças com IA Gamificada</h3>
                <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                  ROBÔ ATIVO
                </span>
              </div>
              <p className="text-xs text-slate-400">
                A IA analisou os carros em alerta e montou a lista de compras. Digite apenas o valor unitário cotado na autopeças:
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3 bg-slate-800/80 px-4 py-2 rounded-2xl border border-slate-700/60">
            <div>
              <span className="text-[10px] font-extrabold text-slate-400 uppercase block">Total do Pacote</span>
              <span className="text-base font-black text-emerald-400">{formatCurrency(totalQuote)}</span>
            </div>
            <span className="text-slate-600">|</span>
            <div>
              <span className="text-[10px] font-extrabold text-slate-400 uppercase block">Economia em Lote</span>
              <span className="text-xs font-bold text-amber-400">{formatCurrency(estimatedSavings)}</span>
            </div>
          </div>
        </div>

        {/* Quoting Interactive Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {parts.map((item) => (
            <div key={item.id} className="bg-slate-800/60 border border-slate-700/60 p-4 rounded-2xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-md border border-emerald-800/50">
                  {item.vehiclePlate} ({item.vehicleModel})
                </span>
                <span className="text-xs text-slate-400 font-bold">{item.quantity} {item.unit}</span>
              </div>
              <p className="text-xs font-medium text-slate-200">{item.partName}</p>
              
              <div>
                <label className="text-[10px] font-extrabold text-slate-400 uppercase block mb-1">Preço Unitário (R$)</label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-xs text-slate-500 font-bold">R$</span>
                  <input
                    type="number"
                    value={item.unitPrice}
                    onChange={(e) => handlePriceChange(item.id, parseFloat(e.target.value) || 0)}
                    className="w-full bg-slate-900 border border-slate-600 text-xs rounded-xl pl-8 pr-3 py-1.5 text-white font-bold focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-slate-700/60 pt-2 text-[11px]">
                <span className="text-slate-400">Subtotal:</span>
                <span className="font-extrabold text-white">{formatCurrency(item.quantity * item.unitPrice)}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-2">
          {orderGenerated && (
            <span className="text-xs text-emerald-400 font-bold animate-pulse">
              ✅ Ordem de compra gerada e pronta para envio!
            </span>
          )}
          <button
            onClick={() => {
              setOrderGenerated(true);
              setTimeout(() => setOrderGenerated(false), 4000);
            }}
            className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-5 py-2.5 rounded-xl font-extrabold text-xs transition-all shadow-lg shadow-emerald-500/20 active:scale-95"
          >
            <span>📄</span>
            <span>Gerar Ordem de Compra em PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
};
