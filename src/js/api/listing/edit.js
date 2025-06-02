import { headers } from '../headers';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import { handleApiError } from '../errorHandling';

/**
 * @function editListingInAPI
 * @param {Object} event
 * @param {string} LISTING_ID
 * @param {Object} EDIT_FORM_DATA
 * @description This function sends a request to the server to edit a listing. If the request is successful,
 * a success message is shown and the user is redirected to the my listings page.
 * If the request fails, an error message is logged to the console and an error message is displayed on the page.
 */
export async function editListingInAPI(event) {
  event.preventDefault();

  const URL_PARAMS = new URLSearchParams(window.location.search);
  const LISTING_ID = URL_PARAMS.get('id');
  const formElement = document.getElementById('edit-form');
  const FORM_DATA = new FormData(formElement);
  const URLS = FORM_DATA.getAll('urls');
  const ALTS = FORM_DATA.getAll('alts');
  const EDIT_FORM_DATA = {
    title: document.getElementById('title').value,
    description: document.getElementById('description').value,
    tags: document
      .getElementById('tags')
      .value.split(',')
      .map((tag) => tag.trim()),
    endsAt: document.getElementById('endsAt').value,
    media: URLS.map((url, index) => ({
      url: url,
      alt: ALTS[index] || '',
    })),
  };

  try {
    const RESPONSE = await fetch(
      `https://v2.api.noroff.dev/auction/listings/${LISTING_ID}`,
      {
        method: 'PUT',
        headers: headers(),
        body: JSON.stringify(EDIT_FORM_DATA),
      }
    );

    await handleApiError(RESPONSE, 'editListing');

    toastr.success('Post edited successfully!');
    setTimeout(() => {
      window.location.href = '/my_listings/';
    }, 3000);
  } catch (error) {
    toastr.error(error.message);
  }
}

/**
 * @function populateEditForm
 * @description This function populates the edit form with the data from the listing that is being edited.
 */

export async function populateEditForm() {
  const URL_PARAMS = new URLSearchParams(window.location.search);
  const LISTING_ID = URL_PARAMS.get('id');

  if (LISTING_ID) {
    try {
      const RESPONSE = await fetch(
        `https://v2.api.noroff.dev/auction/listings/${LISTING_ID}`,
        {
          headers: headers(),
        }
      );

      const LISTING = await handleApiError(RESPONSE, 'fetchListing');

      document.getElementById('title').value = LISTING.data.title || '';
      document.getElementById('description').value =
        LISTING.data.description || '';
      document.getElementById('tags').value = LISTING.data.tags
        ? LISTING.data.tags.join(', ')
        : '';
      document.getElementById('endsAt').value = LISTING.data.endsAt
        ? LISTING.data.endsAt.slice(0, 16)
        : '';

      const mediaInputsContainer = document.getElementById('mediaInputs');

      if (LISTING.data.media && Array.isArray(LISTING.data.media)) {
        LISTING.data.media.forEach((element) => {
          const URL_INPUT = document.createElement('input');
          URL_INPUT.value = element.url;
          URL_INPUT.setAttribute('name', 'urls');
          mediaInputsContainer.appendChild(URL_INPUT);

          const ALT_INPUT = document.createElement('input');
          ALT_INPUT.value = element.alt || '';
          ALT_INPUT.setAttribute('name', 'alts');

          mediaInputsContainer.appendChild(ALT_INPUT);
        });
      }
    } catch (error) {
      toastr.error(error.message);
    }
  }
}
