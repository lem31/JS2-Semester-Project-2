export function createMyListingsElements(listing) {
  const LISTING_CONTAINER = document.createElement('div');
  LISTING_CONTAINER.classList.add('listing-box');

  const LISTING_TITLE = document.createElement('h2');
  const LISTING_DESCRIPTION = document.createElement('p');
  const LISTING_END_DATE = document.createElement('p');

  LISTING_TITLE.textContent = listing.title || 'No title available';
  LISTING_DESCRIPTION.textContent =
    listing.description || 'No description available';
  LISTING_END_DATE.textContent = listing.endsAt || 'No end date available';

  LISTING_CONTAINER.appendChild(LISTING_TITLE);
  LISTING_CONTAINER.appendChild(LISTING_DESCRIPTION);
  LISTING_CONTAINER.appendChild(LISTING_END_DATE);

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
    LISTING_CONTAINER.appendChild(IMAGE_ELEMENT);
  });
}
