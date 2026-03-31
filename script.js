document.addEventListener('DOMContentLoaded', () => {
    
    // --- Hamburger Menu ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinkItems = document.querySelectorAll('.nav-link');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('nav-open');
            hamburger.classList.toggle('hamburger-open');
        });

        navLinkItems.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('nav-open');
                hamburger.classList.remove('hamburger-open');
            });
        });
    }

    // --- Input floating labels (Contact form fallback for edge cases) ---
    const formInputs = document.querySelectorAll('.input-group input, .input-group textarea');
    formInputs.forEach(input => {
        if(input.value.trim() !== '') {
            input.setAttribute('valid', 'true');
        }
    });

    // --- Pricing Scroll Fade-in (Intersection Observer) ---
    const pricingCards = document.querySelectorAll('.pricing-card');
    
    if ('IntersectionObserver' in window && pricingCards.length > 0) {
        const pricingObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('is-visible');
                    }, index * 150);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        pricingCards.forEach(card => pricingObserver.observe(card));
    } else {
        pricingCards.forEach(card => card.classList.add('is-visible'));
    }

    // --- Lightbox for Gallery ---
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (galleryItems.length > 0) {
        const lightboxHTML = `
            <div class="lightbox" id="lightbox">
                <button class="lightbox-close">&times;</button>
                <img src="" alt="Gallery Image Expanded">
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', lightboxHTML);

        const lightbox = document.getElementById('lightbox');
        const lightboxImg = lightbox.querySelector('img');
        const lightboxClose = lightbox.querySelector('.lightbox-close');

        galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                const imgSrc = item.querySelector('img').src;
                lightboxImg.src = imgSrc;
                lightbox.classList.add('active');
            });
        });

        const closeLightbox = () => {
            lightbox.classList.remove('active');
        };

        lightboxClose.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }
});
