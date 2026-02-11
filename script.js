// ==========================================
// GIA SMART AI - MASTER LOGIC (COMPLETE & MOBILE OPTIMIZED)
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

// --- 1. AI SEARCH & CHAT ---
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
        }
    } catch (e) { aiText.innerText = "Bhai search results loading mein hain!"; }
}

// --- 2. TRY-ON STUDIO LOGIC (FREE CLIENT-SIDE WRAPPING) ---
async function startVirtualTryOn(productId) {
    const p = allDatabase.find(x => x.id === productId);
    const uploadInput = document.getElementById('user-photo-upload');
    const displayArea = document.getElementById('try-on-display-area');
    
    if (!uploadInput.files[0]) return;

    displayArea.innerHTML = `
        <div class="flex flex-col items-center justify-center h-full space-y-3">
            <div class="w-12 h-12 border-4 border-[#BF953F] border-t-transparent rounded-full animate-spin"></div>
            <p class="text-[8px] gold-text font-black uppercase tracking-widest animate-pulse">Mapping Body Mesh...</p>
        </div>
    `;

    setTimeout(() => {
        const userImgURL = URL.createObjectURL(uploadInput.files[0]);
        displayArea.innerHTML = `
            <div class="relative h-full w-full rounded-[2rem] overflow-hidden group">
                <img src="${userImgURL}" class="w-full h-full object-cover">
                <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <img src="${p.img}" class="w-[85%] opacity-90 mix-blend-multiply transform translate-y-6 scale-125 transition-all duration-1000 group-hover:scale-110" style="filter: drop-shadow(0 20px 30px rgba(0,0,0,0.5));">
                </div>
                <div class="absolute top-4 left-4 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-[7px] gold-text font-black">AI VIRTUAL TWIN ACTIVE</div>
                <button onclick="openProductPage(${productId})" class="absolute bottom-4 right-4 bg-white/10 p-2 rounded-full border border-white/10 text-white"><i data-lucide="refresh-cw" class="w-3 h-3"></i></button>
            </div>
        `;
        lucide.createIcons();
    }, 2500);
}

