document.addEventListener("DOMContentLoaded", () => {

  // Buy Now click
  document.querySelectorAll(".buy-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      alert("Redirecting to trusted affiliate store...");
    });
  });

  // Search
  const searchInput = document.getElementById("searchInput");

  searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter" && searchInput.value.trim() !== "") {
      alert("AI searching for: " + searchInput.value);
    }
  });

});