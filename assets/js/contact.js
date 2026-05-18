
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

    const email = document.getElementById('cf-email').value.trim();
    const whatsapp = document.getElementById('cf-whatsapp').value.trim();
    const subject = document.getElementById('cf-subject').value;
    const message = document.getElementById('cf-message').value.trim();

    if (!email || !whatsapp || !subject || !message) {
        [document.getElementById('cf-email'),
         document.getElementById('cf-whatsapp'),
         document.getElementById('cf-subject'),
         document.getElementById('cf-message')].forEach(el => {
            if (!el.value.trim()) {
                el.style.borderColor = '#e05';
                el.addEventListener('input', () => el.style.borderColor = '', { once: true });
            }
        });
        return;
    }

    if (!grecaptcha.getResponse()) {
        const rc = document.querySelector('.cf-recaptcha');
        rc.style.outline = '2px solid #e05';
        rc.style.borderRadius = '8px';
        setTimeout(() => rc.style.outline = '', 2000);
        return;
    }

    const btn = form.querySelector('.cf-submit');
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending…';
    btn.disabled = true;

    const formData = new FormData();
    formData.append('email',     email);
    formData.append('whatsapp',  whatsapp);
    formData.append('subject',   subject);
    formData.append('message',   message);
    formData.append('recaptcha', grecaptcha.getResponse());

    fetch('../send-mail.php', { method: 'POST', body: formData })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                document.getElementById('formView').style.display = 'none';
                const success = document.getElementById('formSuccess');
                success.style.display = 'block';
                success.style.opacity = 0;
                requestAnimationFrame(() => {
                    success.style.transition = 'opacity 0.5s ease';
                    success.style.opacity = 1;
                });
            } else {
                btn.innerHTML = 'Send Message <i class="fas fa-arrow-right"></i>';
                btn.disabled = false;
                alert(data.message || 'Something went wrong. Please try again.');
                grecaptcha.reset();
            }
        })
        .catch(() => {
            btn.innerHTML = 'Send Message <i class="fas fa-arrow-right"></i>';
            btn.disabled = false;
            alert('Network error. Please check your connection and try again.');
            grecaptcha.reset();
        });
});

function resetForm() {
    document.getElementById('formView').style.display = 'block';
    document.getElementById('formSuccess').style.display = 'none';
    document.getElementById('contactForm').reset();
    const btn = document.querySelector('.cf-submit');
    btn.innerHTML = 'Send Message <i class="fas fa-arrow-right"></i>';
    btn.disabled = false;
}