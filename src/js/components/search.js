import { headers } from '../api/headers.js';

import { createAllListingsElements } from '../ui/all_listings/read.js';

/**
 * @function filterListingsByCategory
 * @description Filters listings based on a category tag
 * @param {string} category - The category tag to filter by
 * @returns {void}
 * @exports filterListingsByCategory
 */

function filterListingsByCategory(category) {
  const categoryElement = document.querySelector(
    `.category[data-category="${category}"]`
  );
  if (categoryElement) {
    categoryElement.addEventListener('click', async (event) => {
      event.preventDefault();

      const resultsContainer = document.getElementById('all-auction-listings');
      if (resultsContainer) {
        resultsContainer.innerHTML = '';
      }

      try {
        if (category) {
          const results = await filterListings(category);
          displayResults(results);
        } else {
          throw new Error('Category is empty');
        }
      } catch (error) {
        throw new Error('Error fetching listings:', error);
      }
    });
  } else {
    throw new Error(`Element not found for category: ${category}`);
  }
}

const CATEGORIES = ['photography', 'sculpture', 'modern', 'contemporary'];

CATEGORIES.forEach((category) => {
  filterListingsByCategory(category);
});

/**
 * @function onClickSearchButton
 * @description Adds an event listener to the search button
 * @returns {void}
 * @listens search-button
 * @fires searchListings
 * @fires displayResults
 * @exports onClickSearchButton
 */

export function onClickSearchButton() {
  document
    .getElementById('search-button')
    .addEventListener('click', async () => {
      const searchBar = document.getElementById('search-bar');

      const query = searchBar.value;

      const results = await searchListings(query);

      displayResults(results);
    });
}

async function filterListings(category) {
  const API_URL = `https://v2.api.noroff.dev/auction/listings/search?q=${encodeURIComponent(category)}&_seller=true&_bids=true&_active=true}`;
  try {
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: headers(),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const LISTINGS = data.data.filter((listing) =>
      listing.tags.includes('ArtAuctionApp')
    );

    return LISTINGS;
  } catch (error) {
    throw new Error('Error fetching listings:', error);
    return [];
  }
}

/**
 * @function searchListings
 * @description Searches for listings based on a query
 * @param {string} query - The search query
 * @returns {Promise<Array>} - The search results
 * @requires headers
 * @requires fetch
 */

async function searchListings(query) {
  const API_URL = `https://v2.api.noroff.dev/auction/listings/search?q=${encodeURIComponent(query)}&_seller=true&_bids=true&_active=true`;
  try {
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: headers(),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    const LISTINGS = data.data.filter((listing) =>
      listing.tags.includes('ArtAuctionApp')
    );

    return LISTINGS;
  } catch (error) {
    throw new Error('Error searching listings:', error);
    return [];
  }
}

/**
 * @function displayResults
 * @description Displays search results on the page
 * @param {Array} listings - The search results
 * @returns {void}
 * @exports displayResults
 * @requires isLoggedIn
 * @requires fetchListingImages
 */

export function displayResults(listings) {
  const OUTER_CONTAINER = document.getElementById('all-auction-listings');

  OUTER_CONTAINER.innerHTML = '';

  if (listings && listings.length > 0) {
    listings.forEach((listing) => {
      createAllListingsElements(listing);
    });
  }
}
