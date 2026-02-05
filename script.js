// ==========================================
// GIA SMART AI - INTEGRATED PHASE 1 & 2 LOGIC
// ==========================================

// 1. UI Elements Selection
const chatBubble = document.getElementById('gia-chat-bubble');
const chatText = document.getElementById('gia-chat-text');
const chatActions = document.getElementById('gia-chat-actions');
const trigger = document.getElementById('aura-trigger');
const floatingProduct = document.getElementById('floating-product');
const searchInput = document.getElementById('gia-search-input');
const successOverlay = document.getElementById('success-screen');

let lastQuestion = "";

// 2. INITIALIZE ICONS (Lucide)
if (typeof lucide !== 'undefined') {
    lucide.createIcons();
}

// 3. SPEECH CONFIGURATION
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = 'hi-IN';

function giaSpeak(text) {
    window.speechSynthesis.cancel(); // Overlap rokne ke liye
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'hi-IN';
    window.speechSynthesis.speak(utterance);
    
    if (chatText) {
        chatText.innerHTML = text;
        chatBubble.classList.remove('hidden');
    }
}

// 4. SHOW/HIDE FEATURE LOGIC
function showFeature(id) {
    const section = document.getElementById(id);
    if (section) {
        section.classList.remove('hidden');
        section.scrollIntoView({ behavior: 'smooth' });
        chatBubble.classList.add('hidden');
    }
}

// 5. MODAL (SCORE & PRICE TREND) LOGIC
function openTruthModal(productName, score) {
    const modal = document.getElementById('gia-modal-overlay');
    if (modal) {
        document.getElementById('modal-product-name').innerText = productName;
        document.getElementById('modal-score').innerText = score;
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        
        giaSpeak(`Rahul, ye hai ${productName} ki detail report. Iska trust score ${score} hai.`);
    }
}

function closeTruthModal() {
    const modal = document.getElementById('gia-modal-overlay');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }
}

// 6. SUCCESS FEEDBACK
function triggerSuccess() {
    if (successOverlay) {
        successOverlay.style.display = 'flex';
        giaSpeak("Excellent choice Rahul! Maine deal note kar li hai.");
        setTimeout(() => { successOverlay.style.display = 'none'; }, 3000);
    }
}

// 7. COMMAND HANDLING (VOICE & TEXT)
function handleCommand(command) {
    const cmd = command.toLowerCase();

    // Trigger for Similar/Better Products
    if (cmd.includes("similar") || cmd.includes("better") || cmd.includes("dusra") || cmd.includes("behtar")) {
        lastQuestion = "similar";
        giaSpeak("Rahul, maine kuch behtar options dhoonde hain. Dikhaoon?");
        chatActions.innerHTML = `<button onclick="showFeature('gia-similar-section')" class="bg-blue-600 text-white px-4 py-2 rounded-xl text-xs font-bold">Haan, dikhao</button>`;
    }
    // Trigger for Price/Table
    else if (cmd.includes("table") || cmd.includes("price") || cmd.includes("daam")) {
        showFeature('gia-comparison-section');
        giaSpeak("Zaroor, ye rahi price comparison table.");
    }
    // Trigger for 3D
    else if (cmd.includes("3d") || cmd.includes("rotate") || cmd.includes("ghumao")) {
        showFeature('gia-3d-section');
        giaSpeak("Theek hai Rahul, 3D view active kar diya hai.");
    }
}

// Event Listeners for Search
if (searchInput) {
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleCommand(e.target.value);
    });
}

function listenForResponse() {
    recognition.start();
    console.log("Listening...");
}

recognition.onresult = (event) => {
    const command = event.results[0][0].transcript;
    console.log("User ne bola:", command);
    handleCommand(command);
};

// 8. 3D INTERACTION (Mouse move parallax)
document.addEventListener('mousemove', (e) => {
    const section3d = document.getElementById('gia-3d-section');
    if (floatingProduct && section3d && !section3d.classList.contains('hidden')) {
        const x = (window.innerWidth / 2 - e.pageX) / 25;
        const y = (window.innerHeight / 2 - e.pageY) / 25;
        floatingProduct.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
    }
});

// 9. VIRTUAL TRY-ON (Phase 2 Logic - Saved for later use)
let currentScale = 1;
let currentRotation = 0;
const draggable = document.getElementById('draggable-product');
const container = document.getElementById('try-on-container');

function handlePhotoUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const preview = document.getElementById('user-upload-preview');
            if (preview) {
                preview.src = e.target.result;
                preview.classList.remove('hidden');
                document.getElementById('mirror-placeholder')?.classList.add('hidden');
                giaSpeak("Perfect! Ab product ko drag karke set kar lo.");
            }
        }
        reader.readAsDataURL(file);
    }
}

// Trigger ✨ Button
if (trigger) {
    trigger.addEventListener('click', () => {
        giaSpeak("Kaise madad karun Rahul? Aap price table ya 3D view maang sakte hain.");
    });
}

function openTruthModal(productName, score) {
    const modal = document.getElementById('gia-modal-overlay');
    if (modal) {
        // Data update karein
        document.getElementById('modal-product-name').innerText = productName;
        document.getElementById('modal-score').innerText = score;
        
        // Modal ko visible banayein
        modal.classList.remove('hidden');
        modal.classList.add('flex'); // Yeh line important hai
        
        // Voice response
        giaSpeak(`Rahul, ye hai ${productName} ki detail report. Iska GIA trust score ${score} hai.`);
    } else {
        console.error("Modal overlay not found in HTML!");
    }
}

// 1. Wishlist Logic
function addToWishlist(itemName) {
    // Heart icon animation logic can be added here
    giaSpeak(`Rahul, maine ${itemName} ko aapki wishlist mein add kar diya hai. Price drop hote hi GIA aapko notify karegi!`);
    
    // Yahan hum local storage ya database mein save kar sakte hain
    console.log(`${itemName} added to wishlist.`);
}

// 2. Updated Modal with Social Proofing
function openTruthModal(productName, score) {
    const modal = document.getElementById('gia-modal-overlay');
    if (modal) {
        document.getElementById('modal-product-name').innerText = productName;
        document.getElementById('modal-score').innerText = score;
        
        // Modal logic with social proofing dialogue
        giaSpeak(`Rahul, iska trust score ${score} hai. Abhi 15 log ise dekh rahe hain, aur stock jaldi khatam ho sakta hai.`);
        
        modal.classList.remove('hidden');
        modal.classList.add('flex');
    }
}

