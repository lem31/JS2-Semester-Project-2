const SIGN_IN_LINK_NAV = document.getElementById('sign-in-link-nav');
const REG_LINK_NAV = document.getElementById('reg-link-nav');
const MY_LISTINGS_LINK_NAV = document.getElementById('my-listings-link-nav');
const PROFILE_LINK_NAV = document.getElementById('profile-link-nav');
const MY_BIDS_LINK_NAV = document.querySelector('.sidebar-li');
const CREATE_LISTING_LINK_NAV = document.getElementById('create-listing-li');

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
  } else {
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
  } else {
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
  if (CREATE_LISTING_LINK_NAV) {
    if (ACCESS_TOKEN) {
      CREATE_LISTING_LINK_NAV.classList.remove('hidden');
      CREATE_LISTING_LINK_NAV.classList.add('sidebar-li-layout');
    } else if (!ACCESS_TOKEN) {
      CREATE_LISTING_LINK_NAV.classList.add('hidden');
      CREATE_LISTING_LINK_NAV.classList.remove('sidebar-li-layout');
    }
  }
}

export function displayNav() {
  const NAV_MENU = document.getElementById('nav-menu');
  const SIDEBAR = document.querySelector('.side-bar');
  const HAMBURGER_BTN = document.getElementById('hamburger-btn');
  const LOGO = document.querySelector('.logo');

  HAMBURGER_BTN.addEventListener('click', () => {
    NAV_MENU.classList.toggle('hidden');
    SIDEBAR.classList.toggle('sidebar-height-when-open');
    SIDEBAR.classList.toggle('sidebar-height-when-closed');
    LOGO.classList.toggle('logo-top-margin');
    LOGO.classList.toggle('logo-no-margin');
  });
}

export function onHoverNavLink() {
  const NAV_LINKS = document.querySelectorAll('.nav-link');
  const SPAN_TEXT = document.querySelectorAll('.span-text');
  const NAV = document.querySelector('.nav');
  const NAV_MENU = document.getElementById('nav-menu');
  NAV_LINKS.forEach((link) => {
    let hoverTimeout;

    link.addEventListener('mouseover', () => {
      clearTimeout(hoverTimeout);
      SPAN_TEXT.forEach((span) => {
        span.classList.remove('hidden');
        span.classList.add('span-text-hover');
        NAV.classList.add('nav-hover');
        NAV_MENU.classList.add('nav-styles-hover');
      });
    });

    link.addEventListener('mouseout', () => {
      hoverTimeout = setTimeout(() => {
        SPAN_TEXT.forEach((span) => {
          span.classList.remove('span-text-hover');
          span.classList.add('hidden');
          NAV.classList.remove('nav-hover');
          NAV_MENU.classList.remove('nav-styles-hover');
        });
      }, 5000);
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
