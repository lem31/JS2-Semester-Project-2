import { register } from '../../api/auth/auth';

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
const SIGN_IN_FORM = document.getElementById('sign-in-form');
const REG_FORM = document.getElementById('register-form');
const ERROR_MESSAGE = document.querySelector('.error-message-reg-form');

export function onclickRegBtnTab() {
  REG_BTN_TAB.addEventListener('click', displayRegForm);
}

export function onclickSignInBtnTab() {
  SIGN_IN_BTN_TAB.addEventListener('click', displaySignInForm);
}

function displaySignInForm() {
  if (SIGN_IN_FORM.style.display === 'none') {
    SIGN_IN_FORM.style.display = 'block';
    REG_FORM.style.display = 'none';
  } else if (SIGN_IN_FORM.style.display === 'block') {
    SIGN_IN_FORM.style.display = 'none';
  } else {
    SIGN_IN_FORM.style.display = 'none';
    REG_FORM.style.display = 'none';
  }
}

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

export function displaySignInBtnNav() {
  const ACCESS_TOKEN = localStorage.getItem('accessToken');
  if (ACCESS_TOKEN) {
    SIGN_IN_LINK_NAV.style.display = 'none';
  } else {
    SIGN_IN_LINK_NAV.style.display = 'block';
  }
}

export function displayRegLinkNav() {
  const ACCESS_TOKEN = localStorage.getItem('accessToken');
  if (ACCESS_TOKEN) {
    REG_LINK_NAV.style.display = 'none';
  } else {
    REG_LINK_NAV.style.display = 'block';
  }
}

export function displayMyListingsLinkNav() {
  const ACCESS_TOKEN = localStorage.getItem('accessToken');
  if (ACCESS_TOKEN) {
    MY_LISTINGS_LINK_NAV.style.display = 'block';
  } else {
    MY_LISTINGS_LINK_NAV.style.display = 'none';
  }
}

export function displayProfileLinkNav() {
  const ACCESS_TOKEN = localStorage.getItem('accessToken');
  if (ACCESS_TOKEN) {
    PROFILE_LINK_NAV.style.display = 'block';
  } else {
    PROFILE_LINK_NAV.style.display = 'none';
  }
}

export function displayMyBidsLinkNav() {
  const ACCESS_TOKEN = localStorage.getItem('accessToken');
  if (ACCESS_TOKEN) {
    MY_BIDS_LINK_NAV.style.display = 'block';
  } else {
    MY_BIDS_LINK_NAV.style.display = 'none';
  }
}

export function displayCreateListingLinkNav() {
  const ACCESS_TOKEN = localStorage.getItem('accessToken');
  if (ACCESS_TOKEN) {
    CREATE_LISTING_LINK_NAV.style.display = 'block';
  } else {
    CREATE_LISTING_LINK_NAV.style.display = 'none';
  }
}

export async function onRegister() {
  REG_FORM.addEventListener('submit', register);
}
