/**
 * Handles the deletion of a listing by extracting the listing ID from the event target's dataset
 * and calling the API to remove the listing.
 *
 * @param {Event} event - The event triggered by the delete action, containing the listing ID in its target's dataset.
 */

import { removeListingFromAPI } from '../../api/listing/delete';

export function deleteListing(event) {
  const LISTING_ID = event.target.dataset.id;
  removeListingFromAPI(LISTING_ID);
}
