import React, { useState } from 'react';
import { BrandLogo } from './BrandLogo';

export interface UserProfile {
  name: string;
  phone: string;
  cnh: string;
  role: 'admin' | 'driver';
  city?: string;
  desiredCar?: string;
  email?: string;
}

interface AuthModalProps {
  isOpen: boolean;
  initialRole?: 'admin' | 'driver';
  onClose: () => void;
  onLoginSuccess: (profile: UserProfile) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  initialRole = 'driver',
  onClose,
  onLoginSuccess
}) => {
  const [activeTab, setActiveTab] = useState<'admin' | 'driver'>(initialRole);
  const [driverMode, setDriverMode] = useState<'login' | 'register'>('login');
  
  // Admin Form State
  const [adminEmail, setAdminEmail] = useState('admin@cabrallocacoes.com');
  const [adminPassword, setAdminPassword] = useState('123456');
  
  // Driver Login State
  const [driverPhone, setDriverPhone] = useState('(11) 97654-3210');
  const [smsCode, setSmsCode] = useState('');
  const [step, setStep] = useState<'phone' | 'code'>('phone');
  
  // Driver Register State (Data Collection for SaaS Owners)
  const [regName, setRegName] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regCnh, setRegCnh] = useState('');
  const [regCity, setRegCity] = useState('São Paulo / SP');
  const [regCar, setRegCar] = useState('Hatch (Onix / HB20)');

  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      if (adminEmail.trim() && adminPassword.length >= 6) {
        onLoginSuccess({
          name: 'Diretoria Cabral',
          email: adminEmail,
          phone: '(11) 99999-9999',
          cnh: '00000000000',
          role: 'admin'
        });
        onClose();
      } else {
        setErrorMessage('Credenciais inválidas. Digite um e-mail válido e senha de no mínimo 6 dígitos.');
      }
    }, 600);
  };

  const handleDriverLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 'phone') {
      if (!driverPhone.trim()) {
        setErrorMessage('Informe seu WhatsApp ou CNH cadastrado.');
        return;
      }
      setErrorMessage('');
      setStep('code');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess({
        name: 'Carlos Eduardo Santos',
        phone: driverPhone,
        cnh: '04829104928',
        role: 'driver',
        desiredCar: 'Hyundai HB20 1.0 Vision'
      });
      onClose();
    }, 600);
  };

  const handleDriverRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName.trim() || !regPhone.trim() || !regCnh.trim()) {
      setErrorMessage('Por favor, preencha todos os campos obrigatórios para o cadastro.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const newDriver: UserProfile = {
        name: regName,
        phone: regPhone,
        cnh: regCnh,
        city: regCity,
        desiredCar: regCar,
        role: 'driver'
      };

      // Salva no LocalStorage para persistência de dados
      localStorage.setItem('cabral_user_profile', JSON.stringify(newDriver));
      onLoginSuccess(newDriver);
      onClose();
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-dark/85 backdrop-blur-md animate-in fade-in">
      <div className="bg-slate-900 border border-brand-500/30 rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden text-white">
        
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

        {/* Role Selector Tabs */}
        <div className="grid grid-cols-2 p-2 bg-slate-950/80 border-b border-slate-800 gap-1.5 text-xs font-black">
          <button
            onClick={() => {
              setActiveTab('admin');
              setErrorMessage('');
            }}
            className={`py-2.5 rounded-xl transition-all flex items-center justify-center space-x-2 cursor-pointer ${
              activeTab === 'admin'
                ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/30 font-extrabold'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <span>👑</span>
            <span>Dono / Administrador</span>
          </button>
          
          <button
            onClick={() => {
              setActiveTab('driver');
              setErrorMessage('');
            }}
            className={`py-2.5 rounded-xl transition-all flex items-center justify-center space-x-2 cursor-pointer ${
              activeTab === 'driver'
                ? 'bg-brand-cyan text-slate-950 shadow-lg shadow-brand-cyan/20 font-extrabold'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <span>🚗</span>
            <span>Motorista (Uber/99)</span>
          </button>
        </div>

        <div className="p-6 space-y-4">
          {errorMessage && (
            <div className="p-3 bg-rose-500/20 border border-rose-500/40 rounded-xl text-xs font-bold text-rose-300 animate-in fade-in">
              ⚠️ {errorMessage}
            </div>
          )}

          {/* ADMIN LOGIN */}
          {activeTab === 'admin' && (
            <form onSubmit={handleAdminLogin} className="space-y-4">
              <div>
                <span className="text-[11px] font-black text-brand-cyan uppercase tracking-wider block mb-1">
                  Painel de Gestão da Frota & KPIs
                </span>
                <p className="text-xs text-slate-400">
                  Acesso restrito à diretoria e gestão operacional da Cabral Locações.
                </p>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">E-mail de Administrador</label>
                <input
                  type="email"
                  required
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  placeholder="admin@cabrallocacoes.com"
                  className="w-full bg-slate-950 border border-slate-700 text-xs rounded-xl px-3.5 py-2.5 text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">Senha de Acesso</label>
                <input
                  type="password"
                  required
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-950 border border-slate-700 text-xs rounded-xl px-3.5 py-2.5 text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-brand-500 to-blue-600 hover:from-brand-600 hover:to-blue-700 text-white font-black py-3 rounded-xl text-xs transition-all shadow-lg shadow-brand-500/30 active:scale-95 cursor-pointer disabled:opacity-50"
                >
                  {isLoading ? 'Autenticando...' : '🔑 Entrar no Painel Administrativo'}
                </button>
              </div>

              <div className="p-3 bg-brand-900/40 border border-brand-500/20 rounded-xl text-[11px] text-slate-400 flex items-center justify-between">
                <span>⚡ Teste Rápido Demo:</span>
                <span className="font-mono text-brand-cyan font-bold">admin@cabrallocacoes.com</span>
              </div>
            </form>
          )}

          {/* DRIVER LOGIN & REGISTER */}
          {activeTab === 'driver' && (
            <div className="space-y-4">
              <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 text-[11px] font-bold">
                <button
                  type="button"
                  onClick={() => {
                    setDriverMode('login');
                    setErrorMessage('');
                  }}
                  className={`flex-1 py-1.5 rounded-lg transition-all ${
                    driverMode === 'login' ? 'bg-slate-800 text-white font-black' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Já sou Locatário (Login)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setDriverMode('register');
                    setErrorMessage('');
                  }}
                  className={`flex-1 py-1.5 rounded-lg transition-all ${
                    driverMode === 'register' ? 'bg-brand-cyan text-slate-950 font-black' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Quero Alugar (Novo Cadastro)
                </button>
              </div>

              {driverMode === 'login' ? (
                <form onSubmit={handleDriverLogin} className="space-y-3">
                  {step === 'phone' ? (
                    <div>
                      <label className="text-xs font-bold text-slate-300 block mb-1">Telefone (WhatsApp) ou CNH</label>
                      <input
                        type="text"
                        required
                        value={driverPhone}
                        onChange={(e) => setDriverPhone(e.target.value)}
                        placeholder="(11) 97654-3210"
                        className="w-full bg-slate-950 border border-slate-700 text-xs rounded-xl px-3.5 py-2.5 text-white focus:ring-2 focus:ring-brand-cyan focus:outline-none"
                      />
                    </div>
                  ) : (
                    <div className="space-y-2 animate-in fade-in">
                      <label className="text-xs font-bold text-slate-300 block mb-1">Código de Confirmação (4 dígitos)</label>
                      <input
                        type="text"
                        required
                        maxLength={4}
                        value={smsCode}
                        onChange={(e) => setSmsCode(e.target.value)}
                        placeholder="1234"
                        className="w-full bg-slate-950 border border-slate-700 text-center tracking-widest text-lg font-black rounded-xl px-3.5 py-2 text-brand-cyan focus:ring-2 focus:ring-brand-cyan focus:outline-none"
                      />
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-brand-cyan hover:bg-brand-300 text-slate-950 font-black py-3 rounded-xl text-xs transition-all shadow-lg shadow-brand-cyan/20 active:scale-95 cursor-pointer disabled:opacity-50"
                  >
                    {isLoading ? 'Verificando...' : step === 'phone' ? '📲 Enviar Código de Acesso' : '✅ Entrar no Portal do Motorista'}
                  </button>
                </form>
              ) : (
                /* REGISTRATION LEAD CAPTURE FORM */
                <form onSubmit={handleDriverRegister} className="space-y-3">
                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-1">Nome Completo</label>
                    <input
                      type="text"
                      required
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      placeholder="Ex: Carlos Eduardo dos Santos"
                      className="w-full bg-slate-950 border border-slate-700 text-xs rounded-xl px-3.5 py-2 text-white focus:ring-2 focus:ring-brand-cyan focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-xs font-bold text-slate-300 block mb-1">WhatsApp (Celular)</label>
                      <input
                        type="text"
                        required
                        value={regPhone}
                        onChange={(e) => setRegPhone(e.target.value)}
                        placeholder="(11) 99999-9999"
                        className="w-full bg-slate-950 border border-slate-700 text-xs rounded-xl px-3 py-2 text-white focus:ring-2 focus:ring-brand-cyan focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-300 block mb-1">Número CNH (com EAR)</label>
                      <input
                        type="text"
                        required
                        value={regCnh}
                        onChange={(e) => setRegCnh(e.target.value)}
                        placeholder="04829104928"
                        className="w-full bg-slate-950 border border-slate-700 text-xs rounded-xl px-3 py-2 text-white focus:ring-2 focus:ring-brand-cyan focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-xs font-bold text-slate-300 block mb-1">Cidade / Região</label>
                      <input
                        type="text"
                        value={regCity}
                        onChange={(e) => setRegCity(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-700 text-xs rounded-xl px-3 py-2 text-white focus:ring-2 focus:ring-brand-cyan focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-300 block mb-1">Carro de Interesse</label>
                      <select
                        value={regCar}
                        onChange={(e) => setRegCar(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-700 text-xs rounded-xl px-2 py-2 text-white focus:ring-2 focus:ring-brand-cyan focus:outline-none"
                      >
                        <option value="Hatch (Onix / HB20)">Hatch (Onix/HB20)</option>
                        <option value="Sedan (Cronos / Onix+)">Sedã (Cronos/Onix+)</option>
                        <option value="SUV (Tracker)">SUV (Tracker)</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-brand-cyan to-brand-400 text-slate-950 font-black py-3 rounded-xl text-xs transition-all shadow-lg shadow-brand-cyan/20 active:scale-95 cursor-pointer disabled:opacity-50 mt-2"
                  >
                    {isLoading ? 'Cadastrando...' : '🚀 Concluir Cadastro & Iniciar Retirada'}
                  </button>
                </form>
              )}
            </div>
          )}

          <div className="border-t border-slate-800 pt-3 text-center">
            <span className="text-[11px] text-slate-500 font-medium">
              🔒 Seus dados estão seguros e protegidos em conformidade com a LGPD.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
