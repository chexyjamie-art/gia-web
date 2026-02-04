document.addEventListener('DOMContentLoaded', () => {
    console.log("GIA Intelligence System Activated");

    // 1. Aura Mouse Tracking (Luxury Feel)
    const aura = document.querySelector('.glow-1');
    document.addEventListener('mousemove', (e) => {
        if(aura) {
            aura.style.transform = `translate(${e.clientX - 200}px, ${e.clientY - 200}px)`;
        }
    });

    // 2. Dynamic Luxury Greeting
    const updateGreeting = () => {
        const title = document.querySelector('h1');
        const hour = new Date().getHours();
        let greet = "Welcome to Elegance,";
        if (hour < 12) greet = "Good Morning,";
        else if (hour < 18) greet = "Good Afternoon,";
        else greet = "Good Evening,";
        
        if(title) {
            title.innerHTML = `${greet} <span class="premium-text">Rahul</span>`;
        }
    };

    // 3. Smooth Magnetic Effect for Cards
    const cards = document.querySelectorAll('.glass-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    updateGreeting();
});
