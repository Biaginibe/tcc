import axios from 'axios';

export const instance = axios.create({
  baseURL: 'http://6a07-2804-14c-1a1-27a2-c851-cc41-bfeb-94f.ngrok.io',
});
