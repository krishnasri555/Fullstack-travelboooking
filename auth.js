class Auth {
    constructor() {
        this.isLoggedIn = false;
        this.user = null;
        this.checkAuthStatus();
        this.setupEventListeners();
    }

    // Check if user is already logged in
    checkAuthStatus() {
        const userData = localStorage.getItem('user');
        if (userData) {
            this.user = JSON.parse(userData);
            this.isLoggedIn = true;
            this.updateUI();
        }
    }

    // Update UI based on auth status
    updateUI() {
        const authButtons = document.querySelector('.nav__btns');
        if (this.isLoggedIn) {
            authButtons.innerHTML = `
                <div class="user-menu">
                    <img src="${this.user.avatar || 'assets/default-avatar.png'}" alt="Profile" class="user-avatar">
                    <div class="user-dropdown">
                        <a href="/profile">My Profile</a>
                        <a href="/bookings">My Bookings</a>
                        <a href="/wishlist">Wishlist</a>
                        <button onclick="auth.logout()">Logout</button>
                    </div>
                </div>
            `;
        } else {
            authButtons.innerHTML = `
                <button class="btn" onclick="auth.showLoginModal()">Login</button>
                <button class="btn" onclick="auth.showRegisterModal()">Register</button>
            `;
        }
    }

    // Show login modal
    showLoginModal() {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-btn">&times;</span>
                <h2>Login</h2>
                <form id="loginForm">
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="email" id="email" required>
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input type="password" id="password" required>
                    </div>
                    <button type="submit" class="btn">Login</button>
                </form>
                <p>Don't have an account? <a href="#" onclick="auth.showRegisterModal()">Register</a></p>
            </div>
        `;
        document.body.appendChild(modal);
        this.setupModalListeners(modal);
    }

    // Show register modal
    showRegisterModal() {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-btn">&times;</span>
                <h2>Register</h2>
                <form id="registerForm">
                    <div class="form-group">
                        <label for="fullName">Full Name</label>
                        <input type="text" id="fullName" required>
                    </div>
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="email" id="email" required>
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input type="password" id="password" required>
                    </div>
                    <div class="form-group">
                        <label for="confirmPassword">Confirm Password</label>
                        <input type="password" id="confirmPassword" required>
                    </div>
                    <button type="submit" class="btn">Register</button>
                </form>
                <p>Already have an account? <a href="#" onclick="auth.showLoginModal()">Login</a></p>
            </div>
        `;
        document.body.appendChild(modal);
        this.setupModalListeners(modal);
    }

    // Setup modal event listeners
    setupModalListeners(modal) {
        const closeBtn = modal.querySelector('.close-btn');
        const form = modal.querySelector('form');

        closeBtn.addEventListener('click', () => {
            modal.remove();
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            if (form.id === 'loginForm') {
                this.handleLogin(form);
            } else if (form.id === 'registerForm') {
                this.handleRegister(form);
            }
        });
    }

    // Handle login
    handleLogin(form) {
        const email = form.querySelector('#email').value;
        const password = form.querySelector('#password').value;

        // Get users from localStorage
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
            this.user = user;
            this.isLoggedIn = true;
            localStorage.setItem('user', JSON.stringify(user));
            this.updateUI();
            form.closest('.modal').remove();
            this.showNotification('Login successful!');
        } else {
            this.showError(form, 'Invalid email or password');
        }
    }

    // Handle registration
    handleRegister(form) {
        const fullName = form.querySelector('#fullName').value;
        const email = form.querySelector('#email').value;
        const password = form.querySelector('#password').value;
        const confirmPassword = form.querySelector('#confirmPassword').value;

        if (password !== confirmPassword) {
            this.showError(form, 'Passwords do not match');
            return;
        }

        // Get existing users
        const users = JSON.parse(localStorage.getItem('users')) || [];

        // Check if email already exists
        if (users.some(u => u.email === email)) {
            this.showError(form, 'Email already registered');
            return;
        }

        // Create new user
        const newUser = {
            id: Date.now(),
            fullName,
            email,
            password,
            avatar: null
        };

        // Save user
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));

        // Auto login
        this.user = newUser;
        this.isLoggedIn = true;
        localStorage.setItem('user', JSON.stringify(newUser));
        this.updateUI();
        form.closest('.modal').remove();
        this.showNotification('Registration successful!');
    }

    // Logout
    logout() {
        this.user = null;
        this.isLoggedIn = false;
        localStorage.removeItem('user');
        this.updateUI();
        this.showNotification('Logged out successfully');
    }

    // Show error message
    showError(form, message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        form.insertBefore(errorDiv, form.firstChild);
        setTimeout(() => errorDiv.remove(), 3000);
    }

    // Show notification
    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 3000);
    }

    // Setup event listeners
    setupEventListeners() {
        document.addEventListener('click', (e) => {
            if (e.target.matches('.user-menu')) {
                const dropdown = document.querySelector('.user-dropdown');
                dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
            }
        });
    }
}

// Initialize auth
const auth = new Auth();
