// language toggle: EN <-> RU, persisted
const html = document.documentElement;
const toggle = document.getElementById('langToggle');

function setLang(lang) {
  html.setAttribute('data-lang', lang);
  html.setAttribute('lang', lang);
  localStorage.setItem('mostok-lang', lang);
  toggle.querySelectorAll('.lang-opt').forEach(el =>
    el.classList.toggle('active', el.dataset.l === lang)
  );
}

setLang(localStorage.getItem('mostok-lang') || 'en');

toggle.addEventListener('click', () =>
  setLang(html.getAttribute('data-lang') === 'en' ? 'ru' : 'en')
);

// scroll reveal
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('revealed');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

document
  .querySelectorAll('.section-head, .barrier, .service, .steps li, .production-inner, .contact-grid')
  .forEach(el => observer.observe(el));

// contact form -> mailto (no backend yet)
const form = document.getElementById('contactForm');
form.addEventListener('submit', e => {
  e.preventDefault();
  const d = new FormData(form);
  const body = encodeURIComponent(
    `Name: ${d.get('name')}\nCompany: ${d.get('company')}\nEmail: ${d.get('email')}\nBudget: ${d.get('budget')}\n\n${d.get('message')}`
  );
  document.getElementById('formNote').hidden = false;
  window.location.href = `mailto:hello@mostok.agency?subject=${encodeURIComponent('Project request — MOSTOK')}&body=${body}`;
});
