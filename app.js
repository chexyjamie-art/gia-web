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