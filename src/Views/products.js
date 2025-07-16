import { fetchProductImages } from '../API/apiProducts.js';

function createBaseLayout() {
  const app = document.getElementById('app'); //may change de div name

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
        <button>Add to cart</button>
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

function setupEvents() { //filter
  const searchInput = document.getElementById('search');
  const findBtn = document.getElementById('findBtn');

  findBtn.addEventListener('click', () => {
    const query = searchInput.value.trim();
    loadCatalog(query || 'handmade'); 
  });

  searchInput.addEventListener('keydown', (e) => { //is the same as click with the mouse but using 'enter' key
    if (e.key === 'Enter') {
      const query = searchInput.value.trim();
      loadCatalog(query || 'handmade');
    }
  });
}

//ADD click fuction for product details (plus product.js)

//do not forget
createBaseLayout();
setupEvents();
loadCatalog();
