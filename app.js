/* ===============================
   AI SEARCH WAVE
================================ */

const canvas = document.getElementById("aiWave");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = 220;
}
resize();
window.addEventListener("resize", resize);

let t = 0;

function drawWave() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.beginPath();
  ctx.moveTo(0, canvas.height / 2);

  for (let x = 0; x < canvas.width; x++) {
    const y =
      canvas.height / 2 +
      Math.sin(x * 0.01 + t) * 18 +
      Math.sin(x * 0.02 + t * 1.5) * 8;
    ctx.lineTo(x, y);
  }

  ctx.strokeStyle = "rgba(120,150,255,0.35)";
  ctx.lineWidth = 2;
  ctx.stroke();

  t += 0.03;
  requestAnimationFrame(drawWave);
}

drawWave();

/* ===============================
   AI TYPING EFFECT
================================ */

const aiInput = document.getElementById("aiSearch");

const prompts = [
  "Luxury skincare for glowing skin",
  "Best watch under ₹20,000",
  "AI picked products for you",
  "Smart fashion, zero confusion"
];

let p = 0;
let i = 0;

function typeEffect() {
  if (i <= prompts[p].length) {
    aiInput.placeholder = prompts[p].slice(0, i++);
  } else {
    setTimeout(() => {
      i = 0;
      p = (p + 1) % prompts.length;
    }, 1500);
  }
}

setInterval(typeEffect, 120);