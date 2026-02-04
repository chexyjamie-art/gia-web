document.addEventListener('DOMContentLoaded', () => {
    console.log("ALTER AI Dashboard Initialized");

    const slider = document.querySelector('.no-scrollbar');
    
    // 1. Mouse Wheel Scroll Support for Slider
    if (slider) {
        slider.addEventListener('wheel', (evt) => {
            evt.preventDefault();
            slider.scrollLeft += evt.deltaY;
        });
    }

    // 2. Buy Now Click Handler (Affiliate Tracking Base)
    const buyButtons = document.querySelectorAll('button');
    buyButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const productName = button.closest('.glass-card')?.querySelector('h3')?.innerText || "Product";
            console.log(`Redirecting to Affiliate Link for: ${productName}`);
            // Yahan aap future mein pixel tracking code daal sakte hain
        });
    });

    // 3. Simple Search Focus Animation
    const searchInput = document.querySelector('input');
    if (searchInput) {
        searchInput.addEventListener('focus', () => {
            searchInput.parentElement.style.transform = 'scale(1.02)';
            searchInput.parentElement.style.transition = '0.3s ease';
        });
        searchInput.addEventListener('blur', () => {
            searchInput.parentElement.style.transform = 'scale(1)';
        });
    }
});
