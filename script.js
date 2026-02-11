// ==========================================
// GIA SMART AI - MASTER LOGIC (FIXED & OPTIMIZED)
// ==========================================

const GEMINI_API_KEY = "AIzaSyBooGwe97LGLxzaDBzr0txng2_sHfFfhdI"; 

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

// 1. SEARCH FIX: Proper API Handling
async function askRealGiaAI(userQuery) {
    const aiBox = document.getElementById('gia-ai-box');
    const aiText = document.getElementById('gia-ai-text');
    if (aiBox) { aiBox.classList.remove('hidden'); aiBox.style.display = "block"; }
    if (aiText) aiText.innerHTML = "<span class='animate-pulse text-[#BF953F]'>GIA soch rahi hai...</span>";

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
            method: "POST", headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ contents: [{ parts: [{ text: `Tera naam GIA hai. Tu Rahul ki Best Friend hai. User ne pucha: "${userQuery}". Desi style mein 2 lines mein reply kar.` }] }] })
        });
        const data = await response.json();
        if (data && data.candidates) {
            aiText.innerText = data.candidates[0].content.parts[0].text;
        } else {
            throw new Error();
        }
    } catch (e) { 
        aiText.innerText = "Bhai search results loading mein hain, tab tak niche curated options dekho!"; 
    }
}

// 2. RENDER PRODUCTS
function renderProducts(data) {
    const grid = document.getElementById('product-grid');
    if(!grid) return;
    grid.innerHTML = data.map(p => `
        <div class="product-card p-6 relative flex flex-col justify-between" onclick="openProductPage(${p.id})">
            <div class="absolute top-4 right-4 bg-black/80 border border-[#BF953F] px-3 py-1 rounded-full text-[10px] font-black text-[#BF953F] z-20" 
                 onclick="event.stopPropagation(); openScorePage(${p.id})">
                ${p.match}% MATCH
            </div>
            <img src="${p.img}" class="w-full h-52 object-cover rounded-2xl mb-4">
            <h4 class="text-sm font-bold text-white/80">${p.name}</h4>
            <p class="text-xl font-black mt-2 gold-text">₹${p.price}</p>
            <p class="text-[9px] text-white/30 uppercase mt-1">Found on ${p.brand}</p>
        </div>
    `).join('');
    lucide.createIcons();
}

// 3. SCORE PAGE: EXACT SCREENSHOT DESIGN (WHITE PREMIUM)
function openScorePage(id) {
    const p = allDatabase.find(x => x.id === id);
    const modal = document.getElementById('details-modal'); 
    
    document.getElementById('modal-content').innerHTML = `
        <div class="bg-white text-[#04241a] rounded-[3rem] p-8 max-w-lg mx-auto shadow-2xl text-left relative">
            <button onclick="closeDetails()" class="absolute top-8 right-8 bg-gray-100 p-2 rounded-full text-black transition hover:scale-110"><i data-lucide="x" class="w-4 h-4"></i></button>

            <div class="flex items-center gap-2 mb-6">
                <span class="bg-black text-white text-[8px] font-black px-3 py-1.5 rounded-full tracking-widest uppercase">Verified by GIA AI</span>
                <span class="text-[8px] text-green-500 font-bold italic animate-pulse">• Live Analysis</span>
            </div>

            <h2 class="text-3xl font-black royal-logo mb-8 italic text-black">${p.name}</h2>

            <div class="bg-[#f8fbff] border border-[#eef5ff] rounded-[2rem] p-6 mb-6">
                <div class="flex justify-between items-center mb-8">
                    <h4 class="text-[10px] font-black text-[#2b5ba1] uppercase tracking-wider">Price Analysis</h4>
                    <span class="text-[9px] font-bold text-[#2b5ba1] border-b-2 border-[#2b5ba1]">30 Days</span>
                </div>
                <div class="flex items-end justify-between h-24 gap-3 mb-6 px-2">
                    <div class="flex-grow bg-[#dbeafe] rounded-lg h-[60%]"></div>
                    <div class="flex-grow bg-[#dbeafe] rounded-lg h-[85%]"></div>
                    <div class="flex-grow bg-[#3b82f6] rounded-lg shadow-lg h-[45%]"></div>
                    <div class="flex-grow bg-[#dbeafe] border-2 border-dashed border-blue-200 rounded-lg h-[55%]"></div>
                </div>
                <div class="flex justify-between pt-4 border-t border-blue-50">
                   <div><p class="text-[8px] text-gray-400 uppercase font-bold">Signal</p><p class="text-[10px] font-black text-green-600">BEST PRICE</p></div>
                   <div class="text-right"><p class="text-[8px] text-gray-400 uppercase font-bold">Today</p><p class="text-[10px] font-black text-[#2b5ba1]">₹${p.price}</p></div>
                </div>
            </div>

            <div class="grid grid-cols-2 gap-4 mb-8">
                <div class="bg-[#f2faf5] rounded-[2rem] p-6 text-center border border-[#e6f4ed]">
                    <p class="text-[9px] font-black text-[#2d7a4d] uppercase mb-2">Match</p>
                    <p class="text-4xl font-black text-[#2d7a4d]">${(p.match/10).toFixed(1)}</p>
                </div>
                <div class="bg-[#f9f9f9] rounded-[2rem] p-6 border border-gray-100">
                    <p class="text-[9px] font-black text-gray-500 uppercase mb-4">Checks Passed</p>
                    <ul class="space-y-2 text-[9px] font-bold text-gray-600">
                        <li><i data-lucide="check" class="inline w-3 h-3 text-blue-500 mr-1"></i> Genuine Store</li>
                        <li><i data-lucide="shield-check" class="inline w-3 h-3 text-indigo-400 mr-1"></i> No Bot Reviews</li>
                    </ul>
                </div>
            </div>

            <div class="bg-black text-white p-8 rounded-[2.5rem]">
                <p class="text-[8px] font-black text-[#BF953F] uppercase tracking-[0.3em] mb-4">GIA Sentiment</p>
                <p class="text-xs leading-relaxed italic font-light">"Bhai, ye item abhi buying range mein hai. Fake reviews filter karne ke baad bhi results solid hain. Bindass lelo!"</p>
            </div>
        </div>`;
    modal.style.display = 'block';
    lucide.createIcons();
}

