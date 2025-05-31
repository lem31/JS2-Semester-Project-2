import { fetchListingImages } from '../../ui/listing/read.js';
import { isLoggedIn } from '../../ui/listing/read.js';
import { toggleCarouselImages } from '../../ui/listing/read.js';
import { closePlaceBidForm } from '../../ui/listing/read.js';
import { displayListingIdInUrlOnListingPage } from '../../ui/listing/read.js';
import { postBidToAPI } from '../../api/bids/place.js';
import coinImage from '../../../../images/icons8-coins-64.png';
import prevImage from '../../../../images/icons8-left-100.png';
import nextImage from '../../../../images/icons8-right-100.png';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

/**
 * @function createAllListingsElements
 * @description Creates elements for each listing on the home page
 * @param {Object} listing - The listing object
 * @returns {HTMLElement} - The listing container element
 */

//

export function createAllListingsElements(listing) {
  const highestBid =
    listing.bids && listing.bids.length > 0
      ? Math.max(...listing.bids.map((bid) => Number(bid.amount)))
      : null;

  const HIGHEST_BID = document.createElement('p');
  const LISTING_CONTAINER = document.createElement('div');
  const IMAGE_CONTAINER = document.createElement('div');
  IMAGE_CONTAINER.id = `image-container`;
  const PLACE_BID_FORM = document.createElement('form');
  const PLACE_BID_TITLE_BOX = document.createElement('div');
  const PLACE_BID_TITLE = document.createElement('h2');
  const PLACE_BID_INPUT = document.createElement('input');
  const PLACE_BID_LABEL = document.createElement('label');
  const BIDS_IMAGE = document.createElement('img');
  const CLOSE_BUTTON_CONTAINER = document.createElement('div');
  const CLOSE_BUTTON = document.createElement('button');
  const PLACE_BID_SUBMIT = document.createElement('button');
  const PLACE_BID_FORM_CONTAINER = document.createElement('div');
  const PLACE_BID_SUBMIT_CONTAINER = document.createElement('div');
  const FORM_INPUT_LABEL_BOX = document.createElement('div');
  const BIDS_IMAGE_INPUT_CONTAINER = document.createElement('div');

  const COIN_IMAGE = document.createElement('img');

  BIDS_IMAGE.src = coinImage;
  COIN_IMAGE.src = coinImage;

  PLACE_BID_FORM.style.display = 'none';
  PLACE_BID_INPUT.placeholder = 'Enter bid amount';
  PLACE_BID_SUBMIT.textContent = 'Place bid';
  PLACE_BID_SUBMIT.type = 'submit';
  CLOSE_BUTTON.textContent = 'X';
  CLOSE_BUTTON.type = 'button';
  PLACE_BID_TITLE.textContent = 'Place Bid';
  PLACE_BID_LABEL.textContent = 'Your bid';
  HIGHEST_BID.textContent =
    highestBid !== null ? `Highest Bid: ${highestBid}` : 'No bids placed yet.';

  PLACE_BID_SUBMIT_CONTAINER.appendChild(PLACE_BID_SUBMIT);
  CLOSE_BUTTON_CONTAINER.appendChild(CLOSE_BUTTON);
  PLACE_BID_FORM.appendChild(CLOSE_BUTTON_CONTAINER);
  PLACE_BID_TITLE_BOX.appendChild(PLACE_BID_TITLE);
  PLACE_BID_FORM.appendChild(PLACE_BID_TITLE_BOX);
  FORM_INPUT_LABEL_BOX.appendChild(PLACE_BID_LABEL);
  PLACE_BID_FORM.appendChild(FORM_INPUT_LABEL_BOX);
  PLACE_BID_FORM.appendChild(BIDS_IMAGE_INPUT_CONTAINER);

  BIDS_IMAGE_INPUT_CONTAINER.appendChild(COIN_IMAGE);

  BIDS_IMAGE_INPUT_CONTAINER.appendChild(PLACE_BID_INPUT);

  PLACE_BID_FORM.appendChild(PLACE_BID_SUBMIT_CONTAINER);
  PLACE_BID_FORM_CONTAINER.appendChild(PLACE_BID_FORM);
  fetchListingImages(listing, IMAGE_CONTAINER);

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
  const OUTER_CONTAINER = document.getElementById('all-auction-listings');
  const PREV_BUTTON = document.createElement('button');
  const NEXT_BUTTON = document.createElement('button');
  const PREV_IMG = document.createElement('img');
  const NEXT_IMG = document.createElement('img');
  const BIDS_CONTAINER = document.createElement('div');
  PREV_IMG.src = prevImage;
  NEXT_IMG.src = nextImage;

  const INNER_CONTAINER = document.createElement('div');

  VIEW_LISTING_BTN.dataset.id = listing.id;

  PLACE_BID_BUTTON.addEventListener('click', () => {
    if (!isLoggedIn()) {
      toastr.error('You need to be logged in to place a bid.');

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

  NEXT_BUTTON.appendChild(NEXT_IMG);
  PREV_BUTTON.appendChild(PREV_IMG);

  const urlPattern = new RegExp(
    '^(https?:\\/\\/)?' +
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' +
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
      '(\\?[;&a-z\\d%_.~+=-]*)?' +
      '(\\#[-a-z\\d_]*)?$',
    'i'
  );

  if (!urlPattern.test(listing.title)) {
    TEXT_BUTTON_CONTAINER.appendChild(LISTING_TITLE);
  }

  TEXT_BUTTON_CONTAINER.appendChild(BIDS_CONTAINER);
  if (isLoggedIn()) {
    BIDS_CONTAINER.appendChild(BIDS_IMAGE);
  }
  BIDS_CONTAINER.appendChild(LISTING_BIDS_COUNT_TOTAL);
  BIDS_CONTAINER.appendChild(HIGHEST_BID);

  TEXT_BUTTON_CONTAINER.appendChild(LISTING_DESCRIPTION);
  TEXT_BUTTON_CONTAINER.appendChild(LISTING_BIDS);
  TEXT_BUTTON_CONTAINER.appendChild(LISTING_END_DATE);
  TEXT_BUTTON_CONTAINER.appendChild(SELLER_INFO_BOX);

  TEXT_BUTTON_CONTAINER.appendChild(VIEW_LISTING_BTN_CONTAINER);
  BUTTON_CONTAINER.appendChild(PLACE_BID_BUTTON);

  VIEW_LISTING_BTN_CONTAINER.appendChild(VIEW_LISTING_BTN);

  BUTTON_CONTAINER.appendChild(VIEW_BIDS_BUTTON);
  TEXT_BUTTON_CONTAINER.appendChild(BUTTON_CONTAINER);

  CAROUSEL_INNER.appendChild(IMAGE_CONTAINER);
  CAROUSEL.appendChild(CAROUSEL_INNER);

  SELLER_INFO_BOX.appendChild(SELLER_AVATAR);
  SELLER_INFO_BOX.appendChild(SELLER_NAME);

  TEXT_BUTTON_CONTAINER.appendChild(VIEW_BIDS_CONTAINER);

  IMAGE_CONTAINER.appendChild(PREV_BUTTON);
  IMAGE_CONTAINER.appendChild(NEXT_BUTTON);

  LISTING_CONTAINER.appendChild(CAROUSEL);
  LISTING_CONTAINER.appendChild(IMAGE_CONTAINER);

  LISTING_CONTAINER.appendChild(TEXT_BUTTON_CONTAINER);

  LISTING_CONTAINER.appendChild(PLACE_BID_FORM);

  INNER_CONTAINER.appendChild(LISTING_CONTAINER);

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
      const BID_COIN_IMAGE = document.createElement('img');
      BID_COIN_IMAGE.src = coinImage;
      BID_COIN_IMAGE.alt = 'Coin icon';
      BID_COIN_IMAGE.classList.add('coin-icon');

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

  OUTER_CONTAINER.appendChild(INNER_CONTAINER);

  VIEW_LISTING_BTN.addEventListener('click', (event) => {
    const target = event.target.closest('.view-listing-btn');
    if (target) {
      displayListingIdInUrlOnListingPage(target.dataset.id);
    }
  });

  VIEW_BIDS_BUTTON.addEventListener('click', () => {
    if (!isLoggedIn()) {
      toastr.error('You need to be logged in to view bids.');

      return;
    }

    const OPEN_BIDS_CONTAINER = document.querySelector('.view-bids-box');
    if (OPEN_BIDS_CONTAINER && OPEN_BIDS_CONTAINER !== VIEW_BIDS_CONTAINER) {
      toastr.error('Please close the current bids before opening another.');

      return;
    }

    if (listing.bids && listing.bids.length > 0) {
      if (
        VIEW_BIDS_CONTAINER.classList.contains('hidden') ||
        !VIEW_BIDS_CONTAINER.classList.contains('view-bids-box')
      ) {
        VIEW_BIDS_CONTAINER.classList.remove('hidden');
        VIEW_BIDS_CONTAINER.classList.add('view-bids-box');
      } else {
        VIEW_BIDS_CONTAINER.classList.add('hidden');
        VIEW_BIDS_CONTAINER.classList.remove('view-bids-box');
      }
    } else {
      toastr.error('No bids available.');
    }
  });

  addStylesToElements(
    SELLER_NAME,
    LISTING_TITLE,
    LISTING_BIDS_COUNT_TOTAL,
    LISTING_END_DATE,
    LISTING_BIDS,
    PLACE_BID_BUTTON,
    INNER_CONTAINER,
    LISTING_CONTAINER,
    IMAGE_CONTAINER,
    CAROUSEL_INNER,
    PLACE_BID_FORM,
    PLACE_BID_INPUT,
    PLACE_BID_SUBMIT,
    CLOSE_BUTTON,
    PREV_BUTTON,
    NEXT_BUTTON,
    TEXT_BUTTON_CONTAINER,
    VIEW_BIDS_BUTTON,
    SELLER_AVATAR,
    VIEW_LISTING_BTN,
    VIEW_BIDS_CONTAINER,
    SELLER_INFO_BOX,
    BIDS_CONTAINER,
    OUTER_CONTAINER,
    BIDS_IMAGE,
    PLACE_BID_TITLE,
    PLACE_BID_LABEL,
    PLACE_BID_FORM_CONTAINER,
    PLACE_BID_TITLE_BOX,
    PLACE_BID_SUBMIT_CONTAINER,
    FORM_INPUT_LABEL_BOX,
    BIDS_IMAGE_INPUT_CONTAINER,
    BUTTON_CONTAINER,
    PREV_IMG,
    NEXT_IMG,
    COIN_IMAGE,
    HIGHEST_BID
  );

  CLOSE_BUTTON.addEventListener('click', (event) =>
    closePlaceBidForm(event, PLACE_BID_FORM)
  );

  toggleCarouselImages(IMAGE_CONTAINER, PREV_BUTTON, NEXT_BUTTON);
  showArrowsOnHover(
    LISTING_CONTAINER,
    PREV_BUTTON,
    NEXT_BUTTON,
    IMAGE_CONTAINER.querySelectorAll('.carouselItem')
  );

  addHoverEffectToListing(LISTING_CONTAINER);
}

export function addStylesToElements(
  SELLER_NAME,
  LISTING_TITLE,
  LISTING_BIDS_COUNT_TOTAL,
  LISTING_END_DATE,
  LISTING_BIDS,
  PLACE_BID_BUTTON,
  INNER_CONTAINER,
  LISTING_CONTAINER,
  IMAGE_CONTAINER,
  CAROUSEL_INNER,
  PLACE_BID_FORM,
  PLACE_BID_INPUT,
  PLACE_BID_SUBMIT,
  CLOSE_BUTTON,
  PREV_BUTTON,
  NEXT_BUTTON,
  TEXT_BUTTON_CONTAINER,
  VIEW_BIDS_BUTTON,
  SELLER_AVATAR,
  VIEW_LISTING_BTN,
  VIEW_BIDS_CONTAINER,
  SELLER_INFO_BOX,
  BIDS_CONTAINER,
  OUTER_CONTAINER,
  BIDS_IMAGE,
  PLACE_BID_TITLE,
  PLACE_BID_LABEL,
  PLACE_BID_FORM_CONTAINER,
  PLACE_BID_TITLE_BOX,
  PLACE_BID_SUBMIT_CONTAINER,
  FORM_INPUT_LABEL_BOX,
  BIDS_IMAGE_INPUT_CONTAINER,
  BUTTON_CONTAINER,
  PREV_IMG,
  NEXT_IMG,
  COIN_IMAGE,
  HIGHEST_BID
) {
  SELLER_NAME.classList.add('labels');
  LISTING_TITLE.classList.add('h2-styles');
  LISTING_BIDS_COUNT_TOTAL.classList.add('labels');
  HIGHEST_BID.classList.add('labels');
  LISTING_END_DATE.classList.add('labels', 'max-w-[150px]', 'mb-2');
  LISTING_BIDS.classList.add('h2-styles');

  PLACE_BID_BUTTON.classList.add('display-place-bid-form-btn');

  INNER_CONTAINER.classList.add('inner-container-styles');

  IMAGE_CONTAINER.classList.add('image-container', 'imageContainer');

  CAROUSEL_INNER.classList.add('carouselInner', 'carousel-inner');

  LISTING_CONTAINER.classList.add('listing-container-styles', 'listing-box');

  PLACE_BID_FORM.classList.add(
    'place-bid-form',
    'form-styles',
    'w-[280px]',
    'h-[218px]',
    'absolute'
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

  PREV_BUTTON.classList.add('carousel-control-left');
  NEXT_BUTTON.classList.add('carousel-control-right');
  TEXT_BUTTON_CONTAINER.classList.add('flex-col-center-layout');
  VIEW_BIDS_BUTTON.classList.add(
    'view-bids-btn',
    'button-styles',
    'pl-3',
    'pr-3',
    'pt-1',
    'pb-1'
  );
  SELLER_AVATAR.classList.add('seller-avatar-img');
  PLACE_BID_BUTTON.classList.add(
    'display-place-bid-form-btn',
    'button-styles',
    'pl-3',
    'pr-3',
    'pt-1',
    'pb-1'
  );
  VIEW_LISTING_BTN.classList.add(
    'button-styles',
    'view-listing-btn',
    'pl-3',
    'pr-3',
    'pt-1',
    'pb-1',
    'mb-2'
  );

  VIEW_BIDS_CONTAINER.classList.add('hidden');
  SELLER_INFO_BOX.classList.add('flex-row-center');
  BIDS_CONTAINER.classList.add('flex-row-center');

  OUTER_CONTAINER.classList.add('outer-container');

  BIDS_IMAGE.classList.add(
    'w-[30px]',
    'h-[30px]',
    'md:w-[50px]',
    'md:h-[50px]'
  );

  COIN_IMAGE.classList.add(
    'w-[30px]',
    'h-[30px]',
    'md:w-[50px]',
    'md:h-[50px]'
  );

  PLACE_BID_LABEL.classList.add('gold-labels', 'ml-8');
  PLACE_BID_SUBMIT.classList.add(
    'place-bid-submit',
    'button-styles',
    'mt-4',
    'pl-3',
    'pr-3',
    'pt-1',
    'pb-1'
  );
  PLACE_BID_FORM_CONTAINER.classList.add('relative');
  PLACE_BID_TITLE_BOX.classList.add(
    'flex-row-center',
    'mb-4',
    'text-center',
    'mt-[-18px]'
  );
  PLACE_BID_SUBMIT_CONTAINER.classList.add('flex-row-center');
  FORM_INPUT_LABEL_BOX.classList.add('flex', 'flex-col');
  PLACE_BID_INPUT.classList.add('place-bid-input', 'input-styles');
  BIDS_IMAGE_INPUT_CONTAINER.classList.add('flex-row-center');
  BUTTON_CONTAINER.classList.add('flex-row-center', 'gap-4', 'mt-3', 'mb-3');

  addHoverEffectToButtons(PREV_IMG, NEXT_IMG);
}

/**
 * @function addHoverEffectToButtons
 * @description Adds a black drop shadow to the prev and next buttons on hover
 * @param {HTMLElement} prevButton - The button to go to the previous image
 * @param {HTMLElement} nextButton - The button to go to the next image
 */
export function addHoverEffectToButtons(prevImage, nextImage) {
  const addShadow = (image) => {
    image.style.boxShadow = '0 14px 18px rgba(0, 0, 0, 0.5)';
    image.style.backgroundColor = 'white';
  };

  const removeShadow = (image) => {
    image.style.boxShadow = 'none';
    image.style.backgroundColor = 'transparent';
  };

  prevImage.addEventListener('mouseover', () => addShadow(prevImage));
  prevImage.addEventListener('mouseout', () => removeShadow(prevImage));

  if (nextImage) {
    nextImage.addEventListener('mouseover', () => addShadow(nextImage));
    nextImage.addEventListener('mouseout', () => removeShadow(nextImage));
  }
}

/**
 * @function showArrowsOnHover
 * @description Shows the prev and next arrows only when hovering over the listing container
 * and only if there is more than one image
 * @param {HTMLElement} listingContainer - The listing container element
 * @param {HTMLElement} prevButton - The button to go to the previous image
 * @param {HTMLElement} nextButton - The button to go to the next image
 */
export function showArrowsOnHover(
  listingContainer,
  prevButton,
  nextButton,
  images
) {
  if (images.length > 1) {
    listingContainer.addEventListener('mouseover', () => {
      prevButton.style.display = 'block';
      nextButton.style.display = 'block';
    });

    listingContainer.addEventListener('mouseout', () => {
      prevButton.style.display = 'none';
      nextButton.style.display = 'none';
    });
  } else {
    prevButton.style.display = 'none';
    nextButton.style.display = 'none';
  }
}

/**
 * @function addHoverEffectToListing
 * @description Adds a hover effect to the listing container to add and remove the 'z-12' class
 * @param {HTMLElement} listingContainer - The listing container element
 */
export function addHoverEffectToListing(listingContainer) {
  listingContainer.addEventListener('mouseover', () => {
    listingContainer.classList.add('z-12');
    listingContainer.classList.add('bg-black');
  });

  listingContainer.addEventListener('mouseout', () => {
    listingContainer.classList.remove('z-12');
    listingContainer.classList.remove('bg-black');
  });
}
