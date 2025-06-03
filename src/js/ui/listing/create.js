/**
 * Attaches a submit event listener to the create listing form.
 * On form submission, prevents default behavior and sends form data to the API.
 */

/**
 * Attaches a click event listener to the "Add More Images" button.
 * On click, dynamically adds new input fields for image URL and alt text to the form.
 */

import { postCreateFormDataToAPI } from '../../api/listing/create';

export function onCreateListing() {
  const CREATE_LISTING_FORM = document.getElementById('create-form');
  if (CREATE_LISTING_FORM) {
    CREATE_LISTING_FORM.addEventListener('submit', (event) => {
      event.preventDefault();
      postCreateFormDataToAPI(CREATE_LISTING_FORM);
    });
  }
}

export function onClickAddMoreImages() {
  const ADD_MORE_IMAGES_BTN = document.getElementById('Add-image-button');
  if (ADD_MORE_IMAGES_BTN) {
    ADD_MORE_IMAGES_BTN.addEventListener('click', () => {
      const CREATE_FORM = document.getElementById('create-form');
      const URL_CONTAINER = document.getElementById('url-container');
      const ALT_CONTAINER = document.getElementById('alt-container');

      const URL_INPUT = document.createElement('input');
      URL_INPUT.setAttribute('type', 'url');
      URL_INPUT.setAttribute('name', 'urls');
      URL_INPUT.setAttribute('placeholder', 'Image URL');
      URL_INPUT.setAttribute('class', 'input');
      CREATE_FORM.appendChild(URL_INPUT);
      const ALT_INPUT = document.createElement('input');
      ALT_INPUT.setAttribute('type', 'text');
      ALT_INPUT.setAttribute('name', 'alts');
      ALT_INPUT.setAttribute('placeholder', 'Image Alt');
      ALT_INPUT.setAttribute('class', 'input');

      URL_CONTAINER.appendChild(URL_INPUT);
      ALT_CONTAINER.appendChild(ALT_INPUT);
      URL_INPUT.classList.add('input-styles', 'mt-2', 'mb-2');
      ALT_INPUT.classList.add('input-styles', 'mt-2', 'mb-2');
    });
  }
}
