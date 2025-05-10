class SearchSystem {
    constructor() {
        this.filters = {
            price: 50000,
            duration: 'all',
            rating: 0,
            location: ''
        };
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Price range slider
        const priceRange = document.getElementById('priceRange');
        const priceValue = document.getElementById('priceValue');
        
        priceRange.addEventListener('input', (e) => {
            this.filters.price = e.target.value;
            priceValue.textContent = `Rs. ${this.formatPrice(e.target.value)}`;
            this.filterPackages();
        });

        // Duration select
        document.getElementById('duration').addEventListener('change', (e) => {
            this.filters.duration = e.target.value;
            this.filterPackages();
        });

        // Rating radio buttons
        document.querySelectorAll('input[name="rating"]').forEach(radio => {
            radio.addEventListener('change', (e) => {
                this.filters.rating = parseInt(e.target.value);
                this.filterPackages();
            });
        });
    }

    filterPackages() {
        const packages = document.querySelectorAll('.package-card');
        packages.forEach(pkg => {
            const price = parseInt(pkg.dataset.price);
            const duration = pkg.dataset.duration;
            const rating = parseFloat(pkg.dataset.rating);
            const location = pkg.dataset.location;

            const matchesPrice = price <= this.filters.price;
            const matchesDuration = this.filters.duration === 'all' || duration === this.filters.duration;
            const matchesRating = rating >= this.filters.rating;
            const matchesLocation = !this.filters.location || 
                                  location.toLowerCase().includes(this.filters.location.toLowerCase());

            if (matchesPrice && matchesDuration && matchesRating && matchesLocation) {
                pkg.style.display = 'block';
            } else {
                pkg.style.display = 'none';
            }
        });
    }

    formatPrice(price) {
        return new Intl.NumberFormat('en-IN').format(price);
    }
}

// Initialize search
const searchSystem = new SearchSystem();
