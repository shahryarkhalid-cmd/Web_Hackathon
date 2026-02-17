/**
 * ScrappyDoo - Frontend Navigation and Routing
 * Section-based routing system using vanilla JavaScript
 */

// ============================================
// DOM Elements
// ============================================

const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const ctaButtons = document.querySelectorAll('.cta-btn');
const navLogo = document.querySelector('.nav-logo');

// ============================================
// Section Routing Function
// ============================================

/**
 * Shows a specific section and hides all others
 * @param {string} sectionId - The ID of the section to show
 */
function showSection(sectionId) {
    // Hide all sections
    sections.forEach(section => {
        section.classList.remove('active');
    });

    // Show the target section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
        
        // Scroll to top of page when switching sections
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
        console.warn(`Section with ID "${sectionId}" not found`);
    }

    // Update active nav link
    updateActiveNavLink(sectionId);
    
    // Close mobile menu if open
    closeMobileMenu();
    
    // Initialize dealer dashboard when it's shown
    if (sectionId === 'dealer-dashboard') {
        // Small delay to ensure DOM is ready
        setTimeout(() => {
            if (typeof initDealerDashboard === 'function') {
                initDealerDashboard();
            }
        }, 50);
    }
    
    // Reset user dashboard state when navigating away from it
    // This will be handled after user dashboard variables are initialized
    if (sectionId !== 'user-dashboard') {
        resetUserDashboardIfNeeded();
    }
}

/**
 * Updates the active state of navigation links
 * @param {string} sectionId - The ID of the currently active section
 */
function updateActiveNavLink(sectionId) {
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === sectionId) {
            link.classList.add('active');
        }
    });
}

// ============================================
// Navigation Link Event Listeners
// ============================================

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetSection = link.getAttribute('data-section');
        
        if (targetSection) {
            showSection(targetSection);
        }
    });
});

// ============================================
// CTA Button Event Listeners
// ============================================

ctaButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const targetSection = button.getAttribute('data-section');
        
        if (targetSection) {
            showSection(targetSection);
        }
    });
});

// ============================================
// Logo Click Handler (Navigate to Home)
// ============================================

if (navLogo) {
    navLogo.addEventListener('click', () => {
        showSection('home');
    });
}

// ============================================
// Mobile Menu Toggle
// ============================================

/**
 * Toggles the mobile navigation menu
 */
function toggleMobileMenu() {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
}

/**
 * Closes the mobile navigation menu
 */
function closeMobileMenu() {
    navMenu.classList.remove('active');
    hamburger.classList.remove('active');
}

// Hamburger menu click handler
if (hamburger) {
    hamburger.addEventListener('click', toggleMobileMenu);
}

// Close mobile menu when clicking on a nav link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        closeMobileMenu();
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    const isClickInsideNav = navMenu.contains(e.target) || hamburger.contains(e.target);
    
    if (!isClickInsideNav && navMenu.classList.contains('active')) {
        closeMobileMenu();
    }
});

// ============================================
// Initialize Application
// ============================================

/**
 * Initializes the application on page load
 */
function init() {
    // Show home section by default
    showSection('home');
    
    // Handle browser back/forward buttons
    window.addEventListener('popstate', () => {
        // Get section from URL hash if present
        const hash = window.location.hash.slice(1);
        if (hash) {
            showSection(hash);
        } else {
            showSection('home');
        }
    });
    
    // Check for initial hash in URL
    const initialHash = window.location.hash.slice(1);
    if (initialHash && document.getElementById(initialHash)) {
        showSection(initialHash);
    }
    
    console.log('ScrappyDoo initialized successfully');
}

// ============================================
// Page Load Event
// ============================================

// Initialize when DOM is fully loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// ============================================
// Smooth Scroll Behavior (Optional Enhancement)
// ============================================

// Add smooth scrolling to anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href.length > 1) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ============================================
// User Dashboard - Scrap Request Flow
// ============================================

/**
 * Demo/Fake dealer data for bids
 * In a real application, this would come from a backend API
 * 
 * Note: All prices are in Pakistani Rupees (PKR)
 * Indicative global prices converted to PKR (1 USD ≈ 280 PKR)
 * Actual local prices may vary by city and demand
 */
const DEMO_DEALERS = [
    {
        id: 1,
        name: 'GreenScrap Solutions',
        pricePerKg: 150, // PKR per kg
        pickupDate: '2026-02-22',
        rating: 4.8
    },
    {
        id: 2,
        name: 'EcoRecycle Hub',
        pricePerKg: 140, // PKR per kg
        pickupDate: '2026-02-24',
        rating: 4.6
    },
    {
        id: 3,
        name: 'Metro Scrap Dealers',
        pricePerKg: 160, // PKR per kg
        pickupDate: '2026-02-20',
        rating: 4.9
    },
    {
        id: 4,
        name: 'City Waste Management',
        pricePerKg: 130, // PKR per kg
        pickupDate: '2026-02-26',
        rating: 4.5
    }
];

// State management for user dashboard
let currentState = 'form'; // 'form', 'bids', 'accepted'
let acceptedBid = null;
let uploadedImages = [];

// ============================================
// DOM Elements for User Dashboard
// ============================================

