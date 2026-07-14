// ============================
// NAV: scroll state + mobile toggle
// ============================
const nav = document.getElementById('nav');
const burger = document.getElementById('navBurger');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

burger.addEventListener('click', () => {
  nav.classList.toggle('open');
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => nav.classList.remove('open'));
});

// ============================
// Custom cursor dot (desktop only)
// ============================
const cursorDot = document.getElementById('cursorDot');
if (matchMedia('(hover: hover) and (pointer: fine)').matches) {
  window.addEventListener('mousemove', (e) => {
    cursorDot.style.left = e.clientX + 'px';
    cursorDot.style.top = e.clientY + 'px';
  });
}

// ============================
// Scroll reveal
// ============================
const revealTargets = document.querySelectorAll(
  '.section-head, .about-text, .about-facts, .skill-block, .project-card, .cert-card, .timeline-item, .contact-inner'
);
revealTargets.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealTargets.forEach(el => observer.observe(el));

// ============================
// Terminal typing effect
// ============================
const typedLine = document.getElementById('typedLine');
if (typedLine) {
  const fullText = typedLine.textContent;
  typedLine.textContent = '';
  let i = 0;
  const type = () => {
    if (i <= fullText.length) {
      typedLine.textContent = fullText.slice(0, i);
      i++;
      setTimeout(type, 22);
    }
  };
  setTimeout(type, 500);
}

// ============================
// Smooth-scroll for in-page anchors (fallback / offset correction)
// ============================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId.length > 1) {
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.scrollY - 70;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }
  });
});
