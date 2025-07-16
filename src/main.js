// Navigation buttons for different HTML pages
document.addEventListener('DOMContentLoaded', () => {
  // Create a container for the navigation buttons
  const navContainer = document.createElement('div');
  navContainer.className = 'nav-container';
  navContainer.style.cssText = `
    display: flex;
    gap: 15px;
    justify-content: center;
    margin: 20px 0;
    flex-wrap: wrap;
  `;

  // Define the buttons with their respective HTML pages
  const buttons = [
    { text: 'Profile', url: 'profile.html', color: '#4CAF50' },
    { text: 'Authentication', url: 'auth.html', color: '#2196F3' },
    // { text: 'Products', url: 'products.html', color: '#FF9800' },
    { text: 'Contact', url: 'contact.html', color: '#f44336' }
  ];

  // Create and style each button
  buttons.forEach(button => {
    const btn = document.createElement('button');
    btn.textContent = button.text;
    btn.style.cssText = `
      padding: 12px 24px;
      background-color: ${button.color};
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-size: 16px;
      font-weight: bold;
      transition: all 0.3s ease;
    `;

    // Add hover effect
    btn.addEventListener('mouseenter', () => {
      btn.style.opacity = '0.8';
      btn.style.transform = 'translateY(-2px)';
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.opacity = '1';
      btn.style.transform = 'translateY(0)';
    });

    // Add click event to navigate to the HTML page
    btn.addEventListener('click', () => {
      window.location.href = button.url;
    });

    navContainer.appendChild(btn);
  });

  // Insert the navigation container at the beginning of the body
  document.body.insertBefore(navContainer, document.body.firstChild);
});