const requestForm = document.getElementById('scrap-request-form');
const requestFormState = document.getElementById('request-form-state');
const requestSentState = document.getElementById('request-sent-state');
const dealAcceptedState = document.getElementById('deal-accepted-state');
const imageUploadArea = document.getElementById('image-upload-area');
const imageInput = document.getElementById('image-upload');
const imagePreviewContainer = document.getElementById('image-preview-container');
const bidsContainer = document.getElementById('bids-container');
const acceptedDealCard = document.getElementById('accepted-deal-card');
const newRequestBtn = document.getElementById('new-request-btn');
const backToBidsBtn = document.getElementById('back-to-bids-btn');
const newRequestAfterDealBtn = document.getElementById('new-request-after-deal-btn');

// ============================================
// State Management Functions
// ============================================

/**
 * Switches between different states in the user dashboard
 * @param {string} state - The state to show: 'form', 'bids', or 'accepted'
 */
function switchUserDashboardState(state) {
    // Hide all states
    requestFormState.classList.remove('active-state');
    requestSentState.classList.remove('active-state');
    dealAcceptedState.classList.remove('active-state');

    // Show the requested state
    switch(state) {
        case 'form':
            requestFormState.classList.add('active-state');
            currentState = 'form';
            // Reset form when showing form state
            if (requestForm) {
                requestForm.reset();
                uploadedImages = [];
                updateImagePreview();
            }
            break;
        case 'bids':
            requestSentState.classList.add('active-state');
            currentState = 'bids';
            break;
        case 'accepted':
            dealAcceptedState.classList.add('active-state');
            currentState = 'accepted';
            break;
    }
}

// ============================================
// Image Upload Handling (UI Only)
// ============================================

/**
 * Handles image file selection and preview
 */
if (imageInput) {
    imageInput.addEventListener('change', (e) => {
        const files = Array.from(e.target.files);
        
        files.forEach(file => {
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                
                reader.onload = (event) => {
                    uploadedImages.push({
                        file: file,
                        url: event.target.result
                    });
                    updateImagePreview();
                };
                
                reader.readAsDataURL(file);
            }
        });
    });
}

/**
 * Updates the image preview container with animations
 */
function updateImagePreview() {
    if (!imagePreviewContainer) return;
    
    imagePreviewContainer.innerHTML = '';
    
    uploadedImages.forEach((image, index) => {
        const previewItem = document.createElement('div');
        previewItem.className = 'image-preview-item';
        previewItem.style.animationDelay = `${index * 0.1}s`;
        
        const img = document.createElement('img');
        img.src = image.url;
        img.alt = 'Preview';
        
        const removeBtn = document.createElement('button');
        removeBtn.className = 'remove-image';
        removeBtn.textContent = '×';
        removeBtn.addEventListener('click', () => {
            uploadedImages.splice(index, 1);
            updateImagePreview();
        });
        
        previewItem.appendChild(img);
        previewItem.appendChild(removeBtn);
        imagePreviewContainer.appendChild(previewItem);
    });
}

// ============================================
// Form Submission Handler
// ============================================

/**
 * Handles scrap request form submission
 */
if (requestForm) {
    requestForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(requestForm);
        const category = formData.get('category');
        const location = formData.get('location');
        
        // Validate form
        if (!category || !location) {
            alert('Please fill in all required fields.');
            return;
        }
        
        // Simulate form submission delay
        const submitBtn = requestForm.querySelector('.btn-submit');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Submitting...';
        submitBtn.disabled = true;
        
        // Simulate API call delay
        setTimeout(() => {
            // Switch to bids state
            switchUserDashboardState('bids');
            
            // Generate and display dealer bids
            displayDealerBids(category, location);
            
            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 1000);
    });
}

// ============================================
// Dealer Bids Display
// ============================================

/**
 * Displays dealer bid cards
 * @param {string} category - The scrap category
 * @param {string} location - The user's location
 */
function displayDealerBids(category, location) {
    if (!bidsContainer) return;
    
    bidsContainer.innerHTML = '';
    
    // Shuffle dealers for variety (demo purposes)
    const shuffledDealers = [...DEMO_DEALERS].sort(() => Math.random() - 0.5);
    
    shuffledDealers.forEach(dealer => {
        const bidCard = createBidCard(dealer, category);
        bidsContainer.appendChild(bidCard);
    });
}

/**
 * Creates a bid card element
 * @param {Object} dealer - Dealer information
 * @param {string} category - Scrap category
 * @returns {HTMLElement} Bid card element
 */
function createBidCard(dealer, category) {
    const card = document.createElement('div');
    card.className = 'bid-card';
    card.dataset.dealerId = dealer.id;
    
    // Format pickup date
    const pickupDate = new Date(dealer.pickupDate);
    const formattedDate = pickupDate.toLocaleDateString('en-US', { 
        weekday: 'short', 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
    });
    
    card.innerHTML = `
        <div class="bid-dealer-name">${dealer.name}</div>
        <div class="bid-details">
            <div class="bid-detail-item">
                <span class="bid-detail-label">Price per kg:</span>
                <span class="bid-detail-value bid-price">Rs ${dealer.pricePerKg}</span>
            </div>
            <div class="bid-detail-item">
                <span class="bid-detail-label">Proposed Pickup:</span>
                <span class="bid-detail-value">${formattedDate}</span>
            </div>
            <div class="bid-detail-item">
                <span class="bid-detail-label">Rating:</span>
                <span class="bid-detail-value rating-stars" data-rating="${dealer.rating}">
                    ${generateStarRating(dealer.rating)}
                </span>
            </div>
        </div>
        <button class="btn btn-primary bid-accept-btn" data-dealer-id="${dealer.id}">
            Accept Bid
        </button>
    `;
    
    // Add accept button event listener
    const acceptBtn = card.querySelector('.bid-accept-btn');
    acceptBtn.addEventListener('click', () => {
        acceptBid(dealer);
    });
    
    return card;
}

