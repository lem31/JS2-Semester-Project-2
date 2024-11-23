const LOGOUT_BTN = document.querySelector('.sign-out-btn');
const ACCESS_TOKEN = localStorage.getItem('accessToken');

export function onclickLogoutBtn() {
  LOGOUT_BTN.addEventListener('click', logout);
}

function logout() {
  localStorage.removeItem('ACCESS_TOKEN');
  window.location.href = '/';
}

export function displayLogoutBtn() {
  if (ACCESS_TOKEN) {
    LOGOUT_BTN.style.display = 'block';
  } else {
    LOGOUT_BTN.style.display = 'none';
  }
}
