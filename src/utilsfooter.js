let footerInjected = false;

export function injectFooter() {
  if (footerInjected) {
    return;
  }  

  if (document.getElementById('footer')) {
    footerInjected = true;
    return;
  }

  const footerHTML = `
    <footer id="footer">
      <div class="footer-container">
        <div class="footer-content">
          <div class="footer-section">
            <h4>About</h4>
            <p>"Do you create with your hands? Live your passion!
            Join NABECARAL today and begin your artisan journey"</p>
          </div>
          <div class="footer-section">
            <h4>Navigation</h4>
            <ul>
              <li><a href="index.html">Home</a></li>
              <li><a href="product.html">Browse Products</a></li>
              <li><a href="auth.html">Join as Artisan</a></li>
            </ul>
          </div>
          <div class="footer-section">
            <h4>Support</h4>
            <ul>
              <li><a href="contact.html">Contact Us</a></li>
              <li><a href="#">Terms of Service</a></li>
              <li><a href="#">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          <p>&copy; 2025 NABECARAL - Artisan Space. All rights reserved.</p>
        </div>
      </div>
    </footer>
  `;

  const footer = document.createElement('div');
  footer.innerHTML = footerHTML;
  document.body.appendChild(footer);
  
  footerInjected = true;
}