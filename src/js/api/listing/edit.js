import { headers } from '../../headers';

async function editListingInAPI(LISTING_ID, EDIT_FORM_DATA) {
  try {
    const RESPONSE = await fetch(
      `https://v2.api.noroff.dev/auction/listings/${LISTING_ID}`,
      {
        method: 'PUT',
        headers: headers(),
        body: JSON.stringify(EDIT_FORM_DATA),
      }
    );

    if (RESPONSE.ok) {
      const successMessage = document.createElement('div');
      successMessage.textContent = 'Post edited successfully';
      successMessage.style.color = 'green';
      document.body.appendChild(successMessage);
      alert('Post edited successfully');
      window.location.href = '/my_listings/';
    } else {
      const ERROR_DATA = await RESPONSE.json();
      throw new Error(ERROR_DATA.message || 'Failed to edit post');
    }
  } catch (error) {
    const errorMessage = document.createElement('div');
    errorMessage.textContent = error.message;
    errorMessage.style.color = 'red';
    document.body.appendChild(errorMessage);
  }
}
