   // Mobile Menu Toggle
        const mobileToggle = document.getElementById('mobile-toggle');
        const navMenu = document.getElementById('nav-menu');

        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = mobileToggle.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        });

        // Close mobile menu when clicking on a link
        navMenu.addEventListener('click', (e) => {
            if (e.target.tagName === 'A') {
                navMenu.classList.remove('active');
                const icon = mobileToggle.querySelector('i');
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-times');
            }
        });

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

        // Header background change on scroll
        window.addEventListener('scroll', () => {
            const header = document.querySelector('.header');
            if (window.scrollY > 100) {
                header.style.background = 'linear-gradient(135deg, rgba(44,85,48,0.95) 0%, rgba(74,124,89,0.95) 100%)';
                header.style.backdropFilter = 'blur(15px)';
            } else {
                header.style.background = 'linear-gradient(135deg, #2c5530 0%, #4a7c59 100%)';
                header.style.backdropFilter = 'blur(10px)';
            }
        });

        // Cart functionality
        let cart = [];

        function addToCart(productName, price) {
            cart.push({ name: productName, price: price });
            showCartNotification();
            console.log(`Added ${productName} (₱${price}) to cart. Cart now has ${cart.length} items.`);
        }

        function showCartNotification() {
            const notification = document.getElementById('cart-notification');
            notification.classList.add('show');
            setTimeout(() => {
                notification.classList.remove('show');
            }, 3000);
        }

        // Contact form submission
        document.getElementById('contact-form').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const phone = formData.get('phone');
            const message = formData.get('message');
            
            // Simulate form submission
            const submitBtn = document.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                alert('Thank you for your message! We will get back to you soon.');
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });

        // Animate elements on scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe all product cards and contact items
        document.querySelectorAll('.product-card, .contact-item, .feature').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.6s ease';
            observer.observe(el);
        });

        // Loading screen
        window.addEventListener('load', () => {
            const loading = document.getElementById('loading');
            setTimeout(() => {
                loading.style.opacity = '0';
                loading.style.visibility = 'hidden';
            }, 1000);
        });

        // Add floating rice particles effect
        function createRiceParticle() {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: fixed;
                width: 4px;
                height: 6px;
                background: rgba(255, 215, 0, 0.6);
                border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
                pointer-events: none;
                z-index: 1;
                left: ${Math.random() * 100}vw;
                top: -10px;
                animation: float-down ${3 + Math.random() * 4}s linear infinite;
            `;
            document.body.appendChild(particle);

            // Remove particle after animation
            setTimeout(() => {
                if (document.body.contains(particle)) {
                    document.body.removeChild(particle);
                }
            }, 7000);
        }

        // Add CSS for floating particles
        const style = document.createElement('style');
        style.textContent = `
            @keyframes float-down {
                to {
                    transform: translateY(100vh) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);

        // Create particles periodically
        setInterval(createRiceParticle, 3000);

        // Add search functionality
        function initializeSearch() {
            const searchContainer = document.createElement('div');
            searchContainer.innerHTML = `
                <div style="
                    position: fixed;
                    top: 80px;
                    right: 20px;
                    z-index: 1000;
                    display: none;
                " id="search-container">
                    <input type="text" 
                           id="search-input" 
                           placeholder="Search products..."
                           style="
                               padding: 10px 15px;
                               border: none;
                               border-radius: 25px;
                               background: rgba(255,255,255,0.9);
                               backdrop-filter: blur(10px);
                               box-shadow: 0 5px 20px rgba(0,0,0,0.1);
                               width: 250px;
                               outline: none;
                           ">
                </div>
            `;
            document.body.appendChild(searchContainer);

            // Add search icon to header
            const searchIcon = document.createElement('button');
            searchIcon.innerHTML = '<i class="fas fa-search"></i>';
            searchIcon.style.cssText = `
                background: none;
                border: none;
                color: white;
                font-size: 1.2rem;
                cursor: pointer;
                margin-left: 1rem;
                padding: 8px;
                border-radius: 50%;
                transition: all 0.3s ease;
            `;
            searchIcon.onmouseover = () => searchIcon.style.background = 'rgba(255,255,255,0.1)';
            searchIcon.onmouseout = () => searchIcon.style.background = 'none';

            const navContainer = document.querySelector('.nav-container');
            navContainer.appendChild(searchIcon);

            // Toggle search
            searchIcon.addEventListener('click', () => {
                const searchContainer = document.getElementById('search-container');
                const isVisible = searchContainer.style.display !== 'none';
                searchContainer.style.display = isVisible ? 'none' : 'block';
                if (!isVisible) {
                    document.getElementById('search-input').focus();
                }
            });

            // Search functionality
            document.getElementById('search-input').addEventListener('input', (e) => {
                const searchTerm = e.target.value.toLowerCase();
                const productCards = document.querySelectorAll('.product-card');
                
                productCards.forEach(card => {
                    const productName = card.querySelector('h3').textContent.toLowerCase();
                    const productDesc = card.querySelector('p').textContent.toLowerCase();
                    
                    if (productName.includes(searchTerm) || productDesc.includes(searchTerm)) {
                        card.style.display = 'block';
                        card.style.animation = 'fadeInUp 0.5s ease-out';
                    } else {
                        card.style.display = searchTerm ? 'none' : 'block';
                    }
                });
            });
        }

        // Initialize search when page loads
        document.addEventListener('DOMContentLoaded', initializeSearch);

        // Add cart counter
        function updateCartCounter() {
            let cartCounter = document.getElementById('cart-counter');
            if (!cartCounter) {
                cartCounter = document.createElement('div');
                cartCounter.id = 'cart-counter';
                cartCounter.style.cssText = `
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: linear-gradient(45deg, #ff6b35, #f7931e);
                    color: white;
                    border-radius: 50%;
                    width: 40px;
                    height: 40px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: bold;
                    font-size: 0.9rem;
                    z-index: 1002;
                    box-shadow: 0 5px 15px rgba(255,107,53,0.3);
                    cursor: pointer;
                    transition: all 0.3s ease;
                    display: none;
                `;
                document.body.appendChild(cartCounter);

                cartCounter.addEventListener('click', () => {
                    const cartItems = cart.map(item => `${item.name} - ₱${item.price}`).join('\n');
                    const total = cart.reduce((sum, item) => sum + item.price, 0);
                    alert(`Cart Items:\n${cartItems}\n\nTotal: ₱${total}\n\nNote: This is a demo. Contact us to complete your order!`);
                });
            }

            if (cart.length > 0) {
                cartCounter.textContent = cart.length;
                cartCounter.style.display = 'flex';
                cartCounter.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    cartCounter.style.transform = 'scale(1)';
                }, 200);
            } else {
                cartCounter.style.display = 'none';
            }
        }

        // Update addToCart function
        const originalAddToCart = addToCart;
        addToCart = function(productName, price) {
            originalAddToCart(productName, price);
            updateCartCounter();
        };

        // Add testimonials section data (for future enhancement)
        const testimonials = [
            {
                name: "Maria Santos",
                location: "Cebu City",
                rating: 5,
                comment: "Best rice quality in the city! My family loves the jasmine rice."
            },
            {
                name: "Juan Dela Cruz",
                location: "Manila",
                rating: 5,
                comment: "Fast delivery and excellent customer service. Highly recommended!"
            },
            {
                name: "Ana Rodriguez",
                location: "Davao",
                rating: 5,
                comment: "Fresh, affordable, and always consistent quality. Been buying for 2 years now."
            }
        ];

        // Add newsletter subscription
        function initializeNewsletter() {
            const newsletterSection = document.createElement('section');
            newsletterSection.style.cssText = `
                background: linear-gradient(135deg, #f8f9fa, #e9ecef);
                padding: 3rem 2rem;
                text-align: center;
            `;
            
            newsletterSection.innerHTML = `
                <div class="container">
                    <h3 style="font-size: 2rem; margin-bottom: 1rem; color: #2c5530;">Stay Updated</h3>
                    <p style="font-size: 1.1rem; color: #666; margin-bottom: 2rem; max-width: 600px; margin-left: auto; margin-right: auto;">
                        Subscribe to our newsletter for the latest rice varieties, special offers, and farming updates.
                    </p>
                    <div style="display: flex; justify-content: center; gap: 1rem; max-width: 500px; margin: 0 auto; flex-wrap: wrap;">
                        <input type="email" 
                               id="newsletter-email" 
                               placeholder="Enter your email address"
                               style="
                                   flex: 1;
                                   min-width: 250px;
                                   padding: 12px 20px;
                                   border: 2px solid #ddd;
                                   border-radius: 25px;
                                   outline: none;
                                   transition: border-color 0.3s ease;
                               ">
                        <button onclick="subscribeNewsletter()" 
                                style="
                                    background: linear-gradient(45deg, #4a7c59, #2c5530);
                                    color: white;
                                    border: none;
                                    padding: 12px 30px;
                                    border-radius: 25px;
                                    cursor: pointer;
                                    font-weight: bold;
                                    transition: all 0.3s ease;
                                    white-space: nowrap;
                                ">Subscribe</button>
                    </div>
                </div>
            `;

            // Insert before footer
            const footer = document.querySelector('.footer');
            footer.parentNode.insertBefore(newsletterSection, footer);

            // Add focus effect
            const emailInput = newsletterSection.querySelector('#newsletter-email');
            emailInput.addEventListener('focus', () => {
                emailInput.style.borderColor = '#4a7c59';
                emailInput.style.boxShadow = '0 0 10px rgba(74,124,89,0.2)';
            });
            emailInput.addEventListener('blur', () => {
                emailInput.style.borderColor = '#ddd';
                emailInput.style.boxShadow = 'none';
            });
        }

        function subscribeNewsletter() {
            const email = document.getElementById('newsletter-email').value;
            if (email && email.includes('@')) {
                alert('Thank you for subscribing! You will receive updates about our latest products and offers.');
                document.getElementById('newsletter-email').value = '';
            } else {
                alert('Please enter a valid email address.');
            }
        }

        // Initialize newsletter section
        document.addEventListener('DOMContentLoaded', initializeNewsletter);

        // Add WhatsApp floating button
        function addWhatsAppButton() {
            const whatsappBtn = document.createElement('a');
            whatsappBtn.href = 'https://wa.me/639171234567?text=Hello! I would like to inquire about your rice products.';
            whatsappBtn.target = '_blank';
            whatsappBtn.innerHTML = '<i class="fab fa-whatsapp"></i>';
            whatsappBtn.style.cssText = `
                position: fixed;
                bottom: 20px;
                left: 20px;
                background: #25d366;
                color: white;
                width: 60px;
                height: 60px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1.5rem;
                z-index: 1000;
                box-shadow: 0 5px 20px rgba(37,211,102,0.3);
                transition: all 0.3s ease;
                text-decoration: none;
                animation: pulse 2s infinite;
            `;

            whatsappBtn.addEventListener('mouseenter', () => {
                whatsappBtn.style.transform = 'scale(1.1)';
                whatsappBtn.style.boxShadow = '0 8px 25px rgba(37,211,102,0.4)';
            });

            whatsappBtn.addEventListener('mouseleave', () => {
                whatsappBtn.style.transform = 'scale(1)';
                whatsappBtn.style.boxShadow = '0 5px 20px rgba(37,211,102,0.3)';
            });

            document.body.appendChild(whatsappBtn);

            // Add pulse animation
            const pulseStyle = document.createElement('style');
            pulseStyle.textContent = `
                @keyframes pulse {
                    0% { box-shadow: 0 0 0 0 rgba(37,211,102,0.7); }
                    70% { box-shadow: 0 0 0 10px rgba(37,211,102,0); }
                    100% { box-shadow: 0 0 0 0 rgba(37,211,102,0); }
                }
            `;
            document.head.appendChild(pulseStyle);
        }

        // Initialize WhatsApp button
        document.addEventListener('DOMContentLoaded', addWhatsAppButton);

        // Performance optimization - Lazy loading for images
        document.addEventListener('DOMContentLoaded', () => {
            // Add loading states
            const productCards = document.querySelectorAll('.product-card');
            productCards.forEach((card, index) => {
                card.style.animationDelay = `${index * 0.1}s`;
            });
        });

        console.log('BUGAS Rice Store website loaded successfully! 🌾');