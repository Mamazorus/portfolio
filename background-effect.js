// Configuration des couleurs pour chaque rappeur
const backgroundColors = {
  'carti.webp': {
    gradient: 'linear-gradient(60deg,rgb(59, 14, 14) 0%, #060606 50%, #060606 100%)',
    name: 'Playboi Carti'
  },
  'morty.webp': {
    gradient: 'linear-gradient(60deg,rgba(94, 14, 81, 1) -100%, #060606 50%, #060606 100%)',
    name: 'Don Toliver - Morty'
  },
  'kluf.webp': {
    gradient: 'linear-gradient(60deg, #02001bff 0%, #060606 50%, #060606 100%)',
    name: 'Don Toliver'
  },
  'travis.webp': {
    gradient: 'linear-gradient(60deg,rgba(235, 15, 217, 0.18) -50%, #060606 50%, #060606 100%)',
    name: 'Travis Scott'
  },
  'halloween-event.webp': {
    gradient: 'linear-gradient(60deg, #302210ff 0%, #060606 50%, #060606 100%)',
    name: 'La Feve'
  },
  'jola.webp': {
    gradient: 'linear-gradient(60deg, #003922 0%, #060606 50%, #060606 100%)',
    name: 'Jolagreen23'
  }
};

// Couleur de fond par défaut
const defaultBackground = 'linear-gradient(135deg, #1a1a1a 0%, #060606 50%, #060606 100%)';

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

  // Options pour l'observer - ADAPTATIF selon la taille d'écran
  const screenWidth = window.innerWidth;
  const threshold = screenWidth >= 1945 ? 0.5 : 0.7; // 50% pour grands écrans, 70% pour petits
  
  const options = {
    root: null,
    rootMargin: '-10% 0px -10% 0px',
    threshold: threshold
  };
  
  console.log(`Écran détecté: ${screenWidth}px - Threshold utilisé: ${threshold * 100}%`);

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

const lenis = new Lenis({
  autoRaf: true,
});





