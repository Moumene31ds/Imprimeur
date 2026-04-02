# L'Artisan Imprimeur — Guide de Déploiement Production

## 📁 Structure des fichiers

```
lartisan-imprimeur.fr/
├── index.html              ← Accueil
├── products.html           ← Catalogue produits
├── configurator.html       ← Configurateur de commande
├── gallery.html            ← Galerie / Portfolio
├── about.html              ← À propos, équipe, FAQ
├── contact.html            ← Contact & devis
├── cart.html               ← Panier
├── 404.html                ← Page d'erreur 404
├── offline.html            ← Page hors ligne (PWA)
├── manifest.json           ← PWA manifest
├── robots.txt              ← Instructions robots
├── sitemap.xml             ← Plan du site SEO
├── sw.js                   ← Service Worker (PWA)
├── .htaccess               ← Config Apache (sécurité, cache, HTTPS)
├── css/
│   ├── main.css            ← Design system partagé
│   └── home.css            ← Styles page d'accueil
├── js/
│   └── app.js              ← JavaScript partagé (nav, cart, analytics...)
├── images/                 ← À créer : photos produits, og-images
│   ├── og-home.jpg         (1200×630px)
│   ├── og-products.jpg     (1200×630px)
│   └── screenshot-*.jpg
└── icons/                  ← À créer : icônes app
    ├── favicon.svg
    ├── favicon-32.png
    ├── apple-touch-icon.png (180×180px)
    └── icon-*.png          (72, 96, 128, 144, 152, 192, 384, 512px)
```

---

## 🚀 Checklist de déploiement

### 1. Avant de déployer

- [ ] Remplacer `G-XXXXXXXXXX` par votre vrai Google Analytics 4 ID dans `js/app.js`
- [ ] Remplacer `https://lartisan-imprimeur.fr` par votre vrai domaine dans tous les fichiers
- [ ] Créer et ajouter les images manquantes (og-images, screenshots, icônes)
- [ ] Tester le site en local (Live Server VS Code, ou `python -m http.server 8080`)
- [ ] Vérifier tous les liens internes

### 2. Hébergement recommandé

| Option          | Prix       | Notes |
|----------------|------------|-------|
| **Vercel**     | Gratuit    | Déploiement Git automatique, CDN mondial |
| **Netlify**    | Gratuit    | Drag & drop ou Git, formulaires inclus |
| **OVH**        | ~5€/mois   | Serveur français, RGPD simplifié |
| **Infomaniak** | ~5€/mois   | Suisse, très RGPD-friendly |

### 3. Déploiement sur Netlify (le plus simple)

```bash
# Option 1 : Drag & Drop
# → Aller sur app.netlify.com → "Add new site" → Glisser le dossier

# Option 2 : CLI
npm install -g netlify-cli
netlify login
netlify deploy --prod --dir .
```

### 4. Déploiement sur Vercel

```bash
npm install -g vercel
vercel login
vercel --prod
```

### 5. Déploiement sur Apache/OVH

```bash
# Via FTP (FileZilla) ou SFTP :
# Uploader TOUS les fichiers à la racine public_html/
# Le .htaccess sera automatiquement lu par Apache
```

---

## 🔧 Configuration post-déploiement

### Google Analytics 4
1. Créer une propriété GA4 sur analytics.google.com
2. Copier l'ID de mesure (G-XXXXXXXXXX)
3. Remplacer dans `js/app.js` ligne ~`analyticsId: 'G-XXXXXXXXXX'`

### Formulaire de contact (backend requis)
Le formulaire actuel simule l'envoi. Pour l'activer :

**Option A : Netlify Forms (0 code)**
```html
<!-- Dans contact.html, ajouter à la balise form : -->
<form name="contact" method="POST" data-netlify="true">
  <input type="hidden" name="form-name" value="contact">
  <!-- ... champs ... -->
</form>
```

**Option B : Formspree**
```javascript
// Dans contact.html submitForm() :
const response = await fetch('https://formspree.io/f/VOTRE_ID', {
  method: 'POST',
  body: new FormData(document.getElementById('contactForm')),
  headers: { 'Accept': 'application/json' }
});
```

**Option C : EmailJS (envoi direct côté client)**
```javascript
emailjs.send('SERVICE_ID', 'TEMPLATE_ID', formData, 'PUBLIC_KEY');
```

### Paiement en ligne (Stripe)
```javascript
// Dans cart.html proceedCheckout() :
const stripe = Stripe('pk_live_VOTRE_CLE_PUBLIQUE');
// Créer une session checkout côté serveur, puis :
stripe.redirectToCheckout({ sessionId: 'cs_...' });
```

---

## 📊 Performance & SEO

### Scores Lighthouse cibles
- Performance : ≥ 90
- Accessibilité : ≥ 95
- Bonnes pratiques : ≥ 95
- SEO : ≥ 95
- PWA : ✅

### Optimisations images
```bash
# Convertir en WebP (via cwebp ou squoosh.app)
cwebp -q 85 image.jpg -o image.webp

# Générer les OG images (1200×630px, < 200Ko)
# Générer les icônes PWA (utiliser realfavicongenerator.net)
```

### Cache & CDN
- Le `.htaccess` configure le cache automatiquement pour Apache
- Sur Netlify/Vercel, le CDN est automatique
- Pour Cloudflare : activer "Auto Minify" et "Rocket Loader"

---

## 🔒 Sécurité

- Headers de sécurité configurés dans `.htaccess`
- HTTPS forcé automatiquement
- CSP (Content Security Policy) configurée
- Pas d'upload de fichiers côté serveur sans validation
- Données panier stockées uniquement en `localStorage` côté client

---

## 📞 Support technique

Pour toute question ou personnalisation :
- Email : dev@lartisan.fr
- Documentation : https://docs.lartisan-imprimeur.fr
