// ==========================================
// GIA SMART AI - FULL INTEGRATED MASTER VERSION
// ==========================================

// 1. UI Elements & Memory (RAHUL'S CONTEXT)
const chatBubble = document.getElementById('gia-chat-bubble');
const chatText = document.getElementById('gia-chat-text');
const searchInput = document.getElementById('gia-search-input');
const trigger = document.getElementById('aura-trigger');

const userContext = { name: "Rahul", viewedProducts: 0, lastActions: [] };

// ---------------------------------------------------------
// REAL GEMINI AI CONFIGURATION (LIVE BRAIN)
// ---------------------------------------------------------
const GEMINI_API_KEY = "AIzaSyBooGwe97LGLxzaDBzr0txng2_sHFffhdI"; 

async function askRealGiaAI(userQuery) {
    if (chatText) chatText.innerHTML = "<span class='animate-pulse text-[#BF953F]'>GIA soch rahi hai...</span>";
    if (chatBubble) chatBubble.classList.remove('hidden');

    const prompt = `System: Tera naam GIA hai. Tu Rahul ki ek sacchi dost aur Luxury Stylist hai. User Query: "${userQuery}". Response Desi touch mein 3 lines max.`;

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
        });
        const data = await response.json();
        const giaSpeech = data.candidates[0].content.parts[0].text;
        chatText.innerText = giaSpeech;

        const utterance = new SpeechSynthesisUtterance(giaSpeech);
        utterance.lang = 'hi-IN';
        window.speechSynthesis.speak(utterance);
    } catch (e) { chatText.innerText = "Bhai, network issue hai!"; }
}

// ---------------------------------------------------------
// 2. DETAILED COMBO ENGINE (ALL PRODUCTS PRESERVED)
// ---------------------------------------------------------
const comboEngine = {
    "sunscreen": {
        name: "Complete Sun-Protection Kit",
        items: [
            { n: "Sunscreen", i: "sunscreen.png", p: 599 },
            { n: "Face Wash", i: "facewash.png", p: 349 },
            { n: "Serum", i: "serum.png", p: 899 }
        ],
        reason: "Ye combination sun damage repair aur skin hydration ke liye best hai.",
        score: "9.7"
    },
    "jeans": {
        name: "Weekend Urban Look",
        items: [
            { n: "Denim Jeans", i: "jeans.png", p: 2499 },
            { n: "White T-Shirt", i: "tshirt.png", p: 799 },
            { n: "Sneakers", i: "shoes.png", p: 3999 }
        ],
        reason: "Light wash denim ke sath white contrast ek classic vibe deta hai.",
        score: "9.9"
    },
    "shirt": {
        name: "Semi-Formal Ensemble",
        items: [
            { n: "Linen Shirt", i: "shirt.png", p: 2499 },
            { n: "Beige Chinos", i: "pants.png", p: 2999 },
            { n: "Loafers", i: "shoes.png", p: 3500 }
        ],
        reason: "Linen texture works perfectly with matte chinos.",
        score: "9.8"
    }
};

// ---------------------------------------------------------
// 3. MASTER LOGIC (COMBO + MODAL + SPEECH)
// ---------------------------------------------------------

function generateInstantCombo(keyword) {
    const container = document.getElementById('combo-items-container');
    if (!container) return;
    const key = keyword.toLowerCase();
    
    let combo = comboEngine.sunscreen; // Default
    if (key.includes("shirt")) combo = comboEngine.shirt;
    if (key.includes("jeans") || key.includes("denim")) combo = comboEngine.jeans;

    container.innerHTML = `<div class="animate-pulse text-[#BF953F] font-bold">GIA is styling...</div>`;

    setTimeout(() => {
        container.innerHTML = "";
        let total = 0;
        combo.items.forEach(item => {
            container.innerHTML += `
                <div class="w-24 h-32 bg-white rounded-2xl p-3 shadow-sm flex flex-col items-center">
                    <img src="${item.i}" class="w-12 h-12 object-contain mb-1">
                    <p class="text-[7px] font-bold text-black uppercase">${item.n}</p>
                    <p class="text-[9px] text-[#BF953F] font-black">₹${item.p}</p>
                </div>`;
            total += item.p;
        });
        document.getElementById('combo-name').innerText = combo.name;
        document.getElementById('combo-reasoning').innerText = combo.reason;
        document.getElementById('combo-total').innerText = `₹${total.toLocaleString()}`;
    }, 1200);
}

function handleCommand(command) {
    askRealGiaAI(command); // Gemini Speaks
    generateInstantCombo(command); // UI Updates
}

// ---------------------------------------------------------
// 4. EVENT LISTENERS & DISCLOSURE
// ---------------------------------------------------------

if (searchInput) {
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleCommand(e.target.value);
    });
}

// LEGAL DISCLAIMER (As per your request)
window.addEventListener('load', () => {
    const footer = document.querySelector('footer') || document.body;
    const disclaimer = document.createElement('div');
    disclaimer.style = "text-align:center; font-size:10px; color:gray; margin-top:20px; padding:10px;";
    disclaimer.innerHTML = "© 2026 ALTER Project | Legal Disclaimer: AI-generated styling advice. Prices and availability are subject to partner brand terms.";
    footer.appendChild(disclaimer);
});

console.log("GIA Full System Online.");
