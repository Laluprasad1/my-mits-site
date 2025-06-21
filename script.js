// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Navigation functionality
    initNavigation();
    
    // Scroll animations
    initScrollAnimations();
    
    // Counter animations
    initCounterAnimations();
    
    // Form handling
    initFormHandling();
    
    // Smooth scrolling
    initSmoothScrolling();
    
    // Mobile menu
    initMobileMenu();
    
    // Intersection observer for animations
    initIntersectionObserver();
    
    // Navbar scroll effect
    initNavbarScrollEffect();
});

// Navigation Functions
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    const mobileMenu = document.getElementById('mobile-menu');
                    if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                        mobileMenu.classList.add('hidden');
                    }
                }
            }
        });
    });
}

// Mobile Menu Toggle
function initMobileMenu() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            
            // Toggle icon
            const icon = this.querySelector('i');
            if (mobileMenu.classList.contains('hidden')) {
                icon.className = 'fas fa-bars text-xl';
            } else {
                icon.className = 'fas fa-times text-xl';
            }
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileMenuButton.contains(e.target) && !mobileMenu.contains(e.target)) {
                mobileMenu.classList.add('hidden');
                const icon = mobileMenuButton.querySelector('i');
                icon.className = 'fas fa-bars text-xl';
            }
        });
    }
}

// Navbar Scroll Effect
function initNavbarScrollEffect() {
    const navbar = document.getElementById('navbar');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add/remove scrolled class
        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Hide/show navbar on scroll
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
}

// Smooth Scrolling
function initSmoothScrolling() {
    // Already handled in navigation function
    // This function can be extended for additional smooth scrolling features
}

// Scroll Animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.scroll-reveal');
    
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(el => {
        animationObserver.observe(el);
    });
}

// Counter Animations
function initCounterAnimations() {
    const counters = document.querySelectorAll('.text-2xl, .text-3xl, .text-4xl');
    let hasAnimated = false;
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true;
                animateCounters();
            }
        });
    }, {
        threshold: 0.5
    });
    
    // Observe hero stats section
    const heroStats = document.querySelector('.hero-section .grid');
    if (heroStats) {
        counterObserver.observe(heroStats);
    }
}

function animateCounters() {
    const counters = document.querySelectorAll('.text-2xl, .text-3xl, .text-4xl');
    
    counters.forEach(counter => {
        const text = counter.textContent;
        const numberMatch = text.match(/\d+/);
        
        if (numberMatch) {
            const target = parseInt(numberMatch[0]);
            const suffix = text.replace(/\d+/, '');
            let current = 0;
            const increment = target / 50;
            const isHeroCounter = counter.closest('.hero-section');
            
            // Only animate if it's a numeric counter
            if (target > 0 && target < 10000) {
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        counter.textContent = target + suffix;
                        clearInterval(timer);
                    } else {
                        counter.textContent = Math.floor(current) + suffix;
                    }
                }, 40);
            }
        }
    });
}

// Intersection Observer for General Animations
function initIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add animation classes
                if (entry.target.classList.contains('feature-card')) {
                    entry.target.style.animationDelay = `${Math.random() * 0.5}s`;
                    entry.target.classList.add('animate-fade-in');
                }
                
                if (entry.target.classList.contains('university-card')) {
                    entry.target.style.animationDelay = `${Math.random() * 0.3}s`;
                    entry.target.classList.add('animate-fade-in');
                }
            }
        });
    }, observerOptions);
    
    // Observe feature cards
    document.querySelectorAll('.feature-card').forEach(card => {
        observer.observe(card);
    });
    
    // Observe university cards
    document.querySelectorAll('.university-card').forEach(card => {
        observer.observe(card);
    });
}

// Form Handling
function initFormHandling() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmission(this);
        });
    }
    
    // Form input animations
    const formInputs = document.querySelectorAll('.form-input');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
    });
}

