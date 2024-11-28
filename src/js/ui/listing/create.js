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
