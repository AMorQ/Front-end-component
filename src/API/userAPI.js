const baseUsersUrl = "https://686501a15b5d8d03397f4663.mockapi.io/api/v1/users";

// req getAllUsers

export async function getAllUsers() {
  const url = `${baseUsersUrl}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("error", error, response.status);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
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
        password: userData.password,
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
