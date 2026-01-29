// ================= PRODUCTS DATA =================
const products = [
  {
    name:"Luxury Watch",
    category:"Watches",
    image:"https://via.placeholder.com/250",
    link:"https://www.amazon.in"
  },
  {
    name:"Running Shoes",
    category:"Shoes",
    image:"https://via.placeholder.com/250",
    link:"https://www.myntra.com"
  },
  {
    name:"Face Serum",
    category:"Skincare",
    image:"https://via.placeholder.com/250",
    link:"https://www.flipkart.com"
  },
  {
    name:"Smartphone",
    category:"Electronics",
    image:"https://via.placeholder.com/250",
    link:"https://www.amazon.in"
  }
];

const container = document.getElementById("products");

function renderProducts(filter="all") {
  container.innerHTML="";
  products
    .filter(p => filter==="all" || p.category===filter)
    .forEach(p=>{
      const card=document.createElement("div");
      card.className="card";
      card.innerHTML=`
        <img src="${p.image}">
        <h3>${p.name}</h3>
        <a href="${p.link}" target="_blank">Buy Now</a>
      `;
      container.appendChild(card);
    });
}

renderProducts();

// CATEGORY FILTER
document.querySelectorAll(".categories span").forEach(btn=>{
  btn.addEventListener("click",()=>{
    document.querySelector(".categories .active").classList.remove("active");
    btn.classList.add("active");
    renderProducts(btn.dataset.cat);
  });
});

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

function drawWave(color, amp, freq, speed, fade) {
  ctx.beginPath();
  for (let x = 0; x < canvas.width; x++) {
    const dist = Math.abs(x - canvas.width / 2);
    const decay = Math.exp(-dist / 320);

    const y =
      canvas.height / 2 +
      Math.sin(x * freq + t * speed) * amp * decay;

    ctx.lineTo(x, y);
  }
  ctx.strokeStyle = color;
  ctx.lineWidth = 3;
  ctx.globalAlpha = fade;
  ctx.stroke();
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawWave("rgba(160,200,255,1)", 40, 0.018, 0.02, 0.6);
  drawWave("rgba(190,160,255,1)", 55, 0.016, 0.025, 0.5);
  drawWave("rgba(220,230,255,1)", 30, 0.022, 0.03, 0.7);

  t += 1;
  requestAnimationFrame(animate);
}

animate();