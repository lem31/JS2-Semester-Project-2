const SIGN_IN_BTN_NAV = document.getElementById('sign-in-btn-nav');
const SIGN_IN_BTN_TAB = document.getElementById('sign-in-btn-tab');
const REG_BTN_TAB = document.getElementById('reg-btn-tab');
const SIGN_IN_FORM = document.getElementById('sign-in-form');
const REG_FORM = document.getElementById('register-form');
const ACCESS_TOKEN = localStorage.getItem('accessToken');

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
  if (ACCESS_TOKEN) {
    SIGN_IN_BTN_NAV.style.display = 'none';
  } else {
    SIGN_IN_BTN_NAV.style.display = 'block';
  }
}
