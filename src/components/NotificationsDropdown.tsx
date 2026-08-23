import React, { useState } from 'react';

export interface NotificationItem {
  id: string;
  type: 'urgent' | 'warning' | 'opportunity';
  title: string;
  description: string;
  timestamp: string;
  isRead: boolean;
  actionTab?: 'dashboard' | 'manutencao' | 'insights' | 'frota';
}

interface NotificationsDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateTab: (tab: 'dashboard' | 'manutencao' | 'insights' | 'frota') => void;
}

export const NotificationsDropdown: React.FC<NotificationsDropdownProps> = ({
  isOpen,
  onClose,
  onNavigateTab
}) => {
  const [filter, setFilter] = useState<'all' | 'urgent' | 'warning' | 'opportunity'>('all');
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 'notif-1',
      type: 'urgent',
      title: '🛢️ Troca de Óleo Crítica (150 km restantes)',
      description: 'O Fiat Argo (KJH-5544) atingiu a margem de segurança. Agende a revisão imediatamente.',
      timestamp: 'Há 10 minutos',
      isRead: false,
      actionTab: 'manutencao'
    },
    {
      id: 'notif-2',
      type: 'urgent',
      title: '🚨 Fatura Semanal em Atraso (48h+)',
      description: 'O motorista Felipe Souza (Onix Plus XYZ-9876) está com a semanalidade de R$ 590 pendente.',
      timestamp: 'Há 1 hora',
      isRead: false,
      actionTab: 'dashboard'
    },
    {
      id: 'notif-3',
      type: 'warning',
      title: '⏰ 2 Faturas Vencem Hoje',
      description: 'Carlos Eduardo (HB20) e Marcos Roberto (Cronos) possuem vencimentos nesta data.',
      timestamp: 'Hoje às 08:00',
      isRead: false,
      actionTab: 'dashboard'
    },
    {
      id: 'notif-4',
      type: 'warning',
      title: '📸 Foto do Painel Pendente',
      description: 'Motorista Luciana Martins (Kwid RNT-2345) não envia foto do odômetro há 7 dias.',
      timestamp: 'Ontem',
      isRead: true,
      actionTab: 'frota'
    },
    {
      id: 'notif-5',
      type: 'opportunity',
      title: '🏆 Bônus do Bom Motorista',
      description: 'Marcos Roberto completou 6 meses de locação sem nenhuma multa ou atraso.',
      timestamp: 'Há 2 dias',
      isRead: true,
      actionTab: 'insights'
    }
  ]);

  if (!isOpen) return null;

  const filteredNotifs = notifications.filter(n => filter === 'all' || n.type === filter);
  const unreadCount = notifications.filter(n => !n.isRead).length;

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const handleAction = (notif: NotificationItem) => {
    if (notif.actionTab) {
      onNavigateTab(notif.actionTab);
    }
    setNotifications(prev => prev.map(n => n.id === notif.id ? { ...n, isRead: true } : n));
    onClose();
  };

  return (
    <div className="absolute right-0 mt-3 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2">
      {/* Header */}
      <div className="bg-slate-900 text-white p-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-base">🔔</span>
          <span className="text-xs font-black tracking-wide">CENTRAL DE ALERTAS</span>
          {unreadCount > 0 && (
            <span className="bg-rose-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full">
              {unreadCount} novos
            </span>
          )}
        </div>

        {unreadCount > 0 && (
          <button
            onClick={markAllAsRead}
            className="text-[10px] text-slate-400 hover:text-white font-bold transition-colors cursor-pointer"
          >
            Marcar lidas
          </button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex border-b border-slate-100 bg-slate-50/80 p-1.5 gap-1 text-[10px] font-bold">
        <button
          onClick={() => setFilter('all')}
          className={`flex-1 py-1 rounded-lg text-center transition-all ${
            filter === 'all' ? 'bg-white text-slate-900 shadow-2xs font-black' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          Todas ({notifications.length})
        </button>
        <button
          onClick={() => setFilter('urgent')}
          className={`flex-1 py-1 rounded-lg text-center transition-all ${
            filter === 'urgent' ? 'bg-rose-100 text-rose-800 shadow-2xs font-black' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          🔴 Urgentes
        </button>
        <button
          onClick={() => setFilter('warning')}
          className={`flex-1 py-1 rounded-lg text-center transition-all ${
            filter === 'warning' ? 'bg-amber-100 text-amber-800 shadow-2xs font-black' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          🟡 Atenção
        </button>
        <button
          onClick={() => setFilter('opportunity')}
          className={`flex-1 py-1 rounded-lg text-center transition-all ${
            filter === 'opportunity' ? 'bg-emerald-100 text-emerald-800 shadow-2xs font-black' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          🟢 Bônus
        </button>
      </div>

      {/* Notifications List */}
      <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
        {filteredNotifs.length === 0 ? (
          <div className="p-6 text-center text-xs text-slate-400">
            Nenhuma notificação encontrada nesta categoria.
          </div>
        ) : (
          filteredNotifs.map((item) => (
            <div
              key={item.id}
              onClick={() => handleAction(item)}
              className={`p-3.5 hover:bg-slate-50 transition-colors cursor-pointer text-left ${
                !item.isRead ? 'bg-blue-50/30' : ''
              }`}
            >
              <div className="flex items-start justify-between gap-2 mb-1">
                <span className="text-xs font-black text-slate-900 leading-tight block">
                  {item.title}
                </span>
                <span className="text-[9px] text-slate-400 font-medium shrink-0">
                  {item.timestamp}
                </span>
              </div>
              <p className="text-[11px] text-slate-600 leading-snug mb-2">
                {item.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-blue-600 hover:underline">
                  ➔ Resolver agora
                </span>
                {!item.isRead && (
                  <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <div className="p-2.5 bg-slate-50 border-t border-slate-100 text-center">
        <span className="text-[10px] text-slate-400 font-medium">
          Alertas automáticos gerados pelo Copiloto IA da Frota
        </span>
      </div>
    </div>
  );
};
