import { updateProfile } from '../../api/profile/update';

const UPDATE_PROFILE_FORM = document.querySelector('.update-profile-form');

/**
 * @function onSubmitUpdateProfileForm
 * @description This function listens for the submit event on the update profile form
 * and calls the updateProfile function
 */
export function onSubmitUpdateProfileForm() {
  UPDATE_PROFILE_FORM.addEventListener('submit', function (event) {
    event.preventDefault();
    updateProfile();
  });
}
