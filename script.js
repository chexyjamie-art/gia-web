const openProfile = document.getElementById('openProfile');
const closeProfile = document.getElementById('closeProfile');
const profilePage = document.getElementById('profile-page');
const dashboard = document.getElementById('dashboard');

openProfile.addEventListener('click', () => {
    profilePage.classList.remove('hidden');
    dashboard.style.display = 'none';
    window.scrollTo(0,0);
});

closeProfile.addEventListener('click', () => {
    profilePage.classList.add('hidden');
    dashboard.style.display = 'block';
});
