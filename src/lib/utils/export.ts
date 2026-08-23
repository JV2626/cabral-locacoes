import { Vehicle } from '../../types/fleet';
import { formatCurrency, formatKm } from './calculations';

export function exportFleetToCsv(vehicles: Vehicle[]): void {
  const headers = [
    'Placa',
    'Modelo',
    'Categoria',
    'Ano',
    'KM Atual',
    'Status',
    'Motorista Atual',
    'Diária (R$)',
    'Semanalidade (R$)'
  ];

  const rows = vehicles.map(v => [
    v.plate,
    `"${v.model}"`,
    v.category,
    v.year,
    v.currentKm,
    v.status === 'rented' ? 'Em Locação' : v.status === 'available' ? 'Disponível' : 'Manutenção',
    `"${v.currentDriver || 'No Pátio'}"`,
    v.dailyRate,
    v.weeklyRate
  ]);

  const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + 
    [headers.join(';'), ...rows.map(e => e.join(';'))].join('\n');

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `relatorio_frota_cabral_locacoes_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
