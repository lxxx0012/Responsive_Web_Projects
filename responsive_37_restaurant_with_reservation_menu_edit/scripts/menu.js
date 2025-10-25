// js/menu.js

// 1. MENU DATA (SIMULATING A DATABASE)
let menuItems = [
    { id: 1, name: "Caprese Salad", description: "Fresh mozzarella, tomatoes, basil with olive oil.", price: 12.00, visible: true },
    { id: 2, name: "Lobster Ravioli", description: "Creamy lobster filling in a pink sauce.", price: 28.50, visible: true },
    { id: 3, name: "Tiramisu", description: "Coffee-soaked ladyfingers, mascarpone cream.", price: 9.00, visible: false },
    { id: 4, name: "Steak Frites", description: "Grilled sirloin with hand-cut fries.", price: 32.00, visible: true }
];

let nextItemId = 5;

// 2. RENDER FUNCTIONS

// Renders the menu for the public customer view
function renderCustomerMenu() {
    const container = document.getElementById('menu-list');
    if (!container) return; 

    container.innerHTML = ''; 

    menuItems
        .filter(item => item.visible) // ONLY visible items
        .forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'menu-item';
            itemElement.innerHTML = `
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <span class="price">$${item.price.toFixed(2)}</span>
            `;
            container.appendChild(itemElement);
        });
}

// Renders the menu for the admin dashboard (with controls)
function renderAdminMenu() {
    const container = document.getElementById('admin-menu-list');
    if (!container) return; 

    container.innerHTML = '';

    menuItems.forEach(item => {
        const statusClass = item.visible ? 'status-visible' : 'status-hidden';
        const statusText = item.visible ? 'Visible' : 'Hidden';
        const toggleText = item.visible ? 'Hide' : 'Show';

        const itemElement = document.createElement('div');
        itemElement.className = 'admin-menu-item';
        itemElement.dataset.itemId = item.id;
        itemElement.innerHTML = `
            <div class="admin-item-details">
                <h4>${item.name} ($${item.price.toFixed(2)}) 
                    <span class="status-tag ${statusClass}">${statusText}</span>
                </h4>
                <p>${item.description}</p>
            </div>
            <div class="admin-actions">
                <button class="btn-secondary" onclick="toggleVisibility(${item.id})">${toggleText}</button>
                <button class="btn-danger" onclick="deleteItem(${item.id})">Delete</button>
            </div>
        `;
        container.appendChild(itemElement);
    });
}

// 3. ADMIN ACTIONS

// Adds a new item from the form input
document.getElementById('add-item-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('new-name').value;
    const desc = document.getElementById('new-desc').value;
    const price = parseFloat(document.getElementById('new-price').value);

    if (name && desc && !isNaN(price)) {
        const newItem = {
            id: nextItemId++,
            name: name,
            description: desc,
            price: price,
            visible: true
        };
        menuItems.push(newItem);
        
        // Clear form and refresh both views
        this.reset();
        alert(`${name} added successfully!`);
        renderCustomerMenu();
        renderAdminMenu();
    } else {
        alert("Please ensure all fields are filled correctly.");
    }
});

// Deletes an item by ID
function deleteItem(id) {
    if (confirm("Are you sure you want to permanently delete this item?")) {
        menuItems = menuItems.filter(item => item.id !== id);
        renderCustomerMenu();
        renderAdminMenu();
    }
}

// Hides or shows an item by ID
function toggleVisibility(id) {
    const itemIndex = menuItems.findIndex(item => item.id === id);
    if (itemIndex !== -1) {
        menuItems[itemIndex].visible = !menuItems[itemIndex].visible;
        renderCustomerMenu(); // Update customer view
        renderAdminMenu(); // Update admin view
    }
}

// Initial render call when the script loads
document.addEventListener('DOMContentLoaded', renderCustomerMenu);