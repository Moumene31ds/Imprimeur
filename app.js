/**
 * L'Artisan Imprimeur — Core App JS v1.0.0
 * Production-ready: Navigation, Cart, Toast, Scroll FX, Analytics, Cookies
 */

'use strict';

/* ================================================================
   CONSTANTS
================================================================ */
const APP = {
  name: "L'Artisan Imprimeur",
  version: '1.0.0',
  currency: 'EUR',
  locale: 'fr-FR',
  cartKey: 'lai_cart_v1',
  cookieKey: 'lai_cookies_accepted',
  analyticsId: 'G-XXXXXXXXXX', // Replace with real GA4 ID
  pages: {
    index:'index.html', products:'products.html',
    configurator:'configurator.html', gallery:'gallery.html',
    about:'about.html', contact:'contact.html', cart:'cart.html',
    legal:'legal.html', privacy:'privacy.html', cgv:'cgv.html',
  },
};

/* ================================================================
   DOM HELPERS
================================================================ */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
const qs = (sel) => document.querySelector(sel);

/* ================================================================
   PAGE LOADER
================================================================ */
function initLoader() {
  const loader = document.getElementById('page-loader');
  if (!loader) return;
  window.addEventListener('load', () => {
    setTimeout(() => loader.classList.add('hidden'), 400);
  });
  // Fallback: hide after 2.5s no matter what
  setTimeout(() => loader?.classList.add('hidden'), 2500);
}

/* ================================================================
   NAVIGATION
================================================================ */
function initNav() {
  const nav = document.getElementById('mainNav');
  if (!nav) return;

  // Scroll behavior
  const onScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
    updateScrollTop();
  };
  window.addEventListener('scroll', onScroll, { passive: true });

  // Mobile toggle
  const toggle = document.getElementById('navToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  if (toggle && mobileMenu) {
    toggle.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      toggle.classList.toggle('open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
    // Close on link click
    $$('.mobile-link', mobileMenu).forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        toggle.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // Active link
  const current = getCurrentPage();
  $$('.nav-link[data-page], .mobile-link[data-page]').forEach(link => {
    if (link.dataset.page === current) link.classList.add('active');
  });

  // Cart badge
  updateCartBadge();
}

function getCurrentPage() {
  const path = window.location.pathname.split('/').pop().replace('.html','') || 'index';
  return path;
}

/* ================================================================
   SCROLL TO TOP
================================================================ */
function updateScrollTop() {
  const btn = document.getElementById('scrollTopBtn');
  if (btn) btn.classList.toggle('visible', window.scrollY > 400);
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ================================================================
   SCROLL REVEAL
================================================================ */
function initReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Unobserve after reveal for performance
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  $$('.reveal').forEach(el => observer.observe(el));
}

/* ================================================================
   PARALLAX ORBS
================================================================ */
function initParallax() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if ('ontouchstart' in window) return; // Skip on touch devices

  let ticking = false;
  document.addEventListener('mousemove', (e) => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const x = (e.clientX / innerWidth - .5) * 16;
      const y = (e.clientY / innerHeight - .5) * 16;
      $$('.bg-orb').forEach((orb, i) => {
        const f = (i + 1) * .32;
        orb.style.transform = `translate(${x * f}px, ${y * f}px)`;
      });
      ticking = false;
    });
  }, { passive: true });
}

/* ================================================================
   CART SYSTEM
================================================================ */
function getCart() {
  try { return JSON.parse(localStorage.getItem(APP.cartKey) || '[]'); }
  catch { return []; }
}

function saveCart(cart) {
  localStorage.setItem(APP.cartKey, JSON.stringify(cart));
  updateCartBadge();
  dispatchCartEvent(cart);
}

function addToCart(item) {
  if (!item?.product && !item?.name) return;
  const cart = getCart();
  item.id = Date.now() + Math.random().toString(36).substr(2,5);
  item.addedAt = new Date().toISOString();
  cart.push(item);
  saveCart(cart);
  showToast('Produit ajouté au panier !', '✅');
  trackEvent('add_to_cart', { item_name: item.product || item.name, value: parseInt(item.price) || 0 });
}

