import axios from 'axios';

export const instance = axios.create({
  baseURL: 'http://f17a70975680.ngrok.io',
});
