# 🌐 Estratégia de Benchmarking & Site Público — Cabral Locações

Este documento especifica como será a página inicial pública da **Cabral Locações**, inspirada nas melhores práticas visuais de grandes plataformas (Kovi, Zarp Localiza, Turbi e Localiza), adaptada para a marca própria.

---

## 🏆 Benchmarks Analisados

| Referência | Ponto Forte Copiado | Como adaptamos para a Cabral Locações |
| :--- | :--- | :--- |
| **Kovi** | Foco em planos semanais e facilidade para motoristas de aplicativo. | Simulador de Lucro Líquido para Uber na Home. |
| **Zarp Localiza** | Linguagem direta sobre manutenção inclusa e seguro. | Cards com selos: *"Manutenção 100% Inclusa"*, *"Sem Consulta SPC/Serasa"*. |
| **Turbi** | Design moderno, limpo, cards escuros/claros de alto contraste e fluxo sem burocracia. | Interface em Next.js com Tailwind e shadcn/ui. |
| **Localiza** | Busca rápida por categoria de carro e data de retirada. | Widget intuitivo no topo da página. |

---

## 🎨 Identidade Visual & Design System da Cabral Locações

* **Estilo**: Moderno, robusto, confiável e profissional.
* **Paleta de Cores Recomendada**:
  * **Cor Primária**: Azul Profundo / Marinho (`#0F172A` / `#1E3A8A`) — Transmite segurança e estabilidade.
  * **Cor de Destaque (CTA / Ação)**: Verde Esmeralda / Amarelo Ouro (`#10B981` ou `#F59E0B`) — Atrai o clique para *"Alugar Agora"* e *"Simular Plano"*.
  * **Fundos**: Cinza Suave (`#F8FAFC`) com cartões brancos puros (`#FFFFFF`) e sombras suaves (`shadow-sm`).
* **Tipografia**: `Inter` ou `Plus Jakarta Sans` para títulos e textos.

---

## 📐 Estrutura da Página Inicial (Landing Page)

1. **Header / Navbar**:
   * Logotipo: **Cabral Locações**.
   * Links: *Nossa Frota*, *Planos para Uber*, *Como Funciona*, *Vantagens*, *Contato*.
   * Botão de Destaque: `Área do Cliente / WhatsApp`.

2. **Hero Section (Primeira Dobra)**:
   * Título: *"Alugue seu carro para trabalhar na Uber sem dor de cabeça e com manutenção 100% inclusa"*.
   * Subtítulo: *"Carros novos, revisados semanalmente, sem burocracia e com aprovação expressa de CNH."*
   * **Widget de Simulação Rápida**:
     * Escolha o Carro: *Hatch Econômico (Onix/Argo) | Sedã Conforto (Cronos/HB20S) | SUV*.
     * Escolha o Plano: *Semanal por KM | Semanal Livre*.
     * Botão: **[ Simular e Reservar no WhatsApp ]**.

3. **Grade de Veículos Disponíveis (Cards com Fotos)**:
   * Foto do veículo em alta resolução.
   * Categoria (*Econômico / Sedã / SUV*).
   * Itens inclusos: ❄️ Ar-condicionado, 🕹️ Câmbio Manual/Auto, 🧳 4 Malas, ⛽ Flex.
   * Valor Semanal: `A partir de R$ 499/semana`.
   * Botão: **[ Quero Este Carro ]**.

4. **Seção de Vantagens da Cabral Locações**:
   * 🛢️ *Manutenção Preventiva Inclusa*: Troca de óleo, pastilhas e pneus sem custo extra.
   * ⚡ *Aprovação em 30 minutos*: Envie sua CNH pelo celular e retire o carro hoje mesmo.
   * 🛡️ *Seguro Completo & Assistência 24h*: Cobertura para terceiros e guincho.
   * 🚗 *Carros Prontos para Rodar na Uber e 99*: Todos com documentação em dia e cadastrados.

5. **Depoimentos de Motoristas Reais**:
   * Prova social com fotos e relatos de motoristas que já rodam com a frota da Cabral Locações.

6. **Rodapé Completo**:
   * Endereço da loja física, horário de funcionamento, telefone e mapa de localização.
