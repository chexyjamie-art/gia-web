// ==========================================
// GIA SMART AI - MASTER LOGIC (FIXED & EXPANDED)
// ==========================================

const GEMINI_API_KEY = "AIzaSyBooGwe97LGLxzaDBzr0txng2_sHfFfhdI"; 

// Updated Database with Match Scores & Sentiments
const allDatabase = [
    { id: 1, category: 'fashion', name: "Emerald Linen Shirt", price: "2,499", match: "98.4", img: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600", sentiment: "Bhai ye color elite vibe deta hai, summer parties ke liye aag hai!" },
    { id: 2, category: 'fashion', name: "Charcoal Chinos", price: "1,899", match: "94.2", img: "https://images.unsplash.com/photo-1624373666563-54ec85a14962?w=600", sentiment: "Durable aur comfortable, GIA suggest karti hai isse white sneakers ke saath pehno." },
    { id: 101, category: 'beauty', name: "Salicylic Face Wash", price: "499", match: "91.5", img: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600", sentiment: "Skin fresh rakhne ke liye isse better kuch nahi, personal use ke liye mast hai." },
    { id: 201, category: 'tech', name: "ANC Earbuds Pro", price: "4,499", match: "89.8", img: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600", sentiment: "Gym ho ya travel, noise cancellation ekdum next level hai bhai." }
];

// 1. REAL GEMINI AI CALL (Improved)
async function askRealGiaAI(userQuery) {
    const aiBox = document.getElementById('gia-ai-box');
    const aiText = document.getElementById('gia-ai-text');

    if (aiBox) {
        aiBox.classList.remove('hidden');
        aiBox.style.display = "block"; 
    }

    if (aiText) aiText.innerHTML = "<span class='animate-pulse text-[#BF953F]'>GIA soch rahi hai...</span>";

    const prompt = `System: Tera naam GIA hai. Tu Rahul ki Best Friend aur Stylist hai. User ne pucha: "${userQuery}". Ekdum real desi doston wali chat kar (Bhai, Yaar, Mast). Styling advice do aur pucho gift hai ya personal use. Max 2 lines. No fixed templates.`;

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
        });

        const data = await response.json();

        if (data && data.candidates && data.candidates[0].content && data.candidates[0].content.parts) {
            const giaReply = data.candidates[0].content.parts[0].text;
            aiText.innerText = giaReply; 

            window.speechSynthesis.cancel(); 
            const utterance = new SpeechSynthesisUtterance(giaReply);
            utterance.lang = 'hi-IN';
            window.speechSynthesis.speak(utterance);
        } else {
            aiText.innerText = "Bhai, Gemini thoda busy hai, ek baar firse try kar na!";
        }

    } catch (e) {
        console.error("GIA Error:", e);
        aiText.innerText = "Bhai, net thoda slow hai, par tera style top hai!";
    }
}

// 2. RENDER PRODUCTS (Expanding Grid + Match Badge + Combo Link)
function renderProducts(data) {
    const grid = document.getElementById('product-grid');
    if(!grid) return;

    // Grid automatic expand hogi kyunki humne fixed height nahi di hai
    grid.innerHTML = data.map(p => `
        <div class="product-card p-6 relative flex flex-col justify-between" onclick="openDetails(${p.id})">
            <div>
                <div class="absolute top-4 right-4 bg-black/70 border border-[#BF953F] px-3 py-1 rounded-full text-[10px] font-black text-[#BF953F] z-10">
                    ${p.match || '90'}% MATCH
                </div>
                
                <img src="${p.img}" class="w-full h-52 object-cover rounded-2xl mb-4">
                <h4 class="text-sm font-bold text-white/80">${p.name}</h4>
                <p class="text-xl font-black mt-2 gold-text">₹${p.price}</p>
            </div>

            <div class="mt-4 pt-3 border-t border-white/5">
                <a href="combos.html?ref=${p.id}" class="text-[9px] text-[#BF953F] font-bold uppercase tracking-widest flex items-center gap-2 hover:underline" onclick="event.stopPropagation();">
                    <i data-lucide="package" class="w-3 h-3"></i> Get GIA Combo →
                </a>
            </div>
        </div>
    `).join('');
    
    lucide.createIcons();
}

// 3. SEARCH HANDLER (Fix for Mobile & Auto-Expand)
const searchInput = document.getElementById('ai-search-input');
if (searchInput) {
    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); 
            const query = searchInput.value.trim();
            if (query !== "") {
                askRealGiaAI(query);
                const filtered = allDatabase.filter(p => 
                    p.name.toLowerCase().includes(query.toLowerCase()) || 
                    p.category.toLowerCase().includes(query.toLowerCase())
                );
                renderProducts(filtered);
                
                // Result milne par scroll karega niche auto-expand ko dikhane ke liye
                window.scrollTo({ top: grid.offsetTop - 100, behavior: 'smooth' });
            }
        }
    });
}

// 4. MODAL LOGIC (Price Table Added)
function openDetails(id) {
    const p = allDatabase.find(x => x.id === id);
    const modal = document.getElementById('details-modal');
    document.getElementById('modal-content').innerHTML = `
        <div class="bg-[#04241a] rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl">
            <img src="${p.img}" class="w-full h-[400px] object-cover">
            <div class="p-8">
                <h2 class="text-3xl royal-logo gold-text mb-4">${p.name}</h2>
                
                <div class="bg-white/5 p-4 rounded-xl mb-6">
                    <table class="w-full text-xs text-white/60">
                        <tr class="border-b border-white/5"><td class="py-2">Base Price:</td><td class="text-right">₹${p.price}</td></tr>
                        <tr><td class="py-2">GIA Styling Fee:</td><td class="text-right text-[#BF953F]">INCLUDED</td></tr>
                    </table>
                </div>

                <p class="text-sm italic text-white/70 mb-8">"${p.sentiment || 'Best choice for you!'}"</p>
                <button class="w-full bg-[#BF953F] text-black py-4 rounded-full font-black uppercase text-xs">Buy Now</button>
            </div>
        </div>`;
    modal.style.display = 'block';
    lucide.createIcons();
}

function closeDetails() { document.getElementById('details-modal').style.display = 'none'; }

// 5. LEGAL DISCLAIMER & INIT
window.onload = () => {
    lucide.createIcons();
    renderProducts(allDatabase);

    // Disclaimer exactly at center bottom as requested
    const footer = document.querySelector('footer');
    if (footer) {
        const oldDisclaimer = document.getElementById('gia-legal');
        if (oldDisclaimer) oldDisclaimer.remove();

        const disclaimer = document.createElement('p');
        disclaimer.id = "gia-legal";
        disclaimer.style = "font-size: 8px; color: rgba(191,149,63,0.5); margin-top: 30px; text-align: center; text-transform: uppercase; letter-spacing: 2px; width: 100%; clear: both;";
        disclaimer.innerText = "© 2026 ALTER PROJECT | LEGAL DISCLAIMER: AI-Generated styling advice. No manual speech saved.";
        footer.appendChild(disclaimer);
    }
};
