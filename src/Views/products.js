import { fetchProductImages } from '../API/ApiProducts.js';

function createBaseLayout() {
  const app = document.getElementById('app'); 
  app.innerHTML = `
    <input type="text" id="search" placeholder="Search products..." />
    <button id="findBtn">Find</button>
    <div id="product-list" class="catalog"></div>

    <template id="product-template">
      <div class="product-card">
        <img src="" alt="Product image" />
        <h3 class="name"></h3>
        <p class="description"></p>
        <strong class="price"></strong>
        <button class="add-cart-btn">Add to cart</button>
      </div>
    </template>
  `;
}

async function loadCatalog(query = 'handmade') {
  const products = await fetchProductImages(query);
  const container = document.getElementById('product-list');
  const template = document.getElementById('product-template');

  container.innerHTML = '';

  if (products.length === 0) {
    container.innerHTML = '<p>No products found.</p>';
    return;
  }

  localStorage.setItem('allProducts', JSON.stringify(products));

  products.forEach(product => {
    const clone = template.content.cloneNode(true);
    const card = clone.querySelector('.product-card');

    const img = clone.querySelector('img');
    img.src = product.image;
    img.alt = product.name;

    clone.querySelector('.name').textContent = product.name;
    clone.querySelector('.price').textContent = `$${product.price}`;

const addToCartBtn = clone.querySelector('.add-cart-btn');

addToCartBtn.addEventListener('click', (e) => {
  e.stopPropagation();

  addToCartBtn.textContent = 'Added!';
  addToCartBtn.disabled = true;
});

    card.addEventListener('click', () => {
      localStorage.setItem('selectedProduct', JSON.stringify(product));
      window.location.href = 'detailsProduct.html';
    });

    container.appendChild(clone);
  });
}

function setupEvents() { 
  const searchInput = document.getElementById('search');
  const findBtn = document.getElementById('findBtn');

  findBtn.addEventListener('click', () => {
    const query = searchInput.value.trim();
    loadCatalog(query || 'handmade');
  });

  searchInput.addEventListener('keydown', (e) => { 
    if (e.key === 'Enter') {
      const query = searchInput.value.trim();
      loadCatalog(query || 'handmade');
    }
  });
}

createBaseLayout();
setupEvents();
loadCatalog();
