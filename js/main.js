document.getElementById('year').textContent = new Date().getFullYear();

const navToggle = document.getElementById('navToggle');
const mainNav = document.querySelector('.main-nav');
navToggle.addEventListener('click', () => mainNav.classList.toggle('open'));
mainNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => mainNav.classList.remove('open'));
});

const themeToggle = document.getElementById('themeToggle');
const pokeGlow = document.getElementById('pokeGlow');

const POKE_COOLDOWN_MS = 2200;
let pokeOnCooldown = false;

themeToggle.addEventListener('click', () => {
  if (pokeOnCooldown) return;
  pokeOnCooldown = true;

  pokeTheFire();

  themeToggle.disabled = true;
  setTimeout(() => {
    themeToggle.disabled = false;
    pokeOnCooldown = false;
  }, POKE_COOLDOWN_MS);
});

function pokeTheFire() {
  pokeGlow.classList.remove('poking');
  requestAnimationFrame(() => pokeGlow.classList.add('poking'));

  themeToggle.classList.remove('poked');
  requestAnimationFrame(() => themeToggle.classList.add('poked'));

  spawnEmberSurge();
}

function spawnEmberSurge() {
  const count = 22;
  for (let i = 0; i < count; i++) {
    const ember = document.createElement('span');
    ember.className = 'surge-ember';
    ember.style.left = (Math.random() * 100) + 'vw';
    ember.style.setProperty('--esize', (3 + Math.random() * 4) + 'px');
    ember.style.setProperty('--rise', -(160 + Math.random() * 220) + 'px');
    ember.style.setProperty('--drift', (Math.random() * 80 - 40) + 'px');
    ember.style.setProperty('--sdur', (1.1 + Math.random() * 0.9) + 's');
    ember.style.animationDelay = (Math.random() * 0.6) + 's';
    document.body.appendChild(ember);
    setTimeout(() => ember.remove(), 2200);
  }
}

const nicknameModalBackdrop = document.getElementById('nicknameModalBackdrop');
const nicknameModalPlatform = document.getElementById('nicknameModalPlatform');
const nicknameModalNickname = document.getElementById('nicknameModalNickname');
const nicknameModalClose = document.getElementById('nicknameModalClose');

document.querySelectorAll('.nickname-link').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    nicknameModalPlatform.textContent = link.dataset.platform;
    nicknameModalNickname.textContent = link.dataset.nickname;
    openNicknameModal();
  });
});

function openNicknameModal() {
  nicknameModalBackdrop.classList.add('open');
}

function closeNicknameModal() {
  nicknameModalBackdrop.classList.remove('open');
}

nicknameModalClose.addEventListener('click', closeNicknameModal);
nicknameModalBackdrop.addEventListener('click', (e) => {
  if (e.target === nicknameModalBackdrop) closeNicknameModal();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeNicknameModal();
});

document.addEventListener('click', (e) => spawnSparks(e.clientX, e.clientY));

function spawnSparks(cx, cy) {
  const sparkColors = ['#ff6a1f', '#ffb347', '#fff2c2'];

  for (let i = 0; i < 10; i++) {
    const spark = document.createElement('span');
    spark.className = 'spark-particle';
    spark.style.background = sparkColors[i % sparkColors.length];
    spark.style.left = cx + 'px';
    spark.style.top = cy + 'px';

    const angle = Math.random() * Math.PI * 2;
    const distance = 30 + Math.random() * 50;
    spark.style.setProperty('--sx', Math.cos(angle) * distance + 'px');
    spark.style.setProperty('--sy', Math.sin(angle) * distance + 'px');

    document.body.appendChild(spark);
    spark.addEventListener('animationend', () => spark.remove());
  }
}
