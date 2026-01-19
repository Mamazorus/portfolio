/* ============================================
   BACKGROUND EFFECT - Dégradés dynamiques
   ============================================
   
   COMMENT AJOUTER UNE IMAGE AVEC SON DÉGRADÉ :
   ────────────────────────────────────────────
   
   Ajoutez simplement l'attribut data-color sur l'image :
   
   <img src="img/mon-image.webp" data-color="#3b0e0e" alt="Description" />
   
   C'est tout ! Le fond changera automatiquement avec cette couleur
   quand l'image sera visible à l'écran.
   
   EXEMPLES DE COULEURS :
   ──────────────────────
   Rouge foncé   : #3b0e0e
   Vert foncé    : #003922
   Bleu foncé    : #02001b
   Violet        : #5e0e51
   Marron        : #302210
   Orange        : #3d2810
   Rose          : #2a0626
   
============================================ */

// Couleur par défaut (quand l'image n'a pas de data-color)
const DEFAULT_COLOR = '#1a1a1a';

// ==================== CODE (ne pas modifier) ====================

function generateGradient(color) {
  return `linear-gradient(60deg, ${color} 0%, #060606 50%, #060606 100%)`;
}

const defaultBackground = generateGradient(DEFAULT_COLOR);

let backgroundLayer1 = null;
let backgroundLayer2 = null;
let currentLayer = 1;
let lastActiveImage = null;
let grainLayer = null;

function createBackgroundLayers() {
  document.body.style.background = '#000000';
  
  backgroundLayer1 = document.createElement('div');
  backgroundLayer1.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: ${defaultBackground};
    z-index: -3;
    transition: opacity 1.2s ease-in-out;
    opacity: 1;
  `;

  backgroundLayer2 = document.createElement('div');
  backgroundLayer2.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: ${defaultBackground};
    z-index: -2;
    transition: opacity 1.2s ease-in-out;
    opacity: 0;
  `;

  document.body.insertBefore(backgroundLayer1, document.body.firstChild);
  document.body.insertBefore(backgroundLayer2, document.body.firstChild);

  createGrainLayer();
}

function createGrainLayer() {
  try {
    const size = 200;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');

    const imageData = ctx.createImageData(size, size);
    for (let i = 0; i < imageData.data.length; i += 4) {
      const v = Math.floor(Math.random() * 255);
      imageData.data[i] = v;
      imageData.data[i + 1] = v;
      imageData.data[i + 2] = v;
      imageData.data[i + 3] = Math.floor(Math.random() * 60);
    }
    ctx.putImageData(imageData, 0, 0);

    const dataUrl = canvas.toDataURL('image/png');

    grainLayer = document.createElement('div');
    grainLayer.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      pointer-events: none;
      background-image: url("${dataUrl}");
      background-repeat: repeat;
      opacity: 0.06;
      mix-blend-mode: overlay;
      z-index: -1;
    `;

    document.body.insertBefore(grainLayer, document.body.firstChild);
  } catch (e) {
    console.warn('Grain layer error:', e);
  }
}

function changeBackground(gradient) {
  if (!backgroundLayer1 || !backgroundLayer2) return;

  if (currentLayer === 1) {
    backgroundLayer2.style.background = gradient;
    requestAnimationFrame(() => {
      backgroundLayer2.style.opacity = '1';
      backgroundLayer1.style.opacity = '0';
    });
    currentLayer = 2;
  } else {
    backgroundLayer1.style.background = gradient;
    requestAnimationFrame(() => {
      backgroundLayer1.style.opacity = '1';
      backgroundLayer2.style.opacity = '0';
    });
    currentLayer = 1;
  }
}

function setupBackgroundChanger() {
  createBackgroundLayers();

  if (!('IntersectionObserver' in window)) return;

  const screenWidth = window.innerWidth;
  const requiredRatio = screenWidth >= 1200 ? 0.35 : 0.7;

  const options = {
    root: null,
    rootMargin: '-10% 0px -10% 0px',
    threshold: [0, 0.1, 0.25, 0.5, 0.75, 1]
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const img = entry.target;

      if (entry.intersectionRatio >= requiredRatio) {
        if (lastActiveImage === img) return;
        lastActiveImage = img;

        // Lire la couleur depuis l'attribut data-color de l'image
        const color = img.dataset.color || DEFAULT_COLOR;
        changeBackground(generateGradient(color));
      }
    });
  }, options);

  const images = document.querySelectorAll('.scroll-right img');
  images.forEach(img => observer.observe(img));
}

// Initialisation
document.addEventListener('DOMContentLoaded', function() {
  if (document.querySelector('.scroll-right')) {
    setupBackgroundChanger();
  }
});

// Scroll smooth
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
