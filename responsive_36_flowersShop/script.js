// Product data
const flowers = [
    { id: 1, name: 'Roses', price: 29.99, image: 'images/Pink_Roses.jpg'},
    { id: 2, name: 'Tulips', price: 24.99, image: 'images/White_Tulips.jpg'},
    { id: 3, name: 'Sunflowers', price: 19.99, image: 'images/Sunflowers.jpg'},
    { id: 4, name: 'Lilies', price: 34.99, image: 'images/Lilies.jpg'}
];

const bouquets = [
    { id: 1001, name: 'Romantic Bouquet', price: 59.99, image: 'images/Romantic_Bouquet.jpg' },
    { id: 1002, name: 'Spring Collection', price: 69.99, image: 'images/Spring_Special_Bouquet.jpg'},
    { id: 1003, name: 'Wedding Special', price: 89.99, image: 'images/Wedding_Special_Bouquet.jpg'}
];

let cart = [];

// function to show differnt sections
function showSection(section) {
    // Hide all sections
    ['home', 'flowers', 'bouquets', 'cart'].forEach(sec => {
        // FIXED: Using backticks (`) and ${sec} for proper variable interpolation
        document.getElementById(`${sec}-section`).classList.remove('active');
        document.getElementById(`${sec}-section`).classList.add('hidden');
    });

    // Show selected section
    // FIXED: Must also be corrected here!
    document.getElementById(`${section}-section`).classList.remove('hidden');
    document.getElementById(`${section}-section`).classList.add('active');

    // Populate products if needed
    if (section === 'flowers') {
        // Ensure you are using the correct function name: populateProducts
        populateProudcts(flowers, 'flowers-grid');
    } else if (section === 'bouquets') {
        populateProudcts(bouquets, 'bouquets-grid');
    } else if (section === 'cart') {
        updateCartView();
    }
}

// Function to populate product grid
function populateProudcts(products, gridId) {
    const grid = document.getElementById(gridId);

    if (!grid) {
        console.error('Grid element not found for I: ${gridId}');
        return; // Stopt the function if the element doesn't exist
    }
    grid.innerHTML = ''; // Clear existing content

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>$${product.price.toFixed(2)}</p>
        <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        grid.appendChild(productCard);
    });
}

// Function to add item to cart
function addToCart(productId) {
    // Find the product
    const product = [...flowers, ...bouquets].find(p => p.id === productId);

    //Check if product is already in cart
    const existingProduct = cart.find(item => item.id === productId);

    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({...product, quantity: 1});
    }

    // Update cart count
    updateCartCount();
}

// Function to udpate cart count
function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
}

// Function to update cart view
function updateCartView() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');

    // Clear existing cart item
    cartItemsContainer.innerHTML = '';

    // Calculate total
    let total = 0;

    // Populate cart items
    cart.forEach(item => {
        const cartItem= document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <span>${item.name}</span>
            <span>Quantity: ${item.quantity}</span>
            <span>$${(item.price * item.quantity).toFixed(2)}</span>
            <button onclick = "removedFromCart(${item.id})">Remove</button>
        `;
        cartItemsContainer.appendChild(cartItem);

        // Calculate total
        total += item.price * item.quantity;
    });

    // Update total
    cartTotalElement.textContent = `Total: $${total.toFixed(2)}`;
}

// Function to remove item from cart
function removedFromCart(productId) {
    const index = cart.findIndex(item => item.id === productId)

    if (index !== -1) {
        if (cart[index].quantity > 1) {
            cart[index].quantity--;
        } else {
            cart.splice(index, 1);
        }
    }

    // Update cart count and view
    updateCartCount();
    updateCartView();
}

// Function to checkout
function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    // Calculate total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // Simulate checkout process
    alert('Thank you for your purchase!\nTotal: $${total.toFixed(2)}');

    // Clear cart
    cart = [];
    updateCartCount();
    updateCartView();
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    // Populate flowers and bouquets grids on initial load
    populateProudcts(flowers, 'flowers-grid');
    populateProudcts(bouquets, 'bouquets-grid');
});