const SIGN_IN_BTN = document.getElementById('sign-in-btn');
const REG_BTN = document.getElementById('reg-btn');
const SIGN_OUT_BTN = document.getElementById('sign-out-btn');
const SIGN_IN_FORM = document.getElementById('sign-in-form');
const REG_FORM = document.getElementById('register-form');

export function onclickRegBtnTab() {
  REG_BTN.addEventListener('click', displayRegForm);
}

export function onclickSignInBtnTab() {
  SIGN_IN_BTN.addEventListener('click', displaySignInForm);
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
