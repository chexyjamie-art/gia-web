// ================= PROFILE =================
function openProfile(){
  window.location.href = "profile.html";
}

function goWishlist(){
  alert("Wishlist page coming soon");
}

// ================= MENU =================
function openMenu(){
  document.getElementById("sideMenu").style.width = "250px";
}

function closeMenu(){
  document.getElementById("sideMenu").style.width = "0";
}

// ================= AI SEARCH =================
function handleSearch(event){
  if(event.key === "Enter"){
    const query = document.getElementById("searchInput").value;
    aiReply(query);
  }
}

function aiReply(query){
  const responseBox = document.getElementById("aiResponse");

  if(query.trim() === ""){
    responseBox.innerHTML = "Please ask something.";
    return;
  }

  responseBox.innerHTML = "AI Suggestion: Based on your search for '" + query + "', I recommend exploring premium skincare or fashion picks.";
}

// ================= VOICE SEARCH =================
function startVoiceSearch(){
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = "en-IN";

  recognition.onresult = function(event){
    const text = event.results[0][0].transcript;
    document.getElementById("searchInput").value = text;
    aiReply(text);
  };

  recognition.start();
}

const input = document.getElementById("aiInput");
const responseBox = document.getElementById("aiResponse");

input.addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    aiReply(input.value);
  }
});

function aiReply(query) {
  query = query.toLowerCase();
  let reply = "";

  if (query.includes("skincare")) {
    reply = "✨ AI Suggestion: Go for Vitamin C serum + sunscreen combo for glowing skin.";
  }
  else if (query.includes("watch")) {
    reply = "⌚ AI Suggestion: Minimal leather strap watches are trending under ₹10,000.";
  }
  else if (query.includes("shoes")) {
    reply = "👟 AI Suggestion: White sneakers match 90% outfits. Great value buy.";
  }
  else {
    reply = "🤖 AI Stylist: I recommend choosing products based on comfort, budget, and occasion.";
  }

  responseBox.innerHTML = reply;
}

const chatInput = document.getElementById("chatInput");
const chatMessages = document.getElementById("chatMessages");

chatInput.addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    sendMessage(chatInput.value);
    chatInput.value = "";
  }
});

function sendMessage(text) {
  addMessage(text, "user");
  aiStylistReply(text);
}

function addMessage(text, sender) {
  const msg = document.createElement("div");
  msg.className = sender === "user" ? "user-msg" : "ai-msg";
  msg.innerText = text;
  chatMessages.appendChild(msg);
}

function aiStylistReply(query) {
  query = query.toLowerCase();
  let reply = "";

  if (query.includes("date")) {
    reply = "💫 For a date: Go with a clean shirt, fitted jeans, and minimal sneakers. Confidence is key.";
  }
  else if (query.includes("office")) {
    reply = "👔 Office look: Neutral shirt + formal watch + polished shoes gives a professional vibe.";
  }
  else if (query.includes("budget")) {
    reply = "💰 Budget styling: Invest in versatile basics first. They match multiple outfits.";
  }
  else {
    reply = "✨ I recommend choosing outfits based on occasion, comfort, and color harmony.";
  }

  setTimeout(() => addMessage(reply, "ai"), 500);
}

function generateOutfit() {
  const outfits = [
    "🔥 Party Look: Black shirt + slim jeans + leather boots + silver watch.",
    "✨ Casual Look: White tee + denim jacket + sneakers + smartwatch.",
    "💼 Smart Look: Beige chinos + polo tee + loafers + minimal watch.",
    "🏖 Chill Look: Oversized tee + shorts + sliders + sunglasses."
  ];

  const randomOutfit = outfits[Math.floor(Math.random() * outfits.length)];

  document.getElementById("outfitResult").innerText = randomOutfit;
}