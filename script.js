// Products data (photo se exact)
const products = [
    {
        id: 1,
        name: 'Titan Edge Thin',
        price: '₹5,085',
        img: 'https://via.placeholder.com/220x160/4169e1/ffffff?text=Titan+Edge+Thin',
        category: 'watches',
        badge: 'AI Selected',
        verified: true
    },
    {
        id: 2,
        name: 'Fossil Grant Classic',
        price: '₹10,995 - ₹19,990',
        img: 'https://via.placeholder.com/220x160/333333/ffffff?text=Fossil+Grant',
        category: 'watches',
        badge: 'Verified',
        verified: true
    },
    {
        id: 3,
        name: 'Seiko Prospex Solar',
        price: '₹16,095 - ₹21,995',
        img: 'https://via.placeholder.com/220x160/ffd700/000?text=Seiko+Prospex',
        category: 'watches',
        badge: '',
        verified: true
    }
    // Add more products for skincare, shoes etc.
];

let currentCategory = 'all';

// Load products
function renderProducts(productsToShow) {
    const grid = document.getElementById('productGrid');
    grid.innerHTML = productsToShow.map(product => `
        <div class="product" data-category="${product.category}">
            ${product.verified ? `<div class="verified">${product.badge}</div>` : ''}
            <img src="${product.img}" alt="${product.name}" loading="lazy">
            ${product.badge ? `<div class="ai-badge">${product.badge}</div>` : ''}
            <h3>${product.name}</h3>
            <div class="price">${product.price}</div>
            <button class="btn" onclick="buyNow(${product.id})">Buy Now</button>
        </div>
    `).join('');
}

// Tab switching
document.getElementById('tabs').addEventListener('click', (e) => {
    if (e.target.classList.contains('tab')) {
        document.querySelector('.tab.active').classList.remove('active');
        e.target.classList.add('active');
        currentCategory = e.target.dataset.category;
        filterProducts();
    }
});

// Filter products
function filterProducts() {
    let filtered = products;
    if (currentCategory !== 'all') {
        filtered = products.filter(p => p.category === currentCategory);
    }
    renderProducts(filtered);
}

// Buy now alert (demo)
function buyNow(id) {
    alert(`Added to cart: Product ID ${id}! Integrate with Razorpay/Amazon for real payments.`);
}

// Personalize name
document.getElementById('searchInput').addEventListener('focus', () => {
    const name = localStorage.getItem('userName') || 'Rahul';
    document.getElementById('personalized').textContent = `Curated luxury for you, ${name}`;
});

// Init
document.addEventListener('DOMContentLoaded', () => {
    renderProducts(products);
});