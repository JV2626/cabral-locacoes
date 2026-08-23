import React, { useState, useEffect } from 'react';
import { AppSettings } from '../types/fleet';
import { BrandLogo } from './BrandLogo';
import { WhatsAppIcon } from './Icons';
import { sendPushNotification } from '../lib/notifications';

interface CompanySettingsTabProps {
  settings: AppSettings;
  onUpdateSettings: (newSettings: AppSettings) => void;
  isLight?: boolean;
}

export const CompanySettingsTab: React.FC<CompanySettingsTabProps> = ({
  settings,
  onUpdateSettings,
  isLight = false
}) => {
  const [companyName, setCompanyName] = useState(settings.companyName);
  const [pixKey, setPixKey] = useState(settings.pixKey);
  const [whatsappPhone, setWhatsappPhone] = useState(settings.whatsappPhone);
  const [address, setAddress] = useState(settings.address || 'Av. das Nações Unidas, 14401 - Chácara Santo Antônio, São Paulo - SP');
  const [supportHours, setSupportHours] = useState(settings.supportHours || 'Segunda a Sexta: 08h às 18h | Sábado: 08h às 13h (Plantão 24h Sinistro)');
  const [defaultWeeklyRate, setDefaultWeeklyRate] = useState(settings.defaultWeeklyRate || 490);
  const [defaultDeposit, setDefaultDeposit] = useState(settings.defaultDeposit || 800);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Sincroniza se as props mudarem
  useEffect(() => {
    setCompanyName(settings.companyName);
    setPixKey(settings.pixKey);
    setWhatsappPhone(settings.whatsappPhone);
    if (settings.address) setAddress(settings.address);
    if (settings.supportHours) setSupportHours(settings.supportHours);
    if (settings.defaultWeeklyRate) setDefaultWeeklyRate(settings.defaultWeeklyRate);
    if (settings.defaultDeposit) setDefaultDeposit(settings.defaultDeposit);
  }, [settings]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const updated: AppSettings = {
      ...settings,
      companyName: companyName.trim(),
      pixKey: pixKey.trim(),
      whatsappPhone: whatsappPhone.trim(),
      address: address.trim(),
      supportHours: supportHours.trim(),
      defaultWeeklyRate: Number(defaultWeeklyRate),
      defaultDeposit: Number(defaultDeposit)
    };

    onUpdateSettings(updated);
    setSavedSuccess(true);

    sendPushNotification(
      '🏢 Dados da Empresa Atualizados!',
      `Chave PIX (${pixKey}) e dados oficiais salvos com sucesso no sistema.`
    );

    setTimeout(() => {
      setSavedSuccess(false);
    }, 4000);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-in fade-in pb-12">
      {/* Header Section */}
      <div className={`p-6 sm:p-8 rounded-3xl border shadow-xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 ${
        isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
      }`}>
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 rounded-2xl bg-blue-600/20 text-blue-500 flex items-center justify-center border border-blue-500/30 shrink-0">
            <span className="text-2xl">🏢</span>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className={`text-2xl font-black font-display ${isLight ? 'text-slate-900' : 'text-white'}`}>
                Dados Oficiais & Financeiro da Empresa
              </h1>
              <span className="text-[10px] font-black bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">
                DIRETORIA
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium">
              Altere a Chave PIX para recebimentos, WhatsApp oficial de suporte e dados cadastrais da Cabral Locações.
            </p>
          </div>
        </div>

        <BrandLogo size="sm" theme={isLight ? 'light' : 'dark'} />
      </div>

      {savedSuccess && (
        <div className="p-4 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 rounded-2xl text-xs font-bold text-center animate-in fade-in shadow-lg">
          ✅ Dados da empresa e Chave PIX salvos com sucesso! Todas as páginas, faturas e links de WhatsApp foram atualizados em tempo real.
        </div>
      )}

      {/* Main Settings Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* 1. Finance & PIX Card */}
        <div className={`p-6 sm:p-8 rounded-3xl border shadow-xl space-y-5 ${
          isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
        }`}>
          <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
            <div className="flex items-center space-x-2.5">
              <span className="text-xl">💰</span>
              <h2 className={`text-base font-black font-display ${isLight ? 'text-slate-900' : 'text-white'}`}>
                Recebimentos & Chave PIX Oficial
              </h2>
            </div>
            <span className="text-[11px] font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full">
              ⚡ Usado em cobranças e cauções
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className={`text-xs font-bold block mb-1.5 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                Chave PIX da Cabral Locações (CNPJ / Telefone / E-mail / Aleatória) *
              </label>
              <input
                type="text"
                required
                value={pixKey}
                onChange={(e) => setPixKey(e.target.value)}
                placeholder="Ex: 11982886032 ou financeiro@cabrallocacoes.com.br"
                className={`w-full text-xs font-mono font-bold rounded-xl px-4 py-3 border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isLight 
                    ? 'bg-slate-50 border-slate-300 text-slate-900' 
                    : 'bg-slate-950 border-slate-700 text-brand-cyan'
                }`}
              />
              <p className="text-[10px] text-slate-400 mt-1">
                Esta chave será exibida para os motoristas no momento do pagamento da semanalidade e caução.
              </p>
            </div>

            <div>
              <label className={`text-xs font-bold block mb-1.5 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                WhatsApp Oficial de Atendimento & Locações *
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={whatsappPhone}
                  onChange={(e) => setWhatsappPhone(e.target.value)}
                  placeholder="+55 11 98288-6032"
                  className={`w-full text-xs font-mono font-bold rounded-xl pl-10 pr-4 py-3 border focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                    isLight 
                      ? 'bg-slate-50 border-slate-300 text-slate-900' 
                      : 'bg-slate-950 border-slate-700 text-emerald-400'
                  }`}
                />
                <WhatsAppIcon className="w-4 h-4 fill-emerald-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
              <p className="text-[10px] text-slate-400 mt-1">
                Atualiza os botões "Alugar no WhatsApp" e de contato em todo o site.
              </p>
            </div>
          </div>
        </div>

        {/* 2. Company Identity & Registration */}
        <div className={`p-6 sm:p-8 rounded-3xl border shadow-xl space-y-5 ${
          isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
        }`}>
          <div className="flex items-center space-x-2.5 pb-3 border-b border-slate-800/80">
            <span className="text-xl">📋</span>
            <h2 className={`text-base font-black font-display ${isLight ? 'text-slate-900' : 'text-white'}`}>
              Identidade Cadastral & Contratos
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className={`text-xs font-bold block mb-1.5 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                Razão Social / Nome Fantasia Oficial *
              </label>
              <input
                type="text"
                required
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Cabral Locações Ltda."
                className={`w-full text-xs rounded-xl px-4 py-3 border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isLight 
                    ? 'bg-slate-50 border-slate-300 text-slate-900' 
                    : 'bg-slate-950 border-slate-700 text-white'
                }`}
              />
            </div>

            <div>
              <label className={`text-xs font-bold block mb-1.5 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                Endereço do Pátio / Ponto de Retirada
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Av. das Nações Unidas, 14401 - Chácara Santo Antônio, São Paulo - SP"
                className={`w-full text-xs rounded-xl px-4 py-3 border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isLight 
                    ? 'bg-slate-50 border-slate-300 text-slate-900' 
                    : 'bg-slate-950 border-slate-700 text-white'
                }`}
              />
            </div>

            <div className="md:col-span-2">
              <label className={`text-xs font-bold block mb-1.5 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                Horários de Atendimento & Suporte
              </label>
              <input
                type="text"
                value={supportHours}
                onChange={(e) => setSupportHours(e.target.value)}
                placeholder="Segunda a Sexta: 08h às 18h | Sábado: 08h às 13h (Plantão 24h Sinistro)"
                className={`w-full text-xs rounded-xl px-4 py-3 border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isLight 
                    ? 'bg-slate-50 border-slate-300 text-slate-900' 
                    : 'bg-slate-950 border-slate-700 text-white'
                }`}
              />
            </div>
          </div>
        </div>

        {/* 3. Default Pricing Parameters */}
        <div className={`p-6 sm:p-8 rounded-3xl border shadow-xl space-y-5 ${
          isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
        }`}>
          <div className="flex items-center space-x-2.5 pb-3 border-b border-slate-800/80">
            <span className="text-xl">🏷️</span>
            <h2 className={`text-base font-black font-display ${isLight ? 'text-slate-900' : 'text-white'}`}>
              Valores Padrão para Novos Contratos
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className={`text-xs font-bold block mb-1.5 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                Semanalidade Média Sugerida (R$)
              </label>
              <input
                type="number"
                value={defaultWeeklyRate}
                onChange={(e) => setDefaultWeeklyRate(Number(e.target.value))}
                className={`w-full text-xs font-bold rounded-xl px-4 py-3 border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isLight 
                    ? 'bg-slate-50 border-slate-300 text-blue-700 font-mono' 
                    : 'bg-slate-950 border-slate-700 text-brand-cyan font-mono'
                }`}
              />
            </div>

            <div>
              <label className={`text-xs font-bold block mb-1.5 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                Caução Padrão (R$)
              </label>
              <input
                type="number"
                value={defaultDeposit}
                onChange={(e) => setDefaultDeposit(Number(e.target.value))}
                className={`w-full text-xs font-bold rounded-xl px-4 py-3 border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isLight 
                    ? 'bg-slate-50 border-slate-300 text-amber-700 font-mono' 
                    : 'bg-slate-950 border-slate-700 text-amber-400 font-mono'
                }`}
              />
            </div>
          </div>
        </div>

        {/* Submit Button Bar */}
        <div className="flex items-center justify-end space-x-4 pt-2">
          <button
            type="submit"
            className="btn-primary px-8 py-3.5 rounded-2xl text-xs font-black uppercase tracking-wider font-display cursor-pointer shadow-xl flex items-center space-x-2"
          >
            <span>💾</span>
            <span>Salvar Dados Oficiais da Cabral Locações</span>
          </button>
        </div>
      </form>
    </div>
  );
};
