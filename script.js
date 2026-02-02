const profileBtn = document.getElementById('profileBtn');
const profilePage = document.getElementById('profile-page');
const closeBtn = document.getElementById('closeProfile');

profileBtn.onclick = () => profilePage.classList.remove('hidden');
closeBtn.onclick = () => profilePage.classList.add('hidden');
