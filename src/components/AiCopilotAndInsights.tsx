import React, { useState } from 'react';
import { mockAiInsights, mockVehicles, mockContracts } from '../lib/mock-data';
import { formatKm, formatCurrency } from '../lib/utils/calculations';

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
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      {/* Title Header */}
      <div className="flex items-center space-x-3 bg-white p-5 rounded-2xl shadow-sm border border-slate-200/80">
        <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center text-xl font-bold">
          🧠
        </div>
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Copiloto IA & Auditoria de Dados</h1>
          <p className="text-xs text-slate-500 font-medium">Analista de dados dedicado, alertas proativos e chat inteligente com a frota</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: AI Fleet Copilot Chat */}
        <div className="lg:col-span-6 bg-white rounded-2xl shadow-sm border border-slate-200/80 overflow-hidden flex flex-col h-[560px]">
          <div className="p-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-xs font-black tracking-wide">CHAT COPILOTO COM A FROTA</span>
            </div>
            <span className="text-[10px] bg-slate-800 text-slate-300 font-bold px-2 py-0.5 rounded-full border border-slate-700">
              GEMINI 2.0 FLASH
            </span>
          </div>

          {/* Quick Prompt Badges */}
          <div className="p-3 bg-slate-50 border-b border-slate-200 flex flex-wrap gap-1.5">
            <button
              onClick={() => handleSendMessage('Quais carros estão alugados hoje?')}
              className="text-[10px] font-bold bg-white hover:bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg border border-slate-300 transition-colors shadow-2xs"
            >
              🚗 Carros alugados hoje
            </button>
            <button
              onClick={() => handleSendMessage('Qual o KM do HB20 e próximas trocas de óleo?')}
              className="text-[10px] font-bold bg-white hover:bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg border border-slate-300 transition-colors shadow-2xs"
            >
              🛢️ KM do HB20 & Óleo
            </button>
            <button
              onClick={() => handleSendMessage('Quanto faturamos nesta semana com os motoristas?')}
              className="text-[10px] font-bold bg-white hover:bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg border border-slate-300 transition-colors shadow-2xs"
            >
              💰 Faturamento semanal
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50/50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3.5 rounded-2xl text-xs whitespace-pre-line leading-relaxed shadow-2xs ${
                    msg.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-br-none'
                      : 'bg-white text-slate-800 border border-slate-200/80 rounded-bl-none'
                  }`}
                >
                  {msg.text}
                </div>
                <span className="text-[9px] text-slate-400 mt-1 px-1">{msg.timestamp}</span>
              </div>
            ))}
            {isTyping && (
              <div className="flex items-center space-x-1.5 p-3 bg-white rounded-2xl border border-slate-200 max-w-[100px]">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-bounce"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-bounce [animation-delay:0.4s]"></span>
              </div>
            )}
          </div>

          {/* Input Bar */}
          <div className="p-3 bg-white border-t border-slate-200 flex items-center space-x-2">
            <input
              type="text"
              placeholder="Pergunte sobre carros, KM, faturamento ou motoristas..."
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1 bg-slate-50 border border-slate-300 text-xs rounded-xl px-3.5 py-2.5 text-slate-800 focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder-slate-400"
            />
            <button
              onClick={() => handleSendMessage()}
              className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-all active:scale-95 shadow-sm"
            >
              Enviar
            </button>
          </div>
        </div>

        {/* Right Column: AI Data Analyst Insights Cards */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex items-center justify-between bg-white p-4 rounded-2xl shadow-sm border border-slate-200/80">
            <div className="flex items-center space-x-2">
              <span className="text-lg">💡</span>
              <h2 className="text-sm font-extrabold text-slate-900 uppercase tracking-wide">
                Auditoria Preditiva de Dados (Insights)
              </h2>
            </div>
            <span className="text-[10px] font-extrabold bg-purple-100 text-purple-700 px-2.5 py-0.5 rounded-full">
              3 AUDITORIAS ATIVAS
            </span>
          </div>

          {mockAiInsights.map((insight) => (
            <div
              key={insight.id}
              className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200/80 hover:shadow-md transition-shadow space-y-3"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-base">
                    {insight.severity === 'high' ? '🚨' : insight.severity === 'medium' ? '⚠️' : '📈'}
                  </span>
                  <h3 className="text-xs font-black text-slate-900">{insight.title}</h3>
                </div>
                <span
                  className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md ${
                    insight.severity === 'high'
                      ? 'bg-rose-100 text-rose-700'
                      : insight.severity === 'medium'
                      ? 'bg-amber-100 text-amber-700'
                      : 'bg-emerald-100 text-emerald-700'
                  }`}
                >
                  {insight.impactMetric}
                </span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">{insight.description}</p>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/60 flex items-start space-x-2">
                <span className="text-xs text-emerald-600 font-bold">➔</span>
                <p className="text-[11px] font-bold text-slate-700 leading-snug">
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
