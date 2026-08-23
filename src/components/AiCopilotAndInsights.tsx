import React, { useState } from 'react';
import { mockAiInsights, mockVehicles, mockContracts } from '../lib/mock-data';
import { formatKm, formatCurrency } from '../lib/utils/calculations';
import {
  SparklesIcon,
  CarIcon,
  WrenchIcon,
  ZapIcon,
  AlertTriangleIcon,
  CheckCircleIcon
} from './Icons';

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}

export const AiCopilotAndInsights: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'ai',
      text: 'Olá, Administrador da Cabral Locações! Sou seu Copiloto de IA conectado em tempo real a todos os dados da frota. O que você gostaria de consultar ou analisar hoje?',
      timestamp: 'Agora'
    }
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = (queryText?: string) => {
    const textToSend = queryText || inputQuery;
    if (!textToSend.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: textToSend,
      timestamp: 'Agora'
    };

    setMessages(prev => [...prev, userMsg]);
    if (!queryText) setInputQuery('');
    setIsTyping(true);

    // Simulate AI Smart Logic
    setTimeout(() => {
      let replyText = '';
      const lower = textToSend.toLowerCase();

      if (lower.includes('alugad') || lower.includes('carros')) {
        const rented = mockVehicles.filter(v => v.status === 'rented');
        replyText = `Atualmente temos ${rented.length} veículos em locação na rua:\n` +
          rented.map(v => `• ${v.model} (${v.plate}) ➔ Motorista: ${v.currentDriver || 'Não identificado'} | ${formatCurrency(v.weeklyRate)}/sem`).join('\n');
      } else if (lower.includes('km') || lower.includes('cronos') || lower.includes('hb20') || lower.includes('onix')) {
        const found = mockVehicles.find(v => lower.includes(v.model.toLowerCase().split(' ')[0]) || lower.includes(v.plate.toLowerCase()));
        if (found) {
          replyText = `O veículo ${found.model} (Placa: ${found.plate}) está atualmente com ${formatKm(found.currentKm)}. Status: ${found.status === 'rented' ? 'Alugado' : 'Disponível'}.`;
        } else {
          replyText = 'Veículo localizado: O Fiat Cronos (QWE-4321) está com 42.150 km. Faltam 1.850 km para a próxima troca de óleo.';
        }
      } else if (lower.includes('faturam') || lower.includes('ganho') || lower.includes('dinheiro')) {
        const total = mockContracts.reduce((acc, c) => acc + c.rate, 0);
        replyText = `Faturamento semanal previsto com os contratos ativos: ${formatCurrency(total)}/semana (~${formatCurrency(total * 4.2)}/mês estimado).`;
      } else {
        replyText = `Com base nos dados da Cabral Locações: Todos os 8 veículos estão monitorados. Temos 1 troca de óleo urgente pendente no Fiat Argo (KJH-5544) e 4 faturas semanais em dia.`;
      }

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: replyText,
        timestamp: 'Agora'
      };

      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 900);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12 font-sans">
      {/* Title Header */}
      <div className="flex items-center space-x-3 bg-slate-900 p-6 rounded-3xl shadow-xl border border-slate-800">
        <div className="w-12 h-12 rounded-2xl bg-purple-500/20 text-purple-400 flex items-center justify-center border border-purple-500/30">
          <SparklesIcon className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight font-display">Copiloto IA & Auditoria Preditiva</h1>
          <p className="text-xs text-slate-400 font-medium">Analista de dados dedicado, alertas proativos e chat inteligente com a frota</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: AI Fleet Copilot Chat */}
        <div className="lg:col-span-6 bg-slate-900 rounded-3xl shadow-xl border border-slate-800 overflow-hidden flex flex-col h-[560px]">
          <div className="p-4 bg-slate-950 text-white flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-brand-cyan animate-pulse"></span>
              <span className="text-xs font-black tracking-wide text-brand-cyan font-display">CHAT COPILOTO COM A FROTA</span>
            </div>
            <span className="text-[10px] bg-slate-900 text-slate-400 font-black px-2.5 py-0.5 rounded-full border border-slate-800">
              GEMINI 2.0 FLASH
            </span>
          </div>

          {/* Quick Prompt Badges */}
          <div className="p-3 bg-slate-950/60 border-b border-slate-800 flex flex-wrap gap-1.5">
            <button
              onClick={() => handleSendMessage('Quais carros estão alugados hoje?')}
              className="flex items-center space-x-1 text-[10px] font-bold bg-slate-900 hover:bg-slate-800 text-slate-300 px-3 py-1 rounded-lg border border-slate-800 transition-colors cursor-pointer"
            >
              <CarIcon className="w-3 h-3 text-brand-cyan" />
              <span>Carros alugados hoje</span>
            </button>
            <button
              onClick={() => handleSendMessage('Qual o KM do HB20 e próximas trocas de óleo?')}
              className="flex items-center space-x-1 text-[10px] font-bold bg-slate-900 hover:bg-slate-800 text-slate-300 px-3 py-1 rounded-lg border border-slate-800 transition-colors cursor-pointer"
            >
              <WrenchIcon className="w-3 h-3 text-amber-400" />
              <span>KM do HB20 & Óleo</span>
            </button>
            <button
              onClick={() => handleSendMessage('Quanto faturamos nesta semana com os motoristas?')}
              className="flex items-center space-x-1 text-[10px] font-bold bg-slate-900 hover:bg-slate-800 text-slate-300 px-3 py-1 rounded-lg border border-slate-800 transition-colors cursor-pointer"
            >
              <ZapIcon className="w-3 h-3 text-emerald-400" />
              <span>Faturamento semanal</span>
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-950/40">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] p-4 rounded-2xl text-xs whitespace-pre-line leading-relaxed shadow-md ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-brand-500 to-blue-600 text-white rounded-br-none font-medium'
                      : 'bg-slate-900 text-slate-200 border border-slate-800 rounded-bl-none'
                  }`}
                >
                  {msg.text}
                </div>
                <span className="text-[9px] text-slate-500 mt-1 px-1">{msg.timestamp}</span>
              </div>
            ))}
            {isTyping && (
              <div className="flex items-center space-x-1.5 p-3.5 bg-slate-900 rounded-2xl border border-slate-800 max-w-[100px]">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-bounce"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-bounce [animation-delay:0.4s]"></span>
              </div>
            )}
          </div>

          {/* Input Bar */}
          <div className="p-3 bg-slate-950 border-t border-slate-800 flex items-center space-x-2">
            <input
              type="text"
              placeholder="Pergunte sobre carros, KM, faturamento ou motoristas..."
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1 bg-slate-900 border border-slate-700 text-xs rounded-xl px-4 py-2.5 text-white focus:ring-2 focus:ring-brand-500 focus:outline-none placeholder-slate-500"
            />
            <button
              onClick={() => handleSendMessage()}
              className="bg-gradient-to-r from-brand-500 to-blue-600 hover:from-brand-600 hover:to-blue-700 text-white px-5 py-2.5 rounded-xl text-xs font-black transition-all active:scale-95 shadow-md shadow-brand-500/20 cursor-pointer"
            >
              Enviar
            </button>
          </div>
        </div>

        {/* Right Column: AI Data Analyst Insights Cards */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex items-center justify-between bg-slate-900 p-5 rounded-3xl shadow-xl border border-slate-800">
            <div className="flex items-center space-x-2">
              <SparklesIcon className="w-5 h-5 text-brand-cyan" />
              <h2 className="text-sm font-black text-white uppercase tracking-wider font-display">
                Auditoria Preditiva de Dados (Insights)
              </h2>
            </div>
            <span className="text-[10px] font-black bg-purple-500/20 text-purple-300 border border-purple-500/30 px-3 py-1 rounded-full">
              3 AUDITORIAS ATIVAS
            </span>
          </div>

          {mockAiInsights.map((insight) => (
            <div
              key={insight.id}
              className="bg-slate-900 p-6 rounded-3xl shadow-xl border border-slate-800 hover:border-slate-700 transition-all space-y-3"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2">
                  {insight.severity === 'high' ? (
                    <AlertTriangleIcon className="w-5 h-5 text-rose-400 shrink-0" />
                  ) : insight.severity === 'medium' ? (
                    <AlertTriangleIcon className="w-5 h-5 text-amber-400 shrink-0" />
                  ) : (
                    <CheckCircleIcon className="w-5 h-5 text-emerald-400 shrink-0" />
                  )}
                  <h3 className="text-xs font-black text-white">{insight.title}</h3>
                </div>
                <span
                  className={`text-[10px] font-black px-2.5 py-0.5 rounded-full border ${
                    insight.severity === 'high'
                      ? 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                      : insight.severity === 'medium'
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                      : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                  }`}
                >
                  {insight.impactMetric}
                </span>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed">{insight.description}</p>

              <div className="bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800 flex items-start space-x-2">
                <span className="text-xs text-brand-cyan font-bold">➔</span>
                <p className="text-[11px] font-bold text-slate-300 leading-snug">
                  {insight.recommendation}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
