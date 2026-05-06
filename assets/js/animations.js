// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 800,
        once: true,
        offset: 80,
        easing: 'ease-out-cubic'
    });

    // Partner dissolve rotator — cycles .partner-slide and .partner-img as one sequence
    document.querySelectorAll('.partner-sheet').forEach(function(sheet, sheetIdx) {
        var slides = Array.from(sheet.querySelectorAll('.partner-slide, .partner-img'));
        if (!slides.length) return;
        var current = slides.findIndex(function(s) {
            return s.classList.contains('active');
        });
        if (current < 0) current = 0;

        setInterval(function() {
            slides[current].classList.remove('active');
            current = (current + 1) % slides.length;
            slides[current].classList.add('active');
        }, 3500 + sheetIdx * 1200);
    });
});
