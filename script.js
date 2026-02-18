// Mobile navigation toggle
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  navToggle.classList.toggle('active');
});

// Close mobile nav when a link is clicked
navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.classList.remove('active');
  });
});

// Scroll-based fade-in animations
const observerOptions = {
  threshold: 0.15,
  rootMargin: '0px 0px -40px 0px',
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

document
  .querySelectorAll(
    '.about-content, .skill-card, .project-card, .timeline-item, .edu-card, ' +
      '.contact-card, .contact-intro, .case-study-card, .process-step, ' +
      '.section-subtitle, .pricing-card, .intake-form, .hero-call-benefits, ' +
      '.hero-credibility, .contact-or',
  )
  .forEach((el) => {
    el.classList.add('fade-in');
    observer.observe(el);
  });

// Active nav link highlighting on scroll
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY + 100;

  sections.forEach((section) => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    const link = document.querySelector(`.nav-links a[href="#${id}"]`);

    if (link) {
      if (scrollY >= top && scrollY < top + height) {
        link.style.color = 'var(--text-primary)';
      } else {
        link.style.color = '';
      }
    }
  });
});

// Intake form — mailto handler
const intakeForm = document.getElementById('intake-form');
if (intakeForm) {
  intakeForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('intake-name').value.trim();
    const org = document.getElementById('intake-org').value.trim();
    const email = document.getElementById('intake-email').value.trim();
    const goal = document.getElementById('intake-goal').value.trim();

    if (!name || !org || !email || !goal) return;

    const subject = encodeURIComponent(`AI Consultation Request — ${org}`);
    const body = encodeURIComponent(
      `Hi Niv,\n\nI'd like to book a free AI efficiency consultation.\n\n` +
        `Name: ${name}\n` +
        `Organization: ${org}\n` +
        `Email: ${email}\n\n` +
        `What I'm trying to improve:\n${goal}\n\n` +
        `Looking forward to connecting!`,
    );

    window.location.href = `mailto:ncaduri@gmail.com?subject=${subject}&body=${body}`;
  });
}
