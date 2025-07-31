const API_KEY = 'SmX8HumhMbfoqY3NfUWwTzV122LsE5BiCxtSzYnl1ARI5T33DUnSy72G';
const PEXELS_URL = 'https://api.pexels.com/v1/search';

export async function fetchProductImages(query = 'handmade', perPage = 12) {
  try {
    const response = await fetch(`${PEXELS_URL}?query=${encodeURIComponent(query)}&per_page=${perPage}`, {
      headers: {
        Authorization: API_KEY,
      },
    });

    if (!response.ok) {
      throw new Error('Error: no images found from Pexels');
    }

    const data = await response.json();

    return data.photos.map(photo => ({
      name: query.charAt(0).toUpperCase() + query.slice(1),
      description: photo.alt || 'Handcrafted product',
      price: (Math.random() * 100 + 10).toFixed(2),
      image: photo.src.large,
    }));
  } catch (error) {
    console.error(error);
    return [];
  }
}