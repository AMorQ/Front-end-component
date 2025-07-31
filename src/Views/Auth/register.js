// this approach Allows switching between login and register forms without page navigation

import { createNewUser } from "../../API/userAPI.js";
// import { setupPasswordToggle } from "./UTILS/utils.js";

// FIXME: arreglar userPassword, ahor mismo está creando otro elemento en MockAPI
// TODO: fix this function and it utilisation here
// TODO: FIX password and confirm password validations


// Handle register link click
// NOTE:  difference between DOMContentLoaded and rest of types?


// FIXME: this shouldnt be done with innerHTML because of the input ?????????
// insertAdjacentHTML is safer than innerHTML
// DANGEROUS - if userInput contains malicious scripts
// container.innerHTML = `<input value="${userInput}">`;
// SAFER - use insertAdjacentHTML
// container.insertAdjacentHTML('beforeend', `<input value="${userInput}">`);


export function renderRegisterForm() {
  // Clear the current content and render register form
  const container = document.querySelector('.log-container');
  
  // Security: Clear existing content first to prevent any potential issues
  container.textContent = '';
  
  container.innerHTML = `
    <div class="reg-header">
      <h1>Register</h1>
    </div>
    <!-- the autocomplete attributes are set to help browsers autofill the form -->
    <form id="register-form">
      <div class="form-group">
        <input type="text" placeholder="Full Name" id="register-name" autocomplete="name" required />
      </div>
      <div class="form-group">
        <input type="text" placeholder="User Name" id="register-username" autocomplete="username" required />
      </div>
      
      <div class="form-group">
        <input type="email" placeholder="E-mail" id="register-email" autocomplete="email" required />
      </div>
      
      <div class="form-group password">
        <input type="password" placeholder="Password" id="register-password" autocomplete="new-password" required />
      </div>
      <div class="form-group password">
        <input type="password" placeholder="Confirm Password" id="register-confirm-password" autocomplete="new-password" required />
      </div>
      
      <button type="submit" class="btn">Register</button>
    </form>
    
    <p class="reg-p">
      <a href="auth.html" id="login-link" class="reg-link">Back to Login</a>
    </p>
    <!-- this redirects to auth.html but so slowly...FIXME: maybe better erasing auth.html content and injecting or is it just the same than calling auth.html
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
    const userPassword = document.getElementById("register-password").value;
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
    if (!passwordRegex.test(userPassword)) {
      alert("Invalid password. Must be 8–15 characters, include upper/lowercase, number, and special character.");
      validations = false;
    }

    if (userPassword !== confirmPassword) {
      alert("Passwords do not match.");
      validations = false;
    }

    if (validations) {
      const userData = {
        userName,
        userEmail,
        userPassword,
      };

      await createNewUser(userData);
      console.log("User created:", userData);
    }
  });
}
// I have to  introduce new validations to User Name (not full name)





