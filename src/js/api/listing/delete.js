import { DELETE_LISTING } from '../constants';

import { headers } from '../headers';

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
      const successMessage = document.createElement('div');
      successMessage.textContent = 'Post deleted successfully';
      successMessage.style.color = 'green';
      document.body.appendChild(successMessage);
      alert('Post deleted successfully');
      window.location.href = '/my_listings/';
    } else {
      const ERROR_DATA = await RESPONSE.json();
      throw new Error(ERROR_DATA.message || 'Failed to delete post');
    }
  } catch (error) {
    const errorMessage = document.createElement('div');
    errorMessage.textContent = error.message;
    errorMessage.style.color = 'red';
    document.body.appendChild(errorMessage);
  }
}
