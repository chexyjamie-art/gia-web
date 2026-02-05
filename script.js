// ==========================================
// GIA SMART AI - INTEGRATED ALL PHASES LOGIC
// ==========================================

// 1. UI Elements Selection
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

// Personality Arrays (No Repetition)
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

// 3. UPDATED SPEAK FUNCTION (With Intelligence & Life)
function giaSpeak(type, product = "") {
    window.speechSynthesis.cancel();
    let text = "";

    // Logic to pick random or custom text
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
        // Auto-hide bubble after 8 seconds
        setTimeout(() => chatBubble.classList.add('hidden'), 8000);
    }
}

// 4. USER BEHAVIOR TRACKER (Proactive AI)
function observeUser() {
    userContext.viewedProducts++;
    console.log("Products viewed:", userContext.viewedProducts);
    
    // 3 baar browse karne par GIA khud bolegi
    if (userContext.viewedProducts === 3) {
        setTimeout(() => giaSpeak('proactive'), 2000);
    }
}

// 5. MODAL (SCORE & TRUTH) LOGIC
function openTruthModal(productName, score) {
    observeUser(); // Track behavior
    const modal = document.getElementById('gia-modal-overlay');
    if (modal) {
        document.getElementById('modal-product-name').innerText = productName;
        document.getElementById('modal-score').innerText = score;
        modal.classList.remove('hidden');
        modal.classList.add('flex');

        giaSpeak('modal', productName);
    }
}

function closeTruthModal() {
    const modal = document.getElementById('gia-modal-overlay');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }
}

// 6. WISHLIST LOGIC
function addToWishlist(itemName) {
    giaSpeak('wishlist');
    console.log(`${itemName} added to GIA Database.`);
}

// 7. SUCCESS FEEDBACK
function triggerSuccess() {
    if (successOverlay) {
        successOverlay.style.display = 'flex';
        giaSpeak("Excellent choice Rahul! Maine deal note kar li hai.");
        setTimeout(() => { successOverlay.style.display = 'none'; }, 3000);
    }
}

// 8. VOICE RECOGNITION & COMMANDS
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = 'hi-IN';

function handleCommand(command) {
    const cmd = command.toLowerCase();
    if (cmd.includes("similar") || cmd.includes("behtar")) {
        giaSpeak("Rahul, maine kuch behtar options dhoonde hain. Dikhaoon?");
        chatActions.innerHTML = `<button onclick="showFeature('gia-similar-section')" class="bg-blue-600 text-white px-4 py-2 rounded-xl text-xs">Haan, dikhao</button>`;
    } else if (cmd.includes("table") || cmd.includes("price")) {
        showFeature('gia-comparison-section');
        giaSpeak("Zaroor, ye rahi price comparison table.");
    } else if (cmd.includes("3d") || cmd.includes("rotate")) {
        showFeature('gia-3d-section');
        giaSpeak("Theek hai Rahul, 3D view active kar diya hai.");
    }
}

function listenForResponse() {
    recognition.start();
    console.log("Listening...");
}

recognition.onresult = (event) => {
    handleCommand(event.results[0][0].transcript);
};

// 9. UI HELPERS (Show Feature & 3D Parallax)
function showFeature(id) {
    const section = document.getElementById(id);
    if (section) {
        section.classList.remove('hidden');
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

document.addEventListener('mousemove', (e) => {
    const section3d = document.getElementById('gia-3d-section');
    if (floatingProduct && section3d && !section3d.classList.contains('hidden')) {
        const x = (window.innerWidth / 2 - e.pageX) / 25;
        const y = (window.innerHeight / 2 - e.pageY) / 25;
        floatingProduct.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
    }
});

// Photo Upload for Phase 2 Virtual Try-on
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

// 10. INITIAL TRIGGER
if (trigger) {
    trigger.addEventListener('click', () => giaSpeak('greet'));
}

if (searchInput) {
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleCommand(e.target.value);
    });
}

// COMBO GENERATOR LOGIC
const comboDatabase = {
    "shirt": {
        matching: "Denim Jeans & White Sneakers",
        accessories: "Brown Leather Belt",
        giaComment: "The linen texture works perfectly with matte denim for a semi-formal vibe."
    },
    "watch": {
        matching: "Oxford Shirt & Chinos",
        accessories: "Cufflinks",
        giaComment: "A premium watch deserves a clean sleeve and tailored trousers."
    }
    // Aur combos yahan add honge
};

function updateGIACombo(userSearch) {
    const search = userSearch.toLowerCase();
    let combo = null;

    if (search.includes("shirt")) combo = comboDatabase.shirt;
    else if (search.includes("watch")) combo = comboDatabase.watch;

    if (combo) {
        // GIA Speak about the combo
        giaSpeak(`Rahul, maine is shirt ke liye ek perfect outfit set kiya hai. Iska combo score 9.8 hai!`);
        
        // Update the UI dynamically (In real app, we change images/text here)
        console.log("Combo Suggested:", combo.giaComment);
    }
}

// Search handler ko modify karein taaki combo update ho
const originalHandleCommand = handleCommand;
handleCommand = function(command) {
    originalHandleCommand(command);
    updateGIACombo(command);
};
