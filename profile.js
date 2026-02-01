function uploadDP(){
  document.getElementById("dpInput").click();
}

function changeDP(e){
  const reader = new FileReader();
  reader.onload = ()=> {
    document.getElementById("profilePic").src = reader.result;
    localStorage.setItem("dp", reader.result);
  }
  reader.readAsDataURL(e.target.files[0]);
}

function saveProfile(){
  localStorage.setItem("name", document.getElementById("name").value);
}

function toggleWishlist(){
  const box = document.getElementById("wishlistBox");
  box.classList.toggle("open");
  renderWishlist();
}

function renderWishlist(){
  let list = JSON.parse(localStorage.getItem("wishlist")) || [];
  const box = document.getElementById("wishlistBox");
  box.innerHTML = list.length ? list.join("<br>") : "Wishlist empty ❤️";
}

function toggleAI(){
  document.getElementById("aiBox").classList.toggle("open");
}