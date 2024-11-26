import { register } from '../../api/auth/auth';
import { signIn } from '../../api/auth/auth';

const SIGN_IN_LINK_NAV = document.getElementById('sign-in-link-nav');
const REG_LINK_NAV = document.getElementById('reg-link-nav');
const MY_LISTINGS_LINK_NAV = document.getElementById('my-listings-link-nav');
const PROFILE_LINK_NAV = document.getElementById('profile-link-nav');
const MY_BIDS_LINK_NAV = document.getElementById('my-bids-link-nav');
const CREATE_LISTING_LINK_NAV = document.getElementById(
  'create-listing-link-nav'
);

const SIGN_IN_BTN_TAB = document.getElementById('sign-in-btn-tab');
const REG_BTN_TAB = document.getElementById('reg-btn-tab');
const SIGN_IN_FORM_BOX = document.getElementById('sign-in-form');
const REG_FORM = document.getElementById('register-form');
const SIGN_IN_FORM = document.querySelector('.sign-in-form');

/**
 * @function displaySignInForm
 * @returns {void}
 * @description This function toggles the display of the sign-in form.
 */

function displaySignInForm() {
  if (SIGN_IN_FORM_BOX.style.display === 'none') {
    SIGN_IN_FORM_BOX.style.display = 'block';
    REG_FORM.style.display = 'none';
  } else if (SIGN_IN_FORM_BOX.style.display === 'block') {
    SIGN_IN_FORM_BOX.style.display = 'none';
  } else {
    SIGN_IN_FORM_BOX.style.display = 'none';
    REG_FORM.style.display = 'none';
  }
}

/**
 * @function onclickSignInBtnTab
 * @returns {void}
 * @description This function listens for a click event on the sign-in button tab and calls the displaySignInForm function.
 */

export function onclickSignInBtnTab() {
  SIGN_IN_BTN_TAB.addEventListener('click', displaySignInForm);
}

/**
 * @function displayRegForm
 * @returns {void}
 *  @description This function toggles the display of the registration form.
 */

function displayRegForm() {
  const ERROR_MESSAGE = document.getElementById('error-message-reg-form');
  ERROR_MESSAGE.textContent = '';
  if (REG_FORM.style.display === 'none') {
    REG_FORM.style.display = 'block';
    SIGN_IN_FORM.style.display = 'none';
  } else if (REG_FORM.style.display === 'block') {
    REG_FORM.style.display = 'none';
  } else {
    REG_FORM.style.display = 'none';
    SIGN_IN_FORM.style.display = 'none';
  }
}

/**
 * @function onclickRegBtnTab
 * @returns {void}
 * @description This function listens for a click event on the registration button tab and calls the displayRegForm function.
 */

export function onclickRegBtnTab() {
  REG_BTN_TAB.addEventListener('click', displayRegForm);
}

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

/**
 * @function onRegister
 * @returns {void}
 * @description This function listens for a submit event on the registration form and calls the register function.
 */

export async function onRegister() {
  REG_FORM.addEventListener('submit', register);
}

/**
 * @function onSignIn
 * @returns {void}
 * @description This function listens for a submit event on the sign-in form and calls the signIn function.
 */

export async function onSignIn() {
  SIGN_IN_FORM.addEventListener('submit', signIn);
}
