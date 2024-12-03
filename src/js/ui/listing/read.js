import { removeListingFromAPI } from '../../api/listing/delete';
import { deleteListing } from './delete';
import { displayListingIdInUrlOnEditPage } from './edit';
import { postBidToAPI } from '../../api/bids/place';

import { closePlaceBidForm } from '../bids/place';

export function isLoggedIn() {
  return localStorage.getItem('accessToken') !== null;
}

/**
 * @function createMyListingsElements
 * @description Creates elements for each listing in the My Listings page
 * @param {Object} listing - The listing object
 * @returns {HTMLElement} - The listing container element
 */

export function createMyListingsElements(listing) {
  const LISTING_CONTAINER = document.createElement('div');
  LISTING_CONTAINER.classList.add('listing-box');

  const LISTING_TITLE = document.createElement('h2');
  const LISTING_DESCRIPTION = document.createElement('p');
  const LISTING_BIDS = document.createElement('p');
  const LISTING_END_DATE = document.createElement('p');
  const BUTTON_CONTAINER = document.createElement('div');
  const EDIT_BUTTON = document.createElement('button');
  const DELETE_BUTTON = document.createElement('button');
  const VIEW_BIDS_BUTTON = document.createElement('button');
  DELETE_BUTTON.classList.add('delete-button');
  const TEXT_BUTTON_CONTAINER = document.createElement('div');
  const VIEW_BIDS_CONTAINER = document.createElement('div');
  const LISTING_BIDS_COUNT_TOTAL = document.createElement('p');
  const LISTING_BIDDERS_NAME = document.createElement('p');
  const BIDDER_AVATAR = document.createElement('img');
  const BID_AMOUNT = document.createElement('p');

  EDIT_BUTTON.addEventListener('click', (event) => {
    displayListingIdInUrlOnEditPage(event);
  });

  DELETE_BUTTON.dataset.id = listing.id;
  EDIT_BUTTON.dataset.id = listing.id;
  if (isLoggedIn() && listing._count && listing._count.bids !== undefined) {
    LISTING_BIDS_COUNT_TOTAL.textContent = `Total bids: ${listing._count.bids}`;
  }
  LISTING_BIDDERS_NAME.textContent =
    listing.bids && listing.bids.length > 0
      ? `Bidder: ${listing.bids[0].bidder.name}`
      : 'No bidders';
  BIDDER_AVATAR.src =
    listing.bids && listing.bids.length > 0
      ? listing.bids[0].bidder.avatar.url
      : '';
  BID_AMOUNT.textContent =
    listing.bids && listing.bids.length > 0
      ? `Bid amount: ${listing.bids[0].amount}`
      : 'No bids';
  VIEW_BIDS_BUTTON.textContent = 'View Bids';
  EDIT_BUTTON.textContent = 'Edit';
  DELETE_BUTTON.textContent = 'Delete';
  LISTING_TITLE.textContent = listing.title || 'No title available';
  LISTING_DESCRIPTION.textContent =
    listing.description || 'No description available';
  LISTING_END_DATE.textContent = listing.endsAt || 'No end date available';

  TEXT_BUTTON_CONTAINER.appendChild(LISTING_TITLE);
  TEXT_BUTTON_CONTAINER.appendChild(LISTING_DESCRIPTION);
  TEXT_BUTTON_CONTAINER.appendChild(LISTING_BIDS);
  TEXT_BUTTON_CONTAINER.appendChild(LISTING_END_DATE);
  TEXT_BUTTON_CONTAINER.appendChild(BUTTON_CONTAINER);
  BUTTON_CONTAINER.appendChild(EDIT_BUTTON);
  BUTTON_CONTAINER.appendChild(DELETE_BUTTON);
  BUTTON_CONTAINER.appendChild(VIEW_BIDS_BUTTON);
  LISTING_CONTAINER.appendChild(TEXT_BUTTON_CONTAINER);
  TEXT_BUTTON_CONTAINER.appendChild(VIEW_BIDS_CONTAINER);
  fetchListingImages(listing, LISTING_CONTAINER);
  VIEW_BIDS_CONTAINER.appendChild(LISTING_BIDS_COUNT_TOTAL);
  VIEW_BIDS_CONTAINER.classList.add('hidden');

  if (listing.bids && listing.bids.length > 0) {
    listing.bids.forEach((bid) => {
      const BIDDER_CONTAINER = document.createElement('div');
      const BIDDER_NAME = document.createElement('p');
      const BIDDER_AVATAR = document.createElement('img');
      const BID_AMOUNT = document.createElement('p');

      BIDDER_NAME.textContent = `Bidder: ${bid.bidder.name}`;
      BIDDER_AVATAR.src = bid.bidder.avatar.url || '';
      BID_AMOUNT.textContent = `Bid amount: ${bid.amount}`;

      BIDDER_CONTAINER.appendChild(BIDDER_AVATAR);
      BIDDER_CONTAINER.appendChild(BIDDER_NAME);
      BIDDER_CONTAINER.appendChild(BID_AMOUNT);
      VIEW_BIDS_CONTAINER.appendChild(BIDDER_CONTAINER);
    });
  }
  const OUTER_CONTAINER = document.getElementById('my-auction-listings');
  OUTER_CONTAINER.appendChild(LISTING_CONTAINER);

  DELETE_BUTTON.addEventListener('click', deleteListing);

  VIEW_BIDS_BUTTON.addEventListener('click', () => {
    if (!isLoggedIn()) {
      alert('You need to be logged in to view bids.');
      return;
    }

    if (
      VIEW_BIDS_CONTAINER.style.display === 'none' ||
      !VIEW_BIDS_CONTAINER.style.display
    ) {
      VIEW_BIDS_CONTAINER.style.display = 'block';
    } else {
      VIEW_BIDS_CONTAINER.style.display = 'none';
    }
  });

  return LISTING_CONTAINER;
}