function removeFromCart(itemId) {
  const cart = getCart().filter(i => i.id !== itemId);
  saveCart(cart);
  showToast('Article retiré du panier', '🗑️');
}

function clearCart() {
  saveCart([]);
}

function getCartTotal() {
  return getCart().reduce((sum, item) => sum + (parseFloat(item.priceNum) || 0), 0);
}

function updateCartBadge() {
  const count = getCart().length;
  const badge = document.getElementById('cartBadge');
  if (!badge) return;
  badge.textContent = count;
  badge.classList.toggle('visible', count > 0);
}

function dispatchCartEvent(cart) {
  window.dispatchEvent(new CustomEvent('cartUpdated', { detail: { cart } }));
}

/* ================================================================
   TOAST SYSTEM
================================================================ */
let toastTimer = null;

function showToast(message, icon = '✅', duration = 3500) {
  let toast = document.getElementById('appToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'appToast';
    toast.className = 'toast glass';
    toast.innerHTML = '<span class="toast-icon" id="toastIcon"></span><span id="toastMsg"></span><button class="toast-close" onclick="dismissToast()" aria-label="Fermer">✕</button>';
    document.body.appendChild(toast);
  }
  document.getElementById('toastIcon').textContent = icon;
  document.getElementById('toastMsg').textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(dismissToast, duration);
}

function dismissToast() {
  document.getElementById('appToast')?.classList.remove('show');
}

/* ================================================================
   COOKIE BANNER
================================================================ */
function initCookies() {
  if (localStorage.getItem(APP.cookieKey)) return;
  setTimeout(() => {
    const banner = document.getElementById('cookieBanner');
    if (banner) banner.classList.add('show');
  }, 2000);
}

function acceptCookies() {
  localStorage.setItem(APP.cookieKey, 'all');
  document.getElementById('cookieBanner')?.classList.remove('show');
  initAnalytics();
  showToast('Préférences enregistrées', '🍪');
}

function declineCookies() {
  localStorage.setItem(APP.cookieKey, 'essential');
  document.getElementById('cookieBanner')?.classList.remove('show');
}

/* ================================================================
   ANALYTICS (Google Analytics 4)
================================================================ */
function initAnalytics() {
  if (!localStorage.getItem(APP.cookieKey) || localStorage.getItem(APP.cookieKey) === 'essential') return;
  // GA4 init — replace with real tag in production
  window.dataLayer = window.dataLayer || [];
  function gtag(){ dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', APP.analyticsId, { anonymize_ip: true });
}

function trackEvent(eventName, params = {}) {
  if (typeof gtag !== 'undefined') {
    gtag('event', eventName, { ...params, currency: APP.currency });
  }
  // console.debug('[Analytics]', eventName, params);
}

function trackPageView(page) {
  trackEvent('page_view', { page_title: document.title, page_location: window.location.href });
}

/* ================================================================
   SMOOTH ANCHOR SCROLL
================================================================ */
function initAnchorScroll() {
  $$('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = 90; // nav height
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}

/* ================================================================
   ACCORDION (FAQ)
================================================================ */
function initAccordions() {
  $$('.accordion-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const item = trigger.closest('.accordion-item');
      const isOpen = item.classList.contains('open');
      $$('.accordion-item.open').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });
}

/* ================================================================
   FORM VALIDATION
================================================================ */
function validateField(input) {
  const group = input.closest('.form-group');
  const errorEl = group?.querySelector('.form-error');
  let valid = true;
  let msg = '';

  if (input.required && !input.value.trim()) {
    valid = false; msg = 'Ce champ est obligatoire.';
  } else if (input.type === 'email' && input.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
    valid = false; msg = 'Email invalide.';
  } else if (input.type === 'tel' && input.value && !/^[\d\s\+\-\(\)]{7,}$/.test(input.value)) {
    valid = false; msg = 'Numéro de téléphone invalide.';
  }

  group?.classList.toggle('has-error', !valid);
  if (errorEl) errorEl.textContent = msg;
  return valid;
}

function validateForm(formEl) {
  let allValid = true;
  $$('input[required],textarea[required],select[required]', formEl).forEach(input => {
    if (!validateField(input)) allValid = false;
  });
  return allValid;
}

/* ================================================================
   LAZY LOADING IMAGES
================================================================ */
function initLazyLoad() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }
        observer.unobserve(img);
      }
    });
  });
  $$('img[data-src]').forEach(img => observer.observe(img));
}

