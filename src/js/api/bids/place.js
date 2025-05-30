import { headers } from '../headers';
import toastr from "toastr";
import "toastr/build/toastr.min.css";

/**
 * @function postBidToAPI
 * @param {string} LISTING_ID
 * @param {number} BID_AMOUNT
 * @param {Object} event
 * @description This function sends a request to the server to post a bid to a listing. If the request is successful,
 * an alert is shown and the user is redirected to the home page.
 * If the request fails, an error message is logged to the console.
 */

export async function postBidToAPI(LISTING_ID, BID_AMOUNT, event) {
  event.preventDefault();

  const URL = `https://v2.api.noroff.dev/auction/listings/${LISTING_ID}/bids`;

  try {
    const RESPONSE = await fetch(URL, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify({ amount: Number(BID_AMOUNT) }),
    });
    if (RESPONSE.ok) {

     toastr.success( 'Bid posted successfully');


    }
    if (!RESPONSE.ok) {
      const errorResponse = await RESPONSE.json();
      toastr.error(JSON.stringify(errorResponse).slice(23, -44));
      throw new Error('Failed to post bid');
    }
  } catch (error) {
    throw new Error('Error posting bid: ' + error.message);
  }
}


