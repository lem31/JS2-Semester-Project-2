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
      const ALT_INPUT_BOX = document.createElement('div');
      ALT_INPUT_BOX.classList.add('alt-input-box');
      const URL_INPUT_BOX = document.createElement('div');
      URL_INPUT_BOX.classList.add('url-input-box', 'mb-2', 'mt-2', 'w-full');
      const IMAGE_INPUT_GROUP = document.createElement('div');
      IMAGE_INPUT_GROUP.classList.add('image-input-group');

      const REMOVE_BTN = document.createElement('button');
      REMOVE_BTN.type = 'button';
      REMOVE_BTN.textContent = 'Remove';
      REMOVE_BTN.classList.add('remove-image-btn', 'button-styles', 'ml-2');
      REMOVE_BTN.addEventListener('click', () => {
        IMAGE_INPUT_GROUP.remove();
      });

      URL_CONTAINER.appendChild(IMAGE_INPUT_GROUP);
      const URL_LABEL = document.createElement('label');
      URL_LABEL.textContent = 'Image Url';
      URL_LABEL.setAttribute('for', `image-url-${Date.now()}`);
      URL_LABEL.classList.add('gold-labels', 'mt-2', 'mb-2');
      const ALT_LABEL = document.createElement('label');
      ALT_LABEL.textContent = 'Image Alt';
      ALT_LABEL.classList.add('gold-labels', 'mt-2', 'mb-2');

      ALT_LABEL.setAttribute('for', `image-alt-${Date.now()}`);
      URL_INPUT_BOX.classList.add('flex', 'flex-col', 'items-start', 'w-full');
      ALT_INPUT_BOX.classList.add('flex', 'flex-col', 'items-start', 'w-full');

      const URL_INPUT = document.createElement('input');
      URL_INPUT.setAttribute('type', 'url');
      URL_INPUT.setAttribute('name', 'urls');
      URL_INPUT.setAttribute('placeholder', 'Image URL');
      URL_INPUT.setAttribute('class', 'input');

      const ALT_INPUT = document.createElement('input');
      ALT_INPUT.setAttribute('type', 'text');
      ALT_INPUT.setAttribute('name', 'alts');
      ALT_INPUT.setAttribute('placeholder', 'Alt text');
      ALT_INPUT.setAttribute('class', 'input');
      URL_INPUT.classList.add('input-styles', 'mb-2', 'mt-2', 'w-full');
      ALT_INPUT.classList.add('input-styles', 'mb-2', 'mt-2', 'w-full');

      URL_INPUT_BOX.appendChild(URL_LABEL);
      URL_INPUT_BOX.appendChild(URL_INPUT);
      ALT_INPUT_BOX.appendChild(ALT_LABEL);
      ALT_INPUT_BOX.appendChild(ALT_INPUT);

      IMAGE_INPUT_GROUP.appendChild(URL_INPUT_BOX);
      IMAGE_INPUT_GROUP.appendChild(ALT_INPUT_BOX);
      IMAGE_INPUT_GROUP.appendChild(REMOVE_BTN);

      URL_CONTAINER.appendChild(IMAGE_INPUT_GROUP);
    });
  }
}
