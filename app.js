// ==================== DATA ====================

const SCRAP_CATEGORIES = [
    { id: 'plastic', name: 'Plastic', icon: '♻️', priceRange: '84 - 168' },
    { id: 'paper', name: 'Paper', icon: '📄', priceRange: '42 - 98' },
    { id: 'metal', name: 'Metal', icon: '🔩', priceRange: '70 - 140' },
    { id: 'aluminum', name: 'Aluminum', icon: '⚙️', priceRange: '336 - 560' },
    { id: 'copper', name: 'Copper', icon: '🔌', priceRange: '1820 - 2380' },
    { id: 'e-waste', name: 'E-Waste', icon: '💻', priceRange: '140 - 336' }
];

const DEMO_USER_REQUESTS = [
    { id: 'r1', category: 'plastic', weight: 35, location: 'DHA, Lahore', status: 'pending', timestamp: Date.now(), imageUrl: null, currentBid: null },
    { id: 'r2', category: 'metal', weight: 28, location: 'Defence, Lahore', status: 'pending', timestamp: Date.now(), imageUrl: null, currentBid: null },
    { id: 'r3', category: 'paper', weight: 32, location: 'Johar Town, Lahore', status: 'pending', timestamp: Date.now(), imageUrl: null, currentBid: null }
];

const DEMO_SMALL_DEALERS = [
    { id: 'sd1', name: 'Muhammad Plastic Shop', scrapType: 'Plastic', weight: 35, pricePerKg: 115, location: 'Gulberg, Lahore', phone: '03142096875' },
    { id: 'sd2', name: 'Raja Metal Scrap', scrapType: 'Metal', weight: 38, pricePerKg: 130, location: 'Canal Road, Lahore', phone: '03214567890' },
    { id: 'sd3', name: 'Hassan Paper Waste', scrapType: 'Paper', weight: 32, pricePerKg: 85, location: 'Mall Road, Lahore', phone: '03065432109' },
    { id: 'sd4', name: 'Farooq E-Waste Hub', scrapType: 'E-Waste', weight: 40, pricePerKg: 165, location: 'Bahria Town, Lahore', phone: '03335678901' },
    { id: 'sd5', name: 'Aslam Plastic Collector', scrapType: 'Plastic', weight: 36, pricePerKg: 105, location: 'Clifton, Lahore', phone: '03009876543' },
    { id: 'sd6', name: 'Saeed Metal Merchant', scrapType: 'Metal', weight: 39, pricePerKg: 125, location: 'Garden Town, Lahore', phone: '03124789012' }
];

const LARGE_LOCAL_DEALERS = [
    { id: 'ld1', name: 'Malik Scrap Trading', type: 'Bulk Dealer', city: 'Lahore', location: 'Bandha Road', phone: '03142096875', description: 'Major mixed scrap aggregator serving Lahore and surrounding areas. Quick payment and reliable pickup service for bulk lots.', minWeight: 100, specialization: ['Mixed Scrap', 'Plastic', 'Metal', 'Paper'] },
    { id: 'ld2', name: 'Shahenshah Scrap House', type: 'Regional Dealer', city: 'Lahore', location: 'Waaris Khan', phone: '03214567890', description: 'Established large-scale scrap dealer with expertise in all categories. Direct export connections to overseas recycling mills.', minWeight: 150, specialization: ['Mixed Scrap', 'Metals', 'E-Waste', 'Industrial'] },
    { id: 'ld3', name: 'Punjab Scrap Industries', type: 'Bulk Dealer', city: 'Lahore', location: 'Saggian', phone: '03065432109', description: 'One of Lahore\'s largest mixed scrap dealers with modern sorting and weighing facilities. Competitive rates on bulk purchases.', minWeight: 200, specialization: ['Mixed Scrap', 'All Categories'] },
    { id: 'ld4', name: 'National Scrap Merchants', type: 'Large Dealer', city: 'Lahore', location: 'Lala Musa', phone: '03335678901', description: 'Trusted supplier to industrial sectors. Buys all scrap types in bulk with immediate payment verification system.', minWeight: 120, specialization: ['Mixed Scrap', 'Construction Waste', 'Industrial'] },
    { id: 'ld5', name: 'Star Recyclers Lahore', type: 'Bulk Dealer', city: 'Lahore', location: 'Ravi Road', phone: '03009876543', description: 'High-volume scrap aggregator with dedicated vehicle fleet. Specializes in collecting from multiple small dealers and consolidating shipments.', minWeight: 180, specialization: ['Mixed Scrap', 'Logistics', 'All Types'] },
    { id: 'ld6', name: 'Faisal Brother Scrap Hub', type: 'Regional Dealer', city: 'Lahore', location: 'Race Course', phone: '03124789012', description: 'Premium scrap trading hub with fair market pricing. Established network for quick fulfillment and export-ready processing.', minWeight: 160, specialization: ['Mixed Scrap', 'Copper', 'Aluminum', 'Clean Metals'] },
    { id: 'ld7', name: 'United Scrap Exchange', type: 'Bulk Dealer', city: 'Lahore', location: 'Icchra', phone: '03441234567', description: 'Major consolidation center for local dealers. Handles large quantities of mixed scrap for domestic and international markets.', minWeight: 250, specialization: ['Mixed Scrap', 'All Categories', 'Sorting Service'] },
    { id: 'ld8', name: 'Rizwan Scrap Traders', type: 'Large Dealer', city: 'Lahore', location: 'Adiala Road', phone: '03215678901', description: 'Competitive mixed scrap dealer with transparent weighing and on-spot payment capability. Serves network of small dealers efficiently.', minWeight: 110, specialization: ['Mixed Scrap', 'Plastic', 'Metal', 'Paper'] },
    { id: 'ld9', name: 'Green Valley Scrap Co.', type: 'Bulk Dealer', city: 'Lahore', location: 'Shalimar', phone: '03369876543', description: 'Environment-conscious scrap dealer utilizing proper recycling methods. Bulk buyer of all scrap categories with fair rates.', minWeight: 190, specialization: ['Mixed Scrap', 'Eco-Friendly Processing', 'All Types'] },
    { id: 'ld10', name: 'Century Scrap Merchants', type: 'Regional Dealer', city: 'Lahore', location: 'Township', phone: '03025432109', description: 'Largest mixed scrap dealer network in Lahore with centralized warehouse. Direct buyers for consolidated bulk shipments.', minWeight: 220, specialization: ['Mixed Scrap', 'All Categories', 'Export Ready'] }
];