// ============================================
// Bid Acceptance Handler
// ============================================

/**
 * Handles bid acceptance
 * @param {Object} dealer - The dealer whose bid is being accepted
 */
function acceptBid(dealer) {
    acceptedBid = dealer;
    
    // Mark the accepted bid card
    const bidCards = document.querySelectorAll('.bid-card');
    bidCards.forEach(card => {
        if (card.dataset.dealerId == dealer.id) {
            card.classList.add('accepted');
            const acceptBtn = card.querySelector('.bid-accept-btn');
            acceptBtn.disabled = true;
            acceptBtn.textContent = 'Accepted';
        } else {
            const acceptBtn = card.querySelector('.bid-accept-btn');
            acceptBtn.disabled = true;
        }
    });
    
    // Display accepted deal details
    displayAcceptedDeal(dealer);
    
    // Switch to accepted state
    setTimeout(() => {
        switchUserDashboardState('accepted');
    }, 500);
}

/**
 * Displays the accepted deal information
 * @param {Object} dealer - The accepted dealer
 */
function displayAcceptedDeal(dealer) {
    if (!acceptedDealCard) return;
    
    const pickupDate = new Date(dealer.pickupDate);
    const formattedDate = pickupDate.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
    
    acceptedDealCard.innerHTML = `
        <div class="bid-dealer-name">${dealer.name}</div>
        <div class="bid-details">
            <div class="bid-detail-item">
                <span class="bid-detail-label">Price per kg:</span>
                <span class="bid-detail-value bid-price">Rs ${dealer.pricePerKg}</span>
            </div>
            <div class="bid-detail-item">
                <span class="bid-detail-label">Pickup Date:</span>
                <span class="bid-detail-value">${formattedDate}</span>
            </div>
            <div class="bid-detail-item">
                <span class="bid-detail-label">Rating:</span>
                <span class="bid-detail-value rating-stars" data-rating="${dealer.rating}">
                    ${generateStarRating(dealer.rating)}
                </span>
            </div>
        </div>
    `;
}

// ============================================
// Navigation Button Handlers
// ============================================

// New Request Button
if (newRequestBtn) {
    newRequestBtn.addEventListener('click', () => {
        acceptedBid = null;
        switchUserDashboardState('form');
    });
}

// Back to Bids Button
if (backToBidsBtn) {
    backToBidsBtn.addEventListener('click', () => {
        switchUserDashboardState('bids');
    });
}

// New Request After Deal Button
if (newRequestAfterDealBtn) {
    newRequestAfterDealBtn.addEventListener('click', () => {
        acceptedBid = null;
        switchUserDashboardState('form');
    });
}

// ============================================
// Reset User Dashboard Helper
// ============================================
// Dealer Dashboard - C2B & B2B Functionality
// ============================================

// DEMO DATA
const DEMO_SCRAP_REQUESTS = [
    {
        id: 1,
        category: 'plastic',
        estimatedWeight: 150,
        location: 'Karachi, Sindh',
        imageUrl: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="200"%3E%3Crect fill="%23e5e7eb" width="400" height="200"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%236b7280" font-size="18"%3EPlastic Scrap Image%3C/text%3E%3C/svg%3E'
    },
    {
        id: 2,
        category: 'metal',
        estimatedWeight: 250,
        location: 'Lahore, Punjab',
        imageUrl: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="200"%3E%3Crect fill="%23e5e7eb" width="400" height="200"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%236b7280" font-size="18"%3EMetal Scrap Image%3C/text%3E%3C/svg%3E'
    },
    {
        id: 3,
        category: 'paper',
        estimatedWeight: 180,
        location: 'Islamabad, Capital Territory',
        imageUrl: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="200"%3E%3Crect fill="%23e5e7eb" width="400" height="200"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%236b7280" font-size="18"%3EPaper Scrap Image%3C/text%3E%3C/svg%3E'
    },
    {
        id: 4,
        category: 'e-waste',
        estimatedWeight: 120,
        location: 'Faisalabad, Punjab',
        imageUrl: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="200"%3E%3Crect fill="%23e5e7eb" width="400" height="200"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%236b7280" font-size="18"%3EE-Waste Image%3C/text%3E%3C/svg%3E'
    },
    {
        id: 5,
        category: 'plastic',
        estimatedWeight: 200,
        location: 'Sialkot, Punjab',
        imageUrl: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="200"%3E%3Crect fill="%23e5e7eb" width="400" height="200"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%236b7280" font-size="18"%3EPlastic Scrap Image%3C/text%3E%3C/svg%3E'
    },
    {
        id: 6,
        category: 'metal',
        estimatedWeight: 180,
        location: 'Gujranwala, Punjab',
        imageUrl: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="200"%3E%3Crect fill="%23e5e7eb" width="400" height="200"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%236b7280" font-size="18"%3EMetal Scrap Image%3C/text%3E%3C/svg%3E'
    }
];

