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
    LOGOUT_BTN.style.display = 'block';
  } else {
    LOGOUT_BTN.style.display = 'none';
  }
}