const MOCK_BIDS = [
    { id: 'b1', requestId: 'r1', dealerName: 'GreenScrap Solutions', phone: '03142096875', pricePerKg: 150, pickupDate: '2026-02-22', rating: 4.8 },
    { id: 'b2', requestId: 'r1', dealerName: 'EcoRecycle Hub', phone: '03214567890', pricePerKg: 140, pickupDate: '2026-02-24', rating: 4.6 },
    { id: 'b3', requestId: 'r1', dealerName: 'Metro Scrap Dealers', phone: '03065432109', pricePerKg: 160, pickupDate: '2026-02-20', rating: 4.9 }
];

// ==================== STATE ====================

let appState = {
    activeSection: 'home',
    requests: JSON.parse(JSON.stringify(DEMO_USER_REQUESTS)),
    selectedDealers: [],
    previewImage: null,
    successMessage: null,
    activeRequest: null,
    showBids: false,
    isMenuOpen: false,
    activeBiddingRequest: null,
    isBiddingModalOpen: false,
    isBigDealerModalOpen: false,
    isSubmitting: false
};

// ==================== UTILITIES ====================

function getCategoryIcon(categoryId) {
    const cat = SCRAP_CATEGORIES.find(c => c.id === categoryId);
    return cat ? cat.icon : '📦';
}

function getCategoryName(categoryId) {
    const cat = SCRAP_CATEGORIES.find(c => c.id === categoryId);
    return cat ? cat.name : categoryId;
}

function formatDate(timestamp) {
    return new Date(timestamp).toLocaleDateString('en-US');
}

function calculateStats() {
    let weight = 0;
    let cost = 0;
    appState.selectedDealers.forEach(id => {
        const d = DEMO_SMALL_DEALERS.find(item => item.id === id);
        if (d) {
            weight += d.weight;
            cost += d.weight * d.pricePerKg;
        }
    });
    const revenue = weight * 180; // Bulk sell price: 180 PKR/kg
    const profit = revenue - cost;
    return { weight, cost, revenue, profit };
}

function showNotification(message) {
    appState.successMessage = message;
    render();
    setTimeout(() => {
        appState.successMessage = null;
        render();
    }, 6000);
}

// ==================== NAVIGATION ====================

function navigateTo(section) {
    appState.activeSection = section;
    appState.isMenuOpen = false;
    window.location.hash = section;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    render();
}

// ==================== EVENT HANDLERS ====================

function handleAddRequest(e) {
    e.preventDefault();
    appState.isSubmitting = true;
    render();
    
    setTimeout(() => {
        const formData = new FormData(e.target);
        const newReq = {
            id: `r${Date.now()}`,
            category: formData.get('category'),
            weight: Number(formData.get('weight')),
            location: formData.get('location'),
            imageUrl: appState.previewImage,
            status: 'pending',
            timestamp: Date.now(),
            currentBid: null
        };
        
        appState.requests.unshift(newReq);
        appState.previewImage = null;
        appState.isSubmitting = false;
        showNotification('✓ Your scrap request has been posted successfully!');
        e.target.reset();
        render();
    }, 800);
}

function handleUpdateBid(requestId, bidAmount) {
    const req = appState.requests.find(r => r.id === requestId);
    if (req) {
        req.status = 'bidded';
        req.currentBid = bidAmount;
    }
}

function handleAddImagePreview(file) {
    if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
            appState.previewImage = reader.result;
            render();
        };
        reader.readAsDataURL(file);
    }
}

function handleRemoveImage() {
    appState.previewImage = null;
    const fileInput = document.querySelector('input[name="image"]');
    if (fileInput) fileInput.value = '';
    render();
}

function handleToggleDealer(dealerId) {
    if (appState.selectedDealers.includes(dealerId)) {
        appState.selectedDealers = appState.selectedDealers.filter(id => id !== dealerId);
    } else {
        appState.selectedDealers.push(dealerId);
    }
    render();
}

function handleOpenBiddingModal(requestId) {
    appState.activeBiddingRequest = appState.requests.find(r => r.id === requestId);
    appState.isBiddingModalOpen = true;
    render();
}

function handleCloseBiddingModal() {
    appState.isBiddingModalOpen = false;
    appState.activeBiddingRequest = null;
    render();
}

function handleSubmitBid(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const bidPrice = Number(formData.get('bidPrice'));
    
    if (appState.activeBiddingRequest) {
        handleUpdateBid(appState.activeBiddingRequest.id, bidPrice);
        appState.isBiddingModalOpen = false;
        appState.activeBiddingRequest = null;
        showNotification(`🚀 Your bid of Rs. ${bidPrice}/kg has been successfully submitted!`);
        render();
    }
}

