/**
 * @function createMyListingsElements
 * @description Creates elements for each listing in the My Listings page
 * @param {Object} listing - The listing object
 * @returns {HTMLElement} - The listing container element
 */

export function createMyListingsElements(listing) {
  const LISTING_CONTAINER = document.createElement('div');
  LISTING_CONTAINER.classList.add('listing-box');
  const OUTER_CONTAINER = document.getElementById('all-auction-listings');
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
  const NEXT_BUTTON = document.createElement('button');
  const PREV_BUTTON = document.createElement('button');
  const PREV_IMG = document.createElement('img');
  const NEXT_IMG = document.createElement('img');
  PREV_IMG.src = '/images/icons8-left-100.png';
  NEXT_IMG.src = '/images/icons8-right-100.png';
  const IMAGE_CONTAINER = document.createElement('div');
  const CAROUSEL = document.createElement('div');
  const CAROUSEL_INNER = document.createElement('div');
  const BIDS_CONTAINER = document.createElement('div');
  const BIDS_IMAGE = document.createElement('img');
  BIDS_IMAGE.src = '/images/icons8-coins-64.png';
  LISTING_TITLE.style.color = 'blue'; // Example style
  LISTING_TITLE.style.fontSize = '20px';

  addStylesToMyElements(
    LISTING_TITLE,
    LISTING_BIDS_COUNT_TOTAL,
    LISTING_END_DATE,
    LISTING_BIDS,

    LISTING_CONTAINER,
    IMAGE_CONTAINER,
    CAROUSEL_INNER,

    PREV_BUTTON,
    NEXT_BUTTON,
    TEXT_BUTTON_CONTAINER,
    VIEW_BIDS_BUTTON,

    VIEW_BIDS_CONTAINER,

    BIDS_CONTAINER,
    OUTER_CONTAINER,
    BIDS_IMAGE,

    BUTTON_CONTAINER,
    PREV_IMG,
    NEXT_IMG
  );

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
  TEXT_BUTTON_CONTAINER.appendChild(BIDS_CONTAINER);
  BIDS_CONTAINER.appendChild(BIDS_IMAGE);
  BIDS_CONTAINER.appendChild(LISTING_BIDS_COUNT_TOTAL);
  TEXT_BUTTON_CONTAINER.appendChild(LISTING_DESCRIPTION);
  TEXT_BUTTON_CONTAINER.appendChild(LISTING_BIDS);
  TEXT_BUTTON_CONTAINER.appendChild(LISTING_END_DATE);
  TEXT_BUTTON_CONTAINER.appendChild(BUTTON_CONTAINER);
  BUTTON_CONTAINER.appendChild(EDIT_BUTTON);
  BUTTON_CONTAINER.appendChild(DELETE_BUTTON);
  BUTTON_CONTAINER.appendChild(VIEW_BIDS_BUTTON);
  LISTING_CONTAINER.appendChild(TEXT_BUTTON_CONTAINER);
  fetchListingImages(listing, IMAGE_CONTAINER);

  VIEW_BIDS_CONTAINER.appendChild(LISTING_BIDS_COUNT_TOTAL);

  VIEW_BIDS_CONTAINER.classList.add('hidden');

  LISTING_CONTAINER.appendChild(CAROUSEL);

  CAROUSEL_INNER.appendChild(IMAGE_CONTAINER);
  CAROUSEL.appendChild(CAROUSEL_INNER);

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

export function addStylesToMyElements(
  LISTING_TITLE,
  LISTING_BIDS_COUNT_TOTAL,
  LISTING_END_DATE,
  LISTING_BIDS,

  LISTING_CONTAINER,
  IMAGE_CONTAINER,
  CAROUSEL_INNER,

  PREV_BUTTON,
  NEXT_BUTTON,
  TEXT_BUTTON_CONTAINER,
  VIEW_BIDS_BUTTON,

  VIEW_BIDS_CONTAINER,

  BIDS_CONTAINER,
  OUTER_CONTAINER,
  BIDS_IMAGE,
  BUTTON_CONTAINER,
  PREV_IMG,
  NEXT_IMG
) {
  LISTING_TITLE.classList.add('h2-styles');
  LISTING_BIDS_COUNT_TOTAL.classList.add('labels');
  LISTING_END_DATE.classList.add('labels', 'max-w-[150px]', 'mb-2');
  LISTING_BIDS.classList.add('h2-styles');

  IMAGE_CONTAINER.classList.add('image-container', 'imageContainer');

  CAROUSEL_INNER.classList.add('carouselInner');

  LISTING_CONTAINER.classList.add('listing-container-styles', 'listing-box');

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

  VIEW_BIDS_CONTAINER.classList.add('hidden');

  BIDS_CONTAINER.classList.add('flex-row-center');

  OUTER_CONTAINER.classList.add('outer-container');

  BIDS_IMAGE.classList.add(
    'w-[30px]',
    'h-[30px]',
    'md:w-[50px]',
    'md:h-[50px]'
  );

  BUTTON_CONTAINER.classList.add('flex-row-center', 'gap-4', 'mt-3', 'mb-3');

  addHoverEffectToButtons(PREV_IMG, NEXT_IMG);
}
