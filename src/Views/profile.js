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

async function loadSampleArtisanProfile() {
  // For public view when not logged in
  const sampleArtisan = {
    id: 'sample-1',
    userName: 'Sample Artisan',
    userEmail: 'sample@artisan.com',
    location: 'Barcelona',
    artisan: true,
    styles_applied: {},
    products: await fetchProductImages('handmade')
  };
  
  renderProfile(sampleArtisan);
  renderPublicProfile(sampleArtisan);
}

function renderProfile(user) {
  profileName.textContent = user.userName;
  profileLocation.textContent = user.location || 'Location not specified';
  
  // Set a default image if none provided
  profileImage.src = user.profileImage || 'https://via.placeholder.com/150';
  profileImage.alt = `${user.userName}'s profile picture`;
  
  // Generate random rating for demo (1-5 stars)
  const rating = Math.floor(Math.random() * 5) + 1;
  profileRating.innerHTML = '★'.repeat(rating) + '☆'.repeat(5 - rating);
}

function renderPublicProfile(user) {
  // Clear previous content
  while (profileContent.firstChild) {
    profileContent.removeChild(profileContent.firstChild);
  }

  // Create public profile elements
  const publicSection = document.createElement('div');
  publicSection.className = 'public-profile';

  const bioSection = document.createElement('div');
  bioSection.className = 'bio-section';
  bioSection.innerHTML = `
    <h2>About ${user.userName}</h2>
    <p>${user.bio || 'This artisan hasn\'t added a bio yet.'}</p>
  `;

  const productsHeader = document.createElement('h2');
  productsHeader.textContent = 'Products';

  const productsContainer = document.createElement('div');
  productsContainer.className = 'products-grid';

  // Add products if available
  if (user.products && user.products.length > 0) {
    user.products.forEach(product => {
      const productCard = createProductCard(product);
      productsContainer.appendChild(productCard);
    });
  } else {
    const noProducts = document.createElement('p');
    noProducts.textContent = 'No products available yet.';
    productsContainer.appendChild(noProducts);
  }

  // Append all elements
  publicSection.appendChild(bioSection);
  publicSection.appendChild(productsHeader);
  publicSection.appendChild(productsContainer);
  profileContent.appendChild(publicSection);
}

function renderPrivateProfile(user) {
  // Clear previous content
  while (profileContent.firstChild) {
    profileContent.removeChild(profileContent.firstChild);
  }

  // Create private profile elements
  const privateSection = document.createElement('div');
  privateSection.className = 'private-profile';

  const actionsHeader = document.createElement('h2');
  actionsHeader.textContent = 'Your Artisan Dashboard';

  const actionsContainer = document.createElement('div');
  actionsContainer.className = 'action-buttons';

  const editProfileBtn = document.createElement('button');
  editProfileBtn.className = 'btn';
  editProfileBtn.textContent = 'Edit Profile';
  editProfileBtn.addEventListener('click', () => openEditModal(user));

  const addProductBtn = document.createElement('button');
  addProductBtn.className = 'btn';
  addProductBtn.textContent = 'Add Product';
  addProductBtn.addEventListener('click', () => addProductModal.style.display = 'block');

  const logoutBtn = document.createElement('button');
  logoutBtn.className = 'btn logout';
  logoutBtn.textContent = 'Logout';
  logoutBtn.addEventListener('click', logout);

  actionsContainer.appendChild(editProfileBtn);
  actionsContainer.appendChild(addProductBtn);
  actionsContainer.appendChild(logoutBtn);

  const productsHeader = document.createElement('h2');
  productsHeader.textContent = 'Your Products';

  const productsContainer = document.createElement('div');
  productsContainer.className = 'products-grid';

  // Add products if available
  if (user.products && user.products.length > 0) {
    user.products.forEach(product => {
      const productCard = createProductCard(product, true);
      productsContainer.appendChild(productCard);
    });
  } else {
    const noProducts = document.createElement('p');
    noProducts.textContent = 'You haven\'t added any products yet.';
    productsContainer.appendChild(noProducts);
  }

  // Append all elements
  privateSection.appendChild(actionsHeader);
  privateSection.appendChild(actionsContainer);
  privateSection.appendChild(productsHeader);
  privateSection.appendChild(productsContainer);
  profileContent.appendChild(privateSection);
}

function createProductCard(product, isPrivate = false) {
  const card = document.createElement('div');
  card.className = 'product-card';

  const img = document.createElement('img');
  img.src = product.image || 'https://via.placeholder.com/200';
  img.alt = product.name;

  const name = document.createElement('h3');
  name.textContent = product.name;

  const desc = document.createElement('p');
  desc.textContent = product.description;

  const price = document.createElement('strong');
  price.textContent = `€${product.price}`;

  card.appendChild(img);
  card.appendChild(name);
  card.appendChild(desc);
  card.appendChild(price);

  if (isPrivate) {
    const actions = document.createElement('div');
    actions.className = 'product-actions';

    const editBtn = document.createElement('button');
    editBtn.className = 'btn small';
    editBtn.textContent = 'Edit';
    // editBtn.addEventListener('click', () => editProduct(product.id));

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn small danger';
    deleteBtn.textContent = 'Delete';
    // deleteBtn.addEventListener('click', () => deleteProduct(product.id));

    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);
    card.appendChild(actions);
  }

  return card;
}

function setupEventListeners() {
  // Close modals when clicking X
  closeModalButtons.forEach(button => {
    button.addEventListener('click', () => {
      editModal.style.display = 'none';
      addProductModal.style.display = 'none';
    });
  });

  // Close modals when clicking outside
  window.addEventListener('click', (event) => {
    if (event.target === editModal) {
      editModal.style.display = 'none';
    }
    if (event.target === addProductModal) {
      addProductModal.style.display = 'none';
    }
  });