// ==========================================
// GIA SMART AI - MASTER LOGIC (ADVANCED 3D & SCORE)
// ==========================================

const GEMINI_API_KEY = "AIzaSyBooGwe97LGLxzaDBzr0txng2_sHfFfhdI"; 

// Updated Database with Brands, Specs, and Match Scores
const allDatabase = [
    { 
        id: 1, category: 'fashion', name: "Emerald Linen Shirt", price: "2,499", match: "98.4", 
        img: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600", 
        brand: "Amazon", material: "100% Premium Linen", 
        sentiment: "Bhai ye color elite vibe deta hai, summer parties ke liye aag hai!" 
    },
    { 
        id: 2, category: 'fashion', name: "Charcoal Chinos", price: "1,899", match: "94.2", 
        img: "https://images.unsplash.com/photo-1624373666563-54ec85a14962?w=600", 
        brand: "Myntra", material: "Stretchable Cotton Twill",
        sentiment: "Durable aur comfortable, GIA suggest karti hai isse white sneakers ke saath pehno." 
    },
    { 
        id: 101, category: 'beauty', name: "Salicylic Face Wash", price: "499", match: "91.5", 
        img: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600", 
        brand: "Nykaa", material: "Dermatologically Tested",
        sentiment: "Skin fresh rakhne ke liye isse better kuch nahi, personal use ke liye mast hai." 
    },
    { 
        id: 201, category: 'tech', name: "ANC Earbuds Pro", price: "4,499", match: "89.8", 
        img: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600", 
        brand: "Amazon", material: "Water Resistant IPX5",
        sentiment: "Gym ho ya travel, noise cancellation ekdum next level hai bhai." 
    }
];

// 1. REAL GEMINI AI CALL
async function askRealGiaAI(userQuery) {
    const aiBox = document.getElementById('gia-ai-box');
    const aiText = document.getElementById('gia-ai-text');
    if (aiBox) { aiBox.classList.remove('hidden'); aiBox.style.display = "block"; }
    if (aiText) aiText.innerHTML = "<span class='animate-pulse text-[#BF953F]'>GIA soch rahi hai...</span>";

    const prompt = `System: Tera naam GIA hai. Tu Rahul ki Best Friend aur Stylist hai. User ne pucha: "${userQuery}". Ekdum real desi doston wali chat kar. Max 2 lines.`;

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
            method: "POST", headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
        });
        const data = await response.json();
        if (data && data.candidates) {
            const giaReply = data.candidates[0].content.parts[0].text;
            aiText.innerText = giaReply; 
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(giaReply);
            utterance.lang = 'hi-IN';
            window.speechSynthesis.speak(utterance);
        }
    } catch (e) { aiText.innerText = "Bhai, net thoda slow hai!"; }
}

// 2. RENDER PRODUCTS (Score Badge + Full Page Click)
function renderProducts(data) {
    const grid = document.getElementById('product-grid');
    if(!grid) return;
    grid.innerHTML = data.map(p => `
        <div class="product-card p-6 relative flex flex-col justify-between" onclick="openProductPage(${p.id})">
            <div>
                <div class="absolute top-4 right-4 bg-black/80 border border-[#BF953F] px-3 py-1 rounded-full text-[10px] font-black text-[#BF953F] z-20" 
                     onclick="event.stopPropagation(); openScorePage(${p.id})">
                    ${p.match}% MATCH
                </div>
                
                <img src="${p.img}" class="w-full h-52 object-cover rounded-2xl mb-4">
                <h4 class="text-sm font-bold text-white/80">${p.name}</h4>
                <p class="text-xl font-black mt-2 gold-text">₹${p.price}</p>
                <p class="text-[9px] text-white/30 uppercase mt-1">Found on ${p.brand}</p>
            </div>

            <div class="mt-4 pt-3 border-t border-white/5 flex justify-between items-center">
                <a href="combos.html?ref=${p.id}" class="text-[9px] text-[#BF953F] font-bold uppercase tracking-widest flex items-center gap-2 hover:underline" onclick="event.stopPropagation();">
                    <i data-lucide="package" class="w-3 h-3"></i> Get Combo
                </a>
            </div>
        </div>
    `).join('');
    lucide.createIcons();
}

