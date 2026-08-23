export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
}

export function formatKm(km: number): string {
  return new Intl.NumberFormat('pt-BR').format(km) + ' km';
}

export function calculateRemainingKm(
  currentKm: number,
  lastServiceKm: number,
  intervalKm: number
): { remainingKm: number; percentage: number; status: 'green' | 'yellow' | 'red' } {
  if (intervalKm <= 0) {
    return { remainingKm: 0, percentage: 100, status: 'red' };
  }

  const kmSinceLastService = Math.max(0, currentKm - lastServiceKm);
  const remainingKm = Math.max(0, intervalKm - kmSinceLastService);
  const percentage = Math.min(100, Math.max(0, Math.round((kmSinceLastService / intervalKm) * 100)));

  let status: 'green' | 'yellow' | 'red' = 'green';
  if (percentage >= 85 || remainingKm <= 500) {
    status = 'red';
  } else if (percentage >= 60 || remainingKm <= 2000) {
    status = 'yellow';
  }

  return { remainingKm, percentage, status };
}
