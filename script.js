// ==========================================
// GIA SMART AI - MASTER INTEGRATED MASTER CODE
// ==========================================

// 1. UI Elements Selection (Preserved & Enhanced)
const chatBubble = document.getElementById('gia-chat-bubble');
const chatText = document.getElementById('gia-chat-text');
const chatActions = document.getElementById('gia-chat-actions');
const trigger = document.getElementById('aura-trigger');
const floatingProduct = document.getElementById('floating-product');
const searchInput = document.getElementById('gia-search-input');
const successOverlay = document.getElementById('success-screen');

// Intelligence Context (Memory)
const userContext = {
    name: "Rahul",
    viewedProducts: 0,
    lastActions: []
};

// ---------------------------------------------------------
// NEW: REAL GEMINI AI CONFIGURATION (LIVE BRAIN)
// ---------------------------------------------------------
const GEMINI_API_KEY = "AIzaSyBooGwe97LGLxzaDBzr0txng2_sHfFfhdI"; // <--- Bhai, apni API Key yahan dalo

async function askRealGiaAI(userQuery) {
    if (chatBubble) chatBubble.classList.remove('hidden');
    if (chatText) chatText.innerHTML = "<span class='animate-pulse text-[#BF953F]'>GIA soch rahi hai...</span>";

    const prompt = `
        System: Tera naam GIA hai. Tu Rahul ki ek sacchi dost (Yaar) aur Luxury Stylist hai. 
        User Query: "${userQuery}"
        Instructions:
        - Response frankly aur Desi touch mein dena (Jaise: "Bhai dekh...", "Arey wah!").
        - Hamesha confirm kar ki gift hai ya personal use.
        - Response 2-3 lines max.
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

// Personality Arrays (Preserved)
const giaResponses = {
    greetings: [
        "Hi Rahul! Aaj aapka mood kaafi stylish lag raha hai. Kaise madad karun?",
        "Welcome back Rahul! Maine kuch naye exclusive deals dhoondi hain aapke liye.",
        "Namaste Rahul! Kya aaj hum kuch naya try karein?",
        "Hello Rahul! Aapke style ke hisab se aaj ye collection perfect rahega."
    ],
    proactive: [
        "Rahul, aap kaafi der se watches dekh rahe ho, kya main best 'GIA Score' filter kar doon?",
        "Maine notice kiya aapko premium brands pasand hain. Seiko ke naye models dekhe?",
        "Budget ki chinta mat kijiye, main yahan best deals dhoondne ke liye hi hoon!"
    ],
    wishlist: [
        "Great choice! Maine ise save kar liya hai, price kam hote hi bataungi.",
        "Personal preference? Noted! Is par meri ab 24/7 nazar rahegi.",
        "Rahul, ye aapke style par suit karega. Wishlist lock kar di hai!"
    ]
};

// 2. INITIALIZE ICONS
if (typeof lucide !== 'undefined') { lucide.createIcons(); }

// 3. UPDATED SPEAK FUNCTION (Hinglish Intelligence)
function giaSpeak(type, product = "") {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    let text = "";

    if (giaResponses[type]) {
        const options = giaResponses[type];
        text = options[Math.floor(Math.random() * options.length)];
    } else if (type === 'modal') {
        text = `Rahul, ye raha ${product} ka GIA analysis. Iska trust score kaafi solid hai aur abhi 15 log ise dekh rahe hain.`;
    } else {
        text = type; 
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'hi-IN';
    utterance.pitch = 1.1; 
    window.speechSynthesis.speak(utterance);

    if (chatText && chatBubble) {
        chatText.innerText = text;
        chatBubble.classList.remove('hidden');
        setTimeout(() => chatBubble.classList.add('hidden'), 8000);
    }
}

// 4. AI KNOWLEDGE & COMBO ENGINE (Preserved)
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
        reason: "Light wash denim ke sath white contrast ek classic premium vibe deta hai.",
        score: "9.9"
    },
    "shirt": {
        name: "Semi-Formal Ensemble",
        items: [
            { n: "Linen Shirt", i: "shirt.png", p: 2499 },
            { n: "Beige Chinos", i: "pants.png", p: 2999 },
            { n: "Loafers", i: "shoes.png", p: 3500 }
        ],
        reason: "Linen texture works perfectly with matte chinos for a sophisticated vibe.",
        score: "9.8"
    }
};

// 5. DYNAMIC COMBO GENERATOR (Preserved)
function generateInstantCombo(keyword) {
    const container = document.getElementById('combo-items-container');
    if (!container) return;
    const key = keyword.toLowerCase();
    let combo = null;

    if (key.includes("shirt") || key.includes("linen")) combo = comboEngine.shirt;
    else if (key.includes("sun") || key.includes("cream")) combo = comboEngine.sunscreen;
    else if (key.includes("jeans") || key.includes("denim")) combo = comboEngine.jeans;
    else combo = comboEngine.sunscreen; 

    container.innerHTML = `<div class="animate-pulse text-[#BF953F] font-bold text-xs italic">GIA is styling your combo...</div>`;

    setTimeout(() => {
        container.innerHTML = ""; 
        let total = 0;
        combo.items.forEach((item, index) => {
            container.innerHTML += `
                <div class="relative group">
                    <div class="w-24 h-32 bg-white rounded-[1.5rem] border border-gray-100 p-3 shadow-sm flex flex-col items-center justify-center">
                        <img src="${item.i}" class="w-14 h-14 object-contain mb-2">
                        <p class="text-[7px] font-bold text-center uppercase text-black">${item.n}</p>
                        <p class="text-[9px] text-[#BF953F] font-black">₹${item.p}</p>
                    </div>
                </div>
            `;
            total += item.p;
            if (index < combo.items.length - 1) {
                container.innerHTML += `<span class="text-gray-400 font-bold self-center">+</span>`;
            }
        });
        document.getElementById('combo-name').innerText = combo.name;
        document.getElementById('combo-reasoning').innerText = combo.reason;
        document.getElementById('combo-score').innerText = combo.score;
        document.getElementById('combo-total').innerText = `₹${total.toLocaleString()}`;
        if (typeof lucide !== 'undefined') { lucide.createIcons(); }
    }, 1500);
}

// 6. TRUTH MODAL (Preserved)
function openTruthModal(productName, score) {
    observeUser(); 
    const modal = document.getElementById('analysis-modal');
    const content = document.getElementById('modal-content');
    if (modal && content) {
        content.innerHTML = `
            <div class="text-center">
                <h2 class="text-2xl font-serif gold-text mb-2">${productName}</h2>
                <div class="bg-black/20 p-4 rounded-xl border border-[#BF953F]/30 mb-6">
                    <p class="text-[10px] uppercase text-white/50 mb-2">GIA Trust Score</p>
                    <p class="text-4xl font-black text-[#BF953F]">${score}%</p>
                </div>
                <button onclick="closeAnalysis()" class="w-full mt-8 bg-[#BF953F] text-black font-bold py-3 rounded-xl uppercase text-xs">Got it, GIA</button>
            </div>
        `;
        modal.style.display = 'flex';
        giaSpeak('modal', productName);
    }
}

// 7. VOICE & COMMAND HANDLING
function handleCommand(command) {
    const cmd = command.toLowerCase();
    askRealGiaAI(cmd); // Real Gemini Call
    generateInstantCombo(cmd);
}

// 8. EVENT LISTENERS
if (trigger) trigger.addEventListener('click', () => giaSpeak('greetings'));
if (searchInput) {
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleCommand(e.target.value);
    });
}

// Legal Disclaimer Footer (As Requested)
window.addEventListener('load', () => {
    const footer = document.body;
    const disclaimer = document.createElement('div');
    disclaimer.style = "text-align:center; font-size:10px; color:gray; margin: 30px 0; padding:10px; width:100%;";
    disclaimer.innerHTML = "© 2026 ALTER PROJECT | LEGAL DISCLAIMER: AI-generated styling advice. All product data is property of respective brands.";
    footer.appendChild(disclaimer);
});

// Other helper functions (Preserved)
function observeUser() { userContext.viewedProducts++; }
function closeAnalysis() { document.getElementById('analysis-modal').style.display = 'none'; }

console.log("GIA System: Fully Integrated & Live.");

// 1. Sync Lab / Claim Outfit Button
const claimButtons = document.querySelectorAll('.claim-btn, .sync-lab-btn'); // Aapki class jo bhi ho
claimButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        alert("Bhai, thoda sabar! 'Sync Lab' feature agle update mein live hoga. GIA abhi fitting check kar rahi hai.");
        // Yahan aap checkout page ka link bhi daal sakte ho:
        // window.location.href = "checkout.html";
    });
});

// 2. Start My Rituals Button
const ritualBtn = document.querySelector('.start-rituals-btn'); // Check your button class
if (ritualBtn) {
    ritualBtn.addEventListener('click', () => {
        giaSpeak("Rahul, aapka morning styling ritual start ho raha hai. Pehle ye combo try kijiye!");
        // Isse GIA bolne lagegi
    });
}