const DEMO_SMALL_DEALERS = [
    { id: 1, name: 'Ahmed Scrap Collection', scrapType: 'Plastic', weight: 200, pricePerKg: 115, location: 'Karachi', phone: '03142096875' },
    { id: 2, name: 'Green Waste Solutions', scrapType: 'Metal', weight: 350, pricePerKg: 130, location: 'Lahore', phone: '03214567890' },
    { id: 3, name: 'Eco Scrap Dealers', scrapType: 'Paper', weight: 180, pricePerKg: 85, location: 'Multan', phone: '03065432109' },
    { id: 4, name: 'City Scrap Hub', scrapType: 'E-Waste', weight: 150, pricePerKg: 165, location: 'Rawalpindi', phone: '03335678901' },
    { id: 5, name: 'Metro Scrap Traders', scrapType: 'Plastic', weight: 280, pricePerKg: 105, location: 'Peshawar', phone: '03009876543' },
    { id: 6, name: 'Sustainable Scrap Co.', scrapType: 'Metal', weight: 420, pricePerKg: 125, location: 'Quetta', phone: '03124789012' },
    { id: 7, name: 'Sialkot Scrap Traders', scrapType: 'Plastic', weight: 220, pricePerKg: 110, location: 'Sialkot', phone: '03215431098' },
    { id: 8, name: 'Gujranwala Waste Hub', scrapType: 'Paper', weight: 190, pricePerKg: 90, location: 'Gujranwala', phone: '03016543210' }
];

const DEMO_BIG_DEALERS = [
    { id: 1, name: 'Karachi Scrap Industries', type: 'Large Dealer', city: 'Karachi, Sindh', description: 'One of the largest scrap dealers in Karachi with 20+ years of experience. Handles all types of scrap materials.', minWeight: 500, specialization: ['Plastic', 'Metal', 'Paper'] },
    { id: 2, name: 'Lahore Recycling Corporation', type: 'Recycling Factory', city: 'Lahore, Punjab', description: 'Modern recycling facility equipped with advanced machinery. Focuses on converting waste into reusable materials.', minWeight: 1000, specialization: ['Metal', 'E-Waste', 'Plastic'] },
    { id: 3, name: 'Green Steel Pakistan', type: 'Large Dealer', city: 'Faisalabad, Punjab', description: 'Specialized in metal and steel scrap. Major supplier to construction and manufacturing industries.', minWeight: 750, specialization: ['Metal', 'Steel'] },
    { id: 4, name: 'Islamabad Waste Management Ltd', type: 'Recycling Factory', city: 'Islamabad, Federal Territory', description: 'Certified waste management and recycling facility with government recognition. Focus on environmental sustainability.', minWeight: 600, specialization: ['All Materials'] },
    { id: 5, name: 'Punjab Paper Industries', type: 'Recycling Factory', city: 'Multan, Punjab', description: 'Specialized paper recycling facility. Converts waste paper into quality pulp and packaging materials.', minWeight: 800, specialization: ['Paper', 'Cardboard'] },
    { id: 6, name: 'Peshawar Metal Traders', type: 'Large Dealer', city: 'Peshawar, KPK', description: 'Major metal scrap dealer serving northern Pakistan. Direct export to international markets.', minWeight: 900, specialization: ['Metal', 'Aluminum', 'Copper'] },
    { id: 7, name: 'Sindh Electronics Recycling', type: 'Recycling Factory', city: 'Hyderabad, Sindh', description: 'Specialized e-waste recycling plant. Handles computers, mobile phones, and electronic devices safely.', minWeight: 400, specialization: ['E-Waste', 'Electronics'] },
    { id: 8, name: 'Gujranwala Industrial Scrap', type: 'Large Dealer', city: 'Gujranwala, Punjab', description: 'Industrial area scrap dealer with connections to manufacturing units. High-volume buyer.', minWeight: 1200, specialization: ['Metal', 'Industrial Waste', 'Plastic'] },
    { id: 9, name: 'Quetta Recycling Hub', type: 'Recycling Factory', city: 'Quetta, Balochistan', description: 'Modern recycling facility in Balochistan. Handles mixed scrap materials with advanced sorting technology.', minWeight: 500, specialization: ['All Materials'] },
    { id: 10, name: 'Sialkot Export Scrap Co.', type: 'Large Dealer', city: 'Sialkot, Punjab', description: 'Export-focused scrap dealer. Direct shipment to international recycling industries.', minWeight: 700, specialization: ['Metal', 'Stainless Steel', 'Non-Ferrous'] }
];

// CONSTANTS
const BULK_SELL_PRICE_PER_KG = 180; // PKR per kg

// DOM ELEMENTS
const dealerDashboardElements = {
    scrapRequests: document.getElementById('scrap-requests-container'),
    smallDealers: document.getElementById('small-dealers-container'),
    bulkSummary: document.getElementById('bulk-summary-card'),
    totalWeight: document.getElementById('total-weight'),
    totalAmount: document.getElementById('total-amount'),
    estimatedProfit: document.getElementById('estimated-profit'),
    dealerCount: document.getElementById('dealer-count'),
    sellToBigDealerBtn: document.getElementById('sell-to-big-dealer-btn'),
    bidModal: document.getElementById('bid-modal'),
    bidForm: document.getElementById('bid-form'),
    closeBidModal: document.getElementById('close-bid-modal'),
    cancelBidBtn: document.getElementById('cancel-bid-btn'),
    pickupDateInput: document.getElementById('pickup-date'),
    bigDealerModal: document.getElementById('big-dealer-modal'),
    closeBigDealerModal: document.getElementById('close-big-dealer-modal'),
    bigDealersContainer: document.getElementById('big-dealers-container'),
    submissionStatusModal: document.getElementById('submission-status-modal'),
    closeSubmissionModal: document.getElementById('close-submission-modal')
};

