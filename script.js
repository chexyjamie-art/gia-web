// 1. UI Elements Selection
const chatBubble = document.getElementById('gia-chat-bubble');
const chatText = document.getElementById('gia-chat-text');
const searchInput = document.getElementById('gia-search-input');

// 2. REAL GEMINI AI CONFIGURATION
const GEMINI_API_KEY = "AIzaSyBooGwe97LGLxzaDBzr0txng2_sHFffhdI"; 

async function askRealGiaAI(userQuery) {
    if (!userQuery) return;

    // Pehle wala static text hatao aur GIA ko active karo
    if (chatBubble) chatBubble.classList.remove('hidden');
    if (chatText) chatText.innerHTML = "<span class='animate-pulse text-[#BF953F]'>GIA soch rahi hai...</span>";

    const prompt = `
        System: Tera naam GIA hai. Tu Rahul ki ek sacchi dost aur Luxury Stylist hai. 
        User ne ye bola: "${userQuery}"
        
        Instructions:
        - Koi purana saved reply use mat kar.
        - Ekdum real chat kar jaise koi insaan karta hai.
        - Desi/Hinglish touch rakho (Bhai, Yaar, Mast).
        - Styling tips do aur gift/personal use ke baare mein pucho.
        - Response 2-3 lines max.
    `;

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
        });

        const data = await response.json();
        
        if (data.candidates && data.candidates[0].content.parts[0].text) {
            const giaSpeech = data.candidates[0].content.parts[0].text;
            
            // YAHAN REAL GEMINI KA REPLY DISPLAY HOGA
            if (chatText) chatText.innerText = giaSpeech;

            // Voice output (Real-time)
            const utterance = new SpeechSynthesisUtterance(giaSpeech);
            utterance.lang = 'hi-IN';
            window.speechSynthesis.speak(utterance);
        }

    } catch (error) {
        console.error("GIA AI Error:", error);
        if (chatText) chatText.innerText = "Bhai, net slow hai ya API key check karo!";
    }
}

// 3. Search Handler (Real Chat Trigger)
if (searchInput) {
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const query = e.target.value;
            askRealGiaAI(query);
            // Niche wala combo engine call (optional)
            if(typeof generateInstantCombo === 'function') generateInstantCombo(query);
        }
    });
}