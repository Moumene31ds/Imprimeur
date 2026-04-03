// shared.js — Navigation, Footer, i18n, Mobile Features, Toast

// ─────────────────────────────────────────────────────────────
//  TRANSLATIONS
// ─────────────────────────────────────────────────────────────
const TRANSLATIONS = {
  fr: {
    // Nav
    nav_home: '🏠 Accueil',
    nav_products: '🛍️ Produits',
    nav_config: '✦ Configurateur',
    nav_gallery: '🎨 Galerie',
    nav_about: '📖 À propos',
    nav_contact: '✉️ Contact',
    nav_cart: 'Panier',
    nav_order: 'Commander →',
    nav_logo: "<b>L'Artisan</b> imprimeur",

    // Footer
    footer_desc: "L'excellence de l'impression artisanale au service de votre image depuis 2012. Alger, Algérie.",
    footer_products: 'Produits',
    footer_services: 'Services',
    footer_contact_col: 'Contact',
    footer_cards: 'Cartes de visite',
    footer_invites: 'Invitations',
    footer_flyers: 'Flyers',
    footer_stickers: 'Stickers',
    footer_labels: 'Autocollants',
    footer_config: 'Configurateur',
    footer_gallery: 'Galerie',
    footer_process: 'Notre processus',
    footer_quote: 'Devis gratuit',
    footer_faq: 'FAQ',
    footer_legal: 'Mentions légales',
    footer_cgv: 'CGV',
    footer_privacy: 'Confidentialité',
    footer_cookies: 'Cookies',
    footer_rights: '© 2025 L\'Artisan Imprimeur. Tous droits réservés.',

    // Bottom nav
    bn_home: 'Accueil',
    bn_products: 'Produits',
    bn_config: 'Config.',
    bn_cart: 'Panier',
    bn_more: 'Plus',

    // Common UI
    btn_add_cart: 'Ajouter au panier →',
    btn_configure: 'Configurer',
    btn_order: 'Commander →',
    btn_start: 'Commencer ma commande →',
    btn_learn_more: 'En savoir plus →',
    btn_view: 'Voir →',
    currency: 'DA',
    from: 'Dès',
    pieces: 'pièces',

    // Toast
    toast_added: 'Produit ajouté au panier !',

    // Page titles / hero
    home_eyebrow: 'Impression Haut de Gamme · Algérie',
    home_title_l1: "L'Artisan",
    home_title_l2: 'Imprimeur',
    home_sub: 'Cartes de visite, invitations, flyers & stickers — une qualité premium livrée partout en Algérie.',
    home_cta1: 'Explorer les produits',
    home_cta2: 'Voir nos réalisations',

    stats_clients: 'Clients satisfaits',
    stats_products: 'Produits imprimés',
    stats_delivery: 'Livraison express',
    stats_eco: 'Éco-responsable',

    catalog_eyebrow: 'Notre Catalogue',
    catalog_title: 'Tout ce dont vous<br><em>avez besoin</em>',

    features_eyebrow: 'Pourquoi nous choisir',
    features_title: "L'artisanat au service<br><em>de votre image</em>",
    features_lead: 'Chaque commande est traitée avec une attention minutieuse aux détails. Parce que votre image mérite le meilleur.',

    process_eyebrow: 'Notre Processus',
    process_title: 'Simple, rapide, <em>parfait</em>',

    testi_eyebrow: 'Témoignages',
    testi_title: 'Ce que disent <em>nos clients</em>',

    trusted_label: 'Ils nous font confiance',

    cta_title: 'Prêt à laisser une<br><em>impression durable?</em>',
    cta_lead: 'Rejoignez plus de 50 000 clients qui font confiance à L\'Artisan Imprimeur.',

    // Products page
    prod_eyebrow: 'Notre Catalogue',
    prod_title: 'Tout pour votre<br><em class="grad">communication visuelle</em>',
    prod_lead: 'Du simple flyer à la carte de visite luxe — chaque produit est fabriqué avec les meilleurs matériaux.',
    filter_all: 'Tout voir',
    search_placeholder: '🔍  Rechercher...',
    option_qty: 'Quantité',
    option_finish: 'Finition',
    finish_mat: 'Mat',
    finish_gloss: 'Brillant',
    finish_soft: 'Soft-touch',
    finish_gold: 'Dorure à chaud',

    // Configurator
    config_eyebrow: 'Configurateur',
    config_title: 'Créez votre<br><em>commande sur mesure</em>',
    step1: 'Produit',
    step2: 'Format',
    step3: 'Design',
    step4: 'Récap.',

    // Cart
    cart_title: 'Votre Panier',
    cart_empty: 'Votre panier est vide',
    checkout: 'Passer la commande',
    subtotal: 'Sous-total',
    delivery: 'Livraison',
    total: 'Total',
    promo_placeholder: 'Code promo',
    apply: 'Appliquer',

    // Contact
    contact_eyebrow: 'Nous Contacter',
    contact_title: 'Parlons de<br><em>votre projet</em>',
    contact_name: 'Nom complet',
    contact_email: 'Email',
    contact_phone: 'Téléphone',
    contact_subject: 'Sujet',
    contact_message: 'Message',
    contact_send: 'Envoyer le message →',

    // Gallery
    gallery_eyebrow: 'Nos Réalisations',
    gallery_title: 'Inspirez-vous de<br><em>nos créations</em>',

    // About
    about_eyebrow: 'Notre Histoire',
    about_title: 'Artisans de<br><em>l\'impression</em>',
  },

  ar: {
    // Nav
    nav_home: '🏠 الرئيسية',
    nav_products: '🛍️ المنتجات',
    nav_config: '✦ المُهيِّئ',
    nav_gallery: '🎨 المعرض',
    nav_about: '📖 من نحن',
    nav_contact: '✉️ اتصل بنا',
    nav_cart: 'السلة',
    nav_order: '← اطلب الآن',
    nav_logo: "<b>الحرفي</b> للطباعة",

    // Footer
    footer_desc: 'التميز في الطباعة الحرفية لخدمة صورتك منذ 2012. الجزائر العاصمة، الجزائر.',
    footer_products: 'المنتجات',
    footer_services: 'الخدمات',
    footer_contact_col: 'اتصل بنا',
    footer_cards: 'بطاقات الأعمال',
    footer_invites: 'الدعوات',
    footer_flyers: 'المنشورات',
    footer_stickers: 'الملصقات',
    footer_labels: 'لاصقات الفينيل',
    footer_config: 'المُهيِّئ',
    footer_gallery: 'المعرض',
    footer_process: 'طريقة العمل',
    footer_quote: 'عرض مجاني',
    footer_faq: 'الأسئلة الشائعة',
    footer_legal: 'الشروط القانونية',
    footer_cgv: 'شروط البيع',
    footer_privacy: 'الخصوصية',
    footer_cookies: 'ملفات تعريف الارتباط',
    footer_rights: '© 2025 الحرفي للطباعة. جميع الحقوق محفوظة.',

    // Bottom nav
    bn_home: 'الرئيسية',
    bn_products: 'المنتجات',
    bn_config: 'تهيئة',
    bn_cart: 'السلة',
    bn_more: 'المزيد',

    // Common UI
    btn_add_cart: '← إضافة إلى السلة',
    btn_configure: 'تخصيص',
    btn_order: '← اطلب الآن',
    btn_start: '← ابدأ طلبك',
    btn_learn_more: '← اعرف المزيد',
    btn_view: 'عرض ←',
    currency: 'دج',
    from: 'من',
    pieces: 'قطعة',

    // Toast
    toast_added: 'تمت الإضافة إلى السلة!',

    // Page titles / hero
    home_eyebrow: 'طباعة فاخرة · الجزائر',
    home_title_l1: 'الحرفي',
    home_title_l2: 'للطباعة',
    home_sub: 'بطاقات أعمال، دعوات، منشورات وملصقات — جودة فائقة توصل في كل أنحاء الجزائر.',
    home_cta1: 'استعرض المنتجات',
    home_cta2: 'شاهد أعمالنا',

    stats_clients: 'عميل راضٍ',
    stats_products: 'منتج مطبوع',
    stats_delivery: 'توصيل سريع',
    stats_eco: 'صديق للبيئة',

    catalog_eyebrow: 'كتالوج منتجاتنا',
    catalog_title: 'كل ما تحتاجه<br><em>في مكان واحد</em>',

    features_eyebrow: 'لماذا تختارنا',
    features_title: 'الحرفية في خدمة<br><em>صورتك</em>',
    features_lead: 'كل طلب يُعالَج باهتمام دقيق بالتفاصيل. لأن صورتك تستحق الأفضل.',

    process_eyebrow: 'طريقة العمل',
    process_title: 'بسيط، سريع، <em>مثالي</em>',

    testi_eyebrow: 'آراء العملاء',
    testi_title: 'ماذا يقول <em>عملاؤنا</em>',

    trusted_label: 'يثقون بنا',

    cta_title: 'هل أنت مستعد لإحداث<br><em>انطباع دائم؟</em>',
    cta_lead: 'انضم إلى أكثر من 50,000 عميل يثقون بالحرفي للطباعة.',

    // Products page
    prod_eyebrow: 'كتالوج منتجاتنا',
    prod_title: 'كل شيء لتواصلك<br><em class="grad">البصري الاحترافي</em>',
    prod_lead: 'من المنشور البسيط إلى بطاقة الأعمال الفاخرة — كل منتج مصنوع بأفضل المواد.',
    filter_all: 'الكل',
    search_placeholder: '🔍  بحث...',
    option_qty: 'الكمية',
    option_finish: 'التشطيب',
    finish_mat: 'مطفي',
    finish_gloss: 'لامع',
    finish_soft: 'ناعم',
    finish_gold: 'ذهبي حراري',

    // Configurator
    config_eyebrow: 'المُهيِّئ',
    config_title: 'اصنع طلبك<br><em>المخصص</em>',
    step1: 'المنتج',
    step2: 'الحجم',
    step3: 'التصميم',
    step4: 'الملخص',

    // Cart
    cart_title: 'سلة التسوق',
    cart_empty: 'سلتك فارغة',
    checkout: 'إتمام الطلب',
    subtotal: 'المجموع الفرعي',
    delivery: 'التوصيل',
    total: 'المجموع',
    promo_placeholder: 'كود خصم',
    apply: 'تطبيق',

    // Contact
    contact_eyebrow: 'تواصل معنا',
    contact_title: 'لنتحدث عن<br><em>مشروعك</em>',
    contact_name: 'الاسم الكامل',
    contact_email: 'البريد الإلكتروني',
    contact_phone: 'الهاتف',
    contact_subject: 'الموضوع',
    contact_message: 'الرسالة',
    contact_send: '← أرسل الرسالة',

    // Gallery
    gallery_eyebrow: 'أعمالنا',
    gallery_title: 'استلهم من<br><em>إبداعاتنا</em>',

    // About
    about_eyebrow: 'قصتنا',
    about_title: 'حرفيون في<br><em>الطباعة</em>',
  },

  en: {
    // Nav
    nav_home: '🏠 Home',
    nav_products: '🛍️ Products',
    nav_config: '✦ Configurator',
    nav_gallery: '🎨 Gallery',
    nav_about: '📖 About',
    nav_contact: '✉️ Contact',
    nav_cart: 'Cart',
    nav_order: 'Order Now →',
    nav_logo: "<b>L'Artisan</b> Printer",

    // Footer
    footer_desc: 'Excellence in artisanal printing serving your image since 2012. Algiers, Algeria.',
    footer_products: 'Products',
    footer_services: 'Services',
    footer_contact_col: 'Contact',
    footer_cards: 'Business Cards',
    footer_invites: 'Invitations',
    footer_flyers: 'Flyers',
    footer_stickers: 'Stickers',
    footer_labels: 'Vinyl Labels',
    footer_config: 'Configurator',
    footer_gallery: 'Gallery',
    footer_process: 'Our Process',
    footer_quote: 'Free Quote',
    footer_faq: 'FAQ',
    footer_legal: 'Legal Notice',
    footer_cgv: 'Terms of Sale',
    footer_privacy: 'Privacy',
    footer_cookies: 'Cookies',
    footer_rights: "© 2025 L'Artisan Imprimeur. All rights reserved.",

    // Bottom nav
    bn_home: 'Home',
    bn_products: 'Products',
    bn_config: 'Config.',
    bn_cart: 'Cart',
    bn_more: 'More',

    // Common UI
    btn_add_cart: 'Add to Cart →',
    btn_configure: 'Configure',
    btn_order: 'Order Now →',
    btn_start: 'Start My Order →',
    btn_learn_more: 'Learn More →',
    btn_view: 'View →',
    currency: 'DZD',
    from: 'From',
    pieces: 'pieces',

    // Toast
    toast_added: 'Product added to cart!',

    // Page titles / hero
    home_eyebrow: 'Premium Printing · Algeria',
    home_title_l1: "L'Artisan",
    home_title_l2: 'Imprimeur',
    home_sub: 'Business cards, invitations, flyers & stickers — premium quality delivered anywhere in Algeria.',
    home_cta1: 'Explore Products',
    home_cta2: 'See Our Work',

    stats_clients: 'Happy Clients',
    stats_products: 'Products Printed',
    stats_delivery: 'Express Delivery',
    stats_eco: 'Eco-Friendly',

    catalog_eyebrow: 'Our Catalogue',
    catalog_title: 'Everything you<br><em>need</em>',

    features_eyebrow: 'Why Choose Us',
    features_title: 'Craftsmanship at the service<br><em>of your image</em>',
    features_lead: 'Every order is handled with meticulous attention to detail. Because your image deserves the best.',

    process_eyebrow: 'Our Process',
    process_title: 'Simple, fast, <em>perfect</em>',

    testi_eyebrow: 'Testimonials',
    testi_title: 'What <em>our clients</em> say',

    trusted_label: 'They trust us',

    cta_title: 'Ready to make a<br><em>lasting impression?</em>',
    cta_lead: "Join over 50,000 clients who trust L'Artisan Imprimeur.",

    // Products page
    prod_eyebrow: 'Our Catalogue',
    prod_title: 'Everything for your<br><em class="grad">visual communication</em>',
    prod_lead: 'From simple flyer to luxury business card — every product is made with the finest materials.',
    filter_all: 'View All',
    search_placeholder: '🔍  Search...',
    option_qty: 'Quantity',
    option_finish: 'Finish',
    finish_mat: 'Matte',
    finish_gloss: 'Glossy',
    finish_soft: 'Soft-touch',
    finish_gold: 'Hot Foil Gold',

    // Configurator
    config_eyebrow: 'Configurator',
    config_title: 'Create your<br><em>custom order</em>',
    step1: 'Product',
    step2: 'Format',
    step3: 'Design',
    step4: 'Summary',

    // Cart
    cart_title: 'Your Cart',
    cart_empty: 'Your cart is empty',
    checkout: 'Proceed to Checkout',
    subtotal: 'Subtotal',
    delivery: 'Delivery',
    total: 'Total',
    promo_placeholder: 'Promo code',
    apply: 'Apply',

    // Contact
    contact_eyebrow: 'Contact Us',
    contact_title: "Let's talk about<br><em>your project</em>",
    contact_name: 'Full Name',
    contact_email: 'Email',
    contact_phone: 'Phone',
    contact_subject: 'Subject',
    contact_message: 'Message',
    contact_send: 'Send Message →',

    // Gallery
    gallery_eyebrow: 'Our Work',
    gallery_title: 'Get inspired by<br><em>our creations</em>',

    // About
    about_eyebrow: 'Our Story',
    about_title: 'Craftsmen of<br><em>printing</em>',
  }
};

