const LOGOUT_BTN = document.querySelector('.sign-out-btn');
const LOGOUT_BTN_LI = document.getElementById('sidebar-li');

export function onclickLogoutBtn() {
  LOGOUT_BTN.addEventListener('click', function (event) {
    event.preventDefault();
    logout();
  });
}

function logout() {
  localStorage.removeItem('accessToken');
  window.location.href = '/';
}

export function displayLogoutBtn() {
  const ACCESS_TOKEN = localStorage.getItem('accessToken');
  if (!ACCESS_TOKEN) {
    LOGOUT_BTN_LI.classList.remove('sidebar-li-layout');
    LOGOUT_BTN_LI.classList.add('hidden');
  } else if (ACCESS_TOKEN) {
    LOGOUT_BTN_LI.classList.remove('hidden');
    LOGOUT_BTN_LI.classList.add('sidebar-li-layout');
  }
}
