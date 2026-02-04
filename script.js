const profileToggle = document.getElementById('profileToggle');
const backToHome = document.getElementById('backToHome');
const appContainer = document.getElementById('app-container');
const profileOverlay = document.getElementById('profile-overlay');
const navbar = document.querySelector('.navbar');

profileToggle.onclick = () => {
    appContainer.style.display = 'none';
    navbar.style.display = 'none';
    profileOverlay.classList.remove('hidden');
};

backToHome.onclick = () => {
    appContainer.style.display = 'block';
    navbar.style.display = 'flex';
    profileOverlay.classList.add('hidden');
};