// ─────────────────────────────────────────────────────────────
//  CURRENT LANGUAGE
// ─────────────────────────────────────────────────────────────
let currentLang = localStorage.getItem('lang') || 'fr';
function t(key) {
  return (TRANSLATIONS[currentLang] && TRANSLATIONS[currentLang][key]) ||
         (TRANSLATIONS['fr'] && TRANSLATIONS['fr'][key]) || key;
}

// ─────────────────────────────────────────────────────────────
//  HTML TEMPLATES
// ─────────────────────────────────────────────────────────────
function buildNavHTML() {
  return `
<div class="nav-wrap">
  <nav class="main-nav glass-strong" id="mainNav">
    <a href="index.html" class="nav-logo">${t('nav_logo')}</a>
    <ul class="nav-links" id="navLinks">
      <li><a href="index.html" data-page="index">${t('nav_home')}</a></li>
      <li><a href="products.html" data-page="products">${t('nav_products')}</a></li>
      <li><a href="configurator.html" data-page="configurator">${t('nav_config')}</a></li>
      <li><a href="gallery.html" data-page="gallery">${t('nav_gallery')}</a></li>
      <li><a href="about.html" data-page="about">${t('nav_about')}</a></li>
      <li><a href="contact.html" data-page="contact">${t('nav_contact')}</a></li>
    </ul>
    <div class="nav-actions">
      <div class="lang-switcher">
        <button class="lang-btn${currentLang==='ar'?' active':''}" onclick="setLang('ar')">ع</button>
        <button class="lang-btn${currentLang==='fr'?' active':''}" onclick="setLang('fr')">FR</button>
        <button class="lang-btn${currentLang==='en'?' active':''}" onclick="setLang('en')">EN</button>
      </div>
      <button class="nav-btn-ghost" onclick="window.location='cart.html'">🛒 ${t('nav_cart')} <span id="cartCount" style="background:linear-gradient(135deg,#9b7ef8,#f472b6);color:#fff;padding:1px 7px;border-radius:50px;font-size:.7rem;margin-left:2px;">0</span></button>
      <button class="nav-btn-primary" onclick="window.location='configurator.html'">${t('nav_order')}</button>
    </div>
    <button class="nav-toggle" id="navToggle" aria-label="Menu">
      <span></span><span></span><span></span>
    </button>
  </nav>
</div>`;
}

