import { API_AUTH_REGISTER } from '../constants.js';
import { API_AUTH_SIGN_IN } from '../constants.js';
import { headers } from '../headers.js';
import { displayErrorMessage } from '../bids/place.js';

const REG_FORM = document.getElementById('reg-form');
const ERROR_MESSAGE = document.getElementById('error-message-reg-form');
const SIGN_IN_FORM = document.querySelector('.sign-in-form');
const ERROR_MESSAGE_SIGN_IN = document.getElementById(
  'error-message-sign-in-form'
);

/**
 *
 *
 * @param {*} event
 * @returns {Promise<void>}
 * @async
 * @function signIn
 * @exports signIn
 * @description This function handles the sign in request to the server. It prevents the default form submission behavior, collects the form data
 * and sends a sign-in request to the server. If the sign-in request is successful, the user is redirected to their profile page.
 * If the request fails, the user is presented with an error message.
 */

export async function signIn(event) {
  event.preventDefault();

  const SIGN_IN_FORM_OBJECT = new FormData(SIGN_IN_FORM);
  const SIGN_IN_FORM_DATA = Object.fromEntries(SIGN_IN_FORM_OBJECT);

  const REQUEST_BODY_SIGN_IN = {
    email: SIGN_IN_FORM_DATA.email,
    password: SIGN_IN_FORM_DATA.password,
  };

  try {
    const RESPONSE = await fetch(API_AUTH_SIGN_IN, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify(REQUEST_BODY_SIGN_IN),
    });

    if (!RESPONSE.ok) {
      return RESPONSE.json().then((errorResponse) => {
        const errorMessage = JSON.stringify(errorResponse).slice(22, -44);
        displayErrorMessage(errorMessage);
        throw new Error('Failed to post bid');
      });
    }
    if (!REQUEST_BODY_SIGN_IN.email) {
      ERROR_MESSAGE_SIGN_IN.textContent = 'Error: Email is required';
      return;
    }
    if (!REQUEST_BODY_SIGN_IN.password) {
      ERROR_MESSAGE_SIGN_IN.textContent = 'Error: Password is required';
      return;
    }

    const USER_DATA = await RESPONSE.json();
    const INFO = USER_DATA.data;
    if (RESPONSE.ok) {
      const TOKEN = INFO.accessToken;
      localStorage.setItem('accessToken', TOKEN);
      localStorage.setItem('user', JSON.stringify(INFO));
      ERROR_MESSAGE.textContent =
        'You have successfully signed in, you will be redirected to your profile';
      ERROR_MESSAGE.style.color = 'green';

      const loadingSymbol = document.createElement('div');
      loadingSymbol.className = 'loading-symbol';
      loadingSymbol.style.color = 'white';
      loadingSymbol.classList.add('loading-symbol', 'bg-black');
      loadingSymbol.textContent = 'Loading...';
      document.body.appendChild(loadingSymbol);

      setTimeout(() => {
        window.location.href = '/profile/';
      }, 2000);
    } else if (RESPONSE.status === 401) {
      ERROR_MESSAGE_SIGN_IN.textContent = 'Error: Invalid email or password';
    } else {
      ERROR_MESSAGE_SIGN_IN.textContent = 'Error: Something went wrong';
    }
  } catch (error) {
    ERROR_MESSAGE_SIGN_IN.textContent =
      'Error: Unable to connect to the server';
  }
}

/**
 * @param {*} event
 * @returns {Promise<void>}
 * @async
 * @function register
 * @exports register
 * @description This function handles the registration request to the server. It prevents the default form submission behavior, collects the form data
 * and sends a registration request to the server. If the registration request is successful, the user is redirected to the sign-in page.
 * If the request fails, the user is presented with an error message.
 */

export async function register(event) {
  event.preventDefault();

  const REG_FORM_OBJECT = new FormData(REG_FORM);
  const REG_FORM_DATA = Object.fromEntries(REG_FORM_OBJECT);

  const REQUEST_BODY_REG = {
    name: REG_FORM_DATA.name,
    email: REG_FORM_DATA.emailReg,
    password: REG_FORM_DATA.passwordReg,
    bio: REG_FORM_DATA.bio,
    avatar: REG_FORM_DATA.avatarUrl
      ? {
          url: REG_FORM_DATA.avatarUrl,
          alt: REG_FORM_DATA.avatarAlt,
        }
      : undefined,
    banner: REG_FORM_DATA.bannerUrl
      ? {
          url: REG_FORM_DATA.bannerUrl,
          alt: REG_FORM_DATA.bannerAlt,
        }
      : undefined,
  };

  try {
    const RESPONSE = await fetch(API_AUTH_REGISTER, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify(REQUEST_BODY_REG),
    });

    if (!RESPONSE.ok) {
      const errorResponse = await RESPONSE.json();
      displayErrorMessage(JSON.stringify(errorResponse).slice(23, -44));
      throw new Error('Failed to post bid');
    }

    if (!REQUEST_BODY_REG.email) {
      ERROR_MESSAGE.textContent = 'Error: Email is required';
      return;
    }
    if (!REQUEST_BODY_REG.password) {
      ERROR_MESSAGE.textContent = 'Error: Password is required';
      return;
    }
    if (REQUEST_BODY_REG.password.length < 8) {
      ERROR_MESSAGE.textContent =
        'Error: Password must be at least 8 characters long';
      return;
    }

    if (RESPONSE.ok) {
      ERROR_MESSAGE.textContent = 'Thank you for registering, please wait';
      ERROR_MESSAGE.classList.add('text-green-500', 'text-center', 'w-[200px]');

      const loadingSymbol = document.createElement('div');
      loadingSymbol.className = 'loading-symbol';
      loadingSymbol.classList.add('loading-symbol');
      loadingSymbol.textContent = 'Loading...';
      document.body.appendChild(loadingSymbol);

      setTimeout(() => {
        window.location.href = '/auth/';
      }, 2000);
    } else if (RESPONSE.status === 400 || RESPONSE.status === 409) {
      ERROR_MESSAGE.textContent = 'Error: User already exists';
    } else {
      ERROR_MESSAGE.textContent = 'Error: Something went wrong';
    }
  } catch (error) {
    ERROR_MESSAGE.textContent = 'Error: Unable to connect to the server';
  }
}
