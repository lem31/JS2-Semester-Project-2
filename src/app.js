import './styles/main.css';
import router from './js/router/index.js';
import { displayLogoutBtn } from './js/ui/global/logout.js';
import { onclickLogoutBtn } from './js/ui/global/logout.js';
import { displaySignInBtnNav } from './js/ui/auth/auth.js';
import { displayRegLinkNav } from './js/ui/auth/auth.js';
import { displayMyListingsLinkNav } from './js/ui/auth/auth.js';
import { displayProfileLinkNav } from './js/ui/auth/auth.js';
import { displayMyBidsLinkNav } from './js/ui/auth/auth.js';
import { displayCreateListingLinkNav } from './js/ui/auth/auth.js';

await router(window.location.pathname);

displayMyListingsLinkNav();
displayLogoutBtn();
onclickLogoutBtn();
displaySignInBtnNav();
displayRegLinkNav();
displayProfileLinkNav();
displayMyBidsLinkNav();
displayCreateListingLinkNav();
