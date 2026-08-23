import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Vehicle, MaintenanceRule, Contract, AiInsight, QuotedPartItem } from '../types/fleet';
import { mockVehicles, mockMaintenanceRules, mockContracts, mockAiInsights, mockQuotedParts } from './mock-data';

// Configuração do Cliente Supabase para a Cabral Locações
const getEnvVar = (viteKey: keyof ImportMetaEnv, fallback: string): string => {
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    const val = import.meta.env[viteKey];
    if (val) return val;
  }
  const globalObj = typeof globalThis !== 'undefined' ? (globalThis as Record<string, unknown>) : {};
  const proc = globalObj.process as { env?: Record<string, string> } | undefined;
  if (proc?.env && proc.env[viteKey as string]) {
    return proc.env[viteKey as string];
  }
  return fallback;
};

export const SUPABASE_URL = getEnvVar(
  'VITE_SUPABASE_URL',
  'https://dsebvfznqswwhgbyrfkr.supabase.co'
);

export const SUPABASE_ANON_KEY = getEnvVar(
  'VITE_SUPABASE_ANON_KEY',
  ''
);

export const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY && SUPABASE_ANON_KEY !== 'your_supabase_anon_key_here');

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null;

// =============================================================================
// SERVIÇOS DE DADOS COM FALLBACK HÍBRIDO (SUPABASE / LOCAL MOCK)
// =============================================================================

export async function getVehicles(): Promise<Vehicle[]> {
  if (!supabase) return mockVehicles;
  try {
    const { data, error } = await supabase.from('vehicles').select('*');
    if (error || !data || data.length === 0) return mockVehicles;
    return data as Vehicle[];
  } catch {
    return mockVehicles;
  }
}

export async function getMaintenanceRules(): Promise<MaintenanceRule[]> {
  if (!supabase) return mockMaintenanceRules;
  try {
    const { data, error } = await supabase.from('maintenance_rules').select('*');
    if (error || !data || data.length === 0) return mockMaintenanceRules;
    return data as MaintenanceRule[];
  } catch {
    return mockMaintenanceRules;
  }
}

export async function getContracts(): Promise<Contract[]> {
  if (!supabase) return mockContracts;
  try {
    const { data, error } = await supabase.from('contracts').select('*');
    if (error || !data || data.length === 0) return mockContracts;
    return data as Contract[];
  } catch {
    return mockContracts;
  }
}

export async function getAiInsights(): Promise<AiInsight[]> {
  if (!supabase) return mockAiInsights;
  try {
    const { data, error } = await supabase.from('ai_insights').select('*');
    if (error || !data || data.length === 0) return mockAiInsights;
    return data as AiInsight[];
  } catch {
    return mockAiInsights;
  }
}

export async function getQuotedParts(): Promise<QuotedPartItem[]> {
  if (!supabase) return mockQuotedParts;
  try {
    const { data, error } = await supabase.from('quoted_parts').select('*');
    if (error || !data || data.length === 0) return mockQuotedParts;
    return data as QuotedPartItem[];
  } catch {
    return mockQuotedParts;
  }
}

export async function updateVehicleOdometer(plate: string, newKm: number): Promise<boolean> {
  if (!supabase) return true;
  try {
    const { error } = await supabase
      .from('vehicles')
      .update({ current_km: newKm, updated_at: new Date().toISOString() })
      .eq('plate', plate);
    return !error;
  } catch {
    return false;
  }
}

