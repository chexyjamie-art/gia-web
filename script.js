const profileBtn = document.getElementById('profileBtn');
const backBtn = document.getElementById('backBtn');
const mainContent = document.getElementById('main-content');
const profilePage = document.getElementById('profile-page');
const topNav = document.querySelector('.top-nav');

// Open Profile Page
profileBtn.addEventListener('click', () => {
    mainContent.classList.add('hidden');
    topNav.classList.add('hidden');
    profilePage.classList.remove('hidden');
});

// Close Profile Page
backBtn.addEventListener('click', () => {
    mainContent.classList.remove('hidden');
    topNav.classList.remove('hidden');
    profilePage.classList.add('hidden');
});
