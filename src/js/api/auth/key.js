import { headers } from '../headers';
import { API_KEY_NAME } from '../constants';
import { API_KEY_ENDPOINT } from '../constants';
import { handleApiError } from '../errorHandling';

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
      method: "POST",
      headers: headers(),
      body: JSON.stringify(API_KEY_NAME),
    });

    const DATA = await handleApiError(RESPONSE, "getAPIKey");

    localStorage.setItem("apiKey", DATA.key);
    return DATA.key;
  } catch (error) {
    toastr.error(error.message);
  }
}

