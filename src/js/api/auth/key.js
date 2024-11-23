import { headers } from '../headers';
import { API_KEY_NAME } from '../constants';
import { API_KEY_ENDPOINT } from '../constants';

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
      console.error('Error:', RESPONSE.status, ERROR_MESSAGE);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}
