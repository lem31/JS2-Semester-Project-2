import { API_AUTH_REGISTER } from '../constants.js';
import { headers } from '../headers.js';

const REG_FORM = document.getElementById('reg-form');
const ERROR_MESSAGE = document.getElementById('error-message-reg-form');

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
      window.location.href = '/auth/';
      ERROR_MESSAGE.textContent =
        'You have successfully registered, please login';
    } else if (RESPONSE.status === 400 || RESPONSE.status === 409) {
      ERROR_MESSAGE.textContent = 'Error: User already exists';
    } else {
      ERROR_MESSAGE.textContent = 'Error: Something went wrong';
    }
  } catch (error) {
    ERROR_MESSAGE.textContent = 'Error: Unable to connect to the server';
  }
}