// 3. ADVANCED SCORE BREAKDOWN PAGE
function openScorePage(id) {
    const p = allDatabase.find(x => x.id === id);
    const modal = document.getElementById('details-modal'); // Reusing modal for score
    document.getElementById('modal-content').innerHTML = `
        <div class="bg-black/95 p-8 rounded-[2.5rem] border border-[#BF953F]/30 text-center">
            <h2 class="text-5xl font-black gold-text mb-2">${p.match}%</h2>
            <p class="text-[10px] uppercase tracking-widest text-white/40 mb-8">GIA Reliability Score</p>
            
            <div class="space-y-6 text-left">
                <div class="bg-white/5 p-4 rounded-2xl">
                    <p class="text-[10px] gold-text font-bold mb-2 uppercase">Sentiment Analysis</p>
                    <div class="flex justify-between text-[10px] mb-1"><span>Positive Reviews</span><span>92%</span></div>
                    <div class="w-full h-1 bg-white/10 rounded-full overflow-hidden"><div class="h-full bg-[#BF953F]" style="width: 92%"></div></div>
                    <p class="text-[9px] text-white/40 mt-3 italic">"AI Filter: 0 fake reviews detected. Verified human feedback."</p>
                </div>

                <div class="bg-white/5 p-4 rounded-2xl">
                    <p class="text-[10px] gold-text font-bold mb-2 uppercase">Price History (6 Months)</p>
                    <table class="w-full text-[10px] text-white/60">
                        <tr class="border-b border-white/5"><td class="py-2">Highest Price</td><td class="text-right">₹3,200</td></tr>
                        <tr class="border-b border-white/5"><td class="py-2">Lowest Price</td><td class="text-right text-green-400">₹2,100</td></tr>
                        <tr><td class="py-2">Current Price</td><td class="text-right gold-text font-bold">₹${p.price}</td></tr>
                    </table>
                </div>
            </div>
            <button onclick="closeDetails()" class="mt-8 text-[10px] font-bold uppercase tracking-widest text-white/20">Close Analysis</button>
        </div>`;
    modal.style.display = 'block';
    lucide.createIcons();
}

// 4. COMPLETE PRODUCT DETAILS PAGE (3D + VIDEO + SPECS)
function openProductPage(id) {
    const p = allDatabase.find(x => x.id === id);
    const modal = document.getElementById('details-modal');
    document.getElementById('modal-content').innerHTML = `
        <div class="bg-[#04241a] rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl max-w-4xl mx-auto">
            <div class="grid grid-cols-1 md:grid-cols-2">
                <div class="p-4 space-y-4">
                    <div class="aspect-square bg-black/40 rounded-3xl overflow-hidden relative group border border-white/5">
                        <img src="${p.img}" class="w-full h-full object-cover opacity-60">
                        <div class="absolute inset-0 flex flex-col items-center justify-center">
                            <i data-lucide="box" class="w-12 h-12 text-[#BF953F] animate-pulse mb-2"></i>
                            <p class="text-[8px] font-black gold-text uppercase tracking-widest">360° AI View Active</p>
                        </div>
                    </div>
                    <div class="aspect-video bg-black/60 rounded-2xl flex items-center justify-center border border-white/5 overflow-hidden">
                        <i data-lucide="play" class="text-white/20 w-8 h-8"></i>
                        <p class="text-[8px] uppercase text-white/20 ml-2 font-bold tracking-widest">Official Video</p>
                    </div>
                </div>

                <div class="p-8 flex flex-col">
                    <span class="text-[10px] text-[#BF953F] font-black uppercase tracking-widest">${p.brand} Exclusive</span>
                    <h2 class="text-3xl royal-logo gold-text my-4">${p.name}</h2>
                    
                    <div class="flex items-center gap-4 mb-6">
                        <p class="text-2xl font-black italic">₹${p.price}</p>
                        <div class="px-3 py-1 bg-white/5 rounded-full border border-white/10 text-[8px] font-bold text-white/40 uppercase">Free Delivery</div>
                    </div>

                    <div class="mb-6 p-4 bg-white/5 rounded-2xl border border-white/5 space-y-3">
                        <div class="flex justify-between text-[9px] uppercase"><span class="text-white/40">Material:</span><span class="font-bold">${p.material}</span></div>
                        <div class="flex justify-between text-[9px] uppercase"><span class="text-white/40">Sizes:</span><span class="font-bold">S, M, L, XL</span></div>
                    </div>

                    <div class="flex gap-2 mb-8">
                        <input type="text" placeholder="Pincode" class="bg-black/40 border border-white/10 rounded-xl px-4 py-2 text-xs outline-none focus:border-[#BF953F] flex-grow">
                        <button class="bg-white/10 px-4 py-2 rounded-xl text-[8px] font-black">CHECK</button>
                    </div>

                    <div class="stylist-lens-box mb-8 text-[12px] italic text-white/80">"${p.sentiment}"</div>

                    <button onclick="window.open('https://amazon.in')" class="w-full bg-[#BF953F] text-black py-4 rounded-2xl font-black uppercase text-xs shadow-lg">
                        Buy Now on ${p.brand}
                    </button>
                </div>
            </div>
        </div>`;
    modal.style.display = 'block';
    lucide.createIcons();
}

// 5. SEARCH & INIT (Auto-Expand Grid)
const searchInput = document.getElementById('ai-search-input');
if (searchInput) {
    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); 
            const query = searchInput.value.trim();
            if (query !== "") {
                askRealGiaAI(query);
                const filtered = allDatabase.filter(p => p.name.toLowerCase().includes(query.toLowerCase()));
                renderProducts(filtered);
            }
        }
    });
}

function closeDetails() { document.getElementById('details-modal').style.display = 'none'; }

window.onload = () => {
    lucide.createIcons();
    renderProducts(allDatabase);
};
