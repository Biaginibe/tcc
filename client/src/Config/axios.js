import axios from 'axios';

export const instance = axios.create({
  baseURL: 'http://f123-179-98-37-202.ngrok.io',
});
