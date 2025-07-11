import { getAllArtAuctionListings } from '../../api/listing/read.js';
import { onClickSearchButton } from '../../components/search.js';
import { displayNav } from '../../components/sidebar.js';
import { onHoverNavLink } from '../../components/sidebar.js';
import { displayLogoutBtn } from '../../ui/global/logout.js';
import { onclickLogoutBtn } from '../../ui/global/logout.js';
import { displaySignInBtnNav } from '../../components/sidebar.js';
import { displayRegLinkNav } from '../../components/sidebar.js';
import { displayMyListingsLinkNav } from '../../components/sidebar.js';
import { displayProfileLinkNav } from '../..//components/sidebar.js';
import { displayMyBidsLinkNav } from '../../components/sidebar.js';
import { displayCreateListingLinkNav } from '../../components/sidebar.js';
import { filterSelected } from '../../components/search.js';

displayMyListingsLinkNav();
displayLogoutBtn();
onclickLogoutBtn();
displaySignInBtnNav();
displayRegLinkNav();
displayProfileLinkNav();
displayMyBidsLinkNav();
displayCreateListingLinkNav();
getAllArtAuctionListings();
onClickSearchButton();
displayNav();
if (window.innerWidth >= 768) {
  onHoverNavLink();
}
filterSelected();
