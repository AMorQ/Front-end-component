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