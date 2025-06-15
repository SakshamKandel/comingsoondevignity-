// Loading Screen Controller
let loadingScreenRemoved = false;

function initializeLoadingScreen() {
    // Prevent any scrolling/interactions during loading
    document.body.style.overflow = 'hidden';
    document.body.style.pointerEvents = 'none';
    
    const loadingScreen = document.getElementById('loadingScreen');
    const progressFill = document.getElementById('progressFill');
    const loadingPercentage = document.getElementById('loadingPercentage');
    const progressLabel = document.getElementById('progressLabel');
    
    // Set random loading quote
    const loadingQuote = document.getElementById('loadingQuote');
    const quotes = [
        "Crafting digital excellence with innovative design",
        "Where creativity meets cutting-edge technology", 
        "Building tomorrow's digital experiences today",
        "Transforming ideas into digital masterpieces",
        "Innovation through design, excellence through code"
    ];
    if (loadingQuote) {
        loadingQuote.textContent = quotes[Math.floor(Math.random() * quotes.length)];
    }
    
    let progress = 0;
    let loadingInterval = null;
    
    function updateLoadingProgress() {
        if (loadingScreenRemoved) {
            if (loadingInterval) clearInterval(loadingInterval);
            return;
        }
        
        // Increment progress
        progress += 2;
        if (progress > 100) progress = 100;
        
        // Update UI elements
        if (progressFill) progressFill.style.width = progress + '%';
        if (loadingPercentage) loadingPercentage.textContent = progress + '%';
        
        // Update loading message
        if (progressLabel) {
            if (progress < 30) progressLabel.textContent = 'Loading...';
            else if (progress < 60) progressLabel.textContent = 'Almost Ready...';
            else if (progress < 90) progressLabel.textContent = 'Finalizing...';
            else progressLabel.textContent = 'Ready!';
        }
        
        // When loading completes
        if (progress >= 100) {
            if (loadingInterval) clearInterval(loadingInterval);
            
            setTimeout(() => {
                removeLoadingScreen();
            }, 500);
        }
    }
    
    // Start progress updates
    loadingInterval = setInterval(updateLoadingProgress, 50);
    
    // Failsafe: Force remove after 4 seconds maximum
    setTimeout(() => {
        if (!loadingScreenRemoved) {
            console.log('⚠️ Loading screen timeout reached, forcing removal...');
            removeLoadingScreen();
        }
    }, 4000);
}

function removeLoadingScreen() {
    if (loadingScreenRemoved) return;
    loadingScreenRemoved = true;
    
    const loadingScreen = document.getElementById('loadingScreen');
    if (!loadingScreen) {
        console.log('Loading screen already removed');
        enableInteractions();
        return;
    }
    
    // Fade out animation
    loadingScreen.style.transition = 'opacity 0.5s ease-out';
    loadingScreen.style.opacity = '0';
    
    // Remove from DOM after fade
    setTimeout(() => {
        if (loadingScreen.parentNode) {
            loadingScreen.parentNode.removeChild(loadingScreen);
        }
        enableInteractions();
        if (typeof initializeMainApp === 'function') {
            initializeMainApp();
        }
    }, 500);
}

function enableInteractions() {
    document.body.style.overflow = 'auto';
    document.body.style.pointerEvents = 'auto';
    document.body.classList.add('loaded');
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeLoadingScreen);
} else {
    initializeLoadingScreen();
} 