import { onRegister } from '../../ui/auth/auth';
import { onSignIn } from '../../ui/auth/auth';
import { onclickSignInBtnTab } from '../../ui/auth/auth';
import { onclickRegBtnTab } from '../../ui/auth/auth';
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

onclickSignInBtnTab();
onclickRegBtnTab();

onRegister();
onSignIn();

displayNav();
onHoverNavLink();
