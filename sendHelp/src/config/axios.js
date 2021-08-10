import axios from 'axios';

export const instance = axios.create({
  baseURL: 'http://5c0fa7db2dc1.ngrok.io',
});
