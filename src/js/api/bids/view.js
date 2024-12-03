import { headers } from '../headers';
import { MY_BIDS_API } from '../constants';
import { fetchListingImages } from '../../ui/listing/read';

/**
 * @function fetchUserBidsFromApi
 * @description Fetches the user's bids from the API, stores them in local storage and
 * initializes the function to create the elements for the user's bids.
 * @returns {Promise<void>}
 * @async
 */

export async function fetchUserBidsFromApi() {
  try {
    const ACCESS_TOKEN = localStorage.getItem('accessToken');
    if (!ACCESS_TOKEN) {
      throw new Error('No access token found. Please log in.');
    }

    const RESPONSE = await fetch(MY_BIDS_API, {
      method: 'GET',
      headers: headers(),
    });

    if (!RESPONSE.ok) {
      throw new Error(`HTTP error! status: ${RESPONSE.status || 'unknown'}`);
    }

    const DATA = await RESPONSE.json();
    const MY_BIDS = DATA.data || [];

    localStorage.setItem('myBids', JSON.stringify(MY_BIDS));

    const LISTING_CONTAINER = document.getElementById(
      'my-bid-listings-container'
    );
    if (LISTING_CONTAINER) {
      LISTING_CONTAINER.innerHTML = '';
      MY_BIDS.forEach((bid) => {
        createMyBidListingsElements(bid);
      });
    }
  } catch (error) {
    console.error('Error fetching listings:', error);
  }
}

/**
 * @function createMyBidListingsElements
 * @description Creates the elements for the user's bids.
 * @param {object} bid - The bid object.
 * @returns {HTMLDivElement} - The bid listing container.
 */

export function createMyBidListingsElements(bid) {
  const LISTING_CONTAINER = document.createElement('div');
  LISTING_CONTAINER.classList.add('my-bids-listing-box');

  const LISTING_TITLE = document.createElement('h2');
  const LISTING_END_DATE = document.createElement('p');
  const BID_MADE_DATE = document.createElement('p');
  const BUTTON_CONTAINER = document.createElement('div');
  const TEXT_BUTTON_CONTAINER = document.createElement('div');
  const BID_AMOUNT = document.createElement('p');

  BID_AMOUNT.textContent = bid.amount ? `Your bid: ${bid.amount}` : 'No bids';
  LISTING_TITLE.textContent = bid.listing?.title || 'No title available';
  LISTING_END_DATE.textContent = bid.listing?.endsAt
    ? `Ends at: ${bid.listing.endsAt}`
    : 'No end date available';
  BID_MADE_DATE.textContent = bid.created
    ? `Bid made on: ${bid.created}`
    : 'No bid made date';

  TEXT_BUTTON_CONTAINER.appendChild(LISTING_TITLE);
  TEXT_BUTTON_CONTAINER.appendChild(BID_AMOUNT);
  TEXT_BUTTON_CONTAINER.appendChild(BID_MADE_DATE);
  TEXT_BUTTON_CONTAINER.appendChild(LISTING_END_DATE);
  TEXT_BUTTON_CONTAINER.appendChild(BUTTON_CONTAINER);
  LISTING_CONTAINER.appendChild(TEXT_BUTTON_CONTAINER);
  fetchListingImages(bid.listing, LISTING_CONTAINER);

  const OUTER_CONTAINER = document.getElementById('my-bid-listings-container');
  OUTER_CONTAINER.appendChild(LISTING_CONTAINER);

  return LISTING_CONTAINER;
}
