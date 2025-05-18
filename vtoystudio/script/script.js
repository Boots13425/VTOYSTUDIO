document.addEventListener('DOMContentLoaded', function() {

    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentSlide = 0;
    let slideInterval;


    function initSlider() {
        slides[0].style.opacity = 1;
        dots[0].classList.add('active');
        
        startSlideInterval();
    }

  
    function showSlide(index) {
        slides.forEach(slide => {
            slide.style.opacity = 0;
            slide.style.zIndex = 1;
        });
        
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        slides[index].style.opacity = 1;
        slides[index].style.zIndex = 2;
        
        dots[index].classList.add('active');
        
        currentSlide = index;
    }

    function nextSlide() {
        let index = currentSlide + 1;
        if (index >= slides.length) {
            index = 0;
        }
        showSlide(index);
    }

    // Previous slide function
    function prevSlide() {
        let index = currentSlide - 1;
        if (index < 0) {
            index = slides.length - 1;
        }
        showSlide(index);
    }

    function startSlideInterval() {
        slideInterval = setInterval(nextSlide, 5000);
    }

    function resetSlideInterval() {
        clearInterval(slideInterval);
        startSlideInterval();
    }

    prevBtn.addEventListener('click', function() {
        prevSlide();
        resetSlideInterval();
    });

    nextBtn.addEventListener('click', function() {
        nextSlide();
        resetSlideInterval();
    });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            showSlide(index);
            resetSlideInterval();
        });
    });

    // Touch swipe functionality for slider
    const sliderWrapper = document.querySelector('.slider-wrapper');
    let touchStartX = 0;
    let touchEndX = 0;

    sliderWrapper.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    }, false);

    sliderWrapper.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);

    function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
            nextSlide();
            resetSlideInterval();
        }
        
        if (touchEndX > touchStartX + 50) {
            prevSlide();
            resetSlideInterval();
        }
    }

    // Mobile menu functionality
    const navBar = document.querySelector('.nav');
    const mobileMenu = document.createElement('div');
    mobileMenu.className = 'mobile-menu';
    
    // Create mobile menu content
    mobileMenu.innerHTML = `
        <a href="index.html"><img src="/images/header-logo.png" alt="Vtoystore logo"></a>
        <a href="index.html">HOME</a>
        <a href="#brand">BRAND</a>
        <a href="#product">PRODUCT</a>
        <a href="#news">NEWS</a>
        <a href="#artist">ARTIST</a>
        <a href="#">My Account</a>
        <a href="#">Cart (0)</a>
    `;
    
    document.body.appendChild(mobileMenu);
    
    // Create overlay if it doesn't exist
    let overlay = document.querySelector('.overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'overlay';
        document.body.appendChild(overlay);
    }
    
    // Function to close mobile menu
    function closeMobileMenu() {
        mobileMenu.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Toggle mobile menu
    navBar.addEventListener('click', function(e) {
        if (e.target.closest('.nav::before') || window.innerWidth <= 768 && e.target === this) {
            mobileMenu.classList.add('active');
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    });
    
    // Close mobile menu when clicking overlay
    overlay.addEventListener('click', function() {
        closeMobileMenu();
    });
    
    // Close mobile menu when clicking a link inside it
    const mobileMenuLinks = mobileMenu.querySelectorAll('a');
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', function() {
            closeMobileMenu();
        });
    });
    
    // Close mobile menu when clicking outside of it
    document.addEventListener('click', function(e) {
        // Check if mobile menu is active and the click is outside the menu and not on the navbar
        if (mobileMenu.classList.contains('active') && 
            !mobileMenu.contains(e.target) && 
            !navBar.contains(e.target)) {
            closeMobileMenu();
        }
    });
    
    // Create a hamburger menu icon for mobile
    const hamburgerIcon = document.createElement('div');
    hamburgerIcon.className = 'hamburger-icon';
    hamburgerIcon.innerHTML = `
        <span></span>
        <span></span>
        <span></span>
    `;
    
    // Add hamburger icon to navbar for mobile view
    if (window.innerWidth <= 768) {
        navBar.prepend(hamburgerIcon);
    }
    
    // Toggle mobile menu when hamburger icon is clicked
    hamburgerIcon.addEventListener('click', function(e) {
        e.stopPropagation(); // Prevent event from bubbling to navBar
        mobileMenu.classList.toggle('active');
        overlay.classList.toggle('active');
        
        if (mobileMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });
    
    // Update hamburger icon visibility on window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth <= 768) {
            if (!navBar.contains(hamburgerIcon)) {
                navBar.prepend(hamburgerIcon);
            }
        } else {
            if (navBar.contains(hamburgerIcon)) {
                navBar.removeChild(hamburgerIcon);
            }
            // Close mobile menu if window is resized to desktop
            closeMobileMenu();
        }
    });
    
    initSlider();
});