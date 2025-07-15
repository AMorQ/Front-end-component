// this approach Allows switching between login and register forms without page navigation

import { createNewUser } from "./API/userAPI.js";
// import { setupPasswordToggle } from "./UTILS/utils.js";
// TODO: fix this function and it utilisation here
// TODO: FIX password and confirm password validations
// TODO: check userAPI reponsibity (is the user being saved correctly?)

// Handle register link click
// NOTE:  difference between DOMContentLoaded and rest of types?
// NOTE:  should this be in another file?
document.addEventListener("DOMContentLoaded", () => {
  const registerLink = document.getElementById("register-link");
  
  registerLink.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent navigation
    renderRegisterForm(); // Call function from register.js to render the form
  });
});

export function renderRegisterForm() {
  // Clear the current content and render register form
  const container = document.querySelector('.log-container');
  
  container.innerHTML = `
    <div class="reg-header">
      <h1>Register</h1>
    </div>

    <form id="register-form">
      <div class="form-group">
        <input type="text" placeholder="Full Name" id="register-name" required />
      </div>
      
      <div class="form-group">
        <input type="email" placeholder="E-mail" id="register-email" required />
      </div>
      
      <div class="form-group password">
        <input type="password" placeholder="Password" id="register-password" required />
      </div>
      <div class="form-group password" "toggle-register-confirm-password" id="register-confirm-password">
        <input type="password" placeholder="Confirm Password" id="register-confirm-password" required />
      </div>
      
      <button type="submit" class="btn">Register</button>
    </form>
    
    <p class="reg-p">
      <a href="auth.html" id="login-link" class="reg-link">Back to Login</a>
    </p>
  `;
  
  // Add event listeners for the new form
  setupRegisterFormHandlers();
}



// Setup password visibility toggle for both fields
//   TODO:  this has to be optimized, what are those arguments?
//   setupPasswordToggle("toggle-register-password", "register-password", "signup-eye-icon");
//   setupPasswordToggle("toggle-register-confirm-password", "register-confirm-password", "signup-confirm-eye-icon");

  function setupRegisterFormHandlers() {
  // Handle register form submission
  const form = document.getElementById("register-form");
  
  form.addEventListener("submit", async (event) => {
    event.preventDefault();


    const userName = document.getElementById("register-name").value.trim();
    const userEmail = document.getElementById("register-email").value.trim();
    const password = document.getElementById("register-password").value;
    const confirmPassword = document.getElementById("register-confirm-password").value;

    let validations = true;

    if (userName.length < 3 || userName.length > 15) {
      alert("Name must be between 3 and 15 characters long");
      validations = false;
    }

    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,4})+$/;
    if (!emailRegex.test(userEmail)) {
      alert("Invalid email structure. example@example.com");
      validations = false;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]){8,15}$/;
    if (!passwordRegex.test(password)) {
      alert("Invalid password. Must be 8–15 characters, include upper/lowercase, number, and special character.");
      validations = false;
    }

    if (password !== confirmPassword) {
        // FIXME: Implement confirm password validation. RIGHT NOW IT IS NOT WORKING
      alert("Passwords do not match.");
      validations = false;
    }

    if (validations) {
      const userData = {
        userName,
        userEmail,
        password,
      };

      await createNewUser(userData);
      console.log("User created:", userData);
    }
  });
}

// --------------- garbagge code -----------------
// This code is not used, but it was part of the previous implementation

/**


export function renderRegisterForm() {
  // Clear the current content and render register form
  const container = document.querySelector('.log-container');
  
  container.innerHTML = `
    <div class="log-header">
      <h1>Register</h1>
    </div>

    <form id="register-form">
      <div class="form-group">
        <input type="text" placeholder="Full Name" id="register-name" required />
      </div>

      <div class="form-group">
        <input type="email" placeholder="E-mail" id="register-email" required />
      </div>

      <div class="form-group password">
    <form id="register-form">
      <div class="form-group">
        <input type="text" placeholder="Full Name" id="register-name" required />
      </div>
      
      <div class="form-group">
        <input type="email" placeholder="E-mail" id="register-email" required />
      </div>
      
      <div class="form-group password">
        <input type="password" placeholder="Password" id="register-password" required />
      </div>
      
      <button type="submit" class="btn">Register</button>
    </form>
    
    <p class="reg-p">
      <a href="#" id="login-link" class="reg-link">Back to Login</a>
    </p>
  `;
  
  // Add event listeners for the new form
  setupRegisterFormHandlers();
}

function setupRegisterFormHandlers() {
  // Handle register form submission
  const registerForm = document.getElementById("register-form");
  registerForm.addEventListener("submit", handleRegisterSubmit);
  
  // Handle back to login link
  const loginLink = document.getElementById("login-link");
  loginLink.addEventListener("click", (event) => {
    event.preventDefault();
    location.reload(); // Reload to show login form again
  });
}

function handleRegisterSubmit(event) {
  event.preventDefault();
  // Add your registration logic here
  console.log("Register form submitted");
}

*/