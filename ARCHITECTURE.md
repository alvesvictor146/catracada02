# Registro de Decisões Arquiteturais (ADR) — Catracada Shopify Redesign

## ADR-001: Adoção estrita da arquitetura Shopify Online Store 2.0
- **Contexto:** Necessidade de reconstruir a experiência visual da loja Catracada / Natural Zone mantendo toda a operação comercial e facilidade de manutenção via painel Shopify.
- **Decisão:** Utilizar exclusivamente HTML5, Shopify Liquid, JSON templates (`templates/*.json`) e seções modulares configuráveis via `{% schema %}` sem frameworks SPA (React/Angular).
- **Consequências:** Máxima performance (Core Web Vitals), zero custo de infraestrutura adicional, compatibilidade total com apps nativos (`content_for_header`) e edição visual pelo lojista no Theme Editor.

## ADR-002: Paleta Dark Blue + White + Red Accent
- **Contexto:** O cliente determinou uma estética forte de alta performance alinhada ao vídeo de tempestade (`Produto_em_destaque_com_tempestade_3a642322_1080p.mp4`), ao logo `Catracada_LOGO.png` (letras claras com `A` em chevron vermelho `#E3242B`) e ao mascote oficial (`OIG.png`).
- **Decisão:** Padronizar o Design System com CSS Variables em tema escuro:
  - `--color-bg-primary: #070D19` (Azul escuro profundo)
  - `--color-bg-secondary: #111C35` (Azul escuro para cards e superfícies)
  - `--color-text-primary: #FFFFFF` (Branco puro para máxima legibilidade)
  - `--color-accent-red: #E3242B` (Vermelho de destaque para CTAs, badges, detalhes e hover)

## ADR-003: Arquitetura enxuta focada em conversão imediata (Above the Fold -> Compra)
- **Contexto:** O cliente solicitou um site mais simples e objetivo: Menu -> Hero com vídeo e apresentação de 3 produtos -> Produtos para compra imediata (Carrossel com *Catracada Test*, *Black Dragon Test* e *Catracada Turbo*).
- **Decisão:** Eliminar blocos intermediários prolixos antes da vitrine principal. A página inicial (`templates/index.json`) carregará o `header`, `hero-banner` (com vídeo + showcase de 3 produtos), `featured-collection` / carrossel de compra rápida com botão de adição direta via Shopify Ajax Cart API, seguido pela barra de `diferenciais`, `brand-story` (Quem Somos) e `footer` com Google Maps integrado.

## ADR-004: Proteção do Tema Publicado e Checkout Nativo
- **Contexto:** A loja `catracada.com.br` está em operação comercial ativa.
- **Decisão:** Todo o desenvolvimento e testes ocorrem em tema não publicado (`development` / `unpublished`). O checkout nativo (`/checkout`), regras de frete, descontos PIX (10% OFF) e parcelamento (até 3x sem juros) permanecem gerenciados nativamente pela Shopify e seus gateways instalados.
