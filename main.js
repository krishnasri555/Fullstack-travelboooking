const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");
const menuBtnIcon = menuBtn.querySelector("i");

menuBtn.addEventListener("click", (e) => {
  navLinks.classList.toggle("open");

  const isOpen = navLinks.classList.contains("open");
  menuBtnIcon.setAttribute(
    "class",
    isOpen ? "ri-close-line" : "ri-menu-3-line"
  );
});

navLinks.addEventListener("click", (e) => {
  navLinks.classList.remove("open");
  menuBtnIcon.setAttribute("class", "ri-menu-3-line");
});

const scrollRevealOption = {
  distance: "50px",
  origin: "bottom",
  duration: 1000,
};

ScrollReveal().reveal(".header__image img", {
  ...scrollRevealOption,
  origin: "right",
  interval: 500,
});
ScrollReveal().reveal(".header__content h1", {
  ...scrollRevealOption,
  delay: 1500,
});
ScrollReveal().reveal(".header__content .section__description", {
  ...scrollRevealOption,
  delay: 2000,
});
ScrollReveal().reveal(".header__content form", {
  ...scrollRevealOption,
  delay: 2500,
});

ScrollReveal().reveal(".choose__image img", {
  ...scrollRevealOption,
  origin: "left",
});
ScrollReveal().reveal(".choose__content .section__subheader", {
  ...scrollRevealOption,
  delay: 500,
});
ScrollReveal().reveal(".choose__content .section__header", {
  ...scrollRevealOption,
  delay: 1000,
});
ScrollReveal().reveal(".choose__list li", {
  ...scrollRevealOption,
  delay: 1500,
  interval: 500,
});

const swiper = new Swiper(".swiper", {
  slidesPerView: 3,
  spaceBetween: 0,
  loop: true,
});

ScrollReveal().reveal(".explore__image img", {
  ...scrollRevealOption,
  origin: "right",
});
ScrollReveal().reveal(".explore__content .section__subheader", {
  ...scrollRevealOption,
  delay: 500,
});
ScrollReveal().reveal(".explore__content .section__header", {
  ...scrollRevealOption,
  delay: 1000,
});
ScrollReveal().reveal(".explore__content .section__description", {
  ...scrollRevealOption,
  delay: 1500,
});
ScrollReveal().reveal(".explore__content .explore__btn", {
  ...scrollRevealOption,
  delay: 2000,
});
ScrollReveal().reveal(".explore__grid div", {
  duration: 1000,
  delay: 2500,
  interval: 500,
});

const next = document.getElementById("next");
const prev = document.getElementById("prev");
const clientCards = Array.from(document.querySelectorAll(".client__card"));

next.addEventListener("click", (e) => {
  for (let index = 0; index < clientCards.length; index++) {
    if (clientCards[index].classList.contains("active")) {
      const nextIndex = (index + 1) % clientCards.length;
      clientCards[index].classList.remove("active");
      clientCards[nextIndex].classList.add("active");
      break;
    }
  }
});

prev.addEventListener("click", (e) => {
  for (let index = 0; index < clientCards.length; index++) {
    if (clientCards[index].classList.contains("active")) {
      const prevIndex = (index ? index : clientCards.length) - 1;
      clientCards[index].classList.remove("active");
      clientCards[prevIndex].classList.add("active");
      break;
    }
  }
});

ScrollReveal().reveal(".subscribe__container .section__header", {
  ...scrollRevealOption,
});
ScrollReveal().reveal(".subscribe__container .section__description", {
  ...scrollRevealOption,
  delay: 500,
});
ScrollReveal().reveal(".subscribe__container form", {
  ...scrollRevealOption,
  delay: 1000,
});

// Registration Modal Functionality
const registerBtn = document.querySelector('.nav__btns .btn');
const registerModal = document.getElementById('registerModal');
const closeBtn = document.querySelector('.close-btn');
const registerForm = document.getElementById('registerForm');

// Open modal
registerBtn.addEventListener('click', () => {
  registerModal.style.display = 'flex';
  document.body.style.overflow = 'hidden'; // Prevent background scrolling
});

// Close modal
closeBtn.addEventListener('click', () => {
  registerModal.style.display = 'none';
  document.body.style.overflow = 'auto';
});

// Close modal when clicking outside
registerModal.addEventListener('click', (e) => {
  if (e.target === registerModal) {
    registerModal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
});

// Form validation and submission
registerForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const fullName = document.getElementById('fullName').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;

  // Clear previous error messages
  clearErrors();

  // Validate form
  let isValid = true;

  if (fullName.trim() === '') {
    showError('fullName', 'Full name is required');
    isValid = false;
  }

  if (email.trim() === '') {
    showError('email', 'Email is required');
    isValid = false;
  } else if (!isValidEmail(email)) {
    showError('email', 'Please enter a valid email');
    isValid = false;
  }

  if (password.length < 6) {
    showError('password', 'Password must be at least 6 characters');
    isValid = false;
  }

  if (password !== confirmPassword) {
    showError('confirmPassword', 'Passwords do not match');
    isValid = false;
  }

  if (isValid) {
    // Here you would typically make an API call to your backend
    console.log('Registration data:', {
      fullName,
      email,
      password
    });

    // Show success message
    alert('Registration successful!');
    
    // Close modal and reset form
    registerModal.style.display = 'none';
    document.body.style.overflow = 'auto';
    registerForm.reset();
  }
});

// Helper functions
function showError(fieldId, message) {
  const field = document.getElementById(fieldId);
  field.classList.add('error');
  
  const errorDiv = document.createElement('div');
  errorDiv.className = 'error-message';
  errorDiv.textContent = message;
  
  field.parentNode.appendChild(errorDiv);
}

function clearErrors() {
  // Remove all error messages
  const errorMessages = document.querySelectorAll('.error-message');
  errorMessages.forEach(error => error.remove());
  
  // Remove error class from inputs
  const errorInputs = document.querySelectorAll('.error');
  errorInputs.forEach(input => input.classList.remove('error'));
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Login link functionality
document.getElementById('loginLink').addEventListener('click', (e) => {
  e.preventDefault();
  registerModal.style.display = 'none';
  // Here you can add code to show the login modal
  alert('Login functionality coming soon!');
});

// Package filtering
const filterButtons = document.querySelectorAll('.filter-btn');
if (filterButtons.length > 0) {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const filter = button.dataset.filter;
            filterPackages(filter);
        });
    });
}

function filterPackages(filter) {
    const packages = document.querySelectorAll('.package-card');
    packages.forEach(pkg => {
        if (filter === 'all' || pkg.dataset.category === filter) {
            pkg.style.display = 'block';
        } else {
            pkg.style.display = 'none';
        }
    });
}

// Contact form handling
const contactForm = document.querySelector('.contact__form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };
        
        // Here you would typically send the form data to your backend
        console.log('Contact form submitted:', formData);
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    });
}