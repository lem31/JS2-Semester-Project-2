export function displayUserProfile(PROFILE) {
  const USER_PROFILE = document.getElementById('my-profile');
  const USER_NAME = document.createElement('h2');

  const BIO = document.createElement('p');
  const BANNER = document.createElement('img');
  const AVATAR = document.createElement('img');
  const CREDITS = document.createElement('p');

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
  CREDITS.innerHTML = PROFILE.credits ? PROFILE.credits.length : 0;

  return USER_PROFILE;
}
