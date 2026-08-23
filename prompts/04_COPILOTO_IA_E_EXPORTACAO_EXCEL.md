# 💬 Tarefa 4: Copiloto de IA, Aba de Insights e Tabela com Exportação Excel (.xlsx/.csv)

Copie e cole este prompt na IA (usando **Opus 5.0 / 4.8**):

```markdown
Você é um Engenheiro Fullstack e Especialista em IA Generativa em Next.js 14, React, Tailwind CSS e bibliotecas de manipulação de dados (SheetJS / xlsx).

Estamos desenvolvendo o Módulo de IA e Exportação de Relatórios da "Cabral Locações".

### 🎯 Seu Objetivo:
Construir a tela de Insights & Copiloto IA (`src/app/insights/page.tsx` ou componente) e a tabela analítica de frota com exportação real em `.xlsx` e `.csv`.

### 📐 Especificação dos Componentes:

1. **Aba de Insights & Auditoria Preditiva com IA**:
   - Cards elegantes com ícone de lâmpada brilhante (`💡`) divididos em:
     * **Insight 1: Desgaste Acelerado de KM**: Analisa motoristas rodando acima de 220 km/dia na Uber e prevê a antecipação da revisão.
     * **Insight 2: Rentabilidade Real por Modelo**: Compara o lucro líquido do Cronos (89%) com modelos de maior custo mecânico.
     * **Insight 3: Alerta de Revisões Simultâneas**: Recomenda escalonar trocas de óleo de múltiplos carros para não superlotar a oficina.

2. **Copiloto de IA da Frota (Chat Interativo)**:
   - Interface de chat com histórico e campo de mensagem.
   - Botões com perguntas rápidas sugeridas:
     * `[ 🚗 Carros alugados hoje ]`
     * `[ 🛢️ Próximas revisões de óleo ]`
     * `[ 💰 Faturamento desta semana ]`
     * `[ 🔍 Buscar KM por placa ]`
   - O chat deve simular as respostas instantâneas formatadas com dados da frota da Cabral Locações.

3. **Tabela de Rentabilidade da Frota com Exportação Excel / CSV**:
   - Tabela com colunas: Placa, Modelo, Categoria, Dias Alugado, Taxa de Ocupação (%), Faturamento Bruto, Gastos de Manutenção, Lucro Líquido, Custo/KM.
   - Botões no topo da tabela:
     * 📗 `[ Exportar para Excel (.xlsx) ]` — Usa a biblioteca `xlsx` para gerar o arquivo `.xlsx` real para download no navegador do usuário.
     * 📄 `[ Exportar CSV (.csv) ]` — Gera o arquivo delimitado por vírgulas para download.

Forneça o código React / Next.js completo com as funções de exportação implementadas sem erros.
```
