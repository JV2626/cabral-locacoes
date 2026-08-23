import React, { useState } from 'react';
import { BrandLogo } from './BrandLogo';
import { WhatsAppIcon, SparklesIcon, ShieldCheckIcon } from './Icons';

interface ContactHubModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactHubModal: React.FC<ContactHubModalProps> = ({ isOpen, onClose }) => {
  const [aiAnswer, setAiAnswer] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleAskFaq = (faqType: string) => {
    if (faqType === 'cnh') {
      setAiAnswer('Para alugar na Cabral Locações, você precisa de CNH definitiva (com EAR para motoristas de aplicativo), comprovante de residência recente e documento de identidade.');
    } else if (faqType === 'caucao') {
      setAiAnswer('A caução na Cabral Locações é facilitada: pode ser parcelada e tem devolução instantânea via PIX no mesmo dia da devolução do veículo após a vistoria.');
    } else if (faqType === 'manutencao') {
      setAiAnswer('Toda a manutenção preventiva (troca de óleo, pastilhas, pneus e revisões gerais) está 100% inclusa na semanalidade, sem qualquer cobrança surpresa.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-dark/85 backdrop-blur-md animate-in fade-in">
      <div className="bg-slate-900 text-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-800">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-brand-900 via-slate-900 to-brand-900 p-6 relative border-b border-slate-800 flex items-center justify-between">
          <BrandLogo size="md" />
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center font-bold text-sm transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          {/* WhatsApp Direct Action */}
          <div className="bg-[#25D366]/10 border border-[#25D366]/30 p-6 rounded-2xl space-y-3 text-center">
            <div className="w-12 h-12 rounded-full bg-[#25D366] text-white flex items-center justify-center mx-auto shadow-lg shadow-[#25D366]/30">
              <WhatsAppIcon className="w-6 h-6 fill-white" />
            </div>
            <h4 className="text-base font-black text-white font-display">Quer falar direto com a nossa equipe?</h4>
            <p className="text-xs text-slate-300">
              Sem filas, sem robôs de 0800. Atendimento humano rápido no WhatsApp oficial:
            </p>
            <div className="inline-block bg-slate-950/80 border border-slate-800 px-3 py-1 rounded-lg text-xs font-mono font-bold text-[#25D366]">
              +55 (11) 98288-6032
            </div>
            <a
              href="https://wa.me/5511982886032?text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20os%20carros%20disponíveis%20na%20Cabral%20Locações."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center space-x-2.5 bg-[#25D366] hover:bg-[#20bd5a] text-white px-6 py-3.5 rounded-xl font-black text-xs transition-all shadow-lg shadow-[#25D366]/25 active:scale-95 w-full uppercase tracking-wider cursor-pointer"
            >
              <WhatsAppIcon className="w-4 h-4 fill-white" />
              <span>Abrir WhatsApp da Cabral Locações</span>
            </a>
          </div>

          {/* AI Quick FAQ Assistant */}
          <div className="space-y-3 border-t border-slate-800 pt-4">
            <div className="flex items-center space-x-2">
              <SparklesIcon className="w-4 h-4 text-brand-cyan" />
              <h4 className="text-xs font-black text-brand-cyan uppercase tracking-wider">
                Dúvidas Rápidas Respondidas por IA:
              </h4>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleAskFaq('cnh')}
                className="text-[11px] font-bold bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
              >
                📄 Quais documentos preciso?
              </button>
              <button
                onClick={() => handleAskFaq('caucao')}
                className="text-[11px] font-bold bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
              >
                💸 Como funciona a caução?
              </button>
              <button
                onClick={() => handleAskFaq('manutencao')}
                className="text-[11px] font-bold bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
              >
                🔧 A manutenção está inclusa?
              </button>
            </div>

            {aiAnswer && (
              <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl text-xs text-slate-300 leading-relaxed animate-in fade-in space-y-1">
                <span className="font-bold text-brand-cyan block">Resposta Rápida:</span>
                <p>{aiAnswer}</p>
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-950 px-6 py-3 border-t border-slate-800 text-center flex items-center justify-center space-x-2 text-[11px] text-slate-500">
          <ShieldCheckIcon className="w-3.5 h-3.5 text-brand-cyan" />
          <span>Cabral Locações · Frotas e Locação para Motoristas de App</span>
        </div>
      </div>
    </div>
  );
};
