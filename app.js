let allProducts = [];
const container = document.getElementById("products");

// ================= LOAD PRODUCTS =================
fetch("products.json")
  .then(res => res.json())
  .then(data => {
    allProducts = data;
    renderProducts(allProducts);
  });

// ================= RENDER PRODUCTS =================
function renderProducts(products) {
  container.innerHTML = "";
  products.forEach(p => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img src="${p.image}">
      <h3>${p.name}</h3>
      <p>${p.price}</p>

      <button onclick="addToWishlist(${p.id})">❤️ Wishlist</button>

      <button onclick="tryOnLock()">👗 Try On</button>

      <a href="${p.link}" target="_blank">Buy Now</a>
    `;

    container.appendChild(card);
  });
}

// ================= WISHLIST SYSTEM =================
function addToWishlist(id) {
  let list = JSON.parse(localStorage.getItem("wishlist")) || [];
  if (!list.includes(id)) {
    list.push(id);
    localStorage.setItem("wishlist", JSON.stringify(list));
    alert("Added to Wishlist ❤️");
  }
}

// ================= AI SEARCH LOGIC =================
document.getElementById("aiSearch").addEventListener("input", e => {
  const q = e.target.value.toLowerCase();

  const filtered = allProducts.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.category.toLowerCase().includes(q)
  );

  renderProducts(filtered);
});

// ================= VOICE SEARCH =================
function startVoice() {
  const recognition = new webkitSpeechRecognition();
  recognition.lang = "en-IN";

  recognition.onresult = e => {
    document.getElementById("aiSearch").value =
      e.results[0][0].transcript;
    document.getElementById("aiSearch").dispatchEvent(new Event("input"));
  };

  recognition.start();
}

document.querySelector("[title='Voice Search']").onclick = startVoice;

// ================= TRY ON LOCK =================
function tryOnLock() {
  alert("Try-On feature 🔒 Locked — Coming in Premium Version");
}

// ================= AI WAVE =================
const canvas = document.getElementById("waveCanvas");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = 300;
}
resize();
window.addEventListener("resize", resize);

let t = 0;

function drawWave(amp, freq, speed) {
  ctx.beginPath();
  for (let x = 0; x < canvas.width; x++) {
    const y = canvas.height / 2 +
      Math.sin(x * freq + t * speed) * amp;
    ctx.lineTo(x, y);
  }
  ctx.strokeStyle = "rgba(150,180,255,0.5)";
  ctx.stroke();
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawWave(40, 0.02, 0.02);
  drawWave(30, 0.03, 0.015);
  t++;
  requestAnimationFrame(animate);
}
animate();