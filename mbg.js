// ── DARK MODE ──
const toggle = document.getElementById('darkToggle');
const body = document.body;
let dark = localStorage.getItem('mbg-dark') === 'true';
if (dark) { body.classList.add('dark'); toggle.textContent = '☀️'; }
toggle.addEventListener('click', () => {
  dark = !dark;
  body.classList.toggle('dark', dark);
  toggle.textContent = dark ? '☀️' : '🌙';
  localStorage.setItem('mbg-dark', dark);
});

// ── HAMBURGER ──
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');
hamburger.addEventListener('click', () => {
  mobileNav.classList.toggle('open');
});
function closeMobileNav() { mobileNav.classList.remove('open'); }

// ── NAVBAR SCROLL & ACTIVE LINKS ──
const navbar = document.getElementById('navbar');
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
  document.getElementById('scrollTop').classList.toggle('visible', window.scrollY > 300);
  // active link
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  navLinks.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
});

// ── FADE-IN ON SCROLL ──
const faders = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
}, { threshold: 0.12 });
faders.forEach(el => observer.observe(el));

// ── COUNTER ANIMATION ──
function animateCounter(el) {
  const target = +el.dataset.target;
  const suffix = target >= 10000 ? '+' : target >= 365 ? '' : '+';
  let cur = 0;
  const step = Math.ceil(target / 60);
  const timer = setInterval(() => {
    cur = Math.min(cur + step, target);
    el.textContent = cur.toLocaleString('id-ID') + suffix;
    if (cur >= target) clearInterval(timer);
  }, 25);
}
const statSection = document.getElementById('statistik');
const statObserver = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    document.querySelectorAll('.stat-num[data-target]').forEach(animateCounter);
    statObserver.disconnect();
  }
}, { threshold: 0.3 });
statObserver.observe(statSection);

// ── FORM SUBMIT ──
function kirimSaran() {
  const nama = document.getElementById('nama').value.trim();
  const pesan = document.getElementById('pesan').value.trim();
  if (!nama) { alert('❗ Mohon isi nama kamu terlebih dahulu.'); return; }
  if (!pesan) { alert('❗ Mohon tuliskan pesan atau saran kamu.'); return; }
  alert(`✅ Terima kasih atas sarannya, ${nama}!\n\nMasukan kamu sangat berarti untuk kemajuan program MBG. 🙏`);
  document.getElementById('nama').value = '';
  document.getElementById('email').value = '';
  document.getElementById('pesan').value = '';
}