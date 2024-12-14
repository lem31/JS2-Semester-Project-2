import { getUserProfile } from '../../api/profile/read';
import { onClickUpdateProfileBtn } from '../../ui/profile/read';
import { onSubmitUpdateProfileForm } from '../../ui/profile/update';
import { displayNav } from '../../components/sidebar.js';
import { onHoverNavLink } from '../../components/sidebar.js';

getUserProfile();
onClickUpdateProfileBtn();
onSubmitUpdateProfileForm();
displayNav();
onHoverNavLink();
