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

      if (LISTING.data.media && Array.isArray(LISTING.data.media)) {
        const URL_BOX = document.getElementById('url-container');

        LISTING.data.media.forEach((element, index) => {
          const mediaItemContainer = document.createElement('div');
          mediaItemContainer.classList.add('media-input-group', 'mb-2');
          const URL_DIV = document.createElement('div');
          URL_DIV.classList.add(
            'flex',
            'flex-col',
            'w-[200px]',
            'md:w-[300px]',
            'lg:w-[400px]',
            'xl:w-[500px]'
          );
          const ALT_DIV = document.createElement('div');

          ALT_DIV.classList.add(
            'flex',
            'flex-col',
            'w-[200px]',
            'md:w-[300px]',
            'lg:w-[400px]',
            'xl:w-[500px]'
          );

          const URL_INPUT = document.createElement('input');
          URL_INPUT.value = element.url;
          URL_INPUT.setAttribute('name', 'urls');
          URL_INPUT.setAttribute('type', 'url');
          URL_INPUT.classList.add('input', 'input-styles', 'mb-2', 'mt-2');
          URL_INPUT.setAttribute('placeholder', 'Image URL');

          const ALT_INPUT = document.createElement('input');
          ALT_INPUT.setAttribute('type', 'text');
          ALT_INPUT.value = element.alt || '';
          ALT_INPUT.setAttribute('name', 'alts');
          ALT_INPUT.classList.add('input', 'input-styles', 'mb-2', 'mt-2');
          ALT_INPUT.setAttribute('placeholder', 'Alt text');

          const URL_LABEL = document.createElement('label');
          URL_LABEL.innerText = 'Image URL';
          URL_LABEL.setAttribute('for', `media-url-${index}`);
          URL_LABEL.classList.add('label', 'gold-labels', 'mb-1');
          URL_INPUT.id = `media-url-${index}`;

          const ALT_LABEL = document.createElement('label');
          ALT_LABEL.innerText = 'Alt text';
          ALT_LABEL.setAttribute('for', `media-alt-${index}`);
          ALT_LABEL.classList.add('label', 'gold-labels', 'mb-1');
          ALT_INPUT.id = `media-alt-${index}`;
          const REMOVE_BUTTON = document.createElement('button');
          REMOVE_BUTTON.type = 'button';
          REMOVE_BUTTON.innerText = 'Remove';
          REMOVE_BUTTON.classList.add('button-styles', 'mt-2');

          REMOVE_BUTTON.onclick = () => {
            mediaItemContainer.remove();
          };

          URL_DIV.appendChild(URL_LABEL);
          URL_DIV.appendChild(URL_INPUT);
          ALT_DIV.appendChild(ALT_LABEL);
          ALT_DIV.appendChild(ALT_INPUT);

          mediaItemContainer.appendChild(URL_DIV);
          mediaItemContainer.appendChild(ALT_DIV);
          mediaItemContainer.appendChild(REMOVE_BUTTON);

          URL_BOX.appendChild(mediaItemContainer);
        });
      }
    } catch (error) {
      toastr.error(error.message);
    }
  }
}
