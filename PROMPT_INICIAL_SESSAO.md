# 🚀 Prompt Mestre para Início de Sessão — Cabral Locações

Copie e cole o prompt abaixo no início de qualquer nova conversa para carregar o contexto completo do projeto e iniciar as revisões:

```markdown
Olá! Estamos trabalhando no desenvolvimento e aprimoramento do SaaS "Cabral Locações" (Gestão de Frotas e Locação para Motoristas de Aplicativo Uber/99).

📂 CONTEXTO DO REPOSITÓRIO:
- Stack: React + TypeScript + Tailwind CSS + Supabase (PostgreSQL com RLS)
- Estrutura de Arquivos:
  * Documentação Mestre: README.md, PLANO_MESTRE_CABRAL_LOCACOES.md, 01_ARQUITETURA_E_DASHBOARDS.md
  * Código-Fonte: src/ (Componentes de 10 KPIs, Manutenção Preditiva, Copiloto IA, Portal do Motorista, Site Público)
  * Prompts Modulares: prompts/

🎯 SUAS DIRETRIZES DESTA SESSÃO:
1. Faça a leitura dos arquivos de contexto na raiz do projeto.
2. Execute uma verificação profunda de qualidade utilizando as skills do ambiente:
   - /sk-bug: Identifique e analise qualquer inconsistência lógica, comportamento inesperado ou erro de renderização.
   - /sk-seguranca: Execute o scan SAST (Semgrep) garantindo zero vazamentos, checando RLS no Supabase e blindagem de rotas.
   - /sk-limpo: Revise tipagens TypeScript, componentes desacoplados e boas práticas de Clean Code.
3. Não quebre nenhuma funcionalidade existente e mantenha o design system (Azul Marinho, Verde Esmeralda, 10 bordas coloridas dos KPIs).

Qual é o relatório de status atual do projeto e as primeiras melhorias identificadas?
```
