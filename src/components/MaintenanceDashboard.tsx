import React, { useState } from 'react';
import { mockMaintenanceRules, mockQuotedParts } from '../lib/mock-data';
import { formatKm, formatCurrency } from '../lib/utils/calculations';
import { generatePurchaseOrderPdf } from '../lib/utils/pdfGenerator';
import {
  WrenchIcon,
  PdfIcon,
  DownloadIcon,
  SparklesIcon,
  AlertTriangleIcon
} from './Icons';

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

  const handleGeneratePdf = () => {
    const orderNumber = `OC-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const formattedDate = new Date().toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });

    generatePurchaseOrderPdf({
      orderNumber,
      date: formattedDate,
      items: parts,
      totalAmount: totalQuote,
      estimatedSavings: estimatedSavings
    });

    setOrderGenerated(true);
    setTimeout(() => setOrderGenerated(false), 5000);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12 font-sans">
      {/* Title Header */}
      <div className="flex items-center space-x-3 bg-slate-900 p-6 rounded-3xl shadow-xl border border-slate-800">
        <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
          <WrenchIcon className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight font-display">Manutenção Preditiva</h1>
          <p className="text-xs text-slate-400 font-medium">Controle de manutenção preventiva, contagem regressiva de KM e cotação de peças</p>
        </div>
      </div>

      {/* Main Grid: Form on Left + Countdown Cards on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Side: Nova Manutenção Recorrente Form */}
        <div className="lg:col-span-5 bg-slate-900 p-6 sm:p-8 rounded-3xl shadow-xl border border-slate-800 space-y-6">
          <div className="border-b border-slate-800 pb-3">
            <h2 className="text-base font-black text-white font-display">Nova Manutenção Recorrente</h2>
            <p className="text-xs text-slate-400 mt-1">
              Selecione o veículo, o tipo de manutenção e configure o alerta por KM ou tempo.
            </p>
          </div>

          {/* Step 1 */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <span className="w-5 h-5 rounded-full bg-brand-500 text-white text-xs font-black flex items-center justify-center">1</span>
              <span className="text-xs font-black text-white">Veículo & Tipo de manutenção</span>
            </div>
            <p className="text-[11px] text-slate-400 pl-7 -mt-2">Defina o veículo, tipo de serviço e o tipo de alerta.</p>

            <div className="space-y-3 pl-7">
              <div>
                <label className="text-[11px] font-bold text-slate-400 block mb-1">Veículo</label>
                <input
                  type="text"
                  placeholder="Digite o nome do veículo ou placa"
                  value={vehicleSearch}
                  onChange={(e) => setVehicleSearch(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 text-xs rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:ring-2 focus:ring-brand-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-slate-400 block mb-1">Tipo de manutenção</label>
                  <select
                    value={serviceType}
                    onChange={(e) => setServiceType(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 text-xs rounded-xl px-3 py-2.5 text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
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
                  <label className="text-[11px] font-bold text-slate-400 block mb-1">Tipo de alerta</label>
                  <select
                    value={alertType}
                    onChange={(e) => setAlertType(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 text-xs rounded-xl px-3 py-2.5 text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
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
          <div className="space-y-4 pt-2 border-t border-slate-800">
            <div className="flex items-center space-x-2">
              <span className="w-5 h-5 rounded-full bg-brand-500 text-white text-xs font-black flex items-center justify-center">2</span>
              <span className="text-xs font-black text-white">Regras de recorrência</span>
            </div>
            <p className="text-[11px] text-slate-400 pl-7 -mt-2">Configure a recorrência baseada em KM ou datas.</p>

            <div className="grid grid-cols-2 gap-3 pl-7">
              <div>
                <label className="text-[11px] font-bold text-slate-400 block mb-1">Odômetro inicial (Km)</label>
                <input
                  type="text"
                  placeholder="Ex: 80.000 KM"
                  value={initialKm}
                  onChange={(e) => setInitialKm(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 text-xs rounded-xl px-3 py-2.5 text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-[11px] font-bold text-slate-400 block mb-1">Intervalo em KM</label>
                <input
                  type="text"
                  placeholder="Ex: 10.000 KM"
                  value={intervalKm}
                  onChange={(e) => setIntervalKm(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 text-xs rounded-xl px-3 py-2.5 text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-800">
            <button
              onClick={() => {
                setVehicleSearch('');
                setServiceType('');
                setAlertType('');
              }}
              className="btn-secondary px-5 py-2.5 rounded-xl text-xs cursor-pointer"
            >
              Limpar
            </button>
            <button
              onClick={() => alert('Regra de manutenção salva com sucesso!')}
              className="btn-primary px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider cursor-pointer font-display"
            >
              Salvar Regra
            </button>
          </div>
        </div>

        {/* Right Side: Próximas Manutenções a Vencer */}
        <div className="lg:col-span-7 bg-slate-900 p-6 sm:p-8 rounded-3xl shadow-xl border border-slate-800 space-y-4">
          <div className="flex items-center space-x-2 border-b border-slate-800 pb-3">
            <AlertTriangleIcon className="w-5 h-5 text-amber-400" />
            <h2 className="text-base font-black text-white font-display">Próximas Manutenções a Vencer</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            {mockMaintenanceRules.map((rule) => (
              <div
                key={rule.id}
                className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                    <span className="font-black text-white truncate max-w-[130px]">{rule.vehicleModel} - {rule.serviceName}</span>
                  </div>

                  <div className="my-2">
                    <span className="text-xl font-black text-brand-cyan block leading-tight font-display">{formatKm(rule.remainingKm)}</span>
                    <span className="text-[10px] font-bold text-slate-400">para o vencimento</span>
                  </div>

                  <p className="text-[10px] text-slate-400 mb-3 leading-tight">
                    Início {formatKm(rule.initialKm)} · Atual {formatKm(rule.currentKm)} · Int. {formatKm(rule.intervalKm)}
                  </p>
                </div>

                <div>
                  {/* Progress Bar */}
                  <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden mb-1.5 border border-slate-800">
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
                  <span className="text-[10px] font-bold text-slate-400 block text-right">
                    {rule.percentageReached}% do ciclo atingido
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section: Gamified AI Quoting Engine */}
      <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl border border-slate-800 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-800 pb-5">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-brand-500/20 text-brand-cyan flex items-center justify-center border border-brand-500/30">
              <SparklesIcon className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-lg font-black text-white font-display">Cotação de Peças com IA Gamificada</h3>
                <span className="bg-brand-500/20 text-brand-cyan text-[10px] font-black px-2.5 py-0.5 rounded-full border border-brand-500/30">
                  ROBÔ ATIVO
                </span>
              </div>
              <p className="text-xs text-slate-400">
                A IA analisou os carros em alerta e montou a lista de compras. Digite apenas o valor unitário cotado na autopeças:
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3 bg-slate-950 p-3 rounded-2xl border border-slate-800">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Total do Pacote</span>
              <span className="text-base font-black text-brand-cyan">{formatCurrency(totalQuote)}</span>
            </div>
            <span className="text-slate-700">|</span>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Economia em Lote</span>
              <span className="text-xs font-bold text-emerald-400">{formatCurrency(estimatedSavings)}</span>
            </div>
          </div>
        </div>

        {/* Quoting Interactive Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {parts.map((item) => (
            <div key={item.id} className="bg-slate-950/80 border border-slate-800 p-5 rounded-2xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-brand-cyan bg-brand-900/40 px-2 py-0.5 rounded-md border border-brand-500/30">
                  {item.vehiclePlate} ({item.vehicleModel})
                </span>
                <span className="text-xs text-slate-400 font-bold">{item.quantity} {item.unit}</span>
              </div>
              <p className="text-xs font-bold text-slate-200">{item.partName}</p>
              
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Preço Unitário (R$)</label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-xs text-slate-500 font-bold">R$</span>
                  <input
                    type="number"
                    value={item.unitPrice}
                    onChange={(e) => handlePriceChange(item.id, parseFloat(e.target.value) || 0)}
                    className="w-full bg-slate-900 border border-slate-700 text-xs rounded-xl pl-8 pr-3 py-2 text-white font-bold focus:ring-2 focus:ring-brand-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-slate-800 pt-2 text-[11px]">
                <span className="text-slate-400">Subtotal:</span>
                <span className="font-black text-brand-cyan">{formatCurrency(item.quantity * item.unitPrice)}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-2">
          {orderGenerated && (
            <span className="text-xs text-brand-cyan font-bold animate-pulse">
              ✅ Ordem de compra gerada e baixada com sucesso!
            </span>
          )}
          <button
            onClick={handleGeneratePdf}
            className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-gradient-to-r from-brand-500 via-blue-600 to-brand-500 hover:from-brand-600 hover:to-blue-700 text-white px-6 py-3 rounded-2xl font-black text-xs transition-all shadow-xl shadow-brand-500/25 active:scale-95 cursor-pointer uppercase tracking-wider font-display"
          >
            <DownloadIcon className="w-4 h-4" />
            <span>Baixar Ordem de Compra em PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
};
