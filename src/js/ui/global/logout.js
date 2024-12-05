const LOGOUT_BTN = document.querySelector('.sign-out-btn');

export function onclickLogoutBtn() {
  LOGOUT_BTN.addEventListener('click', logout);
}

function logout() {
  localStorage.removeItem('accessToken');
  window.location.href = '/';
}

export function displayLogoutBtn() {
  const ACCESS_TOKEN = localStorage.getItem('accessToken');
  if (ACCESS_TOKEN) {
    LOGOUT_BTN.classList.add('sidebar-li-layout');
  } else {
    LOGOUT_BTN.classList.remove('sidebar-li-layout');
    LOGOUT_BTN.classList.add('hidden');
  }
}
