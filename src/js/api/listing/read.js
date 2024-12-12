import { headers } from '../headers';
import { MY_LISTINGS_API } from '../constants';
import { ALL_LISTINGS_API } from '../constants';
import {
  createMyListingsElements,
  createAllListingsElements,
  createIndividualListingElement,
} from '../../ui/listing/read.js';

/**
 * @function getMyListings
 * @description Fetches all listings created by the logged in user
 * @returns {Promise<void>}
 * @throws {Error}
 */

export async function getMyListings() {
  try {
    const ACCESS_TOKEN = localStorage.getItem('accessToken');
    if (!ACCESS_TOKEN) {
      throw new Error('No access token found. Please log in.');
    }

    const RESPONSE = await fetch(MY_LISTINGS_API, {
      method: 'GET',
      headers: headers(),
    });

    if (!RESPONSE.ok) {
      throw new Error(`HTTP error! status: ${RESPONSE.status || 'unknown'}`);
    }

    const DATA = await RESPONSE.json();
    const MY_LISTINGS = DATA.data || [];
    if (!Array.isArray(MY_LISTINGS)) {
      throw new Error('Fetched listings are not an array');
    }

    localStorage.setItem('myListings', JSON.stringify(MY_LISTINGS));

    const ALL_MY_LISTINGS = JSON.parse(
      localStorage.getItem('myListings') || '[]'
    );
    ALL_MY_LISTINGS.forEach((listing) => {
      createMyListingsElements(listing);
    });
  } catch (error) {
    console.error('Error fetching listings:', error);
    throw new Error('Error fetching listings');
  }
}

/**
 * @function getAllArtAuctionListings
 * @description Fetches all listings tagged with 'ArtAuctionApp'
 * @returns {Promise<void>}
 * @throws {Error}
 */

export async function getAllArtAuctionListings() {
  try {
    const RESPONSE = await fetch(ALL_LISTINGS_API, {
      method: 'GET',
      headers: headers(),
    });

    if (!RESPONSE.ok) {
      throw new Error(`HTTP error! status: ${RESPONSE.status || 'unknown'}`);
    }

    const DATA = await RESPONSE.json();

    const ALL_LISTINGS = DATA.data || [];

    localStorage.setItem('allListings', JSON.stringify(ALL_LISTINGS));

    const LISTINGS = JSON.parse(localStorage.getItem('allListings') || '[]');

    const LISTINGS_CONTAINER = document.getElementById('all-auction-listings');
    if (LISTINGS_CONTAINER) {
      LISTINGS.forEach((listing) => {
        try {
          createAllListingsElements(listing, LISTINGS_CONTAINER);
        } catch (error) {
          console.error('Error creating listing elements:', error);
        }
      });
    }
  } catch (error) {
    console.error('Error fetching listings:', error);
    throw new Error('Error fetching listings');
  }
}

export async function displayIndividualListing() {
  const URL_PARAMS = new URLSearchParams(window.location.search);
  const LISTING_ID = URL_PARAMS.get('id');

  if (LISTING_ID) {
    try {
      const RESPONSE = await fetch(
        `https://v2.api.noroff.dev/auction/listings/${LISTING_ID}?_seller=true&_bids=true`,
        {
          headers: headers(),
        }
      );

      if (!RESPONSE.ok) {
        const ERROR_MESSAGE = document.createElement('div');
        ERROR_MESSAGE.textContent = 'Failed to fetch listing';
        ERROR_MESSAGE.style.color = 'red';
        document.body.appendChild(ERROR_MESSAGE);
        throw new Error('Failed to fetch listing');
      }

      const LISTING_DATA = await RESPONSE.json();
      const LISTING = LISTING_DATA.data;

      const LISTING_CONTAINER = document.getElementById('listing-container');
      if (LISTING_CONTAINER) {
        LISTING_CONTAINER.innerHTML = '';
        createIndividualListingElement(LISTING);
      } else {
        throw new Error('Listing container not found');
      }
    } catch (error) {
      console.error('Error fetching listing:', error);
      throw new Error('Error fetching listing');
    }
  } else {
    throw new Error('No listing ID found');
  }
}
