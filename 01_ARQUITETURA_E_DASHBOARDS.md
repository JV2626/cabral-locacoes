# 📊 Especificação Detalhada dos Dashboards — Cabral Locações

Este documento detalha o comportamento, componentes, telas e módulos de Inteligência Artificial da **Cabral Locações**.

---

## 🧠 1. Módulo de IA do Administrador (Copiloto & Insights)

### Componente 1: Chat Copiloto com a Frota (Floating Drawer ou Aba Dedicada)
* **Interface**:
  * Campo de texto com placeholder: *"Pergunte qualquer coisa sobre carros, motoristas, KM ou faturamento..."*.
  * Sugestões de perguntas em badges clicáveis:
    * `[ 🚗 Carros alugados hoje ]`
    * `[ 🛢️ Próximas trocas de óleo ]`
    * `[ 💰 Faturamento desta semana ]`
    * `[ 🔍 Buscar KM por placa ]`
* **Exibição de Respostas**:
  * Respostas em texto direto e cards formatados com dados em tempo real da frota.

### Componente 2: Aba de Insights & Auditoria Preditiva com IA
* **Cards de Insights Inteligentes**:
  1. **Análise de Desgaste de KM por Motorista**:
     * Compara o ritmo de rodagem do motorista com a média da frota.
     * Prevê a data exata da próxima manutenção e sugere ações preventivas.
  2. **Auditoria de Rentabilidade por Carro**:
     * Calcula margem líquida real de cada veículo descontando custos mecânicos.
     * Recomenda quais modelos dão mais lucro e menos manutenção para futuras compras de frota.
  3. **Diagnóstico de Gargalos de Oficina**:
     * Detecta se múltiplos carros atingirão revisões de KM na mesma quinzena e sugere escalonamento para evitar carros parados ao mesmo tempo.

### Componente 3: Central de Notificações Inteligentes (Sino no Topo da Tela)
* Badges de alerta por severidade:
  * 🔴 **Urgente**: Carro a menos de 200 km da troca de óleo / Fatura semanal com mais de 48h de atraso.
  * 🟡 **Atenção**: Motorista sem enviar foto semanal do painel há mais de 7 dias / Faturas vencendo hoje.
  * 🟢 **Oportunidade**: Motorista completando ciclo sem multas (elegível a bônus de fidelidade).

---

## 🔧 2. Painel de Manutenção Preditiva (Referência: Imagem 1)

### Formulário de Nova Manutenção Recorrente:
* **Veículo**: Autocomplete por Placa ou Nome do Carro.
* **Tipo de Manutenção**: *Troca de Óleo, Filtros, Alinhamento & Balanceamento, Rodízio de Pneus, Pastilhas de Freio, Correia Dentada, Revisão Geral*.
* **Regras de Recorrência**: *Odômetro Inicial (KM) + Intervalo em KM ou Dias*.

### Cards de Manutenção com KM Regressivo:
* `X.XXX km para o vencimento` com barra de progresso colorida (Verde, Amarela, Vermelha).
* Detalhes: *Início 0 km · Atual 8.083 km · Intervalo 20.000 km*.

---

## 🎮 3. Cotação de Peças com IA Gamificada

* **Missão da Semana**: A IA compila todas as peças necessárias dos carros em manutenção amarela/vermelha.
* **Entrada do Admin**: Digita apenas o valor unitário das peças cotadas nas oficinas parceiras.
* **Saída Automática**: Cálculo do custo total, economia percentual em lote, custo por KM e botão `[ 📄 Gerar Ordem de Compra em PDF ]`.

---

## 📱 4. Dashboard Executivo com 10 KPIs (Referência: Imagem 2)

* **Cards com Cores**:
  * 🛢️ *Troca de Óleo*, 📋 *Vistorias*, 📝 *Locações Ativas*, 🚗 *Veículos Disponíveis*, 🔑 *Em Locação*, 💵 *Investido na Frota*, ⏰ *A Vencer*, ✅ *Recebidos*, 🚨 *Em Atraso*, 🎟️ *Multas*.
* **Calendário de Recebimentos**: Grade interativa dos pagamentos semanais de Uber e mensais.

---

## 📈 5. Tabela de Rentabilidade & Exportação (.xlsx / .csv)

* Tabela com dados por placa: *Dias Alugado, Taxa de Ocupação, Faturamento, Custos de Peças, Lucro Líquido Real e Custo por KM*.
* Botões de exportação: **Excel (.xlsx)**, **CSV (.csv)** e **PDF**.

---

## 💬 6. Hub de Atendimento do Cliente (No Site e App)

* **Botão Flutuante de WhatsApp**: Chama diretamente o número oficial da Cabral Locações.
* **Assistente de Apoio com IA**: Tira dúvidas instantâneas sobre requisitos de CNH, regras de caução e planos, fazendo a ponte direta com o atendente humano para fechar o contrato.
