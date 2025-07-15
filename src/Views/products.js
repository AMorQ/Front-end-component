import { fetchProductImages } from '../API/ApiProducts.js';

async function loadCatalog(query = 'handmade') {
  const products = await fetchProductImages(query);
  const container = document.getElementById('product-list');
  const template = document.getElementById('product-template');

  container.innerHTML = '';

  if (products.length === 0) {
    container.innerHTML = '<p>No products found.</p>';
    return;
  }
  //inject the html for the cards??
   products.forEach(product => {
    const clone = template.content.cloneNode(true);
    clone.querySelector('img').src = product.image;
    clone.querySelector('img').alt = product.name;
    clone.querySelector('.name').textContent = product.name;
    clone.querySelector('.description').textContent = product.description;
    clone.querySelector('.price').textContent = `$${product.price}`;

    container.appendChild(clone);
  });
}
//do not forget the function!!
loadCatalog();
