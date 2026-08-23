import React, { useState } from 'react';
import { mockVehicles, mockContracts, mockMaintenanceRules } from '../lib/mock-data';
import { formatCurrency, formatKm } from '../lib/utils/calculations';

interface DriverPortalProps {
  onOpenContactHub: () => void;
}

export const DriverPortal: React.FC<DriverPortalProps> = ({ onOpenContactHub }) => {
  const [cnhInput, setCnhInput] = useState('04829104928'); // Preloaded with Carlos Eduardo (HB20)
  const [photoSent, setPhotoSent] = useState(false);
  const [pixCopied, setPixCopied] = useState(false);

  const contract = mockContracts.find(c => c.driverCnh === cnhInput) || mockContracts[1];
  const vehicle = mockVehicles.find(v => v.plate === contract.vehiclePlate) || mockVehicles[1];
  const maintenance = mockMaintenanceRules.find(m => m.vehiclePlate === contract.vehiclePlate) || mockMaintenanceRules[4];

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Header Profile */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-6 rounded-3xl shadow-xl border border-slate-700/60 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 rounded-2xl bg-emerald-500 text-slate-950 flex items-center justify-center text-2xl font-black shadow-lg">
            🚗
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-extrabold bg-emerald-500/20 text-emerald-400 px-2.5 py-0.5 rounded-full border border-emerald-500/30 uppercase tracking-wide">
                Motorista Parceiro App
              </span>
              <span className="text-xs text-slate-400 font-mono">CNH: {contract.driverCnh}</span>
            </div>
            <h1 className="text-xl font-black text-white mt-1">{contract.driverName}</h1>
            <p className="text-xs text-slate-300">{vehicle.model} · Placa: <span className="font-mono font-bold text-emerald-400">{vehicle.plate}</span></p>
          </div>
        </div>

        <div className="bg-slate-800/80 px-4 py-2.5 rounded-2xl border border-slate-700 text-center sm:text-right">
          <span className="text-[10px] font-extrabold text-slate-400 uppercase block">Tempo de Parceria</span>
          <span className="text-sm font-black text-white">{contract.weeksRented} Semanas</span>
        </div>
      </div>

      {/* Grid: Weekly Rent Card + Maintenance Alert */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        
        {/* 1. Weekly Rent Invoice */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200/80 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center space-x-2">
              <span className="text-lg">💰</span>
              <h3 className="text-sm font-extrabold text-slate-900">Sua Semanalidade</h3>
            </div>
            <span className="text-[10px] font-extrabold bg-amber-100 text-amber-800 px-2.5 py-0.5 rounded-full">
              VENCE EM BREVE
            </span>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/60 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-500">Valor da semana:</span>
              <span className="text-lg font-black text-slate-900">{formatCurrency(contract.rate)}</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-500">Vencimento:</span>
              <span className="font-bold text-slate-700">{contract.dueDate}</span>
            </div>
          </div>

          <button
            onClick={() => {
              setPixCopied(true);
              setTimeout(() => setPixCopied(false), 3000);
            }}
            className="w-full flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-500 text-white font-black py-3 rounded-xl text-xs transition-all shadow-md active:scale-95 cursor-pointer"
          >
            <span>💳</span>
            <span>{pixCopied ? '✅ Chave PIX Copiada com Sucesso!' : 'Copiar Chave PIX para Pagamento'}</span>
          </button>
        </div>

        {/* 2. Photo Upload for KM & Maintenance Status */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200/80 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center space-x-2">
              <span className="text-lg">📸</span>
              <h3 className="text-sm font-extrabold text-slate-900">Foto Semanal do Painel</h3>
            </div>
            <span className="text-[10px] font-extrabold bg-blue-100 text-blue-700 px-2.5 py-0.5 rounded-full">
              OBRIGATÓRIO
            </span>
          </div>

          <p className="text-xs text-slate-500">
            Envie a foto do painel do carro todo domingo para mantermos suas revisões gratuitas em dia:
          </p>

          <div className="border-2 border-dashed border-slate-200 hover:border-blue-400 p-5 rounded-2xl text-center space-y-2 cursor-pointer transition-colors bg-slate-50/50">
            <span className="text-2xl block">📷</span>
            <span className="text-xs font-bold text-slate-700 block">Tirar foto do Odômetro ou Escolher Arquivo</span>
            <span className="text-[10px] text-slate-400 block">A IA lê o KM automaticamente</span>
          </div>

          <button
            onClick={() => {
              setPhotoSent(true);
              setTimeout(() => setPhotoSent(false), 4000);
            }}
            className="w-full flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-500 text-white font-bold py-2.5 rounded-xl text-xs transition-all active:scale-95"
          >
            <span>{photoSent ? '✅ Foto Enviada e KM Atualizado!' : 'Enviar Foto do Painel'}</span>
          </button>
        </div>
      </div>

      {/* Maintenance Tracking for Driver */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200/80 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-extrabold text-slate-900">🔧 Próxima Revisão do seu Carro</h3>
            <p className="text-xs text-slate-500">Manutenção 100% paga pela Cabral Locações</p>
          </div>
          <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Faltam {formatKm(maintenance.remainingKm)}
          </span>
        </div>

        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/60 flex items-center justify-between text-xs">
          <div>
            <span className="font-bold text-slate-800 block">{maintenance.serviceName}</span>
            <span className="text-slate-400 text-[11px]">KM Atual: {formatKm(vehicle.currentKm)}</span>
          </div>
          <button
            onClick={onOpenContactHub}
            className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all"
          >
            Agendar na Oficina
          </button>
        </div>
      </div>
    </div>
  );
};
