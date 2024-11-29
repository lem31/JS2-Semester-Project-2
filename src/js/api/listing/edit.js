import { headers } from '../headers';

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
      const LISTING = await RESPONSE.json();

      document.getElementById('title').value = LISTING.data.title;
      document.getElementById('description').value = LISTING.data.description;
      document.getElementById('tags').value = LISTING.data.tags.join(', ');
      document.getElementById('endsAt').value = LISTING.data.endsAt.slice(
        0,
        16
      );
      const media = LISTING.data.media;
      if (media && media.length > 0) {
        document.getElementById('urls').value = media
          .map((item) => item.url)
          .join(', ');
        document.getElementById('alts').value = media
          .map((item) => item.alt)
          .join(', ');
      } else {
        document.getElementById('urls').value = '';
        document.getElementById('alts').value = '';
      }
    } catch (error) {
      throw new Error('Error fetching post: ' + error.message);
    }
  }
}
