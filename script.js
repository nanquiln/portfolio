// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Intersection Observer to reveal sections
const sections = document.querySelectorAll('section');

const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.2
};

const observer = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, options);

sections.forEach(section => {
    observer.observe(section);
});

// Get current year for footer
const yearElement = document.getElementById('year');
const currentYear = new Date().getFullYear();
yearElement.textContent = currentYear;

// Form submission
const form = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

form.addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(this);

    fetch(this.action, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            form.reset();
            formStatus.innerHTML = '<p>Thanks for your message! I will get back to you shortly.</p>';
        } else {
            formStatus.innerHTML = '<p>There was a problem submitting your form. Please try again.</p>';
        }
    })
    .catch(error => {
        formStatus.innerHTML = '<p>There was a problem with the submission. Please try again.</p>';
    });
});
