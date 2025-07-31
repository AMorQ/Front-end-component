import { injectFooter } from './utilsfooter.js';
import { injectNavbar } from './navbar.js';
import './Views/shoppingCart.js';

document.addEventListener('DOMContentLoaded', () => {
  injectNavbar();
  injectFooter();
});