/* ================================================================
   PROMO CODES
================================================================ */
const PROMO_CODES = {
  'ARTISAN10':  { type: 'percent', value: 10, label: '-10% sur toute la commande' },
  'BIENVENUE':  { type: 'percent', value: 15, label: '-15% pour les nouveaux clients' },
  'EXPRESS':    { type: 'fixed',   value: 5,  label: '-5€ sur votre commande' },
  'ECO2025':    { type: 'percent', value: 20, label: '-20% spécial eco-responsable' },
};

function applyPromoCode(code) {
  const promo = PROMO_CODES[code.toUpperCase().trim()];
  if (promo) {
    sessionStorage.setItem('lai_promo', JSON.stringify({ code: code.toUpperCase(), ...promo }));
    showToast(`Code appliqué : ${promo.label}`, '🎉');
    return promo;
  }
  showToast('Code promo invalide ou expiré', '❌');
  return null;
}

function getActivePromo() {
  try { return JSON.parse(sessionStorage.getItem('lai_promo')); }
  catch { return null; }
}

/* ================================================================
   PRICE CALCULATOR
================================================================ */
const PRICE_TABLE = {
  'Carte de Visite': { 50:14, 100:19, 250:38, 500:65, 1000:110 },
  'Invitation':      { 50:35, 100:60, 250:130, 500:220 },
  'Flyer':           { 100:12, 250:22, 500:38, 1000:65, 2500:140 },
  'Sticker':         { 50:9, 100:15, 250:32, 500:55, 1000:95 },
  'Autocollant':     { 50:14, 100:22, 250:45, 500:78, 1000:135 },
};
const FINISH_SURCHARGE = { 'Mat':0, 'Brillant':0, 'Soft-touch':4, 'Dorure':18, 'Vernis':12, 'Gaufrage':15 };
const PAPER_SURCHARGE  = { 'Standard':0, 'Premium':5, 'Luxe':22, 'Recyclé':2 };
const DESIGN_FEE = 49;

function calculatePrice({ product, qty, finish = 'Mat', paper = 'Standard', needsDesign = false }) {
  const base = PRICE_TABLE[product]?.[parseInt(qty)] || 0;
  const finSurcharge = FINISH_SURCHARGE[finish] || 0;
  const papSurcharge = PAPER_SURCHARGE[paper] || 0;
  const designFee = needsDesign ? DESIGN_FEE : 0;
  const subtotal = base + finSurcharge + papSurcharge + designFee;

  const promo = getActivePromo();
  let discount = 0;
  if (promo) {
    discount = promo.type === 'percent'
      ? Math.round(subtotal * promo.value / 100)
      : promo.value;
  }
  const total = Math.max(0, subtotal - discount);
  return { base, finSurcharge, papSurcharge, designFee, subtotal, discount, total };
}

function formatPrice(amount) {
  return new Intl.NumberFormat(APP.locale, { style:'currency', currency:APP.currency }).format(amount);
}

/* ================================================================
   WHATSAPP & QUICK CONTACT
================================================================ */
function openWhatsApp(message = '') {
  const phone = '33123456789';
  const text = encodeURIComponent(message || `Bonjour, je souhaite obtenir un devis pour une commande chez ${APP.name}.`);
  window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
}

