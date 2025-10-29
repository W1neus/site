// Mobile Menu Toggle - Slide from right under header
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const menuOverlay = document.getElementById('menuOverlay');
const body = document.body;

// Toggle menu function
function toggleMenu() {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    menuOverlay.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    if (mobileMenu.classList.contains('active')) {
        body.style.overflow = 'hidden';
    } else {
        body.style.overflow = '';
    }
}

// Close menu function
function closeMenu() {
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('active');
    menuOverlay.classList.remove('active');
    body.style.overflow = '';
}

// Open/close menu on burger button click
hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
});

// Close menu when clicking on overlay
menuOverlay.addEventListener('click', () => {
    closeMenu();
});

// Close menu when clicking on a mobile nav link
const mobileNavLinks = mobileMenu.querySelectorAll('.nav-link');
mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        closeMenu();
    });
});

// Also handle desktop nav links
const desktopNavLinks = document.getElementById('mainNav').querySelectorAll('.nav-link');

// Smooth scrolling for anchor links (enhanced)
const allNavLinks = [...desktopNavLinks, ...mobileNavLinks];
allNavLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = targetSection.offsetTop - headerHeight + 10;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Add scroll effect to header
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Header maintains consistent height of 80px
    if (currentScroll > 100) {
        header.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// Add animation on scroll for gallery items
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

const galleryItems = document.querySelectorAll('.gallery-item');
galleryItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(item);
});

// Initialize Leaflet Map (OpenStreetMap)
window.addEventListener('load', () => {
    // Координаты салона (легко изменяемые)
    const salonLat = 55.7558;
    const salonLon = 37.6173;
    const salonName = "Салон красоты Восторг";
    const salonAddress = "г. Москва, ул. Тверская, д. 1";

    // Инициализация карты
    const map = L.map('map').setView([salonLat, salonLon], 15);

    // Добавление tiles OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19
    }).addTo(map);

    // Добавление маркера
    L.marker([salonLat, salonLon])
        .addTo(map)
        .bindPopup(`<b>${salonName}</b><br>${salonAddress}`)
        .openPopup();
});