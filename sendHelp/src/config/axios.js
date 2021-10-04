import axios from 'axios';

export const instance = axios.create({
  baseURL: 'http://0211-2804-14c-1a1-27a2-350b-81d7-9af5-f95b.ngrok.io',
});
