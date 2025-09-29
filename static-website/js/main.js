// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
  const mobileMenuClose = document.querySelector('.mobile-menu-close');
  const mobileMenuBackdrop = document.querySelector('.mobile-menu-backdrop');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  
  // Debug logs to check if elements are found
  console.log('Mobile menu button found:', mobileMenuBtn);
  console.log('Mobile menu overlay found:', mobileMenuOverlay);
  console.log('Mobile menu close found:', mobileMenuClose);
  console.log('Mobile menu backdrop found:', mobileMenuBackdrop);
  console.log('Mobile nav links found:', mobileNavLinks.length);
  
  if (mobileMenuBtn && mobileMenuOverlay) {
    mobileMenuBtn.addEventListener('click', function() {
      console.log('Mobile menu button clicked');
      mobileMenuOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
    
    const closeMobileMenu = function() {
      console.log('Closing mobile menu');
      mobileMenuOverlay.classList.remove('active');
      document.body.style.overflow = '';
    };
    
    if (mobileMenuClose) {
      mobileMenuClose.addEventListener('click', closeMobileMenu);
    }
    
    if (mobileMenuBackdrop) {
      mobileMenuBackdrop.addEventListener('click', closeMobileMenu);
    }
    
    // Close mobile menu when clicking on any navigation link
    if (mobileNavLinks) {
      mobileNavLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
      });
    }
  } else {
    console.log('Mobile menu elements not found');
  }
  
  // Header scroll effect
  const header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }
  
  // Journey phase selection
  const journeyPhases = document.querySelectorAll('.journey-phase');
  if (journeyPhases.length > 0) {
    journeyPhases.forEach((phase, index) => {
      phase.addEventListener('click', function() {
        // Remove selected class from all phases
        journeyPhases.forEach(p => {
          p.querySelector('.journey-card').classList.remove('selected');
        });
        
        // Add selected class to clicked phase
        this.querySelector('.journey-card').classList.add('selected');
        
        // Update journey detail content
        const journeyDetailTitle = document.querySelector('.journey-detail-title');
        const journeyDetailDescription = document.querySelector('.journey-detail-description');
        
        if (journeyDetailTitle && journeyDetailDescription) {
          const titles = [
            "Your Sri Lankan Story Begins",
            "Uncover Ancient Mysteries",
            "Into the Wild Heart",
            "Feel the Island's Soul"
          ];
          
          const descriptions = [
            "Land in Colombo where warm smiles and tropical air welcome you. Your local guide shares the first tales of our ancient island.",
            "Climb Sigiriya at dawn, walk through 2000-year-old ruins, and feel the whispers of kings and legends in every stone.",
            "Safari through Yala where elephants roam free, trek misty mountains, and surf world-class waves under golden sunsets.",
            "Share meals with local families, learn traditional crafts, and discover why Sri Lankans say our smiles are the warmest in the world."
          ];
          
          journeyDetailTitle.textContent = titles[index];
          journeyDetailDescription.textContent = descriptions[index];
        }
      });
    });
  }
  
  // WhatsApp booking buttons
  const whatsappButtons = document.querySelectorAll('[data-whatsapp]');
  whatsappButtons.forEach(button => {
    button.addEventListener('click', function() {
      const message = this.getAttribute('data-whatsapp');
      const encodedMessage = encodeURIComponent(message);
      window.open(`https://wa.me/94768118780?text=${encodedMessage}`, '_blank');
    });
  });
  
  // Form validation for contact form
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form elements
      const name = document.getElementById('name');
      const email = document.getElementById('email');
      const subject = document.getElementById('subject');
      const message = document.getElementById('message');
      const consent = document.getElementById('consent');
      
      // Reset errors
      const errorElements = document.querySelectorAll('.error-message');
      errorElements.forEach(el => el.textContent = '');
      
      let isValid = true;
      
      // Validate name
      if (!name.value.trim()) {
        document.getElementById('name-error').textContent = 'Name is required';
        isValid = false;
      }
      
      // Validate email
      if (!email.value.trim()) {
        document.getElementById('email-error').textContent = 'Email is required';
        isValid = false;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        document.getElementById('email-error').textContent = 'Please enter a valid email address';
        isValid = false;
      }
      
      // Validate subject
      if (!subject.value) {
        document.getElementById('subject-error').textContent = 'Please select a subject';
        isValid = false;
      }
      
      // Validate message
      if (!message.value.trim()) {
        document.getElementById('message-error').textContent = 'Message is required';
        isValid = false;
      } else if (message.value.trim().length < 10) {
        document.getElementById('message-error').textContent = 'Message must be at least 10 characters';
        isValid = false;
      }
      
      // Validate consent
      if (!consent.checked) {
        document.getElementById('consent-error').textContent = 'Please accept our communication policy';
        isValid = false;
      }
      
      // If form is valid, show success message
      if (isValid) {
        // Hide form and show success message
        contactForm.style.display = 'none';
        document.querySelector('.form-success').style.display = 'block';
        
        // Reset form after 3 seconds
        setTimeout(() => {
          contactForm.reset();
          contactForm.style.display = 'block';
          document.querySelector('.form-success').style.display = 'none';
        }, 3000);
      }
    });
  }
  
  // Newsletter form - changed to WhatsApp
  const newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Redirect to WhatsApp instead of email submission
      window.open('https://wa.me/94768118780?text=Hi! I\'d like to get updates on Sri Lanka travel deals and tips.', '_blank');
    });
  }
  
  // Lightbox for gallery images
  const galleryImages = document.querySelectorAll('.gallery-image');
  const lightbox = document.querySelector('.lightbox');
  const lightboxImg = document.querySelector('.lightbox-img');
  const lightboxClose = document.querySelector('.lightbox-close');
  const lightboxPrev = document.querySelector('.lightbox-prev');
  const lightboxNext = document.querySelector('.lightbox-next');
  const lightboxCounter = document.querySelector('.lightbox-counter');
  
  let currentImageIndex = 0;
  const images = Array.from(galleryImages).map(img => ({
    src: img.src,
    title: img.alt
  }));
  
  if (galleryImages.length > 0 && lightbox) {
    galleryImages.forEach((img, index) => {
      img.addEventListener('click', function() {
        currentImageIndex = index;
        showLightboxImage();
      });
    });
    
    if (lightboxClose) {
      lightboxClose.addEventListener('click', closeLightbox);
    }
    
    if (lightboxPrev) {
      lightboxPrev.addEventListener('click', showPrevImage);
    }
    
    if (lightboxNext) {
      lightboxNext.addEventListener('click', showNextImage);
    }
    
    // Close lightbox when clicking on backdrop
    lightbox.addEventListener('click', function(e) {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
      if (lightbox.style.display === 'flex') {
        if (e.key === 'Escape') {
          closeLightbox();
        } else if (e.key === 'ArrowLeft') {
          showPrevImage();
        } else if (e.key === 'ArrowRight') {
          showNextImage();
        }
      }
    });
  }
  
  function showLightboxImage() {
    if (!lightboxImg) return;
    
    lightboxImg.src = images[currentImageIndex].src;
    lightboxImg.alt = images[currentImageIndex].title;
    
    const titleElement = document.querySelector('.lightbox-title');
    
    if (titleElement) {
      titleElement.textContent = images[currentImageIndex].title;
    }
    
    if (lightboxCounter) {
      lightboxCounter.textContent = `${currentImageIndex + 1} / ${images.length}`;
    }
    
    lightbox.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }
  
  function closeLightbox() {
    if (lightbox) {
      lightbox.style.display = 'none';
      document.body.style.overflow = '';
    }
  }
  
  function showPrevImage() {
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    showLightboxImage();
  }
  
  function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    showLightboxImage();
  }
});

// Utility functions
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
}