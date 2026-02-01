let wishlistOpen = false;

function toggleWishlist(){
  const box = document.getElementById("wishlistItems");
  wishlistOpen = !wishlistOpen;

  box.style.display = wishlistOpen ? "block" : "none";
  if(wishlistOpen) loadWishlist();
}

function loadWishlist(){
  const items = JSON.parse(localStorage.getItem("wishlist") || "[]");
  const box = document.getElementById("wishlistItems");

  box.innerHTML = "";

  if(items.length === 0){
    box.innerHTML = "<p>Your wishlist is empty ❤️</p>";
    return;
  }

  items.forEach((item,index)=>{
    box.innerHTML += `
      <div class="order-item">
        ${item}
        <span onclick="removeWishlist(${index})">❤️</span>
      </div>
    `;
  });
}

function removeWishlist(index){
  let items = JSON.parse(localStorage.getItem("wishlist") || "[]");
  items.splice(index,1);
  localStorage.setItem("wishlist", JSON.stringify(items));
  loadWishlist();
}