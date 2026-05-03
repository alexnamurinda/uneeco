# Uneeco Uganda - Website

Professional paper supply company website for Uneeco Uganda built with Bootstrap 5, custom CSS, and vanilla JavaScript.

## Project Structure

```
test/
├── index.html                 # Homepage with hero, products, and CTA sections
├── css/
│   └── styles.css            # All global and component styles
├── js/
│   ├── animations.js         # AOS (Animate On Scroll) initialization
│   ├── navbar.js             # Navbar scroll effects and mobile menu
│   └── scroll.js             # Back to top button and smooth scrolling
├── pages/
│   ├── products.html         # Full product catalog page
│   ├── about.html            # Company information and values
│   └── contact.html          # Contact form and business info
├── includes/
│   ├── navbar.html           # Reusable navbar component
│   └── footer.html           # Reusable footer component
└── assets/                   # Future: Images, icons, etc.
```

## Features

### 🎨 Design
- Modern, professional design with green and gold color scheme
- Fully responsive (mobile, tablet, desktop)
- Smooth animations and transitions
- AOS (Animate On Scroll) library for scroll-triggered animations

### ⚡ Functionality
- Sticky navbar with scroll detection
- Smooth scroll navigation for anchor links
- Mobile-responsive hamburger menu
- Back-to-top button (appears after scrolling 300px)
- Product showcase with hover effects
- Contact form layout
- Footer with navigation and company info

### 📁 Organization
- **Separated concerns:** HTML, CSS, and JavaScript in different files
- **Modular JavaScript:** Each functionality in its own file
- **Reusable components:** Navbar and footer include files
- **Professional structure:** Easy to maintain and scale

## File Descriptions

### HTML Files
- **index.html** - Main landing page with hero section, stats, products, why us section, CTA, and footer
- **pages/products.html** - Dedicated products page
- **pages/about.html** - Company story, mission, and values
- **pages/contact.html** - Contact information and form

### CSS
- **css/styles.css** - All styling including:
  - CSS variables for colors
  - Navbar and hero styles
  - Product cards
  - Responsive design (mobile-first)
  - Button styles
  - Footer styling

### JavaScript
- **js/animations.js** - Initializes AOS library for scroll animations
- **js/navbar.js** - Handles navbar scroll effects and mobile menu collapse
- **js/scroll.js** - Back to top button visibility and smooth scrolling for anchor links

## How to Use

### Development
1. Open `index.html` in your browser to view the site
2. All files are organized and ready to edit
3. Modify `css/styles.css` for styling changes
4. Update JavaScript files for functionality changes

### Deployment
1. Upload entire folder to your web server
2. Ensure file paths are correct if deploying to a subdirectory
3. Test all navigation links and functionality

### Customization

#### Change Colors
Edit the CSS variables in `css/styles.css`:
```css
:root {
    --green-dark: #1a3d2b;
    --green-mid: #2c6644;
    --green-light: #4a9e68;
    --gold: #b08d57;
    /* ... other colors */
}
```

#### Add New Pages
1. Create new HTML file in `pages/` folder
2. Copy the structure from existing pages
3. Update navbar links accordingly
4. Link external CSS and JS files with correct paths

#### Modify Navbar Links
Update links in index.html and all page files to add/remove navigation items

## Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with flexbox and grid
- **Bootstrap 5** - Responsive grid system
- **Font Awesome 6** - Icon library
- **AOS Library** - Scroll animations
- **Vanilla JavaScript** - No frameworks, pure JS

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Performance Optimizations

- External CSS file (faster rendering)
- Modular JavaScript files (only load what's needed)
- CDN for libraries (Bootstrap, Font Awesome, AOS)
- Responsive images and lazy loading ready
- Smooth scroll behavior

## Future Enhancements

- Add actual product images to assets folder
- Integrate contact form with backend
- Add blog section
- Implement search functionality
- Add testimonials section
- Create sitemap.xml
- Add Google Analytics

## Notes

- All links are currently pointing to sections on pages or other pages
- Contact form is static (requires backend integration to actually send)
- Update phone numbers and emails in all files with real contact info
- Replace placeholder content with actual company information

## File Paths Reference

- From `index.html` to `css/styles.css` → `css/styles.css` ✓
- From `pages/products.html` to `css/styles.css` → `../css/styles.css` ✓
- From `pages/products.html` to `index.html` → `../index.html` ✓
- From `pages/products.html` to `js/animations.js` → `../js/animations.js` ✓

---

**Version:** 1.0  
**Last Updated:** 2025  
**Status:** Production Ready ✓
