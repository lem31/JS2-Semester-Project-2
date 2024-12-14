const SIGN_IN_LINK_NAV = document.getElementById('sign-in-link-nav');
const REG_LINK_NAV = document.getElementById('reg-link-nav');
const MY_LISTINGS_LINK_NAV = document.getElementById('my-listings-link-nav');
const PROFILE_LINK_NAV = document.getElementById('profile-link-nav');
const MY_BIDS_LINK_NAV = document.querySelector('.sidebar-li');
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
    SIGN_IN_LINK_NAV.classList.remove('sidebar-li-layout');
    SIGN_IN_LINK_NAV.classList.add('hidden');
  } else if (!ACCESS_TOKEN) {
    SIGN_IN_LINK_NAV.classList.remove('hidden');
    SIGN_IN_LINK_NAV.classList.add('sidebar-li-layout');
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
    REG_LINK_NAV.classList.add('sidebar-li-layout');
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
    MY_LISTINGS_LINK_NAV.classList.remove('hidden');
    MY_LISTINGS_LINK_NAV.classList.add('sidebar-li-layout');
  } else {
    MY_LISTINGS_LINK_NAV.classList.add('hidden');
    MY_LISTINGS_LINK_NAV.classList.remove('sidebar-li-layout');
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
    PROFILE_LINK_NAV.classList.add('sidebar-li-layout');
  } else {
    PROFILE_LINK_NAV.classList.remove('sidebar-li-layout');
    PROFILE_LINK_NAV.classList.add('hidden');
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
    MY_BIDS_LINK_NAV.classList.remove('hidden');
    MY_BIDS_LINK_NAV.classList.add('sidebar-li-layout');
  } else if (!ACCESS_TOKEN) {
    MY_BIDS_LINK_NAV.classList.add('hidden');
    MY_BIDS_LINK_NAV.classList.remove('sidebar-li-layout');
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
    CREATE_LISTING_LINK_NAV.classList.add('sidebar-li-layout');
  } else {
    CREATE_LISTING_LINK_NAV.classList.remove('sidebar-li-layout');
    CREATE_LISTING_LINK_NAV.classList.add('hidden');
  }
}

export function displayNav() {
  const NAV_MENU = document.getElementById('nav-menu');
  const SIDEBAR = document.querySelector('.side-bar');
  const HAMBURGER_BTN = document.getElementById('hamburger-btn');
  HAMBURGER_BTN.addEventListener('click', () => {
    if (NAV_MENU.classList.contains('hidden')) {
      SIDEBAR.classList.remove('sidebar-height-when-closed');
      SIDEBAR.classList.add('sidebar-height-when-open');
      NAV_MENU.classList.remove('hidden');
      NAV_MENU.classList.add('nav-styles');
    } else {
      NAV_MENU.classList.add('hidden');
      SIDEBAR.classList.remove('sidebar-height-when-open');
      SIDEBAR.classList.add('sidebar-height-when-closed');
      NAV_MENU.classList.remove('nav-styles');
    }
  });
}

export function onHoverNavLink() {
  const NAV_LINKS = document.querySelectorAll('.nav-link');
  const SPAN_TEXT = document.querySelectorAll('.span-text');
  const NAV = document.querySelector('.nav');
  const NAV_MENU = document.getElementById('nav-menu');
  NAV_LINKS.forEach((link) => {
    link.addEventListener('mouseover', () => {
      SPAN_TEXT.forEach((span) => {
        span.classList.remove('hidden');
        span.classList.add('span-text-hover');
        NAV.classList.add('nav-hover');
        NAV_MENU.classList.add('nav-styles-hover');
      });
    });
    link.addEventListener('mouseout', () => {
      SPAN_TEXT.forEach((span) => {
        span.classList.remove('span-text-hover');
        span.classList.add('hidden');
        NAV.classList.remove('nav-hover');
        NAV_MENU.classList.remove('nav-styles-hover');
      });
    });
  });
}
