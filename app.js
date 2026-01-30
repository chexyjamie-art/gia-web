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