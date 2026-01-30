function imageSearch(file) {
  if (!file) return;

  alert("AI analyzing image...");

  // Fake AI match logic
  const randomProduct = products[Math.floor(Math.random() * products.length)];
  renderProducts([randomProduct]);
}