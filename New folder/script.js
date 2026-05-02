/* ============================================================
   UNEECO Paper Products Ltd — JavaScript
   Features: Preloader, Custom Cursor, Navbar, Scroll Animations,
   Product Filter, Contact Form, Marquee Pause
   ============================================================ */

'use strict';

/* ===========================
   PRELOADER
   =========================== */
(function initPreloader() {
  const preloader = document.getElementById('preloader');
  if (!preloader) return;

  const hide = () => {
    preloader.classList.add('hidden');
    document.body.style.overflow = '';
  };

  document.body.style.overflow = 'hidden';

  if (document.readyState === 'complete') {
    setTimeout(hide, 800);
  } else {
    window.addEventListener('load', () => setTimeout(hide, 800));
  }
})();


/* ===========================
   CUSTOM CURSOR
   =========================== */
(function initCursor() {
  const cursor = document.getElementById('cursor');
  const follower = document.getElementById('cursor-follower');
  if (!cursor || !follower) return;

  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;
  let raf;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top  = mouseY + 'px';
  });

  function animateFollower() {
    followerX += (mouseX - followerX) * 0.12;
    followerY += (mouseY - followerY) * 0.12;
    follower.style.left = followerX + 'px';
    follower.style.top  = followerY + 'px';
    raf = requestAnimationFrame(animateFollower);
  }
  animateFollower();

  // Scale up on interactive elements
  const interactives = 'a, button, .filter-btn, .product-card, .fpcard, .partner-logo, .why-card, .about-card, input, select, textarea';

  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(interactives)) {
      cursor.style.transform = 'translate(-50%, -50%) scale(2.5)';
      follower.style.transform = 'translate(-50%, -50%) scale(1.4)';
      follower.style.borderColor = 'rgba(200,169,110,0.6)';
    }
  });
  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(interactives)) {
      cursor.style.transform = 'translate(-50%, -50%) scale(1)';
      follower.style.transform = 'translate(-50%, -50%) scale(1)';
      follower.style.borderColor = 'rgba(200,169,110,0.4)';
    }
  });

  // Hide on mobile
  if ('ontouchstart' in window) {
    cursor.style.display = 'none';
    follower.style.display = 'none';
  }
})();


/* ===========================
   NAVBAR — scroll + mobile
   =========================== */
(function initNavbar() {
  const navbar    = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  if (!navbar) return;

  // Scrolled state
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  // Hamburger toggle
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const open = mobileMenu.classList.toggle('open');
      hamburger.classList.toggle('open', open);
      hamburger.setAttribute('aria-expanded', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });

    // Close on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        hamburger.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }
})();


/* ===========================
   SCROLL REVEAL ANIMATIONS
   =========================== */
(function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal-up');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger delay based on sibling index
        const siblings = entry.target.closest('.products-grid, .why-grid, .about-card-grid, .values-grid, .partners-logos, .full-products-grid, .footer-grid');
        let delay = 0;
        if (siblings) {
          const index = Array.from(siblings.children).indexOf(entry.target);
          delay = Math.min(index * 80, 400);
        }
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  elements.forEach(el => observer.observe(el));
})();


/* ===========================
   HERO PARALLAX (subtle)
   =========================== */
(function initHeroParallax() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  const circles = hero.querySelectorAll('.hc');
  const badge   = hero.querySelector('.hero-badge');

  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        circles.forEach((c, i) => {
          const speed = (i + 1) * 0.04;
          c.style.transform = `translateY(${scrollY * speed}px)`;
        });
        if (badge) {
          badge.style.transform = `translateY(${scrollY * 0.02}px)`;
        }
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
})();


/* ===========================
   STATS COUNTER ANIMATION
   =========================== */
(function initCounters() {
  const stats = document.querySelectorAll('.stat strong');
  if (!stats.length) return;

  const parseTarget = (el) => {
    const text = el.textContent.trim();
    const num  = parseFloat(text);
    const suffix = text.replace(/[\d.]/g, '');
    return { num, suffix };
  };

  const animateCounter = (el, target, suffix, duration = 1600) => {
    let startTime = null;
    const easeOut = t => 1 - Math.pow(1 - t, 3);

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed  = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const current  = Math.floor(easeOut(progress) * target);
      el.textContent = current + suffix;
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target + suffix;
    };
    requestAnimationFrame(step);
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const { num, suffix } = parseTarget(el);
        if (!isNaN(num)) animateCounter(el, num, suffix);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  stats.forEach(el => observer.observe(el));
})();


