export function injectNavbar() {
  const navbarHTML = `
    <nav id="navbar">
      <div class="navbar-container">
        <!-- Logo -->
        <div class="navbar-logo">
          <img src="/navbar/LOGO3.png" alt="Logo" />
        </div>
        
        <!-- Mobile hamburger button -->
        <button class="hamburger-btn" id="hamburgerBtn" aria-label="Toggle menu">
          <span class="hamburger-line"></span>
          <span class="hamburger-line"></span>
          <span class="hamburger-line"></span>
        </button>
        
        <!-- Mobile menu overlay -->
        <div class="mobile-menu-overlay" id="mobileMenuOverlay"></div>
        
        <!-- Mobile menu -->
        <div class="mobile-menu" id="mobileMenu">
          <div class="mobile-menu-content">
            <a href="index.html" class="mobile-menu-item">
              <svg class="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                <polyline points="9,22 9,12 15,12 15,22"/>
              </svg>
              Home
            </a>
            <a href="product.html" class="mobile-menu-item">
              <svg class="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="m7.5 4.27 9 5.15"/>
                <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/>
                <path d="m3.3 7 8.7 5 8.7-5"/>
                <path d="M12 22V12"/>
              </svg>
              Products
            </a>
            <a href="contact.html" class="mobile-menu-item">
              <svg class="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              Contact
            </a>
            <a href="profile.html" class="mobile-menu-item">
              <svg class="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
              Profile
            </a>
            <a href="auth.html" class="mobile-menu-item" id="mobile-auth-item">
              <svg class="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
                <polyline points="10,17 15,12 10,7"/>
                <line x1="15" y1="12" x2="3" y2="12"/>
              </svg>
              Authentication
            </a>
            <a href="#" class="mobile-menu-item">
              <svg class="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="8" cy="21" r="1"/>
                <circle cx="19" cy="21" r="1"/>
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57L20.42 9H5.12"/>
              </svg>
              Cart
            </a>
          </div>
        </div>
        
        <!-- Desktop navigation icons -->
        <div class="navbar-icons">
          <a href="index.html" class="nav-icon" aria-label="Home">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9,22 9,12 15,12 15,22"/>
            </svg>
          </a>
          <a href="product.html" class="nav-icon" aria-label="Products">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="m7.5 4.27 9 5.15"/>
              <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/>
              <path d="m3.3 7 8.7 5 8.7-5"/>
              <path d="M12 22V12"/>
            </svg>
          </a>
          <a href="contact.html" class="nav-icon" aria-label="Contact">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
          </a>
          <a href="profile.html" class="nav-icon" aria-label="Profile">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
          </a>
          <a href="auth.html" class="nav-icon" aria-label="Authentication" id="desktop-auth-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
              <polyline points="10,17 15,12 10,7"/>
              <line x1="15" y1="12" x2="3" y2="12"/>
            </svg>
          </a>
          <a href="#" class="nav-icon cart-icon" aria-label="Cart">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="8" cy="21" r="1"/>
              <circle cx="19" cy="21" r="1"/>
              <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57L20.42 9H5.12"/>
            </svg>
          </a>
        </div>
      </div>
    </nav>
  `;

  const navbarContainer = document.createElement('div');
  navbarContainer.innerHTML = navbarHTML;
  document.body.insertBefore(navbarContainer, document.body.firstChild);
  
  initializeMobileMenu();
  setTimeout(() => {
    updateNavbarForUser();
  }, 100);
}

function initializeMobileMenu() {
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
  
  if (!hamburgerBtn || !mobileMenu || !mobileMenuOverlay) {
    console.error('Mobile menu elements not found');
    return;
  }
  
  function toggleMobileMenu() {
    const isOpen = mobileMenu.classList.contains('active');
    
    if (isOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  }
  
  function openMobileMenu() {
    mobileMenu.classList.add('active');
    mobileMenuOverlay.classList.add('active');
    hamburgerBtn.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  
  function closeMobileMenu() {
    mobileMenu.classList.remove('active');
    mobileMenuOverlay.classList.remove('active');
    hamburgerBtn.classList.remove('active');
    document.body.style.overflow = '';
  }
  
  hamburgerBtn.addEventListener('click', toggleMobileMenu);
  mobileMenuOverlay.addEventListener('click', closeMobileMenu);
  
  const mobileMenuItems = document.querySelectorAll('.mobile-menu-item');
  mobileMenuItems.forEach(item => {
    item.addEventListener('click', closeMobileMenu);
  });
  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
      closeMobileMenu();
    }
  });
  
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768 && mobileMenu.classList.contains('active')) {
      closeMobileMenu();
    }
  });
}
// Function to get current user without import
function getCurrentUserLocal() {
  const userFromLocal = localStorage.getItem("currentUser");
  if (userFromLocal) {
    return JSON.parse(userFromLocal);
  }
  
  const userFromSession = sessionStorage.getItem("currentUser");
  if (userFromSession) {
    return JSON.parse(userFromSession);
  }
  
  return null;
}
// Function to logout user without import
function logoutUserLocal() {
  localStorage.removeItem("currentUser");
  sessionStorage.removeItem("currentUser");
}
// Function to update navbar based on user login status
function updateNavbarForUser() {
  const currentUser = getCurrentUserLocal();
  
  if (currentUser) {
    // Update desktop auth icon
    const desktopAuthIcon = document.getElementById('desktop-auth-icon');
    if (desktopAuthIcon) {
      desktopAuthIcon.setAttribute('href', '#');
      desktopAuthIcon.setAttribute('aria-label', 'Logout');
      desktopAuthIcon.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
          <polyline points="16,17 21,12 16,7"/>
          <line x1="21" y1="12" x2="9" y2="12"/>
        </svg>
      `;
      desktopAuthIcon.addEventListener('click', handleLogout);
    }
    
    // Update mobile auth item
    const mobileAuthItem = document.getElementById('mobile-auth-item');
    if (mobileAuthItem) {
      mobileAuthItem.setAttribute('href', '#');
      mobileAuthItem.innerHTML = `
        <svg class="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
          <polyline points="16,17 21,12 16,7"/>
          <line x1="21" y1="12" x2="9" y2="12"/>
        </svg>
        Logout (${currentUser.userName})
      `;
      mobileAuthItem.addEventListener('click', handleLogout);
    }
  }
}
// Logout handler
function handleLogout(event) {
  event.preventDefault();
  
  if (confirm('Are you sure you want to logout?')) {
    logoutUserLocal();
    alert('Logged out successfully');
    window.location.href = '/index.html';
  }
}