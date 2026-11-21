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

// Contact Form Handling (Sends real emails via Formspree)
const contactForm = document.getElementById('contactForm');
const formAlert = document.getElementById('formAlert');

contactForm.addEventListener('submit', async function(e) {
    e.preventDefault(); // পেজ রিফ্রেশ হওয়া বন্ধ করবে
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // ভ্যালিডেশন চেক
    if(!name || !email || !message) {
        formAlert.textContent = "Please fill in all fields.";
        formAlert.className = "alert error";
        formAlert.classList.remove('hidden');
        return;
    }

    const formData = new FormData(contactForm);
    
    try {
        // ফর্মস্প্রিতে ডাটা পাঠাচ্ছে
        const response = await fetch(contactForm.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (response.ok) {
            // সফলভাবে মেইল চলে গেলে
            formAlert.textContent = "Thank you! Your message has been sent successfully.";
            formAlert.className = "alert success";
            formAlert.classList.remove('hidden');
            contactForm.reset(); // ইনপুট বক্স খালি করার জন্য
            
            // ৫ সেকেন্ড পর সাকসেস মেসেজটি অটোমেটিক গায়েব হয়ে যাবে
            setTimeout(() => {
                formAlert.classList.add('hidden');
            }, 5000);
        } else {
            // কোনো সার্ভার সমস্যা হলে
            formAlert.textContent = "Oops! Something went wrong. Please try again.";
            formAlert.className = "alert error";
            formAlert.classList.remove('hidden');
        }
    } catch (error) {
        // ইন্টারনেট কানেকশন না থাকলে
        formAlert.textContent = "Network error! Please check your internet connection.";
        formAlert.className = "alert error";
        formAlert.classList.remove('hidden');
    }
});

