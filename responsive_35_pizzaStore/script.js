document.addEventListener('DOMContentLoaded', () => {
            const mobileMenuBtn = document.getElementById('mobile-menu-btn');
            const mobileMenu = document.getElementById('mobile-menu');
            const messageBox = document.getElementById('message-box');
            const cartBtn = document.getElementById('cart-btn');
            const cartModal = document.getElementById('cart-modal');
            const closeCartBtn = document.getElementById('close-cart-btn');
            const cartItemsContainer = document.getElementById('cart-items');
            const cartSubtotalSpan = document.getElementById('cart-subtotal');
            const cartTaxSpan = document.getElementById('cart-tax');
            const cartTotalSpan = document.getElementById('cart-total');
            const cartCountSpan = document.getElementById('cart-count');
            const cartEmptyMessage = document.getElementById('cart-empty-message');
            
            // Define the tax rate for Ontario (13% HST)
            const ONTARIO_HST_RATE = 0.13;

            let cart = [];

            // Function to update the cart UI
            const updateCartUI = () => {
                cartItemsContainer.innerHTML = '';
                let subtotal = 0;

                if (cart.length === 0) {
                    cartEmptyMessage.classList.remove('hidden');
                    cartCountSpan.classList.add('hidden');
                } else {
                    cartEmptyMessage.classList.add('hidden');
                    cartCountSpan.classList.remove('hidden');
                    cartCountSpan.textContent = cart.length;
                }

                cart.forEach((item, index) => {
                    const li = document.createElement('li');
                    li.classList.add('flex', 'justify-between', 'items-center');
                    li.innerHTML = `
                        <div class="flex items-center space-x-2">
                            <span class="text-gray-800">${item.name}</span>
                            <button class="remove-from-cart-btn text-red-500 hover:text-red-700" data-index="${index}">
                                <i class="fas fa-trash-alt"></i>
                            </button>
                        </div>
                        <span class="font-bold text-red-600">$${item.price.toFixed(2)}</span>
                    `;
                    cartItemsContainer.appendChild(li);
                    subtotal += item.price;
                });
                
                const tax = subtotal * ONTARIO_HST_RATE;
                const finalTotal = subtotal + tax;

                cartSubtotalSpan.textContent = `$${subtotal.toFixed(2)}`;
                cartTaxSpan.textContent = `$${tax.toFixed(2)}`;
                cartTotalSpan.textContent = `$${finalTotal.toFixed(2)}`;

                // Attach event listeners to the newly created remove buttons
                document.querySelectorAll('.remove-from-cart-btn').forEach(button => {
                    button.addEventListener('click', (e) => {
                        const index = e.currentTarget.dataset.index;
                        cart.splice(index, 1);
                        updateCartUI();
                    });
                });
            };

            // Toggle mobile menu on button click
            mobileMenuBtn.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
            });

            // Handle "Add to Cart" button clicks
            document.querySelectorAll('.add-to-cart-btn').forEach(button => {
                button.addEventListener('click', () => {
                    const card = button.closest('.pizza-card');
                    const name = card.querySelector('h3').dataset.name;
                    const price = parseFloat(card.querySelector('span[data-price]').dataset.price);
                    
                    if (name && !isNaN(price)) {
                        cart.push({ name, price });
                        updateCartUI();
                        
                        messageBox.textContent = `${name} added to cart!`;
                        messageBox.classList.remove('hidden');
                        setTimeout(() => {
                            messageBox.classList.add('hidden');
                        }, 2000);
                    }
                });
            });

            // Show/Hide cart modal by toggling the 'open' class
            cartBtn.addEventListener('click', () => {
                cartModal.classList.toggle('open');
            });

            closeCartBtn.addEventListener('click', () => {
                cartModal.classList.remove('open');
            });

            // Handle checkout button click
            document.getElementById('checkout-btn').addEventListener('click', () => {
                 messageBox.textContent = `Checkout not implemented yet, but you're ready to go!`;
                 messageBox.classList.remove('hidden');
                 setTimeout(() => {
                     messageBox.classList.add('hidden');
                 }, 3000);
            });

            // Smooth scrolling for navigation links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    document.querySelector(this.getAttribute('href')).scrollIntoView({
                        behavior: 'smooth'
                    });
                    // Hide mobile menu after a link is clicked
                    if (!mobileMenu.classList.contains('hidden')) {
                         mobileMenu.classList.add('hidden');
                    }
                });
            });
        });