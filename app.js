let homeWishlistOpen = false;

// Toggle wishlist on HOME PAGE
function toggleHomeWishlist(){
  const box = document.getElementById("homeWishlist");
  homeWishlistOpen = !homeWishlistOpen;

  box.style.display = homeWishlistOpen ? "block" : "none";
  if(homeWishlistOpen) loadHomeWishlist();
}

// Load wishlist items on Home
function loadHomeWishlist(){
  const items = JSON.parse(localStorage.getItem("wishlist") || "[]");
  const box = document.getElementById("homeWishlistItems");

  box.innerHTML = "";

  if(items.length === 0){
    box.innerHTML = "<p>Your wishlist is empty ❤️</p>";
    return;
  }

  items.forEach((item,index)=>{
    box.innerHTML += `
      <div class="ai-card">
        <h3>${item}</h3>
        <button onclick="removeFromWishlist(${index})">Remove ❤️</button>
      </div>
    `;
  });
}

// Add item
function addToWishlist(product){
  let items = JSON.parse(localStorage.getItem("wishlist") || "[]");

  if(!items.includes(product)){
    items.push(product);
    localStorage.setItem("wishlist", JSON.stringify(items));
  }
  loadHomeWishlist();
}

// Remove item
function removeFromWishlist(index){
  let items = JSON.parse(localStorage.getItem("wishlist") || "[]");
  items.splice(index,1);
  localStorage.setItem("wishlist", JSON.stringify(items));
  loadHomeWishlist();
}

// Menu
function openMenu(){ document.getElementById("sideMenu").style.width = "250px"; }
function closeMenu(){ document.getElementById("sideMenu").style.width = "0"; }

function openProfile(){ window.location.href = "profile.html"; }