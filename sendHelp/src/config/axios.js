import axios from 'axios';

export const instance = axios.create({
  baseURL: 'http://74ee-2804-14c-1a1-27a2-a083-4153-492f-1e4b.ngrok.io',
});
