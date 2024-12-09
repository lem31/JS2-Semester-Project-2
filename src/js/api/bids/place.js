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
      return RESPONSE.json().then((errorResponse) => {
        displayErrorMessage(JSON.stringify(errorResponse));
        throw new Error('Failed to post bid');
      });
    }
  } catch (error) {
    console.error('Network response was not ok:', RESPONSE);

    throw new Error('Error posting bid: ' + error.message);
  }
}

/**
 * @function displayErrorMessage
 * @param {string} message
 * @description This function displays an error message to the user.
 */
export function displayErrorMessage(message) {
  const ERROR_MESSAGE_CONTAINER = document.createElement('div');
  ERROR_MESSAGE_CONTAINER.classList.add(
    'error-message',
    'text-red-500',
    'fixed',
    'top-1/2',
    'left-1/2',
    'transform',
    '-translate-x-1/2',
    '-translate-y-1/2',
    'bg-white',
    'p-4',
    'border',
    'border-red-500',
    'z-50'
  );
  ERROR_MESSAGE_CONTAINER.textContent = message;
  document.body.appendChild(ERROR_MESSAGE_CONTAINER);

  setTimeout(() => {
    ERROR_MESSAGE_CONTAINER.remove();
  }, 5000);
}
