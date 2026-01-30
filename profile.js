let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

fetch("products.json")
.then(res => res.json())
.then(products => {
  const wishlistContainer = document.getElementById("wishlistItems");

  wishlist.forEach(id => {
    const p = products.find(x => x.id === id);
    if (!p) return;

    wishlistContainer.innerHTML += `
      <div class="card">
        <img src="${p.image}">
        <p>${p.name}</p>
      </div>
    `;
  });
});

function openSettings() {
  alert("Settings coming soon");
}

function logout() {
  alert("Logged out");
}