let cart = JSON.parse(localStorage.getItem("cart")) || [];

const products = [
    { name: "Clothes", image: "images/box1_image.jpg", price: 499 },
    { name: "Health & Personal Care", image: "images/box2_image.jpg", price: 299 },
    { name: "Furniture", image: "images/box3_image.jpg", price: 1999 },
    { name: "Electronics", image: "images/box4_image.jpg", price: 999 },
    { name: "Beauty Picks", image: "images/box5_image.jpg", price: 399 },
    { name: "Pet Care", image: "images/box6_image.jpg", price: 199 },
    { name: "Toys", image: "images/box7_image.jpg", price: 599 },
    { name: "Fashion Trends", image: "images/box8_image.jpg", price: 799 }
];

// Render products 
function renderProducts() {
    const container = document.querySelector(".shop-section");
    if (!container) return; 

    container.innerHTML = "<h2>Loading...</h2>";

    setTimeout(() => {
        container.innerHTML = products.map((product, index) => `
            <div class="box">
                <div class="box-content">
                    <h2>${product.name}</h2>
                    <p>₹${product.price}</p>
                    <div class="box-img" style="background-image: url('${product.image}')"></div>
                    <button onclick="addToCart(${index})">Add to Cart</button>
                </div>
            </div>
        `).join('');
    }, 500);
}

// Search 
function searchProducts() {
    let input = document.querySelector(".search-input").value.toLowerCase();
    let boxes = document.querySelectorAll(".box");

    boxes.forEach(box => {
        let title = box.querySelector("h2").innerText.toLowerCase();
        box.style.display = title.includes(input) ? "block" : "none";
    });
}

// Add to cart
function addToCart(index) {
    let existing = cart.find(item => item.name === products[index].name);

    if (existing) {
        existing.quantity = (existing.quantity || 1) + 1;
    } else {
        let product = { ...products[index], quantity: 1 };
        cart.push(product);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();

    let msg = document.createElement("div");
    msg.innerText = "Added to cart!";
    msg.style.position = "fixed";
    msg.style.bottom = "20px";
    msg.style.right = "20px";
    msg.style.background = "green";
    msg.style.color = "white";
    msg.style.padding = "10px";
    msg.style.borderRadius = "5px";
    document.body.appendChild(msg);
    setTimeout(() => msg.remove(), 2000);
}

// Remove from cart
function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    displayCart(); 
}

// Update cart count
function updateCartCount() {
    let count = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    let cartCount = document.getElementById("cart-count");
    if (cartCount) {
        cartCount.innerText = count;
    }
}

// Display cart 
function displayCart() {
    let container = document.getElementById("cart-items");
    let totalElement = document.getElementById("total");

    if (!container || !totalElement) return; 

    let total = 0;
    container.innerHTML = "";

    if (cart.length === 0) {
        container.innerHTML = "<h2>Your cart is empty</h2>";
        totalElement.innerText = "";
        return;
    }

    cart.forEach((item, index) => {
        let qty = item.quantity || 1;
        total += item.price * qty;

        container.innerHTML += `
            <div class="box">
                <h2>${item.name}</h2>
                <p>₹${item.price} x ${qty}</p>
                <button onclick="removeFromCart(${index})">Remove</button>
            </div>
        `;
    });

    totalElement.innerText = "Total: ₹" + total;
}

window.onload = function () {
    renderProducts();
    updateCartCount();
    displayCart();

    let searchInput = document.querySelector(".search-input");
    if (searchInput) {
        searchInput.addEventListener("keyup", searchProducts);
    }
};