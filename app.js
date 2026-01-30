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
document.getElementById("aiSearch").addEventListener("input", e => {
  const val = e.target.value.toLowerCase();
  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(val)
  );
  renderProducts(filtered);
});

// WISHLIST SYSTEM
function toggleWishlist(id) {
  if (wishlist.includes(id))
    wishlist = wishlist.filter(x => x !== id);
  else wishlist.push(id);

  localStorage.setItem("wishlist", JSON.stringify(wishlist));
  renderProducts(products);
}

const micIcon = document.querySelector('[title="Voice Search"]');

micIcon.onclick = () => {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = "en-IN";

  recognition.onresult = function(event) {
    const text = event.results[0][0].transcript;
    document.getElementById("aiSearch").value = text;

    const filtered = products.filter(p =>
      p.name.toLowerCase().includes(text.toLowerCase())
    );
    renderProducts(filtered);
  };

  recognition.start();
};

function toggleChat() {
  const chat = document.getElementById("chatPopup");
  chat.style.display = chat.style.display === "block" ? "none" : "block";
}

document.getElementById("chatInput").addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    const msg = e.target.value;
    addMessage("You", msg);
    addMessage("AI", aiReply(msg));
    e.target.value = "";
  }
});

function addMessage(sender, text) {
  const box = document.getElementById("chatMessages");
  box.innerHTML += `<p><b>${sender}:</b> ${text}</p>`;
}

function aiReply(msg) {
  msg = msg.toLowerCase();

  if (msg.includes("watch")) return "I suggest minimalist luxury watches under ₹10k.";
  if (msg.includes("shoes")) return "Running shoes with comfort cushioning would suit you.";
  return "Tell me your occasion & budget for best advice.";
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
  const div = document.createElement("div");
  div.innerHTML = `<b>${sender}:</b> ${text}`;
  chatMessages.appendChild(div);
}

function generateAIReply(msg) {
  msg = msg.toLowerCase();

  if (msg.includes("watch"))
    return "I recommend a minimalist silver watch under ₹10k. Avoid oversized dials for daily wear.";

  if (msg.includes("skin"))
    return "For glowing skin, use Vitamin C in morning & sunscreen daily. Avoid harsh scrubs.";

  if (msg.includes("outfit"))
    return "Try neutral sneakers, slim jeans & a pastel shirt for a clean modern look.";

  return "Tell me your budget & occasion — I’ll suggest the best option.";
}

let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

function toggleWishlist(productId) {
  if (wishlist.includes(productId)) {
    wishlist = wishlist.filter(id => id !== productId);
  } else {
    wishlist.push(productId);
  }

  localStorage.setItem("wishlist", JSON.stringify(wishlist));
  renderProducts(products);
}
