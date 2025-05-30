import { MY_LISTINGS_API } from '../constants.js';
import { headers } from '../headers.js';
import { createMyListingsElements } from '../../ui/my_listings/read.js';

/**
 * @function getMyListings
 * @description Fetches all listings created by the logged in user
 * @returns {Promise<void>}
 * @throws {Error}
 */

export async function getMyListings() {
  try {
    const ACCESS_TOKEN = localStorage.getItem('accessToken');
    if (!ACCESS_TOKEN) {
      throw new Error('No access token found. Please log in.');
    }

    const RESPONSE = await fetch(MY_LISTINGS_API, {
      method: 'GET',
      headers: headers(),
    });



    if (!RESPONSE.ok) {
      throw new Error(`HTTP error! status: ${RESPONSE.status || 'unknown'}`);
    }

    const DATA = await RESPONSE.json();

    const MY_LISTINGS = DATA.data || [];

    localStorage.setItem('myListings', JSON.stringify(MY_LISTINGS));


    const LISTINGS = JSON.parse(localStorage.getItem('myListings') || '[]');



    const LISTINGS_CONTAINER = document.getElementById('my-auction-listings');
    if (LISTINGS_CONTAINER) {
      LISTINGS.forEach((listing) => {
        createMyListingsElements(listing, LISTINGS_CONTAINER);
      });
    }
  } catch (error) {
    throw new Error('Error fetching listings');
  }
}
