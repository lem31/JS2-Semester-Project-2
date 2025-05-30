import { API_PROFILE } from '../constants.js';
import { headers } from '../headers.js';
import { getUserProfile } from './read.js';
import toastr from "toastr";
import "toastr/build/toastr.min.css";


/**
 * @async
 * @function updateProfile
 * @returns {Promise<void>} - The profile
 * @exports updateProfile
 * @description This function sends a request to the server to update the user's profile. If the request is successful, the user's profile is updated.
 * If the request fails, an error message is logged to the console.
 */

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


  toastr.success("Profile updated successfully!");
  document.getElementById("my-profile").innerHTML = "";
getUserProfile();
}






  if (!RESPONSE.ok) {
    throw new Error(`HTTP error! status: ${RESPONSE.status || 'unknown'}`);
  }
}