// STATE MANAGEMENT
const dealerDashboardState = {
    scrapRequests: [],
    submittedBids: {},
    selectedSmallDealers: [],
    currentBiddingRequest: null
};

// ============================================
// INITIALIZATION
// ============================================

function initDealerDashboard() {
    console.log('Initializing Dealer Dashboard...');
    
    // Reset state
    dealerDashboardState.scrapRequests = [...DEMO_SCRAP_REQUESTS];
    dealerDashboardState.submittedBids = {};
    dealerDashboardState.selectedSmallDealers = [];
    dealerDashboardState.currentBiddingRequest = null;
    
    // Render content
    renderScrapRequests();
    renderSmallDealers();
    updateBulkSummary();
    
    // Setup event listeners
    setupBidModalListeners();
    setupBigDealerModalListeners();
    setupSellToBigDealerButton();
    setupDateInputConstraints();
    
    // Ensure visibility
    if (dealerDashboardElements.bulkSummary) {
        dealerDashboardElements.bulkSummary.style.display = 'block';
        dealerDashboardElements.bulkSummary.style.visibility = 'visible';
    }
    
    console.log('✅ Dealer Dashboard Ready');
}

// ============================================
// C2B: SCRAP REQUESTS
// ============================================

function renderScrapRequests() {
    const container = dealerDashboardElements.scrapRequests;
    if (!container) return;
    
    container.innerHTML = '';
    
    if (dealerDashboardState.scrapRequests.length === 0) {
        container.innerHTML = '<p class="placeholder-text" style="text-align: center; grid-column: 1 / -1;">No scrap requests available.</p>';
        return;
    }
    
    dealerDashboardState.scrapRequests.forEach(request => {
        container.appendChild(createRequestCard(request));
    });
}

function createRequestCard(request) {
    const card = document.createElement('div');
    card.className = 'request-card';
    
    const hasBid = dealerDashboardState.submittedBids[request.id];
    if (hasBid) card.classList.add('has-bid');
    
    const bidInfo = hasBid || null;
    
    card.innerHTML = `
        <div class="request-header">
            <span class="request-category">${request.category.charAt(0).toUpperCase() + request.category.slice(1)}</span>
            ${hasBid ? '<span class="request-badge">Bid Submitted</span>' : ''}
        </div>
        <img src="${request.imageUrl}" alt="${request.category}" class="request-image-preview" onerror="this.style.display='none'">
        <div class="request-details">
            <div class="request-detail-item">
                <span class="request-detail-label">Weight:</span>
                <span class="request-detail-value">${request.estimatedWeight} kg</span>
            </div>
            <div class="request-detail-item">
                <span class="request-detail-label">Location:</span>
                <span class="request-detail-value">${request.location}</span>
            </div>
            ${hasBid ? `
                <div class="request-detail-item">
                    <span class="request-detail-label">Your Bid:</span>
                    <span class="request-detail-value">Rs ${bidInfo.pricePerKg}/kg</span>
                </div>
                <div class="request-detail-item">
                    <span class="request-detail-label">Pickup:</span>
                    <span class="request-detail-value">${formatDate(bidInfo.pickupDate)}</span>
                </div>
            ` : ''}
        </div>
        <button class="btn btn-primary request-bid-btn ${hasBid ? 'has-bid' : ''}" 
                data-request-id="${request.id}"
                ${hasBid ? 'disabled' : ''}>
            ${hasBid ? '✓ Bid Submitted' : 'Place Bid'}
        </button>
    `;
    
    if (!hasBid) {
        card.querySelector('.request-bid-btn').addEventListener('click', () => {
            openBidModal(request);
        });
    }
    
    return card;
}

function openBidModal(request) {
    dealerDashboardState.currentBiddingRequest = request;
    if (dealerDashboardElements.bidForm) dealerDashboardElements.bidForm.reset();
    if (dealerDashboardElements.bidModal) dealerDashboardElements.bidModal.classList.add('active');
}

function closeBidModal() {
    dealerDashboardState.currentBiddingRequest = null;
    if (dealerDashboardElements.bidModal) dealerDashboardElements.bidModal.classList.remove('active');
}

function setupBidModalListeners() {
    // Close button
    if (dealerDashboardElements.closeBidModal) {
        dealerDashboardElements.closeBidModal.addEventListener('click', closeBidModal);
    }
    
    // Cancel button
    if (dealerDashboardElements.cancelBidBtn) {
        dealerDashboardElements.cancelBidBtn.addEventListener('click', closeBidModal);
    }
    
    // Click outside modal
    if (dealerDashboardElements.bidModal) {
        dealerDashboardElements.bidModal.addEventListener('click', (e) => {
            if (e.target === dealerDashboardElements.bidModal) closeBidModal();
        });
    }
    
    // Form submission
    if (dealerDashboardElements.bidForm) {
        dealerDashboardElements.bidForm.addEventListener('submit', handleBidSubmission);
    }
}

