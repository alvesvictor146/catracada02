/**
 * CATRACADA / NATURAL ZONE — SHOPIFY OS 2.0 FRONTEND ENGINE (ES6+)
 * - Menu Mobile e Navegação Suave
 * - Carrossel de Produtos Interativo
 * - Integração Nativa com Shopify Ajax Cart API (/cart.js, /cart/add.js, /cart/change.js)
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNavigation();
  initHeroCarousel();
  initProductCarousel();
  initAjaxCart();
});

/* 1.5. Carrossel dos 4 Itens à Direita do Hero */
function initHeroCarousel() {
  const carousel = document.querySelector('[data-hero-carousel]');
  if (!carousel) return;

  const slides = Array.from(carousel.querySelectorAll('[data-hero-slide]'));
  const dots = Array.from(carousel.querySelectorAll('[data-hero-dot]'));
  const prevBtn = carousel.querySelector('[data-hero-prev]');
  const nextBtn = carousel.querySelector('[data-hero-next]');

  if (slides.length === 0) return;
  let currentIndex = 0;

  const goToSlide = (index) => {
    currentIndex = (index + slides.length) % slides.length;
    slides.forEach((slide, idx) => {
      slide.classList.toggle('is-active', idx === currentIndex);
    });
    dots.forEach((dot, idx) => {
      dot.classList.toggle('is-active', idx === currentIndex);
      dot.setAttribute('aria-selected', String(idx === currentIndex));
    });
  };

  if (prevBtn) {
    prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));
  }

  dots.forEach((dot, idx) => {
    dot.addEventListener('click', () => goToSlide(idx));
  });
}

/* 1. Menu Mobile */
function initMobileNavigation() {
  const toggleBtn = document.querySelector('[data-mobile-menu-toggle]');
  const nav = document.querySelector('[data-site-nav]');
  if (!toggleBtn || !nav) return;

  toggleBtn.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    toggleBtn.setAttribute('aria-expanded', String(isOpen));
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      toggleBtn.setAttribute('aria-expanded', 'false');
    });
  });
}

/* 2. Carrossel de Produtos (Catracada Test, Black Dragon Test, Catracada Turbo) */
function initProductCarousel() {
  const track = document.querySelector('[data-carousel-track]');
  const prevBtn = document.querySelector('[data-carousel-prev]');
  const nextBtn = document.querySelector('[data-carousel-next]');
  if (!track) return;

  const getScrollStep = () => {
    const firstCard = track.querySelector('.product-card');
    return firstCard ? firstCard.getBoundingClientRect().width + 24 : 320;
  };

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      track.scrollBy({ left: -getScrollStep(), behavior: 'smooth' });
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      track.scrollBy({ left: getScrollStep(), behavior: 'smooth' });
    });
  }
}

/* 3. Shopify Ajax Cart API */
function initAjaxCart() {
  const drawer = document.querySelector('[data-cart-drawer]');
  const backdrop = document.querySelector('[data-cart-backdrop]');
  const openBtns = document.querySelectorAll('[data-cart-open]');
  const closeBtns = document.querySelectorAll('[data-cart-close]');

  const openDrawer = () => {
    if (!drawer || !backdrop) return;
    drawer.classList.add('is-open');
    backdrop.classList.add('is-open');
    drawer.setAttribute('aria-hidden', 'false');
  };

  const closeDrawer = () => {
    if (!drawer || !backdrop) return;
    drawer.classList.remove('is-open');
    backdrop.classList.remove('is-open');
    drawer.setAttribute('aria-hidden', 'true');
  };

  openBtns.forEach((btn) => btn.addEventListener('click', (e) => {
    e.preventDefault();
    openDrawer();
  }));

  closeBtns.forEach((btn) => btn.addEventListener('click', closeDrawer));
  if (backdrop) backdrop.addEventListener('click', closeDrawer);

  // Intercepta formulários de adição ao carrinho
  document.querySelectorAll('[data-ajax-cart-form]').forEach((form) => {
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const submitBtn = form.querySelector('[type="submit"]');
      const originalText = submitBtn ? submitBtn.innerHTML : '';

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'ADICIONANDO...';
      }

      const formData = new FormData(form);

      try {
        const response = await fetch(window.Shopify?.routes?.root ? `${window.Shopify.routes.root}cart/add.js` : '/cart/add.js', {
          method: 'POST',
          body: formData,
          headers: { 'Accept': 'application/json' }
        });

        if (!response.ok) throw new Error('Falha ao adicionar ao carrinho Shopify');

        await refreshCartDrawer();
        if (submitBtn) submitBtn.textContent = 'ADICIONADO!';
        openDrawer();
      } catch (err) {
        // Fallback seguro caso esteja rodando em preview estático local fora da Shopify
        handleLocalPreviewCartFallback(form, openDrawer);
      } finally {
        setTimeout(() => {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
          }
        }, 900);
      }
    });
  });
}

