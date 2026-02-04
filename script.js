// GIA Smart Interaction Logic
const auraMessages = document.getElementById('aura-messages');
const section3D = document.getElementById('gia-3d-section');
const sectionCompare = document.getElementById('gia-comparison-section');

// Function: GIA ki taraf se message bhejna
function giaSay(text, showOptions = false) {
    const msg = document.createElement('div');
    msg.className = "bg-blue-50 p-3 rounded-2xl rounded-tl-none text-black mb-3 animate-fade-in";
    msg.innerHTML = text;
    auraMessages.appendChild(msg);

    if (showOptions) {
        const btnContainer = document.createElement('div');
        btnContainer.className = "flex gap-2 mt-2";
        
        if (text.includes("3D")) {
            btnContainer.innerHTML = `
                <button onclick="activateFeature('3d')" class="bg-black text-white px-4 py-2 rounded-xl text-[10px]">Haan, 3D dikhao</button>
                <button onclick="giaSay('Theek hai, jab mann kare tab batana!')" class="bg-gray-100 px-4 py-2 rounded-xl text-[10px]">Nahi, baad mein</button>
            `;
        } else if (text.includes("Comparison")) {
            btnContainer.innerHTML = `
                <button onclick="activateFeature('compare')" class="bg-blue-600 text-white px-4 py-2 rounded-xl text-[10px]">Comparison dikhao</button>
            `;
        }
        auraMessages.appendChild(btnContainer);
    }
    auraMessages.scrollTop = auraMessages.scrollHeight;
}

// Features ko activate karne ka function
function activateFeature(type) {
    if (type === '3d') {
        section3D.classList.remove('hidden');
        section3D.scrollIntoView({ behavior: 'smooth' });
        giaSay("✨ Done! Aapke liye 3D simulation active kar diya hai. Aap ise rotate karke dekh sakte hain.");
    } else if (type === 'compare') {
        sectionCompare.classList.remove('hidden');
        sectionCompare.scrollIntoView({ behavior: 'smooth' });
        giaSay("📊 Comparison Table taiyar hai! Maine Amazon aur Flipkart ke price scan kar liye hain.");
    }
}

// Simulation: Jab user search kare ya product dekhe
setTimeout(() => {
    giaSay("Rahul, kya tum is product ko **3D** mein dekhna chahte ho? Main aapko iska 360° view dikha sakti hoon.", true);
}, 5000);

setTimeout(() => {
    giaSay("Kya tum is product ki **Price Comparison Table** dekhna chahte ho? Main aapko best deals dhoondh kar dikha sakti hoon.", true);
}, 10000);
