const API_AUTH_REGISTER = `https://v2.api.noroff.dev/auth/register`;
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

    if (RESPONSE.ok) {
      alert('Registration successful');
      window.location.href = '/auth/';
      ERROR_MESSAGE.textContent = '';
    } else if (RESPONSE.status === 400 || RESPONSE.status === 409) {
      ERROR_MESSAGE.textContent = 'Error: User already exists';
    } else {
      ERROR_MESSAGE.textContent = 'Error: Something went wrong';
    }
  } catch (error) {
    console.error('Error:', error);
    ERROR_MESSAGE.textContent = 'Error: Unable to connect to the server';
  }
}
