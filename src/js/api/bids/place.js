import { headers } from '../headers';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import { handleApiError } from '../errorHandling';

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
  const CACHE_KEY = `bid-${LISTING_ID}`;

  const cachedBid = localStorage.getItem(CACHE_KEY);
  if (cachedBid && JSON.parse(cachedBid).amount === Number(BID_AMOUNT)) {
    toastr.warning('You have already placed this bid.');
    return;
  }

  try {
    const RESPONSE = await fetch(URL, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify({ amount: Number(BID_AMOUNT) }),
    });

    const responseData = await handleApiError(RESPONSE, 'postBid');
    toastr.success('Bid posted successfully');
    localStorage.setItem(CACHE_KEY, JSON.stringify(responseData));
  } catch (error) {
    toastr.error(error.message);
  }
}
