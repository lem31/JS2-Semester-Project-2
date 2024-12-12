import { headers } from '../headers';
import { MY_LISTINGS_API } from '../constants';

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
    if (!Array.isArray(MY_LISTINGS)) {
      throw new Error('Fetched listings are not an array');
    }

    localStorage.setItem('myListings', JSON.stringify(MY_LISTINGS));

    const ALL_MY_LISTINGS = JSON.parse(
      localStorage.getItem('myListings') || '[]'
    );
    ALL_MY_LISTINGS.forEach((listing) => {
      createMyListingsElements(listing);
    });
  } catch (error) {
    console.error('Error fetching listings:', error);
    throw new Error('Error fetching listings');
  }
}
