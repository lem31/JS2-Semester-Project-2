export const API_BASE = 'https://v2.api.noroff.dev/';

export const API_KEY_NAME = { name: 'my auction app api key' };

export const API_KEY_ENDPOINT = `${API_BASE}auth/create-api-key`;

export const AUTH_REGISTER = 'auth/register';

export const AUTH_SIGN_IN = 'auth/login';

export const CREATE_LISTING = 'auction/listings';

export const API_AUTH_REGISTER = `${API_BASE}${AUTH_REGISTER}`;

export const API_AUTH_SIGN_IN = `${API_BASE}${AUTH_SIGN_IN}`;

export const API_CREATE_LISTING = `${API_BASE}${CREATE_LISTING}`;

export const DELETE_LISTING_ENDPOINT = 'auction/listings/';
export const DELETE_LISTING = '${API_BASE}${DELETE_LISTING_ENDPOINT}';

export const PROFILE_ENDPOINT = 'auction/profiles/';

export const API_PROFILE = `${API_BASE}${PROFILE_ENDPOINT}`;

export const API_KEY = '2cb38805-7bd6-46d6-92d0-086c83471763';

const USER_NAME = JSON.parse(localStorage.getItem('user')) || {};

const NAME = USER_NAME.name || 'defaultName';

export const MY_LISTINGS_ENDPOINT = `auction/profiles/${NAME}/listings?_bids=true`;

export const MY_BIDS_ENDPOINT = `auction/profiles/${NAME}/bids?_listings=true`;

export const MY_BIDS_API = `${API_BASE}${MY_BIDS_ENDPOINT}`;

export const ALL_LISTINGS_ENDPOINT = `auction/listings?_tag=ArtAuctionApp&_bids=true&_seller=true`;

export const ALL_LISTINGS_API = `${API_BASE}${ALL_LISTINGS_ENDPOINT}`;

export const MY_LISTINGS_API = `${API_BASE}${MY_LISTINGS_ENDPOINT}`;
