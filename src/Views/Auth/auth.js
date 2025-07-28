// NOTE: this file is the main JS for dealing with authentication-related UI interactions
// it handles control to register.js in case the usere is not registered yet

import { setupPasswordToggle } from "../../Utils/utils.js";
import { getAllUsers } from "../../API/userAPI.js";
import {renderRegisterForm} from "./register.js";
// ATTENTION! NOTE:when importing a function from a module, all that module will execute
// that means, that high level code would execute just for importing a module

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

  // Debug solution: with the autofill browser parameter, it can be that the visual input appears filled but JS can't access the value immediately
  // lets add a small delay

  setTimeout(async () => {
    // FIXME: VIOLATION: setTimeOut handler took 26710ms

  const userEmail = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;
  const rememberMe = document.getElementById("remember-me").checked;
  const errorDiv = document.getElementById("login-error");

  console.log("Values after timeout:", { userEmail, password });


  try {
    const users = await getAllUsers();
    //   NOTE: CAN IT BE DONE JUST FETCHING THE DDBB PARTIALLY?
    const currentUser = users.find(
      (e) => {
        
        console.log(e.userEmail === userEmail, e.userPassword === password);
        return e.userEmail === userEmail && e.userPassword === password;
      }
    );
    //Keep the user logged based on "Remember Me" checkbox
    if (currentUser) {
      currentUser.active = true;

      // Use localStorage (PERSISTANT AFTER BROWSER IS CLOSED) only if "Remember Me" is checked, otherwise use sessionStorage
      if (rememberMe) {
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
      } else {
        // sessionStorage clears when the browser session ends (tab/window closes)
        sessionStorage.setItem("currentUser", JSON.stringify(currentUser));
      }

      errorDiv.textContent = "";
      alert("Login successful");
      // TODO: toastify?

      // window.location.href = "/index.html";
      // theres not a home, FIXME: Ill create a fake index.html. RIGHT NOW NOT BEING CALLED
    } else {
      errorDiv.textContent = "Incorrect e-mail or password.";
    }
  } catch (error) {
    console.error(error);
    errorDiv.textContent =
      "An unexpected error occurred. Please try again later.";
  }
}, 100);
});

// Handle register link click
document.addEventListener("DOMContentLoaded", () => {
  setupPasswordToggle("toggle-password", "login-password", "eye-icon");

  const registerLink = document.getElementById("register-link");
  
  if (registerLink) {
    registerLink.addEventListener("click", (event) => {
      event.preventDefault(); // Prevent navigation TO #
      renderRegisterForm(); // Call function from register.js to render the form
    });
  }
});
// NOTE: this can be used for register button at home page


