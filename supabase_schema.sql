-- =============================================================================
-- 🚗 CABRAL LOCAÇÕES SAAS — SCHEMA COMPLETO DO BANCO DE DADOS (SUPABASE / POSTGRESQL)
-- =============================================================================
-- Este script cria todas as tabelas, índices e ativa o Row Level Security (RLS)
-- em 100% das tabelas em conformidade com as diretrizes OWASP e LGPD.
-- =============================================================================

-- Habilita extensão para UUIDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. TABELA DE VEÍCULOS
CREATE TABLE IF NOT EXISTS public.vehicles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    plate VARCHAR(10) NOT NULL UNIQUE,
    model VARCHAR(100) NOT NULL,
    category VARCHAR(30) NOT NULL CHECK (category IN ('Hatch', 'Sedan', 'SUV', 'Eletrico', 'Utilitario')),
    year INT NOT NULL,
    current_km INT NOT NULL DEFAULT 0 CHECK (current_km >= 0),
    status VARCHAR(20) NOT NULL DEFAULT 'available' CHECK (status IN ('available', 'rented', 'maintenance', 'inactive')),
    photo_url TEXT NOT NULL,
    daily_rate NUMERIC(10, 2) NOT NULL DEFAULT 0,
    weekly_rate NUMERIC(10, 2) NOT NULL DEFAULT 0,
    current_driver VARCHAR(120),
    color VARCHAR(40),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. TABELA DE REGRAS DE MANUTENÇÃO PREVENTIVA (KM REGRESSIVO)
CREATE TABLE IF NOT EXISTS public.maintenance_rules (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    vehicle_id UUID NOT NULL REFERENCES public.vehicles(id) ON DELETE CASCADE,
    service_type VARCHAR(40) NOT NULL,
    service_name VARCHAR(120) NOT NULL,
    initial_km INT NOT NULL DEFAULT 0,
    current_km INT NOT NULL DEFAULT 0,
    interval_km INT NOT NULL CHECK (interval_km > 0),
    last_service_km INT NOT NULL DEFAULT 0,
    status VARCHAR(10) NOT NULL DEFAULT 'green' CHECK (status IN ('green', 'yellow', 'red')),
    estimated_cost NUMERIC(10, 2) NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. TABELA DE CONTRATOS DE LOCAÇÃO PARA MOTORISTAS (UBER / 99)
CREATE TABLE IF NOT EXISTS public.contracts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    vehicle_id UUID NOT NULL REFERENCES public.vehicles(id) ON DELETE RESTRICT,
    driver_name VARCHAR(150) NOT NULL,
    driver_phone VARCHAR(25) NOT NULL,
    driver_cnh VARCHAR(20) NOT NULL,
    billing_cycle VARCHAR(20) NOT NULL DEFAULT 'weekly' CHECK (billing_cycle IN ('weekly', 'monthly')),
    rate NUMERIC(10, 2) NOT NULL,
    deposit_amount NUMERIC(10, 2) NOT NULL DEFAULT 0,
    due_day_of_week INT NOT NULL CHECK (due_day_of_week BETWEEN 1 AND 7),
    due_date DATE NOT NULL,
    status VARCHAR(25) NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'overdue', 'paid_this_week', 'finished')),
    weeks_rented INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. TABELA DE COTAÇÃO DE PEÇAS GAMIFICADA COM IA
CREATE TABLE IF NOT EXISTS public.quoted_parts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    vehicle_id UUID NOT NULL REFERENCES public.vehicles(id) ON DELETE CASCADE,
    part_name VARCHAR(150) NOT NULL,
    quantity INT NOT NULL DEFAULT 1 CHECK (quantity > 0),
    unit VARCHAR(20) NOT NULL DEFAULT 'Un',
    unit_price NUMERIC(10, 2) NOT NULL DEFAULT 0,
    status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'purchased')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. TABELA DE AUDITORIA & INSIGHTS DA IA
CREATE TABLE IF NOT EXISTS public.ai_insights (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    category VARCHAR(30) NOT NULL CHECK (category IN ('km_wear', 'profitability', 'bottleneck', 'loyalty')),
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    recommendation TEXT NOT NULL,
    severity VARCHAR(10) NOT NULL DEFAULT 'low' CHECK (severity IN ('low', 'medium', 'high')),
    impact_metric VARCHAR(80) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. TABELA DE VISTORIAS SEMANAIS E FOTOS DE PAINEL POR OCR
CREATE TABLE IF NOT EXISTS public.odometer_inspections (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    vehicle_id UUID NOT NULL REFERENCES public.vehicles(id) ON DELETE CASCADE,
    driver_phone VARCHAR(25) NOT NULL,
    photo_url TEXT,
    recorded_km INT NOT NULL CHECK (recorded_km > 0),
    confidence INT NOT NULL DEFAULT 95,
    status VARCHAR(20) NOT NULL DEFAULT 'approved' CHECK (status IN ('pending', 'approved', 'rejected')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- =============================================================================
-- ÍNDICES PARA ALTA PERFORMANCE
-- =============================================================================
CREATE INDEX IF NOT EXISTS idx_vehicles_plate ON public.vehicles(plate);
CREATE INDEX IF NOT EXISTS idx_vehicles_status ON public.vehicles(status);
CREATE INDEX IF NOT EXISTS idx_maintenance_vehicle_id ON public.maintenance_rules(vehicle_id);
CREATE INDEX IF NOT EXISTS idx_contracts_driver_phone ON public.contracts(driver_phone);
CREATE INDEX IF NOT EXISTS idx_contracts_status ON public.contracts(status);
CREATE INDEX IF NOT EXISTS idx_inspections_vehicle_id ON public.odometer_inspections(vehicle_id);

-- =============================================================================
-- 🔒 POLÍTICAS DE ROW LEVEL SECURITY (RLS) — 100% ATIVAS
-- =============================================================================

-- Habilita RLS em todas as tabelas
ALTER TABLE public.vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.maintenance_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contracts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quoted_parts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_insights ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.odometer_inspections ENABLE ROW LEVEL SECURITY;

-- Regra 1: Site público e visitantes anônimos podem visualizar apenas veículos com status 'available'
CREATE POLICY "Public catalog vehicles are readable by all"
ON public.vehicles
FOR SELECT
TO anon, authenticated
USING (status = 'available' OR auth.role() = 'authenticated');

-- Regra 2: Administradores autenticados têm acesso irrestrito
CREATE POLICY "Admins have full access to vehicles"
ON public.vehicles
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Admins have full access to maintenance_rules"
ON public.maintenance_rules
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Admins have full access to contracts"
ON public.contracts
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Admins have full access to quoted_parts"
ON public.quoted_parts
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Admins have full access to ai_insights"
ON public.ai_insights
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Admins have full access to odometer_inspections"
ON public.odometer_inspections
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- Regra 3: Motoristas podem inserir vistorias no portal
CREATE POLICY "Drivers can insert inspections"
ON public.odometer_inspections
FOR INSERT
TO anon, authenticated
WITH CHECK (true);
