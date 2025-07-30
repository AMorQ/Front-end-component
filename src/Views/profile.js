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

const profileName = document.getElementById('profile-name');
const profileEmail = document.getElementById('profile-email');
const profileLocation = document.getElementById('profile-location');
const profileImage = document.getElementById('profile-image');
const profileContent = document.getElementById('profile-content');
const productsGrid = document.getElementById('products-grid');

const editModal = document.getElementById('edit-modal');
const confirmModal = document.getElementById('confirm-modal');
const closeModalButtons = document.querySelectorAll('.close-modal');

const editProfileForm = document.getElementById('edit-profile-form');
const editNameInput = document.getElementById('edit-name');
const editEmailInput = document.getElementById('edit-email');
const editLocationInput = document.getElementById('edit-location');
const editError = document.getElementById('edit-error');

const editProfileBtn = document.getElementById('edit-profile-btn');
const deleteAccountBtn = document.getElementById('delete-account-btn');
const confirmDeleteBtn = document.getElementById('confirm-delete');
const cancelDeleteBtn = document.getElementById('cancel-delete');

let currentUser = null;

const artisanCrafts = ['pottery', 'earrings', 'necklace', 'hats', 'basketry', 'wood artisan'];

document.addEventListener('DOMContentLoaded', async () => {
  try {
    currentUser = getCurrentUser();
    
    if (currentUser && currentUser.id) {
      await loadProfile(currentUser.id);
    } else {
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

async function loadProfile(userId) {
  try {
    showLoading();    
  
    const userData = await getUserId(userId);
    
    currentUser = userData;
    
    profileName.textContent = userData.userName || 'Artisan';
    profileEmail.textContent = userData.userEmail || 'No email provided';
    profileLocation.textContent = userData.location || 'Location not specified';    
  
    await loadProfileImage();    
    hideLoading();    
    showProfileContent();    
    await loadArtisanProducts();    
    
  } catch (error) {
    console.error('Error loading profile:', error);
    hideLoading();
    
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

function showProfileContent() {
  if (!document.querySelector('.action-buttons')) {
    const actionButtonsHTML = `
      <div class="action-buttons">
        <button id="edit-profile-btn" class="btn">Edit Profile</button>
        <button id="delete-account-btn" class="btn btn-danger">Delete Account</button>
      </div>
    `;
    profileContent.insertAdjacentHTML('afterbegin', actionButtonsHTML);
  }
  
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
  profileContent.style.display = 'block';
  profileContent.style.visibility = 'visible';
  profileContent.style.opacity = '1';
  
  setupEventListeners();
}

async function loadProfileImage() {
  try {    
    const userId = currentUser?.id || 1;
    const seed = userId % 100; 
    const pageNumber = Math.floor(seed / 20) + 1; 
    const photoIndex = seed % 20; 
    
    const response = await fetch(`https://api.pexels.com/v1/search?query=face&per_page=20&page=${pageNumber}`, {
      headers: {
        Authorization: 'SmX8HumhMbfoqY3NfUWwTzV122LsE5BiCxtSzYnl1ARI5T33DUnSy72G'
      }
    });

    if (response.ok) {
      const data = await response.json();    
      if (data.photos && data.photos.length > photoIndex) {
        profileImage.src = data.photos[photoIndex].src.medium;
      } else if (data.photos && data.photos.length > 0) {
        profileImage.src = data.photos[0].src.medium;
      } else {
        profileImage.src = 'https://via.placeholder.com/180x180?text=Profile';
      }
    } else {
      profileImage.src = 'https://via.placeholder.com/180x180?text=Profile';
    }
  } catch (error) {
    console.error('Error loading profile image:', error);
    profileImage.src = 'https://via.placeholder.com/180x180?text=Profile';
  }
}

async function loadArtisanProducts() {
  try {    
    const productsGridElement = document.getElementById('products-grid');
    if (!productsGridElement) {
      console.error('Products grid element not found');
      return;
    }    
    const selectedCraft = artisanCrafts[Math.floor(Math.random() * artisanCrafts.length)];    
    const products = await fetchProductImages(selectedCraft, 4);    
    if (products && products.length > 0) {
      renderProducts(products, productsGridElement);
    } else {
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
    
    productCard.addEventListener('click', () => {
      localStorage.setItem('selectedProduct', JSON.stringify(product));
      window.location.href = 'detailsProduct.html';
    });
    
    gridElement.appendChild(productCard);
  });
}

function setupEventListeners() {
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
  
  closeModalButtons.forEach(button => {
    if (!button.hasAttribute('data-listener')) {
      button.addEventListener('click', closeModals);
      button.setAttribute('data-listener', 'true');
    }
  });
  
  if (editProfileForm && !editProfileForm.hasAttribute('data-listener')) {
    editProfileForm.addEventListener('submit', handleEditProfile);
    editProfileForm.setAttribute('data-listener', 'true');
  }
  
  if (confirmDeleteBtn && !confirmDeleteBtn.hasAttribute('data-listener')) {
    confirmDeleteBtn.addEventListener('click', handleDeleteAccount);
    confirmDeleteBtn.setAttribute('data-listener', 'true');
  }
  
  if (cancelDeleteBtn && !cancelDeleteBtn.hasAttribute('data-listener')) {
    cancelDeleteBtn.addEventListener('click', closeModals);
    cancelDeleteBtn.setAttribute('data-listener', 'true');
  }
  
  if (!window.hasAttribute || !window.hasAttribute('data-modal-listener')) {
    window.addEventListener('click', (event) => {
      if (event.target === editModal || event.target === confirmModal) {
        closeModals();
      }
    });
    if (window.setAttribute) window.setAttribute('data-modal-listener', 'true');
  }
}

function openEditModal() {
  if (currentUser) {
    editNameInput.value = currentUser.userName || '';
    editEmailInput.value = currentUser.userEmail || '';
    editLocationInput.value = currentUser.location || '';
    editError.classList.remove('show');
    editModal.classList.add('active');
  }
}

function openConfirmModal() {
  confirmModal.classList.add('active');
}

function closeModals() {
  editModal.classList.remove('active');
  confirmModal.classList.remove('active');
}

async function handleEditProfile(event) {
  event.preventDefault();
  
  const userName = editNameInput.value.trim();
  const userEmail = editEmailInput.value.trim();
  const location = editLocationInput.value.trim();
  
  if (!validateProfileData(userName, userEmail)) {
    return;
  }
  
  try {
    const updatedUserData = {
      ...currentUser,
      userName,
      userEmail,
      location
    };
    
    await updateUser(currentUser.id, updatedUserData);
    
    if (localStorage.getItem('currentUser')) {
      localStorage.setItem('currentUser', JSON.stringify(updatedUserData));
    } else {
      sessionStorage.setItem('currentUser', JSON.stringify(updatedUserData));
    }
    
    currentUser = updatedUserData;
    
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

function validateProfileData(userName, userEmail) {
  editError.classList.remove('show');
  
  if (userName.length < 3 || userName.length > 15) {
    showError('Name must be between 3 and 15 characters long');
    return false;
  }
  
  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,4})+$/;
  if (!emailRegex.test(userEmail)) {
    showError('Invalid email format. Example: user@example.com');
    return false;
  }
  
  return true;
}

async function handleDeleteAccount() {
  try {
    await deleteUser(currentUser.id);
    
    logoutUser();
    
    closeModals();
    showToast('Account deleted successfully!');
    
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 2000);
    
  } catch (error) {
    console.error('Error deleting account:', error);
    showToast('Failed to delete account. Please try again.', 'error');
  }
}

function showLoading() {
  profileContent.innerHTML = '<div class="loading">Loading profile...</div>';
}

function hideLoading() {
  const loading = document.querySelector('.loading');
  if (loading) {
    loading.remove();
  }
}

function showError(message) {
  editError.textContent = message;
  editError.classList.add('show');
}

function showToast(message, type = 'success') {
  const existingToasts = document.querySelectorAll('.toast');
  existingToasts.forEach(toast => toast.remove());
  
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.classList.add('show');
  }, 100);
  
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 400);
  }, 3000);
}