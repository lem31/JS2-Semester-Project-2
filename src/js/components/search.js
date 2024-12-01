import { headers } from '../api/headers.js';

export function onClickSearchButton() {
  document
    .getElementById('search-button')
    .addEventListener('click', async () => {
      const searchBar = document.getElementById('search-bar');
      if (!searchBar) {
        console.error('Search bar element not found');
        return;
      }
      const query = searchBar.value;
      console.log('Search query:', query);
      const results = await searchListings(query);
      console.log('Search results:', results);
      displayResults(results);
    });
}

async function searchListings(query) {
  const API_URL = `https://v2.api.noroff.dev/auction/listings/search?q=${encodeURIComponent(query)}`;

  try {
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: headers(),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('API response data:', data);
    return data.data;
  } catch (error) {
    console.error('Error searching listings:', error);
    return [];
  }
}

function displayResults(listings) {
  const LISTING_CONTAINER = document.createElement('div');
  const resultsContainer = document.getElementById('all-auction-listings');
  if (!resultsContainer) {
    console.error('Results container element not found');
    return;
  }
  resultsContainer.innerHTML = '';

  console.log('Listings to display:', listings);

  if (listings && listings.length > 0) {
    listings.forEach((listing) => {
      const listingElement = document.createElement('div');
      listingElement.classList.add('listing');

      const title = document.createElement('h2');
      title.textContent = listing.title ? listing.title : 'No title available';

      fetchListingImages(listing, LISTING_CONTAINER);

      listingElement.appendChild(title);
      listingElement.appendChild(LISTING_CONTAINER);
      resultsContainer.appendChild(listingElement);
    });
  } else {
    resultsContainer.textContent = 'No listings found.';
  }
}

function fetchListingImages(listing, LISTING_CONTAINER) {
  const IMAGES = listing.media || [];

  IMAGES.forEach((image) => {
    console.log('Processing image:', image);
    const IMAGE_ELEMENT = document.createElement('img');
    IMAGE_ELEMENT.src = image.url;
    IMAGE_ELEMENT.alt = image.alt || 'No image available';
    IMAGE_ELEMENT.classList.add('listing-image');
    const IMAGE_GALLERY_CONTAINER = document.createElement('div');
    IMAGE_GALLERY_CONTAINER.classList.add('listing-image-container');
    IMAGE_GALLERY_CONTAINER.appendChild(IMAGE_ELEMENT);
    LISTING_CONTAINER.appendChild(IMAGE_GALLERY_CONTAINER);
  });
}
