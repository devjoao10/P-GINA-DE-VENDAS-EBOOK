const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-menu a');
const faqItems = document.querySelectorAll('.faq-item');
const revealItems = document.querySelectorAll('.reveal');
const floatingCTA = document.querySelector('.floating-cta');
const footer = document.querySelector('.site-footer');

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('is-open');
    menuToggle.classList.toggle('active', isOpen);
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    mobileMenu.style.display = isOpen ? 'block' : 'none';
  });

  mobileLinks.forEach((link) => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('is-open');
      mobileMenu.style.display = 'none';
      menuToggle.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

faqItems.forEach((item, index) => {
  const button = item.querySelector('.faq-question');
  const answer = item.querySelector('.faq-answer');

  if (!button || !answer) return;

  if (item.classList.contains('active') && index === 0) {
    answer.style.maxHeight = `${answer.scrollHeight}px`;
  }

  button.addEventListener('click', () => {
    const isActive = item.classList.contains('active');

    faqItems.forEach((faq) => {
      faq.classList.remove('active');
      const faqAnswer = faq.querySelector('.faq-answer');
      if (faqAnswer) faqAnswer.style.maxHeight = null;
    });

    if (!isActive) {
      item.classList.add('active');
      answer.style.maxHeight = `${answer.scrollHeight}px`;
    }
  });
});

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealItems.forEach((item) => revealObserver.observe(item));
}
else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

if (floatingCTA && footer && 'IntersectionObserver' in window) {
  const footerObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        floatingCTA.classList.add('hidden');
      } else {
        floatingCTA.classList.remove('hidden');
      }
    });
  }, {
    threshold: 0.2
  });

  footerObserver.observe(footer);
}

window.addEventListener('resize', () => {
  if (window.innerWidth > 1100 && mobileMenu) {
    mobileMenu.style.display = 'none';
    mobileMenu.classList.remove('is-open');
    menuToggle?.classList.remove('active');
    menuToggle?.setAttribute('aria-expanded', 'false');
  }

  document.querySelectorAll('.faq-item.active .faq-answer').forEach((answer) => {
    answer.style.maxHeight = `${answer.scrollHeight}px`;
  });
});