function handleBidSubmission(e) {
    e.preventDefault();
    
    const request = dealerDashboardState.currentBiddingRequest;
    if (!request) return;
    
    const form = dealerDashboardElements.bidForm;
    const pricePerKg = parseFloat(form.querySelector('[name="bid-price"]').value);
    const pickupDate = form.querySelector('[name="pickup-date"]').value;
    
    if (!pricePerKg || !pickupDate) {
        alert('⚠️ Please fill in all fields');
        return;
    }
    
    if (pricePerKg <= 0) {
        alert('⚠️ Price must be greater than 0');
        return;
    }
    
    // Save bid
    dealerDashboardState.submittedBids[request.id] = {
        pricePerKg,
        pickupDate,
        requestId: request.id
    };
    
    closeBidModal();
    renderScrapRequests();
    alert('✅ Bid submitted successfully!');
}

// ============================================
// B2B: SMALL DEALERS
// ============================================

function renderSmallDealers() {
    const container = dealerDashboardElements.smallDealers;
    if (!container) return;
    
    container.innerHTML = '';
    DEMO_SMALL_DEALERS.forEach(dealer => {
        container.appendChild(createSmallDealerCard(dealer));
    });
}

function createSmallDealerCard(dealer) {
    const isSelected = dealerDashboardState.selectedSmallDealers.includes(dealer.id);
    const card = document.createElement('div');
    card.className = `small-dealer-card ${isSelected ? 'selected' : ''}`;
    
    const totalCost = dealer.weight * dealer.pricePerKg;
    
    card.innerHTML = `
        <div class="dealer-name">${dealer.name}</div>
        <div class="dealer-info">
            <div class="dealer-info-item">
                <span class="dealer-info-label">Type:</span>
                <span class="dealer-info-value">${dealer.scrapType}</span>
            </div>
            <div class="dealer-info-item">
                <span class="dealer-info-label">Weight:</span>
                <span class="dealer-info-value">${dealer.weight} kg</span>
            </div>
            <div class="dealer-info-item">
                <span class="dealer-info-label">Price/kg:</span>
                <span class="dealer-info-value">Rs ${dealer.pricePerKg}</span>
            </div>
            <div class="dealer-info-item">
                <span class="dealer-info-label">Total:</span>
                <span class="dealer-info-value">Rs ${totalCost.toLocaleString()}</span>
            </div>
            <div class="dealer-info-item">
                <span class="dealer-info-label">Location:</span>
                <span class="dealer-info-value">${dealer.location}</span>
            </div>
            <div class="dealer-info-item">
                <span class="dealer-info-label">Phone:</span>
                <span class="dealer-info-value dealer-phone">${dealer.phone}</span>
            </div>
        </div>
        <button class="btn btn-primary add-dealer-btn ${isSelected ? 'selected' : ''}" data-dealer-id="${dealer.id}">
            ${isSelected ? '✓ Remove' : 'Add to Bulk'}
        </button>
    `;
    
    card.querySelector('.add-dealer-btn').addEventListener('click', () => {
        toggleDealerSelection(dealer.id);
    });
    
    return card;
}

function toggleDealerSelection(dealerId) {
    const index = dealerDashboardState.selectedSmallDealers.indexOf(dealerId);
    
    if (index > -1) {
        dealerDashboardState.selectedSmallDealers.splice(index, 1);
    } else {
        dealerDashboardState.selectedSmallDealers.push(dealerId);
    }
    
    renderSmallDealers();
    updateBulkSummary();
}

// ============================================
// B2B: BULK SUMMARY & BIG DEALERS
// ============================================

function updateBulkSummary() {
    const elements = dealerDashboardElements;
    if (!elements.totalWeight || !elements.totalAmount || !elements.estimatedProfit || !elements.dealerCount) return;
    
    let totalWeight = 0;
    let totalCost = 0;
    
    dealerDashboardState.selectedSmallDealers.forEach(dealerId => {
        const dealer = DEMO_SMALL_DEALERS.find(d => d.id === dealerId);
        if (dealer) {
            totalWeight += dealer.weight;
            totalCost += dealer.weight * dealer.pricePerKg;
        }
    });
    
    const totalRevenue = totalWeight * BULK_SELL_PRICE_PER_KG;
    const profit = totalRevenue - totalCost;
    
    elements.totalWeight.textContent = `${totalWeight.toLocaleString()} kg`;
    elements.totalAmount.textContent = `Rs ${totalRevenue.toLocaleString()}`;
    elements.estimatedProfit.textContent = `Rs ${profit.toLocaleString()}`;
    elements.dealerCount.textContent = dealerDashboardState.selectedSmallDealers.length;
    
    updateSellButton();
}

function updateSellButton() {
    // Get fresh reference every time
    const btn = document.getElementById('sell-to-big-dealer-btn');
    if (!btn) {
        console.warn('⚠️ Button not found for state update');
        return;
    }
    
    const hasSelection = dealerDashboardState.selectedSmallDealers.length > 0;
    
    if (hasSelection) {
        btn.classList.remove('disabled');
        btn.style.opacity = '1';
        btn.style.cursor = 'pointer';
        btn.disabled = false;
    } else {
        btn.classList.add('disabled');
        btn.style.opacity = '0.5';
        btn.style.cursor = 'not-allowed';
        btn.disabled = true;
    }
}

