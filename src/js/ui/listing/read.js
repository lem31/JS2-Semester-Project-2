import { removeListingFromAPI } from '../../api/listing/delete';
import { deleteListing } from './delete';
import { displayListingIdInUrlOnEditPage } from './edit';
import { postBidToAPI } from '../../api/bids/place';

import { closePlaceBidForm } from '../bids/place';

export function isLoggedIn() {
  return localStorage.getItem('accessToken') !== null;
}

/**
 * @function fetchListingImages
 * @description Fetches and displays images for a listing
 * @param {Object} listing - The listing object
 * @param {HTMLElement} LISTING_CONTAINER - The listing container element
 */

export function fetchListingImages(listing, LISTING_CONTAINER) {
  const IMAGES = listing.media || [];

  IMAGES.forEach((image) => {
    if (image.url) {
      const IMAGE = document.createElement('img');
      IMAGE.src = image.url || '/images/Logo.png';
      IMAGE.alt = image.alt || 'No image available';
      IMAGE.classList.add('listing-image');
      IMAGE.classList.add('carouselItem');
      LISTING_CONTAINER.appendChild(IMAGE);
      LISTING_CONTAINER.classList.add('w-[200px]');
    }
  });
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

  VIEW_BIDS_CONTAINER.appendChild(LISTING_BIDS_COUNT_TOTAL);

  VIEW_BIDS_CONTAINER.appendChild(LISTING_BIDS_COUNT_TOTAL);
  VIEW_BIDS_CONTAINER.classList.add('hidden');
  fetchListingImages(listing, LISTING_CONTAINER);

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
 * @function createAllListingsElements
 * @description Creates elements for each listing on the home page
 * @param {Object} listing - The listing object
 * @returns {HTMLElement} - The listing container element
 */

export function createAllListingsElements(listing) {
  const LISTING_CONTAINER = document.createElement('div');
  LISTING_CONTAINER.classList.add('listing-box');
  const IMAGE_CONTAINER = document.createElement('div');
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

  const SELLER_NAME = document.createElement('p');
  const SELLER_AVATAR = document.createElement('img');
  const SELLER_INFO_BOX = document.createElement('div');
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
  const VIEW_LISTING_BTN_CONTAINER = document.createElement('div');
  const CAROUSEL = document.createElement('div');
  const CAROUSEL_INNER = document.createElement('div');

  const PREV_BUTTON = document.createElement('button');
  const NEXT_BUTTON = document.createElement('button');
  const PREV_IMG = document.createElement('img');
  const NEXT_IMG = document.createElement('img');
  PREV_IMG.src = '/images/icons8-left-100.png';
  NEXT_IMG.src = '/images/icons8-right-100.png';

  NEXT_BUTTON.appendChild(NEXT_IMG);
  PREV_BUTTON.appendChild(PREV_IMG);
  PREV_BUTTON.classList.add('absolute');
  PREV_BUTTON.classList.add('left-0');

  NEXT_BUTTON.classList.add('absolute');
  NEXT_BUTTON.classList.add('right-0');

  LISTING_CONTAINER.classList.add('listing-container-styles');
  LISTING_CONTAINER.classList.add('flex-col-center-layout');
  TEXT_BUTTON_CONTAINER.classList.add('flex-col-center-layout');
  VIEW_BIDS_BUTTON.classList.add('view-bids-btn');
  VIEW_BIDS_BUTTON.classList.add('button-styles');
  SELLER_AVATAR.classList.add('seller-avatar-img');
  PLACE_BID_BUTTON.classList.add('display-place-bid-form-btn');
  PLACE_BID_BUTTON.classList.add('button-styles');
  VIEW_LISTING_BTN.classList.add('button-styles');
  LISTING_END_DATE.classList.add('max-w-[250px]');

  IMAGE_CONTAINER.style.transition = 'transform 0.5s ease-in-out';
  IMAGE_CONTAINER.style.display = 'flex';
  IMAGE_CONTAINER.style.overflow = 'hidden';

  let currentIndex = 0;

  PREV_BUTTON.addEventListener('click', () => {
    const items = IMAGE_CONTAINER.querySelectorAll('.carouselItem');
    if (items.length > 0) {
      items[currentIndex].classList.remove('active');
      currentIndex = (currentIndex - 1 + items.length) % items.length;
      items.forEach((item, index) => {
        item.style.transform = `translateX(${(index - currentIndex) * 100}%)`;
      });
      items[currentIndex].classList.add('active');
    }
  });

  NEXT_BUTTON.addEventListener('click', () => {
    const items = IMAGE_CONTAINER.querySelectorAll('.carouselItem');
    if (items.length > 0) {
      items[currentIndex].classList.remove('active');
      currentIndex = (currentIndex + 1) % items.length;
      items.forEach((item, index) => {
        item.style.transform = `translateX(${(index - currentIndex) * 100}%)`;
      });
      items[currentIndex].classList.add('active');
    }
  });

  const items = IMAGE_CONTAINER.querySelectorAll('.carouselItem');
  if (items.length > 0) {
    IMAGE_CONTAINER.style.width = `${items.length * 100}%`;
    items.forEach((item) => {
      item.style.width = `${100 / items.length}%`;
    });
    items[0].classList.add('active');
  }

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
  const END_DATE = new Date(listing.endsAt);
  const OPTIONS = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  const FORMATTED_DATE = END_DATE.toLocaleDateString('en-US', OPTIONS);
  const FORMATTED_TIME = END_DATE.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });
  LISTING_END_DATE.textContent =
    `Ends At: ${FORMATTED_TIME} on ${FORMATTED_DATE}` ||
    'No end date available';

  TEXT_BUTTON_CONTAINER.appendChild(LISTING_TITLE);
  const BIDS_IMAGE = document.createElement('img');
  BIDS_IMAGE.src = '/images/icons8-coins-64.png';
  const BIDS_CONTAINER = document.createElement('div');
  TEXT_BUTTON_CONTAINER.appendChild(BIDS_CONTAINER);
  BIDS_CONTAINER.appendChild(BIDS_IMAGE);
  BIDS_CONTAINER.appendChild(LISTING_BIDS_COUNT_TOTAL);
  TEXT_BUTTON_CONTAINER.appendChild(BIDS_CONTAINER);
  TEXT_BUTTON_CONTAINER.appendChild(LISTING_DESCRIPTION);
  TEXT_BUTTON_CONTAINER.appendChild(LISTING_BIDS);
  TEXT_BUTTON_CONTAINER.appendChild(LISTING_END_DATE);
  TEXT_BUTTON_CONTAINER.appendChild(SELLER_INFO_BOX);
  TEXT_BUTTON_CONTAINER.appendChild(BUTTON_CONTAINER);
  TEXT_BUTTON_CONTAINER.appendChild(VIEW_BIDS_CONTAINER);
  BUTTON_CONTAINER.appendChild(PLACE_BID_BUTTON);
  BUTTON_CONTAINER.appendChild(VIEW_BIDS_BUTTON);
  VIEW_LISTING_BTN_CONTAINER.appendChild(VIEW_LISTING_BTN);

  CAROUSEL_INNER.appendChild(IMAGE_CONTAINER);
  CAROUSEL.appendChild(CAROUSEL_INNER);

  IMAGE_CONTAINER.classList.add('image-container', 'imageContainer');

  CAROUSEL_INNER.classList.add('carouselInner');
  LISTING_CONTAINER.appendChild(CAROUSEL);
  fetchListingImages(listing, IMAGE_CONTAINER);
  LISTING_CONTAINER.appendChild(TEXT_BUTTON_CONTAINER);
  LISTING_CONTAINER.appendChild(TEXT_BUTTON_CONTAINER);
  LISTING_CONTAINER.appendChild(VIEW_LISTING_BTN_CONTAINER);
  LISTING_CONTAINER.appendChild(PLACE_BID_FORM);
  SELLER_INFO_BOX.appendChild(SELLER_AVATAR);
  SELLER_INFO_BOX.appendChild(SELLER_NAME);
  CAROUSEL_INNER.appendChild(PREV_BUTTON);
  CAROUSEL_INNER.appendChild(NEXT_BUTTON);
  VIEW_BIDS_CONTAINER.classList.add('hidden');
  SELLER_INFO_BOX.classList.add('flex-row-center');
  BIDS_CONTAINER.classList.add('flex-row-center');

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

      BIDDER_AVATAR.classList.add('seller-avatar-img');
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

  SELLER_NAME.classList.add('h2-mobile');
  LISTING_TITLE.classList.add('h2-mobile');
  LISTING_BIDS_COUNT_TOTAL.classList.add('h2-mobile');
  LISTING_END_DATE.classList.add('h2-mobile');

  function updateListingText() {
    if (window.innerWidth >= 768) {
      SELLER_NAME.classList.remove('h2-mobile');
      LISTING_TITLE.classList.remove('h2-mobile');
      LISTING_BIDS_COUNT_TOTAL.classList.remove('h2-mobile');
      LISTING_END_DATE.classList.remove('h2-mobile');
      SELLER_NAME.classList.add('h2-desktop');
      LISTING_TITLE.classList.add('h2-desktop');
      LISTING_BIDS_COUNT_TOTAL.classList.add('h2-desktop');
      LISTING_END_DATE.classList.add('h2-desktop');
    } else {
      SELLER_NAME.classList.remove('h2-desktop');
      LISTING_TITLE.classList.remove('h2-desktop');
      LISTING_BIDS.classList.remove('h2-desktop');
      LISTING_END_DATE.classList.remove('h2-desktop');
      SELLER_NAME.classList.add('h2-mobile');
      LISTING_TITLE.classList.add('h2-mobile');
      LISTING_BIDS_COUNT_TOTAL.classList.add('h2-mobile');
      LISTING_END_DATE.classList.add('h2-mobile');
    }
  }

  window.addEventListener('resize', updateListingText);

  updateListingText();
}

export function displayListingIdInUrlOnListingPage(LISTING) {
  window.location.href = `/listing/?id=${LISTING}`;
}

/**
 * @function createIndividualListingElement
 * @param {Object} listing - The listing object
 * @returns {HTMLElement} - The listing container element
 * @returns {void}
 * @description This function creates the elements for an individual listing on the individual listing page
 */

export function createIndividualListingElement(listing) {
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
  const OUTER_CONTAINER = document.getElementById('listing-container');
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