function buildMobileMenuHTML() {
  return `
<div class="mobile-menu" id="mobileMenu">
  <nav class="mob-links">
    <a href="index.html" class="mob-link" data-page="index"><span class="mob-icon">🏠</span>${currentLang==='ar'?'الرئيسية':currentLang==='en'?'Home':'Accueil'}</a>
    <a href="products.html" class="mob-link" data-page="products"><span class="mob-icon">🛍️</span>${currentLang==='ar'?'المنتجات':currentLang==='en'?'Products':'Produits'}</a>
    <a href="configurator.html" class="mob-link" data-page="configurator"><span class="mob-icon">✦</span>${currentLang==='ar'?'المُهيِّئ':currentLang==='en'?'Configurator':'Configurateur'}</a>
    <a href="gallery.html" class="mob-link" data-page="gallery"><span class="mob-icon">🎨</span>${currentLang==='ar'?'المعرض':currentLang==='en'?'Gallery':'Galerie'}</a>
    <a href="about.html" class="mob-link" data-page="about"><span class="mob-icon">📖</span>${currentLang==='ar'?'من نحن':currentLang==='en'?'About':'À propos'}</a>
    <a href="contact.html" class="mob-link" data-page="contact"><span class="mob-icon">✉️</span>${currentLang==='ar'?'اتصل بنا':currentLang==='en'?'Contact':'Contact'}</a>
    <a href="cart.html" class="mob-link" data-page="cart"><span class="mob-icon">🛒</span>${currentLang==='ar'?'السلة':currentLang==='en'?'Cart':'Panier'} <span id="cartCountMob" style="background:linear-gradient(135deg,#9b7ef8,#f472b6);color:#fff;padding:1px 7px;border-radius:50px;font-size:.7rem;margin-left:8px;">0</span></a>
  </nav>
  <div class="mob-lang">
    <button class="lang-btn${currentLang==='ar'?' active':''}" onclick="setLang('ar')">العربية</button>
    <button class="lang-btn${currentLang==='fr'?' active':''}" onclick="setLang('fr')">Français</button>
    <button class="lang-btn${currentLang==='en'?' active':''}" onclick="setLang('en')">English</button>
  </div>
  <div class="mob-actions">
    <a href="configurator.html" class="btn btn-primary" style="justify-content:center;">${t('btn_start')}</a>
  </div>
</div>`;
}

