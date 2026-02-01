function openMenu() {
  document.getElementById("sideMenu").style.width = "260px";
}
function closeMenu() {
  document.getElementById("sideMenu").style.width = "0";
}
function openProfile() {
  window.location.href = "profile.html";
}

/* WISHLIST */
function toggleWishlist() {
  document.getElementById("homeWishlist").classList.toggle("open");
  renderWishlist();
}

function addToWishlist(name) {
  let list = JSON.parse(localStorage.getItem("giaWishlist")) || [];
  if (!list.includes(name)) list.push(name);
  localStorage.setItem("giaWishlist", JSON.stringify(list));
  renderWishlist();
}

function renderWishlist() {
  const box = document.getElementById("homeWishlistItems");
  let list = JSON.parse(localStorage.getItem("giaWishlist")) || [];
  box.innerHTML = list.length ? list.map(i=>`<p>${i}</p>`).join("") : "Empty ❤️";
}

window.onload = renderWishlist;