/**
 * @function fetchListingImages
 * @description Fetches and displays images for a listing
 * @param {Object} listing - The listing object
 * @param {HTMLElement} LISTING_CONTAINER - The listing container element
 */

export function fetchListingImages(listing, LISTING_CONTAINER) {
  const IMAGES = listing.media || [];
  console.log('Images:', IMAGES);

  IMAGES.forEach((image) => {
    console.log('Processing image:', image);
    const IMAGE_ELEMENT = document.createElement('img');
    IMAGE_ELEMENT.src = image.url;
    IMAGE_ELEMENT.alt = image.alt || 'No image available';
    IMAGE_ELEMENT.classList.add('listing-image');
    const IMAGE_GALLERY_CONTAINER = document.createElement('div');
    IMAGE_GALLERY_CONTAINER.classList.add('listing-image-container');
    IMAGE_GALLERY_CONTAINER.appendChild(IMAGE_ELEMENT);
    LISTING_CONTAINER.appendChild(IMAGE_GALLERY_CONTAINER);
  });
}

/**
 * @function createAllListingsElements
 * @description Creates elements for each listing on the home page
 * @param {Object} listing - The listing object
 * @returns {HTMLElement} - The listing container element
 */

export function createAllListingsElements(listing) {
  const LISTING_CONTAINER = document.createElement('div');
  LISTING_CONTAINER.classList.add('listing-box');

  //PLACE BID FORM
  const PLACE_BID_FORM = document.createElement('form');

  const PLACE_BID_INPUT = document.createElement('input');
  const CLOSE_BUTTON = document.createElement('button');
  const PLACE_BID_SUBMIT = document.createElement('button');

  PLACE_BID_FORM.classList.add('place-bid-form');
  PLACE_BID_INPUT.classList.add('place-bid-input');
  PLACE_BID_SUBMIT.classList.add('place-bid-submit');
  CLOSE_BUTTON.classList.add('close-btn');

  PLACE_BID_FORM.style.display = 'none';

  PLACE_BID_INPUT.placeholder = 'Enter bid amount';
  PLACE_BID_SUBMIT.textContent = 'Place bid';
  PLACE_BID_SUBMIT.type = 'submit';

  PLACE_BID_FORM.appendChild(PLACE_BID_INPUT);
  PLACE_BID_FORM.appendChild(PLACE_BID_SUBMIT);
  PLACE_BID_FORM.appendChild(CLOSE_BUTTON);
  CLOSE_BUTTON.textContent = 'X';

  //LISTING DETAILS

  const SELLER_NAME = document.createElement('p');
  const SELLER_AVATAR = document.createElement('img');
  const LISTING_TITLE = document.createElement('h2');
  const LISTING_DESCRIPTION = document.createElement('p');
  const LISTING_BIDS = document.createElement('p');
  const LISTING_END_DATE = document.createElement('p');
  const BUTTON_CONTAINER = document.createElement('div');
  const PLACE_BID_BUTTON = document.createElement('button');
  const VIEW_BIDS_BUTTON = document.createElement('button');
  const TEXT_BUTTON_CONTAINER = document.createElement('div');
  const VIEW_BIDS_CONTAINER = document.createElement('div');
  const LISTING_BIDS_COUNT_TOTAL = document.createElement('p');
  const LISTING_BIDDERS_NAME = document.createElement('p');
  const BIDDER_AVATAR = document.createElement('img');
  const BID_AMOUNT = document.createElement('p');
  const VIEW_LISTING_BTN = document.createElement('button');

  PLACE_BID_BUTTON.classList.add('display-place-bid-form-btn');
  PLACE_BID_BUTTON.addEventListener('click', () => {
    if (!isLoggedIn()) {
      alert('You need to be logged in to place a bid.');
      return;
    }
    if (PLACE_BID_FORM.style.display === 'none') {
      PLACE_BID_FORM.style.display = 'block';
    } else {
      PLACE_BID_FORM.style.display = 'none';
    }
  });

  PLACE_BID_FORM.addEventListener('submit', (event) => {
    event.preventDefault();

    const BID_AMOUNT = PLACE_BID_FORM.querySelector('.place-bid-input').value;

    postBidToAPI(listing.id, BID_AMOUNT, event);
  });

  VIEW_LISTING_BTN.textContent = 'View Listing';

  SELLER_NAME.textContent = `Seller: ${listing.seller.name}`;
  SELLER_AVATAR.src =
    listing.seller && listing.seller.avatar ? listing.seller.avatar.url : '';

  PLACE_BID_BUTTON.textContent = 'Place Bid';
  PLACE_BID_BUTTON.dataset.id = listing.id;

  if (isLoggedIn() && listing._count && listing._count.bids !== undefined) {
    LISTING_BIDS_COUNT_TOTAL.textContent = `No. of bids: ${listing._count.bids}`;
  }
  LISTING_BIDDERS_NAME.textContent =
    listing.bids && listing.bids.length > 0
      ? `Bidder: ${listing.bids[0].bidder.name}`
      : 'No bidders';
  BIDDER_AVATAR.src =
    listing.bids && listing.bids.length > 0
      ? listing.bids[0].bidder.avatar.url
      : '';
  BID_AMOUNT.textContent =
    listing.bids && listing.bids.length > 0
      ? `Bid amount: ${listing.bids[0].amount}`
      : 'No bids';
  VIEW_BIDS_BUTTON.textContent = 'View Bids';

  LISTING_TITLE.textContent = listing.title || 'No title available';
  LISTING_DESCRIPTION.textContent =
    listing.description || 'No description available';
  LISTING_END_DATE.textContent = listing.endsAt || 'No end date available';

  TEXT_BUTTON_CONTAINER.appendChild(LISTING_TITLE);
  TEXT_BUTTON_CONTAINER.appendChild(LISTING_DESCRIPTION);
  TEXT_BUTTON_CONTAINER.appendChild(LISTING_BIDS);
  TEXT_BUTTON_CONTAINER.appendChild(LISTING_END_DATE);
  TEXT_BUTTON_CONTAINER.appendChild(SELLER_NAME);
  TEXT_BUTTON_CONTAINER.appendChild(SELLER_AVATAR);
  TEXT_BUTTON_CONTAINER.appendChild(BUTTON_CONTAINER);
  BUTTON_CONTAINER.appendChild(PLACE_BID_BUTTON);
  BUTTON_CONTAINER.appendChild(VIEW_BIDS_BUTTON);
  BUTTON_CONTAINER.appendChild(VIEW_LISTING_BTN);
  LISTING_CONTAINER.appendChild(TEXT_BUTTON_CONTAINER);
  TEXT_BUTTON_CONTAINER.appendChild(VIEW_BIDS_CONTAINER);
  LISTING_CONTAINER.appendChild(PLACE_BID_FORM);
  fetchListingImages(listing, LISTING_CONTAINER);
  VIEW_BIDS_CONTAINER.appendChild(LISTING_BIDS_COUNT_TOTAL);
  VIEW_BIDS_CONTAINER.classList.add('hidden');

  if (listing.bids && listing.bids.length > 0) {
    listing.bids.forEach((bid) => {
      const BIDDER_CONTAINER = document.createElement('div');
      const BIDDER_NAME = document.createElement('p');
      const BIDDER_AVATAR = document.createElement('img');
      const BID_AMOUNT = document.createElement('p');

      BIDDER_NAME.textContent = `Bidder: ${bid.bidder.name}`;
      BIDDER_AVATAR.src = bid.bidder.avatar.url || '';
      BID_AMOUNT.textContent = `Bid amount: ${bid.amount}`;

      BIDDER_CONTAINER.appendChild(BIDDER_AVATAR);
      BIDDER_CONTAINER.appendChild(BIDDER_NAME);
      BIDDER_CONTAINER.appendChild(BID_AMOUNT);
      VIEW_BIDS_CONTAINER.appendChild(BIDDER_CONTAINER);
    });
  }
  const OUTER_CONTAINER = document.getElementById('all-auction-listings');
  OUTER_CONTAINER.appendChild(LISTING_CONTAINER);

  VIEW_LISTING_BTN.dataset.id = listing.id;
  VIEW_LISTING_BTN.classList.add('view-listing-btn');

  VIEW_LISTING_BTN.addEventListener('click', (event) => {
    const target = event.target.closest('.view-listing-btn');
    if (target) {
      displayListingIdInUrlOnListingPage(target.dataset.id);
    }
  });

  VIEW_BIDS_BUTTON.addEventListener('click', () => {
    if (!isLoggedIn()) {
      alert('You need to be logged in to view bids.');
      return;
    }
    if (
      VIEW_BIDS_CONTAINER.style.display === 'none' ||
      !VIEW_BIDS_CONTAINER.style.display
    ) {
      VIEW_BIDS_CONTAINER.style.display = 'block';
    } else {
      VIEW_BIDS_CONTAINER.style.display = 'none';
    }
  });
}

