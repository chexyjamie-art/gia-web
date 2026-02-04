const profileBtn = document.getElementById('profileBtn');
const backHome = document.getElementById('backHome');
const siteContent = document.getElementById('site-content');
const profileView = document.getElementById('profile-view');

profileBtn.onclick = () => {
    siteContent.style.display = 'none';
    profileView.classList.remove('hidden');
};

backHome.onclick = () => {
    siteContent.style.display = 'block';
    profileView.classList.add('hidden');
};
