import axios from 'axios';

export const instance = axios.create({
  baseURL: 'http://f828f4a78fcc.ngrok.io',
});
