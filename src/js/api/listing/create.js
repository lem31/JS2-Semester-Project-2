// import { API_CREATE_LISTING } from '../constants';
import { headers } from '../constants';

function createListingRequestBody(formElement) {
  const formData = new FormData(formElement);
  const listingRequestBody = {
    title: formData.get('title'),
    description: formData.get('description'),
    tags: formData.get('tags'),
    media: {
      url: formData.get('mediaUrl'),
      alt: formData.get('mediaAlt'),
    },
    endsAt: formData.get('endsAt'),
  };
  return listingRequestBody;
}

export async function postCreateFormDataToAPI(formElement) {
  try {
    const listingRequestBody = createListingRequestBody(formElement);
    const response = await fetch(`${API_CREATE_LISTING}`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify(listingRequestBody),
    });

    if (response.ok) {
      const DATA = await response.json();
      console.log('Listing created successfully:', DATA);

      return DATA;
    } else {
      throw new Error('Failed to create post');
    }
  } catch (error) {
    console.error('HTTP error catch:', error);
  }
}
