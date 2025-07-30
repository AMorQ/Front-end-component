import { injectFooter } from './utilsfooter.js';
import { injectNavbar } from './navbar.js';

document.addEventListener('DOMContentLoaded', () => {
  injectNavbar();
  injectFooter();
});