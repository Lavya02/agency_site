/* ==========================================================================
   ANIMATIONS & SCROLL INTERACTIONS
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initCounterAnimation();
    initBackToTop();
});

// --- Animated Counter for Hero Stats ---
function initCounterAnimation() {
    const counters = document.querySelectorAll('.counter');
    if (!counters.length) return;

    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = +counter.getAttribute('data-target');
                const duration = 2000; // 2 seconds
                const stepTime = 20;
                const steps = duration / stepTime;
                const increment = target / steps;
                let current = 0;

                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        counter.textContent = target + "+";
                        clearInterval(timer);
                    } else {
                        counter.textContent = Math.ceil(current);
                    }
                }, stepTime);

                observer.unobserve(counter);
            }
        });
    }, observerOptions);

    counters.forEach(counter => observer.observe(counter));
}

// --- Back To Top Button ---
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    if (!backToTopBtn) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}
/* ==========================================================================
   FORM VALIDATION & HANDLING
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initContactFormValidation();
});

function initContactFormValidation() {
    const form = document.querySelector('.contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const nameInput = form.querySelector('input[type="text"]');
        const emailInput = form.querySelector('input[type="email"]');
        const submitBtn = form.querySelector('button[type="submit"]');

        let isValid = true;

        // Clear previous error states
        form.querySelectorAll('.error-message').forEach(el => el.remove());

        // Name Validation
        if (!nameInput.value.trim()) {
            showError(nameInput, 'Full name is required.');
            isValid = false;
        }

        // Email Validation
        if (!emailInput.value.trim()) {
            showError(emailInput, 'Email address is required.');
            isValid = false;
        } else if (!validateEmail(emailInput.value.trim())) {
            showError(emailInput, 'Please enter a valid email address.');
            isValid = false;
        }

        if (isValid) {
            const originalText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';

            // Simulate server response
            setTimeout(() => {
                alert('Thank you! Your message has been sent successfully. We will get back to you within 24 hours.');
                form.reset();
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            }, 1500);
        }
    });
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showError(inputElement, message) {
    inputElement.style.borderColor = '#ef4444';
    const errorDiv = document.createElement('span');
    errorDiv.className = 'error-message';
    errorDiv.style.color = '#ef4444';
    errorDiv.style.fontSize = '0.8rem';
    errorDiv.style.marginTop = '-10px';
    errorDiv.style.marginBottom = '10px';
    errorDiv.style.display = 'block';
    errorDiv.textContent = message;

    inputElement.after(errorDiv);

    inputElement.addEventListener('input', () => {
        inputElement.style.borderColor = '#e2e8f0';
        if (errorDiv) errorDiv.remove();
    }, { once: true });
}
/* ==========================================================================
   MAIN CORE SCRIPT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initPricingToggle();
    initSmoothScroll();
});

// --- Mobile Navigation Menu ---
function initNavbar() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close navbar when clicking link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }
}

// --- Pricing Toggle (Monthly / Yearly) ---
function initPricingToggle() {
    const priceToggle = document.getElementById('priceToggle');
    const monthlyPrices = document.querySelectorAll('.monthly-price');
    const yearlyPrices = document.querySelectorAll('.yearly-price');
    const toggleTexts = document.querySelectorAll('.toggle-text');

    if (!priceToggle) return;

    priceToggle.addEventListener('change', () => {
        const isYearly = priceToggle.checked;

        monthlyPrices.forEach(price => {
            price.style.display = isYearly ? 'none' : 'inline';
        });

        yearlyPrices.forEach(price => {
            price.style.display = isYearly ? 'inline' : 'none';
        });

        if (toggleTexts.length >= 2) {
            toggleTexts[0].classList.toggle('active', !isYearly);
            toggleTexts[1].classList.toggle('active', isYearly);
        }
    });
}

// --- Smooth Scrolling for Anchor Links ---
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}
