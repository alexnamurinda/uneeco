// Navbar scroll effect
const navbar = document.querySelector('.navbar');
const topBanner = document.querySelector('.top-banner');
const heroStack = document.querySelector('.hero-stack');
const topBannerHeight = topBanner ? topBanner.offsetHeight : 50;

if (document.readyState !== 'loading') {
    if (heroStack) heroStack.classList.add('animate');
} else {
    document.addEventListener('DOMContentLoaded', function() {
        if (heroStack) heroStack.classList.add('animate');
    });
}

window.addEventListener('scroll', function() {
    if (window.scrollY > topBannerHeight) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile navbar auto-close on link click
const navbarCollapse = document.getElementById('navbarNav');
if (navbarCollapse) {
    const bsCollapse = new bootstrap.Collapse(navbarCollapse, { toggle: false });
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (navbarCollapse.classList.contains('show')) {
                bsCollapse.hide();
            }
        });
    });
}
