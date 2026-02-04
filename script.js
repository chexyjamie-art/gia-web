document.addEventListener('DOMContentLoaded', () => {
    console.log("GIA AI Dashboard Loaded");

    // Click effect on cards
    const cards = document.querySelectorAll('.glass-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0px)';
        });
    });

    // Simple Search Alert (For Demo)
    const searchInput = document.querySelector('input');
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            alert('GIA AI is searching for: ' + searchInput.value);
        }
    });
});
