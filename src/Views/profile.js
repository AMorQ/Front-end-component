import { getCurrentUser, logoutUser } from "../Auth/auth.js";
import { getAllUsers, updateUser } from "../../API/userAPI.js";
import { fetchProductImages } from "../../API/ApiProducts.js";

// DOM elements
const profileName = document.getElementById('profile-name');
const profileLocation = document.getElementById('profile-location');
const profileImage = document.getElementById('profile-image');
const profileRating = document.getElementById('profile-rating');
const profileContent = document.getElementById('profile-content');

// Modal elements
const editModal = document.getElementById('edit-modal');
const addProductModal = document.getElementById('add-product-modal');
const closeModalButtons = document.querySelectorAll('.close-modal');

// Form elements
const editProfileForm = document.getElementById('edit-profile-form');
const addProductForm = document.getElementById('add-product-form');

// Current user state
let currentUser = null;
let isArtisan = false;

// Initialize profile page
document.addEventListener('DOMContentLoaded', async () => {
  currentUser = getCurrentUser();
  
  if (currentUser) {
    isArtisan = currentUser.artisan || false;
    await loadProfile(currentUser.id);
  } else {
    // For demo purposes, load a sample artisan profile
    // In a real app, you might redirect to login or show public profiles
    await loadSampleArtisanProfile();
  }

  setupEventListeners();
});

async function loadProfile(userId) {
  try {
    const users = await getAllUsers();
    const user = users.find(u => u.id === userId);
    
    if (!user) {
      throw new Error('User not found');
    }

    renderProfile(user);
    
    if (isArtisan) {
      renderPrivateProfile(user);
    } else {
      renderPublicProfile(user);
    }
  } catch (error) {
    console.error('Error loading profile:', error);
    showError('Failed to load profile. Please try again later.');
  }
}