function buildFooterHTML() {
  return `
<footer class="main-footer">
  <div class="container">
    <div class="footer-grid">
      <div>
        <span class="footer-brand-logo">${t('nav_logo')}</span>
        <p class="footer-desc">${t('footer_desc')}</p>
        <div class="footer-socials">
          <a href="#" title="Instagram">📷</a>
          <a href="#" title="LinkedIn">in</a>
          <a href="#" title="X">𝕏</a>
          <a href="#" title="Facebook">f</a>
        </div>
      </div>
      <div class="footer-col">
        <h5>${t('footer_products')}</h5>
        <a href="products.html#cartes">${t('footer_cards')}</a>
        <a href="products.html#invitations">${t('footer_invites')}</a>
        <a href="products.html#flyers">${t('footer_flyers')}</a>
        <a href="products.html#stickers">${t('footer_stickers')}</a>
        <a href="products.html#autocollants">${t('footer_labels')}</a>
      </div>
      <div class="footer-col">
        <h5>${t('footer_services')}</h5>
        <a href="configurator.html">${t('footer_config')}</a>
        <a href="gallery.html">${t('footer_gallery')}</a>
        <a href="about.html#process">${t('footer_process')}</a>
        <a href="contact.html">${t('footer_quote')}</a>
        <a href="about.html#faq">${t('footer_faq')}</a>
      </div>
      <div class="footer-col">
        <h5>${t('footer_contact_col')}</h5>
        <a href="tel:+213551234567">+213 55 123 45 67</a>
        <a href="mailto:contact@lartisan.dz">contact@lartisan.dz</a>
        <a href="#">Alger, Algérie</a>
        <a href="contact.html">${currentLang==='ar'?'تواصل معنا':currentLang==='en'?'Contact Us':'Nous contacter'}</a>
      </div>
    </div>
    <div class="footer-bottom">
      <span>${t('footer_rights')}</span>
      <div class="footer-bottom-links">
        <a href="#">${t('footer_legal')}</a>
        <a href="#">${t('footer_cgv')}</a>
        <a href="#">${t('footer_privacy')}</a>
        <a href="#">${t('footer_cookies')}</a>
      </div>
    </div>
  </div>
</footer>`;
}

