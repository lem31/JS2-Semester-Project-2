import { headers } from '../api/headers.js';
import { isLoggedIn } from '../ui/listing/read.js';
import { fetchListingImages } from '../ui/listing/read.js';

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

/**
 * @function searchListings
 * @description Searches for listings based on a query
 * @param {string} query - The search query
 * @returns {Promise<Array>} - The search results
 * @requires headers
 * @requires fetch
 */

async function searchListings(query) {
  const API_URL = `https://v2.api.noroff.dev/auction/listings/search?q=${encodeURIComponent(query)}&_tag=ArtAuctionApp&bids=true&_seller=true`;

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

/**
 * @function displayResults
 * @description Displays search results on the page
 * @param {Array} listings - The search results
 * @returns {void}
 * @exports displayResults
 * @requires isLoggedIn
 * @requires fetchListingImages
 */

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
      const LISTING_ELEMENT = document.createElement('div');
      LISTING_ELEMENT.classList.add('listing');
      const SELLER_NAME = document.createElement('p');
      const SELLER_AVATAR = document.createElement('img');
      const LISTING_TITLE = document.createElement('h2');
      const LISTING_DESCRIPTION = document.createElement('p');
      const LISTING_CONTAINER = document.createElement('div');
      const LISTING_BIDS = document.createElement('p');
      const LISTING_END_DATE = document.createElement('p');
      const BUTTON_CONTAINER = document.createElement('div');
      const PLACE_BID_BUTTON = document.createElement('button');
      const VIEW_BIDS_BUTTON = document.createElement('button');
      const TEXT_CONTAINER = document.createElement('div');
      const VIEW_BIDS_CONTAINER = document.createElement('div');
      const LISTING_BIDS_COUNT_TOTAL = document.createElement('p');
      const LISTING_BIDDERS_NAME = document.createElement('p');
      const BIDDER_AVATAR = document.createElement('img');
      const BID_AMOUNT = document.createElement('p');

      PLACE_BID_BUTTON.textContent = 'Place Bid';

      SELLER_NAME.textContent = `Seller: ${listing.seller.name}`;
      SELLER_AVATAR.src = listing.seller.avatar.url || '';

      LISTING_TITLE.textContent = listing.title
        ? listing.title
        : 'No title available';

      if (isLoggedIn() && listing._count && listing._count.bids !== undefined) {
        LISTING_BIDS_COUNT_TOTAL.textContent = `No. of bids: ${listing._count.bids}`;
      }
      LISTING_BIDDERS_NAME.textContent =
        listing.bids && listing.bids.length > 0
          ? `Bidder: ${listing.bids[0].bidder.name}`
          : 'No bidders';
      BIDDER_AVATAR.src =
        listing.bids && listing.bids.length > 0
          ? listing.bids[0].bidder.avatar.url
          : '';
      BID_AMOUNT.textContent =
        listing.bids && listing.bids.length > 0
          ? `Bid amount: ${listing.bids[0].amount}`
          : 'No bids';
      VIEW_BIDS_BUTTON.textContent = 'View Bids';

      LISTING_TITLE.textContent = listing.title || 'No title available';
      LISTING_DESCRIPTION.textContent =
        listing.description || 'No description available';
      LISTING_END_DATE.textContent = listing.endsAt || 'No end date available';

      TEXT_CONTAINER.appendChild(LISTING_TITLE);
      TEXT_CONTAINER.appendChild(LISTING_DESCRIPTION);
      TEXT_CONTAINER.appendChild(LISTING_BIDS);
      TEXT_CONTAINER.appendChild(LISTING_END_DATE);
      TEXT_CONTAINER.appendChild(SELLER_NAME);
      TEXT_CONTAINER.appendChild(SELLER_AVATAR);

      BUTTON_CONTAINER.appendChild(PLACE_BID_BUTTON);
      BUTTON_CONTAINER.appendChild(VIEW_BIDS_BUTTON);
      LISTING_CONTAINER.appendChild(TEXT_CONTAINER);
      LISTING_CONTAINER.appendChild(BUTTON_CONTAINER);
      LISTING_CONTAINER.appendChild(VIEW_BIDS_CONTAINER);
      fetchListingImages(listing, LISTING_CONTAINER);
      VIEW_BIDS_CONTAINER.appendChild(LISTING_BIDS_COUNT_TOTAL);

      VIEW_BIDS_CONTAINER.classList.add('hidden');

      if (listing.bids && listing.bids.length > 0) {
        listing.bids.forEach((bid) => {
          const BIDDER_CONTAINER = document.createElement('div');
          const BIDDER_NAME = document.createElement('p');
          const BIDDER_AVATAR = document.createElement('img');
          const BID_AMOUNT = document.createElement('p');

          BIDDER_NAME.textContent = `Bidder: ${bid.bidder.name}`;
          BIDDER_AVATAR.src = bid.bidder.avatar.url || '';
          BID_AMOUNT.textContent = `Bid amount: ${bid.amount}`;

          BIDDER_CONTAINER.appendChild(BIDDER_AVATAR);
          BIDDER_CONTAINER.appendChild(BIDDER_NAME);
          BIDDER_CONTAINER.appendChild(BID_AMOUNT);
          VIEW_BIDS_CONTAINER.appendChild(BIDDER_CONTAINER);
        });
      }

      LISTING_ELEMENT.appendChild(LISTING_CONTAINER);
      VIEW_BIDS_BUTTON.addEventListener('click', () => {
        if (!isLoggedIn()) {
          alert('You need to be logged in to view bids.');
          return;
        }
        if (
          VIEW_BIDS_CONTAINER.style.display === 'none' ||
          !VIEW_BIDS_CONTAINER.style.display
        ) {
          VIEW_BIDS_CONTAINER.style.display = 'block';
        } else {
          VIEW_BIDS_CONTAINER.style.display = 'none';
        }
      });

      resultsContainer.appendChild(LISTING_ELEMENT);
    });
  } else {
    resultsContainer.textContent = 'No listings found.';
  }
}
