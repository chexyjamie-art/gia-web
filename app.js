const phrases = [
  "Luxury skincare for glowing skin?",
  "Best watches under ₹20,000",
  "AI selected fashion for weddings",
  "Minimal shoes for daily wear"
];

let phraseIndex = 0;
let charIndex = 0;

const input = document.getElementById("aiSearch");

function typeText() {
  if (!input) return;

  if (charIndex < phrases[phraseIndex].length) {
    input.placeholder += phrases[phraseIndex].charAt(charIndex);
    charIndex++;
    setTimeout(typeText, 70);
  } else {
    setTimeout(eraseText, 2000);
  }
}

function eraseText() {
  if (charIndex > 0) {
    input.placeholder = input.placeholder.slice(0, -1);
    charIndex--;
    setTimeout(eraseText, 40);
  } else {
    phraseIndex = (phraseIndex + 1) % phrases.length;
    setTimeout(typeText, 500);
  }
}

typeText();