function buildBottomNavHTML() {
  return `
<nav class="bottom-nav" id="bottomNav">
  <div class="bottom-nav-inner">
    <a href="index.html" class="bn-item" data-page="index">
      <span class="bn-icon">🏠</span>
      <span>${t('bn_home')}</span>
    </a>
    <a href="products.html" class="bn-item" data-page="products">
      <span class="bn-icon">🛍️</span>
      <span>${t('bn_products')}</span>
    </a>
    <a href="configurator.html" class="bn-item" data-page="configurator">
      <span class="bn-icon" style="width:44px;height:44px;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#9b7ef8,#f472b6);border-radius:14px;font-size:1.4rem;margin-top:-8px;box-shadow:0 4px 16px rgba(155,126,248,.5);">✦</span>
      <span>${t('bn_config')}</span>
    </a>
    <a href="cart.html" class="bn-item" data-page="cart">
      <span class="bn-icon bn-cart-badge" id="bnCartBadge" data-count="0">🛒</span>
      <span>${t('bn_cart')}</span>
    </a>
    <a href="#" class="bn-item" id="bnMore" onclick="toggleMobileMenu(event)">
      <span class="bn-icon">☰</span>
      <span>${t('bn_more')}</span>
    </a>
  </div>
</nav>`;
}

const BG_HTML = `
<div class="bg-scene">
  <div class="bg-orb orb1"></div>
  <div class="bg-orb orb2"></div>
  <div class="bg-orb orb3"></div>
  <div class="bg-orb orb4"></div>
</div>
<div class="noise-overlay"></div>
`;

