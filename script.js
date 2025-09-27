
// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // Smooth scrolling for hero scroll button
    const heroScroll = document.querySelector('.hero-scroll');
    if (heroScroll) {
        heroScroll.addEventListener('click', function() {
            const featuresSection = document.querySelector('.features');
            if (featuresSection) {
                featuresSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // 360° Viewer Modal
    const viewerModal = document.getElementById('viewer-modal');
    const viewerBtns = document.querySelectorAll('#360-viewer-btn, .action-btn[title="360° View"]');
    const closeBtn = viewerModal?.querySelector('.close');
    const tile3D = document.getElementById('tile-3d');
    const viewerControls = document.querySelectorAll('.viewer-btn');

    // Tile textures
    const tileTextures = {
        marble: 'linear-gradient(135deg, #bdc3c7, #2c3e50)',
        ceramic: 'linear-gradient(135deg, #3498db, #2980b9)',
        mosaic: 'linear-gradient(135deg, #f39c12, #e67e22)',
        digital: 'linear-gradient(135deg, #9b59b6, #8e44ad)'
    };

    // Open 360° viewer
    viewerBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            if (viewerModal) {
                viewerModal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Close modal
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            viewerModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }

    // Close modal when clicking outside
    if (viewerModal) {
        viewerModal.addEventListener('click', function(e) {
            if (e.target === viewerModal) {
                viewerModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Change tile texture
    viewerControls.forEach(btn => {
        btn.addEventListener('click', function() {
            const tileType = this.dataset.tile;
            const texture = tileTextures[tileType];
            
            // Remove active class from all buttons
            viewerControls.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            // Update tile faces
            if (tile3D && texture) {
                const faces = tile3D.querySelectorAll('.tile-face');
                faces.forEach(face => {
                    face.style.background = texture;
                });
            }
        });
    });

    // 3D Tile Interaction
    if (tile3D) {
        let isDragging = false;
        let previousMousePosition = { x: 0, y: 0 };
        let rotation = { x: -15, y: 0 };

        tile3D.addEventListener('mousedown', function(e) {
            isDragging = true;
            previousMousePosition = { x: e.clientX, y: e.clientY };
            tile3D.style.animation = 'none';
        });

        document.addEventListener('mousemove', function(e) {
            if (isDragging) {
                const deltaMove = {
                    x: e.clientX - previousMousePosition.x,
                    y: e.clientY - previousMousePosition.y
                };

                rotation.y += deltaMove.x * 0.5;
                rotation.x -= deltaMove.y * 0.5;

                tile3D.style.transform = `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`;

                previousMousePosition = { x: e.clientX, y: e.clientY };
            }
        });

        document.addEventListener('mouseup', function() {
            isDragging = false;
        });

        // Mouse wheel zoom
        tile3D.addEventListener('wheel', function(e) {
            e.preventDefault();
            const scale = e.deltaY > 0 ? 0.9 : 1.1;
            const currentTransform = tile3D.style.transform;
            const scaleMatch = currentTransform.match(/scale\(([^)]+)\)/);
            const currentScale = scaleMatch ? parseFloat(scaleMatch[1]) : 1;
            const newScale = Math.max(0.5, Math.min(2, currentScale * scale));
            
            tile3D.style.transform = `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale(${newScale})`;
        });
    }

    // Category Cards Click Effect
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            const category = this.dataset.category;
            // Redirect to products page with filter
            window.location.href = `products.html?category=${category}`;
        });
    });

    // Product Cards Hover Effects
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        const actions = card.querySelector('.product-actions');
        
        card.addEventListener('mouseenter', function() {
            if (actions) {
                actions.style.opacity = '1';
            }
        });

        card.addEventListener('mouseleave', function() {
            if (actions) {
                actions.style.opacity = '0';
            }
        });
    });

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', function() {
                const isActive = item.classList.contains('active');
                
                // Close all FAQ items
                faqItems.forEach(faq => faq.classList.remove('active'));
                
                // Open clicked item if it wasn't active
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        }
    });

    // Products Page Functionality
    if (window.location.pathname.includes('products.html')) {
        initializeProductsPage();
    }

    // Contact Form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            const requiredFields = contactForm.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = '#e74c3c';
                } else {
                    field.style.borderColor = '#ddd';
                }
            });

            if (isValid) {
                // Simulate form submission
                showNotification('Message sent successfully! We\'ll get back to you soon.');
                contactForm.reset();
            } else {
                showNotification('Please fill in all required fields.', 'error');
            }
        });
    }

    // Virtual Tour Button
    const virtualTourBtn = document.getElementById('virtual-tour-btn');
    if (virtualTourBtn) {
        virtualTourBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showNotification('Virtual tour feature coming soon!');
        });
    }

    // Scroll Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    const animatedElements = document.querySelectorAll('.feature-card, .category-card, .product-card, .team-member, .value-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Products Page Functionality
