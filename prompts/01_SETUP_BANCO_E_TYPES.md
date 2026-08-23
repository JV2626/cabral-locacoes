# 📦 Tarefa 1: Setup da Estrutura, Banco de Dados e Tipos TypeScript

Copie e cole este prompt na IA (usando **Opus 5.0 / 4.8** para máxima precisão e código sem erros):

```markdown
Você é um Engenheiro de Software Sênior especializado em Next.js 14 (App Router), TypeScript, Tailwind CSS e Supabase.

Estamos construindo o SaaS de Gestão de Frotas e Locação da "Cabral Locações".

### 🎯 Seu Objetivo nesta Tarefa:
Criar a base de tipos TypeScript, cliente de banco de dados e estrutura de utilitários do sistema.

### 📋 O que você deve gerar:

1. `src/types/fleet.ts`:
   - Interfaces completas com tipagem estrita para:
     * `Vehicle` (id, plate, model, category, year, current_km, status: 'available'|'rented'|'maintenance'|'inactive', photo_url)
     * `MaintenanceRule` (id, vehicle_id, service_type, initial_km, interval_km, last_service_km, status: 'green'|'yellow'|'red')
     * `Contract` (id, vehicle_id, driver_name, driver_phone, driver_cnh, billing_cycle, weekly_rate, deposit_amount, due_day_of_week, status: 'active'|'overdue'|'finished')
     * `KpiMetrics` (oil_changes_pending, inspections_pending, active_rentals, available_vehicles, rented_vehicles, total_invested, upcoming_receivables, received_month, overdue_amount, pending_fines)
     * `AiInsight` (id, category: 'km_wear'|'profitability'|'bottleneck', title, description, recommendation, severity: 'low'|'medium'|'high')

2. `src/lib/mock-data.ts`:
   - Um conjunto rico de dados simulados (Mock Data) da frota real da Cabral Locações:
     * 8 veículos (Fiat Cronos, HB20, Onix Plus, Tracker, Kwid) com KM variando entre 8.000 e 52.000 km.
     * Regras de manutenção ativas (com KM inicial, intervalo de 10.000 km e status verde/amarelo/vermelho).
     * Contratos ativos de motoristas de Uber com datas de vencimento semanais.
     * Métricas consolidadas de KPI calculadas.

3. `src/lib/utils/calculations.ts`:
   - Função `calculateRemainingKm(currentKm, lastServiceKm, intervalKm)` retornando `{ remainingKm, percentage, status }`.
   - Função `formatCurrency(value)` formatando em Reais (BRL).
   - Função `formatKm(value)` formatando em `XX.XXX km`.

Forneça o código completo, sem omissões nem comentários do tipo `// adicione o resto aqui`. Código pronto para produção!
```
