document.addEventListener("DOMContentLoaded", function () {
    // Animazione slide-in per le sezioni
    const slides = document.querySelectorAll(".slide");
    slides.forEach(slide => {
      slide.classList.remove("bounce-in-right");
      slide.style.opacity = "0";
    });
  
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("bounce-in-right");
          entry.target.style.opacity = "1";
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
  
    slides.forEach(slide => observer.observe(slide));
  
    // Typing effect nell'h1 Hero
    const textElement = document.querySelector("h1");
    const fullText = "HI! I'M GIUSEPPE LENTI";
    let currentIndex = 0;
  
    function typeEffect() {
      if (currentIndex < fullText.length) {
        textElement.innerHTML = `<span class="highlight">${fullText.substring(0, currentIndex + 1)}</span>`;
        currentIndex++;
        setTimeout(typeEffect, 100);
      } else {
        textElement.innerHTML = `<span class="highlight done">${fullText}</span>`;
      }
    }
  
    setTimeout(typeEffect, 500);
  
    // Pulisce la barra degli indirizzi
    window.history.replaceState({}, document.title, window.location.pathname);
  
    // Controlla visibilità della sezione project
    const projectSection = document.querySelector('#project');
    const gifElement = document.querySelector('.gif-animation');
  
    function checkProjectVisibility() {
      if (!projectSection || !gifElement) return;
  
      const sectionTop = projectSection.offsetTop;
      const sectionHeight = projectSection.offsetHeight;
      const scrollPosition = window.scrollY + window.innerHeight;
  
      if (scrollPosition >= sectionTop && scrollPosition <= (sectionTop + sectionHeight)) {
        gifElement.classList.add('show');
      }
    }
  
    window.addEventListener('scroll', checkProjectVisibility);
  
    // Gestione active-dot nella navbar
    const sections = document.querySelectorAll("section, .container-fluid, footer"); // Sezioni da monitorare
    const navLinks = document.querySelectorAll(".nav-link");
    const activeDot = document.querySelector(".active-dot");

    function updateActiveDot() {
      let currentSection = null;
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      const totalHeight = document.body.scrollHeight;
      const bottomReached = (window.innerHeight + window.scrollY) >= (totalHeight - 5);
  
      sections.forEach(section => {
          const top = section.offsetTop;
          const height = section.offsetHeight;
          const id = section.getAttribute("id");
  
          if (
              (scrollPosition >= top && scrollPosition < top + height) ||
              (section.tagName.toLowerCase() === "footer" && bottomReached)
          ) {
              currentSection = id;
          }
      });
  
      navLinks.forEach(link => {
          const targetId = link.getAttribute("href").substring(1);
          if (targetId === currentSection) {
              const linkRect = link.getBoundingClientRect();
              const navRect = link.closest(".navbar").getBoundingClientRect();
  
              activeDot.style.top = `${linkRect.bottom - navRect.top + 5}px`;
              activeDot.style.left = `${linkRect.left - navRect.left + linkRect.width / 2 - activeDot.offsetWidth / 2}px`;
              activeDot.style.opacity = "1";
          }
      });
  
      if (!currentSection) {
          activeDot.style.opacity = "0";
      }
  }

    window.addEventListener("scroll", updateActiveDot);
    window.addEventListener("resize", updateActiveDot); // Aggiorna su resize
    updateActiveDot(); // Inizializza la posizione al caricamento


    (function() {
      emailjs.init("k8KTOc5b9u0IFtZRk"); // <-- Sostituisci con la tua Public Key
    })();
  
    const form = document.getElementById('contact-form');
    const message = document.getElementById('form-message');
  
    form.addEventListener('submit', function(e) {
      e.preventDefault();
  
      emailjs.sendForm('service_h4su60f', 'Ciao', this)
        .then(() => {
          message.innerHTML = `<div class="alert alert-success">Messaggio inviato con successo!</div>`;
          form.reset();
        }, (error) => {
          message.innerHTML = `<div class="alert alert-danger">Errore: ${error.text}</div>`;
        });
    });
});
