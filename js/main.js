/* ============================================================
   THAIS LIMA EVENTOS — Main JavaScript
   ============================================================ */

'use strict';

/* ── PRELOADER ── */
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  setTimeout(() => {
    preloader.classList.add('hidden');
    document.body.style.overflow = '';
  }, 900);
});
document.body.style.overflow = 'hidden';

/* ── HEADER SCROLL ── */
const header = document.getElementById('header');
const handleHeaderScroll = () => {
  header.classList.toggle('scrolled', window.scrollY > 60);
};
window.addEventListener('scroll', handleHeaderScroll, { passive: true });

/* ── ACTIVE NAV LINK ── */
const navLinks  = document.querySelectorAll('.nav-link');
const sections  = document.querySelectorAll('section[id]');

const setActiveLink = () => {
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 160) {
      current = section.id;
    }
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
};
window.addEventListener('scroll', setActiveLink, { passive: true });

/* ── MOBILE NAV ── */
const navToggle = document.getElementById('navToggle');
const navMenu   = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  const isOpen = navMenu.classList.toggle('open');
  navToggle.classList.toggle('open', isOpen);
  navToggle.setAttribute('aria-expanded', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

// Close on link click
navMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', false);
    document.body.style.overflow = '';
  });
});

// Close on outside click
document.addEventListener('click', e => {
  if (navMenu.classList.contains('open') && !navMenu.contains(e.target) && !navToggle.contains(e.target)) {
    navMenu.classList.remove('open');
    navToggle.classList.remove('open');
    document.body.style.overflow = '';
  }
});

/* ── SMOOTH SCROLL ── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = header.offsetHeight + 16;
    window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
  });
});

/* ── REVEAL ON SCROLL (IntersectionObserver) ── */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
);

document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right').forEach(el => {
  revealObserver.observe(el);
});

/* ── BACK TO TOP ── */
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  backToTop.classList.toggle('visible', window.scrollY > 500);
}, { passive: true });

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ── PORTFOLIO FILTER ── */
const filterBtns     = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    portfolioItems.forEach(item => {
      const show = filter === 'all' || item.dataset.category === filter;
      item.style.transition = 'opacity .35s ease, transform .35s ease';

      if (show) {
        item.style.opacity = '0';
        item.style.transform = 'scale(.95)';
        item.classList.remove('hidden');
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          });
        });
      } else {
        item.style.opacity = '0';
        item.style.transform = 'scale(.95)';
        setTimeout(() => item.classList.add('hidden'), 350);
      }
    });
  });
});

/* ── TESTIMONIALS SLIDER ── */
(function () {
  const track     = document.getElementById('testimonialsTrack');
  const prevBtn   = document.getElementById('prevBtn');
  const nextBtn   = document.getElementById('nextBtn');
  const dotsWrap  = document.getElementById('sliderDots');
  if (!track) return;

  const cards     = track.querySelectorAll('.testimonial-card');
  let current     = 0;
  let autoTimer;

  // Build dots
  cards.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.classList.add('slider-dot');
    dot.setAttribute('aria-label', `Depoimento ${i + 1}`);
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(dot);
  });

  const dots = dotsWrap.querySelectorAll('.slider-dot');

  function getVisible() {
    const w = window.innerWidth;
    if (w >= 900) return 3;
    if (w >= 640) return 2;
    return 1;
  }

  function goTo(index) {
    const visible  = getVisible();
    const maxIndex = Math.max(0, cards.length - visible);
    current = Math.max(0, Math.min(index, maxIndex));

    const cardWidth = cards[0].offsetWidth + 24; // gap 1.5rem ≈ 24px
    track.style.transform = `translateX(-${current * cardWidth}px)`;

    dots.forEach((d, i) => d.classList.toggle('active', i === current));
    clearAuto(); startAuto();
  }

  function next() { goTo(current + 1 >= cards.length - getVisible() + 1 ? 0 : current + 1); }
  function prev() { goTo(current - 1 < 0 ? Math.max(0, cards.length - getVisible()) : current - 1); }

  nextBtn.addEventListener('click', next);
  prevBtn.addEventListener('click', prev);

  // Touch / swipe
  let startX = 0;
  track.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', e => {
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) diff > 0 ? next() : prev();
  }, { passive: true });

  // Drag (mouse)
  let mouseDown = false, mouseStartX = 0;
  track.addEventListener('mousedown', e => { mouseDown = true; mouseStartX = e.clientX; track.style.cursor = 'grabbing'; });
  track.addEventListener('mouseup', e => {
    if (!mouseDown) return;
    const diff = mouseStartX - e.clientX;
    if (Math.abs(diff) > 50) diff > 0 ? next() : prev();
    mouseDown = false; track.style.cursor = '';
  });
  track.addEventListener('mouseleave', () => { mouseDown = false; track.style.cursor = ''; });

  function startAuto() { autoTimer = setInterval(next, 5000); }
  function clearAuto()  { clearInterval(autoTimer); }

  startAuto();
  window.addEventListener('resize', () => goTo(0), { passive: true });
})();

