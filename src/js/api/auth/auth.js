import { API_AUTH_REGISTER } from '../constants.js';
import { API_AUTH_SIGN_IN } from '../constants.js';
import { headers } from '../headers.js';

const REG_FORM = document.getElementById('reg-form');
const ERROR_MESSAGE = document.getElementById('error-message-reg-form');
const SIGN_IN_FORM = document.querySelector('.sign-in-form');
const ERROR_MESSAGE_SIGN_IN = document.getElementById(
  'error-message-sign-in-form'
);

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

    if (!REQUEST_BODY_SIGN_IN.email) {
      ERROR_MESSAGE_SIGN_IN.textContent = 'Error: Email is required';
      return;
    }
    if (!REQUEST_BODY_SIGN_IN.password) {
      ERROR_MESSAGE_SIGN_IN.textContent = 'Error: Password is required';
      return;
    }
    if (RESPONSE.ok) {
      const TOKEN = RESPONSE.headers.get('Authorization');
      localStorage.setItem('accessToken', TOKEN);
      window.location.href = '/profile/';
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
    console.log('Sending request to:', API_AUTH_REGISTER);
    console.log('Request body:', REQUEST_BODY_REG);

    const RESPONSE = await fetch(API_AUTH_REGISTER, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify(REQUEST_BODY_REG),
    });

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
      ERROR_MESSAGE.textContent =
        'You have successfully registered, please sign in to view your profile or place any bids';
      ERROR_MESSAGE.style.color = 'green';

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