function initializeProductsPage() {
    // Sample product data
    const products = [
        {
            id: 1,
            name: 'Carrara Marble Elite',
            category: 'marble',
            size: '60x60',
            price: 45.99,
            rating: 5,
            reviews: 124,
            material: 'Natural Marble',
            finish: 'Polished',
            application: 'Indoor',
            image: 'marble-1.jpg',
            featured: true
        },
        {
            id: 2,
            name: 'Urban Ceramic Pro',
            category: 'ceramic',
            size: '30x60',
            price: 28.99,
            rating: 4,
            reviews: 89,
            material: 'Ceramic',
            finish: 'Matt',
            application: 'Indoor/Outdoor',
            image: 'ceramic-1.jpg',
            sale: true
        },
        {
            id: 3,
            name: 'Vitrified Supreme',
            category: 'vitrified',
            size: '80x80',
            price: 52.99,
            rating: 5,
            reviews: 156,
            material: 'Vitrified Porcelain',
            finish: 'Glossy',
            application: 'Heavy Traffic',
            image: 'vitrified-1.jpg'
        },
        {
            id: 4,
            name: 'Mosaic Artisan',
            category: 'mosaic',
            size: '30x30',
            price: 35.99,
            rating: 4,
            reviews: 78,
            material: 'Glass Mosaic',
            finish: 'Textured',
            application: 'Decorative',
            image: 'mosaic-1.jpg'
        },
        {
            id: 5,
            name: 'Digital Wood Look',
            category: 'digital',
            size: '20x120',
            price: 42.99,
            rating: 5,
            reviews: 203,
            material: 'Digital Print Ceramic',
            finish: 'Natural',
            application: 'Indoor',
            image: 'digital-1.jpg'
        },
        {
            id: 6,
            name: 'Outdoor Stone Grip',
            category: 'outdoor',
            size: '60x60',
            price: 38.99,
            rating: 4,
            reviews: 94,
            material: 'Anti-slip Ceramic',
            finish: 'Rough',
            application: 'Outdoor',
            image: 'outdoor-1.jpg'
        }
    ];

    let filteredProducts = [...products];
    let currentPage = 1;
    const productsPerPage = 6;

    // Initialize filters
    const categoryFilters = document.querySelectorAll('[data-filter]');
    const sizeFilters = document.querySelectorAll('[data-size]');
    const priceSlider = document.getElementById('priceRange');
    const priceValue = document.getElementById('priceValue');
    const searchInput = document.getElementById('searchInput');
    const sortSelect = document.getElementById('sortSelect');

    // Price slider
    if (priceSlider && priceValue) {
        priceSlider.addEventListener('input', function() {
            priceValue.textContent = this.value;
            filterProducts();
        });
    }

    // Category filters
    categoryFilters.forEach(filter => {
        filter.addEventListener('change', filterProducts);
    });

    // Size filters
    sizeFilters.forEach(filter => {
        filter.addEventListener('change', filterProducts);
    });

    // Search input
    if (searchInput) {
        searchInput.addEventListener('input', filterProducts);
    }

    // Sort select
    if (sortSelect) {
        sortSelect.addEventListener('change', filterProducts);
    }

    // Filter products function
    function filterProducts() {
        filteredProducts = products.filter(product => {
            // Category filter
            const selectedCategories = Array.from(document.querySelectorAll('[data-filter]:checked')).map(cb => cb.dataset.filter);
            if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) {
                return false;
            }

            // Size filter
            const selectedSizes = Array.from(document.querySelectorAll('[data-size]:checked')).map(cb => cb.dataset.size);
            if (selectedSizes.length > 0 && !selectedSizes.includes(product.size)) {
                return false;
            }

            // Price filter
            const maxPrice = priceSlider ? parseInt(priceSlider.value) : 100;
            if (product.price > maxPrice) {
                return false;
            }

            // Search filter
            const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
            if (searchTerm && !product.name.toLowerCase().includes(searchTerm)) {
                return false;
            }

            return true;
        });

        // Sort products
        const sortValue = sortSelect ? sortSelect.value : 'popular';
        switch (sortValue) {
            case 'price-low':
                filteredProducts.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                filteredProducts.sort((a, b) => b.price - a.price);
                break;
            case 'newest':
                filteredProducts.sort((a, b) => b.id - a.id);
                break;
            default:
                filteredProducts.sort((a, b) => b.reviews - a.reviews);
        }

        currentPage = 1;
        renderProducts();
        renderPagination();
    }

    // Render products
    function renderProducts() {
        const productsGrid = document.getElementById('productsGrid');
        if (!productsGrid) return;

        const startIndex = (currentPage - 1) * productsPerPage;
        const endIndex = startIndex + productsPerPage;
        const pageProducts = filteredProducts.slice(startIndex, endIndex);

        productsGrid.innerHTML = pageProducts.map(product => `
            <div class="product-card" data-product-id="${product.id}">
                <div class="product-image ${product.category}-product">
                    ${product.featured ? '<div class="product-badge">New</div>' : ''}
                    ${product.sale ? '<div class="product-badge sale">Sale</div>' : ''}
                    <div class="product-actions">
                        <button class="action-btn" title="360° View"><i class="fas fa-sync-alt"></i></button>
                        <button class="action-btn quick-view-btn" title="Quick View"><i class="fas fa-eye"></i></button>
                        <button class="action-btn" title="Add to Favorites"><i class="fas fa-heart"></i></button>
                    </div>
                </div>
                <div class="product-content">
                    <h3>${product.name}</h3>
                    <p class="product-size">${product.size} cm</p>
                    <div class="product-price">$${product.price}/sq ft</div>
                    <div class="product-rating">
                        ${generateStars(product.rating)}
                        <span>(${product.reviews})</span>
                    </div>
                </div>
            </div>
        `).join('');

        // Add quick view event listeners
        const quickViewBtns = document.querySelectorAll('.quick-view-btn');
        quickViewBtns.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                const productCard = this.closest('.product-card');
                const productId = parseInt(productCard.dataset.productId);
                const product = products.find(p => p.id === productId);
                if (product) {
                    showQuickView(product);
                }
            });
        });
    }

    // Generate star rating
    function generateStars(rating) {
        let stars = '';
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                stars += '<i class="fas fa-star"></i>';
            } else {
                stars += '<i class="far fa-star"></i>';
            }
        }
        return stars;
    }

    // Render pagination
    function renderPagination() {
        const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
        const pageNumbers = document.getElementById('pageNumbers');
        const prevBtn = document.getElementById('prevPage');
        const nextBtn = document.getElementById('nextPage');

        if (pageNumbers) {
            pageNumbers.innerHTML = '';
            for (let i = 1; i <= totalPages; i++) {
                const pageBtn = document.createElement('button');
                pageBtn.className = `page-number ${i === currentPage ? 'active' : ''}`;
                pageBtn.textContent = i;
                pageBtn.addEventListener('click', () => {
                    currentPage = i;
                    renderProducts();
                    renderPagination();
                });
                pageNumbers.appendChild(pageBtn);
            }
        }

        if (prevBtn) {
            prevBtn.disabled = currentPage === 1;
            prevBtn.onclick = () => {
                if (currentPage > 1) {
                    currentPage--;
                    renderProducts();
                    renderPagination();
                }
            };
        }

        if (nextBtn) {
            nextBtn.disabled = currentPage === totalPages;
            nextBtn.onclick = () => {
                if (currentPage < totalPages) {
                    currentPage++;
                    renderProducts();
                    renderPagination();
                }
            };
        }
    }

    // Quick view modal
    function showQuickView(product) {
        const modal = document.getElementById('quickViewModal');
        if (!modal) return;

        const modalContent = modal.querySelector('.quick-view-content');
        if (modalContent) {
            modalContent.querySelector('#quickViewTitle').textContent = product.name;
            modalContent.querySelector('#quickViewPrice').textContent = `$${product.price}/sq ft`;
            modalContent.querySelector('#quickViewMaterial').textContent = product.material;
            modalContent.querySelector('#quickViewSize').textContent = `${product.size} cm`;
            modalContent.querySelector('#quickViewFinish').textContent = product.finish;
            modalContent.querySelector('#quickViewApplication').textContent = product.application;
            
            const starsContainer = modalContent.querySelector('.stars');
            if (starsContainer) {
                starsContainer.innerHTML = generateStars(product.rating);
            }
            
            const ratingCount = modalContent.querySelector('.rating-count');
            if (ratingCount) {
                ratingCount.textContent = `(${product.reviews} reviews)`;
            }
        }

        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';

        // Close modal functionality
        const closeBtn = modal.querySelector('.close');
        if (closeBtn) {
            closeBtn.onclick = () => {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            };
        }

        modal.onclick = (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        };
    }

    // Check for category filter from URL
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get('category');
    if (categoryParam) {
        const categoryCheckbox = document.querySelector(`[data-filter="${categoryParam}"]`);
        if (categoryCheckbox) {
            categoryCheckbox.checked = true;
        }
    }

    // Initial render
    filterProducts();
}

// Utility function to show notifications
function showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'error' ? '#e74c3c' : '#27ae60'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 5px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
    `;
    notification.textContent = message;

    // Add to body
    document.body.appendChild(notification);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Add notification animations to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
