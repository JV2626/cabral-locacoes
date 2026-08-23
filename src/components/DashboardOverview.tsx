import React, { useState } from 'react';
import { Vehicle, Contract, MaintenanceRule } from '../types/fleet';
import { mockKpiMetrics, mockContracts, mockTrafficFines, mockDriverScores, mockVehicles, mockMaintenanceRules } from '../lib/mock-data';
import { formatCurrency } from '../lib/utils/calculations';
import {
  WrenchIcon,
  ShieldCheckIcon,
  CarIcon,
  KeyIcon,
  ZapIcon,
  AlertTriangleIcon,
  CheckCircleIcon,
  WhatsAppIcon
} from './Icons';

interface DashboardOverviewProps {
  vehicles?: Vehicle[];
  contracts?: Contract[];
  maintenanceRules?: MaintenanceRule[];
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  vehicles = mockVehicles,
  contracts = mockContracts,
  maintenanceRules = mockMaintenanceRules
}) => {
  const [period, setPeriod] = useState('Mês Atual');
  const [fines, setFines] = useState(mockTrafficFines);
  const [transferToast, setTransferToast] = useState<string | null>(null);

  // Dynamic Real-time Calculations
  const oilChangesPending = maintenanceRules.filter(
    m => m.serviceType === 'oleo' && (m.status === 'red' || m.status === 'yellow')
  ).length;

  const inspectionsPending = maintenanceRules.filter(
    m => m.serviceType === 'revisao_geral' && (m.status === 'red' || m.status === 'yellow')
  ).length;

  const activeRentals = contracts.length;
  const availableVehicles = vehicles.filter(v => v.status === 'available').length;
  const rentedVehicles = vehicles.filter(v => v.status === 'rented').length;
  const upcomingReceivables = contracts.reduce((acc, c) => acc + c.rate, 0);
  const overdueAmount = contracts.filter(c => c.status === 'overdue').reduce((acc, c) => acc + c.rate, 0);

  const handleTransferFine = (id: string, driverName: string, points: number) => {
    setFines(prev => prev.map(f => f.id === id ? { ...f, status: 'transferred' } : f));
    setTransferToast(`Formulário de indicação gerado! ${points} pontos transferidos para a CNH de ${driverName}.`);
    setTimeout(() => setTransferToast(null), 4500);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12 font-sans">
      {/* Header with Title and Period Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-slate-900 p-6 rounded-3xl shadow-xl border border-slate-800">
        <div>
          <span className="text-xs font-black text-brand-cyan uppercase tracking-widest block mb-1">
            Painel Executivo da Frota
          </span>
          <h1 className="text-2xl font-black text-white tracking-tight font-display">Visão Geral & 10 KPIs</h1>
        </div>

        <div className="flex items-center space-x-3">
          <label className="text-xs font-bold text-slate-400">Período:</label>
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="bg-slate-950 border border-slate-700 text-white text-xs font-bold rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-brand-500 focus:outline-none cursor-pointer"
          >
            <option value="Mês Atual">Mês Atual</option>
            <option value="Mês Anterior">Mês Anterior</option>
            <option value="Últimos 90 dias">Últimos 90 dias</option>
            <option value="Ano 2026">Ano 2026</option>
          </select>
        </div>
      </div>

      {/* 10 Strategic KPI Cards Grid */}
      <div>
        <h2 className="text-xs font-black text-brand-cyan uppercase tracking-wider mb-3 px-1">
          Indicadores de Performance Operacional (10 KPIs)
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3.5">
          {/* 1. Troca de Óleo */}
          <div className="bg-slate-900 p-4 rounded-2xl shadow-lg border border-slate-800 border-l-4 border-l-amber-500 flex flex-col justify-between hover:border-slate-700 transition-all">
            <div className="flex items-center justify-between mb-2">
              <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
                <WrenchIcon className="w-4 h-4" />
              </div>
              <span className="w-5 h-5 rounded-full bg-slate-800 text-slate-400 text-[10px] flex items-center justify-center font-bold">i</span>
            </div>
            <div>
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">TROCA DE ÓLEO</span>
              <span className="text-xl font-black text-amber-400">{oilChangesPending}</span>
            </div>
          </div>

          {/* 2. Vistorias */}
          <div className="bg-slate-900 p-4 rounded-2xl shadow-lg border border-slate-800 border-l-4 border-l-teal-500 flex flex-col justify-between hover:border-slate-700 transition-all">
            <div className="flex items-center justify-between mb-2">
              <div className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center">
                <ShieldCheckIcon className="w-4 h-4" />
              </div>
              <span className="w-5 h-5 rounded-full bg-slate-800 text-slate-400 text-[10px] flex items-center justify-center font-bold">i</span>
            </div>
            <div>
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">VISTORIAS</span>
              <span className="text-xl font-black text-white">{inspectionsPending}</span>
            </div>
          </div>

          {/* 3. Locações Ativas */}
          <div className="bg-slate-900 p-4 rounded-2xl shadow-lg border border-slate-800 border-l-4 border-l-brand-500 flex flex-col justify-between hover:border-slate-700 transition-all">
            <div className="flex items-center justify-between mb-2">
              <div className="w-8 h-8 rounded-lg bg-brand-500/20 text-brand-300 flex items-center justify-center">
                <CarIcon className="w-4 h-4" />
              </div>
              <span className="w-5 h-5 rounded-full bg-slate-800 text-slate-400 text-[10px] flex items-center justify-center font-bold">i</span>
            </div>
            <div>
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">LOCAÇÕES ATIVAS</span>
              <span className="text-xl font-black text-white">{activeRentals}</span>
            </div>
          </div>

          {/* 4. Veículos Disponíveis */}
          <div className="bg-slate-900 p-4 rounded-2xl shadow-lg border border-slate-800 border-l-4 border-l-emerald-500 flex flex-col justify-between hover:border-slate-700 transition-all">
            <div className="flex items-center justify-between mb-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <CheckCircleIcon className="w-4 h-4" />
              </div>
              <span className="w-5 h-5 rounded-full bg-slate-800 text-slate-400 text-[10px] flex items-center justify-center font-bold">i</span>
            </div>
            <div>
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">DISPONÍVEIS</span>
              <span className="text-xl font-black text-emerald-400">{availableVehicles}</span>
            </div>
          </div>

          {/* 5. Em Locação */}
          <div className="bg-slate-900 p-4 rounded-2xl shadow-lg border border-slate-800 border-l-4 border-l-purple-500 flex flex-col justify-between hover:border-slate-700 transition-all">
            <div className="flex items-center justify-between mb-2">
              <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center">
                <KeyIcon className="w-4 h-4" />
              </div>
              <span className="w-5 h-5 rounded-full bg-slate-800 text-slate-400 text-[10px] flex items-center justify-center font-bold">i</span>
            </div>
            <div>
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">EM LOCAÇÃO</span>
              <span className="text-xl font-black text-white">{rentedVehicles}</span>
            </div>
          </div>

          {/* 6. Investido */}
          <div className="bg-slate-900 p-4 rounded-2xl shadow-lg border border-slate-800 border-l-4 border-l-indigo-600 flex flex-col justify-between hover:border-slate-700 transition-all">
            <div className="flex items-center justify-between mb-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
                <ZapIcon className="w-4 h-4" />
              </div>
              <span className="w-5 h-5 rounded-full bg-slate-800 text-slate-400 text-[10px] flex items-center justify-center font-bold">i</span>
            </div>
            <div>
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">INVESTIDO</span>
              <span className="text-sm sm:text-base font-black text-white">{formatCurrency(vehicles.length * 75000)}</span>
            </div>
          </div>

          {/* 7. A Vencer */}
          <div className="bg-slate-900 p-4 rounded-2xl shadow-lg border border-slate-800 border-l-4 border-l-yellow-400 flex flex-col justify-between hover:border-slate-700 transition-all">
            <div className="flex items-center justify-between mb-2">
              <div className="w-8 h-8 rounded-lg bg-yellow-500/20 text-yellow-400 flex items-center justify-center font-bold text-xs">
                R$
              </div>
              <span className="w-5 h-5 rounded-full bg-slate-800 text-slate-400 text-[10px] flex items-center justify-center font-bold">i</span>
            </div>
            <div>
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">A VENCER</span>
              <span className="text-sm sm:text-base font-black text-white">{formatCurrency(upcomingReceivables)}</span>
            </div>
          </div>

          {/* 8. Recebidos */}
          <div className="bg-slate-900 p-4 rounded-2xl shadow-lg border border-slate-800 border-l-4 border-l-emerald-500 flex flex-col justify-between hover:border-slate-700 transition-all">
            <div className="flex items-center justify-between mb-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <CheckCircleIcon className="w-4 h-4" />
              </div>
              <span className="w-5 h-5 rounded-full bg-slate-800 text-slate-400 text-[10px] flex items-center justify-center font-bold">i</span>
            </div>
            <div>
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">RECEBIDOS</span>
              <span className="text-sm sm:text-base font-black text-emerald-400">{formatCurrency(mockKpiMetrics.receivedMonth)}</span>
            </div>
          </div>

          {/* 9. Inadimplência */}
          <div className="bg-slate-900 p-4 rounded-2xl shadow-lg border border-slate-800 border-l-4 border-l-rose-500 flex flex-col justify-between hover:border-slate-700 transition-all">
            <div className="flex items-center justify-between mb-2">
              <div className="w-8 h-8 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center">
                <AlertTriangleIcon className="w-4 h-4" />
              </div>
              <span className="w-5 h-5 rounded-full bg-slate-800 text-slate-400 text-[10px] flex items-center justify-center font-bold">i</span>
            </div>
            <div>
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">INADIMPLÊNCIA</span>
              <span className="text-sm sm:text-base font-black text-rose-400">{formatCurrency(overdueAmount)}</span>
            </div>
          </div>

          {/* 10. Multas */}
          <div className="bg-slate-900 p-4 rounded-2xl shadow-lg border border-slate-800 border-l-4 border-l-amber-700 flex flex-col justify-between hover:border-slate-700 transition-all">
            <div className="flex items-center justify-between mb-2">
              <div className="w-8 h-8 rounded-lg bg-amber-600/20 text-amber-300 flex items-center justify-center font-bold text-xs">
                CNH
              </div>
              <span className="w-5 h-5 rounded-full bg-slate-800 text-slate-400 text-[10px] flex items-center justify-center font-bold">i</span>
            </div>
            <div>
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">MULTAS</span>
              <span className="text-sm sm:text-base font-black text-amber-300">{formatCurrency(mockKpiMetrics.pendingFines)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Gestor Inteligente de Multas & Indicação de Condutor */}
      <div className="bg-slate-900 p-6 sm:p-8 rounded-3xl shadow-xl border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-base font-black text-white font-display">Gestor de Multas & Blindagem da CNH</h3>
            <p className="text-xs text-slate-400">Transfira a pontuação da CNH e repasse a cobrança diretamente ao motorista infrator</p>
          </div>
          <span className="text-xs font-black text-amber-300 bg-amber-500/15 px-3 py-1 rounded-full border border-amber-500/30 self-start">
            BLINDAGEM DA CNH DO DONO ATIVA
          </span>
        </div>

        {transferToast && (
          <div className="p-3 bg-brand-500/20 border border-brand-500/40 text-brand-cyan rounded-xl text-xs font-bold text-center animate-in fade-in">
            {transferToast}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {fines.map((fine) => (
            <div key={fine.id} className="p-5 rounded-2xl border border-slate-800 bg-slate-950/70 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-white">{fine.vehiclePlate} ({fine.vehicleModel})</span>
                <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full ${
                  fine.status === 'transferred' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                }`}>
                  {fine.status === 'transferred' ? '✅ PONTOS TRANSFERIDOS' : '⚠️ REPASSE PENDENTE'}
                </span>
              </div>

              <div>
                <p className="text-xs font-bold text-slate-200">{fine.description}</p>
                <p className="text-[11px] text-slate-400">{fine.location} · {fine.date}</p>
              </div>

              <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 text-xs flex justify-between items-center">
                <div>
                  <span className="text-slate-400 block text-[10px]">Condutor Responsável:</span>
                  <span className="font-bold text-white">{fine.driverName}</span>
                </div>
                <div className="text-right">
                  <span className="text-slate-400 block text-[10px]">Penalidade:</span>
                  <span className="font-black text-rose-400">{fine.points} Pontos · {formatCurrency(fine.amount)}</span>
                </div>
              </div>

              {fine.status === 'pending_transfer' ? (
                <button
                  onClick={() => handleTransferFine(fine.id, fine.driverName, fine.points)}
                  className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-brand-500 to-blue-600 hover:from-brand-600 hover:to-blue-700 text-white font-bold py-2.5 rounded-xl text-xs transition-all shadow-md shadow-brand-500/20 active:scale-95 cursor-pointer"
                >
                  <WhatsAppIcon className="w-3.5 h-3.5 fill-white" />
                  <span>Gerar Indicação & Cobrar via WhatsApp</span>
                </button>
              ) : (
                <div className="text-center text-xs font-bold text-emerald-300 bg-emerald-500/15 py-2 rounded-xl border border-emerald-500/30">
                  Formulário Senatran Enviado · CNH do Dono Protegida
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Score do Motorista & Clube do Bom Condutor */}
      <div className="bg-slate-900 p-6 sm:p-8 rounded-3xl shadow-xl border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-base font-black text-white font-display">Score de Risco & Clube do Bom Motorista</h3>
            <p className="text-xs text-slate-400">Histórico de pontualidade no PIX, envio de fotos de painel e caução progressiva</p>
          </div>
          <span className="text-xs font-black text-brand-cyan bg-brand-500/15 px-3 py-1 rounded-full border border-brand-500/30 self-start">
            RETENÇÃO E ANTI-CALOTE
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {mockDriverScores.map((ds) => (
            <div key={ds.id} className="p-5 rounded-2xl border border-slate-800 bg-slate-950/70 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">{ds.driverName}</span>
                <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full ${
                  ds.tier === 'Diamante' ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' :
                  ds.tier === 'Ouro' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'bg-slate-800 text-slate-300'
                }`}>
                  NÍVEL {ds.tier.toUpperCase()}
                </span>
              </div>

              <div className="flex items-baseline space-x-2">
                <span className="text-3xl font-black text-white font-display">{ds.score}</span>
                <span className="text-xs text-slate-400 font-bold">/ 1000 pts</span>
              </div>

              <div className="space-y-1.5 text-[11px] text-slate-300">
                <div className="flex justify-between">
                  <span className="text-slate-400">Pontualidade Semanal:</span>
                  <span className="font-bold text-brand-cyan">{ds.ontimePaymentRate}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Envio de KM Semanal:</span>
                  <span className="font-bold text-brand-cyan">{ds.odometerComplianceRate}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Meses sem Multas:</span>
                  <span className="font-bold text-emerald-400">{ds.zeroFinesMonths} meses</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800 text-xs flex justify-between items-center">
                <span className="text-slate-400 text-[11px]">Desconto na Caução:</span>
                <span className="font-extrabold text-emerald-400">{ds.depositDiscountPercent}% OFF</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Calendário de Recebimentos da Semana */}
      <div className="bg-slate-900 p-6 sm:p-8 rounded-3xl shadow-xl border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-base font-black text-white font-display">Calendário de Recebimentos</h3>
            <p className="text-xs text-slate-400">Acompanhe as entradas recebidas, em atraso e a vencer da Cabral Locações</p>
          </div>
          <div className="flex items-center space-x-3 text-xs font-semibold">
            <span className="flex items-center space-x-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> <span className="text-slate-300">Recebido</span></span>
            <span className="flex items-center space-x-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span> <span className="text-slate-300">A Vencer</span></span>
            <span className="flex items-center space-x-1.5"><span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span> <span className="text-slate-300">Em Atraso</span></span>
          </div>
        </div>

        {/* Weekly Faturas Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {mockContracts.map((contract) => (
            <div
              key={contract.id}
              className={`p-5 rounded-2xl border transition-all ${
                contract.status === 'paid_this_week'
                  ? 'bg-slate-950/70 border-emerald-500/40'
                  : contract.status === 'overdue'
                  ? 'bg-slate-950/70 border-rose-500/40'
                  : 'bg-slate-950/70 border-amber-500/40'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-black text-white">{contract.vehiclePlate}</span>
                <span
                  className={`text-[10px] font-black px-2.5 py-0.5 rounded-full ${
                    contract.status === 'paid_this_week'
                      ? 'bg-emerald-500/20 text-emerald-300'
                      : contract.status === 'overdue'
                      ? 'bg-rose-500/20 text-rose-300'
                      : 'bg-amber-500/20 text-amber-300'
                  }`}
                >
                  {contract.status === 'paid_this_week' ? 'RECEBIDO' : contract.status === 'overdue' ? 'EM ATRASO' : 'A VENCER'}
                </span>
              </div>
              <p className="text-xs font-bold text-slate-200">{contract.driverName}</p>
              <p className="text-[11px] text-slate-400 mb-2">{contract.vehicleModel} · {contract.driverPhone}</p>
              <div className="flex items-center justify-between border-t border-slate-800 pt-2 text-xs">
                <span className="text-slate-400">Semanalidade:</span>
                <span className="font-black text-brand-cyan">{formatCurrency(contract.rate)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
