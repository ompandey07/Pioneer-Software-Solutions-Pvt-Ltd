// YouTube-style Top Progress Bar
        window.addEventListener('load', function() {
            const progressBar = document.getElementById('topProgressBar');
            const progressFill = document.getElementById('progressFill');
            
            if (!progressBar || !progressFill) return;
            
            let progress = 0;
            const duration = 1500;
            const steps = 50;
            const increment = 100 / steps;
            const stepTime = duration / steps;
            
            const progressInterval = setInterval(() => {
                progress += increment;
                
                if (progress >= 100) {
                    progress = 100;
                    progressFill.style.width = '100%';
                    
                    setTimeout(() => {
                        progressBar.style.opacity = '0';
                        progressBar.style.transition = 'opacity 0.3s ease';
                        setTimeout(() => {
                            progressBar.style.display = 'none';
                        }, 300);
                    }, 200);
                    
                    clearInterval(progressInterval);
                } else {
                    progressFill.style.width = progress + '%';
                }
            }, stepTime);
        });

        // Enhanced navbar scroll effect
        window.addEventListener('scroll', function() {
            const navbar = document.querySelector('.nav-enhanced');
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Mobile Menu Toggle
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const mobileMenu = document.getElementById('mobileMenu');

        if (mobileMenuBtn && mobileMenu) {
            mobileMenuBtn.addEventListener('click', function() {
                mobileMenuBtn.classList.toggle('active');
                mobileMenu.classList.toggle('active');
            });
        }

        // Enhanced Dropdown Menu
        const productsDropdown = document.getElementById('products-dropdown');
        const dropdownMenu = document.getElementById('dropdown-menu');
        const dropdownArrow = document.getElementById('dropdown-arrow');
        let isDropdownOpen = false;

        function toggleDropdown() {
            isDropdownOpen = !isDropdownOpen;
            if (isDropdownOpen) {
                dropdownMenu.classList.add('show');
                dropdownArrow.style.transform = 'rotate(180deg)';
            } else {
                dropdownMenu.classList.remove('show');
                dropdownArrow.style.transform = 'rotate(0deg)';
            }
        }

        if (productsDropdown) {
            productsDropdown.addEventListener('click', toggleDropdown);
        }

        // Close dropdown when clicking outside
        document.addEventListener('click', function(event) {
            if (productsDropdown && !productsDropdown.contains(event.target) && !dropdownMenu.contains(event.target)) {
                dropdownMenu.classList.remove('show');
                dropdownArrow.style.transform = 'rotate(0deg)';
                isDropdownOpen = false;
            }
        });

        // Intersection Observer for animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        }, observerOptions);

        // Initialize animations
        document.addEventListener('DOMContentLoaded', function() {
            const animationElements = document.querySelectorAll('.slide-in-bottom, .slide-in-left, .slide-in-right, .timeline-item');
            animationElements.forEach(el => observer.observe(el));
        });

        // Enhanced floating contact
        const contactTrigger = document.getElementById('contactTrigger');
        const contactPopup = document.getElementById('contactPopup');
        let isContactOpen = false;

        if (contactTrigger && contactPopup) {
            contactTrigger.addEventListener('click', function() {
                isContactOpen = !isContactOpen;
                if (isContactOpen) {
                    contactPopup.classList.add('active');
                } else {
                    contactPopup.classList.remove('active');
                }
            });

            // Close contact popup when clicking outside
            document.addEventListener('click', function(event) {
                if (!contactTrigger.contains(event.target) && !contactPopup.contains(event.target)) {
                    contactPopup.classList.remove('active');
                    isContactOpen = false;
                }
            });
        }

        // Services Tabs Functionality
        document.addEventListener('DOMContentLoaded', function() {
            const tabButtons = document.querySelectorAll('.service-tab-btn');
            const serviceTitle = document.getElementById('serviceTitle');
            const serviceDescription = document.getElementById('serviceDescription');
            const serviceFeatures = document.getElementById('serviceFeatures');
            const serviceLink = document.getElementById('serviceLink');
            const serviceImage = document.getElementById('serviceImage');

            // Service data
            const servicesData = {
                'tally-custom': {
                    title: 'Tally Customization',
                    description: 'Most business organizations fulfill their basic accounting automation with available accounting software, but customization takes it to the next level. We specialize in creating tailored solutions that perfectly fit your unique business processes.',
                    features: [
                        'Custom Reports & Analytics',
                        'Automated Data Entry',
                        'Integration with Third-party Systems',
                        'Custom User Interfaces',
                        'Advanced Security Features'
                    ],
                    link: 'tallycusto.html',
                    image: 'img/Products/customize.png',
                    alt: 'Tally Customization'
                },
                'web-dev': {
                    title: 'Web Development',
                    description: 'We create your web presence for your business. We develop static and dynamic websites for various industries using modern technologies, ensuring responsive design and optimal performance.',
                    features: [
                        'Responsive Web Design',
                        'E-commerce Solutions',
                        'Content Management Systems',
                        'Progressive Web Apps',
                        'API Development & Integration'
                    ],
                    link: 'webdev.html',
                    image: 'img/Products/webdev.webp',
                    alt: 'Web Development'
                },
                'tally-prime': {
                    title: 'Tally Prime',
                    description: 'Globally recognized and most popular accounting software in South Asia, widely used across different business verticals for complete accounting automation and business management.',
                    features: [
                        'Complete Business Management',
                        'VAT Compliance & Returns',
                        'Inventory Management',
                        'Multi-location Support',
                        'Banking & Reconciliation'
                    ],
                    link: 'tallyprime.html',
                    image: 'img/Products/Prime.png',
                    alt: 'Tally Prime'
                },
                'easybill': {
                    title: 'EasyBill',
                    description: 'EasyBill is a product especially designed for computerized billing. The software includes various features for billing and inventory management, making it perfect for small to medium businesses.',
                    features: [
                        'Quick Billing Solutions',
                        'Inventory Tracking',
                        'Customer Management',
                        'Sales Analytics',
                        'Multi-payment Support'
                    ],
                    link: 'easybill.html',
                    image: 'img/Products/EasyBill.png',
                    alt: 'EasyBill'
                },
                'reports': {
                    title: 'Customized Statutory Reports',
                    description: 'Various business requirements across different verticals need specialized reporting. While Tally Prime provides comprehensive reports, we create customized solutions for specific compliance needs.',
                    features: [
                        'Statutory Compliance Reports',
                        'Custom Financial Statements',
                        'Regulatory Submissions',
                        'Automated Report Generation',
                        'Multi-format Export Options'
                    ],
                    link: 'satreport.html',
                    image: 'img/Products/creport.png',
                    alt: 'Custom Reports'
                },
                'biz-analyst': {
                    title: 'Biz Analyst',
                    description: 'Biz Analyst is a mobile application that provides real-time information and allows you to access your TallyPrime data anytime, anywhere. Monitor your business performance on the go.',
                    features: [
                        'Real-time Business Analytics',
                        'Mobile Dashboard Access',
                        'Performance Monitoring',
                        'Instant Notifications',
                        'Offline Data Sync'
                    ],
                    link: 'biz.html',
                    image: 'img/Products/biz.png',
                    alt: 'Biz Analyst'
                }
            };

            // Update content function
            function updateServiceContent(serviceKey) {
                const service = servicesData[serviceKey];
                if (!service) return;

                // Update title
                serviceTitle.textContent = service.title;
                
                // Update description
                serviceDescription.textContent = service.description;
                
                // Update features
                serviceFeatures.innerHTML = '';
                service.features.forEach(feature => {
                    const li = document.createElement('li');
                    li.textContent = feature;
                    serviceFeatures.appendChild(li);
                });
                
                // Update link
                serviceLink.href = service.link;
                
                // Update image
                serviceImage.src = service.image;
                serviceImage.alt = service.alt;
            }

            // Tab click handlers
            tabButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const serviceKey = this.getAttribute('data-service');
                    
                    // Remove active class from all buttons
                    tabButtons.forEach(btn => btn.classList.remove('active'));
                    
                    // Add active class to clicked button
                    this.classList.add('active');
                    
                    // Update content
                    updateServiceContent(serviceKey);
                });
            });
        });

        // Call functionality
        function callNumber(number) {
            window.open(`tel:${number}`, '_self');
        }

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Close mobile menu when clicking on links
        document.querySelectorAll('.mobile-nav-item').forEach(item => {
            item.addEventListener('click', function() {
                if (this.getAttribute('href') && this.getAttribute('href') !== '#') {
                    if (mobileMenuBtn && mobileMenu) {
                        mobileMenuBtn.classList.remove('active');
                        mobileMenu.classList.remove('active');
                    }
                }
            });
        });

        // Performance monitoring
        if ('requestIdleCallback' in window) {
            requestIdleCallback(function() {
                console.log('Pioneer Software Solutions - Website Loaded Successfully');
            });
        }