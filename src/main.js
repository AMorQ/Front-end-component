import { fetchProductImages } from './API/ApiProducts.js';

document.addEventListener('DOMContentLoaded', async () => {
    renderHomePage();
    await loadArtistImages();

    function renderHomePage() {
        const app = document.getElementById('app');
        app.innerHTML = `
            <div class="home-container">
                <section class="section">
                    <div class="full-width-section">
                        <img src="/image/work6.png" alt="How it works" class="full-width-image">
                    </div>
                </section>
                
                <section class="section">
                    <div class="two-columns">
                        <div class="column">
                            <div class="column-content">
                                <h2 class="column-title">Find your fans</h2>
                                <p class="column-description">Do what you love for people as original as you. From Tenerife to Cincinnati, millions of users come to Nabecaral looking for something original and personal.</p>
                            </div>
                        </div>
                        <div class="column">
                            <video controls class="column-video">
                                <source src="/video/NABECARAL.mp4" type="video/mp4">
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    </div>
                </section>
                
                <section class="section">
                    <div class="two-columns">
                        <div class="column">
                            <div class="artists-grid" id="artists-grid"></div>
                            <div class="buttons-container">
                                <button class="btn" id="viewProducts">View Products</button>
                                <button class="btn" id="viewArtisans">View Artisans</button>
                            </div>
                        </div>
                        <div class="column">
                            <div class="column-content">
                                <h2 class="column-title">Join thousands of successful artists</h2>
                                <p class="column-description">Artists are at the heart of Nabecaral. Professionals, beginners, fans with great ideas all earning money on Nabecaral every day. Supportive community - Connect with other artisans and share techniques</p>
                                <button class="btn" id="startSelling2">START SELLING</button>
                            </div>
                        </div>
                    </div>
                </section>
                
                <section class="section">
                    <h2 class="section-title">Membership Levels</h2>
                    <p class="section-description">We've recently introduced different membership levels designed to incentivize and celebrate artists who consistently produce unique and exceptional work. When you sign up, we'll rank your account based on your profile and the work you upload.</p>
                    
                    <div class="membership-content">
                        <img src="/image/Membership.png" alt="Membership Levels" class="membership-image">
                        <button class="btn" id="startSelling3">START SELLING</button>
                    </div>
                </section>
            </div>
        `;
        
        setupEventListeners();
        showUserWelcome();
    }

    async function loadArtistImages() {
        try {
            const allArtists = await fetchProductImages('artist', 20);
            const artistsGrid = document.getElementById('artists-grid');
            
            if (artistsGrid && allArtists.length > 0) {
                artistsGrid.innerHTML = '';
                const shuffledArtists = [...allArtists].sort(() => 0.5 - Math.random());
                const selectedArtists = shuffledArtists.slice(0, 2);
                
                selectedArtists.forEach(artist => {
                    const card = document.createElement('div');
                    card.className = 'artist-card';
                    card.innerHTML = `<img src="${artist.image}" alt="${artist.name}" class="artist-image">`;
                    artistsGrid.appendChild(card);
                });
            }
        } catch (error) {
            console.error('Error loading artist images:', error);
            showFallbackImages();
        }
    }

    function showFallbackImages() {
        const artistsGrid = document.getElementById('artists-grid');
        if (artistsGrid) {
            const fallbackImages = [
                { image: '/slider/10.jpg', name: 'Artist 1' },
                { image: '/slider/11.jpg', name: 'Artist 2' }
            ];
            
            artistsGrid.innerHTML = '';
            fallbackImages.forEach(artist => {
                const card = document.createElement('div');
                card.className = 'artist-card';
                card.innerHTML = `<img src="${artist.image}" alt="${artist.name}" class="artist-image">`;
                artistsGrid.appendChild(card);
            });
        }
    }

    function getCurrentUser() {
        const userFromLocal = localStorage.getItem("currentUser");
        const userFromSession = sessionStorage.getItem("currentUser");
        return userFromLocal ? JSON.parse(userFromLocal) : 
               userFromSession ? JSON.parse(userFromSession) : null;
    }

    function setupEventListeners() {
        const redirectBasedOnAuth = () => {
            const user = getCurrentUser();
            window.location.href = user ? 'profile.html' : 'auth.html';
        };

        ['startSelling2', 'startSelling3'].forEach(id => {
            const button = document.getElementById(id);
            if (button) {
                button.addEventListener('click', redirectBasedOnAuth);
            }
        });

        const viewArtisansBtn = document.getElementById('viewArtisans');
        if (viewArtisansBtn) {
            viewArtisansBtn.addEventListener('click', redirectBasedOnAuth);
        }
  
        const viewProductsBtn = document.getElementById('viewProducts');
        if (viewProductsBtn) {
            viewProductsBtn.addEventListener('click', () => {
                window.location.href = 'product.html';
            });
        }
    }
    // Natallia
    function showUserWelcome() {
        const currentUser = getCurrentUser();
        
        if (currentUser) {
            const welcomeDiv = document.createElement('div');
            welcomeDiv.className = 'user-welcome';
            welcomeDiv.innerHTML = `
                <div style="
                    background: rgba(255, 255, 255, 0.9);
                    padding: 15px;
                    border-radius: 8px;
                    margin: 20px auto;
                    text-align: center;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                    max-width: 500px;
                ">
                    <h3 style="color: #003e83; margin: 0;">
                        Welcome back, ${currentUser.userName}! 👋
                    </h3>
                    <p style="color: #ffab00; margin: 5px 0 0 0;">
                        ${currentUser.artisan ? 'Artisan Account' : 'Customer Account'}
                    </p>
                </div>
            `;
            
            const homeContainer = document.querySelector('.home-container');
            if (homeContainer) {
                homeContainer.insertAdjacentElement('afterend', welcomeDiv);
            }
        }
    }
});