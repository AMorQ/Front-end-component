import { fetchProductImages } from './API/ApiProducts.js';

document.addEventListener('DOMContentLoaded', async () => {
    
    // Render home page content
    renderHomePage();
    
    // Load artist images for the artists grid
    await loadArtistImages();
    // injectFooter();

function renderHomePage() {
    const app = document.getElementById('app');
    app.innerHTML = `
        <div class="home-container">
            <!-- Sección 2: Imagen a lo ancho -->
            <section class="section">
                <div class="full-width-section">
                    <img src="/images/function.png" alt="How it works" class="full-width-image">
                    <div class="full-width-content">
                        <button class="btn" id="startSelling1">START SELLING</button>
                    </div>
                </div>
            </section>
            
            <!-- Sección 3: Dos columnas (Texto + Video) -->
            <section class="section">
                <div class="two-columns">
                    <div class="column">
                        <div class="column-content">
                            <h2 class="column-title">Find your fans</h2>
                            <p class="column-description">Do what you love for people as original as you. From Tenerife to Cincinnati, millions of users come to Nabecaral looking for something original and personal.</p>
                        </div>
                    </div>
                    <div class="column">
                        <video controls class="column-image">
                            <source src="/videos/artisan.mp4" type="video/mp4">
                            Your browser does not support the video tag.
                        </video>
                    </div>
                </div>
            </section>
            
            <!-- Sección 4: Dos columnas (Artistas + Texto) -->
            <section class="section">
                <div class="two-columns">
                    <div class="column">
                        <div class="artists-grid" id="artists-grid">
                            <!-- Artist images will be injected here -->
                        </div>
                        <button class="btn" id="viewProducts">View Products</button>
                    </div>
                    <div class="column">
                        <div class="column-content">
                            <h2 class="column-title">Join thousands of successful artists</h2>
                            <p class="column-description">Artists are at the heart of Nabecaral. Professionals, beginners, fans with great ideas—all earning money on Nabecaral every day. Here are some examples:</p>
                            <button class="btn" id="startSelling2">START SELLING</button>
                        </div>
                    </div>
                </div>
            </section>
            
            <!-- Sección 5: Membresía -->
            <section class="section">
                <h2 class="section-title">Membership Levels for a Better Platform</h2>
                <p class="section-description">We've recently introduced different membership levels designed to incentivize and celebrate artists who consistently produce unique and exceptional work. When you sign up, we'll rank your account based on your profile and the work you upload.</p>
                
                <div class="membership-content">
                    <img src="/images/Membership.png" alt="Membership Levels" class="membership-image">
                    <button class="btn" id="startSelling3">START SELLING</button>
                </div>
            </section>
        </div>
    `;
    
    // Setup event listeners
    setupEventListeners();
}

async function loadArtistImages() {
    try {
        const artists = await fetchProductImages('artist', 2);
        const artistsGrid = document.getElementById('artists-grid');
        
        if (artistsGrid) {
            artistsGrid.innerHTML = '';
            
            artists.forEach(artist => {
                const card = document.createElement('div');
                card.className = 'artist-card';
                card.innerHTML = `
                    <img src="${artist.image}" alt="${artist.name}" class="artist-image">
                `;
                artistsGrid.appendChild(card);
            });
        }
    } catch (error) {
        console.error('Error loading artist images:', error);
    }
}

function setupEventListeners() {
    // START SELLING buttons
    const setupButton = (id) => {
        const button = document.getElementById(id);
        if (button) {
            button.addEventListener('click', () => {
                window.location.href = 'auth.html';
            });
        }
    };
    
    setupButton('startSelling1');
    setupButton('startSelling2');
    setupButton('startSelling3');
    
    // View Products button
    const viewProductsBtn = document.getElementById('viewProducts');
    if (viewProductsBtn) {
        viewProductsBtn.addEventListener('click', () => {
            window.location.href = 'product.html';
        });
    }
}

});