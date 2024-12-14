import { headers } from '../headers';
import { API_KEY_NAME } from '../constants';
import { API_KEY_ENDPOINT } from '../constants';

/**
 * @async
 * @function getAPIKey
 * @exports getAPIKey
 * @description This function sends a request to the server to get an API key. If the request is successful, the API key is saved in local storage.
 * If the request fails, an error message is logged to the console.
 */

export async function getAPIKey() {
  try {
    const RESPONSE = await fetch(API_KEY_ENDPOINT, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify(API_KEY_NAME),
    });

    if (RESPONSE.ok) {
      const DATA = await RESPONSE.json();
      localStorage.setItem('apiKey', DATA.key);
    } else {
      const ERROR_MESSAGE = await RESPONSE.text();
      throw new Error(`Error: ${RESPONSE.status} ${ERROR_MESSAGE}`);
    }
  } catch (error) {
    throw error;
  }
}
