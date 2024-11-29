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
  const TEXT_BUTTON_CONTAINER = document.createElement('div');

  EDIT_BUTTON.textContent = 'Edit';
  DELETE_BUTTON.textContent = 'Delete';
  LISTING_BIDS.textContent = `No. of bids: ${listing._count.bids}`;
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
  LISTING_CONTAINER.appendChild(TEXT_BUTTON_CONTAINER);

  fetchListingImages(listing, LISTING_CONTAINER);

  const OUTER_CONTAINER = document.getElementById('my-auction-listings');
  OUTER_CONTAINER.appendChild(LISTING_CONTAINER);

  return LISTING_CONTAINER;
}

function fetchListingImages(listing, LISTING_CONTAINER) {
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
