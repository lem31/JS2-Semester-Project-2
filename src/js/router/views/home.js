import { getAllArtAuctionListings } from '../../api/listing/read.js';
import { onClickSearchButton } from '../../components/search.js';
import { displayNav } from '../../components/sidebar.js';
import { onHoverNavLink } from '../../components/sidebar.js';

getAllArtAuctionListings();
onClickSearchButton();
displayNav();
onHoverNavLink();
