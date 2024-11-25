import { updateProfile } from '../../api/profile/update';

const UPDATE_PROFILE_FORM = document.querySelector('.update-profile-form');

export function onSubmitUpdateProfileForm() {
  UPDATE_PROFILE_FORM.addEventListener('submit', function (event) {
    event.preventDefault();
    updateProfile();
  });
}
