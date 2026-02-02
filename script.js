const products = [
    { id: 1, name: "Wireless Headphones", price: 2499, category: "Electronics", img: "https://picsum.photos/seed/headphone/300/200" },
    { id: 2, name: "Smart Watch", price: 3999, category: "Electronics", img: "https://picsum.photos/seed/watch/300/200" },
    { id: 3, name: "Denim Jacket", price: 1599, category: "Fashion", img: "https://picsum.photos/seed/jacket/300/200" },
    { id: 4, name: "Running Shoes", price: 1299, category: "Fashion", img: "https://picsum.photos/seed/shoes/300/200" },
    { id: 5, name: "Leather Bag", price: 899, category: "Accessories", img: "https://picsum.photos/seed/bag/300/200" },
    { id: 6, name: "Sunglasses", price: 599, category: "Accessories", img: "https://picsum.photos/seed/glass/300/200" },
    { id: 7, name: "Gaming Mouse", price: 799, category: "Electronics", img: "https://picsum.photos/seed/mouse/300/200" },
    { id: 8, name: "Cotton T-Shirt", price: 499, category: "Fashion", img: "https://picsum.photos/seed/tshirt/300/200" },
];

let cart = [];

// --- DOM ELEMENTS ---
const productContainer = document.getElementById('product-container');
const cartItemsContainer = document.getElementById('cart-items');
const totalPriceEl = document.getElementById('total-price');
const toastEl = document.getElementById('toast');

// --- INITIAL LOAD ---
window.onload = () => {
    renderProducts(products);
};

// --- RENDER PRODUCTS ---
function renderProducts(items) {
    productContainer.innerHTML = '';
    items.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${product.img}" class="product-img" alt="${product.name}">
            <div class="product-info">
                <span class="category-tag">${product.category}</span>
                <h3 class="product-title">${product.name}</h3>
                <div class="product-price">₹${product.price}</div>
                <button class="add-btn" onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        `;
        productContainer.appendChild(card);
    });
}

// --- CART LOGIC ---
function addToCart(id) {
    const existingItem = cart.find(item => item.id === id);
    const product = products.find(p => p.id === id);

    if (existingItem) {
        existingItem.qty++;
        showToast(`Increased quantity of ${product.name}`);
    } else {
        cart.push({ ...product, qty: 1 });
        showToast(`${product.name} added to cart!`);
    }
    renderCart();
}

function changeQty(id, change) {
    const item = cart.find(item => item.id === id);
    if (item) {
        item.qty += change;
        if (item.qty <= 0) {
            cart = cart.filter(i => i.id !== id);
        }
        renderCart();
    }
}

function renderCart() {
    cartItemsContainer.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-msg">Your cart is empty.</p>';
    } else {
        cartItemsContainer.classList.add('cart-items-list');
        
        cart.forEach(item => {
            total += item.price * item.qty;
            const div = document.createElement('div');
            div.className = 'cart-item';
            div.innerHTML = `
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p>₹${item.price} x ${item.qty}</p>
                </div>
                <div class="qty-controls">
                    <button class="qty-btn" onclick="changeQty(${item.id}, -1)">-</button>
                    <span>${item.qty}</span>
                    <button class="qty-btn" onclick="changeQty(${item.id}, 1)">+</button>
                </div>
            `;
            cartItemsContainer.appendChild(div);
        });
    }

    totalPriceEl.innerText = total;
}

// --- FILTER FUNCTION ---
function filterProducts(category) {
    if (category === 'all') {
        renderProducts(products);
    } else {
        const filtered = products.filter(p => p.category === category);
        renderProducts(filtered);
    }
}

// --- CHECKOUT & TOAST ---
function checkout() {
    if (cart.length === 0) {
        showToast("Cart is empty!", true);
    } else {
        showToast("Order placed successfully!", false);
        cart = [];
        renderCart();
    }
}

function showToast(message, isError = false) {
    toastEl.textContent = message;
    toastEl.style.backgroundColor = isError ? "#ef4444" : "#333";
    toastEl.className = "toast show";
    setTimeout(function(){ 
        toastEl.className = toastEl.className.replace("show", ""); 
    }, 3000);
}