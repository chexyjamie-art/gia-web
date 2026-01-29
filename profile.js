fetch("products.json")
  .then(res => res.json())
  .then(products => {
    const list = JSON.parse(localStorage.getItem("wishlist")) || [];
    const container = document.getElementById("wishlistItems");

    const items = products.filter(p => list.includes(p.id));

    if (!items.length) {
      container.innerHTML = "No items saved.";
      return;
    }

    items.forEach(p => {
      const div = document.createElement("div");
      div.innerHTML = `<p>${p.name} – ${p.price}</p>`;
      container.appendChild(div);
    });
  });