async function refreshCartDrawer() {
  const response = await fetch(window.Shopify?.routes?.root ? `${window.Shopify.routes.root}cart.js` : '/cart.js', {
    headers: { 'Accept': 'application/json' }
  });
  if (!response.ok) return;
  const cart = await response.json();
  renderCartState(cart);
}

function formatMoneyBRL(cents) {
  const value = (Number(cents) || 0) / 100;
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function renderCartState(cart) {
  document.querySelectorAll('[data-cart-count]').forEach((el) => {
    el.textContent = cart.item_count;
  });

  const itemsContainer = document.querySelector('[data-cart-items]');
  const subtotalEl = document.querySelector('[data-cart-subtotal]');
  const pixTotalEl = document.querySelector('[data-cart-pix-total]');

  if (subtotalEl) subtotalEl.textContent = formatMoneyBRL(cart.total_price);
  if (pixTotalEl) pixTotalEl.textContent = formatMoneyBRL(Math.round(cart.total_price * 0.9));

  if (!itemsContainer) return;

  if (!cart.items || cart.items.length === 0) {
    itemsContainer.innerHTML = `<p style="color: var(--color-text-secondary); text-align:center; padding: 2rem 0;">Seu carrinho está vazio.</p>`;
    return;
  }

  itemsContainer.innerHTML = cart.items.map((item) => `
    <div class="cart-item" data-line-key="${item.key}">
      <img class="cart-item__img" src="${item.image || ''}" alt="${item.title}" loading="lazy">
      <div>
        <div class="cart-item__title">${item.product_title}</div>
        <div class="cart-item__price">${formatMoneyBRL(item.final_line_price)}</div>
        <div class="cart-item__qty">
          <button type="button" class="cart-qty-btn" onclick="updateCartItemQty('${item.key}', ${item.quantity - 1})">-</button>
          <span>${item.quantity}</span>
          <button type="button" class="cart-qty-btn" onclick="updateCartItemQty('${item.key}', ${item.quantity + 1})">+</button>
        </div>
      </div>
      <button type="button" class="cart-qty-btn" aria-label="Remover" onclick="updateCartItemQty('${item.key}', 0)">&times;</button>
    </div>
  `).join('');
}

window.updateCartItemQty = async function(key, quantity) {
  try {
    const response = await fetch(window.Shopify?.routes?.root ? `${window.Shopify.routes.root}cart/change.js` : '/cart/change.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ id: key, quantity })
    });
    if (response.ok) {
      const cart = await response.json();
      renderCartState(cart);
    }
  } catch (e) {
    console.warn('Atualização de quantidade disponível apenas no ambiente Shopify.', e);
  }
};

/* Fallback de demonstração quando aberto via arquivo local estático */
const previewCart = { item_count: 0, total_price: 0, items: [] };
function handleLocalPreviewCartFallback(form, openDrawer) {
  const title = form.getAttribute('data-product-title') || 'Suplemento Catracada';
  const priceCents = Number(form.getAttribute('data-product-price') || 7990);
  const image = form.getAttribute('data-product-image') || 'Catracada_LOGO.png';
  const key = title.toLowerCase().replace(/\s+/g, '-');

  const existing = previewCart.items.find((i) => i.key === key);
  if (existing) {
    existing.quantity += 1;
    existing.final_line_price = existing.quantity * priceCents;
  } else {
    previewCart.items.push({
      key,
      title,
      product_title: title,
      quantity: 1,
      final_line_price: priceCents,
      image
    });
  }
  previewCart.item_count = previewCart.items.reduce((acc, i) => acc + i.quantity, 0);
  previewCart.total_price = previewCart.items.reduce((acc, i) => acc + i.final_line_price, 0);
  renderCartState(previewCart);
  openDrawer();
}
