import { headers } from '../headers';
import { MY_BIDS_API } from '../constants';
import { createMyBidListingsElements } from '../../ui/bids/view';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

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
      if (MY_BIDS.length === 0) {
        toastr.error('No bids placed yet.');
      }
    }
  } catch (error) {
    throw new Error(`Error fetching listings: ${error.message}`);
  }
}
