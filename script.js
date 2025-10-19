// --- GOOGLE ANALYTICS RESUME TRACKING FUNCTION ---
/**
 * Monitors and tracks when the resume link is clicked, sending an event to Google Analytics.
 * @param {Event} event - The click event object.
 * @param {string} fileUrl - The URL of the resume file.
 */
function trackResumeDownload(event, fileUrl) {
    // Prevent the default link behavior immediately
    event.preventDefault(); 
    
    // 1. Send a custom event to Google Analytics (GA4)
    if (typeof gtag === 'function') {
        gtag('event', 'resume_download', {
            'event_category': 'Engagement',
            'event_label': 'SAURABH_RESUME_PDF',
            'value': 1
        });
    }

    // 2. Open the file after a short delay (300ms) 
    setTimeout(() => {
        window.open(fileUrl, '_blank');
    }, 300);
}


// --- 1. SMOOTH SCROLLING FOR NAVIGATION ---
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        // Check if the element exists before scrolling
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});


// --- 2. TYPEWRITER EFFECT IN HERO SECTION ---
const tagline = "Building intelligent and scalable web solutions with code and creativity.";
const textElement = document.getElementById('typewriter-text');

// Only run typewriter if the target element exists
if (textElement) {
    let i = 0;
    const cursorElement = document.querySelector('.cursor');

    function typeWriter() {
        if (i < tagline.length) {
            textElement.innerHTML += tagline.charAt(i);
            i++;
            setTimeout(typeWriter, 50); 
        } else if (cursorElement) {
            // Hide cursor when finished
            cursorElement.style.opacity = '0';
        }
    }
    // Make the function callable by the window.addEventListener below
    window.typeWriter = typeWriter; 
}


// --- 3. SCROLL-BASED FADE-IN ANIMATIONS (Intersection Observer) ---
function setupScrollAnimations() {
    const elementsToObserve = document.querySelectorAll('.animate-fade-in, .project-card, .timeline-item');
    
    if ('IntersectionObserver' in window && elementsToObserve.length > 0) {
        
        const observer = new IntersectionObserver((entries, observerInstance) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observerInstance.unobserve(entry.target);
                }
            });
        }, {
            rootMargin: '0px 0px -100px 0px', 
            threshold: 0.1
        });

        elementsToObserve.forEach(el => {
            el.classList.add('animate-fade-in'); 
            observer.observe(el);
        });
    }
}

// Start all animations once the page is fully loaded
window.addEventListener('load', () => {
    // Check if typeWriter was defined in section 2 before calling it
    if (typeof window.typeWriter === 'function') {
        window.typeWriter();
    }
    setupScrollAnimations();
});