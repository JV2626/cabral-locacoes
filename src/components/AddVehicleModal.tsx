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
  // Multiple Photos Management
  const [photoUrl, setPhotoUrl] = useState(
    'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&auto=format&fit=crop&q=60'
  );
  const [photos, setPhotos] = useState<string[]>([
    'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&auto=format&fit=crop&q=60'
  ]);
  const [newPhotoInput, setNewPhotoInput] = useState('');

  if (!isOpen) return null;

  const handleAddPhotoUrl = () => {
    if (!newPhotoInput.trim()) return;
    const url = newPhotoInput.trim();
    if (!photos.includes(url)) {
      setPhotos(prev => [...prev, url]);
      if (!photoUrl) setPhotoUrl(url);
    }
    setNewPhotoInput('');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = () => {
          const result = reader.result as string;
          setPhotos(prev => [...prev, result]);
          if (!photoUrl) setPhotoUrl(result);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleRemovePhoto = (index: number) => {
    const updated = photos.filter((_, i) => i !== index);
    setPhotos(updated);
    if (photoUrl === photos[index]) {
      setPhotoUrl(updated[0] || '');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!model.trim() || !plate.trim()) {
      alert('Preencha os campos obrigatórios (Modelo e Placa).');
      return;
    }

    const mainPhoto = photos[0] || photoUrl || 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&auto=format&fit=crop&q=60';

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
      photoUrl: mainPhoto,
      photos: photos.length > 0 ? photos : [mainPhoto]
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

          {/* 📸 Múltiplas Fotos do Veículo */}
          <div className="space-y-3 border-t border-slate-800 pt-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-black text-brand-cyan uppercase tracking-wider block">
                📸 Fotos do Veículo ({photos.length} adicionadas)
              </label>
              <span className="text-[10px] text-slate-400">Frente, Lados, Traseira, Interior</span>
            </div>

            {/* Existing Photos Grid */}
            {photos.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {photos.map((url, idx) => (
                  <div key={idx} className="relative group rounded-xl overflow-hidden border border-slate-800 bg-slate-950 h-20">
                    <img src={url} alt={`Foto ${idx + 1}`} className="w-full h-full object-cover" />
                    <span className="absolute bottom-1 left-1 bg-black/70 text-[9px] font-bold text-white px-1.5 py-0.5 rounded">
                      {idx === 0 ? '⭐ Principal' : `Foto #${idx + 1}`}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRemovePhoto(idx)}
                      className="absolute top-1 right-1 w-5 h-5 rounded-full bg-rose-600/90 text-white flex items-center justify-center text-[10px] font-black opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                      title="Remover Foto"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Add Photo Controls */}
            <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 space-y-2">
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  placeholder="Cole o link (URL) da foto..."
                  value={newPhotoInput}
                  onChange={(e) => setNewPhotoInput(e.target.value)}
                  className="flex-1 bg-slate-900 border border-slate-700 text-xs rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:ring-2 focus:ring-brand-500 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleAddPhotoUrl}
                  className="bg-brand-500 hover:bg-brand-600 text-white font-bold px-3 py-2 rounded-xl text-xs transition-colors cursor-pointer shrink-0"
                >
                  + Link
                </button>
              </div>

              <div className="flex items-center space-x-2">
                <label className="flex-1 flex items-center justify-center space-x-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer">
                  <span>📁 Enviar Foto do Celular / PC</span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-end space-x-3 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary px-5 py-2.5 rounded-xl text-xs cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="btn-primary px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider font-display cursor-pointer"
            >
              Adicionar ao Estoque
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
