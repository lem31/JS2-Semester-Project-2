import { onRegister } from '../../ui/auth/auth';
import { onSignIn } from '../../ui/auth/auth';
import { onclickSignInBtnTab } from '../../ui/auth/auth';
import { onclickRegBtnTab } from '../../ui/auth/auth';
import { displayNav } from '../../components/sidebar.js';
import { onHoverNavLink } from '../../components/sidebar.js';

onclickSignInBtnTab();
onclickRegBtnTab();

onRegister();
onSignIn();

displayNav();
onHoverNavLink();
