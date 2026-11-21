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

// Contact Form Handling (Sends real emails via Web3Forms)
const contactForm = document.getElementById('contactForm');
const formAlert = document.getElementById('formAlert');

contactForm.addEventListener('submit', async function(e) {
    e.preventDefault(); // পেজ রিফ্রেশ হওয়া বন্ধ করবে
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    const button = contactForm.querySelector('.btn');

    // ভ্যালিডেশন চেক
    if(!name || !email || !message) {
        formAlert.textContent = "Please fill in all fields.";
        formAlert.className = "alert error";
        formAlert.style.display = "block";
        formAlert.classList.remove('hidden');
        return;
    }

    // বাটন সাময়িকভাবে লোডিং মোডে নেওয়া
    button.disabled = true;
    button.innerText = "Sending...";

    const formData = new FormData(contactForm);
    
    try {
        // নতুন Web3Forms API-তে ডাটা পাঠানো হচ্ছে (হেডার ফিক্স করা হয়েছে)
        const response = await fetch(contactForm.action, {
            method: 'POST',
            body: formData
        });
        
        const json = await response.json();
        
        if (response.status === 200) {
            // সফলভাবে মেইল চলে গেলে
            formAlert.textContent = "Thank you! Your message has been sent successfully.";
            formAlert.className = "alert success";
            formAlert.style.display = "block";
            formAlert.classList.remove('hidden');
            contactForm.reset(); // ইনপুট বক্স খালি করার জন্য
            
            // ৫ সেকেন্ড পর সাকসেস মেসেজটি অটোমেটিক গায়েব হয়ে যাবে
            setTimeout(() => {
                formAlert.classList.add('hidden');
                formAlert.style.display = "none";
            }, 5000);
        } else {
            // সার্ভার থেকে কোনো ভুল রেসপন্স আসলে
            formAlert.textContent = json.message || "Oops! Something went wrong. Please try again.";
            formAlert.className = "alert error";
            formAlert.style.display = "block";
            formAlert.classList.remove('hidden');
        }
    } catch (error) {
        // আসল নেটওয়ার্ক এরর হলে
        formAlert.textContent = "Network error! Please check your internet connection.";
        formAlert.className = "alert error";
        formAlert.style.display = "block";
        formAlert.classList.remove('hidden');
    } finally {
        // কাজ শেষ হলে বাটন আবার স্বাভাবিক করা
        button.disabled = false;
        button.innerText = "Send Message";
    }
});


