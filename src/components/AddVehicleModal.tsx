import React, { useState } from 'react';
import { Vehicle, VehicleCategory, VehicleStatus } from '../types/fleet';
import { BrandLogo } from './BrandLogo';
import { CarIcon } from './Icons';

interface AddVehicleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddVehicle: (newVehicle: Vehicle) => void;
}

export const AddVehicleModal: React.FC<AddVehicleModalProps> = ({
  isOpen,
  onClose,
  onAddVehicle
}) => {
  const [model, setModel] = useState('');
  const [plate, setPlate] = useState('');
  const [category, setCategory] = useState<VehicleCategory>('Hatch');
  const [year, setYear] = useState(2024);
  const [color, setColor] = useState('Prata');
  const [currentKm, setCurrentKm] = useState(0);
  const [weeklyRate, setWeeklyRate] = useState(490);
  const [dailyRate, setDailyRate] = useState(95);
  const [status, setStatus] = useState<VehicleStatus>('available');
  const [photoUrl, setPhotoUrl] = useState(
    'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&auto=format&fit=crop&q=60'
  );

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!model.trim() || !plate.trim()) {
      alert('Preencha os campos obrigatórios (Modelo e Placa).');
      return;
    }

    const newVehicle: Vehicle = {
      id: `veh-${Date.now()}`,
      model: model.trim(),
      plate: plate.trim().toUpperCase(),
      category,
      year: Number(year),
      color: color.trim(),
      currentKm: Number(currentKm),
      weeklyRate: Number(weeklyRate),
      dailyRate: Number(dailyRate),
      status,
      photoUrl: photoUrl.trim()
    };

    onAddVehicle(newVehicle);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-dark/85 backdrop-blur-md animate-in fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden text-white">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-brand-900 via-slate-900 to-brand-900 p-6 relative border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-brand-500/20 text-brand-300 flex items-center justify-center border border-brand-500/30">
              <CarIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-white font-display">Cadastrar Novo Veículo no Estoque</h3>
              <p className="text-xs text-slate-400">Adicione carros para aluguel imediato na frota</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center font-bold text-sm transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Modelo do Carro *</label>
              <input
                type="text"
                required
                placeholder="Ex: Fiat Cronos 1.3 Drive"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 text-xs rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:ring-2 focus:ring-brand-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Placa do Veículo *</label>
              <input
                type="text"
                required
                placeholder="Ex: BRA-2026"
                value={plate}
                onChange={(e) => setPlate(e.target.value.toUpperCase())}
                className="w-full bg-slate-950 border border-slate-700 text-xs font-mono font-bold rounded-xl px-3.5 py-2.5 text-brand-cyan placeholder-slate-500 focus:ring-2 focus:ring-brand-500 focus:outline-none uppercase"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Categoria</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as VehicleCategory)}
                className="w-full bg-slate-950 border border-slate-700 text-xs rounded-xl px-2.5 py-2.5 text-white focus:ring-2 focus:ring-brand-500 focus:outline-none cursor-pointer"
              >
                <option value="Hatch">Hatch</option>
                <option value="Sedan">Sedan</option>
                <option value="SUV">SUV</option>
                <option value="Eletrico">Elétrico</option>
                <option value="Utilitario">Utilitário</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Ano</label>
              <input
                type="number"
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-700 text-xs rounded-xl px-3 py-2.5 text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Cor</label>
              <input
                type="text"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                placeholder="Prata / Branco"
                className="w-full bg-slate-950 border border-slate-700 text-xs rounded-xl px-3 py-2.5 text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">KM Atual</label>
              <input
                type="number"
                value={currentKm}
                onChange={(e) => setCurrentKm(Number(e.target.value))}
                placeholder="0"
                className="w-full bg-slate-950 border border-slate-700 text-xs rounded-xl px-3 py-2.5 text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Semanalidade (R$)</label>
              <input
                type="number"
                value={weeklyRate}
                onChange={(e) => setWeeklyRate(Number(e.target.value))}
                placeholder="490"
                className="w-full bg-slate-950 border border-slate-700 text-xs font-bold text-brand-cyan rounded-xl px-3 py-2.5 focus:ring-2 focus:ring-brand-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Status Inicial</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as VehicleStatus)}
                className="w-full bg-slate-950 border border-slate-700 text-xs rounded-xl px-2 py-2.5 text-white focus:ring-2 focus:ring-brand-500 focus:outline-none cursor-pointer"
              >
                <option value="available">Disponível</option>
                <option value="rented">Em Locação</option>
                <option value="maintenance">Em Manutenção</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1">Foto do Veículo (URL da imagem)</label>
            <input
              type="text"
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
              placeholder="https://..."
              className="w-full bg-slate-950 border border-slate-700 text-xs rounded-xl px-3.5 py-2 text-white placeholder-slate-500 focus:ring-2 focus:ring-brand-500 focus:outline-none"
            />
          </div>

          <div className="pt-2 flex items-center justify-end space-x-3 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 border border-slate-700 rounded-xl text-xs font-bold text-slate-300 hover:bg-slate-800 transition-colors cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-gradient-to-r from-brand-500 to-blue-600 hover:from-brand-600 hover:to-blue-700 text-white rounded-xl text-xs font-black transition-all shadow-lg shadow-brand-500/25 active:scale-95 cursor-pointer uppercase tracking-wider font-display"
            >
              Adicionar ao Estoque
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
