import React, { useState } from 'react';
import { mockKpiMetrics, mockContracts } from '../lib/mock-data';
import { formatCurrency } from '../lib/utils/calculations';

export const DashboardOverview: React.FC = () => {
  const [period, setPeriod] = useState('Mês Atual');

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header with Title and Period Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-5 rounded-2xl shadow-sm border border-slate-200/80">
        <div>
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Bem-vindo, Administrador</span>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Visão Geral</h1>
        </div>

        <div className="flex items-center space-x-3">
          <label className="text-xs font-bold text-slate-500">Período:</label>
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="bg-slate-50 border border-slate-300 text-slate-800 text-xs font-semibold rounded-xl px-3.5 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none cursor-pointer"
          >
            <option value="Mês Atual">Mês Atual</option>
            <option value="Mês Anterior">Mês Anterior</option>
            <option value="Últimos 90 dias">Últimos 90 dias</option>
            <option value="Ano 2026">Ano 2026</option>
          </select>
        </div>
      </div>

      {/* 10 Strategic KPI Cards Grid (Exact matching Image 2 with colored left borders) */}
      <div>
        <h2 className="text-xs font-extrabold text-slate-500 uppercase tracking-wider mb-3 px-1">Geral</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3.5">
          {/* 1. Troca de Óleo */}
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200/80 border-l-4 border-l-amber-500 relative flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xl">🛢️</span>
              <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-400 text-[10px] flex items-center justify-center font-bold">i</span>
            </div>
            <div>
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">TROCA DE ÓLEO</span>
              <span className="text-xl font-black text-slate-900">{mockKpiMetrics.oilChangesPending}</span>
            </div>
          </div>

          {/* 2. Vistorias */}
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200/80 border-l-4 border-l-teal-500 relative flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xl">📋</span>
              <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-400 text-[10px] flex items-center justify-center font-bold">i</span>
            </div>
            <div>
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">VISTORIAS</span>
              <span className="text-xl font-black text-slate-900">{mockKpiMetrics.inspectionsPending}</span>
            </div>
          </div>

          {/* 3. Locações Ativas */}
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200/80 border-l-4 border-l-blue-500 relative flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xl">📝</span>
              <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-400 text-[10px] flex items-center justify-center font-bold">i</span>
            </div>
            <div>
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">LOCAÇÕES ATIVAS</span>
              <span className="text-xl font-black text-slate-900">{mockKpiMetrics.activeRentals}</span>
            </div>
          </div>

          {/* 4. Veículos Disponíveis */}
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200/80 border-l-4 border-l-emerald-500 relative flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xl">🚗</span>
              <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-400 text-[10px] flex items-center justify-center font-bold">i</span>
            </div>
            <div>
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">VEÍCULOS DISPONÍVEIS</span>
              <span className="text-xl font-black text-slate-900">{mockKpiMetrics.availableVehicles}</span>
            </div>
          </div>

          {/* 5. Em Locação */}
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200/80 border-l-4 border-l-purple-500 relative flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xl">🔑</span>
              <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-400 text-[10px] flex items-center justify-center font-bold">i</span>
            </div>
            <div>
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">EM LOCAÇÃO</span>
              <span className="text-xl font-black text-slate-900">{mockKpiMetrics.rentedVehicles}</span>
            </div>
          </div>

          {/* 6. Investido */}
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200/80 border-l-4 border-l-indigo-600 relative flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xl">💵</span>
              <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-400 text-[10px] flex items-center justify-center font-bold">i</span>
            </div>
            <div>
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">INVESTIDO</span>
              <span className="text-sm sm:text-base font-black text-slate-900">{formatCurrency(mockKpiMetrics.totalInvested)}</span>
            </div>
          </div>

          {/* 7. A Vencer */}
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200/80 border-l-4 border-l-yellow-400 relative flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xl">⏰</span>
              <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-400 text-[10px] flex items-center justify-center font-bold">i</span>
            </div>
            <div>
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">A VENCER</span>
              <span className="text-sm sm:text-base font-black text-slate-900">{formatCurrency(mockKpiMetrics.upcomingReceivables)}</span>
            </div>
          </div>

          {/* 8. Recebidos */}
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200/80 border-l-4 border-l-green-600 relative flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xl">✅</span>
              <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-400 text-[10px] flex items-center justify-center font-bold">i</span>
            </div>
            <div>
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">RECEBIDOS</span>
              <span className="text-sm sm:text-base font-black text-emerald-600">{formatCurrency(mockKpiMetrics.receivedMonth)}</span>
            </div>
          </div>

          {/* 9. Em Atraso */}
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200/80 border-l-4 border-l-rose-500 relative flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xl">🚨</span>
              <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-400 text-[10px] flex items-center justify-center font-bold">i</span>
            </div>
            <div>
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">EM ATRASO</span>
              <span className="text-sm sm:text-base font-black text-rose-600">{formatCurrency(mockKpiMetrics.overdueAmount)}</span>
            </div>
          </div>

          {/* 10. Multas */}
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200/80 border-l-4 border-l-amber-800 relative flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xl">🎟️</span>
              <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-400 text-[10px] flex items-center justify-center font-bold">i</span>
            </div>
            <div>
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">MULTAS</span>
              <span className="text-sm sm:text-base font-black text-slate-900">{formatCurrency(mockKpiMetrics.pendingFines)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Calendário de Recebimentos da Semana */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/80 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-base font-extrabold text-slate-900">📅 Calendário de Recebimentos</h3>
            <p className="text-xs text-slate-500">Acompanhe as entradas recebidas, em atraso e a vencer da Cabral Locações</p>
          </div>
          <div className="flex items-center space-x-3 text-xs font-semibold">
            <span className="flex items-center space-x-1"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> <span>Recebido</span></span>
            <span className="flex items-center space-x-1"><span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span> <span>A Vencer</span></span>
            <span className="flex items-center space-x-1"><span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span> <span>Em Atraso</span></span>
          </div>
        </div>

        {/* Weekly Faturas Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {mockContracts.map((contract) => (
            <div
              key={contract.id}
              className={`p-4 rounded-xl border transition-all ${
                contract.status === 'paid_this_week'
                  ? 'bg-emerald-50/50 border-emerald-200'
                  : contract.status === 'overdue'
                  ? 'bg-rose-50/50 border-rose-200'
                  : 'bg-amber-50/50 border-amber-200'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-black text-slate-900">{contract.vehiclePlate}</span>
                <span
                  className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full ${
                    contract.status === 'paid_this_week'
                      ? 'bg-emerald-100 text-emerald-800'
                      : contract.status === 'overdue'
                      ? 'bg-rose-100 text-rose-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {contract.status === 'paid_this_week' ? 'RECEBIDO' : contract.status === 'overdue' ? 'EM ATRASO' : 'A VENCER'}
                </span>
              </div>
              <p className="text-xs font-bold text-slate-800">{contract.driverName}</p>
              <p className="text-[11px] text-slate-500 mb-2">{contract.vehicleModel} · {contract.driverPhone}</p>
              <div className="flex items-center justify-between border-t border-slate-200/60 pt-2 text-xs">
                <span className="text-slate-500">Semanalidade:</span>
                <span className="font-extrabold text-slate-900">{formatCurrency(contract.rate)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
