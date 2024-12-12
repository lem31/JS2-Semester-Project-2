import { headers } from '../headers';

import { ALL_LISTINGS_API } from '../constants';
import {
  createAllListingsElements,
  createIndividualListingElement,
} from '../../ui/listing/read.js';

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

      const LISTING_CONTAINER = document.getElementById('all-auction-listings');
      if (!LISTING_CONTAINER) {
        const ERROR_MESSAGE = document.createElement('div');
        ERROR_MESSAGE.textContent = 'Listing container not found';
        ERROR_MESSAGE.style.color = 'red';
        document.body.appendChild(ERROR_MESSAGE);
        throw new Error('Listing container not found');
      }
      LISTING_CONTAINER.innerHTML = '';
      createIndividualListingElement(LISTING, LISTING_CONTAINER);
    } catch (error) {
      console.error('Error fetching listing:', error);
      throw new Error('Error fetching listing');
    }
  } else {
    throw new Error('No listing ID found');
  }
}
