import { headers } from '../headers';

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
  console.log('Posting bid to URL:', URL);
  try {
    const RESPONSE = await fetch(URL, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify({ amount: Number(BID_AMOUNT) }),
    });
    if (RESPONSE.ok) {
      const SUCCESS_MESSAGE = document.createElement('p');
      SUCCESS_MESSAGE.textContent = 'Bid posted successfully';
      SUCCESS_MESSAGE.style.color = 'green';
      document.body.appendChild(SUCCESS_MESSAGE);
      setTimeout(() => {
        window.location.href = '/';
      }, 3000);
      window.location.href = '/';
    }
    if (!RESPONSE.ok) {
      throw new Error('Failed to post bid');
    }
  } catch (error) {
    const ERROR_MESSAGE = document.createElement('p');
    ERROR_MESSAGE.textContent = 'Error posting bid: ' + error.message;
    ERROR_MESSAGE.style.color = 'red';
    document.body.appendChild(ERROR_MESSAGE);
    throw new Error('Error posting bid: ' + error.message);
  }
}
