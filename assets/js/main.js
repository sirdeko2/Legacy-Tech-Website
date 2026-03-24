/* ============================================================
   LEGACY TECH CONSULTANCY — SHARED JAVASCRIPT
   ============================================================ */

// ── Fade-up on scroll ────────────────────────────────────────
const observer = new IntersectionObserver((entries) => {
  entries.forEach(el => {
    if (el.isIntersecting) { el.target.classList.add('visible'); }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// ── Mobile menu ──────────────────────────────────────────────
function toggleMenu() {
  const nav = document.querySelector('.nav-links');
  if (nav.style.display === 'flex') {
    nav.style.display = 'none';
  } else {
    nav.style.cssText = 'display:flex;flex-direction:column;position:fixed;top:70px;left:0;right:0;background:rgba(27,42,74,0.98);padding:24px;gap:20px;z-index:998;';
  }
}

// ── Nav shadow on scroll ─────────────────────────────────────
window.addEventListener('scroll', () => {
  const nav = document.querySelector('nav');
  if (nav) nav.style.boxShadow = window.scrollY > 40 ? '0 4px 24px rgba(0,0,0,0.3)' : 'none';
});

// ── Active nav link ──────────────────────────────────────────
(function() {
  const links = document.querySelectorAll('.nav-links a');
  const current = window.location.pathname.split('/').pop() || 'index.html';
  links.forEach(link => {
    const href = link.getAttribute('href');
    if (href === current) link.classList.add('active');
  });
})();

// ── Contact form — Formspree ─────────────────────────────────
async function handleSubmit(e) {
  e.preventDefault();
  const form    = e.target;
  const btn     = document.getElementById('submitBtn');
  const success = document.getElementById('successMsg');
  const error   = document.getElementById('errorMsg');

  btn.textContent = 'Sending…';
  btn.disabled = true;

  try {
    const res = await fetch('https://formspree.io/f/myknrole', {
      method: 'POST',
      headers: { 'Accept': 'application/json' },
      body: new FormData(form)
    });

    if (res.ok) {
      form.reset();
      btn.style.display = 'none';
      if (success) success.style.display = 'block';
    } else {
      btn.textContent = 'Send Message →';
      btn.disabled = false;
      if (error) error.style.display = 'block';
    }
  } catch (err) {
    btn.textContent = 'Send Message →';
    btn.disabled = false;
    if (error) error.style.display = 'block';
  }
}
