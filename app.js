// PROFILE
function openProfile() {
  window.location.href = "profile.html";
}

function goWishlist() {
  alert("Wishlist Coming Soon");
}

// 🎤 VOICE SEARCH
function startVoiceSearch() {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = "en-IN";

  recognition.onresult = function(event) {
    const text = event.results[0][0].transcript;
    document.getElementById("searchInput").value = text;
    aiReply(text);
  };

  recognition.start();
}

// 🤖 AI LOGIC
function aiReply(query) {
  let response = "I am analyzing your style needs...";

  query = query.toLowerCase();

  if (query.includes("shirt"))
    response = "Try slim-fit casual shirts in light colors.";
  else if (query.includes("shoes"))
    response = "White sneakers go with most outfits.";
  else if (query.includes("party"))
    response = "A blazer with dark jeans will look stylish.";
  else
    response = "Tell me more so I can suggest better styles.";

  document.getElementById("aiResponse").innerText = response;
}

// 📸 IMAGE SEARCH
function imageSearch(event) {
  const file = event.target.files[0];
  if (file) {
    document.getElementById("aiResponse").innerText =
      "Image uploaded. AI is analyzing style...";
  }
}

// ❤️ WISHLIST SYSTEM
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

function addToWishlist(item) {
  wishlist.push(item);
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
}

/* ================= VOICE SEARCH ================= */

const micBtn = document.getElementById("micBtn");

if (micBtn && 'webkitSpeechRecognition' in window) {
  const recognition = new webkitSpeechRecognition();
  recognition.lang = "en-IN";

  micBtn.onclick = () => {
    micBtn.classList.add("listening");
    recognition.start();
  };

  recognition.onresult = function (event) {
    const text = event.results[0][0].transcript;
    document.querySelector(".search-box input").value = text;
    aiReply(text);
  };

  recognition.onend = () => {
    micBtn.classList.remove("listening");
  };
}

/* ================= AI REPLY SYSTEM ================= */

function aiReply(query) {
  let response = generateAIResponse(query);
  typeEffect(response);
}

function generateAIResponse(msg) {
  msg = msg.toLowerCase();

  if (msg.includes("watch"))
    return "I recommend a minimalist silver watch under ₹10k for daily luxury wear.";

  if (msg.includes("skin"))
    return "Vitamin C serum in morning & sunscreen daily will improve glow.";

  if (msg.includes("outfit"))
    return "Try white sneakers, slim jeans & pastel shirt for a clean modern look.";

  return "Tell me your budget & occasion — I’ll suggest the best option.";
}

function typeEffect(text) {
  const box = document.getElementById("aiResponse");
  if (!box) return;

  box.innerHTML = "";
  let i = 0;

  const typing = setInterval(() => {
    box.innerHTML += text[i];
    i++;
    if (i >= text.length) clearInterval(typing);
  }, 25);
}

// SAVE PROFILE
function saveProfile(){
  const profile = {
    name: document.getElementById("name").value,
    mobile: document.getElementById("mobile").value,
    email: document.getElementById("email").value,
    address: document.getElementById("address").value
  };

  localStorage.setItem("giaProfile", JSON.stringify(profile));
  alert("Profile Saved Successfully!");
}

// LOAD PROFILE
window.onload = function(){
  const saved = JSON.parse(localStorage.getItem("giaProfile"));

  if(saved){
    document.getElementById("name").value = saved.name || "";
    document.getElementById("mobile").value = saved.mobile || "";
    document.getElementById("email").value = saved.email || "";
    document.getElementById("address").value = saved.address || "";
  }
}