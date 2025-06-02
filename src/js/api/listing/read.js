import { headers } from '../headers';
import { ALL_LISTINGS_API } from '../constants';
import { createIndividualListingElement } from '../../ui/listing/read.js';
import { createAllListingsElements } from '../../ui/all_listings/read.js';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import { handleApiError } from '../errorHandling';

/**
 * @function getAllArtAuctionListings
 * @description Fetches all listings tagged with 'ArtAuctionApp'
 * @returns {Promise<void>}
 * @throws {Error}
 */
export async function getAllArtAuctionListings() {
  const CACHE_KEY = 'allListings';
  const CACHE_TIMESTAMP_KEY = 'allListingsTimestamp';
  const CACHE_EXPIRATION = 5 * 60 * 1000;

  const cachedListings = JSON.parse(localStorage.getItem(CACHE_KEY));
  const lastFetchedTime = localStorage.getItem(CACHE_TIMESTAMP_KEY);

  const isCacheExpired =
    !lastFetchedTime || Date.now() - lastFetchedTime > CACHE_EXPIRATION;

  toastr.info('Loading listing, please wait...', {
    timeOut: 0,
    extendedTimeOut: 0,
    closeButton: true,
  });

  await new Promise((resolve) => setTimeout(resolve, 300));

  if (cachedListings && !isCacheExpired) {
    displayListings(cachedListings);
    return;
  }

  try {
    toastr.info('Loading listings, please wait...', {
      timeOut: 0,
      extendedTimeOut: 0,
      closeButton: true,
    });

    await new Promise((resolve) => setTimeout(resolve, 60));

    const RESPONSE = await fetch(ALL_LISTINGS_API, {
      method: 'GET',
      headers: headers(),
    });

    const DATA = await handleApiError(RESPONSE, 'getAllListings');
    const ALL_LISTINGS = DATA.data || [];

    localStorage.setItem(CACHE_KEY, JSON.stringify(ALL_LISTINGS));
    localStorage.setItem(CACHE_TIMESTAMP_KEY, Date.now());

    toastr.clear();
    toastr.success('Listings loaded successfully!');

    displayListings(ALL_LISTINGS);
  } catch (error) {
    toastr.error(error.message);
  }
}

function displayListings(listings) {
  const LISTINGS_CONTAINER = document.getElementById('all-auction-listings');
  if (LISTINGS_CONTAINER) {
    LISTINGS_CONTAINER.innerHTML = '';
    listings.forEach((listing) => {
      createAllListingsElements(listing, LISTINGS_CONTAINER);
    });
  }
}

export async function displayIndividualListing() {
  const URL_PARAMS = new URLSearchParams(window.location.search);
  const LISTING_ID = URL_PARAMS.get('id');

  if (!LISTING_ID) {
    throw new Error('No listing ID found');
  }

  const CACHE_KEY = `listing-${LISTING_ID}`;
  const CACHE_TIMESTAMP_KEY = `listing-${LISTING_ID}-timestamp`;
  const CACHE_EXPIRATION = 5 * 60 * 1000;

  const cachedListing = JSON.parse(localStorage.getItem(CACHE_KEY));
  const lastFetchedTime = localStorage.getItem(CACHE_TIMESTAMP_KEY);

  const isCacheExpired =
    !lastFetchedTime || Date.now() - lastFetchedTime > CACHE_EXPIRATION;

  toastr.info('Loading listing, please wait...', {
    timeOut: 0,
    extendedTimeOut: 0,
    closeButton: true,
  });

  await new Promise((resolve) => setTimeout(resolve, 100));

  if (cachedListing && !isCacheExpired) {
    renderListing(cachedListing);
    return;
  }

  try {
    toastr.info('Loading listing, please wait...', {
      timeOut: 0,
      extendedTimeOut: 0,
      closeButton: true,
    });

    await new Promise((resolve) => setTimeout(resolve, 100));

    const RESPONSE = await fetch(
      `https://v2.api.noroff.dev/auction/listings/${LISTING_ID}?_seller=true&_bids=true`,
      {
        headers: headers(),
      }
    );

    if (!RESPONSE.ok) {
      toastr.clear();
      toastr.error('Failed to fetch listing');
      throw new Error('Failed to fetch listing');
    }

    const LISTING_DATA = await handleApiError(
      RESPONSE,
      'displayIndividualListing'
    );
    const LISTING = LISTING_DATA.data;

    localStorage.setItem(CACHE_KEY, JSON.stringify(LISTING));
    localStorage.setItem(CACHE_TIMESTAMP_KEY, Date.now());

    toastr.clear();
    toastr.success('Listing loaded successfully!');

    renderListing(LISTING);
  } catch (error) {
    toastr.clear();
    toastr.error(error.message);
  }
}

function renderListing(listing) {
  const LISTING_CONTAINER = document.getElementById('all-auction-listings');
  if (!LISTING_CONTAINER) {
    toastr.error('Listing container not found');
    throw new Error('Listing container not found');
  }
  LISTING_CONTAINER.innerHTML = '';
  createIndividualListingElement(listing, LISTING_CONTAINER);
}
