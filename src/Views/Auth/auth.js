// NOTE: this file is the main JS for dealing with authentication-related UI interactions
// it handles control to register.js in case the usere is not registered yet

import { setupPasswordToggle } from "../../Utils/utils.js";
import { getAllUsers, updateUser } from "../../API/userAPI.js";
import {renderRegisterForm} from "./register.js";

setupPasswordToggle("toggle-password", "login-password", "eye-icon");

//Go back to home using the navigator arrow, popstate implied the arrow/history of the navegator
// TODO: UNDERSTAND THIS EVENT
// FIXME: is it the case that if the previous element is not the home page, it will still redirect to the home page?
window.addEventListener("popstate", () => {
  window.location.href = "/";
});


const form = document.getElementById("login-form");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const userEmail = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;
  const rememberMe = document.getElementById("remember-me").checked;
  const errorDiv = document.getElementById("login-error");

  try {
    const users = await getAllUsers();
    //   NOTE: CAN IT BE DONE JUST FETCHING THE DDBB PARTIALLY?
    const currentUser = users.find(
      (e) => e.userEmail === userEmail && e.userPassword === password
    );
    //Keep the user logged based on "Remember Me" checkbox
    if (currentUser) {
       // Update user status in API database
      const updatedUserData = { ...currentUser, active: true };
      
      try {
        await updateUser(currentUser.id, updatedUserData);
        console.log("User status updated in database");
      } catch (updateError) {
        console.error("Failed to update user status:", updateError);
        // Continue with login even if status update fails
      }
      // Use localStorage (PERSISTANT AFTER BROWSER IS CLOSED) only if "Remember Me" is checked, otherwise use sessionStorage
      if (rememberMe) {
        localStorage.setItem("currentUser", JSON.stringify(updatedUserData));
      } else {
        // sessionStorage clears when the browser session ends (tab/window closes)
        sessionStorage.setItem("currentUser", JSON.stringify(updatedUserData));
      }

      errorDiv.textContent = "";
      alert("Login successful");
      // TODO: toastify?

       window.location.href = "/index.html";
      // theres not a home, FIXME: Ill create a fake index.html. RIGHT NOW NOT BEING CALLED
    } else {
      errorDiv.textContent = "Incorrect e-mail or password.";
    }
  } catch (error) {
    console.error(error);
    errorDiv.textContent =
      "An unexpected error occurred. Please try again later.";
  }
});

// Handle register link click
document.addEventListener("DOMContentLoaded", () => {
  const registerLink = document.getElementById("register-link");
  
  if (registerLink) {
    registerLink.addEventListener("click", (event) => {
      event.preventDefault(); // Prevent navigation TO #
      renderRegisterForm(); // Call function from register.js to render the form
    });
  }
});
// NOTE: this can be used for register button at home page

// Utility function to get current user from either localStorage or sessionStorage
export function getCurrentUser() {
  // Check localStorage first (Remember Me was checked)
  const userFromLocal = localStorage.getItem("currentUser");
  if (userFromLocal) {
    return JSON.parse(userFromLocal);
  }
  
  // Check sessionStorage (Remember Me was not checked)
  const userFromSession = sessionStorage.getItem("currentUser");
  if (userFromSession) {
    return JSON.parse(userFromSession);
  }
  
  return null; // No user found
}

// Utility function to logout user from both storages--> TODO: add button to logout
export function logoutUser() {
  localStorage.removeItem("currentUser");
  sessionStorage.removeItem("currentUser");
}


