import { headers } from '../headers';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import { handleApiError } from '../errorHandling';

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

    await handleApiError(RESPONSE, "removeListing");


      toastr.success('Post deleted successfully <br> Please Wait...');

      setTimeout(() => {
        window.location.href = '/my_listings/';
      }, 3000);
    }catch (error) {
    toastr.error(error.message);
  }
}
