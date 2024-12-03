import { DELETE_LISTING } from '../constants';

import { headers } from '../headers';

/**
 * @function removeListingFromAPI
 * @param {string} LISTING_ID
 * @description This function sends a DELETE request to the server to remove a listing from the database.
 * If the request is successful, a success message is displayed and the user is redirected to the my_listings page.
 * If the request fails, an error message is displayed.
 */

export async function removeListingFromAPI(LISTING_ID) {
  try {
    const RESPONSE = await fetch(
      `https://v2.api.noroff.dev/auction/listings/${LISTING_ID}`,
      {
        method: 'DELETE',
        headers: headers(),
      }
    );

    if (RESPONSE.ok) {
      const SUCCESS_MESSAGE = document.createElement('div');
      SUCCESS_MESSAGE.textContent = 'Post deleted successfully';
      SUCCESS_MESSAGE.style.color = 'green';
      document.body.appendChild(SUCCESS_MESSAGE);
      setTimeout(() => {
        window.location.href = '/my_listings/';
      }, 3000);
    } else {
      const ERROR_DATA = await RESPONSE.json();
      throw new Error(ERROR_DATA.message || 'Failed to delete post');
    }
  } catch (error) {
    const ERROR_MESSAGE = document.createElement('div');
    ERROR_MESSAGE.textContent = error.message;
    ERROR_MESSAGE.style.color = 'red';
    document.body.appendChild(ERROR_MESSAGE);
  }
}