document.addEventListener('DOMContentLoaded', function() {
    const carouselTrack = document.getElementById('carouselTrack');
    let animationId;
    
    function updateOpacity() {
        const container = document.querySelector('.carousel-container');
        const containerRect = container.getBoundingClientRect();
        const containerLeft = containerRect.left;
        const containerRight = containerRect.right;
        const containerWidth = containerRect.width;
        
        // Zones de fade (120px de chaque côté)
        const fadeZone = 120;
        
        const items = carouselTrack.querySelectorAll('.logo-item');
        
        items.forEach(item => {
            const itemRect = item.getBoundingClientRect();
            const itemCenter = itemRect.left + (itemRect.width / 2);
            
            let opacity = 1;
            
            // Fade à gauche
            if (itemCenter < containerLeft + fadeZone) {
                const distance = containerLeft + fadeZone - itemCenter;
                opacity = Math.max(0, 1 - (distance / fadeZone));
            }
            // Fade à droite
            else if (itemCenter > containerRight - fadeZone) {
                const distance = itemCenter - (containerRight - fadeZone);
                opacity = Math.max(0, 1 - (distance / fadeZone));
            }
            
            // Appliquer l'opacité avec une valeur minimum
            item.style.opacity = Math.max(0.1, opacity);
        });
        
        // Continuer la mise à jour
        animationId = requestAnimationFrame(updateOpacity);
    }
    
    function createInfiniteCarousel() {
        const originalItems = Array.from(carouselTrack.children);
        const itemCount = originalItems.length;
        
        // Calculer combien d'écrans nous devons remplir
        const containerWidth = document.querySelector('.carousel-container').offsetWidth;
        const itemWidth = 110; // 100px image + 10px gap
        const itemsPerScreen = Math.ceil(containerWidth / itemWidth);
        
        // Créer assez de copies pour remplir au moins 4 écrans (pour le fade)
        const totalCopies = Math.max(4, Math.ceil((itemsPerScreen * 4) / itemCount));
        
        // Nettoyer les anciens clones
        const clones = carouselTrack.querySelectorAll('.clone');
        clones.forEach(clone => clone.remove());
        
        // Créer les nouvelles copies
        for (let copy = 0; copy < totalCopies; copy++) {
            originalItems.forEach(item => {
                const clone = item.cloneNode(true);
                clone.classList.add('clone');
                carouselTrack.appendChild(clone);
            });
        }
        
        // Attendre que le DOM soit mis à jour
        requestAnimationFrame(() => {
            // Calculer la largeur exacte d'un set d'items originaux
            const totalWidth = itemWidth * itemCount;
            
            // Créer l'animation CSS
            const styleElement = document.createElement('style');
            styleElement.innerHTML = `
                @keyframes scroll-infinite {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(-${totalWidth}px);
                    }
                }
            `;
            
            // Remplacer l'ancien style
            const oldStyle = document.querySelector('#carousel-animation-style');
            if (oldStyle) {
                oldStyle.remove();
            }
            styleElement.id = 'carousel-animation-style';
            document.head.appendChild(styleElement);
            
            // Démarrer la mise à jour de l'opacité
            if (animationId) {
                cancelAnimationFrame(animationId);
            }
            updateOpacity();
            
            console.log(`Carrousel avec fade d'opacité: ${itemCount} items originaux, ${totalCopies} copies`);
        });
    }
    
    function handleHoverEvents() {
        const carouselContainer = document.querySelector('.carousel-container');
        
        carouselContainer.addEventListener('mouseenter', function() {
            carouselTrack.style.animationPlayState = 'paused';
        });
        
        carouselContainer.addEventListener('mouseleave', function() {
            carouselTrack.style.animationPlayState = 'running';
        });
    }
    
    function adjustForScreenSize() {
        const screenWidth = window.innerWidth;
        
        // Ajuster la vitesse selon la taille d'écran
        if (screenWidth >= 1920) {
            carouselTrack.style.animationDuration = '50s';
        } else if (screenWidth >= 1440) {
            carouselTrack.style.animationDuration = '45s';
        } else if (screenWidth >= 1200) {
            carouselTrack.style.animationDuration = '40s';
        } else {
            carouselTrack.style.animationDuration = '30s';
        }
    }
    
    function handleResize() {
        let resizeTimeout;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(function() {
                adjustForScreenSize();
                createInfiniteCarousel();
            }, 300);
        });
    }
    
    function optimizePerformance() {
        // Performance GPU
        carouselTrack.style.willChange = 'transform';
        carouselTrack.style.backfaceVisibility = 'hidden';
        carouselTrack.style.transform = 'translate3d(0, 0, 0)';
        
        // Observer pour démarrer/arrêter selon la visibilité
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    carouselTrack.style.animationPlayState = 'running';
                    if (!animationId) {
                        updateOpacity();
                    }
                } else {
                    carouselTrack.style.animationPlayState = 'paused';
                    if (animationId) {
                        cancelAnimationFrame(animationId);
                        animationId = null;
                    }
                }
            });
        });
        
        observer.observe(carouselTrack);
    }
    
    function waitForImagesAndInit() {
        const images = carouselTrack.querySelectorAll('img');
        let loadedCount = 0;
        
        function imageLoaded() {
            loadedCount++;
            if (loadedCount === images.length) {
                setTimeout(() => {
                    adjustForScreenSize();
                    createInfiniteCarousel();
                }, 100);
            }
        }
        
        if (images.length === 0) {
            createInfiniteCarousel();
            return;
        }
        
        images.forEach(img => {
            if (img.complete && img.naturalHeight !== 0) {
                imageLoaded();
            } else {
                img.addEventListener('load', imageLoaded);
                img.addEventListener('error', imageLoaded);
            }
        });
    }
    
    function initCarousel() {
        try {
            optimizePerformance();
            handleHoverEvents();
            handleResize();
            waitForImagesAndInit();
            
            console.log('Carrousel avec fade d\'opacité initialisé!');
        } catch (error) {
            console.error('Erreur:', error);
        }
    }
    
    // Démarrage
    initCarousel();
    
    // Nettoyage lors du déchargement de la page
    window.addEventListener('beforeunload', function() {
        if (animationId) {
            cancelAnimationFrame(animationId);
        }
    });
    
    // Debug
    if (window.location.search.includes('debug=true')) {
        window.debugOpacity = function() {
            console.log('--- Debug Opacité ---');
            const items = carouselTrack.querySelectorAll('.logo-item');
            items.forEach((item, index) => {
                console.log(`Item ${index}: opacité ${item.style.opacity}`);
            });
        };
    }
});




document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault(); // Empêche le comportement par défaut du lien

        // Récupère l'élément cible (section)
        const targetId = this.getAttribute('href').substring(1); // Retire le "#"
        const targetElement = document.getElementById(targetId);

        // Fait défiler la page de manière fluide vers l'élément cible
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth', // Rend le scroll fluide
                block: 'start' // Aligne la section en haut de l'écran
            });
        }
    });
});
