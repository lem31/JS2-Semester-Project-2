import { postBidToAPI } from '../../api/bids/place';
import { addHoverEffectToListing } from '../all_listings/read';
import coinImage from '../../../../images/icons8-coins-64.png';
import noPhotosImage from '../../../../images/no-photos.jpg';

export function isLoggedIn() {
  return localStorage.getItem('accessToken') !== null;
}

/**
 * @function closePlaceBidForm
 * @description Closes the place bid form
 * @param {Event} event - The event object
 * @param {HTMLElement} PLACE_BID_FORM - The place bid form element
 */

export function closePlaceBidForm(event, PLACE_BID_FORM) {
  event.preventDefault();

  PLACE_BID_FORM.style.display = 'none';
}

/**
 * @function toggleCarouselImages
 * @description Toggles back and forth between images in the carousel
 * @param {HTMLElement} carouselInner - The inner container of the carousel
 * @param {HTMLElement} prevButton - The button to go to the previous image
 * @param {HTMLElement} nextButton - The button to go to the next image
 */
export function toggleCarouselImages(
  IMAGE_CONTAINER,
  PREV_BUTTON,
  NEXT_BUTTON
) {
  let currentIndex = 0;
  const images = IMAGE_CONTAINER.querySelectorAll('.carouselItem');

  function showImage(index) {
    images.forEach((image, i) => {
      image.style.display = i === index ? 'block' : 'none';
    });
  }

  PREV_BUTTON.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage(currentIndex);
  });

  NEXT_BUTTON.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
  });

  showImage(currentIndex);
}

/**
 * @function fetchListingImages
 * @description Fetches and displays images for a listing
 * @param {Object} listing - The listing object
 * @param {HTMLElement} LISTING_CONTAINER - The listing container element
 */

