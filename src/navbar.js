// src/navbar.js
export function injectNavbar() {
  const navbarHTML = `
    <nav id="navbar">
      <div class="navbar-container">
        <div class="navbar-logo">
          <img src="/navbar/LOGO1.png" alt="Logo" />
        </div>
        <div class="navbar-links">
          <a href="index.html">Home</a>
          <a href="product.html">Products</a>
          <a href="contact.html">Contact</a>
          <a href="profile.html">Profile</a>
          <a href="auth.html">Login</a>
        </div>
        <div class="navbar-cart">
          <a href="#">
            <img src="/navbar/cart1.png" alt="Cart" />
          </a>
        </div>
      </div>
    </nav>
  `;

  const navbarContainer = document.createElement('div');
  navbarContainer.innerHTML = navbarHTML;
  document.body.insertBefore(navbarContainer, document.body.firstChild);
}