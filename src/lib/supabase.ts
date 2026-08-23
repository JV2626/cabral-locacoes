// Configuração do Cliente Supabase para a Cabral Locações
export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://dsebvfznqswwhgbyrfkr.supabase.co';
export const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Helper de Fetch direto seguro com Supabase
export async function fetchFromSupabase<T>(table: string): Promise<T[]> {
  if (!SUPABASE_ANON_KEY) {
    return [];
  }

  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/${encodeURIComponent(table)}?select=*`, {
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
      }
    });
    if (!res.ok) throw new Error('Erro ao buscar dados na tabela');
    return await res.json();
  } catch {
    return [];
  }
}
