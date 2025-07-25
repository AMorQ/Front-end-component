// src/main.js
import { injectFooter } from './utilsfooter.js';
import { injectNavbar } from './navbar.js';

document.addEventListener('DOMContentLoaded', () => {
  // Inyectar navbar al principio
  injectNavbar();
  
  // Crear contenedor para botones de navegación
  const navContainer = document.createElement('div');
  navContainer.className = 'nav-container';
  // navContainer.style.cssText = `
  //   display: flex;
  //   gap: 15px;
  //   justify-content: center;
  //   margin: 20px 0;
  //   flex-wrap: wrap;
  //   padding-bottom: 200px;
  //   padding-top:100px;
  //   background-color:rgb(190, 233, 248);
  // `;

  // Botones de navegación
  const buttons = [
    { text: 'Profile', url: 'profile.html', color: '#4CAF50' },
    { text: 'Authentication', url: 'auth.html', color: '#2196F3' },
    { text: 'Products', url: 'product.html', color: '#FF9800' },
    { text: 'Contact', url: 'contact.html', color: '#f44336' }
  ];

  // Crear y agregar botones
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

    // Efecto hover
    btn.addEventListener('mouseenter', () => {
      btn.style.opacity = '0.8';
      btn.style.transform = 'translateY(-2px)';
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.opacity = '1';
      btn.style.transform = 'translateY(0)';
    });

    // Navegar a página
    btn.addEventListener('click', () => {
      window.location.href = button.url;
    });

    navContainer.appendChild(btn);
  });

  // Insertar botones después del navbar
  document.body.insertBefore(navContainer, document.body.children[1]);
  
  // Inyectar footer al final
  injectFooter();
});