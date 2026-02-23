let cart = [];
let totalPrice = 0;

function addToCart(name, price) {
    cart.push({ name, price });
    totalPrice += price;
    renderCart();
}

function renderCart() {
    let cartList = document.getElementById("cartList");
    cartList.innerHTML = "";

    cart.forEach(item => {
        let li = document.createElement("li");
        li.innerText = item.name + " - ₹" + item.price;
        cartList.appendChild(li);
    });

    document.getElementById("total").innerText = "Total: ₹" + totalPrice;
}

function checkout() {
    if (cart.length === 0) {
        alert("Cart is empty");
        return;
    }

    alert("Order placed successfully! Total: ₹" + totalPrice);
    cart = [];
    totalPrice = 0;
    renderCart();
}