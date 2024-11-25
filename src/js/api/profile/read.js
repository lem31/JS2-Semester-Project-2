import { headers } from '../headers';
import { API_PROFILE } from '../constants';
import { displayUserProfile } from '../../ui/profile/read';

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

export async function updateUserProfileCredits() {
  try {
    const USER = JSON.parse(localStorage.getItem('user'));
    const NAME = USER ? USER.name : null;
    if (!NAME) {
      throw new Error('User name not found in local storage.');
    }

    const PROFILE_CREDITS = { credits: 1000 };

    const RESPONSE = await fetch(`${API_PROFILE}${NAME}`, {
      method: 'PUT',
      headers: headers(),
      body: JSON.stringify(PROFILE_CREDITS),
    });

    if (!RESPONSE.ok) {
      console.error('HTTP error response:', RESPONSE);
      throw new Error(`HTTP error! status: ${RESPONSE.status || 'unknown'}`);
    }

    const data = await RESPONSE.json();
    console.log('Profile updated successfully:', data);
  } catch (error) {
    console.error('Error updating profile:', error);
  }
}
