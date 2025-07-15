// NOTE: this file is the main JS for dealing with authentication-related UI interactions
// it handles control to register.js in case the usere is not registered yet

import { setupPasswordToggle } from "./UTILS/utils.js";
import { getAllUsers } from "./API/userAPI.js";
import {renderRegisterForm} from "./register.js";

setupPasswordToggle("toggle-password", "login-password", "eye-icon");

//Go back to home using the navigator arrow, popstate implied the arrow/history of the navegator
// TODO: UNDERSTAND THIS EVENT
// FIXME: is it the case that if the previous element is not the home page, it will stille redirect to the home page?

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
      (e) => e.userEmail === userEmail && e.password === password
    );
    //Keep the user logged
    //   FIXME: but this is not activated by the check Remeber Me checkbox
    if (currentUser) {
      currentUser.active = true;

      localStorage.setItem("currentUser", JSON.stringify(currentUser));

      errorDiv.textContent = "";
      alert("Login successful");
      // TODO: toastify?

      window.location.href = "/index.html";
      // theres not a home, FIXME: Ill create a fake index.html
    } else {
      errorDiv.textContent = "Incorrect e-mail or password.";
    }
  } catch (error) {
    console.error(error);
    errorDiv.textContent =
      "An unexpected error occurred. Please try again later.";
  }
});
