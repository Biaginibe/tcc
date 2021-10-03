import axios from 'axios';

export const instance = axios.create({
  baseURL: 'http://e904-2804-14c-1a1-27a2-34a5-35c-8eef-211b.ngrok.io',
});
