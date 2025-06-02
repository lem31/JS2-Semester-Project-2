import { headers } from '../headers';

import { ALL_LISTINGS_API } from '../constants';
import { createIndividualListingElement } from '../../ui/listing/read.js';

import { createAllListingsElements } from '../../ui/all_listings/read.js';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

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

  if (cachedListings && !isCacheExpired) {

    displayListings(cachedListings);
    return;
  }



  try {

    toastr.info("Loading listings, please wait...", {
      timeOut: 0,
      extendedTimeOut: 0,
      closeButton: true,
    });

    await new Promise((resolve) => setTimeout(resolve, 100));

    const RESPONSE = await fetch(ALL_LISTINGS_API, {
      method: 'GET',
      headers: headers(),
    });

    if (!RESPONSE.ok) {
      throw new Error(`HTTP error! status: ${RESPONSE.status || 'unknown'}`);
    }

    const DATA = await RESPONSE.json();
    const ALL_LISTINGS = DATA.data || [];

    localStorage.setItem(CACHE_KEY, JSON.stringify(ALL_LISTINGS));
    localStorage.setItem(CACHE_TIMESTAMP_KEY, Date.now());

    displayListings(ALL_LISTINGS);
  } catch (error) {
    console.error('Error fetching listings', error);
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

  if (LISTING_ID) {
    try {
      const RESPONSE = await fetch(
        `https://v2.api.noroff.dev/auction/listings/${LISTING_ID}?_seller=true&_bids=true`,
        {
          headers: headers(),
        }
      );

      if (!RESPONSE.ok) {
        toastr.error('Failed to fetch listing');
        throw new Error('Failed to fetch listing');
      }

      const LISTING_DATA = await RESPONSE.json();
      const LISTING = LISTING_DATA.data;

      const LISTING_CONTAINER = document.getElementById('all-auction-listings');
      if (!LISTING_CONTAINER) {
        toastr.error('Listing container not found');
        throw new Error('Listing container not found');
      }
      LISTING_CONTAINER.innerHTML = '';
      createIndividualListingElement(LISTING, LISTING_CONTAINER);
    } catch (error) {
      throw new Error('Error fetching listing');
    }
  } else {
    throw new Error('No listing ID found');
  }
}
