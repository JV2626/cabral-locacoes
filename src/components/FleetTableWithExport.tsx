import React, { useState } from 'react';
import { Vehicle } from '../types/fleet';
import { formatCurrency, formatKm } from '../lib/utils/calculations';
import { exportFleetToCsv } from '../lib/utils/export';
import {
  CarIcon,
  DownloadIcon,
  CheckCircleIcon,
  KeyIcon,
  WrenchIcon
} from './Icons';

interface FleetTableWithExportProps {
  vehicles?: Vehicle[];
  onOpenAddVehicle?: () => void;
  onUpdateVehicleKm?: (plate: string, km: number) => void;
}

export const FleetTableWithExport: React.FC<FleetTableWithExportProps> = ({
  vehicles = [],
  onOpenAddVehicle,
  onUpdateVehicleKm
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [editingPlate, setEditingPlate] = useState<string | null>(null);
  const [kmInput, setKmInput] = useState<number>(0);

  const filteredVehicles = vehicles.filter(v => {
    const matchesSearch = v.model.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          v.plate.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (v.currentDriver && v.currentDriver.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || v.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleSaveKm = (plate: string) => {
    if (onUpdateVehicleKm && kmInput > 0) {
      onUpdateVehicleKm(plate, kmInput);
    }
    setEditingPlate(null);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 font-sans animate-in fade-in">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-slate-900 p-6 rounded-3xl shadow-xl border border-slate-800">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-2xl bg-brand-500/20 text-brand-300 flex items-center justify-center border border-brand-500/30">
            <CarIcon className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-white tracking-tight font-display">Gestão da Frota & Estoque</h1>
            <p className="text-xs text-slate-400 font-medium">Controle de {vehicles.length} veículos, odômetros e exportação de relatórios</p>
          </div>
        </div>

        {/* Action Buttons: Add Vehicle & Export */}
        <div className="flex flex-wrap items-center gap-2.5">
          {onOpenAddVehicle && (
            <button
              onClick={onOpenAddVehicle}
              className="flex items-center space-x-2 bg-gradient-to-r from-brand-500 to-blue-600 hover:from-brand-600 hover:to-blue-700 text-white px-5 py-3 rounded-2xl text-xs font-black transition-all shadow-lg shadow-brand-500/25 active:scale-95 cursor-pointer uppercase tracking-wider font-display"
            >
              <CarIcon className="w-4 h-4" />
              <span>+ Cadastrar Carro</span>
            </button>
          )}

          <button
            onClick={() => exportFleetToCsv(filteredVehicles)}
            className="flex items-center space-x-2 bg-slate-950 hover:bg-slate-800 text-slate-200 border border-slate-700 px-5 py-3 rounded-2xl text-xs font-bold transition-all active:scale-95 cursor-pointer"
          >
            <DownloadIcon className="w-4 h-4" />
            <span>Exportar CSV</span>
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
                  <td className="py-4 px-5">
                    {editingPlate === vehicle.plate ? (
                      <div className="flex items-center space-x-1.5">
                        <input
                          type="number"
                          value={kmInput}
                          onChange={(e) => setKmInput(Number(e.target.value))}
                          className="w-24 bg-slate-950 border border-brand-500 rounded-lg px-2 py-1 text-xs text-white font-mono font-bold"
                          autoFocus
                        />
                        <button
                          onClick={() => handleSaveKm(vehicle.plate)}
                          className="bg-brand-500 hover:bg-brand-600 text-white text-[10px] font-bold px-2 py-1 rounded-md"
                        >
                          Salvar
                        </button>
                        <button
                          onClick={() => setEditingPlate(null)}
                          className="text-slate-400 hover:text-white text-[10px] px-1"
                        >
                          ✕
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-white font-mono">{formatKm(vehicle.currentKm)}</span>
                        <button
                          onClick={() => {
                            setEditingPlate(vehicle.plate);
                            setKmInput(vehicle.currentKm);
                          }}
                          className="text-[10px] text-slate-500 hover:text-brand-cyan transition-colors"
                          title="Atualizar Odômetro"
                        >
                          ✏️
                        </button>
                      </div>
                    )}
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
