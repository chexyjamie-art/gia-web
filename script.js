function toggleBox(id) {
    const box = document.getElementById(id);
    box.style.display = box.style.display === "block" ? "none" : "block";
}

document.getElementById("dpUpload").addEventListener("change", function(e) {
    const file = e.target.files[0];
    if (file) {
        document.getElementById("profileDp").src = URL.createObjectURL(file);
    }
});// Jab user 'Buy Now' button pe click karega
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

// Sidebar Toggle
const menuIcon = document.querySelector('.menu-icon');
const sidebar = document.getElementById('sidebar');
const closeMenu = document.getElementById('closeMenu');

menuIcon.addEventListener('click', () => {
    sidebar.style.left = "0";
});

closeMenu.addEventListener('click', () => {
    sidebar.style.left = "-260px";
});

// Profile Popup Toggle
const profileDp = document.querySelector('.profile-dp');
const profilePopup = document.getElementById('profilePopup');

profileDp.addEventListener('click', () => {
    profilePopup.style.display =
        profilePopup.style.display === "block" ? "none" : "block";
});

function openImageOptions() {
    document.getElementById('dpUpload').click();
}

document.getElementById('dpUpload').addEventListener('change', function (e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function () {
        document.getElementById('profileImage').src = reader.result;
    };
    reader.readAsDataURL(file);
});
