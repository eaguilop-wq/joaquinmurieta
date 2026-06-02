// ===== CURSOR =====
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');
if (cursor && ring) {
  let mx = 0, my = 0, rx = 0, ry = 0;
  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = mx + 'px'; cursor.style.top = my + 'px';
  });
  function animRing() {
    rx += (mx - rx) * .12; ry += (my - ry) * .12;
    ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
    requestAnimationFrame(animRing);
  }
  animRing();
  document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.width = '18px'; cursor.style.height = '18px';
      ring.style.width = '54px'; ring.style.height = '54px';
      ring.style.borderColor = 'rgba(224,94,0,.7)';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.width = '10px'; cursor.style.height = '10px';
      ring.style.width = '36px'; ring.style.height = '36px';
      ring.style.borderColor = 'rgba(224,94,0,.45)';
    });
  });
}

// ===== NAV SCROLL =====
const nav = document.getElementById('mainNav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  });
}

// ===== MOBILE NAV =====
const burger = document.getElementById('navBurger');
const mobileNav = document.getElementById('navMobile');
if (burger && mobileNav) {
  burger.addEventListener('click', () => {
    mobileNav.classList.toggle('open');
  });
  mobileNav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => mobileNav.classList.remove('open'));
  });
}

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function(e) {
    const t = document.querySelector(this.getAttribute('href'));
    if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); }
  });
});

// ===== REVEAL ON SCROLL =====
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: .1 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ===== YOUTUBE EMBED ON CLICK =====
document.querySelectorAll('.yt-thumb-wrapper[data-video]').forEach(wrapper => {
  wrapper.addEventListener('click', function() {
    const videoId = this.dataset.video;
    const container = document.createElement('div');
    container.className = 'yt-iframe-container';
    container.innerHTML = `<iframe src="https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen loading="lazy"></iframe>`;
    this.replaceWith(container);
  });
});

// ===== FORM SUBMIT =====
const formBtn = document.getElementById('formBtn');
if (formBtn) {
  formBtn.addEventListener('click', function() {
    this.textContent = '¡Mensaje enviado! ✓';
    this.style.background = '#6B3A9A';
    this.style.color = '#f0ede8';
    setTimeout(() => {
      this.textContent = 'Enviar consulta';
      this.style.background = '';
      this.style.color = '';
    }, 3500);
  });
}

// ===== ACTIVE NAV =====
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(a => {
  if (a.getAttribute('href') === currentPage) a.classList.add('active');
});
