# Catracada / Natural Zone — Shopify Online Store 2.0 Redesign

Repositório oficial da reconstrução visual do e-commerce **Catracada / Natural Zone** (`https://www.catracada.com.br/`) na plataforma **Shopify (Online Store 2.0)**.

---

## 1. Visão Geral e Diretrizes Visuais

O projeto tem como objetivo entregar uma experiência **simples, direta, agressiva em conversão e mobile-first**, preservando integralmente a operação comercial, catálogo, variantes, carrinho Ajax e checkout nativo da Shopify.

### Identidade Visual (Design Tokens Principais)
- **Fundo Principal:** Azul Escuro Profundo (`#070D19` / `#0B132B`)
- **Superfícies / Cards:** Azul Noturno (`#111C35` / `#162447`)
- **Tipografia Principal:** Branco Puro (`#FFFFFF`) e Branco Suave (`#E2E8F0`)
- **Cor de Destaque (Accent / CTAs):** Vermelho Intenso Catracada (`#E3242B` / `#FF1E27`)

### Fluxo da Home (Simples e Objetivo)
1. **Header & Menu de Navegação:**
   - `NOSSOS PRODUTOS` (Dropdown/Submenu: *Estimulantes*, *Creatinas*, *Pré Treino*, *Emagrecedores*, *Termogênicos*, *Queda Capilar*)
   - `COMBOS`
   - `QUEM SOMOS`
   - `LOCALIZAÇÃO`
   - `CONTATO`
2. **Hero Section:**
   - Vídeo em destaque (`Produto_em_destaque_com_tempestade_3a642322_1080p.mp4`) com apresentação direta dos **3 produtos principais**.
3. **Vitrine / Carrossel Imediato de Compra:**
   - Destaque imediato para conversão: **CATRACADA TEST**, **BLACK DRAGON TEST**, **CATRACADA TURBO** e demais coleções logo abaixo do Hero.
4. **Faixa de Diferenciais Comerciais:**
   - Parcelas em até 3x sem juros
   - 10% OFF no PIX
   - Retirada em Loja Física
   - Envios em até 24h para São Paulo e Região
   - Entrega Garantida ou o Dinheiro de Volta \*\*
5. **Seção Quem Somos & Rodapé Completo:**
   - História da marca Natural Zone / Catracada.
   - Botões de Redes Sociais (**Instagram** `@naturalzone.br`, **TikTok** `@naturalzonebr`, **Google Reviews**).
   - **Mapa do Google (Google Maps Embed)** com endereço da Loja Física (*Estrada Dom João Nery, 1843 - Vila Silva Teles, São Paulo - SP*).

---

## 2. Stack Tecnológica

- **Templates & Dados:** HTML5 Semântico + Shopify Liquid + JSON Templates (Online Store 2.0)
- **Estilização:** CSS3 Nativo (CSS Variables, CSS Grid, Flexbox, Media Queries Mobile-First)
- **Interatividade:** JavaScript Vanilla ES6+ + Fetch API + Shopify Ajax Cart API (`/cart/add.js`, `/cart/change.js`, `/cart.js`)
- **Ferramentas:** Shopify CLI 3.x, Shopify Theme Check, Git / GitHub

> **Restrições Arquiteturais:** Proibido o uso de frameworks SPA (React/Angular), backends paralelos ou substituição do checkout nativo da Shopify.

---

## 3. Fluxo de Branches e Segurança

- `main`: Versões estáveis e homologadas.
- `develop`: Desenvolvimento contínuo de seções, snippets e estilos.
- **Regra de Ouro:** Nunca desenvolver diretamente no tema publicado (`live`) e nunca armazenar tokens ou credenciais no repositório.