function handleShowViewBids(requestId) {
    appState.activeRequest = appState.requests.find(r => r.id === requestId);
    appState.showBids = true;
    render();
}

function handleCloseBids() {
    appState.showBids = false;
    appState.activeRequest = null;
    render();
}

function handleAcceptBid(bidId) {
    const bid = MOCK_BIDS.find(b => b.id === bidId);
    if (bid && appState.activeRequest) {
        showNotification(`✓ Deal accepted with ${bid.dealerName}! Pickup scheduled.`);
        handleCloseBids();
    }
}

function handleSubmitBulkDeal(dealerName) {
    const weight = appState.selectedDealers.reduce((total, id) => {
        const dealer = DEMO_SMALL_DEALERS.find(d => d.id === id);
        return total + (dealer ? dealer.weight : 0);
    }, 0);
    
    appState.selectedDealers = [];
    appState.isBigDealerModalOpen = false;
    showNotification(`🚀 Bulk request of ${weight}kg submitted to ${dealerName}. Verified!`);
    render();
}

// ==================== RENDER FUNCTIONS ====================

function renderNavbar() {
    return `
        <nav class="glass-panel">
            <div class="nav-container">
                <button class="nav-logo" onclick="navigateTo('home')">
                    <span style="font-size: 2rem; animation: pulse 2s infinite; transition: transform 0.3s;" onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'">♻️</span>
                    <h1 class="nav-logo-text gradient-text">ScrappyDoo</h1>
                </button>

                <div class="nav-links ${appState.isMenuOpen ? 'active' : ''}">
                    <button class="nav-item ${appState.activeSection === 'home' ? 'active' : ''}" onclick="navigateTo('home')">Home</button>
                    <button class="nav-item ${appState.activeSection === 'seller' ? 'active' : ''}" onclick="navigateTo('seller')">I Have Scrap</button>
                    <button class="nav-item ${appState.activeSection === 'dealer' ? 'active' : ''}" onclick="navigateTo('dealer')">I am a Dealer</button>
                </div>

                <button class="nav-toggle" onclick="appState.isMenuOpen = !appState.isMenuOpen; render()">
                    ${appState.isMenuOpen ? '✕' : '☰'}
                </button>
            </div>

            ${appState.isMenuOpen ? `
                <div class="mobile-menu active">
                    <button class="nav-item" onclick="navigateTo('home')">Home</button>
                    <button class="nav-item" onclick="navigateTo('seller')">I Have Scrap</button>
                    <button class="nav-item" onclick="navigateTo('dealer')">I am a Dealer</button>
                </div>
            ` : ''}
        </nav>
    `;
}

function renderHomePage() {
    return `
        <div class="container animate-fade-in">
            <!-- HERO SECTION -->
            <section class="hero">
                <div class="hero-content">
                    <div class="section-badge">Sustainability Reinvented</div>
                    <h1 class="gradient-text">ScrappyDoo</h1>
                    <p class="hero-subtitle">Digitizing the <span class="gradient-text">Scrap Economy</span> of Pakistan</p>
                    <p class="text-large">Connecting sellers with verified dealers and large-scale factories. Turn your waste into value with transparency and ease.</p>
                    <div class="hero-buttons">
                        <button class="btn btn-primary" onclick="navigateTo('seller')">List My Scrap</button>
                        <button class="btn btn-secondary" onclick="navigateTo('dealer')">Start Bidding</button>
                    </div>
                </div>
                
                <div class="hero-visual">
                    <div class="hero-card">
                        <div class="hero-blur"></div>
                        <div class="hero-emoji">♻️</div>
                        <div class="hero-badge-top">Top Rates</div>
                        <div class="hero-badge-bottom">Verified Dealers</div>
                    </div>
                </div>
            </section>

            <!-- MARKET RATES SECTION -->
            <section style="padding: 5rem 0;">
                <div class="section-header">
                    <h2>Live Market Rates</h2>
                    <p class="text-slate-400">Indicative daily scrap prices in PKR per kg</p>
                </div>
                
                <div class="grid grid-cols-1 grid-cols-2 grid-cols-3 gap-8">
                    ${SCRAP_CATEGORIES.map(cat => `
                        <div class="card glass-panel">
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                                <div style="font-size: 3rem; transition: transform 0.3s;" onmouseover="this.style.transform='scale(1.25)'" onmouseout="this.style.transform='scale(1)'">${cat.icon}</div>
                                <span class="text-indigo-400" style="font-size: 0.75rem; letter-spacing: 0.1em; font-weight: 600; text-transform: uppercase;">Live Price</span>
                            </div>
                            <h3 class="card-title">${cat.name}</h3>
                            <div style="display: flex; align-items: baseline; gap: 0.5rem;">
                                <span class="card-price">Rs. ${cat.priceRange}</span>
                                <span class="text-slate-500">/ kg</span>
                            </div>
                            <p class="text-small mt-4">Based on global market averages and local industrial demand.</p>
                        </div>
                    `).join('')}
                </div>
            </section>

            <!-- HOW IT WORKS SECTION -->
            <section class="how-it-works mb-12">
                <div class="section-header">
                    <h2>The Scrappy Journey</h2>
                </div>
                <div class="steps-grid">
                    <div class="step-item">
                        <div class="step-number">01</div>
                        <div class="step-icon">📦</div>
                        <h3 class="step-title">List Your Scrap</h3>
                        <p class="step-desc">Upload photos and estimate weight. Dealers get notified instantly.</p>
                    </div>
                    <div class="step-item">
                        <div class="step-number">02</div>
                        <div class="step-icon">⚖️</div>
                        <h3 class="step-title">Review Bids</h3>
                        <p class="step-desc">Local dealers offer their best prices. You choose who to sell to.</p>
                    </div>
                    <div class="step-item">
                        <div class="step-number">03</div>
                        <div class="step-icon">🚛</div>
                        <h3 class="step-title">Secure Pickup</h3>
                        <p class="step-desc">The dealer arrives at your door, weighs the scrap, and pays you.</p>
                    </div>
                </div>
            </section>
        </div>
    `;
}

