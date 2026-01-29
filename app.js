// AI Search Typing
const phrases = [
  "Luxury skincare for glowing skin?",
  "Best watches under ₹20,000",
  "AI selected fashion for weddings",
  "Minimal shoes for daily wear"
];

let phraseIndex = 0, charIndex = 0;
const input = document.getElementById("aiSearch");

function typeText() {
  if (charIndex < phrases[phraseIndex].length) {
    input.placeholder += phrases[phraseIndex].charAt(charIndex++);
    setTimeout(typeText, 70);
  } else setTimeout(eraseText, 2000);
}

function eraseText() {
  if (charIndex > 0) {
    input.placeholder = input.placeholder.slice(0, -1);
    charIndex--;
    setTimeout(eraseText, 40);
  } else {
    phraseIndex = (phraseIndex + 1) % phrases.length;
    setTimeout(typeText, 400);
  }
}
typeText();

// Load Products
fetch("products.json")
  .then(res => res.json())
  .then(data => {
    const container = document.querySelector(".products");
    container.innerHTML = "";

    data.forEach(p => {
      container.innerHTML += `
        <div class="card">
          <span class="badge">AI Verified</span>
          <img src="${p.image}">
          <h3>${p.name}</h3>
          <p>${p.price}</p>
          <a href="${p.affiliate}" target="_blank">
            <button>Buy Now →</button>
          </a>
        </div>`;
    });
  });