// Configuração do Cliente Supabase para a Cabral Locações
export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://dsebvfznqswwhgbyrfkr.supabase.co';
export const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRzZWJ2ZnpucXN3d2hnYnlyZmtyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc0NDAyNTEsImV4cCI6MjEwMzAxNjI1MX0.w5CwAXqWN7aTZ6WQ8gcz9SOqywRRC_1DggU7MHoIPmE';

// Helper de Fetch direto (dispensa bibliotecas pesadas se quiser usar fetch nativo)
export async function fetchFromSupabase<T>(table: string): Promise<T[]> {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?select=*`, {
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
      }
    });
    if (!res.ok) throw new Error(`Erro ao buscar dados de ${table}`);
    return await res.json();
  } catch (error) {
    console.warn(`Fallback para dados locais de ${table}:`, error);
    return [];
  }
}
