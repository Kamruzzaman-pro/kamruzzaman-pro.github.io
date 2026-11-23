
// ========================================
// 1. Mobile Responsive Menu Toggle
// ========================================

const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

if (mobileMenu && navLinks) {
    mobileMenu.addEventListener('click', () => {
        navLinks.classList.toggle('active');

        const icon = mobileMenu.querySelector('i');

        if (icon) {
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        }
    });

    // Close menu after clicking a navigation link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');

            const icon = mobileMenu.querySelector('i');

            if (icon) {
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-times');
            }
        });
    });
}


// ========================================
// 2. Animate Skill Bars
// ========================================

const progressBars = document.querySelectorAll('.progress');
const aboutSection = document.getElementById('about');

const showProgress = () => {
    progressBars.forEach(bar => {
        const value = bar.getAttribute('data-progress');

        if (value) {
            bar.style.width = value;
        }
    });
};

if (aboutSection && progressBars.length > 0) {

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                showProgress();

                // Stop observing after animation
                observer.unobserve(aboutSection);
            }

        });

    }, {
        threshold: 0.3
    });

    observer.observe(aboutSection);
}


// ========================================
// 3. Contact Form - Web3Forms API
// ========================================

const contactForm = document.getElementById('contactForm');
const formAlert = document.getElementById('formAlert');

if (contactForm && formAlert) {

    contactForm.addEventListener('submit', async function(e) {

        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        const button = contactForm.querySelector('.btn');

        // Show alert message
        const showAlert = (text, type) => {

            formAlert.textContent = text;
            formAlert.className = `alert ${type}`;
            formAlert.style.display = 'block';
            formAlert.classList.remove('hidden');

        };

        // Form validation
        if (!name || !email || !message) {

            showAlert('Please fill in all fields.', 'error');

            return;
        }

        // Email validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {

            showAlert('Please enter a valid email address.', 'error');

            return;
        }

        // Loading state
        button.disabled = true;
        button.innerText = 'Sending...';

        try {

            const formData = new FormData(contactForm);

            // Web3Forms API request
            const response = await fetch(
                'https://api.web3forms.com/submit',
                {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                }
            );

            // Read server response
            const json = await response.json();

            console.log('Web3Forms Response:', json);

            // Check successful submission
            if (response.ok && json.success === true) {

                showAlert(
                    'Thank you! Your message has been sent successfully.',
                    'success'
                );

                // Clear form
                contactForm.reset();

                // Hide success message after 5 seconds
                setTimeout(() => {

                    formAlert.classList.add('hidden');
                    formAlert.style.display = 'none';

                }, 5000);

            } else {

                showAlert(
                    json.message || 'Unable to send message. Please try again.',
                    'error'
                );

            }

        } catch (error) {

            // Network or response processing error
            console.error('Contact Form Error:', error);

            showAlert(
                'Connection error: ' + error.message,
                'error'
            );

        } finally {

            // Restore button
            button.disabled = false;
            button.innerText = 'Send Message';

        }

    });

}








document.addEventListener("DOMContentLoaded", function () {
    const footerYear = document.getElementById("f_year");
    if (footerYear) footerYear.textContent = new Date().getFullYear();
});




