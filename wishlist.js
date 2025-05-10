// wishlist.js
class Wishlist {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('wishlist')) || [];
        this.updateUI();
    }

    addItem(package) {
        if (!this.items.find(item => item.id === package.id)) {
            this.items.push(package);
            this.saveToStorage();
            this.updateUI();
            this.showNotification('Added to wishlist!');
        }
    }

    removeItem(packageId) {
        this.items = this.items.filter(item => item.id !== packageId);
        this.saveToStorage();
        this.updateUI();
        this.showNotification('Removed from wishlist!');
    }

    saveToStorage() {
        localStorage.setItem('wishlist', JSON.stringify(this.items));
    }

    updateUI() {
        // Update wishlist count
        const wishlistCount = document.querySelector('.wishlist-count');
        if (wishlistCount) {
            wishlistCount.textContent = this.items.length;
        }

        // Update wishlist page if on wishlist page
        const wishlistContainer = document.querySelector('.wishlist-container');
        if (wishlistContainer) {
            wishlistContainer.innerHTML = this.items.map(item => `
                <div class="wishlist-item">
                    <img src="${item.image}" alt="${item.name}">
                    <div class="wishlist-item-content">
                        <h3>${item.name}</h3>
                        <p>${item.description}</p>
                        <p class="price">Rs. ${this.formatPrice(item.price)}</p>
                        <div class="wishlist-item-actions">
                            <button class="btn" onclick="wishlist.removeItem('${item.id}')">
                                Remove
                            </button>
                            <button class="btn primary" onclick="booking.addToCart(${JSON.stringify(item)})">
                                Book Now
                            </button>
                        </div>
                    </div>
                </div>
            `).join('');
        }
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 3000);
    }

    formatPrice(price) {
        return new Intl.NumberFormat('en-IN').format(price);
    }
}

// Initialize wishlist
const wishlist = new Wishlist();