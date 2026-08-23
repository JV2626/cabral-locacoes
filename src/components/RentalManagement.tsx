import React, { useState } from 'react';
import { Contract, Vehicle, PastRental } from '../types/fleet';
import { formatCurrency, formatKm } from '../lib/utils/calculations';
import { WhatsAppIcon, CarIcon, KeyIcon, ShieldCheckIcon } from './Icons';

interface RentalManagementProps {
  contracts: Contract[];
  vehicles: Vehicle[];
  pastRentals: PastRental[];
  onAddContract: (newContract: Contract) => void;
  onEndRental: (contractId: string, endKm: number, conditionNotes: string) => void;
}

export const RentalManagement: React.FC<RentalManagementProps> = ({
  contracts,
  vehicles,
  pastRentals,
  onAddContract,
  onEndRental
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'active' | 'history'>('active');
  const [isNewRentalModalOpen, setIsNewRentalModalOpen] = useState(false);
  const [endingContract, setEndingContract] = useState<Contract | null>(null);
  const [endKmInput, setEndKmInput] = useState<number>(0);
  const [conditionNotes, setConditionNotes] = useState('Veículo devolvido em excelente estado. Sem avarias.');

  // Form states for new contract
  const [selectedVehicleId, setSelectedVehicleId] = useState('');
  const [driverName, setDriverName] = useState('');
  const [driverPhone, setDriverPhone] = useState('');
  const [driverCnh, setDriverCnh] = useState('');
  const [weeklyRate, setWeeklyRate] = useState(490);
  const [depositAmount, setDepositAmount] = useState(800);

  const availableVehicles = vehicles.filter(v => v.status === 'available');

  const handleOpenNewRental = () => {
    if (availableVehicles.length > 0) {
      setSelectedVehicleId(availableVehicles[0].id);
      setWeeklyRate(availableVehicles[0].weeklyRate);
    }
    setIsNewRentalModalOpen(true);
  };

  const handleCreateContract = (e: React.FormEvent) => {
    e.preventDefault();
    const vehicle = vehicles.find(v => v.id === selectedVehicleId);
    if (!vehicle) {
      alert('Selecione um veículo disponível.');
      return;
    }
    if (!driverName.trim() || !driverPhone.trim() || !driverCnh.trim()) {
      alert('Preencha os dados do motorista.');
      return;
    }

    const newContract: Contract = {
      id: `cont-${Date.now()}`,
      vehicleId: vehicle.id,
      vehiclePlate: vehicle.plate,
      vehicleModel: vehicle.model,
      driverName: driverName.trim(),
      driverPhone: driverPhone.trim(),
      driverCnh: driverCnh.trim(),
      billingCycle: 'weekly',
      rate: Number(weeklyRate),
      depositAmount: Number(depositAmount),
      dueDayOfWeek: 1, // Segunda-feira
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('pt-BR'),
      status: 'active',
      weeksRented: 1
    };

    onAddContract(newContract);
    setIsNewRentalModalOpen(false);
    // Reset form
    setDriverName('');
    setDriverPhone('');
    setDriverCnh('');
  };

  const handleConfirmEndRental = (e: React.FormEvent) => {
    e.preventDefault();
    if (!endingContract) return;
    onEndRental(endingContract.id, Number(endKmInput), conditionNotes);
    setEndingContract(null);
  };

  const totalWeeklyRevenue = contracts.reduce((acc, c) => acc + c.rate, 0);
  const totalDepositsHeld = contracts.reduce((acc, c) => acc + (c.depositAmount || 800), 0);

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Top Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 shadow-lg">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Locações Ativas</span>
            <span className="text-emerald-400 font-bold">● Rodando</span>
          </div>
          <p className="text-2xl font-black text-white">{contracts.length} Carros</p>
          <p className="text-[11px] text-slate-400 mt-1">Gerando faturamento semanal contínuo</p>
        </div>

        <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 shadow-lg">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Faturamento Semanal</span>
            <span className="text-brand-cyan font-bold">R$/sem</span>
          </div>
          <p className="text-2xl font-black text-brand-cyan">{formatCurrency(totalWeeklyRevenue)}</p>
          <p className="text-[11px] text-slate-400 mt-1">Média de {formatCurrency(totalWeeklyRevenue * 4.2)} / mês</p>
        </div>

        <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 shadow-lg">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Cauções sob Custódia</span>
            <span className="text-amber-400 font-bold">PIX Devolução</span>
          </div>
          <p className="text-2xl font-black text-amber-300">{formatCurrency(totalDepositsHeld)}</p>
          <p className="text-[11px] text-slate-400 mt-1">Garantia financeira ativa da frota</p>
        </div>

        <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 shadow-lg">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Histórico de Locações</span>
            <span className="text-purple-400 font-bold">Encerradas</span>
          </div>
          <p className="text-2xl font-black text-purple-300">{pastRentals.length} Contratos</p>
          <p className="text-[11px] text-slate-400 mt-1">Registros e vistorias anteriores</p>
        </div>
      </div>

      {/* Main Navigation & Action Bar */}
      <div className="bg-slate-900 p-4 sm:p-5 rounded-3xl border border-slate-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex bg-slate-950 p-1.5 rounded-2xl border border-slate-800 gap-1 text-xs font-black">
          <button
            onClick={() => setActiveSubTab('active')}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
              activeSubTab === 'active'
                ? 'bg-brand-500 text-white shadow-md font-extrabold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            🚗 Locações Ativas ({contracts.length})
          </button>

          <button
            onClick={() => setActiveSubTab('history')}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
              activeSubTab === 'history'
                ? 'bg-purple-600 text-white shadow-md font-extrabold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            📜 Histórico de Antigas Locações ({pastRentals.length})
          </button>
        </div>

        <button
          onClick={handleOpenNewRental}
          className="flex items-center justify-center space-x-2 bg-gradient-to-r from-brand-500 to-blue-600 hover:from-brand-600 hover:to-blue-700 text-white px-5 py-3 rounded-2xl font-black text-xs transition-all shadow-lg shadow-brand-500/25 active:scale-95 cursor-pointer uppercase tracking-wider font-display"
        >
          <KeyIcon className="w-4 h-4" />
          <span>+ Iniciar Nova Locação</span>
        </button>
      </div>

      {/* ACTIVE RENTALS TAB */}
      {activeSubTab === 'active' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {contracts.map(contract => {
            const vehicle = vehicles.find(v => v.plate === contract.vehiclePlate) || {
              model: contract.vehicleModel,
              plate: contract.vehiclePlate,
              currentKm: 45000,
              photoUrl: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&auto=format&fit=crop&q=60'
            };

            return (
              <div
                key={contract.id}
                className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-4 hover:border-brand-500/40 transition-all shadow-lg flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <div>
                      <span className="text-[10px] font-black uppercase text-brand-cyan tracking-wider bg-brand-500/10 border border-brand-500/20 px-2 py-0.5 rounded-full">
                        Locação Ativa · {contract.weeksRented}ª Semana
                      </span>
                      <h4 className="text-base font-black text-white mt-1.5">{contract.driverName}</h4>
                      <p className="text-xs text-slate-400">WhatsApp: <span className="font-mono text-slate-300">{contract.driverPhone}</span></p>
                    </div>

                    <span
                      className={`text-[10px] font-black px-2.5 py-1 rounded-full border ${
                        contract.status === 'overdue'
                          ? 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                          : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                      }`}
                    >
                      {contract.status === 'overdue' ? 'VENCIDO' : 'EM DIA'}
                    </span>
                  </div>

                  {/* Vehicle Details */}
                  <div className="flex items-center space-x-3 my-3 bg-slate-950/80 p-3 rounded-2xl border border-slate-800">
                    <img
                      src={vehicle.photoUrl}
                      alt={vehicle.model}
                      className="w-14 h-10 object-cover rounded-xl border border-slate-700"
                    />
                    <div>
                      <h5 className="text-xs font-bold text-slate-900 dark:text-white">{vehicle.model}</h5>
                      <span
                        style={{ color: '#ffffff', backgroundColor: '#0284c7' }}
                        className="text-[11px] font-mono font-black px-2 py-0.5 rounded-md border border-sky-600 shadow-sm inline-block my-0.5"
                      >
                        {vehicle.plate}
                      </span>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 ml-2">Odômetro: {formatKm(vehicle.currentKm)}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs bg-slate-950/50 p-3 rounded-xl border border-slate-800">
                    <div>
                      <span className="text-slate-400 text-[10px] block">Semanalidade:</span>
                      <span className="font-black text-brand-cyan">{formatCurrency(contract.rate)}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[10px] block">Próx. Vencimento:</span>
                      <span className="font-bold text-white">{contract.dueDate}</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 pt-2 border-t border-slate-800">
                  <a
                    href={`https://wa.me/5511982886032?text=Ol%C3%A1%20${encodeURIComponent(contract.driverName)},%20sua%20fatura%20da%20Cabral%20Loca%C3%A7%C3%B5es%20no%20valor%20de%20${encodeURIComponent(formatCurrency(contract.rate))}%20est%C3%A1%20dispon%C3%ADvel.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center space-x-1.5 bg-[#25D366] hover:bg-[#20bd5a] text-white py-2 rounded-xl text-xs font-bold transition-all"
                  >
                    <WhatsAppIcon className="w-3.5 h-3.5 fill-white" />
                    <span>WhatsApp</span>
                  </a>

                  <button
                    onClick={() => {
                      setEndingContract(contract);
                      setEndKmInput(vehicle.currentKm);
                    }}
                    className="flex-1 bg-slate-800 hover:bg-rose-500/20 text-slate-300 hover:text-rose-300 border border-slate-700 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer"
                  >
                    Finalizar Contrato
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* HISTORY TAB */}
      {activeSubTab === 'history' && (
        <div className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden shadow-xl">
          <div className="p-5 border-b border-slate-800">
            <h3 className="text-base font-black text-white font-display">Histórico de Locações Encerradas & Vistorias</h3>
            <p className="text-xs text-slate-400">Registro histórico completo de motoristas e KM rodados</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 font-black uppercase text-[10px] tracking-wider border-b border-slate-800">
                <tr>
                  <th className="p-4">Motorista</th>
                  <th className="p-4">Veículo / Placa</th>
                  <th className="p-4">Período</th>
                  <th className="p-4">Total Pago</th>
                  <th className="p-4">KM Rodado</th>
                  <th className="p-4">Caução</th>
                  <th className="p-4">Laudo de Devolução</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {pastRentals.map(past => (
                  <tr key={past.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-4">
                      <span className="font-bold text-white block">{past.driverName}</span>
                      <span className="text-[11px] text-slate-400">{past.driverPhone}</span>
                    </td>
                    <td className="p-4">
                      <span className="font-bold text-slate-200 block">{past.vehicleModel}</span>
                      <span className="font-mono text-brand-cyan text-[11px] font-bold">{past.vehiclePlate}</span>
                    </td>
                    <td className="p-4">
                      <span className="text-slate-300 font-medium block">{past.startDate} até {past.endDate}</span>
                      <span className="text-[10px] text-slate-500">{past.totalWeeks} semanas alugado</span>
                    </td>
                    <td className="p-4 font-black text-emerald-400">
                      {formatCurrency(past.totalPaid)}
                    </td>
                    <td className="p-4">
                      <span className="font-bold text-white block">{formatKm(past.totalKmDriven)}</span>
                      <span className="text-[10px] text-slate-500 font-mono">({formatKm(past.startKm)} ➔ {formatKm(past.endKm)})</span>
                    </td>
                    <td className="p-4">
                      <span className="inline-flex items-center text-[10px] font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-md">
                        ✓ Devolvida PIX
                      </span>
                    </td>
                    <td className="p-4 text-slate-400 max-w-xs truncate text-[11px]">
                      {past.conditionNotes}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* MODAL: NOVA LOCAÇÃO */}
      {isNewRentalModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-dark/85 backdrop-blur-md animate-in fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden text-white">
            <div className="bg-gradient-to-r from-brand-900 via-slate-900 to-brand-900 p-6 relative border-b border-slate-800 flex items-center justify-between">
              <h3 className="text-base font-black text-white font-display">Iniciar Nova Locação para Motorista</h3>
              <button
                onClick={() => setIsNewRentalModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center font-bold text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateContract} className="p-6 space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">Selecione o Carro Disponível no Estoque *</label>
                {availableVehicles.length === 0 ? (
                  <p className="text-xs text-amber-400 bg-amber-500/10 p-3 rounded-xl border border-amber-500/30">
                    ⚠️ Não há veículos disponíveis no momento. Cadastre um novo carro no estoque.
                  </p>
                ) : (
                  <select
                    value={selectedVehicleId}
                    onChange={(e) => {
                      setSelectedVehicleId(e.target.value);
                      const found = vehicles.find(v => v.id === e.target.value);
                      if (found) setWeeklyRate(found.weeklyRate);
                    }}
                    className="w-full bg-slate-950 border border-slate-700 text-xs rounded-xl px-3 py-2.5 text-white focus:ring-2 focus:ring-brand-500"
                  >
                    {availableVehicles.map(v => (
                      <option key={v.id} value={v.id}>
                        {v.model} ({v.plate}) - {v.color} · Semanalidade: {formatCurrency(v.weeklyRate)}
                      </option>
                    ))}
                  </select>
                )}
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">Nome Completo do Motorista *</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Carlos Eduardo Santos"
                  value={driverName}
                  onChange={(e) => setDriverName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 text-xs rounded-xl px-3.5 py-2.5 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">WhatsApp *</label>
                  <input
                    type="text"
                    required
                    placeholder="(11) 99999-9999"
                    value={driverPhone}
                    onChange={(e) => setDriverPhone(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 text-xs rounded-xl px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">CNH (com EAR) *</label>
                  <input
                    type="text"
                    required
                    placeholder="04829104928"
                    value={driverCnh}
                    onChange={(e) => setDriverCnh(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 text-xs rounded-xl px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">Semanalidade (R$)</label>
                  <input
                    type="number"
                    value={weeklyRate}
                    onChange={(e) => setWeeklyRate(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-700 text-xs rounded-xl px-3 py-2 text-brand-cyan font-bold"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">Caução (R$)</label>
                  <input
                    type="number"
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-700 text-xs rounded-xl px-3 py-2 text-amber-300 font-bold"
                  />
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsNewRentalModalOpen(false)}
                  className="px-4 py-2 border border-slate-700 rounded-xl text-xs font-bold text-slate-300"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={availableVehicles.length === 0}
                  className="px-6 py-2 bg-gradient-to-r from-brand-500 to-blue-600 text-white rounded-xl text-xs font-black uppercase tracking-wider"
                >
                  Confirmar Retirada
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: FINALIZAR CONTRATO & ESTORNO CAUÇÃO */}
      {endingContract && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-dark/85 backdrop-blur-md animate-in fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden text-white">
            <div className="bg-gradient-to-r from-rose-900 via-slate-900 to-rose-900 p-6 relative border-b border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="text-base font-black text-white font-display">Finalizar Locação & Devolução</h3>
                <p className="text-xs text-rose-300">Vistoria de entrega e estorno de caução</p>
              </div>
              <button
                onClick={() => setEndingContract(null)}
                className="w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center font-bold text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleConfirmEndRental} className="p-6 space-y-4">
              <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 text-xs space-y-1">
                <p><span className="text-slate-400">Motorista:</span> <span className="font-bold text-white">{endingContract.driverName}</span></p>
                <p><span className="text-slate-400">Veículo:</span> <span className="font-bold text-brand-cyan">{endingContract.vehicleModel} ({endingContract.vehiclePlate})</span></p>
                <p><span className="text-slate-400">Caução a Devolver no PIX:</span> <span className="font-black text-emerald-400">{formatCurrency(endingContract.depositAmount || 800)}</span></p>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">KM Final do Odômetro na Entrega *</label>
                <input
                  type="number"
                  required
                  value={endKmInput}
                  onChange={(e) => setEndKmInput(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-700 text-xs rounded-xl px-3.5 py-2.5 text-white font-mono font-bold"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">Laudo da Vistoria / Observações</label>
                <textarea
                  rows={3}
                  value={conditionNotes}
                  onChange={(e) => setConditionNotes(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 text-xs rounded-xl p-3 text-white"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setEndingContract(null)}
                  className="px-4 py-2 border border-slate-700 rounded-xl text-xs font-bold text-slate-300"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-black uppercase tracking-wider shadow-lg shadow-rose-600/30 cursor-pointer"
                >
                  Concluir Devolução & Liberar Carro
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
