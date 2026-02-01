function openMenu(){
  document.getElementById("sideMenu").style.width = "250px";
}
function closeMenu(){
  document.getElementById("sideMenu").style.width = "0";
}
function openProfile(){
  window.location.href = "profile.html";
}

// Wishlist Home
function toggleWishlist(){
  const box = document.getElementById("homeWishlist");
  box.classList.toggle("open");
  renderHomeWishlist();
}

function addToWishlist(item){
  let list = JSON.parse(localStorage.getItem("wishlist")) || [];
  if(!list.includes(item)) list.push(item);
  localStorage.setItem("wishlist", JSON.stringify(list));
  renderHomeWishlist();
}

function renderHomeWishlist(){
  const box = document.getElementById("homeWishlistItems");
  let list = JSON.parse(localStorage.getItem("wishlist")) || [];
  box.innerHTML = list.length === 0 ? "<p>Wishlist empty ❤️</p>" : "";
  list.forEach(i => box.innerHTML += `<p>${i}</p>`);
}