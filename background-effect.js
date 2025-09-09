// Configuration des couleurs pour chaque rappeur
const backgroundColors = {
  'carti.webp': {
    gradient: 'linear-gradient(30deg,rgb(48, 13, 13) 0%, #200A0A 50%, #1a1a1a 100%)',
    name: 'Playboi Carti'
  },
  'morty.webp': {
    gradient: 'linear-gradient(30deg,rgb(94, 14, 94) -300%, #1a1a1a 50%, #1a1a1a 100%)',
    name: 'Don Toliver - Morty'
  },
  'toliver.webp': {
    gradient: 'linear-gradient(30deg, #061F29 0%, #1a1a1a 50%, #1a1a1a 100%)',
    name: 'Don Toliver'
  },
  'travis.webp': {
    gradient: 'linear-gradient(30deg,rgba(235, 15, 15, 0.18) 0%, #1a1a1a 50%, #1a1a1a 100%)',
    name: 'Travis Scott'
  },
  'feve.webp': {
    gradient: 'linear-gradient(30deg, #10302F 0%, #1a1a1a 50%, #1a1a1a 100%)',
    name: 'La Feve'
  },
  'jola.webp': {
    gradient: 'linear-gradient(30deg, #003922 0%, #1a1a1a 50%, #1a1a1a 100%)',
    name: 'Jolagreen23'
  }
};

// Couleur de fond par défaut
const defaultBackground = 'linear-gradient(30deg,rgb(43, 43, 43) 0%, #1a1a1a 50%, #1a1a1a 100%)';

// Variables pour les éléments de fond
let backgroundLayer1 = null;
let backgroundLayer2 = null;
let currentLayer = 1;

// Fonction pour créer les couches de fond pour les transitions
function createBackgroundLayers() {
  // IMPORTANT : Mettre le body en noir pour éviter le flash blanc
  document.body.style.background = '#000000';
  
  // Créer la première couche
  backgroundLayer1 = document.createElement('div');
  backgroundLayer1.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: ${defaultBackground};
        z-index: -2;
        transition: opacity 1.2s ease-in-out;
        opacity: 1;
    `;

  // Créer la deuxième couche
  backgroundLayer2 = document.createElement('div');
  backgroundLayer2.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: ${defaultBackground};
        z-index: -1;
        transition: opacity 1.2s ease-in-out;
        opacity: 0;
    `;

  // Ajouter les couches au body
  document.body.insertBefore(backgroundLayer1, document.body.firstChild);
  document.body.insertBefore(backgroundLayer2, document.body.firstChild);
}

// Fonction pour extraire le nom du fichier de l'URL de l'image
function getImageFileName(src) {
  return src.split('/').pop();
}

// Fonction pour changer le fond avec une transition fluide
function changeBackground(gradient, artistName) {
  if (!backgroundLayer1 || !backgroundLayer2) return;

  console.log(`Fond changé pour: ${artistName}`);

  if (currentLayer === 1) {
    // Préparer la couche 2 avec le nouveau gradient
    backgroundLayer2.style.background = gradient;
    // Petit délai pour s'assurer que le background est appliqué
    requestAnimationFrame(() => {
      backgroundLayer2.style.opacity = '1';
      backgroundLayer1.style.opacity = '0';
    });
    currentLayer = 2;
  } else {
    // Préparer la couche 1 avec le nouveau gradient
    backgroundLayer1.style.background = gradient;
    // Petit délai pour s'assurer que le background est appliqué
    requestAnimationFrame(() => {
      backgroundLayer1.style.opacity = '1';
      backgroundLayer2.style.opacity = '0';
    });
    currentLayer = 1;
  }
}

// Configuration de l'Intersection Observer
function setupBackgroundChanger() {
  // Créer les couches de fond
  createBackgroundLayers();

  // Vérifier que l'API est supportée
  if (!('IntersectionObserver' in window)) {
    console.log('IntersectionObserver non supporté');
    return;
  }

  // Options pour l'observer - PLUS PRÉCIS
  const options = {
    root: null,
    rootMargin: '-10% 0px -10% 0px', // Réduit la zone de détection
    threshold: 0.7 // 70% de l'image doit être visible (au lieu de 50%)
  };

  // Créer l'observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        const fileName = getImageFileName(img.src);
        const colorConfig = backgroundColors[fileName];

        if (colorConfig) {
          changeBackground(colorConfig.gradient, colorConfig.name);
        } else {
          changeBackground(defaultBackground, 'Défaut');
        }
      }
    });
  }, options);

  // Observer toutes les images dans la section scroll-right
  const images = document.querySelectorAll('.scroll-right img');
  images.forEach(img => {
    observer.observe(img);
  });
}

// Version alternative avec détection au scroll (backup)
function setupScrollBasedChanger() {
  // Créer les couches de fond
  createBackgroundLayers();

  let ticking = false;

  function updateBackground() {
    const images = document.querySelectorAll('.scroll-right img');
    const viewportHeight = window.innerHeight;

    let currentImage = null;
    let closestDistance = Infinity;

    images.forEach(img => {
      const fileName = getImageFileName(img.src);
      const rect = img.getBoundingClientRect();
      const imageCenter = rect.top + rect.height / 2;
      const viewportCenter = viewportHeight / 2;
      const distance = Math.abs(imageCenter - viewportCenter);

      if (distance < closestDistance && rect.top < viewportHeight && rect.bottom > 0) {
        closestDistance = distance;
        currentImage = { img, fileName };
      }
    });

    if (currentImage) {
      const colorConfig = backgroundColors[currentImage.fileName];
      if (colorConfig) {
        changeBackground(colorConfig.gradient, colorConfig.name);
      } else {
        changeBackground(defaultBackground, 'Défaut');
      }
    }

    ticking = false;
  }

  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(updateBackground);
      ticking = true;
    }
  }

  window.addEventListener('scroll', requestTick);
  updateBackground();
}

// Initialisation
document.addEventListener('DOMContentLoaded', function () {
  if ('IntersectionObserver' in window) {
    setupBackgroundChanger();
  } else {
    setupScrollBasedChanger();
  }
});

if (document.readyState !== 'loading') {
  if ('IntersectionObserver' in window) {
    setupBackgroundChanger();
  } else {
    setupScrollBasedChanger();
  }
}