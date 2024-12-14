import { API_CREATE_LISTING } from '../constants';
import { headers } from '../headers';
import { displayErrorMessage } from '../bids/place';

/**
 * @function createListingRequestBody
 * @param {Element} formElement
 * @returns {Object} - The listing request body
 * @description This function creates a request body for a new listing.
 */

function createListingRequestBody(formElement) {
  const FORM_DATA = new FormData(formElement);

  const URLS = FORM_DATA.getAll('urls');
  const ALTS = FORM_DATA.getAll('alts');

  const LISTING_REQUEST_BODY = {
    title: FORM_DATA.get('title') || '',
    description: FORM_DATA.get('description'),
    tags: FORM_DATA.get('tags')
      ? FORM_DATA.get('tags')
          .split(',')
          .map((tag) => tag.trim())
      : [],
    media: URLS.map((url, index) => ({
      url: url,
      alt: ALTS[index] || '',
    })),
    endsAt: FORM_DATA.get('endsAt'),
  };

  return LISTING_REQUEST_BODY;
}

/**
 * @function postCreateFormDataToAPI
 * @param {Element} formElement
 * @returns {Promise<Object>} - The response data
 * @description This function sends a POST request to the API to create a new listing
 */

export async function postCreateFormDataToAPI(formElement) {
  try {
    const LISTING_REQUEST_BODY = createListingRequestBody(formElement);
    const response = await fetch(API_CREATE_LISTING, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify(LISTING_REQUEST_BODY),
    });

    if (response.ok) {
      const DATA = await response.json();
      const SUCCESS_MESSAGE = document.createElement('div');
      SUCCESS_MESSAGE.innerHTML =
        'Listing created successfully!<br> Please wait...';

      document.body.appendChild(SUCCESS_MESSAGE);
      SUCCESS_MESSAGE.classList.add(
        'text-green-500',
        'bg-black',
        'absolute',
        'text-3xl',
        'left-1/2',
        'top-1/2',
        'transform',
        '-translate-x-1/2',
        '-translate-y-1/2',
        'z-50'
      );
      setTimeout(() => {
        window.location.href = '/my_listings/';
      }, 3000);

      return DATA;
    } else {
      return response.json().then((errorResponse) => {
        const errorMessage = JSON.stringify(errorResponse).slice(22, -44);
        displayErrorMessage(errorMessage);
        throw new Error(`Failed to create listing: ${errorMessage}`);
      });
    }
  } catch (error) {
    throw new Error(`HTTP error: ${error.message}`);
  }
}
