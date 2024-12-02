/**
 * @function togglePlaceBidForm
 * @description Toggles the visibility of the place bid form.
 * @returns {void}
 *
 */

export function togglePlaceBidForm() {
  const LISTING_CONTAINER = this.parentElement;
  let PLACE_BID_FORM = document.querySelector('.place-bid-form');
  if (!PLACE_BID_FORM) {
    PLACE_BID_FORM = createPlaceBidFormElements(LISTING_CONTAINER);
  }
  if (PLACE_BID_FORM.classList.contains('hidden')) {
    PLACE_BID_FORM.classList.remove('hidden');
  } else {
    PLACE_BID_FORM.classList.add('hidden');
  }
}

/**
 * @function closePlaceBidForm
 * @description Closes the place bid form.
 * @param {Event} event - The event object
 * @returns {void}
 */

function closePlaceBidForm(event) {
  event.preventDefault();
  const PLACE_BID_FORM = document.querySelector('.place-bid-form');

  PLACE_BID_FORM.classList.add('hidden');
}

/**
 * @function createPlaceBidFormElements
 * @description Creates elements for the place bid form.
 * @param {HTMLElement} LISTING_CONTAINER - The listing container element
 * @returns {HTMLElement} - The place bid form element
 */

export function createPlaceBidFormElements(LISTING_CONTAINER) {
  const PLACE_BID_FORM = document.createElement('form');
  const PLACE_BID_INPUT = document.createElement('input');
  const CLOSE_BUTTON = document.createElement('button');
  const PLACE_BID_SUBMIT = document.createElement('button');

  PLACE_BID_FORM.classList.add('place-bid-form');
  PLACE_BID_INPUT.classList.add('place-bid-input');
  PLACE_BID_SUBMIT.classList.add('place-bid-submit');
  CLOSE_BUTTON.classList.add('close-btn');

  PLACE_BID_FORM.classList.add('hidden');

  PLACE_BID_INPUT.placeholder = 'Enter bid amount';
  PLACE_BID_SUBMIT.textContent = 'Place bid';

  PLACE_BID_FORM.appendChild(PLACE_BID_INPUT);
  PLACE_BID_FORM.appendChild(PLACE_BID_SUBMIT);
  CLOSE_BUTTON.textContent = 'X';
  PLACE_BID_FORM.appendChild(CLOSE_BUTTON);

  CLOSE_BUTTON.addEventListener('click', closePlaceBidForm);
  LISTING_CONTAINER.appendChild(PLACE_BID_FORM);

  return PLACE_BID_FORM;
}
