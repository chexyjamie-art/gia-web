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