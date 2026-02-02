const profileBtn = document.getElementById('profileBtn');
const profileSection = document.getElementById('profile-section');
const closeBtn = document.getElementById('closeProfile');

profileBtn.onclick = () => {
    profileSection.classList.remove('hidden');
    document.body.style.overflow = 'hidden'; // Stop scrolling
};

closeBtn.onclick = () => {
    profileSection.classList.add('hidden');
    document.body.style.overflow = 'auto'; // Enable scrolling
};
