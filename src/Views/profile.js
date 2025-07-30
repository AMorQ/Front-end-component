function getCurrentUser() {
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

function logoutUser() {
  localStorage.removeItem("currentUser");
  sessionStorage.removeItem("currentUser");
}

import { getUserId, updateUser, deleteUser } from "../API/userAPI.js";
import { fetchProductImages } from "../API/ApiProducts.js";

// DOM elements
const profileName = document.getElementById('profile-name');
const profileEmail = document.getElementById('profile-email');
const profileLocation = document.getElementById('profile-location');
const profileImage = document.getElementById('profile-image');
const profileContent = document.getElementById('profile-content');
const productsGrid = document.getElementById('products-grid');

// Modal elements
const editModal = document.getElementById('edit-modal');
const confirmModal = document.getElementById('confirm-modal');
const closeModalButtons = document.querySelectorAll('.close-modal');

// Form elements
const editProfileForm = document.getElementById('edit-profile-form');
const editNameInput = document.getElementById('edit-name');
const editEmailInput = document.getElementById('edit-email');
const editLocationInput = document.getElementById('edit-location');
const editError = document.getElementById('edit-error');

// Button elements
const editProfileBtn = document.getElementById('edit-profile-btn');
const deleteAccountBtn = document.getElementById('delete-account-btn');
const confirmDeleteBtn = document.getElementById('confirm-delete');
const cancelDeleteBtn = document.getElementById('cancel-delete');

// Current user state
let currentUser = null;

// Array of artisan crafts for products
const artisanCrafts = ['pottery', 'earrings', 'necklace', 'hats', 'basketry', 'wood artisan'];

// Initialize profile page
document.addEventListener('DOMContentLoaded', async () => {
  try {
    currentUser = getCurrentUser();
    console.log('Current user from storage:', currentUser);
    
    if (currentUser && currentUser.id) {
      console.log('Loading profile with ID:', currentUser.id);
      await loadProfile(currentUser.id);
    } else {
      console.log('No valid user found in storage');
      showToast('No user logged in. Redirecting to login...', 'error');
      setTimeout(() => {
        window.location.href = 'auth.html';
      }, 2000);
      return;
    }

    setupEventListeners();
  } catch (error) {
    console.error('Error initializing profile:', error);
    showToast('Error loading profile page', 'error');
  }
});

// Load user profile data
async function loadProfile(userId) {
  try {
    showLoading();
    
    console.log('Loading profile for user ID:', userId);
    
    // Fetch user data from API using the ID
    const userData = await getUserId(userId);
    console.log('User data loaded from API:', userData);
    
    // Update current user with fresh data from API
    currentUser = userData;
    
    // Update profile display with API data
    profileName.textContent = userData.userName || 'Artisan';
    profileEmail.textContent = userData.userEmail || 'No email provided';
    profileLocation.textContent = userData.location || 'Location not specified';
    
    console.log('Profile display updated');
    
    // Load profile image (face from Pexels) - consistent per user
    await loadProfileImage();
    console.log('Profile image loaded');
    
    // Hide loading BEFORE showing content
    hideLoading();
    
    // Ensure profile content is visible
    showProfileContent();
    
    // Load artisan products
    await loadArtisanProducts();
    console.log('Products loaded');
    
    console.log('Profile loading completed successfully');
    
  } catch (error) {
    console.error('Error loading profile:', error);
    hideLoading();
    
    // Show error message to user
    profileContent.innerHTML = `
      <div style="text-align: center; color: white; padding: 40px;">
        <h2>Error loading profile</h2>
        <p>There was an error loading your profile data.</p>
        <p>Error: ${error.message}</p>
        <button class="btn" onclick="window.location.reload()">Try Again</button>
      </div>
    `;
  }
}

// Show profile content after loading
function showProfileContent() {
  // Create and show action buttons if they don't exist
  if (!document.querySelector('.action-buttons')) {
    const actionButtonsHTML = `
      <div class="action-buttons">
        <button id="edit-profile-btn" class="btn">Edit Profile</button>
        <button id="delete-account-btn" class="btn btn-danger">Delete Account</button>
      </div>
    `;
    profileContent.insertAdjacentHTML('afterbegin', actionButtonsHTML);
  }
  
  // Create and show products section if it doesn't exist
  if (!document.querySelector('.products-section')) {
    const productsSectionHTML = `
      <div class="products-section">
        <h2 class="products-header">My Products</h2>
        <div id="products-grid" class="products-grid">
          <!-- Products will be loaded here -->
        </div>
      </div>
    `;
    profileContent.insertAdjacentHTML('beforeend', productsSectionHTML);
  }
  
  // Force visibility
  profileContent.style.display = 'block';
  profileContent.style.visibility = 'visible';
  profileContent.style.opacity = '1';
  
  // Re-setup event listeners after content is added
  setupEventListeners();
}

// Load profile image from Pexels (consistent face per user)
async function loadProfileImage() {
  try {
    console.log('Loading consistent profile image...');
    
    // Use user ID to generate a consistent seed for this user
    const userId = currentUser?.id || 1;
    const seed = userId % 100; // Use modulo to keep page numbers reasonable
    const pageNumber = Math.floor(seed / 20) + 1; // Convert to page number (1-5)
    const photoIndex = seed % 20; // Index within the page (0-19)
    
    const response = await fetch(`https://api.pexels.com/v1/search?query=face&per_page=20&page=${pageNumber}`, {
      headers: {
        Authorization: 'SmX8HumhMbfoqY3NfUWwTzV122LsE5BiCxtSzYnl1ARI5T33DUnSy72G'
      }
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Pexels face response:', data);
      
      if (data.photos && data.photos.length > photoIndex) {
        profileImage.src = data.photos[photoIndex].src.medium;
        console.log(`Consistent profile image set for user ${userId} (page: ${pageNumber}, index: ${photoIndex})`);
      } else if (data.photos && data.photos.length > 0) {
        // Fallback to first available photo
        profileImage.src = data.photos[0].src.medium;
        console.log('Fallback profile image set');
      } else {
        console.log('No face photos found, using placeholder');
        profileImage.src = 'https://via.placeholder.com/180x180?text=Profile';
      }
    } else {
      console.log('Pexels API response not ok:', response.status);
      profileImage.src = 'https://via.placeholder.com/180x180?text=Profile';
    }
  } catch (error) {
    console.error('Error loading profile image:', error);
    profileImage.src = 'https://via.placeholder.com/180x180?text=Profile';
  }
}

// Load artisan products
async function loadArtisanProducts() {
  try {
    console.log('Loading artisan products...');
    
    // Get the products grid element (might be newly created)
    const productsGridElement = document.getElementById('products-grid');
    if (!productsGridElement) {
      console.error('Products grid element not found');
      return;
    }
    
    // Randomly select one craft type for this artisan
    const selectedCraft = artisanCrafts[Math.floor(Math.random() * artisanCrafts.length)];
    console.log('Selected craft:', selectedCraft);
    
    // Fetch 4 products of the selected craft
    const products = await fetchProductImages(selectedCraft, 4);
    console.log('Products fetched:', products);
    
    if (products && products.length > 0) {
      renderProducts(products, productsGridElement);
      console.log('Products rendered successfully');
    } else {
      console.log('No products found, showing message');
      productsGridElement.innerHTML = '<p style="color: white; text-align: center; grid-column: 1/-1;">No products available</p>';
    }
  } catch (error) {
    console.error('Error loading products:', error);
    const productsGridElement = document.getElementById('products-grid');
    if (productsGridElement) {
      productsGridElement.innerHTML = '<p style="color: white; text-align: center; grid-column: 1/-1;">Error loading products</p>';
    }
  }
}

// Render products in grid
function renderProducts(products, gridElement) {
  if (!gridElement) return;
  
  gridElement.innerHTML = '';
  
  products.forEach(product => {
    const productCard = document.createElement('div');
    productCard.className = 'product-card';
    
    productCard.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <h3 class="name">${product.name}</h3>
      <p class="description">${product.description}</p>
      <strong class="price">$${product.price}</strong>
    `;
    
    // Add click event to go to product details
    productCard.addEventListener('click', () => {
      localStorage.setItem('selectedProduct', JSON.stringify(product));
      window.location.href = 'detailsProduct.html';
    });
    
    gridElement.appendChild(productCard);
  });
}

// Setup event listeners
function setupEventListeners() {
  // Get elements after they might have been recreated
  const editBtn = document.getElementById('edit-profile-btn');
  const deleteBtn = document.getElementById('delete-account-btn');
  
  if (editBtn && !editBtn.hasAttribute('data-listener')) {
    editBtn.addEventListener('click', openEditModal);
    editBtn.setAttribute('data-listener', 'true');
  }
  
  if (deleteBtn && !deleteBtn.hasAttribute('data-listener')) {
    deleteBtn.addEventListener('click', openConfirmModal);
    deleteBtn.setAttribute('data-listener', 'true');
  }
  
  // Modal close buttons
  closeModalButtons.forEach(button => {
    if (!button.hasAttribute('data-listener')) {
      button.addEventListener('click', closeModals);
      button.setAttribute('data-listener', 'true');
    }
  });
  
  // Edit profile form
  if (editProfileForm && !editProfileForm.hasAttribute('data-listener')) {
    editProfileForm.addEventListener('submit', handleEditProfile);
    editProfileForm.setAttribute('data-listener', 'true');
  }
  
  // Confirm delete buttons
  if (confirmDeleteBtn && !confirmDeleteBtn.hasAttribute('data-listener')) {
    confirmDeleteBtn.addEventListener('click', handleDeleteAccount);
    confirmDeleteBtn.setAttribute('data-listener', 'true');
  }
  
  if (cancelDeleteBtn && !cancelDeleteBtn.hasAttribute('data-listener')) {
    cancelDeleteBtn.addEventListener('click', closeModals);
    cancelDeleteBtn.setAttribute('data-listener', 'true');
  }
  
  // Close modals when clicking outside (only set once)
  if (!window.hasAttribute || !window.hasAttribute('data-modal-listener')) {
    window.addEventListener('click', (event) => {
      if (event.target === editModal || event.target === confirmModal) {
        closeModals();
      }
    });
    if (window.setAttribute) window.setAttribute('data-modal-listener', 'true');
  }
}

// Open edit modal
function openEditModal() {
  if (currentUser) {
    editNameInput.value = currentUser.userName || '';
    editEmailInput.value = currentUser.userEmail || '';
    editLocationInput.value = currentUser.location || '';
    editError.classList.remove('show');
    editModal.classList.add('active');
  }
}

// Open confirmation modal
function openConfirmModal() {
  confirmModal.classList.add('active');
}

// Close all modals
function closeModals() {
  editModal.classList.remove('active');
  confirmModal.classList.remove('active');
}

// Handle edit profile form submission
async function handleEditProfile(event) {
  event.preventDefault();
  
  const userName = editNameInput.value.trim();
  const userEmail = editEmailInput.value.trim();
  const location = editLocationInput.value.trim();
  
  // Validate inputs
  if (!validateProfileData(userName, userEmail)) {
    return;
  }
  
  try {
    // Update user data
    const updatedUserData = {
      ...currentUser,
      userName,
      userEmail,
      location
    };
    
    await updateUser(currentUser.id, updatedUserData);
    
    // Update current user in storage
    if (localStorage.getItem('currentUser')) {
      localStorage.setItem('currentUser', JSON.stringify(updatedUserData));
    } else {
      sessionStorage.setItem('currentUser', JSON.stringify(updatedUserData));
    }
    
    currentUser = updatedUserData;
    
    // Update display
    profileName.textContent = userName;
    profileEmail.textContent = userEmail;
    profileLocation.textContent = location;
    
    closeModals();
    showToast('Profile updated successfully!');
    
  } catch (error) {
    console.error('Error updating profile:', error);
    showError('Failed to update profile. Please try again.');
  }
}

// Validate profile data
function validateProfileData(userName, userEmail) {
  editError.classList.remove('show');
  
  // Validate userName
  if (userName.length < 3 || userName.length > 15) {
    showError('Name must be between 3 and 15 characters long');
    return false;
  }
  
  // Validate email
  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,4})+$/;
  if (!emailRegex.test(userEmail)) {
    showError('Invalid email format. Example: user@example.com');
    return false;
  }
  
  return true;
}

// Handle delete account
async function handleDeleteAccount() {
  try {
    // Delete user from API
    await deleteUser(currentUser.id);
    
    // Logout and clear storage
    logoutUser();
    
    closeModals();
    showToast('Account deleted successfully!');
    
    // Redirect to home after a delay
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 2000);
    
  } catch (error) {
    console.error('Error deleting account:', error);
    showToast('Failed to delete account. Please try again.', 'error');
  }
}

// Show loading state
function showLoading() {
  profileContent.innerHTML = '<div class="loading">Loading profile...</div>';
}

// Hide loading state
function hideLoading() {
  const loading = document.querySelector('.loading');
  if (loading) {
    loading.remove();
  }
}

// Show error in edit form
function showError(message) {
  editError.textContent = message;
  editError.classList.add('show');
}

// Show toast notification
function showToast(message, type = 'success') {
  // Remove existing toasts
  const existingToasts = document.querySelectorAll('.toast');
  existingToasts.forEach(toast => toast.remove());
  
  // Create new toast
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  
  document.body.appendChild(toast);
  
  // Show toast
  setTimeout(() => {
    toast.classList.add('show');
  }, 100);
  
  // Remove toast after 3 seconds
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 400);
  }, 3000);
}