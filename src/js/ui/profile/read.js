export function displayUserProfile(PROFILE) {
  const USER_PROFILE = document.getElementById('my-profile');
  const USER_NAME = document.createElement('h2');
  const BIO = document.createElement('p');
  const BANNER = document.createElement('img');
  const AVATAR = document.createElement('img');
  const CREDITS = document.createElement('p');

  const SAVE_UPDATE_PROFILE_BTN = document.createElement('button');

  BANNER.classList.add('profile-banner');
  AVATAR.classList.add('profile-avatar');
  USER_PROFILE.appendChild(AVATAR);
  USER_PROFILE.appendChild(BANNER);
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

export function onClickUpdateProfileBtn() {
  const SHOW_UPDATE_PROFILE_BTN = document.getElementById(
    'show-update-form-btn'
  );

  SHOW_UPDATE_PROFILE_BTN.addEventListener('click', displayUpdateProfileForm);
}
