import { populateEditForm } from '../../api/listing/edit';
import { onClickAddMoreImages } from '../../ui/listing/edit';
import { onClickSaveListingBtn } from '../../ui/listing/edit';
import { onClickCancelBtn } from '../../ui/listing/edit';
import { displayLogoutBtn } from '../../ui/global/logout.js';
import { onclickLogoutBtn } from '../../ui/global/logout.js';
import { displaySignInBtnNav } from '../../components/sidebar.js';
import { displayRegLinkNav } from '../../components/sidebar.js';
import { displayMyListingsLinkNav } from '../../components/sidebar.js';
import { displayProfileLinkNav } from '../../components/sidebar.js';
import { displayMyBidsLinkNav } from '../../components/sidebar.js';
import { displayCreateListingLinkNav } from '../../components/sidebar.js';
import { displayNav } from '../../components/sidebar.js';
import { onHoverNavLink } from '../../components/sidebar.js';

displayMyListingsLinkNav();
displayLogoutBtn();
onclickLogoutBtn();
displaySignInBtnNav();
displayRegLinkNav();
displayProfileLinkNav();
displayMyBidsLinkNav();
displayCreateListingLinkNav();

populateEditForm();
onClickAddMoreImages();
onClickSaveListingBtn();
onClickCancelBtn();
displayNav();
if (window.innerWidth >= 768) {
  onHoverNavLink();
}
