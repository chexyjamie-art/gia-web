// Jab user 'Buy Now' button pe click karega
document.querySelectorAll('.buy-btn').forEach(button => {
    button.addEventListener('click', () => {
        alert('Product added to your wishlist!');
    });
});

// Search functionality ka basic setup
const searchBtn = document.querySelector('.search-container button');
const searchInput = document.querySelector('.search-container input');

searchBtn.addEventListener('click', () => {
    if(searchInput.value !== "") {
        alert('Searching for: ' + searchInput.value);
    } else {
        alert('Please enter something to search.');
    }
});
if (searchBtn && searchInput) {
  searchBtn.addEventListener('click', () => {
    if (searchInput.value !== "") {
      alert('Searching for: ' + searchInput.value);
    } else {
      alert('Please enter something to search.');
    }
  });
}