/* ── CONTACT FORM ── */
(function () {
  const form       = document.getElementById('contactForm');
  const submitBtn  = document.getElementById('submitBtn');
  const msgEl      = document.getElementById('formMessage');
  if (!form) return;

  // Phone mask
  const phoneInput = document.getElementById('telefone');
  phoneInput.addEventListener('input', () => {
    let v = phoneInput.value.replace(/\D/g, '').slice(0, 11);
    if (v.length > 10) {
      v = v.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
    } else if (v.length > 6) {
      v = v.replace(/^(\d{2})(\d{4})(\d{0,4})$/, '($1) $2-$3');
    } else if (v.length > 2) {
      v = v.replace(/^(\d{2})(\d{0,5})$/, '($1) $2');
    } else if (v.length > 0) {
      v = `(${v}`;
    }
    phoneInput.value = v;
  });

  // Validation
  function validate() {
    const nome     = form.nome.value.trim();
    const email    = form.email.value.trim();
    const telefone = form.telefone.value.trim();
    const emailRE  = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!nome || nome.length < 2) return 'Por favor, informe seu nome completo.';
    if (!email || !emailRE.test(email)) return 'Por favor, informe um e-mail válido.';
    if (!telefone || telefone.replace(/\D/g, '').length < 10) return 'Por favor, informe um WhatsApp válido.';
    return null;
  }

  function showMsg(msg, type) {
    msgEl.textContent = msg;
    msgEl.className   = `form-message ${type}`;
  }

  form.addEventListener('submit', e => {
    e.preventDefault();
    const error = validate();
    if (error) { showMsg(error, 'error'); return; }

    // Build payload
    const nome     = form.nome.value.trim();
    const email    = form.email.value.trim();
    const telefone = form.telefone.value.trim();
    const tipo     = form.tipo.value || '—';
    const data     = form.data.value || '—';
    const mensagem = form.mensagem.value.trim() || '—';

    // Build WhatsApp message
    let waMsg = `Olá, Thais Lima! 👋\n\nMeu nome é *${nome}* e tenho interesse nos seus serviços.\n\n`;
    waMsg += `📧 E-mail: ${email}\n`;
    waMsg += `📱 WhatsApp: ${telefone}\n`;
    if (tipo !== '—') waMsg += `🎉 Tipo de evento: ${tipo}\n`;
    if (data !== '—') waMsg += `📅 Data prevista: ${data}\n`;
    if (mensagem !== '—') waMsg += `\n💬 Mensagem: ${mensagem}\n`;
    waMsg += `\nAcabei de preencher o formulário do site. Aguardo seu retorno! 😊`;

    submitBtn.disabled = true;
    submitBtn.querySelector('span').textContent = 'Redirecionando...';

    showMsg('✨ Redirecionando para o WhatsApp...', 'success');

    setTimeout(() => {
      window.open(`https://wa.me/5562982051296?text=${encodeURIComponent(waMsg)}`, '_blank');
      form.reset();
      submitBtn.disabled = false;
      submitBtn.querySelector('span').textContent = 'Enviar mensagem';
    }, 1000);
  });
})();

/* ── COUNTER ANIMATION (stats) ── */
(function () {
  const stats   = document.querySelectorAll('.stat strong');
  let animated  = false;

  const countUp = (el) => {
    const raw    = el.textContent;
    const num    = parseInt(raw.replace(/\D/g, ''), 10);
    const prefix = raw.includes('+') ? '+' : '';
    const suffix = raw.includes('%') ? '%' : '';
    const dur    = 1800;
    const start  = performance.now();

    const tick = (now) => {
      const t   = Math.min((now - start) / dur, 1);
      const ease = t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      el.textContent = `${prefix}${Math.round(ease * num)}${suffix}`;
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  const observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting && !animated) {
      animated = true;
      stats.forEach(el => countUp(el));
      observer.disconnect();
    }
  }, { threshold: .5 });

  const heroStats = document.querySelector('.hero-stats');
  if (heroStats) observer.observe(heroStats);
})();

/* ── PARALLAX HERO ── */
(function () {
  const heroImg = document.querySelector('.hero-img');
  if (!heroImg || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    heroImg.style.transform = `scale(1) translateY(${y * .25}px)`;
  }, { passive: true });
})();

/* ── IMAGE LAZY FADE-IN ── */
document.querySelectorAll('img[loading="lazy"]').forEach(img => {
  img.style.opacity = '0';
  img.style.transition = 'opacity .6s ease';
  img.addEventListener('load', () => { img.style.opacity = '1'; });
  if (img.complete) img.style.opacity = '1';
});

