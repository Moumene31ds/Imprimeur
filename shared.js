// shared.js — Navigation, Footer, Scroll FX, Toast

const NAV_HTML = `
<div class="nav-wrap">
  <nav class="main-nav glass-strong" id="mainNav">
    <a href="index.html" class="nav-logo"><b>L'Artisan</b> imprimeur</a>
    <ul class="nav-links" id="navLinks">
      <li><a href="index.html" data-page="index">🏠 Accueil</a></li>
      <li><a href="products.html" data-page="products">🛍️ Produits</a></li>
      <li><a href="configurator.html" data-page="configurator">✦ Configurateur</a></li>
      <li><a href="gallery.html" data-page="gallery">🎨 Galerie</a></li>
      <li><a href="about.html" data-page="about">📖 À propos</a></li>
      <li><a href="contact.html" data-page="contact">✉️ Contact</a></li>
    </ul>
    <div class="nav-actions">
      <button class="nav-btn-ghost" onclick="window.location='cart.html'">🛒 Panier <span id="cartCount" style="background:linear-gradient(135deg,#9b7ef8,#f472b6);color:#fff;padding:1px 7px;border-radius:50px;font-size:.7rem;margin-left:2px;">0</span></button>
      <button class="nav-btn-primary" onclick="window.location='configurator.html'">Commander →</button>
    </div>
    <button class="nav-toggle" id="navToggle" aria-label="Menu">
      <span></span><span></span><span></span>
    </button>
  </nav>
</div>
`;

const FOOTER_HTML = `
<footer class="main-footer">
  <div class="container">
    <div class="footer-grid">
      <div>
        <span class="footer-brand-logo"><b>L'Artisan</b> imprimeur</span>
        <p class="footer-desc">L'excellence de l'impression artisanale au service de votre image depuis 2012. Paris, France.</p>
        <div class="footer-socials">
          <a href="#" title="Instagram">📷</a>
          <a href="#" title="LinkedIn">in</a>
          <a href="#" title="X">𝕏</a>
          <a href="#" title="Pinterest">P</a>
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
        <a href="#">12 rue du Louvre, Paris 1er</a>
        <a href="contact.html">Nous contacter</a>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© 2025 L'Artisan Imprimeur. Tous droits réservés.</span>
      <div class="footer-bottom-links">
        <a href="#">Mentions légales</a>
        <a href="#">CGV</a>
        <a href="#">Confidentialité</a>
        <a href="#">Cookies</a>
      </div>
    </div>
  </div>
</footer>
`;

const BG_HTML = `
<div class="bg-scene">
  <div class="bg-orb orb1"></div>
  <div class="bg-orb orb2"></div>
  <div class="bg-orb orb3"></div>
  <div class="bg-orb orb4"></div>
</div>
<div class="noise-overlay"></div>
`;

function initShared(currentPage) {
  // Inject background
  document.body.insertAdjacentHTML('afterbegin', BG_HTML);

  // Inject nav
  const navEl = document.createElement('div');
  navEl.innerHTML = NAV_HTML;
  document.body.insertAdjacentElement('afterbegin', navEl);

  // Active nav link
  document.querySelectorAll('.nav-links a[data-page]').forEach(a => {
    if (a.dataset.page === currentPage) a.classList.add('active');
  });

  // Inject footer
  document.body.insertAdjacentHTML('beforeend', FOOTER_HTML);

  // Toast container
  const toast = document.createElement('div');
  toast.className = 'toast'; toast.id = 'toast';
  toast.innerHTML = '<span class="toast-icon">✅</span><span id="toastMsg"></span>';
  document.body.appendChild(toast);

  // Nav scroll
  const nav = document.getElementById('mainNav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, {passive:true});

  // Nav toggle mobile
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const open = links.style.display === 'flex';
      links.style.cssText = open ? '' :
        'display:flex;flex-direction:column;position:absolute;top:100%;left:0;right:0;background:rgba(10,8,22,.95);backdrop-filter:blur(40px);border:1px solid rgba(255,255,255,.12);border-radius:20px;padding:16px;margin-top:8px;gap:4px;';
    });
  }

  // Scroll reveal
  const revObs = new IntersectionObserver(entries => {
    entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('visible'); });
  }, {threshold:.1});
  document.querySelectorAll('.reveal').forEach(el => revObs.observe(el));

  // Cart count
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  const cc = document.getElementById('cartCount');
  if (cc) cc.textContent = cart.length;

  // Orb parallax
  document.addEventListener('mousemove', e => {
    const x = (e.clientX/innerWidth - .5) * 18;
    const y = (e.clientY/innerHeight - .5) * 18;
    document.querySelectorAll('.bg-orb').forEach((orb,i) => {
      const f = (i+1)*.35;
      orb.style.transform = `translate(${x*f}px,${y*f}px)`;
    });
  }, {passive:true});
}

function showToast(msg, icon='✅') {
  const t = document.getElementById('toast');
  document.getElementById('toastMsg').textContent = msg;
  t.querySelector('.toast-icon').textContent = icon;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3200);
}

function addToCart(item) {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  cart.push(item);
  localStorage.setItem('cart', JSON.stringify(cart));
  const cc = document.getElementById('cartCount');
  if (cc) cc.textContent = cart.length;
  showToast('Produit ajouté au panier !');
}
