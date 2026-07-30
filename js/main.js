document.getElementById('year').textContent = new Date().getFullYear();

const navToggle = document.getElementById('navToggle');
const mainNav = document.querySelector('.main-nav');
navToggle.addEventListener('click', () => mainNav.classList.toggle('open'));
mainNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => mainNav.classList.remove('open'));
});

const themeToggle = document.getElementById('themeToggle');
const body = document.body;

const savedTheme = localStorage.getItem('sparks-den-theme-v8');
if (savedTheme) body.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
  const next = body.getAttribute('data-theme') === 'night' ? 'day' : 'night';
  body.setAttribute('data-theme', next);
  localStorage.setItem('sparks-den-theme-v8', next);
});
