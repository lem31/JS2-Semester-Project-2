import { headers } from '../headers';
import { MY_LISTINGS_API } from '../constants';
import { createMyListingsElements } from '../../ui/listing/read.js';

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

    const LISTINGS = DATA.data || [];

    localStorage.setItem('posts', JSON.stringify(LISTINGS));

    const LISTINGS_CONTAINER = document.getElementById('my-auction-listings');
    if (LISTINGS_CONTAINER) {
      LISTINGS_CONTAINER.innerHTML = '';
      LISTINGS.forEach((listing) => {
        try {
          new createMyListingsElements(listing, LISTINGS_CONTAINER);
        } catch (error) {
          throw new Error('Error creating post elements');
        }
      });
    }
  } catch (error) {
    throw new Error('Error fetching posts');
  }
}