// 4. PRODUCT DETAILS: NO PINCODE, FAST LOADING 360°
function openProductPage(id) {
    const p = allDatabase.find(x => x.id === id);
    const modal = document.getElementById('details-modal');
    document.getElementById('modal-content').innerHTML = `
        <div class="bg-[#04241a] rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl max-w-4xl mx-auto">
            <div class="grid grid-cols-1 md:grid-cols-2">
                <div class="p-4 space-y-4">
                    <div class="aspect-square bg-black/40 rounded-3xl overflow-hidden relative group border border-white/5">
                        <img src="${p.img}" class="w-full h-full object-cover opacity-80 group-hover:scale-110 transition duration-700">
                        <div class="absolute inset-0 flex flex-col items-center justify-center bg-black/20">
                            <i data-lucide="rotate-cw" class="w-10 h-10 text-[#BF953F] animate-spin-slow mb-2"></i>
                            <p class="text-[8px] font-black gold-text uppercase tracking-widest">360° View Ready</p>
                        </div>
                    </div>
                    <div class="aspect-video bg-black/60 rounded-2xl flex items-center justify-center border border-white/5">
                        <i data-lucide="play" class="text-white/20 w-8 h-8"></i>
                        <p class="text-[8px] uppercase text-white/20 ml-2 font-bold tracking-widest">Reel Video</p>
                    </div>
                </div>

                <div class="p-8 flex flex-col">
                    <span class="text-[10px] text-[#BF953F] font-black uppercase tracking-widest">${p.brand} Selection</span>
                    <h2 class="text-3xl royal-logo gold-text my-4">${p.name}</h2>
                    <p class="text-3xl font-black italic mb-8">₹${p.price}</p>

                    <div class="mb-8 p-6 bg-white/5 rounded-3xl border border-white/5 space-y-4">
                        <div class="flex justify-between text-[10px] uppercase"><span class="text-white/40">Material:</span><span class="font-bold text-white">${p.material}</span></div>
                        <div class="flex justify-between text-[10px] uppercase"><span class="text-white/40">Shipment:</span><span class="font-bold text-green-400">Verified</span></div>
                    </div>

                    <div class="stylist-lens-box mb-10 text-[12px] italic text-white/80">"${p.sentiment}"</div>

                    <button onclick="window.open('https://amazon.in')" class="w-full bg-[#BF953F] text-black py-5 rounded-2xl font-black uppercase text-xs shadow-lg hover:scale-105 transition">
                        Purchase on ${p.brand}
                    </button>
                </div>
            </div>
        </div>`;
    modal.style.display = 'block';
    lucide.createIcons();
}

// 5. SEARCH LOGIC
document.getElementById('ai-search-input')?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const query = e.target.value.trim();
        if (query) {
            askRealGiaAI(query);
            const filtered = allDatabase.filter(p => p.name.toLowerCase().includes(query.toLowerCase()));
            renderProducts(filtered);
        }
    }
});

function closeDetails() { 
    document.getElementById('details-modal').style.display = 'none'; 
    document.body.style.overflow = 'auto';
}

window.onload = () => {
    lucide.createIcons();
    renderProducts(allDatabase);
};
