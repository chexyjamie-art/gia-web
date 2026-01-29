// ===== LOAD PRODUCTS =====
let allProducts = [];

fetch("products.json")
  .then(res => res.json())
  .then(data => {
    allProducts = data;
    renderProducts(allProducts);
  });

// ===== RENDER =====
function renderProducts(list) {
  const box = document.getElementById("products");
  box.innerHTML = "";

  list.forEach(p => {
    box.innerHTML += `
      <div class="card">
        <img src="${p.image}">
        <h3>${p.name}</h3>
        <p>${p.price}</p>
        <button onclick="window.open('${p.link}','_blank')">
          Buy Now →
        </button>
      </div>
    `;
  });
}

// ===== CATEGORY FILTER =====
document.querySelectorAll(".categories span").forEach(btn => {
  btn.onclick = () => {
    document.querySelectorAll(".categories span").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const cat = btn.dataset.cat;
    if (cat === "all") renderProducts(allProducts);
    else renderProducts(allProducts.filter(p => p.category === cat));
  };
});

// ===== AI WAVE =====
const canvas = document.getElementById("aiWave");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = 220;

let t = 0;
function wave() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.beginPath();
  for (let x=0;x<canvas.width;x++) {
    let y = 110 + Math.sin(x*0.01+t)*20;
    ctx.lineTo(x,y);
  }
  ctx.strokeStyle = "rgba(120,150,255,0.4)";
  ctx.lineWidth = 2;
  ctx.stroke();
  t+=0.04;
  requestAnimationFrame(wave);
}
wave();

const canvas = document.getElementById("waveCanvas");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = 260;
}
resize();
window.addEventListener("resize", resize);

let t = 0;

function drawWave(color, amp, freq, speed) {
  ctx.beginPath();
  for (let x = 0; x < canvas.width; x++) {
    const y =
      canvas.height / 2 +
      Math.sin(x * freq + t * speed) * amp *
      Math.exp(-Math.abs(x - canvas.width / 2) / 350);
    ctx.lineTo(x, y);
  }
  ctx.strokeStyle = color;
  ctx.lineWidth = 3;
  ctx.stroke();
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawWave("rgba(120,200,255,0.6)", 30, 0.02, 0.02);
  drawWave("rgba(170,140,255,0.6)", 40, 0.018, 0.025);
  drawWave("rgba(200,220,255,0.8)", 22, 0.025, 0.03);

  t += 1;
  requestAnimationFrame(animate);
}

animate();