// ─────────────────────────────────────────────────────────────
//  LANG SWITCHER
// ─────────────────────────────────────────────────────────────
function setLang(lang) {
  localStorage.setItem('lang', lang);
  location.reload();
}

// ─────────────────────────────────────────────────────────────
//  INIT SHARED
// ─────────────────────────────────────────────────────────────
function initShared(currentPage) {
  // Set HTML dir and lang attribute
  document.documentElement.lang = currentLang;
  document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';

  // Inject background
  document.body.insertAdjacentHTML('afterbegin', BG_HTML);

  // Inject nav
  const navEl = document.createElement('div');
  navEl.innerHTML = buildNavHTML();
  document.body.insertAdjacentElement('afterbegin', navEl);

  // Inject mobile menu
  const menuEl = document.createElement('div');
  menuEl.innerHTML = buildMobileMenuHTML();
  document.body.insertAdjacentElement('afterbegin', menuEl);

  // Inject bottom nav
  const bnEl = document.createElement('div');
  bnEl.innerHTML = buildBottomNavHTML();
  document.body.insertAdjacentHTML('beforeend', bnEl.innerHTML);

  // Active nav links
  document.querySelectorAll('[data-page]').forEach(a => {
    if (a.dataset.page === currentPage) a.classList.add('active');
  });

  // Inject footer
  document.body.insertAdjacentHTML('beforeend', buildFooterHTML());

  // Toast container
  const toast = document.createElement('div');
  toast.className = 'toast'; toast.id = 'toast';
  toast.innerHTML = '<span class="toast-icon">✅</span><span id="toastMsg"></span>';
  document.body.appendChild(toast);

  // ── Cart count ──
  updateCartCount();

  // ── Nav scroll effect ──
  const nav = document.getElementById('mainNav');
  window.addEventListener('scroll', () => {
    nav?.classList.toggle('scrolled', window.scrollY > 60);
  }, {passive:true});

  // ── Nav toggle (hamburger) ──
  const toggle = document.getElementById('navToggle');
  if (toggle) {
    toggle.addEventListener('click', toggleMobileMenu);
  }

  // ── Close menu on overlay click ──
  document.getElementById('mobileMenu')?.addEventListener('click', function(e) {
    if (e.target === this) closeMobileMenu();
  });

  // ── Scroll reveal ──
  const revObs = new IntersectionObserver(entries => {
    entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('visible'); });
  }, {threshold:.08, rootMargin:'0px 0px -40px 0px'});
  document.querySelectorAll('.reveal').forEach(el => revObs.observe(el));

  // ── Orb parallax (desktop only) ──
  if (window.innerWidth > 900) {
    document.addEventListener('mousemove', e => {
      const x = (e.clientX/innerWidth - .5) * 18;
      const y = (e.clientY/innerHeight - .5) * 18;
      document.querySelectorAll('.bg-orb').forEach((orb,i) => {
        const f = (i+1)*.35;
        orb.style.transform = `translate(${x*f}px,${y*f}px)`;
      });
    }, {passive:true});
  }

  // ── Touch feedback ──
  document.querySelectorAll('.btn, .pc-btn, .filter-btn, .option-pill').forEach(el => {
    el.addEventListener('touchstart', () => el.classList.add('tap-active'), {passive:true});
    el.addEventListener('touchend', () => setTimeout(() => el.classList.remove('tap-active'), 200), {passive:true});
  });

  // ── Swipe to close mobile menu ──
  let touchStartY = 0;
  document.addEventListener('touchstart', e => { touchStartY = e.touches[0].clientY; }, {passive:true});
  document.addEventListener('touchmove', e => {
    const menu = document.getElementById('mobileMenu');
    if (menu?.classList.contains('open')) {
      if (e.touches[0].clientY - touchStartY > 80) closeMobileMenu();
    }
  }, {passive:true});

  // ── Scroll snap for mobile carousels ──
  document.querySelectorAll('.scroll-snap-x').forEach(el => {
    el.style.scrollBehavior = 'smooth';
  });
}

