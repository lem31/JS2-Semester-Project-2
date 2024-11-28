import { API_CREATE_LISTING } from '../constants';
import { headers } from '../headers';

/**
 * @function createListingRequestBody
 * @param {Element} formElement
 * @returns {Object} - The listing request body
 * @description This function creates a request body for a new listing.
 */

function createListingRequestBody(formElement) {
  const formData = new FormData(formElement);
  const listingRequestBody = {
    title: formData.get('title'),
    description: formData.get('description'),
    tags: formData
      .get('tags')
      .split(',')
      .map((tag) => tag.trim()),
    media: [
      {
        url: formData.get('url'),
        alt: formData.get('alt'),
      },
    ],
    endsAt: formData.get('endsAt'),
  };
  return listingRequestBody;
}

/**
 * @function postCreateFormDataToAPI
 * @param {Element} formElement
 * @returns {Promise<Object>} - The response data
 * @description This function sends a POST request to the API to create a new listing
 */

export async function postCreateFormDataToAPI(formElement) {
  try {
    const listingRequestBody = createListingRequestBody(formElement);
    const response = await fetch(API_CREATE_LISTING, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify(listingRequestBody),
    });

    if (response.ok) {
      const DATA = await response.json();
      window.location.href = '/my_listings/';
      return DATA;
    } else {
      throw new Error('Failed to create post');
    }
  } catch (error) {
    throw new Error(`HTTP error: ${error.message}`);
  }
}
