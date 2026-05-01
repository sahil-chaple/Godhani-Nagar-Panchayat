// Global Application Logic
document.addEventListener('DOMContentLoaded', () => {
    console.log('Nagar Panchayat Besa Pipla SPA Initialized');

    // Smooth hover effect for side nav
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            // Subtle sound or effect could be added here
        });
    });

    // Handle Ticker Pause on Hover
    const tickerContent = document.querySelector('.ticker-content');
    if (tickerContent) {
        tickerContent.addEventListener('mouseenter', () => {
            tickerContent.style.animationPlayState = 'paused';
        });
        tickerContent.addEventListener('mouseleave', () => {
            tickerContent.style.animationPlayState = 'running';
        });
    }

    // Mobile Menu Toggle
    const menuToggle = document.getElementById('menuToggle');
    const mobileOverlay = document.getElementById('mobileOverlay');
    const mobileMenu = document.getElementById('mobileMenu');

    const toggleMenu = () => {
        menuToggle.classList.toggle('active');
        mobileOverlay.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    };

    menuToggle.addEventListener('click', toggleMenu);
    mobileOverlay.addEventListener('click', toggleMenu);

    // Close menu when a nav link is clicked
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            if (menuToggle.classList.contains('active')) {
                toggleMenu();
            }
        });
    });
});

// Helper function to load components dynamically if needed in the future
async function loadComponent(name) {
    // This could be used to fetch HTML fragments for larger routes
}
