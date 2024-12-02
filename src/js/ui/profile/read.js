/**
 * @param {object} PROFILE - The user profile object
 * @param {string} PROFILE.name - The user's name
 * @param {string} PROFILE.bio - The user's bio
 * @param {object} PROFILE.banner - The user's banner
 * @param {string} PROFILE.banner.url - The user's banner URL
 * @param {object} PROFILE.avatar - The user's avatar
 * @param {string} PROFILE.avatar.url - The user's avatar URL
 * @param {number} PROFILE.credits - The user's credits
 *
 * @returns {HTMLElement} - The user profile element
 *
 * @description This function displays the user profile on the page
 */

export function displayUserProfile(PROFILE) {
  const USER_PROFILE = document.getElementById('my-profile');
  const USER_NAME = document.createElement('h2');
  const BIO = document.createElement('p');
  const BANNER = document.createElement('img');
  const AVATAR = document.createElement('img');
  const CREDITS = document.createElement('p');

  BANNER.classList.add('profile-banner');
  AVATAR.classList.add('profile-avatar');
  USER_PROFILE.appendChild(BANNER);
  USER_PROFILE.appendChild(AVATAR);
  USER_PROFILE.appendChild(USER_NAME);
  USER_PROFILE.appendChild(BIO);
  USER_PROFILE.appendChild(CREDITS);

  USER_NAME.innerHTML = PROFILE.name || 'N/A';
  BIO.innerHTML = PROFILE.bio || 'N/A';
  BANNER.src =
    PROFILE.banner && PROFILE.banner.url
      ? PROFILE.banner.url
      : '../../../ui/images/default-banner.jpg';

  AVATAR.src =
    PROFILE.avatar && PROFILE.avatar.url
      ? PROFILE.avatar.url
      : '../../../ui/images/default-avatar.jpg';

  CREDITS.innerHTML = `My Credits:${PROFILE.credits}` || 'N/A';

  return USER_PROFILE;
}

/**
 * @function displayUpdateProfileForm
 * @returns {HTMLElement} - The update profile form element
 * @param {object} PROFILE - The user profile object
 * @param {string} PROFILE.name - The user's name
 * @param {string} PROFILE.bio - The user's bio
 * @param {object} PROFILE.banner - The user's banner
 * @param {string} PROFILE.banner.url - The user's banner URL
 * @param {object} PROFILE.avatar - The user's avatar
 * @param {string} PROFILE.avatar.url - The user's avatar URL
 * @param {number} PROFILE.credits - The user's credits
 * @description This function displays and hides the update profile form on the page
 */

function displayUpdateProfileForm() {
  const UPDATE_PROFILE_FORM_BOX = document.getElementById(
    'update-profile-form'
  );
  if (UPDATE_PROFILE_FORM_BOX.style.display === 'none') {
    UPDATE_PROFILE_FORM_BOX.style.display = 'block';
  } else if (UPDATE_PROFILE_FORM_BOX.style.display === 'block') {
    UPDATE_PROFILE_FORM_BOX.style.display = 'none';
  } else {
    UPDATE_PROFILE_FORM_BOX.style.display = 'none';
  }
}

/**
 * @function onClickUpdateProfileBtn
 * @exports onClickUpdateProfileBtn
 * @description This function adds an event listener to the update profile button
 * that calls the displayUpdateProfileForm function
 */

export function onClickUpdateProfileBtn() {
  const SHOW_UPDATE_PROFILE_BTN = document.getElementById(
    'show-update-form-btn'
  );

  SHOW_UPDATE_PROFILE_BTN.addEventListener('click', displayUpdateProfileForm);
}
