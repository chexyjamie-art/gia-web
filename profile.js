let tempImage = "";

function uploadDP(){
  document.getElementById("dpInput").click();
}

function changeDP(event){
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = function(e){
    tempImage = e.target.result;
    document.getElementById("cropPreview").src = tempImage;
    document.getElementById("cropBox").style.display = "block";
  };

  reader.readAsDataURL(file);
}

// FULL PHOTO SAVE
function saveFullImage(){
  document.getElementById("profilePic").src = tempImage;
  localStorage.setItem("profileDP", tempImage);
  document.getElementById("cropBox").style.display = "none";
}

// CROPPED SAVE
function saveCropped(){
  const img = document.getElementById("cropPreview");

  const canvas = document.createElement("canvas");
  const size = Math.min(img.width, img.height);

  canvas.width = size;
  canvas.height = size;

  const ctx = canvas.getContext("2d");
  ctx.drawImage(
    img,
    (img.width - size)/2,
    (img.height - size)/2,
    size,
    size,
    0,
    0,
    size,
    size
  );

  const croppedData = canvas.toDataURL();
  document.getElementById("profilePic").src = croppedData;
  localStorage.setItem("profileDP", croppedData);
  document.getElementById("cropBox").style.display = "none";
}

// LOAD SAVED DP
window.onload = function(){
  const savedDP = localStorage.getItem("profileDP");
  if(savedDP){
    document.getElementById("profilePic").src = savedDP;
  }
};

// AI SETTINGS TOGGLE
function openAISettings(){
  const box = document.getElementById("aiSettingsBox");

  if(box.style.display === "block"){
    box.style.display = "none";
  } else {
    box.style.display = "block";
  }
}

// ================= AUTO SAVE PROFILE DATA =================

// Load saved data on page open
window.onload = function () {
  loadProfileData();
};

function saveProfile() {
  const profileData = {
    name: document.getElementById("name").value,
    gender: document.getElementById("gender").value,
    mobile: document.getElementById("mobile").value,
    email: document.getElementById("email").value,
    address: document.getElementById("address").value,
    dp: document.getElementById("profilePic").src
  };

  localStorage.setItem("giaProfile", JSON.stringify(profileData));
  alert("Profile Auto Saved ✅");
}

function loadProfileData() {
  const saved = localStorage.getItem("giaProfile");
  if (!saved) return;

  const data = JSON.parse(saved);

  document.getElementById("name").value = data.name || "";
  document.getElementById("gender").value = data.gender || "";
  document.getElementById("mobile").value = data.mobile || "";
  document.getElementById("email").value = data.email || "";
  document.getElementById("address").value = data.address || "";

  if (data.dp) {
    document.getElementById("profilePic").src = data.dp;
  }
}

// Auto save on typing
document.querySelectorAll(".edit-field").forEach(field => {
  field.addEventListener("input", saveProfile);
});

function loadWishlist() {
  const wishlist = JSON.parse(localStorage.getItem("giaWishlist")) || [];
  const wishlistBox = document.getElementById("wishlistItems");

  if (!wishlistBox) return;

  wishlistBox.innerHTML = "";

  wishlist.forEach(item => {
    const div = document.createElement("div");
    div.className = "order-item";

    div.innerHTML = `
      <p>${item.name} – ${item.price}</p>
      <a href="${item.link}" target="_blank" class="buy-btn">Buy Now</a>
    `;

    wishlistBox.appendChild(div);
  });
}

window.onload = function () {
  loadProfileData();
  loadWishlist();
};

// ================= WISHLIST SYSTEM =================

// Load wishlist on page load
window.onload = function(){
  loadWishlist();
}

// Scroll to wishlist
function scrollToWishlist(){
  document.getElementById("wishlistItems").scrollIntoView({
    behavior: "smooth"
  });
}

// Load wishlist from storage
function loadWishlist(){
  const items = JSON.parse(localStorage.getItem("wishlist")) || [];
  const box = document.getElementById("wishlistItems");
  box.innerHTML = "";

  items.forEach((item, index) => {
    box.innerHTML += `
      <div class="order-item">
        ${item}
        <span onclick="removeWishlist(${index})" style="cursor:pointer;">❤️</span>
      </div>
    `;
  });
}

// Add to wishlist
function addToWishlist(product){
  let items = JSON.parse(localStorage.getItem("wishlist")) || [];

  if(items.includes(product)){
    items = items.filter(p => p !== product);
  } else {
    items.push(product);
  }

  localStorage.setItem("wishlist", JSON.stringify(items));
  loadWishlist();
}

// Remove
function removeWishlist(index){
  let items = JSON.parse(localStorage.getItem("wishlist")) || [];
  items.splice(index, 1);
  localStorage.setItem("wishlist", JSON.stringify(items));
  loadWishlist();
}

// ================= PROFILE JS =================

// Load saved profile & wishlist
window.onload = function(){
  // --- Profile Data ---
  if(localStorage.getItem("userProfile")){
    const data = JSON.parse(localStorage.getItem("userProfile"));
    document.getElementById("name").value = data.name || "";
    document.getElementById("gender").value = data.gender || "";
    document.getElementById("mobile").value = data.mobile || "";
    document.getElementById("email").value = data.email || "";
    document.getElementById("address").value = data.address || "";
    if(data.dp){
      document.getElementById("profilePic").src = data.dp;
    }
  }

  // --- Wishlist Auto Scroll ---
  if(window.location.hash === "#wishlist"){
    scrollToWishlist();
  }

  // --- Render Wishlist Items ---
  renderWishlist();
}

// Save profile
function saveProfile(){
  const profileData = {
    name: document.getElementById("name").value,
    gender: document.getElementById("gender").value,
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

// ================= WISHLIST SYSTEM =================
function scrollToWishlist(){
  const wishlistDiv = document.getElementById("wishlistItems");
  if(wishlistDiv){
    wishlistDiv.scrollIntoView({behavior: "smooth"});
  }
}

// Render Wishlist Items
function renderWishlist(){
  const wishlistDiv = document.getElementById("wishlistItems");
  wishlistDiv.innerHTML = ""; // clear previous

  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

  if(wishlist.length === 0){
    wishlistDiv.innerHTML = "<p>Your wishlist is empty ❤️</p>";
    return;
  }

  wishlist.forEach(itemId => {
    // For demo, we can map itemId to product info (replace with real data if available)
    const productName = itemId; // in real: map to name
    const productHTML = `
      <div class="wishlist-item">
        ${productName} 
        <button onclick="removeFromWishlist('${itemId}')">❤️ Remove</button>
      </div>
    `;
    wishlistDiv.innerHTML += productHTML;
  });
}

// Remove from Wishlist
function removeFromWishlist(itemId){
  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  wishlist = wishlist.filter(id => id !== itemId);
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
  renderWishlist();
}