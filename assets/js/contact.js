
// ── AOS Init ──
AOS.init({ once: true, offset: 60, easing: 'ease-out-quad' });

// ── Navbar scroll shadow ──
const navbar = document.getElementById('mainNavbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// ── Back to top ──
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
    backToTop.classList.toggle('active', window.scrollY > 300);
});
backToTop.addEventListener('click', e => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ── Hours badge: show/hide based on current time ──
(function () {
    const badge = document.querySelector('.hours-badge');
    if (!badge) return;
    const now = new Date();
    const day = now.getDay();   // 0 Sun, 6 Sat
    const hour = now.getHours();
    const min = now.getMinutes();
    const t = hour + min / 60;

    let isOpen = false;
    if (day >= 1 && day <= 5 && t >= 8 && t < 18) isOpen = true;  // Mon–Fri 8–18
    if (day === 6 && t >= 9 && t < 14) isOpen = true;              // Sat 9–14

    if (!isOpen) {
        badge.textContent = 'Closed';
        badge.style.background = 'rgba(255,80,80,0.15)';
        badge.style.color = '#ff7070';
        badge.style.borderColor = 'rgba(255,80,80,0.25)';
    }
})();

// ── Contact Form submit ──
const form = document.getElementById('contactForm');
form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Basic required field validation
    const name = document.getElementById('cf-name').value.trim();
    const email = document.getElementById('cf-email').value.trim();
    const subject = document.getElementById('cf-subject').value;
    const message = document.getElementById('cf-message').value.trim();
    const consent = document.getElementById('cf-consent').checked;

    if (!name || !email || !subject || !message || !consent) {
        // Highlight empty required fields
        [document.getElementById('cf-name'),
        document.getElementById('cf-email'),
        document.getElementById('cf-subject'),
        document.getElementById('cf-message')].forEach(el => {
            if (!el.value.trim()) {
                el.style.borderColor = '#e05';
                el.addEventListener('input', () => el.style.borderColor = '', { once: true });
            }
        });
        if (!consent) {
            document.getElementById('cf-consent').style.outline = '2px solid #e05';
        }
        return;
    }

    // Simulate submission (replace with real fetch/API call)
    const btn = form.querySelector('.cf-submit');
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending…';
    btn.disabled = true;

    setTimeout(() => {
        document.getElementById('formView').style.display = 'none';
        const success = document.getElementById('formSuccess');
        success.style.display = 'block';
        success.style.opacity = 0;
        requestAnimationFrame(() => {
            success.style.transition = 'opacity 0.5s ease';
            success.style.opacity = 1;
        });
    }, 1400);
});

function resetForm() {
    document.getElementById('formView').style.display = 'block';
    document.getElementById('formSuccess').style.display = 'none';
    document.getElementById('contactForm').reset();
    const btn = document.querySelector('.cf-submit');
    btn.innerHTML = 'Send Message <i class="fas fa-arrow-right"></i>';
    btn.disabled = false;
}