// src/init.js
import { injectFooter } from './utilsfooter.js';
import { injectNavbar } from './navbar.js';

console.log('init.js executing')

document.addEventListener('DOMContentLoaded', () => {
  injectNavbar();
  injectFooter();
});