import coinImage from '../../../../images/icons8-coins-64.png';
import defaultAvatar from '../../../../images/no-photos.jpg';
import defaultBanner from '../../../../images/no-photos.jpg';

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
  const BANNER_AVATAR_CONTAINER = document.createElement('div');
  const COIN_IMAGE_CREDITS_CONTAINER = document.createElement('div');
  const COIN_IMAGE = document.createElement('img');

  BANNER.classList.add('banner');
  AVATAR.classList.add('profile-avatar');
  BANNER.classList.add('profile-banner');
  AVATAR.classList.add('profile-avatar');
  USER_NAME.classList.add('labels');
  COIN_IMAGE_CREDITS_CONTAINER.classList.add('flex-row-center');
  CREDITS.classList.add('labels');
  BIO.classList.add('body-text-mobile', 'md:body-text-desktop');
  COIN_IMAGE_CREDITS_CONTAINER.appendChild(COIN_IMAGE);
  COIN_IMAGE_CREDITS_CONTAINER.appendChild(CREDITS);
  BANNER_AVATAR_CONTAINER.appendChild(BANNER);
  BANNER_AVATAR_CONTAINER.appendChild(AVATAR);
  BANNER_AVATAR_CONTAINER.classList.add('banner-container');
  USER_PROFILE.appendChild(BANNER_AVATAR_CONTAINER);
  USER_PROFILE.appendChild(USER_NAME);
  USER_PROFILE.appendChild(BIO);
  USER_PROFILE.appendChild(COIN_IMAGE_CREDITS_CONTAINER);

  COIN_IMAGE.src = coinImage;

  USER_NAME.innerHTML = PROFILE.name || 'N/A';
  BIO.innerHTML = PROFILE.bio || 'N/A';
  BANNER.src =
    PROFILE.banner && PROFILE.banner.url ? PROFILE.banner.url : defaultBanner;

  AVATAR.src =
    PROFILE.avatar && PROFILE.avatar.url ? PROFILE.avatar.url : defaultAvatar;

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

export function displayUpdateProfileForm() {
  const UPDATE_PROFILE_FORM = document.querySelector('.update-profile-form');

  if (UPDATE_PROFILE_FORM.classList.contains('hidden')) {
    UPDATE_PROFILE_FORM.classList.remove('hidden');
    UPDATE_PROFILE_FORM.classList.add('form-styles');
  } else if (UPDATE_PROFILE_FORM.classList.contains('form-styles')) {
    UPDATE_PROFILE_FORM.classList.remove('form-styles');
    UPDATE_PROFILE_FORM.classList.add('hidden');
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
