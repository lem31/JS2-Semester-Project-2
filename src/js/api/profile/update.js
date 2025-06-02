import { API_PROFILE } from '../constants.js';
import { headers } from '../headers.js';
import { getUserProfile } from './read.js';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import { handleApiError } from '../errorHandling.js';

/**
 * @async
 * @function updateProfile
 * @returns {Promise<void>} - The profile
 * @exports updateProfile
 * @description This function sends a request to the server to update the user's profile. If the request is successful, the user's profile is updated.
 * If the request fails, an error message is logged to the console.
 */

export async function updateProfile() {
  try {
    const UPDATE_PROFILE_FORM = document.querySelector('.update-profile-form');
    const UPDATE_PROFILE_FORM_OBJECT = new FormData(UPDATE_PROFILE_FORM);
    const FORM_DATA = Object.fromEntries(UPDATE_PROFILE_FORM_OBJECT);

    const REQUEST_BODY_UPDATE_PROFILE = {
      bio: FORM_DATA.bio,
      ...(FORM_DATA.avatarUrl && {
        avatar: {
          url: FORM_DATA.avatarUrl,
          alt: FORM_DATA.avatarUrl,
        },
      }),
      ...(FORM_DATA.bannerUrl && {
        banner: {
          url: FORM_DATA.bannerUrl,
          alt: FORM_DATA.bannerAlt,
        },
      }),
    };

    const USER = JSON.parse(localStorage.getItem('user'));
    const NAME = USER ? USER.name : null;
    if (!NAME) {
      toastr.error('User name not found in local storage.');
      return;
    }

    const RESPONSE = await fetch(`${API_PROFILE}${NAME}`, {
      method: 'PUT',
      headers: headers(),
      body: JSON.stringify(REQUEST_BODY_UPDATE_PROFILE),
    });

    await handleApiError(RESPONSE, 'updateProfile');

    toastr.success('Profile updated successfully!');
    document.getElementById('my-profile').innerHTML = '';
    getUserProfile();
  } catch (error) {
    toastr.error(error.message);
  }
}
