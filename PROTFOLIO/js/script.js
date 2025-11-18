// ============================== NAVIGATION =============================
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-links button');
    const sections = document.querySelectorAll('section');

    function setActiveLink() {
        let index = sections.length;

        while (--index && window.scrollY + 50 < sections[index].offsetTop) {}

        navLinks.forEach((link) => link.parentElement.classList.remove('active'));
        navLinks[index].parentElement.classList.add('active');
    }

    setActiveLink();
    window.addEventListener('scroll', setActiveLink);

    navLinks.forEach((link, idx) => {
        link.addEventListener('click', () => {
            window.scrollTo({
                top: sections[idx].offsetTop,
                behavior: 'smooth'
            });
        });
    });
});

// ============================== MOBILE NAVIGATION =============================
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('open');
        });
    }

    const mobileNavLinks = document.querySelectorAll('.mobile-nav-links button');
    const sections = document.querySelectorAll('section');
    if (mobileNavLinks.length && sections.length) {
        mobileNavLinks.forEach((link, idx) => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('open');
                window.scrollTo({
                    top: sections[idx].offsetTop,
                    behavior: 'smooth'
                });
            });
        });
    }
});

function setActiveMobileLink() {
    let index = document.querySelectorAll('section').length;

    while (--index && window.scrollY + 50 < document.querySelectorAll('section')[index].offsetTop) {}

    document.querySelectorAll('.mobile-nav-links button').forEach((link) => link.parentElement.classList.remove('active'));
    document.querySelectorAll('.mobile-nav-links button')[index].parentElement.classList.add('active');
}

setActiveMobileLink();
window.addEventListener('scroll', setActiveMobileLink);

// ============================== SCROLL TO SECTIONS =============================
document.querySelector('.primary-btn').addEventListener('click', () => {
    document.querySelector('#projects').scrollIntoView({
        behavior: 'smooth'
    });
});

document.querySelector('.secondary-btn').addEventListener('click', () => {
    document.querySelector('#contact').scrollIntoView({
        behavior: 'smooth'
    });
});

document.getElementById('download-resume-btn').addEventListener('click', () => {
    const link = document.createElement('a');
    link.href = 'assets/MY RESUME.pdf';
    link.download = 'MY RESUME.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});

// ============================== view more buttons =============================
document.querySelector('.view-more-btn.projects').addEventListener('click', () => {
    window.open('https://github.com/devendra404/devendra404', '_blank');
});

// ============================= IMG PREVENTION =============================
document.addEventListener('contextmenu', (event) => {
    if (event.target.tagName === 'IMG') {
        event.preventDefault();
    }
});
document.addEventListener('mousedown', (event) => {
    if (event.target.tagName === 'IMG') {
        event.preventDefault();
    }
});

// ============================== DISABLE TEXT SELECTION =============================
document.addEventListener('selectstart', (event) => {
    event.preventDefault();
});

// ============================== CONTACT FORM =============================
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const submitBtn = document.getElementById('submit-btn');
    submitBtn.disabled = true;
    submitBtn.innerHTML = 'Sending...';

    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };

    emailjs.send('service_kybxgj8', 'template_kpgl36c', formData)
        .then(() => {
            submitBtn.innerHTML = 'Message Sent!';
            submitBtn.style.backgroundColor = '#4CAF50'; // Green for success
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = 'Send Message';
                submitBtn.style.backgroundColor = '';
                document.getElementById('contact-form').reset();
            }, 3000);
        }, (error) => {
            console.log('FAILED...', error);
            submitBtn.innerHTML = 'Failed to Send';
            submitBtn.style.backgroundColor = '#f44336'; // Red for error
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = 'Send Message';
                submitBtn.style.backgroundColor = '';
            }, 3000);
        });
});

