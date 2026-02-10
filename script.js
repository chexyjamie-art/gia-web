// 1. UI Elements
const chatBubble = document.getElementById('gia-chat-bubble'); // GIA Box
const chatText = document.getElementById('gia-chat-text');
const searchInput = document.getElementById('gia-search-input');

// ---------------------------------------------------------
// REAL GEMINI AI CONFIGURATION (FIXED JSON TYPO)
// ---------------------------------------------------------
const GEMINI_API_KEY = "AIzaSyBooGwe97LGLxzaDBzr0txng2_sHFffhdI"; 

async function askRealGiaAI(userQuery) {
    // Search hote hi box dikhao
    if (chatBubble) chatBubble.classList.remove('hidden');
    if (chatText) chatText.innerHTML = "<span class='animate-pulse text-[#BF953F]'>GIA soch rahi hai...</span>";

    const prompt = `System: Tera naam GIA hai. Tu Rahul ki ek sacchi dost aur Luxury Stylist hai. User ne ye search kiya: "${userQuery}". Friendly reply do 2 lines mein.`;

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" }, // FIXED: 'ison' to 'json'
            body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
        });

        const data = await response.json();
        const giaSpeech = data.candidates[0].content.parts[0].text;
        
        if (chatText) chatText.innerText = giaSpeech;

        // Audio output
        const utterance = new SpeechSynthesisUtterance(giaSpeech);
        utterance.lang = 'hi-IN';
        window.speechSynthesis.speak(utterance);

    } catch (error) {
        console.error("Gemini Error:", error);
        if (chatText) chatText.innerText = "Bhai, net thoda slow hai, par main yahi hoon!";
    }
}

// ---------------------------------------------------------
// 2. PRODUCT RENDER LOGIC (WITH HOVER RE-FIXED)
// ---------------------------------------------------------
function renderProducts(products) {
    const grid = document.getElementById('product-grid');
    if(!grid) return;
    grid.innerHTML = "";

    products.forEach(p => {
        grid.innerHTML += `
            <div class="product-card p-6 relative group transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                <div class="absolute top-4 left-4 bg-black/80 text-[#BF953F] text-[9px] font-bold px-2 py-1 rounded-md border border-[#BF953F]/40">
                    AI VERIFIED
                </div>
                <img src="${p.img}" class="w-full h-48 object-cover mb-4 rounded-md transition-transform duration-300 group-hover:brightness-110">
                <h4 class="text-sm font-semibold mb-1 text-black">${p.name}</h4>
                <p class="text-[10px] text-gray-500 uppercase font-bold">${p.brand}</p>
                <div class="flex justify-between items-center mt-3">
                    <p class="text-lg font-bold text-gray-900">₹${p.price}</p>
                    <button class="bg-[#1a1a1a] text-white px-4 py-2 rounded-full text-[10px] font-bold hover:bg-[#BF953F] transition-colors">DETAILS</button>
                </div>
            </div>
        `;
    });
}

// ---------------------------------------------------------
// 3. SEARCH HANDLER
// ---------------------------------------------------------
if (searchInput) {
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const val = e.target.value;
            if(val.length > 1) {
                askRealGiaAI(val); // Gemini Brain call
                
                // Filtering local products
                const filtered = allDatabase.filter(p => 
                    p.name.toLowerCase().includes(val.toLowerCase()) || 
                    p.brand.toLowerCase().includes(val.toLowerCase())
                );
                renderProducts(filtered);
            }
        }
    });
}

// 4. LEGAL DISCLAIMER (Center Bottom)
window.addEventListener('load', () => {
    const disclaimer = document.createElement('div');
    disclaimer.style = "position: relative; width: 100%; text-align: center; font-size: 10px; color: #666; padding: 20px 0; margin-top: 50px; border-top: 1px solid #222;";
    disclaimer.innerHTML = "© 2026 ALTER PROJECT | LEGAL DISCLAIMER: All AI-generated advice is for stylistic purposes. Product data is property of respective brands.";
    document.body.appendChild(disclaimer);
});
