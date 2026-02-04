// Tabs active switch
const tabs = document.querySelectorAll(".tabs button");

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
  });
});

// Search placeholder (future AI hook)
document.querySelector(".search-box button").addEventListener("click", () => {
  alert("AI Search coming soon 🚀");
});