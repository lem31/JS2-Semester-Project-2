import { API_AUTH_REGISTER } from '../constants.js';
import { headers } from '../headers.js';

const REG_FORM = document.getElementById('reg-form');
const ERROR_MESSAGE = document.querySelector('.error-message');

export async function register() {
  if (REG_FORM) {
    REG_FORM.onsubmit = (e) => e.preventDefault();
  }
  const REG_FORM_OBJECT = new FormData(REG_FORM);
  const REG_FORM_DATA = Object.fromEntries(REG_FORM_OBJECT);

  const REQUEST_BODY_REG = {
    name: REG_FORM_DATA.name,
    email: REG_FORM_DATA.email,
    password: REG_FORM_DATA.password,
    bio: REG_FORM_DATA.bio,
    avatar: {
      url: REG_FORM_DATA.avatarUrl,
      alt: REG_FORM_DATA.avatarAlt,
    },
    banner: {
      url: REG_FORM_DATA.bannerUrl,
      alt: REG_FORM_DATA.bannerAlt,
    },
  };

  try {
    const RESPONSE = await fetch(API_AUTH_REGISTER, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify(REQUEST_BODY_REG),
    });

    if (RESPONSE.ok) {
      ERROR_MESSAGE.textContent = 'Registration successful';
      ERROR_MESSAGE.style.color = 'green';
      setTimeout(() => {
        window.location.href = '/profile/';
      }, 2000);
    } else if (RESPONSE.status === 400 || RESPONSE.status === 409) {
      ERROR_MESSAGE.textContent = 'Error: User already exists';
      ERROR_MESSAGE.style.color = 'red';
    } else {
      ERROR_MESSAGE.textContent = 'Error: Something went wrong';
      ERROR_MESSAGE.style.color = 'red';
    }
  } catch (error) {
    ERROR_MESSAGE.textContent = 'Error: Something went wrong';
    ERROR_MESSAGE.style.color = 'red';
  }
}
