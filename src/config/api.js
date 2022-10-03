import axios from 'axios';

export const API = axios.create({
  baseURL: `http://localhost:5000/api/v1`,
});

export function setAuthorization(token) {
  if (!token) {
    delete API.defaults.headers.common['Authorization'];
    return;
  }
  API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}
