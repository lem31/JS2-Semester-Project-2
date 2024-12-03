const SIGN_IN_LINK_NAV = document.getElementById('sign-in-link-nav');
const REG_LINK_NAV = document.getElementById('reg-link-nav');
const MY_LISTINGS_LINK_NAV = document.getElementById('my-listings-link-nav');
const PROFILE_LINK_NAV = document.getElementById('profile-link-nav');
const MY_BIDS_LINK_NAV = document.getElementById('my-bids-link-nav');
const CREATE_LISTING_LINK_NAV = document.getElementById(
  'create-listing-link-nav'
);

/**
 * @function displaySignInBtnNav
 * @returns {void}
 * @description This function toggles the display of the sign-in button in the navigation bar.
 */

export function displaySignInBtnNav() {
  const ACCESS_TOKEN = localStorage.getItem('accessToken');
  if (ACCESS_TOKEN) {
    SIGN_IN_LINK_NAV.style.display = 'none';
  } else {
    SIGN_IN_LINK_NAV.style.display = 'block';
  }
}

/**
 * @function displayRegLinkNav
 * @returns {void}
 * @description This function toggles the display of the registration link in the navigation bar.
 */

export function displayRegLinkNav() {
  const ACCESS_TOKEN = localStorage.getItem('accessToken');
  if (ACCESS_TOKEN) {
    REG_LINK_NAV.style.display = 'none';
  } else {
    REG_LINK_NAV.style.display = 'block';
  }
}

/**
 * @function displayMyListingsLinkNav
 * @returns {void}
 * @description This function toggles the display of the my listings link in the navigation bar.
 */

export function displayMyListingsLinkNav() {
  const ACCESS_TOKEN = localStorage.getItem('accessToken');
  if (ACCESS_TOKEN) {
    MY_LISTINGS_LINK_NAV.style.display = 'block';
  } else {
    MY_LISTINGS_LINK_NAV.style.display = 'none';
  }
}

/**
 * @function displayProfileLinkNav
 * @returns {void}
 * @description This function toggles the display of the profile link in the navigation bar.
 */

export function displayProfileLinkNav() {
  const ACCESS_TOKEN = localStorage.getItem('accessToken');
  if (ACCESS_TOKEN) {
    PROFILE_LINK_NAV.style.display = 'block';
  } else {
    PROFILE_LINK_NAV.style.display = 'none';
  }
}

/**
 * @function displayMyBidsLinkNav
 * @returns {void}
 * @description This function toggles the display of the my bids link in the navigation bar.
 */

export function displayMyBidsLinkNav() {
  const ACCESS_TOKEN = localStorage.getItem('accessToken');
  if (ACCESS_TOKEN) {
    MY_BIDS_LINK_NAV.style.display = 'block';
  } else {
    MY_BIDS_LINK_NAV.style.display = 'none';
  }
}

/**
 * @function displayCreateListingLinkNav
 * @returns {void}
 * @description This function toggles the display of the create listing link in the navigation bar.
 */

export function displayCreateListingLinkNav() {
  const ACCESS_TOKEN = localStorage.getItem('accessToken');
  if (ACCESS_TOKEN) {
    CREATE_LISTING_LINK_NAV.style.display = 'block';
  } else {
    CREATE_LISTING_LINK_NAV.style.display = 'none';
  }
}
