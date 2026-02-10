// ==========================================
// GIA SMART AI - FINAL INTEGRATED MASTER CODE
// ==========================================

// 1. UI Elements Selection
const chatBubble = document.getElementById('gia-chat-bubble');
const chatText = document.getElementById('gia-chat-text');
const chatActions = document.getElementById('gia-chat-actions');
const trigger = document.getElementById('aura-trigger');
const floatingProduct = document.getElementById('floating-product');
const searchInput = document.getElementById('gia-search-input');
const successOverlay = document.getElementById('success-screen');

// Intelligence Context
const userContext = {
    name: "Rahul",
    viewedProducts: 0,
    lastActions: []
};

// ---------------------------------------------------------
// REAL GEMINI AI CONFIGURATION
// ---------------------------------------------------------
const GEMINI_API_KEY = AIzaSyBooGwe97LGLxzaDBzr0txng2_sHfFfhdI // <--- Bhai, apni Key yahan paste 

async function askRealGiaAI(userQuery) {
    if (chatText) chatText.innerHTML = "<span class='animate-pulse text-[#BF953F]'>GIA soch rahi hai...</span>";
    if (chatBubble) chatBubble.classList.remove('hidden');

    const prompt = `
        System: Tera naam GIA hai. Tu Rahul ki ek sacchi dost aur Luxury Stylist hai. 
        User Query: "${userQuery}"
        Instructions:
        - Response ekdum frankly aur Desi touch mein dena (Bhai, Yaar, Arey wah!).
        - Gift ya personal use ke bare mein pucho.
        - Ek pro styling tip do.
        - Response 3 lines max.
    `;

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
        });

        const data = await response.json();
        const giaSpeech = data.candidates[0].content.parts[0].text;

        if (chatText) chatText.innerText = giaSpeech;

        const utterance = new SpeechSynthesisUtterance(giaSpeech);
        utterance.lang = 'hi-IN';
        window.speechSynthesis.speak(utterance);

    } catch (error) {
        console.error("GIA AI Error:", error);
        giaSpeak("greetings"); 
    }
}

// 2. PERSONALITY ARRAYS (Fallback)
const giaResponses = {
    greetings: ["Hi Rahul! Aaj kya stylish plan hai?", "Namaste Rahul! Kuch premium dikhaun?"],
    proactive: ["Rahul, aap kaafi der se dekh rahe ho, help karun?"],
    wishlist: ["Great choice! Save kar liya hai."]
};

// 3. COMBO ENGINE DATA
const comboEngine = {
    "sunscreen": {
        name: "Complete Sun-Protection Kit",
        items: [
            { n: "Sunscreen", i: "sunscreen.png", p: 599 },
            { n: "Face Wash", i: "facewash.png", p: 349 }
        ],
        reason: "Sun damage repair ke liye best combo hai.",
        score: "9.7"
    },
    "shirt": {
        name: "Semi-Formal Ensemble",
        items: [
            { n: "Linen Shirt", i: "shirt.png", p: 2499 },
            { n: "Beige Chinos", i: "pants.png", p: 2999 }
        ],
        reason: "Linen texture + Chinos = Pure Class.",
        score: "9.8"
    }
};

// 4. CORE FUNCTIONS (Speak, Combo, Modal)
function giaSpeak(type, product = "") {
    if (!window.speechSynthesis) return;
    let text = giaResponses[type] ? giaResponses[type][0] : type;
    if (type === 'modal') text = `Rahul, ye raha ${product} ka GIA analysis.`;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'hi-IN';
    window.speechSynthesis.speak(utterance);

    if (chatText) {
        chatText.innerText = text;
        chatBubble.classList.remove('hidden');
    }
}

function generateInstantCombo(keyword) {
    const container = document.getElementById('combo-items-container');
    if (!container) return;
    const key = keyword.toLowerCase();
    let combo = key.includes("shirt") ? comboEngine.shirt : comboEngine.sunscreen;

    container.innerHTML = `<div class="animate-pulse text-[#BF953F]">Styling...</div>`;
    setTimeout(() => {
        container.innerHTML = "";
        let total = 0;
        combo.items.forEach(item => {
            container.innerHTML += `<div class="w-24 bg-white p-2 rounded-xl shadow-sm text-center">
                <p class="text-[7px] font-bold">${item.n}</p>
                <p class="text-[9px] text-[#BF953F]">₹${item.p}</p>
            </div>`;
            total += item.p;
        });
        document.getElementById('combo-name').innerText = combo.name;
        document.getElementById('combo-total').innerText = `₹${total.toLocaleString()}`;
    }, 1000);
}

function openTruthModal(name, score) {
    const modal = document.getElementById('analysis-modal');
    const content = document.getElementById('modal-content');
    if (modal && content) {
        content.innerHTML = `<h2 class="gold-text text-xl">${name}</h2><p class="text-4xl font-black">${score}%</p>
        <button onclick="closeAnalysis()" class="mt-4 bg-[#BF953F] px-4 py-2 rounded-lg">Got it!</button>`;
        modal.style.display = 'flex';
        giaSpeak('modal', name);
    }
}

// 5. SEARCH & COMMAND HANDLER
function handleCommand(command) {
    askRealGiaAI(command); // Gemini Live Brain
    generateInstantCombo(command); // Local Combo Engine
}

if (searchInput) {
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleCommand(e.target.value);
    });
}

if (trigger) trigger.addEventListener('click', () => giaSpeak('greetings'));

function closeAnalysis() { document.getElementById('analysis-modal').style.display = 'none'; }

console.log("GIA SYSTEM: Fully Integrated & Live.");
