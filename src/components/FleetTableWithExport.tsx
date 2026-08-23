import React, { useState } from 'react';
import { mockVehicles } from '../lib/mock-data';
import { formatCurrency, formatKm } from '../lib/utils/calculations';
import { exportFleetToCsv } from '../lib/utils/export';

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
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-5 rounded-2xl shadow-sm border border-slate-200/80">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center text-xl font-bold">
            🚗
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Gestão da Frota</h1>
            <p className="text-xs text-slate-500 font-medium">Controle de veículos, motoristas ativos e exportação de relatórios contábeis</p>
          </div>
        </div>

        {/* Action Buttons for Exporting */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => exportFleetToCsv(filteredVehicles)}
            className="flex items-center space-x-1.5 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm active:scale-95 cursor-pointer"
          >
            <span>📗</span>
            <span>Exportar CSV / Excel</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200/80 flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Buscar por placa, modelo ou motorista..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 text-xs rounded-xl px-3.5 py-2.5 text-slate-800 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div className="flex items-center space-x-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-50 border border-slate-300 text-slate-800 text-xs font-semibold rounded-xl px-3.5 py-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none cursor-pointer"
          >
            <option value="all">Todos os Status</option>
            <option value="rented">Em Locação (Na Rua)</option>
            <option value="available">Disponíveis (Pátio)</option>
            <option value="maintenance">Em Manutenção</option>
          </select>
        </div>
      </div>

      {/* Interactive Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
                <th className="py-3.5 px-4">Veículo / Placa</th>
                <th className="py-3.5 px-4">Categoria</th>
                <th className="py-3.5 px-4">KM Atual</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Motorista Ativo</th>
                <th className="py-3.5 px-4 text-right">Semanalidade</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs font-medium">
              {filteredVehicles.map((vehicle) => (
                <tr key={vehicle.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-9 h-9 rounded-lg bg-slate-100 overflow-hidden shrink-0 border border-slate-200">
                        <img src={vehicle.photoUrl} alt={vehicle.model} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <span className="font-extrabold text-slate-900 block leading-tight">{vehicle.model}</span>
                        <span className="text-[11px] font-mono text-slate-400">{vehicle.plate} · {vehicle.year}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="bg-slate-100 text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded-md">
                      {vehicle.category}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-bold text-slate-800">
                    {formatKm(vehicle.currentKm)}
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full ${
                        vehicle.status === 'rented'
                          ? 'bg-purple-100 text-purple-800'
                          : vehicle.status === 'available'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {vehicle.status === 'rented' ? '🔑 EM LOCAÇÃO' : vehicle.status === 'available' ? '🟢 DISPONÍVEL' : '🔧 MANUTENÇÃO'}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-700 font-medium">
                    {vehicle.currentDriver ? (
                      <span className="font-bold text-slate-900">{vehicle.currentDriver}</span>
                    ) : (
                      <span className="text-slate-400 italic">No Pátio</span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-right font-black text-slate-900">
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