/* ===========================
   MARQUEE PAUSE ON HOVER
   =========================== */
(function initMarquee() {
  const track = document.querySelector('.marquee-track');
  if (!track) return;
  const wrap = track.parentElement;
  wrap.addEventListener('mouseenter', () => track.style.animationPlayState = 'paused');
  wrap.addEventListener('mouseleave', () => track.style.animationPlayState = 'running');
})();


/* ===========================
   PRODUCT FILTER (products page)
   =========================== */
(function initProductFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards      = document.querySelectorAll('.fpcard[data-cat]');
  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      cards.forEach(card => {
        const cat = card.dataset.cat;
        const show = filter === 'all' || cat === filter || cat === 'all';

        if (show) {
          card.classList.remove('hidden');
          // Re-trigger reveal animation
          card.style.opacity = '0';
          card.style.transform = 'translateY(24px)';
          requestAnimationFrame(() => {
            setTimeout(() => {
              card.style.opacity = '';
              card.style.transform = '';
            }, 50);
          });
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
})();


/* ===========================
   CONTACT FORM
   =========================== */
(function initContactForm() {
  const form    = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');
  const submit  = form && form.querySelector('.form-submit');
  if (!form) return;

  // Live validation styling
  form.querySelectorAll('input, select, textarea').forEach(field => {
    field.addEventListener('blur', () => {
      if (field.hasAttribute('required') && !field.value.trim()) {
        field.style.borderColor = 'rgba(220, 80, 80, 0.5)';
        field.style.boxShadow   = '0 0 0 3px rgba(220, 80, 80, 0.08)';
      } else {
        field.style.borderColor = '';
        field.style.boxShadow   = '';
      }
    });
    field.addEventListener('input', () => {
      if (field.value.trim()) {
        field.style.borderColor = '';
        field.style.boxShadow   = '';
      }
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Basic validation
    let valid = true;
    form.querySelectorAll('[required]').forEach(field => {
      if (!field.value.trim()) {
        field.style.borderColor = 'rgba(220, 80, 80, 0.5)';
        field.style.boxShadow   = '0 0 0 3px rgba(220, 80, 80, 0.08)';
        valid = false;
      }
    });
    if (!valid) return;

    // Loading state
    const originalHTML = submit.innerHTML;
    submit.innerHTML = '<span>Sending…</span>';
    submit.disabled  = true;
    submit.style.opacity = '0.7';

    // Simulate send (replace with actual fetch/API call)
    setTimeout(() => {
      form.reset();
      submit.innerHTML  = originalHTML;
      submit.disabled   = false;
      submit.style.opacity = '';
      success.classList.add('show');
      success.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 1600);
  });
})();


/* ===========================
   SMOOTH ACTIVE LINK HIGHLIGHT
   =========================== */
(function initActiveLinks() {
  const links = document.querySelectorAll('.nav-links a');
  const page  = window.location.pathname.split('/').pop() || 'index.html';
  links.forEach(link => {
    const href = link.getAttribute('href');
    if (href === page) link.classList.add('active');
  });
})();


/* ===========================
   PARTNER LOGO HOVER TILT
   =========================== */
(function initLogoTilt() {
  const logos = document.querySelectorAll('.partner-logo');
  logos.forEach(logo => {
    logo.addEventListener('mousemove', (e) => {
      const rect   = logo.getBoundingClientRect();
      const x      = ((e.clientX - rect.left) / rect.width  - 0.5) * 12;
      const y      = ((e.clientY - rect.top)  / rect.height - 0.5) * -12;
      logo.style.transform = `translateY(-2px) rotateX(${y}deg) rotateY(${x}deg)`;
    });
    logo.addEventListener('mouseleave', () => {
      logo.style.transform = '';
    });
  });
})();


/* ===========================
   CARD 3D TILT (subtle)
   =========================== */
(function initCardTilt() {
  const cards = document.querySelectorAll('.why-card, .about-card, .value-card');
  const MAX   = 6;

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x    = ((e.clientX - rect.left) / rect.width  - 0.5) * MAX * 2;
      const y    = ((e.clientY - rect.top)  / rect.height - 0.5) * -MAX * 2;
      card.style.transform = `translateY(-4px) rotateX(${y}deg) rotateY(${x}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform 0.4s ease';
    });
    card.addEventListener('mouseenter', () => {
      card.style.transition = 'transform 0.1s ease, border-color 0.35s ease, box-shadow 0.35s ease';
    });
  });
})();


/* ===========================
   NAVBAR LINK UNDERLINE EFFECT
   =========================== */
(function initNavUnderline() {
  const navLinks = document.querySelector('.nav-links');
  if (!navLinks) return;

  const indicator = document.createElement('span');
  indicator.style.cssText = `
    position: absolute;
    bottom: 6px; left: 0;
    height: 2px;
    background: var(--accent);
    border-radius: 2px;
    transition: left 0.3s cubic-bezier(0.4,0,0.2,1), width 0.3s cubic-bezier(0.4,0,0.2,1), opacity 0.2s;
    opacity: 0;
    pointer-events: none;
  `;
  navLinks.style.position = 'relative';
  navLinks.appendChild(indicator);

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('mouseenter', () => {
      const rect    = link.getBoundingClientRect();
      const parent  = navLinks.getBoundingClientRect();
      indicator.style.left    = (rect.left - parent.left) + 'px';
      indicator.style.width   = rect.width + 'px';
      indicator.style.opacity = '1';
    });
  });
  navLinks.addEventListener('mouseleave', () => {
    indicator.style.opacity = '0';
  });
})();


/* ===========================
   FOOTER — animate in
   =========================== */
(function initFooterReveal() {
  const footer = document.getElementById('footer');
  if (!footer) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        footer.style.opacity = '1';
        footer.style.transform = 'translateY(0)';
        observer.unobserve(footer);
      }
    });
  }, { threshold: 0.05 });

  footer.style.cssText += 'opacity:0; transform:translateY(20px); transition: opacity 0.8s ease, transform 0.8s ease;';
  observer.observe(footer);
})();


/* ===========================
   SCROLL PROGRESS BAR
   =========================== */
(function initScrollProgress() {
  const bar = document.createElement('div');
  bar.style.cssText = `
    position: fixed; top: 0; left: 0; z-index: 9998;
    height: 2.5px;
    background: linear-gradient(90deg, var(--accent), var(--accent-light));
    width: 0%;
    transition: width 0.1s linear;
    pointer-events: none;
  `;
  document.body.appendChild(bar);

  window.addEventListener('scroll', () => {
    const docH  = document.documentElement.scrollHeight - window.innerHeight;
    const pct   = docH > 0 ? (window.scrollY / docH) * 100 : 0;
    bar.style.width = pct + '%';
  }, { passive: true });
})();


/* ===========================
   TIMELINE ANIMATE IN
   =========================== */
(function initTimeline() {
  const items = document.querySelectorAll('.tl-item');
  if (!items.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, i * 150);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  items.forEach(item => {
    item.style.cssText += 'opacity:0; transform:translateX(-20px); transition: opacity 0.6s ease, transform 0.6s ease;';
    observer.observe(item);
  });
})();


/* ===========================
   BACK TO TOP (auto-inject)
   =========================== */
(function initBackToTop() {
  const btn = document.createElement('button');
  btn.innerHTML = '↑';
  btn.setAttribute('aria-label', 'Back to top');
  btn.style.cssText = `
    position: fixed; bottom: 2rem; right: 2rem;
    width: 44px; height: 44px;
    background: var(--accent);
    color: var(--bg);
    font-size: 1.1rem;
    font-weight: 700;
    border-radius: 50%;
    border: none;
    cursor: none;
    z-index: 500;
    opacity: 0;
    transform: translateY(10px);
    transition: opacity 0.3s ease, transform 0.3s ease, background 0.2s;
    display: flex; align-items: center; justify-content: center;
    box-shadow: 0 4px 16px rgba(200,169,110,0.3);
  `;
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  btn.addEventListener('mouseenter', () => btn.style.background = 'var(--accent-light)');
  btn.addEventListener('mouseleave', () => btn.style.background = 'var(--accent)');
  document.body.appendChild(btn);

  window.addEventListener('scroll', () => {
    const show = window.scrollY > 400;
    btn.style.opacity   = show ? '1' : '0';
    btn.style.transform = show ? 'translateY(0)' : 'translateY(10px)';
    btn.style.pointerEvents = show ? '' : 'none';
  }, { passive: true });
})();
