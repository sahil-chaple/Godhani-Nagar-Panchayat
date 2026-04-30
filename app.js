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
    tickerContent.addEventListener('mouseenter', () => {
        tickerContent.style.animationPlayState = 'paused';
    });
    tickerContent.addEventListener('mouseleave', () => {
        tickerContent.style.animationPlayState = 'running';
    });
});

// Helper function to load components dynamically if needed in the future
async function loadComponent(name) {
    // This could be used to fetch HTML fragments for larger routes
}
