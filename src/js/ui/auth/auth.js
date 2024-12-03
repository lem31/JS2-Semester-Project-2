import { register } from '../../api/auth/auth';
import { signIn } from '../../api/auth/auth';

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
