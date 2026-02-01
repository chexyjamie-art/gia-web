function toggleWishlist(){
  const box = document.getElementById("wishlistBox");
  box.classList.toggle("open");
  box.innerHTML = (JSON.parse(localStorage.getItem("giaWishlist"))||[]).join("<br>");
}

function toggleAI(){
  document.getElementById("aiBox").classList.toggle("open");
}

function saveProfile(){
  alert("Profile Saved ✔");
}