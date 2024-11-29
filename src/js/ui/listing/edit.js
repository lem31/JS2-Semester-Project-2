import { headers } from '../../api/headers';

export function displayListingIdInUrlOnEditPage(event) {
  const LISTING_ID = event.target.dataset.id;
  window.location.href = `/listing/edit/?id=${LISTING_ID}`;
}

export function onClickAddMoreImages() {
  const ADD_MORE_IMAGES_BTN = document.getElementById('Add-image-button');
  if (ADD_MORE_IMAGES_BTN) {
    ADD_MORE_IMAGES_BTN.addEventListener('click', (event) => {
      event.preventDefault();
      const EDIT_FORM = document.getElementById('edit-form');

      const URL_INPUT = document.createElement('input');
      URL_INPUT.setAttribute('type', 'url');
      URL_INPUT.setAttribute('name', 'urls');
      URL_INPUT.setAttribute('placeholder', 'Image URL');
      URL_INPUT.setAttribute('class', 'input');
      EDIT_FORM.appendChild(URL_INPUT);
      const ALT_INPUT = document.createElement('input');
      ALT_INPUT.setAttribute('type', 'text');
      ALT_INPUT.setAttribute('name', 'alts');
      ALT_INPUT.setAttribute('placeholder', 'Image Alt');
      ALT_INPUT.setAttribute('class', 'input');
      EDIT_FORM.insertBefore(ALT_INPUT, ADD_MORE_IMAGES_BTN);
      EDIT_FORM.insertBefore(URL_INPUT, ALT_INPUT);
    });
  }
}
