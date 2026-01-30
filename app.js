let products = [];
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

// LOAD PRODUCTS
fetch("products.json")
  .then(res => res.json())
  .then(data => {
    products = data;
    renderProducts(products);
  });

// RENDER PRODUCTS
function renderProducts(list) {
  const container = document.getElementById("products");
  if (!container) return;

  container.innerHTML = "";

  list.forEach(p => {
    container.innerHTML += `
      <div class="card">
        <img src="${p.image}">
        <h3>${p.name}</h3>
        <p>₹${p.price}</p>

        <button onclick="toggleWishlist(${p.id})">
          ${wishlist.includes(p.id) ? "❤️ Saved" : "🤍 Wishlist"}
        </button>
      </div>
    `;
  });
}

// CATEGORY FILTER
document.querySelectorAll(".categories span").forEach(btn => {
  btn.onclick = () => {
    document.querySelector(".active")?.classList.remove("active");
    btn.classList.add("active");

    const cat = btn.dataset.cat;
    if (cat === "all") renderProducts(products);
    else renderProducts(products.filter(p => p.category === cat));
  };
});

// SEARCH FILTER
document.getElementById("aiSearch")?.addEventListener("input", e => {
  aiSearchLogic(e.target.value);
});

function aiSearchLogic(query) {
  query = query.toLowerCase();

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(query) ||
    p.category.toLowerCase().includes(query)
  );

  renderProducts(filtered);
}

// WISHLIST SYSTEM
function toggleWishlist(id) {
  if (wishlist.includes(id))
    wishlist = wishlist.filter(x => x !== id);
  else wishlist.push(id);

  localStorage.setItem("wishlist", JSON.stringify(wishlist));
  renderProducts(products);
}

// VOICE SEARCH
const micIcon = document.querySelector('[title="Voice Search"]');

if (micIcon && ('webkitSpeechRecognition' in window)) {
  const recognition = new webkitSpeechRecognition();
  recognition.lang = "en-IN";

  micIcon.onclick = () => recognition.start();

  recognition.onresult = function (event) {
    const text = event.results[0][0].transcript;
    document.getElementById("aiSearch").value = text;
    aiSearchLogic(text);
  };
}

// CHAT POPUP
function toggleChat() {
  const chat = document.getElementById("chatPopup");
  if (!chat) return;
  chat.style.display = chat.style.display === "block" ? "none" : "block";
}

const chatInput = document.getElementById("chatInput");
const chatMessages = document.getElementById("chatMessages");

if (chatInput) {
  chatInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      sendMessage(this.value);
      this.value = "";
    }
  });
}

function sendMessage(msg) {
  addChat("You", msg);
  let reply = generateAIReply(msg);
  setTimeout(() => addChat("AI Stylist", reply), 500);
}

function addChat(sender, text) {
  if (!chatMessages) return;

  const div = document.createElement("div");
  div.innerHTML = `<b>${sender}:</b> ${text}`;
  chatMessages.appendChild(div);
}

function generateAIReply(msg) {
  msg = msg.toLowerCase();

  if (msg.includes("watch"))
    return "I recommend a minimalist silver watch under ₹10k. Avoid oversized dials.";

  if (msg.includes("skin"))
    return "Use Vitamin C serum in morning & sunscreen daily.";

  if (msg.includes("outfit"))
    return "Try neutral sneakers, slim jeans & pastel shirt for modern look.";

  return "Tell me your budget & occasion for best suggestions.";
}

// OUTFIT GENERATOR
function generateOutfit() {
  const shoes = products.find(p => p.category === "Shoes");
  const watch = products.find(p => p.category === "Watches");

  if (!shoes || !watch) {
    alert("Not enough data for outfit.");
    return;
  }

  alert(`Outfit Idea:
• Shoes: ${shoes.name}
• Watch: ${watch.name}
• Pair with neutral jeans & white shirt`);
}

// BEAUTY AI
function beautyAI(concern) {
  concern = concern.toLowerCase();

  if (concern.includes("acne"))
    return "Use salicylic acid facewash & oil-free moisturizer.";

  if (concern.includes("glow"))
    return "Use Vitamin C serum & sunscreen daily.";

  if (concern.includes("dark spots"))
    return "Niacinamide + Tranexamic acid helps reduce spots.";

  return "Tell me your skin type for better advice.";
}