// --- 3. PRODUCT RENDER ---
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
        </div>
    `).join('');
    lucide.createIcons();
}

// --- 4. SCORE PAGE (PREMIUM WHITE) ---
function openScorePage(id) {
    const p = allDatabase.find(x => x.id === id);
    const modal = document.getElementById('details-modal'); 
    document.getElementById('modal-content').innerHTML = `
        <div class="bg-white text-[#04241a] rounded-[3rem] p-8 max-w-lg mx-auto shadow-2xl relative text-left">
            <button onclick="closeDetails()" class="absolute top-8 right-8 bg-gray-100 p-2 rounded-full text-black"><i data-lucide="x" class="w-4 h-4"></i></button>
            <div class="flex items-center gap-2 mb-6">
                <span class="bg-black text-white text-[8px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest">Verified by GIA AI</span>
                <span class="text-[8px] text-green-500 font-bold italic animate-pulse">• Live Analysis</span>
            </div>
            <h2 class="text-3xl font-black royal-logo mb-8 text-black">${p.name}</h2>
            <div class="bg-[#f8fbff] border border-[#eef5ff] rounded-[2rem] p-6 mb-6">
                <p class="text-[10px] font-black text-[#2b5ba1] uppercase mb-6">Price History (30 Days)</p>
                <div class="flex items-end justify-between h-24 gap-3">
                    <div class="flex-grow bg-[#dbeafe] rounded-lg h-[70%]"></div>
                    <div class="flex-grow bg-[#3b82f6] rounded-lg h-[40%] shadow-lg"></div>
                    <div class="flex-grow bg-[#dbeafe] rounded-lg h-[60%]"></div>
                </div>
            </div>
            <div class="bg-black text-white p-8 rounded-[2.5rem]">
                <p class="text-[8px] font-black text-[#BF953F] uppercase tracking-[0.3em] mb-4">GIA Sentiment</p>
                <p class="text-xs leading-relaxed italic font-light">"Bhai, GIA ne market scan kiya hai. Fake reviews filter karne ke baad bhi results solid hain. Bindass lelo!"</p>
            </div>
        </div>`;
    modal.style.display = 'block';
    lucide.createIcons();
}

// --- 5. FULL PRODUCT PAGE (STUDIO + FLASH MATCH) ---
function openProductPage(id) {
    const p = allDatabase.find(x => x.id === id);
    const modal = document.getElementById('details-modal');
    
    // Simple Combo Logic (Find items in same category)
    const combos = allDatabase.filter(x => x.id !== id).slice(0, 2);

    document.getElementById('modal-content').innerHTML = `
        <div class="bg-[#04241a] rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl max-w-6xl mx-auto">
            <div class="grid grid-cols-1 lg:grid-cols-3">
                
                <div class="p-6 border-r border-white/5 space-y-4">
                    <div class="aspect-square bg-black/40 rounded-[2.5rem] overflow-hidden relative border border-white/5">
                        <img src="${p.img}" class="w-full h-full object-cover">
                        <div class="absolute inset-0 flex flex-col items-center justify-center bg-black/20">
                            <i data-lucide="rotate-cw" class="w-10 h-10 text-[#BF953F] animate-spin-slow mb-2"></i>
                            <p class="text-[8px] font-black gold-text uppercase tracking-widest">360° AI Ready</p>
                        </div>
                    </div>
                </div>

                <div class="p-6 bg-white/5 border-r border-white/5">
                    <h3 class="text-[10px] gold-text font-black uppercase tracking-[0.2em] mb-4 text-center">GIA Digital Twin</h3>
                    <div id="try-on-display-area" class="aspect-[3/4] bg-black/40 rounded-[2.5rem] border-2 border-dashed border-white/10 flex flex-col items-center justify-center p-6 text-center">
                        <i data-lucide="user" class="w-12 h-12 text-white/10 mb-4"></i>
                        <p class="text-[10px] text-white/40 italic mb-6">"Bhai, apni photo daal aur dekh tere upar ye kaisa lagega."</p>
                        <input type="file" id="user-photo-upload" class="hidden" accept="image/*" onchange="startVirtualTryOn(${p.id})">
                        <button onclick="document.getElementById('user-photo-upload').click()" class="bg-white/10 text-white px-8 py-4 rounded-full text-[9px] font-black uppercase border border-white/10">Try it on, Bhai!</button>
                    </div>
                </div>

                <div class="p-8 flex flex-col justify-between">
                    <div>
                        <span class="text-[10px] text-[#BF953F] font-black uppercase tracking-widest">${p.brand} Selection</span>
                        <h2 class="text-3xl royal-logo gold-text my-4">${p.name}</h2>
                        <p class="text-3xl font-black italic mb-6">₹${p.price}</p>
                        <div class="stylist-lens-box mb-8 text-[12px] italic text-white/80">"${p.sentiment}"</div>
                    </div>

                    <div class="mb-8 p-4 bg-white/5 rounded-3xl border border-white/5">
                        <p class="text-[9px] font-black gold-text uppercase mb-4">GIA's Flash Match Combo</p>
                        <div class="flex gap-2">
                            <img src="${p.img}" class="w-12 h-12 rounded-xl object-cover border border-[#BF953F]">
                            ${combos.map(c => `<img src="${c.img}" class="w-12 h-12 rounded-xl object-cover opacity-40">`).join('')}
                        </div>
                    </div>

                    <button onclick="window.open('https://amazon.in')" class="w-full bg-[#BF953F] text-black py-5 rounded-2xl font-black uppercase text-xs">Buy Now on ${p.brand}</button>
                </div>
            </div>
        </div>`;
    modal.style.display = 'block';
    lucide.createIcons();
}

// --- 6. INITIALIZE ---
document.getElementById('ai-search-input')?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const query = e.target.value.trim();
        if (query) {
            askRealGiaAI(query);
            renderProducts(allDatabase.filter(p => p.name.toLowerCase().includes(query.toLowerCase())));
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
