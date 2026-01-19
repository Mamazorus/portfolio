# Portfolio Maël Auzenet - Architecture CSS Modulaire

## 📁 Structure des fichiers

```
portfolio/
├── css/
│   ├── variables.css    # Variables CSS (couleurs, fonts, espacements)
│   ├── base.css         # Reset, @font-face, styles globaux
│   ├── navbar.css       # Navigation et menu mobile
│   ├── components.css   # Composants réutilisables (tags, boutons, animations)
│   ├── layout.css       # Layouts (sticky, grille projets)
│   ├── animations.css   # Animations d'entrée (index.html uniquement)
│   ├── home.css         # Styles spécifiques à l'accueil
│   ├── project.css      # Styles spécifiques aux pages projet
│   └── footer.css       # Footer
├── js/
│   ├── script.js        # Script principal (typing effect, scroll)
│   └── background-effect.js # Effet de fond dynamique (page graphisme)
├── fonts/               # (À ajouter) Polices
├── img/                 # (À ajouter) Images
├── index.html           # Page d'accueil avec animation
├── retour.html          # Page d'accueil sans animation
├── graphisme.html       # Page projet Graphisme (avec effet de fond)
├── urban.html           # Page projet Urban Closet
├── basteleur.html       # Page projet Basteleur
└── masques.html         # Page projet Masques japonais
```

---

## 🖼️ Ajouter des images à un projet (ULTRA SIMPLE)

### Pour ajouter une image avec son dégradé de fond

Dans le HTML, ajoutez simplement l'attribut `data-color` sur l'image :

```html
<img src="img/mon-image.webp" data-color="#3b0e0e" alt="Description" />
```

**C'est tout !** Le fond changera automatiquement avec cette couleur quand l'image sera visible.

### Palette de couleurs suggérées

| Couleur       | Code hex  | Aperçu |
|---------------|-----------|--------|
| Rouge foncé   | `#3b0e0e` | 🔴 |
| Vert foncé    | `#003922` | 🟢 |
| Bleu foncé    | `#02001b` | 🔵 |
| Violet        | `#5e0e51` | 🟣 |
| Marron        | `#302210` | 🟤 |
| Orange        | `#3d2810` | 🟠 |
| Rose          | `#2a0626` | 💜 |

### Exemple complet

```html
<div class="scroll-right">
  <img src="img/affiche1.webp" data-color="#003922" alt="Affiche verte" />
  <img src="img/affiche2.webp" data-color="#3b0e0e" alt="Affiche rouge" />
  <img src="img/affiche3.webp" data-color="#02001b" alt="Affiche bleue" />
</div>
```

---

## 🎨 Variables CSS

Les variables sont centralisées dans `variables.css`. Pour modifier l'apparence globale du site, modifiez uniquement ce fichier.

### Couleurs principales
```css
--color-bg-primary: #101010;      /* Fond principal */
--color-text-primary: #ffffff;    /* Texte principal */
--color-text-secondary: rgba(255, 255, 255, 0.615);
--color-border: #5c5c5c;          /* Bordures */
```

### Gradients des pages projet
```css
--gradient-graphisme: linear-gradient(30deg, #11121c, #060606);
--gradient-urban: linear-gradient(30deg, #1b111c, #060606);
--gradient-basteleur: linear-gradient(30deg, #1c1111, #060606);
--gradient-masque: linear-gradient(30deg, #181001, #060606);
```

### Typographie
```css
--font-body: 'inter-light', sans-serif;
--font-body-extralight: 'inter-extralight', sans-serif;
--font-body-extrabold: 'inter-extrabold', sans-serif;
```

### Espacements
```css
--spacing-xs: 10px;
--spacing-sm: 20px;
--spacing-md: 40px;
--spacing-lg: 80px;
--page-padding: 40px;
--page-padding-tablet: 20px;
--page-padding-mobile: 10px;
```

---

## 📄 Ordre des CSS dans les pages HTML

### Page d'accueil (index.html)
```html
<link rel="stylesheet" href="css/variables.css">
<link rel="stylesheet" href="css/base.css">
<link rel="stylesheet" href="css/navbar.css">
<link rel="stylesheet" href="css/components.css">
<link rel="stylesheet" href="css/layout.css">
<link rel="stylesheet" href="css/animations.css">  <!-- Uniquement pour index.html -->
<link rel="stylesheet" href="css/home.css">
<link rel="stylesheet" href="css/footer.css">
```

### Pages projet (graphisme.html, urban.html, etc.)
```html
<link rel="stylesheet" href="css/variables.css">
<link rel="stylesheet" href="css/base.css">
<link rel="stylesheet" href="css/navbar.css">
<link rel="stylesheet" href="css/components.css">
<link rel="stylesheet" href="css/layout.css">
<link rel="stylesheet" href="css/project.css">
<link rel="stylesheet" href="css/footer.css">
```

---

## 🆕 Ajouter un nouveau projet complet

### 1. Créer le fichier HTML
Dupliquer un fichier existant (ex: `graphisme.html`) et le renommer.

### 2. Modifier le contenu
- Titre du projet (`<h2>`)
- Date
- Tags
- Description
- Images

### 3. Ajouter un nouveau gradient (optionnel)
Dans `css/variables.css` :
```css
--gradient-nouveau-projet: linear-gradient(30deg, #XXXXXX, #060606);
```

Dans `css/project.css` :
```css
.bg-nouveau-projet {
  background: var(--gradient-nouveau-projet);
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  background-position: center;
  min-height: 100vh;
}
```

### 4. Appliquer la classe
```html
<body class="bg-nouveau-projet">
```

### 5. Ajouter les images avec leurs couleurs
Dans `.scroll-right`, ajouter les images avec `data-color` :
```html
<img src="img/image.webp" data-color="#COULEUR" alt="Description" />
```

Le script `background-effect.js` détecte automatiquement les images et change le fond.

---

## 🔄 Correspondance anciens → nouveaux fichiers

| Ancien fichier | Nouveau(x) fichier(s) |
|----------------|----------------------|
| style.css | base.css + navbar.css |
| style-projet.css | base.css + navbar.css + project.css |
| main.css | animations.css + home.css |
| main_retour.css | home.css (+ inline override) |
| main2.css | layout.css |
| projets.css | layout.css |
| projets_retour.css | layout.css |
| footer.css | footer.css (optimisé) |

---

## 📦 Polices requises

Placer ces fichiers dans le dossier `fonts/`:
- IntegralCF-Bold.ttf
- Inter_18pt-Light.ttf
- Inter_18pt-ExtraLight.ttf
- Inter_18pt-ExtraBold.ttf

---

## ✅ Avantages de cette architecture

- **Variables CSS**: Un seul endroit pour modifier couleurs, fonts, espacements
- **Zéro duplication**: Les `@font-face` ne sont déclarés qu'une fois dans `base.css`
- **Modulaire**: Chaque fichier a une responsabilité claire
- **Maintenable**: Facile à comprendre et à modifier
- **Scalable**: Simple d'ajouter de nouveaux projets ou composants
- **Images ultra simples**: Ajouter une image = 1 ligne HTML avec `data-color`
- **Pas besoin de JS**: Les couleurs de fond sont définies directement dans le HTML
