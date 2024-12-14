import { removeListingFromAPI } from '../../api/listing/delete';

export function deleteListing(event) {
  const LISTING_ID = event.target.dataset.id;
  removeListingFromAPI(LISTING_ID);
}
