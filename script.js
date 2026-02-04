// ==========================================
// GIA SMART AI - FINAL LOGIC SCRIPT
// ==========================================

// 1. UI Elements Selection
const chatBubble = document.getElementById('gia-chat-bubble');
const chatText = document.getElementById('gia-chat-text');
const chatActions = document.getElementById('gia-chat-actions');
const trigger = document.getElementById('aura-trigger');
const voiceWaves = document.getElementById('voice-waves');
const floatingProduct = document.getElementById('floating-product');

// 2. SHOW/HIDE FEATURE LOGIC
// Ye function hidden sections ko reveal karta hai
function showFeature(id) {
    const section = document.getElementById(id);
    if (section) {
        section.classList.remove('hidden');
        section.scrollIntoView({ behavior: 'smooth' });
        
        // Chat bubble ko thodi der ke liye hide kar dete hain
        chatBubble.classList.add('hidden');
        
        // Background aura effect (Optional)
        document.body.style.backgroundColor = id === 'gia-3d-section' ? '#f8faff' : 'white';
    }
}

// 3. GIA PRO-ACTIVE CHATBOT LOGIC
// AI khud se puchega features ke baare mein
function giaInteraction() {
    chatBubble.classList.remove('hidden');
    chatText.innerHTML = "Rahul, maine is product ki deep analysis ki hai. Kya tum iski <b>Price Comparison Table</b> dekhna chahte ho? Main aapko best deals bata sakti hoon.";
    
    chatActions.innerHTML = `
        <button onclick="activateComparison()" class="bg-blue-600 text-white px-4 py-2 rounded-xl text-[11px] font-bold shadow-lg hover:scale-105 transition">Haan, Table dikhao</button>
        <button onclick="closeChat()" class="bg-gray-100 text-gray-500 px-4 py-2 rounded-xl text-[11px] hover:bg-gray-200 transition">Nahi, rehne do</button>
    `;
}

function activateComparison() {
    showFeature('gia-comparison-section');
    
    // 2 seconds baad GIA 3D ke liye puchegi
    setTimeout(() => {
        chatBubble.classList.remove('hidden');
        chatText.innerHTML = "Vaise mere paas iska <b>3D View</b> bhi hai! Kya aap ise har angle se rotate karke dekhna chahte ho?";
        
        chatActions.innerHTML = `
            <button onclick="showFeature('gia-3d-section')" class="bg-black text-white px-4 py-2 rounded-xl text-[11px] font-bold shadow-lg hover:scale-105 transition">Haan, 3D dikhao ✨</button>
            <button onclick="closeChat()" class="bg-gray-100 text-gray-500 px-4 py-2 rounded-xl text-[11px]">Baad mein</button>
        `;
    }, 2500);
}

function closeChat() {
    chatBubble.classList.add('hidden');
}

// 4. VOICE SEARCH LOGIC (SIMULATION)
const voiceBtn = document.getElementById('gia-voice-btn');
if (voiceBtn) {
    voiceBtn.addEventListener('click', () => {
        voiceWaves.classList.remove('hidden');
        // Simulate voice recognition
        setTimeout(() => {
            voiceWaves.classList.add('hidden');
            alert("GIA ne aapki awaaz sun li! Searching...");
        }, 3000);
    });
}

// 5. 3D PRODUCT FLOATING EFFECT
// Mouse move par product halka sa rotate hoga
document.addEventListener('mousemove', (e) => {
    if (floatingProduct && !document.getElementById('gia-3d-section').classList.contains('hidden')) {
        const x = (window.innerWidth / 2 - e.pageX) / 25;
        const y = (window.innerHeight / 2 - e.pageY) / 25;
        floatingProduct.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
    }
});

// 6. INITIALIZATION
// Page load hone ke 5 seconds baad AI interact karega
window.addEventListener('load', () => {
    setTimeout(giaInteraction, 5000);
});

// Aura button click par bhi interact karega
if (trigger) {
    trigger.addEventListener('click', giaInteraction);
}

// ==========================================
// CODE ENDS HERE
// ==========================================
