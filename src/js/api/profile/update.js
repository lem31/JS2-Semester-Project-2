import { API_PROFILE } from '../constants.js';
import { headers } from '../headers.js';
import { getUserProfile } from './read.js';

export async function updateProfile() {
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

  try {
    const USER = JSON.parse(localStorage.getItem('user'));
    const NAME = USER ? USER.name : null;
    if (!NAME) {
      throw new Error('User name not found in local storage.');
    }

    const RESPONSE = await fetch(`${API_PROFILE}${NAME}`, {
      method: 'PUT',
      headers: headers(),
      body: JSON.stringify(REQUEST_BODY_UPDATE_PROFILE),
    });

    if (RESPONSE.ok) {
      const data = await RESPONSE.json();
      console.log('Profile updated successfully:', data);
      const profileContainer = document.querySelector('#my-profile');
      if (profileContainer) {
        profileContainer.innerHTML = '';
      }
      await getUserProfile();
    }

    if (!RESPONSE.ok) {
      console.error('HTTP error response:', RESPONSE);
      throw new Error(`HTTP error! status: ${RESPONSE.status || 'unknown'}`);
    }
  } catch (error) {
    console.error('Error updating profile:', error);
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

    console.log('Profile updated successfully:', data);
    await getUserProfile();
  } catch (error) {
    console.error('Error updating profile:', error);
  }
}
