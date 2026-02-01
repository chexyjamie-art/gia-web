function uploadDP() {
  document.getElementById("dpInput").click();
}

function previewDP(e) {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.onload = () => {
    document.getElementById("profilePic").src = reader.result;
  };
  reader.readAsDataURL(file);
}

function toggleWishlist() {
  document.getElementById("wishlistBox").classList.toggle("open");
}

function toggleAI() {
  document.getElementById("aiBox").classList.toggle("open");
}