/* ================================================================
   SHARE API
================================================================ */
async function shareProduct(data) {
  if (navigator.share) {
    try {
      await navigator.share(data);
      trackEvent('share', { method:'native', content_type:'product' });
    } catch {}
  } else {
    // Fallback: copy URL
    await navigator.clipboard.writeText(data.url || window.location.href);
    showToast('Lien copié dans le presse-papier !', '🔗');
  }
}

/* ================================================================
   SEO HELPERS
================================================================ */
function setMetaTags({ title, description, image, type = 'website' }) {
  document.title = title ? `${title} — ${APP.name}` : APP.name;
  setMeta('description', description);
  setMeta('og:title', title);
  setMeta('og:description', description);
  setMeta('og:image', image);
  setMeta('og:type', type);
  setMeta('twitter:card', 'summary_large_image');
  setMeta('twitter:title', title);
  setMeta('twitter:description', description);
}
function setMeta(name, content) {
  if (!content) return;
  let el = document.querySelector(`meta[name="${name}"],meta[property="${name}"]`);
  if (!el) { el = document.createElement('meta'); el.setAttribute(name.startsWith('og:')||name.startsWith('twitter:') ? 'property' : 'name', name); document.head.appendChild(el); }
  el.setAttribute('content', content);
}

/* ================================================================
   STRUCTURED DATA (JSON-LD)
================================================================ */
function injectStructuredData(data) {
  const el = document.createElement('script');
  el.type = 'application/ld+json';
  el.textContent = JSON.stringify(data);
  document.head.appendChild(el);
}

function injectOrganizationSchema() {
  injectStructuredData({
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "L'Artisan Imprimeur",
    "image": "https://lartisan-imprimeur.fr/images/og.jpg",
    "url": "https://lartisan-imprimeur.fr",
    "telephone": "+33-1-23-45-67-89",
    "email": "bonjour@lartisan.fr",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "12 rue du Louvre",
      "addressLocality": "Paris",
      "postalCode": "75001",
      "addressCountry": "FR"
    },
    "geo": { "@type": "GeoCoordinates", "latitude": 48.8606, "longitude": 2.3444 },
    "openingHours": ["Mo-Fr 09:00-18:00", "Sa 10:00-16:00"],
    "priceRange": "€€",
    "sameAs": [
      "https://instagram.com/lartisanimprimeur",
      "https://linkedin.com/company/lartisan-imprimeur"
    ]
  });
}

/* ================================================================
   PERFORMANCE — PRELOAD HINTS
================================================================ */
function preloadPage(url) {
  const link = document.createElement('link');
  link.rel = 'prefetch'; link.href = url;
  document.head.appendChild(link);
}

// Preload likely next page on hover
function initPrefetch() {
  $$('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    if (!href.startsWith('http') && href.endsWith('.html')) {
      link.addEventListener('mouseenter', () => preloadPage(href), { once: true });
    }
  });
}

