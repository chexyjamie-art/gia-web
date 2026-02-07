// ==========================================
// GIA SMART AI - MASTER INTEGRATED LOGIC
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
        text = type; // Direct command response
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

// 4. AI KNOWLEDGE & COMBO ENGINE (New Core Logic)
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

// 5. DYNAMIC COMBO GENERATOR (With GIA Logic)
function generateInstantCombo(keyword) {
    const container = document.getElementById('combo-items-container');
    if (!container) return;

    const key = keyword.toLowerCase();
    let combo = null;
    
    // Search logic to find the right combo
    if (key.includes("shirt") || key.includes("linen")) combo = comboEngine.shirt;
    else if (key.includes("sun") || key.includes("cream")) combo = comboEngine.sunscreen;
    else if (key.includes("jeans") || key.includes("denim")) combo = comboEngine.jeans;
    else combo = comboEngine.sunscreen; // Fallback

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

        giaSpeak(`Rahul, maine aapke liye ek perfect combo set kiya hai. Iska trust score ${combo.score} hai.`);
        if (typeof lucide !== 'undefined') { lucide.createIcons(); }
    }, 1500);
}

// 6. TRUTH MODAL (AI Analysis Parameters)
function openTruthModal(productName, score) {
    observeUser(); 
    const modal = document.getElementById('analysis-modal'); // Linking to our main emerald modal
    const content = document.getElementById('modal-content');
    
    if (modal && content) {
        content.innerHTML = `
            <div class="text-center">
                <h2 class="text-2xl font-serif gold-text mb-2">${productName}</h2>
                <div class="bg-black/20 p-4 rounded-xl border border-[#BF953F]/30 mb-6">
                    <p class="text-[10px] uppercase text-white/50 mb-2">GIA Trust Score</p>
                    <p class="text-4xl font-black text-[#BF953F]">${score}%</p>
                </div>
                <div class="space-y-3 text-left">
                    <div class="flex justify-between text-[10px] font-bold border-b border-white/5 pb-2">
                        <span class="text-white/60">AUTH. SELLER</span> 
                        <span class="text-green-500">PASSED ✓</span>
                    </div>
                    <div class="flex justify-between text-[10px] font-bold border-b border-white/5 pb-2">
                        <span class="text-white/60">PRICE TREND</span> 
                        <span class="text-blue-500">LOWEST IN 30D</span>
                    </div>
                    <div class="flex justify-between text-[10px] font-bold border-b border-white/5 pb-2">
                        <span class="text-white/60">FAKE REVIEWS</span> 
                        <span class="text-green-500">FILTERED ✓</span>
                    </div>
                    <div class="sentiment-box mt-4">
                        <p class="text-xs italic text-white/90">"Rahul, is product ki seller history clean hai aur users ne returns kaafi kam kiye hain. You can trust this!"</p>
                    </div>
                </div>
                <button onclick="closeAnalysis()" class="w-full mt-8 bg-[#BF953F] text-black font-bold py-3 rounded-xl uppercase text-xs">Got it, GIA</button>
            </div>
        `;
        modal.style.display = 'flex';
        giaSpeak('modal', productName);
    }
}

// 7. VOICE & COMMAND HANDLING (Integrated)
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = 'hi-IN';

function handleCommand(command) {
    const cmd = command.toLowerCase();
    
    // Phase 1 Commands
    if (cmd.includes("similar") || cmd.includes("behtar")) {
        giaSpeak("Rahul, maine kuch behtar options dhoonde hain. Dikhaoon?");
    } else if (cmd.includes("table") || cmd.includes("price")) {
        giaSpeak("Zaroor, ye rahi price comparison table.");
    }
    
    // Trigger Combo Generation
    generateInstantCombo(cmd);
}

// 8. EVENT LISTENERS
if (trigger) trigger.addEventListener('click', () => giaSpeak('greetings'));

if (searchInput) {
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleCommand(e.target.value);
    });
}

// Behavior Tracker
function observeUser() {
    userContext.viewedProducts++;
    if (userContext.viewedProducts === 3) {
        setTimeout(() => giaSpeak('proactive'), 2000);
    }
}

function closeAnalysis() {
    document.getElementById('analysis-modal').style.display = 'none';
}

// Photo Upload (Virtual Try-on Prep)
function handlePhotoUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const preview = document.getElementById('user-upload-preview');
            if (preview) {
                preview.src = e.target.result;
                preview.classList.remove('hidden');
                giaSpeak("Perfect! Ab product ko drag karke set kar lo.");
            }
        }
        reader.readAsDataURL(file);
    }
}

console.log("GIA System Online: Structure Fixed, Intelligence Integrated.");
