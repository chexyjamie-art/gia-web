/* =========================
   HOME PAGE LOGIC
   ========================= */

// Toggle Home Wishlist popup
function toggleHomeWishlist() {
  const box = document.getElementById("homeWishlist");
  if (!box) return;

  box.style.display = box.style.display === "block" ? "none" : "block";
  renderHomeWishlist();
}

// Load wishlist on home
function renderHomeWishlist() {
  const list = document.getElementById("homeWishlistItems");
  const items = JSON.parse(localStorage.getItem("wishlist")) || [];

  if (!list) return;

  if (items.length === 0) {
    list.innerHTML = "Your wishlist is empty ❤️";
    return;
  }

  list.innerHTML = "";
  items.forEach(item => {
    const div = document.createElement("div");
    div.className = "wishlist-row";
    div.innerText = item;
    list.appendChild(div);
  });
}

// Add product to wishlist (future buttons use this)
function addToWishlist(productName) {
  let items = JSON.parse(localStorage.getItem("wishlist")) || [];

  if (!items.includes(productName)) {
    items.push(productName);
    localStorage.setItem("wishlist", JSON.stringify(items));
  }
}

// Header navigation
function openProfile() {
  window.location.href = "profile.html";
}

function openMenu() {
  document.getElementById("sideMenu").style.width = "250px";
}

function closeMenu() {
  document.getElementById("sideMenu").style.width = "0";
}