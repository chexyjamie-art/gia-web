// ==========================================
// GIA SMART AI - PURE AI ENGINE (NO STATIC)
// ==========================================

// 1. UI Elements Selection
const chatBubble = document.getElementById('gia-chat-bubble');
const chatText = document.getElementById('gia-chat-text');
const searchInput = document.getElementById('gia-search-input');
const trigger = document.getElementById('aura-trigger');

// 2. REAL GEMINI AI CONFIGURATION
const GEMINI_API_KEY = "AIzaSyBooGwe97LGLxzaDBzr0txng2_sHfFfhdI"; 

async function askRealGiaAI(userQuery, isGreeting = false) {
    if (chatBubble) chatBubble.classList.remove('hidden');
    if (chatText) chatText.innerHTML = "<span class='animate-pulse text-[#BF953F]'>GIA soch rahi hai...</span>";

    // PURE AI PROMPT: Yahan hum GIA ko uska personality de rahe hain
    const prompt = `
        System: Tera naam GIA hai. Tu Rahul ki ek real-life best friend aur Luxury Stylist hai. 
        Context: ${isGreeting ? "User ne abhi app khola hai, use welcome kar." : "User ne ye pucha: " + userQuery}
        
        Instructions:
        - KISI BHI PURANE SAVED SPEECH KA USE MAT KARNA.
        - Ekdum real-time insaan ki tarah baat kar (Hinglish/Desi touch).
        - Styling advice do aur pucho ki ye gift hai ya personal use ke liye.
        - Response limit: 2-3 lines max.
    `;

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
        });

        const data = await response.json();
        const giaSpeech = data.candidates[0].content.parts[0].text;

        // Display Real AI Voice
        if (chatText) chatText.innerText = giaSpeech;

        // Voice output
        const utterance = new SpeechSynthesisUtterance(giaSpeech);
        utterance.lang = 'hi-IN';
        window.speechSynthesis.speak(utterance);

    } catch (error) {
        console.error("GIA AI Error:", error);
        if (chatText) chatText.innerText = "Bhai, net thoda slow hai, par tera style hamesha on top hai!";
    }
}

// 3. COMBO ENGINE (Data Preserved)
const comboEngine = {
    "sunscreen": { name: "Sun-Protection Kit", items: [{n:"Sunscreen",p:599},{n:"Face Wash",p:349}], score: "9.7" },
    "jeans": { name: "Weekend Urban Look", items: [{n:"Denim",p:2499},{n:"T-Shirt",p:799}], score: "9.9" },
    "shirt": { name: "Semi-Formal Ensemble", items: [{n:"Linen Shirt",p:2499},{n:"Chinos",p:2999}], score: "9.8" }
};

// 4. DYNAMIC COMBO GENERATOR
function generateInstantCombo(keyword) {
    const container = document.getElementById('combo-items-container');
    if (!container) return;
    const key = keyword.toLowerCase();
    let combo = key.includes("shirt") ? comboEngine.shirt : (key.includes("jeans") ? comboEngine.jeans : comboEngine.sunscreen);

    container.innerHTML = `<div class="animate-pulse text-[#BF953F] font-bold text-xs italic">GIA is styling...</div>`;
    setTimeout(() => {
        container.innerHTML = "";
        let total = 0;
        combo.items.forEach(item => {
            container.innerHTML += `
                <div class="w-24 h-32 bg-white rounded-[1.5rem] p-3 shadow-sm flex flex-col items-center justify-center">
                    <p class="text-[7px] font-bold text-black uppercase">${item.n}</p>
                    <p class="text-[9px] text-[#BF953F] font-black">₹${item.p}</p>
                </div>`;
            total += item.p;
        });
        document.getElementById('combo-name').innerText = combo.name;
        document.getElementById('combo-total').innerText = `₹${total.toLocaleString()}`;
    }, 1500);
}

// 5. EVENT LISTENERS (REAL TRIGGERS)
if (trigger) trigger.addEventListener('click', () => askRealGiaAI("", true));

if (searchInput) {
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            askRealGiaAI(e.target.value);
            generateInstantCombo(e.target.value);
        }
    });
}

// 6. SYNC LAB & RITUALS (Integrated)
document.addEventListener('click', (e) => {
    if (e.target.closest('.sync-lab-btn') || e.target.innerText.includes('Claim')) {
        alert("GIA: Bhai, fitting check ho rahi hai. Ye outfit tere liye reserve kar diya hai!");
    }
    if (e.target.closest('.start-rituals-btn')) {
        askRealGiaAI("Mere daily rituals start karo");
    }
});

// LEGAL DISCLAIMER
window.addEventListener('load', () => {
    const disclaimer = document.createElement('div');
    disclaimer.style = "text-align:center; font-size:10px; color:gray; margin: 30px 0; padding:10px; width:100%;";
    disclaimer.innerHTML = "© 2026 ALTER PROJECT | LEGAL DISCLAIMER: AI-generated styling advice. All product data is property of respective brands.";
    document.body.appendChild(disclaimer);
});