function setupSellToBigDealerButton() {
    const btn = document.getElementById('sell-to-big-dealer-btn');
    
    if (!btn) {
        console.error('❌ Sell to Big Dealer button NOT found in DOM');
        return;
    }
    
    console.log('✅ Button found, clearing old listeners...');
    
    // Clone and replace to remove old listeners
    const newBtn = btn.cloneNode(true);
    btn.parentNode.replaceChild(newBtn, btn);
    
    // Attach fresh listener to the new button
    newBtn.addEventListener('click', handleSellToBigDealerClick);
    
    // Set initial state
    updateSellButton();
    console.log('✅ Button setup complete');
}

function handleSellToBigDealerClick(e) {
    e.preventDefault();
    e.stopPropagation();
    
    console.log('🔘 Sell to Big Dealer button clicked!');
    console.log('Selected small dealers:', dealerDashboardState.selectedSmallDealers.length);
    
    if (dealerDashboardState.selectedSmallDealers.length === 0) {
        console.warn('⚠️ No dealers selected');
        alert('⚠️ Please select at least one small dealer first');
        return;
    }
    
    console.log('📂 Opening big dealer modal...');
    renderBigDealers();
    
    const modal = document.getElementById('big-dealer-modal');
    if (modal) {
        modal.classList.add('active');
        console.log('✅ Big dealer modal opened');
    } else {
        console.error('❌ Big dealer modal not found');
    }
}

function renderBigDealers() {
    const container = dealerDashboardElements.bigDealersContainer;
    if (!container) return;
    
    container.innerHTML = '';
    DEMO_BIG_DEALERS.forEach(dealer => {
        container.appendChild(createBigDealerCard(dealer));
    });
}

function createBigDealerCard(dealer) {
    const card = document.createElement('div');
    card.className = 'big-dealer-card';
    
    card.innerHTML = `
        <div class="big-dealer-header">
            <h4 class="big-dealer-name">${dealer.name}</h4>
            <span class="big-dealer-type">${dealer.type}</span>
        </div>
        <div class="big-dealer-info">
            <p class="big-dealer-description">${dealer.description}</p>
            <div class="dealer-detail-item">
                <span class="dealer-detail-label">Location:</span>
                <span class="dealer-detail-value">${dealer.city}</span>
            </div>
            <div class="dealer-detail-item">
                <span class="dealer-detail-label">Min Weight:</span>
                <span class="dealer-detail-value">${dealer.minWeight} kg</span>
            </div>
            <div class="dealer-detail-item">
                <span class="dealer-detail-label">Specialization:</span>
                <span class="dealer-detail-value">${dealer.specialization.join(', ')}</span>
            </div>
        </div>
        <button class="btn btn-primary btn-submit-to-dealer" data-dealer-id="${dealer.id}">
            Submit Request
        </button>
    `;
    
    card.querySelector('.btn-submit-to-dealer').addEventListener('click', () => {
        submitToBigDealer(dealer);
    });
    
    return card;
}

function submitToBigDealer(dealer) {
    // Close big dealer modal
    if (dealerDashboardElements.bigDealerModal) {
        dealerDashboardElements.bigDealerModal.classList.remove('active');
    }
    
    // Show success modal
    if (dealerDashboardElements.submissionStatusModal) {
        dealerDashboardElements.submissionStatusModal.classList.add('active');
    }
    
    // Reset after delay
    setTimeout(() => {
        dealerDashboardState.selectedSmallDealers = [];
        renderSmallDealers();
        updateBulkSummary();
    }, 2000);
}

function setupBigDealerModalListeners() {
    // Close button
    if (dealerDashboardElements.closeBigDealerModal) {
        dealerDashboardElements.closeBigDealerModal.addEventListener('click', () => {
            if (dealerDashboardElements.bigDealerModal) {
                dealerDashboardElements.bigDealerModal.classList.remove('active');
            }
        });
    }
    
    // Click outside
    if (dealerDashboardElements.bigDealerModal) {
        dealerDashboardElements.bigDealerModal.addEventListener('click', (e) => {
            if (e.target === dealerDashboardElements.bigDealerModal) {
                dealerDashboardElements.bigDealerModal.classList.remove('active');
            }
        });
    }
    
    // Submission modal close
    if (dealerDashboardElements.closeSubmissionModal) {
        dealerDashboardElements.closeSubmissionModal.addEventListener('click', () => {
            if (dealerDashboardElements.submissionStatusModal) {
                dealerDashboardElements.submissionStatusModal.classList.remove('active');
            }
        });
    }
    
    // Submission modal click outside
    if (dealerDashboardElements.submissionStatusModal) {
        dealerDashboardElements.submissionStatusModal.addEventListener('click', (e) => {
            if (e.target === dealerDashboardElements.submissionStatusModal) {
                dealerDashboardElements.submissionStatusModal.classList.remove('active');
            }
        });
    }
}

// ============================================
// UTILITIES
// ============================================

function setupDateInputConstraints() {
    if (!dealerDashboardElements.pickupDateInput) return;
    
    const minDate = new Date('2026-02-20');
    const maxDate = new Date('2026-02-28');
    
    dealerDashboardElements.pickupDateInput.min = minDate.toISOString().split('T')[0];
    dealerDashboardElements.pickupDateInput.max = maxDate.toISOString().split('T')[0];
}