// ─────────────────────────────────────────────────────────────
//  MOBILE MENU TOGGLE
// ─────────────────────────────────────────────────────────────
function toggleMobileMenu(e) {
  if (e) e.preventDefault();
  const menu = document.getElementById('mobileMenu');
  const toggle = document.getElementById('navToggle');
  const isOpen = menu?.classList.contains('open');
  if (isOpen) {
    closeMobileMenu();
  } else {
    menu?.classList.add('open');
    toggle?.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}
function closeMobileMenu() {
  document.getElementById('mobileMenu')?.classList.remove('open');
  document.getElementById('navToggle')?.classList.remove('open');
  document.body.style.overflow = '';
}

// ─────────────────────────────────────────────────────────────
//  CART UTILITIES
// ─────────────────────────────────────────────────────────────
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  const count = cart.length;
  const cc = document.getElementById('cartCount');
  const ccm = document.getElementById('cartCountMob');
  const bnb = document.getElementById('bnCartBadge');
  if (cc) cc.textContent = count;
  if (ccm) ccm.textContent = count;
  if (bnb) bnb.dataset.count = count;
}

function showToast(msg, icon='✅') {
  const t = document.getElementById('toast');
  if (!t) return;
  document.getElementById('toastMsg').textContent = msg;
  t.querySelector('.toast-icon').textContent = icon;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3200);
}

function addToCart(item) {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  cart.push(item);
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  showToast(t('toast_added'));
}

// ─────────────────────────────────────────────────────────────
//  PRICE FORMATTING (DZD)
// ─────────────────────────────────────────────────────────────
function formatPrice(amount) {
  return new Intl.NumberFormat('fr-DZ', {
    style:'decimal', minimumFractionDigits:0, maximumFractionDigits:0
  }).format(amount) + ' DA';
}

// ─────────────────────────────────────────────────────────────
//  LAZY LOADING IMAGES
// ─────────────────────────────────────────────────────────────
function initLazyImages() {
  const imgObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const img = e.target;
        if (img.dataset.src) { img.src = img.dataset.src; img.removeAttribute('data-src'); }
        imgObs.unobserve(img);
      }
    });
  });
  document.querySelectorAll('img[data-src]').forEach(img => imgObs.observe(img));
}
