// ==========================================
// GIA SMART AI - 100% WORKING FIXED CODE
// ==========================================

const chatBubble = document.getElementById('gia-chat-bubble');
const chatText = document.getElementById('gia-chat-text');
const searchInput = document.getElementById('gia-search-input');

// API KEY (Fixed Syntax)
const GEMINI_API_KEY = "AIzaSyBooGwe97LGLxzaDBzr0txng2_sHfFfhdI"; 

async function askRealGiaAI(userQuery) {
    if (!userQuery) return;

    // 1. Box ko tabhi dikhao jab user search kare
    if (chatBubble) {
        chatBubble.classList.remove('hidden');
        chatBubble.style.display = "block"; // Extra safety for visibility
    }
    
    // 2. Loading state dikhao
    if (chatText) chatText.innerHTML = "<span class='animate-pulse text-[#BF953F]'>GIA soch rahi hai...</span>";

    const prompt = `System: Tera naam GIA hai. Tu ek Luxury Stylist hai. User Query: "${userQuery}". Response frankly aur Desi touch mein dena 2 lines max. Styling tip bhi dena.`;

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
            method: "POST",
            headers: { 
                "Content-Type": "application/json" // <--- FIXED: 'ison' se 'json' kar diya
            },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }]
            })
        });

        const data = await response.json();
        
        if (data.candidates && data.candidates[0].content.parts[0].text) {
            const giaSpeech = data.candidates[0].content.parts[0].text;
            
            // 3. Real AI reply yahan insert hoga (Purana text gayab ho jayega)
            chatText.innerText = giaSpeech; 

            // Voice output
            const utterance = new SpeechSynthesisUtterance(giaSpeech);
            utterance.lang = 'hi-IN';
            window.speechSynthesis.speak(utterance);
        }

    } catch (error) {
        console.error("GIA Error:", error);
        chatText.innerText = "Bhai, net slow hai ya API key block ho gayi hai. Check karo!";
    }
}

// Search Event Listener
if (searchInput) {
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const query = e.target.value;
            askRealGiaAI(query);
            
            // Yahan aap apna purana product filter logic bhi chala sakte ho
            console.log("Searching for:", query);
        }
    });
}

// Legal Disclaimer (Center Bottom)
window.addEventListener('load', () => {
    const disclaimer = document.createElement('div');
    disclaimer.style = "text-align:center; font-size:10px; color:gray; margin: 40px 0; padding:10px; width:100%; border-top: 1px solid #1a1a1a;";
    disclaimer.innerHTML = "© 2026 ALTER PROJECT | LEGAL DISCLAIMER: AI-generated styling advice. Prices and availability are subject to partner brand terms.";
    document.body.appendChild(disclaimer);
});
