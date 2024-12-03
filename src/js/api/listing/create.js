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

  const urls = formData.getAll('urls');
  const alts = formData.getAll('alts');

  const listingRequestBody = {
    title: formData.get('title'),
    description: formData.get('description'),
    tags: formData.get('tags')
      ? formData
          .get('tags')
          .split(',')
          .map((tag) => tag.trim())
      : [],
    media: urls.map((url, index) => ({
      url: url,
      alt: alts[index] || '',
    })),
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
      const SUCCESS_MESSAGE = document.createElement('div');
      SUCCESS_MESSAGE.textContent = 'Listing created successfully!';
      SUCCESS_MESSAGE.style.color = 'green';
      document.body.appendChild(SUCCESS_MESSAGE);

      setTimeout(() => {
        window.location.href = '/my_listings/';
      }, 3000);

      return DATA;
    } else {
      const ERROR_MESSAGE = document.createElement('div');
      ERROR_MESSAGE.textContent = 'Failed to create listing. Please try again.';
      ERROR_MESSAGE.style.color = 'red';
      document.body.appendChild(ERROR_MESSAGE);
      throw new Error('Failed to create listing');
    }
  } catch (error) {
    throw new Error(`HTTP error: ${error.message}`);
  }
}
