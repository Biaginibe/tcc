import axios from 'axios';

export const instance = axios.create({
  baseURL: 'http://e198-2804-14c-1a1-27a2-5d86-8578-4829-fd44.ngrok.io',
});