/* ================================================================
   SHARED FOOTER TEMPLATE
================================================================ */
function renderFooter() {
  const footer = document.createElement('footer');
  footer.className = 'main-footer';
  footer.innerHTML = `
  <div class="container">
    <div class="footer-grid">
      <div>
        <a href="index.html" class="footer-logo"><b>L'Artisan</b> imprimeur</a>
        <p class="footer-desc">L'excellence de l'impression artisanale au service de votre image depuis 2012. Paris, France.</p>
        <div class="footer-socials">
          <a href="https://instagram.com/lartisanimprimeur" class="social-btn" target="_blank" rel="noopener" aria-label="Instagram">📷</a>
          <a href="https://linkedin.com/company/lartisan-imprimeur" class="social-btn" target="_blank" rel="noopener" aria-label="LinkedIn">in</a>
          <a href="https://twitter.com/lartisanimprimeur" class="social-btn" target="_blank" rel="noopener" aria-label="X/Twitter">𝕏</a>
          <a href="https://pinterest.fr/lartisanimprimeur" class="social-btn" target="_blank" rel="noopener" aria-label="Pinterest">P</a>
        </div>
      </div>
      <div class="footer-col">
        <h5>Produits</h5>
        <a href="products.html#cartes">Cartes de visite</a>
        <a href="products.html#invitations">Invitations</a>
        <a href="products.html#flyers">Flyers</a>
        <a href="products.html#stickers">Stickers</a>
        <a href="products.html#autocollants">Autocollants</a>
      </div>
      <div class="footer-col">
        <h5>Services</h5>
        <a href="configurator.html">Configurateur</a>
        <a href="gallery.html">Galerie</a>
        <a href="about.html#process">Notre processus</a>
        <a href="contact.html">Devis gratuit</a>
        <a href="about.html#faq">FAQ</a>
      </div>
      <div class="footer-col">
        <h5>Contact</h5>
        <a href="tel:+33123456789">01 23 45 67 89</a>
        <a href="mailto:bonjour@lartisan.fr">bonjour@lartisan.fr</a>
        <a href="https://maps.google.com/?q=12+rue+du+Louvre+Paris" target="_blank" rel="noopener">12 rue du Louvre, Paris 1er</a>
        <a href="contact.html">Nous contacter</a>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© ${new Date().getFullYear()} L'Artisan Imprimeur. Tous droits réservés.</span>
      <div class="footer-legal">
        <a href="legal.html">Mentions légales</a>
        <a href="cgv.html">CGV</a>
        <a href="privacy.html">Confidentialité</a>
        <a href="cookies.html">Cookies</a>
      </div>
    </div>
  </div>
  `;
  document.body.appendChild(footer);
}

/* ================================================================
   SHARED NAV TEMPLATE
================================================================ */
function renderNav(currentPage) {
  const wrap = document.createElement('div');
  wrap.className = 'nav-wrap';
  wrap.innerHTML = `
  <nav class="main-nav" id="mainNav" role="navigation" aria-label="Navigation principale">
    <a href="index.html" class="nav-logo" aria-label="${APP.name} — Accueil"><b>L'Artisan</b> imprimeur</a>
    <ul class="nav-menu" role="list">
      <li><a href="index.html"          class="nav-link" data-page="index"        ><span class="nl-dot"></span>Accueil</a></li>
      <li><a href="products.html"       class="nav-link" data-page="products"     ><span class="nl-dot"></span>Produits</a></li>
      <li><a href="configurator.html"   class="nav-link" data-page="configurator" ><span class="nl-dot"></span>Configurateur</a></li>
      <li><a href="gallery.html"        class="nav-link" data-page="gallery"      ><span class="nl-dot"></span>Galerie</a></li>
      <li><a href="about.html"          class="nav-link" data-page="about"        ><span class="nl-dot"></span>À propos</a></li>
      <li><a href="contact.html"        class="nav-link" data-page="contact"      ><span class="nl-dot"></span>Contact</a></li>
    </ul>
    <div class="nav-actions">
      <a href="cart.html" class="nav-cart-btn" aria-label="Panier">
        🛒 Panier
        <span class="cart-badge" id="cartBadge" aria-live="polite">0</span>
      </a>
      <a href="configurator.html" class="nav-cta">Commander →</a>
      <button class="nav-toggle" id="navToggle" aria-label="Menu mobile" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
    </div>
  </nav>`;
  document.body.insertAdjacentElement('afterbegin', wrap);

  // Mobile menu
  const mobileMenu = document.createElement('nav');
  mobileMenu.id = 'mobileMenu';
  mobileMenu.className = 'mobile-menu';
  mobileMenu.setAttribute('aria-label', 'Menu mobile');
  mobileMenu.innerHTML = `
    <a href="index.html"        class="mobile-link" data-page="index">Accueil</a>
    <a href="products.html"     class="mobile-link" data-page="products">Produits</a>
    <a href="configurator.html" class="mobile-link" data-page="configurator">Configurateur</a>
    <a href="gallery.html"      class="mobile-link" data-page="gallery">Galerie</a>
    <a href="about.html"        class="mobile-link" data-page="about">À propos</a>
    <a href="contact.html"      class="mobile-link" data-page="contact">Contact</a>
    <a href="cart.html"         class="mobile-link" data-page="cart">🛒 Panier</a>
  `;
  document.body.insertAdjacentElement('afterbegin', mobileMenu);
}

