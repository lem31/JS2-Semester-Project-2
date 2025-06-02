import { API_AUTH_REGISTER } from '../constants.js';
import { API_AUTH_SIGN_IN } from '../constants.js';
import { headers } from '../headers.js';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import {handleApiError} from '../errorHandling.js';

const REG_FORM = document.getElementById('reg-form');

const SIGN_IN_FORM = document.querySelector('.sign-in-form');

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
      method: "POST",
      headers: headers(),
      body: JSON.stringify(REQUEST_BODY_SIGN_IN),
    });

    const USER_DATA = await handleApiError(RESPONSE, "signIn");

    localStorage.setItem("accessToken", USER_DATA.data.accessToken);
    localStorage.setItem("user", JSON.stringify(USER_DATA.data));

    toastr.success("You have successfully signed in, redirecting...");
    setTimeout(() => {
      window.location.href = "/profile/";
    }, 2000);
  } catch (error) {
    toastr.error(error.message);
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
      ? { url: REG_FORM_DATA.avatarUrl, alt: REG_FORM_DATA.avatarAlt }
      : undefined,
    banner: REG_FORM_DATA.bannerUrl
      ? { url: REG_FORM_DATA.bannerUrl, alt: REG_FORM_DATA.bannerAlt }
      : undefined,
  };

  try {
    const RESPONSE = await fetch(API_AUTH_REGISTER, {
      method: "POST",
      headers: headers(),
      body: JSON.stringify(REQUEST_BODY_REG),
    });

   await handleApiError(RESPONSE, "register");

    toastr.success("Thank you for registering, redirecting...");
    setTimeout(() => {
      window.location.href = "/auth/";
    }, 2000);
  } catch (error) {
    toastr.error(error.message);
  }
}
