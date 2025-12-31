// SpineDocs Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // ============================================
    // Mobile Navigation Toggle
    // ============================================
    const navToggle = document.getElementById('nav-toggle');
    const nav = document.getElementById('nav');

    if (navToggle && nav) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            nav.classList.toggle('active');
        });

        // Handle dropdown in mobile nav
        const dropdowns = nav.querySelectorAll('.nav-dropdown');
        dropdowns.forEach(function(dropdown) {
            const trigger = dropdown.querySelector('.dropdown-trigger');
            if (trigger) {
                trigger.addEventListener('click', function(e) {
                    if (window.innerWidth <= 900) {
                        e.preventDefault();
                        dropdown.classList.toggle('open');
                    }
                });
            }
        });

        // Close mobile nav when clicking a link (not dropdown trigger)
        nav.querySelectorAll('a:not(.dropdown-trigger)').forEach(function(link) {
            link.addEventListener('click', function() {
                navToggle.classList.remove('active');
                nav.classList.remove('active');
            });
        });
    }

    // Close mobile nav when clicking outside
    document.addEventListener('click', function(e) {
        if (nav && nav.classList.contains('active')) {
            if (!nav.contains(e.target) && !navToggle.contains(e.target)) {
                navToggle.classList.remove('active');
                nav.classList.remove('active');
            }
        }
    });

    // ============================================
    // Booking Modal
    // ============================================
    const modal = document.getElementById('bookingModal');
    const modalOverlay = document.getElementById('modalOverlay');
    const closeModal = document.getElementById('closeModal');
    const bookButtons = document.querySelectorAll('.btn-book');

    function openModal() {
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeModalFn() {
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    // Open modal on any .btn-book click
    bookButtons.forEach(function(btn) {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            openModal();
        });
    });

    // Close modal
    if (closeModal) {
        closeModal.addEventListener('click', closeModalFn);
    }
    if (modalOverlay) {
        modalOverlay.addEventListener('click', closeModalFn);
    }

    // Close modal on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
            closeModalFn();
        }
    });

    // ============================================
    // Smooth Scroll for Anchor Links
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const header = document.querySelector('.header');
                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ============================================
    // Header Shadow on Scroll
    // ============================================
    const header = document.querySelector('.header');

    if (header) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 50) {
                header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.boxShadow = '0 1px 2px rgba(0, 0, 0, 0.05)';
            }
        });
    }

    // ============================================
    // Handle Window Resize
    // ============================================
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            // Close mobile nav on resize to desktop
            if (window.innerWidth > 900 && nav) {
                nav.classList.remove('active');
                navToggle.classList.remove('active');
                // Reset dropdown states
                nav.querySelectorAll('.nav-dropdown.open').forEach(function(d) {
                    d.classList.remove('open');
                });
            }
        }, 250);
    });
});
