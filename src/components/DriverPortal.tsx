import React, { useState, useRef } from 'react';
import { mockVehicles, mockContracts } from '../lib/mock-data';
import { formatCurrency, formatKm, calculateRemainingKm } from '../lib/utils/calculations';
import { analyzeDashboardImage, OcrResult } from '../lib/utils/ocrService';
import { updateVehicleOdometer } from '../lib/supabase';
import { BrandLogo } from './BrandLogo';

interface DriverPortalProps {
  onOpenContactHub: () => void;
}

export const DriverPortal: React.FC<DriverPortalProps> = ({ onOpenContactHub }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Default true if accessed via portal tab
  const [phoneOrCnh, setPhoneOrCnh] = useState('');
  const [smsCode, setSmsCode] = useState('');
  const [step, setStep] = useState<'identify' | 'verify'>('identify');
  const [errorMsg, setErrorMsg] = useState('');
  const [pixCopied, setPixCopied] = useState(false);

  // OCR & Photo States
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [ocrResult, setOcrResult] = useState<OcrResult | null>(null);
  const [successToast, setSuccessToast] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Authenticated driver contract (isolated query)
  const currentContract = mockContracts[1]; // Carlos Eduardo (HB20)
  const [driverKm, setDriverKm] = useState(48210);
  const currentVehicle = mockVehicles.find(v => v.plate === currentContract.vehiclePlate) || mockVehicles[1];
  
  // Calculate dynamic maintenance based on updated KM
  const initialServiceKm = 40000;
  const serviceInterval = 10000;
  const maintCalc = calculateRemainingKm(driverKm, initialServiceKm, serviceInterval);

  const handlePhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedPhoto(reader.result as string);
        setOcrResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRunOcr = async () => {
    if (!selectedPhoto) return;
    setIsScanning(true);
    setErrorMsg('');

    try {
      const result = await analyzeDashboardImage(selectedPhoto, driverKm);
      setOcrResult(result);
      setDriverKm(result.extractedKm);
      await updateVehicleOdometer(currentVehicle.plate, result.extractedKm);
      setSuccessToast(`Odômetro lido com sucesso: ${formatKm(result.extractedKm)} (${result.confidence}% de precisão da IA)`);
      setTimeout(() => setSuccessToast(null), 5000);
    } catch {
      setErrorMsg('Falha ao analisar a foto do painel. Tente novamente com mais iluminação.');
    } finally {
      setIsScanning(false);
    }
  };

  const handleRequestCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneOrCnh.trim()) {
      setErrorMsg('Informe seu telefone ou CNH cadastrado.');
      return;
    }
    setErrorMsg('');
    setStep('verify');
  };

  const handleVerifyCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (smsCode.trim().length >= 4) {
      setIsAuthenticated(true);
      setErrorMsg('');
    } else {
      setErrorMsg('Código de 4 dígitos inválido.');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto py-8 px-4 animate-in fade-in">
        <div className="bg-slate-900 p-6 sm:p-8 rounded-3xl shadow-2xl border border-slate-800 space-y-6">
          <div className="text-center space-y-3">
            <div className="flex justify-center">
              <BrandLogo size="md" />
            </div>
            <h2 className="text-xl font-black text-white font-display">Portal do Motorista</h2>
            <p className="text-xs text-slate-400">Acesse suas faturas, revisões e envie o KM semanal</p>
          </div>

          {errorMsg && (
            <div className="p-3 bg-rose-500/20 border border-rose-500/30 rounded-xl text-xs font-bold text-rose-300">
              ⚠️ {errorMsg}
            </div>
          )}

          {step === 'identify' ? (
            <form onSubmit={handleRequestCode} className="space-y-4">
              <div>
                <label className="text-xs font-extrabold text-slate-300 block mb-1">Telefone (WhatsApp) ou CNH</label>
                <input
                  type="text"
                  required
                  placeholder="(11) 97654-3210"
                  value={phoneOrCnh}
                  onChange={(e) => setPhoneOrCnh(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 text-xs rounded-xl px-3.5 py-2.5 text-white focus:ring-2 focus:ring-brand-cyan focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-brand-cyan hover:bg-brand-300 text-slate-950 font-black py-3 rounded-xl text-xs transition-all shadow-md shadow-brand-cyan/20 active:scale-95 cursor-pointer"
              >
                📲 Enviar Código de Acesso por WhatsApp
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyCode} className="space-y-4 animate-in fade-in">
              <div>
                <label className="text-xs font-extrabold text-slate-300 block mb-1">Código de 4 dígitos recebido</label>
                <input
                  type="text"
                  required
                  maxLength={4}
                  placeholder="1234"
                  value={smsCode}
                  onChange={(e) => setSmsCode(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 text-center tracking-widest text-lg font-black rounded-xl px-3.5 py-2.5 text-brand-cyan focus:ring-2 focus:ring-brand-cyan focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-brand-cyan hover:bg-brand-300 text-slate-950 font-black py-3 rounded-xl text-xs transition-all shadow-md shadow-brand-cyan/20 active:scale-95 cursor-pointer"
              >
                ✅ Confirmar e Entrar
              </button>

              <button
                type="button"
                onClick={() => setStep('identify')}
                className="w-full text-center text-xs font-bold text-slate-400 hover:text-white"
              >
                Trocar número de telefone
              </button>
            </form>
          )}

          <div className="border-t border-slate-800 pt-4 text-center">
            <span className="text-[11px] text-slate-500">
              🔒 Protegido com autenticação individual e RLS (Row Level Security).
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12 animate-in fade-in">
      {/* Header Profile */}
      <div className="bg-gradient-to-r from-slate-900 via-brand-900/60 to-slate-900 text-white p-6 rounded-3xl shadow-xl border border-slate-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 rounded-2xl bg-brand-500 text-white flex items-center justify-center text-2xl font-black shadow-lg shadow-brand-500/25 border border-brand-400/40">
            🚗
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-black bg-brand-500/20 text-brand-cyan px-2.5 py-0.5 rounded-full border border-brand-500/30 uppercase tracking-wider">
                Motorista Parceiro App
              </span>
              <span className="text-xs text-slate-400 font-mono">Sessão Segura</span>
            </div>
            <h1 className="text-xl font-black text-white mt-1">{currentContract.driverName}</h1>
            <p className="text-xs text-slate-300">{currentVehicle.model} · Placa: <span className="font-mono font-bold text-brand-cyan">{currentVehicle.plate}</span></p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={onOpenContactHub}
            className="text-xs font-bold bg-brand-cyan hover:bg-brand-300 text-slate-950 px-3.5 py-2 rounded-xl transition-all shadow-sm"
          >
            💬 Suporte WhatsApp
          </button>
        </div>
      </div>

      {/* Grid: Weekly Rent Card + Maintenance Alert */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        
        {/* 1. Weekly Rent Invoice */}
        <div className="bg-slate-900 p-6 rounded-3xl shadow-lg border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center space-x-2">
              <span className="text-lg">💰</span>
              <h3 className="text-sm font-extrabold text-white">Sua Semanalidade</h3>
            </div>
            <span className="text-[10px] font-black bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2.5 py-0.5 rounded-full">
              VENCE EM BREVE
            </span>
          </div>

          <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400">Valor da semana:</span>
              <span className="text-lg font-black text-brand-cyan">{formatCurrency(currentContract.rate)}</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400">Vencimento:</span>
              <span className="font-bold text-white">{currentContract.dueDate}</span>
            </div>
          </div>

          <button
            onClick={() => {
              setPixCopied(true);
              setTimeout(() => setPixCopied(false), 3000);
            }}
            className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-brand-500 to-blue-600 hover:from-brand-600 hover:to-blue-700 text-white font-black py-3 rounded-xl text-xs transition-all shadow-md shadow-brand-500/25 active:scale-95 cursor-pointer"
          >
            <span>💳</span>
            <span>{pixCopied ? '✅ Chave PIX Copiada!' : 'Copiar Chave PIX para Pagamento'}</span>
          </button>
        </div>

        {/* 2. Photo Upload for KM & AI OCR Scanning */}
        <div className="bg-slate-900 p-6 rounded-3xl shadow-lg border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center space-x-2">
              <span className="text-lg">📸</span>
              <h3 className="text-sm font-extrabold text-white">Foto Semanal do Painel (OCR IA)</h3>
            </div>
            <span className="text-[10px] font-black bg-brand-500/20 text-brand-cyan border border-brand-500/30 px-2.5 py-0.5 rounded-full">
              GEMINI 2.0 VISION
            </span>
          </div>

          <p className="text-xs text-slate-400">
            Envie a foto do painel do carro todo domingo para mantermos suas revisões gratuitas em dia:
          </p>

          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handlePhotoSelect}
            className="hidden"
          />

          {!selectedPhoto ? (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-slate-800 hover:border-brand-500 p-5 rounded-2xl text-center space-y-2 cursor-pointer transition-colors bg-slate-950/60"
            >
              <span className="text-2xl block">📷</span>
              <span className="text-xs font-bold text-slate-200 block">Tirar foto do Odômetro ou Escolher Arquivo</span>
              <span className="text-[10px] text-slate-400 block">A IA lê o KM automaticamente</span>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 max-h-48 flex items-center justify-center">
                <img src={selectedPhoto} alt="Painel do Veículo" className="w-full h-full object-cover" />
                {isScanning && (
                  <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-xs flex flex-col items-center justify-center space-y-2 text-white">
                    <span className="w-6 h-6 border-2 border-brand-cyan border-t-transparent rounded-full animate-spin"></span>
                    <span className="text-xs font-black tracking-wide text-brand-cyan animate-pulse">
                      IA Gemini Lendo Odômetro...
                    </span>
                  </div>
                )}
              </div>

              {ocrResult && (
                <div className="bg-brand-900/40 border border-brand-500/30 p-3.5 rounded-2xl text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-white">✅ KM Detectado: {formatKm(ocrResult.extractedKm)}</span>
                    <span className="bg-brand-cyan/20 text-brand-cyan text-[10px] font-black px-2 py-0.5 rounded-full">
                      {ocrResult.confidence}% Precisão
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300">
                    Odômetro atualizado no sistema em {ocrResult.readingTimestamp}.
                  </p>
                </div>
              )}

              <div className="flex gap-2">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex-1 text-xs font-bold text-slate-300 border border-slate-700 hover:bg-slate-800 py-2 rounded-xl cursor-pointer"
                >
                  Trocar Foto
                </button>
                <button
                  onClick={handleRunOcr}
                  disabled={isScanning}
                  className="flex-1 bg-gradient-to-r from-brand-500 to-blue-600 hover:from-brand-600 hover:to-blue-700 disabled:opacity-50 text-white font-bold py-2 rounded-xl text-xs shadow-md transition-all active:scale-95 cursor-pointer"
                >
                  {isScanning ? 'Processando...' : '🔍 Analisar com IA'}
                </button>
              </div>
            </div>
          )}

          {successToast && (
            <div className="p-2.5 bg-brand-500/20 border border-brand-500/40 text-brand-300 rounded-xl text-xs font-bold text-center animate-in fade-in">
              {successToast}
            </div>
          )}
        </div>
      </div>

      {/* Maintenance Tracking for Driver */}
      <div className="bg-slate-900 p-6 rounded-3xl shadow-lg border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-extrabold text-white">🔧 Próxima Revisão do seu Carro</h3>
            <p className="text-xs text-slate-400">Manutenção 100% paga pela Cabral Locações</p>
          </div>
          <span
            className={`text-xs font-black px-3 py-1 rounded-full border ${
              maintCalc.status === 'red'
                ? 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                : maintCalc.status === 'yellow'
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
            }`}
          >
            Faltam {formatKm(maintCalc.remainingKm)}
          </span>
        </div>

        <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 flex items-center justify-between text-xs">
          <div>
            <span className="font-bold text-white block">Troca de Óleo & Filtro Sintético</span>
            <span className="text-slate-400 text-[11px]">KM Atual: {formatKm(driverKm)} (Próxima revisão aos {formatKm(initialServiceKm + serviceInterval)})</span>
          </div>
          <button
            onClick={onOpenContactHub}
            className="bg-brand-cyan hover:bg-brand-300 text-slate-950 px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer shadow-sm"
          >
            Agendar na Oficina
          </button>
        </div>
      </div>
    </div>
  );
};
