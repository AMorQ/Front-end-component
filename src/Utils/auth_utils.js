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

