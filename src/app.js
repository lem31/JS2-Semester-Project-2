import './styles/main.css';
import router from './js/router/index.js';
import { displayLogoutBtn } from './js/ui/global/logout.js';
import { onclickLogoutBtn } from './js/ui/global/logout.js';
import { displaySignInBtnNav } from './js/components/sidebar.js';
import { displayRegLinkNav } from './js/components/sidebar.js';
import { displayMyListingsLinkNav } from './js/components/sidebar.js';
import { displayProfileLinkNav } from './js/components/sidebar.js';
import { displayMyBidsLinkNav } from './js/components/sidebar.js';
import { displayCreateListingLinkNav } from './js/components/sidebar.js';

await router(window.location.pathname);

displayMyListingsLinkNav();
displayLogoutBtn();
onclickLogoutBtn();
displaySignInBtnNav();
displayRegLinkNav();
displayProfileLinkNav();
displayMyBidsLinkNav();
displayCreateListingLinkNav();
