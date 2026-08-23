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
  onEditVehicle?: (vehicle: Vehicle) => void;
}

export const FleetTableWithExport: React.FC<FleetTableWithExportProps> = ({
  vehicles = [],
  onOpenAddVehicle,
  onUpdateVehicleKm,
  onEditVehicle
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
            <p className="text-xs text-slate-400 font-medium">Controle de {vehicles.length} veículos, fotos, odômetros e exportação de relatórios</p>
          </div>
        </div>

        {/* Action Buttons: Add Vehicle & Export */}
        <div className="flex flex-wrap items-center gap-2.5">
          {onOpenAddVehicle && (
            <button
              onClick={onOpenAddVehicle}
              className="btn-primary flex items-center space-x-2 px-5 py-3 rounded-2xl text-xs font-black uppercase tracking-wider font-display cursor-pointer"
            >
              <CarIcon className="w-4 h-4" />
              <span>+ Cadastrar Carro</span>
            </button>
          )}

          <button
            onClick={() => exportFleetToCsv(filteredVehicles)}
            className="btn-secondary flex items-center space-x-2 px-5 py-3 rounded-2xl text-xs font-bold cursor-pointer"
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

      {/* MOBILE CARDS VIEW (< md) */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {filteredVehicles.map((vehicle) => (
          <div
            key={vehicle.id}
            className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl space-y-4 relative overflow-hidden"
          >
            {/* Header: Photo, Status Badge & Photos Count */}
            <div className="relative rounded-2xl overflow-hidden aspect-video bg-slate-950 border border-slate-800">
              <img
                src={vehicle.photoUrl}
                alt={vehicle.model}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2.5 left-2.5">
                <span
                  className={`text-[10px] font-black px-2.5 py-1 rounded-full border shadow-md ${
                    vehicle.status === 'rented'
                      ? 'bg-purple-600/90 text-white border-purple-400/50'
                      : vehicle.status === 'available'
                      ? 'bg-emerald-600/90 text-white border-emerald-400/50'
                      : 'bg-amber-600/90 text-slate-950 border-amber-400/50'
                  }`}
                >
                  {vehicle.status === 'rented' ? '🔑 EM LOCAÇÃO' : vehicle.status === 'available' ? '🟢 DISPONÍVEL' : '🔧 MANUTENÇÃO'}
                </span>
              </div>

              {vehicle.photos && vehicle.photos.length > 1 && (
                <div className="absolute bottom-2.5 right-2.5 bg-black/80 backdrop-blur-sm text-white text-[10px] font-black px-2 py-1 rounded-lg border border-white/20">
                  📸 +{vehicle.photos.length} fotos
                </div>
              )}
            </div>

            {/* Vehicle Title & Details */}
            <div className="flex items-start justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-black text-white leading-tight">{vehicle.model}</h3>
                <span className="text-xs text-slate-400 mt-0.5 block">
                  {vehicle.year} · {vehicle.color || 'Prata'} · {vehicle.category}
                </span>
              </div>
              <span className="font-mono text-xs font-black text-brand-cyan bg-brand-500/10 border border-brand-500/30 px-2.5 py-1 rounded-lg shrink-0">
                {vehicle.plate}
              </span>
            </div>

            {/* Grid with KM, Driver and Weekly Rate */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              {/* Odometer (KM) with Touch-friendly Edit */}
              <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800/80 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Odômetro Atual
                </span>
                {editingPlate === vehicle.plate ? (
                  <div className="space-y-1.5 pt-1">
                    <input
                      type="number"
                      value={kmInput}
                      onChange={(e) => setKmInput(Number(e.target.value))}
                      className="w-full bg-slate-900 border border-brand-500 rounded-lg px-2 py-1 text-xs text-white font-mono font-bold"
                      autoFocus
                    />
                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => handleSaveKm(vehicle.plate)}
                        className="flex-1 bg-brand-500 hover:bg-brand-600 text-white text-[11px] font-bold py-1 rounded-md"
                      >
                        Salvar
                      </button>
                      <button
                        onClick={() => setEditingPlate(null)}
                        className="px-2 py-1 bg-slate-800 text-slate-300 text-[11px] rounded-md"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between pt-0.5">
                    <span className="font-mono font-black text-white text-sm">
                      {formatKm(vehicle.currentKm)}
                    </span>
                    <button
                      onClick={() => {
                        setEditingPlate(vehicle.plate);
                        setKmInput(vehicle.currentKm);
                      }}
                      className="text-xs bg-slate-900 hover:bg-slate-800 border border-slate-700 text-brand-cyan px-2 py-1 rounded-lg font-bold cursor-pointer"
                      title="Editar KM"
                    >
                      ✏️ Alterar
                    </button>
                  </div>
                )}
              </div>

              {/* Weekly Rate */}
              <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800/80">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Semanalidade
                </span>
                <span className="font-black text-brand-cyan text-sm block">
                  {formatCurrency(vehicle.weeklyRate)}
                </span>
                <span className="text-[10px] text-slate-500">por semana</span>
              </div>
            </div>

            {/* Current Driver Info */}
            <div className="flex items-center justify-between text-xs bg-slate-950/60 p-3 rounded-2xl border border-slate-800/60">
              <span className="text-slate-400 font-bold">Motorista Responsável:</span>
              {vehicle.currentDriver ? (
                <span className="font-black text-white flex items-center space-x-1">
                  <span>🚗</span>
                  <span>{vehicle.currentDriver}</span>
                </span>
              ) : (
                <span className="text-emerald-400 font-bold italic">Disponível no Pátio</span>
              )}
            </div>

            {/* Main Action Button (Prominent & Accessible) */}
            {onEditVehicle && (
              <button
                onClick={() => onEditVehicle(vehicle)}
                className="w-full btn-secondary py-3 rounded-2xl text-xs font-black flex items-center justify-center space-x-2 cursor-pointer shadow-lg"
              >
                <span>✏️</span>
                <span>Editar Carro, Dados & Múltiplas Fotos</span>
              </button>
            )}
          </div>
        ))}
      </div>

      {/* DESKTOP TABLE VIEW (>= md) */}
      <div className="hidden md:block bg-slate-900 rounded-3xl shadow-xl border border-slate-800 overflow-hidden">
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
                <th className="py-4 px-5 text-center">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-xs font-medium">
              {filteredVehicles.map((vehicle) => (
                <tr key={vehicle.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-4 px-5">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-10 rounded-xl bg-slate-950 overflow-hidden shrink-0 border border-slate-800 relative group">
                        <img src={vehicle.photoUrl} alt={vehicle.model} className="w-full h-full object-cover" />
                        {vehicle.photos && vehicle.photos.length > 1 && (
                          <span className="absolute bottom-0 right-0 bg-brand-500 text-white text-[8px] font-black px-1 rounded-tl">
                            +{vehicle.photos.length}
                          </span>
                        )}
                      </div>
                      <div>
                        <span className="font-black text-white block leading-tight">{vehicle.model}</span>
                        <span className="text-[11px] font-mono text-slate-400">{vehicle.plate} · {vehicle.year} · {vehicle.color || 'Prata'}</span>
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
                  <td className="py-4 px-5 text-center">
                    {onEditVehicle && (
                      <button
                        onClick={() => onEditVehicle(vehicle)}
                        className="btn-secondary px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer inline-flex items-center space-x-1 hover:border-blue-500"
                        title="Editar Veículo e Múltiplas Fotos"
                      >
                        <span>✏️</span>
                        <span>Editar</span>
                      </button>
                    )}
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
