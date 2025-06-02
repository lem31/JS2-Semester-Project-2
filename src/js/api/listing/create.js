import { API_CREATE_LISTING } from '../constants';
import { headers } from '../headers';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import { handleApiError } from '../errorHandling';

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
    const RESPONSE = await fetch(API_CREATE_LISTING, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify(LISTING_REQUEST_BODY),
    });

    const DATA = await handleApiError(RESPONSE, 'postCreateListing');

    toastr.success('Listing created successfully!<br> Please wait...');

    setTimeout(() => {
      window.location.href = '/my_listings/';
    }, 3000);

    return DATA;
  } catch (error) {
    toastr.error(error.message);
  }
}
