import { headers } from '../headers';
import { API_PROFILE } from '../constants';
import { displayUserProfile } from '../../ui/profile/read';

/**
 * @async
 * @function getUserProfile
 * @returns {Promise<void>}
 * @exports getUserProfile
 * @description This function sends a request to the server to get the user's profile. If the request is successful, the user's profile is displayed.
 * If the request fails, an error message is logged to the console.
 */

export async function getUserProfile() {
  try {
    const USER = JSON.parse(localStorage.getItem('user'));
    const NAME = USER ? USER.name : null;
    if (!NAME) {
      throw new Error('User name not found in local storage.');
    }
    const RESPONSE = await fetch(`${API_PROFILE}${NAME}`, {
      method: 'GET',
      headers: headers(),
    });

    if (!RESPONSE.ok) {
      console.error('HTTP error response:', RESPONSE);
      throw new Error(`HTTP error! status: ${RESPONSE.status || 'unknown'}`);
    }

    const data = await RESPONSE.json();

    const PROFILE = data.data || {};

    displayUserProfile(PROFILE);
  } catch (error) {
    console.error('Error fetching profile:', error);
  }
}
