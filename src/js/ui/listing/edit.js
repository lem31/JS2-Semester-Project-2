/**
 * Redirects to the edit page for a listing, appending the listing ID to the URL.
 * @param {Event} event - The click event containing the listing ID in its dataset.
 */

/**
 * Adds event listener to the "Add More Images" button, dynamically adding input fields for image URLs and alts to the edit form.
 */

/**
 * Adds submit event listener to the edit form, triggering the API call to save the edited listing.
 * @throws {Error} If the edit form is not found in the DOM.
 */

/**
 * Adds click event listener to the cancel button, redirecting the user to the "My Listings" page.
 */
import { editListingInAPI } from '../../api/listing/edit';

export function displayListingIdInUrlOnEditPage(event) {
  const LISTING_ID = event.target.dataset.id;
  window.location.href = `/listing/edit/?id=${LISTING_ID}`;
}

export function onClickAddMoreImages() {
  const ADD_MORE_IMAGES_BTN = document.getElementById('Add-image-button-edit');
  if (ADD_MORE_IMAGES_BTN) {
    ADD_MORE_IMAGES_BTN.addEventListener('click', () => {
      const URL_CONTAINER = document.getElementById('url-container');
      const URL_DIV = document.createElement('div');
      const ALT_DIV = document.createElement('div');
      URL_DIV.classList.add(
        'flex',
        'flex-col',
        'align-items-start',
        'mb-2',
        'w-[200px]',
        'md:w-[300px]',
        'lg:w-[400px]',
        'xl:w-[500px]'
      );
      ALT_DIV.classList.add(
        'flex',
        'flex-col',
        'align-items-start',
        'mb-2',
        'w-[200px]',
        'md:w-[300px]',
        'lg:w-[400px]',
        'xl:w-[500px]'
      );

      const IMAGE_INPUT_WRAPPER = document.createElement('div');
      IMAGE_INPUT_WRAPPER.classList.add(
        'image-input-wrapper',
        'flex',
        'flex-col',
        'items-start',
        'mb-2',
        'w-[200px]',
        'md:w-[300px]',
        'lg:w-[400px]',
        'xl:w-[500px]'
      );

      const URL_LABEL = document.createElement('label');
      URL_LABEL.setAttribute('for', 'urls');
      URL_LABEL.textContent = 'Image URL';
      URL_LABEL.classList.add('gold-labels', 'mr-2');

      const URL_INPUT = document.createElement('input');
      URL_INPUT.setAttribute('type', 'url');
      URL_INPUT.setAttribute('name', 'urls');
      URL_INPUT.setAttribute('placeholder', 'Image URL');

      URL_INPUT.classList.add('input', 'input-styles');

      URL_INPUT.classList.add('input', 'input-styles', 'w-[100%]');
      URL_INPUT.setAttribute('id', 'urlInput');

      const ALT_LABEL = document.createElement('label');
      ALT_LABEL.setAttribute('for', 'alts');
      ALT_LABEL.textContent = 'Image Alt';
      ALT_LABEL.classList.add('gold-labels', 'mr-2');

      const ALT_INPUT = document.createElement('input');
      ALT_INPUT.setAttribute('type', 'text');
      ALT_INPUT.setAttribute('name', 'alts');
      ALT_INPUT.setAttribute('placeholder', 'Alt text');
      ALT_INPUT.classList.add('input', 'input-styles', 'w-[100%]');

      ALT_INPUT.setAttribute('id', 'altInput');

      const REMOVE_BTN_DIV = document.createElement('div');
      REMOVE_BTN_DIV.classList.add('flex', 'justify-start', 'w-full');
      const REMOVE_BTN = document.createElement('button');
      REMOVE_BTN.type = 'button';
      REMOVE_BTN.textContent = 'Remove';
      REMOVE_BTN.classList.add('button-styles', 'ml-2');
      REMOVE_BTN.addEventListener('click', () => {
        IMAGE_INPUT_WRAPPER.remove();
      });
      URL_DIV.appendChild(URL_LABEL);
      URL_DIV.appendChild(URL_INPUT);
      ALT_DIV.appendChild(ALT_LABEL);
      ALT_DIV.appendChild(ALT_INPUT);
      REMOVE_BTN_DIV.appendChild(REMOVE_BTN);
      IMAGE_INPUT_WRAPPER.appendChild(URL_DIV);

      IMAGE_INPUT_WRAPPER.appendChild(ALT_DIV);

      IMAGE_INPUT_WRAPPER.appendChild(REMOVE_BTN_DIV);

      URL_CONTAINER.appendChild(IMAGE_INPUT_WRAPPER);
    });
  }
}

export function onClickSaveListingBtn() {
  const EDIT_FORM = document.getElementById('edit-form');

  if (EDIT_FORM) {
    EDIT_FORM.addEventListener('submit', async (event) => {
      event.preventDefault();

      editListingInAPI(event);
    });
  } else {
    throw new Error('Edit form not found');
  }
}

export function onClickCancelBtn() {
  const CANCEL_BTN = document.getElementById('cancel-btn');
  if (CANCEL_BTN) {
    CANCEL_BTN.addEventListener('click', (event) => {
      event.preventDefault();
      window.location.href = '/my_listings/';
    });
  }
}
