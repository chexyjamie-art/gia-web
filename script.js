// You can add interactivity later
console.log("GLA replica loaded!");
// Example: tab click (for demo)
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelector('.tab.active').classList.remove('active');
    tab.classList.add('active');
  });
});