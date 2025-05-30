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
  if (
    SIGN_IN_FORM_BOX.classList.contains('hidden') &&
    REG_FORM.classList.contains('hidden')
  ) {
    SIGN_IN_FORM_BOX.classList.remove('hidden');
    SIGN_IN_FORM_BOX.classList.add('flex-row-center', 'w-[100%]', 'h-[100%]');
    REG_FORM.classList.add('hidden');
  } else {
    SIGN_IN_FORM_BOX.classList.add('hidden');
    SIGN_IN_FORM_BOX.classList.remove(
      'flex-row-center',
      'w-[100%]',
      'h-[100%]'
    );
  }
}

/**
 * @function displayRegForm
 * @returns {void}
 *  @description This function toggles the display of the registration form.
 */

function displayRegForm() {
  if (
    REG_FORM.classList.contains('hidden') &&
    SIGN_IN_FORM_BOX.classList.contains('hidden')
  ) {
    REG_FORM.classList.remove('hidden');
    REG_FORM.classList.add('flex-row-center', 'w-[100%]', 'h-[100%]');
    SIGN_IN_FORM_BOX.classList.add('hidden');
  } else {
    REG_FORM.classList.add('hidden');

    REG_FORM.classList.remove('flex-row-center', 'w-[100%]', 'h-[100%]');
  }
}

/**
 * @function toggleForms
 * @returns {void}
 * @description This function toggles between the sign-in and registration forms.
 */
export function toggleForms() {
  switch (true) {
    case SIGN_IN_FORM_BOX.classList.contains('hidden'):
      displaySignInForm();
      displayRegForm();
      displaySignInForm();
      break;
    case !SIGN_IN_FORM_BOX.classList.contains('hidden'):
      displaySignInForm();
      displayRegForm();
      displaySignInForm();

      break;
    case !REG_FORM.classList.contains('hidden'):
      displayRegForm();
      displaySignInForm();

      break;
    default:
      displaySignInForm();
      displayRegForm();
      break;
  }
}

SIGN_IN_BTN_TAB.addEventListener('click', () => {
  if (REG_FORM.classList.contains('hidden')) {
    displaySignInForm();
  } else {
    toggleForms();
  }
});

REG_BTN_TAB.addEventListener('click', () => {
  if (SIGN_IN_FORM_BOX.classList.contains('hidden')) {
    displayRegForm();
  } else {
    toggleForms();
  }
});

/**
 * @function onclickSignInBtnTab
 * @returns {void}
 * @description This function listens for a click event on the sign-in button tab and calls the displaySignInForm function.
 */

// export function onclickSignInBtnTab() {
//   SIGN_IN_BTN_TAB.addEventListener('click', displaySignInForm);
// }

/**
 * @function onclickRegBtnTab
 * @returns {void}
 * @description This function listens for a click event on the registration button tab and calls the displayRegForm function.
 */

// export function onclickRegBtnTab() {
//   REG_BTN_TAB.addEventListener('click', displayRegForm);
// }

/**
 * @function onRegister
 * @returns {void}
 * @description This function listens for a submit event on the registration form and calls the register function.
 */

export async function onRegister() {
  REG_FORM.addEventListener('submit', (event) => {
    event.preventDefault();
    register(event);
  });
}

/**
 * @function onSignIn
 * @returns {void}
 * @description This function listens for a submit event on the sign-in form and calls the signIn function.
 */

export async function onSignIn() {
  SIGN_IN_FORM.addEventListener('submit', signIn);
}
