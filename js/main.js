/**
 * RentEase - Non-profit Real Estate Rental Website
 * Main JavaScript File
 */

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainMenu = document.querySelector('.main-menu');
    
    if (mobileMenuToggle && mainMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            mainMenu.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (mainMenu && mainMenu.classList.contains('active')) {
            if (!event.target.closest('nav')) {
                mainMenu.classList.remove('active');
                if (mobileMenuToggle) {
                    mobileMenuToggle.classList.remove('active');
                }
            }
        }
    });
    
    // Back to Top Button
    const backToTopButton = document.querySelector('.back-to-top');
    
    if (backToTopButton) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });
        
        backToTopButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Testimonial Slider
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (testimonialCards.length > 0 && prevBtn && nextBtn) {
        let currentIndex = 0;
        
        // Hide all testimonials except the first one
        testimonialCards.forEach((card, index) => {
            if (index !== 0) {
                card.style.display = 'none';
            }
        });
        
        // Function to show testimonial at specific index
        function showTestimonial(index) {
            testimonialCards.forEach(card => {
                card.style.display = 'none';
            });
            testimonialCards[index].style.display = 'block';
        }
        
        // Event listeners for navigation buttons
        nextBtn.addEventListener('click', function() {
            currentIndex = (currentIndex + 1) % testimonialCards.length;
            showTestimonial(currentIndex);
        });
        
        prevBtn.addEventListener('click', function() {
            currentIndex = (currentIndex - 1 + testimonialCards.length) % testimonialCards.length;
            showTestimonial(currentIndex);
        });
        
        // Auto-rotate testimonials every 5 seconds
        setInterval(function() {
            currentIndex = (currentIndex + 1) % testimonialCards.length;
            showTestimonial(currentIndex);
        }, 5000);
    }
    
    // Property Search Form
    const searchForm = document.getElementById('search-form');
    
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // In a real application, you would collect form data and redirect to search results
            // For this static demo, we'll just redirect to the properties page
            window.location.href = 'properties.html';
        });
    }
    
    // Newsletter Form
    const newsletterForm = document.getElementById('newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (email) {
                // In a real application, you would send this to a server
                // For this static demo, we'll just show a success message
                
                // Create success message
                const successMessage = document.createElement('p');
                successMessage.textContent = 'Thank you for subscribing to our newsletter!';
                successMessage.style.color = 'var(--success-color)';
                successMessage.style.marginTop = '10px';
                
                // Replace form with success message
                newsletterForm.innerHTML = '';
                newsletterForm.appendChild(successMessage);
            }
        });
    }
    
    // Property Image Lazy Loading
    const propertyImages = document.querySelectorAll('.property-image img');
    
    if ('IntersectionObserver' in window && propertyImages.length > 0) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.getAttribute('data-src');
                    
                    if (src) {
                        img.src = src;
                        img.removeAttribute('data-src');
                    }
                    
                    observer.unobserve(img);
                }
            });
        });
        
        propertyImages.forEach(img => {
            // Only observe images with data-src attribute
            if (img.hasAttribute('data-src')) {
                imageObserver.observe(img);
            }
        });
    }
    
    // Animate elements on scroll
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    if ('IntersectionObserver' in window && animatedElements.length > 0) {
        const animationObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });
        
        animatedElements.forEach(element => {
            animationObserver.observe(element);
        });
    }
    
    // Add current year to copyright in footer
    const copyrightYear = document.querySelector('.footer-bottom p');
    
    if (copyrightYear) {
        const currentYear = new Date().getFullYear();
        copyrightYear.innerHTML = copyrightYear.innerHTML.replace('2023', currentYear);
    }
}); 