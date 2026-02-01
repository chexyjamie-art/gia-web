/* =========================
   PROFILE DATA
   ========================= */

function saveProfile() {
  const data = {
    name: name.value,
    gender: gender.value,
    mobile: mobile.value,
    email: email.value,
    address: address.value,
    dp: profilePic.src
  };
  localStorage.setItem("userProfile", JSON.stringify(data));
  alert("Profile saved ✅");
}

function loadProfile() {
  const saved = localStorage.getItem("userProfile");
  if (!saved) return;

  const data = JSON.parse(saved);
  name.value = data.name || "";
  gender.value = data.gender || "";
  mobile.value = data.mobile || "";
  email.value = data.email || "";
  address.value = data.address || "";
  if (data.dp) profilePic.src = data.dp;
}

/* =========================
   WISHLIST
   ========================= */

function toggleWishlist() {
  const box = document.getElementById("wishlistBox");
  box.style.display = box.style.display === "block" ? "none" : "block";
  renderWishlist();
}

function renderWishlist() {
  const items = JSON.parse(localStorage.getItem("wishlist")) || [];
  const box = document.getElementById("wishlistItems");

  if (items.length === 0) {
    box.innerHTML = "Your wishlist is empty ❤️";
    return;
  }

  box.innerHTML = "";
  items.forEach((item, i) => {
    box.innerHTML += `
      <div class="order-item">
        ${item}
        <span onclick="removeWishlist(${i})">❌</span>
      </div>
    `;
  });
}

function removeWishlist(index) {
  let items = JSON.parse(localStorage.getItem("wishlist")) || [];
  items.splice(index, 1);
  localStorage.setItem("wishlist", JSON.stringify(items));
  renderWishlist();
}

/* =========================
   INIT
   ========================= */

window.onload = function () {
  loadProfile();
};