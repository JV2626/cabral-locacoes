import React, { useState, useEffect, useRef } from 'react';
import { AppSettings, ThemeMode } from '../types/fleet';
import { requestNotificationPermission, sendPushNotification, requestCameraPermission, stopCameraStream } from '../lib/notifications';
import { BrandLogo } from './BrandLogo';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: AppSettings;
  onUpdateSettings: (newSettings: AppSettings) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  onUpdateSettings
}) => {
  const [theme, setTheme] = useState<ThemeMode>(settings.theme);
  const [notifStatus, setNotifStatus] = useState<string | null>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Sincroniza o tema sempre que o modal for aberto
  useEffect(() => {
    if (isOpen) {
      setTheme(settings.theme);
      setNotifStatus(null);
    }
  }, [isOpen, settings.theme]);

  if (!isOpen) return null;

  const handleRequestNotif = async () => {
    const granted = await requestNotificationPermission();
    if (granted) {
      setNotifStatus('✅ Notificações no celular ativadas com sucesso!');
      onUpdateSettings({ ...settings, notificationsEnabled: true });
      sendPushNotification(
        '🔔 Cabral Locações',
        'Notificações ativadas! Você receberá alertas de faturas e novas leituras de KM em tempo real.'
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
    onUpdateSettings({
      ...settings,
      theme
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden text-white">
        
        {/* Modal Header */}
        <div className="bg-slate-950 p-6 relative border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <BrandLogo size="sm" theme="dark" />
            <div>
              <h3 className="text-base font-black text-white font-display">Preferências & Dispositivo</h3>
              <p className="text-xs text-slate-400">Tema Visual, Notificações e Câmera</p>
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
        <form onSubmit={handleSave} className="p-6 space-y-6">
          
          {/* 1. Theme Selector */}
          <div className="space-y-2">
            <label className="text-xs font-black text-brand-cyan uppercase tracking-wider block">
              🎨 Modo de Visualização (Tema)
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setTheme('dark')}
                className={`p-3.5 rounded-2xl border flex items-center justify-center space-x-2 transition-all cursor-pointer ${
                  theme === 'dark'
                    ? 'bg-slate-950 border-blue-500 text-white shadow-lg shadow-blue-500/20 font-black'
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
                    ? 'bg-slate-800 border-cyan-400 text-white shadow-lg shadow-cyan-400/20 font-black'
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
              📱 Permissões de Notificações & Câmera
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
                    Receba avisos de faturas, alertas e atualizações de KM no celular.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleRequestNotif}
                  className="w-full btn-primary py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer"
                >
                  🔔 Ativar Notificações
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
                    Permita a câmera para leitura de KM com IA Gemini e fotos de vistoria.
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
                  {cameraActive ? '⏹️ Fechar Câmera' : '📸 Testar Câmera'}
                </button>
              </div>
            </div>

            {notifStatus && (
              <div className="p-2.5 bg-blue-600/20 border border-blue-500/30 text-blue-300 rounded-xl text-xs font-bold text-center animate-in fade-in">
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
              SALVAR PREFERÊNCIAS
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
