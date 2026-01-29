const phrases = [
  "Luxury skincare for glowing skin?",
  "Best watch for daily elegance",
  "Shoes that match my lifestyle",
  "AI verified premium products"
];

let index = 0;
let char = 0;
const input = document.getElementById("aiSearch");

function typeEffect() {
  if (char < phrases[index].length) {
    input.placeholder += phrases[index].charAt(char);
    char++;
    setTimeout(typeEffect, 60);
  } else {
    setTimeout(eraseEffect, 2000);
  }
}

function eraseEffect() {
  if (char > 0) {
    input.placeholder = phrases[index].substring(0, char - 1);
    char--;
    setTimeout(eraseEffect, 40);
  } else {
    index = (index + 1) % phrases.length;
    setTimeout(typeEffect, 500);
  }
}

typeEffect();