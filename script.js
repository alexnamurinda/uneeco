/* =========================================
   UNEECO UGANDA — script.js
   ========================================= */

(function () {
  'use strict';

  /* ── 1. Navbar scroll effect ── */
  const navbar = document.getElementById('navbar');

  function onScroll() {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run on load


  /* ── 2. Mobile menu ── */
  const navToggle   = document.getElementById('navToggle');
  const mobileMenu  = document.getElementById('mobileMenu');
  const menuOverlay = document.getElementById('menuOverlay');
  const menuClose   = document.getElementById('menuClose');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  function openMenu() {
    mobileMenu.classList.add('open');
    menuOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    mobileMenu.classList.remove('open');
    menuOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (navToggle)   navToggle.addEventListener('click', openMenu);
  if (menuClose)   menuClose.addEventListener('click', closeMenu);
  if (menuOverlay) menuOverlay.addEventListener('click', closeMenu);
  mobileLinks.forEach(link => link.addEventListener('click', closeMenu));


  /* ── 3. Smooth-scroll for anchor links ── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const navH = navbar ? navbar.offsetHeight : 0;
      const top  = target.getBoundingClientRect().top + window.scrollY - navH - 16;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });


  /* ── 4. Reveal on scroll (IntersectionObserver) ── */
  const reveals = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    reveals.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback: show all immediately
    reveals.forEach(el => el.classList.add('visible'));
  }


  /* ── 5. Scrolling strip — duplicate items for seamless loop ── */
  const stripTrack = document.getElementById('stripTrack');
  if (stripTrack) {
    const original = stripTrack.innerHTML;
    // Duplicate content so the CSS animation loops seamlessly
    stripTrack.innerHTML = original + original;
  }


  /* ── 6. Animated number counter ── */
  function animateCount(el, target, suffix) {
    const duration = 1600;
    const start    = performance.now();

    function update(now) {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease out cubic
      const eased    = 1 - Math.pow(1 - progress, 3);
      const current  = Math.round(eased * target);
      el.textContent = current + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
  }

  // Target the stat numbers in the hero
  function setupCounters() {
    const stats = [
      { selector: '.hero-stat:nth-child(1) .num', target: 40, suffix: '+' },
      { selector: '.hero-stat:nth-child(2) .num', target: 130, suffix: 'k' },
      { selector: '.hero-stat:nth-child(3) .num', target: 100, suffix: '+' },
    ];

    stats.forEach(({ selector, target, suffix }) => {
      const el = document.querySelector(selector);
      if (!el) return;

      const observer = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
          animateCount(el, target, suffix);
          observer.disconnect();
        }
      }, { threshold: 0.5 });

      observer.observe(el);
    });
  }

  setupCounters();


  /* ── 7. Service card — subtle tilt on mouse move ── */
  const serviceCards = document.querySelectorAll('.service-card');

  serviceCards.forEach(card => {
    card.addEventListener('mousemove', function (e) {
      const rect = card.getBoundingClientRect();
      const x    = e.clientX - rect.left;
      const y    = e.clientY - rect.top;
      const cx   = rect.width  / 2;
      const cy   = rect.height / 2;
      const rotX = ((y - cy) / cy) * -4;
      const rotY = ((x - cx) / cx) *  4;
      card.style.transform = `perspective(600px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-6px)`;
    });

    card.addEventListener('mouseleave', function () {
      card.style.transform = '';
    });
  });


  /* ── 8. Active nav link highlight on scroll ── */
  const sections  = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-links a');

  function highlightNav() {
    const scrollY  = window.scrollY;
    const navH     = navbar ? navbar.offsetHeight : 0;

    sections.forEach(section => {
      const top    = section.offsetTop - navH - 60;
      const bottom = top + section.offsetHeight;

      if (scrollY >= top && scrollY < bottom) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + section.id) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', highlightNav, { passive: true });


  /* ── 9. CTA form — tel/email link feedback ── */
  const ctaBtns = document.querySelectorAll('.cta-box .btn');
  ctaBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      this.style.opacity = '0.7';
      setTimeout(() => (this.style.opacity = ''), 300);
    });
  });


  /* ── 10. Console credit ── */
  console.log(
    '%cUneeco Uganda\n%cBuilt with ♥ in Kampala',
    'color:#c4541a;font-family:serif;font-size:20px;font-weight:bold;',
    'color:#7a6e60;font-size:12px;'
  );

})();