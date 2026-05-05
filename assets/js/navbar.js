// Navbar scroll effect
const navbar = document.querySelector('.navbar');
const topBanner = document.querySelector('.top-banner');
const heroStack = document.querySelector('.hero-stack');
const topBannerHeight = topBanner ? topBanner.offsetHeight : 50;

if (document.readyState !== 'loading') {
    if (heroStack) heroStack.classList.add('animate');
} else {
    document.addEventListener('DOMContentLoaded', function () {
        if (heroStack) heroStack.classList.add('animate');
    });
}

window.addEventListener('scroll', function () {
    if (window.scrollY > topBannerHeight) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

window.addEventListener('scroll', function () {
    if (window.scrollY > topBannerHeight) {
        navbar.classList.add('scrolled');
        // Keep navbar below banner on small screens
        if (window.innerWidth < 768) {
            //navbar.style.top = topBanner ? topBanner.offsetHeight + 'px' : '0';
        }
    } else {
        navbar.classList.remove('scrolled');
        if (window.innerWidth < 768) {
           // navbar.style.top = topBanner ? topBanner.offsetHeight + 'px' : '0';
        }
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

// Search functionality
const searchBtn = document.getElementById('searchBtn');
const navLinks = document.getElementById('navLinks');
const searchBar = document.getElementById('searchBar');
const searchInput = document.getElementById('searchInput');
const searchIcon = searchBtn ? searchBtn.querySelector('i') : null;

if (searchBtn && navLinks && searchBar && searchInput && searchIcon) {
    searchBtn.addEventListener('click', function () {
        if (searchBar.style.display === 'none' || searchBar.style.display === '') {
            navLinks.style.display = 'none';
            searchBar.style.display = 'block';
            searchIcon.className = 'fas fa-times';
            searchInput.focus();
        } else {
            navLinks.style.display = 'flex';
            searchBar.style.display = 'none';
            searchIcon.className = 'fas fa-search';
            searchInput.value = '';
        }
    });

    // Handle enter key for search
    searchInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
            const query = searchInput.value.trim();
            if (query) {
                const isInPages = window.location.pathname.includes('/pages/');
                const searchPath = isInPages ? 'search.html' : 'pages/search.html';
                window.location.href = `${searchPath}?q=${encodeURIComponent(query)}`;
            }
        }
    });
}

// Cart functionality (placeholder)
const cartBtn = document.getElementById('cartBtn');
if (cartBtn) {
    cartBtn.addEventListener('click', function () {
        window.location.reload();
    });
}
