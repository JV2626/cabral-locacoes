# 📊 Tarefa 2: Dashboard Executivo com os 10 KPIs e Calendário Financeiro

Copie e cole este prompt na IA (usando **Opus 5.0 / 4.8**):

```markdown
Você é um Especialista em UI/UX e Engenheiro Frontend em Next.js 14, React, Tailwind CSS e Lucide Icons.

Estamos desenvolvendo o Dashboard Principal da "Cabral Locações".

### 🎯 Seu Objetivo:
Construir a tela executiva (`src/app/dashboard/page.tsx` ou componente de visão geral) contendo exatamente os 10 cards de métricas estratégicas e o calendário de recebimentos.

### 📐 Especificação Visual & Funcional:

1. **Cabeçalho Superior**:
   - Título: "Visão Geral".
   - Saudação personalizada: "Bem-vindo, Administrador Cabral Locações".
   - Dropdown de filtro de período: "Mês Atual", "Mês Anterior", "Últimos 90 dias".

2. **Grade dos 10 Cards de Indicadores (Grid 2 colunas no mobile / 5 colunas no desktop)**:
   Cada card deve ter ícone estilizado, borda lateral colorida de destaque, badge de informação e valor:
   * 🛢️ **Troca de Óleo**: Borda Laranja (`border-amber-500`) | Ícone Laranja | Valor numérico.
   * 📋 **Vistorias**: Borda Verde Água (`border-teal-500`) | Ícone Verde Água | Valor numérico.
   * 📝 **Locações Ativas**: Borda Azul (`border-blue-500`) | Ícone Azul | Valor numérico.
   * 🚗 **Veículos Disponíveis**: Borda Verde (`border-emerald-500`) | Ícone Verde | Valor numérico.
   * 🔑 **Em Locação**: Borda Roxa (`border-purple-500`) | Ícone Roxo | Valor numérico.
   * 💵 **Investido na Frota**: Borda Roxo Escuro (`border-indigo-600`) | Ícone Roxo | Valor formatado em R$ (Ex: R$ 320.000,00).
   * ⏰ **A Vencer**: Borda Amarela (`border-yellow-500`) | Ícone Amarelo | Valor em R$.
   * ✅ **Recebidos**: Borda Verde (`border-green-600`) | Ícone Verde | Valor em R$.
   * 🚨 **Em Atraso**: Borda Vermelha (`border-rose-500`) | Ícone Vermelho | Valor em R$.
   * 🎟️ **Multas**: Borda Marrom (`border-amber-800`) | Ícone Marrom | Valor em R$.

3. **Seção Inferior: Calendário de Recebimentos da Semana**:
   - Título: "📅 Calendário de Recebimentos".
   - Subtítulo: "Acompanhe as entradas recebidas, em atraso e a vencer da sua locadora".
   - Grade dos 7 dias da semana mostrando faturas de motoristas de Uber com badges coloridos:
     * 🟢 Verde: Recebido (ex: Carlos - HB20 - R$ 550,00)
     * 🟡 Amarelo: A Vencer hoje/amanhã
     * 🔴 Vermelho: Em Atraso

Forneça o código React / Next.js completo com Tailwind CSS, sem atalhos, pronto para rodar.
```