/* ── GALLERY CAROUSEL ── */
(function () {
  const track     = document.getElementById('galleryTrack');
  const prevBtn   = document.getElementById('galleryPrev');
  const nextBtn   = document.getElementById('galleryNext');
  const dotsWrap  = document.getElementById('galleryDots');
  const filterBtns = document.querySelectorAll('#carrosselFilters .filter-btn');
  if (!track) return;

  let allSlides   = Array.from(track.querySelectorAll('.gallery-slide'));
  let visible     = [];
  let current     = 0;
  let autoTimer;
  let isDragging  = false, dragStartX = 0, dragDelta = 0;

  function getPerPage() {
    if (window.innerWidth < 640) return 1;
    if (window.innerWidth < 1024) return 2;
    return 3;
  }

  function buildDots() {
    dotsWrap.innerHTML = '';
    const perPage = getPerPage();
    const total   = Math.ceil(visible.length / perPage);
    for (let i = 0; i < total; i++) {
      const d = document.createElement('button');
      d.className = 'gallery-dot' + (i === 0 ? ' active' : '');
      d.setAttribute('aria-label', `Slide ${i + 1}`);
      d.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(d);
    }
  }

  function updateDots() {
    const perPage = getPerPage();
    const idx     = Math.floor(current / perPage);
    dotsWrap.querySelectorAll('.gallery-dot').forEach((d, i) => {
      d.classList.toggle('active', i === idx);
    });
  }

  function goTo(slideIndex) {
    const perPage = getPerPage();
    const max     = Math.max(0, visible.length - perPage);
    current = Math.max(0, Math.min(slideIndex, max));

    // Position each slide
    visible.forEach((slide, i) => {
      slide.style.flex = `0 0 ${100 / perPage}%`;
    });

    const slideW = track.parentElement.offsetWidth / perPage;
    track.style.transform = `translateX(-${current * slideW}px)`;
    updateDots();
    clearAuto(); startAuto();
  }

  function next() {
    const perPage = getPerPage();
    const max = Math.max(0, visible.length - perPage);
    goTo(current + 1 > max ? 0 : current + 1);
  }
  function prev() {
    const perPage = getPerPage();
    const max = Math.max(0, visible.length - perPage);
    goTo(current - 1 < 0 ? max : current - 1);
  }

  function applyFilter(grupo) {
    // Hide/show slides
    allSlides.forEach(s => {
      if (grupo === 'all' || s.dataset.grupo === grupo) {
        s.classList.remove('hide-slide');
        s.style.display = '';
      } else {
        s.classList.add('hide-slide');
        s.style.display = 'none';
      }
    });
    visible = allSlides.filter(s => !s.classList.contains('hide-slide'));
    current = 0;
    track.style.transform = 'translateX(0)';
    buildDots();
    visible.forEach(s => s.style.flex = `0 0 ${100 / getPerPage()}%`);
    clearAuto(); startAuto();
  }

  // Filter buttons
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      applyFilter(btn.dataset.grupo);
    });
  });

  prevBtn.addEventListener('click', prev);
  nextBtn.addEventListener('click', next);

  // Touch swipe
  track.addEventListener('touchstart', e => { dragStartX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', e => {
    dragDelta = dragStartX - e.changedTouches[0].clientX;
    if (Math.abs(dragDelta) > 40) dragDelta > 0 ? next() : prev();
  }, { passive: true });

  // Mouse drag
  track.addEventListener('mousedown', e => { isDragging = true; dragStartX = e.clientX; track.style.cursor = 'grabbing'; });
  window.addEventListener('mouseup', e => {
    if (!isDragging) return;
    dragDelta = dragStartX - e.clientX;
    if (Math.abs(dragDelta) > 40) dragDelta > 0 ? next() : prev();
    isDragging = false; track.style.cursor = '';
  });

  function startAuto() { autoTimer = setInterval(next, 3500); }
  function clearAuto()  { clearInterval(autoTimer); }

  // Pause on hover
  track.addEventListener('mouseenter', clearAuto);
  track.addEventListener('mouseleave', startAuto);

  // Init
  applyFilter('all');
  startAuto();

  window.addEventListener('resize', () => {
    track.style.transform = 'translateX(0)';
    current = 0;
    visible.forEach(s => s.style.flex = `0 0 ${100 / getPerPage()}%`);
    buildDots();
  }, { passive: true });
})();

/* ── CURSOR GLOW (desktop) ── */
(function () {
  if (window.matchMedia('(pointer: coarse)').matches) return;

  const glow = document.createElement('div');
  glow.style.cssText = `
    position:fixed; pointer-events:none; z-index:9998;
    width:300px; height:300px; border-radius:50%;
    background: radial-gradient(circle, rgba(201,169,110,.06) 0%, transparent 70%);
    transform: translate(-50%,-50%);
    transition: left .12s ease, top .12s ease;
    will-change: left, top;
  `;
  document.body.appendChild(glow);

  document.addEventListener('mousemove', e => {
    glow.style.left = e.clientX + 'px';
    glow.style.top  = e.clientY + 'px';
  }, { passive: true });
})();
