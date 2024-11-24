import { API_KEY } from './constants';

export function headers() {
  const ACCESS_TOKEN = localStorage.getItem('accessToken');
  const headers = new Headers();

  headers.append('Content-Type', 'application/json');

  if (ACCESS_TOKEN) {
    headers.append('Authorization', `Bearer ${ACCESS_TOKEN}`);
  }

  if (API_KEY) {
    headers.append('X-Noroff-API-Key', API_KEY);
  }

  return headers;
}
