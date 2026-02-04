document.addEventListener("DOMContentLoaded", () => {

  // Buy Now buttons
  document.querySelectorAll(".buy-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      alert("Redirecting to affiliate store...");
    });
  });

  // Search
  const searchBtn = document.getElementById("searchBtn");
  const searchInput = document.getElementById("searchInput");

  searchBtn.addEventListener("click", () => {
    if (searchInput.value.trim() !== "") {
      alert("Searching for: " + searchInput.value);
    } else {
      alert("Please enter something to search.");
    }
  });

});