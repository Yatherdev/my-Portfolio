document.addEventListener('DOMContentLoaded', () => {
  // Initialize AOS with error handling
  if (typeof AOS !== 'undefined') {
    AOS.init({ duration: 700, once: true, offset: 80 });
  } else {
    console.error('AOS library is not loaded. Please check the script inclusion in HTML.');
  }

  // Navigation buttons
  const navBtns = document.querySelectorAll('.nav-btn, .more-about');
  const sections = document.querySelectorAll('.section');

  if (navBtns.length === 0) {
    console.warn('No navigation buttons found.');
  }

  function setActive(id) {
    navBtns.forEach(b => {
      const active = b.dataset.target === id;
      b.classList.toggle('active', active);
      b.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
  }

  function scrollToId(id) {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActive(id);
    } else {
      console.error('Element with id "' + id + '" not found for navigation.');
    }
  }

  navBtns.forEach(b => {
    if (b.dataset.target) {
      b.addEventListener('click', () => scrollToId(b.dataset.target));
    } else {
      console.warn('Navigation button missing data-target attribute:', b);
    }
  });

  // Download CV button
  const cvDownloadBtn = document.getElementById('cv-download-btn');
  if (cvDownloadBtn) {
    cvDownloadBtn.addEventListener('click', (e) => {
      e.preventDefault(); // Prevent immediate navigation
      cvDownloadBtn.classList.add('active'); // Add class for animation
      setTimeout(() => {
        cvDownloadBtn.classList.remove('active'); // Remove class after animation
        window.open(cvDownloadBtn.href, '_blank'); // Open PDF in new tab
      }, 500); // Match animation duration (0.5s)
    });
  } else {
    console.warn('Download CV button not found in DOM.');
  }

  // Typing effect for About
  const typingTarget = document.getElementById('aboutTyping');
  if (typingTarget) {
    const fullIntro = "I am a passionate Flutter developer with a love for coding.";
    let ti = 0;
    function typeIntro() {
      if (ti < fullIntro.length) {
        typingTarget.textContent += fullIntro[ti++];
        setTimeout(typeIntro, 50);
      }
    }
    try {
      setTimeout(typeIntro, 500);
    } catch (e) {
      console.error('Typing effect failed:', e);
    }
  } else {
    console.warn('Typing target (aboutTyping) not found in DOM.');
  }

  // Handle "See More" button for About section
  const aboutContent = document.getElementById('aboutContent');
  const seeMoreBtn = document.getElementById('seeMoreBtn');
  if (aboutContent && seeMoreBtn) {
    aboutContent.style.overflow = 'hidden';
    aboutContent.style.maxHeight = '400px';
    if (aboutContent.scrollHeight > aboutContent.clientHeight) {
      seeMoreBtn.style.display = 'block';
      seeMoreBtn.addEventListener('click', () => {
        aboutContent.style.maxHeight = 'none';
        aboutContent.style.overflow = 'visible';
        aboutContent.classList.add('expanded');
        seeMoreBtn.style.display = 'none';
      });
    } else {
      seeMoreBtn.style.display = 'none';
    }
  } else {
    console.warn('About content or See More button not found in DOM.');
  }

  // Handle "See More" buttons for Education section
  ['academicContent', 'coursesContent'].forEach(id => {
    const content = document.getElementById(id);
    const seeMoreBtn = document.getElementById(id.replace('Content', 'SeeMore'));
    if (content && seeMoreBtn) {
      content.style.overflow = 'hidden';
      content.style.maxHeight = '200px';
      if (content.scrollHeight > content.clientHeight) {
        seeMoreBtn.style.display = 'block';
        seeMoreBtn.addEventListener('click', () => {
          const card = seeMoreBtn.closest('.edu-card');
          card.classList.add('expanded');
          content.style.maxHeight = 'none';
          content.style.overflow = 'visible';
          seeMoreBtn.style.display = 'none';
        });
      } else {
        seeMoreBtn.style.display = 'none';
      }
    } else {
    }
  });

  // Image error handling
  const profileImg = document.getElementById('profileImg');
  if (profileImg) {
    profileImg.addEventListener('error', () => {
      profileImg.style.display = 'none';
      const placeholder = document.createElement('div');
      placeholder.textContent = 'Image not found. Add mypic.jpg to assets/';
      placeholder.style.color = '#ccc';
      profileImg.parentNode.appendChild(placeholder);
      console.warn('Profile image failed to load');
    });
  } else {
    console.warn('Profile image element not found in DOM.');
  }

  // Project image loading with better error handling
  ['proj1', 'proj2'].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      const img = new Image();
      img.src = 'assets/' + id + '.jpg';
      img.onload = () => {
        el.innerHTML = '<img src="' + img.src + '" alt="' + id + '" style="width: 100%; height: 100%; object-fit: cover; border-radius: 8px;">';
      };
      img.onerror = () => {
        el.textContent = 'Image ' + id + '.jpg not found. Add it to assets/';
        el.style.color = '#ccc';
        console.warn('Project image ' + id + '.jpg failed to load');
      };
    } else {
      console.warn('Project image container ' + id + ' not found in DOM.');
    }
  });

  // Contact form handling
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = {
        name: contactForm.name.value,
        email: contactForm.email.value,
        message: contactForm.message.value
      };
      console.log('Form submitted:', formData);
    });
  } else {
    console.warn('Contact form not found in DOM.');
  }

  const openMail = document.getElementById('openMail');
  if (openMail) {
    openMail.addEventListener('click', () => {
      window.location.href = 'mailto:Yather.dev@gmail.com';
    });
  } else {
    console.warn('Open mail button not found in DOM.');
  }

  // Set current year in footer
  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  } else {
    console.warn('Year span in footer not found in DOM.');
  }
});