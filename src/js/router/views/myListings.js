import { getMyListings } from '../../api/listing/read.js';
import { displayNav } from '../../components/sidebar.js';
import { onHoverNavLink } from '../../components/sidebar.js';

getMyListings();
displayNav();
onHoverNavLink();
