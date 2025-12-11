document.addEventListener('DOMContentLoaded', () => {
    // --- Animation Logic (Intersection Observer) ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-up');
    fadeElements.forEach(el => observer.observe(el));

    // --- Anti-Inspect / Security Logic ---

    // Disable Right Click
    document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        return false;
    });

    // Disable Keyboard Shortcuts
    document.addEventListener('keydown', (e) => {
        // F12
        if (e.key === 'F12') {
            e.preventDefault();
            return false;
        }

        // Ctrl + Shift + I (DevTools)
        if (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i')) {
            e.preventDefault();
            return false;
        }

        // Ctrl + Shift + J (Console)
        if (e.ctrlKey && e.shiftKey && (e.key === 'J' || e.key === 'j')) {
            e.preventDefault();
            return false;
        }

        // Ctrl + Shift + C (Inspect Element)
        if (e.ctrlKey && e.shiftKey && (e.key === 'C' || e.key === 'c')) {
            e.preventDefault();
            return false;
        }

        // Ctrl + U (View Source)
        if (e.ctrlKey && (e.key === 'U' || e.key === 'u')) {
            e.preventDefault();
            return false;
        }
    });

    // --- Additional UI Logic ---

    // Smooth Scroll for anchor links (if any)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // --- Webview Modal Logic ---
    const modal = document.getElementById('webviewModal');
    const openBtn = document.getElementById('openWebviewBtn');
    const closeBtn = document.getElementById('closeModalBtn');
    const iframe = document.getElementById('webviewIframe');
    const targetUrl = 'https://ugem2005.com/gaza/index.php';

    if (openBtn && modal && closeBtn) {
        openBtn.addEventListener('click', () => {
            modal.classList.add('active');
            // Only load content when opened to save bandwidth/speed
            if (!iframe.src) {
                iframe.src = targetUrl;
            }
        });

        closeBtn.addEventListener('click', () => {
            modal.classList.remove('active');
        });

        // Close on click outside content
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === "Escape" && modal.classList.contains('active')) {
                modal.classList.remove('active');
            }
        });
    }
});
