document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('product-details');
  const product = JSON.parse(localStorage.getItem('selectedProduct'));

  if (!product) {
    container.innerHTML = '<p>No product selected.</p>';
    return;
  }

  container.innerHTML = `
    <div class="product-details">
      <img src="${product.image}" alt="${product.name}" />
      <h1>${product.name}</h1>
      <p>${product.description}</p>
      <strong>Price: $${product.price}</strong>

      <div class="actions">
        <button id="addToCartBtn">Add to cart</button>
      </div>

      <button id="backBtn">Back</button>
    </div>

    <h2 class="suggested-title">You may also like...</h2>
    <div class="suggested-wrapper">
      <button class="arrow left">&#8592;</button>
      <div class="suggested-container" id="suggestedContainer"></div>
      <button class="arrow right">&#8594;</button>
    </div>
  `;

  // Back button
  document.getElementById('backBtn').addEventListener('click', () => {
    window.location.href = 'product.html';
  });

  // Add to cart logic with feedback and toggle. I dont know if i like this...
  // there is no memory of the added products now, need the cart logic
  let inCart = false;
  const cartBtn = document.getElementById('addToCartBtn');

  cartBtn.addEventListener('click', () => { 
    if (!inCart) {
      cartBtn.textContent = 'Added!';
      cartBtn.disabled = true;
      inCart = true;

      setTimeout(() => {
        cartBtn.textContent = 'Remove from cart'; //Maybe, you can only remove the products from the cart, not in the web. Would make more sense
        cartBtn.disabled = false;
      }, 1500);
    } else {
      cartBtn.textContent = 'Add to cart';
      inCart = false;
    }
  });

  // Related products logic, need to check this later with artisan products
  const allProducts = JSON.parse(localStorage.getItem('allProducts')) || [];
  const relatedProducts = allProducts.filter(p => p.image !== product.image);

  let startIndex = 0;
  const visibleCount = 4;
  const suggestedContainer = document.getElementById('suggestedContainer');

  function renderSuggested() {
    suggestedContainer.innerHTML = '';
    const slice = relatedProducts.slice(startIndex, startIndex + visibleCount);

    slice.forEach(p => {
      const card = document.createElement('div');
      card.classList.add('suggested-card');
      card.innerHTML = `
        <img src="${p.image}" alt="${p.name}" />
        <h4>${p.name}</h4>
        <p>$${p.price}</p>
      `;

      card.addEventListener('click', () => {
        localStorage.setItem('selectedProduct', JSON.stringify(p));
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setTimeout(() => window.location.reload(), 300);
      });

      suggestedContainer.appendChild(card);
    });

    if (startIndex + visibleCount >= relatedProducts.length) {
      const seeMoreCard = document.createElement('div');
      seeMoreCard.classList.add('suggested-card', 'see-more');
      seeMoreCard.innerHTML = `
        <button id="seeMoreBtn">See more</button>
      `;
      suggestedContainer.appendChild(seeMoreCard);

      document.getElementById('seeMoreBtn').addEventListener('click', () => {
        window.location.href = 'product.html';
      });
    }
  }

  renderSuggested();
//slider
  document.querySelector('.arrow.left').addEventListener('click', () => {
    if (startIndex > 0) {
      startIndex -= visibleCount;
      renderSuggested();
    }
  });

  document.querySelector('.arrow.right').addEventListener('click', () => {
    if (startIndex + visibleCount < relatedProducts.length) {
      startIndex += visibleCount;
      renderSuggested();
    }
  });
});
