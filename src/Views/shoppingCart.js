class ShoppingCart {
    constructor() {
        this.items = [];
        this.isCartVisible = false;
        this.currentUser = null;
        this.debugMode = false; 
        this.init();
    }

    // HELPER METHOD FOR CONDITIONAL LOGGING
    log(message, ...args) {
        if (this.debugMode) {
            console.log(message, ...args);
        }
    }

    init() {
        this.loadCurrentUser();
        this.loadCartFromUser();
        this.waitForNavbar();
        this.createCartModal();
        this.initializeProductIntegration();
        this.initializeDetailProductIntegration();
    }

    // Get current user from localStorage/sessionStorage
    loadCurrentUser() {
        const userFromLocal = localStorage.getItem("currentUser");
        const userFromSession = sessionStorage.getItem("currentUser");
        this.currentUser = userFromLocal ? JSON.parse(userFromLocal) : 
                          userFromSession ? JSON.parse(userFromSession) : null;
        
        // ONLY LOG IF USER EXISTS
        if (this.currentUser) {
            console.log(`🔐 User loaded: ${this.currentUser.userName}`);
        }
    }

    // Load cart from user's shopping_cart field in MockAPI structure
    loadCartFromUser() {
        if (this.currentUser && this.currentUser.shopping_cart) {
            this.items = this.currentUser.shopping_cart || [];
            // ONLY LOG IF ITEMS EXIST
            if (this.items.length > 0) {
                console.log(`🛒 Cart loaded: ${this.items.length} items`);
            }
        } else {
            this.items = [];
        }
    }

    // Save cart to user's shopping_cart field and update MockAPI
    async saveCartToUser() {
        if (!this.currentUser) {
            return;
        }

        try {
            // Update local user object
            this.currentUser.shopping_cart = this.items;
            
            // Save to localStorage/sessionStorage
            if (localStorage.getItem("currentUser")) {
                localStorage.setItem("currentUser", JSON.stringify(this.currentUser));
            } else if (sessionStorage.getItem("currentUser")) {
                sessionStorage.setItem("currentUser", JSON.stringify(this.currentUser));
            }

            // Update MockAPI using existing updateUser function from userAPI.js
            const { updateUser } = await import('../API/userAPI.js');
            await updateUser(this.currentUser.id, this.currentUser);
            this.log('Cart saved to MockAPI successfully');
        } catch (error) {
            console.error('Error saving cart to user:', error);
        }
    }

    waitForNavbar() {
        const checkNavbar = () => {
            const cartIcon = document.querySelector('.cart-icon');
            
            if (cartIcon) {
                console.log('Cart integrated with navbar');
                this.integrateWithNavbar(cartIcon);
            }
        };

        setTimeout(checkNavbar, 100);
        setTimeout(checkNavbar, 500);
        setTimeout(checkNavbar, 1000);
    }

    integrateWithNavbar(cartIcon) {
        if (cartIcon.tagName === "A") {
            cartIcon.removeAttribute('href');
        }

        cartIcon.onclick = null;
        cartIcon.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.toggleCart();
        });

        const existingBadge = cartIcon.querySelector('#cart-badge');
        if (!existingBadge) {
            const cartBadge = document.createElement("span");
            cartBadge.id = "cart-badge";
            cartBadge.className = "cart-badge-navbar";
            cartBadge.textContent = "0";
            cartBadge.style.display = "none";
            cartIcon.style.position = "relative";
            cartIcon.appendChild(cartBadge);
        }

        this.addNavbarCartStyles();
        this.updateCartBadge();
    }

    addNavbarCartStyles() {
        if (document.getElementById('cart-styles')) return;
        const style = document.createElement("style");
        style.id = 'cart-styles';
        style.textContent = `
            .cart-badge-navbar {
                position: absolute !important;
                top: -12px !important; 
                right: -12px !important; 
                background: #e74c3c !important;
                color: white !important;
                border-radius: 50% !important;
                padding: 4px 8px !important; 
                font-size: 11px !important; 
                font-weight: bold !important;
                min-width: 20px !important;
                height: 20px !important; 
                text-align: center !important;
                z-index: 999 !important;
                line-height: 12px !important; 
                border: 2px solid white !important;
                display: flex !important; 
                align-items: center !important; 
                justify-content: center !important; 
                pointer-events: none !important; 
            }
            .cart-modal {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.7);
                display: none;
                z-index: 10000 !important;
                align-items: center;
                justify-content: center;
                padding: 20px;
                box-sizing: border-box;
            }
            .cart-modal.show {
                display: flex;
            }
            .cart-content {
                background: white;
                border-radius: 12px;
                padding: 30px;
                max-width: 600px;
                width: 100%;
                max-height: 80vh;
                overflow-y: auto;
                position: relative;
                box-shadow: 0 10px 30px rgba(0,0,0,0.3);
                z-index: 10001 !important;
            }
            .cart-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 20px;
                border-bottom: 2px solid #eee;
                padding-bottom: 15px;
            }
            .cart-title {
                font-size: 24px;
                font-weight: 600;
                color: #003e83;
                margin: 0;
            }
            .close-cart {
                background: none;
                border: none;
                font-size: 28px;
                cursor: pointer;
                color: #7f8c8d;
                padding: 5px;
                line-height: 1;
                border-radius: 50%;
                width: 35px;
                height: 35px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .close-cart:hover {
                background: #f8f9fa;
                color: #e74c3c;
            }
            .cart-items {
                max-height: 400px;
                overflow-y: auto;
                margin-bottom: 20px;
            }
            .cart-item {
                display: flex;
                align-items: center;
                padding: 15px 0;
                border-bottom: 1px solid #eee;
            }
            .cart-item:last-child {
                border-bottom: none;
            }
            .cart-item img {
                width: 80px;
                height: 80px;
                object-fit: cover;
                border-radius: 8px;
                margin-right: 15px;
            }
            .cart-item-info {
                flex: 1;
            }
            .cart-item-name {
                font-weight: 600;
                color: #003e83;
                margin-bottom: 5px;
                font-size: 16px;
            }
            .cart-item-price {
                color: #ffab00;
                font-weight: 500;
                font-size: 14px;
            }
            .cart-item-controls {
                display: flex;
                align-items: center;
                gap: 10px;
            }
            .quantity-btn {
                background: #003e83;
                color: white;
                border: none;
                width: 32px;
                height: 32px;
                border-radius: 50%;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 16px;
                font-weight: bold;
                transition: background-color 0.3s ease;
            }
            .quantity-btn:hover {
                background: #ffab00;
            }
            .quantity-btn:disabled {
                background: #bdc3c7;
                cursor: not-allowed;
            }
            .quantity-display {
                min-width: 40px;
                text-align: center;
                font-weight: 600;
                color: #003e83;
                font-size: 16px;
            }
            .remove-item {
                background: #e74c3c;
                color: white;
                border: none;
                padding: 6px 12px;
                border-radius: 6px;
                cursor: pointer;
                font-size: 12px;
                transition: background-color 0.3s ease;
            }
            .remove-item:hover {
                background: #c0392b;
            }
            .cart-total {
                margin-top: 20px;
                padding-top: 20px;
                border-top: 2px solid #eee;
                text-align: right;
                font-size: 20px;
                font-weight: 700;
                color: #003e83;
            }
            .cart-actions {
                margin-top: 20px;
                display: flex;
                gap: 15px;
                justify-content: flex-end;
            }
            .clear-cart, .checkout-btn {
                padding: 12px 24px;
                border: none;
                border-radius: 6px;
                cursor: pointer;
                font-size: 14px;
                font-weight: 600;
                transition: all 0.3s ease;
            }
            .clear-cart {
                background: #95a5a6;
                color: white;
            }
            .clear-cart:hover {
                background: #7f8c8d;
                transform: translateY(-2px);
            }
            .checkout-btn {
                background: #ffab00;
                color: white;
            }
            .checkout-btn:hover {
                background: #e69500;
                transform: translateY(-2px);
            }
            .empty-cart {
                text-align: center;
                color: #7f8c8d;
                font-style: italic;
                padding: 40px 20px;
                font-size: 16px;
            }
            .login-required {
                text-align: center;
                padding: 40px 20px;
                color: #003e83;
            }
            .login-required a {
                color: #ffab00;
                text-decoration: none;
                font-weight: 600;
            }
            .login-required a:hover {
                text-decoration: underline;
            }
            .success-message {
                position: fixed !important;
                top: 20px !important;
                right: 20px !important;
                background: #27ae60 !important;
                color: white !important;
                padding: 15px 20px !important;
                border-radius: 5px !important;
                z-index: 10000 !important;
                font-weight: 500 !important;
                box-shadow: 0 4px 12px rgba(39, 174, 96, 0.3) !important;
                animation: slideIn 0.3s ease !important;
            }
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }

    createCartModal() {
        const existingModal = document.getElementById("cart-modal");
        if (existingModal) {
            existingModal.remove();
        }

        const modal = document.createElement("div");
        modal.className = "cart-modal";
        modal.id = "cart-modal";
        modal.innerHTML = `
            <div class="cart-content">
                <div class="cart-header">
                    <h2 class="cart-title">🛒 Shopping cart</h2>
                    <button class="close-cart" aria-label="Close cart">×</button>
                </div>
                <div class="cart-items" id="cart-items">
                    <!-- Cart items will be rendered here -->
                </div>
                <div class="cart-total" id="cart-total">
                    Total: $0.00
                </div>
                <div class="cart-actions">
                    <button class="clear-cart">Clear cart</button>
                    <button class="checkout-btn">Proceed to Payment</button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        modal.querySelector(".close-cart").addEventListener("click", () => {
            this.hideCart();
        });

        modal.querySelector(".clear-cart").addEventListener("click", () => {
            this.clearCart();
        });

        modal.querySelector(".checkout-btn").addEventListener("click", () => {
            this.checkout();
        });

        modal.addEventListener("click", (e) => {
            if (e.target === modal) {
                this.hideCart();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isCartVisible) {
                this.hideCart();
            }
        });
    }

    toggleCart() {
        if (this.isCartVisible) {
            this.hideCart();
        } else {
            this.showCart();
        }
    }

    showCart() {
        const modal = document.getElementById("cart-modal");
        if (modal) {
            modal.classList.add("show");
            this.isCartVisible = true;
            this.renderCartItems();
            document.body.style.overflow = 'hidden';
        }
    }

    hideCart() {
        const modal = document.getElementById("cart-modal");
        if (modal) {
            modal.classList.remove("show");
            this.isCartVisible = false;
            document.body.style.overflow = '';
        }
    }

    async addToCart(product) {
        if (!this.currentUser) {
            alert('Please log in to add products to your cart.');
            window.location.href = 'auth.html';
            return false;
        }

        const cartProduct = {
            id: product.id || this.generateProductId(product.name, product.price),
            name: product.name,
            price: parseFloat(product.price),
            image: product.image,
            description: product.description || '',
            quantity: 1
        };

        const existingItem = this.items.find(item => item.id === cartProduct.id);

        if (existingItem) {
            existingItem.quantity += 1;
            this.log(`Increased quantity for ${cartProduct.name} to ${existingItem.quantity}`);
        } else {
            this.items.push(cartProduct);
            console.log(`Added: ${cartProduct.name}`); 
        }

        await this.saveCartToUser();
        this.updateCartBadge();
        this.showSuccessMessage(`${product.name} added to cart`);
        this.updateButtonState(cartProduct.id, true);
        
        return true;
    }

    async removeFromCart(productId) {
        const itemIndex = this.items.findIndex(item => item.id === productId);
        if (itemIndex > -1) {
            const removedItem = this.items.splice(itemIndex, 1)[0];
            this.log(`Removed ${removedItem.name} from cart`);
            
            await this.saveCartToUser();
            this.updateCartBadge();
            this.updateButtonState(productId, false);
            
            if (this.isCartVisible) {
                this.renderCartItems();
            }
        }
    }

    async updateQuantity(productId, newQuantity) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            if (newQuantity <= 0) {
                await this.removeFromCart(productId);
            } else {
                item.quantity = newQuantity;
                this.log(`Updated quantity for ${item.name} to ${newQuantity}`);
                await this.saveCartToUser();
                this.updateCartBadge();
                
                if (this.isCartVisible) {
                    this.renderCartItems();
                }
            }
        }
    }

    renderCartItems() {
        const cartItemsContainer = document.getElementById("cart-items");
        const cartTotal = document.getElementById("cart-total");
        
        if (!this.currentUser) {
            cartItemsContainer.innerHTML = `
                <div class="login-required">
                    <h3>Sign in to view your cart</h3>
                    <p><a href="auth.html">Click here to log in</a></p>
                </div>
            `;
            cartTotal.textContent = '';
            return;
        }

        if (this.items.length === 0) {
            cartItemsContainer.innerHTML = `
                <div class="empty-cart">
                    <h3>Your cart is empty</h3>
                    <p>Add some amazing products!</p>
                </div>
            `;
            cartTotal.textContent = 'Total: $0.00';
            return;
        }

        cartItemsContainer.innerHTML = '';
        let total = 0;

        this.items.forEach(item => {
            total += item.price * item.quantity;
            
            const itemElement = document.createElement('div');
            itemElement.className = 'cart-item';
            itemElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}" onerror="this.src='/placeholder.jpg'">
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                </div>
                <div class="cart-item-controls">
                    <button class="quantity-btn" onclick="window.shoppingCart.updateQuantity('${item.id}', ${item.quantity - 1})" ${item.quantity <= 1 ? 'disabled' : ''}>−</button>
                    <span class="quantity-display">${item.quantity}</span>
                    <button class="quantity-btn" onclick="window.shoppingCart.updateQuantity('${item.id}', ${item.quantity + 1})">+</button>
                    <button class="remove-item" onclick="window.shoppingCart.removeFromCart('${item.id}')">Eliminar</button>
                </div>
            `;
            cartItemsContainer.appendChild(itemElement);
        });

        cartTotal.textContent = `Total: $${total.toFixed(2)}`;
    }

    updateCartBadge() {
        const badge = document.getElementById("cart-badge");
        if (badge) {
            const totalItems = this.items.reduce((sum, item) => sum + item.quantity, 0);
            badge.textContent = totalItems;
            badge.style.display = totalItems > 0 ? "inline-block" : "none";
        }
    }

    showSuccessMessage(message) {
        const messageDiv = document.createElement("div");
        messageDiv.textContent = message;
        messageDiv.className = "success-message";
        document.body.appendChild(messageDiv);

        setTimeout(() => {
            messageDiv.remove();
        }, 3000);
    }

    initializeProductIntegration() {
        const waitForProducts = () => {
            const productList = document.getElementById("product-list");
            
            if (productList) {
                console.log('Product integration ready');
                this.setupProductObserver();
                this.addCartButtonListeners();
            } else {
                if (!this.productRetryCount) this.productRetryCount = 0;
                this.productRetryCount++;
                
                if (this.productRetryCount < 6) { 
                    setTimeout(waitForProducts, 500);
                } else {
                    // FALLBACK - TRY TO ADD LISTENERS ANYWAY
                    this.addCartButtonListeners();
                }
            }
        };

        if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", waitForProducts);
        } else {
            waitForProducts();
        }
    }

    setupProductObserver() {
        const productList = document.getElementById("product-list");
        if (!productList) return;

        let isProcessing = false; 
        const observer = new MutationObserver((mutations) => {
            if (isProcessing) return;      
            
            const hasNewButtons = mutations.some(mutation => 
                Array.from(mutation.addedNodes).some(node => 
                    node.nodeType === 1 && 
                    (node.classList?.contains('add-cart-btn') || 
                     node.querySelector?.('.add-cart-btn'))
                )
            );

            if (!hasNewButtons) return;
            isProcessing = true;
            
            this.addCartButtonListeners();
            
            setTimeout(() => {
                isProcessing = false;
            }, 500);
        });

        observer.observe(productList, {
            childList: true,
            subtree: true,
        });
    }

    addCartButtonListeners() {
        const addToCartButtons = document.querySelectorAll(".add-cart-btn:not([data-cart-listener-added])");
        
        if (addToCartButtons.length === 0) {
            return; 
        }

        this.log(`Processing ${addToCartButtons.length} new buttons`);

        addToCartButtons.forEach((button, index) => {
            button.addEventListener("click", async (e) => {
                e.preventDefault();
                e.stopPropagation();

                const productCard = button.closest(".product-card");
                const product = this.extractProductData(productCard);

                if (product) {
                    const success = await this.addToCart(product);

                    if (success) {
                        setTimeout(() => {
                            if (!button.disabled) return;
                            button.textContent = "Add to cart";
                            button.disabled = false;
                        }, 3000);
                    }
                }
            });

            button.dataset.cartListenerAdded = "true";
        });

        this.resetAddToCartButtons();
    }

    initializeDetailProductIntegration() {
        const checkDetailButton = () => {
            const addToCartBtn = document.getElementById('addToCartBtn');
            if (addToCartBtn) {
                const newButton = addToCartBtn.cloneNode(true);
                addToCartBtn.parentNode.replaceChild(newButton, addToCartBtn);
                
                newButton.addEventListener('click', async (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    const selectedProduct = JSON.parse(localStorage.getItem('selectedProduct') || '{}');
                    if (selectedProduct.name) {
                        const success = await this.addToCart(selectedProduct);
                        
                        if (success) {
                            newButton.textContent = 'Added to cart ✓';
                            newButton.disabled = true;
                            newButton.style.background = '#27ae60';
                        }
                    }
                });
                
                const selectedProduct = JSON.parse(localStorage.getItem('selectedProduct') || '{}');
                const productId = selectedProduct.id || this.generateProductId(selectedProduct.name, selectedProduct.price);
                const inCart = this.items.some(item => item.id === productId);
                
                if (inCart) {
                    newButton.textContent = 'Added to cart ✓';
                    newButton.disabled = true;
                    newButton.style.background = '#27ae60';
                }
            }
        };
        
        setTimeout(checkDetailButton, 100);
        setTimeout(checkDetailButton, 500);
        setTimeout(checkDetailButton, 1000);
    }

    extractProductData(productCard) {
        try {
            const img = productCard.querySelector("img");
            const name = productCard.querySelector(".name");
            const description = productCard.querySelector(".description");
            const priceElement = productCard.querySelector(".price");

            if (!img || !name || !description || !priceElement) {
                return null;
            }

            const priceText = priceElement.textContent || "";
            const priceMatch = priceText.match(/\$?(\d+\.?\d*)/);
            const price = priceMatch ? parseFloat(priceMatch[1]) : 0;

            const productName = name.textContent || "Unknown Product";
            const productId = this.generateProductId(productName, price);

            return {
                id: productId,
                name: productName,
                description: description.textContent || "",
                price: price,
                image: img.src || "",
            };
        } catch (error) {
            console.error("Error extracting product data:", error);
            return null;
        }
    }

    generateProductId(name, price) {
        const cleanName = name.toLowerCase().replace(/[^a-z0-9]/g, "");
        return `${cleanName}_${price}`.replace(/\./g, "_");
    }

    async clearCart() {
        if (confirm('Are you sure you want to clear your cart?')) {
            const oldItems = [...this.items];
            this.items = [];
            
            await this.saveCartToUser();
            this.updateCartBadge();
            this.renderCartItems();
            
            oldItems.forEach(item => {
                this.updateButtonState(item.id, false);
            });
            
            console.log('Cart cleared');
        }
    }

    checkout() {
        if (this.items.length === 0) {
            alert('Your cart is empty');
            return;
        }

        if (!this.currentUser) {
            alert('Please log in to proceed with payment.');
            window.location.href = 'auth.html';
            return;
        }

        const total = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        
        if (confirm(`¿Proceder con el pago de $${total.toFixed(2)}?`)) {
            alert(`¡Gracias por tu compra, ${this.currentUser.userName}! Total: $${total.toFixed(2)}\n\n(Funcionalidad de pago en desarrollo)`);
            this.clearCart();
            this.hideCart();
        }
    }

    updateButtonState(productId, inCart) {
        // REMOVED DETAILED LOGGING - ONLY LOG ERRORS
        const buttons = document.querySelectorAll('.add-cart-btn');
        
        buttons.forEach(btn => {
            const productCard = btn.closest('.product-card');
            if (productCard) {
                const cardProduct = this.extractProductData(productCard);
                if (cardProduct && cardProduct.id === productId) {
                    if (inCart) {
                        btn.textContent = 'Added to cart ✓';
                        btn.disabled = true;
                        btn.style.background = '#27ae60';
                    } else {
                        btn.textContent = 'Add to cart';
                        btn.disabled = false;
                        btn.style.background = '';
                    }
                }
            }
        });
    }

    resetAddToCartButtons() {
        // SILENT EXECUTION - NO LOGGING
        const buttons = document.querySelectorAll('.add-cart-btn');
        
        buttons.forEach(btn => {
            const productCard = btn.closest('.product-card');
            if (productCard) {
                const cardProduct = this.extractProductData(productCard);
                if (cardProduct) {
                    const inCart = this.items.find(item => item.id === cardProduct.id);
                    this.updateButtonState(cardProduct.id, !!inCart);
                }
            }
        });
    }

    async syncCartState() {
        this.loadCurrentUser();
        this.loadCartFromUser();
        this.updateCartBadge();
        
        this.items.forEach(item => {
            this.updateButtonState(item.id, true);
        });
    }
}

// Initialize shopping cart when DOM is ready
let shoppingCart;

function initShoppingCart() {
    console.log('ShoppingCart initialized');
    shoppingCart = new ShoppingCart();
    window.shoppingCart = shoppingCart;
    window.cart = shoppingCart;
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initShoppingCart);
} else {
    initShoppingCart();
}