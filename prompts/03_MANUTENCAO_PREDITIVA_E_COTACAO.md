# 🔧 Tarefa 3: Painel de Manutenção Preditiva e Cotação de Peças com IA

Copie e cole este prompt na IA (usando **Opus 5.0 / 4.8**):

```markdown
Você é um Engenheiro Frontend Especialista em interfaces densas de operações, Next.js 14, Tailwind CSS e componentes shadcn/ui.

Estamos desenvolvendo o Painel de Manutenção e Cotação da "Cabral Locações".

### 🎯 Seu Objetivo:
Construir a tela `src/app/manutencao/page.tsx` com o formulário de recorrência, os cards de KM regressivo com barra percentual e o módulo de cotação de peças gamificada.

### 📐 Especificação dos Componentes:

1. **Lado Esquerdo: Formulário de Nova Manutenção Recorrente**:
   - Card com título: "⚙️ Nova Manutenção Recorrente"
   - Passo 1:
     * Campo de busca de Veículo (Placa ou Modelo).
     * Dropdown Tipo de Manutenção (Troca de Óleo, Filtro de Óleo, Filtro de Ar, Alinhamento & Balanceamento, Rodízio de Pneus, Pastilhas de Freio, Revisão Geral).
     * Dropdown Tipo de Alerta (Por KM, Por Dias, Híbrido).
   - Passo 2:
     * Input: Odômetro inicial para manutenção (KM) (Ex: 80.000 KM).
     * Input: Intervalo em KM para alerta recorrente (Ex: 10.000 KM).
   - Botões de ação: "Limpar" e "Salvar Regra".

2. **Lado Direito: Cards de Próximas Manutenções a Vencer**:
   - Grade com cards responsivos:
     * Título: `[Carro / Placa] - [Tipo de Serviço]` (Ex: `Fiat Cronos ABC-1234 - Revisão Geral`)
     * Destaque Numérico em texto grande e negrito: `10.917 km para o vencimento`
     * Subtítulo: `Início 0 km · Atual 8.083 km · Int. 19.000 km`
     * Barra de Progresso com cor dinâmica:
       - 0% a 60%: Barra verde (`bg-emerald-500`)
       - 61% a 85%: Barra amarela (`bg-amber-500`)
       - >85%: Barra vermelha (`bg-rose-500`) com badge piscante "URGENTE"
     * Texto: `43% do período atingido`.

3. **Seção Inferior: Módulo de Cotação de Peças com IA Gamificada**:
   - A IA lista os carros que estão na faixa amarela/vermelha e gera a lista de peças da semana:
     * HB20 (ABC-1234): 4L Óleo 5W30 + 1 Filtro
     * Onix (XYZ-9876): 2 Pneus 185/65 R15 + Alinhamento
   - Inputs rápidos onde o administrador digita apenas o preço unitário cotado na oficina.
   - Cálculo automático do total, economia percentual e botão `[ 📄 Gerar Ordem de Compra em PDF / WhatsApp ]`.

Forneça o código React / Next.js completo, totalmente estilizado e funcional.
```