export function fetchListingImages(listing, LISTING_CONTAINER) {
  const IMAGES = listing.media || [];

  if (IMAGES.length === 0) {
    const defaultImage = document.createElement('img');
    defaultImage.src = noPhotosImage;
    defaultImage.alt = 'No image available';
    defaultImage.classList.add('listing-image');
    defaultImage.classList.add('carouselItem');
    LISTING_CONTAINER.appendChild(defaultImage);
    return;
  }

  IMAGES.forEach((image) => {
    if (image.url) {
      const IMAGE = document.createElement('img');
      IMAGE.src = image.url || '../../../../images/no-photos.jpg';
      IMAGE.alt = image.alt || 'No image available';
      IMAGE.classList.add('listing-image');
      IMAGE.classList.add('carouselItem');

      IMAGE.onerror = () => {
        IMAGE.src = '../../../../images/no-photos.jpg';
        IMAGE.alt = 'Image not available';
        IMAGE.style.display = 'none';
      };

      LISTING_CONTAINER.appendChild(IMAGE);
    }
  });
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
  const IMAGE_CONTAINER = document.createElement('div');
  const INNER_CONTAINER = document.createElement('div');
  const PLACE_BID_FORM = document.createElement('form');
  const PLACE_BID_TITLE_BOX = document.createElement('div');
  const PLACE_BID_TITLE = document.createElement('h2');
  const PLACE_BID_INPUT = document.createElement('input');
  const PLACE_BID_LABEL = document.createElement('label');
  const CLOSE_BUTTON_CONTAINER = document.createElement('div');
  const CLOSE_BUTTON = document.createElement('button');
  const PLACE_BID_SUBMIT = document.createElement('button');
  const PLACE_BID_FORM_CONTAINER = document.createElement('div');
  const PLACE_BID_SUBMIT_CONTAINER = document.createElement('div');
  const FORM_INPUT_LABEL_BOX = document.createElement('div');
  const BIDS_IMAGE_INPUT_CONTAINER = document.createElement('div');
  const BIDS_IMAGE = document.createElement('img');

  BIDS_IMAGE.src = '../../../../images/icons8-coins-64.png';
  PLACE_BID_FORM.style.display = 'none';
  PLACE_BID_INPUT.placeholder = 'Enter bid amount';
  PLACE_BID_SUBMIT.textContent = 'Place bid';
  PLACE_BID_SUBMIT.type = 'submit';
  CLOSE_BUTTON.textContent = 'X';
  CLOSE_BUTTON.type = 'button';
  PLACE_BID_TITLE.textContent = 'Place Bid';
  PLACE_BID_LABEL.textContent = 'Your bid';

  PLACE_BID_SUBMIT_CONTAINER.appendChild(PLACE_BID_SUBMIT);
  CLOSE_BUTTON_CONTAINER.appendChild(CLOSE_BUTTON);
  PLACE_BID_FORM.appendChild(CLOSE_BUTTON_CONTAINER);
  PLACE_BID_TITLE_BOX.appendChild(PLACE_BID_TITLE);
  PLACE_BID_FORM.appendChild(PLACE_BID_TITLE_BOX);
  FORM_INPUT_LABEL_BOX.appendChild(PLACE_BID_LABEL);
  FORM_INPUT_LABEL_BOX.appendChild(BIDS_IMAGE_INPUT_CONTAINER);
  BIDS_IMAGE_INPUT_CONTAINER.appendChild(BIDS_IMAGE);
  BIDS_IMAGE_INPUT_CONTAINER.appendChild(PLACE_BID_INPUT);

  PLACE_BID_FORM.appendChild(FORM_INPUT_LABEL_BOX);
  PLACE_BID_FORM.appendChild(PLACE_BID_SUBMIT_CONTAINER);
  PLACE_BID_FORM_CONTAINER.appendChild(PLACE_BID_FORM);

  //LISTING DETAILS

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

  PLACE_BID_BUTTON.addEventListener('click', () => {
    if (!isLoggedIn()) {
      const ERROR_MESSAGE = document.createElement('p');
      ERROR_MESSAGE.textContent = 'You need to be logged in to place a bid.';
      ERROR_MESSAGE.classList.add(
        'error-message',
        'no-bids-message',
        'absolute',
        'left-1/2',
        'top-1/2',
        'transform',
        '-translate-x-1/2',
        '-translate-y-1/2',
        'bg-white',
        'text-red-500',
        'z-50',
        'text-xl'
      );
      LISTING_CONTAINER.appendChild(ERROR_MESSAGE);
      const RECT = event.target.getBoundingClientRect();
      ERROR_MESSAGE.style.top = `${RECT.top + window.scrollY}px`;
      ERROR_MESSAGE.style.left = `${RECT.left + window.scrollX}px`;
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
  TEXT_BUTTON_CONTAINER.appendChild(LISTING_DESCRIPTION);
  TEXT_BUTTON_CONTAINER.appendChild(LISTING_BIDS);
  TEXT_BUTTON_CONTAINER.appendChild(LISTING_END_DATE);
  TEXT_BUTTON_CONTAINER.appendChild(LISTING_BIDS_COUNT_TOTAL);
  TEXT_BUTTON_CONTAINER.appendChild(SELLER_INFO_BOX);
  SELLER_INFO_BOX.appendChild(SELLER_AVATAR);
  SELLER_INFO_BOX.appendChild(SELLER_NAME);

  LISTING_CONTAINER.appendChild(TEXT_BUTTON_CONTAINER);
  fetchListingImages(listing, IMAGE_CONTAINER);
  LISTING_CONTAINER.appendChild(IMAGE_CONTAINER);
  LISTING_CONTAINER.appendChild(BUTTON_CONTAINER);
  BUTTON_CONTAINER.appendChild(PLACE_BID_BUTTON);
  BUTTON_CONTAINER.appendChild(VIEW_BIDS_BUTTON);

  LISTING_CONTAINER.appendChild(VIEW_BIDS_CONTAINER);

  LISTING_CONTAINER.appendChild(PLACE_BID_FORM);

  VIEW_BIDS_CONTAINER.classList.add('hidden');

  if (listing.bids && listing.bids.length > 0) {
    listing.bids.forEach((bid) => {
      const BIDDER_CONTAINER = document.createElement('div');
      const BIDDER_AVATAR_NAME_BOX = document.createElement('div');
      const BIDDER_COIN_BID_BOX = document.createElement('div');
      const BIDDER_NAME = document.createElement('p');
      const BIDDER_AVATAR = document.createElement('img');
      const BID_AMOUNT = document.createElement('p');

      const CLOSE_BTN = document.createElement('button');
      const CLOSE_BTN_BOX = document.createElement('div');

      BIDDER_NAME.textContent = `Bidder: ${bid.bidder.name}`;
      BIDDER_AVATAR.src = bid.bidder.avatar.url || '';
      BID_AMOUNT.textContent = `Bid amount: ${bid.amount}`;
      const COIN_IMAGE = document.createElement('img');
      COIN_IMAGE.src = coinImage;
      COIN_IMAGE.alt = 'Coin icon';
      COIN_IMAGE.classList.add('coin-icon');

      if (!VIEW_BIDS_CONTAINER.querySelector('.close-btn')) {
        CLOSE_BTN_BOX.appendChild(CLOSE_BTN);
        CLOSE_BTN.textContent = 'X';
        CLOSE_BTN.classList.add(
          'close-btn',
          'button-styles',
          'pl-2',
          'pr-2',
          'p-t-1',
          'p-b-1',
          'mr-[170px]'
        );
      }

      CLOSE_BTN.addEventListener('click', () => {
        if (VIEW_BIDS_CONTAINER.classList.contains('view-bids-box')) {
          VIEW_BIDS_CONTAINER.classList.remove('view-bids-box');
          VIEW_BIDS_CONTAINER.classList.add('hidden');
        }
      });

      BIDDER_CONTAINER.appendChild(CLOSE_BTN_BOX);
      VIEW_BIDS_CONTAINER.appendChild(BIDDER_CONTAINER);
      BIDDER_AVATAR_NAME_BOX.appendChild(BIDDER_AVATAR);
      BIDDER_AVATAR_NAME_BOX.appendChild(BIDDER_NAME);

      BIDDER_CONTAINER.appendChild(BIDDER_AVATAR_NAME_BOX);
      BIDDER_COIN_BID_BOX.appendChild(COIN_IMAGE);
      BIDDER_COIN_BID_BOX.appendChild(BID_AMOUNT);
      BIDDER_CONTAINER.appendChild(BIDDER_COIN_BID_BOX);

      VIEW_BIDS_CONTAINER.appendChild(BIDDER_CONTAINER);

      BIDDER_NAME.classList.add('labels');
      BIDDER_AVATAR_NAME_BOX.classList.add('flex-row-center');
      BID_AMOUNT.classList.add('labels');

      BIDDER_AVATAR.classList.add('seller-avatar-img');
      COIN_IMAGE.classList.add(
        'w-[30px]',
        'h-[30px]',
        'md:w-[50px]',
        'md:h-[50px]'
      );
      BIDDER_COIN_BID_BOX.classList.add('flex-row-center');
    });
  }

  const LISTING_IMAGES = IMAGE_CONTAINER.querySelectorAll('img');
  const OUTER_CONTAINER = document.getElementById('all-auction-listings');
  if (OUTER_CONTAINER) {
    OUTER_CONTAINER.appendChild(LISTING_CONTAINER);
  } else {
    throw new Error("Error: 'listing-container' element not found.");
  }

  VIEW_BIDS_BUTTON.addEventListener('click', () => {
    if (!isLoggedIn()) {
      const ERROR_MESSAGE = document.createElement('p');
      ERROR_MESSAGE.textContent = 'You need to be logged in to view bids.';
      ERROR_MESSAGE.classList.add(
        'error-message',
        'no-bids-message',
        'absolute',
        'left-1/2',
        'top-1/2',
        'transform',
        '-translate-x-1/2',
        '-translate-y-1/2',
        'bg-white',
        'text-red-500',
        'z-50',
        'text-xl'
      );
      LISTING_CONTAINER.appendChild(ERROR_MESSAGE);
      const RECT = event.target.getBoundingClientRect();
      ERROR_MESSAGE.style.top = `${RECT.top + window.scrollY}px`;
      ERROR_MESSAGE.style.left = `${RECT.left + window.scrollX}px`;
      setTimeout(() => {
        ERROR_MESSAGE.remove();
      }, 3000);
      return;
    }

    const OPEN_BIDS_CONTAINER = document.querySelector('.view-bids-box');
    if (OPEN_BIDS_CONTAINER && OPEN_BIDS_CONTAINER !== VIEW_BIDS_CONTAINER) {
      const ERROR_MESSAGE = document.createElement('p');

      ERROR_MESSAGE.textContent =
        'Please close the current bids before opening another.';

      ERROR_MESSAGE.classList.add(
        'error-message',
        'no-bids-message',
        'absolute',
        'left-1/2',
        'top-1/2',
        'transform',
        '-translate-x-1/2',
        '-translate-y-1/2',
        'bg-white',
        'text-red-500',
        'z-50',
        'text-xl'
      );
      LISTING_CONTAINER.appendChild(ERROR_MESSAGE);
      const RECT = event.target.getBoundingClientRect();
      ERROR_MESSAGE.style.top = `${RECT.top + window.scrollY}px`;
      ERROR_MESSAGE.style.left = `${RECT.left + window.scrollX}px`;
      setTimeout(() => {
        ERROR_MESSAGE.remove();
      }, 3000);
      return;
    }

    if (listing.bids && listing.bids.length > 0) {
      if (
        VIEW_BIDS_CONTAINER.classList.contains('hidden') ||
        !VIEW_BIDS_CONTAINER.classList.contains('view-bids-box')
      ) {
        VIEW_BIDS_CONTAINER.classList.remove('hidden');
        VIEW_BIDS_CONTAINER.classList.add('view-bids-box', 'mt-[300px]');
      } else {
        VIEW_BIDS_CONTAINER.classList.add('hidden');
        VIEW_BIDS_CONTAINER.classList.remove('view-bids-box', 'mt-[300px]');
      }
    } else {
      const NO_BIDS_MESSAGE = document.createElement('p');
      NO_BIDS_MESSAGE.textContent = 'No bids available.';
      NO_BIDS_MESSAGE.classList.add(
        'no-bids-message',
        'bg-white',
        'text-red-500',
        'absolute',
        'text-xl',
        'z-50'
      );
      LISTING_CONTAINER.appendChild(NO_BIDS_MESSAGE);
      setTimeout(() => {
        NO_BIDS_MESSAGE.remove();
      }, 3000);
    }
  });
  OUTER_CONTAINER.appendChild(INNER_CONTAINER);

  addHoverEffectToListing(IMAGE_CONTAINER);

  addStylesToIndividualListingElements(
    TEXT_BUTTON_CONTAINER,
    LISTING_TITLE,
    LISTING_DESCRIPTION,
    LISTING_BIDS,
    LISTING_END_DATE,
    SELLER_AVATAR,
    SELLER_NAME,
    SELLER_INFO_BOX,
    IMAGE_CONTAINER,
    LISTING_CONTAINER,
    LISTING_IMAGES,
    PLACE_BID_BUTTON,
    VIEW_BIDS_BUTTON,
    BUTTON_CONTAINER,
    PLACE_BID_FORM,
    PLACE_BID_INPUT,
    PLACE_BID_SUBMIT,
    CLOSE_BUTTON,
    PLACE_BID_TITLE,
    PLACE_BID_TITLE_BOX,
    BIDS_IMAGE_INPUT_CONTAINER,
    PLACE_BID_SUBMIT_CONTAINER,
    BIDS_IMAGE,
    VIEW_BIDS_CONTAINER,
    FORM_INPUT_LABEL_BOX,
    PLACE_BID_LABEL,
    PLACE_BID_FORM_CONTAINER,
    LISTING_BIDS_COUNT_TOTAL
  );
}

/**
 * @function displayListingIdInUrlOnListingPage
 * @description Displays the listing ID in the URL on the listing page
 * @param {string} listingId - The ID of the listing
 */
export function displayListingIdInUrlOnListingPage(listingId) {
  window.location.href = `/listing/?id=${listingId}`;
}

/**
 * @function addStylesToElements
 * @description Adds styles to create all listings elements
 * @returns {void}
 * @throws {void}
 * @listens window:resize
 * @listens document:DOMContentLoaded
 * @listens document:load
 *
 *
 */

function addStylesToIndividualListingElements(
  TEXT_BUTTON_CONTAINER,
  LISTING_TITLE,
  LISTING_DESCRIPTION,
  LISTING_BIDS,
  LISTING_END_DATE,
  SELLER_AVATAR,
  SELLER_NAME,
  SELLER_INFO_BOX,
  IMAGE_CONTAINER,
  LISTING_CONTAINER,
  LISTING_IMAGES,
  PLACE_BID_BUTTON,
  VIEW_BIDS_BUTTON,
  BUTTON_CONTAINER,
  PLACE_BID_FORM,
  PLACE_BID_INPUT,
  PLACE_BID_SUBMIT,
  CLOSE_BUTTON,
  PLACE_BID_TITLE,
  PLACE_BID_TITLE_BOX,
  BIDS_IMAGE_INPUT_CONTAINER,
  PLACE_BID_SUBMIT_CONTAINER,
  BIDS_IMAGE,
  VIEW_BIDS_CONTAINER,
  FORM_INPUT_LABEL_BOX,
  PLACE_BID_LABEL,
  PLACE_BID_FORM_CONTAINER,
  LISTING_BIDS_COUNT_TOTAL
) {
  PLACE_BID_FORM.classList.add(
    'place-bid-form',
    'form-styles',
    'w-[280px]',
    'h-[218px]',
    'absolute'
  );
  PLACE_BID_FORM_CONTAINER.classList.add('relative');
  PLACE_BID_INPUT.classList.add('place-bid-input', 'input-styles');
  PLACE_BID_SUBMIT.classList.add(
    'place-bid-submit',
    'button-styles',
    'mt-4',
    'pl-3',
    'pr-3',
    'pt-1',
    'pb-1'
  );
  CLOSE_BUTTON.classList.add(
    'close-btn',
    'button-styles',
    'pl-2',
    'pr-2',
    'p-t-1',
    'p-b-1'
  );
  PLACE_BID_TITLE.classList.add('h2-styles', 'form-title-styles');

  PLACE_BID_TITLE_BOX.classList.add(
    'flex-row-center',
    'mb-4',
    'text-center',
    'mt-[-18px]'
  );

  BIDS_IMAGE.classList.add(
    'w-[30px]',
    'h-[30px]',
    'md:w-[50px]',
    'md:h-[50px]'
  );

  PLACE_BID_SUBMIT_CONTAINER.classList.add('flex-row-center');

  PLACE_BID_LABEL.classList.add('gold-labels', 'ml-8');

  BIDS_IMAGE_INPUT_CONTAINER.classList.add('flex-row-center');

  FORM_INPUT_LABEL_BOX.classList.add('flex', 'flex-col');

  VIEW_BIDS_CONTAINER.classList.add('hidden');

  TEXT_BUTTON_CONTAINER.classList.add('flex-col-center-layout');
  LISTING_TITLE.classList.add('h2-styles');
  LISTING_DESCRIPTION.classList.add('body-text-styles');
  LISTING_BIDS.classList.add('h2-styles');
  LISTING_END_DATE.classList.add('labels', 'max-w-[180px]', 'md:max-w-[400px]');
  LISTING_BIDS_COUNT_TOTAL.classList.add('labels');

  SELLER_AVATAR.classList.add('seller-avatar-img');
  SELLER_NAME.classList.add('labels');
  SELLER_INFO_BOX.classList.add('flex-row-center');

  IMAGE_CONTAINER.classList.add('image-container-individual-listing');

  LISTING_CONTAINER.classList.add('listing-container-individual-listing');
  LISTING_IMAGES.forEach((image) => {
    image.classList.add('listing-images-individual-listing');
  });

  PLACE_BID_BUTTON.classList.add(
    'button-styles',
    'pl-3',
    'pr-3',
    'pt-1',
    'pb-1'
  );
  VIEW_BIDS_BUTTON.classList.add(
    'button-styles',
    'pl-3',
    'pr-3',
    'pt-1',
    'pb-1'
  );

  BUTTON_CONTAINER.classList.add('flex-row-center', 'gap-4', 'mt-3', 'mb-3');

  CLOSE_BUTTON.addEventListener('click', (event) =>
    closePlaceBidForm(event, PLACE_BID_FORM)
  );
}
