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

function handleVisualSearch(event) {
    const file = event.target.files[0];
    const loader = document.getElementById('gia-loader');
    
    if (file) {
        // 1. Show Loader
        loader.classList.remove('hidden');
        
        // 2. Simulate AI Processing
        setTimeout(() => {
            loader.innerHTML = `
                <div class="flex flex-col items-center gap-2">
                    <p class="text-sm font-semibold">Match Found!</p>
                    <p class="text-xs text-gray-500">I found 3 luxury watches matching your image.</p>
                </div>
            `;
            
            // 3. Auto-scroll to results (Simulated)
            const slider = document.querySelector('.no-scrollbar');
            if(slider) {
                slider.scrollIntoView({ behavior: 'smooth' });
                // Yahan naye products inject karne ka code aayega
            }
        }, 3000); // 3 seconds ka analysis time
    }
}
