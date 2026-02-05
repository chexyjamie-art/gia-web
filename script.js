// ==========================================
// GIA SMART AI - UPDATED INTEGRATED LOGIC
// ==========================================

// 1. UI Elements Selection
const chatBubble = document.getElementById('gia-chat-bubble');
const chatText = document.getElementById('gia-chat-text');
const chatActions = document.getElementById('gia-chat-actions');
const trigger = document.getElementById('aura-trigger');
const voiceWaves = document.getElementById('voice-waves');
const floatingProduct = document.getElementById('floating-product');
const searchInput = document.getElementById('gia-search-input');

let lastQuestion = "";

// 2. SPEECH CONFIGURATION
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = 'hi-IN';

function giaSpeak(text) {
    window.speechSynthesis.cancel(); // Overlap rokne ke liye
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'hi-IN';
    window.speechSynthesis.speak(utterance);
    
    chatText.innerHTML = text;
    chatBubble.classList.remove('hidden');
}

// 3. SHOW/HIDE FEATURE LOGIC
function showFeature(id) {
    const section = document.getElementById(id);
    if (section) {
        section.classList.remove('hidden');
        section.scrollIntoView({ behavior: 'smooth' });
        chatBubble.classList.add('hidden');
    }
}

// 4. MODAL (SCORE & PRICE TREND) LOGIC
function openTruthModal(productName, score) {
    const modal = document.getElementById('gia-modal-overlay');
    document.getElementById('modal-product-name').innerText = productName;
    document.getElementById('modal-score').innerText = score;
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    
    // Modal khulte hi GIA bolegi
    giaSpeak(`Rahul, ye hai ${productName} ki detail report. Iska trust score ${score} hai aur price abhi 30 dinon mein sabse kam hai.`);
}

function closeTruthModal() {
    const modal = document.getElementById('gia-modal-overlay');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
}

// 5. TRIGGER: SIMILAR PRODUCTS (Sirf mangne par)
function askForSimilarProducts() {
    lastQuestion = "similar";
    giaSpeak("Rahul, maine isi budget mein 2 aur behtar options dhoonde hain. Kya main unka comparison dikhaoon?");
    
    chatActions.innerHTML = `
        <button onclick="showFeature('gia-similar-section')" class="bg-blue-600 text-white px-4 py-2 rounded-xl text-xs font-bold">Haan, dikhao</button>
        <button onclick="closeChat()" class="bg-gray-100 text-gray-500 px-4 py-2 rounded-xl text-xs">Nahi, thanks</button>
    `;
}

// 6. COMMAND HANDLING (VOICE & TEXT)
function handleCommand(command) {
    const cmd = command.toLowerCase();

    // Trigger for Similar/Better Products
    if (cmd.includes("similar") || cmd.includes("better") || cmd.includes("dusra") || cmd.includes("behtar")) {
        askForSimilarProducts();
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
    // Handle Yes/Haan for steps
    else if (cmd.includes("haan") || cmd.includes("yes") || cmd.includes("dikhao")) {
        if (lastQuestion === "similar") showFeature('gia-similar-section');
        else giaSpeak("Aap kya dekhna chahte hain? Price table ya 3D View?");
    }
}

// Listeners
if (searchInput) {
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleCommand(e.target.value);
    });
}

function startListening() {
    voiceWaves.classList.remove('hidden');
    recognition.start();
}

recognition.onresult = (event) => {
    voiceWaves.classList.add('hidden');
    const command = event.results[0][0].transcript;
    console.log("User ne bola:", command);
    handleCommand(command);
};

// 7. 3D INTERACTION
document.addEventListener('mousemove', (e) => {
    const section3d = document.getElementById('gia-3d-section');
    if (floatingProduct && section3d && !section3d.classList.contains('hidden')) {
        const x = (window.innerWidth / 2 - e.pageX) / 25;
        const y = (window.innerHeight / 2 - e.pageY) / 25;
        floatingProduct.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
    }
});

function closeChat() {
    chatBubble.classList.add('hidden');
}

// Initial State: Chup rehna (Auto-start hata diya)
// trigger (✨ button) click par GIA help ke liye puchegi
if (trigger) {
    trigger.addEventListener('click', () => {
        giaSpeak("Hi Rahul! Main aapki kaise madad kar sakti hoon? Aap mujhse price comparison ya 3D view maang sakte hain.");
        chatActions.innerHTML = `<button onclick="startListening()" class="bg-blue-600 text-white px-4 py-2 rounded-xl text-xs">🎤 Bol kar batayein</button>`;
    });
}

// Virtual Try-On Logic
let currentScale = 1;
let currentRotation = 0;
const draggable = document.getElementById('draggable-product');
const container = document.getElementById('try-on-container');

// 1. Photo Upload Handle
function handlePhotoUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const preview = document.getElementById('user-upload-preview');
            preview.src = e.target.result;
            preview.classList.remove('hidden');
            document.getElementById('mirror-placeholder').classList.add('hidden');
            document.getElementById('webcam-feed').classList.add('hidden');
            giaSpeak("Perfect! Ab product ko drag karke apne upar set kar lo, Rahul.");
        }
        reader.readAsDataURL(file);
    }
}

// 2. Live Camera Handle
async function startLiveMirror() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" } });
        const video = document.getElementById('webcam-feed');
        video.srcObject = stream;
        video.classList.remove('hidden');
        document.getElementById('mirror-placeholder').classList.add('hidden');
        document.getElementById('user-upload-preview').classList.add('hidden');
        giaSpeak("Live camera on ho gaya hai. Frame mein khud ko dekhiye!");
    } catch (err) {
        alert("Camera access nahi mila. Browser settings check karein.");
    }
}

// 3. Simple Drag Logic for Mobile & PC
let isDragging = false;
draggable.addEventListener('mousedown', () => isDragging = true);
window.addEventListener('mouseup', () => isDragging = false);

window.addEventListener('mousemove', (e) => {
    if (isDragging) {
        const rect = container.getBoundingClientRect();
        const x = e.clientX - rect.left - (draggable.offsetWidth / 2);
        const y = e.clientY - rect.top - (draggable.offsetHeight / 2);
        
        // Boundaries check
        if (x > 0 && x < rect.width - draggable.offsetWidth) draggable.style.left = x + 'px';
        if (y > 0 && y < rect.height - draggable.offsetHeight) draggable.style.top = y + 'px';
        
        draggable.style.transform = `translate(0,0) scale(${currentScale}) rotate(${currentRotation}deg)`;
    }
});

// Mobile Touch Support for Dragging
draggable.addEventListener('touchmove', (e) => {
    const touch = e.touches[0];
    const rect = container.getBoundingClientRect();
    const x = touch.clientX - rect.left - (draggable.offsetWidth / 2);
    const y = touch.clientY - rect.top - (draggable.offsetHeight / 2);
    
    draggable.style.left = x + 'px';
    draggable.style.top = y + 'px';
    draggable.style.transform = `translate(0,0) scale(${currentScale}) rotate(${currentRotation}deg)`;
}, { passive: false });

// 4. Zoom & Rotate Controls
function resizeProduct(factor) {
    currentScale *= factor;
    draggable.style.transform = `translate(0,0) scale(${currentScale}) rotate(${currentRotation}deg)`;
}

function rotateProduct() {
    currentRotation += 15;
    draggable.style.transform = `translate(0,0) scale(${currentScale}) rotate(${currentRotation}deg)`;
}
