// ================= DP UPLOAD + CROP =================
let tempImage = "";

function uploadDP() {
  document.getElementById("dpInput").click();
}

function changeDP(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    tempImage = e.target.result;
    document.getElementById("cropPreview").src = tempImage;
    document.getElementById("cropBox").style.display = "block";
  };
  reader.readAsDataURL(file);
}

function saveFullImage() {
  if (!tempImage) return;

  document.getElementById("profilePic").src = tempImage;
  saveDP(tempImage);
  closeCropBox();
}

function saveCropped() {
  const img = document.getElementById("cropPreview");

  const canvas = document.createElement("canvas");
  const size = Math.min(img.naturalWidth, img.naturalHeight);

  canvas.width = size;
  canvas.height = size;

  const ctx = canvas.getContext("2d");
  ctx.drawImage(
    img,
    (img.naturalWidth - size) / 2,
    (img.naturalHeight - size) / 2,
    size,
    size,
    0,
    0,
    size,
    size
  );

  const cropped = canvas.toDataURL("image/png");
  document.getElementById("profilePic").src = cropped;
  saveDP(cropped);
  closeCropBox();
}

function closeCropBox() {
  document.getElementById("cropBox").style.display = "none";
  tempImage = "";
}

function saveDP(src) {
  const profile = JSON.parse(localStorage.getItem("giaProfile")) || {};
  profile.dp = src;
  localStorage.setItem("giaProfile", JSON.stringify(profile));
}

// ================= PROFILE SAVE =================
function saveProfile(showAlert = true) {
  const data = {
    name: name.value,
    gender: gender.value,
    mobile: mobile.value,
    email: email.value,
    address: address.value,
    dp: profilePic.src
  };

  localStorage.setItem("giaProfile", JSON.stringify(data));

  if (showAlert) {
    alert("Profile saved successfully ✅");
  }
}

// ================= LOAD PROFILE =================
function loadProfile() {
  const saved = JSON.parse(localStorage.getItem("giaProfile"));
  if (!saved) return;

  name.value = saved.name || "";
  gender.value = saved.gender || "";
  mobile.value = saved.mobile || "";
  email.value = saved.email || "";
  address.value = saved.address || "";
  if (saved.dp) profilePic.src = saved.dp;
}

// ================= AUTO SAVE (NO ALERT) =================
document.querySelectorAll(".edit-field").forEach(input => {
  input.addEventListener("input", () => saveProfile(false));
});

// ================= WISHLIST =================
function loadWishlist() {
  const box = document.getElementById("wishlistItems");
  const list = JSON.parse(localStorage.getItem("wishlist")) || [];

  box.innerHTML = "";

  if (list.length === 0) {
    box.innerHTML = "<p>Wishlist empty ❤️</p>";
    return;
  }

  list.forEach(item => {
    box.innerHTML += `<div class="order-item">${item}</div>`;
  });
}

// ================= INIT =================
window.addEventListener("load", () => {
  loadProfile();
  loadWishlist();
});