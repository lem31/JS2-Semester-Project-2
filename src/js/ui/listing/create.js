import { postCreateFormDataToAPI } from '../../api/listing/create';

/**
 * @function onCreateListing
 * @returns {void}
 * @description This function initiates the creation of a new listing once the create listing form is submitted.
 * @listens submit
 * @fires postCreateFormDataToAPI
 */
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
      CREATE_FORM.insertBefore(ALT_INPUT, ADD_MORE_IMAGES_BTN);
      CREATE_FORM.insertBefore(URL_INPUT, ALT_INPUT);
    });
  }
}
