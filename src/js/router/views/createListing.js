import { onCreateListing } from '../../ui/listing/create';
import { onClickAddMoreImages } from '../../ui/listing/create';
import { displayNav } from '../../components/sidebar.js';
import { onHoverNavLink } from '../../components/sidebar.js';
import { displayLogoutBtn } from '../../ui/global/logout.js';
import { onclickLogoutBtn } from '../../ui/global/logout.js';
import { displaySignInBtnNav } from '../../components/sidebar.js';
import { displayRegLinkNav } from '../../components/sidebar.js';
import { displayMyListingsLinkNav } from '../../components/sidebar.js';
import { displayProfileLinkNav } from '../../components/sidebar.js';
import { displayMyBidsLinkNav } from '../../components/sidebar.js';
import { displayCreateListingLinkNav } from '../../components/sidebar.js';

displayMyListingsLinkNav();
displayLogoutBtn();
onclickLogoutBtn();
displaySignInBtnNav();
displayRegLinkNav();
displayProfileLinkNav();
displayMyBidsLinkNav();
displayCreateListingLinkNav();

onCreateListing();
onClickAddMoreImages();
displayNav();
onHoverNavLink();
