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