function handleFormSubmission(form) {
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    // Show loading state
    submitButton.innerHTML = '<span class="loading"></span> Sending...';
    submitButton.disabled = true;
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        // Success state
        submitButton.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
        submitButton.classList.add('bg-green-600');
        
        // Reset form
        form.reset();
        
        // Reset button after 3 seconds
        setTimeout(() => {
            submitButton.textContent = originalText;
            submitButton.disabled = false;
            submitButton.classList.remove('bg-green-600');
        }, 3000);
        
        // Show success message
        showNotification('Message sent successfully!', 'success');
        
    }, 2000);
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-20 right-4 z-50 p-4 rounded-lg shadow-lg transition-all duration-300 transform translate-x-full`;
    
    // Set notification type styles
    switch (type) {
        case 'success':
            notification.classList.add('bg-green-500', 'text-white');
            break;
        case 'error':
            notification.classList.add('bg-red-500', 'text-white');
            break;
        case 'warning':
            notification.classList.add('bg-yellow-500', 'text-white');
            break;
        default:
            notification.classList.add('bg-blue-500', 'text-white');
    }
    
    notification.innerHTML = `
        <div class="flex items-center">
            <span>${message}</span>
            <button class="ml-4 text-white hover:text-gray-200" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.classList.add('translate-x-full');
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 300);
    }, 5000);
}

// Sidebar open/close
document.getElementById('openSidebar').onclick = () => {
  document.getElementById('sidebar').classList.remove('-translate-x-full');
};
document.getElementById('closeSidebar').onclick = () => {
  document.getElementById('sidebar').classList.add('-translate-x-full');
};

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    if (sidebar.classList.contains('-translate-x-full')) {
        sidebar.classList.remove('-translate-x-full');
    } else {
        sidebar.classList.add('-translate-x-full');
    }
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Performance optimizations
const debouncedResize = debounce(() => {
    // Handle resize events
    console.log('Window resized');
}, 250);

const throttledScroll = throttle(() => {
    // Handle scroll events that don't need debouncing
}, 16);

window.addEventListener('resize', debouncedResize);
window.addEventListener('scroll', throttledScroll);

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    // You could send error reports to a logging service here
});

// Page load performance
window.addEventListener('load', function() {
    // Hide loading spinner if any
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.display = 'none';
    }
    
    // Initialize performance monitoring
    if ('performance' in window) {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log('Page load time:', loadTime + 'ms');
    }
});

// Service Worker Registration (for PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(err) {
                console.log('ServiceWorker registration failed');
            });
    });
}

// Export functions for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initNavigation,
        handleFormSubmission,
        showNotification,
        debounce,
        throttle
    };
}

let lastScroll = 0;
const banner = document.getElementById('internship-banner');
window.addEventListener('scroll', () => {
  const curr = window.scrollY;
  if (curr > lastScroll && curr > 100) {
    banner.style.opacity = '0';
  } else {
    banner.style.opacity = '0.9';
  }
  lastScroll = curr;
});

function closeStickyBannerOrange() {
    const banner = document.getElementById('stickyBannerOrange');
    if (banner) banner.style.display = 'none';
}

function openInternshipModal() {
    alert('Open Internship Application Modal (implement modal or redirect)');
}

// Show/hide orange sticky banner on scroll
(function() {
    const banner = document.getElementById('stickyBannerOrange');
    let lastScroll = 0;
    if (banner) {
        window.addEventListener('scroll', function() {
            const curr = window.scrollY;
            if (curr > 100) {
                banner.style.opacity = '0';
                banner.style.pointerEvents = 'none';
            } else {
                banner.style.opacity = '1';
                banner.style.pointerEvents = 'auto';
            }
            lastScroll = curr;
        });
    }
})();

// filepath: c:\Users\Lalu prasad Aroori\OneDrive\Desktop\project1\index.html
function filterTutorials(level) {
    const cards = document.querySelectorAll('.tutorial-card');
    cards.forEach(card => {
        if (level === 'all' || card.getAttribute('data-difficulty') === level) {
            card.style.display = '';
        } else {
            card.style.display = 'none';
        }
    });

    // Update active button styles
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('bg-purple-600', 'text-white');
        btn.classList.add('bg-gray-200', 'text-gray-700');
    });
    if (level === 'all') {
        document.querySelector('.filter-btn[onclick*="all"]').classList.add('bg-purple-600', 'text-white');
        document.querySelector('.filter-btn[onclick*="all"]').classList.remove('bg-gray-200', 'text-gray-700');
    } else {
        document.querySelector(`.filter-btn[onclick*="${level}"]`).classList.add('bg-purple-600', 'text-white');
        document.querySelector(`.filter-btn[onclick*="${level}"]`).classList.remove('bg-gray-200', 'text-gray-700');
    }
}
