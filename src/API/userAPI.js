const baseUsersUrl = "https://686501a15b5d8d03397f4663.mockapi.io/api/v1/users";

// req getAllUsers

export async function getAllUsers() {
  const url = `${baseUsersUrl}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    } // Added missing closing brace

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
    throw error; // Re-throw to allow caller to handle the error
  }
}



//post NEW USER request

export async function createNewUser(userData) {
  const url = `${baseUsersUrl}`;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName: userData.userName,
        userEmail: userData.userEmail,
        userPassword: userData.userPassword,
      }),
    });
    if (!response.ok) {
      throw new Error("Failed to create user: " + response.statusText);
    }
    const data = await response.json();

    
    alert("Registration successful! Please log in.");
      if (window.showLoginPage) {
        window.showLoginPage();
      } else {
        console.error('showLoginPage function not found');
      }
    console.log(data);
  } catch (error) {
    console.error("Create user error:", error);
  }

}

// Get user by ID
export async function getUserId(id) {
  try {
    const response = await fetch(`${baseUsersUrl}/${id}`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Get user error:", error);
    throw error;
  }
}

// Update user
export async function updateUser(id, userData) {
  try {
    const response = await fetch(`${baseUsersUrl}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData)
    });
    if (!response.ok) throw new Error("Failed to update user");
    return await response.json();
  } catch (error) {
    console.error("Update user error:", error);
    throw error;
  }
}

// Delete user
export async function deleteUser(id) {
  try {
    const response = await fetch(`${baseUsersUrl}/${id}`, {
      method: "DELETE"
    });
    if (!response.ok) throw new Error("Failed to delete user");
    return await response.json();
  } catch (error) {
    console.error("Delete user error:", error);
    throw error;
  }
}

