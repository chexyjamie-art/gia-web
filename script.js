// Tab switching logic
document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', function() {
        document.querySelector('.tab.active').classList.remove('active');
        this.classList.add('active');
    });
});

// Buy button effect
document.querySelectorAll('.buy-now-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        btn.innerHTML = "Added! ✓";
        setTimeout(() => { btn.innerHTML = "Buy Now →"; }, 2000);
    });
});
