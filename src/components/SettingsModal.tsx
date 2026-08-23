import React, { useState, useEffect, useRef } from 'react';
import { AppSettings, ThemeMode } from '../types/fleet';
import { requestNotificationPermission, sendPushNotification, requestCameraPermission, stopCameraStream } from '../lib/notifications';
import { BrandLogo } from './BrandLogo';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: AppSettings;
  onUpdateSettings: (newSettings: AppSettings) => void;
  isAdmin?: boolean;
  onOpenAdminAuth?: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  onUpdateSettings,
  isAdmin = false,
  onOpenAdminAuth
}) => {
  const [theme, setTheme] = useState<ThemeMode>(settings.theme);
  const [companyName, setCompanyName] = useState(settings.companyName);
  const [pixKey, setPixKey] = useState(settings.pixKey);
  const [whatsappPhone, setWhatsappPhone] = useState(settings.whatsappPhone);
  
  const [notifStatus, setNotifStatus] = useState<string | null>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Sincroniza o formulário sempre que o modal for aberto ou as props mudarem
  useEffect(() => {
    if (isOpen) {
      setTheme(settings.theme);
      setCompanyName(settings.companyName);
      setPixKey(settings.pixKey);
      setWhatsappPhone(settings.whatsappPhone);
      setNotifStatus(null);
    }
  }, [isOpen, settings, isAdmin]);

  if (!isOpen) return null;

  const handleRequestNotif = async () => {
    const granted = await requestNotificationPermission();
    if (granted) {
      setNotifStatus('✅ Notificações no celular ativadas com sucesso!');
      onUpdateSettings({ ...settings, notificationsEnabled: true });
      sendPushNotification(
        '🔔 Cabral Locações',
        'Notificações ativadas! Você receberá alertas de faturas e novas leituras de KM.'
      );
    } else {
      setNotifStatus('⚠️ Permissão negada ou não suportada pelo navegador.');
    }
  };

  const handleTestCamera = async () => {
    if (cameraActive && cameraStream) {
      stopCameraStream(cameraStream);
      setCameraStream(null);
      setCameraActive(false);
      return;
    }

    const { granted, stream, error } = await requestCameraPermission();
    if (granted && stream) {
      setCameraStream(stream);
      setCameraActive(true);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      onUpdateSettings({ ...settings, cameraPermissionGranted: true });
    } else {
      alert(error || 'Não foi possível acessar a câmera.');
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (cameraStream) {
      stopCameraStream(cameraStream);
    }
    
    // Trava de segurança: somente admin pode atualizar dados cadastrais e financeiros
    onUpdateSettings({
      ...settings,
      theme,
      companyName: isAdmin ? companyName : settings.companyName,
      pixKey: isAdmin ? pixKey : settings.pixKey,
      whatsappPhone: isAdmin ? whatsappPhone : settings.whatsappPhone
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-dark/85 backdrop-blur-md animate-in fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl max-w-xl w-full overflow-hidden text-white">
        
        {/* Modal Header */}
        <div className="bg-slate-950 p-6 relative border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <BrandLogo size="sm" theme="dark" />
            <div>
              <h3 className="text-base font-black text-white font-display">Configurações do Sistema</h3>
              <p className="text-xs text-slate-400">Personalização, Temas e Permissões de Dispositivo</p>
            </div>
          </div>
          <button
            onClick={() => {
              if (cameraStream) stopCameraStream(cameraStream);
              onClose();
            }}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center font-bold text-sm cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSave} className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* 1. Theme Selector */}
          <div className="space-y-2">
            <label className="text-xs font-black text-brand-cyan uppercase tracking-wider block">
              🎨 Tema da Interface
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setTheme('dark')}
                className={`p-3.5 rounded-2xl border flex items-center justify-center space-x-2 transition-all cursor-pointer ${
                  theme === 'dark'
                    ? 'bg-slate-950 border-brand-500 text-white shadow-lg shadow-brand-500/20 font-bold'
                    : 'bg-slate-950/40 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <span>🌙</span>
                <span className="text-xs">Tema Escuro (Dark Pro)</span>
              </button>

              <button
                type="button"
                onClick={() => setTheme('light')}
                className={`p-3.5 rounded-2xl border flex items-center justify-center space-x-2 transition-all cursor-pointer ${
                  theme === 'light'
                    ? 'bg-slate-800 border-brand-cyan text-white shadow-lg shadow-brand-cyan/20 font-bold'
                    : 'bg-slate-950/40 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <span>☀️</span>
                <span className="text-xs">Tema Claro (Clean Light)</span>
              </button>
            </div>
          </div>

          {/* 2. Device Permissions (Push Notifications & Camera) */}
          <div className="space-y-3 border-t border-slate-800 pt-4">
            <label className="text-xs font-black text-brand-cyan uppercase tracking-wider block">
              📱 Permissões de Dispositivo & Notificações
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Push Notifications Card */}
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2 flex flex-col justify-between">
                <div>
                  <div className="flex items-center space-x-2 text-white font-bold text-xs">
                    <span>🔔</span>
                    <span>Notificações no Celular</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Receba avisos de faturas e novas fotos de painel enviadas.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleRequestNotif}
                  className="w-full btn-primary py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer"
                >
                  🔔 Permitir & Testar Notificação
                </button>
              </div>

              {/* Camera Permission Card */}
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2 flex flex-col justify-between">
                <div>
                  <div className="flex items-center space-x-2 text-white font-bold text-xs">
                    <span>📷</span>
                    <span>Permissão de Câmera</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Permita o uso da câmera para leitura de odômetro por IA e fotos de vistoria.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleTestCamera}
                  className={`w-full py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                    cameraActive
                      ? 'bg-rose-600 hover:bg-rose-700 text-white'
                      : 'btn-cyan'
                  }`}
                >
                  {cameraActive ? '⏹️ Fechar Câmera' : '📸 Ativar / Testar Câmera'}
                </button>
              </div>
            </div>

            {notifStatus && (
              <div className="p-2.5 bg-brand-500/20 border border-brand-500/30 text-brand-cyan rounded-xl text-xs font-bold text-center animate-in fade-in">
                {notifStatus}
              </div>
            )}

            {cameraActive && (
              <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 space-y-2 animate-in fade-in text-center">
                <p className="text-[11px] font-bold text-emerald-400">● Câmera conectada com sucesso:</p>
                <div className="rounded-xl overflow-hidden max-h-48 border border-slate-700 bg-black flex items-center justify-center">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}
          </div>

          {/* 3. Company Settings (Protected by Admin Role) */}
          <div className="space-y-3 border-t border-slate-800 pt-4">
            <div className="flex items-center justify-between">
              <label className="text-xs font-black text-brand-cyan uppercase tracking-wider block">
                🏢 Dados Oficiais da Cabral Locações
              </label>
              {isAdmin ? (
                <span className="text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2.5 py-0.5 rounded-full flex items-center space-x-1">
                  <span>🛡️</span>
                  <span>Admin Verificado</span>
                </span>
              ) : (
                <span className="text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2.5 py-0.5 rounded-full flex items-center space-x-1">
                  <span>🔒</span>
                  <span>Protegido (Somente Admin)</span>
                </span>
              )}
            </div>

            {!isAdmin && (
              <div className="p-3.5 bg-amber-500/15 border border-amber-500/30 rounded-2xl space-y-2.5">
                <p className="text-[11px] text-amber-200 leading-relaxed font-medium">
                  🔒 <strong>Proteção Financeira Ativa:</strong> A Chave PIX e o WhatsApp Oficial são dados financeiros e só podem ser alterados por um administrador autenticado da Cabral Locações.
                </p>
                {onOpenAdminAuth && (
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onOpenAdminAuth();
                    }}
                    className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-black py-2.5 rounded-xl text-xs transition-colors cursor-pointer shadow-md"
                  >
                    🔑 Entrar como Administrador para Editar PIX
                  </button>
                )}
              </div>
            )}

            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Razão Social / Nome Fantasia</label>
              <input
                type="text"
                disabled={!isAdmin}
                readOnly={!isAdmin}
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className={`w-full border text-xs rounded-xl px-3.5 py-2.5 ${
                  isAdmin 
                    ? 'bg-slate-950 border-slate-700 text-white focus:ring-2 focus:ring-brand-500' 
                    : 'bg-slate-950/60 border-slate-800 text-slate-400 opacity-80 cursor-not-allowed'
                }`}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1 flex items-center justify-between">
                  <span>Chave PIX da Locadora</span>
                  {!isAdmin && <span className="text-[10px] text-amber-400 font-normal">🔒 Bloqueado</span>}
                </label>
                <input
                  type="text"
                  disabled={!isAdmin}
                  readOnly={!isAdmin}
                  value={pixKey}
                  onChange={(e) => setPixKey(e.target.value)}
                  className={`w-full border text-xs rounded-xl px-3 py-2.5 font-mono ${
                    isAdmin 
                      ? 'bg-slate-950 border-slate-700 text-white focus:ring-2 focus:ring-brand-500' 
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 opacity-80 cursor-not-allowed'
                  }`}
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1 flex items-center justify-between">
                  <span>WhatsApp Oficial</span>
                  {!isAdmin && <span className="text-[10px] text-amber-400 font-normal">🔒 Bloqueado</span>}
                </label>
                <input
                  type="text"
                  disabled={!isAdmin}
                  readOnly={!isAdmin}
                  value={whatsappPhone}
                  onChange={(e) => setWhatsappPhone(e.target.value)}
                  className={`w-full border text-xs rounded-xl px-3 py-2.5 font-mono font-bold ${
                    isAdmin 
                      ? 'bg-slate-950 border-slate-700 text-brand-cyan focus:ring-2 focus:ring-brand-500' 
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 opacity-80 cursor-not-allowed'
                  }`}
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-3 flex items-center justify-end space-x-3 border-t border-slate-800">
            <button
              type="button"
              onClick={() => {
                if (cameraStream) stopCameraStream(cameraStream);
                onClose();
              }}
              className="btn-secondary px-5 py-2.5 rounded-xl text-xs cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="btn-primary px-7 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider cursor-pointer font-display"
            >
              SALVAR CONFIGURAÇÕES
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
