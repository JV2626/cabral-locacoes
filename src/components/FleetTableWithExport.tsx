import React, { useState } from 'react';
import { mockVehicles } from '../lib/mock-data';
import { formatCurrency, formatKm } from '../lib/utils/calculations';
import { exportFleetToCsv } from '../lib/utils/export';
import {
  CarIcon,
  DownloadIcon,
  CheckCircleIcon,
  KeyIcon,
  WrenchIcon
} from './Icons';

export const FleetTableWithExport: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredVehicles = mockVehicles.filter(v => {
    const matchesSearch = v.model.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          v.plate.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (v.currentDriver && v.currentDriver.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || v.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 font-sans">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-slate-900 p-6 rounded-3xl shadow-xl border border-slate-800">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-2xl bg-brand-500/20 text-brand-300 flex items-center justify-center border border-brand-500/30">
            <CarIcon className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-white tracking-tight font-display">Gestão da Frota</h1>
            <p className="text-xs text-slate-400 font-medium">Controle de veículos, motoristas ativos e exportação de relatórios contábeis</p>
          </div>
        </div>

        {/* Action Buttons for Exporting */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => exportFleetToCsv(filteredVehicles)}
            className="flex items-center space-x-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white px-5 py-3 rounded-2xl text-xs font-black transition-all shadow-lg shadow-emerald-600/20 active:scale-95 cursor-pointer uppercase tracking-wider font-display"
          >
            <DownloadIcon className="w-4 h-4" />
            <span>Exportar CSV / Excel</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-slate-900 p-4 rounded-3xl shadow-xl border border-slate-800 flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Buscar por placa, modelo ou motorista..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 text-xs rounded-xl px-4 py-2.5 text-white placeholder-slate-500 focus:ring-2 focus:ring-brand-500 focus:outline-none"
          />
        </div>

        <div className="flex items-center space-x-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-950 border border-slate-700 text-white text-xs font-bold rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-brand-500 focus:outline-none cursor-pointer"
          >
            <option value="all">Todos os Status</option>
            <option value="rented">Em Locação (Na Rua)</option>
            <option value="available">Disponíveis (Pátio)</option>
            <option value="maintenance">Em Manutenção</option>
          </select>
        </div>
      </div>

      {/* Interactive Table */}
      <div className="bg-slate-900 rounded-3xl shadow-xl border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-950 border-b border-slate-800 text-[10px] font-black text-slate-400 uppercase tracking-wider">
                <th className="py-4 px-5">Veículo / Placa</th>
                <th className="py-4 px-5">Categoria</th>
                <th className="py-4 px-5">KM Atual</th>
                <th className="py-4 px-5">Status</th>
                <th className="py-4 px-5">Motorista Ativo</th>
                <th className="py-4 px-5 text-right">Semanalidade</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-xs font-medium">
              {filteredVehicles.map((vehicle) => (
                <tr key={vehicle.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-4 px-5">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-950 overflow-hidden shrink-0 border border-slate-800">
                        <img src={vehicle.photoUrl} alt={vehicle.model} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <span className="font-black text-white block leading-tight">{vehicle.model}</span>
                        <span className="text-[11px] font-mono text-slate-400">{vehicle.plate} · {vehicle.year}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-5">
                    <span className="bg-slate-950 text-slate-300 text-[10px] font-bold px-2.5 py-1 rounded-lg border border-slate-800">
                      {vehicle.category}
                    </span>
                  </td>
                  <td className="py-4 px-5 font-bold text-white font-mono">
                    {formatKm(vehicle.currentKm)}
                  </td>
                  <td className="py-4 px-5">
                    <span
                      className={`text-[10px] font-black px-2.5 py-1 rounded-full border ${
                        vehicle.status === 'rented'
                          ? 'bg-purple-500/20 text-purple-300 border-purple-500/30'
                          : vehicle.status === 'available'
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                          : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                      }`}
                    >
                      {vehicle.status === 'rented' ? '🔑 EM LOCAÇÃO' : vehicle.status === 'available' ? '🟢 DISPONÍVEL' : '🔧 MANUTENÇÃO'}
                    </span>
                  </td>
                  <td className="py-4 px-5 text-slate-300">
                    {vehicle.currentDriver ? (
                      <span className="font-bold text-white">{vehicle.currentDriver}</span>
                    ) : (
                      <span className="text-slate-500 italic">No Pátio</span>
                    )}
                  </td>
                  <td className="py-4 px-5 text-right font-black text-brand-cyan">
                    {formatCurrency(vehicle.weeklyRate)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
