import { editListingInAPI } from '../../api/listing/edit';

export function displayListingIdInUrlOnEditPage(event) {
  const LISTING_ID = event.target.dataset.id;
  window.location.href = `/listing/edit/?id=${LISTING_ID}`;
}

export function onClickAddMoreImages() {
  const ADD_MORE_IMAGES_BTN = document.getElementById('Add-image-button-edit');
  if (ADD_MORE_IMAGES_BTN) {
    ADD_MORE_IMAGES_BTN.addEventListener('click', (event) => {
      event.preventDefault();
      const EDIT_FORM = document.getElementById('edit-form');
      const URL_INPUT = document.createElement('input');
      URL_INPUT.setAttribute('type', 'url');
      URL_INPUT.setAttribute('name', 'urls');
      URL_INPUT.setAttribute('placeholder', 'Image URL');
      URL_INPUT.setAttribute('class', 'input');
      URL_INPUT.classList.add('input-styles');
      EDIT_FORM.appendChild(URL_INPUT);
      const ALT_INPUT = document.createElement('input');
      ALT_INPUT.setAttribute('type', 'text');
      ALT_INPUT.setAttribute('name', 'alts');
      ALT_INPUT.setAttribute('placeholder', 'Image Alt');
      ALT_INPUT.setAttribute('class', 'input');
      const ADD_MORE_IMAGES_BTN = document.getElementById(
        'Add-image-button-edit'
      );
      EDIT_FORM.insertBefore(URL_INPUT, ADD_MORE_IMAGES_BTN);
      EDIT_FORM.insertBefore(ALT_INPUT, URL_INPUT);
      ALT_INPUT.classList.add('input-styles');
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