/* ================================================================
   COOKIE BANNER TEMPLATE
================================================================ */
function renderCookieBanner() {
  const banner = document.createElement('div');
  banner.id = 'cookieBanner';
  banner.className = 'cookie-banner glass';
  banner.setAttribute('role', 'dialog');
  banner.setAttribute('aria-label', 'Gestion des cookies');
  banner.innerHTML = `
    <p class="cookie-text">🍪 Nous utilisons des cookies pour améliorer votre expérience et analyser notre trafic. <a href="cookies.html">En savoir plus</a>.</p>
    <div class="cookie-actions">
      <button class="btn btn-ghost btn-sm" onclick="declineCookies()">Refuser</button>
      <button class="btn btn-primary btn-sm" onclick="acceptCookies()">Accepter</button>
    </div>
  `;
  document.body.appendChild(banner);
}

/* ================================================================
   SCROLL TO TOP BUTTON
================================================================ */
function renderScrollTopBtn() {
  const btn = document.createElement('button');
  btn.id = 'scrollTopBtn';
  btn.className = 'scroll-top';
  btn.setAttribute('aria-label', 'Retour en haut');
  btn.innerHTML = '↑';
  btn.onclick = scrollToTop;
  document.body.appendChild(btn);
}

/* ================================================================
   BACKGROUND SCENE
================================================================ */
function renderBgScene() {
  const bg = document.createElement('div');
  bg.innerHTML = `
    <div class="bg-scene" aria-hidden="true">
      <div class="bg-orb orb1"></div>
      <div class="bg-orb orb2"></div>
      <div class="bg-orb orb3"></div>
      <div class="bg-orb orb4"></div>
    </div>
    <div class="noise-overlay" aria-hidden="true"></div>
  `;
  document.body.insertAdjacentHTML('afterbegin', bg.innerHTML);
}

/* ================================================================
   PAGE LOADER TEMPLATE
================================================================ */
function renderPageLoader() {
  const loader = document.createElement('div');
  loader.id = 'page-loader';
  loader.setAttribute('aria-hidden', 'true');
  loader.innerHTML = `<div class="loader-logo"><b>L'Artisan</b> imprimeur</div>`;
  document.body.insertAdjacentElement('afterbegin', loader);
}

/* ================================================================
   MAIN INIT
================================================================ */
function initApp(currentPage = 'index') {
  // Inject structural elements
  renderPageLoader();
  renderBgScene();
  renderNav(currentPage);
  renderFooter();
  renderCookieBanner();
  renderScrollTopBtn();

  // Initialize features
  initLoader();
  initNav();
  initReveal();
  initParallax();
  initAnchorScroll();
  initAccordions();
  initLazyLoad();
  initPrefetch();
  initCookies();

  // Analytics
  if (localStorage.getItem(APP.cookieKey) === 'all') initAnalytics();

  // SEO
  injectOrganizationSchema();
  trackPageView(currentPage);
}

/* ================================================================
   EXPORTS (global)
================================================================ */
window.APP         = APP;
window.initApp     = initApp;
window.addToCart   = addToCart;
window.removeFromCart = removeFromCart;
window.clearCart   = clearCart;
window.getCart     = getCart;
window.getCartTotal = getCartTotal;
window.showToast   = showToast;
window.dismissToast = dismissToast;
window.acceptCookies  = acceptCookies;
window.declineCookies = declineCookies;
window.applyPromoCode = applyPromoCode;
window.getActivePromo = getActivePromo;
window.calculatePrice = calculatePrice;
window.formatPrice    = formatPrice;
window.validateForm   = validateForm;
window.validateField  = validateField;
window.trackEvent     = trackEvent;
window.openWhatsApp   = openWhatsApp;
window.shareProduct   = shareProduct;
window.scrollToTop    = scrollToTop;
