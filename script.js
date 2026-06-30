const header = document.querySelector('.site-header');
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const loader = document.querySelector('.loader');
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');
const heroVisual = document.querySelector('.hero-visual');
const year = document.getElementById('year');
const revealItems = document.querySelectorAll('.reveal');
const faqItems = document.querySelectorAll('.faq-item');
const testimonialCards = document.querySelectorAll('.testimonial-card');
const dots = document.querySelectorAll('.dot');
const statValues = document.querySelectorAll('[data-count]');

if (year) {
  year.textContent = new Date().getFullYear();
}

window.addEventListener('load', () => {
  setTimeout(() => loader?.classList.add('hide'), 650);
});

window.addEventListener('scroll', () => {
  header?.classList.toggle('scrolled', window.scrollY > 20);
});

navToggle?.addEventListener('click', () => {
  const isOpen = navLinks?.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

navLinks?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle?.setAttribute('aria-expanded', 'false');
  });
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  },
  { threshold: 0.16 }
);

revealItems.forEach((item) => revealObserver.observe(item));

const countObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const target = entry.target;
      const value = Number(target.dataset.count || 0);
      const prefix = target.dataset.prefix || '';
      const suffix = target.dataset.suffix || '';
      let current = 0;
      const increment = Math.max(1, Math.ceil(value / 36));
      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          target.textContent = `${prefix}${value}${suffix}`;
          clearInterval(timer);
          return;
        }
        target.textContent = `${prefix}${current}${suffix}`;
      }, 18);
      countObserver.unobserve(target);
    });
  },
  { threshold: 0.8 }
);

statValues.forEach((value) => countObserver.observe(value));

faqItems.forEach((item) => {
  const button = item.querySelector('.faq-question');
  button?.addEventListener('click', () => {
    faqItems.forEach((entry) => {
      if (entry !== item) {
        entry.classList.remove('active');
      }
    });
    item.classList.toggle('active');
  });
});

let slideIndex = 0;
const showSlide = (index) => {
  testimonialCards.forEach((card, cardIndex) => {
    card.classList.toggle('active', cardIndex === index);
  });
  dots.forEach((dot, dotIndex) => {
    dot.classList.toggle('active', dotIndex === index);
  });
};

setInterval(() => {
  slideIndex = (slideIndex + 1) % testimonialCards.length;
  showSlide(slideIndex);
}, 5000);

dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    slideIndex = index;
    showSlide(slideIndex);
  });
});

showSlide(0);

const contactForm = document.getElementById('contact-form');
const whatsappNumber = '+91 9023970212'; // Replace with your WhatsApp number

contactForm?.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(contactForm);
  const fullName = formData.get('fullName')?.toString().trim();
  const email = formData.get('email')?.toString().trim();
  const phone = formData.get('phone')?.toString().trim();
  const company = formData.get('company')?.toString().trim();
  const budget = formData.get('budget')?.toString().trim();
  const message = formData.get('message')?.toString().trim();

  const whatsappMessage = `Hello NextGen Web,%0A%0AI have a new project inquiry.%0A%0AName: ${encodeURIComponent(fullName || '-')}` +
    `%0AEmail: ${encodeURIComponent(email || '-')}` +
    `%0APhone: ${encodeURIComponent(phone || '-')}` +
    `%0ACompany: ${encodeURIComponent(company || '-')}` +
    `%0ABudget: ${encodeURIComponent(budget || '-')}` +
    `%0AProject Details: ${encodeURIComponent(message || '-')}`;

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
  window.open(whatsappUrl, '_blank');
});

if (window.matchMedia('(hover: hover)').matches) {
  window.addEventListener('mousemove', (event) => {
    cursor.style.opacity = '1';
    cursorFollower.style.opacity = '1';
    cursor.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`;
    cursorFollower.style.transform = `translate(${event.clientX - 18}px, ${event.clientY - 18}px)`;
  });

  heroVisual?.addEventListener('mousemove', (event) => {
    const rect = heroVisual.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    const card = heroVisual.querySelector('.mockup-card');
    if (card) {
      card.style.transform = `rotateY(${x * 8}deg) rotateX(${y * -6}deg) translateY(-8px)`;
    }
  });

  heroVisual?.addEventListener('mouseleave', () => {
    const card = heroVisual.querySelector('.mockup-card');
    if (card) {
      card.style.transform = '';
    }
  });
}
