import { fetchListingImages } from '../../ui/listing/read';

/**
 * @function createMyBidListingsElements
 * @description Creates the elements for the user's bids.
 * @param {object} bid - The bid object.
 * @returns {HTMLDivElement} - The bid listing container.
 */

export function createMyBidListingsElements(bid) {
  const OUTER_CONTAINER = document.getElementById('my-bid-listings-container');
  const LISTING_CONTAINER = document.createElement('div');
  LISTING_CONTAINER.classList.add('my-bids-listing-box');

  const LISTING_TITLE = document.createElement('h2');
  const LISTING_END_DATE = document.createElement('p');
  const BID_MADE_DATE = document.createElement('p');
  const BUTTON_CONTAINER = document.createElement('div');
  const TEXT_BUTTON_CONTAINER = document.createElement('div');
  const BID_AMOUNT = document.createElement('p');
  const CAROUSEL = document.createElement('div');
  const CAROUSEL_INNER = document.createElement('div');
  const IMAGE_CONTAINER = document.createElement('div');
  const INNER_CONTAINER = document.createElement('div');

  INNER_CONTAINER.classList.add('inner-container-styles');

  IMAGE_CONTAINER.classList.add('image-container', 'imageContainer');

  CAROUSEL_INNER.classList.add('carouselInner', 'carousel-inner');

  LISTING_CONTAINER.classList.add('listing-container-styles', 'listing-box');

  OUTER_CONTAINER.classList.add('outer-container');
  TEXT_BUTTON_CONTAINER.classList.add('flex-col-center-layout');

  LISTING_TITLE.classList.add('h2-styles');
  LISTING_END_DATE.classList.add('labels');
  BID_MADE_DATE.classList.add('labels');
  BID_AMOUNT.classList.add('labels');

  BID_AMOUNT.textContent = bid.amount ? `Your bid: ${bid.amount}` : 'No bids';
  LISTING_TITLE.textContent = bid.listing?.title || 'No title available';
  LISTING_END_DATE.textContent = bid.listing?.endsAt
    ? `Ends at: ${bid.listing.endsAt}`
    : 'No end date available';
  BID_MADE_DATE.textContent = bid.created
    ? `Bid made on: ${bid.created}`
    : 'No bid made date';
  fetchListingImages(bid.listing, IMAGE_CONTAINER);

  TEXT_BUTTON_CONTAINER.appendChild(LISTING_TITLE);
  TEXT_BUTTON_CONTAINER.appendChild(BID_AMOUNT);
  TEXT_BUTTON_CONTAINER.appendChild(BID_MADE_DATE);
  TEXT_BUTTON_CONTAINER.appendChild(LISTING_END_DATE);
  TEXT_BUTTON_CONTAINER.appendChild(BUTTON_CONTAINER);

  LISTING_CONTAINER.appendChild(CAROUSEL);

  LISTING_CONTAINER.appendChild(TEXT_BUTTON_CONTAINER);

  CAROUSEL_INNER.appendChild(IMAGE_CONTAINER);

  CAROUSEL.appendChild(CAROUSEL_INNER);

  INNER_CONTAINER.appendChild(LISTING_CONTAINER);

  OUTER_CONTAINER.appendChild(INNER_CONTAINER);

  return LISTING_CONTAINER;
}
