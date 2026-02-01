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

// ================= AI SEARCH ENGINE =================
const searchInput = document.getElementById("searchInput");
const aiResponse = document.getElementById("aiResponse");

if(searchInput){
  searchInput.addEventListener("keypress", function(e){
    if(e.key === "Enter"){
      handleAIQuery(searchInput.value);
    }
  });
}

function handleAIQuery(query){
  if(!query.trim()){
    aiResponse.innerHTML = "Please ask something.";
    return;
  }

  const q = query.toLowerCase();
  let response = "";

  // OUTFIT AI
  if(q.includes("outfit") || q.includes("look") || q.includes("wear")){
    response = "✨ AI Stylist Suggestion:\nTry a smart casual combo — slim-fit jeans, white sneakers, and a pastel shirt. Perfect for a clean modern look.";
  }

  // BEAUTY AI
  else if(q.includes("skin") || q.includes("skincare") || q.includes("serum")){
    response = "💄 Beauty AI Advice:\nFor glowing skin — use Vitamin C serum in morning, sunscreen daily, and hydrate well.";
  }

  // PRODUCT AI
  else if(q.includes("shoes") || q.includes("watch") || q.includes("dress")){
    response = "🛍 AI Shopping Guide:\nBased on your interest, I recommend checking premium options with good ratings and comfort.";
  }

  // GENERAL AI
  else{
    response = "🤖 GIA AI Stylist:\nTell me more so I can suggest the perfect style, beauty, or product choice for you.";
  }

  aiResponse.innerText = response;
}

// ================= VOICE SEARCH =================
function startVoiceSearch(){
  if(!('webkitSpeechRecognition' in window)){
    alert("Voice search not supported in this browser");
    return;
  }

  const recognition = new webkitSpeechRecognition();
  recognition.lang = "en-IN";

  recognition.onresult = function(event){
    const text = event.results[0][0].transcript;
    document.getElementById("searchInput").value = text;
    handleAIQuery(text);
  };

  recognition.start();
}

// ================= PROFILE EDIT SYSTEM =================

// Load saved data
window.onload = function(){
  if(localStorage.getItem("userProfile")){
    const data = JSON.parse(localStorage.getItem("userProfile"));

    document.getElementById("name").value = data.name || "";
    document.getElementById("mobile").value = data.mobile || "";
    document.getElementById("email").value = data.email || "";
    document.getElementById("address").value = data.address || "";

    if(data.dp){
      document.getElementById("profilePic").src = data.dp;
    }
  }
}

// Save profile
function saveProfile(){
  const profileData = {
    name: document.getElementById("name").value,
    mobile: document.getElementById("mobile").value,
    email: document.getElementById("email").value,
    address: document.getElementById("address").value,
    dp: document.getElementById("profilePic").src
  };

  localStorage.setItem("userProfile", JSON.stringify(profileData));
  alert("Profile saved successfully!");
}

// Change DP
function changeDP(event){
  const reader = new FileReader();
  reader.onload = function(){
    document.getElementById("profilePic").src = reader.result;
  }
  reader.readAsDataURL(event.target.files[0]);
}

function addToWishlist(itemName, price, buyLink) {
  let wishlist = JSON.parse(localStorage.getItem("giaWishlist")) || [];

  const item = {
    name: itemName,
    price: price,
    link: buyLink
  };

  wishlist.push(item);
  localStorage.setItem("giaWishlist", JSON.stringify(wishlist));

  alert("Added to Wishlist ❤️");
}

// ================= WISHLIST SYSTEM =================

let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

function toggleWishlist(productId) {
  if (wishlist.includes(productId)) {
    wishlist = wishlist.filter(id => id !== productId);
  } else {
    wishlist.push(productId);
  }

  localStorage.setItem("wishlist", JSON.stringify(wishlist));
  alert("Wishlist updated ❤️");
}

// ====== ADD THIS TO BOTTOM OF app.js ======

// Wishlist UI toggle
function toggleWishlist(productId, btn){
  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

  if (wishlist.includes(productId)) {
    wishlist = wishlist.filter(id => id !== productId);
    btn.innerText = "♡ Wishlist"; // empty heart
  } else {
    wishlist.push(productId);
    btn.innerText = "❤️ Wishlist"; // filled heart
  }

  localStorage.setItem("wishlist", JSON.stringify(wishlist));
}

// Load wishlist state on page load (for AI picks)
window.addEventListener("DOMContentLoaded", () => {
  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  document.querySelectorAll(".ai-card button").forEach(btn => {
    const productId = btn.getAttribute("onclick").match(/'(.+?)'/)[1];
    if(wishlist.includes(productId)){
      btn.innerText = "❤️ Wishlist";
    }
  });
});

function openWishlist(){
  // Agar user profile pe hai, wishlist section khulega
  window.location.href = "profile.html#wishlist";
}