function renderSellerDashboard() {
    return `
        <div class="container animate-slide-in">
            <div class="dashboard">
                <!-- LEFT: NEW REQUEST FORM -->
                <div>
                    <div class="card glass-panel sticky-top-28">
                        <h2 style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 2rem;">
                            <span style="width: 2.5rem; height: 2.5rem; border-radius: 0.75rem; background-color: #4f46e5; display: flex; align-items: center; justify-content: center; font-size: 1.25rem;">📝</span>
                            Post New Scrap
                        </h2>
                        
                        <form onsubmit="handleAddRequest(event)" id="scrapForm">
                            <div class="form-group">
                                <label>Category</label>
                                <select name="category" required>
                                    ${SCRAP_CATEGORIES.map(c => `<option value="${c.id}">${c.icon} ${c.name}</option>`).join('')}
                                </select>
                            </div>
                            
                            <div class="form-group-inline">
                                <div class="form-group">
                                    <label>Weight (kg)</label>
                                    <input name="weight" type="number" step="0.1" required placeholder="50">
                                </div>
                                <div class="form-group">
                                    <label>Photo</label>
                                    <div style="position: relative; height: 60px;">
                                        ${appState.previewImage ? `
                                            <div style="position: relative; height: 100%; width: 100%; border-radius: 0.75rem; overflow: hidden; border: 2px solid #4f46e5;">
                                                <img src="${appState.previewImage}" style="height: 100%; width: 100%; object-fit: cover;">
                                                <button type="button" onclick="handleRemoveImage()" style="position: absolute; inset: 0; background-color: rgba(0, 0, 0, 0.6); color: white; border: none; font-weight: 700; cursor: pointer; font-size: 1rem;">✕ Remove</button>
                                            </div>
                                        ` : `
                                            <input type="file" name="image" accept="image/*" onchange="handleAddImagePreview(this.files[0])" style="position: absolute; inset: 0; opacity: 0; cursor: pointer; z-index: 10;">
                                            <div style="position: absolute; inset: 0; border: 2px dashed #334155; border-radius: 0.75rem; display: flex; align-items: center; justify-content: center; cursor: pointer; background-color: rgba(30, 41, 59, 0.7); transition: border 0.3s;" onmouseover="this.style.borderColor='#4f46e5'" onmouseout="this.style.borderColor='#334155'">
                                                <span style="color: #64748b; font-weight: 600;">📷</span>
                                            </div>
                                        `}
                                    </div>
                                </div>
                            </div>
                            
                            <div class="form-group">
                                <label>Location</label>
                                <input name="location" type="text" required placeholder="Your city or area">
                            </div>
                            
                            <button type="submit" class="btn btn-primary w-full" style="width: 100%; position: relative;">
                                ${appState.isSubmitting ? `
                                    <span style="display: inline-block; width: 1.25rem; height: 1.25rem; border: 2px solid rgba(255,255,255,0.3); border-top-color: white; border-radius: 50%; animation: spin 1s linear infinite; margin-right: 0.5rem;"></span> Posting...
                                ` : 'Submit Listing'}
                            </button>
                        </form>
                    </div>
                </div>

                <!-- RIGHT: REQUESTS LIST -->
                <div>
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
                        <div>
                            <h2>Your Workspace</h2>
                            <p class="text-slate-400" style="margin-top: 0.5rem;">Manage your scrap listings and review dealer offers.</p>
                        </div>
                        <div class="card-badge" style="padding: 0.5rem 1rem;">${appState.requests.length} Active Listings</div>
                    </div>
                    
                    ${appState.requests.length === 0 ? `
                        <div style="text-align: center; padding: 3rem; color: #94a3b8;">
                            <p style="font-size: 1.125rem;">No scrap requests yet. Create one to get started!</p>
                        </div>
                    ` : `
                        <div style="display: grid; grid-template-columns: 1fr; gap: 1.5rem;">
                            ${appState.requests.map(req => `
                                <div class="request-card" style="display: flex; flex-direction: column; gap: 1rem;">
                                    <div style="display: flex; align-items: center; gap: 2rem;">
                                        <div class="request-image">${req.imageUrl ? `<img src="${req.imageUrl}" style="width: 100%; height: 100%; object-fit: cover;">` : getCategoryIcon(req.category)}</div>
                                        <div style="flex-grow: 1;">
                                            <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.5rem;">
                                                <h3 style="font-size: 1.5rem; font-weight: 900; color: white; text-transform: capitalize;">${req.category} Scrap</h3>
                                                <span style="padding: 0.25rem 0.75rem; border-radius: 9999px; font-size: 0.625rem; font-weight: 900; text-transform: uppercase; letter-spacing: 0.1em; ${req.status === 'pending' ? 'background-color: rgba(217, 119, 6, 0.1); color: #d97706;' : 'background-color: rgba(16, 185, 129, 0.1); color: #10b981;'}">${req.status}</span>
                                            </div>
                                            <p style="color: #cbd5e1; font-weight: 500; margin-bottom: 0.75rem;">${req.weight}kg available for collection</p>
                                            <div style="display: flex; align-items: center; gap: 0.5rem; color: #64748b; font-size: 0.875rem; margin-bottom: 1rem;">
                                                <span style="color: #a5b4fc;">📍</span> ${req.location}
                                            </div>
                                            ${req.currentBid ? `
                                                <div style="padding: 0.75rem; background-color: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.2); border-radius: 0.75rem; margin-bottom: 1rem;">
                                                    <span style="color: #4ade80; font-weight: 700;">Latest Bid: Rs. ${req.currentBid}/kg</span>
                                                </div>
                                            ` : ''}
                                        </div>
                                    </div>
                                    <button class="btn btn-secondary" style="width: 100%;" onclick="handleShowViewBids('${req.id}')">View Offers</button>
                                </div>
                            `).join('')}
                        </div>
                    `}
                </div>
            </div>

            <!-- BIDS MODAL -->
            ${appState.showBids && appState.activeRequest ? `
                <div class="modal active">
                    <div class="modal-content" style="max-width: 50rem;">
                        <div class="modal-header">
                            <div style="display: flex; align-items: center; gap: 1.5rem;">
                                <div style="width: 4rem; height: 4rem; background-color: rgba(79, 70, 229, 0.2); border-radius: 1rem; display: flex; align-items: center; justify-content: center; font-size: 1.875rem;">
                                    ${getCategoryIcon(appState.activeRequest.category)}
                                </div>
                                <div>
                                    <h3 style="font-size: 1.875rem; font-weight: 900; color: white;">Active Bids</h3>
                                    <p class="text-slate-400" style="font-weight: 600;">${appState.activeRequest.weight}kg • ${appState.activeRequest.location}</p>
                                </div>
                            </div>
                            <button class="modal-close" onclick="handleCloseBids()">✕</button>
                        </div>
                        
                        <div style="max-height: 60vh; overflow-y: auto;">
                            ${MOCK_BIDS.map((bid) => `
                                <div style="background: rgba(16, 185, 129, 0.05); border: 1px solid rgba(16, 185, 129, 0.2); border-radius: 1.875rem; padding: 2rem; margin-bottom: 1.5rem; display: flex; flex-direction: column; gap: 1rem;">
                                    <div style="display: flex; justify-content: space-between; align-items: start;">
                                        <div>
                                            <h4 style="font-size: 1.25rem; font-weight: 900; color: white;">${bid.dealerName}</h4>
                                            <p style="color: #64748b; font-size: 0.875rem; font-weight: 900; margin-top: 0.25rem;">☎️ ${bid.phone}</p>
                                            <div style="display: flex; align-items: center; gap: 1rem; margin-top: 0.5rem;">
                                                <span style="font-size: 1.5rem; font-weight: 900; color: #4ade80;">Rs. ${bid.pricePerKg}/kg</span>
                                                <span style="background-color: rgba(255,255,255,0.05); padding: 0.25rem 0.5rem; border-radius: 0.25rem; color: #cbd5e1; font-weight: 700;">⭐ ${bid.rating}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <p style="font-size: 0.875rem; color: #64748b; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em;">Pickup: ${bid.pickupDate}</p>
                                    <button class="btn btn-primary" onclick="handleAcceptBid('${bid.id}')">Accept Deal</button>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            ` : ''}
        </div>
    `;
}

function calculateStats() {
    let weight = 0;
    let cost = 0;
    appState.selectedDealers.forEach(id => {
        const d = DEMO_SMALL_DEALERS.find(item => item.id === id);
        if (d) {
            weight += d.weight;
            cost += d.weight * d.pricePerKg;
        }
    });
    const revenue = weight * 180;
    const profit = revenue - cost;
    return { weight, cost, revenue, profit };
}

function renderDealerDashboard() {
    const stats = calculateStats();
    
    return `
        <div class="container animate-slide-in" style="padding-bottom: 6rem;">
            <!-- B2C SECTION -->
            <section style="margin-bottom: 6rem;">
                <div style="display: grid; grid-template-columns: 1fr; gap: 1.5rem; margin-bottom: 3rem;">
                    <div>
                        <h2>Market Opportunities</h2>
                        <p class="text-slate-400" style="margin-top: 0.5rem; font-size: 1.125rem;">Direct acquisition channel for individual household scrap collection.</p>
                    </div>
                    <div style="display: flex; gap: 1rem;">
                        <span style="padding: 0.5rem 1.25rem; background-color: rgba(99, 102, 241, 0.1); border: 1px solid rgba(99, 102, 241, 0.3); border-radius: 9999px; color: #a5b4fc; font-weight: 700; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.1em;">Near You</span>
                        <span style="padding: 0.5rem 1.25rem; background-color: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 9999px; color: #4ade80; font-weight: 700; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.1em;">Verified Sellers</span>
                    </div>
                </div>

                <div class="grid grid-cols-1 grid-cols-2 grid-cols-3 gap-8">
                    ${appState.requests.map(req => `
                        <div class="request-card">
                            <div class="request-header">
                                <span class="request-category">${req.category}</span>
                                <span class="request-status">Active</span>
                            </div>
                            
                            <div style="display: flex; gap: 1.5rem; margin-bottom: 2rem; align-items: center;">
                                <div class="request-image">${getCategoryIcon(req.category)}</div>
                                <div>
                                    <div style="color: #cbd5e1; font-size: 0.875rem; margin-bottom: 0.25rem;">${req.location}</div>
                                    <div style="font-size: 2rem; font-weight: 900; color: white;">${req.weight}<span style="font-size: 1rem; color: #94a3b8; margin-left: 0.5rem;">kg</span></div>
                                </div>
                            </div>
                            
                            ${req.status === 'bidded' ? `
                                <div style="width: 100%; padding: 1.25rem; background-color: #1e293b; color: #a5b4fc; border-radius: 1rem; font-weight: 900; text-align: center; border: 1px solid rgba(99, 102, 241, 0.2);">
                                    BID SENT: Rs. ${req.currentBid}/kg
                                </div>
                            ` : `
                                <button class="btn btn-primary w-full" style="width: 100%;" onclick="handleOpenBiddingModal('${req.id}')">Submit Price Bid</button>
                            `}
                        </div>
                    `).join('')}
                </div>
            </section>

            <!-- B2C BIDDING MODAL -->
            ${appState.isBiddingModalOpen && appState.activeBiddingRequest ? `
                <div class="modal active">
                    <div class="modal-content" style="max-width: 30rem;">
                        <h3 style="font-size: 1.875rem; font-weight: 900; color: white; margin-bottom: 0.5rem;">Place Your Bid</h3>
                        <p class="text-slate-400" style="font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; font-size: 0.875rem; margin-bottom: 2rem;">Target: ${appState.activeBiddingRequest.category} (${appState.activeBiddingRequest.weight}kg)</p>
                        
                        <form onsubmit="handleSubmitBid(event)" style="display: flex; flex-direction: column; gap: 2rem;">
                            <div class="form-group">
                                <label>Your Rate (PKR/kg)</label>
                                <div style="position: relative;">
                                    <span style="position: absolute; left: 1.5rem; top: 50%; transform: translateY(-50%); color: #64748b; font-size: 1.5rem; font-weight: 900;">Rs.</span>
                                    <input 
                                        name="bidPrice" 
                                        type="number" 
                                        required 
                                        placeholder="0.00" 
                                        style="width: 100%; background-color: #1e293b; border: 2px solid #334155; border-radius: 1rem; padding: 1.5rem; padding-left: 4rem; color: white; font-size: 1.875rem; font-weight: 900; outline: none; transition: all 0.3s;"
                                        onfocus="this.style.borderColor='#4f46e5'; this.style.boxShadow='0 0 0 2px rgba(79, 70, 229, 0.1)'"
                                        onblur="this.style.borderColor='#334155'; this.style.boxShadow='none'"
                                    />
                                </div>
                            </div>
                            <div class="form-group">
                                <label>Collection Schedule</label>
                                <input name="pickupDate" type="date" required style="width: 100%; background-color: #1e293b; border: 1px solid #334155; border-radius: 0.75rem; padding: 1rem; color: white; font-weight: 700; outline: none; font-family: 'Plus Jakarta Sans', sans-serif;" />
                            </div>
                            
                            <div style="display: flex; gap: 1rem;">
                                <button 
                                    type="button" 
                                    onclick="handleCloseBiddingModal()"
                                    style="flex: 1; padding: 1.25rem; background-color: #334155; color: #cbd5e1; border: none; border-radius: 1rem; font-weight: 900; cursor: pointer; transition: all 0.3s;"
                                    onmouseover="this.style.backgroundColor='#475569'"
                                    onmouseout="this.style.backgroundColor='#334155'"
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit" 
                                    class="btn btn-primary"
                                    style="flex: 1.5; padding: 1.25rem;"
                                >
                                    Send Proposal
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            ` : ''}

            <!-- B2B SECTION -->
            <section style="background: rgba(99, 102, 241, 0.05); padding: 3rem; border-radius: 4rem; border: 1px solid rgba(99, 102, 241, 0.1);">
                <div style="margin-bottom: 4rem;">
                    <h2>Bulk Sale to Large Dealers</h2>
                    <p class="text-slate-400" style="margin-top: 0.5rem; font-size: 1.125rem;">Consolidate inventory from multiple small dealers and sell bulk quantities directly to large scrap traders in Lahore.</p>
                </div>

                <div class="grid grid-cols-1" style="grid-template-columns: 2fr 1fr; gap: 4rem;">
                    <!-- LIST OF SMALL DEALERS -->
                    <div>
                        <h3 style="font-size: 1.25rem; font-weight: 900; color: #cbd5e1; margin-bottom: 1.5rem;">Available Inventory Lots</h3>
                        <div class="grid grid-cols-1 grid-cols-2 gap-6">
                            ${DEMO_SMALL_DEALERS.map(sd => `
                                <div 
                                    onclick="handleToggleDealer('${sd.id}')"
                                    style="padding: 2rem; border-radius: 1.875rem; border: 2px solid ${appState.selectedDealers.includes(sd.id) ? '#10b981' : '#334155'}; background-color: ${appState.selectedDealers.includes(sd.id) ? 'rgba(16, 185, 129, 0.1)' : 'rgba(30, 41, 59, 0.7)'}; cursor: pointer;"
                                >
                                    <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 1.5rem;">
                                        <div>
                                            <h4 style="font-size: 1.125rem; font-weight: 900; color: white;">${sd.name}</h4>
                                            <p style="color: #64748b; font-size: 0.75rem; text-transform: uppercase; font-weight: 900; letter-spacing: 0.05em; margin-top: 0.5rem;">${sd.location}</p>
                                        </div>
                                        ${appState.selectedDealers.includes(sd.id) ? `
                                            <div style="width: 2rem; height: 2rem; border-radius: 50%; background-color: #10b981; display: flex; align-items: center; justify-content: center; color: white; font-weight: 900; font-size: 1.25rem;">✓</div>
                                        ` : `
                                            <div style="width: 2rem; height: 2rem; border-radius: 50%; border: 2px solid #334155;"></div>
                                        `}
                                    </div>
                                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; font-size: 0.875rem;">
                                        <div><span style="color: #64748b; font-weight: 900; text-transform: uppercase; font-size: 0.625rem; display: block; margin-bottom: 0.25rem;">Stock Type</span> <span style="color: white; font-weight: 900;">${sd.scrapType}</span></div>
                                        <div><span style="color: #64748b; font-weight: 900; text-transform: uppercase; font-size: 0.625rem; display: block; margin-bottom: 0.25rem;">Net Weight</span> <span style="color: white; font-weight: 900;">${sd.weight}kg</span></div>
                                        <div><span style="color: #64748b; font-weight: 900; text-transform: uppercase; font-size: 0.625rem; display: block; margin-bottom: 0.25rem;">Asking Rate</span> <span style="color: white; font-weight: 900;">Rs. ${sd.pricePerKg}</span></div>
                                        <div><span style="color: #64748b; font-weight: 900; text-transform: uppercase; font-size: 0.625rem; display: block; margin-bottom: 0.25rem;">Phone</span> <span style="color: white; font-weight: 900;">${sd.phone}</span></div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <!-- SUMMARY & BIG DEALERS -->
                    <div>
                        <div class="card glass-panel sticky-top-28" style="border: 1px solid rgba(99, 102, 241, 0.4); background-color: rgba(99, 102, 241, 0.05);">
                            <h3 style="font-size: 1.5rem; font-weight: 900; color: white; margin-bottom: 2rem; text-align: center; text-transform: uppercase; letter-spacing: 0.05em;">Profit Optimizer</h3>
                            
                            <div style="display: flex; flex-direction: column; gap: 1.5rem; margin-bottom: 3rem;">
                                <div style="display: flex; justify-content: space-between; align-items: center; padding: 1.25rem; background-color: #1e293b; border-radius: 1.5rem; border: 1px solid #334155;">
                                    <span style="color: #64748b; font-weight: 700; text-transform: uppercase; font-size: 0.75rem;">Bulk Weight</span>
                                    <span style="font-size: 1.875rem; font-weight: 900; color: white;">${stats.weight} <small style="font-size: 0.75rem; font-weight: 400; color: #64748b; text-transform: uppercase;">kg</small></span>
                                </div>
                                <div style="display: flex; justify-content: space-between; align-items: center; padding: 0 1.25rem;">
                                    <span style="color: #64748b; font-weight: 700; text-transform: uppercase; font-size: 0.75rem; letter-spacing: 0.05em;">Total Cost</span>
                                    <span style="color: #f87171; font-weight: 900;">Rs. ${Math.floor(stats.cost).toLocaleString()}</span>
                                </div>
                                <div style="display: flex; justify-content: space-between; align-items: center; padding: 0 1.25rem;">
                                    <span style="color: #64748b; font-weight: 700; text-transform: uppercase; font-size: 0.75rem; letter-spacing: 0.05em;">Est. Revenue</span>
                                    <span style="color: #a5b4fc; font-weight: 900;">Rs. ${Math.floor(stats.revenue).toLocaleString()}</span>
                                </div>
                                <div style="padding: 2rem; background-color: rgba(16, 185, 129, 0.1); border-radius: 2rem; border: 1px solid rgba(16, 185, 129, 0.3); text-align: center;">
                                    <span style="color: #4ade80; font-weight: 900; text-transform: uppercase; letter-spacing: 0.05em; font-size: 0.625rem; display: block; margin-bottom: 0.5rem;">Projected Gross Profit</span>
                                    <span style="font-size: 3rem; font-weight: 900; color: #4ade80;">Rs. ${Math.floor(stats.profit).toLocaleString()}</span>
                                </div>
                            </div>

                            <button 
                                onclick="appState.isBigDealerModalOpen = true; render();"
                                ${appState.selectedDealers.length === 0 ? 'disabled' : ''}
                                style="width: 100%; padding: 1.5rem; border-radius: 2rem; font-weight: 900; font-size: 1.125rem; border: none; cursor: ${appState.selectedDealers.length > 0 ? 'pointer' : 'not-allowed'}; transition: all 0.3s; ${appState.selectedDealers.length > 0 ? 'background-color: #10b981; color: white; box-shadow: 0 0 30px rgba(16, 185, 129, 0.3);' : 'background-color: #334155; color: #64748b; opacity: 0.5;'}"
                            >
                                Sell to Large Dealers
                            </button>
                            
                            ${appState.selectedDealers.length === 0 ? `
                                <p style="color: #64748b; font-size: 0.75rem; text-align: center; margin-top: 1.5rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; animation: pulse 2s infinite;">Select lots to begin</p>
                            ` : ''}
                        </div>
                    </div>
                </div>
            </section>

            <!-- LARGE LOCAL DEALERS MODAL -->
            ${appState.isBigDealerModalOpen ? `
                <div class="modal active" style="z-index: 400;">
                    <div class="modal-content" style="max-width: 70rem; max-height: 85vh;">
                        <div style="padding: 3rem; border-bottom: 1px solid rgba(255,255,255,0.1); background-color: rgba(99, 102, 241, 0.1); display: flex; justify-content: space-between; align-items: center;">
                            <div>
                                <h3 style="font-size: 3rem; font-weight: 900; color: white; text-transform: uppercase; letter-spacing: -0.025em; line-height: 1;">Bulk Traders</h3>
                                <p style="color: #a5b4fc; font-weight: 900; margin-top: 0.75rem; letter-spacing: 0.3em; text-transform: uppercase; font-size: 0.875rem;">Large Local Scrap Dealers in Lahore</p>
                            </div>
                            <button onclick="appState.isBigDealerModalOpen = false; render();" style="background: none; border: none; color: #64748b; cursor: pointer; font-size: 3rem; padding: 1rem; transition: color 0.3s;" onmouseover="this.style.color='white'" onmouseout="this.style.color='#64748b'">✕</button>
                        </div>
                        
                        <div style="overflow-y: auto; padding: 3rem;">
                            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 2.5rem;">
                                ${LARGE_LOCAL_DEALERS.map((dealer) => {
                                    const isEligible = stats.weight >= dealer.minWeight;
                                    return `
                                        <div style="background: rgba(30, 41, 59, 0.7); border: 2px solid ${isEligible ? 'rgba(16, 185, 129, 0.3)' : '#334155'}; border-radius: 2rem; padding: 2.5rem; transition: all 0.3s; ${isEligible ? 'opacity: 1;' : 'opacity: 0.3; filter: grayscale(100%); cursor: not-allowed;'}">
                                            <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 2rem;">
                                                <div>
                                                    <span style="display: inline-block; padding: 0.375rem 1rem; border-radius: 9999px; background-color: #1e293b; border: 1px solid #334155; color: #64748b; font-size: 0.625rem; font-weight: 900; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 1rem;">${dealer.type}</span>
                                                    <h4 style="font-size: 1.875rem; font-weight: 900; color: white; margin-bottom: 0.5rem;">${dealer.name}</h4>
                                                    <p style="color: #a5b4fc; font-size: 0.875rem; font-weight: 900; text-transform: uppercase; letter-spacing: 0.05em;">📍 ${dealer.location}, Lahore</p>
                                                    <p style="color: #64748b; font-size: 0.875rem; font-weight: 900; margin-top: 0.5rem;">☎️ ${dealer.phone}</p>
                                                </div>
                                                <div style="text-align: right;">
                                                    <p style="color: #64748b; font-size: 0.625rem; text-transform: uppercase; font-weight: 900; letter-spacing: 0.1em; margin-bottom: 0.5rem;">Minimum Order</p>
                                                    <p style="font-size: 1.875rem; font-weight: 900; ${isEligible ? 'color: #10b981;' : 'color: #f87171;'}">${dealer.minWeight.toLocaleString()}kg+</p>
                                                </div>
                                            </div>
                                            
                                            <p style="color: #cbd5e1; font-size: 1.125rem; line-height: 1.6; margin-bottom: 2.5rem; font-style: italic;">"${dealer.description}"</p>
                                            
                                            <div style="display: flex; flex-wrap: wrap; gap: 0.75rem; margin-bottom: 3rem;">
                                                ${dealer.specialization.map(tag => `
                                                    <span style="padding: 0.5rem 1rem; border-radius: 0.75rem; background-color: rgba(99, 102, 241, 0.1); border: 1px solid rgba(99, 102, 241, 0.3); color: #a5b4fc; font-size: 0.75rem; font-weight: 900; text-transform: uppercase; letter-spacing: 0.05em;">${tag}</span>
                                                `).join('')}
                                            </div>

                                            <button 
                                                onclick="${isEligible ? `handleSubmitBulkDeal('${dealer.name}')` : ''}"
                                                ${!isEligible ? 'disabled' : ''}
                                                style="width: 100%; padding: 1.5rem; border-radius: 2rem; font-weight: 900; font-size: 1.125rem; border: none; cursor: ${isEligible ? 'pointer' : 'not-allowed'}; transition: all 0.3s; ${isEligible ? 'background-color: #10b981; color: white; box-shadow: 0 0 30px rgba(16, 185, 129, 0.3);' : 'background-color: #334155; color: #64748b;'}"
                                            >
                                                ${isEligible ? 'CONFIRM BULK ORDER' : `NEED ${(dealer.minWeight - stats.weight).toLocaleString()}kg MORE`}
                                            </button>
                                        </div>
                                    `;
                                }).join('')}
                            </div>
                        </div>
                    </div>
                </div>
            ` : ''}
        </div>
    `;
}

// ==================== MAIN RENDER ====================

function render() {
    const root = document.getElementById('root');
    
    let mainContent = '';
    
    if (appState.activeSection === 'seller') {
        mainContent = renderSellerDashboard();
    } else if (appState.activeSection === 'dealer') {
        mainContent = renderDealerDashboard();
    } else {
        mainContent = renderHomePage();
    }
    
    const notificationHTML = appState.successMessage ? `
        <div class="notification">
            <div class="notification-icon">🚀</div>
            <p class="notification-text">${appState.successMessage}</p>
            <button class="notification-close" onclick="appState.successMessage = null; render()">✕</button>
        </div>
    ` : '';
    
    root.innerHTML = `
        ${renderNavbar()}
        <main class="min-h-screen flex flex-col">
            ${mainContent}
        </main>
        ${notificationHTML}
    `;
}

// ==================== INITIALIZATION ====================

function init() {
    // Handle hash-based routing
    const hash = window.location.hash.replace('#', '');
    if (hash === 'home' || hash === 'seller' || hash === 'dealer') {
        appState.activeSection = hash;
    }
    
    render();
    
    // Listen for hash changes
    window.addEventListener('hashchange', () => {
        const hash = window.location.hash.replace('#', '');
        if (hash === 'home' || hash === 'seller' || hash === 'dealer') {
            appState.activeSection = hash;
            render();
        }
    });
}

// Start the app
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
