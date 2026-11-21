// Mobile Responsive Menu Toggle
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    // টগল আইকন পরিবর্তন (bars থেকে cross)
    const icon = mobileMenu.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
});

// Animate Skill Bars when Section is Visible (Intersection Observer)
const progressBars = document.querySelectorAll('.progress');
const aboutSection = document.getElementById('about');

const showProgress = () => {
    progressBars.forEach(bar => {
        const value = bar.getAttribute('data-progress');
        bar.style.width = value;
    });
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            showProgress();
        }
    });
}, { threshold: 0.3 });

observer.observe(aboutSection);

// Simple Contact Form Handling
const contactForm = document.getElementById('contactForm');
const formAlert = document.getElementById('formAlert');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    if(name && email && message) {
        // ফর্ম সফলভাবে সাবমিট দেখানোর মেসেজ
        formAlert.textContent = "Thank you! Your message has been sent successfully.";
        formAlert.className = "alert success";
        contactForm.reset();
    } else {
        formAlert.textContent = "Please fill in all fields.";
        formAlert.className = "alert error";
    }
});
