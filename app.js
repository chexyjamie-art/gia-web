const canvas = document.getElementById("aiWave");
const ctx = canvas.getContext("2d");

let w, h, t = 0;

function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = 220;
}
window.addEventListener("resize", resize);
resize();

function drawWave(color, amp, freq, speed, yOffset) {
  ctx.beginPath();
  for (let x = 0; x <= w; x++) {
    const y =
      Math.sin(x * freq + t * speed) * amp +
      Math.sin(x * freq * 0.5 + t * speed * 0.6) * amp * 0.4 +
      yOffset;
    ctx.lineTo(x, y);
  }
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.stroke();
}

function animate() {
  ctx.clearRect(0, 0, w, h);

  drawWave("rgba(120,160,255,0.35)", 22, 0.012, 0.02, h / 2);
  drawWave("rgba(180,120,255,0.35)", 26, 0.01, 0.018, h / 2);
  drawWave("rgba(255,180,255,0.25)", 18, 0.014, 0.022, h / 2);

  t += 0.6;
  requestAnimationFrame(animate);
}
animate();