function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

// Note: Dealer dashboard initialization is handled in the showSection function above

// ============================================
// Scroll-triggered Animations
// ============================================

/**
 * Intersection Observer for scroll-triggered animations
 * Lightweight and performant alternative to scroll event listeners
 */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all elements with animate-on-scroll class
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
}

// Note: Image preview animations are handled in updateImagePreview function above

// ============================================
// Enhanced Bid Card Animations
// ============================================

// Override displayDealerBids to add staggered animations
const originalDisplayDealerBids = displayDealerBids;
displayDealerBids = function(category, location) {
    originalDisplayDealerBids(category, location);
    
    // Add staggered fade-in to bid cards
    setTimeout(() => {
        const bidCards = document.querySelectorAll('.bid-card');
        bidCards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.15}s`;
        });
        
        // Re-initialize rating stars after cards are created
        setTimeout(() => {
            const ratingStars = document.querySelectorAll('.rating-stars');
            ratingStars.forEach(ratingEl => {
                const stars = ratingEl.querySelectorAll('.star');
                stars.forEach((star, index) => {
                    star.style.transition = 'transform 0.2s ease, filter 0.2s ease';
                    star.addEventListener('mouseenter', () => {
                        stars.forEach((s, i) => {
                            if (i <= index) {
                                s.style.transform = 'scale(1.2)';
                                s.style.filter = 'brightness(1.3)';
                            }
                        });
                    });
                    star.addEventListener('mouseleave', () => {
                        stars.forEach(s => {
                            s.style.transform = 'scale(1)';
                            s.style.filter = 'brightness(1)';
                        });
                    });
                });
            });
        }, 100);
    }, 50);
};

// ============================================
// Enhanced Bulk Summary Animations
// ============================================

// Override updateBulkSummary to add highlight animation
const originalUpdateBulkSummary = updateBulkSummary;
updateBulkSummary = function() {
    originalUpdateBulkSummary();
    
    if (bulkSummaryCard) {
        // Remove previous animation class
        bulkSummaryCard.classList.remove('updated');
        // Force reflow
        void bulkSummaryCard.offsetWidth;
        // Add animation class
        bulkSummaryCard.classList.add('updated');
        setTimeout(() => {
            bulkSummaryCard.classList.remove('updated');
        }, 600);
    }
};

// ============================================
// Enhanced Request Card Animations
// ============================================

// Override displayScrapRequests to add animations
const originalDisplayScrapRequests = displayScrapRequests;
displayScrapRequests = function() {
    originalDisplayScrapRequests();
    
    // Add staggered animations to request cards
    setTimeout(() => {
        const requestCards = document.querySelectorAll('.request-card');
        requestCards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
            // Mark as new request for glow animation
            if (index < 2) {
                card.classList.add('new-request');
                setTimeout(() => {
                    card.classList.remove('new-request');
                }, 2000);
            }
        });
    }, 50);
};

// ============================================
// Enhanced Small Dealer Card Animations
// ============================================

// Override displaySmallDealers to add animations
const originalDisplaySmallDealers = displaySmallDealers;
displaySmallDealers = function() {
    originalDisplaySmallDealers();
    
    // Add staggered animations
    setTimeout(() => {
        const dealerCards = document.querySelectorAll('.small-dealer-card');
        dealerCards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
        });
    }, 50);
};

// ============================================
// Parallax Effect for Hero Section
// ============================================

/**
 * Adds parallax effect to hero background layers on scroll
 */
function initParallaxEffect() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    let ticking = false;

    function updateParallax() {
        const scrolled = window.pageYOffset;
        const heroHeight = hero.offsetHeight;
        const heroTop = hero.offsetTop;
        
        if (scrolled < heroTop + heroHeight) {
            const parallaxValue = scrolled * 0.5;
            const layers = document.querySelectorAll('.hero-bg-layer');
            
            layers.forEach((layer, index) => {
                const speed = (index + 1) * 0.1;
                layer.style.transform = `translateY(${parallaxValue * speed}px)`;
            });
        }
        
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(updateParallax);
            ticking = true;
        }
    });
}

// ============================================
// Smooth Section Transitions
// ============================================

// Enhance showSection with smooth transitions
const originalShowSectionEnhanced = showSection;
showSection = function(sectionId) {
    // Add fade-out to current section
    const currentSection = document.querySelector('.section.active');
    if (currentSection) {
        currentSection.style.opacity = '0';
        currentSection.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            originalShowSectionEnhanced(sectionId);
            
            // Trigger scroll animations for new section
            setTimeout(() => {
                initScrollAnimations();
            }, 100);
        }, 250);
    } else {
        originalShowSectionEnhanced(sectionId);
        setTimeout(() => {
            initScrollAnimations();
        }, 100);
    }
};

// ============================================
// Initialize All Animations on Page Load
// ============================================

// Enhanced init function
const originalInit = init;
init = function() {
    originalInit();
    
    // Initialize scroll animations
    setTimeout(() => {
        initScrollAnimations();
        initParallaxEffect();
    }, 100);
    
    console.log('ScrappyDoo animations initialized successfully');
};

// Re-initialize on section changes
window.addEventListener('load', () => {
    setTimeout(() => {
        initScrollAnimations();
    }, 500);
});

