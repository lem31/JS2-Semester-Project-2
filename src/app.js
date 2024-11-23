import './styles/main.css';
import router from './js/router/index.js';
import { displayLogoutBtn } from './js/ui/global/logout.js';
import { onclickLogoutBtn } from './js/ui/global/logout.js';

await router(window.location.pathname);

displayLogoutBtn();
onclickLogoutBtn();
