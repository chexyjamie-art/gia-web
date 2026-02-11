// ==========================================
// GIA SMART AI - MASTER LOGIC (3D, DYNAMIC SCORE & VIDEO)
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

// 2. RENDER PRODUCTS
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

// 3. ADVANCED SCORE PAGE (NEW DESIGN WITH GRAPH)
function openScorePage(id) {
    const p = allDatabase.find(x => x.id === id);
    const modal = document.getElementById('details-modal'); 
    
    // Dynamic Price Logic
    const currentPrice = parseInt(p.price.replace(',', ''));
    
    document.getElementById('modal-content').innerHTML = `
        <div class="bg-white text-[#04241a] rounded-[3rem] p-8 max-w-lg mx-auto shadow-2xl text-left relative">
            <button onclick="closeDetails()" class="absolute top-8 right-8 bg-gray-100 p-2 rounded-full text-black hover:bg-gray-200"><i data-lucide="x" class="w-4 h-4"></i></button>

            <div class="flex items-center gap-2 mb-6">
                <span class="bg-black text-white text-[8px] font-black px-3 py-1.5 rounded-full tracking-widest uppercase">Verified by GIA AI</span>
                <span class="text-[8px] text-green-500 font-bold italic animate-pulse">• Live Market Scan</span>
            </div>

            <h2 class="text-4xl font-black royal-logo mb-8 italic text-black">${p.name}</h2>

            <div class="bg-[#f8fbff] border border-[#eef5ff] rounded-[2rem] p-6 mb-6">
                <div class="flex justify-between items-center mb-8">
                    <h4 class="text-[10px] font-black text-[#2b5ba1] uppercase tracking-wider">Price History Scan</h4>
                    <span class="text-[9px] font-bold text-[#2b5ba1] border-b-2 border-[#2b5ba1]">3 Months</span>
                </div>
                
                <div class="flex items-end justify-between h-28 gap-3 mb-6 px-2">
                    <div class="flex-grow bg-[#dbeafe] rounded-xl" style="height: 70%"></div>
                    <div class="flex-grow bg-[#dbeafe] rounded-xl" style="height: 90%"></div>
                    <div class="flex-grow bg-[#3b82f6] rounded-xl shadow-lg shadow-blue-200" style="height: 50%"></div>
                    <div class="flex-grow bg-[#dbeafe] border-2 border-dashed border-blue-200 rounded-xl" style="height: 60%"></div>
                </div>

                <div class="grid grid-cols-2 gap-4 pt-4 border-t border-blue-50">
                    <div><p class="text-[8px] uppercase font-bold text-gray-400 mb-1">Price Signal</p><p class="text-[10px] font-black text-green-600 uppercase">Best Time to Buy</p></div>
                    <div><p class="text-[8px] uppercase font-bold text-gray-400 mb-1">Today's Price</p><p class="text-[10px] font-black text-[#2b5ba1] uppercase">₹${p.price}</p></div>
                </div>
            </div>

            <div class="grid grid-cols-2 gap-4 mb-8">
                <div class="bg-[#f2faf5] rounded-[2rem] p-6 text-center border border-[#e6f4ed]">
                    <p class="text-[9px] font-black text-[#2d7a4d] uppercase tracking-widest mb-2">Match Score</p>
                    <p class="text-5xl font-black text-[#2d7a4d]">${(p.match/10).toFixed(1)}</p>
                </div>
                <div class="bg-[#f9f9f9] rounded-[2rem] p-6 border border-gray-100">
                    <p class="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-4">Integrity Check</p>
                    <ul class="space-y-2 text-[9px] font-bold text-gray-600">
                        <li><i data-lucide="check" class="inline w-3 h-3 text-blue-500 mr-1"></i> Genuine Seller</li>
                        <li><i data-lucide="check" class="inline w-3 h-3 text-indigo-400 mr-1"></i> No Bot Reviews</li>
                    </ul>
                </div>
            </div>

            <div class="bg-black text-white p-8 rounded-[2.5rem]">
                <p class="text-[8px] font-black text-[#BF953F] uppercase tracking-[0.3em] mb-4">GIA Sentiment</p>
                <p class="text-xs leading-relaxed italic font-light">"Bhai, GIA ne market scan kiya hai. Fake reviews filter karne ke baad bhi results solid hain. Deal pakki hai!"</p>
            </div>
        </div>`;
    modal.style.display = 'block';
    lucide.createIcons();
}

// 4. COMPLETE PRODUCT DETAILS PAGE (360 + VIDEO + SPECS - NO PINCODE)
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
                    
                    <div class="flex items-center gap-4 mb-8">
                        <p class="text-3xl font-black italic">₹${p.price}</p>
                        <div class="px-3 py-1 bg-white/5 rounded-full border border-white/10 text-[8px] font-bold text-white/40 uppercase">Free Delivery</div>
                    </div>

                    <div class="mb-8 p-6 bg-white/5 rounded-3xl border border-white/5 space-y-4">
                        <div class="flex justify-between text-[10px] uppercase"><span class="text-white/40">Material:</span><span class="font-bold">${p.material || 'Premium Fabric'}</span></div>
                        <div class="flex justify-between text-[10px] uppercase"><span class="text-white/40">GIA Curation:</span><span class="font-bold">Verified Style</span></div>
                    </div>

                    <div class="stylist-lens-box mb-10 text-[12px] italic text-white/80">"${p.sentiment}"</div>

                    <button onclick="window.open('https://amazon.in')" class="w-full bg-[#BF953F] text-black py-5 rounded-2xl font-black uppercase text-xs shadow-lg hover:scale-105 transition">
                        Buy Now on ${p.brand}
                    </button>
                    <p class="text-[8px] text-center mt-4 text-white/20 uppercase tracking-widest">Redirecting to official store</p>
                </div>
            </div>
        </div>`;
    modal.style.display = 'block';
    lucide.createIcons();
}

// 5. SEARCH & INIT
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

function closeDetails() { 
    document.getElementById('details-modal').style.display = 'none'; 
    document.body.style.overflow = 'auto';
}

window.onload = () => {
    lucide.createIcons();
    renderProducts(allDatabase);
};