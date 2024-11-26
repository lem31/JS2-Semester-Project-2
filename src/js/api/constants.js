export const API_BASE = 'https://v2.api.noroff.dev/';

export const API_KEY_NAME = { name: 'my auction app api key' };

export const API_KEY_ENDPOINT = `${API_BASE}auth/create-api-key`;

export const AUTH_REGISTER = 'auth/register';

const AUTH_SIGN_IN = 'auth/login';

const CREATE_LISTING = 'auction/listings';

export const API_AUTH_REGISTER = `${API_BASE}${AUTH_REGISTER}`;

export const API_AUTH_SIGN_IN = `${API_BASE}${AUTH_SIGN_IN}`;

export const API_CREATE_LISTING = `${API_BASE}${CREATE_LISTING}`;

export const PROFILE_ENDPOINT = 'auction/profiles/';

export const API_PROFILE = `${API_BASE}${PROFILE_ENDPOINT}`;

export const API_KEY = '2cb38805-7bd6-46d6-92d0-086c83471763';
