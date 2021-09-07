import axios from 'axios';

export const instance = axios.create({
  baseURL: 'http://3148-201-140-244-78.ngrok.io',
});
