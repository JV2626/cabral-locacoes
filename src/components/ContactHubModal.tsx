import React, { useState } from 'react';

interface ContactHubModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactHubModal: React.FC<ContactHubModalProps> = ({ isOpen, onClose }) => {
  const [question, setQuestion] = useState('');
  const [aiAnswer, setAiAnswer] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleAskFaq = (faqType: string) => {
    if (faqType === 'cnh') {
      setAiAnswer('Para alugar na Cabral Locações, você precisa de CNH definitiva (com EAR para motoristas de aplicativo), comprovante de endereço recente e documento de identidade.');
    } else if (faqType === 'caucao') {
      setAiAnswer('A caução na Cabral Locações é facilitada: pode ser diluída no ciclo semanal e é estornada no PIX no mesmo dia da devolução após a vistoria.');
    } else if (faqType === 'manutencao') {
      setAiAnswer('Toda a manutenção preventiva (óleo, pastilhas, pneus e revisões gerais) está 100% inclusa na semanalidade, sem custos adicionais para o motorista.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200">
        
        {/* Modal Header */}
        <div className="bg-slate-900 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-slate-400 hover:text-white w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center font-bold text-sm"
          >
            ✕
          </button>
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-slate-950 flex items-center justify-center text-2xl font-bold">
              💬
            </div>
            <div>
              <h3 className="text-lg font-black tracking-tight">Hub de Atendimento Cabral</h3>
              <p className="text-xs text-slate-400">Atendimento humanizado direto com a nossa equipe</p>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          {/* WhatsApp Direct Action */}
          <div className="bg-emerald-50 border border-emerald-200 p-5 rounded-2xl space-y-3 text-center">
            <h4 className="text-sm font-extrabold text-slate-900">Quer falar direto com um atendente agora?</h4>
            <p className="text-xs text-slate-600">Sem filas, sem robôs de 0800. Fale diretamente no WhatsApp oficial da locadora:</p>
            <a
              href="https://wa.me/5511999999999?text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20os%20carros%20disponíveis%20na%20Cabral%20Locações."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3 rounded-xl font-black text-xs transition-all shadow-md active:scale-95 w-full"
            >
              <span>📲</span>
              <span>Abrir WhatsApp da Cabral Locações</span>
            </a>
          </div>

          {/* AI Quick FAQ Assistant */}
          <div className="space-y-3 border-t border-slate-100 pt-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm">🤖</span>
              <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
                Dúvidas Rápidas Respondidas por IA:
              </h4>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleAskFaq('cnh')}
                className="text-[11px] font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-lg transition-colors"
              >
                📄 Quais documentos preciso?
              </button>
              <button
                onClick={() => handleAskFaq('caucao')}
                className="text-[11px] font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-lg transition-colors"
              >
                💰 Como funciona a caução?
              </button>
              <button
                onClick={() => handleAskFaq('manutencao')}
                className="text-[11px] font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-lg transition-colors"
              >
                🔧 A manutenção está inclusa?
              </button>
            </div>

            {aiAnswer && (
              <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-xl text-xs text-slate-700 leading-relaxed animate-in fade-in">
                <span className="font-bold text-blue-600 block mb-1">Resposta do Assistente:</span>
                {aiAnswer}
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 px-6 py-3 border-t border-slate-100 text-center">
          <p className="text-[11px] text-slate-400 font-medium">Cabral Locações · Frotas e Locação para Motoristas de App</p>
        </div>
      </div>
    </div>
  );
};
