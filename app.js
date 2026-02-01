// ================= MENU =================
function openMenu() {
  document.getElementById("sideMenu").style.width = "260px";
}

function closeMenu() {
  document.getElementById("sideMenu").style.width = "0";
}

// ================= PROFILE NAV =================
function openProfile() {
  window.location.href = "profile.html";
}

// ================= HOME WISHLIST =================
function toggleWishlist() {
  const drawer = document.getElementById("homeWishlist");
  drawer.classList.toggle("open");
  renderHomeWishlist();
}

function addToWishlist(product) {
  let list = JSON.parse(localStorage.getItem("wishlist")) || [];

  if (!list.includes(product)) {
    list.push(product);
  }

  localStorage.setItem("wishlist", JSON.stringify(list));
  renderHomeWishlist();
}

function renderHomeWishlist() {
  const box = document.getElementById("homeWishlistItems");
  let list = JSON.parse(localStorage.getItem("wishlist")) || [];

  box.innerHTML = "";

  if (list.length === 0) {
    box.innerHTML = "<p>Wishlist empty ❤️</p>";
    return;
  }

  list.forEach((item, index) => {
    box.innerHTML += `
      <div class="wishlist-item">
        ${item}
        <span onclick="removeHomeWishlist(${index})">❌</span>
      </div>
    `;
  });
}

function removeHomeWishlist(index) {
  let list = JSON.parse(localStorage.getItem("wishlist")) || [];
  list.splice(index, 1);
  localStorage.setItem("wishlist", JSON.stringify(list));
  renderHomeWishlist();
}

// ================= SAFE LOAD =================
window.addEventListener("load", () => {
  renderHomeWishlist();
});

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