export function displayListingIdInUrlOnListingPage(listingId) {
  window.location.href = `/listing/?id=${listingId}`;
}

export function createIndividualListingElement() {
  const LISTING_CONTAINER = document.createElement('div');
  LISTING_CONTAINER.classList.add('listing-box');

  //PLACE BID FORM
  const PLACE_BID_FORM = document.createElement('form');

  const PLACE_BID_INPUT = document.createElement('input');
  const CLOSE_BUTTON = document.createElement('button');
  const PLACE_BID_SUBMIT = document.createElement('button');

  PLACE_BID_FORM.classList.add('place-bid-form');
  PLACE_BID_INPUT.classList.add('place-bid-input');
  PLACE_BID_SUBMIT.classList.add('place-bid-submit');
  CLOSE_BUTTON.classList.add('close-btn');

  PLACE_BID_FORM.style.display = 'none';

  PLACE_BID_INPUT.placeholder = 'Enter bid amount';
  PLACE_BID_SUBMIT.textContent = 'Place bid';
  PLACE_BID_SUBMIT.type = 'submit';

  PLACE_BID_FORM.appendChild(PLACE_BID_INPUT);
  PLACE_BID_FORM.appendChild(PLACE_BID_SUBMIT);
  PLACE_BID_FORM.appendChild(CLOSE_BUTTON);
  CLOSE_BUTTON.textContent = 'X';

  //LISTING DETAILS

  const SELLER_NAME = document.createElement('p');
  const SELLER_AVATAR = document.createElement('img');
  const LISTING_TITLE = document.createElement('h2');
  const LISTING_DESCRIPTION = document.createElement('p');
  const LISTING_BIDS = document.createElement('p');
  const LISTING_END_DATE = document.createElement('p');
  const BUTTON_CONTAINER = document.createElement('div');
  const PLACE_BID_BUTTON = document.createElement('button');
  const VIEW_BIDS_BUTTON = document.createElement('button');
  const TEXT_BUTTON_CONTAINER = document.createElement('div');
  const VIEW_BIDS_CONTAINER = document.createElement('div');
  const LISTING_BIDS_COUNT_TOTAL = document.createElement('p');
  const LISTING_BIDDERS_NAME = document.createElement('p');
  const BIDDER_AVATAR = document.createElement('img');
  const BID_AMOUNT = document.createElement('p');

  PLACE_BID_BUTTON.classList.add('display-place-bid-form-btn');
  PLACE_BID_BUTTON.addEventListener('click', () => {
    if (PLACE_BID_FORM.style.display === 'none') {
      PLACE_BID_FORM.style.display = 'block';
    } else {
      PLACE_BID_FORM.style.display = 'none';
    }
  });

  PLACE_BID_FORM.addEventListener('submit', (event) => {
    event.preventDefault();

    const BID_AMOUNT = PLACE_BID_FORM.querySelector('.place-bid-input').value;

    postBidToAPI(listing.id, BID_AMOUNT, event);
  });

  SELLER_NAME.textContent = `Seller: ${listing.seller.name}`;
  SELLER_AVATAR.src =
    listing.seller && listing.seller.avatar ? listing.seller.avatar.url : '';

  PLACE_BID_BUTTON.textContent = 'Place Bid';
  PLACE_BID_BUTTON.dataset.id = listing.id;

  if (isLoggedIn() && listing._count && listing._count.bids !== undefined) {
    LISTING_BIDS_COUNT_TOTAL.textContent = `No. of bids: ${listing._count.bids}`;
  }
  LISTING_BIDDERS_NAME.textContent =
    listing.bids && listing.bids.length > 0
      ? `Bidder: ${listing.bids[0].bidder.name}`
      : 'No bidders';
  BIDDER_AVATAR.src =
    listing.bids && listing.bids.length > 0
      ? listing.bids[0].bidder.avatar.url
      : '';
  BID_AMOUNT.textContent =
    listing.bids && listing.bids.length > 0
      ? `Bid amount: ${listing.bids[0].amount}`
      : 'No bids';
  VIEW_BIDS_BUTTON.textContent = 'View Bids';

  LISTING_TITLE.textContent = listing.title || 'No title available';
  LISTING_DESCRIPTION.textContent =
    listing.description || 'No description available';
  LISTING_END_DATE.textContent = listing.endsAt || 'No end date available';

  TEXT_BUTTON_CONTAINER.appendChild(LISTING_TITLE);
  TEXT_BUTTON_CONTAINER.appendChild(LISTING_DESCRIPTION);
  TEXT_BUTTON_CONTAINER.appendChild(LISTING_BIDS);
  TEXT_BUTTON_CONTAINER.appendChild(LISTING_END_DATE);
  TEXT_BUTTON_CONTAINER.appendChild(SELLER_NAME);
  TEXT_BUTTON_CONTAINER.appendChild(SELLER_AVATAR);
  TEXT_BUTTON_CONTAINER.appendChild(BUTTON_CONTAINER);
  BUTTON_CONTAINER.appendChild(PLACE_BID_BUTTON);
  BUTTON_CONTAINER.appendChild(VIEW_BIDS_BUTTON);
  LISTING_CONTAINER.appendChild(TEXT_BUTTON_CONTAINER);
  TEXT_BUTTON_CONTAINER.appendChild(VIEW_BIDS_CONTAINER);

  LISTING_CONTAINER.appendChild(PLACE_BID_FORM);
  fetchListingImages(listing, LISTING_CONTAINER);
  VIEW_BIDS_CONTAINER.appendChild(LISTING_BIDS_COUNT_TOTAL);
  VIEW_BIDS_CONTAINER.classList.add('hidden');

  if (listing.bids && listing.bids.length > 0) {
    listing.bids.forEach((bid) => {
      const BIDDER_CONTAINER = document.createElement('div');
      const BIDDER_NAME = document.createElement('p');
      const BIDDER_AVATAR = document.createElement('img');
      const BID_AMOUNT = document.createElement('p');

      BIDDER_NAME.textContent = `Bidder: ${bid.bidder.name}`;
      BIDDER_AVATAR.src = bid.bidder.avatar.url || '';
      BID_AMOUNT.textContent = `Bid amount: ${bid.amount}`;

      BIDDER_CONTAINER.appendChild(BIDDER_AVATAR);
      BIDDER_CONTAINER.appendChild(BIDDER_NAME);
      BIDDER_CONTAINER.appendChild(BID_AMOUNT);
      VIEW_BIDS_CONTAINER.appendChild(BIDDER_CONTAINER);
    });
  }
  const OUTER_CONTAINER = document.getElementById('all-auction-listings');
  OUTER_CONTAINER.appendChild(LISTING_CONTAINER);

  VIEW_BIDS_BUTTON.addEventListener('click', () => {
    if (!isLoggedIn()) {
      alert('You need to be logged in to view bids.');
      return;
    }
    if (
      VIEW_BIDS_CONTAINER.style.display === 'none' ||
      !VIEW_BIDS_CONTAINER.style.display
    ) {
      VIEW_BIDS_CONTAINER.style.display = 'block';
    } else {
      VIEW_BIDS_CONTAINER.style.display = 'none';
    }
  });
}
