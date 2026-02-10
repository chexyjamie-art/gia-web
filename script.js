// ==========================================
// GIA SMART AI - MASTER LOGIC (FIXED)
// ==========================================

const GEMINI_API_KEY = "AIzaSyBooGwe97LGLxzaDBzr0txng2_sHfFfhdI"; 

const allDatabase = [
    { id: 1, category: 'fashion', name: "Emerald Linen Shirt", price: "2,499", img: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600" },
    { id: 2, category: 'fashion', name: "Charcoal Chinos", price: "1,899", img: "https://images.unsplash.com/photo-1624373666563-54ec85a14962?w=600" },
    { id: 101, category: 'beauty', name: "Salicylic Face Wash", price: "499", img: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600" },
    { id: 201, category: 'tech', name: "ANC Earbuds Pro", price: "4,499", img: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600" }
];

// 1. REAL GEMINI AI CALL (Fixed for Dynamic Response)
async function askRealGiaAI(userQuery) {
    const aiBox = document.getElementById('gia-ai-box');
    const aiText = document.getElementById('gia-ai-text');

    if (aiBox) {
        aiBox.classList.remove('hidden'); // Box dikhao
        aiBox.style.display = "block";   // Force display agar hidden class clash kare
    }
    
    // Purana save message turant delete karne ke liye loading dikhao
    if (aiText) aiText.innerHTML = "<span class='animate-pulse text-[#BF953F]'>GIA soch rahi hai...</span>";

    const prompt = `System: Tera naam GIA hai. Tu Rahul ki Best Friend aur Stylist hai. User ne pucha: "${userQuery}". Ekdum real desi doston wali chat kar (Bhai, Yaar, Mast). Styling advice do aur pucho gift hai ya personal use. Max 2 lines. No fixed templates.`;

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
        });

        const data = await response.json();
        
        // CHECK: Kya API se data aaya?
        if (data.candidates && data.candidates[0].content.parts[0].text) {
            const giaReply = data.candidates[0].content.parts[0].text;

            // Purana text yahan overwrite ho raha hai (FIX)
            aiText.innerText = giaReply; 

            const utterance = new SpeechSynthesisUtterance(giaReply);
            utterance.lang = 'hi-IN';
            window.speechSynthesis.speak(utterance);
        }

    } catch (e) {
        console.error("GIA Error:", e);
        aiText.innerText = "Bhai, net thoda slow hai, par tera style top hai!";
    }
}

// 2. RENDER PRODUCTS (No change)
function renderProducts(data) {
    const grid = document.getElementById('product-grid');
    if(!grid) return;
    grid.innerHTML = data.map(p => `
        <div class="product-card p-6" onclick="openDetails(${p.id})">
            <img src="${p.img}" class="w-full h-52 object-cover rounded-2xl mb-4">
            <h4 class="text-sm font-bold text-white/80">${p.name}</h4>
            <p class="text-xl font-black mt-2 gold-text">₹${p.price}</p>
        </div>
    `).join('');
}

// 3. SEARCH HANDLER (ENTER KEY - Fixed for Trigger)
document.getElementById('ai-search-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const query = e.target.value;
        if (query.trim() !== "") {
            askRealGiaAI(query);
            const filtered = allDatabase.filter(p => 
                p.name.toLowerCase().includes(query.toLowerCase()) || 
                p.category.toLowerCase().includes(query.toLowerCase())
            );
            renderProducts(filtered);
        }
    }
});

// 4. MODAL LOGIC (No change)
function openDetails(id) {
    const p = allDatabase.find(x => x.id === id);
    const modal = document.getElementById('details-modal');
    document.getElementById('modal-content').innerHTML = `
        <div class="bg-[#04241a] rounded-[2.5rem] overflow-hidden border border-white/10">
            <img src="${p.img}" class="w-full h-[400px] object-cover">
            <div class="p-8">
                <h2 class="text-3xl royal-logo gold-text mb-4">${p.name}</h2>
                <p class="text-xl font-bold mb-6">₹${p.price}</p>
                <button class="w-full bg-[#BF953F] text-black py-4 rounded-full font-black uppercase text-xs">Buy Now</button>
            </div>
        </div>`;
    modal.style.display = 'block';
}

function closeDetails() { document.getElementById('details-modal').style.display = 'none'; }

// 5. LEGAL DISCLAIMER & INIT
window.onload = () => {
    lucide.createIcons();
    renderProducts(allDatabase);

    // Disclaimer exactly at center bottom as requested
    const footer = document.querySelector('footer');
    if (footer) {
        const disclaimer = document.createElement('p');
        disclaimer.style = "font-size: 8px; color: rgba(191,149,63,0.5); margin-top: 30px; text-align: center; text-transform: uppercase; letter-spacing: 2px; width: 100%;";
        disclaimer.innerText = "© 2026 ALTER PROJECT | LEGAL DISCLAIMER: AI-Generated styling advice. No manual speech saved.";
        footer.appendChild(disclaimer);
    }
};