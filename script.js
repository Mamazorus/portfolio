const lenis = new Lenis({
  autoRaf: true,
});






document.addEventListener("DOMContentLoaded", function() {
  const images = [
      "img/knit1.jpg",
      "img/knit2.jpg", 
      "img/knit3.jpg",
      "img/knit4.jpg",  
      "img/knit5.jpg",  
      "img/knit6.jpg"


  ];

  let currentIndex = 0;
  const imgElement = document.getElementById("switchImage1");

  function switchImage() {
      currentIndex = (currentIndex + 1) % images.length;
      imgElement.src = images[currentIndex];
  }

  // Change l'image toutes les 3 secondes (3000 millisecondes)
  setInterval(switchImage, 1000);
});

document.addEventListener("DOMContentLoaded", function() {
  const images = [
      "img/pant1.jpg",
      "img/pant2.jpg", 
      "img/pant3.jpg",
      "img/pant4.jpg",  
      "img/pant5.jpg"

  ];

  let currentIndex = 0;
  const imgElement = document.getElementById("switchImage2");

  function switchImage() {
      currentIndex = (currentIndex + 1) % images.length;
      imgElement.src = images[currentIndex];
  }

  // Change l'image toutes les 3 secondes (3000 millisecondes)
  setInterval(switchImage, 1000);
});

document.addEventListener("DOMContentLoaded", function() {
  const images = [
      "img/studio1.jpg",
      "img/studio2.jpg", 
      "img/studio3.jpg",
      "img/studio4.jpg",  
      "img/studio5.jpg"

  ];

  let currentIndex = 0;
  const imgElement = document.getElementById("switchImage3");

  function switchImage() {
      currentIndex = (currentIndex + 1) % images.length;
      imgElement.src = images[currentIndex];
  }

  // Change l'image toutes les 3 secondes (3000 millisecondes)
  setInterval(switchImage, 1000);
});




document.addEventListener('DOMContentLoaded', function() {
  const texts = ["GRAPHISTE", "WEBDESIGNER"];
  let index = 0;
  let charIndex = 0;
  const typingEffect = document.querySelector('.typing-effect');

  function type() {
    if (charIndex < texts[index].length) {
      typingEffect.textContent += texts[index].charAt(charIndex);
      charIndex++;
      setTimeout(type, 150); // Vitesse de frappe
    } else {
      // Attendre avant d'effacer
      setTimeout(erase, 3000);
    }
  }

  function erase() {
    if (charIndex > 0) {
      typingEffect.textContent = texts[index].substring(0, charIndex - 1);
      charIndex--;
      setTimeout(erase, 100); // Vitesse d'effacement
    } else {
      // Passer au texte suivant
      index = (index + 1) % texts.length;
      setTimeout(type, 500); // Délai avant de commencer à taper le texte suivant
    }
  }

  // Démarrer l'effet de frappe
  setTimeout(type, 300); // Délai initial avant de commencer
});







// Fonction pour activer le scroll smooth
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





navLinks.forEach(link => {
  link.addEventListener('click', function(event) {
    if (menuToggle.classList.contains('active')) {
      menuToggle.classList.remove('active');
      mobileMenuLinks.classList.remove('active');
      body.classList.remove('no-scroll');
      startCarousel();
    }

    event.preventDefault();

    const targetId = this.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});


      




document.addEventListener('DOMContentLoaded', function() {
  // Force le défilement vers le haut de la page
  window.scrollTo(0, 0);
});





