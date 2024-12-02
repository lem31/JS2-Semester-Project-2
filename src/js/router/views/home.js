import { getAllArtAuctionListings } from '../../api/listing/read.js';
import { onClickSearchButton } from '../../components/search.js';
import { placeBid } from '../../ui/bids/place.js';

getAllArtAuctionListings();
onClickSearchButton();
