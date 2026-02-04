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

// GIA 3D Product Interaction Logic
const product = document.getElementById('floating-product');
const container = document.getElementById('product-3d-container');

if (container && product) {
    container.addEventListener('mousemove', (e) => {
        const rect = container.getBoundingClientRect();
        const x = e.clientX - rect.left; // position inside element
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // Calculate rotation based on mouse position
        const rotateX = (y - centerY) / 10; 
        const rotateY = (centerX - x) / 10;
        
        product.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.1)`;
        product.style.animation = 'none'; // Stop floating during interaction
    });

    container.addEventListener('mouseleave', () => {
        product.style.transform = `rotateX(0deg) rotateY(0deg) scale(1)`;
        product.style.animation = 'float 4s ease-in-out infinite';
    });
}

const auraTrigger = document.getElementById('aura-trigger');
const auraWindow = document.getElementById('aura-window');
const closeAura = document.getElementById('close-aura');
const auraOverlay = document.getElementById('aura-overlay');

if (auraTrigger) {
    auraTrigger.addEventListener('click', () => {
        auraWindow.classList.toggle('hidden');
        auraOverlay.classList.toggle('active');
        document.body.classList.toggle('aura-active');
        
        // Shock Factor: Haptic feedback if on mobile
        if (navigator.vibrate) navigator.vibrate(50);
    });
}

if (closeAura) {
    closeAura.addEventListener('click', () => {
        auraWindow.classList.add('hidden');
        auraOverlay.classList.remove('active');
        document.body.classList.remove('aura-active');
    });
}

// Simple Chat Logic
const auraInput = document.getElementById('aura-input');
const auraMessages = document.getElementById('aura-messages');

if (auraInput) {
    auraInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && auraInput.value.trim() !== "") {
            const userMsg = auraInput.value;
            // Add User Message
            auraMessages.innerHTML += `<div class="bg-black text-white p-4 rounded-2xl rounded-tr-none text-sm ml-auto w-fit max-w-[80%]">${userMsg}</div>`;
            auraInput.value = "";
            
            // Fake AI Response with logic
            setTimeout(() => {
                auraMessages.innerHTML += `<div class="bg-gold-50/50 border border-gold-200 p-4 rounded-2xl rounded-tl-none text-sm w-fit max-w-[80%]">Analyzing your request... I suggest exploring the 3D Signature Collection for a unique look.</div>`;
                auraMessages.scrollTop = auraMessages.scrollHeight;
            }, 1000);
        }
    });
}

// GIA AI Voice Search Logic
const voiceBtn = document.getElementById('gia-voice-btn');
const searchInput = document.getElementById('gia-search-input');
const waves = document.getElementById('voice-waves');

if (voiceBtn && 'webkitSpeechRecognition' in window) {
    const recognition = new webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US'; // Aap 'hi-IN' bhi kar sakte hain Hindi ke liye

    voiceBtn.addEventListener('click', () => {
        recognition.start();
        waves.classList.remove('hidden'); // Waves dikhao
        voiceBtn.innerHTML = "🔴"; // Mic color change
    });

    recognition.onresult = (event) => {
        const text = event.results[0][0].transcript;
        searchInput.value = text; // Search bar mein voice text daal do
        waves.classList.add('hidden');
        voiceBtn.innerHTML = "🎤";
        
        // AI Reaction (Shocking factor)
        console.log("GIA heard: " + text);
        // Aap yahan automatic search trigger kar sakte hain
    };

    recognition.onerror = () => {
        waves.classList.add('hidden');
        voiceBtn.innerHTML = "🎤";
    };

    recognition.onend = () => {
        waves.classList.add('hidden');
        voiceBtn.innerHTML = "🎤";
    };
}


